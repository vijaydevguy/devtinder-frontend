import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { calConfig } from "../../common";

const FloatingCalButton = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      className="fixed bottom-6 right-6 z-50 btn btn-primary rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
      data-cal-link={calConfig.link}
      data-cal-config='{"layout":"month_view"}'
    >
      📅 Book a Call
    </button>
  );
};

export default FloatingCalButton;
