// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router";
// import { capturePayment } from "../../store/shop/order-slice";
// import { toast } from "react-toastify";

// const PaypalReturnPage = () => {
//   const dispatch = useDispatch();
//   const loaction = useLocation();
//   const params = new URLSearchParams(location.search);
//   const paypalOrderId = params.get("token");

//   useEffect(() => {
//     if (paypalOrderId) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
//       dispatch(capturePayment({ paypalOrderId, orderId })).then((res) => {
//         if (res?.payload?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           toast.success(res?.payload?.message);
//           window.location.href = "/shop/payment-success";
//         } else {
//           toast.error(res?.payload?.message);
//         }
//       });
//     }
//   }, [paypalOrderId, dispatch]);

//   return (
//     <div>
//       paypal return page /......
//     </div>
//   );
// };

// export default PaypalReturnPage;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePayment } from "../../store/shop/order-slice";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error

  const params = new URLSearchParams(location.search);
  const paypalOrderId = params.get("token");

  useEffect(() => {
    if (paypalOrderId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paypalOrderId, orderId })).then((res) => {
        if (res?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast.success(res.payload.message);
          setStatus("success");

          setTimeout(() => {
            navigate("/shop/payment-success");
          }, 2000);
        } else {
          toast.error(res?.payload?.message || "Payment failed");
          setStatus("error");
        }
      });
    } else {
      setStatus("error");
    }
  }, [paypalOrderId, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <>
            <CircularProgress />
            <h2 className="text-xl font-semibold text-gray-800">
              Processing your payment
            </h2>
            <p className="text-gray-500">
              Please wait while we confirm your PayPal transaction...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircleIcon className="text-green-500" sx={{ fontSize: 60 }} />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-500">
              Your order has been confirmed 🎉
            </p>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/shop")}
              className="!mt-4"
            >
              Go to Shop Home
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <ErrorOutlineIcon className="text-red-500" sx={{ fontSize: 60 }} />
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Failed
            </h2>
            <p className="text-gray-500">
              Something went wrong with your payment.
            </p>
            <div className="flex gap-3 justify-center mt-4">
              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate("/shop/checkout")}
              >
                Back to checkout
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/shop/home")}
              >
                Shop Home
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaypalReturnPage;
