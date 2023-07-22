// Copyright (c) 2023, noori and contributors
// For license information, please see license.txt

frappe.ui.form.on('Map', {
	// refresh: function(frm) {

	// }
	map: function(frm){

		console.log(JSON.parse(frm.doc.map));
		let mapdata = JSON.parse(cur_frm.doc.map).features[0];
		let lon = mapdata.geometry.coordinates[0]
		let lat = mapdata.geometry.coordinates[1]
		console.log(lon, lat)
		// api call frappe 
		frappe.call({
			type:"Get",
			url: `https://nominatim.openstreetmap.org/reverse?format=json&lon=${lon}&lat=${lat}`, 			
			callback: function(r) {
				// console.log(r)
				// console.log('done')

				frm.set_value('address',r.display_name)
			}
		});
	}
});
