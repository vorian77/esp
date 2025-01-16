<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
	import {
		State,
		StateLayoutComponent,
		StatePacket,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState.svelte'
	import { TokenAppUserActionConfirmType } from '$utils/types.token'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Form/FormElembedShell.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let field = $state(parms.field) as FieldEmbedShell
	let stateShell: sm = $derived(field.stateShell)
	let currLevel = $derived(stateShell.app.getCurrLevel())
	$inspect('FormElEmbedShell.currLevel', currLevel)

	let dataObj: DataObj = $derived(currLevel ? currLevel.getCurrTab().dataObj : undefined)

	// let component: string
	// let currTab: AppLevelTab

	field.stateShell.setfChangeCallback((obj: any) => {
		sm.fChangeCallback(obj)
	})

	// let parmsShell = $derived({
	// 	...parms,
	// 	dataObj: currLevel ? currLevel.getCurrTab().dataObj : undefined
	// })

	// dataObj: currLevel ? currLevel.getCurrTab().dataObj : undefined,
	// component : undefined

	// if (currLevel) {
	// 	currTab = currLevel.getCurrTab()
	// 	const dataObj = currTab.dataObj
	// }

	// $: {
	// 	fp.setIsLabelBold(true)

	// 	field = fp.field
	// 	field.stateShell.setFUpdateCallback((obj: any) => {
	// 		fp.state.fUpdateCallback(obj)
	// 	})

	// 	// LayoutTab
	// 	currLevel = field.stateShell.app.getCurrLevel()
	// 	if (currLevel) {
	// 		currTab = currLevel.getCurrTab()
	// 		dataObj = currTab.dataObj
	// 		component = dataObj.raw.codeComponent
	// 		dataObjData = currTab.data
	// 	}
	// }

	// 	{#if dataObj && dataObjData}
	// 	<div class="border-2 px-4 pb-4">
	// 		<LayoutTab bind:state={field.stateShell} {component} {dataObj} {dataObjData} on:formCancelled />
	// 	</div>
	// {/if}
</script>

<!-- dataObj: {dataOb.raw.name} -->
<!-- <DataViewer header="parmsShell" data={parmsShell} /> -->

<FormLabel {parms} />
shell.out
<!-- {#if parmsShell.dataObj}
	<div class="border-0 border-red-300 px-4 pb-4">
		<LayoutTab parms={parmsShell} />
	</div>
{/if} -->
