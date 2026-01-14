import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const PaypalCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <CancelIcon className="text-red-500" sx={{ fontSize: 64 }} />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Cancelled
        </h1>

        <p className="text-gray-500">
          You cancelled the PayPal payment. Don’t worry — no charges were made.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/shop/checkout")}
          >
            Return to Checkout
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/shop/home")}
          >
            Shop Home
          </Button>
        </div>

        <p className="text-xs text-gray-400 pt-4">
          You can retry the payment anytime from your cart.
        </p>
      </div>
    </div>
  );
};

export default PaypalCancelPage;
