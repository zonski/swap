import {Route, Routes} from "react-router-dom";
import {AuthenticationGuard} from "./util/auth/AuthenticatonGuard";
import {MainLayout} from "./components/layout/MainLayout";
import {SearchThings} from "./components/thing/SearchThings";
import {Home} from "./components/home/Home";
import {NotFound} from "./util/not-found/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AuthenticationGuard component={MainLayout}/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/thing">
          <Route path="" element={<SearchThings/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}

export default App
