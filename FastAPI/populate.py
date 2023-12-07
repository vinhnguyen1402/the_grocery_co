import requests

# Endpoint URL for creating categories and subcategories (replace with your actual endpoints)
category_endpoint = "http://127.0.0.1:8000/categories"
subcategory_endpoint = "http://127.0.0.1:8000/subcategories"

# Define your categories
categories = ["Meats", "Bread and Bakery", "Fruits"]

# Function to create a category
def create_category(name):
    json_data = {"category_name": name}
    response = requests.post(category_endpoint, json=json_data)
    if response.status_code == 200:
        print(f"Category '{name}' created successfully")
        # Extract and print the 'category_id' from the response
        category_data = response.json()  # Assuming the response is a dictionary
        category_id = category_data.get('category_id')
        print(f"Category ID for '{name}': {category_id}")
        return category_id
    else:
        print(f"Failed to create category '{name}': {response.text}")
        return None

# Create categories and print out their IDs
category_ids = {name: create_category(name) for name in categories}
#print("Created category IDs:", category_ids)

# Define your subcategories with the corresponding category IDs
subcategories = {
    1: ["Beef", "Seafood", "Pork"],            # 'Meats' has category_id 1
    2: ["Cookies", "Cakes", "Pastries", "Breads"], # 'Bread and Bakery' has category_id 3
    3: ["Fresh Fruits"]                         # 'Fruits' has category_id 4
}

# Function to create a subcategory
def create_subcategory(name, category_id):
    json_data = {
        "sb_category_name": name,
        "category_id": category_id
    }
    response = requests.post(subcategory_endpoint, json=json_data)
    if response.status_code == 200:
        print(f"Subcategory '{name}' created successfully under category ID {category_id}")
    else:
        print(f"Failed to create subcategory '{name}': {response.text}")

# Iterate over the subcategories and create them under the correct category
for category_id, subcategory_names in subcategories.items():
    for subcategory_name in subcategory_names:
        create_subcategory(subcategory_name, category_id)

