<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldFile, FileStorage } from '$comps/form/fieldFile'
	import { getToastStore } from '@skeletonlabs/skeleton'
	import { TokenApiFileParm, TokenApiFileAction, TokenApiFileType } from '$utils/types.token'
	import { getURLDownload } from '$utils/utils.aws'
	import { isEqual } from 'lodash-es'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElFile.svelte'

	const toastStore = getToastStore()

	export let fp: FieldProps

	enum Mode {
		delete = 'delete',
		file = 'file',
		none = 'none',
		storage = 'storage'
	}

	let currStorage: FileStorage | undefined
	let currURL = ''
	let elInput: any
	let files: FileList
	let showImg = false
	let mode: Mode = Mode.none

	$: field = fp.field as FieldFile
	$: fieldValue = fp.fieldValue

	$: labelDelete = 'Delete ' + field.colDO.label
	$: chooseBtnWidth = currURL ? 'w-3/4' : 'w-full'
	$: labelSelect = currURL ? 'Choose New ' + field.colDO.label : 'Choose ' + field.colDO.label

	$: {
		initState(fieldValue)

		// render image based on source
		if (mode === Mode.storage) {
			;(async () => {
				currURL = await getURLDownload(currStorage.key)
			})()
		} else if (mode === Mode.file) {
			currURL = URL.createObjectURL(files[0])
		} else {
			currURL = ''
		}
		showImg = currURL ? true : false
	}

	function onDelete(event: Event) {
		mode = Mode.delete
		elInput.value = ''
		fp.fSetVal(
			fp.row,
			field,
			new TokenApiFileParm({
				fileAction: TokenApiFileAction.delete,
				key: currStorage?.key
			})
		)
	}

	function onNew(event: Event) {
		if (files.length > 0) {
			mode = Mode.file
			currStorage = new FileStorage(
				files[0].name,
				files[0].type.includes('pdf') ? TokenApiFileType.pdf : TokenApiFileType.image,
				currStorage ? currStorage.key : field.getKey()
			)
			fp.fSetVal(
				fp.row,
				field,
				new TokenApiFileParm({
					file: files[0],
					fileAction: TokenApiFileAction.upload,
					fileType: currStorage.fileType,
					key: currStorage.key
				})
			)
		}
	}

	function initState(fieldValue: FileStorage | undefined) {
		if (mode === Mode.delete) {
			currStorage = undefined
		} else if (mode === Mode.file) {
			// no change
		} else if (fieldValue) {
			if (!isEqual(currStorage?.key, fieldValue.key)) {
				mode = Mode.storage
				currStorage = new FileStorage(fieldValue.fileName, fieldValue.fileType, fieldValue.key)
			}
		} else {
			mode = Mode.none
			currStorage = undefined
		}
	}
</script>

<fieldset>
	<legend>{field.colDO.label}</legend>

	<div>
		{#if currURL && currStorage}
			{#if currStorage.fileType === TokenApiFileType.image}
				<img
					alt={field.colDO.label}
					class="mx-auto p-2"
					hidden={!showImg}
					on:click|preventDefault={elInput.click()}
					src={currURL}
					width="80%"
				/>
			{:else if currStorage.fileType === TokenApiFileType.pdf}
				<div class="flex justify-center">
					<iframe
						frameborder="0"
						height="600px"
						on:click|preventDefault={elInput.click()}
						src={currURL}
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

			{#if currURL}
				<button class="btn variant-filled-error ml-1 w-1/4" on:click={onDelete}>
					{labelDelete}
				</button>
			{/if}
		</div>

		<input
			accept="image/*,application/pdf"
			bind:files
			bind:this={elInput}
			class="input"
			hidden={true}
			id={field.colDO.propName}
			name={field.colDO.propName}
			on:change={onNew}
			type="file"
		/>
	</div>

	{#if currStorage}
		Name: {currStorage.fileName} Type: {currStorage.fileType}
	{/if}
</fieldset>
