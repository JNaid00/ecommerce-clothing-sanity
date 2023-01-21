import React from "react";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";
const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  return (
    <div className="my-8 mx-auto">
      <div>
        <Typography sx={{ mn: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <FormControlLabel
        label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </div>
      {!values.shippingAddress.isSameAddress && (
        <div>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
