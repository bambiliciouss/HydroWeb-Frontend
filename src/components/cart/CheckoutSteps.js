import React from "react";
import { useNavigate } from "react-router-dom";
import "../cart/Checkout.css";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

const CheckoutSteps = ({
  store,
  gallon,
  containerstatus,
  payment,
  ordersummary,
}) => {
  const navigate = useNavigate();

  const handleStepClick = (stepIndex) => {
    // Navigate to the next step based on the clicked step index
    switch (stepIndex) {
      case 0:
        if (store) navigate("/storeselection");
        break;
      case 1:
        if (gallon) navigate("/gallon/order");
        break;
      case 2:
        if (containerstatus) navigate("/containerstatus");
        break;
      case 3:
        if (payment) navigate("/payment");
        break;
      case 4:
        if (ordersummary) navigate("/ordersummary");
        break;
      default:
        break;
    }
  };

  const getCurrentStep = () => {
    if (ordersummary) return 4;
    if (payment) return 3;
    if (containerstatus) return 2;
    if (gallon) return 1;
    if (store) return 0;
    return 0;
  };

  const step1Content = (
    <div onClick={() => handleStepClick(0)}>
      <h1>Step 1: Store Selection</h1>
    </div>
  );

  const step2Content = (
    <div onClick={() => handleStepClick(1)}>
      <h1>Step 2: Gallon Order</h1>
    </div>
  );

  const step3Content = (
    <div onClick={() => handleStepClick(2)}>
      <h1>Step 3: Container Status</h1>
    </div>
  );

  const step4Content = (
    <div onClick={() => handleStepClick(3)}>
      <h1>Step 4: Payment</h1>
    </div>
  );

  const step5Content = (
    <div onClick={() => handleStepClick(4)}>
      <h1>Step 5: Order Summary</h1>
    </div>
  );

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <StepProgressBar
        startingStep={getCurrentStep()}
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: step1Content,
          },
          {
            label: "Step 2",
            name: "step 2",
            content: step2Content,
          },
          {
            label: "Step 3",
            name: "step 3",
            content: step3Content,
          },
          {
            label: "Step 4",
            name: "step 4",
            content: step4Content,
          },
          {
            label: "Step 5",
            name: "step 5",
            content: step5Content,
          },
        ]}
      />
    </div>
  );
};

export default CheckoutSteps;
