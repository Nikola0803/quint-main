import React, { useState, useEffect } from "react";
import "./Hero.scss";

function Hero() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://thedarkstarsoft.com/quint/wp-json/wp/v2/pages/51");
        const data = await response.json();
        setHeroData(data.acf.hero_section); // Assuming hero_section is what you want
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="row">
          {heroData && (
            <>
              <div className="col-6">
                <h3>{heroData.hero_title}</h3>
                <p>{heroData.hero_description}</p>
                {/* Render other content using heroData */}
                {/* Example: */}
                {heroData.button_url && (
                  <div className="hero__btns">
                    <button className="btn-colored">Customize your window</button>
                    <button className="btn-white">View Products</button>
                  </div>
                )}
              </div>
              <div className="col-6">
                {/* Render image based on heroData */}
                {heroData.image_right && (
                  <img className="hero__img" src={heroData.image_right} alt="" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
