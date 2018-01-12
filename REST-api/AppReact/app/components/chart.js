import React from 'react';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

// Pass fusioncharts as a dependency of charts
charts(FusionCharts)

export class Chart extends React.Component {
		constructor(props) {
		super(props);
		//alert(props.result[0][17])
		this.state = {
			chartConfigs : {
				type: 'msline',
				renderAt: 'chart-container',
				width: '100%',
				height: '95%',
				dataFormat: 'json',
				dataSource: {
					"chart": {
						"caption": "Résilience du métro de Paris",
						"subcaption": "sur les différentes lignes",
						"linethickness": "2",
						"xAxisName": "Temps",
						"yAxisName": "Résilience",
						"yAxisValueDecimals" : "1",
						"setAdaptiveYMin": "1",
						"numberPrefix": "res ",
						"showvalues": "0",
						"formatnumberscale": "1",
						"slantlabels": "1",
						"divLineAlpha": "40",
						"anchoralpha": "0",
						"animation": "1",
						"legendborderalpha": "20",
						"drawCrossLine": "1",
						"crossLineColor": "#0d0d0d",
						"crossLineAlpha": "100",
						"tooltipGrayOutColor": "#80bfff",
						"theme": "zune"
					},
					"categories": [{
						"category":[
							{"label": "4h"}, 
							{"label": "5h"}, 
							{"label": "6h"},
							{"label": "7h"}, 
							{"label": "8h"}
						]
					}],
					"dataset": [{
						"seriesname": "ligne 1",
						"color" : "#FFFF00",
						"data":[
							{"value": props.result[0][17]}, 
							{"value": props.result[0][18]},
							{"value": "1"},
							{"value": "1"},			
							{"value": "1"}
						]
					}, 
					{
						"seriesname": "ligne 2",
						"color" : "#0000FF",
						"data":[
							{"value": "0.98"}, 
							{"value": "0.99"},
							{"value": "0.96"}, 
							{"value": "0.99"}, 			
							{"value": "1"}
						]
					}, 
					{
						"seriesname": "ligne 3",
						"color" : "#008000",
						"data":[
							{"value": "0.98"}, 
							{"value": "0.97"},
							{"value": "0.96"}, 
							{"value": "0.99"}, 			
							{"value": "1"}
						]
					}]
				}
			}
		};
    }
    render() {
        return (
			<ReactFC {...this.state.chartConfigs} />
        );
    }
}