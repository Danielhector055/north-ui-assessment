<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import MainContent from './MainContent.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<div class="flex flex-1 flex-col md:flex-row">
		<!-- Desktop Sidebar -->
		<div class="md:w-1/4 lg:w-1/5">
			<Sidebar />
		</div>

		<!-- Main Content -->
		<main class="bg-primary-light flex-1 overflow-auto rounded-l-4xl md:w-3/4 lg:w-3/5">
			<MainContent />
		</main>
	</div>
</div>
