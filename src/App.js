import './App.css';
import { Routes, Route } from 'react-router-dom'
import Unique from './Component/Unique';
import EvationLocation from './Component/EvationLocation';
import { UserProvider } from './hooks/useInformation';
import DashbboardHomemain from './Component/DashbboardHomemain';
import Setting from './Component/Setting';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Unique />}>
            <Route index element={<DashbboardHomemain />} />
            <Route path='/location' element={<EvationLocation />} />
            <Route path='/Setting' element={<Setting />} />
          </Route>
        </Routes>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
