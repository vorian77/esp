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
		StateProps,
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
		DataObj,
		DataObjCardinality,
		DataObjMode,
		DataObjData,
		DataRecordStatus,
		required,
		ParmsValues,
		ParmsValuesType
	} from '$utils/types'
	import { NodeType } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import action from '$enhance/actions/actionAuth'
	import { getContext, setContext } from 'svelte'
	import { ContextKey } from '$utils/utils.sys.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/dataObj/DataObj.svelte'

	let stateApp = getContext(ContextKey.stateApp) as State
	let currLayout = $derived(componentsLayout[stateApp.layoutComponent])
	$effect(() => {
		const packet = stateApp.consume(actionsPacket)
		if (packet) process(packet)
	})

	let componentContentName: string | undefined
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let parentTab: AppLevelTab | undefined
	let stateProps: StateProps = $state()

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
				await query(stateApp, stateApp.app.getCurrTab(), TokenApiQueryType.preset)
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
								await query(stateApp, currTab, TokenApiQueryType.preset)
								updateObjectsForm()
								break
							case DataRecordStatus.retrieved:
							case DataRecordStatus.update:
								await query(stateApp, currTab, TokenApiQueryType.retrieve)
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
				await stateApp.app.addLevelNodeChildren(stateApp, token, TokenApiQueryType.retrieve)
				updateObjectsForm()
				break

			case StatePacketAction.doListDetailNew:
				await stateApp.app.addLevelNodeChildren(stateApp, token, TokenApiQueryType.preset)
				updateObjectsForm()
				break

			case StatePacketAction.doListSelfRefresh:
				await query(stateApp, stateApp.app.getCurrTab(), TokenApiQueryType.retrieve)
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
					await stateApp.app.addLevelNode(stateApp, token)
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
			await query(stateApp, currTab, TokenApiQueryType.retrieve)
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
					await query(stateApp, currTab, TokenApiQueryType.save)
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

	const closureSetStatus = () => {
		stateApp = stateApp.setStatus()
		// console.log('closureSetStatus.objStatus', state.objStatus)
	}
	const closureSetVal = (row: number, field: Field, value: any) => {
		stateApp.props.dataObj = stateApp.props.dataObj.setFieldVal(row, field, value)
		console.log('closureSetVal.dataFieldsChanged', stateApp.props.dataObj.dataFieldsChanged)
	}

	function updateObjectsContent(componentName: string) {
		// componentContentName = componentName
		// dataObj = undefined
		// dataObjData = undefined
		// stateApp.resetState({
		// 	component: componentContentName,
		// 	dataObj,
		// 	dataObjData,
		// 	fClosureSetStatus: closureSetStatus,
		// 	fClosureSetVal: closureSetVal
		// })
	}

	function updateObjectsForm() {
		currTab = stateApp.app.getCurrTab()
		if (currTab) {
			stateProps = new StateProps({
				component: currTab.dataObj.raw.codeComponent,
				dataObj: currTab.dataObj,
				dataObjData: currTab.data,
				state: stateApp
			})
			console.log('updateObjectsForm.stateProps:', { currTab, stateProps, currLayout })
		}
	}
</script>

{#if currLayout && stateProps}
	<div class="h-full max-h-full">
		<svelte:component this={currLayout} bind:stateProps on:formCancelled />
	</div>
{/if}

<!-- <DataViewer header="rowStatus" data={dataObjData?.getRowStatus()} /> -->
