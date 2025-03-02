import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Landing from "./components/pages/Landing";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default App;