import Login from "./pages/Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from "./pages/Signup"
import SuccessPage from "./pages/SuccessPage"
import Home from "./pages/HomePage"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Signup/>}/>
      <Route path="/success" element={<SuccessPage/>}/>
      <Route path="/home" element={<Home/>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App
