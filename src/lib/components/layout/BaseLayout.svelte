<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app'
	import { query } from '$comps/app/types.appQuery'
	import {
		State,
		StateLayoutStyle,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketComponent
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQuery,
		TokenApiQueryType,
		TokenAppBack,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoActionFieldType,
		TokenAppDoActionConfirmType,
		TokenAppModalEmbedField,
		TokenAppModalEmbedShell,
		TokenAppModalReturnType,
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
		currLayout = componentsLayout[state.layoutComponent]
		const packet = state.consume(componentsProcess)
		if (packet) {
			;(async () => await process(packet))()
		}
	}

	async function process(packet: StatePacket) {
		const token = packet.token
		let resetModes = true

		switch (packet.component) {
			case StatePacketComponent.dataObj:
				if (token instanceof TokenAppDo) {
					switch (token.actionType) {
						case TokenAppDoActionFieldType.detailDelete:
							await state.app.saveDetail(state, token)
							updateObjects(true, true)

							break

						case TokenAppDoActionFieldType.detailMigrate:
							await migrate(state, token.dataObj)
							updateObjects(false, false)
							break

						case TokenAppDoActionFieldType.detailNew:
							parentTab = state.app.getCurrTabParentTab()
							if (parentTab)
								parentTab.data?.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, '')
							await query(state, state.app.getCurrTab(), TokenApiQueryType.preset, state.app)
							updateObjects(false, true)
							break

						case TokenAppDoActionFieldType.detailProcessExecute:
							alert('detailProcessExecute...')
							// await migrate(state, token.dataObj)
							updateObjects(false, false)
							break

						case TokenAppDoActionFieldType.detailSave:
							await state.app.saveDetail(state, token)
							updateObjects(true, true)
							break

						case TokenAppDoActionFieldType.detailSaveCancel:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								if (currTab && currTab.dataObj) {
									const dataRow = currTab?.data?.rowsRetrieved?.getDetailRow()
									switch (dataRow.status) {
										case DataRecordStatus.preset:
											await query(state, currTab, TokenApiQueryType.preset, state.app)
											updateObjects(false, true)
											break
										case DataRecordStatus.retrieved:
										case DataRecordStatus.update:
											await query(state, currTab, TokenApiQueryType.retrieve, state.app)
											updateObjects(false, true)
											break
										default:
											error(500, {
												file: FILENAME,
												function: `processState.actionType: ${token.actionType}`,
												message: `No case defined for DataRecordStatus: ${dataRow.status} `
											})
									}
								}
							}
							break

						case TokenAppDoActionFieldType.detailSaveAs:
							await state.app.tabDuplicate(state, token)
							updateObjects(false, true)
							break

						case TokenAppDoActionFieldType.embedListConfigEdit:
							await state.openModalEmbedListConfig(
								token,
								TokenApiQueryType.retrieve,
								fModalCloseUpdateEmbedListConfig
							)
							break

						case TokenAppDoActionFieldType.embedListConfigNew:
							await state.openModalEmbedListConfig(
								token,
								TokenApiQueryType.preset,
								fModalCloseUpdateEmbedListConfig
							)
							break

						case TokenAppDoActionFieldType.embedListSelect:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								currTab.data = state.dataObjState?.objData
							}
							await state.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)
							break

						case TokenAppDoActionFieldType.export:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								if (currTab && currTab.dataObj) currTab.dataObj.export()
							}
							updateObjects(false, false)
							break

						case TokenAppDoActionFieldType.listDetailEdit:
							await state.app.addLevelNode(state, token, TokenApiQueryType.retrieve)
							updateObjects(true, true)
							break

						case TokenAppDoActionFieldType.listDetailNew:
							await state.app.addLevelNode(state, token, TokenApiQueryType.preset)
							updateObjects(true, true)
							break

						case TokenAppDoActionFieldType.listSelfRefresh:
							await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve, state.app)
							updateObjects(false, true)
							break

						case TokenAppDoActionFieldType.listSelfReorder:
							dataObj.modeAdd(DataObjMode.ReorderOn)
							updateObjects(false, false)
							break

						case TokenAppDoActionFieldType.listSelfReorderCancel:
							await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve, state.app)
							dataObj.modeDrop(DataObjMode.ReorderOn)
							updateObjects(false, true)
							resetModes = false
							break

						case TokenAppDoActionFieldType.listSelfSave:
							const rtn = await state.app.saveList(state, token)
							dataObj.modeDrop(DataObjMode.ReorderOn)
							updateObjects(false, true)
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
					updateObjects(true, true)
					resetModes = false
				}
				break

			case StatePacketComponent.embedShell:
				if (token instanceof TokenAppModalEmbedShell) {
					await state.app.addLevelEmbedShell(state, token)
					updateObjects(true, true)
					resetModes = false
				}
				break

			case StatePacketComponent.modal:
				if (state instanceof StateSurfaceModal) {
					if (token instanceof TokenAppModalEmbedField) {
						await state.app.addLevelModal(state, token)
						updateObjects(true, true)
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
						updateObjects(true, true)
					}
				}
				break

			case StatePacketComponent.navCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome(state)
					} else {
						await state.app.changeCrumbs(token)
						updateObjects(true, true)
					}
				}
				break

			case StatePacketComponent.navRow:
				if (token instanceof TokenAppRow) {
					await state.app.rowUpdate(state, token)
					updateObjects(true, true)
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
						updateObjects(true, true)
					}
				}
				break

			case StatePacketComponent.navTree:
				if (token instanceof TokenAppTreeNode) {
					state.newApp()
					await state.app.initNode(state, token)
					updateObjects(true, true)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'processAction',
					message: `No case defined for NavActionComponent: ${packet.component}`
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
			await query(state, currTab, TokenApiQueryType.retrieve, state.app)
		}
		updateObjects(true, true)
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
				await query(state, currTab, TokenApiQueryType.save, state.app)
			}
			updateObjects(true, true)
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

	function updateObjects(updateObj: boolean, updateObjData: boolean) {
		state.app = state.app
		currTab = state.app.getCurrTab()
		if (currTab) {
			if (updateObj) dataObj = currTab.dataObj
			if (updateObjData) {
				state.resetState()
				dataObjData = currTab.data
			}
		}
	}
</script>

{#if currLayout && dataObj && dataObjData}
	<div class={state instanceof StateSurfaceEmbed ? '' : 'p-4'}>
		<svelte:component this={currLayout} bind:state {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}

<!-- <DataViewer header="rowStatus" data={dataObjData?.getRowStatus()} /> -->
