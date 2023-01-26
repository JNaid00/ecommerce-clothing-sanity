import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "@/components/checkout/Shipping";
import Payment from "@/components/checkout/Payment";
import getStripe from "@/lib/getStripe";
import toast from "react-hot-toast";
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkOutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email("Invalid E-mail").required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];
const Index = () => {
  const [activeStep, setactiveStep] = useState(0);
  const cart = useSelector((state) => state.myCart.cart);

  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setactiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    const makePayment = async () => {
      const stripe = await getStripe();
      toast.loading("Redirecting...");
      const response = await fetch(`/api/stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart)
      });
    

      if(response.statusCode == 500) return;
      
      const data = await response.json();

      

      stripe.redirectToCheckout({ sessionId: data.id });

    };
    if (isSecondStep) {
      // console.log("Hello")
      makePayment(values);
    }

    actions.setTouched({});
  };
  return (
    <div className="w-[80%] my-[100px] mx-auto">
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>BILLING</StepLabel>
        </Step>
        <Step>
          <StepLabel>PAYMENT</StepLabel>
        </Step>
      </Stepper>
      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkOutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}

              <div className="flex justify-between gap-12">
                {isSecondStep && (
                  <div className="bg-black w-full">
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      sx={{
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                      }}
                      onClick={() => setactiveStep(activeStep - 1)}
                    >
                      BACK
                    </Button>
                  </div>
                )}
                <div className="bg-black w-full">
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "white",
                      padding: "15px 40px",
                    }}
                  >
                    {!isSecondStep ? "Next" : "Place Order"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Index;
