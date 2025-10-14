import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/authContext"
import Navigation from "./components/Navigation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ProtectedRoute } from "../components/ProtectedRoute"
import Home from "./pages/Home"
import UserProfile from "./pages/Userprofile"



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

          <Route path='/userProfile' element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
