<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateProps
	} from '$comps/app/types.appState.svelte'
	import { getArray, User, UserPrefType, UserTypeResourceType } from '$utils/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import SysWigReport from '$comps/widgets/WidgetReport.svelte'
	import SysWigReportMoed from '$comps/widgets/WizardReportMoed.svelte'

	const FILENAME = '$comps/nav/NavPageHome.svelte'

	let { stateProps = $bindable() }: { stateProps: StateProps } = $props()

	const hasResourceWidget = (widgetName: string | string[]) => {
		return state?.user?.resources.hasResources(UserTypeResourceType.widget, widgetName)
	}
	let showSysReport = false
	let showSysReportMoed = false
	let showSysFeature = false
	let showSysUser: boolean
	let showCMUser: boolean
	let showCMQuote: boolean

	if (stateProps.state.user) {
		showSysUser = hasResourceWidget('widget_sys_user')
		showCMUser = hasResourceWidget('widget_cm_user')
		showCMQuote = hasResourceWidget('widget_cm_quotes')
		showSysFeature = hasResourceWidget([
			'wf_moed_student_ssr_app',
			'wf_moed_student_ssr_doc',
			'wf_moed_student_ssr_msg'
		])
		showSysReport =
			hasResourceWidget('widget_sys_report') &&
			state.user.prefIsActive(UserPrefType.widget_quick_report)
		showSysReportMoed =
			hasResourceWidget('widget_sys_report_moed') &&
			state.user.prefIsActive(UserPrefType.widget_quick_report)
	}
</script>

<!-- <DataViewer header="showSysReport" data={showSysReport} /> -->
