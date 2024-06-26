import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.scss";
import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
import { FaChevronDown } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import ruler from "../../assets/clarity_ruler-pencil-line.svg";
import littleWindow from "../../assets/little-window.png";
import Card from "../../components/Card/Card";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutButton from "../../components/Checkout/Checkout.jsx";
import { useCart } from "../../context/CartContext.js";
import { Stage, Layer, Rect, Text } from "react-konva";
import CanvasComponent from "../../components/Canvas/Canvas.jsx";
import SingleFixedCanvasComponent from "../../components/Canvas/SingleFixedCanvas.jsx";
import TwoPartCanvasComponent from "../../components/Canvas/TwoPartCanvasComponent.jsx";
import TrippleCanvasComponent from "../../components/Canvas/TrippleCanvasComponent.jsx";
import EmptyCanvasComponent from '../../components/Canvas/EmptyCanvasComponent.jsx'; 

import {
  AddressElement,
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
function SingleProductPage() {
  const [typeOfWindow, setTypeOfWindow] = useState(); // Set the default value here
  const [openingTypeValue, setOpeningTypeValue] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 7; // Assuming you have 7 steps

  // Define state for selectedColor
  const [selectedColor, setSelectedColor] = useState(null);
  // Define state variables for each row's selected color
  const [selectedCaseColor, setSelectedCaseColor] = useState(null);
  const [selectedWindowColor, setSelectedWindowColor] = useState(null);
  const [selectedCaseColorInside, setSelectedCaseColorInside] = useState(null);
  const [selectedWindowColorInside, setSelectedWindowColorInside] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedOpening, setSelectedOpening] = useState(null);
  const [selectedGlassLayers, setSelectedGlassLayers] = useState(null);
  const [selectedGlassTypes, setSelectedGlassTypes] = useState(null);
  const [selectedHandles, setSelectedHandles] = useState(null);
  const [selectedGrids, setSelectedGrids] = useState(null);
  const [extraSecurity, setSelectedSecurity] = useState(null);
  const [sucess, setSuccess] = useState(false);
  const [fixedDistribution, setFixedDistribution] = useState(""); // State to store the selected fixed distribution
  const [width1, setWidth1] = useState(""); // State to store the width of turn/tilt window in section 1
  const [width2, setWidth2] = useState(""); // State to store the width of fixed glass in section 2
  const [width3, setWidth3] = useState(""); // State to store the width of turn/tilt window in section 3
  const [openingType, setOpeningType] = useState(""); // State to store the selected opening type
  const [errorStringWidth, setErrorStringWidth] = useState("");
  const [errorStringHeight, setErrorStringHeight] = useState("");

  // Function to handle the change in opening type
  const handleOpeningTypeChange = (event) => {
    const { value } = event.target;
    setOpeningType(value);
  };

  // Function to handle the change in fixed distribution
  const handleFixedDistributionChange = (event) => {
    const { value } = event.target;
    setFixedDistribution(value);
  };

  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [minWidth, setMinWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  useEffect(() => {
    setFrameWidth(minWidth);
    setFrameHeight(minHeight);
  }, [minWidth, minHeight]);
  // Function to move to the next step
  function goToNextStep(text) {
    setActiveId(text);
  }
  const [activeId, setActiveId] = useState("step1");

  const handleClick = (clickedId) => {
    setActiveId(clickedId); // Set the active ID
  };
  const [expanded, setExpanded] = useState({
    caseColor: false,
    windowColor: false,
    caseColorInside: false,
    windowColorInside: false
});


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET;
        const response = await fetch(
          `https://thedarkstarsoft.com/quint/wp-json/wc/v3/products/${productId}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${consumerKey}:${consumerSecret}`
              )}`,
            },
          }
        );
        const data = await response.json();

        const meta = data.meta_data;

        const windowTypeMeta = meta.find(m => m.key === "type_of_window");
        if (windowTypeMeta) {
          setTypeOfWindow(windowTypeMeta.value);
        };

        setMinWidth(
          meta.find(
            (m) => m.key === "window_size_frame_width_size__in_mm_minimumwidth"
          )?.value || 0
        );
        setMaxWidth(
          meta.find(
            (m) => m.key === "window_size_frame_width_size__in_mm_maximum_width"
          )?.value || 0
        );
        setMinHeight(
          meta.find(
            (m) => m.key === "window_size_frame_height_size_in_mm_min_height"
          )?.value || 0
        );
        setMaxHeight(
          meta.find(
            (m) => m.key === "window_size_frame_height_size_in_mm_max_height"
          )?.value || 0
        );

        setProduct(data); // Assuming the data is an array with one product
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product data. Please try again later.");
        setLoading(false);
      }
    };

    // Only fetch product if productId is available
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const incrementWidth = () =>
    setFrameWidth((current) => Math.min(current + 10, maxWidth));
  const decrementWidth = () =>
    setFrameWidth((current) => Math.max(current - 10, minWidth));
  const incrementHeight = () =>
    setFrameHeight((current) => Math.min(current + 10, maxHeight));
  const decrementHeight = () =>
    setFrameHeight((current) => Math.max(current - 10, minHeight));

  // Convert mm to cm for both width and height
  const widthInCm = frameWidth / 10;
  const heightInCm = frameHeight / 10;
  const firstWindow = 10;
  const secondWindow = 10;
  const middleWindowWidth = 10;
  const outerWindowWidths = 10;
  const windowHeight = 10;
  // Calculate the total length in cm (assuming linear calculation means perimeter for a rectangle)
  // Vertical windows - it has 1/3 proportion for the fixed window down or up. Opening side is always 2/3 iffixedratios/.Minimum200

  let totalLengthInCm;

  switch (typeOfWindow) {
    case "Tripple Openings":
      totalLengthInCm = ((8 * heightInCm) + (widthInCm * 2) + ((2 * width1)/10 + (2 * width3)/10));
      break;
    case "Tripple Single Opening":
      totalLengthInCm = 6 * heightInCm + widthInCm * 2 + 2 * middleWindowWidth + 4 * outerWindowWidths;
      break;
    case "Tripple Fixed":
      totalLengthInCm = 4 * heightInCm + widthInCm * 2;
      break;
    case "Two Openings":
      totalLengthInCm = 7 * heightInCm + widthInCm * 2 + 2 * firstWindow + 2 * secondWindow;
      break;
    case "Two Part Opening All":
      totalLengthInCm = 6 * heightInCm + widthInCm * 2 + 2 * firstWindow + 2 * secondWindow;
      break;
    case "Two Part Opening One":
      totalLengthInCm = 5 * heightInCm + widthInCm * 2 + 2 * firstWindow + 2 * secondWindow;
      break;
    case "Two Part Fixed":
      totalLengthInCm = 3 * heightInCm + widthInCm * 2;
      break;
    case "Single Opening":
      totalLengthInCm = (4 * heightInCm) + (widthInCm * 4);
      break;
    case "Single Fixed":
      totalLengthInCm = (2 * heightInCm) + (widthInCm * 2);
      break;
    case "Vertical Fixed":
      totalLengthInCm = 2 * heightInCm + widthInCm * 3;
      break;
    case "Vertical Fixed Tripple":
      totalLengthInCm = 2 * heightInCm + widthInCm * 4;
      break;
    case "Vertical Bottom":
      totalLengthInCm = 2 * heightInCm + widthInCm * 3 + 2 * windowHeight;
      break;
    case "Vertical Top":
      totalLengthInCm = 2 * heightInCm + widthInCm * 5 + 2 * windowHeight;
      break;
    default:
      totalLengthInCm = 0; // Set default value if window type is not recognized
  }

//   const windowCalculations = {
//     "Tripple Openings": ((8 * heightInCm) + (widthInCm * 2) + ((2 * width1)/10 + (2 * width3)/10)),
//     "Tripple Single Opening": 6 * heightInCm + widthInCm * 2 + 2 * middleWindowWidth + 4 * outerWindowWidths,
//     // Add more window types and their calculations as needed
// };

//   let totalLengthInCm = windowCalculations[typeOfWindow] || 0;


  // Assuming selectedColor.color_price is a string, convert it to number
  const colorPrice = selectedColor
    ? Number(selectedColor["color_price_in_percent"] || 0)
    : 0;

  // Convert color price to number for selected case color
const caseColorPrice = selectedCaseColor
? Number(selectedCaseColor["color_price_in_percent"] || 0)
: 0;

// Convert color price to number for selected window color
const windowColorPrice = selectedWindowColor
? Number(selectedWindowColor["color_price_in_percent"] || 0)
: 0;

// Convert color price to number for selected case color inside
const caseColorInsidePrice = selectedCaseColorInside
? Number(selectedCaseColorInside["color_price_in_percent"] || 0)
: 0;

// Convert color price to number for selected window color inside
const windowColorInsidePrice = selectedWindowColorInside
? Number(selectedWindowColorInside["color_price_in_percent"] || 0)
: 0;
  const profitMaragin = 2;
  const price_per_sqm = (heightInCm * widthInCm) / 10000;
  const profilePrice = Number(selectedProfile?.profile_price ?? 0) / 100;
  const pricePerCm = profilePrice;
  const glassLayerPrice = Number(selectedGlassLayers?.price_per_sqm ?? 0) * price_per_sqm;
  const glassPrice = glassLayerPrice * price_per_sqm;
  const handlePrice = Number(selectedHandles?.price_of_handle ?? 0);
  const gridPrice = Number(selectedGrids?.price_of_ventilation_grid ?? 0);
  // const securityPrice =  Number(selectedSecurity?.price_of_extra_security ?? 0);
  // const calc = glassLayerPrice + handlePrice + gridPrice + securityPrice;
  const calc = glassLayerPrice + handlePrice + gridPrice;
  const gridNewPrice = gridPrice * widthInCm;
  const dimensionPrice = totalLengthInCm * pricePerCm;
  // const totalPriceBeforeVAT = dimensionPrice + (dimensionPrice/colorPrice) + calc;
  const totalPriceBeforeVAT = dimensionPrice + calc;
  const colorCaseMain = totalPriceBeforeVAT * (10/100);
  const colorCase = totalPriceBeforeVAT * (parseFloat(caseColorPrice)/100); // aadded /100 to calculate 10% for example
  const colorWindow = totalPriceBeforeVAT * (parseFloat(windowColorPrice)/100); // aadded /100 to calculate 10% for example
  const colorCaseInsidenside = totalPriceBeforeVAT * (parseFloat(caseColorInsidePrice)/100); // aadded /100 to calculate 10% for example
  const colorWindowInside = totalPriceBeforeVAT * (parseFloat(windowColorInsidePrice)/100); // aadded /100 to calculate 10% for example
  const colorAllSides = colorCase + colorWindow + colorCaseInsidenside + colorWindowInside;
  const fallBackPriceColors = totalPriceBeforeVAT * (10/100);

  const VAT_RATE = 0.21; // 21%
  const vat = totalPriceBeforeVAT * VAT_RATE;

  
  const glassTypePrice = selectedGlassTypes * price_per_sqm;

  // const openingPrice = selectedOpening?.price_of_handle;

  const totalPriceIncludingVAT = totalPriceBeforeVAT + vat;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  // Correctly prepare images for ImageGallery

  const images = product.images.map((img) => ({
    original: img.src,
    thumbnail: img.src, // Assuming each image object has a src property
  }));

  const fetchBackend = async () => {
    const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
    const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET;
    const auth = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
    const productConfig = {
      product_id: productId,
      custom_price: totalPriceIncludingVAT,
      items: {
        // Example custom fields
        color_selection: selectedColor?.color_name,
        glass_layers: selectedGlassLayers?.price_per_sqm,
        glass_type: selectedGlassTypes?.color_of_glass,
        handle: selectedHandles?.name_of_handle,
        profile: selectedProfile?.profile_name,
        ventilation_grid: selectedGrids?.name_of_ventilation_grid,
        window_size: { width: frameWidth, height: frameHeight },
         // Add the missing options here
         case_color: selectedCaseColor?.color_name,
         window_color: selectedWindowColor?.color_name,
         case_color_inside: selectedCaseColorInside?.color_name,
         window_color_inside: selectedWindowColorInside?.color_name,
      },
    };

    try {
      // First request to create an order
      const orderResponse = await fetch(
        "https://thedarkstarsoft.com/quint/wp-json/custom/v1/create-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify(productConfig),
        }
      );
      if (!orderResponse.ok) throw new Error("Failed to create order.");

      const orderData = await orderResponse.json();
      const orderId = orderData.order_id;

      // Second request to prepare the payment intent
      const paymentResponse = await fetch(
        "https://thedarkstarsoft.com/quint/wp-json/custom/v1/prepare-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({ order_id: orderId }),
        }
      );
      if (!paymentResponse.ok)
        throw new Error("Failed to prepare payment intent.");

      const paymentData = await paymentResponse.json();
      return paymentData?.clientSecret;
    } catch (error) {
      console.error("Error:", error.message);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51OjiJRAgVqMLdvyKEDiUCfTwAU4eVazBSDEGvwK5Ce2a20lvKlf8RKqsXe7ZlX5o9JCxl7yhIngvoWAZKsw0MFvZ00R93r14k2"
  );

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
      // Define your productConfig here or ensure it's available in this scope
      const productConfig = {
        product_id: product?.id,
        custom_price: totalPriceIncludingVAT?.toFixed(2),
        items: {
          /* Your item details */
          // Example custom fields
          color_selection: selectedColor?.color_name,
          glass_layers: selectedGlassLayers?.price_per_sqm,
          glass_type: selectedGlassTypes?.color_of_glass,
          handle: selectedHandles?.name_of_handle,
          profile: selectedProfile?.profile_name,
          ventilation_grid: selectedGrids?.name_of_ventilation_grid,
          window_size: { width: frameWidth, height: frameHeight },
          case_color: selectedCaseColor?.color_name,
          window_color: selectedWindowColor?.color_name,
          case_color_inside: selectedCaseColorInside?.color_name,
          window_color_inside: selectedWindowColorInside?.color_name,
        },
      };

      addToCart(productConfig);
    };
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }
      var addressElement = elements.getElement("address");

      addressElement.getValue().then(async function (address) {
        if (address.complete) {
          const clientSecret = await fetchBackend(); // Ensure this fetches the PaymentIntent client secret

          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: address.value.name, // You can replace 'Customer Name' with the actual name of the customer
                email: "customer@example.com", // You can replace 'customer@example.com' with the actual email of the customer
                address: {
                  city: address.value.address.city,
                  country: address.value.address.country,
                  line1: address.value.address.line1,
                  line2: address.value.address.line2,
                  postal_code: address.value.address.postal_code,
                  state: address.value.address.state,
                },
              },
            },
          });

          if (result.error) {
            console.log(result.error.message);
          } else {
            if (
              result.paymentIntent &&
              result.paymentIntent.status === "succeeded"
            ) {
              console.log("Payment successful");
              // Redirect or update UI upon successful payment
              setSuccess(true);
            }
          }
        }
      });
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <AddressElement options={{ mode: "billing" }} />
          <button
            disabled={!stripe}
            style={{ backgroundColor: sucess ? "green" : "" }}
            className="btn-colored"
          >
            {sucess ? "Successfully ordered" : "Order this frame"}
          </button>
        </form>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </>
    );
  };

  const two = () => {
    return (
      <>
        {product?.acf?.profile &&
          product?.acf?.profile.map((profile, index) => (
            <div
              key={index}
              className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                selectedProfile?.profile_name === profile?.profile_name
                  ? "selected"
                  : ""
              }`}
              onClick={() => setSelectedProfile(profile)}
            >
              <img
                src={profile?.profile_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
                alt={profile?.profile_name || "Profile Image"}
                onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} // Replace '' with actual path
              />
              <div>
                <p>{profile?.profile_name}</p>
              </div>
            </div>
          ))}
      </>
    );
  };

  const three = () => {
       // Assuming 'product?.acf?.glass_layers' is the correct path to the glass layers data
   const glassLayers = product?.acf?.glass_layers || [];

   return (
     <>
       {glassLayers.map((glassLayer, index) => (
         <div
           key={index}
           className={`single-product-page__customize__left__option-holder__option__body__color-option ${
             selectedGlassLayers?.price_per_sqm === glassLayer.price_per_sqm
               ? "selected"
               : ""
           }`}
           onClick={() => setSelectedGlassLayers(glassLayer)}
         >
           <img
             src={glassLayer.glass_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
             alt={`Glass layer ${index + 1}`}
             onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} // Provide a fallback image path
           />
           <div>
             <p>{glassLayer.glass_type}</p>
             <p>€{glassLayer.price_per_sqm || "N/A"}</p>
           </div>
         </div>
       ))}
     </>
   );
  };
  
  const Four = ({ width1, width2, width3, fixedDistribution, handleFixedDistributionChange, activeId, widthInCm }) => {
    const [value, setValue] = useState('')
    const handleInputChange = (event, inputName) => {
      const newValue = event.target.value;
      // You can handle the input change here, for example, updating state
      switch (inputName) {
        case "width1":
          setWidth1(newValue);
          break;
        case "width2":
          // Handle width2 input change if needed
          break;
        case "width3":
          setWidth3(newValue);
          break;
        default:
          break;
      }
    };
    
  <Four
    width1={width1}
    width2={width2}
    width3={width3}
    fixedDistribution={fixedDistribution}
    handleFixedDistributionChange={handleFixedDistributionChange}
    activeId={activeId}
    widthInCm={widthInCm}
    handleInputChange={handleInputChange} // Pass the handleInputChange function
  />
  
    // Function to determine the value for width2 input
    const getWidth2Value = () => {
        switch (fixedDistribution) {
            case "1:1:1":
                return widthInCm / 3; // Set width2 to one-third of widthInCm
            case "1:2:1":
                return (widthInCm - width1 - width3) / 2;
            case "Manual":
                return width2;
            default:
                return "";
        }
    };
  
    useEffect(() => {
      setValue(getWidth2Value())
    }, [fixedDistribution])
  
    return (
        <div>
            <div className={`single-product-page__customize__left__option-holder__option__body ${activeId === "step4" ? "" : "d-none"}`}>
                {/ Fixed distribution /}
                <div className="option">
                    <label htmlFor="fixedDistribution">Fixed Distribution:</label>
                    <select
                        id="fixedDistribution"
                        value={fixedDistribution}
                        onChange={handleFixedDistributionChange}
                    >
                        <option value="">Select Fixed Distribution</option>
                        <option value="1:1:1">1:1:1</option>
                        <option value="1:2:1">1:2:1</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>
    
                {/ Width inputs /}
                <div className="option">
                    <label htmlFor="width1" className="left-widths">
                        Width of turn/tilt window (inward opening) in section 1 (in mm):
                        <span><br />(Calculated automatically)</span>
                    </label>
                    <input
                        type="number"
                        id="width1"
                        value={fixedDistribution === "1:1:1" ? widthInCm / 3 : width1} // Set width1 to one-third of widthInCm if 1:1:1 is selected
                        onChange={(event) => handleInputChange(event, "width1")}
                        disabled={fixedDistribution !== "Manual"}
                    />
                </div>
    
                <div className="option">
                    <label htmlFor="width3" className="left-widths">
                        Width of turn/tilt window (inward opening) in section 3 (in mm):
                        <span><br />(Calculated automatically)</span>
                    </label>
                    <input
                        type="number"
                        id="width3"
                        value={fixedDistribution === "1:1:1" ? widthInCm / 3 : width3} // Set width3 to one-third of widthInCm if 1:1:1 is selected
                        onChange={(event) => handleInputChange(event, "width3")}
                        disabled={fixedDistribution !== "Manual"}
                    />
                </div>
    
                <div className="option">
                    <label htmlFor="width2" className="left-widths">
                        Width of fixed glass in section 2 (in mm):
                        <span><br />(Calculated automatically)</span>
                    </label>
                    <input
                        type="number"
                        id="width2"
                        value={value} // Assign calculated value here
                        readOnly
                        disabled={fixedDistribution !== "Manual"}
                    />
                </div>
            </div>
        </div>
    );
  };
  
function five() {
    // Check if product exists and has color data
    if (!product ||
        !product.acf ||
        !product.acf.colors ||
        product.acf.colors.length === 0) {
        return <p>No color data available</p>;
    }

    // Function to toggle the visibility of color options
    const toggleColorOptions = (option) => {
        const container = document.getElementById(option);
        container.classList.toggle('expanded');
    };

    // Extract case_color, window_color, case_color_inside, and window_color_inside options from the API response
    const caseColorOptions = product.acf.colors.flatMap(
        (category) => category.case_color || []
    );
    const windowColorOptions = product.acf.colors.flatMap(
        (category) => category.window_color || []
    );
    const caseColorInsideOptions = product.acf.colors.flatMap(
        (category) => category.case_color_inside || []
    );
    const windowColorInsideOptions = product.acf.colors.flatMap(
        (category) => category.window_color_inside || []
    );

    // Check if there are no options available for any of the colors
    if (
        caseColorOptions.length === 0 &&
        windowColorOptions.length === 0 &&
        caseColorInsideOptions.length === 0 &&
        windowColorInsideOptions.length === 0
    ) {
        return <p>No color data available</p>;
    }

    // JSX rendering
    return (
        <>
            <div className="color-options-container-main">
                {/* Case Color Option */}
                <div className="color-options-container" onClick={() => toggleColorOptions('caseColor')}>
                    <h5>Case Color</h5>
                    <div className="color-options-inner" id="caseColor">
                        {caseColorOptions.map((colorOption, index) => (
                            <div
                                key={index}
                                className={`single-product-page__customize__left__option-holder__option__body__color-option ${selectedColor?.color_name === colorOption.color_name
                                    ? "selected"
                                    : ""}`}
                                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
                            >
                                <img
                                    src={colorOption.color_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
                                    alt={colorOption.color_name}
                                    onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} />
                                <div>
                                    <p>{colorOption.color_name}</p>
                                    <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Window Color Option */}
                <div className="color-options-container" onClick={() => toggleColorOptions('windowColor')}>
                    <h5>Window Color</h5>
                    <div className="color-options-inner" id="windowColor">
                        {windowColorOptions.map((colorOption, index) => (
                            <div
                                key={index}
                                className={`single-product-page__customize__left__option-holder__option__body__color-option ${selectedColor?.color_name === colorOption.color_name
                                    ? "selected"
                                    : ""}`}
                                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
                            >
                                <img
                                    src={colorOption.color_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
                                    alt={colorOption.color_name}
                                    onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} />
                                <div>
                                    <p>{colorOption.color_name}</p>
                                    <p>{colorOption.color_price_in_percent || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Case Color Inside Option */}
                <div className="color-options-container" onClick={() => toggleColorOptions('caseColorInside')}>
                    <h5>Case Color Inside</h5>
                    <div className="color-options-inner" id="caseColorInside">
                        {caseColorInsideOptions.map((colorOption, index) => (
                            <div
                                key={index}
                                className={`single-product-page__customize__left__option-holder__option__body__color-option ${selectedColor?.color_name === colorOption.color_name
                                    ? "selected"
                                    : ""}`}
                                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
                            >
                                <img
                                    src={colorOption.color_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
                                    alt={colorOption.color_name}
                                    onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} />
                                <div>
                                    <p>{colorOption.color_name}</p>
                                    <p>{colorOption.color_price_in_percent || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Window Color Inside Option */}
                <div className="color-options-container" onClick={() => toggleColorOptions('windowColorInside')}>
                    <h5>Window Color Inside</h5>
                    <div className="color-options-inner" id="windowColorInside">
                        {windowColorInsideOptions.map((colorOption, index) => (
                            <div
                                key={index}
                                className={`single-product-page__customize__left__option-holder__option__body__color-option ${selectedColor?.color_name === colorOption.color_name
                                    ? "selected"
                                    : ""}`}
                                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
                            >
                                <img
                                    src={colorOption.color_image?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
                                    alt={colorOption.color_name}
                                    onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")} />
                                <div>
                                    <p>{colorOption.color_name}</p>
                                    <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

  const six = () => {
    const handles = product?.acf?.handle || [];

    return (
      <>
        {handles.map((handle, index) => (
          <div
            key={index}
            className={`single-product-page__customize__left__option-holder__option__body__color-option ${
              selectedHandles?.name_of_handle === handle.name_of_handle
                ? "selected"
                : ""
            }`}
            onClick={() => setSelectedHandles(handle)}
          >
            <img
              src={handle.image_of_handle?.url || "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png"}
              alt={handle.name_of_handle}
              onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")}
            />
            <div>
              <p>{handle.name_of_handle}</p>
              <p>Included</p>{" "}
              {/* Assuming price_of_handle exists and you want to display it */}
            </div>
          </div>
        ))}
      </>
    );
  };

  const seven = () => {
    // Directly using 'product?.acf?.glass_type' based on the API structure provided
    const glassTypes = product?.acf?.glass_type || [];

    return (
      <>
        {glassTypes.map((glassType, index) => (
          <div
            key={index}
            className={`single-product-page__customize__left__option-holder__option__body__color-option ${
              selectedGlassTypes?.color_of_glass === glassType.color_of_glass
                ? "selected"
                : ""
            }`}
            onClick={() => setSelectedGlassTypes(glassType)}
          >
            <div>
              <p>{glassType.color_of_glass}</p>
            </div>
          </div>
        ))}
      </>
    );
  };

  const eight = () => {
    const ventilationGrids = product?.acf?.ventilation_grid || [];

    return (
      <>
        {ventilationGrids.map((grid, index) => (
          <div
            key={index}
            className={`single-product-page__customize__left__option-holder__option__body__color-option ${
              selectedGrids?.choose_ventilation_grid ===
              grid.choose_ventilation_grid
                ? "selected"
                : ""
            }`}
            onClick={() => setSelectedGrids(grid)}
          >
            {/* Assuming there's an image and a name associated with each grid, which might need adjustment */}
            <img
              src={grid.image_of_ventilation_grid?.url || ""}
              alt={`Ventilation Grid ${index + 1}`}
              onError={(e) => (e.target.src = "https://thedarkstarsoft.com/quint/wp-content/uploads/woocommerce-placeholder.png")}
            />
            <div>
              <p>{`Ventilation Grid ${index + 1}`}</p>
              <p>€{grid.price_of_ventilation_grid}</p>
            </div>
          </div>
        ))}
      </>
    );
  };

  const Input = ({ stepNumber, nextStep, map, text }) => {
    return (
      <div
        className={`single-product-page__customize__left__option-holder__option ${
          activeId === `step${stepNumber}` ? "top-active" : ""
        }`}
        id={`step${stepNumber}`}
      >
        <div
          className={`single-product-page__customize__left__option-holder__option__top ${
            activeId === `step${stepNumber}`
              ? "single-product-page__customize__left__option-holder__option__top-active"
              : ""
          }`}
          onClick={() => handleClick(`step${stepNumber}`)}
        >
          <h3>{text}</h3>
          <span>
            <FaChevronDown
              color={activeId === `step${stepNumber}` ? "white" : "black"}
            />
          </span>
        </div>
        <div
          className={`single-product-page__customize__left__option-holder__option__body ${
            activeId !== `step${stepNumber}` ? "d-none" : ""
          }`}
        >
          {map()}
        </div>
        <div className="single-product-page__customize__left__option-holder__option__btn-wrapper">
          <button
            className={`btn-colored ${
              activeId !== `step${stepNumber}` ? "d-none" : ""
            }`}
            onClick={() => goToNextStep(nextStep)}
          >
            Go to next step <FaTurnDown />
          </button>
        </div>
      </div>
    );
  };

  const newFn = (e, target) => {
    if (target === 'width3') {
      setWidth3(e.target.value)
      setWidth2((widthInCm * 10 - width1 - Number(e.target.value)))
    } else {
      setWidth1(e.target.value)
      setWidth2((widthInCm * 10 - Number(e.target.value)) - width3)
    }
  }
  return (
    <div className="single-product-page">
      <div className="container">
        <div className="single-product-page__header">
          <div className="single-product-page__header__top">
            <span>
              Browse All <FaChevronRight /> Frames <FaChevronRight />{" "}
              <h5> Wooden Frames</h5>
            </span>
          </div>
          <div className="single-product-page__header__body justify-content-between row">
            <div className="col-6">
              {images?.length > 0 ? (
                <ImageGallery
                  items={images}
                  showNav={false}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  thumbnailPosition="left"
                />
              ) : (
                <p>No images for this product</p>
              )}
            </div>
            <div className="col-6">
              <div className="single-product-page__header__body__card">
                <h3>{product.name}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></p>
                <div className="single-product-page__header__body__card__price">
                  <span>Price From</span>
                  <p>
                    {product.regular_price}
                    <span>/ excl. VAT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-product-page">
          <div className="container">
            <div className="single-product-page__customize row justify-content-between">
              <div className="single-product-page__customize__left col-6 ">
                <h3>Customize windows frame</h3>
                <div className="single-product-page__customize__left__option-holder">
                  {/* Render content based on current step */}

                  <div>
                    <div
                      className={`single-product-page__customize__left__option-holder__option ${
                        activeId === `step${currentStep}` ? "top-active" : ""
                      }`}
                      id={"step1"}
                    >
                      <div
                        className={`single-product-page__customize__left__option-holder__option__top ${
                          activeId === "step1"
                            ? "single-product-page__customize__left__option-holder__option__top-active"
                            : ""
                        }`}
                        onClick={() => handleClick("step1")}
                      >
                        <h3>Choose Dimentions</h3>
                        <span>
                          <FaChevronDown
                            color={activeId === "step1" ? "white" : "black"}
                          />
                        </span>
                      </div>
                      {errorStringWidth &&
                        activeId === `step${currentStep}` && (
                          <p style={{ color: "red" }}>{errorStringWidth}</p>
                        )}

                      <div
                        className={`single-product-page__customize__left__option-holder__option__input-wrapper ${
                          activeId !== "step1" ? "d-none" : ""
                        }`}
                      >
                        <div className="single-product-page__customize__left__option-holder__option__input-wrapper__title">
                          <h3>Frame Width size (in mm)</h3>
                          <p>
                            Min: {minWidth} mm | Max: {maxWidth} mm
                          </p>
                        </div>

                        <div
                          className="single-product-page__customize__left__option-holder__option__input-wrapper__input"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                          type="number"
                          value={frameWidth}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (newValue < minWidth || newValue > maxWidth) {
                              setErrorStringWidth(
                                newValue > maxWidth
                                  ? "It's higher than " + maxWidth
                                  : "It's lower than " + minWidth
                              );
                              setFrameWidth(newValue);
                            } else {
                              setErrorStringWidth("");
                              setFrameWidth(newValue);
                            }
                          }}
                          placeholder="Number"
                          style={{ textAlign: "center" }}
                        />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "10px",
                            }}
                          >
                            <button
                              onClick={incrementWidth}
                              className="dimension-adjust-button"
                            >
                              <CiCirclePlus size={30} color="A31332" />
                            </button>
                            <button
                              onClick={decrementWidth}
                              className="dimension-adjust-button"
                            >
                              <CiCircleMinus size={30} color="A31332" />
                            </button>
                          </div>
                          <span>
                              {errorStringWidth ? (
                                <FaTimes color="red" />
                              ) : (
                                <FaCheck color="green" />
                              )}
                              mm
                          </span>
                        </div>
                      </div>
                      {errorStringHeight &&
                        activeId === `step${currentStep}` && (
                          <p style={{ color: "red" }}>{errorStringHeight}</p>
                        )}
                      <div
                        className={`single-product-page__customize__left__option-holder__option__input-wrapper ${
                          activeId !== "step1" ? "d-none" : ""
                        }`}
                      >
                        <div className="single-product-page__customize__left__option-holder__option__input-wrapper__title">
                          <h3>Frame Height size (in mm)</h3>
                          <p>
                            Min: {minHeight} mm | Max: {maxHeight} mm
                          </p>
                        </div>

                        <div
                          className="single-product-page__customize__left__option-holder__option__input-wrapper__input"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                        type="number"
                        value={frameHeight}
                        onChange={(e) => {
                          const newValue = parseInt(e.target.value);
                          if (newValue < minHeight || newValue > maxHeight) {
                            setErrorStringWidth(
                              newValue > maxWidth
                                ? "It's higher than " + maxHeight
                                : "It's lower than " + minHeight
                            );
                            setFrameHeight(newValue);
                          } else {
                            setErrorStringHeight("");
                            setFrameHeight(newValue);
                          }
                        }}
                        placeholder="Number"
                        style={{ textAlign: "center" }}
                      />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "10px",
                            }}
                          >
                            <button
                              onClick={() =>
                                setFrameHeight((prevHeight) =>
                                  Math.min(Number(prevHeight) + 1, maxHeight)
                                )
                              }
                              className="dimension-adjust-button"
                            >
                              <CiCirclePlus size={30} color="A31332" />
                            </button>
                            <button
                              onClick={() =>
                                setFrameHeight((prevHeight) =>
                                  Math.max(Number(prevHeight) - 1, minHeight)
                                )
                              }
                              className="dimension-adjust-button"
                            >
                              <CiCircleMinus size={30} color="A31332" />
                            </button>
                          </div>
                          <span>
                          {errorStringWidth ? (
                            <FaTimes color="red" />
                          ) : (
                            <FaCheck color="green" />
                          )}
                          mm
                        </span>
                        </div>
                      </div>
                      {currentStep > 1 ? (
                        ""
                      ) : (
                        <div className="single-product-page__customize__left__option-holder__option__btn-wrapper">
                      <button
                          className={`btn-colored ${
                            activeId !== "step1" ? "d-none" : ""
                          }`}
                          onClick={() => {
                            if (!errorStringWidth) {
                              goToNextStep("step2");
                            }
                          }}
                          disabled={errorStringWidth ? true : false} // Disable the button if there's an error
                          style={{ opacity: errorStringWidth ? 0.5 : 1 }} // Optionally, change opacity when disabled
                        >
                          Go to next step <FaTurnDown />
                        </button>
                        </div>
                      )}
                    </div>

                    <Input
                      stepNumber={2}
                      nextStep={"step3"}
                      map={two}
                      text={"Choose Profile"}
                    />

                    <Input
                      stepNumber={3}
                      nextStep={"step4"}
                      map={three}
                      text={"Choose Glass"}
                    />

<div className={`single-product-page__customize__left__option-holder__option ${activeId === `step${4}` ? "top-active" : ""}`} id={`step${4}`}>
      <div className={`single-product-page__customize__left__option-holder__option__top ${activeId === `step${4}` ? "single-product-page__customize__left__option-holder__option__top-active" : ""}`} onClick={() => handleClick(`step${4}`)}>
        <h3>{"Plane Division"}</h3>
        <span>
          <FaChevronDown color={activeId === `step${4}` ? "white" : "black"} />
        </span>
      </div>
      <div className={`single-product-page__customize__left__option-holder__option__body ${activeId !== `step${4}` ? "d-none" : ""}`}>
        <div className={`single-product-page__customize__left__option-holder__option__body ${activeId === "step4" ? "" : "d-none"}`}>
          {/* Fixed distribution */}
          <div className="option">
            <label htmlFor="fixedDistribution">
              Fixed Distribution:
            </label>
            <select
              id="fixedDistribution"
              value={fixedDistribution}
              onChange={handleFixedDistributionChange}
            >
              <option value="">
                Select Fixed Distribution
              </option>
              <option value="1:1:1">1:1:1</option>
              <option value="1:2:1">1:2:1</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          {/* Width inputs */}
          <div className="option">
            <label htmlFor="width1" className="left-widths">
              Width of turn/tilt window (inward opening) in
              section 1 (in mm):
              <span>
                <br />
                (Calculated automatically)
              </span>
            </label>
            <input
              type="number"
              id="width1"
              value={width1}
              onChange={(event) => newFn(event, 'width1')}
              disabled={fixedDistribution !== "Manual"}
            />
          </div>

          <div className="option">
            <label htmlFor="width2" className="left-widths">
              Width of fixed glass in section 2 (in mm):
              <span>
                <br />
                (Calculated automatically)
              </span>
            </label>
            <input
              type="number"
              id="width2"
              value={width2}
              onChange={(event) => setWidth2(event.target.value)}
              disabled
            />
          </div>

          <div className="option">
            <label htmlFor="width3" className="left-widths">
              Width of turn/tilt window (inward opening) in
              section 3 (in mm):
              <span>
                <br />
                (Calculated automatically)
              </span>
            </label>
            <input
              type="number"
              id="width3"
              value={width3}
              onChange={(event) => newFn(event, 'width3')}
              disabled={fixedDistribution !== "Manual"}
            />
          </div>
        </div>
      </div>
      <div className="single-product-page__customize__left__option-holder__option__btn-wrapper">
        <button className={`btn-colored ${activeId !== `step${4}` ? "d-none" : ""}`} onClick={() => goToNextStep("step5")}>
          Go to next step <FaTurnDown />
        </button>
      </div>
    </div>

                    <Input
                      stepNumber={5}
                      nextStep={"step6"}
                      map={six}
                      text={"Handle"}
                    /> 

                    <Input
                      stepNumber={6}
                      nextStep={"step7"}
                      map={five}
                      text={"Choose Color"}
                    />

                    {/* <Input
                      stepNumber={6}
                      nextStep={"step7"}
                      map={six}
                      text={"Handle"}
                    /> */}

                    <Input
                      stepNumber={7}
                      nextStep={"step8"}
                      map={seven}
                      text={"Upsells"}
                    />
                    <Input
                      stepNumber={8}
                      nextStep={"step1"}
                      map={eight}
                      text={"Ventilation grid"}
                    />
                  </div>
                </div>
              </div>

              {/* Right section might stay static or change based on your design */}
              <div className="single-product-page__customize__right col-6">
                <h3>Customize windows frame</h3>
                <div className="single-product-page__customize__right__product">
                  <div className="single-product-page__customize__right__product__top">
                    {/* Assuming there's an image to display */}
                    {typeOfWindow === "Single Opening" && !errorStringWidth && (
                      <CanvasComponent width={widthInCm} height={heightInCm} />
                    )}
                    {typeOfWindow === "Single Fixed" && !errorStringWidth && (
                      <SingleFixedCanvasComponent width={widthInCm} height={heightInCm} />
                    )}
                    {typeOfWindow === "Two Opening" && !errorStringWidth && (
                      <TwoPartCanvasComponent width={widthInCm} height={heightInCm} />
                    )}
                    {typeOfWindow === "Two Openings" && !errorStringWidth && (
                      <TwoPartCanvasComponent
                        width={widthInCm}
                        height={heightInCm}
                      />
                    )}
                    {typeOfWindow === "Tripple Openings" && !errorStringWidth && (
                      <TrippleCanvasComponent
                        width={widthInCm}
                        height={heightInCm}
                        fixedDistribution={fixedDistribution}
                        width1={parseInt(width1) / 10} // Divide width1 by 10
                        width3={parseInt(width3) / 10} // Divide width3 by 10
                        width2={(parseInt(widthInCm) - (parseInt(width1) + parseInt(width3)) / 10 )}
                        />
                    )}
                    {typeOfWindow === "Tripple Openings" && errorStringWidth && (
                      <EmptyCanvasComponent canvasWidth={700} canvasHeight={500} />
                    )}
                  </div>
                  <div className="single-product-page__customize__right__product__body">
                    <div className="single-product-page__customize__right__product__body__option__mid">
                      <h3>Price total:</h3>
                      <h3>€{totalPriceBeforeVAT.toFixed(2)}</h3>
                    </div>
                    {/* Displaying the input values and calculated price for dimensions */}
                    {/* <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>1</span>
                        <p>
                          {frameWidth || frameHeight
                            ? `Width & Height in mm: ${frameWidth}/${frameHeight}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {frameWidth || frameHeight
                            ? `Width & Height in mm: ${frameWidth}/${frameHeight}`
                            : "Selected option"}
                        </p>
                        <p>
                          €{selectedColor ? totalLengthInCm.toFixed(2) : "0"}
                        </p>
                      </div>
                    </div> */}

                    {/* Displaying the selected color option and its price */}
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>1</span>
                        <p>
                          {selectedProfile
                            ? `Profile: ${selectedColor?.profile_name}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedProfile
                            ? `Selected Profile: ${selectedProfile?.profile_name}`
                            : "Selected option"}
                        </p>
                        <p>
                          €
                          {selectedProfile? dimensionPrice.toFixed(2) : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>2</span>
                        <p>
                          {selectedGlassLayers ? `Glass Layer` : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedGlassLayers
                            ? `Selected Glass Layer: Double/Triple Glazing`
                            : "Selected option"}
                        </p>
                        <p>
                          €
                          {selectedGlassLayers ? glassLayerPrice.toFixed(2) : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>3</span>
                        <p>
                          {selectedHandles
                            ? `Handle: ${selectedHandles?.name_of_handle}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedHandles
                            ? `Selected Handle: ${selectedHandles?.name_of_handle}`
                            : "Selected option"}
                        </p>
                        <p>Included</p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                    <div className="single-product-page__customize__right__product__body__option__top">
                      <span>4</span>
                      <p>
                        {selectedColor
                          ? `Color: ${selectedColor.color_name}`
                          : "Option name"}
                      </p>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option__mid">
                      <p>
                        {selectedColor
                          ? `Selected Color: ${selectedColor.color_name}`
                          : "Selected option"}
                      </p>
                      <p>
                        €{selectedColor ? fallBackPriceColors.toFixed(2) : "0"}
                      </p>
                    </div>
                  </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>5</span>
                        <p>
                          {selectedGlassTypes
                            ? `Glass Color: ${selectedGlassTypes.color_of_glass}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedGlassTypes
                            ? `Selected Glass Type Color: ${selectedGlassTypes.color_of_glass}`
                            : "Selected option"}
                        </p>
                        <p>€{selectedGlassTypes ? "0" : "0"}</p>
                      </div>
                    </div>                  
                    {/* <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>6</span>
                        <p>
                          {selectedHandles
                            ? `Handle: ${selectedHandles?.name_of_handle}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedHandles
                            ? `Selected Handle: ${selectedHandles?.name_of_handle}`
                            : "Selected option"}
                        </p>
                        <p>Included</p>
                      </div>
                    </div> */}
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>6</span>
                        <p>
                          {selectedGrids
                            ? `Ventilation grid: ${selectedGrids?.name_of_ventilation_grid}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedGrids
                            ? `Selected grid: ${selectedGrids?.name_of_ventilation_grid}`
                            : "Selected option"}
                        </p>
                        <p>
                          €{selectedGrids ? gridNewPrice.toFixed(2) : "0"}
                        </p>
                      </div>
                    </div>

                    {/* Placeholder for other options, assuming similar structure */}
                    {/* Other options go here */}

                    {/* Displaying the estimated delivery time */}
                    <div className="single-product-page__customize__right__product__body__delivery">
                      <h3>Estimate delivery time:</h3>
                      <h3>14-21 days</h3>
                    </div>

                    {/* Displaying the total price, VAT, and total price including VAT */}
                    <div className="single-product-page__customize__right__product__body__price">
                      <div className="single-product-page__customize__right__product__body__price__top">
                        <h3>Price total:</h3>
                        <h3>€{totalPriceBeforeVAT.toFixed(2)}</h3>
                      </div>
                      <div className="single-product-page__customize__right__product__body__price__mid">
                        <h3>Price Inc. VAT</h3>
                        <h3>
                          €{totalPriceIncludingVAT.toFixed(2)}
                          <br></br>€{vat.toFixed(2)}
                        </h3>
                      </div>
                      <div className="single-product-page__customize__right__product__body__price__bottom">
                        <h3>TOTAL</h3>
                        <h3>€{totalPriceIncludingVAT.toFixed(2)}</h3>
                      </div>
                      <div className="single-product-page__customize__right__product__body__price__btn">
                        <Elements stripe={stripePromise}>
                          <CheckoutForm />
                        </Elements>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-product-page__upsell">
          <div className="col-6  single-product-page__upsell__left"></div>
          <div className="col-6 single-product-page__upsell__right">
            <div className="single-product-page__upsell__right__card">
              <img src={littleWindow} alt="" />
              <h5>Lorem ipsum dolor sit amet</h5>
              <button className="btn-colored">Button</button>
            </div>
          </div>
        </div>
        <div className="single-product-page__products">
          <h3>Material/Profile</h3>
          <div className="single-product-page__products__holder">
            <div className="single-product-page__products__holder__product">
              <Card />
            </div>
          </div>
        </div>
        <div className="single-product-page__description">
          <h3>Product Description</h3>
          <div className="single-product-page__description__headers">
            <p className="single-product-page__description__headers__active">
              Details
            </p>
            <p>Shipping</p>
            <p>Returns</p>
          </div>
          <p>Description</p>
          <br></br>
          <p>Description</p>
        </div>
        <div className="single-product-page__bought">
          <h3>Frequently Bought Together</h3>
          <div className="single-product-page__bought__wrapper">
            <div className="single-product-page__bought__wrapper__product">
              <Card />
            </div>
          </div>
        </div>
      </div>
      <div className=" single-product-page__upgrade">
        <div className="container single-product-page__upgrade__wrapper">
          <h3>Upgrade Your Home with</h3>
          <p>High-Quality Window Frames for a Stylish and Functional Space</p>
          <button className="btn-colored">Upgrade Now!</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
