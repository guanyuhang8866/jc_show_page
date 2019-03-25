function get_caseType() {
    $("#pic2").remove()
    $("#ajlx").after("<div id = \"pic2\"></div>")
    var myCharts2 = echarts.init(document.getElementById('pic2'));
    var load = new Loading();
    load.init({target: "#section-3"});
    load.start();
    var word = $("#ner_txt").val();
    $.ajax({
        url: "/caseType",
        data: {"content": word},
        dataType: "json",
        type: "POST",
        async: true,
        success: function (caseType) {
            if (caseType.tops) {
                myCharts2.setOption({
                    title: {
                        text: '案件类型'
                    },
                    tooltip: {},
                    legend: {
                        data: ['概率']
                    },
                    xAxis: {
                        data: caseType.tops,
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        }
                    },
                    yAxis: {},
                    series: [{
                        name: '概率',
                        type: 'bar',
                        data: caseType.p
                    }]
                });
            }
            load.stop();
        }
    })

}