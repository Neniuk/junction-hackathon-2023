import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import json
import requests
url = 'http://127.0.0.1:3000/materials'

# myobj = {
#     "material" : "",
#     "timeData" : [],
#     "priceData" : [],
# }
# body = json.dumps(myobj)
# headers = {'Content-Type': 'application/json'}
# #req = requests.post(url, headers=headers, data=body, verify=False)
#
# if req.status_code == 200:
#     # Print the response JSON after the request is complete
#     print(req.json())
# else:
#     print(f"Request failed with status code {req.status_code}")

dataIron = {
    'timeData': [
        'Oct 2013', 'Nov 2013', 'Dec 2013', 'Jan 2014', 'Feb 2014', 'Mar 2014', 'Apr 2014', 'May 2014', 'Jun 2014',
        'Jul 2014', 'Aug 2014', 'Sep 2014',
        'Oct 2014', 'Nov 2014', 'Dec 2014', 'Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015',
        'Jul 2015', 'Aug 2015', 'Sep 2015',
        'Oct 2015', 'Nov 2015', 'Dec 2015', 'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016',
        'Jul 2016', 'Aug 2016', 'Sep 2016',
        'Oct 2016', 'Nov 2016', 'Dec 2016', 'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017',
        'Jul 2017', 'Aug 2017', 'Sep 2017',
        'Oct 2017', 'Nov 2017', 'Dec 2017', 'Jan 2018', 'Feb 2018', 'Mar 2018', 'Apr 2018', 'May 2018', 'Jun 2018',
        'Jul 2018', 'Aug 2018', 'Sep 2018',
        'Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019', 'Jun 2019',
        'Jul 2019', 'Aug 2019', 'Sep 2019',
        'Oct 2019', 'Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020',
        'Jul 2020', 'Aug 2020', 'Sep 2020',
        'Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021', 'May 2021', 'Jun 2021',
        'Jul 2021', 'Aug 2021', 'Sep 2021',
        'Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022',
        'Jul 2022', 'Aug 2022', 'Sep 2022',
        'Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
        'Jul 2023', 'Aug 2023', 'Sep 2023'
    ],
    'priceData': [
        132.57, 136.32, 135.79, 128.12, 121.37, 111.83, 114.58, 100.56, 92.74,
        96.05, 92.61, 82.38, 81.06, 73.73, 68.39, 68.23, 62.75, 58.05, 52.28,
        60.3, 62.63, 52.39, 56.19, 56.95, 53.12, 46.86, 40.5, 41.88, 46.83,
        56.2, 60.92, 55.13, 51.98, 57.26, 60.89, 57.79, 59.09, 73.1, 80.02,
        80.41, 89.44, 87.65, 70.22, 62.43, 57.48, 67.74, 76.07, 71.53, 61.66,
        64.24, 72.25, 76.34, 77.46, 70.35, 65.75, 66.1, 65.04, 64.56, 67.15, 68.44,
        73.41, 73.26, 69.16, 76.16, 88.22, 86.47, 93.7, 100.15, 108.94, 120.24, 93.07,
        93.08, 88.53, 84.98, 92.65, 95.76, 87.68, 88.99, 84.73, 93.65, 103.3, 108.52,
        121.07, 123.75, 119.78, 124.36, 155.43, 169.63, 163.8, 168.18, 179.83, 207.72,
        214.43, 214.14, 162.16, 124.52, 122.91, 96.24, 116.96, 132.53, 142.84, 152.07,
        151.25, 131.21, 130.74, 108.57, 108.85, 99.81, 92.56, 93.34, 111.84, 122.23,
        127.6, 128.37, 117.39, 105.15, 113.45, 114.43, 110.2, 120.98
    ]
}

dataNickel = {

    'timeData': [
        'Oct 2013', 'Nov 2013', 'Dec 2013', 'Jan 2014', 'Feb 2014', 'Mar 2014', 'Apr 2014', 'May 2014', 'Jun 2014',
        'Jul 2014', 'Aug 2014', 'Sep 2014',
        'Oct 2014', 'Nov 2014', 'Dec 2014', 'Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015',
        'Jul 2015', 'Aug 2015', 'Sep 2015',
        'Oct 2015', 'Nov 2015', 'Dec 2015', 'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016',
        'Jul 2016', 'Aug 2016', 'Sep 2016',
        'Oct 2016', 'Nov 2016', 'Dec 2016', 'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017',
        'Jul 2017', 'Aug 2017', 'Sep 2017',
        'Oct 2017', 'Nov 2017', 'Dec 2017', 'Jan 2018', 'Feb 2018', 'Mar 2018', 'Apr 2018', 'May 2018', 'Jun 2018',
        'Jul 2018', 'Aug 2018', 'Sep 2018',
        'Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019', 'Jun 2019',
        'Jul 2019', 'Aug 2019', 'Sep 2019',
        'Oct 2019', 'Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020',
        'Jul 2020', 'Aug 2020', 'Sep 2020',
        'Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021', 'May 2021', 'Jun 2021',
        'Jul 2021', 'Aug 2021', 'Sep 2021',
        'Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022',
        'Jul 2022', 'Aug 2022', 'Sep 2022',
        'Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
        'Jul 2023', 'Aug 2023', 'Sep 2023'
    ],


    'priceData' : [14117.65, 13684.01, 13924.55, 14101.25, 14203.55, 15678.10, 17373.60, 19401.08, 18628.81, 19117.65,
                   18600.20, 18034.80, 15812.37, 15807.05, 15962.05, 14849.19, 14573.84, 13755.50, 12830.92, 13511.34, 12825.23,
                   11413.10, 10386.00, 9937.55, 10316.83, 9244.33, 8707.79, 8507.29, 8298.50, 8717.25, 8878.86, 8660.35, 8928.35,
                   10262.86, 10335.99, 10191.78, 10259.74, 11128.91, 10972.27, 9971.46, 10643.30, 10204.66, 9609.28, 9155.12, 8931.76,
                   9491.39, 10889.98, 11215.79, 11335.77, 11972.00, 11495.11, 12864.88, 13595.88, 13392.50, 13938.10, 14366.49, 15105.65,
                   13793.86, 13411.35, 12510.35, 12314.91, 11239.72, 10835.08, 11523.09, 12685.23, 13026.27, 12772.79, 12016.31, 11943.94,
                   13546.30, 15748.64, 17656.88, 17046.22, 15171.81, 13829.42, 13506.86, 12715.55, 11846.23, 11804.01, 12179.61, 12727.15, 13402.30,
                   14537.75, 14857.49, 15239.36, 15807.73, 16823.04, 17863.18, 18584.38, 16406.66, 16521.25, 17577.06, 17979.57, 18818.51, 19141.30,
                   19376.88, 19362.39, 19932.86, 20015.55, 22355.40, 24015.55, 33924.18, 33132.74, 28062.55, 25658.63, 21481.89, 22057.39, 22773.97,
                   22032.89, 25562.70, 28946.81, 28194.61, 26727.95, 23288.61, 23894.56, 21970.39, 21233.28, 21091.26, 20438.65, 19644.64
]

}

dataCopper = {
    'priceData' : [7203.02, 7070.65, 7214.90, 7291.47, 7149.21, 6650.04, 6673.56, 6891.13, 6821.14, 7113.38, 7001.84,
                   6872.22, 6737.48, 6712.85, 6446.45, 5830.54, 5729.27, 5939.67, 6042.09, 6294.78, 5833.01, 5456.75,
                   5127.30, 5217.25, 5216.09, 4799.90, 4638.83, 4471.79, 4598.62, 4953.80, 4872.74, 4694.54, 4641.97,
                   4864.90, 4751.67, 4722.20, 4731.26, 5450.93, 5660.35, 5754.56, 5940.91, 5824.63, 5683.90, 5599.56,
                   5719.76, 5985.12, 6485.63, 6577.17, 6807.60, 6826.55, 6833.89, 7065.85, 7006.52, 6799.18, 6851.51,
                   6825.27, 6965.86, 6250.75, 6051.05, 6050.76, 6219.59, 6195.92, 6075.32, 5939.10, 6300.49, 6439.46,
                   6438.36, 6017.90, 5882.23, 5941.20, 5709.44, 5759.25, 5757.30, 5859.95, 6077.06, 6031.21, 5687.75,
                   5182.63, 5057.97, 5239.83, 5754.60, 6372.46, 6498.94, 6704.90, 6713.81, 7068.91, 7772.24, 7972.15,
                   8470.94, 8988.25, 9324.82, 10161.97, 9631.50, 9450.82, 9370.14, 9324.71, 9829.22, 9728.90, 9551.18,
                   9782.34, 9943.17, 10230.89, 10161.38, 9377.15, 9024.46, 7544.81, 7981.84, 7746.01, 7651.08, 8049.86,
                   8375.40, 9037.95, 8936.59, 8856.31, 8809.42, 8217.47, 8396.52, 8476.68, 8349.13, 8276.71
],

     'timeData': [
        'Oct 2013', 'Nov 2013', 'Dec 2013', 'Jan 2014', 'Feb 2014', 'Mar 2014', 'Apr 2014', 'May 2014', 'Jun 2014',
        'Jul 2014', 'Aug 2014', 'Sep 2014',
        'Oct 2014', 'Nov 2014', 'Dec 2014', 'Jan 2015', 'Feb 2015', 'Mar 2015', 'Apr 2015', 'May 2015', 'Jun 2015',
        'Jul 2015', 'Aug 2015', 'Sep 2015',
        'Oct 2015', 'Nov 2015', 'Dec 2015', 'Jan 2016', 'Feb 2016', 'Mar 2016', 'Apr 2016', 'May 2016', 'Jun 2016',
        'Jul 2016', 'Aug 2016', 'Sep 2016',
        'Oct 2016', 'Nov 2016', 'Dec 2016', 'Jan 2017', 'Feb 2017', 'Mar 2017', 'Apr 2017', 'May 2017', 'Jun 2017',
        'Jul 2017', 'Aug 2017', 'Sep 2017',
        'Oct 2017', 'Nov 2017', 'Dec 2017', 'Jan 2018', 'Feb 2018', 'Mar 2018', 'Apr 2018', 'May 2018', 'Jun 2018',
        'Jul 2018', 'Aug 2018', 'Sep 2018',
        'Oct 2018', 'Nov 2018', 'Dec 2018', 'Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019', 'May 2019', 'Jun 2019',
        'Jul 2019', 'Aug 2019', 'Sep 2019',
        'Oct 2019', 'Nov 2019', 'Dec 2019', 'Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020',
        'Jul 2020', 'Aug 2020', 'Sep 2020',
        'Oct 2020', 'Nov 2020', 'Dec 2020', 'Jan 2021', 'Feb 2021', 'Mar 2021', 'Apr 2021', 'May 2021', 'Jun 2021',
        'Jul 2021', 'Aug 2021', 'Sep 2021',
        'Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022',
        'Jul 2022', 'Aug 2022', 'Sep 2022',
        'Oct 2022', 'Nov 2022', 'Dec 2022', 'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
        'Jul 2023', 'Aug 2023', 'Sep 2023'
    ],
}



df_Iron = pd.DataFrame(dataIron)
df_Iron['timeData'] = pd.to_datetime(df_Iron['timeData'], format='%b %Y')
df_Iron.set_index('timeData', inplace=True)
df_Iron.index.freq = 'MS'

df_Nickel = pd.DataFrame(dataNickel)
df_Nickel['timeData'] = pd.to_datetime(df_Nickel['timeData'], format='%b %Y')
df_Nickel.set_index('timeData', inplace=True)
df_Nickel.index.freq = 'MS'

df_Copper = pd.DataFrame(dataCopper)
df_Copper['timeData'] = pd.to_datetime(df_Copper['timeData'], format='%b %Y')
df_Copper.set_index('timeData', inplace=True)
df_Copper.index.freq = 'MS'



# iron Ore
modelIron = ARIMA(df_Iron['priceData'], order=(10, 1, 1))
resultsIron = modelIron.fit()
forecastIron = resultsIron.get_forecast(steps=12)
predicted_prices_Iron = forecastIron.predicted_mean.values

prediction_data_ironOre = {
    'material': 'Iron Ore',
    'timeData': [(df_Iron.index[-1] + pd.DateOffset(months=i + 1)).strftime('%B %Y') for i in range(12)],
    'priceData': predicted_prices_Iron.tolist()
}

for i in range(12):
    monthIron = df_Iron.index[-1] + pd.DateOffset(months=i + 1)
    print(f'The predicted Iron Ore price for {monthIron.strftime("%B %Y")} is: {predicted_prices_Iron[i]:.2f}')


# Nickel
modelNickel = ARIMA(df_Nickel['priceData'], order=(10, 1, 1))
resultsNickel = modelNickel.fit()
forecastNickel = resultsNickel.get_forecast(steps=12)
predicted_prices_Nickel = forecastNickel.predicted_mean.values

prediction_data_Nickel = {
    'material': 'Nickel',
    'timeData': [(df_Nickel.index[-1] + pd.DateOffset(months=i + 1)).strftime('%B %Y') for i in range(12)],
    'priceData': predicted_prices_Nickel.tolist()
}


print(prediction_data_Nickel)
for i in range(12):
    monthNickel = df_Nickel.index[-1] + pd.DateOffset(months=i + 1)
    print(f'The predicted Nickel price for {monthNickel.strftime("%B %Y")} is: {predicted_prices_Nickel[i]:.2f}')

# iron Ore
modelCopper = ARIMA(df_Copper['priceData'], order=(10, 1, 1))
resultsCopper = modelCopper.fit()
forecastCopper = resultsCopper.get_forecast(steps=12)
predicted_prices_Copper = forecastCopper.predicted_mean.values

prediction_data_Copper = {
    'material': 'Copper',
    'timeData': [(df_Copper.index[-1] + pd.DateOffset(months=i + 1)).strftime('%B %Y') for i in range(12)],
    'priceData': predicted_prices_Copper.tolist()
}

for i in range(12):
    month = df_Copper.index[-1] + pd.DateOffset(months=i + 1)
    print(f'The predicted Copper price for {month.strftime("%B %Y")} is: {predicted_prices_Copper[i]:.2f}')
