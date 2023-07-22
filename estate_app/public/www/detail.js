document.querySelector('#contact-agent').addEventListener('click',(e)=>{
    let agent_email = document.querySelector('#email').value;
    console.log(agent_email);
    let d = new frappe.ui.Dialog({
        title: 'Enter details',
        fields: [
            {
                label: 'First Name',
                fieldname: 'first_name',
                fieldtype: 'Data'
            },
            {
                label: 'Last Name',
                fieldname: 'last_name',
                fieldtype: 'Data'
            },
            {
                label: 'Age',
                fieldname: 'age',
                fieldtype: 'Int'
            }
        ],
        size: 'small', // small, large, extra-large 
        primary_action_label: 'Submit',
        primary_action(values) {
            console.log(values);
            d.hide();
        }
    });

    console.log('DIALOG');
    
    d.show();
    console.log('DIALOG START');
    
})
 