import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CitiesProvider } from './contexts/citiesContext';
import { AuthProvider } from './contexts/authContext';
import ProtectedRoute from './pages/ProtectedRoute';

// // import Homepage from './pages/Homepage';
// import Product from './pages/product';
// import Pricing from './pages/Pricing';
// import Login from './pages/login';
// import AppLayout from './pages/AppLayout';
// import Signup from './pages/signup';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import PageNotFound from './pages/PageNotFound';
import SpinnerFullPage from './components/SpinnerFullPage';

const Homepage = lazy(()=>import('./pages/Homepage'))
const Pricing = lazy(()=>import('./pages/Pricing.jsx'))
const Login = lazy(()=>import('./pages/login'))
const Product = lazy(()=>import('./pages/Product.jsx'))
const Signup = lazy(()=>import('./pages/signup'))
const AppLayout = lazy(()=>import('./pages/AppLayout.jsx'))


export default function App() {
 

  return (
    <>
    <AuthProvider>
    <CitiesProvider>
      <Suspense fallback={(<SpinnerFullPage />)}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/app' element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities" element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </CitiesProvider>
    </AuthProvider>
    </>
  );
}
