import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import { About } from './components/About';
import NoteSate from './context/notes/NoteState';
import { Alert } from './components/Alert';

function App() {
  return (
    <div className="Container">
      <NoteSate>
        <Router>
          <Navbar />
          <Alert message="This is great"/>
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/home" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </div>
  );
}

export default App;
