import Login from "./Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from "./Signup"
import SuccessPage from "./SuccessPage"
import Home from "./HomePage"

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
