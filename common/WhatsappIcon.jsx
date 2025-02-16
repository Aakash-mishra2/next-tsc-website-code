import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappIcon = ({ show }) => {
  return (
    <>
      {show && (
        <div
          className={`fixed shadow-3xl cursor-none lg:cursor-pointer right-5 bottom-20 xs:bottom-5 z-[100] w-14 h-14 flex justify-center items-center rounded-full bg-[#25D366]`}
        >
          <Link
            href={`https://api.whatsapp.com/send/?phone=9717133209&text=I like to know more`}
            target="_black"
          >
            <FaWhatsapp
              size={40}
              color="white"
              className="bg-[#25D366] rounded-lg cursor-none lg:cursor-pointer"
              title="Chat With Us on Whatsapp"
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default WhatsappIcon;
