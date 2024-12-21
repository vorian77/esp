<script lang="ts">
	import { ContextKey, DataManager, DataObj, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAccess } from '$comps/form/field'
	import { FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
	import FormElement from '$comps/form/FormElement.svelte'
	import { innerHeight } from 'svelte/reactivity/window'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetail.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataRecord: DataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let elContent: HTMLDivElement
	let elContentTopY: number = $state()
	let tagGroupSections: TagGroupSection[] = $state()

	$effect(() => {
		elContentTopY = Math.ceil(elContent.getBoundingClientRect().top)
	})

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

	loadTags()
	function loadTags() {
		tagGroupSections = []
		let idxSection = 0
		let isOpenRow = false
		let isOpenSection = false

		dataObj.fields.forEach((field, idx) => {
			if (!isOpenSection) {
				idxSection = tagGroupSections.push(new TagGroupSection(false)) - 1
				isOpenSection = true
			}
			if (field.colDO.propNameRaw.startsWith('custom_section_start')) {
				if (!(idxSection === 0 && tagGroupSections[idxSection].rowIsEmpty())) {
					idxSection = tagGroupSections.push(new TagGroupSection(true)) - 1
					isOpenSection = true
				}
				tagGroupSections[idxSection].update(field)
			} else if (field.colDO.propNameRaw.startsWith('custom_section_end')) {
				isOpenSection = false
			} else {
				if (field.colDO.propNameRaw.startsWith('custom_row_start')) {
					isOpenRow = true
					if (!tagGroupSections[idxSection].rowIsEmpty()) tagGroupSections[idxSection].rowNew()
				} else if (field.colDO.propNameRaw.startsWith('custom_row_end')) {
					isOpenRow = false
				} else if (field.colDO.isDisplayable) {
					tagGroupSections[idxSection].rowAddIdx(field, idx, isOpenRow)
				}
			}
		})
	}
</script>

<!-- <h1>Form Detail</h1>
<DataViewer header="dataManager.dataRecord" data={dm.getRecordsDisplayRow(parms.dataObjId, 0)} />
<DataViewer header="dataManager.isObjStatus" data={dm.getStatus()} /> -->

<form
	id={'form_' + dataObj.raw.name}
	class="h-full max-h-full overflow-y-auto sm:p-4 sm:border rounded-md"
	style={`max-height: ${innerHeight.current - elContentTopY - 30}px;`}
	bind:this={elContent}
>
	<div class="sm:hidden max-h-full">
		{#each dataObj.fields as field, fieldIdx}
			{@const display =
				!field.colDO.colDB.isNonData &&
				field.colDO.isDisplayable &&
				field.fieldAccess !== FieldAccess.hidden}
			{@const elementParms = { ...parms, dataObj, field: dataObj.fields[fieldIdx], row: 0 }}
			{#if display}
				<FormElement parms={elementParms} />
			{/if}
		{/each}
	</div>

	<div class="hidden sm:block">
		{#each tagGroupSections as section}
			<fieldset
				class={section.isVisible ? 'p-4 border-1 mb-4' : 'p-0 border-0'}
				style:border-color={section.isVisible ? section.color : 'transparent'}
			>
				{#if section.legend}
					<legend class="text-lg font-bold">{section.legend}</legend>
				{/if}

				{#each section.rows as row}
					<div class={row.isRow ? 'w-full flex flex-row gap-x-4' : ''}>
						{#each row.indexes as fieldIdx}
							{@const elementParms = { ...parms, dataObj, field: dataObj.fields[fieldIdx], row: 0 }}
							<div class="grow">
								<FormElement parms={elementParms} />
							</div>
						{/each}
					</div>
				{/each}
			</fieldset>
		{/each}
	</div>
</form>
