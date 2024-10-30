<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app'
	import { query } from '$comps/app/types.appQuery'
	import {
		State,
		StateLayoutContent,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
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
		TokenAppTreeNode,
		TokenAppWidget
	} from '$utils/types.token'
	import {
		DataObj,
		DataObjCardinality,
		DataObjMode,
		DataObjData,
		DataRecordStatus,
		required,
		ParmsValues,
		ParmsValuesType
	} from '$utils/types'
	import {
		FieldEmbedListConfig,
		FieldEmbedListEdit,
		FieldEmbedListSelect
	} from '$comps/form/fieldEmbed'
	import { NodeType } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import action from '$enhance/actions/actionAuth'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/dataObj/DataObj.svelte'

	export let state: State

	let componentContentName: string | undefined
	let currLayout: any
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let parentTab: AppLevelTab | undefined

	const componentsLayout: Record<string, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	const actionsPacket = [
		StatePacketAction.doDetailDelete,
		StatePacketAction.doDetailMigrate,
		StatePacketAction.doDetailNew,
		StatePacketAction.doDetailProcessExecute,
		StatePacketAction.doDetailSave,
		StatePacketAction.doDetailSaveAs,
		StatePacketAction.doDetailSaveCancel,
		StatePacketAction.doDetailSaveRetrievePreset,
		StatePacketAction.doEmbedListConfigEdit,
		StatePacketAction.doEmbedListConfigNew,
		StatePacketAction.doEmbedListSelect,
		StatePacketAction.doExport,
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
		StatePacketAction.navTreeNode,
		StatePacketAction.selectModalItems,
		StatePacketAction.selectModalItemsOpen
	]

	$: if (state && state.packet) {
		currLayout = componentsLayout[state.layoutComponent]
		const packet = state.consume(actionsPacket)
		if (packet) {
			;(async () => await process(packet))()
		}
	}

	async function process(packet: StatePacket) {
		const token: TokenApp = packet.token
		let resetModes = true

		switch (packet.action) {
			case StatePacketAction.doDetailDelete:
				await state.app.saveDetail(state, packet.action, token)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailMigrate:
				await migrate(state, token.dataObj)
				break

			case StatePacketAction.doDetailNew:
				parentTab = state.app.getCurrTabParentTab()
				if (parentTab) parentTab.data?.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
				await query(state, state.app.getCurrTab(), TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailProcessExecute:
				// await migrate(state, token.dataObj)
				break

			case StatePacketAction.doDetailSave:
			case StatePacketAction.doDetailSaveRetrievePreset:
				if (await state.app.saveDetail(state, packet.action, token)) {
					updateObjectsForm()
				}
				break

			case StatePacketAction.doDetailSaveAs:
				await state.app.tabDuplicate(state, token)
				updateObjectsForm()
				break

			case StatePacketAction.doDetailSaveCancel:
				currLevel = state.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					if (currTab && currTab.dataObj) {
						const dataRow = currTab?.data?.rowsRetrieved?.getDetailRow()
						switch (dataRow.status) {
							case DataRecordStatus.preset:
								await query(state, currTab, TokenApiQueryType.preset)
								updateObjectsForm()
								break
							case DataRecordStatus.retrieved:
							case DataRecordStatus.update:
								await query(state, currTab, TokenApiQueryType.retrieve)
								updateObjectsForm()
								break
							default:
								error(500, {
									file: FILENAME,
									function: `processState.actionType: ${token.action}`,
									message: `No case defined for DataRecordStatus: ${dataRow.status} `
								})
						}
					}
				}
				break

			case StatePacketAction.doEmbedListConfigEdit:
				await state.openModalEmbedListConfig(
					token,
					TokenApiQueryType.retrieve,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case StatePacketAction.doEmbedListConfigNew:
				await state.openModalEmbedListConfig(
					token,
					TokenApiQueryType.preset,
					fModalCloseUpdateEmbedListConfig
				)
				break

			case StatePacketAction.doEmbedListSelect:
				currLevel = state.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					currTab.data = state.dataObjState?.objData
				}
				await state.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)
				break

			case StatePacketAction.doExport:
				currLevel = state.app.getCurrLevel()
				if (currLevel) {
					currTab = currLevel.getCurrTab()
					if (currTab && currTab.dataObj) currTab.dataObj.export()
				}
				break

			case StatePacketAction.doListDetailEdit:
				await state.app.addLevelNode(state, token, TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case StatePacketAction.doListDetailNew:
				await state.app.addLevelNode(state, token, TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case StatePacketAction.doListSelfRefresh:
				await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case StatePacketAction.doListSelfSave:
				const rtn = await state.app.saveList(state, token)
				updateObjectsForm()
				resetModes = false
				break

			case StatePacketAction.embedField:
				if (token instanceof TokenApiQuery) {
					await state.app.initEmbeddedField(state, token)
					updateObjectsForm()
					resetModes = false
				}
				break

			case StatePacketAction.embedShell:
				break

			case StatePacketAction.modalDataObj:
				await state.app.addLevelModalDataObj(state)
				updateObjectsForm()
				break

			case StatePacketAction.modalEmbed:
				await state.app.addLevelModalEmbedField(state, token)
				updateObjectsForm()
				break

			case StatePacketAction.navBack:
				if (state.app.levels.length === 1) {
					returnHome(state)
				} else {
					await state.app.navBack(1)
					updateObjectsForm()
				}
				break

			case StatePacketAction.navCrumbs:
				if (token instanceof TokenAppIndex) {
					if (token.index === 0) {
						returnHome(state)
					} else {
						await state.app.navCrumbs(token)
						updateObjectsForm()
					}
				}
				break

			case StatePacketAction.navRow:
				if (token instanceof TokenAppRow) {
					await state.app.rowUpdate(state, token)
					updateObjectsForm()
				}
				break

			case StatePacketAction.navTab:
				await token.app.navTab(state, token)
				updateObjectsForm()
				break

			case StatePacketAction.navTreeNode:
				if (token instanceof TokenAppTreeNode) {
					state.newApp()
					await state.app.initNode(state, token)
					updateObjectsForm()
				}
				break

			case StatePacketAction.selectModalItems:
				updateObjectsContent(StateLayoutContent.ModalSelect)
				break

			case StatePacketAction.selectModalItemsOpen:
				await state.openModalSelect(token)
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
		currLevel = state.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			await query(state, currTab, TokenApiQueryType.retrieve)
		}
		updateObjectsForm()
	}

	const fModalCloseUpdateEmbedListSelect = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) => {
		fModalCloseUpdateEmbedListDropResources()
		if (returnType === TokenAppModalReturnType.complete) {
			currLevel = state.app.getCurrLevel()
			if (currLevel) {
				const embedFieldName = data?.valueGet(ParmsValuesType.embedFieldName)
				currTab = currLevel.getCurrTab()
				const idx = currTab.data.fields.findIndex((f) => f.embedFieldName === embedFieldName)
				if (idx > -1) {
					currTab.data.fields[idx].data.parms.update(data?.valueGetAll())
					currTab.data.fields[idx].data.parms.valueSet(ParmsValuesType.embedListSave, true)
					await query(state, currTab, TokenApiQueryType.save)
				}
			}
			updateObjectsForm()
		}
	}

	function fModalCloseUpdateEmbedListDropResources() {
		state.app.levels = state.app.levels.filter((level) => !level.isModal)
		state.app.levels.forEach((level) => {
			level.tabs = level.tabs.filter((tab) => !tab.isModal)
		})
		const idxLevel = state.app.levels.length - 1
		if (idxLevel >= 0) state.app.levels[idxLevel].tabIdxRestore()
	}

	function returnHome(state: State) {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				action: StatePacketAction.navTreeSetParent,
				confirmType: TokenAppDoActionConfirmType.objectChanged
			})
		})
	}

	function updateObjectsContent(componentName: string) {
		state.resetState()
		state.app = state.app
		componentContentName = componentName
		dataObj = undefined
		dataObjData = undefined
	}

	function updateObjectsForm() {
		state.app = state.app
		currTab = state.app.getCurrTab()
		if (currTab) {
			dataObj = currTab.dataObj
			componentContentName = dataObj.raw.codeComponent
			dataObjData = currTab.data
			state.resetState()
			state.setFClosureSetStatus(() => (state = state.setStatus()))
		}
	}
</script>

{#if currLayout && componentContentName}
	<div class={state instanceof StateSurfaceEmbed ? '' : 'p-4'}>
		<svelte:component
			this={currLayout}
			bind:state
			component={componentContentName}
			{dataObj}
			{dataObjData}
			on:formCancelled
		/>
	</div>
{/if}

<!-- <DataViewer header="rowStatus" data={dataObjData?.getRowStatus()} /> -->
