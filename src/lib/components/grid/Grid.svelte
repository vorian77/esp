<script lang="ts">
	import { onMount } from 'svelte'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import { TokenAppModalReturnType, TokenAppUserActionConfirmType } from '$utils/types.token'
	import {
		createGrid,
		type CellClickedEvent,
		type CellEditingStartedEvent,
		type CellEditingStoppedEvent,
		type ColDef,
		type ColumnEvent,
		type FilterChangedEvent,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type GridParams,
		type GridReadyEvent,
		type IRowNode,
		type ISelectCellEditorParams,
		type Module,
		type NewValueParams,
		type PostSortRowsParams,
		type RowClassParams,
		type RowNode,
		type RowNodeSelectedEvent,
		type SelectionChangedEvent,
		type ValueGetterParams,
		type ValueSetterParams
	} from 'ag-grid-community'
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import 'ag-grid-charts-enterprise'
	import { LicenseManager } from 'ag-grid-charts-enterprise'
	import {
		columnTypes,
		dataTypeDefinitions,
		getStyles,
		GridManagerOptions,
		GridSettingsColumns
	} from '$comps/grid/grid'
	import {
		compareValuesRecord,
		ContextKey,
		DataObj,
		DataObjData,
		DataObjSort,
		DataObjSortItem,
		getArray,
		GridStyle,
		MethodResult,
		ParmsValuesType,
		PropDataType,
		required,
		strRequired,
		UserParmItemType
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { ParmsValues } from '$utils/types'
	import { FieldAccess, FieldColor, FieldElement } from '$comps/form/field.svelte'
	import { State, StateSurfacePopup } from '$comps/app/types.appState.svelte'
	import ListFilter from '$comps/form/ListFilter.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'
	import { Smartphone } from 'lucide-svelte'
	import { list } from '@vercel/blob'

	LicenseManager.setLicenseKey(
		'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-069958}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2025}____[v3]_[0102]_MTc2MTA4NzYwMDAwMA==38662b93f270b810aa21446e810c2c8e'
	)

	const FILENAME = '$comps/other/ListBox.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let {
		api = $bindable(),
		options,
		parms
	}: { api: GridApi; options: GridManagerOptions; parms: DataRecord } = $props()

	let eGui: HTMLElement
	let isSuppressFilterSort: boolean = $state(false)
	let listFilterModel = $derived(sm.userParmGetOrDefault(UserParmItemType.listFilterModel, ''))
	let listFilterQuick = $derived(sm.userParmGetOrDefault(UserParmItemType.listFilterQuick, ''))
	let rowCountFiltered: number = $state()
	let rowCountSelected: number = $state()
	let rowData: any[]
	let styleMaxHeight = ''

	onMount(() => {
		// set options
		isSuppressFilterSort = options.isSuppressFilterSort || options.listReorderColumn !== ''
		rowData = options.rowData

		// derived columnDefs changes
		if (options.listReorderColumn) {
			setGridColumnsProp(options.columnDefs, '', 'rowDrag', true)
			// rowDrag does not work with sort - manually sort rowData
			const reorderColumn = options.listReorderColumn
			rowData.sort((a, b) => a[reorderColumn] - b[reorderColumn])
		}

		const idxId = options.columnDefs.findIndex((c) => c.field === 'id')
		if (idxId > -1) options.columnDefs[idxId].suppressColumnsToolPanel = true

		styleMaxHeight = isSuppressFilterSort ? '100%' : 'calc(100% - 70px)'

		const gridOptions = {
			alwaysMultiSort: true,
			autoSizeStrategy: {
				type: autoSizeStrategy(options.columnDefs)
			},
			columnDefs: options.columnDefs,
			columnTypes,
			context: options.context,
			dataTypeDefinitions,
			defaultColDef: {
				autoHeaderHeight: true,
				filter: !isSuppressFilterSort,
				filterParams: {
					buttons: ['reset']
				},
				sortable: !isSuppressFilterSort,
				wrapHeaderText: false
			},
			getRowId: (params: GetRowIdParams) => params.data.id,
			getRowStyle,
			onCellClicked: options.onCellClicked,
			onCellValueChanged,
			onFilterChanged: onFilterChanged,
			onRowDragEnd,
			onRowDragMove,
			onSelectionChanged,
			postSortRows: onSort,
			rowData,
			rowDragManaged: options.listReorderColumn ? true : false,
			rowSelection: {
				mode: options.isSuppressSelect
					? undefined
					: options.isPopup && options.isSelectMulti
						? 'multiRow'
						: 'singleRow',
				checkboxes: options.isPopup,
				enableClickSelection: !(options.isPopup || options.isSuppressSelect)
			},
			sideBar: {
				toolPanels: [
					{
						id: 'columns',
						labelDefault: 'Columns',
						labelKey: 'columns',
						iconKey: 'columns',
						toolPanel: 'agColumnsToolPanel',
						toolPanelParams: {
							suppressRowGroups: true,
							suppressValues: true,
							suppressPivots: true,
							suppressPivotMode: true,
							suppressColumnFilter: true,
							suppressColumnSelectAll: true,
							suppressColumnExpandAll: true
						}
					}
				]
			},
			suppressSetFilterByDefault: true
		}

		// <todo> 241115 - bug - createGrid makes options.userSettings.listSortModel undefined
		// const rawSort =
		const rawSort = sm.userParmGetOrDefault(UserParmItemType.listSortModel, options.sortModel)

		api = createGrid(eGui, gridOptions)

		function autoSizeStrategy(columnDefs: ColDef) {
			const avgColW = 150
			const colCntVisible = columnDefs.reduce((acc, col) => {
				return acc + (col.hide ? 0 : 1)
			}, 0)

			// const strategy =
			// 	colCntVisible * avgColW > eGui.offsetWidth ? 'fitCellContents' : 'fitGridWidth'

			const strategy = 'fitProvidedWidth'

			// console.log('Grid.autoSizeStrategy:', {
			// 	gridWidth: eGui.offsetWidth,
			// 	colCntVisible,
			// 	strategy
			// })
			return strategy
		}

		if (options.isPopup) {
			const selectedIds = options.parmStateSelectedIds
			if (options.isSelectMulti) {
				const selected: IRowNode[] = []
				const deselected: IRowNode[] = []
				api.forEachNode((node) => {
					if (selectedIds.includes(node.data.id)) {
						selected.push(node)
					} else {
						deselected.push(node)
					}
				})
				api.setNodesSelected({ nodes: selected, newValue: true })
				api.setNodesSelected({ nodes: deselected, newValue: false })
			} else {
				const selected = api.getRowNode(selectedIds[0])
				if (selected) selected.setSelected(true)
			}
		}

		// apply user settings - sort first because it triggers filter
		settingSortSet(rawSort)
		settingsFilterQuickSet(listFilterQuick)
		api.setFilterModel(listFilterModel)
		updateCounters()

		return () => {
			saveUserSettings()
			api.destroy()
		}
	})

	function getRowStyle(params: RowClassParams) {
		const gridStyles: GridStyle[] = getArray(params.context.gridStyles)
		const result: MethodResult = getStyles(gridStyles, params.data)
		return result.error ? {} : result.data
	}

	function onCellValueChanged(event: NewValueParams) {
		if (options.fCallbackUpdateValue) options.fCallbackUpdateValue(event.colDef.field, event.data)
	}

	function onFilterChanged(event: FilterChangedEvent) {
		switch (event.source) {
			case 'columnFilter':
				sm.userParmSet(UserParmItemType.listFilterModel, event.api.getFilterModel())
				break
			case 'quickFilter':
				sm.userParmSet(UserParmItemType.listFilterQuick, event.api.getQuickFilter())
				break
		}
		onFilterChangedDeselect()
		updateCounters()
		if (options.fCallbackFilter) options.fCallbackFilter(event)
	}
	function onFilterChangedDeselect() {
		// deselect rows that are not displayed
		const deselected: IRowNode[] = []
		api.forEachNode((rowNode, index) => {
			if (rowNode.selected && !rowNode.displayed) {
				deselected.push(rowNode)
			}
		})
		api.setNodesSelected({ nodes: deselected, newValue: false })
	}

	function onRowDragEnd(event: RowDragEndEvent) {
		if (options.fCallbackUpdateValue) {
			rowData.forEach((row, idx) => {
				options.fCallbackUpdateValue(options.listReorderColumn, {
					id: row.id,
					[options.listReorderColumn]: idx
				})
			})
		}
	}

	function onRowDragMove(event: RowDragMoveEvent) {
		let movingNode = event.node
		let overNode = event.overNode
		let rowNeedsToMove = movingNode !== overNode

		if (rowNeedsToMove) {
			let movingData = movingNode.data
			let overData = overNode!.data

			let fromIndex = rowData.indexOf(movingData)
			let toIndex = rowData.indexOf(overData)

			let newStore = rowData.slice()
			moveInArray(newStore, fromIndex, toIndex)

			rowData = newStore
			api.clearFocusedCell()
		}

		function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
			let element = arr[fromIndex]
			arr.splice(fromIndex, 1)
			arr.splice(toIndex, 0, element)
		}
	}

	function onSort(event: PostSortRowsParams) {
		sm.userParmSet(UserParmItemType.listSortModel, settingSortGet())
	}

	function onSelectionChanged(event: SelectionChangedEvent) {
		if (options.onSelectionChanged) options.onSelectionChanged(event)
		updateCounters()
	}

	async function saveUserSettings() {
		sm.userParmSet(
			UserParmItemType.listColumnsModel,
			new GridSettingsColumns(api.getAllGridColumns())
		)
		await sm.userParmSave()
	}

	function setGridColumnsProp(
		columns: Record<number | string, any>[],
		field: string,
		prop: string,
		value: any
	) {
		let columnIdx: number

		if (field === '') {
			// first visible field
			columnIdx = columns.findIndex((c) => c.hide === false)
		} else {
			columnIdx = columns.findIndex((c) => c.field === field)
		}
		if (columnIdx > -1) {
			columns[columnIdx][prop] = value
		}
	}

	function settingsFilterQuickSet(listFilterQuick: string) {
		api.setGridOption('quickFilterText', listFilterQuick)
	}

	function settingSortGet() {
		if (api && !api.isDestroyed()) {
			let sortObj = new DataObjSort()
			api
				.getColumnState()
				.filter((s) => {
					return s.sort !== null
				})
				.forEach((s) => {
					sortObj.addItem(s.colId, s.sort, s.sortIndex)
				})
			return sortObj
		}
	}

	function settingSortSet(sort: DataObjSort) {
		if (api) {
			let sortModel = []

			if (sort)
				sort.sortItems.forEach((item, i) => {
					sortModel.push({
						colId: item.colId,
						sort: item.sort,
						sortIndex: item.sortIndex
					})
				})

			api.applyColumnState({
				state: sortModel,
				defaultState: { sort: null }
			})
		}
	}

	function updateCounters() {
		rowCountFiltered = api.getDisplayedRowCount()
		if (options.isPopup) rowCountSelected = api.getSelectedNodes().length
	}
</script>

<div class="h-full flex rounded-md">
	<div class="grow flex flex-col gap-3">
		<ListFilter
			isHideFilter={isSuppressFilterSort}
			filter={listFilterQuick}
			{rowCountFiltered}
			{rowCountSelected}
			fSetFilter={settingsFilterQuickSet}
		/>
		<div bind:this={eGui} class="h-full ag-theme-quartz" />
	</div>
	<DataObjActionsObj {parms} />
</div>
