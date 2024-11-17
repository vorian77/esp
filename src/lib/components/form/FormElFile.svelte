<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldFile, FileStorage } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import {
		TokenApiFileParmDelete,
		TokenApiFileParmUpload,
		TokenApiFileAction,
		TokenApiFileType
	} from '$utils/types.token'
	import { getURLDownload } from '$utils/utils.aws'
	import { isEqual } from 'lodash-es'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	export let fp: FieldProps

	enum Mode {
		delete = 'delete',
		none = 'none',
		storage = 'storage',
		upload = 'upload'
	}

	let elInput: any
	let files: FileList
	let showImg = false
	let mode: Mode
	let recordIdCurrent: string
	let urlCurrent = ''
	let urlOld = ''

	$: field = fp.field as FieldFile
	$: fieldValue = fp.fieldValue

	$: if (recordIdCurrent !== fp.dataRecord?.id) {
		recordIdCurrent = fp.dataRecord?.id
		mode = Mode.none
	}

	$: labelDelete = 'Delete ' + field.colDO.label
	$: chooseBtnWidth = urlCurrent ? 'w-3/4' : 'w-full'
	$: labelSelect = urlCurrent ? 'Choose New ' + field.colDO.label : 'Choose ' + field.colDO.label

	$: {
		if (mode === Mode.delete) {
			if (!fieldValue) {
				mode = Mode.none
				urlCurrent = undefined
				urlOld = undefined
			}
		} else if (mode === Mode.upload) {
			if (!(fieldValue instanceof TokenApiFileParmUpload) && fieldValue && fieldValue.url) {
				mode = Mode.storage
				urlCurrent = fieldValue.url
				urlOld = fieldValue.url
			}
		} else if (mode === Mode.none) {
			if (fieldValue && fieldValue.url) {
				mode = Mode.storage
				urlCurrent = fieldValue.url
				urlOld = fieldValue.url
			} else {
				urlCurrent = undefined
				urlOld = undefined
			}
		}
		console.log('FormElFile.init:', { fieldValue, urlCurrent, urlOld, mode })

		// render image based on source
		if (mode === Mode.storage) {
			;(async () => {
				urlCurrent = fieldValue.url
			})()
		} else if (mode === Mode.upload) {
			urlCurrent = URL.createObjectURL(files[0])
		} else {
			urlCurrent = ''
		}
		showImg = urlCurrent ? true : false
	}

	function onDelete(event: Event) {
		elInput.value = ''

		if (urlOld) {
			mode = Mode.delete
			fp.fSetVal(
				fp.row,
				field,
				new TokenApiFileParmDelete({
					urlOld
				})
			)
		} else if (mode === Mode.upload) {
			mode = Mode.none
			fieldValue = undefined
		}
	}

	function onNew(event: Event) {
		if (files.length > 0) {
			mode = Mode.upload
			fieldValue = undefined
			fp.fSetVal(
				fp.row,
				field,
				new TokenApiFileParmUpload({
					file: files[0],
					fileType: files[0].type.includes('pdf') ? TokenApiFileType.pdf : TokenApiFileType.image,
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
</script>

<fieldset>
	<legend>{field.colDO.label}</legend>

	<div>
		{#if fieldValue && urlCurrent}
			{#if fieldValue.fileType === TokenApiFileType.image}
				<img
					alt={field.colDO.label}
					class="mx-auto p-2"
					hidden={!showImg}
					on:click|preventDefault={elInput.click()}
					src={urlCurrent}
					width="80%"
				/>
			{:else if fieldValue.fileType === TokenApiFileType.pdf}
				<div class="flex justify-center">
					<iframe
						frameborder="0"
						height="600px"
						on:click|preventDefault={elInput.click()}
						src={urlCurrent}
						title={field.colDO.label}
						width="80%"
					/>
				</div>
			{/if}
		{/if}

		<div class="flex mt-2">
			<button class="btn variant-filled-primary {chooseBtnWidth}" on:click={elInput.click()}>
				{labelSelect}
			</button>

			{#if urlCurrent}
				<button class="btn variant-filled-error ml-2 w-1/4" on:click={onDelete}>
					{labelDelete}
				</button>
			{/if}

			{#if mode === Mode.storage}
				<button class="btn variant-filled-primary ml-2 w-1/4" on:click={onDownload}>
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
			on:change={onNew}
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
