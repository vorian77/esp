<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app'
	import { query } from '$comps/app/types.appQuery'
	import {
		State,
		StateLayoutStyle,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketAction,
		StatePacketComponent,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQuery,
		TokenApiQueryType,
		TokenApp,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppModalEmbedField,
		TokenAppModalReturnType,
		TokenAppProcess,
		TokenAppRow,
		TokenAppTreeNode
	} from '$utils/types.token'
	import {
		DataObj,
		DataObjCardinality,
		DataObjMode,
		DataObjData,
		DataRecordStatus,
		required,
		ParmsValuesState,
		ParmsObjType
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
	import LayoutSelectMultiple from '$comps/layout/LayoutSelectMultiple.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'
	import action from '$enhance/actions/actionAuth'

	const FILENAME = '$comps/dataObj/DataObj.svelte'

	export let state: State

	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let currLayout: any
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let parentTab: AppLevelTab | undefined

	const componentsLayout: Record<string, { component: string; propDataObj: boolean }> = {
		layoutApp: { component: LayoutApp, propDataObj: true },
		layoutContent: { component: LayoutContent, propDataObj: true },
		layoutProcess: { component: LayoutProcess, propDataObj: true },
		layoutSelectMultiple: { component: LayoutSelectMultiple, propDataObj: false },
		layoutTab: { component: LayoutTab, propDataObj: true }
	}

	const actions = [
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
		StatePacketAction.doExport,
		StatePacketAction.doListDetailEdit,
		StatePacketAction.doListDetailNew,
		StatePacketAction.doListSelfRefresh,
		StatePacketAction.doListSelfSave,
		StatePacketAction.embedField,
		StatePacketAction.embedShell,
		StatePacketAction.modalEmbed,
		StatePacketAction.navBack,
		StatePacketAction.navCrumbs,
		StatePacketAction.navRow,
		StatePacketAction.navTreeNode
	]

	$: if (state && state.packet) {
		currLayout = componentsLayout[state.layoutComponent]
		const packet = state.consume(actions)
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
				updateObjects(true, true, true)
				break

			case StatePacketAction.doDetailMigrate:
				await migrate(state, token.dataObj)
				updateObjects(false, false, false)
				break

			case StatePacketAction.doDetailNew:
				parentTab = state.app.getCurrTabParentTab()
				if (parentTab) parentTab.data?.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, '')
				await query(state, state.app.getCurrTab(), TokenApiQueryType.preset)
				updateObjects(false, true, true)
				break

			case StatePacketAction.doDetailProcessExecute:
				alert('detailProcessExecute...')
				// await migrate(state, token.dataObj)
				updateObjects(false, false, false)
				break

			case StatePacketAction.doDetailSave:
				await state.app.saveDetail(state, packet.action, token)
				updateObjects(true, true, true)
				break

			case StatePacketAction.doDetailSaveAs:
				await state.app.tabDuplicate(state, token)
				updateObjects(false, true, true)
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
								updateObjects(false, true, true)
								break
							case DataRecordStatus.retrieved:
							case DataRecordStatus.update:
								await query(state, currTab, TokenApiQueryType.retrieve)
								updateObjects(false, true, true)
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
				updateObjects(false, false, false)
				break

			case StatePacketAction.doListDetailEdit:
				await state.app.addLevelNode(state, token, TokenApiQueryType.retrieve)
				updateObjects(true, true, true)
				break

			case StatePacketAction.doListDetailNew:
				await state.app.addLevelNode(state, token, TokenApiQueryType.preset)
				updateObjects(true, true, true)
				break

			case StatePacketAction.doListSelfRefresh:
				await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve)
				updateObjects(false, true, true)
				break

			case StatePacketAction.doListSelfSave:
				const rtn = await state.app.saveList(state, token)
				updateObjects(false, true, true)
				resetModes = false
				break

			case StatePacketAction.embedField:
				if (token instanceof TokenApiQuery) {
					await state.app.initEmbeddedField(state, token)
					updateObjects(true, true, true)
					resetModes = false
				}
				break

			case StatePacketAction.embedShell:
				break

			case StatePacketAction.modalEmbed:
				if (state instanceof StateSurfaceModal) {
					if (token instanceof TokenAppModalEmbedField) {
						await state.app.addLevelModal(state, token)
						updateObjects(true, true, true)
					} else {
						updateObjects(false, false, false)
					}
				}
				break

			case StatePacketAction.navBack:
				if (state.app.levels.length === 1) {
					returnHome(state)
				} else {
					await state.app.back(1)
					updateObjects(true, true, true)
				}
				break

			case StatePacketAction.navCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome(state)
					} else {
						await state.app.changeCrumbs(token)
						updateObjects(true, true, true)
					}
				}
				break

			case StatePacketAction.navRow:
				if (token instanceof TokenAppRow) {
					await state.app.rowUpdate(state, token)
					updateObjects(true, true, true)
				}
				break

			case StatePacketAction.navTreeNode:
				if (token instanceof TokenAppTreeNode) {
					state.newApp()
					await state.app.initNode(state, token)
					updateObjects(true, true, true)
				}
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
		data?: ParmsValuesState
	) => {
		currLevel = state.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			await query(state, currTab, TokenApiQueryType.retrieve)
		}
		updateObjects(true, true, true)
	}
	const fModalCloseUpdateEmbedListSelect = async (
		returnType: TokenAppModalReturnType,
		data?: ParmsValuesState
	) => {
		if (returnType === TokenAppModalReturnType.complete) {
			currLevel = state.app.getCurrLevel()
			if (currLevel) {
				const embedFieldName = data?.valueGet(ParmsObjType.embedFieldName)
				currTab = currLevel.getCurrTab()
				const idx = currTab.data.fields.findIndex((f) => f.embedFieldName === embedFieldName)
				if (idx > -1) currTab.data.fields[idx].data.parmsValues.dataUpdate(data?.valueGetAll())
				await query(state, currTab, TokenApiQueryType.save)
			}
			updateObjects(true, true, true)
		}
	}

	function returnHome(state: State) {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				action: StatePacketAction.navTreeSetParent,
				component: StatePacketComponent.navHome,
				confirmType: TokenAppDoActionConfirmType.objectChanged
			})
		})
	}

	function updateObjects(isUpdateObj: boolean, isUpdateObjData: boolean, isResetState: boolean) {
		state.app = state.app
		currTab = state.app.getCurrTab()
		if (currTab) {
			if (isResetState) state.resetState()
			if (isUpdateObj) dataObj = currTab.dataObj
			if (isUpdateObjData) dataObjData = currTab.data
		}
	}
</script>

{#if currLayout}
	<div class={state instanceof StateSurfaceEmbed ? '' : 'p-4'}>
		{#if currLayout.propDataObj && dataObj && dataObjData}
			<svelte:component
				this={currLayout.component}
				bind:state
				{dataObj}
				{dataObjData}
				on:formCancelled
			/>
		{:else if !currLayout.propDataObj}
			<svelte:component this={currLayout.component} bind:state on:formCancelled />
		{/if}
	</div>
{/if}

<!-- <DataViewer header="rowStatus" data={dataObjData?.getRowStatus()} /> -->
