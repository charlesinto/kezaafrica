import React from "react";
import { Tooltip } from "@material-ui/core";
import { useGlobalContext } from "../context/global";
function Chat() {
  const { reportAction } = useGlobalContext();
  return (
    <Tooltip placement="top" arrow title="Chat with Keza">
      <div className="whatsapp">
        <a
          onClick={() =>
            reportAction("Social", "Clicked the WhatsApp Chat Button")
          }
          href="https://api.whatsapp.com/send?phone=2349161112671"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          <i className="rx ri-whatsapp-line"></i>
        </a>
      </div>
    </Tooltip>
  );
}

export default Chat;
