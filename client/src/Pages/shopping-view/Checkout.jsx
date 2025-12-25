import React, { useState } from "react";
import accImg from "../../../public/Assests/accountpage.png";
import Address from "../../components/shopping-view/Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemContent from "../../components/shopping-view/CartItemContent";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router";
import { createNewOrder } from "../../store/shop/order-slice";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const subtotal =
    cartItems?.items?.reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    ) || 0;
  const shipping = 0; // dummy price
  const total = subtotal + shipping;
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setisPaymentStart] = useState(false);

  const { approvalURL } = useSelector((state) => state.shopOrder);

  const handleCheckout = () => {
    if (currentSelectedAddress == null) {
      toast.error("select address card to proceed checkout ");
      return;
    }
    if (cartItems.items.length == 0) {
      toast.error("add productto cart then proceed checkout ");
      return;
    }
    const orderData = {
      userId: user._id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        phone: currentSelectedAddress?.phone,
        pincode: currentSelectedAddress?.pincode,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: total,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.success) {
        isPaymentStart(true);
        toast.success(res?.payload?.message);
      } else {
        isPaymentStart(false);
        toast.error(res?.payload?.message);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 w-full">
        <Address
          isCheckout={true}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddress={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems.items?.map((item) => (
            <CartItemContent key={item.productId} item={item} />
          ))}
          <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Shipping</Typography>
              <Typography>₹{shipping}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold">₹{total}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                handleCheckout();
              }}
              disabled={cartItems?.items?.length === 0}
            >
              Checkout With Paypal
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
