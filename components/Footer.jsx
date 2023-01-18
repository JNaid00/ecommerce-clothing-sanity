import React from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";

const Footer = () => {
  return (
    <div className="mt-[70px] py-[40px] bg-[#f5f5f5]">
      <div className="w-[80%] mx-auto md:m-auto md:flex md:justify-between gap-y-7 colounmGap space-y-5 md:space-y-0">
        <div className="mx-auto md:mx-0 max-w-md">
          <Typography variant="h4" fontWeight="bold" mb="30px" color="#d6001c">
            ECOMMERCE
          </Typography>
          <div>
            All Content pulled from the Sanity CMS has been taken from websites
            that sell these items. These are not my items. When purchaing items
            to test it, please enter some fake credit card details.
          </div>
        </div>

        <div className="mx-auto md:mx-0 w-fit">
          <Typography variant="h4" fontWeight="bold" marginBottom="10px">
            Contact Us
          </Typography>
          <div className="flex items-center gap-3">
            <IconButton>
              <SlLocationPin />
            </IconButton>
            <Typography>
              221 Princess St. San Carlos, CA 94070, Pretoria, South Africa
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <IconButton>
              <AiOutlineMail />
            </IconButton>
            <a
              className="hover:bg-gray-200 rounded-lg"
              href="mailto:  jessenaidoo24@gmail.com"
            >
              jessenaidoo24@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <IconButton>
              <BsTelephone />
            </IconButton>

            <Typography>+27 (062) 692 4073</Typography>
          </div>
        </div>
      </div>
      <Divider />
      <div className="w-full flex mt-3">
        <div className="w-fit mx-auto flex gap-2 items-center">@Ecommerce</div>
      </div>
    </div>
  );
};

export default Footer;
