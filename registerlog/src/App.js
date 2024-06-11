import { Routes ,Route, Navigate} from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Home from './Pages/HomePage/Home';
import Register from './Pages/RegisterPage/Register';
import Email from './Pages/EmailVerify/Email'
import PhoneVerification from './Pages/PhoneVerify/Phone';




const ProtectedRoute = ({ element, roles }) => {
  const user = JSON.parse(sessionStorage.getItem("Existinguser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  return element;
};










function App() {
  return (
    <div className="App">


<Routes>
  <Route path='/' element={<Register></Register>}/>
  <Route  path='/login' element={<Login></Login>}/>
  <Route path='/home' element={<ProtectedRoute roles={["User"]} element={<Home></Home>} />} />
  <Route path='/email' element={<Email></Email>}/>
  <Route path="/phoneVerification" element={<PhoneVerification></PhoneVerification>}></Route>
</Routes> 


 </div>
  );
}

export default App;