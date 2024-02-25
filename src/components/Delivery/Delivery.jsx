import React, { useState, useEffect } from "react";
import "./Delivery.scss";
import { Link } from "react-router-dom";

function Delivery() {
  const [boxesData, setBoxesData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [beforeTitle, setBeforeTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://thedarkstarsoft.com/quint/wp-json/wp/v2/pages/51");
        const data = await response.json();
        const boxKeys = Object.keys(data.acf["4_boxes"]);
        // Filter out keys starting with "box_" to get the boxes
        const filteredBoxKeys = boxKeys.filter(key => key.startsWith("box_"));

        const boxes = filteredBoxKeys.map(key => data.acf["4_boxes"][key]);

        setBoxesData(boxes.filter(box => box.title)); // Filtering out boxes without a title
        setSectionTitle(data.acf["4_boxes"].section_title);
        setSectionDescription(data.acf["4_boxes"].section_description);
        setBeforeTitle(data.acf["4_boxes"].before_title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="delivery">
      <div className="container">
        <span>{beforeTitle}</span>
        <h3>{sectionTitle}</h3>
        <p>{sectionDescription}</p>
        <div className="delivery__body row">
          {boxesData.map((box, index) => (
            <div key={index} className="delivery__body__card col-3">
              {/* Render data based on box */}
              <h3>{box.title}</h3>
              <p>{box.description}</p>
              {box.learn_more_url && (
                <Link to={box.learn_more_url}>
                  Learn More <img src={box.icon} alt="" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Delivery;  