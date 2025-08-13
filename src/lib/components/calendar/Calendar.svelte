<script lang="ts">
	import { Calendar } from 'bits-ui'
	import { getLocalTimeZone, today } from '@internationalized/date'
	import { fly, scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	const isDateUnavailable: Calendar.RootProps['isDateUnavailable'] = (date) => {
		return undefined
		// return date.day === 17 || date.day === 18
	}

	let {
		value = $bindable(today(getLocalTimeZone())),
		showTodayButton = true,
		allowYearNavigation = true
	} = $props()

	let isAnimating = $state(false)
	let selectedYear = $state(value.year)
	let selectedMonth = $state(value.month)

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	// Generate years from current year down to 1900
	const currentYear = new Date().getFullYear()
	const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)

	// Quick navigation shortcuts
	function goToToday() {
		value = today(getLocalTimeZone())
		selectedYear = value.year
		selectedMonth = value.month
	}

	// Apply selected year/month immediately when changed
	function updateFromDropdown() {
		const newDate = value.set({ year: selectedYear, month: selectedMonth })
		value = newDate
	}

	// Enhanced keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.target instanceof HTMLElement && event.target.closest('.calendar-day')) {
			switch (event.key) {
				case 'Enter':
				case ' ':
					event.preventDefault()
					event.target.click()
					break
				case 'Escape':
					// Close modal or blur calendar
					event.target.blur()
					break
			}
		}
	}

	// Animation handling
	function handleMonthChange() {
		isAnimating = true
		setTimeout(() => {
			isAnimating = false
		}, 200)
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Calendar.Root
	class="card inline-block border border-surface-200-800 bg-surface-50-950 shadow-xl mt-6 p-4 transition-all duration-200 hover:shadow-2xl"
	{isDateUnavailable}
	weekdayFormat="short"
	fixedWeeks={true}
	type="single"
	bind:value
>
	{#snippet children({ months, weekdays })}
		<!-- Enhanced Header with Our Own Navigation -->
		<Calendar.Header class="flex items-center justify-between mb-4" data-calendar-header>
			<!-- Our Custom Previous Button -->
			<button
				class="btn-icon preset-filled-primary-500 hover:scale-110 transition-transform duration-150"
				title="Previous month"
				aria-label="Previous month"
				onclick={() => {
					if (selectedMonth === 1) {
						selectedMonth = 12
						selectedYear = selectedYear - 1
					} else {
						selectedMonth = selectedMonth - 1
					}
					updateFromDropdown()
					handleMonthChange()
				}}
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<!-- Our Month/Year Selectors (now controlling everything) -->
			<div class="flex gap-2 items-center">
				<select
					bind:value={selectedMonth}
					onchange={updateFromDropdown}
					class="border border-surface-200-800 rounded px-2 py-1 text-sm bg-white dark:bg-surface-700 min-w-[120px] font-bold"
					title="Select month"
				>
					{#each monthNames as month, i}
						<option value={i + 1}>{month}</option>
					{/each}
				</select>
				<select
					bind:value={selectedYear}
					onchange={updateFromDropdown}
					class="border border-surface-200-800 rounded px-2 py-1 text-sm bg-white dark:bg-surface-700 min-w-[80px] font-bold"
					title="Select year"
				>
					{#each yearOptions as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>

			<!-- Our Custom Next Button -->
			<button
				class="btn-icon preset-filled-primary-500 hover:scale-110 transition-transform duration-150"
				title="Next month"
				aria-label="Next month"
				onclick={() => {
					if (selectedMonth === 12) {
						selectedMonth = 1
						selectedYear = selectedYear + 1
					} else {
						selectedMonth = selectedMonth + 1
					}
					updateFromDropdown()
					handleMonthChange()
				}}
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</Calendar.Header>

		<!-- Today Button and Quick Actions -->
		{#if showTodayButton}
			<div class="flex justify-center mb-3">
				<button
					class="btn preset-tonal text-xs px-3 py-1 hover:scale-105 transition-transform duration-150"
					onclick={goToToday}
					title="Go to today (Ctrl/Cmd + T)"
				>
					Today
				</button>
			</div>
		{/if}

		<!-- Enhanced Calendar Grid with Animation -->
		<div
			class="flex flex-col space-y-4 pt-2 sm:flex-row sm:space-x-4 sm:space-y-0"
			class:opacity-75={isAnimating}
			style="transition: opacity 200ms ease-in-out"
		>
			{#each months as month, i (i)}
				<Calendar.Grid class="w-full border-collapse select-none space-y-1">
					<!-- Enhanced Weekday Headers -->
					<Calendar.GridHead>
						<Calendar.GridRow class="mb-2 flex w-full justify-between">
							{#each weekdays as day}
								<Calendar.HeadCell
									class="text-surface-600-400 font-semibold w-10 rounded-md text-xs py-2"
								>
									<div>{day.slice(0, 2)}</div>
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>

					<!-- Enhanced Calendar Body -->
					<Calendar.GridBody>
						{#each month.weeks as weekDates}
							<Calendar.GridRow class="flex w-full">
								{#each weekDates as date}
									<Calendar.Cell
										{date}
										month={month.value}
										class="p-0 relative size-10 text-center text-sm"
									>
										<Calendar.Day
											class="calendar-day rounded-lg hover:border-surface-200-800 hover:bg-surface-100-800 
											data-selected:bg-primary-500 data-selected:text-white data-selected:shadow-lg
											data-disabled:text-surface-400-600 data-disabled:opacity-50
											data-unavailable:text-red-500 data-unavailable:line-through data-unavailable:opacity-60
											data-disabled:pointer-events-none data-outside-month:pointer-events-none data-outside-month:opacity-30
											data-selected:font-semibold group relative inline-flex size-10 items-center justify-center 
											whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal
											transition-all duration-150 hover:scale-105 focus:ring-2 focus:ring-primary-300 focus:outline-none"
											tabindex="0"
											title={`${date.day} ${month.value.month}/${month.value.year}`}
										>
											<!-- Date Number -->
											<span class="relative z-10">{date.day}</span>

											<!-- Hover Effect -->
											<div
												class="absolute inset-0 rounded-lg bg-primary-100 dark:bg-primary-900 opacity-0
											group-hover:opacity-20 transition-opacity duration-150"
											></div>
										</Calendar.Day>
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</div>
	{/snippet}
</Calendar.Root>

<style>
	/* Custom focus styles for better accessibility */
	:global(.calendar-day:focus) {
		outline: 2px solid rgb(var(--color-primary-500));
		outline-offset: 2px;
	}

	/* Smooth transitions for month changes */
	:global(.calendar-grid) {
		transition: transform 200ms ease-in-out;
	}

	/* Loading state for month navigation */
	:global(.calendar-loading .calendar-day) {
		pointer-events: none;
		opacity: 0.7;
	}
</style>
