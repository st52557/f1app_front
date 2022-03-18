import './App.css';
import { Link } from 'react-router-dom';
import Routes from './RoutesAll';
import MyNavbar from "./components/Home/Navbar";

function App() {
  return (
          <main>
              <MyNavbar/>
              <div>
                  <h1>Hello world!</h1>
                  <p>If you see this everything is working!</p>
              </div>
              <ul className="left">
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/login">Login</Link>
                  </li>
                  <li>
                      <Link to="/signup">Sign Up</Link>
                  </li>
              </ul>
              <Routes/>
          </main>
  );
}

export default App;
