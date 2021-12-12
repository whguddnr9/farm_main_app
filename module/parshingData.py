import json
import dbModule

def getSeries(data,option):
    sensor_type = list(data.keys())
    series = '['
    for i in range(len(sensor_type)):
        sensor  = sensor_type[i]
        series += '{"name":"Sensor ' + str(sensor) + '","data":['
        # for index, row in


def get_Data():
    db_class    = dbModule.Database()

    sql         = "select * from sensor_data_table;"
    row         = db_class.executeOne(sql)

    test_data = list(row.values())
    print("사전형 추출값_humi", test_data)

    renderTo        = ['Temperature','Humidity']
    option          = ['tmeperature','humidity']
    ttext           = ['온도','습도']
    ytext           = ['Temperature','Humidity']
    chartInfo       = []
    chart_type      = 'spline'
    chart_height    = 500
    for i in range(2):
        chart   = {"renderTo": renderTo[i], "type": chart_type, "height": chart_height}
        series  = getSeries(row,option[i])
        title   = {"text":ttext[i]}
        xAxis   = {"type":"datatime"}
        yAxis   = {"title":{"text":ytext[i]}}

        chartInfo.append([chart,series,title,xAxis,yAxis])

    return chartInfo


