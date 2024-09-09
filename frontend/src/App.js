import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AddFertilizer from './components/AddFertilizer';
import AllFertilizer from './components/AllFertilizer';
import UpdateFertilizer from './components/UpdatFertilizer';
import UserAllFertilizer from './components/User/UserAllFertilizer';
import FertilizerCalculation from './components/User/FertilizerCalculation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Header />
      <Routes>  
        <Route path="/" element={<Home/>} />  
      </Routes>
      <Routes>  
        <Route path="/addfertilizer" element={<AddFertilizer/>} />  
      </Routes>
      <Routes>  
        <Route path="/allfertilizer" element={<AllFertilizer/>} />  
      </Routes>
      <Routes>  
        <Route path="/updatefertilizer/:id" element={<UpdateFertilizer />} />
      </Routes>  
      <Routes>  
        <Route path="/userallfertilizer" element={<UserAllFertilizer />} />
      </Routes>  
      <Routes>  
        <Route path="/fertilizercalculation/:id" element={<FertilizerCalculation />} />
      </Routes>  
       <Footer/>
    </div>
    </Router>
  

  );
}

export default App;
