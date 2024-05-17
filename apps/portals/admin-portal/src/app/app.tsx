// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/home/home";
import {SearchThings} from "./components/things/search-things";
import {ViewThing} from "./components/things/view-thing";
import {CreateThing} from "./components/things/create-thing";
import {UpdateThing} from "./components/things/update-thing";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/things" element={<SearchThings />} />
        <Route path="/things/create" element={<CreateThing />} />
        <Route path="/things/:thingId" element={<ViewThing />} />
        <Route path="/things/:thingId/edit" element={<UpdateThing />} />
      </Routes>
    </div>
  );
}

export default App;
