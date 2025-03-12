import { App } from '$comps/app/types.app.svelte'
import { required, strRequired, valueOrDefault } from '$utils/utils'
import {
	booleanOrFalse,
	booleanRequired,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjAction,
	type DataRecord,
	ParmsValues,
	ParmsValuesType,
	NodeType,
	ResponseBody,
	strOptional,
	ToastType,
	User
} from '$utils/types'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiFetchError,
	TokenApiId,
	TokenApiQueryType,
	TokenAppDoQuery,
	TokenAppDo,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalSelect,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { FieldEmbedType } from '$comps/form/field.svelte'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { RawDataObjAction, RawDataObjParent } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Toast,
	type DrawerSettings,
	type ModalSettings,
	type ToastSettings
} from '@skeletonlabs/skeleton'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import fActionsClassCustom from '$enhance/actions/actionsClassCustom'
import fActionsClassDo from '$enhance/actions/actionsClassDo'
import fActionsClassDoFieldAuth from '$enhance/actions/actionsClassAuth'
import fActionsClassModal from '$enhance/actions/actionsClassModal'
import fActionsClassNav from '$enhance/actions/actionsClassNav'
import fActionsClassUtils from '$enhance/actions/actionsClassUtils'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class State {
	app: App = $state(new App())
	dm: DataManager
	dataObjState?: DataObj
	fActions: Record<string, Function> = {}
	fChangeCallback?: Function
	isDevMode: boolean = false

	// old
	nodeType: NodeType = NodeType.home

	navContent?: StateNavContent = $state()
	navHeader: StateNavHeader = new StateNavHeader({})
	navLayout?: StateNavLayout = $state()
	navLayoutParms?: DataRecord = $state()
	navPage: string
	parmsState: ParmsValues = new ParmsValues()
	parmsTrans: ParmsValues = new ParmsValues()
	stateRoot?: State
	storeDrawer: any
	storeModal: any
	storeToast: any
	triggerTokens: StateTriggerToken[] = $state([])
	user?: User = $state()
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.dm = new DataManager(this)
		this.fActions = this.loadActions()
		this.navPage = strRequired(obj.navPage, clazz, 'navPage')
		this.change(obj)
	}

	change(obj: DataRecord) {
		this.app = this.changeParm(obj, 'app', this.app)
		this.fChangeCallback = this.changeParm(obj, 'fChangeCallback', this.fChangeCallback)
		this.isDevMode = this.changeParm(obj, 'isDevMode', this.isDevMode)
		this.navContent = this.changeParm(obj, 'navContent', this.navContent)
		this.navLayout = this.changeParm(obj, 'navLayout', this.navLayout)
		this.navLayoutParms = this.changeParm(obj, 'navLayoutParms', this.navLayoutParms)
		this.navPage = this.changeParm(obj, 'navPage', this.navPage)
		this.nodeType = this.changeParm(obj, 'nodeType', this.nodeType)
		this.stateRoot = this.changeParm(obj, 'stateRoot', this.stateRoot)
		this.storeDrawer = this.changeParm(obj, 'storeDrawer', this.storeDrawer)
		this.storeModal = this.changeParm(obj, 'storeModal', this.storeModal)
		this.storeToast = this.changeParm(obj, 'storeToast', this.storeToast)
		this.user = this.changeParm(obj, 'user', this.user)

		if (Object.hasOwn(obj, 'navHeader')) this.navHeader = new StateNavHeader(obj.navHeader)
		if (Object.hasOwn(obj, 'parmsState')) this.parmsState.update(obj?.parmsState?.data)

		this.triggerTokens = valueOrDefault(obj.triggerTokens, [])

		if (this.fChangeCallback) this.fChangeCallback(obj)
	}
	changeParm(obj: any, key: string, defaultValue: any) {
		return Object.hasOwn(obj, key) ? obj[key] : defaultValue
	}
	async changeUserAction(parmsAction: TokenAppStateTriggerAction) {
		this.parmsTrans = parmsAction.transParms
		this.change({
			...parmsAction.stateParms.data,
			triggerTokens: parmsAction.stateParms.triggerTokens
		})
		if (parmsAction.fCallback) await parmsAction.fCallback()
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
		const actionGroup = await apiFetchFunction(
			ApiFunction.dbGelGetDataObjActionGroup,
			new TokenApiFetchError(
				FILENAME,
				'getActions',
				`Error retrieving data object action field group: ${fieldGroupName}`
			),
			new TokenApiId(fieldGroupName)
		)

		return actionGroup._dataObjActions.map((doa: any) => {
			const rawAction = new RawDataObjAction(doa)
			return new DataObjAction(rawAction)
		})
	}

	getTasksDash(fCallBack: Function) {
		this.newApp({ isMultiTree: true })
		return this.user ? this.user.getTasksDash(fCallBack) : []
	}

	loadActions() {
		let fActions: Record<string, Function> = {}
		for (const key of Object.keys(CodeActionClass)) {
			switch (key) {
				case CodeActionClass.ct_sys_code_action_class_custom:
					fActions[key] = fActionsClassCustom
					break

				case CodeActionClass.ct_sys_code_action_class_do:
					fActions[key] = fActionsClassDo
					break

				case CodeActionClass.ct_sys_code_action_class_modal:
					fActions[key] = fActionsClassModal
					break

				case CodeActionClass.ct_sys_code_action_class_do_auth:
					fActions[key] = fActionsClassDoFieldAuth
					break

				case CodeActionClass.ct_sys_code_action_class_nav:
					fActions[key] = fActionsClassNav
					break

				case CodeActionClass.ct_sys_code_action_class_utils:
					fActions[key] = fActionsClassUtils
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

	newApp(parms: DataRecord = {}) {
		this.app = new App(parms)
		this.dm.reset()
	}

	async openDrawer(
		id: string,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined,
		meta: DataRecord
	) {
		const sm = required(meta.sm, 'State.openDrawer', 'meta.sm')
		const settings: DrawerSettings = { id, position, height, width, meta }
		this.storeDrawer.open(settings)
	}

	async openDrawerDataObj(
		id: string,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined,
		token: TokenAppDoQuery
	) {
		const stateModal = new StateSurfacePopup(this, {
			navHeader: {
				isDataObj: true,
				isDrawerClose: true
			}
		})
		await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doOpen
				),
				data: { token },
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		this.openDrawer(id, position, height, width, {
			sm: stateModal,
			onCloseDrawer: async () => {
				await this.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.navHome
						)
					})
				)
			}
		})
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

	async openModalDataObj(token: TokenAppDoQuery, fUpdate?: Function) {
		const clazz = `${FILENAME}.openModalDataObj`
		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_detail'),
			navHeader: { isDataObj: true }
		})
		await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doOpen
				),
				data: { token },
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
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
			this.dm.getDataObj(fieldEmbed.dataObjIdParent),
			clazz,
			'dataObjParent'
		)
		const dataObjParentRootTable = fieldEmbed.parentTable

		const stateModal = new StateSurfacePopupModalEmbed(this, {
			actionsDialog: fieldEmbed.actionsModal,
			app: this.app,
			embedParentId: this.dm.getRecordId(fieldEmbed.dataObjIdParent, 0),
			embedType: fieldEmbed.embedType,
			navHeader: {
				isDataObj: true,
				isRowStatus: true
			},
			stateRoot: this
		})

		stateModal.app.virtualModalLevelAdd(dataObjEmbed)

		await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalOpenEmbedFieldLevel
				),
				data: {
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
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)

		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(token: TokenAppDo, fModalCloseUpdate: Function) {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListSelect = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')

		const dataObjParent = required(
			this.dm.getDataObj(fieldEmbed.dataObjIdParent),
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

		const stateModal = new StateSurfacePopupModalEmbed(this, {
			actionsDialog: fieldEmbed.actionsModal,
			embedParentId: this.dm.getRecordId(fieldEmbed.dataObjIdParent, 0),
			embedType: fieldEmbed.embedType,
			navHeader: { isDataObj: true },
			parmsState,
			stateRoot: this
		})
		await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalOpenEmbedFieldTree
				),
				data: {
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
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)

		await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalSelect(token: TokenAppModalSelect) {
		const parmsState = new ParmsValues({})
		parmsState.valueSet(ParmsValuesType.columnDefs, token.columnDefs)
		parmsState.valueSet(ParmsValuesType.selectLabel, token.selectLabel)
		parmsState.valueSet(ParmsValuesType.listIdsSelected, token.listIdsSelected)
		parmsState.valueSet(ParmsValuesType.listSortModel, token.sortModel)
		parmsState.valueSet(ParmsValuesType.isMultiSelect, token.isMultiSelect)
		parmsState.valueSet(ParmsValuesType.rowData, token.rowData)

		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_list'),
			navContent: StateNavContent.ModalSelect,
			navHeader: {
				headerText: `Select Value${token.isMultiSelect ? '(s)' : ''} For: ${token.selectLabel}`
			},
			navLayout: StateNavLayout.layoutContent,
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
				await this.triggerAction(
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

export enum StateNavContent {
	FormDetail = 'FormDetail',
	FormDetailReportConrig = 'FormDetailReportConrig',
	FormList = 'FormList',
	ModalSelect = 'ModalSelect'
}

export class StateNavHeader {
	headerText?: string
	isDataObj: boolean
	isDrawerClose: boolean
	isRowStatus: boolean
	constructor(obj: any) {
		const clazz = 'StateNavHeader'
		obj = valueOrDefault(obj, {})
		this.headerText = obj.headerText
		this.isDataObj = booleanOrFalse(obj.isDataObj)
		this.isDrawerClose = booleanOrFalse(obj.isDrawerClose)
		this.isRowStatus = booleanOrFalse(obj.isRowStatus)
	}
}

export enum StateNavLayout {
	layoutApp = 'layoutApp',
	layoutContent = 'layoutContent',
	layoutDashboard = 'layoutDashboard',
	layoutProcess = 'layoutProcess',
	layoutTab = 'layoutTab'
}

export class StateParms {
	data: DataRecord = {}
	triggerTokens: StateTriggerToken[] = []
	constructor(data: DataRecord, triggerTokens: StateTriggerToken[] = []) {
		const clazz = 'StateParms'
		this.data = data
		this.triggerTokens = triggerTokens
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
		obj.navPage = stateParent.navPage
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsDialog = valueOrDefault(obj.actionsDialog, [])
		this.storeDrawer = stateParent.storeDrawer
		this.storeModal = stateParent.storeModal
		this.storeToast = stateParent.storeToast
		this.user = stateParent.user
	}
}

export class StateSurfacePopupModalEmbed extends StateSurfacePopup {
	embedParentId: string
	embedType: FieldEmbedType
	constructor(stateParent: State, obj: any) {
		const clazz = 'StateSurfacePopupModalEmbed'
		super(stateParent, obj)
		obj = valueOrDefault(obj, {})
		this.embedParentId = strRequired(obj.embedParentId, clazz, 'embedParentId')
		this.embedType = required(obj.embedType, clazz, 'embedType')
	}
}

export enum StateTriggerToken {
	listDownload = 'listDownload',
	menuClose = 'menuClose',
	navDashboard = 'navDashboard'
}
