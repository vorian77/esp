<script lang="ts">
	import { DataObj, DataObjData } from '$utils/types'
	import { State } from '$comps/app/types.appState'
	import { Field } from '$comps/form/field'
	import { FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
	import FormElement from '$comps/form/FormElement.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetail.svelte'
	const FORM_NAME = ''
	const SUBMIT_BUTTON_NAME = 'SUBMIT_BUTTON_NAME'
	let dataHeightPadding = '350' //  <todo> 240314 - calc specific padding
	let dataHeight = `max-height: calc(100vh - ${dataHeightPadding}px);`

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
	let tagGroupSection: TagGroupSection[]

	$: loadData(dataObjData)

	function loadData(data: DataObjData) {
		dataObj.objData = data
		state.objStatus.setValid(dataObj.preValidate())
		state = state

		loadTags()
	}
	function loadTags() {
		tagGroupSection = []
		let idxSection = 0
		let isOpenRow = false
		let isOpenSection = false

		dataObj.fields.forEach((field, idx) => {
			if (!isOpenSection) {
				idxSection = tagGroupSection.push(new TagGroupSection(false)) - 1
				isOpenSection = true
			}
			if (field.colDO.propName.startsWith('custom_section_start')) {
				if (!(idxSection === 0 && tagGroupSection[idxSection].rowIsEmpty())) {
					idxSection = tagGroupSection.push(new TagGroupSection(true)) - 1
					isOpenSection = true
				}
				tagGroupSection[idxSection].update(field)
			} else if (field.colDO.propName.startsWith('custom_section_end')) {
				isOpenSection = false
			} else {
				if (field.colDO.propName.startsWith('custom_row_start')) {
					isOpenRow = true
					if (!tagGroupSection[idxSection].rowIsEmpty()) tagGroupSection[idxSection].rowNew()
				} else if (field.colDO.propName.startsWith('custom_row_end')) {
					isOpenRow = false
				} else {
					tagGroupSection[idxSection].rowAddIdx(field, idx, isOpenRow)
				}
			}
		})
	}
	class TagGroupRow {
		isRow: boolean
		indexes: number[]
		constructor(isRow: boolean) {
			this.isRow = isRow
			this.indexes = []
		}
		setIsRow(isRow: boolean) {
			this.isRow = isRow
		}
	}
	class TagGroupSection {
		color?: string
		isVisible: boolean
		legend?: string
		rows: TagGroupRow[]
		constructor(isVisible: boolean) {
			this.isVisible = isVisible
			this.rows = []
		}
		rowAddIdx(field: Field, idx: number, isOpenRow: boolean) {
			if (!isOpenRow || this.rows.length === 0) this.rowNew()
			this.rows[this.rows.length - 1].indexes.push(idx)
		}
		rowNew() {
			this.rows.push(new TagGroupRow(true))
		}
		rowIsEmpty() {
			return this.rows.length === 0
		}
		update(field: FieldTagSection) {
			this.color = field.colDO.fieldColor.color
			this.isVisible = true
			this.legend = field.legend
		}
	}
</script>

<div id="root" class="overflow-y-scroll" style={dataHeight}>
	<form id={'form_' + dataObj.raw.name} on:submit|preventDefault>
		{#each tagGroupSection as section}
			<fieldset
				class={section.isVisible ? 'p-4 border-1' : 'p-0 border-0'}
				style:border-color={section.isVisible ? section.color : 'transparent'}
			>
				{#if section.legend}
					<legend class="text-xl font-bold">{section.legend}</legend>
				{/if}
				{#each section.rows as row}
					<div class={row.isRow ? 'w-full flex gap-x-4' : ''}>
						{#each row.indexes as fieldIdx}
							<div class="grow">
								<FormElement
									bind:state
									{dataObj}
									{dataObjData}
									field={dataObj.fields[fieldIdx]}
									row={0}
								/>
							</div>
						{/each}
					</div>
				{/each}
			</fieldset>
		{/each}
	</form>
</div>
