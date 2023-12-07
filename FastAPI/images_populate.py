import pandas as pd
import requests

# URL of your FastAPI server
BASE_URL = "http://127.0.0.1:8000"

# Path to your CSV file
csv_file_path = r"BUS118W Products - Products.csv"  # Adjust the path as necessary

# Read the CSV file into a DataFrame
df = pd.read_csv(csv_file_path)

# Function to make an API call to add an image to a product
def add_product_image(product_id, image_url, image_sequence):
    if pd.isna(image_url):  # Skip if the image URL is NaN
        return

    endpoint = f"{BASE_URL}/products/{product_id}/images/"
    data = {
        "image_URL": image_url,
        "image_sequence": image_sequence
    }
    response = requests.post(endpoint, json=data)
    if response.status_code == 200:
        print(f"Image added to product {product_id}, URL: {image_url}")
    else:
        print(f"Failed to add image to product {product_id}: {response.text}")

# Loop through the CSV rows
for index, row in df.iterrows():
    # Add main image
    add_product_image(row['product_id'], row['main_image'], 0)

    # Add sub images if they exist
    if 'sub_image 1' in row and not pd.isna(row['sub_image 1']):
        add_product_image(row['product_id'], row['sub_image 1'], 1)
    if 'sub_image 2' in row and not pd.isna(row['sub_image 2']):
        add_product_image(row['product_id'], row['sub_image 2'], 2)
