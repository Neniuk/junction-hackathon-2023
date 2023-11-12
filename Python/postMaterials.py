import requests
import json

def postMaterials(data, url):
    body = json.dumps(data)
    headers = {'Content-Type': 'application/json'}
    req = requests.post(url, headers=headers, data=body)

    print(req.json())
