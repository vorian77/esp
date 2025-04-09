<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import srcExFormList from '$assets/ex_form_list.png'
	import { ArrowRight } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { DataObjData, type DataRecord, ParmsValuesType, ResponseBody } from '$utils/types'
	import { apiFetchFunction, ApiFunction } from '$routes/api/api'
	import { TokenApiFetchError, TokenApiQueryData } from '$utils/types.token'

	const FILENAME = '$routes/+page.svelte'

	let { data }: { data: PageData } = $props()

	const IS_DEV_MODE = data.environ === 'dev'

	let prospectEmail = $state('')

	async function processEmail() {
		if (prospectEmail.includes('@')) {
			await saveEmail(prospectEmail)
			alert(
				"Thanks for joining The App Factory email list! We'll send you more information as we get closer to launch."
			)
			prospectEmail = ''
		} else {
			alert('Please enter a valid email address.')
		}
	}

	async function saveEmail(email: string) {
		let dbExpr = `INSERT app_crm::CrmClient { 
			createdBy := sys_user::getRootUser(),
			email := '${email}',
			modifiedBy := sys_user::getRootUser(),
			name := '${email}',
			owner := sys_core::getSystemPrime('sys_client_app_factory'),
		}`

		return await apiFetchFunction(
			ApiFunction.dbGelProcessExpression,
			new TokenApiFetchError(FILENAME, 'saveEmail', 'Error saving email.'),
			new TokenApiQueryData({ dbExpr })
		)
	}
	async function dbInit() {
		return await apiFetchFunction(
			ApiFunction.dbGelInit,
			new TokenApiFetchError(FILENAME, 'adminDbReset', 'Unable to reset database.')
		)
	}
</script>

<div class="bg-white h-full overflow-y-auto">
	<header class="shadow-xs flex justify-between border-b py-2">
		<img class="ml-4 h-14 sm:h-16" src={srcLogo} alt="The App Factory" />
		<div class="flex items-center justify-end">
			<button class="btn text-white variant-filled-primary mr-4" onclick={goto('/auth/login')}>
				Log in
			</button>
			<button class="btn variant-ringed-primary mr-4" onclick={() => goto('/auth/signup')}>
				Sign up
			</button>
			{#if IS_DEV_MODE}
				<button type="button" class="btn btn-action variant-filled-error w-full" onclick={dbInit}>
					Admin (DB Init)
				</button>
			{/if}
		</div>
	</header>

	<div
		class="py-4 px-6 md:px-20 flex flex-col items-center md:flex-row gap-10 border-0 border-green-400"
	>
		<div class="flex flex-col border-0 border-red-400">
			<p class="text-3xl font-bold mb-2">
				The App Factory makes enterprise-class data management easy, fast, and affordable
			</p>
			<div class="flex flex-col gap-4 text-lg text-gray-500">
				<p>
					The App Factory is a low-code SaaS framework that compiles descriptions of business
					workflows into robust, secure data management applets customized for every user in your
					organization.
				</p>
				<p>
					In addition to comprehensive data management, the framework also provides tools that
					tightly integrate with your organizational data to increase staff productivity and
					facilitate just-in-time, fact-based decision making.
				</p>
				<p>
					Our mission is to help organizations of all sizes and industries to automate their
					workflows and transform data into information with the ease of using an office
					application-empowering them to achieve in hours what once took months or years.
				</p>

				<!-- <p>
					Our first of its kind "application compiler" allows us to build robust and secure data
					management systems, customized for each user role in your organization with little or no
					traditional programming.
				</p>
				<p>
					We provide you with a customized solution that supports your exact business processes and
					includes enterprise-class data management features such as integrated reporting, data
					analytics, organizational OKRs, and AI agents, all while maintaining the implementation
					timeline and costs of an off-the-shelf product.
				</p>
				<p>
					We get you up and running, including migrating your existing data, in weeks rather than
					months - generally for about $10k.
				</p>
				<p>
					We charge a moderate monthly fee per user per month - $75 for most users, $125 for
					managers, system administrators, and data analysts with discounts available for volume
					implementations.
				</p> -->
				<p>We're launching publicly this fall!</p>
				<p>Join our email list for more information.</p>
			</div>
			<div
				class="w-full flex flex-row justify-between text-sm border border-neutral-300 rounded-xl p-2 mt-6"
			>
				<input
					class="grow border-0"
					type="email"
					bind:value={prospectEmail}
					placeholder="Your email address"
				/>
				<div class="flex items-center ml-2">
					<button
						class="btn text-white bg-orange-500 hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 mr-2"
						onclick={() => processEmail()}
					>
						Learn more
						<div class="mt-0 ml-2">
							<ArrowRight clazz="mb-4" size="18" />
						</div>
					</button>
				</div>
			</div>
		</div>

		<img class="md:w-[55%] p-1 border" src={srcExFormList} alt="Example list form" />
	</div>
</div>
