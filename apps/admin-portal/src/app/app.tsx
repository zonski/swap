// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import {MainLayout} from "./components/layout/layout/MainLayout";
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/home/Home";
import {SearchThings} from "./components/things/SearchThings";
import {ViewThing} from "./components/things/ViewThing";
import {CreateThing} from "./components/things/CreateThing";
import {UpdateThing} from "./components/things/UpdateThing";

export function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/things" element={<SearchThings />} />
        <Route path="/things/create" element={<CreateThing />} />
        <Route path="/things/:thingId" element={<ViewThing />} />
        <Route path="/things/:thingId/edit" element={<UpdateThing />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
