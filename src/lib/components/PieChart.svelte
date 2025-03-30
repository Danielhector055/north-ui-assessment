<!-- PieChart.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let data: { service: string; savings: number }[];

	let svgElement: SVGSVGElement;

	onMount(() => {
		const width = 400;
		const height = 400;
		const radius = Math.min(width, height) / 2;

		const svg = d3
			.select(svgElement)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.append('g')
			.attr('transform', `translate(${width / 2},${height / 2})`);

		const color = d3
			.scaleOrdinal()
			.domain(data.map((d) => d.service))
			.range(['#3B82F6', '#8B5CF6', '#10B981', '#000000']);

		const pie = d3.pie<(typeof data)[0]>().value((d) => d.savings);

		const arc = d3
			.arc<d3.PieArcDatum<(typeof data)[0]>>()
			.innerRadius(radius * 0.5)
			.outerRadius(radius * 0.8);

		const arcs = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

		// Draw arcs
		arcs
			.append('path')
			.attr('d', arc)
			.attr('fill', (d) => color(d.data.service));

		// Add labels
		arcs
			.append('text')
			.attr('transform', (d) => `translate(${arc.centroid(d)})`)
			.attr('text-anchor', 'middle')
			.style('fill', (d) => (d.data.service === 'Other' ? 'white' : 'black'))
			.text((d) => d.data.service);
	});
</script>

<svg class="h-full w-full" bind:this={svgElement} />
