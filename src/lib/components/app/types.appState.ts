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
	NodeType,
	ParmsUser,
	type ToastType,
	User,
	userInit,
	ParmsValuesType
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
	TokenAppModalMultiSelect,
	TokenAppModalReturn,
	TokenAppModalReturnType
} from '$utils/types.token'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjActionField, RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { ResponseBody } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class State {
	app: App = new App()
	data?: DataObj
	dataObjState?: DataObj
	layoutComponent: StateLayoutComponentType = StateLayoutComponentType.layoutContent
	layoutStyle: StateLayoutStyle = StateLayoutStyle.dataObjTab
	nodeType: NodeType = NodeType.home
	objStatus: DataObjStatus = new DataObjStatus()
	packet?: StatePacket
	page = '/home'
	parmsState: ParmsValues = new ParmsValues()
	parmsUser: ParmsUser = new ParmsUser()
	storeDrawer: any
	storeModal: any
	storeToast: any
	updateCallback?: Function
	updateFunction: Function = stateUpdate
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
				layoutComponent: StateLayoutComponentType.layoutContent,
				layoutStyle: StateLayoutStyle.overlayDrawerDetail,
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
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.overlayModalDetail,
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				confirmType: TokenAppDoActionConfirmType.none,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.raw.dataObjModalId,
						parent: new RawDataObjParent({
							_columnName: field.colDO.propName,
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
			ParmsValuesType.listRecordIdSelected,
			token.dataObj.data.rowsRetrieved.getRows()
		)

		const stateModal = new StateSurfaceModalEmbed({
			actionsFieldDialog: field.actionsFieldModal,
			embedParentId: field.embedParentId,
			embedType: DataObjEmbedType.listSelect,
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.overlayModalSelect,
			packet: new StatePacket({
				action: StatePacketAction.modalEmbed,
				confirmType: TokenAppDoActionConfirmType.none,
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: field.raw.dataObjListID,
						parent: new RawDataObjParent({
							_columnName: field.colDO.propName,
							_columnIsMultiSelect: field.colDO.colDB.isMultiSelect,
							_filterExpr: '.id = <parms,uuid,embedParentId>',
							_table: rootTable
						})
					}),
					queryType: TokenApiQueryType.retrieve
				})
			}),
			parmsState
		})

		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalSelectMulti(token: TokenAppModalMultiSelect) {
		const parmsState = new ParmsValues({})
		parmsState.valueSet(ParmsValuesType.modalMultiSelectFieldLabel, token.fieldLabel)
		parmsState.valueSet(ParmsValuesType.modalMultiSelectItemsCurrent, token.itemsCurrent)
		parmsState.valueSet(ParmsValuesType.modalMultiSelectItemsList, token.itemsList)

		const stateModal = new StateSurfaceModal({
			actionsFieldDialog: await this.getActions('doag_dialog_footer_list'),
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.overlayModalSelectMulti,
			packet: new StatePacket({
				action: StatePacketAction.selectMultiModal,
				confirmType: TokenAppDoActionConfirmType.none,
				token
			}),
			parmsState
		})
		await this.openModal(stateModal, token.fModalClose)
	}

	// openMultiSelectModal(this, token.itemsList, token.itemsCurrent, token.fModalClose)

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
	setUpdateCallback(updateCallback: Function) {
		this.updateCallback = updateCallback
	}
	update(obj: any) {
		if (this.updateFunction) this.updateFunction(this, obj, this.updateCallback)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'app')) this.app = obj.app
		if (Object.hasOwn(obj, 'data')) this.data = obj.data
		if (Object.hasOwn(obj, 'layoutComponent')) this.layoutComponent = obj.layoutComponent
		if (Object.hasOwn(obj, 'layoutStyle')) this.layoutStyle = obj.layoutStyle
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'packet')) this.packet = obj.packet
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'parmsState')) this.parmsState = obj.parmsState
		if (Object.hasOwn(obj, 'storeDrawer')) this.storeDrawer = obj.storeDrawer
		if (Object.hasOwn(obj, 'storeModal')) this.storeModal = obj.storeModal
		if (Object.hasOwn(obj, 'storeToast')) this.storeToast = obj.storeToast
		if (Object.hasOwn(obj, 'updateCallback')) this.updateCallback = obj.updateCallback
		if (Object.hasOwn(obj, 'user')) this.user = obj.user

		return this
	}
}
export enum StateLayoutComponentType {
	layoutApp = 'layoutApp',
	layoutContent = 'layoutContent',
	layoutProcess = 'layoutProcess',
	layoutSelectMulti = 'layoutSelectMulti',
	layoutTab = 'layoutTab'
}

export enum StateLayoutStyle {
	dataObjTab = 'dataObjTab',
	embeddedField = 'embeddedField',
	overlayDrawerDetail = 'overlayDrawerDetail',
	overlayModalDetail = 'overlayModalDetail',
	overlayModalSelect = 'overlayModalSelect',
	overlayModalSelectMulti = 'overlayModalSelectMulti'
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

	doExport = 'doExport',

	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',

	embedField = 'embedField',
	embedShell = 'embedShell',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalEmbed = 'modalEmbed',

	// nav
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navRow = 'navRow',
	navTab = 'navTab',
	navTreeNode = 'navTreeNode',
	navTreeNodeId = 'navTreeNodeId',
	navTreeReset = 'navTreeReset',
	navTreeSetParent = 'navTreeSetParent',

	// select-multi
	selectMultiModal = 'selectMultiModal',
	selectMultiOpen = 'selectMultiOpen',

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

export class StateSurfaceModalEmbed extends StateSurfaceModal {
	embedParentId: string
	embedType: DataObjEmbedType
	constructor(obj: any) {
		const clazz = 'StateSurfaceModalEmbed'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
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
	updateFunction: Function,
	updateCallback?: Function
) {
	if (state instanceof StateSurfaceModal) {
		if (confirm(confirmConfig.message)) {
			state.resetState()
			updateFunction(state, obj, updateCallback)
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
					updateFunction(state, obj, updateCallback)
				}
			}
		}
		return state.storeModal.trigger(modal)
	}
}
