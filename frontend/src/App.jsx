import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import CreateNote from "./Pages/CreateNote"
import NoteDetails from "./Pages/NoteDetails"

const App = () => {
  return <div>
    <div className="absolute inset-0 ">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-note' element={<CreateNote />} />
        <Route path='/note/:id' element={<NoteDetails />} />
      </Routes>
    </div>
  </div>
}
export default App
