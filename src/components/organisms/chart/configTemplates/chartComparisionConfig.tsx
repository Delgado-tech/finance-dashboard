interface IBarConfig {
	chart?: ApexChart;
	categories?: any;
	series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
	yaxis?: ApexYAxis;
	strokeWidth?: number;
}

export default function chartComparisionConfig({
	chart,
	series,
	categories,
	yaxis,
	strokeWidth = 4,
}: IBarConfig): ApexCharts.ApexOptions {
	return {
		chart: chart,
		plotOptions: {
			bar: {
				borderRadius: 5,
				borderRadiusApplication: "end",
				columnWidth: "55%",
			},
		},
		series: series,
		xaxis: {
			categories: categories,
			labels: {
				style: {
					colors: "#8b8b8b",
				},
			},
		},
		yaxis: yaxis,
		stroke: {
			show: true,
			width: strokeWidth,
			curve: "smooth",
			colors: chart?.type === "area" ? undefined : ["transparent"],
		},
		grid: { borderColor: "#e5e5e5" },
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},
		states: {
			hover: {
				filter: {
					type: "darken",
					value: 0.6,
				},
			},
		},
	};
}
