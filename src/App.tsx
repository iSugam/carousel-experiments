import { Route, Routes } from "react-router";
import SuperFlowClone from "./SuperFlowClone";
import SwiperJs from "./SwiperJs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SwiperJs />} />

        <Route path="two" element={<SuperFlowClone />} />
      </Routes>
    </>
  );
}

export default App;
