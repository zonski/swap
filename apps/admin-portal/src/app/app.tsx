// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React from "react";
import {MainLayout} from "./components/layout/layout/MainLayout";
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/home/Home";
import {SearchThings} from "./components/things/SearchThings";
import {ViewThing} from "./components/things/ViewThing";

export function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/things" element={<SearchThings />} />
        <Route path="/things/:thingId" element={<ViewThing />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
