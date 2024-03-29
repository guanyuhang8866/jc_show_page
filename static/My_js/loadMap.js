var myCharts3 = echarts.init(document.getElementById('pic3'));
optionmap = {
    "tooltip": { //提示框组件。
        "trigger": 'item', //触发类型 散点图
        "enterable": false, //鼠标是否可进入提示框
        "transitionDuration": 0.5, //提示框移动动画过渡时间
        "formatter": function (params) {
            return '<a target="_blank" class="params-name" href="alert(可以添加链接)">' + params.name + '</a>'
        },
        "backgroundColor": '#fff',
        "borderWidth": '1px',
        "borderRadius": '5',
        "borderColor": 'rgba(72,150,128,1)',
        "textStyle": {
            //"color": 'rgba(94,194,222,1)'
        },
        "padding": 22
    },
    "series": [{ //系列列表
        "name": "中国",
        "type": "map",
        "mapType": "china",
        "zoom": 1, //当前视角的缩放比例。
        "selectedMode": false,
        "layoutCenter": ['50%', '53%'],
        "layoutSize": "102%",
        "label": { //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            "normal": {
                "show": false,
                "textStyle": {
                    "color": "#fff",
                    "fontSize": "12"
                }
            },
            "emphasis": {
                "show": false,
                "textStyle": {
                    "color": "#fff",
                    "fontSize": "12"
                }
            }
        },
        "markPoint": { //图表标注。
            "symbol": 'path://M512 39.384615l169.353846 295.384615 342.646154 63.015385-240.246154 248.123077L827.076923 984.615385l-315.076923-145.723077L196.923077 984.615385l43.323077-334.769231L0 401.723077l342.646154-63.015385L512 39.384615',
            "symbolSize": 15,//图形大小
            "label": {
                "normal": {
                    "show": true,
                },
                "emphasis": {
                    "show": true,
                }
            },
            "itemStyle": {
                "normal": {
                    "color": 'rgba(72,150,128,1)'
                }
            },
            "data": []
        }
    }]
}
myCharts3.setOption(optionmap);