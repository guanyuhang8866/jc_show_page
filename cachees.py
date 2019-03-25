from cacheout import Cache
import requests
from read_yaml import *

cache_Casetype = Cache()
def get_caseType():
    lll = cache_Casetype.get("caseType")
    if lll == None:
        print ("新建缓存")
        dict = requests.get(getName("caseType_dict")["url"]).json()
        cases = {}
        for i in dict['resultMessage']:
            cases[i["caseType"]] = i["caseTypeDesc"]
        cases["caseType0701"] = "非公益诉讼"
        cache_Casetype.set("caseType", value=cases, ttl=60 * 60 * 7 * 24)
        lll = cases
    return lll

def get_xy(code):
    lll = cache_Casetype.get(code)
    if lll == None:
        print("新建缓存")
        address = requests.get(getName("code_to_does")["url"] + str(code)).json()
        address = address.get("result")
        baidu = requests.get(getName("baidu")["url"] + "address=" + address).json()
        xy = [baidu["result"]["location"]["lng"],baidu["result"]["location"]["lat"]]
        result = {"code":code,"address":address,"xy":xy}
        cache_Casetype.set(code, value=result, ttl=0)
        lll = result
    return lll

def get_citycode(address):
    lll = cache_Casetype.get(address)
    if lll == None:
        print("新建缓存")
        name = getName("baidu")
        xy = requests.get(name["url"] + "address=" + address).json()
        if xy['status'] == 0:
            code = requests.get(name["url"] + "location=" + str(xy['result']["location"]["lat"]) + "," + str(xy['result']["location"]["lng"])).json()
            if code['status'] == 0:
                code = code['result']['addressComponent']['adcode']
                cache_Casetype.set(address, value=code, ttl=0)
                lll = code
    return lll
def get_cityCode_dict():
    lll = cache_Casetype.get("cityCode_dict")
    if lll == None:
        print("新建缓存")
        dict = requests.get(getName("cityCode_dict")["url"]).json()
        cache_Casetype.set("cityCode_dict", value=dict, ttl=60 * 60 * 7 * 24)
        lll = dict
    return lll