import logging.handlers

from flask import Flask, request, jsonify, render_template

import method
from read_yaml import *
import cachees
import json

app = Flask(__name__)
handler = logging.handlers.TimedRotatingFileHandler(filename='app.log', when='midnight', backupCount=30,
                                                    encoding='utf8')
handler.setFormatter(logging.Formatter('[%(asctime)s] [%(levelname)s] %(message)s'))
app.logger.addHandler(handler)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/jc_ner', methods=['POST'])
def jc_ner_index():
    word = request.form['content']
    data = {"text": word}
    name = getName("ner")
    code = method.post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word=data, url=name["url"])
    if code["status"] == "1":
        app.logger.info("命名实体调用成功" + str(code))
    else:
        app.logger.info("命名实体调用失败" + str(code))
    return jsonify(code)


@app.route('/sentiment', methods=['POST'])
def sentiment_index():
    word = request.form['pos_neg_text']
    data = {"content": word}
    name = getName("sentiment")
    neg = method.post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word=data, url=name["url"])
    if neg["status"] == "1":
        neg["result"] = [round(neg["result"], 4), round(1 - neg["result"], 4)]
        app.logger.info("感情分析调用成功" + str(neg))
    else:
        app.logger.info("感情分析调用失败" + str(neg))
    return jsonify(neg)


@app.route('/caseType', methods=['POST'])
def caseType_index():
    word = request.form['content']
    data = {"content": word, "topn": 5}
    name = getName("caseType")
    caseType = method.post_Ten(name["Source"], name["SecretId"], name["SecretKey"], data, name["url"])
    if caseType["status"] == "1":
        caseType = caseType["top"]
        app.logger.info("案件类型调用成功" + str(caseType))
        caseType["tops"] = method.change2Does(caseType["tops"])
    else:
        app.logger.info("案件类型调用失败" + str(caseType))
    return jsonify(caseType)


@app.route('/recommendedindustries', methods=['POST'])
def jc_recommendedindustries():
    word = request.form['content']
    data = {"content": word}
    name = getName("recommendedindustries")
    code = method.post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word=data, url=name["url"])
    if code["status"] == "1":
        app.logger.info("执法主体类型调用成功" + str(code))
    else:
        app.logger.info("执法主体类型调用失败" + str(code))
    return jsonify(code)


@app.route('/region', methods=['POST'])
def region_index():
    word = request.form['content']
    code = method.getRegion(word)
    if code != "":
        app.logger.info("行政区划调用成功" + str(code))
        result = cachees.get_xy(code)
    else:
        app.logger.info("行政区划调用失败" + str(code))
        result = {}
    return jsonify(result)


@app.route('/getdata', methods=['GET'])
def getdata_index():
    data_file = open('eg_text.json', "r", encoding="utf-8")
    data = json.load(data_file)
    return jsonify(data)


app.run(host='0.0.0.0', port=5001, debug=True, use_reloader=False, threaded=True)
