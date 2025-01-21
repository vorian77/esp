import { App } from '$comps/app/types.app.svelte'
import { required, strRequired, valueOrDefault } from '$utils/utils'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjAction,
	type DataRecord,
	memberOfEnum,
	ParmsValues,
	ParmsValuesType,
	NodeType,
	ParmsUser,
	ToastType,
	User
} from '$utils/types'
import {
	UserAction,
	UserActionConfirm,
	UserActionConfirmContent,
	UserActionTrigger
} from '$comps/other/types.userAction.svelte'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApp,
	TokenAppDataObjName,
	TokenAppDo,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalSelect,
	TokenAppStateTriggerAction,
	TokenAppUserAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { FieldEmbedType } from '$comps/form/field'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjAction, RawDataObjParent, RawUserAction } from '$comps/dataObj/types.rawDataObj'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { booleanOrFalse, ResponseBody, strOptional } from '$utils/types'
import { page } from '$app/stores'
import { goto } from '$app/navigation'
import fActionsClassDo from '$enhance/actions/actionsClassDo'
import fActionsClassDoFieldAuth from '$enhance/actions/actionsClassDoFieldAuth'
import fActionsClassModal from '$enhance/actions/actionsClassModal'
import fActionsClassNav from '$enhance/actions/actionsClassNav'
import fActionsClassUtils from '$enhance/actions/actionsClassUtils'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class State {
	app: App = $state(new App())
	componentContent?: StateComponentContent
	componentLayout: StateComponentLayout = StateComponentLayout.layoutContent
	data?: DataObj
	dm: DataManager = new DataManager()
	dataObjState?: DataObj
	fActions: Record<string, Function> = {}
	fChangeCallback?: Function
	layoutHeader: StateLayoutHeader = new StateLayoutHeader({})
	nodeType: NodeType = NodeType.home
	packet?: StatePacket = $state()
	page: string
	parmsState: ParmsValues = new ParmsValues()
	parmsUser: ParmsUser = new ParmsUser()
	stateRoot?: State
	storeDrawer: any
	storeModal: any
	storeToast: any
	triggerTokens: StateTriggerToken[] = $state([])
	user?: User
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.fActions = this.loadActions()
		this.page = strRequired(obj.page, clazz, 'page')
		this.change(obj)
		if (obj.triggerAction) this.triggerAction(obj.triggerAction)
	}

	change(obj: DataRecord) {
		if (Object.hasOwn(obj, 'app')) this.app = obj.app
		if (Object.hasOwn(obj, 'componentContent')) this.componentContent = obj.componentContent
		if (Object.hasOwn(obj, 'componentLayout')) this.componentLayout = obj.componentLayout
		if (Object.hasOwn(obj, 'fChangeCallback')) this.fChangeCallback = obj.fChangeCallback
		if (Object.hasOwn(obj, 'data')) this.data = obj.data
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

		this.triggerTokens = valueOrDefault(obj.triggerTokens, [])

		if (this.fChangeCallback) this.fChangeCallback(obj)
	}

	closeModal() {
		this.storeModal.close()
	}

	consumeTriggerToken(triggerToken: StateTriggerToken) {
		if (this.triggerTokens.includes(triggerToken)) {
			this.triggerTokens = this.triggerTokens.filter((t) => t !== triggerToken)
			return true
		} else {
			return false
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
			ApiFunction.dbEdgeGetDataObjActionGroup,
			new TokenApiId(fieldGroupName)
		)
		if (result.success) {
			const actionGroup = result.data
			return actionGroup._dataObjActions.map((doa: any) => {
				const rawAction = new RawDataObjAction(doa)
				return new DataObjAction(rawAction)
			})
		} else {
			error(500, {
				file: FILENAME,
				function: 'getActions',
				message: `Error retrieving data object action field group: ${fieldGroupName}`
			})
		}
	}

	loadActions() {
		let fActions: Record<string, Function> = {}
		for (const key of Object.keys(CodeActionClass)) {
			switch (key) {
				case CodeActionClass.ct_sys_code_action_class_do:
					fActions[key] = fActionsClassDo
					break

				case CodeActionClass.ct_sys_code_action_class_modal:
					fActions[key] = fActionsClassModal
					break

				case CodeActionClass.ct_sys_code_action_class_do_field_auth:
					fActions[key] = fActionsClassDoFieldAuth
					break

				case CodeActionClass.ct_sys_code_action_class_nav:
					fActions[key] = fActionsClassNav
					break

				case CodeActionClass.ct_sys_code_action_class_utils:
					fActions[key] = fActionsClassUtils
					break

				case CodeActionClass.ct_sys_code_action_class_do_embed:
					// unused
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'load action classes',
						message: `No case defined for actionClass: ${key}`
					})
			}
		}
		return fActions
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
		const sm = required(meta.sm, 'State.openDrawer', 'meta.sm')

		sm.changeProperties({
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
		this.change({
			layoutHeader: {
				isDataObj: true,
				isDrawerClose: true
			},
			packet: new StatePacket({
				codeActionType: CodeActionType.doOpen,
				stateTargetObj: StateTriggerToken.componentContentForm,
				token
			})
		})
		this.openDrawer(id, position, height, width, { sm: this })
	}

	async openModal(sm: StateSurfacePopup, fUpdate?: Function) {
		new Promise<any>((resolve) => {
			const modalSettings: ModalSettings = {
				type: 'component',
				component: 'rootLayoutModal',
				meta: { sm },
				response: async (r: any) => {
					resolve(r)
				}
			}
			sm.storeModal.trigger(modalSettings)
		}).then(async (response) => {
			sm.app.virtualModalLevelRestore()
			if (fUpdate) {
				if (response && response !== false) {
					const modalReturn = response as TokenAppModalReturn
					if (modalReturn.type === TokenAppModalReturnType.complete) {
						if (modalReturn.data instanceof ParmsValues) {
							fUpdate(TokenAppModalReturnType.complete, modalReturn.data)
						} else {
							fUpdate(TokenAppModalReturnType.cancel)
						}
					} else {
						fUpdate(modalReturn.type || TokenAppModalReturnType.cancel)
					}
				} else {
					fUpdate(TokenAppModalReturnType.cancel)
				}
			}
		})
	}

	async openModalDataObj(dataObjName: string, fUpdate?: Function) {
		const clazz = `${FILENAME}.openModalDataObj`
		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_detail'),
			layoutHeader: {
				isDataObj: true
			},
			triggerAction: new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doOpen
				),
				token: new TokenAppDataObjName({ dataObjName, queryType: TokenApiQueryType.retrieve })
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
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListConfig = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')

		const dataObjParent = required(
			token.sm.dm?.getDataObj(fieldEmbed.dataObjIdParent),
			clazz,
			'dataObjParent'
		)
		const dataObjParentRootTable = fieldEmbed.parentTable

		const stateModal = new StateSurfaceModalEmbed(this, {
			actionsDialog: fieldEmbed.actionsModal,
			embedParentId: token.sm.dm?.getRecordId(fieldEmbed.dataObjIdParent, 0),
			embedType: fieldEmbed.embedType,
			parmsState: new ParmsValues(),
			layoutHeader: {
				isDataObj: true,
				isRowStatus: true
			}
		})

		stateModal.app.virtualModalLevelAdd(dataObjEmbed)
		stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalEmbed
				),
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: fieldEmbed.dataObjModalId,
						parent: new RawDataObjParent({
							_columnName: fieldEmbed.embedFieldNameRaw,
							_columnIsMultiSelect: true,
							_filterExpr: `.id = <uuid>`,
							_table: dataObjParentRootTable
						})
					}),
					queryType
				})
			})
		)
		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(token: TokenAppDo, fModalCloseUpdate: Function) {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListSelect = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')

		const dataObjParent = required(
			token.sm.dm?.getDataObj(fieldEmbed.dataObjIdParent),
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
		parmsState.valueSet(ParmsValuesType.embedFieldName, fieldEmbed.embedFieldName)
		parmsState.valueSetList(
			ParmsValuesType.listIdsSelected,
			token.dataObj.data.rowsRetrieved.getRows()
		)

		const stateModal = new StateSurfaceModalEmbed(this, {
			actionsDialog: fieldEmbed.actionsModal,
			embedParentId: token.sm.dm?.getRecordId(fieldEmbed.dataObjIdParent, 0),
			embedType: fieldEmbed.embedType,
			layoutHeader: {
				isDataObj: true
			},
			parmsState,
			triggerAction: new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalEmbed
				),
				token: new TokenAppModalEmbedField({
					dataObjSourceModal: new TokenApiDbDataObjSource({
						dataObjId: fieldEmbed.dataObjListID,
						parent: new RawDataObjParent({
							_columnName: fieldEmbed.embedFieldNameRaw,
							_columnIsMultiSelect: true,
							_filterExpr: '.id = <parms,uuid,embedParentId>',
							_table: dataObjParentRootTable
						})
					}),
					queryType: TokenApiQueryType.retrieve
				})
			})
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

		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_list'),
			componentContent: StateComponentContent.ModalSelect,
			layoutHeader: {
				headerText: `Select Value${token.isMultiSelect ? '(s)' : ''} For: ${token.selectLabel}`
			},
			triggerTokens: [StateTriggerToken.homeApp, StateTriggerToken.componentContentCustom],
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

	async resetUser(loadHome: boolean) {
		if (this.user) {
			if (loadHome) {
				this.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.navHome
						),
						codeConfirmType: TokenAppUserActionConfirmType.statusChanged
					})
				)
			}
		}
	}

	setDataObjState(dataObj: DataObj) {
		this.dataObjState = dataObj
	}

	setfChangeCallback(f: Function) {
		this.fChangeCallback = f
	}

	async triggerAction(parms: TokenAppStateTriggerAction) {
		await this.triggerActionValidate(parms, this.fActions[parms.codeAction.actionClass])
	}

	async triggerActionValidate(
		parms: TokenAppStateTriggerAction,
		fCallback: Function | undefined = undefined
	) {
		const codeConfirmType = parms.codeConfirmType
		if (
			codeConfirmType === TokenAppUserActionConfirmType.always ||
			(codeConfirmType === TokenAppUserActionConfirmType.statusChanged && this.dm.isStatusChanged())
		) {
			await this.triggerActionValidateAskB4(parms, fCallback)
		} else {
			if (fCallback) await fCallback(this, parms)
		}
	}

	async triggerActionValidateAskB4(parms: TokenAppStateTriggerAction, fCallback?: Function) {
		if (this instanceof StateSurfacePopup) {
			if (confirm(parms.confirm.message)) {
				discardChanges(this)
			}
		} else {
			const modal: ModalSettings = {
				type: 'confirm',
				title: parms.confirm.title,
				body: parms.confirm.message,
				buttonTextCancel: parms.confirm.buttonLabelCancel,
				buttonTextConfirm: parms.confirm.buttonLabelConfirm,
				response: async (r: boolean) => {
					if (r) {
						discardChanges(this)
					}
				}
			}
			return this.storeModal.trigger(modal)
		}
		function discardChanges(sm: State) {
			parms.codeConfirmType = TokenAppUserActionConfirmType.none
			sm.dm.resetStatus()
			sm.triggerActionValidate(parms, fCallback)
		}
	}
}

export enum StateComponentContent {
	FormDetail = 'FormDetail',
	FormDetailReportConrig = 'FormDetailReportConrig',
	FormList = 'FormList',
	ModalSelect = 'ModalSelect'
}

export enum StateComponentLayout {
	layoutApp = 'layoutApp',
	layoutContent = 'layoutContent',
	layoutProcess = 'layoutProcess',
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
	codeActionType?: CodeActionType
	stateTargetObj?: StateTriggerToken
	token?: Token
	constructor(obj: any) {
		const clazz = 'StatePacket'
		obj = valueOrDefault(obj, {})
		this.codeActionType = obj.codeActionType
		this.stateTargetObj = obj.stateTargetObj
		this.token = obj.token
	}
}

export class StateSurfaceEmbed extends State {
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbed'
		super(obj)
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

export class StateSurfacePopup extends State {
	actionsDialog: DataObjAction[] = []
	constructor(stateParent: State, obj: any) {
		const clazz = 'StateSurfacePopup'
		obj.page = stateParent.page
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsDialog = valueOrDefault(obj.actionsDialog, [])
		this.app = stateParent.app
		this.storeDrawer = stateParent.storeDrawer
		this.storeModal = stateParent.storeModal
		this.storeToast = stateParent.storeToast
		this.user = stateParent.user
	}
}

export class StateSurfaceModalEmbed extends StateSurfacePopup {
	embedParentId: string
	embedType: FieldEmbedType
	constructor(stateParent: State, obj: any) {
		const clazz = 'StateSurfaceModalEmbed'
		super(stateParent, obj)
		obj = valueOrDefault(obj, {})
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
	}
}

export enum StateTriggerToken {
	componentContentCustom = 'componentContentCustom',
	componentContentForm = 'componentContentForm',
	homeApp = 'homeApp',
	homeDashboard = 'dashboard',
	listDownload = 'listDownload'
}
