import Login from "./Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from "./Signup"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Signup/>}/>


      </Routes>
    </BrowserRouter>
  )
}

export default App
