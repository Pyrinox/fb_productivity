from urllib.request import urlopen
import json
import datetime
import csv
import time
import pandas as pd



# input group name
# input access_token

# group_name is the name of the group as it appears in the url
# access_token can be attained from Graph API Explorer
def getGroupID(group_name, access_token):
    base = "https://graph.facebook.com/v2.12"
    group_query = "/search?q=%s&type=group" % group_name
    token = "&access_token=%s" % access_token
    url = base + group_query + token
    response = urlopen(url)
#     data = json.loads(resp)
#     return type(response.read())
    data = json.loads(response.read())
    return data["data"][0]["id"]


def getPostIDs(group_id):
    base = "https://graph.facebook.com/v2.12/" + group_id
    group_query = "/feed?fields=name"
    token = "&access_token=%s" % access_token
    url = base + group_query + token
    response = urlopen(url)
    data = json.loads(response.read())
    list_of_dicts = data["data"]
    list_of_group_post_ids = [each["id"] for each in list_of_dicts]
    post_order_dict = {}
    iter_range = len(list_of_group_post_ids)
    for i in range(iter_range):
        back = list_of_group_post_ids.pop()
        post_order_dict[i+1] = back
    return post_order_dict
#     return data["data"]


# string_identifier is a sample string from the post you're looking for.
# use only words (avoid emojis or other ill-formed units of meaning)
string_identifier = """
Looking forwards to the upcoming practice! We have a lotta announcements for y'all, and have summarized them here (we will also email a more in-depth version of announcements for your convenience). Respond to the fun prompt at the end of the post! We highly value team engagement :)
"""

def findCorrectPost(group_id, string_identifier):
    base = "https://graph.facebook.com/v2.12/" + group_id
    group_query = "/feed?fields=name,message,comments"
    token = "&access_token=%s" % access_token
    url = base + group_query + token
#     print(url)
    response = urlopen(url)
    data = json.loads(response.read())
    correct_post = None
    for post in data["data"]:
#         print(type(list(post.keys())))
        if "message" not in list(post.keys()):
            continue
        check = post["message"]
        identical = False
        for word in string_identifier.split():
            if word not in check:
                break
            identical = True
        if identical:
            print(post["id"])
            correct_post = post
            break
#             print(word)
    
    return correct_post


def getListOfComments(correct_post):
    
    # TRY BLOCK 1
    comments = []
    data = []
    # Method 1A: getting comments on current page
    try:
#         print("try1")
        data = correct_post["comments"]["data"]
        for comment in data:
            comments.append(comment)
#         print("hsdf", next_page_responders)
    except:
        pass
    
    # Method 2A: getting comments on current page
    try:
        data = correct_post["data"]
        for comment in data:
            comments.append(comment)
    except:
        pass
    
    # TRY BLOCK 2
    url = None
    # Method 1B: accessing the next page of responses
    try:
        url = correct_post["comments"]["paging"]["next"]
    except:
        pass
        
    try:
    # Method 2B: accessing the next page of responses
        url = correct_post["paging"]["next"]
    except:
        pass
    
    # Open the url (found by Method 1B/2B) if it exists.
    next_page_responders = []
    if url:
        response = urlopen(url)
        next_page = json.loads(response.read())
        next_page_responders = getListOfComments(next_page)
        comments.extend(next_page_responders)

    return comments



def getNamesFromListOfComments(list_of_comments):
    responders = []
    for comment in list_of_comments:
        responders.append(comment["from"]["name"])
    return responders    


def getListOfResponders(correct_post):
    responders = []
    for comment in correct_post["comments"]["data"]:
        responders.append(comment["from"]["name"])
    return responders




def main():
	group_name = "afxlowkey"
	access_token = "EAALJfWzkKZAgBACDGJ7SWpGS6nbJB8XnpK2M2otvKw27OjMwhaEvVJeh1JjHCEbkqDbzEOIrCDIFhE7BOvxYBQGYdDDXHEN9Anu8gTKw7lYKMy9HsMga7OqzScZBPYreqLTmVPJTHDiWnvfxlCmC17HZCBZBUdIMzIMrtwmRoQZDZD"
	group_id = getGroupID(group_name, access_token)
	print(group_id)
	


if __name__ == "__main__":
	main()








# group_id = getGroupID(group_name, access_token)
# group_id

# correct_post = findCorrectPost(group_id, string_identifier)
# correct_post

# list_of_comments = getListOfComments(correct_post)
# list_of_comments    




