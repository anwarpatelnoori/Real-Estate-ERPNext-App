import frappe
from estate_app.www.utils import paginate

def get_context(context):
    page = frappe.form_dict.page
    # check if search request
    conditions = " "
    type, status, city = frappe.form_dict.type, frappe.form_dict.status, frappe.form_dict.city
    # if(type and status and city):
    #     conditions = f"""WHERE property_type='{type}' AND city='{city}' AND status='{status}'"""
    #     context.type = type
    #     context.status = status
    #     context.city = city

    if type and status and city:
        conditions = f"WHERE property_type = '{type}' AND city = '{city}' AND status = '{status}'"
    elif type and status:
        conditions = f"WHERE property_type = '{type}' AND status = '{status}'"
    elif type and city:
        conditions = f"WHERE property_type = '{type}' AND city = '{city}'"
    elif status and city:
        conditions = f"WHERE status = '{status}' AND city = '{city}'"
    elif type:
        conditions = f"WHERE property_type = '{type}'"
    elif status:
        conditions = f"WHERE status = '{status}'"
    elif city:
        conditions = f"WHERE city = '{city}'"
    else:
        conditions = "" 

    
    pagination = paginate(doctype='Property', page=page, conditions=conditions) #pass to pagination
    context.cities = frappe.db.sql("""SELECT name FROM `tabCity`;""", as_dict=True)
    context.types = frappe.db.sql("""SELECT name FROM `tabProperty Type`;""", as_dict=True)
    context.properties = pagination.get('properties')
    context.search = pagination.get('search')
    context.prev = pagination.get('prev')
    context.next = pagination.get('next')

    return context