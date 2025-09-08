<script lang="ts">
	import {
		FileUpload,
		type FileUploadApi,
		type FileChangeDetails,
		type FileRejectDetails
	} from '@skeletonlabs/skeleton-svelte'
	import { tsvParse } from 'd3-dsv'

	// ---- Config ----
	const MAX_ROWS = 100 // rows to preview
	const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB
	const STRICT_MIME = true // require exact MIME (see note below)

	// ---- State (Svelte 5 runes) ----
	let api: FileUploadApi | undefined

	let fileName = $state<string>('')
	let headers = $state<string[]>([])
	let rows = $state<Record<string, unknown>[]>([])
	let errors = $state<string[]>([])
	let info = $state<{ totalRows?: number } | null>(null)

	// Strict validation: extension + (optionally) exact MIME
	function validateTSV(file: File) {
		const issues: string[] = []
		const hasExt = /\.tsv$/i.test(file.name)
		const isExactMime = file.type === 'text/tab-separated-values'
		if (!hasExt) issues.push('INVALID_TYPE')
		if (STRICT_MIME && !isExactMime) issues.push('INVALID_MIME')
		if (file.size > MAX_FILE_BYTES) issues.push('FILE_TOO_LARGE')
		return issues.length ? issues : null
	}

	function onReject(details: FileRejectDetails) {
		errors = []
		for (const r of details.rejectedFiles) {
			for (const code of r.errors) {
				if (code === 'FILE_TOO_LARGE')
					errors.push(`"${r.file.name}" exceeds ${(MAX_FILE_BYTES / (1024 * 1024)).toFixed(0)} MB.`)
				else if (code === 'INVALID_TYPE') errors.push(`"${r.file.name}" must have .tsv extension.`)
				else if (code === 'INVALID_MIME')
					errors.push(`"${r.file.name}" must be MIME type text/tab-separated-values.`)
				else errors.push(`"${r.file.name}" rejected (${code}).`)
			}
		}
	}

	async function onChange(details: FileChangeDetails) {
		// reset
		errors = []
		headers = []
		rows = []
		info = null

		const file = details.acceptedFiles?.[0]
		if (!file) return

		fileName = file.name

		let text: string
		try {
			text = await file.text()
		} catch (e) {
			errors = ['Could not read file.']
			return
		}

		// Basic sanity: empty or header-only
		const nonEmptyLines = text.split(/\r?\n/).filter(Boolean)
		if (nonEmptyLines.length === 0) {
			errors = ['File is empty.']
			return
		}

		// Parse TSV
		try {
			const parsed = tsvParse(text) // returns array-like with .columns
			const columns = (parsed as unknown as { columns?: string[] }).columns ?? []
			const data = parsed.slice(0, MAX_ROWS) as unknown as Record<string, unknown>[]

			headers = columns
			rows = data
			info = { totalRows: Math.max(0, parsed.length) }

			if (!headers.length) errors.push('No header row detected.')
		} catch (e) {
			errors = ['Failed to parse TSV.']
		}
	}

	function clearAll() {
		api?.clearFiles()
		fileName = ''
		headers = []
		rows = []
		errors = []
		info = null
	}
</script>

<section class="space-y-4">
	<h2 class="text-xl font-semibold">Upload TSV</h2>

	<FileUpload
		name="tsv-upload"
		accept={{ 'text/tab-separated-values': ['.tsv'] }}
		maxFiles={1}
		maxFileSize={MAX_FILE_BYTES}
		onApiReady={(x) => (api = x)}
		validate={validateTSV}
		onFileReject={onReject}
		onFileChange={onChange}
		subtext={`.tsv only · text/tab-separated-values · up to ${(MAX_FILE_BYTES / (1024 * 1024)).toFixed(0)} MB`}
		classes="w-full"
	>
		<button type="button" class="btn preset-filled">Select TSV</button>
	</FileUpload>

	{#if errors.length}
		<div class="alert variant-ghost text-red-600">
			<ul class="list-disc ml-5">
				{#each errors as e}<li>{e}</li>{/each}
			</ul>
		</div>
	{/if}

	{#if fileName}
		<div class="flex items-center justify-between">
			<p class="text-sm opacity-80">
				<strong>File:</strong>
				{fileName}
				{#if info?.totalRows !== undefined}
					· {info.totalRows} total row{info.totalRows === 1 ? '' : 's'}
					{#if info.totalRows > MAX_ROWS}
						· showing first {MAX_ROWS}{/if}
				{/if}
			</p>
			<button class="btn preset-ghost" type="button" on:click={clearAll}>Clear</button>
		</div>
	{/if}

	{#if headers.length}
		<div class="overflow-auto border rounded-xl">
			<table class="table w-full text-sm">
				<thead class="sticky top-0 bg-base-200">
					<tr
						>{#each headers as h}<th class="px-3 py-2 text-left whitespace-nowrap">{h || '—'}</th
							>{/each}</tr
					>
				</thead>
				<tbody>
					{#each rows as r}
						<tr class="border-t">
							{#each headers as h}<td class="px-3 py-2">{String(r[h] ?? '')}</td>{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else if fileName && !errors.length}
		<p class="text-sm opacity-70">No header row detected or empty file.</p>
	{/if}
</section>

<style>
	table {
		border-collapse: separate;
		border-spacing: 0;
	}
	th,
	td {
		max-width: 24rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
