from zeep import Client

class Ley103Data:
    host = 'http://67.203.240.172/L103WS.asmx?WSDL'

    def __init__(self, year, month=None):
        self.year = year
        self.month = month

        self.dataResult = []
        self.fileString = ''

    '''Factory that creates an object of this class filled with the data received from the SOAP'''
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

    '''Read the data in the SOAP and prepare for displaying in the HTML. Create the string variable
    that will be used for creating the file'''
    def saveData(self, result):
        for data in result._value_1._value_1:
            for key, value in data.items():
                dataDict = {
                    'NU_ENTIDAD': str(value.NU_ENTIDAD),
                    'RG_TRANS': str(value.RG_TRANS),
                    'RG_COL': str(value.RG_COL),
                    'RG_ROW': str(value.RG_ROW),
                    'RG_VALUE': str(value.RG_VALUE),
                    'CYYYYMM': str(value.CYYYYMM),
                    'TRANS_FILETYPE': str(value.TRANS_FILETYPE)
                }
                self.dataResult.append(dataDict)

    '''Write data as string to later write in file'''
    def getTextFileData(self):
        fileDelimiter = "\t"
        self.getFileData(fileDelimiter)

    def getCSVFileData(self):
        fileDelimiter = ","
        self.getFileData(fileDelimiter)

    def getFileData(self, delimiter):
        """Headers"""
        self.fileString += delimiter.join(['NU_ENTIDAD', 'RG_TRANS', 'RG_COL', 'RG_ROW', 'RG_VALUE', 'CYYYYMM', 'TRANS_FILETYPE'])
        self.fileString += "\n"
        for data in self.dataResult:
            self.fileString += delimiter.join(data.values())
            self.fileString += "\n"

    def getFileString(self):
        return self.fileString

    def getData(self):
        return self.dataResult
