import random
import frappe
import requests
from faker import Faker
fake = Faker()
# fake.seed(0)

##Agents
# def create_agents():
#   import random
#   import frappe
#   import requests
#   from faker import Faker
#   fake = Faker()
#     agent_image_url = "https://api.unsplash.com/search/photos?client_id=-0IYW0fhhCOlRoB79UX_tZeAyjErmCf4ZANKamNxO7s&query=headshot"
#     agent_image_data= requests.get(agent_image_url)
#     agent_image_data.json().get('results')[5].get('urls').get('small')
#     agents_images=[]
#     agents_images=[i.get('urls').get('small')for i in agent_image_data.json().get('results')]
#     len(agents_images)
#     for n in range(2):
#         agent_image_url="https://api.unsplash.com/search/photos?client_id=0IYW0fhhCOlRoB79UX_tZeAyjErmCf4ZANKamNxO7s&query=headshot"
#         img_api = requests.get(agent_image_url)
#         agents_images += [i.get('urls').get('small')for i in agent_image_data.json().get('results')]
#         len(agents_images)
#     def populate_agent(agents_images,fake):
#         for img in agents_images:
#             agent = frappe.get_doc({'doctype':'Agent',
#             'email':fake.profile().get('mail'),
#             'agent_name':fake.profile().get('name'),
#             'phone':fake.phone_number(),
#             'image':img,
#             'profile_pic': img})
#             agent.insert(ignore_permissions=True)
#         frappe.db.commit()


###Property
# def populate_property(fake):
#     # fake.seed(0)
#     house_images=[]
    
#     ##for creating agents
#     agent= [agent.name for agent in frappe.db.sql("""select name from `tabAgent`;""",as_dict=True)]

#     ##for status
#     status = ['Sale', 'Lease','Rent']

#     ## property_type
#     property_types =[property.name for property in frappe.db.sql("""select name from `tabProperty Type`;""",as_dict=True)]

#     #cities
#     cities=[city.name for city in frappe.db.sql("""select name from `tabCity`; """, as_dict=True)]

#     #amenity
#     amenities = frappe.db.sql("""select amenity,amenity_price from `tabProperty Amenity Item`;""",as_dict=True)


    
#     for n in range(10):
#         house_image_url = "https://api.unsplash.com/search/photos?client_id=-0IYW0fhhCOlRoB79UX_tZeAyjErmCf4ZANKamNxO7s&query=house"
#         img_api = requests.get(house_image_url)
#         house_images +=[
#                 {
#                 'doctype':'Property',
#                 'amenities':[amenities[random.randint(0,len(amenities)-1)]],
#                 'description':fake.paragraph(nb_sentences=5),
#                 'property_price':random.randint(40000,100000),
#                 'property_type':random.choice(property_types),
#                 'agent_id':random.choice(agent),
#                 'status':random.choice(status),
#                 'city':random.choice(cities),
#                 'address':fake.address().replace('\n',','),
#                 'owner_name':fake.profile().get('name'),
#                 'discount':random.randint(0,11),
#                 'property_name':('owner_name',+ " "+'property_type'),  
#                 'image':i.get('urls').get('small')
#                 }
#             for i in img_api.json().get('results')
#             ] 
#     for p in house_images:
#         pr = frappe.get_doc(p)
#         pr.insert()
#     frappe.db.commit()

def populate_property(fake):
    import random
    import frappe
    import requests
    from faker import Faker
    fake = Faker()
    house_images = []  # Initialize house_images as an empty list
    
    agent = [agent.name for agent in frappe.db.sql("""select name from `tabAgent`;""", as_dict=True)]
    status = ['Sale', 'Lease', 'Rent']
    property_types = [property.name for property in frappe.db.sql("""select name from `tabProperty Type`;""", as_dict=True)]
    cities = [city.name for city in frappe.db.sql("""select name from `tabCity`;""", as_dict=True)]
    amenities = frappe.db.sql("""select amenity, amenity_price from `tabProperty Amenity Item`;""", as_dict=True)
    
    for n in range(10):
        house_image_url = "https://api.unsplash.com/search/photos?client_id=-0IYW0fhhCOlRoB79UX_tZeAyjErmCf4ZANKamNxO7s&query=house"
        img_api = requests.get(house_image_url)
        house_images = [  # Assign a new value to house_images
            {
                'doctype': 'Property',
                'amenities': [amenities[random.randint(0, len(amenities)-1)]],
                'description': fake.paragraph(nb_sentences=5),
                'property_price': random.randint(40000, 100000),
                'property_type': random.choice(property_types),
                'agent_id': random.choice(agent),
                'status': random.choice(status),
                'city': random.choice(cities),
                'address': fake.address().replace('\n', ','),
                'owner_name': fake.profile().get('name'),
                'discount': random.randint(0, 11),
                'property_name': fake.profile().get('name') + " " + random.choice(property_types),
                'image': i.get('urls').get('small')
            }
            for i in img_api.json().get('results')
        ]
    
    for p in house_images:
        pr = frappe.get_doc(p)
        pr.insert()
    
    frappe.db.commit()
    print("Created successful")

# Uncomment the following line if you want to create agents
# create_agents()

# Call the populate_property function to populate property data
# populate_property(fake)

