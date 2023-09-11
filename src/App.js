import './App.css';
import { Routes, Route } from 'react-router-dom'
import Unique from './Component/Unique';
import Location from './Component/Location';
import Dashbboard from './Component/Dashbboard';
import { UserProvider } from './Provider';
import Mycomponent from './Component/Mycomponent';

function App() {

  return (
    <UserProvider >
      <Routes>
        <Route path='/' element={<Unique />} >
          <Route index element={<Mycomponent />} />
          <Route path='/location' element={<Location />} />
          <Route path='/Dashbboard' element={<Dashbboard />} />
        </Route>

      </Routes>
    </UserProvider>
  );
}

export default App;
