
//Dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
//Authentication Guards
import RequireAuth from './components/UI/RequireAuth';
//Pages
import Splash from "./components/Splash";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Inicio from "./components/Inicio";
import New from "./components/New";
import Lista from "./components/Lista";
import RecPass1 from "./components/Recuperacion/RecPass1";
import RecPass2 from "./components/Recuperacion/RecPass2";
import RecPass3 from "./components/Recuperacion/RecPass3";

const Private = ({ children }) => <RequireAuth redirectTo="/login">{children}</RequireAuth>

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/"       element={<Splash/>} />
            <Route path="/login"  element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/restablecer" element={<RecPass1 />} />
            <Route path="/verificacion" element={<RecPass2 />} />
            <Route path="/nuevacontrasena" element={<RecPass3 />} />
            <Route path="/inicio" element={<Private><Inicio /></Private>}/>
            <Route path="/nuevo" element={<Private><New /></Private>} />
            <Route path="/lista" element={<Private><Lista /></Private>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
