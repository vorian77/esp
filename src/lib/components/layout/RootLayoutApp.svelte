<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
	import { queryTypeTab } from '$comps/app/types.appQuery'
	import {
		State,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StateSurfaceEmbedShell,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiDbDataObjSource,
		TokenApiId,
		TokenApiQuery,
		TokenApiQueryType,
		TokenApp,
		TokenAppDo,
		TokenAppIndex,
		TokenAppDoActionConfirmType,
		TokenAppModalEmbedField,
		TokenAppModalReturnType,
		TokenAppProcess,
		TokenAppRow,
		TokenAppTab,
		TokenAppNode,
		TokenAppWidget
	} from '$utils/types.token'
	import {
		CodeAction,
		ContextKey,
		DataManager,
		DataObj,
		DataObjCardinality,
		DataObjData,
		type DataRecord,
		DataRecordStatus,
		required,
		ParmsValues,
		ParmsValuesType
	} from '$utils/types'
	import { FieldClassType } from '$comps/form/field'
	import { getContext, setContext } from 'svelte'
	import { NodeType } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/RootLayoutApp.svelte'

	let { sm }: { sm: State } = $props()

	setContext(ContextKey.stateManager, sm)

	let componentContentName: string | undefined
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let keyValue: boolean = $state(false)
	let parms: DataRecord = $state({})
	let parentTab: AppLevelTab | undefined

	$effect(() => {
		const packet = sm.consume(actionsPacket)
		if (packet) process(packet)
	})

	const componentsLayout: Record<string, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	let Component = $state()

	const actionsPacket = [
		CodeAction.doDetailDelete,
		CodeAction.doDetailMigrate,
		CodeAction.doDetailNew,
		CodeAction.doDetailProcessExecute,
		CodeAction.doDetailSave,
		CodeAction.doDetailSaveAs,
		CodeAction.doEmbedListConfigEdit,
		CodeAction.doEmbedListConfigNew,
		CodeAction.doEmbedListSelect,
		CodeAction.doListDetailEdit,
		CodeAction.doListDetailNew,
		CodeAction.doListSelfRefresh,
		CodeAction.doListSelfSave,
		CodeAction.doOpen,
		CodeAction.doSaveCancel,
		CodeAction.embedField,
		CodeAction.embedShell,
		CodeAction.modalEmbed,
		CodeAction.modalSelectOpen,
		CodeAction.modalSelectSurface,
		CodeAction.navBack,
		CodeAction.navCrumbs,
		CodeAction.navRow,
		CodeAction.navTab,
		CodeAction.openNode
	]

	async function process(packet: StatePacket) {
		const token: TokenApp = packet.token
		let resetModes = true

		switch (packet.action) {
			case CodeAction.doDetailDelete:
				await sm.app.saveDetail(sm, packet.action, token)
				updateObjectsForm()
				break

			case CodeAction.doDetailMigrate:
				await migrate(sm, token.dataObj)
				break

			case CodeAction.doDetailNew:
				parentTab = sm.app.getCurrTabParentTab()
				if (parentTab) parentTab.data?.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
				await queryTypeTab(sm, sm.app.getCurrTab(), TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case CodeAction.doDetailProcessExecute:
				// await migrate(state, token.dataObj)
				break

			case CodeAction.doDetailSave:
				if (await sm.app.saveDetail(sm, packet.action, token)) {
					updateObjectsForm()
				}
				break

			case CodeAction.doDetailSaveAs:
				await sm.app.tabDuplicate(sm, token)
				updateObjectsForm()
				break

			case CodeAction.doEmbedListConfigEdit:
				await sm.openModalEmbedListConfig(
					token,
					TokenApiQueryType.retrieve,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case CodeAction.doEmbedListConfigNew:
				await sm.openModalEmbedListConfig(
					token,
					TokenApiQueryType.preset,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case CodeAction.doEmbedListSelect:
				await sm.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)
				break

			case CodeAction.doListDetailEdit:
				await sm.app.addLevelNodeChildren(sm, token, TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case CodeAction.doListDetailNew:
				await sm.app.addLevelNodeChildren(sm, token, TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case CodeAction.doListSelfRefresh:
				await queryTypeTab(sm, sm.app.getCurrTab(), TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case CodeAction.doListSelfSave:
				const rtn = await sm.app.saveList(sm)
				updateObjectsForm()
				resetModes = false
				break

			case CodeAction.doOpen:
				await sm.app.addLevelDataObj(sm, token)
				updateObjectsForm()
				break

			case CodeAction.doSaveCancel:
				currLevel = sm.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					if (currTab && currTab.dataObj) {
						const status = currTab?.dataObj.data?.rowsRetrieved?.getDetailRowStatus()
						switch (status) {
							case DataRecordStatus.preset:
								await queryTypeTab(sm, currTab, TokenApiQueryType.preset)
								updateObjectsForm()
								break
							case DataRecordStatus.retrieved:
							case DataRecordStatus.update:
								await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
								updateObjectsForm()
								break
							default:
								error(500, {
									file: FILENAME,
									function: `processState.actionType: ${token.action}`,
									message: `No case defined for DataRecordStatus: ${status} `
								})
						}
					}
				}
				break

			case CodeAction.embedField:
				if (token instanceof TokenApiQuery) {
					await sm.app.addLevelEmbedField(sm, token)
					updateObjectsForm()
					resetModes = false
				}
				doOpen
				break

			case CodeAction.embedShell:
				break

			case CodeAction.modalEmbed:
				await sm.app.addLevelModalEmbedField(sm, token)
				updateObjectsForm()
				break

			case CodeAction.modalSelectOpen:
				await sm.openModalSelect(token)
				break

			case CodeAction.modalSelectSurface:
				parms = { component: 'ModalSelect' }
				updateObjectsComponent()
				break

			case CodeAction.navBack:
				if (sm.app.levels.length === 1) {
					returnHome(sm)
				} else {
					await sm.app.navBack(sm, 1)
					updateObjectsForm()
				}
				break

			case CodeAction.navCrumbs:
				if (token instanceof TokenAppIndex) {
					if (token.index === 0) {
						returnHome(sm)
					} else {
						await sm.app.navCrumbs(sm, token)
						updateObjectsForm()
					}
				}
				break

			case CodeAction.navRow:
				if (token instanceof TokenAppRow) {
					await sm.app.rowUpdate(sm, token)
					updateObjectsForm()
				}
				break

			case CodeAction.navTab:
				await token.app.navTab(sm, token)
				updateObjectsForm()
				break

			case CodeAction.openNode:
				if (token instanceof TokenAppNode) {
					sm.newApp()
					await sm.app.addLevelNode(sm, token)
					updateObjectsForm()
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'process',
					message: `No case defined for CodeAction: ${packet.action}`
				})
		}
	}

	const fModalCloseUpdateEmbedListConfig = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) => {
		currLevel = sm.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
			updateObjectsForm()
		}
	}

	const fModalCloseUpdateEmbedListSelect = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) => {
		if (returnType === TokenAppModalReturnType.complete) {
			currLevel = sm.app.getCurrLevel()
			if (currLevel) {
				const embedFieldName = data?.valueGet(ParmsValuesType.embedFieldName)
				currTab = currLevel.getCurrTab()
				const idx = currTab.dataObj.data.fields.findIndex(
					(f) => f.embedFieldName === embedFieldName
				)
				if (idx > -1) {
					currTab.dataObj.data.fields[idx].data.parms.update(data?.valueGetAll())
					currTab.dataObj.data.fields[idx].data.parms.valueSet(ParmsValuesType.embedListSave, true)
					await sm.app.saveList(sm)
				}
			}
			updateObjectsForm()
		}
	}

	function returnHome(sm: State) {
		sm.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			target: StateTarget.dashboard
		})
	}

	function updateObjectsComponent() {
		Component = componentsLayout[sm.layoutComponent]
		keyValue = !keyValue
	}

	function updateObjectsForm() {
		const clazz = `${FILENAME}.updateObjectsForm`
		currTab = sm.app.getCurrTab()
		if (currTab && currTab.dataObj) {
			sm.dm.init(currTab.dataObj)
			currTab.dataObj.fields
				.filter((f) => f.classType === FieldClassType.embed)
				.forEach((f: FieldEmbed) => {
					sm.dm.nodeAdd(required(f.dataObjEmbed, clazz, 'f.dataObjEmbed'))
				})
			parms = { dataObjId: currTab.dataObj.raw.id, component: currTab.dataObj.raw.codeComponent }
			updateObjectsComponent()
		}
	}
</script>

{#if Component}
	<div class="h-full max-h-full w-full">
		{#key keyValue}
			<Component {parms} />
		{/key}
	</div>
{/if}
