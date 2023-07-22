frappe.pages['database-console'].on_page_load = function (wrapper) {
	new MyPage(wrapper);
}

//page content
MyPage = Class.extend({
	init: function (wrapper) {

		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Estate App Data Base Console',
			single_column: true
		});
		//build page
		this.make();
	},
	//make page
	make: function () {
		//grab the class
		let me = $(this);

		//push the dom element page
		$(frappe.render_template(frappe.estate_app_page.body, this)).appendTo(this.page.main)

		let srctag = document.createElement('script')
		srctag.src = "https://unpkg.com/frappe-datatable@latest"
		srctag.type = "text/javascript";
		document.head.appendChild(srctag);

		//form query
		function makeTable(data) {
			let datatable = new DataTable("#queryResult",{
				columns: data.tablehead,
				data: data.content,
				inlineFilters: true,
				dropdownButton: '▼',
			});

		}
		//work with data
		function makeQuery(formQuery) {
			// $("#queryResult").text(formQuery);
			frappe.call({
				method: "estate_app.estate_app.page.database_console.database_console.query_database",
				args: { query: formQuery },
				callback: function (r) {
					// code start
					let element = $("#queryResult");
					let result = r.message;
					console.log(result);
					if (result.reply == 0) {
						frappe.throw(result.content)
					}
					else if(result.reply==2){
						element.innerText = result.content;
						element.text(result.content);
						element.addClass('text-danger');
					}
					else{
						if(result.content.length>1){
							makeTable(result)
						}
						else{
							frappe.msgprint("Empty Set")
						}
						
					}

				}
			});


		}

		//get form data
		$("#queryForm").submit(e => {
			e.preventDefault();
			// console.log("form submitted")
			let textQuery = $("#text-query")[0].value;
			// console.log(textQuery)
			if (textQuery.length > 1) {
				makeQuery(textQuery)
			}
		})
	}
	//end of class
})

//html content
let body = `
<div id="query">
    <form id = "queryForm">
        <div class="form-group">
            <label for="query">Enter Your SQL Query</label>
            <textarea id="text-query" class="form-control" aria-describedby="query" placeholder="Enter Query Here" style="width: 50%"></textarea>
            <small id="query-help" class="form-text text-muted">Enter only SQL queries.</small>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</div>
<br>
<br>
<h5>Query Results:</h5>
<div id="queryResult"> 
</div>

`;

// frappe.estate_app_page = {}
frappe.estate_app_page = {
	body: body
}
