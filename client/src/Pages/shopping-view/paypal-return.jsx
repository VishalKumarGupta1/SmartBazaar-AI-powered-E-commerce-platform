import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { capturePayment } from "../../store/shop/order-slice";
import { toast } from "react-toastify";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const loaction = useLocation();
  const params = new URLSearchParams(location.search);
  const paypalOrderId = params.get("token");

  useEffect(() => {
    if (paypalOrderId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paypalOrderId, orderId })).then((res) => {
        if (res?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast.success(res?.payload?.message);
          window.location.href = "/shop/payment-success";
        } else {
          toast.error(res?.payload?.message);
        }
      });
    }
  }, [paypalOrderId, dispatch]);

  return (
    <div>
      paypal return page /......
    </div>
  );
};

export default PaypalReturnPage;
