<script lang="ts">
	import { LogOut, Settings, House, Circle, ChartNoAxesColumn } from '@lucide/svelte';

	const navItems = [
		{ icon: House, text: 'Dashboard', active: true },
		{ icon: Circle, text: 'Navigation', active: false },
		{ icon: Circle, text: 'Navigation', active: false }
	];

	const footerItems = [
		{ icon: ChartNoAxesColumn, text: 'Support' },
		{ icon: Settings, text: 'Settings' }
	];

	const user = {
		name: 'Olivia Rhye',
		email: 'olivia@untitledui.com',
		avatar: './images/avatar.svg'
	};
</script>

<nav class="flex flex-col font-mono font-bold md:h-full">
	<div class="flex items-center justify-between border-b border-purple-300 p-4 md:hidden">
		<img
			src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dbf28b0358f5eeab85389c64bf6508e8eca48c0?placeholderIfAbsent=true&apiKey=4cdc63e0b1034d4cac6698f0d9c29793"
			alt="Logo"
			class="w-16 object-contain"
		/>
		<div class="flex space-x-4">
			{#each navItems.slice(0, 3) as item}
				<a href="/" class="rounded-md p-2 {item.active ? 'bg-fuchsia-200' : 'hover:bg-purple-300'}">
					<item.icon class="h-6 w-6 text-zinc-800" />
				</a>
			{/each}
		</div>
	</div>

	<div class="hidden h-full flex-col md:flex">
		<!-- Logo -->
		<div class="px-6 pt-8">
			<img
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dbf28b0358f5eeab85389c64bf6508e8eca48c0?placeholderIfAbsent=true&apiKey=4cdc63e0b1034d4cac6698f0d9c29793"
				alt="Logo"
				class="w-24 object-contain"
			/>
		</div>

		<!-- Navigation -->
		<ul class="mt-7 flex-1 space-y-2 px-4">
			{#each navItems as item}
				<li>
					<a
						href="/"
						class="flex items-center rounded-md p-3 transition-colors
                    {item.active
							? 'bg-fuchsia-200 text-zinc-800'
							: 'text-slate-50 hover:bg-purple-300'}"
					>
						<item.icon class="mr-3 h-6 w-6 " />
						<span class="text-base font-bold">{item.text}</span>
					</a>
				</li>
			{/each}
		</ul>

		<!-- Footer -->
		<div class="px-4 pb-8">
			<nav class="mb-6 space-y-2">
				{#each footerItems as item}
					<a
						href="/"
						class="flex items-center rounded-md p-3 text-slate-50 transition-colors hover:bg-purple-300"
					>
						<item.icon class="mr-3 h-6 w-6 shrink-0" />
						<span class="truncate text-base font-bold md:text-lg">{item.text}</span>
					</a>
				{/each}
			</nav>

			<div class="my-4 h-px bg-slate-50 md:my-6"></div>

			<div class="mb-6 flex items-center justify-between gap-2">
				<div class="flex min-w-0 items-center gap-2 md:gap-3">
					<img
						src={user.avatar}
						alt="User avatar"
						class="h-8 w-8 shrink-0 rounded-full object-cover md:h-10 md:w-10"
					/>
					<div class="min-w-0">
						<div class="truncate text-sm font-bold text-slate-50 md:text-base">{user.name}</div>
						<div class="mt-0.5 truncate text-xs text-slate-50/80 md:text-sm">{user.email}</div>
					</div>
				</div>
				<button class="shrink-0 p-1 text-slate-50 transition-colors hover:text-slate-200 md:p-2">
					<LogOut class="h-4 w-4 md:h-5 md:w-5" />
				</button>
			</div>
		</div>
	</div>
</nav>
