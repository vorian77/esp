<script lang="ts">
	import {
		State,
		StateLayoutStyle,
		StateLayoutComponentType,
		StateMode,
		StateSurfaceEmbedField,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import {
		TokenApiDbDataObjSource,
		TokenApiQueryData,
		TokenApiQueryType,
		TokenAppDoActionFieldType,
		TokenAppModalEmbedShell
	} from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { DataObjCardinality } from '$utils/types'
	import { FieldElement, FieldItem, FieldProps } from '$comps/form/field'
	import { FieldSelectMulti } from '$comps/form/fieldSelect'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import { FieldAccess } from '$comps/form/field'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import DataViewer from '$utils/DataViewer.svelte'
	import { ConstraintViolationError } from 'edgedb'

	export let fp: FieldProps

	let recordIdCurrent: string
	let stateEmbedShell: StateSurfaceEmbedShell

	$: loadData(fp)

	function loadData(fp: FieldProps) {
		if (fp.dataRecord) {
			let recordId = fp.dataRecord['id'] || ''
			if (recordId.startsWith('preset_')) recordId = ''
			if (recordIdCurrent !== recordId) {
				recordIdCurrent = recordId
				stateEmbedShell = setStateEmbed(fp)
			}
		}
	}

	function setStateEmbed(fp: FieldProps) {
		return new StateSurfaceEmbedShell({
			layoutComponent: StateLayoutComponentType.layoutTab,
			layoutStyle: StateLayoutStyle.dataObjTab,

			parms: { listRecordIdParent: recordIdCurrent },
			token: new TokenAppModalEmbedShell({ dataObjParent: fp.dataObj, fieldEmbedShell: fp.field }),
			updateCallback
		})
	}

	async function updateCallback(obj: any) {
		stateEmbedShell = stateEmbedShell.updateProperties(obj)
	}
</script>

<div class="border-2 px-4 pb-4">
	{#if stateEmbedShell}
		<Layout state={stateEmbedShell} />
	{/if}
</div>

<!-- <DataViewer header="items" data={field.items} /> -->
