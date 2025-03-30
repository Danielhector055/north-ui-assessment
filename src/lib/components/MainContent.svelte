<script lang="ts">
	import { onMount } from 'svelte';
	import MetricCard from './MetricCard.svelte';
	import BarChart from './BarChart.svelte';
	import { fetchDashboardData } from '$lib/api/data.js';
	import type { SavingsData } from '../../utils/types.ts';
	import PieChart from './PieChart.svelte';
	// import SavingsDetails from './SavingsDetails.svelte';
	import { CloudDownload, ListFilter, Calendar } from '@lucide/svelte';

	let dashboardData: SavingsData;
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			dashboardData = await fetchDashboardData();
			loading = false;
			console.log('dashboardData', dashboardData);
		} catch (e) {
			error = 'Failed to load dashboard data';
			loading = false;
		}
	});

	type MetricItem = {
		title: string;
		value: string;
		change: {
			value: string;
			type: 'success' | 'error';
		};
	};

	$: metrics = dashboardData
		? ([
				{
					title: 'Total Savings',
					value: `$${dashboardData.overview.totalSavings.toFixed(2)}`,
					change: { value: '10%', type: 'success' as const }
				},
				{
					title: 'Current Month Saving',
					value: `$${dashboardData.overview.currentMonthSavings.toFixed(2)}`,
					change: { value: '12%', type: 'success' as const }
				},
				{
					title: 'Percentage Change',
					value: `${dashboardData.overview.percentageChange}%`,
					change: { value: '2%', type: 'error' as const }
				}
			] as MetricItem[])
		: [];
</script>

<div class="bg-main-light flex flex-col p-8 font-mono">
	<div class="flex flex-row justify-between">
		<div class="flex flex-col gap-2">
			<h1 class="text-3xl font-extrabold">Dashboard</h1>
			<p class="text-md font-sans text-gray-500">You can find overview and activity here.</p>
		</div>
		<div class="font-sans">
			<button
				class="flex flex-row items-center gap-2 rounded-lg border border-zinc-400 bg-white px-4 pt-1 shadow-sm"
			>
				<CloudDownload class="h-6 w-6 text-zinc-800" />
				Export CSV
			</button>
		</div>
	</div>

	<!-- <div class="my-3 flex min-w-60 flex-row justify-between font-sans">
		<div
			class=" flex flex-wrap items-center justify-between gap-5 font-sans text-sm leading-none font-medium"
		>
			<div class="flex overflow-hidden rounded-lg">
				<button
					class="-ml-px cursor-pointer border border-gray-300 bg-white px-4 py-3.5 first:ml-0 first:rounded-l-lg last:rounded-r-lg"
					>Today</button
				>
				<button class="bg-main-light relative -ml-px border border-gray-300 px-4 py-3.5"
					>Weekly</button
				>
				<button
					class="-ml-px cursor-pointer border border-gray-300 bg-white px-4 py-3.5 last:rounded-r-lg"
					>Monthly</button
				>
			</div>
		</div>

		<div class="flex gap-3">
			<button
				class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 shadow-sm"
			>
				<Calendar class="h-5 w-5" />
				<span class="font-sans">Jan 6, 2022 – Jan 13, 2022</span>
			</button>
			<button
				class="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 whitespace-nowrap shadow-sm"
			>
				<ListFilter class="h-5 w-5 font-bold" />
				<span>Filters</span>
			</button>
		</div>
	</div> -->

	<div class="my-3 flex flex-col gap-4 font-sans md:flex-row md:items-center md:justify-between">
		<!-- Timeframe Buttons -->
		<div class="w-full md:w-auto">
			<div class="flex w-full overflow-hidden rounded-lg shadow-sm">
				<button
					class="flex-1 border border-gray-300 bg-white px-4 py-2 text-sm first:rounded-l-lg hover:bg-gray-50 md:py-3.5 md:text-base"
				>
					Today
				</button>
				<button
					class="flex-1 border border-gray-300 bg-gray-100 px-4 py-2 text-sm hover:bg-gray-50 md:py-3.5 md:text-base"
				>
					Weekly
				</button>
				<button
					class="flex-1 border border-gray-300 bg-white px-4 py-2 text-sm last:rounded-r-lg hover:bg-gray-50 md:py-3.5 md:text-base"
				>
					Monthly
				</button>
			</div>
		</div>

		<!-- Date Range + Filters -->
		<div class="flex w-full flex-col gap-3 lg:flex-row xl:w-auto">
			<button
				class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50 md:px-4 md:py-3.5"
			>
				<Calendar class="h-5 w-5 shrink-0" />
				<span class="truncate whitespace-nowrap">Jan 6, 2022 – Jan 13, 2022</span>
			</button>
			<button
				class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50 md:px-4 md:py-3.5"
			>
				<ListFilter class="h-5 w-5 shrink-0" />
				<span>Filters</span>
			</button>
		</div>
	</div>

	<div class="">
		<div class="mt-3 flex flex-wrap gap-6">
			{#each metrics as metric}
				<div class="min-w-60 flex-1">
					<MetricCard {...metric} />
				</div>
			{/each}
		</div>
	</div>

	{#if loading}
		<div class="loading">Loading...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else}
		<BarChart data={dashboardData.savingsTrends} />
	{/if}
</div>
