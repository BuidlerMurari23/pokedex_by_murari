
import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  

  return (
   <>
   <div className="Pokedex-wrapper">
            <h1 className="pokedex"><Link to="/" element={<Pokedex />} >Pokedex</Link> </h1>
           <CustomRoutes />
  </div>
   </>
  )
}

export default App
