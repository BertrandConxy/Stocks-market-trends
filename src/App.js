import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import CompanyStock from './components/home/CompanyStock';
import CompanyDetails from './components/details/CompanyDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<CompanyStock />} />
        <Route path="/details/:companyId" element={<CompanyDetails />} />
      </Routes>
    </div>
  );
}

export default App;
