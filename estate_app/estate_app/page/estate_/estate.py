import frappe

@frappe.whitelist()
def get_total_price():
    total = frappe.db.sql("""select SUM(grand_total) as total from `tabProperty`;""",as_dict=True)[0].total
    return total

@frappe.whitelist()
def get_property_price_by_status():
    price = frappe.db.sql("""select status, sum(grand_total) from `tabProperty` group by status order by status ASC;""")
    return price

@frappe.whitelist()
def get_total_sale():
    sale_total = sale = frappe.db.sql ("""select sum(grand_total) as sale_total from `tabProperty` where status='Sale';""", as_dict=True)[0].sale_total
    return sale_total

@frappe.whitelist()
def get_total_rent():
    rent_total =  frappe.db.sql ("""select sum(grand_total) as rent_total from `tabProperty` where status='Rent';""", as_dict=True)[0].rent_total
    return rent_total

@frappe.whitelist()
def get_total_lease():
    lease_total =  frappe.db.sql ("""select sum(grand_total) as lease_total from `tabProperty` where status='Lease';""", as_dict=True)[0].lease_total
    return lease_total
