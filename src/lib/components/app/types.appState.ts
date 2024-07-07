import { App } from '$comps/app/types.app'
import { required, valueOrDefault } from '$utils/utils'
import {
	debug,
	DataObj,
	DataObjActionField,
	DataObjCardinality,
	DataObjConfirm,
	DataObjData,
	DataObjStatus,
	type DataRecord,
	FieldValue,
	getArray,
	initNavTree,
	MetaData,
	NodeType,
	type ToastType,
	User,
	userInit,
	ValidityError
} from '$utils/types'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppModalEmbed,
	TokenAppDoActionConfirmType,
	TokenAppDoActionFieldType,
	TokenAppModalReturn,
	TokenAppModalReturnType
} from '$utils/types.token'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class DataObjParm {
	id: string
	parm: string
	value: any
	constructor(id: string, parm: string, value: any) {
		this.id = id
		this.parm = parm
		this.value = value
	}
}

export class DataObjParms {
	parms: DataObjParm[] = []
	constructor() {}
	parmGet(id: string, parm: string) {
		let idx = this.parms.findIndex((p) => p.id === id && p.parm === parm)
		return idx > -1 ? this.parms[idx].value : undefined
	}
	parmSet(id: string, parm: string, value: any) {
		let idx = this.parms.findIndex((p) => p.id === id && p.parm === parm)
		if (idx > -1) {
			this.parms[idx].value = value
		} else {
			this.parms.push(new DataObjParm(id, parm, value))
		}
	}
	reset() {
		this.parms = []
	}
}

export class State {
	actionProxies: StateActionProxy[] = []
	app: App = new App()
	dataObjParms: DataObjParms = new DataObjParms()
	dataQuery: MetaData = new MetaData()
	layoutComponent: StateLayoutComponentType = StateLayoutComponentType.layoutContent
	layoutStyle: StateLayoutStyle = StateLayoutStyle.dataObjTab
	modes: StateMode[] = []
	nodeType: NodeType = NodeType.home
	objStatus: DataObjStatus = new DataObjStatus()
	packet: StatePacket | undefined
	page = '/home'
	storeDrawer: any
	storeModal: any
	storeToast: any
	updateCallback?: Function
	updateFunction: Function = stateUpdate
	user: User | undefined = undefined
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.actionProxies = (() => {
			const proxies = getArray(obj.actionProxies)
			return proxies.map((p) => new StateActionProxy(p.actionType, p.proxy))
		})()
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
	modeAdd(mode: StateMode) {
		if (!this.modes.includes(mode)) this.modes.push(mode)
	}
	modeActive(mode: StateMode) {
		return this.modes.includes(mode)
	}
	modeDrop(mode: StateMode) {
		this.modes = this.modes.filter((m) => m !== mode)
	}
	modeReset() {
		this.modes = []
	}

	newApp() {
		this.app = new App()
		this.dataObjParms.reset()
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
			state: new StateSurfaceEmbed({
				cardinality: DataObjCardinality.detail,
				dataObjSource,
				layoutComponent: StateLayoutComponentType.layoutContent,
				layoutStyle: StateLayoutStyle.overlayDrawerDetail,
				queryType
			})
		})
	}

	async openModal(state: State, fUpdate: Function = () => {}) {
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
				response: (r: any) => {
					resolve(r)
				}
			}
			state.storeModal.trigger(modalSettings)
		}).then((response) => {
			if (response && response !== false) {
				const modalReturn = response as TokenAppModalReturn
				if (
					modalReturn.type === TokenAppModalReturnType.complete &&
					modalReturn.data instanceof MetaData
				) {
					fUpdate(TokenAppModalReturnType.complete, modalReturn.data)
				} else {
					fUpdate(TokenAppModalReturnType.cancel)
				}
			} else {
				fUpdate(TokenAppModalReturnType.cancel)
			}
		})
	}

	async openModalEmbed(
		actionsFieldDialog: DataObjActionField[],
		cardinality: DataObjCardinality,
		dataObjSourceEmbed: TokenApiDbDataObjSource,
		dataObjSourceModal: TokenApiDbDataObjSource,
		layoutStyle: StateLayoutStyle,
		parms: DataRecord,
		queryType: TokenApiQueryType,
		fUpdate: Function
	) {
		const state = new StateSurfaceModal({
			actionsFieldDialog,
			cardinality,
			layoutComponent: StateLayoutComponentType.layoutContent,
			layoutStyle,
			parms,
			token: new TokenAppModalEmbed({ dataObjSourceEmbed, dataObjSourceModal, queryType })
		})
		this.openModal(state, fUpdate)
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

	proxyGet(actionType: TokenAppDoActionFieldType) {
		const idx = this.actionProxies.findIndex((p) => p.actionType === actionType)
		return idx > -1 ? this.actionProxies[idx].proxy : undefined
	}

	resetState() {
		this.objStatus.reset()
		this.modeReset()
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

	setStatusChanged(dataObj: DataObj) {
		return this.objStatus.setChanged(dataObj.getStatusChanged())
	}
	setStatusChangedEmbedded(dataObj: DataObj) {
		return this.objStatus.setChangedEmbedded(dataObj.getStatusChangedEmbedded())
	}
	setStatusValid(dataObj: DataObj) {
		return this.objStatus.setValid(
			dataObj.dataFieldValidities.values.every(
				(fieldValue: FieldValue) => fieldValue.value.error === ValidityError.none
			)
		)
	}
	setStatusValidPre(dataObj: DataObj, isListEdit: boolean) {
		this.objStatus.setValid(dataObj.preValidate(isListEdit))
	}

	setUpdateCallback(updateCallback: Function) {
		this.updateCallback = updateCallback
	}
	update(obj: any) {
		if (this.updateFunction) this.updateFunction(this, obj, this.updateCallback)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'layoutComponent')) this.layoutComponent = obj.layoutComponent
		if (Object.hasOwn(obj, 'layoutStyle')) this.layoutStyle = obj.layoutStyle
		if (Object.hasOwn(obj, 'modes')) this.modes = obj.modes.map((m: StateMode) => m)
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'packet')) this.packet = obj.packet
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'parms')) this.dataQuery.dataInit(obj.parms)
		if (Object.hasOwn(obj, 'storeDrawer')) this.storeDrawer = obj.storeDrawer
		if (Object.hasOwn(obj, 'storeModal')) this.storeModal = obj.storeModal
		if (Object.hasOwn(obj, 'storeToast')) this.storeToast = obj.storeToast
		if (Object.hasOwn(obj, 'updateCallback')) this.updateCallback = obj.updateCallback
		if (Object.hasOwn(obj, 'user')) this.user = obj.user

		return this
	}
}

export class StateActionProxy {
	actionType: TokenAppDoActionFieldType
	proxy: Function
	constructor(actionType: TokenAppDoActionFieldType, proxy: Function) {
		this.actionType = actionType
		this.proxy = proxy
	}
}

export enum StateLayoutComponentType {
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

export enum StateMode {
	ParentObjectSaved = 'ParentObjectSaved',
	ReorderOn = 'ReorderOn'
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
	dataObjFieldEmbedded = 'dataObjFieldEmbedded',
	modal = 'modal',
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navHome = 'navHome',
	navRow = 'navRow',
	navTab = 'navTab',
	navTree = 'navTree'
}

export class StateSurfaceEmbed extends State {
	parentSetChangedEmbedded?: Function
	parentSetStatusValid?: Function
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbed'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.nodeType = NodeType.object
		this.packet = new StatePacket({
			component: StatePacketComponent.dataObjFieldEmbedded,
			confirmType: TokenAppDoActionConfirmType.none,
			token: new TokenApiQuery(
				required(obj.queryType, clazz, 'queryType'),
				required(obj.dataObjSource, clazz, 'dataObjSource'),
				new TokenApiQueryData({
					dataObjData: obj.data
						? obj.data
						: new DataObjData(required(obj.cardinality, clazz, 'cardinality'))
				})
			)
		})
		this.parentSetChangedEmbedded = obj.parentSetChangedEmbedded
		this.parentSetStatusValid = obj.parentSetStatusValid
	}
	setStatusChanged(dataObj: DataObj): boolean {
		const status = super.setStatusChanged(dataObj)
		if (this.parentSetChangedEmbedded) this.parentSetChangedEmbedded(status)
		return status
	}
	setStatusValid(dataObj: DataObj) {
		const status = super.setStatusValid(dataObj)
		if (this.parentSetStatusValid) this.parentSetStatusValid(status)
		return status
	}
}

export class StateSurfaceModal extends State {
	actionsFieldDialog: DataObjActionField[] = []
	cardinality: DataObjCardinality
	headerDialog: string
	constructor(obj: any) {
		const clazz = 'StateSurfaceModal'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsFieldDialog = valueOrDefault(obj.actionsFieldDialog, [])
		this.cardinality = required(obj.cardinality, clazz, 'cardinality')
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
