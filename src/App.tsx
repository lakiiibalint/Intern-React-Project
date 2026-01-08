import { BrowserRouter as BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Sandbox from './pages/Sandbox'
import Movies from './pages/Movies'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path= "/" element = {<Navigate to = "/movies" replace/>}/>
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/movies" element = {<Movies/>} />
      </Routes>
    </BrowserRouter>
  )
}
