frappe.ready(function () {
	// bind events here

	//title
	document.querySelector('.page-header').innerHTML = `<h1 class = 'text-danger'>Contact Agent</h1>`;
	// document.querySelector('input[data-fieldname="email"]').value ="agent_test@gmail.com"; 

	//validate email
	frappe.web_form.on('email', (field, value) => {
		console.log(field, value)
		if (!value.includes('@')){
			frappe.throw(__('Invalid Email'))
		}
		console.log(field, value)
	})
	
	
})




