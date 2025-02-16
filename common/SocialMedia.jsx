import Link from "next/link";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <>
      <ul className="flex gap-6 lg:gap-5 py-6">
        <li>
          <Link href="https://www.facebook.com/ayuvyayurveda" target="blank">
            <BsFacebook size={22} />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/ayuvyayurveda/" target="blank">
            <BsInstagram size={22} />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.youtube.com/channel/UCwcwGuLFlQYTQOxl9qantIg"
            target="blank"
          >
            <BsYoutube size={26} />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SocialMedia;
