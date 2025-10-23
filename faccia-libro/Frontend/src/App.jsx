import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/authContext"
import Navigation from "./components/Navigation"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ProtectedRoute } from "../components/ProtectedRoute"
import Home from "./pages/Home"
import UserProfile from "./pages/Userprofile"
import Posts from "./components/userProfile/Posts"
import Friends from "./components/userProfile/Friends"
import Galleries from "./components/userProfile/Galleries"
import About from "./components/userProfile/About"



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

          {/* rotta principale del profilo */}
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          >
            {/* sottorotte nidificate */}
            <Route index element={<Posts />} />
            <Route path="posts" element={<Posts />} />
            <Route path="friends" element={<Friends />} />
            <Route path="galleries" element={<Galleries />} />
            <Route path="about" element={<About />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
