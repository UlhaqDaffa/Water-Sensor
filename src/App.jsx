import { Routes, Route } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import FooterBar from "./components/FooterBar";

import Login from "./components/login";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Feeds from "./components/feeds";
import About from "./components/about";

import ProtectedRoute from './utils/ProtectedRoute';  // Pastikan path ini benar

function App() {
  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route 
          path="/dashboard" 
          Component={() => (
            <ProtectedRoute component={Dashboard} />
          )} 
        />
        <Route 
          path="/feeds" 
          Component={() => (
            <ProtectedRoute component={Feeds} />
          )} 
        />
        <Route path="/about" Component={About} />

      </Routes>

      {/* <FooterBar /> */}
    </div>
  );
}

export default App;
