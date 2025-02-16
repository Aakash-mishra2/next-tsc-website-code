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

const ShowFounder = ({ ayuvya, showAyuvya }) => {
  return (
    <Modal
      isOpen={ayuvya}
      style={customStyles}
      id="our-founder-modal"
      contentLabel="Our Founder Modal"
      onRequestClose={() => showAyuvya(false)}
    >
      <div
        style={{ maxWidth: "100%" }}
        className="rounded-[12px] bg-[#DBE2DD] p-5 max-h-[80vh] example overflow-scroll"
      >
        <div className="text-left">
          <h3 className="text-xl flex justify-between items-center md:text-5xl mb-5 md:mt-5 md:mb-10">
            <span>
              How <i>Ayuvya</i> came to light?{" "}
            </span>
            <span>
              <VscChromeClose
                onClick={() => showAyuvya(false)}
                size={25}
                className="cursor-none lg:cursor-pointer"
              />
            </span>
          </h3>
          <picture>
            <source
              media="(max-width: 564px)"
              srcSet="https://storage.googleapis.com/ayuvya_images/product_image/4_about_new_mobile_17april2024.webp"
            />
            <source
              media="(min-width: 568px)"
              srcSet="/assets/images/about/new/4.webp"
            />
            <Image
              loading="lazy"
              width={600}
              height={600}
              src={
                "https://storage.googleapis.com/ayuvya_images/product_image/4_about_new_mobile_17april2024.webp"
              }
              alt="banner Image"
              className="w-full rounded-3xl object-cover object-center"
            />
          </picture>
          <p className="text-md mt-5">
            Inspired by her own transformation, Pawanjot was determined to share
            these Ayurvedic wonders with the world. Her newfound belief in
            Ayurveda&apos;s potential inspired her to reach out to her friends,
            Astha & Tanishk, to share her journey and the transformation she
            experienced through Ayurveda. Astha & Tanishk, equally impressed by
            the results, decided to join Pawanjot on this Ayurvedic journey.
          </p>
          <p className="text-md mt-5">
            This was the pivotal moment when the idea of Ayuvya was born. The
            three young entrepreneurs embarked on a mission to seek out other
            family legacies steeped in Ayurvedic tradition and make their
            exceptional products available to everyone. They aimed to provide
            individuals with access to Ayurvedic solutions that were not only
            effective but also rooted in centuries of wisdom and expertise.
            Ayuvya was meant to bridge the gap between ancient wisdom and modern
            wellness.
          </p>
          <p className="text-md mt-5">
            Their entrepreneurial journey with Ayuvya has not gone unnoticed.
            They were honored with the prestigious
            <b>&quot; 30 under 30&quot;</b> award by Entrepreneur Today, further
            validating their dedication to Ayurveda and commitment to improving
            people&apos;s lives.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ShowFounder;
