import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecipeSection from "./components/RecipeSection";
import Features from "./components/Features";
import "./App.css";

function App() {

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
