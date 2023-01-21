import React from "react";
import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "@/components/checkout/Shipping";
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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Index;
