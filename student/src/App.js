import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './admin/Register/Register';
import Login from './admin/Login/Login';
import Home from './admin/Home/Home';
import Borrowed from './admin/Library/Borrowed'; // import the Borrowed component
import Available from './admin/Library/available'; // Correct the import to match the lowercase file name
import Returned from './admin/Library/Returned'; // import the Returned component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/library/borrowed" element={<Borrowed />} />
        <Route path="/admin/library/available" element={<Available />} />  {/* Correct the route */}
        <Route path="/admin/library/returned" element={<Returned />} />
      </Routes>
    </Router>
  );
}

export default App;
