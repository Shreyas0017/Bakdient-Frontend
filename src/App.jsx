import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import RecipeSection from "./components/RecipeSection";
import Features from "./components/Features";
import Contact from "./components/Contact";
import "./App.css";

function App() {
    const [ingredient, setIngredient] = useState("");
    const [data, setData] = useState(null);
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("cups");
    const [converted, setConverted] = useState(null);

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

        // Convert cups to ml first (assuming 1 cup = 240 ml)
        const ml = unit === "cups" ? amount * 240 : amount;

        // Convert ml to grams
        const grams = ml * data.density;
        setConverted(grams.toFixed(2) + " grams");
    };

    return (
        <div className="min-h-screen bg-[#F9EAE1]">
            <Navbar />
            <Hero />
            <RecipeSection />
            <Features />
            <Contact />
        </div>
    );
}

export default App;
