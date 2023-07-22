# Copyright (c) 2023, noori and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
	def validate(self):
	# 	if(self.property_type=='Flat'):
	# 		for i in self.amenities:
	# 			if(i.amenity=='Outdoor Kitchen'):
	# 				frappe.throw(f'{self.property_type} should not have {i.amenity}')
		amenity_prices = 0
		for i in self.amenities:
			amenity_prices+=i.amenity_price
		discount = 0
		self.grand_total = self.property_price + amenity_prices -((0/100)*(self.property_price+amenity_prices))

 