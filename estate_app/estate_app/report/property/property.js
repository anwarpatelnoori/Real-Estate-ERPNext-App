// Copyright (c) 2023, noori and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Property"] = {
	"filters": [
		{
			'fieldname': 'property_name',
			'label':('Property Name'),
			'fieldtype': 'Data',
			'width': 100,
			'reqd': 0
		},
		{
			'fieldname': 'from_date',
			'label':('From Date'),
			'fieldtype': 'Date',
			'width': 80,
			'reqd':1,
			'default':dateutil.year_start()
		},
		{
			'fieldname': 'to_date',
			'label':('To Date'),
			'fieldtype': 'Date',
			'width': 80,
			'reqd':1,
			'default':dateutil.year_end()
		},
		{
			'fieldname': 'agent_id',
			'label':('Agent ID'),
			'fieldtype': 'Link',
			'width': 100,
			'reqd':0,
			'options': 'Agent'
		},
		{
			'fieldname': 'status',
			'label':('Status'),
			'fieldtype': 'Select',
			'width': 100,
			'reqd':0,
			'default':'',
			'options':['','Sale', 'Rent', 'Lease'] 
		},
		{
			'fieldname': 'property_type',
			'label': ('Property Type'),
			'fieldtype': 'Link',
			'options': 'Property Type',
			'width': 100
		}

	]
};
