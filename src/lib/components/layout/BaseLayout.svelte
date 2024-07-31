<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app'
	import { query } from '$comps/app/types.appQuery'
	import {
		State,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketComponent
	} from '$comps/app/types.appState'
	import {
		TokenApiQuery,
		TokenApiQueryType,
		TokenAppBack,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoActionFieldType,
		TokenAppDoActionConfirmType,
		TokenAppModalEmbedField,
		TokenAppModalEmbedShell,
		TokenAppProcess,
		TokenAppRow,
		TokenAppTab,
		TokenAppTreeNode,
		TokenAppTreeSetParent
	} from '$utils/types.token'
	import {
		DataObj,
		DataObjCardinality,
		DataObjMode,
		DataObjData,
		DataRecordStatus
	} from '$utils/types'
	import { NodeType } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { migrate } from '$utils/utils.processMigrate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/dataObj/DataObj.svelte'

	export let state: State

	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let currLayout: any
	let currLevel: AppLevel | undefined
	let currTab: AppLevelTab | undefined
	let parentTab: AppLevelTab | undefined
	let dataObjUpdate: ObjUpdate | undefined

	const componentsLayout: Record<string, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}
	const componentsProcess = [
		StatePacketComponent.navBack,
		StatePacketComponent.navCrumbs,
		StatePacketComponent.dataObj,
		StatePacketComponent.navRow,
		StatePacketComponent.navTab,
		StatePacketComponent.navTree,
		StatePacketComponent.modal,
		StatePacketComponent.embedField,
		StatePacketComponent.embedShell
	]

	$: if (state && state.packet) {
		const packet = state.consume(componentsProcess)
		if (packet) {
			;(async () => await process(packet))()
		}
	}

	async function process(packet: StatePacket) {
		currLayout = componentsLayout[state.layoutComponent]
		const token = packet.token
		let resetModes = true

		switch (packet.component) {
			case StatePacketComponent.dataObj:
				if (token instanceof TokenAppDo) {
					switch (token.actionType) {
						case TokenAppDoActionFieldType.detailDelete:
							await state.app.saveDetail(state, token)
							dataObjUpdate = new ObjUpdate(true, true)
							break

						case TokenAppDoActionFieldType.detailMigrate:
							await migrate(state, token.dataObj)
							dataObjUpdate = new ObjUpdate(false, false)
							break

						case TokenAppDoActionFieldType.detailNew:
							parentTab = state.app.getCurrTabParentTab()
							if (parentTab) parentTab.metaData.valueSetId('')
							await query(state, state.app.getCurrTab(), TokenApiQueryType.preset, state.app)
							dataObjUpdate = new ObjUpdate(false, true)
							break

						case TokenAppDoActionFieldType.detailProcessExecute:
							alert('detailProcessExecute...')
							// await migrate(state, token.dataObj)
							dataObjUpdate = new ObjUpdate(false, false)
							break

						case TokenAppDoActionFieldType.detailSave:
							await state.app.saveDetail(state, token)
							dataObjUpdate = new ObjUpdate(true, true)
							break

						case TokenAppDoActionFieldType.detailSaveCancel:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								if (currTab) {
									if (currTab.dataObj) {
										const dataRow = currTab.dataObj.data.getDetailRow()
										switch (dataRow.status) {
											case DataRecordStatus.preset:
												await query(state, currTab, TokenApiQueryType.preset, state.app)
												dataObjUpdate = new ObjUpdate(false, true)
												break
											case DataRecordStatus.retrieved:
											case DataRecordStatus.update:
												await query(state, currTab, TokenApiQueryType.retrieve, state.app)
												dataObjUpdate = new ObjUpdate(false, true)
												break
											default:
												error(500, {
													file: FILENAME,
													function: `processState.actionType: ${token.actionType}`,
													message: `No case defined for DataRecordStatus: ${dataRow.status} `
												})
										}
										console.log('detailSaveCancel.dataRow', dataRow)
									}
								}
							}

							break

						case TokenAppDoActionFieldType.detailSaveAs:
							await state.app.tabDuplicate(state, token)
							dataObjUpdate = new ObjUpdate(false, true)
							break

						case TokenAppDoActionFieldType.embedListConfigNew:
							const actionProxy = state.proxyGet(TokenAppDoActionFieldType.embedListConfigNew)
							if (actionProxy) actionProxy({ state: token.state })
							dataObjUpdate = new ObjUpdate(false, false)
							break

						case TokenAppDoActionFieldType.export:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								if (currTab && currTab.dataObj) currTab.dataObj.export()
							}
							dataObjUpdate = new ObjUpdate(false, false)
							break

						case TokenAppDoActionFieldType.listDetailEdit:
							await state.app.addLevelNode(state, TokenApiQueryType.retrieve)
							dataObjUpdate = new ObjUpdate(true, true)
							break

						case TokenAppDoActionFieldType.listDetailNew:
							await state.app.addLevelNode(state, TokenApiQueryType.preset)
							dataObjUpdate = new ObjUpdate(true, true)
							break

						case TokenAppDoActionFieldType.listSelfRefresh:
							await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve, state.app)
							dataObjUpdate = new ObjUpdate(false, true)
							break

						case TokenAppDoActionFieldType.listSelfReorder:
							dataObj.modeAdd(DataObjMode.ReorderOn)
							dataObjUpdate = new ObjUpdate(false, false)
							break

						case TokenAppDoActionFieldType.listSelfReorderCancel:
							await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve, state.app)
							dataObj.modeDrop(DataObjMode.ReorderOn)
							dataObjUpdate = new ObjUpdate(false, true)
							resetModes = false
							break

						case TokenAppDoActionFieldType.listSelfSave:
							const rtn = await state.app.saveList(state, token)
							dataObj.modeDrop(DataObjMode.ReorderOn)
							dataObjUpdate = new ObjUpdate(false, true)
							resetModes = false
							break

						default:
							error(500, {
								file: FILENAME,
								function: 'processState.objAction',
								message: `No case defined for TokenApiDbActionType: ${token.actionType} `
							})
					}
				}
				break

			case StatePacketComponent.embedField:
				if (token instanceof TokenApiQuery) {
					await state.app.initEmbeddedField(state, token)
					dataObjUpdate = new ObjUpdate(true, true)
					resetModes = false
				}
				break

			case StatePacketComponent.embedShell:
				if (token instanceof TokenAppModalEmbedShell) {
					await state.app.addLevelEmbedShell(state, token)
					dataObjUpdate = new ObjUpdate(true, true)
					resetModes = false
				}
				break

			case StatePacketComponent.modal:
				if (state instanceof StateSurfaceModal) {
					if (token instanceof TokenAppModalEmbedField) {
						await state.app.initModal(state, token.dataObjSourceEmbed)
						// <todo> - 240428 - remove requirement to re-select the display list by using embedded list

						// retrieve dialog
						switch (state.cardinality) {
							case DataObjCardinality.list:
								break

							case DataObjCardinality.detail:
								await state.app.addLevelModal(state, token)
								break

							default:
								error(500, {
									file: FILENAME,
									function: 'state.app.initDialog',
									message: `No case defined for state.cardinality: ${state.cardinality}`
								})
						}
						dataObjUpdate = new ObjUpdate(true, true)
					}
					if (token instanceof TokenAppProcess) {
						await state.app.initModal(state, token.dataObjSource)
						dataObjUpdate = new ObjUpdate(true, true)
					}
				}
				break

			// navagation objects
			case StatePacketComponent.navBack:
				if (token instanceof TokenAppBack) {
					if (state.app.levels.length === 1) {
						returnHome(state)
					} else {
						await state.app.back(1)
						dataObjUpdate = new ObjUpdate(true, true)
					}
				}
				break

			case StatePacketComponent.navCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome(state)
					} else {
						await state.app.changeCrumbs(token)
						dataObjUpdate = new ObjUpdate(true, true)
					}
				}
				break

			case StatePacketComponent.navRow:
				if (token instanceof TokenAppRow) {
					await state.app.rowUpdate(state, token.rowAction)
					dataObjUpdate = new ObjUpdate(true, true)
				}
				break

			case StatePacketComponent.navTab:
				if (token instanceof TokenAppTab) {
					currLevel = state.app.getCurrLevel()
					if (currLevel) {
						currLevel.setTabIdx(token.tabIdx)
						currTab = currLevel.getCurrTab()
						if (!currTab.isRetrieved) {
							await query(state, currTab, TokenApiQueryType.retrieve, state.app)
						}
						dataObjUpdate = new ObjUpdate(true, true)
					}
				}
				break

			case StatePacketComponent.navTree:
				if (token instanceof TokenAppTreeNode) {
					state.newApp()
					await state.app.initNode(state, token)
					dataObjUpdate = new ObjUpdate(true, true)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'processAction',
					message: `No case defined for NavActionComponent: ${packet.component}`
				})
		}

		// update data object
		if (dataObjUpdate) {
			state.app = state.app
			let newDataObj: DataObj | undefined
			let newDataObjData: DataObjData | undefined
			currTab = state.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				if (dataObjUpdate.updateObj) newDataObj = currTab.dataObj
				if (dataObjUpdate.updateObjData) {
					state.resetState()
					state.dataQuery.dataSave(state.app.getParms())
					newDataObjData = currTab.data
				}
			}
			if (newDataObj) dataObj = newDataObj
			if (newDataObjData) dataObjData = newDataObjData
		}
	}

	function returnHome(state: State) {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				component: StatePacketComponent.navHome,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTreeSetParent()
			})
		})
	}

	class ObjUpdate {
		updateObj: boolean
		updateObjData: boolean
		constructor(updateObj: boolean, updateObjData: boolean) {
			this.updateObjData = updateObjData
			this.updateObj = updateObj
		}
	}
</script>

{#if currLayout && dataObj && dataObjData}
	<div class={state instanceof StateSurfaceEmbed ? '' : 'p-4'}>
		<svelte:component this={currLayout} bind:state {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}

<!-- <DataViewer header="rowStatus" data={dataObjData?.getRowStatus()} /> -->
