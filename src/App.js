import './App.css';
import { Routes, Route } from 'react-router-dom'
import Unique from './Component/Unique';
import EvationLocation from './Component/EvationLocation';
import { UserProvider } from './Provider';
import DashbboardHomemain from './Component/DashbboardHomemain';
import Setting from './Component/Setting';

function App() {

  return (
    <UserProvider >
      <Routes>
        <Route path='/' element={<Unique />} >
          <Route index element={<DashbboardHomemain />} />
          <Route path='/location' element={<EvationLocation />} />
          <Route path='/Setting' element={<Setting/>} />
        </Route>

      </Routes>
    </UserProvider>
  );
}

export default App;
