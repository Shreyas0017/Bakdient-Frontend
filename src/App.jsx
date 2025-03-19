import { useState, useEffect } from "react";
import axios from "axios";

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
        <div>
            <h1>Recipe Ingredient Converter</h1>
            <input
                type="text"
                placeholder="Enter ingredient (e.g., baking powder)"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
            />
            <button onClick={fetchIngredient}>Search</button>

            {data && (
                <div>
                    <h2>{data.name}</h2>
                    <p>Density: {data.density} g/ml</p>

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="cups">Cups</option>
                        <option value="ml">Milliliters</option>
                    </select>

                    <button onClick={convertToGrams}>Convert to grams</button>
                    <p>{converted && `${amount} ${unit} = ${converted}`}</p>
                </div>
            )}
        </div>
    );
}

export default App;
