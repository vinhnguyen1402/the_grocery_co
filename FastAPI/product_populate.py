import pandas as pd

# Let"s load the CSV file again to examine its structure and prepare for product creation.
csv_file_path = "C:/Users/Darling/Desktop/BUS118W Products - Products.csv"
df = pd.read_csv(csv_file_path)

import random
import requests
import json

# Function to generate a random inventory count
def generate_inventory():
    return random.randint(5, 100)

# Mapping of Subcategories to their IDs based on the provided mapping
subcategory_mapping = {
    "Beef": 1,
    "Seafood": 2,
    "Pork": 3,
    "Cookies": 4,
    "Cakes": 5,
    "Pastries": 6,
    "Breads": 7,
    "Fresh Fruits": 8
}

# Adjusted function to clean and convert price, handling already float values
def clean_price(price):
    if isinstance(price, str):
        return float(price.replace("$", "").replace(",", ""))
    return price  # If it"s already a float, just return it

# Applying the adjusted function to clean the data and re-generating inventory counts
df["price"] = df["price"].apply(clean_price)
df["inventory_count"] = df.apply(lambda _: generate_inventory(), axis=1)

# Clean NaN values from the DataFrame
df.fillna({
    "description": " ",
    "price": 0.0,
    "calories": 0,
    "protein": 0,
    "sodium": 0,
    "fiber": 0,
    "sugar": 0
}, inplace=True)

df["calories"] = df["calories"].astype(int)
df["protein"] = df["protein"].astype(int)
df["sodium"] = df["sodium"].astype(int)
df["fiber"] = df["fiber"].astype(int)
df["sugar"] = df["sugar"].astype(int)

# Map "Category" and "Subcategory" to their corresponding IDs
df["category_id"] = df["Category"].map(lambda x: 1 if x == "Meat" else (2 if x == "Bread and Bakery" else 3))
df["subcategory_id"] = df["Subcategory"].map(subcategory_mapping.get)

df["subcategory_id"] = df["subcategory_id"].fillna(0).astype(int)

# Create a new DataFrame for the products to create, avoiding SettingWithCopyWarning
products_to_create = df[["product_name", "inventory_count", "description", "price", "category_id", "subcategory_id", "serve_size", "calories", "protein", "sodium", "fiber", "sugar"]].copy()

# Drop rows where "product_name" is NaN
products_to_create.dropna(subset=["product_name"], inplace=True)

# Assuming the dataframe "df" and the list "products_list" are already defined and prepared as above
# and that the "requests" library has been imported.

# FastAPI server endpoint for creating products
product_creation_endpoint = "http://127.0.0.1:8000/products/"

# Convert the dataframe to a list of dictionaries for API POST requests
products_list = products_to_create.to_dict(orient="records")

def post_product(product_data):
    response = requests.post(product_creation_endpoint, json=product_data)
    if response.status_code == 200:
        print(f"Product {product_data['product_name']} added successfully.")
    else:
        print(f"Failed to add product {product_data['product_name']}: {response.status_code} - {response.text}")  # Print the detailed error message
    
    return response

# Posting each product in the products_list to the FastAPI server
responses = []
for product in products_list:
    response = post_product(product)
    responses.append((product["product_name"], response.status_code))

# Output the result for each product
for name, status in responses:
    if status == 200:
        print(f"Success: '{name}' added to the database.")
    else:
        print(f"Error: Failed to add '{name}'. Status code: {status}.")






