import { Route, Routes } from "react-router-dom"
import Landing from "../Landing/Landing"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  )
}

export default AppRoutes