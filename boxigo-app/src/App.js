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
                <Route path="/my-moves" element={<MyMoves />} />
                {/* Add routes for other components like MyProfile, GetQuote, Logout */}
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
