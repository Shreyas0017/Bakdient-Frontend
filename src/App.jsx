import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";    
import Hero from "./components/Hero";
import RecipeSection from "./components/RecipeSection";
import Features from "./components/Features";
import "./App.css";

function App() {
    const [ingredient, setIngredient] = useState("");
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("cups");
    const [converted, setConverted] = useState(null);

    useEffect(() => {
        if (ingredient.trim() === "") {
            setData(null);
            setConverted(null);
            return;
        }
        fetchIngredient();
    }, [ingredient]); // Fetch ingredient whenever it changes

    const fetchIngredient = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/ingredient/${ingredient}`);
            if (response.data.error) {
                setData(null);
                setConverted(null);
            } else {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching ingredient:", error);
        }
    };

    const convertToGrams = () => {
        if (!data || !data.density || isNaN(amount)) {
            setConverted("Invalid input");
            return;
        }

        let ml;
        switch (unit) {
            case "cups":
                ml = amount * 240; // 1 cup = 240 ml
                break;
            case "tablespoons":
                ml = amount * 15; // 1 tbsp = 15 ml
                break;
            case "teaspoons":
                ml = amount * 5; // 1 tsp = 5 ml
                break;
            case "ml":
                ml = amount;
                break;
            default:
                setConverted("Unsupported unit");
                return;
        }

        // Convert ml to grams
        const grams = ml * data.density;
        setConverted(grams.toFixed(2) + " grams");
    };

    return (
        <Router>
            <div className="min-h-screen bg-[#F9EAE1]">
                <Navbar />
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/" element={<Hero />} />
                        <Route path="/recipes" element={<RecipeSection />} />
                        <Route path="/features" element={<Features />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
