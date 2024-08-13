import Footer from "./Footer";
import Header from "./Navbar";
import Navbar from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <Header/>
      <Outlet />
      <Footer/>
    </main>
  );
}