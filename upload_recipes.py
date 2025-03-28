import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# Load Firebase Admin SDK
cred = credentials.Certificate(r"C:\Users\shrey\Desktop\bakdient\Bakdient_frontend\Bakdient-Frontend\firebase-admin-sdk.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load CSV file
csv_file = r"C:\Users\shrey\Desktop\bakdient\Bakdient_frontend\recipes.csv"  # Update the correct file path if needed
df = pd.read_csv(csv_file)

# Upload recipes to Firestore
for index, row in df.iterrows():
    recipe_data = {
        "recipe_name": row["Recipe Name"],
        "category": row["Category"],
        "preparation_time": row["Preparation Time (minutes)"],
        "cooking_time": row["Cooking Time (minutes)"],
        "servings": row["Servings"],
        "ingredients": row["Ingredients"].split(","),
        "instructions": row["Instructions"].split(","),
        "difficulty": row["Difficulty Level"],
        "calories_per_serving": row["Calories per Serving"]
    }
    
    # Add recipe to Firestore
    db.collection("recipes").add(recipe_data)

print("Recipes uploaded successfully!")
