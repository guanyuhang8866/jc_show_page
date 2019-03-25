function get_sentiment() {
    $("#pic1").remove()
    $("#qgfx").after("<div id = \"pic1\"></div>")
    var myCharts2 = echarts.init(document.getElementById('pic1'));
    var load = new Loading();
    load.init({target: "#section-2"});
    load.start();
    var word = $("#ner_txt").val();
    $.ajax({
        url: "/sentiment",
        data: {"pos_neg_text": word},
        dataType: "json",
        type: "POST",
        async: true,
        success: function (sim) {
            var myCharts1 = echarts.init(document.getElementById('pic1'));
            var option1 = {
                backgroundColor: '#eee',
                tooltip: {
                    trigger: 'item',
                    formatter: "{c}"
                },
                series: [
                    {
                        name: '情感极性',
                        type: 'pie',
                        clockwise: 'true',
                        startAngle: '0',
                        radius: '60%',
                        center: ['50%', '50%'],
                        data: [{
                            value: sim.result[0],
                            name: '正面指数'
                        },
                            {
                                value: sim.result[1],
                                name: '负面指数'
                            }],
                    }
                ]
            };
            myCharts1.setOption(option1)
            load.stop();
        }
    })
}