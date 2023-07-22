# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_property_child_data(name):
#     try:
#         print('\n\n\n\n\n', name, '\n\n\n\n\n\n\n\n')
#         doc = frappe.get_doc('Copy Child Data From Property', name)
#     except:
#         doc = None
#         frappe.throw(_("Doctype not found"))
#         return doc
    
