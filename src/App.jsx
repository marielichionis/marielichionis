import { lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, createContext, useState } from "react";

export const Year = createContext(null);
export const Data = createContext(null);

const Upload = lazy(() => import("./pages/Upload"));
const Wrapped = lazy(() => import("./pages/Wrapped"));

function App() {
  const [aYear, setYear] = useState(null);
  const [json, setjson] = useState(null);
  const jsonRef = useRef(null);
  jsonRef.current = json;
  const aYearRef = useRef(null);
  aYearRef.current = aYear;

  return (
    <BrowserRouter>
      <Data.Provider value={{ json, setjson }}>
        <Year.Provider value={{ aYear, setYear }}>
          <Routes>
            <Route path="*" element={<Upload />} />
            <Route path="/Wrapped" element={<Wrapped />} />
          </Routes>
        </Year.Provider>
      </Data.Provider>
    </BrowserRouter>
  );
}

export default App;
