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
		Quote,
		Settings,
		ShieldEllipsis,
		SquareMousePointer,
		TentTree,
		UserRoundCog,
		UsersRound
	} from 'lucide-svelte'

	/* icons source -  https://lucide.dev/icons/ */

	export let absoluteStrokeWidth = false
	export let clazz = ''
	export let color = '#000000'
	export let name = ''
	export let onClick = () => {}
	export let size = '24'
	export let strokeWidth = '1'

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
		quote: Quote,
		settings: Settings,
		shieldellipsis: ShieldEllipsis,
		squaremousepointer: SquareMousePointer,
		tenttree: TentTree,
		userroundcog: UserRoundCog,
		usersround: UsersRound
	}[name.toLowerCase()]
</script>

{#if Icon}
	<div class={clazz}>
		<button class="" on:click={onClick}>
			<svelte:component this={Icon} {absoluteStrokeWidth} {color} {size} {strokeWidth} />
		</button>
	</div>
{/if}
