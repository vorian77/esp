<script lang="ts">
	import { IconProps } from '$comps/icon/types.icon'
	import {
		Activity,
		AppWindow,
		ArrowLeft,
		ArrowRight,
		BookOpen,
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
		Database,
		Eye,
		EyeOff,
		FileChartColumnIncreasing,
		Files,
		FileStack,
		FolderClosed,
		FolderPlus,
		Goal,
		Handshake,
		House,
		ImageUp,
		LayoutDashboard,
		ListChecks,
		LogOut,
		Mail,
		Menu,
		Quote,
		RotateCcw,
		Settings,
		Settings2,
		ShieldEllipsis,
		SquareMousePointer,
		TentTree,
		UserRoundCog,
		UsersRound
	} from 'lucide-svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { type DataRecord, PropSortDir } from '$utils/types'
	import { dataTypeDefinitions } from '$comps/grid/grid'

	/* icons source -  https://lucide.dev/icons/ */

	let { props }: { props: IconProps } = $props()

	const IconObjects = {
		activity: Activity,
		appwindow: AppWindow,
		arrowleft: ArrowLeft,
		arrowright: ArrowRight,
		bookopen: BookOpen,
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
		database: Database,
		eye: Eye,
		eyeoff: EyeOff,
		filechartcolumnincreasing: FileChartColumnIncreasing,
		files: Files,
		filestack: FileStack,
		folderclosed: FolderClosed,
		folderplus: FolderPlus,
		goal: Goal,
		handshake: Handshake,
		house: House,
		imageup: ImageUp,
		layoutdashboard: LayoutDashboard,
		listchecks: ListChecks,
		logout: LogOut,
		mail: Mail,
		menu: Menu,
		quote: Quote,
		rotateccw: RotateCcw,
		settings: Settings,
		settings2: Settings2,
		shieldellipsis: ShieldEllipsis,
		squaremousepointer: SquareMousePointer,
		tenttree: TentTree,
		userroundcog: UserRoundCog,
		usersround: UsersRound
	}
	let IconType: any = $derived(IconObjects[props.name.toLowerCase()])
</script>

<!-- hover:bg-gray-200 hover:rounded-full -->
{#if props && IconType}
	<div class={props.clazz}>
		<IconType {...props} />
	</div>
{/if}
