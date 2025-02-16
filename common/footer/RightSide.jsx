import Link from "next/link";
import SocialMedia from "../SocialMedia";
import { AiFillCopyrightCircle } from "react-icons/ai";

const RightSide = () => {
  return (
    <div className="w-full pl-5 lg:w-3/5 lg:px-16">
      <div className="flex flex-wrap justify-start lg:justify-between gap-5 text-xl border-b">
        <div className="">
          <h4 className="underline underline-offset-4 font-semibold">Shop</h4>
          <ul className="flex flex-col gap-3 py-6 lg:py-10">
            <li>
              <Link href="/shipping-policy">Shipping And Returns</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="underline underline-offset-4 font-semibold">
            About Us
          </h4>
          <ul className="flex flex-col gap-3 py-6 lg:py-10">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/certificates">Our Certificates</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="underline underline-offset-4 font-semibold">
            Get Help
          </h4>
          <ul className="flex flex-col gap-3 py-6 lg:py-10">
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/track_order">Track Order</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="pt-10 text-2xl">Follow Us</p>
        <SocialMedia />
        <p className="items-center text-lg py-8">
          <span className="inline-block mr-1">
            <AiFillCopyrightCircle size={20} />
          </span>
          AYURVEDA HOUSE PRIVATE LIMITED INC 2023 <br /> 34 A Ground Floor, Hauz
          Khas Fort Rd, Hauz Khas, New Delhi, Delhi 110016
        </p>
        <ul className="flex flex-wrap gap-5 text-lg pr-4">
          <li className="underline underline-offset-4">
            <Link href="/privacy_policy">Privacy Policy</Link>
          </li>
          <li className="underline underline-offset-4">
            <Link href="/terms-and-conditions">Terms And Condition</Link>
          </li>
          <li className="underline underline-offset-4">
            <Link target="_blank" href="https://forms.gle/ZR4BXrVupnd49YA8A">
              Careers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSide;
