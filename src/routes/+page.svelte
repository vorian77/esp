<script lang="ts">
	import srcLogo from '$assets/org_logo_sys.png'
	import srcExFormList from '$assets/ex_form_list.png'
	import { ArrowRight } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import { DataObjData, type DataRecord, ParmsValuesType, ResponseBody } from '$utils/types'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import { TokenApiQueryData } from '$utils/types.token'

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
		let expr = `INSERT app_crm::CrmClient { 
			createdBy := sys_user::getRootUser(),
			email := '${email}',
			modifiedBy := sys_user::getRootUser(),
			name := '${email}',
			owner := sys_core::getSystemPrime('sys_client_app_factory'),
		}`
		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.dbExpr, expr)

		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessExpression,
			new TokenApiQueryData({ dataTab })
		)
		if (result.success) {
			return result.data
		} else {
			error(500, {
				file: FILENAME,
				function: 'saveEmail',
				message: `Error saving email: ${email}`
			})
		}
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
		</div>
	</header>

	<div
		class="py-4 px-6 md:px-20 flex flex-col items-center md:flex-row gap-10 border-0 border-green-400"
	>
		<div class="flex flex-col border-0 border-red-400">
			<p class="text-3xl font-bold mb-2">
				The App Factory makes enterprise-class data management affordable
			</p>
			<div class="flex flex-col gap-4 text-lg text-gray-500">
				<p>
					Our first of its kind "application compiler" allows us to build robust and secure data
					management systems, customized for each user role in your organization with little or no
					traditional programming.
				</p>
				<p>
					We provide you with a customized solution that supports your exact business processes and
					includes enterprise-class data management features such as integrated reporting and data
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
				</p>
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
