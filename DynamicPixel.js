"use client";

import Script from "next/script";
import config from "@/config/config";
import { useEffect, useState } from "react";
import { domains } from "@/data/dynamicPixelId";
import { removeScripts } from "@/api/generalFunc";

export default function DynamicPixel({ id }) {
  const [loaded, setLoaded] = useState(false);
  const [pixelId, setPixelId] = useState("");
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.removeItem("fb_pixel_dynamic1");
      localStorage.removeItem("fb_pixel_dynamic2");
      const defaultId = config?.FB_PIXEL_ID;
      const url = domains.filter((e) =>
        e?.domain.includes(window.location.hostname)
      );
      if (url && url.length > 0) {
        const id = url[0]?.id;
        if (id) removeScripts(id);
        setPixelId(id);
        localStorage.setItem("fb_pixel_dynamic", id);
      } else {
        if (defaultId) removeScripts(defaultId);
        setPixelId(defaultId);
        localStorage.setItem("fb_pixel_dynamic", defaultId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, id]);
  return (
    <>
      {pixelId && (
        <>
          <Script
            id="fb-pixel5"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', ${pixelId});
                    fbq('track', 'PageView');
                    `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" alt="facebook-hidden-image"
                  src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`,
            }}
          />
        </>
      )}
    </>
  );
}
