<script lang="ts">
	import { ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { User, UserPrefType, UserTypeResourceType } from '$utils/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavHome.svelte'

	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let user: User = stateApp.user

	const hasResourceWidget = (widgetName: string | string[]) => {
		return stateApp.user?.resources.hasResources(UserTypeResourceType.widget, widgetName)
	}
	let showSysReport = false
	let showSysReportMoed = false
	let showSysFeature = false
	let showSysUser: boolean = $state(false)
	let showCMUser: boolean = $state(false)
	let showCMQuote: boolean = $state(false)

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
			hasResourceWidget('widget_sys_report') && user.prefIsActive(UserPrefType.widget_quick_report)
		showSysReportMoed =
			hasResourceWidget('widget_sys_report_moed') &&
			user.prefIsActive(UserPrefType.widget_quick_report)
	}
</script>

<!-- <DataViewer header="showSysReport" data={showSysReport} /> -->
