<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenApp, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
	import { appStoreUser, Node, NodeType, User } from '$utils/types'
	import Icon from '$comps/other/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import SysWigFeature from '$comps/widgets/WidgetFeature.svelte'
	const FILENAME = '/$comps/NavFooter.svelte'

	export let state: State

	let footer: Node[] = []
	let loaded = false
	let currNodeName = ''

	$: if (!loaded && $appStoreUser) {
		const rawUser = $appStoreUser
		const user = Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
		if (user) {
			user.resources_sys_footer.forEach((n: any) => {
				footer.push(new Node(n))
			})
			currNodeName = footer.length > 0 ? footer[0].name : ''
			loaded = true
		}
	}

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	// styling
	const styleContainer = `
				display: flex; 
				flex-wrap: wrap; 
				gap: 5px;
				justify-content: space-around; 
			`
	const styleItem = `
				display: flex;
				align-items: top;		
				font-size: 10px;
				color: ${navColor};
				flex-direction: row;
				justify-content: center;
				gap: 2px;
				width: 80px;
				height: 40px;`
	const styleItemHover =
		styleItem +
		`
				background-color: ${itemColors[0]};`
	const styleItemActive =
		styleItem +
		`
				border-top: 1px solid ${navColor};`
	const marginTopheader = 'mt-1'

	function onChange(node: Node) {
		currNodeName = node.name!
		let packet: StatePacket | undefined

		switch (node.type) {
			case NodeType.home:
				packet = new StatePacket({
					action: StatePacketAction.navTreeReset,
					confirmType: TokenAppDoActionConfirmType.objectChanged
				})
				break

			case NodeType.object:
			case NodeType.program_object:
				packet = new StatePacket({
					action: StatePacketAction.openNode,
					confirmType: TokenAppDoActionConfirmType.objectChanged,
					token: new TokenAppNode({ node })
				})
				break

			default:
				packet = undefined
		}
		state.update({
			page: node.page ? node.page : '/home',
			nodeType: node.type,
			packet
		})
	}
</script>

<div style={styleContainer}>
	{#each footer as node}
		<div
			role="button"
			tabindex="0"
			style={currNodeName === node.name && state?.nodeType === node.type
				? styleItemActive
				: styleItem}
			on:click={() => onChange(node)}
			on:keyup={() => onChange(node)}
		>
			<div class="mt-2">
				<Icon name={node.icon} size="16" color={navColor} />
			</div>
			<div class={marginTopheader}>
				{node.label}
			</div>
		</div>
	{/each}
</div>

<!-- <DataViewer header="footer" data={footer} /> -->
