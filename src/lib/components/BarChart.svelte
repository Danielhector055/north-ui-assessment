<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	// Sample data for the charts
	const monthlySavings = [
		{ month: 'Jan', savings: 380 },
		{ month: 'Feb', savings: 470 },
		{ month: 'Mar', savings: 250 },
		{ month: 'Apr', savings: 400 },
		{ month: 'May', savings: 250 },
		{ month: 'Jun', savings: 440 },
		{ month: 'Jul', savings: 380 },
		{ month: 'Aug', savings: 400 },
		{ month: 'Sep', savings: 380 },
		{ month: 'Oct', savings: 420 },
		{ month: 'Nov', savings: 470 },
		{ month: 'Dec', savings: 350 }
	];

	const categorySavings = [
		{ category: 'EC2', value: 250 },
		{ category: 'RDS', value: 500 },
		{ category: 'S3', value: 300 },
		{ category: 'Lambda', value: 150 }
	];

	// Data for detailed line chart (daily data for June)
	const detailedSavings = Array.from({ length: 30 }, (_, i) => {
		const date = new Date(2024, 5, i + 1);
		const baseValue = 30;
		const randomFactor = Math.sin(i / 2) * 10 + Math.random() * 5;
		const trend = i / 10; // Gradual upward trend
		return {
			date,
			amount: baseValue + randomFactor + trend
		};
	});

	// Function to create the bar chart without axes
	function createBarChart() {
		const width = document.getElementById('barChart').clientWidth;
		const height = 300;
		const margin = { top: 20, right: 20, bottom: 100, left: 50 };
		const chartWidth = width - margin.left - margin.right;
		const chartHeight = height - margin.top - margin.bottom;

		// Clear previous SVG
		d3.select('#barChart').selectAll('svg').remove();

		const svg = d3
			.select('#barChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// X scale
		const x = d3
			.scaleBand()
			.domain(monthlySavings.map((d) => d.month))
			.range([0, chartWidth])
			.padding(0.3);

		// Y scale
		const y = d3
			.scaleLinear()
			.domain([0, d3.max(monthlySavings, (d) => d.savings) * 1.1])
			.range([chartHeight, 0]);

		// Draw reference lines (horizontal light gray lines)
		const yTicks = [100, 200, 300, 400, 500, 600];
		svg
			.selectAll('.y-grid-line')
			.data(yTicks)
			.enter()
			.append('line')
			.attr('class', 'y-grid-line')
			.attr('x1', 0)
			.attr('x2', chartWidth)
			.attr('y1', (d) => y(d))
			.attr('y2', (d) => y(d))
			.attr('stroke', '#f0f0f0')
			.attr('stroke-width', 1);

		// Add Y axis labels (without axis line)
		svg
			.selectAll('.y-label')
			.data(yTicks)
			.enter()
			.append('text')
			.attr('class', 'y-label')
			.attr('x', -10)
			.attr('y', (d) => y(d))
			.attr('dy', '0.32em')
			.attr('text-anchor', 'end')
			.attr('font-size', '12px')
			.attr('fill', '#888')
			.text((d) => d.toFixed(0));

		// Add bars
		svg
			.selectAll('.bar')
			.data(monthlySavings)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d) => x(d.month))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(d.savings))
			.attr('height', (d) => chartHeight - y(d.savings))
			.attr('fill', '#c084fc') // Purple color matching the image
			.attr('rx', 4) // Rounded corners
			.attr('ry', 4);

		// Add X axis labels (month names only)
		svg
			.selectAll('.x-label')
			.data(monthlySavings)
			.enter()
			.append('text')
			.attr('class', 'x-label')
			.attr('x', (d) => x(d.month) + x.bandwidth() / 2)
			.attr('y', chartHeight + 20)
			.attr('text-anchor', 'middle')
			.attr('font-size', '12px')
			.attr('fill', '#555')
			.text((d) => d.month);

		// Add label for Y axis
		svg
			.append('text')
			.attr('x', -chartHeight / 2)
			.attr('y', -40)
			.attr('transform', 'rotate(-90)')
			.attr('text-anchor', 'middle')
			.attr('font-size', '14px')
			.attr('fill', '#555')
			.text('Savings');

		// Add label for X axis
		svg
			.append('text')
			.attr('x', chartWidth / 2)
			.attr('y', chartHeight + 45)
			.attr('text-anchor', 'middle')
			.attr('font-size', '14px')
			.attr('fill', '#555')
			.text('Month');
	}

	// Function to create the donut chart
	function createDonutChart() {
		const width = document.getElementById('donutChart').clientWidth;
		const height = 300;
		const margin = 40;
		const radius = Math.min(width, height) / 2 - margin;

		// Clear previous SVG
		d3.select('#donutChart').selectAll('svg').remove();

		const svg = d3
			.select('#donutChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${width / 3},${height / 2})`);

		// Color scale
		const color = d3
			.scaleOrdinal()
			.domain(categorySavings.map((d) => d.category))
			.range(['#f9d2ff', '#1f2937', '#c084fc', '#e0f2fe']);

		// Compute the position of each group on the pie
		const pie = d3
			.pie()
			.value((d) => d.value)
			.sort(null);

		const data_ready = pie(categorySavings);

		// Build arcs
		const arc = d3
			.arc()
			.innerRadius(radius * 0.5) // This creates the donut hole
			.outerRadius(radius);

		// Build the pie chart
		svg
			.selectAll('path')
			.data(data_ready)
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', (d) => color(d.data.category))
			.style('stroke-width', '2px')
			.style('stroke', 'white');

		// Add labels
		const labelArc = d3
			.arc()
			.innerRadius(radius * 0.8)
			.outerRadius(radius * 0.8);

		svg
			.selectAll('.donut-label')
			.data(data_ready)
			.enter()
			.append('text')

			.attr('class', 'donut-label')
			.attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
			.attr('dy', '0.35em')
			.attr('text-anchor', 'middle')
			.attr('fill', (d) => (d.data.category === 'RDS' ? 'white' : 'black')) // White text for black segment
			.attr('font-size', '14px')
			.attr('font-weight', 'bold')
			.text((d) => d.data.value.toFixed(0));

		// Add legend
		const legend = svg
			.selectAll('.legend')
			.data(data_ready)
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', (d, i) => `translate(${radius + 10}, ${-radius + 20 + i * 25})`);

		legend
			.append('rect')
			.attr('width', 12)
			.attr('height', 12)
			.attr('fill', (d) => color(d.data.category));

		legend
			.append('text')
			.attr('x', 20)
			.attr('y', 6)
			.attr('dy', '0.35em')
			.attr('font-size', '14px')
			.attr('fill', '#333')
			.text((d) => d.data.category);
	}

	// Function to create the line chart with gradient and no axes
	function createLineChart() {
		const width = document.getElementById('lineChart').clientWidth;
		const height = 250;
		const margin = { top: 20, right: 20, bottom: 60, left: 50 };
		const chartWidth = width - margin.left - margin.right;
		const chartHeight = height - margin.top - margin.bottom;

		// Clear previous SVG
		d3.select('#lineChart').selectAll('svg').remove();

		const svg = d3
			.select('#lineChart')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Define gradient
		const gradient = svg
			.append('defs')
			.append('linearGradient')
			.attr('id', 'area-gradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '0%')
			.attr('y2', '100%');

		gradient
			.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', '#e6fefc')
			.attr('stop-opacity', 0.7);

		gradient
			.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', '#e6fefc')
			.attr('stop-opacity', 0.3);

		// X scale
		const x = d3
			.scaleTime()
			.domain(d3.extent(detailedSavings, (d) => d.date))
			.range([0, chartWidth]);

		// Y scale
		const y = d3
			.scaleLinear()
			.domain([0, d3.max(detailedSavings, (d) => d.amount) * 1.1])
			.range([chartHeight, 0]);

		// Draw reference lines (horizontal light gray lines)
		const yTicks = [10, 20, 30, 40, 50, 60];
		svg
			.selectAll('.y-grid-line')
			.data(yTicks)
			.enter()
			.append('line')
			.attr('class', 'y-grid-line')
			.attr('x1', 0)
			.attr('x2', chartWidth)
			.attr('y1', (d) => y(d))
			.attr('y2', (d) => y(d))
			.attr('stroke', '#f0f0f0')
			.attr('stroke-width', 1);

		// Add Y axis labels (without axis line)
		svg
			.selectAll('.y-label')
			.data(yTicks)
			.enter()
			.append('text')
			.attr('class', 'y-label')
			.attr('x', -10)
			.attr('y', (d) => y(d))
			.attr('dy', '0.32em')
			.attr('text-anchor', 'end')
			.attr('font-size', '12px')
			.attr('fill', '#888')
			.text((d) => d.toFixed(0));

		// Add X axis date labels
		const dateTicks = [
			new Date(2024, 5, 1), // Jun 1
			new Date(2024, 5, 6), // Jun 6
			new Date(2024, 5, 12), // Jun 12
			new Date(2024, 5, 18), // Jun 18
			new Date(2024, 5, 24), // Jun 24
			new Date(2024, 5, 30) // Jun 30
		];

		svg
			.selectAll('.x-label')
			.data(dateTicks)
			.enter()
			.append('text')
			.attr('class', 'x-label')
			.attr('x', (d) => x(d))
			.attr('y', chartHeight + 20)
			.attr('text-anchor', 'middle')
			.attr('font-size', '12px')
			.attr('fill', '#888')
			.text((d) => `${d.getDate().toString().padStart(2, '0')} Jun`);

		// Add the area with gradient
		svg
			.append('path')
			.datum(detailedSavings)
			.attr('fill', 'url(#area-gradient)')
			.attr('stroke', 'none')
			.attr(
				'd',
				d3
					.area()
					.x((d) => x(d.date))
					.y0(chartHeight)
					.y1((d) => y(d.amount))
			);

		// Add the line
		svg
			.append('path')
			.datum(detailedSavings)
			.attr('fill', 'none')
			.attr('stroke', '#c084fc')
			.attr('stroke-width', 2)
			.attr(
				'd',
				d3
					.line()
					.x((d) => x(d.date))
					.y((d) => y(d.amount))
					.curve(d3.curveMonotoneX)
			);
	}

	// Initialize charts on component mount
	onMount(() => {
		createBarChart();
		createDonutChart();
		createLineChart();

		// Handle window resize
		const handleResize = () => {
			createBarChart();
			createDonutChart();
			createLineChart();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="mt-5 bg-gray-50 font-mono">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Monthly Savings Bar Chart (2/3 width) -->
		<div class="rounded-lg bg-white p-6 shadow-md md:col-span-2">
			<h2 class="mb-2 text-xl font-semibold">Savings Trends</h2>
			<div class="mb-4 h-0.5 w-full bg-gray-100"></div>
			<div id="barChart" class="h-64 w-full"></div>
		</div>

		<!-- Category Savings Donut Chart (1/3 width) -->
		<div class="rounded-lg bg-white p-6 shadow-md md:col-span-1">
			<h2 class="mb-2 text-xl font-semibold">Savings By Category</h2>
			<div class="mb-4 h-0.5 w-full bg-gray-100"></div>
			<div id="donutChart" class="h-64 w-full"></div>
		</div>
	</div>

	<!-- Detailed Savings Line Chart (full width) -->
	<div class="mt-6 rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-2 text-xl font-semibold">Detailed Savings</h2>
		<div class="mb-4 h-0.5 w-full bg-gray-100"></div>
		<div id="lineChart" class="h-52 w-full"></div>
	</div>
</div>
