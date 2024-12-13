<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldFile, FileStorage } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import {
		TokenApiFileParmDelete,
		TokenApiBlobParmUpload,
		TokenApiBlobAction,
		TokenApiBlobType
	} from '$utils/types.token'

	import { FileProcessingMode } from '$utils/utils.sys.svelte'

	import { isEqual } from 'lodash-es'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	let { fp = $bindable() }: FieldProps = $props()

	let elInput: any
	let files: FileList = $state()
	let showImg = $state(false)
	let mode: FileProcessingMode = $state()
	let recordIdCurrent: string = $state()
	let urlCurrent = $state('')
	let urlOld = $state('')

	let field = $derived(fp.field) as FieldFile
	let fieldValue = $state(fp.fieldValue)

	if (recordIdCurrent !== fp.dataRecord?.id) {
		recordIdCurrent = fp.dataRecord?.id
		mode = FileProcessingMode.none
	}

	let labelDelete = $derived('Delete ' + field.colDO.label)
	let chooseBtnWidth = $derived(urlCurrent ? 'w-3/4' : 'w-full')
	let labelSelect = $derived(
		urlCurrent ? 'Choose New ' + field.colDO.label : 'Choose ' + field.colDO.label
	)

	if (mode === FileProcessingFileProcessingMode.delete) {
		if (!fieldValue) {
			mode = FileProcessingFileProcessingMode.none
			urlCurrent = undefined
			urlOld = undefined
		}
	} else if (mode === FileProcessingFileProcessingMode.upload) {
		if (!(fieldValue instanceof TokenApiBlobParmUpload) && fieldValue && fieldValue.url) {
			mode = FileProcessingFileProcessingMode.storage
			urlCurrent = fieldValue.url
			urlOld = fieldValue.url
		}
	} else if (mode === FileProcessingFileProcessingMode.none) {
		if (fieldValue && fieldValue.url) {
			mode = FileProcessingFileProcessingMode.storage
			urlCurrent = fieldValue.url
			urlOld = fieldValue.url
		} else {
			urlCurrent = undefined
			urlOld = undefined
		}
	}

	// render image based on source
	if (mode === FileProcessingFileProcessingMode.storage) {
		;(async () => {
			urlCurrent = fieldValue.url
		})()
	} else if (mode === FileProcessingFileProcessingMode.upload) {
		urlCurrent = URL.createObjectURL(files[0])
	} else {
		urlCurrent = ''
	}
	showImg = urlCurrent ? true : false

	function onDelete(event: Event) {
		elInput.value = ''

		if (urlOld) {
			mode = FileProcessingMode.delete
			fp.stateProps.fSetVal(
				fp.row,
				field,
				new TokenApiFileParmDelete({
					urlOld
				})
			)
		} else if (mode === FileProcessingMode.upload) {
			mode = FileProcessingMode.none
			fieldValue = undefined
		}
	}

	function onNew(event: Event) {
		if (files.length > 0) {
			mode = FileProcessingMode.upload
			fieldValue = undefined
			fp.stateProps.fSetVal(
				fp.row,
				field,
				new TokenApiBlobParmUpload({
					file: files[0],
					fileType: files[0].type.includes('pdf') ? TokenApiBlobType.pdf : TokenApiBlobType.image,
					key: field.getKey(),
					urlOld
				})
			)
		}
	}

	function onDownload(event: Event) {
		if (Object.hasOwn(fieldValue, 'downloadUrl')) {
			fp.state.downloadUrl(fieldValue.downloadUrl, fieldValue.fileName)
		}
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault()
			fn.call(this, event)
		}
	}
</script>

<!-- onclick|preventDefault={() => elInput.click()} -->
<!-- on:click|preventDefault={() => elInput.click()} -->
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
					src={urlCurrent}
					width="80%"
				/>
			{:else if fieldValue.fileType === TokenApiBlobType.pdf}
				<div class="flex justify-center">
					<iframe
						frameborder="0"
						height="600px"
						onclick={preventDefault(elInput.click())}
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
				<button class="btn btn-action variant-filled-error ml-2 w-1/4" onclick={() => onDelete}>
					{labelDelete}
				</button>
			{/if}

			{#if mode === FileProcessingMode.storage}
				<button class="btn btn-action variant-filled-primary ml-2 w-1/4" onclick={() => onDownload}>
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
			onchange={() => onNew}
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
