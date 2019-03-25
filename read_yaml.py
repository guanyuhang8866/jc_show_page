import yaml
global name
with open("config.yml", "r", encoding="utf-8") as f:
    name = yaml.load(f.read())

def re_yaml():
    return name

def getName(key):
    for i in range(len(name)):
        if name[i]["name"] == key:
            break
    return name[i]