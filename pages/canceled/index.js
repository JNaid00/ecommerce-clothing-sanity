import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const Canceled = () => {
  useEffect(() => {
    toast.error("Payment was unsuccessful");
  }, []);

  return (
    <div className="my-[90px] mx-auto w-[80%] h-[50vw] max-h-[30vw]">
      <Alert severity="error">
        <AlertTitle>Canceled</AlertTitle>
        You have canceled your Order —{" "}
        <strong>Please try again later</strong>
      </Alert>
    </div>
  );
};

export default Canceled;
