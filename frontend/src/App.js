import './App.css';
import AddYieldsDetails from './components/AddYieldsDetails';
import FarmerHome from './components/FarmerHome';
import Header from './components/Header';
import ViewAllYieldsDetails from './components/ViewAllYieldsDetails';
import AllYieldsDetails from './components/AllYieldsDetails';
import RequestYield from './components/RequestYield';
import RequestsManage from './components/RequestsManage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path='/home' element={<FarmerHome />} />
          <Route path='/add-yieldsdetails' element={<AddYieldsDetails />} />
          <Route path='/view-yieldsdetails' element={<AllYieldsDetails />} />
          <Route path='/view-allyieldsdetails' element={<ViewAllYieldsDetails />} />
          <Route path="/request-yield" element={<RequestYield />} />
          <Route path='/requests-manage' element={<RequestsManage/>}/>


        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
