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




# iron Ore
file_path_Iron = 'dataIron.json'
with open(file_path_Iron, 'r') as file:
    dataIron = json.load(file)

df_Iron = pd.DataFrame(dataIron)
df_Iron['timeData'] = pd.to_datetime(df_Iron['timeData'], format='%b %Y')
df_Iron.set_index('timeData', inplace=True)
df_Iron.index.freq = 'MS'

modelIron = ARIMA(df_Iron['priceData'], order=(10, 1, 1))
resultsIron = modelIron.fit()
forecastIron = resultsIron.get_forecast(steps=12)
predicted_prices_Iron = forecastIron.predicted_mean.values

prediction_data_ironOre = {
    'material': 'Iron Ore',
    'timeData': [(df_Iron.index[-1] + pd.DateOffset(months=i + 1)).strftime('%B %Y') for i in range(12)],
    'priceData': predicted_prices_Iron.tolist()
}

# Nickel
file_path_Nickel = 'dataNickel.json'
with open(file_path_Nickel, 'r') as file:
    dataNickel = json.load(file)

df_Nickel = pd.DataFrame(dataNickel)
df_Nickel['timeData'] = pd.to_datetime(df_Nickel['timeData'], format='%b %Y')
df_Nickel.set_index('timeData', inplace=True)
df_Nickel.index.freq = 'MS'

modelNickel = ARIMA(df_Nickel['priceData'], order=(10, 1, 1))
resultsNickel = modelNickel.fit()
forecastNickel = resultsNickel.get_forecast(steps=12)
predicted_prices_Nickel = forecastNickel.predicted_mean.values

prediction_data_Nickel = {
    'material': 'Nickel',
    'timeData': [(df_Nickel.index[-1] + pd.DateOffset(months=i + 1)).strftime('%B %Y') for i in range(12)],
    'priceData': predicted_prices_Nickel.tolist()
}

# Copper
file_path_Copper = 'dataCopper.json'
with open(file_path_Copper, 'r') as file:
    dataCopper = json.load(file)

df_Copper = pd.DataFrame(dataCopper)
df_Copper['timeData'] = pd.to_datetime(df_Copper['timeData'], format='%b %Y')
df_Copper.set_index('timeData', inplace=True)
df_Copper.index.freq = 'MS'

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
    monthIron = df_Iron.index[-1] + pd.DateOffset(months=i + 1)
    monthNickel = df_Nickel.index[-1] + pd.DateOffset(months=i + 1)
    month = df_Copper.index[-1] + pd.DateOffset(months=i + 1)
    print(f'The predicted Iron Ore price for {monthIron.strftime("%B %Y")} is: {predicted_prices_Iron[i]:.2f}')
    print(f'The predicted Nickel price for {monthNickel.strftime("%B %Y")} is: {predicted_prices_Nickel[i]:.2f}')
    print(f'The predicted Copper price for {month.strftime("%B %Y")} is: {predicted_prices_Copper[i]:.2f}')
