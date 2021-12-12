import pymysql

# for connect db

class Database() :
    def __init__(self):
        self.db = pymysql.connect(
            user='hjo',
            passwd='network2020',
            host='203.234.19.79',
            port=2804,
            db='Monitoring',
            charset='utf8'
        )
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def execute(self, query, args={}):
        self.cursor.execute(query, args)

    # 하나만 execute
    def executeOne(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()

        data = row[-1]
        print("디비모듈", type(data))

        return data
    # 모든 데이터 execute
    def executeAll(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()

        return row

