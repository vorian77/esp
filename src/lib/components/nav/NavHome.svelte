<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { appStoreUser, getArray, User, UserPrefType, UserTypeResourceType } from '$utils/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import SysWigReport from '$comps/widgets/WidgetReport.svelte'
	import SysWigReportMoed from '$comps/widgets/WizardReportMoed.svelte'

	const FILENAME = '$comps/nav/NavPageHome.svelte'

	export let state: State

	const hasResourceWidget = (widgetName: string | string[]) => {
		return user?.resources.hasResources(UserTypeResourceType.widget, widgetName)
	}
	let user: User | undefined
	let showSysReport = false
	let showSysReportMoed = false
	let showSysFeature = false
	let showSysUser: boolean
	let showCMUser: boolean
	let showCMQuote: boolean

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
		if (user) {
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
				user.prefIsActive(UserPrefType.widget_quick_report)
			showSysReportMoed =
				hasResourceWidget('widget_sys_report_moed') &&
				user.prefIsActive(UserPrefType.widget_quick_report)
		}
	}
</script>

<!-- <DataViewer header="showSysReport" data={showSysReport} /> -->
