import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MyMoves from './components/MyMoves';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Sidebar>
              <Routes>
              <Route path="/" element={<MyMoves />} />
              
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
