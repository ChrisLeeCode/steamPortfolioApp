# https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name=Glove%20Case%20Key
import requests 
import json
  
# api-endpoint 
URL = "https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name=Glove%20Case%20Key"

  
# defining a params dict for the parameters to be sent to the API 
COOKIES = {'steamLoginSecure':	'76561198058337304%7C%7C248B01D654E9B3C99C488AB00E327AC7DEEF4DDE',
'steamRememberLogin':	'76561198058337304%7C%7Cab65ab2d5b12234b7213d99ab0e9a318'} 
  
# sending get request and saving the response as response object 
r = requests.get(url = URL, cookies = COOKIES) 
  
# extracting data in json format 
data = r.json()['prices']

print(data)

def get_daily_avg(data_items):
    avgs = []
    obj_stack = []
    prev_obj = ['Aug 30 2020 20: +0', 1, '1']
    total_price = 0
    total_volume = 0
    count = 0
    for obj in data_items:
        print(obj)
        if obj[0].split()[:3] == prev_obj[0].split()[:3]:
            total_price += obj[1]
            total_volume += int(obj[2])
            count += 1
        else:
            print("else")
            
            print("tp", total_price, "ct", count)
            avg_price = total_price / count
            avg_volume = total_volume / count

            total_price = obj[1]
            total_volume = obj[2]
            count = 1
            avgs.append([prev_obj[0].split()[:3], avg_price, avg_volume])

        prev_obj = obj
    return avgs
        
data_avgs = get_daily_avg(data)
for avg in data_avgs:
    print(avg)






# with open('key_data.json', 'w') as outfile:
#     json.dump(data, outfile)