<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { Node, NodeNav, ResponseBody } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/widgets/WidgetFeatureItem.svelte'

	export let state: State
	export let token: TokenAppWidget

	async function onClick(action: any) {
		let node = new Node({
			dataObjName: token.dataObjName,
			header: token.title,
			icon: 'AppWindow',
			id: token.dataObjName,
			isRetrievePreset: token.isRetrievePreset,
			isMobileMode: true,
			name: token.dataObjName,
			nodeObjName: token.nodeObjName,
			page: '/home',
			_codeNodeType: token.nodeObjName ? 'program' : 'object'
		})
		state.update({
			page: node.page,
			nodeType: node.type,
			packet: new StatePacket({
				action: StatePacketAction.openNode,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppNode({ node })
			})
		})
	}
</script>

<div
	on:click={onClick}
	class="container {token.clazz} rounded-full mt-2 p-6 border-4 bg-gray-300 min-h-40 flex flex-col items-center"
>
	<div class="text-center font-bold text-4xl text-blue-400">{token.title}</div>

	{#if token.status}
		{@const statusHeader = token.statusHeader ? token.statusHeader + ':  ' : ''}
		<div class="mt-6 text-center text-3xl text-blue-300">
			<p><span>{statusHeader}</span>{token.status}</p>
		</div>
	{/if}
</div>
