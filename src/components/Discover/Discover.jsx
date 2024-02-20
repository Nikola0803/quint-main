import React, { useState, useEffect } from "react";
import "./Discover.scss";

function Discover() {
  const [ctaData, setCtaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://thedarkstarsoft.com/quint/wp-json/wp/v2/pages/51");
        const data = await response.json();
        setCtaData(data.acf.cta_section); // Assuming cta_section is what you want
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="discover">
      <div className="container">
        <div className="discover__body">
          <div className="row">
            {ctaData && (
              <>
                <div className="discover__body__left col-6">
                  {/* Render image based on ctaData */}
                  {ctaData.image_left && (
                    <img src={ctaData.image_left} alt="" />
                  )}
                </div>
                <div className="discover__body__right col-6">
                  <span>{ctaData.cta_above_title}</span>
                  <h3>
                    {ctaData.cta_title}
                  </h3>
                  <p>
                    {ctaData.cta_description}
                  </p>
                  <div className="discover__body__right__btns">
                    {ctaData.shop_now && (
                      <button className="btn-colored">
                        Shop now <img src="{kockicaIcon}" alt="" />
                      </button>
                    )}
                    {ctaData.learn_more_url && (
                      <button className="btn-white">Learn More</button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;