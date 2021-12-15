import json
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import models
from module import dbModule



def get_data():
    datas = models.select_Data()

    return datas


# Get temp from DB
def get_Temp():
    temp = models.select_Temp()
    return temp


def get_One_Temp():
    temp = models.select_one_Temp()
    return temp


def get_Temp_time():
    temp = models.select_Temp_time()
    return temp


# 하나의 센서 데이터 만
def send_Temp_json():
    temp = get_Temp()

    # sens_time = temp['dataTime']
    # sens_data = temp['temperature']
    temp_json = json.dumps(temp)
    print("sendData", temp_json)
    return temp_json


# 하나의 센서 하나의 값
def send_one_json():
    temp = get_One_Temp()

    temp_json = json.dumps(temp)
    print("sendData", temp_json)
    return temp_json


# 테스트
def send_one_time():
    temp = get_Temp_time()

    temp_json = json.dumps(temp)
    print("send_one_time Data", temp_json)

    return temp_json

### module 안에 있는 dbModule 이용해 전송 리스트 형식으로 변경해서 json 형식으로 포멧
def send_temp():
    db_class    = dbModule.Database()

    sql         = "select meta_time, temperature from sensor_data_table;"
    row         = db_class.executeOne(sql)

    test_data = list(row.values())
    print("사전형 추출값_temp", test_data)

    test_json = json.dumps(test_data)

    print("send_temp Data:",test_json)

    return test_json

####
def send_humi():
    db_class    = dbModule.Database()

    sql         = "select meta_time, humidity from sensor_data_table;"
    row         = db_class.executeOne(sql)

    test_data = list(row.values())
    print("사전형 추출값_humi", test_data)

    test_json = json.dumps(test_data)

    print("send_humi Data:",test_json)

    return test_json


### Test send Json not listing task
def send_state_one1_1():

    db_class    = dbModule.Database()

    sql         = "select temp,humi,soil_humi from dataTable_1_1;"
    row         = db_class.executeOne(sql)

    test_json = json.dumps(row)

    print("send_temp Data11:",row)

    return row

### Test send Json not listing task
def send_state_one1_2():

    db_class    = dbModule.Database()

    sql         = "select temp,humi,soil_humi from dataTable_1_2;"
    row         = db_class.executeOne(sql)

    test_json = json.dumps(row)

    print("send_temp Data12:",row)

    return row

### Test send Json All DB data
def send_all_test():

    db_class    = dbModule.Database()

    sql         = "select dateTime, temperature, humidity, soil_humidity from sensor_data_table ORDER BY meta_time DESC;"
    row         = db_class.executeAll(sql)

    test_json = json.dumps(row)

    # print("send_temp Data:",test_json)
    # print("send_all_test 실행 됨")
    return test_json

### Test send Json 5 DB data
def send_5_test():

    db_class    = dbModule.Database()

    sql         = "select dateTime, temperature, humidity, soil_humidity from sensor_data_table ORDER BY meta_time DESC LIMIT 5;"
    row         = db_class.executeAll(sql)

    test_json = json.dumps(row)

    print("send_temp Data:",test_json)
    # print("send_all_test 실행 됨")
    return test_json

####

def show_table():

    db_class    = dbModule.Database()

    sql         = "show tables;"
    row         = db_class.executeOne()

    print(row)

#
# test =send_state_one()
# print("print send one time", test)
# temp_test = send_one_time()
# print("print send one time", temp_test)

# test = send_all_test()
# print("print send one time", test)

# show_table()

