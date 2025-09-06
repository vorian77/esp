<script lang="ts">
	import { IconProps } from '$comps/icon/types.icon'
	import {
		Activity,
		AppWindow,
		ArrowLeft,
		ArrowRight,
		BookOpen,
		Bot,
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
		Inbox,
		LayoutDashboard,
		ListChecks,
		LogOut,
		Mail,
		Menu,
		MessageSquareText,
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
	import { type DataRecord, PropSortDir } from '$utils/types'
	import { dataTypeDefinitions } from '$comps/grid/grid'
	import Tooltip from '$comps/icon/ToolTip.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	/* icons source -  https://lucide.dev/icons/ */

	let { props }: { props: IconProps } = $props()

	const IconObjects = {
		activity: Activity,
		appwindow: AppWindow,
		arrowleft: ArrowLeft,
		arrowright: ArrowRight,
		bookopen: BookOpen,
		bot: Bot,
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
		inbox: Inbox,
		layoutdashboard: LayoutDashboard,
		listchecks: ListChecks,
		logout: LogOut,
		mail: Mail,
		menu: Menu,
		messagesquaretext: MessageSquareText,
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
	<Tooltip content={props.tooltip}>
		<div class={props.clazz}>
			<IconType {...props} />
		</div>
	</Tooltip>
{/if}
