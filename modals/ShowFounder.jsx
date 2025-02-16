import Image from "next/image";
import Modal from "react-modal";
import { VscChromeClose } from "react-icons/vsc";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "none",
    border: "#f5f0f7",
    borderRadius: "12px",
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 1000,
    overflow: "none",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.7)",
  },
};
Modal.setAppElement("#root");

const ShowFounder = ({ founder, showFounder }) => {
  return (
    <Modal
      isOpen={founder}
      style={customStyles}
      id="our-founder-modal"
      contentLabel="Our Founder Modal"
      onRequestClose={() => showFounder(false)}
    >
      <div
        style={{ maxWidth: "100%" }}
        className="rounded-[12px] bg-[#DBE2DD] p-5 max-h-[80vh] example overflow-scroll"
      >
        <div className="text-left">
          <h3 className="text-xl flex justify-between items-center md:text-5xl mb-5 md:mt-5 md:mb-10">
            <span>
              <i>Eczema</i> and <i>Psoriasis</i>: The Catalysts for Change
            </span>
            <span>
              <VscChromeClose
                onClick={() => showFounder(false)}
                size={25}
                className="cursor-none lg:cursor-pointer"
              />
            </span>
          </h3>
          <picture>
            <source
              media="(max-width: 564px)"
              srcSet="https://storage.googleapis.com/ayuvya_images/product_image/3_about_new_mobile_17april2024.webp"
            />
            <source
              media="(min-width: 568px)"
              srcSet="/assets/images/about/new/3.webp"
            />
            <Image
              loading="lazy"
              width={600}
              height={600}
              src={
                "https://storage.googleapis.com/ayuvya_images/product_image/3_about_new_mobile_17april2024.webp"
              }
              alt="banner Image"
              className="w-full rounded-3xl object-cover object-center"
            />
          </picture>
          <p className="text-md mt-5">
            The story that is the inspiration behind Ayuvya started from
            Pawanjot Kaur&apos;s own journey. She&apos;s not just a founder but
            a warrior against skin woes. She tried to find the answer to
            battling stubborn blemishes in sterile formulas but the timeless
            wisdom of Ayurveda was her true remedy. This was not just a solution
            but a revelation.
          </p>
          <h2 className="text-2xl mt-5 font-semibold">
            A Vaidya&apos;s touch: A serendipitous encounter in Varanasi
          </h2>
          <p className="text-md mt-5">
            Diving deep into Pawanjot&apos;s story and the foundation of Ayuvya,
            let us take you on an exploration of what made her think of sharing
            Ayurvedic wisdom with all.
          </p>
          <p className="text-md mt-5">
            Fate is known to be a mischievous puppeteer who pulled the strings
            of Pawanjot&apos;s expedition to find the cure for her skin
            ailments, leading her to Varanasi, India&apos;s sacred heart and
            amidst the ancient city&apos;s string chants and Ganga&apos;s
            swirling serenity she stumbled upon a Vaidya, a keeper of Ayurvedic
            wisdom which was passed down through 300 generations. He recognised
            the raging battle beneath the surface; her troubled skin.
          </p>
          <p className="text-md mt-5">
            As Pawanjot began using the Ayurvedic formulations, she experienced
            not only the alleviation of her skin ailments but also discovered
            the profound benefits of Ayurveda. She delved into the Vaidya&apos;s
            other creations, including hair oils and memory boosters, and was
            astounded by their efficacy. These products were a testament to
            Ayurveda&apos;s power, backed by a 250-year-old family legacy.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ShowFounder;
