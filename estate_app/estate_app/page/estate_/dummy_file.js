frappe.pages['estate-'].on_page_load = function (wrapper) {
	new MyPage(wrapper);

}

//page content

MyPage = Class.extend({
	init: function (wrapper) {

		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Estate Home',
			single_column: true
		});

		//build page
		this.make();


	},
	//make page

	make:function(){
		//grab the class

		let me = $(this);

		//money fromatter

		let currency = function currency(n){
			let money = new Intl.NumberFormat('en-IN',
			{style:'currency', currency:'INR'}).format(n);
			return money
		}
		

		
		//get total price

		let total = function(){
			frappe.call({
				method:"estate_app.estate_app.page.estate_.estate.get_total_price",
				callback: function(r){

					console.log(r);
					$("#total-price")[0].innerText= currency(r.message); 
				}
			})
		}

		//graph call 
		let status = function(){
			frappe.call({
				method:"estate_app.estate_app.page.estate_.estate.get_property_price_by_status",
				callback: function(r){

					console.log(r);
					let statuses = []
					let prices = []
					let message = r.message
					message.forEach((item,i)=>{
						statuses.push(item[0])
						prices.push(item[1])
					})
					// console.log(statuses,prices)

					// start chart

					let chart = new frappe.Chart( "#frost-chart", { // or DOM element
						data: {
						labels: statuses,
					
						datasets: [
							{
								name: status[0], chartType: 'bar',
								values: [prices[0], 0, 0]
							},

							{
								name: status[0], chartType: 'bar',
								values: [0, prices[1], 0]
							},
							{
								name: status[0], chartType: 'bar',
								values: [ 0, 0, prices[2]]
							},
							
						],
					
						yMarkers: [{ label: "Marker", value: 70,
							options: { labelPos: 'left' }}],
						yRegions: [{ label: "Region", start: Math.min(prices[1],prices[2],prices[2]),
						end: Math.min(prices[1],prices[2],prices[2]),
							options: { labelPos: 'right' }}]
						},
					
						title: "Estate Price Chart",
						type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
						height: 300,
						colors: ['red', 'blue', 'green'],
					
						tooltipOptions: {
							formatTooltipX: d => (d + '').toUpperCase(),
							formatTooltipY: d => d + ' pts',
						}
					  });

					//   end chart
				}
			})
		}
		
		

		//chart function
		let page_chart = function (){
			let chart = new frappe.Chart( "#frost-chart", { // or DOM element
				data: {
				labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
			
				datasets: [
					{
						name: "Some Data", chartType: 'bar',
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					},
					{
						name: "Another Set", chartType: 'bar',
						values: [25, 50, -10, 15, 18, 32, 27, 14]
					},
					{
						name: "Yet Another", chartType: 'bar',
						values: [15, 20, -3, -15, 58, 12, -17, 37]
					}
				],
			
				yMarkers: [{ label: "Marker", value: 70,
					options: { labelPos: 'left' }}],
				yRegions: [{ label: "Region", start: -10, end: 50,
					options: { labelPos: 'right' }}]
				},
			
				title: "Estate Price Chart",
				type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
				height: 300,
				colors: ['red', 'blue', 'green'],
			
				tooltipOptions: {
					formatTooltipX: d => (d + '').toUpperCase(),
					formatTooltipY: d => d + ' pts',
				}
			  });
			//   chart.export();
			
		}
		

		//push the dom element page

		$(frappe.render_template(frappe.estate_app_page.body,this)).appendTo(this.page.main)

		//execute total
		total();
		status();

		//execute charts
		page_chart();

		/// refresh total
		document.querySelector("#refresh-total").addEventListener('click',()=>{
			console.log("Refresh clicked")
			total()
		})
	}



	//end of class

})

//html content

let body =`
<div class="widget number-widget-box" data-widget-name="Annual Sales">
    <div class="widget-head">
        <div class="widget-label">
            <div class="number-label text-danger"><span class="ellipsis" title="Annual Sales">Total Property Price
                </span></div>
            <div class="widget-subtitle"></div>
        </div>
        <div class="widget-control">
            <div class="card-actions dropdown pull-right">
                <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ...
                </a>
                <ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
                    <li class="dropdown-item">
                        <a data-action="action-refresh" id="refresh-total">Refresh</a>
                    </li>
                    <li class="dropdown-item">
                        <a data-action="action-edit">Edit</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="widget-body">
        <div class="widget-content">
            <div class="number" id="total-price" style="color:undefined">₹ 100000</div>
        </div>
    </div>
    <div class="widget-footer"></div>
</div>
<div id = "frost-chart"></div>


`;


// frappe.estate_app_page = {}
frappe.estate_app_page = {
	body: body

}
