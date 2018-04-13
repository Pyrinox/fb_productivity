import urllib.request as urllib2
import csv
from bs4 import BeautifulSoup
from datetime import datetime

"""
Grabs data from the URL then writes to index.csv.
"""
def main():
	user_access_token = 'EAANl3Q6i6sQBAIOwgfIkRdaGqqs6Tzc8pYFe4JpAr7MSs3mYeqR4YLZCXZBlXX7Bej8Yzxp63J4BeRApzPjAfmhNJfOnZCGge68Ogm47JZCTAp25iUYzZAZBXibZClA0cJllL0YZB8vHjLETz4ZCGkdVvwiZCyGDf9PWVMW94W4Adl2JiLRFxaR0E3pJZAxz43x1rcxSX5kDIdVLwZDZD'
	login()
	base = "https://www.messenger.com/t/"
	team_id = 1838681979496137
	url = base + str(team_id)
	print(url)
	page = urllib2.urlopen(url)
	soup = BeautifulSoup(page, 'html.parser')
	attrs = {'class' : '_364g'}

	### BUG: We need to login to Facebook first. ###\
	names = soup.find_all('ul', attrs=attrs)

	print(type(names))
	print(names)

""" 
Given username and password, log in to Facebook. 

TODO: How to give username and password as inputs? To command line?

Reference: https://gist.github.com/UndergroundLabs/fad38205068ffb904685
"""
def login():
	session = requests.Session()
	response = session.get('https://www.facebook.com').text
	# What if requires 2-factor auth?
	# response = session.post('https://www.messenger.com/login.php', data={
	# 	'email': email,
	# 	'pass': password
	# }, allow_redirects=False)
	
"""
Once data is scraped, format it into a csv or excel file.

TODO

Note - the code is sort of weird rn, it's copy pasted from an
old project but will be fixed once everything else works!
"""
def parse_data(file_name, data):
	### CREATING A FILE OUT OF RESULTS ###
	# Sorry this is weird bc it's from an old project, just wanted to keep it here for when the above code works!
	# data = data.text.strip()
	# number, source, pair, volume_24h, price, volume_percent, updated = parse_data(btc_markets)
	# with open('index.csv', 'a') as csv_file:
	# 	writer = csv.writer(csv_file)
	# 	writer.writerow(['#', 'Name'])
	# 	for i in range(len(updated)):
	# 		row_data = [number[i], source[i], pair[i], volume_24h[i], price[i], volume_percent[i], updated[i]]
	# 		writer.writerow(row_data)
	return

if __name__ == "__main__":
	main()
