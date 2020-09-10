import json


with open('key_data.json') as json_file:
    data = json.load(json_file)


def get_date(obj):
    date = obj[0].split()[:3]
    date = ('-').join(date)
    return date

def get_avgs(data):
    total_price = 0
    total_volume = 0
    count = 0

    avgs = []
    for i in range(len(data)-1):
        obj = data[i]
        total_price += obj[1]
        total_volume += int(obj[2])
        count += 1

        if get_date(obj) != get_date(data[i+1]):
            avg_price = total_price / count
            avg_volume = total_volume / count

            avgs.append([get_date(obj), avg_price, avg_volume])
            print([get_date(obj), avg_price, avg_volume])
            total_price = 0
            total_volume = 0
            count = 0
    return avgs


avgs = get_avgs(data)

with open('avg_data.json', 'w') as outfile:
    json.dump(avgs, outfile)