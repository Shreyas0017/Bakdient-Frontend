import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Clock,
  Users,
  Flame,
  ChefHat,
  Scale,
  Utensils,
  Pizza,
  Minus,
  Plus,
  RefreshCw,
} from "lucide-react";

// Recipe Modal Component
const RecipeModal = ({ recipe, onClose }) => {
  // Add a state for the quantity multiplier
  const [multiplier, setMultiplier] = useState(1);
  // Add a state for the current servings
  const [currentServings, setCurrentServings] = useState(recipe.servings);
  // Add state for unit preference
  const [unitSystem, setUnitSystem] = useState("standard"); // options: "standard", "metric", "tbsp"

  if (!recipe) return null;

  // Function to handle increasing servings/multiplier
  const increaseServings = () => {
    const newMultiplier = multiplier + 0.25;
    setMultiplier(newMultiplier);
    setCurrentServings(Math.round(recipe.servings * newMultiplier));
  };

  // Function to handle decreasing servings/multiplier
  const decreaseServings = () => {
    if (multiplier > 0.25) {
      const newMultiplier = multiplier - 0.25;
      setMultiplier(newMultiplier);
      setCurrentServings(Math.round(recipe.servings * newMultiplier));
    }
  };

  // Function to cycle through unit systems
  const toggleUnitSystem = () => {
    if (unitSystem === "standard") {
      setUnitSystem("metric");
    } else if (unitSystem === "metric") {
      setUnitSystem("tbsp");
    } else {
      setUnitSystem("standard");
    }
  };

  // Safe parsing of ingredients with unit conversion and quantity multiplication
  const parseIngredients = (ingredients) => {
    // Handle different input types
    if (typeof ingredients !== "string") {
      // If it's an array or not a string, convert to string or return empty array
      ingredients = Array.isArray(ingredients)
        ? ingredients.join(", ")
        : String(ingredients || "");
    }

    return ingredients.split(",").map((ingredient) => {
      // Trim and remove any extra whitespace
      const cleanedIngredient = ingredient.trim();

      // Attempt to separate quantity and ingredient name
      const match = cleanedIngredient.match(
        /^(\d+(?:\.\d+)?)\s*(\w+)?\s*(.+)?/
      );

      let quantity = match ? match[1] || "" : "";
      let unit = match ? match[2] || "" : "";
      let name = match ? match[3] || cleanedIngredient : cleanedIngredient;

      // Apply the multiplier to the quantity if it exists
      let adjustedQuantity = "";
      if (quantity) {
        const numericQuantity = parseFloat(quantity);
        if (!isNaN(numericQuantity)) {
          adjustedQuantity = (numericQuantity * multiplier).toFixed(
            // If the original was an integer, keep 0 decimals for small numbers or up to 1 for larger
            Number.isInteger(numericQuantity) &&
              numericQuantity * multiplier < 10
              ? 0
              : 1
          );
          // Remove trailing .0 if present
          adjustedQuantity = adjustedQuantity.replace(/\.0$/, "");
        } else {
          adjustedQuantity = quantity; // Keep original if not a number
        }
      }

      // Convert measurements for different unit systems
      let standardDisplay = `${adjustedQuantity} ${unit}`.trim();
      let metricValue = "";
      let tbspValue = "";

      if (adjustedQuantity && unit) {
        // Simple conversions (these are approximates and would need to be refined)
        if (
          unit.toLowerCase() === "g" ||
          unit.toLowerCase() === "gram" ||
          unit.toLowerCase() === "grams"
        ) {
          metricValue = `${adjustedQuantity}g`;
          tbspValue = `${(parseFloat(adjustedQuantity) / 15).toFixed(1)} tbsp`;
        } else if (
          unit.toLowerCase() === "tbsp" ||
          unit.toLowerCase() === "tablespoon" ||
          unit.toLowerCase() === "tablespoons"
        ) {
          metricValue = `${(parseFloat(adjustedQuantity) * 15).toFixed(0)}g`;
          tbspValue = `${adjustedQuantity} tbsp`;
        } else if (
          unit.toLowerCase() === "tsp" ||
          unit.toLowerCase() === "teaspoon" ||
          unit.toLowerCase() === "teaspoons"
        ) {
          metricValue = `${(parseFloat(adjustedQuantity) * 5).toFixed(0)}g`;
          tbspValue = `${(parseFloat(adjustedQuantity) / 3).toFixed(1)} tbsp`;
        } else if (
          unit.toLowerCase() === "cup" ||
          unit.toLowerCase() === "cups"
        ) {
          metricValue = `${(parseFloat(adjustedQuantity) * 240).toFixed(0)}g`;
          tbspValue = `${(parseFloat(adjustedQuantity) * 16).toFixed(1)} tbsp`;
        } else if (
          unit.toLowerCase() === "oz" ||
          unit.toLowerCase() === "ounce" ||
          unit.toLowerCase() === "ounces"
        ) {
          metricValue = `${(parseFloat(adjustedQuantity) * 28.35).toFixed(0)}g`;
          tbspValue = `${(parseFloat(adjustedQuantity) * 2).toFixed(1)} tbsp`;
        }
        // Add more conversions as needed
      }

      return {
        originalQuantity: quantity,
        quantity: adjustedQuantity,
        unit,
        name,
        standardDisplay,
        metricValue,
        tbspValue,
      };
    });
  };

  // Safe parsing of instructions
  const parseInstructions = (instructions) => {
    // Handle different input types
    if (typeof instructions !== "string") {
      // If it's an array or not a string, convert to string or return empty array
      instructions = Array.isArray(instructions)
        ? instructions.join(". ")
        : String(instructions || "");
    }

    return instructions
      .split(/[.!]/) // Split on periods or exclamation marks
      .filter((step) => step.trim()) // Remove empty steps
      .map((step) => step.trim());
  };

  const parsedIngredients = parseIngredients(recipe.ingredients);
  const parsedInstructions = parseInstructions(recipe.instructions);

  // Calculate adjusted calories based on the multiplier
  const adjustedCalories = Math.round(recipe.calories * multiplier);

  // Get the appropriate unit label for the toggle button
  const getUnitLabel = () => {
    switch (unitSystem) {
      case "standard":
        return "Standard";
      case "metric":
        return "Metric";
      case "tbsp":
        return "Tbsp";
      default:
        return "Units";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-full p-2"
        >
          ✕
        </button>

        {/* Unit Toggle Button */}
        <button
          onClick={toggleUnitSystem}
          className="absolute top-4 right-16 z-10 flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-2 rounded-full"
        >
          <RefreshCw size={16} />
          <span>{getUnitLabel()}</span>
        </button>

        {/* Recipe Header */}
        <div className="relative">
          <div className="w-full h-64 md:h-96 rounded-t-2xl overflow-hidden bg-gray-100">
            <img
              src={recipe.recipe_image}
              alt={recipe.recipe_name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">
              {recipe.recipe_name}
            </h1>
          </div>
        </div>

        {/* Recipe Overview */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <NutritionIcon
              icon={Clock}
              value={`${recipe.preparation_time + recipe.cooking_time} min`}
              label="Total Time"
              color="text-amber-500"
            />

            {/* Servings with adjustment controls */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <Users className="text-green-500" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Servings</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={decreaseServings}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center"
                    disabled={multiplier <= 0.25}
                  >
                    <Minus size={14} />
                  </button>
                  <p className="font-semibold text-gray-800 mx-2">
                    {currentServings}
                  </p>
                  <button
                    onClick={increaseServings}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <NutritionIcon
              icon={ChefHat}
              value={recipe.difficulty}
              label="Difficulty"
              color="text-purple-500"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {recipe.description || "No description available"}
          </p>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Scale className="mr-3 text-gray-500" size={24} />
              Ingredients
              {multiplier !== 1 && (
                <span className="ml-3 text-sm font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  {multiplier}x
                </span>
              )}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {parsedIngredients.map((ingredient, index) => {
                // Determine which measurement to display based on unit system
                let displayMeasurement = ingredient.standardDisplay;
                if (unitSystem === "metric" && ingredient.metricValue) {
                  displayMeasurement = ingredient.metricValue;
                } else if (unitSystem === "tbsp" && ingredient.tbspValue) {
                  displayMeasurement = ingredient.tbspValue;
                }

                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 flex items-start"
                  >
                    {ingredient.quantity && (
                      <div className="font-bold text-gray-700 mr-2 min-w-[90px]">
                        {displayMeasurement}
                      </div>
                    )}
                    <span className="text-gray-600">{ingredient.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <Utensils className="mr-3 text-gray-500" size={24} />
              Step-by-Step Instructions
            </h2>
            <ol className="space-y-4">
              {parsedInstructions.map((step, index) => (
                <li
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-start"
                >
                  <span className="text-white bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}.</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Additional Details */}
          <div className="mt-8 border-t pt-6 grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Pizza className="mr-2 text-gray-500" size={20} />
                Category
              </h3>
              <p className="text-gray-600">
                {recipe.category || "Uncategorized"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Nutritional Icon Component
const NutritionIcon = ({ icon: Icon, value, label, color }) => (
  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
    <Icon className={color} size={20} />
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const RecipeSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch from Firebase
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recipeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]); // Set empty array if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.category || "Uncategorized")),
  ];

  // Filter recipes based on category
  const filteredRecipes =
    filter === "All"
      ? recipes
      : recipes.filter(
          (recipe) => (recipe.category || "Uncategorized") === filter
        );

  return (
    <section className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Recipes
          </h2>
          <p className="text-gray-600 text-lg">
            Discover delicious recipes from various categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading recipes...</p>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center text-gray-600">No recipes available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative mb-6">
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={recipe.recipe_image}
                      alt={recipe.recipe_name}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {recipe.difficulty || "Unknown"}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {recipe.recipe_name}
                </h3>
                <div className="flex justify-center gap-4 text-gray-500 text-sm mb-4">
                  <span className="flex items-center">
                    <Clock className="mr-1" size={16} />
                    {recipe.preparation_time + recipe.cooking_time} min
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.description || "A delicious recipe to try!"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </section>
  );
};

export default RecipeSection;