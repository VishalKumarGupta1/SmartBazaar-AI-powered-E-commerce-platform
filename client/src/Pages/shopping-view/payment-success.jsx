import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const PaypalSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center space-y-8">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircleIcon
            className="text-green-500 animate-pulse"
            sx={{ fontSize: 80 }}
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Thank you for your purchase 🎉  
          Your payment has been received and your order is being processed.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border">
            <LocalShippingIcon className="text-green-600" />
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-700">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500">
                Your order will ship soon
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border">
            <ShoppingBagIcon className="text-green-600" />
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-700">
                Order Confirmed
              </p>
              <p className="text-xs text-gray-500">
                Check order details anytime
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate("/shop/account")}
            className="w-full sm:w-auto"
          >
            View My Orders
          </Button>

          <Button
            variant="outlined"
            color="success"
            size="large"
            onClick={() => navigate("/shop/listing")}
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </div>

       
      </div>
    </div>
  );
};

export default PaypalSuccessPage;
