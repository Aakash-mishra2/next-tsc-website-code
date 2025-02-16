"use client";
import Button from "../Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import config from "../../../config/config";
import ToastProvider from "../ToastProvider";
import { handleKeyPress } from "@/api/generalFunc";

const NewsLetterForm = () => {
  const [newsLetter, setNewsletter] = useState({
    email: "",
    phoneNumber: "",
    countryCode: "+91",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: newsLetter.email,
      phone_number: `+91${newsLetter.phoneNumber}`,
    };
    const BASE_URL = config.BASE_URL;
    const resp = await fetch(`${BASE_URL}api/newsletter/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await resp.json();
    if (resp?.status === 201) {
      toast.success("Sign Up Successfully");
      setNewsletter(null);
    } else {
      const emailError = response?.email;
      const phoneError = response?.phone_number;
      if (emailError && emailError[0] === "This field must be unique.")
        toast.success("Already signed up");
      else if (phoneError && phoneError[0] === "Enter a valid phone number.")
        toast.warn("Please enter a valid phone number");
      else toast.error("Something went wrong");
      setNewsletter(null);
    }
  };

  return (
    <ToastProvider>
      <div className="px-5 lg:px-0">
        <p className="text-lg lg:text-xl py-8 lg:py-6 text-lime-950">
          Sign up to our newsletter - the place for wild news, invitations and
          good karma treats!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative mb-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <MdEmail size={30} className="text-black" />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              maxLength="50"
              autoComplete="true"
              placeholder="EMAIL ADDRESS"
              className="border border-black placeholder-black text-black text-lg rounded-full py-3 bg-white block w-full pl-20"
              value={newsLetter?.email || ""}
              onChange={(e) =>
                setNewsletter({ ...newsLetter, email: e.target.value })
              }
              required
            />
          </div>
          <div className="relative mb-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <select
                id="countryCode"
                name="countryCode"
                onChange={(e) => {
                  setNewsletter({
                    ...newsLetter,
                    countryCode: e.target.value || +91,
                  });
                }}
                value={newsLetter?.countryCode || "+91"}
                className="text-lg text-black placeholder-black w-16 outline-none"
                style={{ background: "none" }}
              >
                <option disabled value="">
                  Select Country Code
                </option>
                <option value={"+91"}>+91</option>
              </select>
            </div>
            <input
              type="text"
              maxLength="10"
              id="phoneNumber"
              name="phoneNumber"
              pattern="[0-9\/]*"
              inputMode="numeric"
              autoComplete="true"
              onKeyPress={handleKeyPress}
              placeholder="PHONE NUMBER"
              className="border border-black text-black placeholder-black text-lg rounded-full py-3 bg-white block w-full pl-20"
              value={newsLetter?.phoneNumber || ""}
              onChange={(e) =>
                setNewsletter({ ...newsLetter, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <Button
            className="border-white outline-none h-12 bg-lime-950 w-fit rounded-full text-white"
            type="submit"
          >
            <span className="font-semibold px-7 py-1">SIGN UP</span>
          </Button>
        </form>
      </div>
    </ToastProvider>
  );
};

export default NewsLetterForm;
