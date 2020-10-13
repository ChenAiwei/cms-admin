"use strict";
layui.use(["okUtils", "okCountUp"], function () {
    var countUp = layui.okCountUp;
    var okUtils = layui.okUtils;
    var $ = layui.jquery;
	
	okUtils.ajax("/console/views", "get", null).done(function(response) {
		initMediaCont(response);
		initDataTrendChart();
		initUserActiveTodayChart(response.productSaleDto);
		initUserSourceTodayChart(response.petSaleDto);
		initUserSourceWeekChart(response.saleStatisticsDto);
	}).fail(function(error) {
		console.log(error)
	});
    okLoading.close();
    /**
     * 收入、商品、宠物、寄养
     */
    function initMediaCont(response) {
        var elem_nums1 = $(".media-cont .num-1");
		var elem_nums2 = $(".media-cont .num-2");
		var elem_nums3 = $(".media-cont .num-3");
		var elem_nums4 = $(".media-cont .num-4");
        elem_nums1.each(function (i, j) {
            !new countUp({
                target: j,
                endVal: response.sellMoney
            }).start();
        });
		elem_nums2.each(function (i, j) {
		    !new countUp({
		        target: j,
		        endVal: response.productCount
		    }).start();
		});
		elem_nums3.each(function (i, j) {
		    !new countUp({
		        target: j,
		        endVal: response.petCount
		    }).start();
		});
		elem_nums4.each(function (i, j) {
		    !new countUp({
		        target: j,
		        endVal: response.fosterCareCount
		    }).start();
		});
    }

    function dataTrendOption(color) {
        color = color || "#00c292";
        return {
            color: color, toolbox: {show: false, feature: {saveAsImage: {}}},
            grid: {left: '-1%', right: '0', bottom: '0', top: '5px', containLabel: false},
            xAxis: [{type: 'category', boundaryGap: false, splitLine: {show: false}, data: []}],
            yAxis: [{type: 'value', splitLine: {show: false}}],
            series: [{
                name: '', type: 'line', stack: '总量', smooth: true, symbol: "none", clickable: false, areaStyle: {},
                data: [randomData(), randomData(),randomData(), randomData(), randomData(), randomData(), randomData()]
            }]
        }
    }

    function randomData() {
        return Math.round(Math.random() * 500);
    }

    /**
     * 头部利润数量涨幅图表
     */
    function initDataTrendChart() {
        // 收入
        var echIncome = echarts.init($("#echIncome")[0]);
        // 商品
        var echGoods = echarts.init($('#echGoods')[0]);
        // 宠物
        var echBlogs = echarts.init($("#echBlogs")[0]);
        // 寄养
        var echUser = echarts.init($('#echUser')[0]);
        echIncome.setOption(dataTrendOption("#00c292"));
        echGoods.setOption(dataTrendOption("#ab8ce4"));
        echBlogs.setOption(dataTrendOption("#03a9f3"));
        echUser.setOption(dataTrendOption("#fb9678"));
        okUtils.echartsResize([echIncome, echGoods, echBlogs, echUser]);
    }

  

    /**
     * 商品利润增幅趋势图
     */
    function initUserActiveTodayChart(response) {
        var productSaleChart = echarts.init($("#userActiveTodayChart")[0], "themez");
		var productSaleChartOption = {
			color: "#03a9f3",
			xAxis: {
				type: 'category',
				data: response.xaxisList
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: response.seriesList,
				type: 'bar'
			}]
		};
        productSaleChart.setOption(productSaleChartOption);
        okUtils.echartsResize([productSaleChart]);
    }



    
    /**
     * 宠物利润分布图
     */
    function initUserSourceTodayChart(response) {
		var petChart = echarts.init($("#userSourceTodayChart")[0], "themez");
		var petChartOption = {
			title: {
				show: false,
				text: '宠物利润',
				subtext: '',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: response.legendList
			},
			series: [{
				name: '利润来源',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				data: response.data,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
        petChart.setOption(petChartOption);
        okUtils.echartsResize([petChart]);
    }

   

    /**
     * 店铺利润来源图表
     */
    function initUserSourceWeekChart(response) {
        var saleWeekChart = echarts.init($("#userSourceWeekChart")[0], "themez");
		var saleWeekChartOption = {
		    title: {show: true, text: ''},
		    tooltip: {trigger: 'axis', axisPointer: {type: 'cross', label: {backgroundColor: '#6a7985'}}},
		    legend: {data: response.legend},
		    toolbox: {show: false, feature: {saveAsImage: {}}},
		    grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
		    xAxis: [{type: 'category', boundaryGap: false, data: response.xaxis}],
		    yAxis: [{type: 'value', splitLine: {show: false},}],
		    series: response.series
		};
        saleWeekChart.setOption(saleWeekChartOption);
        okUtils.echartsResize([saleWeekChart]);
    }
});


