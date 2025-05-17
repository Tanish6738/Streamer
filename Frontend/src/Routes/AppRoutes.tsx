import { Route, Routes } from "react-router-dom"
import Landing from "../Landing/Landing"
import Auth from "../Pages/Auth/Auth"
import Home from "../Pages/Home"
import Profile from "../Pages/Users/Profile"
import Navbar from "../Landing/sections/Navbar"
import Dashboard from "../Pages/Users/Dashboard"
import VideoCreate from "../Pages/Videos/VideoCreate"
import VideoEdit from "../Pages/Videos/VideoEdit"
import VideoPlayer from "../Pages/Videos/VideoPlayer"

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
        <Route path="/videos/create" element={<VideoCreate />} />
        <Route path="/videos/:videoId/edit" element={<VideoEdit />} />
        <Route path="/videos/:videoId" element={<VideoPlayer />} />
      </Routes>
    </>
  )
}

export default AppRoutes