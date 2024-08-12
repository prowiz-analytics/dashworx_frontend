import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import Dash from './Pages/Dash';
import Password from './Pages/Password';
import PasswordPageReset from './Pages/Password';
import Admin from './Pages/Admin';
import Home from './Pages/Home';

// URI OF API
export const API = "https://dashworx.prowiz.io"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          {/* <Route path='/dashboards' element={<Dashboards/>}/> */}
          <Route path='/home' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/dashboard' element={<Dash/>}/>
          <Route path='/resetpassword/:token' element={<PasswordPageReset/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
