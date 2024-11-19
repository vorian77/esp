<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import WidgetFeatureItem from '$comps/widgets/WidgetFeatureItem.svelte'
	import { TokenAppWidget, TokenAppDoActionConfirmType } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	import RootLayoutApp from '$comps/layout/RootLayoutApp.svelte'

	const FILENAME = '$comps/widgets/WidgetFeature.svelte'

	export let state: State
	export let user: User

	const token1 = new TokenAppWidget({
		action: 'moed_ssr_app',
		clazz: 'bg-gradient-to-b from-green-300 hover:from-pink-500 active:bg-violet-700',
		dataObjName: 'data_obj_moed_ssr_app',
		status: '<Status Placeholder>',
		statusHeader: 'Status',
		title: 'My Application'
	})
	const token2 = new TokenAppWidget({
		action: 'moed_ssr_doc',
		clazz: 'bg-gradient-to-b from-blue-300 hover:from-pink-500 active:bg-violet-700 ',
		nodeObjName: 'node_obj_moed_ssr_doc_list',
		status: '<Status Placeholder>',
		statusHeader: 'Status',
		title: 'My Eligibility Documents'
	})
	const token3 = new TokenAppWidget({
		action: 'moed_ssr_msg',
		clazz: 'bg-gradient-to-b from-amber-300 hover:from-pink-500 active:bg-violet-700 ',
		nodeObjName: 'node_obj_moed_ssr_msg_list',
		status: '<Status Placeholder>',
		statusHeader: 'Status',
		title: 'My Messages'
	})
</script>

<WidgetFeatureItem {state} token={token1} />
<WidgetFeatureItem {state} token={token2} />
<WidgetFeatureItem {state} token={token3} />

<!-- todo: 241029 - RootLayoutApp is necessary here for State.update() to work correctly -->
<div style="display: none">
	<RootLayoutApp bind:state />
</div>
