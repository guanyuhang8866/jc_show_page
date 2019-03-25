function get_ner() {
    var load = new Loading();

    var word = $("#ner_txt").val();
    $("#section-1").remove();
    $("#section-2").before("<div class=\"jumbotron\" id=\"section-1\">\n" +
        "                <p class=\"my_text\">命名实体：</p>\n" +
        "                <div id=\"loc1\" class=\"row\" style=\"overflow-y: auto;height: 200px\">\n" +
        "\n" +
        "                </div>\n" +
        "            </div>");
    load.init({target: "#section-1"});
    load.start();
    $.ajax({
        url: "/jc_ner",
        data: {"content": word},
        dataType: "json",
        type: "POST",
        async: true,
        success: function (sim) {
            result = sim.result
            $("#loc1").html("<div class=\"col-md-3\">\n" +
                "                        <div class=\"panel panel-default\">\n" +
                "                            <div class=\"panel-heading\">\n" +
                "                                <p class=\"text-danger my_text\" style=text-align:center;>地理位置</p>\n" +
                "                            </div>\n" +
                "                            <div class=\"panel-body\" id=\"loc\">\n" +
                "\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div class=\"col-md-3\">\n" +
                "                        <div class=\"panel panel-default\">\n" +
                "                            <div class=\"panel-heading\">\n" +
                "                                <p class=\"text-danger my_text\" style=text-align:center;>人名</p>\n" +
                "                            </div>\n" +
                "                            <div class=\"panel-body\" id=\"per\">\n" +
                "\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div class=\"col-md-3\">\n" +
                "                        <div class=\"panel panel-default\">\n" +
                "                            <div class=\"panel-heading\">\n" +
                "                                <p class=\"text-danger my_text\" style=text-align:center;>组织机构</p>\n" +
                "                            </div>\n" +
                "                            <div class=\"panel-body\" id=\"org\">\n" +
                "\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                    <div class=\"col-md-3\">\n" +
                "                        <div class=\"panel panel-default\">\n" +
                "                            <div class=\"panel-heading\">\n" +
                "                                <p class=\"text-danger my_text\" style=text-align:center;>公司名</p>\n" +
                "                            </div>\n" +
                "                            <div class=\"panel-body\" id=\"com\">\n" +
                "\n" +
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </div>")
            div_box_loc = $("#loc");
            div_box_per = $("#per");
            div_box_org = $("#org");
            div_box_com = $("#com");
            if (result["location"]) {
                for (var i = 0; i < result.location.length; i++) {
                    div_box_loc.append('<ul class="u">' + '<li>' + result.location[i] + '</li>' + '</ul>')
                }
            }
            if (result["person_name"]) {
                for (var i = 0; i < result.person_name.length; i++) {
                    div_box_per.append('<ul class="u">' + '<li>' + result.person_name[i] + '</li>' + '</ul>')
                }
            }
            if (result["org_name"]) {
                for (var i = 0; i < result.org_name.length; i++) {
                    div_box_org.append('<ul class="u">' + '<li>' + result.org_name[i] + '</li>' + '</ul>')
                }
            }
            if (result["company_name"]) {
                for (var i = 0; i < result.company_name.length; i++) {
                    div_box_com.append('<ul class="u">' + '<li>' + result.company_name[i] + '</li>' + '</ul>')
                }
            }
            load.stop();
        }
    })
}