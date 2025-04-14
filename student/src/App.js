import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './admin/Register/Register';
import Login from './admin/Login/Login';
import Home from './admin/Home/Home';
import Borrowed from './admin/Library/Borrowed';
import Available from './admin/Library/available';
import Returned from './admin/Library/Returned';// Corrected import (using 'studentdb' as per your naming)
import StudentDB from './admin/Studentdata/StudentDB';
import Search from './admin/Studentdata/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/Home" />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/library/borrowed" element={<Borrowed />} />
        <Route path="/admin/library/available" element={<Available />} />
        <Route path="/admin/library/returned" element={<Returned />} />
        <Route path="/admin/Studentdata/StudentDB" element={<StudentDB />} /> {/* Correct route */}
        <Route path="/admin/studentdata/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
