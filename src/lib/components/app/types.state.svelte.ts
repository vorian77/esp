import { App } from '$comps/app/types.app.svelte'
import { MethodResult, ParmsValuesFormList, required, valueOrDefault } from '$utils/utils'
import {
	booleanOrFalse,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjAction,
	DataObjCardinality,
	type DataRecord,
	ParmsValues,
	ParmsValuesType,
	type ParmsValuesFormListType,
	ToastType,
	User,
	UserParm,
	UserParmItemSource,
	UserParmItemType,
	UserPrefType
} from '$utils/types'
import {
	NavDestinationType,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryDataTree,
	TokenApiQueryDataTreeAccessType,
	TokenApiQueryType,
	TokenAppActionTrigger,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalSelect,
	TokenAppNav,
	TokenAppNode,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
import { QuerySourceParentRaw } from '$lib/queryClient/types.queryClient'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed.svelte'
import { RawDataObjAction } from '$comps/dataObj/types.rawDataObj.svelte'
import { type DrawerSettings, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import fActionsClassCustom from '$enhance/actions/actionsClassCustom'
import fActionsClassDo from '$enhance/actions/actionsClassDo'
import fActionsClassDoFieldAuth from '$enhance/actions/actionsClassAuth'
import fActionsClassModal from '$enhance/actions/actionsClassModal'
import fActionsClassNav from '$enhance/actions/actionsClassNav'
import fActionsClassUtils from '$enhance/actions/actionsClassUtils'
import { Tween } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appState.ts'

export class State {
	app: App = $state(new App())
	dm: DataManager
	dataObjState?: DataObj
	fActions: Record<string, Function> = {}
	fChangeCallback?: Function
	isDevMode: boolean = false
	navContent?: StateNavContent = $state()
	navHeader: StateNavHeader = new StateNavHeader({})
	navLayout?: StateNavLayout = $state()
	navLayoutParms?: DataRecord = $state()
	navMenuData: NavMenuData = $state(new NavMenuData())
	navMenuWidthValue: any = $state(
		new Tween(250, {
			duration: 500,
			easing: cubicOut
		})
	)
	navPage: string
	parmsState: ParmsValues = new ParmsValues()
	parmsTrans: ParmsValues = new ParmsValues()
	stateRoot?: State
	storeDrawer: any
	storeModal: any
	storeToast: any
	triggerKey: number = $state(0)
	triggerSaveValue: number = $state(0)
	triggerTokens: StateTriggerToken[] = $state([])
	user?: User = $state()
	userParm?: UserParm
	constructor(obj: any) {
		const clazz = 'State'
		obj = valueOrDefault(obj, {})
		this.dm = new DataManager(this)
		this.fActions = this.loadActions()
		this.navPage = obj.navPage || '/'
		this.change(obj)
	}

	menuWidthSet(width: number) {
		if (width > 0) {
			this.navMenuWidthValue = new Tween(width, {
				duration: 500,
				easing: cubicOut
			})
		}
	}
	menuWidthToggle() {
		if (this.navMenuWidthValue.current === 250) {
			this.menuWidthSet(70)
		} else {
			this.menuWidthSet(250)
		}
		return this.navMenuWidthValue.current
	}

	change(obj: DataRecord) {
		this.app = this.changeParm(obj, 'app', this.app)
		this.fChangeCallback = this.changeParm(obj, 'fChangeCallback', this.fChangeCallback)
		this.isDevMode = this.changeParm(obj, 'isDevMode', this.isDevMode)
		this.navContent = this.changeParm(obj, 'navContent', this.navContent)
		this.navLayout = this.changeParm(obj, 'navLayout', this.navLayout)
		this.navLayoutParms = this.changeParm(obj, 'navLayoutParms', this.navLayoutParms)
		this.navPage = this.changeParm(obj, 'navPage', this.navPage)
		this.stateRoot = this.changeParm(obj, 'stateRoot', this.stateRoot)
		this.storeDrawer = this.changeParm(obj, 'storeDrawer', this.storeDrawer)
		this.storeModal = this.changeParm(obj, 'storeModal', this.storeModal)
		this.storeToast = this.changeParm(obj, 'storeToast', this.storeToast)
		this.user = this.changeParm(obj, 'user', this.user)

		if (Object.hasOwn(obj, 'navHeader')) this.navHeader = new StateNavHeader(obj.navHeader)
		if (Object.hasOwn(obj, 'parmsState')) this.parmsState.update(obj?.parmsState?.data)

		this.triggerTokens = valueOrDefault(obj.triggerTokens, [])

		if (this.fChangeCallback) this.fChangeCallback(obj)

		this.triggerKey = Math.random()
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
		const result: MethodResult = await apiFetchFunction(
			ApiFunction.dbGelGetDataObjActionGroup,
			new TokenApiId(fieldGroupName)
		)
		const actionGroup = result.data
		return actionGroup._dataObjActions.map((doa: any) => {
			return new DataObjAction(new RawDataObjAction(doa))
		})
	}

	getStateData(isDataTreePresetOffset: boolean = false): TokenApiQueryDataTree {
		const dataTree: TokenApiQueryDataTree = this.stateRoot
			? this.stateRoot.app.getDataTree(isDataTreePresetOffset)
			: this.app.getDataTree(isDataTreePresetOffset)
		return dataTree
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
						msg: `No case defined for actionClass: ${key}`
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
	): Promise<MethodResult> {
		const sm = required(meta.sm, 'State.openDrawer', 'meta.sm')
		const settings: DrawerSettings = { id, position, height, width, meta }
		this.storeDrawer.open(settings)
		return new MethodResult()
	}

	async openDrawerNode(
		token: TokenAppNode,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined
	): Promise<MethodResult> {
		const stateModal = new StateSurfacePopup(this, {
			navHeader: {
				isDataObj: true,
				isDrawerClose: true
			}
		})
		let result: MethodResult = await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.openNode
				),
				data: { token },
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		if (result.error) return result

		return this.openDrawer(token.node.id, position, height, width, {
			sm: stateModal,
			onCloseDrawer: async () => {
				return await this.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.navDestination
						),
						data: {
							token: new TokenAppNav({ _codeDestinationType: NavDestinationType.home })
						}
					})
				)
			}
		})
	}

	async openModal(sm: StateSurfacePopup, fUpdate?: Function): Promise<MethodResult> {
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
					return fUpdate(modalReturn)
				} else {
					return fUpdate(new TokenAppModalReturn({ type: TokenAppModalReturnType.cancel }))
				}
			}
		})
		return new MethodResult()
	}

	async openModalNode(token: TokenAppNode, fUpdate?: Function): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalNode`
		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_detail'),
			navHeader: { isDataObj: true }
		})
		let result: MethodResult = await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.openNode
				),
				data: { token },
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		if (result.error) return result

		return await this.openModal(stateModal, fUpdate)
	}

	async openModalEmbedListConfig(
		token: TokenAppActionTrigger,
		queryType: TokenApiQueryType,
		fModalCloseUpdate: Function
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalEmbedListConfig`
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListConfig = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')
		const parentDataObjTableRoot = fieldEmbed.rawFieldEmbedList.parentTableRoot
		const parentDataObjId = required(fieldEmbed.parentDataObjId, clazz, 'parentDataObj')
		const embedParentId = this.dm.getRecordId(parentDataObjId, 0)

		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: fieldEmbed.actionsModal,
			app: this.app,
			embedParentId,
			embedType: fieldEmbed.colDO.fieldEmbedListType,
			navHeader: {
				isDataObj: true,
				isRowStatus: true
			},
			stateRoot: this
		})

		stateModal.parmsState.valueSet(ParmsValuesType.embedParentId, embedParentId)
		stateModal.parmsState.valueSet(ParmsValuesType.isModalCloseOnEmptyList, true)
		stateModal.app.virtualModalLevelAdd(dataObjEmbed)

		let result: MethodResult = await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalOpenEmbedFieldLevel
				),
				data: {
					token: new TokenAppModalEmbedField({
						dataObjSourceModal: new TokenApiDbDataObjSource({
							dataObjId: fieldEmbed.dataObjModalId,
							parent: new QuerySourceParentRaw({
								_columnName: fieldEmbed.rawFieldEmbedList.embedPropName,
								_columnIsMultiSelect: true,
								_filterExpr: `.id = <uuid>`,
								_table: parentDataObjTableRoot
							})
						}),
						queryType
					})
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		if (result.error) return result

		return await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalEmbedListSelect(
		token: TokenAppActionTrigger,
		fModalCloseUpdate: Function
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListSelect = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')

		const parentDataObjId = required(fieldEmbed.parentDataObjId, clazz, 'parentDataObj')
		const parentDataObj: DataObj = required(
			this.dm.getDataObj(parentDataObjId),
			clazz,
			'dataObjParent'
		)
		const parentDataObjTableRoot = required(
			parentDataObj.raw.tableGroup.getTable(0),
			clazz,
			'dataObjParentRootTable'
		)

		// parms
		const parmsState = new ParmsValues(dataObjEmbed.data.getParms())
		parmsState.update(dataObjEmbed.data.parms.valueGetAll())
		parmsState.valueSet(ParmsValuesType.embedFieldName, fieldEmbed.rawFieldEmbedList.embedPropName)
		parmsState.valueSet(
			ParmsValuesType.listIdsSelected,
			token.dataObj.data.rowsRetrieved.getRowsIds()
		)

		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: fieldEmbed.actionsModal,
			embedParentId: this.dm.getRecordId(parentDataObjId, 0),
			embedType: fieldEmbed.colDO.fieldEmbedListType,
			navHeader: { isDataObj: true },
			parmsState,
			stateRoot: this
		})
		let result = await stateModal.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_modal,
					CodeActionType.modalOpenEmbedFieldTree
				),
				data: {
					token: new TokenAppModalEmbedField({
						dataObjSourceModal: new TokenApiDbDataObjSource({
							dataObjId: fieldEmbed.dataObjListID,
							parent: new QuerySourceParentRaw({
								_columnName: fieldEmbed.rawFieldEmbedList.embedPropName,
								_columnIsMultiSelect: true,
								_filterExpr: '.id = <parms,uuid,embedParentId>',
								_table: parentDataObjTableRoot
							})
						}),
						listIdsSelected: token.dataObj.data.rowsRetrieved.getRowsIds(),
						queryType: TokenApiQueryType.retrieve
					})
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		if (result.error) return result

		return await this.openModal(stateModal, fModalCloseUpdate)
	}

	async openModalSelect(token: TokenAppModalSelect): Promise<MethodResult> {
		const parmsState = new ParmsValues({})
		parmsState.valueSet(ParmsValuesType.tokenAppModalSelect, token)
		parmsState.valueSet(ParmsValuesType.listIdsSelected, token.listIdsSelected)

		const stateModal = new StateSurfacePopup(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_list'),
			navContent: StateNavContent.ModalSelect,
			navHeader: {
				headerText: `Select Value${token.isMultiSelect ? '(s)' : ''} For: ${token.selectLabel}`
			},
			navLayout: StateNavLayout.layoutContent,
			parmsState
		})

		return await this.openModal(stateModal, token.fModalClose)
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

	parmsFormList(): any {
		const currTab = this.app.getCurrTab()
		if (currTab) return currTab.parmsFormList()
	}

	parmsFormListData(parm: ParmsValuesType): any {
		const currTab = this.app.getCurrTab()
		if (currTab) return currTab.parmsFormListGet(parm)
	}

	parmsFormListGet(parm: ParmsValuesType): any {
		const currTab = this.app.getCurrTab()
		if (currTab) return currTab.parmsFormListGet(parm)
	}

	parmsFormListSet(parm: ParmsValuesType, value: any) {
		const currTab = this.app.getCurrTab()
		if (currTab) currTab.parmsFormListSet(parm, value)
	}

	setDataObjState(dataObj: DataObj) {
		this.dataObjState = dataObj
	}

	setfChangeCallback(f: Function) {
		this.fChangeCallback = f
	}

	async triggerAction(parms: TokenAppStateTriggerAction): Promise<MethodResult> {
		return await this.triggerActionValidate(parms, this.fActions[parms.codeAction.actionClass])
	}

	async triggerActionDashboard() {
		await this.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.openDashboard
				)
			})
		)
	}

	async triggerActionValidate(
		parms: TokenAppStateTriggerAction,
		fCallback: Function | undefined = undefined
	): Promise<MethodResult> {
		const isStatusChanged = this.dm.isStatusChanged()
		const codeConfirmType = parms.codeConfirmType
		if (
			codeConfirmType === TokenAppUserActionConfirmType.always ||
			(codeConfirmType === TokenAppUserActionConfirmType.statusChanged && this.dm.isStatusChanged())
		) {
			return await this.triggerActionValidateAskB4(parms, fCallback)
		} else {
			this.dm.resetStatus()
			if (fCallback) return await fCallback(this, parms)
		}
		return new MethodResult()
	}

	async triggerActionValidateAskB4(
		parms: TokenAppStateTriggerAction,
		fCallback?: Function
	): Promise<MethodResult> {
		if (this instanceof StateSurfacePopup) {
			if (confirm(parms.confirm.message)) return await discardChanges(this)
		} else {
			const modal: ModalSettings = {
				type: 'confirm',
				title: parms.confirm.title,
				body: parms.confirm.message,
				buttonTextCancel: parms.confirm.buttonLabelCancel,
				buttonTextConfirm: parms.confirm.buttonLabelConfirm,
				response: async (r: boolean) => {
					if (r) return await discardChanges(this)
				}
			}
			return this.storeModal.trigger(modal)
		}
		return new MethodResult()

		async function discardChanges(sm: State): Promise<MethodResult> {
			parms.codeConfirmType = TokenAppUserActionConfirmType.none
			sm.dm.resetStatus()
			return await sm.triggerActionValidate(parms, fCallback)
		}
	}

	triggerSave() {
		this.triggerSaveValue = Math.random()
	}

	async userCurrInit(): Promise<MethodResult> {
		let result: MethodResult = await apiFetchFunction(ApiFunction.sysGetUserByUserId)
		if (result.error) return result
		const rawUser: any = result.data

		this.user = new User(rawUser)
		this.userParm = new UserParm(this.user)
		await this.navMenuData.init(this)
		this.navLayout = StateNavLayout.layoutDashboard

		return new MethodResult()
	}
	async userCurrReset(): Promise<MethodResult> {
		if (this.user) {
			await this.userCurrInit()
			await this.triggerActionDashboard()
		}
		return new MethodResult()
	}

	async userParmItemsAdd(
		idFeatureSource: any,
		items: UserParmItemSource | UserParmItemSource[]
	): Promise<MethodResult> {
		if (this.user && this.userParm) {
			return await this.userParm.itemsAdd(
				idFeatureSource,
				items,
				!this.user.prefIsActive(UserPrefType.disable_remember_feature_settings)
			)
		}
		return new MethodResult()
	}

	userParmGet(idFeatureSource: any, type: UserParmItemType): MethodResult {
		return this.userParm
			? this.userParm.itemDataGet(idFeatureSource, type)
			: new MethodResult({
					error: {
						file: FILENAME,
						function: 'userParmGet',
						msg: `UserParm not defined for type: ${type}`
					}
				})
	}

	userParmGetOrDefault(idFeature: number, type: UserParmItemType, defaultValue: any): any {
		const result: MethodResult = this.userParmGet(idFeature, type)
		return result.error ? defaultValue : result.data
	}

	async userParmSave(idFeatureSource: any): Promise<void> {
		if (
			this.user &&
			this.userParm &&
			!this.user.prefIsActive(UserPrefType.disable_remember_feature_settings)
		) {
			await this.userParm.parmsSave(idFeatureSource)
		}
	}

	userParmSet(idFeatureSource: any, type: UserParmItemType, data: any) {
		if (this.userParm) this.userParm.itemDataSet(idFeatureSource, type, data)
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
	constructor(obj: any) {
		const clazz = 'StateSurfaceEmbedShell'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjState = required(obj.dataObjState, clazz, 'dataObjState')
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

export enum StateTriggerToken {
	menuClose = 'menuClose',
	navDashboard = 'navDashboard'
}
