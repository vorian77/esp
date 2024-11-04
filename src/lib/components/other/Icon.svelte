<script lang="ts">
	import {
		Activity,
		AppWindow,
		ArrowLeft,
		ArrowRight,
		CalendarDays,
		ChartPie,
		ChevronDown,
		ChevronFirst,
		ChevronLast,
		ChevronLeft,
		ChevronRight,
		ChevronUp,
		ChevronsDown,
		ChevronsLeft,
		ChevronsRight,
		ChevronsUp,
		CircleUserRound,
		ClipboardPlus,
		Files,
		FileStack,
		FolderClosed,
		FolderPlus,
		Goal,
		House,
		LayoutDashboard,
		ListChecks,
		LogOut,
		Mail,
		Menu,
		Settings,
		ShieldEllipsis,
		SquareMousePointer,
		TentTree,
		UserRoundCog,
		UsersRound
	} from 'lucide-svelte'

	export let absoluteStrokeWidth = false
	export let color = '#000000'
	export let marginRight = '0'
	export let name = ''
	export let onClick = () => {}
	export let size = '24'
	export let strokeWidth = '1'

	const clazz = `mr-${marginRight} `

	const Icon = {
		activity: Activity,
		appwindow: AppWindow,
		arrowleft: ArrowLeft,
		arrowright: ArrowRight,
		calendardays: CalendarDays,
		chartpie: ChartPie,
		chevrondown: ChevronDown,
		chevronfirst: ChevronFirst,
		chevronlast: ChevronLast,
		chevronleft: ChevronLeft,
		chevronright: ChevronRight,
		chevronup: ChevronUp,
		chevronsdown: ChevronsDown,
		chevronsleft: ChevronsLeft,
		chevronsright: ChevronsRight,
		chevronsup: ChevronsUp,
		circleuserround: CircleUserRound,
		clipboardplus: ClipboardPlus,
		files: Files,
		filestack: FileStack,
		folderclosed: FolderClosed,
		folderplus: FolderPlus,
		goal: Goal,
		house: House,
		layoutdashboard: LayoutDashboard,
		listchecks: ListChecks,
		logout: LogOut,
		mail: Mail,
		menu: Menu,
		settings: Settings,
		shieldellipsis: ShieldEllipsis,
		squaremousepointer: SquareMousePointer,
		tenttree: TentTree,
		userroundcog: UserRoundCog,
		usersround: UsersRound
	}[name.toLowerCase()]
</script>

{#if Icon}
	<button class="" on:click={onClick}>
		<span class={clazz}>
			<svelte:component this={Icon} {absoluteStrokeWidth} {color} {size} {strokeWidth} />
		</span>
	</button>
{/if}
