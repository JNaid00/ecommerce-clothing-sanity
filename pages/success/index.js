import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const Success = () => {
  useEffect(() => {
    toast.success("Payment was successful");
  }, []);

  return (
    <div className="my-[90px] mx-auto w-[80%] h-[50vw] max-h-[30vw]">
      {" "}
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </div>
  );
};

export default Success;
