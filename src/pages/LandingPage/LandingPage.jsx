import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CustomFrames from "../../components/CustomFrames/CustomFrames";
import Products from "../../components/Products/Products";
import Discover from "../../components/Discover/Discover";
import Delivery from "../../components/Delivery/Delivery";
import Reviews from "../../components/Reviews/Reviews";
import Order from "../../components/Order/Order";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";

function LandingPage() {
  return (
    <div>
      <Hero />
      <CustomFrames />
      <Products text={"Products"} />
      <Discover />
      <Products text={"Outlet"} />
      <Delivery />
      <Reviews />
      <Order />
      <Newsletter />
    </div>
  );
}

export default LandingPage;
