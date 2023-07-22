# Copyright (c) 2023, noori and contributors
# For license information, please see license.txt

# from __future__imoprt unicode_literals
import frappe
from frappe import _


def execute(filters=None):
	return get_columns(), get_data(filters)

def get_data(filters):
	#date range
	from_date=filters.get('from_date')
	to_date=filters.get('to_date')
	##conditions in filters
	conditions="AND 1=1 "

	if(filters.get('agent_id')):
		conditions+=f" AND agent_id='{filters.get('agent_id')}'"
	if(filters.get('status')):
		conditions+=f" AND status='{filters.get('status')}'"
	if(filters.get('property_type')):
		conditions+=f" AND property_type='{filters.get('property_type')}'"
	if (filters.get('property_name')):
		conditions+=f" AND property_name LIKE'%{filters.get('property_name')}%'"

	print(f'{filters}')
	data= frappe.db.sql(f"""SELECT name, property_name,property_type,address,status,property_price,grand_total,name_of_agent,agent_id FROM `tabProperty` WHERE (creation BETWEEN '{from_date}' AND '{to_date}') {conditions};""")
	return data

def get_columns():
	return[
		"ID:Link/Property:70",
		"Property Name: Data:150",
		"Type:Data:100",
		"Address:Data:100",
		"Staus:Data:70",
		"Price:Currency:100",
		"Grand Total:Currency 150",
		"Agent Name:Data:100",
		"Agnet ID:Data:150"
	]

