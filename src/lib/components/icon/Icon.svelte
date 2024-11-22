<script lang="ts">
	import { IconProps } from '$comps/icon/types.icon'
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
		ClipboardPen,
		ClipboardPlus,
		Eye,
		EyeOff,
		Files,
		FileStack,
		FolderClosed,
		FolderPlus,
		Goal,
		House,
		ImageUp,
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
	import DataViewer from '$utils/DataViewer.svelte'

	/* icons source -  https://lucide.dev/icons/ */

	export let props: IconProps

	$: IconType = {
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
		clipboardpen: ClipboardPen,
		clipboardplus: ClipboardPlus,
		eye: Eye,
		eyeoff: EyeOff,
		files: Files,
		filestack: FileStack,
		folderclosed: FolderClosed,
		folderplus: FolderPlus,
		goal: Goal,
		house: House,
		imageup: ImageUp,
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
	}[props.name.toLowerCase()]
</script>

{#if props && IconType}
	<div class={props.clazz}>
		<button on:click={props.onClick}>
			<svelte:component
				this={IconType}
				absoluteStrokeWidth={props.absoluteStrokeWidth}
				color={props.color}
				size={props.size}
				strokeWidth={props.strokeWidth}
			/>
		</button>
	</div>
{/if}
