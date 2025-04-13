import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './admin/Register/Register';
import Login from './admin/Login/Login';
import Home from './admin/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
