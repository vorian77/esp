<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app'
	import { query } from '$comps/app/types.appQuery'
	import {
		State,
		StateLayoutStyle,
		StateSurfaceEmbed,
		StateSurfaceModal,
		StatePacket,
		StatePacketComponent,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQuery,
		TokenApiQueryType,
		TokenAppAction,
		TokenAppBack,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppModalEmbedField,
		TokenAppModalReturnType,
		TokenAppProcess,
		TokenAppRow,
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
	import LayoutSelectMultiple from '$comps/layout/LayoutSelectMultiple.svelte'
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

	const componentsLayout: Record<string, { component: string; propDataObj: boolean }> = {
		layoutApp: { component: LayoutApp, propDataObj: true },
		layoutContent: { component: LayoutContent, propDataObj: true },
		layoutProcess: { component: LayoutProcess, propDataObj: true },
		layoutSelectMultiple: { component: LayoutSelectMultiple, propDataObj: false },
		layoutTab: { component: LayoutTab, propDataObj: true }
	}

	const componentsProcess = [
		StatePacketComponent.navBack,
		StatePacketComponent.navCrumbs,
		StatePacketComponent.dataObj,
		StatePacketComponent.navRow,
		StatePacketComponent.navTree,
		StatePacketComponent.modal,
		StatePacketComponent.embedField
	]

	$: if (state && state.packet) {
		currLayout = componentsLayout[state.layoutComponent]
		const packet = state.consume(componentsProcess)
		if (packet) {
			;(async () => await process(packet))()
		}
	} else if (state) {
		if (state instanceof StateSurfaceEmbedShell) {
			// console.log('BaseLayout.no packet:', state)
			// updateObjects(true, true, false)
		}
	}

	async function process(packet: StatePacket) {
		const token = packet.token
		let resetModes = true

		switch (packet.component) {
			case StatePacketComponent.dataObj:
				if (token instanceof TokenAppDo) {
					switch (token.action) {
						case TokenAppAction.doDetailDelete:
							await state.app.saveDetail(state, token)
							updateObjects(true, true, true)
							break

						case TokenAppAction.doDetailMigrate:
							await migrate(state, token.dataObj)
							updateObjects(false, false, false)
							break

						case TokenAppAction.doDetailNew:
							parentTab = state.app.getCurrTabParentTab()
							if (parentTab)
								parentTab.data?.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, '')
							await query(state, state.app.getCurrTab(), TokenApiQueryType.preset)
							updateObjects(false, true, true)
							break

						case TokenAppAction.doDetailProcessExecute:
							alert('detailProcessExecute...')
							// await migrate(state, token.dataObj)
							updateObjects(false, false, false)
							break

						case TokenAppAction.doDetailSave:
							await state.app.saveDetail(state, token)
							updateObjects(true, true, true)
							break

						case TokenAppAction.doDetailSaveCancel:
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

						case TokenAppAction.doDetailSaveAs:
							await state.app.tabDuplicate(state, token)
							updateObjects(false, true, true)
							break

						case TokenAppAction.doEmbedListConfigEdit:
							await state.openModalEmbedListConfig(
								token,
								TokenApiQueryType.retrieve,
								fModalCloseUpdateEmbedListConfig
							)
							break

						case TokenAppAction.doEmbedListConfigNew:
							await state.openModalEmbedListConfig(
								token,
								TokenApiQueryType.preset,
								fModalCloseUpdateEmbedListConfig
							)
							break

						case TokenAppAction.doEmbedListSelect:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								currTab.data = state.dataObjState?.objData
							}
							await state.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)
							break

						case TokenAppAction.doExport:
							currLevel = state.app.getCurrLevel()
							if (currLevel) {
								currTab = currLevel.getCurrTab()
								if (currTab && currTab.dataObj) currTab.dataObj.export()
							}
							updateObjects(false, false, false)
							break

						case TokenAppAction.doListDetailEdit:
							await state.app.addLevelNode(state, token, TokenApiQueryType.retrieve)
							updateObjects(true, true, true)
							break

						case TokenAppAction.doListDetailNew:
							await state.app.addLevelNode(state, token, TokenApiQueryType.preset)
							updateObjects(true, true, true)
							break

						case TokenAppAction.doListSelfRefresh:
							await query(state, state.app.getCurrTab(), TokenApiQueryType.retrieve)
							updateObjects(false, true, true)
							break

						case TokenAppAction.doListSelfSave:
							const rtn = await state.app.saveList(state, token)
							updateObjects(false, true, true)
							resetModes = false
							break

						default:
							error(500, {
								file: FILENAME,
								function: 'processState.objAction',
								message: `No case defined for TokenApiDbActionType: ${token.action} `
							})
					}
				}
				break

			case StatePacketComponent.embedField:
				if (token instanceof TokenApiQuery) {
					await state.app.initEmbeddedField(state, token)
					updateObjects(true, true, true)
					resetModes = false
				}
				break

			case StatePacketComponent.modal:
				if (state instanceof StateSurfaceModal) {
					if (token instanceof TokenAppModalEmbedField) {
						await state.app.addLevelModal(state, token)
						updateObjects(true, true, true)
					} else {
						updateObjects(false, false, false)
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
						updateObjects(true, true, true)
					}
				}
				break

			case StatePacketComponent.navCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome(state)
					} else {
						await state.app.changeCrumbs(token)
						updateObjects(true, true, true)
					}
				}
				break

			case StatePacketComponent.navRow:
				if (token instanceof TokenAppRow) {
					await state.app.rowUpdate(state, token)
					updateObjects(true, true, true)
				}
				break

			case StatePacketComponent.navTree:
				if (token instanceof TokenAppTreeNode) {
					state.newApp()
					await state.app.initNode(state, token)
					updateObjects(true, true, true)
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
				component: StatePacketComponent.navHome,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTreeSetParent({ action: TokenAppAction.none })
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
