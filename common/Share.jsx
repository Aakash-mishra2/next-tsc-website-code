"use client";

import * as fbq from "@/api/events.js";
import config from "../../config/config";
import { BsLinkedin } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { AiFillTwitterSquare } from "react-icons/ai";
import { getGoogleAnalyticsId } from "@/api/generalFunc";
import { FaWhatsappSquare, FaFacebookSquare } from "react-icons/fa";

const Share = ({ blogTitle, showSocialLink }) => {
  const location = usePathname();
  const handleShare = (socialMedia) => {
    let shareUrl;
    let response;
    const caption = "Check out this blog: " + blogTitle;
    const blogUrl = "https://ayuvya.com" + location;
    const encodedUrl = encodeURIComponent(blogUrl);

    // social media URLs
    const TWITTER_URL = config.TWITTER_URL;
    const FACEBOOK_URL = config.FACEBOOK_URL;
    const WHATSAPP_URL = config.WHATSAPP_URL;
    const LINKEDIN_URL = config.LINKEDIN_URL;
    const INSTAGRAM_URL = config.INSTAGRAM_URL;

    switch (socialMedia) {
      case "FACEBOOK":
        response = true;
        shareUrl = FACEBOOK_URL + `?u=${encodedUrl}`;
        break;
      case "INSTAGRAM":
        const instructions = `To share this blog post on Instagram:
            1. Open the Instagram app on your mobile device.
            2. Click the "+" button at the bottom center to create a new post.
            3. Add your caption, then paste the following link : ${blogUrl}
            4. Tap 'Share' to post the blog link.`;

        response = window.confirm(instructions);
        if (response)
          shareUrl = INSTAGRAM_URL + `add?caption=${caption}&url=${encodedUrl}`;
        break;
      case "WHATSAPP":
        response = true;
        const whatsappEncodeMessage = `Check out this blog: ${blogTitle}\n${blogUrl}`;
        shareUrl =
          WHATSAPP_URL + `?text=${encodeURIComponent(whatsappEncodeMessage)}`;
        break;
      case "TWITTER":
        response = true;
        shareUrl = TWITTER_URL + `?url=${encodedUrl}&text=${caption}`;
        break;
      case "LINKEDIN":
        response = true;
        shareUrl =
          LINKEDIN_URL + `?mini=true&url=${encodedUrl}&title=${caption}`;
        break;
      default:
        break;
    }
    if (response) {
      fbq.gevent("share", {
        send_to: getGoogleAnalyticsId(),
        method: `${socialMedia}`,
        content_type: "BlogPost",
        item_id: `${blogTitle}`,
      });
      window.open(shareUrl, "_blank");
    } else return;
  };

  return (
    <div
      onMouseLeave={showSocialLink && (() => showSocialLink(false))}
      className="flex items-center"
    >
      <span
        className="cursor-none lg:cursor-pointer pr-2"
        onClick={() => handleShare("FACEBOOK")}
      >
        <FaFacebookSquare title="Share on facebook" color="#1877F2" size={27} />
      </span>
      {/*      <span
        className="cursor-none lg:cursor-pointer text-white pr-[6px]"
        onClick={() => handleShare("INSTAGRAM")}
      >
        <FaInstagram
          size={25}
          title="Share on Instagram"
          className="bg-gradient-to-r from-[#F58529] to-[#DD2A7B] rounded-md p-[2px]"
        />
</span>*/}
      <span
        className="cursor-none lg:cursor-pointer pr-[3px]"
        onClick={() => handleShare("WHATSAPP")}
      >
        <FaWhatsappSquare
          size={28}
          color="#25D366"
          className="rounded-lg"
          title="Share on Whatsapp"
        />
      </span>
      <span
        className="cursor-none lg:cursor-pointer pr-1"
        onClick={() => handleShare("TWITTER")}
      >
        <AiFillTwitterSquare
          size={32}
          color="#1DA1F2"
          title="Share on Twitter"
        />
      </span>
      <span
        className="cursor-none lg:cursor-pointer"
        onClick={() => handleShare("LINKEDIN")}
      >
        <BsLinkedin size={26} color="#0A66C2" title="Share on LinkedIn" />
      </span>
    </div>
  );
};

export default Share;
