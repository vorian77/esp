<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	let field: FieldEmbedShell
	let currLevel: AppLevel
	let currTab: AppLevelTab
	let dataObj: DataObj
	let dataObjData: DataObjData

	$: {
		field = fp.field
		field.stateShell.setUpdateCallback((obj: any) => {
			field.stateShell = field.stateShell.updateProperties(obj)
		})

		// LayoutTab
		currLevel = field.stateShell.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			dataObj = currTab.dataObj
			dataObjData = currTab.data
		}
	}
</script>

<!-- <DataViewer header="stateEmbedShell.objStatus" data={stateEmbedShell.objStatus} /> -->

<!-- <FormLabel {fp} /> -->
{#if dataObj && dataObjData}
	<div class="border-2 px-4 pb-4">
		<LayoutTab bind:state={field.stateShell} {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}
