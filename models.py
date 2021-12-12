import pymysql

# for connect db
db = pymysql.connect(
    user    = 'root',
    passwd  = 'network2020',
    host    = '203.234.19.79',
    port    = 25000,
    db      = 'test_sensor',
    charset = 'utf8'
)

curs = db.cursor()


#모든 데이터 select
def select_Data():
    sql = '''select * from sensor_data_table;'''

    curs.execute(sql)

    rows = curs.fetchall()

    return rows


def select_Temp():
    temp_sql = '''select datetime, temperature from sensor_data_table;'''

    curs.execute(temp_sql)

    temp_rows = curs.fetchall()

    return temp_rows

def select_Temp_time():
    temp_sql = '''select meta_time, temperature from sensor_data_table;'''

    curs.execute(temp_sql)

    temp_rows = curs.fetchall()
    send_data = temp_rows[-1]

    return send_data


def select_one_Temp():
    temp_sql = '''select meta_time, temperature from sensor_data_table ORDER BY meta_time DESC LIMIT 1;'''

    curs.execute(temp_sql)

    temp_rows = curs.fetchall()

    return temp_rows
