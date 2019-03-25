import datetime
import hashlib
import hmac
import base64
import requests
import cachees
from read_yaml import getName
from collections import Counter


def getSimpleSign(Source, SecretId, SecretKey):
    dateTime = datetime.datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')  # 这里，用当前时间来生成 datetime 对象
    auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"date source\", signature=\""
    signStr = "date: " + dateTime + "\n" + "source: " + Source
    sign = hmac.new(SecretKey.encode(), signStr.encode(), hashlib.sha1).digest()
    sign = base64.b64encode(sign).decode()
    sign = auth + sign + "\""
    return sign, dateTime

def post_Ten(Source, SecretId, SecretKey,word,url):
    sign, dateTime = getSimpleSign(Source, SecretId, SecretKey)
    header = {'Authorization': sign, 'Date': dateTime, 'Source': Source}
    data = word
    result = requests.post(url, headers=header, data=data).json()
    return(result)

def change2Does(caseType_list):
    caseType = cachees.get_caseType()
    out = []
    for i in caseType_list:
        out.append(caseType[i])
    return out

def getregionBybaidu(data):
    name = getName("ner")
    address = post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word={"text":data["content"]}, url=name["url"])
    location_name = address.get("result").get("location_name")
    org_name = address.get("result").get("org_name")
    company_name = address.get("result").get("company_name")
    keyword = []
    if location_name != None:
        keyword += location_name
    if org_name != None:
        keyword += org_name
    if company_name != None:
        keyword += company_name
    code_list = []
    for i in keyword:
        code = cachees.get_citycode(i)
        if code != None:
            if code[:4] == data['in_code'][:4]:
                code_list.append(code)
    if len(code_list) != 0:
        countMap = Counter(code_list)
        out_code = list(countMap.keys())[list(countMap.values()).index(max(list(countMap.values())))]
        return out_code
    return data["in_code"]
def getregionByCity(data):
    cityCode_dict = cachees.get_cityCode_dict()
    id1 = ""
    id2 = ""
    for i in range(len(cityCode_dict)):
        if cityCode_dict[i]["value"][:2] == data["in_code"][:2]:
            id1 = i
            break
    for j in range(len(cityCode_dict[id1]["subs"])):
        if cityCode_dict[id1]["subs"][j]["value"] == data['in_code']:
            id2 = j
            break
    result = 0
    for city in cityCode_dict[id1]["subs"][id2]["subs"]:
        if city["name"] in data["content"]:
            result = city["value"]
            break
    return result



def getRegion(content):
    data = {"content": content}
    name = getName("region")
    province_code = post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word=data, url=name["url_province"])
    result = province_code["result"]
    if province_code["status"] == "1":
        if int(result[:2]) in getName("models")["model_list"]:
            data["in_code"] = result
            city_code = post_Ten(name["Source"], name["SecretId"], name["SecretKey"], word=data, url=name["url_city"])
            if city_code["status"] == "1":
                data["in_code"] = city_code["result"]
                result = getregionByCity(data)
                if result == 0:
                    code = getregionBybaidu(data)
                    if code != 0:
                        result = code
    return result