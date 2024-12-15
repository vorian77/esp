<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
	import { queryTypeTab } from '$comps/app/types.appQuery'
	import {
		State,
		StateLayoutContent,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketAction,
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
		ContextKey,
		DataManager,
		DataObj,
		DataObjCardinality,
		DataObjMode,
		DataObjData,
		type DataRecord,
		DataRecordStatus,
		required,
		ParmsValues,
		ParmsValuesType
	} from '$utils/types'
	import { getContext, setContext } from 'svelte'
	import { NodeType } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import action from '$enhance/actions/actionAuth'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/RootLayoutApp.svelte'

	let dm: DataManager = $state(new DataManager())
	setContext(ContextKey.dataManager, dm)

	let stateApp: State = getContext(ContextKey.stateApp)

	$effect(() => {
		const packet = stateApp.consume(actionsPacket)
		if (packet) process(packet)
	})

	let componentContentName: string | undefined
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let parms: DataRecord = $state({})
	let parentTab: AppLevelTab | undefined

	const componentsLayout: Record<string, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	let Component = $state(componentsLayout[stateApp.layoutComponent])

	const actionsPacket = [
		StatePacketAction.doDetailDelete,
		StatePacketAction.doDetailMigrate,
		StatePacketAction.doDetailNew,
		StatePacketAction.doDetailProcessExecute,
		StatePacketAction.doDetailSave,
		StatePacketAction.doDetailSaveAs,
		StatePacketAction.doDetailSaveCancel,
		StatePacketAction.doEmbedListConfigEdit,
		StatePacketAction.doEmbedListConfigNew,
		StatePacketAction.doEmbedListSelect,
		StatePacketAction.doListDetailEdit,
		StatePacketAction.doListDetailNew,
		StatePacketAction.doListSelfRefresh,
		StatePacketAction.doListSelfSave,
		StatePacketAction.embedField,
		StatePacketAction.embedShell,
		StatePacketAction.modalDataObj,
		StatePacketAction.modalEmbed,
		StatePacketAction.navBack,
		StatePacketAction.navCrumbs,
		StatePacketAction.navRow,
		StatePacketAction.navTab,
		StatePacketAction.openNode,
		StatePacketAction.modalSelectSurface,
		StatePacketAction.modalSelectOpen
	]

	async function process(packet: StatePacket) {
		const token: TokenApp = packet.token
		let resetModes = true

		switch (packet.action) {
			case StatePacketAction.doDetailDelete:
				await stateApp.app.saveDetail(stateApp, packet.action, token)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailMigrate:
				await migrate(stateApp, token.dataObj)
				break

			case StatePacketAction.doDetailNew:
				parentTab = stateApp.app.getCurrTabParentTab()
				if (parentTab) parentTab.data?.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
				await queryTypeTab(stateApp, stateApp.app.getCurrTab(), TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailProcessExecute:
				// await migrate(state, token.dataObj)
				break

			case StatePacketAction.doDetailSave:
				if (await stateApp.app.saveDetail(stateApp, packet.action, token)) {
					updateObjectsForm()
				}
				break

			case StatePacketAction.doDetailSaveAs:
				await stateApp.app.tabDuplicate(stateApp, token)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailSaveCancel:
				currLevel = stateApp.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					if (currTab && currTab.dataObj) {
						const status = currTab?.data?.rowsRetrieved?.getDetailRowStatus()
						switch (status) {
							case DataRecordStatus.preset:
								await queryTypeTab(stateApp, currTab, TokenApiQueryType.preset)
								updateObjectsForm()
								break
							case DataRecordStatus.retrieved:
							case DataRecordStatus.update:
								await queryTypeTab(stateApp, currTab, TokenApiQueryType.retrieve)
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

			case StatePacketAction.doEmbedListConfigEdit:
				await stateApp.openModalEmbedListConfig(
					token,
					TokenApiQueryType.retrieve,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case StatePacketAction.doEmbedListConfigNew:
				await stateApp.openModalEmbedListConfig(
					token,
					TokenApiQueryType.preset,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case StatePacketAction.doEmbedListSelect:
				currLevel = stateApp.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					currTab.data = stateApp.dataObjState?.objData
				}
				await stateApp.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)
				break

			case StatePacketAction.doListDetailEdit:
				await stateApp.app.addLevelNodeChildren(stateApp, dm, token, TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case StatePacketAction.doListDetailNew:
				await stateApp.app.addLevelNodeChildren(stateApp, dm, token, TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case StatePacketAction.doListSelfRefresh:
				await queryTypeTab(stateApp, stateApp.app.getCurrTab(), TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case StatePacketAction.doListSelfSave:
				const rtn = await stateApp.app.saveList(stateApp, token)
				updateObjectsForm()
				resetModes = false
				break

			case StatePacketAction.embedField:
				if (token instanceof TokenApiQuery) {
					await stateApp.app.addLevelEmbedField(stateApp, token)
					updateObjectsForm()
					resetModes = false
				}
				break

			case StatePacketAction.embedShell:
				break

			case StatePacketAction.modalDataObj:
				await stateApp.app.addLevelModalDataObj(stateApp)
				updateObjectsForm()
				break

			case StatePacketAction.modalEmbed:
				await stateApp.app.addLevelModalEmbedField(stateApp, token)
				updateObjectsForm()
				break

			case StatePacketAction.navBack:
				if (stateApp.app.levels.length === 1) {
					returnHome(stateApp)
				} else {
					await stateApp.app.navBack(stateApp, 1)
					updateObjectsForm()
				}
				break

			case StatePacketAction.navCrumbs:
				if (token instanceof TokenAppIndex) {
					if (token.index === 0) {
						returnHome(stateApp)
					} else {
						await stateApp.app.navCrumbs(stateApp, token)
						updateObjectsForm()
					}
				}
				break

			case StatePacketAction.navRow:
				if (token instanceof TokenAppRow) {
					await stateApp.app.rowUpdate(stateApp, token)
					updateObjectsForm()
				}
				break

			case StatePacketAction.navTab:
				await token.app.navTab(stateApp, token)
				updateObjectsForm()
				break

			case StatePacketAction.openNode:
				if (token instanceof TokenAppNode) {
					stateApp.newApp()
					await stateApp.app.addLevelNode(stateApp, dm, token)
					updateObjectsForm()
				}
				break

			case StatePacketAction.modalSelectOpen:
				await stateApp.openModalSelect(token)
				break

			case StatePacketAction.modalSelectSurface:
				updateObjectsContent(StateLayoutContent.ModalSelect)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'process',
					message: `No case defined for StatePacketAction: ${packet.action}`
				})
		}
	}

	const fModalCloseUpdateEmbedListConfig = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) => {
		fModalCloseUpdateEmbedListDropResources()
		currLevel = stateApp.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			await queryTypeTab(stateApp, currTab, TokenApiQueryType.retrieve)
		}
		updateObjectsForm()
	}

	const fModalCloseUpdateEmbedListSelect = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) => {
		fModalCloseUpdateEmbedListDropResources()
		if (returnType === TokenAppModalReturnType.complete) {
			currLevel = stateApp.app.getCurrLevel()
			if (currLevel) {
				const embedFieldName = data?.valueGet(ParmsValuesType.embedFieldName)
				currTab = currLevel.getCurrTab()
				const idx = currTab.data.fields.findIndex((f) => f.embedFieldName === embedFieldName)
				if (idx > -1) {
					currTab.data.fields[idx].data.parms.update(data?.valueGetAll())
					currTab.data.fields[idx].data.parms.valueSet(ParmsValuesType.embedListSave, true)
					await queryTypeTab(stateApp, currTab, TokenApiQueryType.save)
				}
			}
			updateObjectsForm()
		}
	}

	function fModalCloseUpdateEmbedListDropResources() {
		stateApp.app.levels = stateApp.app.levels.filter((level) => !level.isModal)
		stateApp.app.levels.forEach((level) => {
			level.tabs = level.tabs.filter((tab) => !tab.isModal)
		})
		const idxLevel = stateApp.app.levels.length - 1
		if (idxLevel >= 0) stateApp.app.levels[idxLevel].tabIdxRestore()
	}

	function returnHome(state: State) {
		state.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			target: StateTarget.dashboard
		})
	}

	function updateObjectsContent(componentName: string) {
		// componentContentName = componentName
		// dataObj = undefined
		// dataObjData = undefined
	}

	function updateObjectsForm() {
		currTab = stateApp.app.getCurrTab()
		if (currTab) {
			parms = { dataObjId: currTab.dataObjId, component: currTab.dataObj?.raw.codeComponent }
		}
		dm.increment()
	}
</script>

{#if currLayout && dm && Object.hasOwn(parms, 'dataObjId')}
	<!-- <DataViewer header="pars" data={parms} /> -->
	<h2>RootLayoutApp</h2>
	<!-- <DataViewer header="dataManager.value" data={dm.value} /> -->
	<DataViewer
		header="dataManager.dataRecord"
		data={dm.getDataRecord(parms.dataObjId, 0).table_SysPerson_firstName}
	/>
	<DataViewer header="dataManager.isObjStatus" data={dm.getStatus()} />

	<div class="h-full max-h-full">
		<!-- <svelte:component this={currLayout} {parms} on:formCancelled /> -->
		<Component {parms} on:formCancelled />
	</div>
{/if}
