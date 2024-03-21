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
import TwoPartCanvasComponent from "../../components/Canvas/TwoPartCanvasComponent.jsx";
import TrippleCanvasComponent from "../../components/Canvas/TrippleCanvasComponent.jsx";

import {
  AddressElement,
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
function SingleProductPage() {
  const [typeOfWindow, setTypeOfWindow] = useState("Tripple Openings"); // Set the default value here
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

  // useEffect(() => {
  //   console.log(
  //     selectedColor,
  //     selectedGlassLayers,
  //     selectedGlassTypes,
  //     selectedGrids,
  //     selectedHandles,
  //     selectedOpening,
  //     selectedProfile
  //   );
  // }, [
  //   selectedColor,
  //   selectedGlassLayers,
  //   selectedGlassTypes,
  //   selectedGrids,
  //   selectedHandles,
  //   selectedOpening,
  //   selectedProfile,
  // ]);
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

  // Calculate the total length in cm (assuming linear calculation means perimeter for a rectangle)
  // THIS CALCULATION IS FOR 3 PART WINDOW!!! Height and width are dependable on the product type!
  // const totalLengthInCm = ((8 * heightInCm) + (widthInCm * 2 ) + ( 2 * firstWindow) + ( 2 * secondWindow));
  // Vertical windows - it has 1/3 proportion for the fixed window down or up. Opening side is always 2/3 iffixedratios/.Minimum200

  // const totalLengthInCmTrippleOpening = ((8 * heightInCm) + (widthInCm * 2 ) + ( 2 * firstWindow) + ( 2 * secondWindow));
  // const totalLengthInCmTrippleSingleOpening = ((6 * heightInCm) + (widthInCm * 2 ) + ( 2 * middleWindowWidth) + ( 4 * outerWindowWidths));
  // const totalLengthInCmTrippleFixed = ((4 * heightInCm) + (widthInCm * 2 ));
  // const totalLengthInCmTwoPartOpening = ((7 * heightInCm) + (widthInCm * 2 ) + ( 2 * firstWindow) + ( 2 * secondWindow));
  // const totalLengthInCmTwoPartOpeningAll = ((6 * heightInCm) + (widthInCm * 2 ) + ( 2 * firstWindow) + ( 2 * secondWindow));
  // const totalLengthInCmTwoPartOpeningOne = ((5 * heightInCm) + (widthInCm * 2 ) + ( 2 * firstWindow) + ( 2 * secondWindow));
  // const totalLengthInCmTwoPartFixed = ((3 * heightInCm) + (widthInCm * 2 ));
  // const totalLengthInCmSingleFixed = ((4 * heightInCm) + (widthInCm * 4 ));
  // const totalLengthInCmSingletFixed = ((2 * heightInCm) + (widthInCm * 2 ));
  // const totalLengthInCmVerticalFixed = ((2 * heightInCm) + (widthInCm * 3 ));
  // const totalLengthInCmVerticalFixedTripple = ((2 * heightInCm) + (widthInCm * 4 ));
  // const totalLengthInCmVerticalBottom = ((2 * heightInCm) + (widthInCm * 3 ) + (2 * windowHeight));
  // const totalLengthInCmVerticalTop = ((2 * heightInCm) + (widthInCm * 5 ) + (2 * windowHeight));

  const totalLengthInCm =
    8 * heightInCm + widthInCm * 2 + 2 * width1 + 2 * width3;

  // Assuming selectedColor.color_price is a string, convert it to number
  const colorPrice = selectedColor
    ? Number(selectedColor["color_price_in_%"] || 0)
    : 0;
  const profilePrice = Number(selectedProfile?.profile_price ?? 0) / 100;
  const pricePerCm = profilePrice;
  const glassLayerPrice = Number(selectedGlassLayers?.price_per_sqm ?? 0);
  const handlePrice = Number(selectedHandles?.price_of_handle ?? 0);
  const gridPrice = Number(selectedGrids?.price_of_ventilation_grid ?? 0);
  // const securityPrice =  Number(selectedSecurity?.price_of_extra_security ?? 0);
  // const calc = glassLayerPrice + handlePrice + gridPrice + securityPrice;
  const calc = glassLayerPrice + handlePrice + gridPrice;

  const dimensionPrice = totalLengthInCm * pricePerCm;
  // const totalPriceBeforeVAT = dimensionPrice + (dimensionPrice/colorPrice) + calc;
  const totalPriceBeforeVAT = dimensionPrice + calc;
  const colorFrontSide = totalPriceBeforeVAT * colorPrice;
  const colorBackSide = totalPriceBeforeVAT * colorPrice;
  const colorBothSides = colorFrontSide + colorBackSide;

  const VAT_RATE = 0.21; // 21%
  const vat = totalPriceBeforeVAT * VAT_RATE;

  // const glassTypePrice = selectedGlassTypes?.color_of_glass;

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
  console.log(product);

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
      console.log("Payment intent prepared:", paymentData);
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
        },
      };

      addToCart(productConfig);
      console.log("Product added to cart", productConfig);
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
    // Check if product exists and has color data
    if (
      !product ||
      !product.acf ||
      !product.acf.colors ||
      product.acf.colors.length === 0
    ) {
      return <p>No color data available</p>;
    }

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

    return (
      <>
        {caseColorOptions.length > 0 && (
          <div className="color-options-container">
            <h5>Case Color</h5>
            <div className="">
              {caseColorOptions.map((colorOption, index) => (
                <div
                  key={index}
                  className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                    selectedColor?.color_name === colorOption.color_name
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
                >
                  <img
                    src={colorOption.color_image?.url}
                    alt={colorOption.color_name}
                    onError={(e) => (e.target.src = "")}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <p>{colorOption.color_name}</p>
                    <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {windowColorOptions.length > 0 && (
          <div className="color-options-container">
            <h5>Window Color</h5>
            {windowColorOptions.map((colorOption, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedColor?.color_name === colorOption.color_name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
              >
                <img
                  src={colorOption.color_image?.url}
                  alt={colorOption.color_name}
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{colorOption.color_name}</p>
                  <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {caseColorInsideOptions.length > 0 && (
          <div className="color-options-container">
            <h5>Case Color Inside</h5>
            {caseColorInsideOptions.map((colorOption, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedColor?.color_name === colorOption.color_name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
              >
                <img
                  src={colorOption.color_image?.url}
                  alt={colorOption.color_name}
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{colorOption.color_name}</p>
                  <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {windowColorInsideOptions.length > 0 && (
          <div className="color-options-container">
            <h5>Window Color Inside</h5>
            {windowColorInsideOptions.map((colorOption, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedColor?.color_name === colorOption.color_name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedColor(colorOption)} // Add the onClick event handler here
              >
                <img
                  src={colorOption.color_image?.url}
                  alt={colorOption.color_name}
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{colorOption.color_name}</p>
                  <p>€{colorOption.color_price_in_percent || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const three = () => {
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
                src={profile?.profile_image?.url || ""}
                alt={profile?.profile_name || "Profile Image"}
                onError={(e) => (e.target.src = "")} // Replace '' with actual path
              />
              <div>
                <p>{profile?.profile_name}</p>
                <p>€{profile?.profile_price || "N/A"}</p>
              </div>
            </div>
          ))}
      </>
    );
  };

  const four = () => {
    return (
      <div>
        <div
          className={`single-product-page__customize__left__option-holder__option__body ${
            activeId === "step4" ? "" : "d-none"
          }`}
        >
          {/* Fixed distribution */}
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

          {/* Width inputs */}
          <div className="option">
            <label htmlFor="width1" className="left-widths">
              Width of turn/tilt window (inward opening) in section 1 (in mm):
              <span>
                <br />
                (Calculated automatically)
              </span>
            </label>
            <input
              type="number"
              id="width1"
              value={width1}
              onChange={(event) => setWidth1(event.target.value)}
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
              Width of turn/tilt window (inward opening) in section 3 (in mm):
              <span>
                <br />
                (Calculated automatically)
              </span>
            </label>
            <input
              type="number"
              id="width3"
              value={width3}
              onChange={(event) => setWidth3(event.target.value)}
              disabled={fixedDistribution !== "Manual"}
            />
          </div>
        </div>
      </div>
    );
  };

  const five = () => {
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
              src={glassLayer.glass_image?.url || ""}
              alt={`Glass layer ${index + 1}`}
              onError={(e) => (e.target.src = "")} // Provide a fallback image path
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

  const six = () => {
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

  const seven = () => {
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
              src={handle.image_of_handle?.url || ""}
              alt={handle.name_of_handle}
              onError={(e) => (e.target.src = "")}
            />
            <div>
              <p>{handle.name_of_handle}</p>
              <p>€{handle.price_of_handle}</p>{" "}
              {/* Assuming price_of_handle exists and you want to display it */}
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
              onError={(e) => (e.target.src = "")}
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
                        <button
                        className={`btn-colored ${
                          activeId !== "step1" || errorStringWidth ? "d-none" : ""
                        }`}
                        onClick={() => goToNextStep("step2")}
                        disabled={errorStringWidth} // Disable the button if there's an error
                        style={{ opacity: errorStringWidth ? 0.5 : 1 }} // Optionally, change opacity when disabled
                      >
                        Go to next step <FaTurnDown />
                      </button>
                      )}
                    </div>

                    <Input
                      stepNumber={2}
                      nextStep={"step3"}
                      map={two}
                      text={"Choose Color"}
                    />

                    <Input
                      stepNumber={3}
                      nextStep={"step4"}
                      map={three}
                      text={"Profile"}
                    />

                    <div
                      className={`single-product-page__customize__left__option-holder__option ${
                        activeId === `step${4}` ? "top-active" : ""
                      }`}
                      id={`step${4}`}
                    >
                      <div
                        className={`single-product-page__customize__left__option-holder__option__top ${
                          activeId === `step${4}`
                            ? "single-product-page__customize__left__option-holder__option__top-active"
                            : ""
                        }`}
                        onClick={() => handleClick(`step${4}`)}
                      >
                        <h3>{"Plane Division"}</h3>
                        <span>
                          <FaChevronDown
                            color={activeId === `step${4}` ? "white" : "black"}
                          />
                        </span>
                      </div>
                      <div
                        className={`single-product-page__customize__left__option-holder__option__body ${
                          activeId !== `step${4}` ? "d-none" : ""
                        }`}
                      >
                        <div>
                          <div
                            className={`single-product-page__customize__left__option-holder__option__body ${
                              activeId === "step4" ? "" : "d-none"
                            }`}
                          >
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
                                onChange={(event) =>
                                  setWidth1(event.target.value)
                                }
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
                                onChange={(event) =>
                                  setWidth2(event.target.value)
                                }
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
                                onChange={(event) =>
                                  setWidth3(event.target.value)
                                }
                                disabled={fixedDistribution !== "Manual"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="single-product-page__customize__left__option-holder__option__btn-wrapper">
                        <button
                          className={`btn-colored ${
                            activeId !== `step${4}` ? "d-none" : ""
                          }`}
                          onClick={() => goToNextStep("step5")}
                        >
                          Go to next step <FaTurnDown />
                        </button>
                      </div>
                    </div>

                    <Input
                      stepNumber={5}
                      nextStep={"step6"}
                      map={five}
                      text={"Glass Type"}
                    />

                    <Input
                      stepNumber={6}
                      nextStep={"step7"}
                      map={six}
                      text={"Handle"}
                    />

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
                    {typeOfWindow === "Single Opening" && (
                      <CanvasComponent width={widthInCm} height={heightInCm} />
                    )}
                    {typeOfWindow === "Two Openings" && (
                      <TwoPartCanvasComponent
                        width={widthInCm}
                        height={heightInCm}
                      />
                    )}
                    {typeOfWindow === "Tripple Openings" && (
                      <TrippleCanvasComponent
                        width={widthInCm}
                        height={heightInCm}
                        fixedDistribution={fixedDistribution}
                        width1={width1}
                        width2={width2}
                        width3={width3}
                      />
                    )}
                  </div>
                  <div className="single-product-page__customize__right__product__body">
                    <div className="single-product-page__customize__right__product__body__option__mid">
                      <h3>Price total:</h3>
                      <h3>€{totalPriceBeforeVAT.toFixed(2)}</h3>
                    </div>
                    {/* Displaying the input values and calculated price for dimensions */}
                    <div className="single-product-page__customize__right__product__body__option">
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
                          €{selectedColor ? dimensionPrice.toFixed(2) : "0"}
                        </p>
                      </div>
                    </div>

                    {/* Displaying the selected color option and its price */}
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>2</span>
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
                          %
                          {selectedColor
                            ? selectedColor["color_price_in_%"]
                            : "0"}
                        </p>
                      </div>
                    </div>

                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>3</span>
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
                          {selectedProfile
                            ? selectedProfile?.profile_price
                            : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>4</span>
                        <p>
                          {selectedOpening
                            ? `Opening: ${selectedOpening}`
                            : "Option name"}
                        </p>
                      </div>
                      <div className="single-product-page__customize__right__product__body__option__mid">
                        <p>
                          {selectedOpening
                            ? `Selected Opening: ${selectedOpening}`
                            : "Selected option"}
                        </p>
                        <p>€{selectedOpening ? "0" : "0"}</p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>5</span>
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
                          {selectedGlassLayers
                            ? selectedGlassLayers?.price_per_sqm
                            : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>6</span>
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
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>7</span>
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
                        <p>
                          €
                          {selectedHandles
                            ? selectedHandles?.price_of_handle
                            : "0"}
                        </p>
                      </div>
                    </div>
                    <div className="single-product-page__customize__right__product__body__option">
                      <div className="single-product-page__customize__right__product__body__option__top">
                        <span>8</span>
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
                          €
                          {selectedGrids
                            ? selectedGrids?.price_of_ventilation_grid
                            : "0"}
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
