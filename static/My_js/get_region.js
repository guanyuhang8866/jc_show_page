function get_region() {
    $("#address").remove()
    var load = new Loading();
    load.init({target: "#section-5"});
    load.start();
    var word = $("#ner_txt").val();
    $.ajax({
        url: "/region",
        data: {"content": word},
        dataType: "json",
        type: "POST",
        async: true,
        success: function (sim) {
            if (sim.address) {
                var option2 = {
                    "series": [{ //系列列表
                        "markPoint": { //图表标注。
                            "data": [{
                                // 根据名字对应到相应的系列
                                name: sim.address,
                                coord: sim.xy,
                                region: sim.code
                            }]
                        }
                    }]
                }
                myCharts3.setOption(option2);
                $("#pic3").before('<ul class="u" id="address">' + '<li>' + sim.code + "  " + sim.address + '</li>' + '</ul>')
            } else {
                var option2 = {
                    "series": [{ //系列列表
                        "markPoint": { //图表标注。
                            "data": []
                        }
                    }]
                }
                myCharts3.setOption(option2);
            }
            load.stop();
        }
    })
}