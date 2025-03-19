import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend URL

// Fetch all ingredients
export const fetchIngredients = async () => {
  try {
    const response = await axios.get(`${API_URL}/ingredients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

// Fetch a specific ingredient by name (Case-Insensitive)
export const fetchIngredient = async (name) => {
  try {
    console.log("Searching for:", name);
    const response = await axios.get(`${API_URL}/ingredient/${encodeURIComponent(name.toLowerCase())}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ingredient "${name}":`, error.response?.data || error.message);
    return null;
  }
};
