<script lang="ts">
	import { ArrowUp, ArrowDown } from '@lucide/svelte';
	export let title: string;
	export let value: string;
	export let change: {
		value: string;
		type: 'success' | 'error';
	};
</script>

<div class="border-border min-w-[240px] flex-1 rounded-lg border bg-white md:p-6">
	<div class="text-text text-md font-mono font-bold">
		<h3>{title}</h3>
	</div>

	<div class="mt-2 flex items-end gap-4">
		<h1 class="text-text font- flex-1 font-sans text-3xl font-bold">
			{value}
		</h1>

		<div class="pb-2">
			<div
				class="flex items-center gap-1 rounded-full px-[10px] py-[2px] text-sm font-medium"
				class:bg-success-bg={change.type === 'success'}
				class:text-success={change.type === 'success'}
				class:bg-error-bg={change.type === 'error'}
				class:text-error={change.type === 'error'}
			>
				<span>
					{#if change.type === 'success'}
						<ArrowUp class="h-3 w-3 object-contain font-bold" />
					{:else}
						<ArrowDown class="h-3 w-3 object-contain font-bold" />
					{/if}
				</span>

				<span>{change.value}</span>
			</div>
		</div>
	</div>
</div>
