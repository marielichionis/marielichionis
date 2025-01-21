import { lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Upload = lazy(() => import("./pages/Upload"));
const Wrapped = lazy(() => import("./pages/Wrapped"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Upload />} />
        <Route path="/Wrapped" element={<Wrapped />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
