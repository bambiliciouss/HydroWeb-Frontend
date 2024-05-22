import React from "react";
import { useNavigate } from "react-router-dom";
import "../cart/Checkout.css";
const CheckoutSteps = ({
  store,
  gallon,
  containerstatus,
  payment,
  ordersummary,
}) => {
  const navigate = useNavigate();

  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {store ? (
        <div
          className="float-right"
          onClick={() => navigate("/storeselection")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Store</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Store</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {gallon ? (
        <div className="float-right" onClick={() => navigate("/gallon/order")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Gallon</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Gallon</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {containerstatus ? (
        <div
          className="float-right"
          onClick={() => navigate("/containerstatus")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Container Status</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {payment ? (
        <div className="float-right" onClick={() => navigate("/payment")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Payment</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {ordersummary ? (
        <div className="float-right" onClick={() => navigate("/ordersummary")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Order Summary</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Order Summary</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../cart/Checkout.css";
// import StepProgressBar from "react-step-progress";
// import "react-step-progress/dist/index.css";

// const CheckoutSteps = ({
//   store,
//   gallon,
//   containerstatus,
//   payment,
//   ordersummary,
// }) => {
//   const navigate = useNavigate();

//   const handleStepClick = (stepIndex) => {
//     // Navigate to the next step based on the clicked step index
//     switch (stepIndex) {
//       case 0:
//         if (store) navigate("/storeselection");
//         break;
//       case 1:
//         if (gallon) navigate("/gallon/order");
//         break;
//       case 2:
//         if (containerstatus) navigate("/containerstatus");
//         break;
//       case 3:
//         if (payment) navigate("/payment");
//         break;
//       case 4:
//         if (ordersummary) navigate("/ordersummary");
//         break;
//       default:
//         break;
//     }
//   };

//   const getCurrentStep = () => {
//     if (ordersummary) return 4;
//     if (payment) return 3;
//     if (containerstatus) return 2;
//     if (gallon) return 1;
//     if (store) return 0;
//     return 0;
//   };

//   const step1Content = (
//     <div onClick={() => handleStepClick(0)}>
//       <h1>Step 1: Store Selection</h1>
//     </div>
//   );

//   const step2Content = (
//     <div onClick={() => handleStepClick(1)}>
//       <h1>Step 2: Gallon Order</h1>
//     </div>
//   );

//   const step3Content = (
//     <div onClick={() => handleStepClick(2)}>
//       <h1>Step 3: Container Status</h1>
//     </div>
//   );

//   const step4Content = (
//     <div onClick={() => handleStepClick(3)}>
//       <h1>Step 4: Payment</h1>
//     </div>
//   );

//   const step5Content = (
//     <div onClick={() => handleStepClick(4)}>
//       <h1>Step 5: Order Summary</h1>
//     </div>
//   );

//   return (
//     <div style={{ width: "600px", margin: "0 auto" }}>
//       <StepProgressBar
//         startingStep={getCurrentStep()}
//         steps={[
//           {
//             label: "Step 1",
//             name: "step 1",
//             content: step1Content,
//           },
//           {
//             label: "Step 2",
//             name: "step 2",
//             content: step2Content,
//           },
//           {
//             label: "Step 3",
//             name: "step 3",
//             content: step3Content,
//           },
//           {
//             label: "Step 4",
//             name: "step 4",
//             content: step4Content,
//           },
//           {
//             label: "Step 5",
//             name: "step 5",
//             content: step5Content,
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default CheckoutSteps;
