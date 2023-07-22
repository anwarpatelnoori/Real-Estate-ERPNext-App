// Copyright (c) 2023, noori and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	// page setup start
	setup: (frm)=>{
		frm.check_amenities_duplicate = function(frm, row){
			frm.doc.amenities.forEach(element => {
				if (row.amenity=='' || row.idx==element.idx){

				}
				else{
					if(row.amenity==element.amenity){
						row.amenity='';
						frappe.throw(`${element.amenity} already exists row ${element.idx}`);
						frm.refresh_field('amenities');
					}
				}
			});	
		}
		frm.compute_total=(frm)=>{
			let total=0;
			frm.doc.amenities.forEach(i=>{
				total =total+i.amenity_price; 
			});

			let new_total = frm.doc.property_price + total;
			if (frm.doc.discount){
				new_total=new_total-(new_total*(frm.doc.discount)/100);
			}
			// console.log(new_total);
			frm.set_value('grand_total',new_total)
		},
		frm.copy_parent2_child_data=(frm)=>{
			frm.doc.amenities.forEach(element => {
				element.discount=frm.doc.discount;
			});
			frm.refresh_field('amenities')
		},
		frm.check_specific_amenities=(frm,row)=>{
			// if(frm.doc.property_type=='Flat' && row.amenity=='Outdoor Kitchen'){
			// 	console.log('cannot exists')
			// 		let amenity=row.amenity;
			// 		row.amenity=''
			// 		frappe.throw((`${amenity} cannot exists in flat`));
			// 		frm.refresh_field('amenities');

			// 	}
		}


	}, //page setup end

	// refresh page start
	refresh: function(frm) {
		frm.add_custom_button('Update Address',()=>{
			frappe.prompt('Address', ({value})=>{
				if(value){
					frm.set_value('address',value);
					frm.refresh_field('address')
					frappe.msgprint(__(`Address field update with ${value}`))
				}
			})
			
		},'Acitons');
		frm.add_custom_button('Check Property Type', ()=>{
			let propery_type=frm.doc.propery_type
			console.log(propery_type)
			
		},'Acitons')

	}, //refres page end
	property_price:(frm)=>{
			frm.compute_total(frm);
		},
	discount:(frm)=>{
			frm.copy_parent2_child_data(frm)
			frm.compute_total(frm)
		},
	
	
});
frappe.ui.form.on('Property Amenity Detail',{
	amenity: function(frm, cdt,cdn){
		
		// reading the enitre tabl e
		let row = locals[cdt][cdn];
		frm.check_specific_amenities(frm,row)
		frm.check_amenities_duplicate(frm, row)
		frm.compute_total(frm)
		
	},
	amenities_remove:(frm,cdt,cdn)=>{
		frm.compute_total(frm)
		
	},
	
})