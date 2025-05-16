import { Route, Routes } from "react-router-dom"
import Landing from "../Landing/Landing"
import Auth from "../Pages/Auth/Auth"
import Home from "../Pages/Home"
import Profile from "../Pages/Users/Profile"
import Navbar from "../Landing/sections/Navbar"
import Dashboard from "../Pages/Users/Dashboard"

const AppRoutes = () => {
  return (
    <>
      <Navbar />


      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  )
}

export default AppRoutes