import { App } from '$comps/app/types.app.svelte'
import { MethodResult, required, valueOrDefault } from '$utils/utils'
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
	PropDataType,
	ToastType,
	User,
	UserParm,
	UserParmItemSource,
	UserParmItemType,
	UserPrefType
} from '$utils/types'
import {
	type FunctionModalReturn,
	NavDestinationType,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryDataTree,
	TokenApiQueryType,
	TokenAppActionTrigger,
	TokenAppModalConfig,
	TokenAppModalConfigConfirm,
	TokenAppModalConfigDate,
	TokenAppModalConfigType,
	TokenAppModalEmbedField,
	TokenAppModalReturn,
	TokenAppModalReturnType,
	TokenAppModalDate,
	TokenAppModalSelect,
	TokenAppNav,
	TokenAppNode,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
import { QuerySourceParentRaw } from '$lib/queryClient/types.queryClient'
import { Field } from '$comps/form/field.svelte'
import { FieldEmbedListConfig, FieldEmbedListSelect } from '$comps/form/fieldEmbed.svelte'
import { RawDataObjAction } from '$comps/dataObj/types.rawDataObj.svelte'
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
	dataTreeParent?: TokenApiQueryDataTree
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
	overlayModalConfig?: TokenAppModalConfig
	overlayModalFunctionReturn?: FunctionModalReturn
	overlayModalOpen: boolean = $state(false)
	overlayState?: State = $state()
	overlayToaster?: any
	parmsState: ParmsValues = new ParmsValues()
	parmsTrans: ParmsValues = new ParmsValues()
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

	appGetDataTree(isDataTreePresetOffset: boolean = false): TokenApiQueryDataTree {
		return this.dataTreeParent ? this.dataTreeParent : this.app.getDataTree(isDataTreePresetOffset)
	}

	change(obj: DataRecord) {
		this.app = this.changeParm(obj, 'app', this.app)
		this.dataTreeParent = this.changeParm(obj, 'dataTreeParent', this.dataTreeParent)
		this.fChangeCallback = this.changeParm(obj, 'fChangeCallback', this.fChangeCallback)
		this.isDevMode = this.changeParm(obj, 'isDevMode', this.isDevMode)
		this.navContent = this.changeParm(obj, 'navContent', this.navContent)
		this.navLayout = this.changeParm(obj, 'navLayout', this.navLayout)
		this.navLayoutParms = this.changeParm(obj, 'navLayoutParms', this.navLayoutParms)
		this.navPage = this.changeParm(obj, 'navPage', this.navPage)
		this.overlayModalFunctionReturn = this.changeParm(
			obj,
			'overlayModalFunctionReturn',
			this.overlayModalFunctionReturn
		)
		this.overlayModalConfig = this.changeParm(obj, 'overlayModalConfig', this.overlayModalConfig)
		this.overlayToaster = this.changeParm(obj, 'overlayToaster', this.overlayToaster)
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
		const settings: any = { id, position, height, width, meta }
		return new MethodResult()
	}

	async openDrawerNode(
		token: TokenAppNode,
		position: 'left' | 'right' | 'top' | 'bottom' | undefined,
		height: string | undefined,
		width: string | undefined
	): Promise<MethodResult> {
		const stateModal = new StateSurfaceOverlay(this, {
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

	async openModal(overlayState: StateSurfaceOverlay): Promise<MethodResult> {
		this.overlayState = overlayState
		this.overlayState.overlayModalOpen = true
		return new MethodResult()
	}

	async openModalEmbedListConfig(
		token: TokenAppActionTrigger,
		queryType: TokenApiQueryType,
		fModalReturn: FunctionModalReturn
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalEmbedListConfig`
		const dataObjEmbed = token.dataObj
		const fieldEmbed: FieldEmbedListConfig = required(dataObjEmbed.embedField, clazz, 'fieldEmbed')
		const parentDataObjTableRoot = fieldEmbed.rawFieldEmbedList.parentTableRoot
		const parentDataObjId = required(fieldEmbed.parentDataObjId, clazz, 'parentDataObj')
		const embedParentId = this.dm.getRecordId(parentDataObjId, 0)

		const stateModal = new StateSurfaceOverlay(this, {
			actionsDialog: fieldEmbed.actionsModal,
			app: this.app,
			embedParentId,
			embedType: fieldEmbed.colDO.fieldEmbedListType,
			navHeader: {
				isDataObj: true,
				isRowStatus: true
			},
			overlayModalConfig: new TokenAppModalConfig({ type: TokenAppModalConfigType.layout }),
			overlayModalFunctionReturn: fModalReturn
		})

		stateModal.parmsState.valueSet(
			ParmsValuesType.embedDataObjId,
			required(dataObjEmbed.raw.id, clazz, 'dataObjEmbedId')
		)
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

		return await this.openModal(stateModal)
	}

	async openModalEmbedListSelect(
		token: TokenAppActionTrigger,
		fModalReturn: FunctionModalReturn
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalEmbedListSelect`
		const dataObjEmbed = token.dataObj
		const listIdsSelected = dataObjEmbed.data.rowsRetrieved.getRowsIds()
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
		parmsState.valueSet(
			ParmsValuesType.embedDataObjId,
			required(dataObjEmbed.raw.id, clazz, 'dataObjEmbedId')
		)
		parmsState.valueSet(ParmsValuesType.embedFieldName, fieldEmbed.rawFieldEmbedList.embedPropName)
		parmsState.valueSet(ParmsValuesType.listIdsSelected, listIdsSelected)

		const stateModal = new StateSurfaceOverlay(this, {
			actionsDialog: fieldEmbed.actionsModal,
			dataTreeParent: this.app.getDataTree(),
			embedParentId: this.dm.getRecordId(parentDataObjId, 0),
			embedType: fieldEmbed.colDO.fieldEmbedListType,
			navHeader: { isDataObj: true },
			overlayModalConfig: new TokenAppModalConfig({ type: TokenAppModalConfigType.layout }),
			overlayModalFunctionReturn: fModalReturn,
			parmsState
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
							listIdsSelected,
							parent: new QuerySourceParentRaw({
								_columnName: fieldEmbed.rawFieldEmbedList.embedPropName,
								_columnIsMultiSelect: true,
								_filterExpr: '.id = <parms,uuid,embedParentId>',
								_table: parentDataObjTableRoot
							})
						}),
						queryType: TokenApiQueryType.retrieve
					})
				},
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
		if (result.error) return result

		return await this.openModal(stateModal)
	}

	async openModalDate(token: TokenAppModalDate): Promise<MethodResult> {
		return await this.openModal(
			new StateSurfaceOverlay(this, {
				overlayModalConfig: new TokenAppModalConfigDate({
					date: token.date,
					type: TokenAppModalConfigType.date
				}),
				overlayModalFunctionReturn: token.fModalReturn
			})
		)
	}

	async openModalField(
		field: Field,
		valueRaw: any,
		fUpdateValue: (valueSave: any) => Promise<void>
	) {
		const triggerModalAction = (actionType: CodeActionType, data: DataRecord) => {
			return this.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(CodeActionClass.ct_sys_code_action_class_modal, actionType),
					codeConfirmType: TokenAppUserActionConfirmType.none,
					data
				})
			)
		}

		const openModalDate = async (fModalReturn: Function) => {
			return triggerModalAction(CodeActionType.modalOpenDate, {
				token: new TokenAppModalDate({ date: valueRaw, fModalReturn })
			})
		}

		const openModalSelect = async (fModalReturn: Function) => {
			if (field.linkItems) {
				const listIdsSelected = field.linkItems.getValueIds(valueRaw)
				const gridParms = field.linkItems.getGridParms()

				return triggerModalAction(CodeActionType.modalOpenSelect, {
					token: new TokenAppModalSelect({
						columnDefs: gridParms.columnDefs,
						fModalReturn,
						isMultiSelect: field.colDO.colDB.isMultiSelect, // Fixed: Use full path
						listIdsSelected,
						rowData: gridParms.rowData,
						selectLabel: field.colDO.label,
						sortModel: gridParms.sortModel
					})
				})
			}
		}
		const createModalHandler = (getValueSave: (parmsReturn: ParmsValues) => any) => {
			return async (modalReturn: TokenAppModalReturn) => {
				if (modalReturn.type === TokenAppModalReturnType.complete && modalReturn.parmsState) {
					const valueSave = getValueSave(modalReturn.parmsState)
					await fUpdateValue(valueSave)
				}
			}
		}

		// Handle different fields
		const fieldDataType = field.colDO.colDB.codeDataType
		const isMultiSelect = field.colDO.colDB.isMultiSelect

		if (fieldDataType === PropDataType.date) {
			return await openModalDate(
				createModalHandler((parmsReturn) => parmsReturn.valueGet(ParmsValuesType.modalDate))
			)
		} else if (field.linkItems && isMultiSelect) {
			return await openModalSelect(
				createModalHandler((parmsReturn) => {
					const valueDisplay = parmsReturn.valueGet(ParmsValuesType.listIdsSelected)
					return field?.linkItems?.getValueRaw(valueDisplay)
				})
			)
		}
	}

	async openModalNode(
		token: TokenAppNode,
		fModalReturn?: FunctionModalReturn
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.openModalNode`
		const stateModal = new StateSurfaceOverlay(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_detail'),
			overlayModalConfig: new TokenAppModalConfig({ type: TokenAppModalConfigType.layout }),
			overlayModalFunctionReturn: fModalReturn,
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

		return await this.openModal(stateModal)
	}

	async openModalSelect(token: TokenAppModalSelect): Promise<MethodResult> {
		const parmsState = new ParmsValues({})
		parmsState.valueSet(ParmsValuesType.tokenAppModalSelect, token)
		parmsState.valueSet(ParmsValuesType.listIdsSelected, token.listIdsSelected)
		const stateModal = new StateSurfaceOverlay(this, {
			actionsDialog: await this.getActions('doag_dialog_footer_list_select'),
			navContent: StateNavContent.ModalSelect,
			navHeader: {
				headerText: `Select Value${token.isMultiSelect ? '(s)' : ''} For: ${token.selectLabel}`
			},
			navLayout: StateNavLayout.layoutContent,
			overlayModalConfig: new TokenAppModalConfig({ type: TokenAppModalConfigType.layout }),
			overlayModalFunctionReturn: token.fModalReturn,
			parmsState
		})

		return await this.openModal(stateModal)
	}

	openToast(type: ToastType, title: string) {
		if (this.overlayToaster) {
			switch (type) {
				case ToastType.error:
					this.overlayToaster.error({ title })
					break
				case ToastType.info:
					this.overlayToaster.info({ title })
					break
				case ToastType.success:
					this.overlayToaster.success({ title })
					break
				case ToastType.warning:
					this.overlayToaster.warning({ title })
					break
			}
		}
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
		const discardChanges = async (sm: State): Promise<MethodResult> => {
			parms.codeConfirmType = TokenAppUserActionConfirmType.none
			sm.dm.resetStatus()
			return await sm.triggerActionValidate(parms, fCallback)
		}
		const fModalReturn = async (modalReturn: TokenAppModalReturn): Promise<MethodResult> => {
			if (modalReturn.type === TokenAppModalReturnType.complete) {
				return await discardChanges(this)
			}
			return new MethodResult()
		}

		if (this instanceof StateSurfaceOverlay) {
			if (confirm(parms.confirm.message)) {
				return await discardChanges(this)
			}
			return new MethodResult()
		} else {
			return await this.openModal(
				new StateSurfaceOverlay(this, {
					overlayModalConfig: new TokenAppModalConfigConfirm({
						body: parms.confirm.message,
						buttonTextCancel: parms.confirm.buttonLabelCancel,
						buttonTextConfirm: parms.confirm.buttonLabelConfirm,
						title: parms.confirm.title,
						type: TokenAppModalConfigType.confirm
					}),
					overlayModalFunctionReturn: fModalReturn
				})
			)
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
		console.log('State.UserCurrInit:', this.user)
		this.userParm = new UserParm(this.user)
		await this.navMenuData.init(this)

		return new MethodResult()
	}
	async userCurrReset(): Promise<MethodResult> {
		if (this.user) {
			await this.userCurrInit()
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

export class StateSurfaceOverlay extends State {
	actionsDialog: DataObjAction[] = []
	constructor(stateParent: State, obj: any) {
		const clazz = 'StateSurfaceOverlay'
		obj.navPage = stateParent.navPage
		super(obj)
		obj = valueOrDefault(obj, {})
		this.actionsDialog = valueOrDefault(obj.actionsDialog, [])
		this.user = stateParent.user
	}
}

export enum StateTriggerToken {
	menuClose = 'menuClose',
	navDashboard = 'navDashboard'
}
