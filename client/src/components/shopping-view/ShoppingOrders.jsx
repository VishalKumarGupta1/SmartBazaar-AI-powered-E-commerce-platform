import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByUser,
  getOrderDetails,
  resetOrderDetails,
} from "../../store/shop/order-slice";

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

const ShoppingOrders = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    dispatch(getOrderDetails(order._id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    dispatch(resetOrderDetails());
  };

  useEffect(() => {
    dispatch(getAllOrderByUser(user._id));
  }, [dispatch]);

  return (
    <Box p={3}>
      <Card>
        <div className="flex justify-between">
          <CardHeader title="  Order History" />
          <CardHeader title={orderList?.length} />
        </div>

        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Order ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Order Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Price</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Details</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderList.length > 0 ? (
                  orderList.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.orderStatus}
                          color={getStatusColor(order.orderStatus)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${order.totalAmount}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenDetails(order)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 🔹 Order Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {orderDetails && (
            <>
              {/* 🔹 Order Details */}

              <Typography>
                <b>Order ID:</b> {orderDetails?._id}
              </Typography>
              <Typography>
                <b>Status:</b>{" "}
                <Chip
                  label={orderDetails?.orderStatus}
                  color={getStatusColor(orderDetails?.orderStatus)}
                  size="small"
                />
              </Typography>
              <Typography>
                <b>Total:</b> ${orderDetails?.totalAmount}
              </Typography>
              <Typography mb={2}>
                <b>Date:</b> {orderDetails?.orderDate.split("T")[0]}
              </Typography>
              <Typography>
                <b>Payment Status:</b> {orderDetails?.paymentStatus}
              </Typography>
              <Typography>
                <b>Payment Method:</b> {orderDetails?.paymentMethod}
              </Typography>

              {/* 🔹 Products Section */}
              <Typography variant="h6" gutterBottom>
                Products
              </Typography>

              <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 1, mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                    borderBottom: "1px solid #e0e0e0",
                    fontWeight: "bold",
                  }}
                >
                  <Typography>Product Name</Typography>
                  <Typography> Quantity</Typography>
                  <Typography>Price</Typography>
                </Box>

                {/* Dummy Products */}
                {orderDetails?.cartItems?.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Typography>{item.title}</Typography>
                    <Typography>{item.quantity}</Typography>
                    <Typography>{item.price}</Typography>
                  </Box>
                ))}
              </Box>

              {/* 🔹 Shipping Info */}
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>

              <Typography>
                <b>Name:</b> {user?.name}
              </Typography>
              <Typography>
                <b>Address:</b> {orderDetails?.addressInfo.address}
              </Typography>
              <Typography>
                <b>City:</b> {orderDetails?.addressInfo.city}
              </Typography>
              <Typography>
                <b>Pincode:</b> {orderDetails?.addressInfo.phone}
              </Typography>
              <Typography>
                <b>Phone:</b> {orderDetails?.addressInfo.pincode}
              </Typography>
              <Typography>
                <b>Notes:</b> {orderDetails?.addressInfo.notes}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ShoppingOrders;
