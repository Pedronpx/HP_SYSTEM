import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "./PAGES/Home/Home";
import Login from "./PAGES/Login/Login";
import Calculator from "./PAGES/Calculator/Forms";


const Private = ({ Item }) => {
  const { Login } = useAuth();

  return Login > 0 ? <Item /> : <Login/>;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/Home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/Login" element={<Login />} />
          <Route path="*"  element={<Private Item={Calculator} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
