<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton'
	import { appStoreUser, User, UserPrefType } from '$utils/types'
	import SysWizReport from '$comps/wizard/WizardSysReport.svelte'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/app/NavPageHome.svelte'

	const hasResourceWidget = (widgetName: string) => {
		return user?.resources_sys_widget?.findIndex((w) => w.name === widgetName) > -1
	}
	let user: User | undefined
	let showSysReport = false
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
			showSysReport =
				hasResourceWidget('widget_sys_report') &&
				user.prefIsActive(UserPrefType.widget_quick_report)
		}
	}
</script>

<!-- <DataViewer header="showSysReport" data={showSysReport} />
<DataViewer header="resources_sys_widget" data={user?.resources_sys_widget} /> -->

<AppShell>
	{#if showSysUser}
		<SysUser {user} />
	{/if}

	{#if showCMUser}
		<CMUser {user} />
	{/if}
	{#if showCMQuote}
		<Quote />
	{/if}
	{#if showSysReport}
		<SysWizReport {user} />
	{/if}
</AppShell>
