import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/authContext"
import FooterPages from "./components/FooterPages"
import Navigation from "./components/Navigation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ProtectedRoute } from "../components/ProtectedRoute"
import Home from "./pages/Home"



function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          {/* rotte pubbliche */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


          {/* rotte private */}
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

        </Routes>
        <FooterPages />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
