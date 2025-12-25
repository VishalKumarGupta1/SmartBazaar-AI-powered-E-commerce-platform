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
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  updateOrderStatus,
} from "../../store/admin/order-slice";
import { toast } from "react-toastify";

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

const AdminOrder = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    dispatch(getOrderDetailsForAdmin(order._id));
    setOrderStatus(order.orderStatus); // sync dropdown
    setOpen(true);
  };

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    dispatch(resetOrderDetails());
  };

  useEffect(() => {
    dispatch(getAllOrderForAdmin(user._id));
  }, [dispatch]);

  const handleUpdateOrderStatus = () => {
    dispatch(
      updateOrderStatus({ id: orderDetails._id, orderStatus: orderStatus })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails._id));
        dispatch(getAllOrderForAdmin(user._id));
        toast.success(res?.payload?.message);
      } else {
        toast.error(res?.payload?.message);
      }
    });
  };

  return (
    <Box p={3}>
      <Card>
        <div className="flex justify-between">
          <CardHeader title=" All Order" />
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
              <Typography>
                <b>Order ID:</b> {orderDetails?._id}
              </Typography>
              <Typography>
                <b>Status:</b> {orderDetails?.orderStatus}
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
                <b>Address:</b> {orderDetails?.addressInfo.city}
              </Typography>
              <Typography>
                <b>City:</b> {orderDetails?.addressInfo.city}
              </Typography>
              <Typography>
                <b>Pincode:</b> {orderDetails?.addressInfo.pincode}
              </Typography>
              <Typography>
                <b>Phone:</b> {orderDetails?.addressInfo.phone}
              </Typography>
              <Typography>
                <b>Notes:</b> {orderDetails?.addressInfo.notes}
              </Typography>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
                  Update Order Status
                </Typography>

                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    select
                    label="Order Status"
                    value={orderStatus}
                    onChange={handleStatusChange}
                    SelectProps={{ native: true }}
                    sx={{
                      flex: 1,
                      backgroundColor: "#fff",
                      borderRadius: 1,
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                    <option value="inProcess">In Process</option>
                  </TextField>

                  <Button
                    variant="contained"
                    disabled={orderStatus === orderDetails.orderStatus}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#000",
                      px: 3,
                      "&:hover": { backgroundColor: "#fff" },
                    }}
                    onClick={() => handleUpdateOrderStatus()}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminOrder;
