$(function(){
	var chart;

	chart = new Highcharts.Chart({
		chart: {
			renderTo:'graph_area',
			zoomType:"x",
			spacingTop: 30,
			spacingRight: 50
		},

		title:{
			text:'Arduino Serial Test',
		},

		xAxis:{
			tickInterval: 5,
			title:{
				text: "秒数?"
			}
		},

		yAxis:{
			max: 50,
			min: 0,
			title:{
				text:'serialvalue'
			}
		},
		credits:{
			enabled: false
		},

		legend:{
			enabled:false
		},

		//protOptions:{
		//	area:{
		//		fillColor:{
		//			stops:[
		//			[0,Highcharts.Color("#0000FF").setOpacity(1).get('rgba')],
		//			[1,Highcharts.Color("#00BBFF").setOpacity(0).get('rgba')]
		//			],
		//			linearGradient:{x1:0,y1:0,x2:0,y2:1}
		//		},
		//		lineWidth:1,
		//		maker:{
		//			enabled:false
		//		},
		//		threshold: null
		//	}
		//},
		series: [{
			type: 'line',
			//pointInterval: 1,
			data:[]
		}]
	});

	$("#delete").click(function(){
		chart=$("#graph_area").highcharts();
		chart.series[0].data[0].remove();
	});

	$("#all_delete").click(function(){
		chart = $("#graph_area").highcharts();
		while(chart.series[0].data.length > 1){
			chart.series[0].data[0].remove();
		}
	});
});