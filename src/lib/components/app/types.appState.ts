import { App } from '$comps/app/types.app'
import { required, strRequired, valueOrDefault } from '$utils/utils'
import {
	DataObj,
	DataObjCardinality,
	DataObjConfirm,
	DataObjEmbedType,
	DataObjStatus,
	type DataRecord,
	initNavTree,
	ParmsValues,
	ParmsValuesType,
	NodeType,
	ParmsUser,
	ToastType,
	User,
	userInit
} from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppDoActionConfirmType,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalSelect
} from '$utils/types.token'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjActionField, RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { booleanOrFalse, ResponseBody, strOptional } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class State {
	app: App = new App()
	data?: DataObj
	dataObjState?: DataObj
	fClosureSetStatus?: Function
	fUpdateCallback?: Function
	fUpdateFunction: Function = stateUpdate
	layoutComponent: StateLayoutComponent = StateLayoutComponent.layoutContent
	layoutHeader: StateLayoutHeader = new StateLayoutHeader({})
	nodeType: NodeType = NodeType.home
	objStatus: DataObjStatus = new DataObjStatus()
	packet?: StatePacket
	page = '/home'
	parmsState: ParmsValues = new ParmsValues()
	parmsUser: ParmsUser = new ParmsUser()
	storeDrawer: any
	storeModal: any
	storeToast: any

	user?: User
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.updateProperties(obj)
	}

	closeModal() {
		this.storeModal.close()
	}
	consume(actions: StatePacketAction | Array<StatePacketAction>) {
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
		this.downloadUrl(url, title)

		// const link = document.createElement('a')
		// link.href = url
		// link.download =
		// link.click()
		// URL.revokeObjectURL(url)

		this.openToast(ToastType.success, `"${title}" has been downloaded.`)
	}

	downloadUrl(url: string, title: string = '') {
		const link = document.createElement('a')
		link.href = url
		if (title) link.download = title
		link.click()
		URL.revokeObjectURL(url)
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
		const state = required(meta.state, 'State.openDrawer', 'meta.state')
		state.updateProperties({
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
		dataObjSource: TokenApiDbDataObjSource,
		queryType: TokenApiQueryType
	) {
		this.openDrawer(id, position, height, width, {
			state: new StateSurfaceEmbedField({
				cardinality: DataObjCardinality.detail,
				dataObjSource,
				layoutComponent: StateLayoutComponent.layoutContent,
				layoutHeader: {
					isDataObj: true,
					isDrawerClose: true
				},
				queryType
			})
		})
	}

	async openModal(state: StateSurfaceModal, fUpdate?: Function) {
		state.updateProperties({
			storeDrawer: this.storeDrawer,
			storeModal: this.storeModal,
			storeToast: this.storeToast
		})
		new Promise<any>((resolve) => {
			const modalSettings: ModalSettings = {
				type: 'component',
				component: 'rootLayoutModal',
				meta: { state },
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
		const stateModal = new StateSurfaceModalDataObj({
			actionsFieldDialog: await this.getActions('doag_dialog_footer_detail'),
			dataObjName,
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true
			},
			packet: new StatePacket({
				action: StatePacketAction.modalDataObj,
				confirmType: TokenAppDoActionConfirmType.none
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
		const field: FieldEmbedListConfig = required(token.fieldEmbed, clazz, 'field')
		const rootTable = required(this?.dataObjState?.rootTable, clazz, 'rootTable')
		const fieldDataObj = required(field.dataObj, clazz, 'fieldDataObj')

		const stateModal = new StateSurfaceModalEmbed({
			actionsFieldDialog: field.actionsFieldModal,
			app: this.app,
			embedParentId: field.embedParentId,
			embedType: DataObjEmbedType.listConfig,
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true,
				isRowStatus: true
			},
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				confirmType: TokenAppDoActionConfirmType.none,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.raw.dataObjModalId,
						parent: new RawDataObjParent({
							_columnName: field.colDO.propNameRaw,
							_columnIsMultiSelect: true,
							_filterExpr: '.id = <parms,uuid,embedParentId>',
							_table: rootTable
						})
					}),
					queryType
				})
			}),
			parmsState: new ParmsValues()
		})

		stateModal.app.addTabModal(fieldDataObj)
		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(token: TokenAppDo, fModalCloseUpdate: Function) {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const field: FieldEmbedListSelect = required(token.fieldEmbed, clazz, 'field')
		const fieldDataObj = required(field.dataObj, clazz, 'fieldDataObj')
		const rootTable = required(this?.dataObjState?.rootTable, clazz, 'rootTable')

		// parms
		const parmsState = new ParmsValues(fieldDataObj.data.getParms())
		parmsState.update(fieldDataObj.data.parms.valueGetAll())
		parmsState.valueSet(ParmsValuesType.embedFieldName, field.colDO.propName)
		parmsState.valueSetList(
			ParmsValuesType.listIdsSelected,
			token.dataObj.data.rowsRetrieved.getRows()
		)

		const stateModal = new StateSurfaceModalEmbed({
			actionsFieldDialog: field.actionsFieldModal,
			embedParentId: field.embedParentId,
			embedType: DataObjEmbedType.listSelect,
			layoutComponent: StateLayoutComponent.layoutContent,
			layoutHeader: {
				isDataObj: true
			},
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				confirmType: TokenAppDoActionConfirmType.none,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.raw.dataObjListID,
						parent: new RawDataObjParent({
							_columnName: field.colDO.propNameRaw,
							_columnIsMultiSelect: field.colDO.colDB.isMultiSelect,
							_filterExpr: '.id = <parms,uuid,embedParentId>',
							_table: rootTable
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
				confirmType: TokenAppDoActionConfirmType.none,
				token
			}),
			parmsState
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
	resetState() {
		this.objStatus.reset()
		if (this.dataObjState) this.dataObjState.modeReset()
	}
	async resetUser(loadHome: boolean) {
		if (this.user) {
			this.user = await userInit(this.user.id)
			await initNavTree(this.user)
			if (loadHome) {
				this.update({
					page: '/home',
					nodeType: NodeType.home,
					packet: this.packet
				})
			}
		}
	}
	set(packet: StatePacket) {
		this.packet = packet
	}

	setDataObjState(dataObj: DataObj) {
		this.dataObjState = dataObj
	}

	setFClosureSetStatus(f: Function) {
		this.fClosureSetStatus = f
	}
	setFUpdateCallback(f: Function) {
		this.fUpdateCallback = f
	}

	setStatus() {
		if (this.dataObjState) {
			this.objStatus = this.dataObjState.setStatus()
			return this
		} else {
			error(500, {
				file: FILENAME,
				function: 'State.setStatus',
				message: 'No state data object defined.'
			})
		}
	}

	update(obj: any) {
		if (this.fUpdateFunction) this.fUpdateFunction(this, obj, this.fUpdateCallback)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'app')) this.app = obj.app
		if (Object.hasOwn(obj, 'data')) this.data = obj.data
		if (Object.hasOwn(obj, 'layoutComponent')) this.layoutComponent = obj.layoutComponent
		if (Object.hasOwn(obj, 'layoutHeader'))
			this.layoutHeader = new StateLayoutHeader(obj.layoutHeader)
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'packet')) this.packet = obj.packet
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'parmsState')) this.parmsState.update(obj?.parmsState?.data)
		if (Object.hasOwn(obj, 'storeDrawer')) this.storeDrawer = obj.storeDrawer
		if (Object.hasOwn(obj, 'storeModal')) this.storeModal = obj.storeModal
		if (Object.hasOwn(obj, 'storeToast')) this.storeToast = obj.storeToast
		if (Object.hasOwn(obj, 'fUpdateCallback')) this.fUpdateCallback = obj.fUpdateCallback
		if (Object.hasOwn(obj, 'user')) this.user = obj.user

		return this
	}
}

export enum StateLayoutComponent {
	layoutApp = 'layoutApp',
	layoutContent = 'layoutContent',
	layoutProcess = 'layoutProcess',
	layoutSelectMulti = 'layoutSelectMulti',
	layoutTab = 'layoutTab'
}
export enum StateLayoutContent {
	ModalSelect = 'ModalSelect'
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
	confirm: DataObjConfirm
	confirmType: TokenAppDoActionConfirmType | undefined
	token?: Token
	constructor(obj: any) {
		const clazz = 'StatePacket'
		obj = valueOrDefault(obj, {})
		this.action = required(obj.action, clazz, 'action')
		this.confirm = valueOrDefault(obj.confirm, new DataObjConfirm())
		this.confirmType = required(obj.confirmType, clazz, 'confirmType')
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
	doDetailSaveCancel = 'doDetailSaveCancel',

	doEmbedListConfigEdit = 'doEmbedListConfigEdit',
	doEmbedListConfigNew = 'doEmbedListConfigNew',
	doEmbedListEditParmValue = 'doEmbedListEditParmValue',
	doEmbedListSelect = 'doEmbedListSelect',

	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',

	embedField = 'embedField',
	embedShell = 'embedShell',

	gridDownload = 'gridDownload',

	// modal
	modalCancel = 'modalCancel',
	modalDataObj = 'modalDataObj',
	modalDone = 'modalDone',
	modalEmbed = 'modalEmbed',
	modalSelectOpen = 'modalSelectOpen',
	modalSelectSurface = 'modalSelectSurface',

	// nav
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navRow = 'navRow',
	navTab = 'navTab',
	navTreeReset = 'navTreeReset',
	navTreeSetParent = 'navTreeSetParent',
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
			confirmType: TokenAppDoActionConfirmType.none,
			token: new TokenApiQuery(
				required(obj.queryType, clazz, 'queryType'),
				required(obj.dataObjSource, clazz, 'dataObjSource'),
				new TokenApiQueryData({ dataObjData: obj.data })
			)
		})
	}
}

export class StateSurfaceEmbedShell extends StateSurfaceEmbed {
	embedField: FieldEmbedShell
	stateRoot: State
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbedShell'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjState = required(obj.dataObjState, clazz, 'dataObjState')
		this.embedField = required(obj.embedField, clazz, 'embedField')
		this.nodeType = NodeType.object
		this.stateRoot = required(obj.stateRoot, clazz, 'stateRoot')
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

export class StateSurfaceModalDataObj extends StateSurfaceModal {
	dataObjName: string
	constructor(obj: any) {
		const clazz = 'StateSurfaceDataObj'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObjName')
	}
}

export class StateSurfaceModalEmbed extends StateSurfaceModal {
	embedParentId: string
	embedType: DataObjEmbedType
	stateRoot?: State
	constructor(obj: any) {
		const clazz = 'StateSurfaceModalEmbed'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
		this.stateRoot = obj.stateRoot
	}
}

export async function stateUpdate(
	state: State,
	obj: any,
	callback: Function | undefined = undefined
) {
	obj = valueOrDefault(obj, {})
	if (obj?.packet?.confirmType && obj?.packet?.confirm) {
		const confirmType = obj.packet.confirmType
		const confirm = obj.packet.confirm
		if (
			confirmType &&
			(confirmType === TokenAppDoActionConfirmType.always ||
				(confirmType === TokenAppDoActionConfirmType.objectChanged && state.objStatus.changed()))
		) {
			obj.packet.confirmType = undefined
			await askB4Transition(state, obj, confirm, stateUpdate, callback)
		} else {
			if (callback) await callback(obj)
		}
	} else {
		if (callback) await callback(obj)
	}
}

async function askB4Transition(
	state: State,
	obj: any,
	confirmConfig: DataObjConfirm,
	fUpdateFunction: Function,
	fUpdateCallback?: Function
) {
	if (state instanceof StateSurfaceModal) {
		if (confirm(confirmConfig.message)) {
			state.resetState()
			fUpdateFunction(state, obj, fUpdateCallback)
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
					state.resetState()
					fUpdateFunction(state, obj, fUpdateCallback)
				}
			}
		}
		return state.storeModal.trigger(modal)
	}
}
