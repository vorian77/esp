import { App } from '$comps/app/types.app.svelte'
import { required, strRequired, valueOrDefault } from '$utils/utils'
import {
	DataManager,
	DataObj,
	DataObjCardinality,
	DataObjConfirm,
	DataObjDataField,
	type DataRecord,
	memberOfEnum,
	ParmsValues,
	ParmsValuesType,
	NodeType,
	ParmsUser,
	ToastType,
	User
} from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField.svelte'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppDataObjName,
	TokenAppDo,
	TokenAppDoActionConfirmType,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalSelect
} from '$utils/types.token'
import { FieldEmbedType } from '$comps/form/field'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjActionField, RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { booleanOrFalse, ResponseBody, strOptional } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

async function askB4Transition(
	state: State,
	obj: any,
	confirmConfig: DataObjConfirm,
	fChangeCallback?: Function
) {
	if (state instanceof StateSurfaceModal) {
		if (confirm(confirmConfig.message)) {
			state.changeValidate(state, obj, fChangeCallback)
		}
	} else {
		const modal: ModalSettings = {
			type: 'confirm',
			title: confirmConfig.title,
			body: confirmConfig.message,
			buttonTextCancel: confirmConfig.buttonLabelCancel,
			buttonTextConfirm: confirmConfig.buttonLabelConfirm,
			response: async (r: boolean) => {
				if (r) {
					// discard changes
					obj.confirmType = TokenAppDoActionConfirmType.none
					state.dataManager?.resetStatus()
					state.changeValidate(state, obj, fChangeCallback)
				}
			}
		}
		return state.storeModal.trigger(modal)
	}
}

export class State {
	app: App = new App()
	data?: DataObj
	dataManager?: DataManager
	dataObjState?: DataObj
	fChangeCallback?: Function
	layoutComponent: StateLayoutComponent = StateLayoutComponent.layoutContent
	layoutHeader: StateLayoutHeader = new StateLayoutHeader({})
	nodeType: NodeType = NodeType.home
	packet?: StatePacket = $state()
	page = '/home'
	parmsState: ParmsValues = new ParmsValues()
	parmsUser: ParmsUser = new ParmsUser()
	stateRoot?: State
	storeDrawer: any
	storeModal: any
	storeToast: any
	target: StateTarget = $state(StateTarget.dashboard)
	user?: User
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.changeProperties(obj)
	}

	change(obj: any) {
		this.changeValidate(this, obj, this.fChangeCallback)
	}
	changeProperties(obj: any) {
		// optional
		if (Object.hasOwn(obj, 'app')) this.app = obj.app
		if (Object.hasOwn(obj, 'fChangeCallback')) this.fChangeCallback = obj.fChangeCallback
		if (Object.hasOwn(obj, 'data')) this.data = obj.data
		if (Object.hasOwn(obj, 'layoutComponent')) this.layoutComponent = obj.layoutComponent
		if (Object.hasOwn(obj, 'layoutHeader'))
			this.layoutHeader = new StateLayoutHeader(obj.layoutHeader)
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'packet')) this.packet = obj.packet
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'parmsState')) this.parmsState.update(obj?.parmsState?.data)
		if (Object.hasOwn(obj, 'stateRoot')) this.stateRoot = obj.stateRoot
		if (Object.hasOwn(obj, 'storeDrawer')) this.storeDrawer = obj.storeDrawer
		if (Object.hasOwn(obj, 'storeModal')) this.storeModal = obj.storeModal
		if (Object.hasOwn(obj, 'storeToast')) this.storeToast = obj.storeToast
		if (Object.hasOwn(obj, 'user')) this.user = obj.user

		// required
		this.target = memberOfEnum(
			obj.target || this.target,
			'State',
			'target',
			'StateTarget',
			StateTarget
		)
		if ([StateTarget.dashboard, StateTarget.feature].includes(obj.target)) this.page = '/home'

		return this
	}

	async changeValidate(state: State, obj: any, callback: Function | undefined = undefined) {
		obj = valueOrDefault(obj, {})
		if (obj.confirmType) {
			const confirmType = obj.confirmType
			const confirm = obj.confirm || new DataObjConfirm()
			if (
				confirmType &&
				(confirmType === TokenAppDoActionConfirmType.always ||
					(confirmType === TokenAppDoActionConfirmType.statusChanged &&
						state.dataManager?.isStatusChanged()))
			) {
				await askB4Transition(state, obj, confirm, callback)
			} else {
				if (callback) await callback(obj)
			}
		} else {
			if (callback) await callback(obj)
		}
	}

	closeModal() {
		this.storeModal.close()
	}
	consume(actions: StatePacketAction | StatePacketAction[]) {
		if (this.packet && actions.includes(this.packet.action)) {
			const packet = this.packet
			this.packet = undefined
			return packet
		} else {
			return undefined
		}
	}

	downloadContent(title: string, mimeType: string, content: string) {
		const blob = new Blob([content], { type: mimeType })
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		if (title) link.download = title
		link.click()
		URL.revokeObjectURL(url)

		this.openToast(ToastType.success, `"${title}" has been downloaded.`)
	}

	async getActions(fieldGroupName: string) {
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeGetDataObjActionFieldGroup,
			new TokenApiId(fieldGroupName)
		)
		if (result.success) {
			const actionFieldGroup = result.data
			return actionFieldGroup._actionFieldItems.map((action: any) => {
				const rawAction = new RawDataObjActionField(action)
				return new DataObjActionField(rawAction, this)
			})
		} else {
			error(500, {
				file: FILENAME,
				function: 'getActions',
				message: `Error retrieving data object action field group: ${fieldGroupName}`
			})
		}
	}

	newApp() {
		this.app = new App()
		this.parmsUser.reset()
	}

	async openDrawer(
		id: string,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined,
		meta: DataRecord
	) {
		const stateApp = required(meta.stateApp, 'State.openDrawer', 'meta.stateApp')
		stateApp.changeProperties({
			storeDrawer: this.storeDrawer,
			storeModal: this.storeModal,
			storeToast: this.storeToast
		})
		const settings: DrawerSettings = { id, position, height, width, meta }
		this.storeDrawer.open(settings)
	}

	async openDrawerDataObj(
		id: string,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined,
		token: TokenAppDataObjName
	) {
		this.openDrawer(id, position, height, width, {
			stateApp: new State({
				cardinality: DataObjCardinality.detail,

				layoutComponent: StateLayoutComponent.layoutContent,
				layoutHeader: {
					isDataObj: true,
					isDrawerClose: true
				},
				packet: new StatePacket({
					action: StatePacketAction.doOpen,
					token
				}),
				target: StateTarget.feature
			})
		})
	}

	async openModal(state: StateSurfaceModal, fUpdate?: Function) {
		state.changeProperties({
			storeDrawer: this.storeDrawer,
			storeModal: this.storeModal,
			storeToast: this.storeToast,
			target: state.target,
			user: this.user
		})
		new Promise<any>((resolve) => {
			const modalSettings: ModalSettings = {
				type: 'component',
				component: 'rootLayoutModal',
				meta: { stateApp: state },
				response: async (r: any) => {
					resolve(r)
				}
			}
			state.storeModal.trigger(modalSettings)
		}).then(async (response) => {
			if (fUpdate) {
				if (response && response !== false) {
					const modalReturn = response as TokenAppModalReturn
					if (
						modalReturn.type === TokenAppModalReturnType.complete &&
						modalReturn.data instanceof ParmsValues
					) {
						fUpdate(TokenAppModalReturnType.complete, modalReturn.data)
					} else {
						fUpdate(TokenAppModalReturnType.cancel)
					}
				} else {
					fUpdate(TokenAppModalReturnType.cancel)
				}
			}
		})
	}

	async openModalDataObj(dataObjName: string, fUpdate?: Function) {
		const clazz = `${FILENAME}.openModalDataObj`
		const stateModal = new StateSurfaceModal({
			actionsFieldDialog: await this.getActions('doag_dialog_footer_detail'),
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true
			},
			packet: new StatePacket({
				action: StatePacketAction.doOpen,
				token: new TokenAppDataObjName({ dataObjName, querytype: TokenApiQueryType.retrieve })
			})
		})
		await this.openModal(stateModal, fUpdate)
	}

	async openModalEmbedListConfig(
		token: TokenAppDo,
		queryType: TokenApiQueryType,
		fModalCloseUpdate: Function
	) {
		const clazz = `${FILENAME}.openModalEmbedListConfig`
		const field: DataObjDataField = required(token.dataObj.fieldEmbed, clazz, 'field')
		const dataObjEmbed = required(
			token.state.dataManager?.getDataObj(field.dataObjIdEmbed),
			clazz,
			'dataObjEmbed'
		)

		// required(field.dataObj, clazz, 'fieldDataObj')
		const dataObjParent = required(
			token.state.dataManager?.getDataObj(field.dataObjIdParent),
			clazz,
			'dataObjParent'
		)
		const dataObjParentRootTable = required(
			dataObjParent.rootTable,
			clazz,
			'dataObjParentRootTable'
		)

		const stateModal = new StateSurfaceModalEmbed({
			actionsFieldDialog: field.fieldEmbedListConfig?.rawActionsFieldModal,
			app: this.app,
			embedParentId: token.state.dataManager?.getRecordId(field.dataObjIdParent, 0),
			embedType: field.embedType,
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true,
				isRowStatus: true
			},
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.fieldEmbedListConfig?.dataObjModalId,
						parent: new RawDataObjParent({
							_columnName: field.embedFieldNameRaw,
							_columnIsMultiSelect: true,
							_filterExpr: `.id = <uuid>`,
							_table: dataObjParentRootTable
						})
					}),
					queryType
				})
			}),
			parmsState: new ParmsValues(),
			target: StateTarget.feature
		})

		stateModal.app.addTabModal(dataObjEmbed)
		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(token: TokenAppDo, fModalCloseUpdate: Function) {
		const clazz = `${FILENAME}.openModalEmbedListSelect`

		const field: DataObjDataField = required(token.dataObj.fieldEmbed, clazz, 'field')
		const dataObjEmbed = required(
			token.state.dataManager?.getDataObj(field.dataObjIdEmbed),
			clazz,
			'dataObjEmbed'
		)
		const dataObjParent = required(
			token.state.dataManager?.getDataObj(field.dataObjIdParent),
			clazz,
			'dataObjParent'
		)
		const dataObjParentRootTable = required(
			dataObjParent.rootTable,
			clazz,
			'dataObjParentRootTable'
		)

		// parms
		const parmsState = new ParmsValues(dataObjEmbed.data.getParms())
		parmsState.update(dataObjEmbed.data.parms.valueGetAll())
		parmsState.valueSet(ParmsValuesType.embedFieldName, field.embedFieldName)
		parmsState.valueSetList(
			ParmsValuesType.listIdsSelected,
			token.dataObj.data.rowsRetrieved.getRows()
		)

		const stateModal = new StateSurfaceModalEmbed({
			actionsFieldDialog: field.fieldEmbedListSelect?.rawActionsFieldModal,
			app: this.app,
			embedParentId: token.state.dataManager?.getRecordId(field.dataObjIdParent, 0),
			embedType: field.embedType,
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true
			},
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.fieldEmbedListSelect?.dataObjListID,
						parent: new RawDataObjParent({
							_columnName: field.embedFieldNameRaw,
							_columnIsMultiSelect: true,
							_filterExpr: '.id = <parms,uuid,embedParentId>',
							_table: dataObjParentRootTable
						})
					}),
					queryType: TokenApiQueryType.retrieve
				})
			}),
			parmsState,
			stateRoot: token.state
		})

		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalSelect(token: TokenAppModalSelect) {
		const parmsState = new ParmsValues({})

		parmsState.valueSet(ParmsValuesType.columnDefs, token.columnDefs)
		parmsState.valueSet(ParmsValuesType.gridColumnId, token.gridColumnId)
		parmsState.valueSet(ParmsValuesType.selectLabel, token.selectLabel)
		parmsState.valueSet(ParmsValuesType.listIdsSelected, token.listIdsSelected)
		parmsState.valueSet(ParmsValuesType.listSortModel, token.sortModel)
		parmsState.valueSet(ParmsValuesType.isMultiSelect, token.isMultiSelect)
		parmsState.valueSet(ParmsValuesType.rowData, token.rowData)

		const stateModal = new StateSurfaceModal({
			actionsFieldDialog: await this.getActions('doag_dialog_footer_list'),
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				headerText: `Select Value${token.isMultiSelect ? '(s)' : ''} For: ${token.selectLabel}`
			},
			packet: new StatePacket({
				action: StatePacketAction.modalSelectSurface,
				token
			}),
			parmsState,
			target: StateTarget.feature
		})

		await this.openModal(stateModal, token.fModalClose)
	}

	openToast(type: ToastType, message: string) {
		const background = {
			success: 'variant-filled-secondary',
			warning: 'variant-filled-warning',
			error: 'variant-filled-error'
		}
		const t: ToastSettings = {
			background: background[type],
			message
		}
		this.storeToast.trigger(t)
	}

	async resetUser(loadHome: boolean) {
		if (this.user) {
			if (loadHome) {
				this.change({
					page: '/home',
					nodeType: NodeType.home,
					packet: this.packet
				})
			}
		}
	}

	setDataManager(dataManager: DataManager) {
		this.dataManager = dataManager
	}

	setDataObjState(dataObj: DataObj) {
		this.dataObjState = dataObj
	}

	setfChangeCallback(f: Function) {
		this.fChangeCallback = f
	}
}

export enum StateLayoutComponent {
	layoutApp = 'layoutApp',
	layoutContent = 'layoutContent',
	layoutProcess = 'layoutProcess',
	layoutSelectMulti = 'layoutSelectMulti',
	layoutTab = 'layoutTab'
}

export class StateLayoutHeader {
	headerText?: string
	isDataObj: boolean
	isDrawerClose: boolean
	isRowStatus: boolean
	constructor(obj: any) {
		const clazz = 'StateLayoutHeader'
		obj = valueOrDefault(obj, {})
		this.headerText = strOptional(obj.headerText, clazz, 'headerText')
		this.isDataObj = booleanOrFalse(obj.isDataObj, 'isDataObj')
		this.isDrawerClose = booleanOrFalse(obj.isDrawerClose, 'isDrawerClose')
		this.isRowStatus = booleanOrFalse(obj.isRowStatus, 'isRowStatus')
	}
}
export class StatePacket {
	action: StatePacketAction
	token?: Token
	constructor(obj: any) {
		const clazz = 'StatePacket'
		obj = valueOrDefault(obj, {})
		this.action = required(obj.action, clazz, 'action')
		this.token = valueOrDefault(obj.token, undefined)
	}
}
export enum StatePacketAction {
	// dataObj
	doDetailDelete = 'doDetailDelete',
	doDetailMigrate = 'doDetailMigrate',
	doDetailNew = 'doDetailNew',
	doDetailProcessExecute = 'doDetailProcessExecute',
	doDetailSave = 'doDetailSave',
	doDetailSaveAs = 'doDetailSaveAs',

	doEmbedListConfigEdit = 'doEmbedListConfigEdit',
	doEmbedListConfigNew = 'doEmbedListConfigNew',
	doEmbedListEditParmValue = 'doEmbedListEditParmValue',
	doEmbedListSelect = 'doEmbedListSelect',

	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',

	doOpen = 'doOpen',
	doSaveCancel = 'doSaveCancel',

	embedField = 'embedField',
	embedShell = 'embedShell',

	gridDownload = 'gridDownload',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalEmbed = 'modalEmbed',
	modalSelectOpen = 'modalSelectOpen',
	modalSelectSurface = 'modalSelectSurface',

	// nav
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navMenuOpen = 'navMenuOpen',
	navRow = 'navRow',
	navTab = 'navTab',
	openNode = 'openNode',
	none = 'none'
}

export class StateSurfaceEmbed extends State {
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbed'
		super(obj)
	}
}

export class StateSurfaceEmbedField extends StateSurfaceEmbed {
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbedField'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.nodeType = NodeType.object
		this.packet = new StatePacket({
			action: StatePacketAction.embedField,
			token: new TokenApiQuery(
				required(obj.queryType, clazz, 'queryType'),
				required(obj.dataObjSource, clazz, 'dataObjSource'),
				new TokenApiQueryData({ dataObjData: obj.data, user: this.user })
			)
		})
	}
}

export class StateSurfaceEmbedShell extends StateSurfaceEmbed {
	embedField: FieldEmbedShell

	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbedShell'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjState = required(obj.dataObjState, clazz, 'dataObjState')
		this.embedField = required(obj.embedField, clazz, 'embedField')
		this.nodeType = NodeType.object
	}
}

export class StateSurfaceModal extends State {
	actionsFieldDialog: DataObjActionField[] = []
	constructor(obj: any) {
		const clazz = 'StateSurfaceModal'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsFieldDialog = valueOrDefault(obj.actionsFieldDialog, [])
	}
}

export class StateSurfaceModalEmbed extends StateSurfaceModal {
	embedParentId: string
	embedType: FieldEmbedType
	constructor(obj: any) {
		const clazz = 'StateSurfaceModalEmbed'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
	}
}

export enum StateTarget {
	dashboard = 'dashboard',
	feature = 'feature',
	page = 'page'
}
