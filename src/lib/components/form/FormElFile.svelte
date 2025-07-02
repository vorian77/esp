<script lang="ts">
	import { ContextKey, DataManager, DataObj, FileStorage, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldFile } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import {
		TokenApiFileParmDelete,
		TokenApiBlobParmUpload,
		TokenApiBlobAction,
		TokenApiBlobType
	} from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let elInput: any
	let files: FileList = $state()
	let recordIdCurrent: string = $state()
	let isSourceStorage = $state(false)
	let urlCurrent = $state()
	let urlOld = $state()

	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	$effect(() => {
		if (recordIdCurrent !== dataRecord?.id) {
			urlCurrent = undefined
			urlOld = undefined
			isSourceStorage = false
			recordIdCurrent = dataRecord?.id
		}
	})

	let field: FieldFile = $derived(parms.field)
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))
	$inspect('FormElFile', { fieldValue })
	$effect(() => {
		urlCurrent = fieldValue && fieldValue.url ? fieldValue.url : urlCurrent
		urlOld = fieldValue && fieldValue?.url ? fieldValue.url : urlOld
		isSourceStorage = fieldValue && fieldValue?.url ? true : false
	})
	let showImg = $derived(urlCurrent ? true : false)
	let labelDelete = $derived('Delete ' + field.colDO.label)
	let chooseBtnWidth = $derived(urlCurrent ? 'w-3/4' : 'w-full')
	let labelSelect = $derived(
		urlCurrent ? 'Choose New ' + field.colDO.label : 'Choose ' + field.colDO.label
	)
	const onDelete = async (event: Event) => {
		elInput.value = ''
		isSourceStorage = false
		urlCurrent = undefined
		if (urlOld) {
			await dm.setFieldValue(
				parms.dataObjId,
				parms.row,
				parms.field,
				new TokenApiFileParmDelete({
					urlOld
				})
			)
		} else {
			await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, null)
		}
	}

	const onNew = async (event: Event) => {
		if (files && files.length > 0) {
			isSourceStorage = false
			urlCurrent = URL.createObjectURL(files[0])

			let result: MethodResult = await field.getKey()
			if (result.error) return result
			const key = result.data

			await dm.setFieldValue(
				parms.dataObjId,
				parms.row,
				parms.field,
				new TokenApiBlobParmUpload({
					file: files[0],
					fileType: files[0].type.includes('pdf') ? TokenApiBlobType.pdf : TokenApiBlobType.image,
					key,
					urlOld
				})
			)
		}
	}

	function onDownload(event: Event) {
		if (Object.hasOwn(fieldValue, 'downloadUrl')) {
			sm.downloadUrl(fieldValue.downloadUrl, fieldValue.fileName)
		}
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault()
			if (fn) fn.call(this, event)
		}
	}
</script>

<!-- <DataViewer header="urlCurrent" data={urlCurrent} /> -->
<!-- <DataViewer header="urlOld" data={urlOld} /> -->
<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->

<fieldset>
	<legend>{field.colDO.label}</legend>
	<div>
		{#if fieldValue && urlCurrent}
			{#if fieldValue.fileType === TokenApiBlobType.image}
				<img
					alt={field.colDO.label}
					class="mx-auto p-4"
					hidden={!showImg}
					onclick={preventDefault(elInput.click())}
					onkeyup={preventDefault(elInput.click())}
					src={urlCurrent}
					width="80%"
				/>
			{:else if fieldValue.fileType === TokenApiBlobType.pdf}
				<div class="flex justify-center">
					<iframe
						frameborder="0"
						height="600px"
						onclick={preventDefault(elInput.click())}
						onkeyup={preventDefault(elInput.click())}
						src={urlCurrent}
						title={field.colDO.label}
						width="80%"
					/>
				</div>
			{/if}
		{/if}

		<div class="flex mt-2">
			<button
				class="btn btn-action variant-filled-primary {chooseBtnWidth}"
				onclick={() => elInput.click()}
			>
				{labelSelect}
			</button>

			{#if urlCurrent}
				<button class="btn btn-action variant-filled-error ml-2 w-1/4" onclick={onDelete}>
					{labelDelete}
				</button>
			{/if}

			{#if isSourceStorage}
				<button class="btn btn-action variant-filled-primary ml-2 w-1/4" onclick={onDownload}>
					Download
				</button>
			{/if}
		</div>

		<input
			accept="image/*,application/pdf"
			bind:files
			bind:this={elInput}
			class="input"
			hidden={true}
			id={field.colDO.propNamDBe}
			name={field.colDO.propName}
			onchange={() => onNew(event)}
			type="file"
		/>
	</div>

	{#if fieldValue && fieldValue.fileName && fieldValue.fileType}
		<div class="text-sm mt-1">
			<span class="text-gray-400">File Name:</span>
			{fieldValue.fileName} <span class="ml-2 text-gray-400">File Type:</span>
			{fieldValue.fileType}
		</div>
	{/if}
</fieldset>
