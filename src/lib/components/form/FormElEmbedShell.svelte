<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Form/FormElembedShell.svelte'

	export let fp: FieldProps

	let field: FieldEmbedShell
	let component: string
	let currLevel: AppLevel
	let currTab: AppLevelTab
	let dataObj: DataObj
	let dataObjData: DataObjData

	$: {
		fp.setIsLabelBold(true)

		field = fp.field
		field.stateShell.setFUpdateCallback((obj: any) => {
			fp.state.fUpdateCallback(obj)
		})

		// LayoutTab
		currLevel = field.stateShell.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			dataObj = currTab.dataObj
			component = dataObj.raw.codeComponent
			dataObjData = currTab.data
		}
	}
</script>

<!-- <DataViewer header="stateEmbedShell.objStatus" data={stateEmbedShell.objStatus} /> -->

<!-- <FormLabel {fp} /> -->
{#if dataObj && dataObjData}
	<div class="border-0 border-red-300 px-4 pb-4">
		<LayoutTab bind:state={field.stateShell} {component} {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}
