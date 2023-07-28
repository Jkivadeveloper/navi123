import { Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Wishlist from "./modules/Wishlist";
import Bid from "./modules/Bid";
import Login from "./modules/Login";
import Finance from "./modules/Finance";
import Blog from "./modules/Blog";
import Cars from "./modules/Cars";
import About from "./modules/About";
import Contact from "./modules/Contact";
import Header from './modules/Header';
import Trade from "./modules/Trade/Trade";
import Cart from './modules/Cart';
import HomeDetail from './modules/HomeDetail';
import Orders from "./modules/Orders";
import Order from "./modules/Order";
import User from "./modules/User";

const App = () => {
  return (
    <>
  
 
      <Header />
      <Routes>
      <Route path="order/:id" element={<Order/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="homedetail/:id" element={<HomeDetail />} />
        <Route path="about" element={<About />} />
        <Route path="bid" element={<Bid />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="finance" element={<Finance />} />
        <Route path="trade" element={<Trade />} />
        <Route path="blog" element={<Blog />} />
        <Route path="/" element={<Home />} />
        <Route path="car" element={<Cars />} />
        <Route path="login" element={<Login />} />
        <Route path="user" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
