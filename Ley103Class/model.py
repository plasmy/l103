from zeep import Client

class Ley103Data:
    host = 'http://67.203.240.172/L103WS.asmx?WSDL'

    def __init__(self, year, month=None):
        self.year = year
        self.month = month

        self.dataResult = []

    @staticmethod
    def ley103DataFactory(year, month=None):
        ley103DataObject = Ley103Data(year, month)
        if month:
            ley103DataObject.getDataByYearAndMonth()
            return ley103DataObject
        ley103DataObject.getDataByYear()
        return ley103DataObject

    def getDataByYear(self):
        client = Client(self.host)
        result = client.service.DatosLey103(self.year)
        self.saveData(result)

    def getDataByYearAndMonth(self):
        client = Client(self.host)
        result = client.service.DatosLey103Mes(self.year, self.month)
        self.saveData(result)

    def saveData(self, result):
        for data in result._value_1._value_1:
            for key, value in data.items():
                dataDict = {
                    'NU_ENTIDAD': value.NU_ENTIDAD,
                    'RG_TRANS': value.RG_TRANS,
                    'RG_COL': value.RG_ROW,
                    'RG_VALUE': str(value.RG_VALUE),
                    'CYYYYMM': value.CYYYYMM,
                    'TRANS_FILETYPE': value.TRANS_FILETYPE
                }
                self.dataResult.append(dataDict)
