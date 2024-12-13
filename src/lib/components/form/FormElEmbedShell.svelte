<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StatePacketAction,
		StateProps,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Form/FormElembedShell.svelte'

	let { fp = $bindable() }: FieldProps = $props()

	let field = $derived(fp.field) as FieldEmbedShell
	let component: string
	let currTab: AppLevelTab
	let dataObj: DataObj
	let dataObjData: DataObjData
	let stateProps = $state() as StateProps

	fp.setIsLabelBold(true)

	field.stateShell.setfChangeCallback((obj: any) => {
		fp.stateProps.state.fChangeCallback(obj)
	})

	// LayoutTab
	let currLevel = $derived(field.stateShell.app.getCurrLevel())
	if (currLevel) {
		currTab = currLevel.getCurrTab()
		const dataObj = currTab.dataObj
		stateProps = new StateProps({
			component: dataObj.raw.codeComponent,
			dataObj,
			dataObjData: currTab.data,
			state: field.stateShell
		})
	}
</script>

<!-- <DataViewer header="stateEmbedShell.objStatus" data={stateEmbedShell.objStatus} /> -->

<!-- <FormLabel {fp} /> -->
{#if dataObj && dataObjData}
	<div class="border-0 border-red-300 px-4 pb-4">
		<!-- <LayoutTab bind:stateProps on:formCancelled /> -->
	</div>
{/if}
