// import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { GlobalProvider } from "./utilits/Hooks/General"
// import { Navbar } from "./components/Navbar"

function App() {
  return (
    <GlobalProvider>
      <Outlet />
    </GlobalProvider>
  )
}

export default App
