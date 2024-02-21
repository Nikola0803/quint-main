import React, { useState, useEffect, useContext  } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.scss";
import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
import { FaChevronDown } from "react-icons/fa6";
import { FaTurnDown } from "react-icons/fa6";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import ruler from "../../assets/clarity_ruler-pencil-line.svg";
import littleWindow from "../../assets/little-window.png";
import Card from "../../components/Card/Card";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutButton from '../../components/Checkout/Checkout.jsx';
import { useCart } from '../../context/CartContext.js';

import {
  AddressElement,
  CardElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
function SingleProductPage() {
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
  const [sucess, setSuccess] = useState(false);
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

  // Function to move to the next step
  function goToNextStep(text) {
    setActiveId(text);
  }
  const [activeId, setActiveId] = useState("step1");

  const handleClick = (clickedId) => {
    setActiveId(clickedId); // Set the active ID
  };

  const MiniConfigurator = () => {
    // Extract colorOptionsArray from product?.acf?.color_selection[0] safely
    const colorOptionsArray =
      (product?.acf?.color_selection && product?.acf?.color_selection[0]) || {};
    // Get colorOptions as an array of values from colorOptionsArray
    const colorOptions = Object.values(colorOptionsArray);

    // Extract glassLayers from product?.acf?.glass_layers[0] safely
    const glassLayersArray =
      (product?.acf?.glass_layers && product?.acf?.glass_layers[0]) || {};
    // Get glassLayers as an array of values from glassLayersArray
    const glassLayers = Object.values(glassLayersArray);

    const two = () => {
      return (
        <>
          {colorOptions &&
            colorOptions?.map((colorOption, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedColor?.color_name === colorOption[0]?.color_name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedColor(colorOption[0])} // Add the onClick event handler here
              >
                <img
                  src={
                    colorOption ? colorOption[0]?.color_image?.url : undefined
                  }
                  alt={colorOption[0]?.color_name}
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{colorOption[0]?.color_name}</p>
                  <p>€{colorOption[0]?.["color_price_in_%"] || "N/A"}</p>
                </div>
              </div>
            ))}
        </>
      );
    };
    const three = () => {
      return (
        <>
          {product?.acf?.profile &&
            product?.acf?.profile?.map((profile, index) => (
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
                  src={profile?.profile_image?.url}
                  alt={profile?.profile_name}
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{profile?.profile_name}</p>
                  <p>€{profile["profile_price"]}</p>
                </div>
              </div>
            ))}
        </>
      );
    };
    const five = () => {
      return (
        <>
          {glassLayers &&
            glassLayers?.map((profile, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedGlassLayers?.price_per_sqm ===
                  profile[0]?.price_per_sqm
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedGlassLayers(profile[0])}
              >
                <img
                  src={profile[0].image}
                  alt=""
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{profile[0]?.price_per_sqm}</p>
                </div>
              </div>
            ))}
        </>
      );
    };

    const six = () => {
      return (
        <>
          {product?.acf?.glass_type &&
            product?.acf?.glass_type?.map((profile, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedGlassTypes?.color_of_glass === profile.color_of_glass
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedGlassTypes(profile)}
              >
                <div>
                  <p>{profile?.color_of_glass}</p>
                </div>
              </div>
            ))}
        </>
      );
    };
    const seven = () => {
      return (
        <>
          {product?.acf?.handle &&
            product?.acf?.handle?.map((profile, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedHandles?.name_of_handle === profile.name_of_handle
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedHandles(profile)}
              >
                <img
                  src={profile?.image_of_handle?.url}
                  alt=""
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{profile?.name_of_handle}</p>
                  <p>€{profile?.price_of_handle}</p>
                </div>
              </div>
            ))}
        </>
      );
    };
    const eight = () => {
      return (
        <>
          {product?.acf?.ventilation_grid &&
            product?.acf?.ventilation_grid?.map((profile, index) => (
              <div
                key={index}
                className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                  selectedGrids?.name_of_ventilation_grid ===
                  profile.name_of_ventilation_grid
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedGrids(profile)}
              >
                <img
                  src={profile?.image_of_ventilation_grid?.url}
                  alt=""
                  onError={(e) => (e.target.src = "")}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>{profile?.name_of_ventilation_grid}</p>
                  <p>€{profile?.price_of_ventilation_grid}</p>
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
              <FaChevronDown color={activeId === "step1" ? "white" : "black"} />
            </span>
          </div>
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
                onChange={(e) => setFrameWidth(e.target.value)}
                onBlur={() => {
                  // Clamp the value to min/max when user moves away from the input field
                  const clampedValue = Math.max(
                    Math.min(Number(frameWidth), maxWidth),
                    minWidth
                  );
                  setFrameWidth(clampedValue);
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
                mm <FaCheck color="green" />
              </span>
            </div>
          </div>
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
                onChange={(e) => setFrameHeight(e.target.value)}
                onBlur={() => {
                  // Clamp the value to min/max when user moves away from the input field
                  const clampedValue = Math.max(
                    Math.min(Number(frameHeight), maxHeight),
                    minHeight
                  );
                  setFrameHeight(clampedValue);
                }}
                placeholder="Number"
                style={{ textAlign: "center", marginRight: "5px" }} // Ensure input is aligned and has space for buttons
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
                mm <FaCheck color="green" />
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
                onClick={() => goToNextStep("step2")}
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
          text={"Choose Color"}
        />

        <Input stepNumber={3} nextStep={"step4"} map={three} text={"Profile"} />

        <div
          className={`single-product-page__customize__left__option-holder__option ${
            activeId === "step4" ? "top-active" : ""
          }`}
          id={"step4"}
        >
          <div
            className={`single-product-page__customize__left__option-holder__option__top ${
              activeId === "step4"
                ? "single-product-page__customize__left__option-holder__option__top-active"
                : ""
            }`}
            onClick={() => handleClick("step4")}
          >
            <h3>Opening Type</h3>
            <span>
              <FaChevronDown color={activeId === "step4" ? "white" : "black"} />
            </span>
          </div>
          <div
            className={`single-product-page__customize__left__option-holder__option__body ${
              activeId !== "step4" ? "d-none" : ""
            }`}
          >
            <div
              className={`single-product-page__customize__left__option-holder__option__body__color-option ${
                selectedOpening === product?.acf?.opening_type ? "selected" : ""
              }`}
              onClick={() => setSelectedOpening(product?.acf?.opening_type)}
            >
              <img
                src={"#"}
                alt=""
                onError={(e) => (e.target.src = "")}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div>
                <p>{product?.acf?.opening_type}</p>
              </div>
            </div>
          </div>
          <div className="single-product-page__customize__left__option-holder__option__btn-wrapper">
            <button
              className={`btn-colored ${activeId !== "step4" ? "d-none" : ""}`}
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
          text={"Glass Layers"}
        />
        <Input
          stepNumber={6}
          nextStep={"step7"}
          map={six}
          text={"Glass Type"}
        />

        <Input stepNumber={7} nextStep={"step8"} map={seven} text={"Handle"} />
        <Input
          stepNumber={8}
          nextStep={"step1"}
          map={eight}
          text={"Ventilation grid"}
        />
      </div>
    );
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
    setFrameWidth((current) => Math.min(current + 1, maxWidth));
  const decrementWidth = () =>
    setFrameWidth((current) => Math.max(current - 1, minWidth));
  const incrementHeight = () =>
    setFrameHeight((current) => Math.min(current + 1, maxHeight));
  const decrementHeight = () =>
    setFrameHeight((current) => Math.max(current - 1, minHeight));

  // Convert mm to cm for both width and height
  const widthInCm = frameWidth / 10;
  const heightInCm = frameHeight / 10;
  // Calculate the total length in cm (assuming linear calculation means perimeter for a rectangle)
  const totalLengthInCm = 2 * (widthInCm + heightInCm);

  // Ensure pricePerCm is a number and calculate dimension price
  const pricePerCm = Number(product?.acf?.window_size?.price_per_cm);
  const dimensionPrice = totalLengthInCm * pricePerCm;

  // Assuming selectedColor.color_price is a string, convert it to number
  const colorPrice = selectedColor
    ? Number(selectedColor["color_price_in_%"] || 0)
    : 0;
  const profilePrice = Number(selectedProfile?.profile_price ?? 0);
  const glassLayerPrice = Number(selectedGlassLayers?.price_per_sqm ?? 0);
  const handlePrice = Number(selectedHandles?.price_of_handle ?? 0);
  const gridPrice = Number(selectedGrids?.price_of_ventilation_grid ?? 0);
  const calc = profilePrice + glassLayerPrice + handlePrice + gridPrice;
  const totalPriceBeforeVAT = dimensionPrice + colorPrice + calc;

  const VAT_RATE = 0.2; // 20%
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
          product_id: "someId",
          custom_price: 1000,
          items: { /* Your item details */ },
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
        <button onClick={handleAddToCart}>Add to Cart</button>
      </form>
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
                  {<MiniConfigurator />}
                </div>
              </div>

              {/* Right section might stay static or change based on your design */}
              <div className="single-product-page__customize__right col-6">
                <h3>Customize windows frame</h3>
                <div className="single-product-page__customize__right__product">
                  <div className="single-product-page__customize__right__product__top">
                    {/* Assuming there's an image to display */}
                    <img
                      src={
                        product?.images[0]
                          ? product?.images[0]?.src
                          : "http://localhost:3000/static/media/little-window.baf3ac1bbd2d082f644e.png"
                      }
                      alt=""
                    />
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
                          €
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
