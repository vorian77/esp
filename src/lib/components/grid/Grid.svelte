<script lang="ts">
	import { onMount } from 'svelte'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import {
		TokenApiUserPref,
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
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
		type RowNode,
		type RowNodeSelectedEvent,
		type SelectionChangedEvent,
		type ValueGetterParams,
		type ValueSetterParams
	} from 'ag-grid-community'
	import 'ag-grid-enterprise'
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import {
		columnTypes,
		dataTypeDefinitions,
		GridManagerOptions,
		GridSettings,
		GridSettingsColumns
	} from '$comps/grid/grid'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		DataObjSort,
		DataObjSortItem,
		ParmsValuesType,
		ParmsUser,
		ParmsUserDataType,
		required,
		strRequired
	} from '$utils/types'
	import { StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { ParmsValues } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import { FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { State, StateSurfaceModal } from '$comps/app/types.appState'
	import GridFilter from '$comps/grid/GridFilter.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/other/ListBox.svelte'

	export let options: GridOptions

	let eGui: HTMLDivElement
	let grid: GridApi
	let innerHeight = window.innterHeight
	let isSuppressFilterSort: boolean
	let rowCountFiltered: number
	let rowCountSelected: number
	let rowData: any[]
	let style = ''
	let styleMaxHeight = ''

	$: if (innerHeight) resize()

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
			columnDefs: options.columnDefs,
			columnTypes,
			dataTypeDefinitions,
			defaultColDef: {
				filter: !isSuppressFilterSort,
				filterParams: {
					buttons: ['reset']
				},
				sortable: !isSuppressFilterSort
			},
			getRowId: (params: GetRowIdParams) => params.data.id || '',
			onCellClicked: options.onCellClicked,
			onCellValueChanged,
			onFilterChanged: onFilterChanged,
			onRowDragEnd,
			onRowDragMove,
			onSelectionChanged,
			postSortRows: onSort,
			rowData,
			rowSelection: {
				mode: options.isSuppressSelect
					? undefined
					: options.isSelect && options.isSelectMulti
						? 'multiRow'
						: 'singleRow',
				checkboxes: options.isSelect,
				enableClickSelection: !(
					options.isSelect ||
					options.isSelectMulti ||
					options.isSuppressSelect
				)
			},
			rowDragManaged: options.listReorderColumn ? true : false,
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
		grid = createGrid(eGui, gridOptions)

		if (options.isSelect) {
			const selectedIds = options.parmStateSelectedIds
			if (options.isSelectMulti) {
				const selected: IRowNode[] = []
				const deselected: IRowNode[] = []
				grid.forEachNode((node) => {
					if (selectedIds.includes(node.data!.id)) {
						selected.push(node)
					} else {
						deselected.push(node)
					}
				})
				grid.setNodesSelected({ nodes: selected, newValue: true })
				grid.setNodesSelected({ nodes: deselected, newValue: false })
			} else {
				const selected = grid.getRowNode(selectedIds[0])
				if (selected) selected.setSelected(true)
			}
		}

		// apply user settings
		console.log('Grid.onMount', {
			settings: options.userSettings
		})
		settingSortSet(options.userSettings.getPref(ParmsUserDataType.listSortModel)) // sort first because it triggers filter
		settingsFilterQuickSet(options.userSettings.getPref(ParmsUserDataType.listFilterQuick))
		grid.setFilterModel(options.userSettings.getPref(ParmsUserDataType.listFilterModel))
		updateCounters()

		return () => {
			saveUserSettings()
			grid.destroy()
		}
	})

	async function saveUserSettings() {
		if (options?.userSettings?.idUser) {
			// set columns state
			options.userSettings.setPref(
				ParmsUserDataType.listColumnsModel,
				new GridSettingsColumns(grid.getAllGridColumns())
			)
			console.log('Grid.saveUserSettings', {
				settings: options.userSettings
			})
			await apiFetch(
				ApiFunction.sysSetUserPref,
				new TokenApiUserPref(
					options.userSettings.idUser,
					options.userSettings.idFeature,
					options.userSettings
				)
			)
		}
	}

	function onCellValueChanged(event: NewValueParams) {
		if (options.fCallbackUpdateValue) options.fCallbackUpdateValue(event.colDef.field, event.data)
	}

	function onFilterChanged(event: FilterChangedEvent) {
		switch (event.source) {
			case 'columnFilter':
				options.userSettings.setPref(ParmsUserDataType.listFilterModel, event.api.getFilterModel())
				break
			case 'quickFilter':
				options.userSettings.setPref(ParmsUserDataType.listFilterQuick, event.api.getQuickFilter())
				break
		}
		onFilterChangedDeselect()
		updateCounters()
		if (options.fCallbackFilter) options.fCallbackFilter(event)
	}
	function onFilterChangedDeselect() {
		// deselect rows that are not displayed
		const deselected: IRowNode[] = []
		grid.forEachNode((rowNode, index) => {
			if (rowNode.selected && !rowNode.displayed) {
				deselected.push(rowNode)
			}
		})
		grid.setNodesSelected({ nodes: deselected, newValue: false })
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
			grid.clearFocusedCell()
		}

		function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
			let element = arr[fromIndex]
			arr.splice(fromIndex, 1)
			arr.splice(toIndex, 0, element)
		}
	}

	function onSort(event: PostSortRowsParams) {
		if (grid) {
			options.userSettings.setPref(ParmsUserDataType.listSortModel, settingSortGet())
		}
	}

	function onSelectionChanged(event: SelectionChangedEvent) {
		if (options.onSelectionChanged) options.onSelectionChanged(event)
		updateCounters()
	}

	function resize() {
		const rowCount = grid.getDisplayedRowCount()
		const { headerHeight, rowHeight } = grid.getSizesForCurrentTheme()
		const rowsMin = 3
		let rowsMax: number
		let rowsDisplay: number

		if (options.isEmbed) {
			rowsMax = 8
			rowsDisplay = rowCount < rowsMin ? rowsMin : rowCount > rowsMax ? rowsMax : rowCount
		} else {
			const vh = innerHeight
			const gridY = eGui.getBoundingClientRect().y
			const footerH = 100
			rowsMax = Math.floor(((vh - gridY - footerH) * 0.85) / rowHeight)
			rowsDisplay = rowCount < rowsMin ? rowsMin : rowCount > rowsMax ? rowsMax : rowCount
		}
		const height = headerHeight + rowsDisplay * rowHeight + 9
		eGui.style.setProperty('height', `${height}px`)
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
		grid.setGridOption('quickFilterText', listFilterQuick)
	}

	function settingSortGet() {
		if (grid) {
			let sortObj = new DataObjSort()
			grid
				.getColumnState()
				.filter(function (s) {
					return s.sort !== null
				})
				.map(function (s) {
					sortObj.addItem(s.colId, s.sort, s.sortIndex)
				})
			return sortObj
		}
	}

	function settingSortSet(sort: DataObjSort) {
		if (grid) {
			let sortModel = []

			sort.sortItems.forEach((item, i) => {
				sortModel.push({
					colId: item.colId,
					sort: item.sort,
					sortIndex: i
				})
			})

			grid.applyColumnState({
				state: sortModel,
				defaultState: { sort: null }
			})
		}
	}

	function updateCounters() {
		rowCountFiltered = grid.getDisplayedRowCount()
		if (options.isSelect) rowCountSelected = grid.getSelectedNodes().length
		resize()
	}
</script>

<svelte:window bind:innerHeight />
<GridFilter
	isHideFilter={isSuppressFilterSort}
	listFilterQuick={options.userSettings.getPref(ParmsUserDataType.listFilterQuick)}
	{rowCountFiltered}
	{rowCountSelected}
	setFilterQuick={settingsFilterQuickSet}
/>
<div bind:this={eGui} style:max-height={styleMaxHeight} {style} class="ag-theme-quartz h-full" />

<!-- <DataViewer header="rowCount" data={{ rowCountFiltered, rowCountSelected }} /> -->
<!-- <DataViewer header="columnDefs" data={options.columnDefs} /> -->
<!-- <DataViewer header="rowData" data={rowData} /> -->
