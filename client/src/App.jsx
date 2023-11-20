import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/Home/HomePage';
import DogDetail from './components/Detail/DogDetail';
import './App.css';
import CreateDog from './components/Form/CreateDog';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DogDetail />} />
        <Route path="/create-dog" element={<CreateDog/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
