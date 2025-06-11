import { Route, Routes } from "react-router-dom";
import Auth from "../src/pages/auth/auth";
import { BrowserRouter } from "react-router-dom";


function App() {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    )
}

export default App;
