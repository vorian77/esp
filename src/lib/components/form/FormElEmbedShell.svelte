<script lang="ts">
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Form/FormElembedShell.svelte'

	let { parms }: DataRecord = $props()

	let field = $derived(fp.field) as FieldEmbedShell
	let component: string
	let currTab: AppLevelTab
	let dataObj: DataObj
	let dataObjData: DataObjData

	fp.setIsLabelBold(true)

	field.stateShell.setfChangeCallback((obj: any) => {
		fp.stateApp.fChangeCallback(obj)
	})

	// LayoutTab
	// let currLevel = $derived(field.stateShell.app.getCurrLevel())
	// if (currLevel) {
	// 	currTab = currLevel.getCurrTab()
	// 	const dataObj = currTab.dataObj
	// }
</script>

<!-- <DataViewer header="stateEmbedShell.objStatus" data={stateEmbedShell.objStatus} /> -->

<!-- <FormLabel {parms} /> -->
{#if dataObj && dataObjData}
	<div class="border-0 border-red-300 px-4 pb-4">
		<!-- <LayoutTab  on:formCancelled /> -->
	</div>
{/if}
