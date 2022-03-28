import './App.css';
import Routes from './RoutesAll';
import MyNavbar from "./components/Home/Navbar";

function App() {
    return (
        <main className={"hero"}>
            <MyNavbar/>
            <Routes/>
        </main>
    );
}

export default App;
