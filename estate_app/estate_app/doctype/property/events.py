import frappe
# def validate(doc, event):
#     print(f'{doc}, {event}')


def on_update(doc, event):
    frappe.msgprint(f'{doc} has been updated by {doc.owner}')
    
def after_insert(doc, event):
    note=frappe.get_doc({
        'doctype':'Note',
        'title':f'{doc.name} Added',
        'public': True,
        'content':doc.description
    })
    note.insert()
    frappe.db.commit()
    frappe.msgprint(f'{note.title} has been created')