import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PageA from './pages/PageA';
import PageB from './pages/PageB';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/a" element={<PageA />}></Route>
        <Route path="/b" element={<PageB />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
