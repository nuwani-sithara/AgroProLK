import './App.css';
import Header from './components/Header';
import AddFertilizer from './components/AddFertilizer';
import AllFertilizers from './components/AllFertilizers';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Header />
      <Routes>  
        <Route path="/addfertilizer" element={<AddFertilizer/>} />  
      </Routes>
      <Routes>  
        <Route path="/" element={<AllFertilizers/>} />  
      </Routes>
    </div>
    </Router>


  );
}

export default App;
