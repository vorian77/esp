import { App } from '$comps/app/types.app'
import { required, strRequired, valueOrDefault } from '$utils/utils'
import {
	debug,
	DataObj,
	DataObjCardinality,
	DataObjConfirm,
	DataObjEmbedType,
	DataObjStatus,
	type DataRecord,
	initNavTree,
	ParmsValuesState,
	NodeType,
	ParmsUser,
	type ToastType,
	User,
	userInit,
	ParmsUserParmType,
	ParmsObjType
} from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppDoActionConfirmType,
	TokenAppDoActionFieldType,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType
} from '$utils/types.token'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
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
	parmsState: ParmsValuesState = new ParmsValuesState()
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
	consume(components: StatePacketComponent | Array<StatePacketComponent>) {
		if (this.packet && this.packet.component && components.includes(this.packet.component)) {
			const packet = this.packet
			this.packet = undefined
			return packet
		} else {
			return undefined
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

	async openModal(state: State, fUpdate?: Function) {
		state.updateProperties({
			storeDrawer: this.storeDrawer,
			storeModal: this.storeModal,
			storeToast: this.storeToast
		})
		new Promise<any>((resolve) => {
			const modalSettings: ModalSettings = {
				type: 'component',
				component: 'baseLayoutModal',
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
						modalReturn.data instanceof ParmsValuesState
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

		const state = new StateSurfaceModal({
			actionsFieldDialog: field.actionsFieldModal,
			app: this.app,
			embedParentId: field.embedParentId,
			embedType: DataObjEmbedType.listConfig,
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.overlayModalDetail,
			parmsState: new ParmsValuesState(),
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
		})
		state.app.addTabModal(fieldDataObj)
		await this.openModal(state, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(token: TokenAppDo, fModalCloseUpdate: Function) {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const field: FieldEmbedListSelect = required(token.fieldEmbed, clazz, 'field')
		const fieldDataObj = required(field.dataObj, clazz, 'fieldDataObj')
		const rootTable = required(this?.dataObjState?.rootTable, clazz, 'rootTable')

		// parms
		const parmsState = new ParmsValuesState(fieldDataObj.data.getParms())
		parmsState.dataUpdate(fieldDataObj.data.parmsState.valueGetAll())
		parmsState.valueSet(ParmsObjType.embedFieldName, field.colDO.propName)
		parmsState.valueSetList(
			ParmsObjType.listRecordIdSelected,
			token.dataObj.data.rowsRetrieved.getRows()
		)

		const state = new StateSurfaceModal({
			actionsFieldDialog: field.actionsFieldModal,
			embedParentId: field.embedParentId,
			embedType: DataObjEmbedType.listSelect,
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle: StateLayoutStyle.overlayModalSelect,
			parmsState,
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
		})
		await this.openModal(state, fModalCloseUpdate)
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
	layoutTab = 'layoutTab'
}

export enum StateLayoutStyle {
	dataObjTab = 'dataObjTab',
	embeddedField = 'embeddedField',
	overlayDrawerDetail = 'overlayDrawerDetail',
	overlayModalDetail = 'overlayModalDetail',
	overlayModalSelect = 'overlayModalSelect',
	overlayModalWizard = 'overlayModalWizard'
}
export class StatePacket {
	confirm: DataObjConfirm
	confirmType: TokenAppDoActionConfirmType | undefined
	component: StatePacketComponent
	token?: Token
	constructor(obj: any) {
		const clazz = 'StatePacket'
		obj = valueOrDefault(obj, {})
		this.component = Object.hasOwn(obj, 'component') ? obj.component : undefined
		this.confirm = valueOrDefault(obj.confirm, new DataObjConfirm())
		this.confirmType = required(obj.confirmType, clazz, 'confirmType')
		this.token = valueOrDefault(obj.token, undefined)
	}
}
export enum StatePacketComponent {
	dataObj = 'dataObj',
	embedField = 'embedField',
	modal = 'modal',
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navHome = 'navHome',
	navRow = 'navRow',
	navTree = 'navTree'
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
			component: StatePacketComponent.embedField,
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
	embedParentId: string
	embedType: DataObjEmbedType
	headerDialog: string
	constructor(obj: any) {
		const clazz = 'StateSurfaceModal'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsFieldDialog = valueOrDefault(obj.actionsFieldDialog, [])
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
		this.headerDialog = valueOrDefault(obj.headerDialog, '')
		this.packet = new StatePacket({
			component: StatePacketComponent.modal,
			confirmType: TokenAppDoActionConfirmType.none,
			token: required(obj.token, clazz, 'token')
		})
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
