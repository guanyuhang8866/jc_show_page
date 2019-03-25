function get_recommendedindustries() {
    $("#pic4").remove()
    $("#zfzt").after("<div id = \"pic4\"></div>")
    var myCharts4 = echarts.init(document.getElementById('pic4'));
    var load = new Loading();
    load.init({target: "#section-4"});
    load.start();
    var word = $("#ner_txt").val();
    $.ajax({
        url: "/recommendedindustries",
        data: {"content": word},
        dataType: "json",
        type: "POST",
        async: true,
        success: function (sim) {
            var myCharts4 = echarts.init(document.getElementById('pic4'));
            var option4 = {
                backgroundColor: '#eee',
                tooltip: {
                    trigger: 'item',
                    formatter: "{c}"
                },
                series: [
                    {
                        name: '执法主题类型',
                        type: 'pie',
                        clockwise: 'true',
                        startAngle: '0',
                        radius: '60%',
                        center: ['50%', '50%'],
                        data: [{
                            value: sim.result.其他,
                            name: '其他'
                        },
                            {
                                value: sim.result.环保,
                                name: '环保'
                            },
                            {
                                value: sim.result.食品药品监督管理局,
                                name: '食药监'}],
                    }
                ]
            };
            myCharts4.setOption(option4)
            load.stop();
        }
    })
}