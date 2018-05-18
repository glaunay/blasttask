#!/usr/bin/env python

# -*-coding:Utf-8 -*-

#this script parse a XML file in a JSON format

import sys
import json
import xmltodict

#open the file to parse
inputFile = sys.argv[1]
with open(inputFile, 'r') as f:
    xmlString = f.read()

#module xmltodict
jsonString = json.dumps(xmltodict.parse(xmlString), indent=4)
#json string in a dictionary
data_dict = json.loads(jsonString)
hitList=[]


#create original json file
with open("jsonOriginal.json", 'w') as f:
	json.dump(data_dict,f)

#search last iteration on the XML file
if isinstance(data_dict['BlastOutput']['BlastOutput_iterations']['Iteration'],list):
	#recuperer derniere iteration avec -1 du tableau
	maxIteration = len(data_dict['BlastOutput']['BlastOutput_iterations']['Iteration'])
	lastIteration = data_dict['BlastOutput']['BlastOutput_iterations']['Iteration'][maxIteration-1]
else:
	lastIteration = data_dict['BlastOutput']['BlastOutput_iterations']['Iteration']

#run loop on all the hit of last iteration
for hit in lastIteration['Iteration_hits']['Hit']:
	if isinstance(hit['Hit_hsps']['Hsp'],list): #if there are more than 1 Hsp
		hit['first_hsp']= hit['Hit_hsps']['Hsp'][0] #take the first 
		del hit['Hit_hsps']#remove the others
	else:
		hit['first_hsp']= hit['Hit_hsps']['Hsp'] 
		del hit['Hit_hsps']
#save the hits of the last iteration in var
hitList=lastIteration['Iteration_hits']['Hit']

#remove all the iterations
del data_dict['BlastOutput']['BlastOutput_iterations']
#paste the last iteration
data_dict["BlastOutput"]["Hits"]=hitList

#print without unicode
json.dump(data_dict, sys.stdout)


#create final json file
with open("outputBlast.json", 'w') as f:
    json.dump(data_dict,f)

