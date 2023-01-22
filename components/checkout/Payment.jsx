import React from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Payment = ({ values, errors, touched, handleBlur, handleChange }) => {
  return (
    <div className="my-[30px] ">
      <div>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Information
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={!!touched.phoneNumber && !!errors.phoneNumber}
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: "span 4" }}
        />
      </div>
    </div>
  );
};

export default Payment;
