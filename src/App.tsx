// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserTable from './components/table/UserTable';
import UserDetail from './components/table/UserDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={<UserTable/>} />
          <Route path="/user/:userName" element={<UserDetail/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
