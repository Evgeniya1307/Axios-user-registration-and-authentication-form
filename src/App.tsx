import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
<Routes>
  <Route path='/' element={<Main/>}/> 
  <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>
    </Router>
  );
}

export default App;
