import Link from "next/link";
import Image from "next/image";
import FlowerMovingBG from "../FlowerMovingBG";
import { footerData } from "@/data/footerData";
import { SocialMedia } from "@/components/common";
import FooterAccordion from "./FooterAccordion.jsx";
import NewsLetterForm from "@/components/common/forms/NewsLetterForm";
import PaymentCards from "@/components/checkout/PaymentCards";

export default function NewFooter({ categories }) {
  return (
    <div>
      <div className="py-6 xss:py-8 lg:py-12">
        <p className="text-xss xss:text-sm text-center w-[90%] md:w-3/4 mx-auto leading-4 xss:leading-6 text-gray-400">
          The products offered on this website are not intended to diagnose,
          treat, cure, or prevent any disease. Results shared are not typical
          and reflect a small sample of user testimonials. Consult your
          physician before using our products, especially if you have health
          conditions or allergies, and review the ingredient list carefully. The
          information provided on this website is not a substitute for advice
          from your doctor or healthcare professional. The opinions in our
          educational videos are those of the authors and meant for educational
          purposes only. Always consult your healthcare provider before making
          any changes to your diet or lifestyle.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="w-full relative overflow-hidden">
          <FlowerMovingBG theme="D6D683" />
          <div className="flex flex-col text-center lg:text-left w-full mx-auto max-w-2xl">
            <figure className="w-48 lg:w-full m-auto mt-6 lg:m-0 flex justify-center">
              <Link href="/">
                <Image
                  width={350}
                  loading="lazy"
                  height={114}
                  alt="Ayuvya logo"
                  src="https://storage.googleapis.com/ayuvya_images/product_image/ayuvyawhite_logo_17april2024_3.webp"
                />
              </Link>
            </figure>
            <figcaption className="pb-8">
              {/*<p className="text-3xl lg:text-4xl pt-5 lg:pt-3">Get 5% off!</p>*/}
              <NewsLetterForm />
            </figcaption>
          </div>
        </div>
        <div className="w-full" style={{ backgroundColor: "#FBF8EC" }}>
          <div className="w-full px-4 text-lime-950 flex flex-col lg:flex-row mx-auto max-w-6xl pt-10">
            <div className="lg:w-1/3">
              <p className="text-2xl">Follow Us</p>
              <SocialMedia />
              <p className="lg:w-5/6">
                © AYURVEDA HOUSE PRIVATE LIMITED INC {new Date().getFullYear()}
              </p>
              <p className="lg:w-5/6">
                34 A Ground Floor, Hauz Khas Fort Rd, Hauz Khas, New Delhi,
                Delhi 110016
              </p>
              <div className="w-2/3">
                <PaymentCards confirm={true} />
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-row lg:gap-8 lg:flex-wrap lg:w-2/3">
              {footerData.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-xl mb-2">{item.question}</h3>
                  <ul>
                    {item.description.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <Link
                          href={item.url}
                          aria-label={item.title}
                          target={item?.target ? "_blank" : "_self"}
                          className="flex justify-between w-fit hover:underline"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="block lg:hidden">
              {footerData.length > 0 && (
                <FooterAccordion
                  bgTheme={"FBF8EC"}
                  theme={"000000"}
                  faqs={footerData}
                  newIcon={true}
                />
              )}
            </div>
          </div>
          <div className="px-2 xsss:px-4 xss:px-6 mx-auto max-w-6xl py-6 xss:py-10">
            <h2 className="text-xl font-bold mb-3 lg:text-2xl underline">
              Popular Searches
            </h2>
            {categories && (
              <div className="flex flex-col justify-center items-center mx-auto max-w-6xl">
                <p className="text-sm text-justify lg:text-lg">
                  <Link
                    href={"/blog"}
                    aria-label={"blogs"}
                    className="text-sm lg:text-base"
                  >
                    <span className="lg:hover:underline w-fit">Blogs</span>
                    <span className="font-bold"> | </span>
                  </Link>
                  {categories.results?.map((category, idx) => {
                    const sub_url = `/${
                      category?.category_slug === "nutrition"
                        ? "category/natural-health-care"
                        : category?.category_slug === "skin-care"
                        ? "category/ayurvedic-skin-care"
                        : category?.type + "/" + category?.category_slug
                    }`;
                    return (
                      <Link
                        key={idx}
                        href={sub_url}
                        className="text-sm lg:text-base"
                        aria-label={category.category_name}
                      >
                        <span className="lg:hover:underline w-fit">
                          {category.category_name}
                        </span>
                        <span className="font-bold">
                          {"   "}
                          {categories?.results?.length - 1 !== idx && "|"}
                          {"   "}
                        </span>
                      </Link>
                    );
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-[url('/assets/images/other/footer-pattern.webp')] bg-lime-950 flex justify-center items-center p-3 xs:p-4 z-[45]">
          <p className="text-md lg:text-lg text-center lg:text-left text-white">
            © {new Date().getFullYear()} AYURVEDA HOUSE PRIVATE LIMITED All
            Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
