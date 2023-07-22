from frappe import _


def get_data():
	return {
		"heatmap": True,
		"heatmap_message": _('Agent Dashboard Informtion'),
		'fieldname':'agent_id',
		"non_standard_fieldnames": {
		"Property":'agent_id'
		},		
	    "transactions": [
			{
				"label": _("Property"),
		        "items": ["Property"]
		    },
			
		],
	}
