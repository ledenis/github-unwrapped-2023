import React from "react";
import { DownloadIcon } from "../../../icons/DownloadIcon";
import { Button } from "../../Button/Button";
import { HoverEffect } from "../../Button/HoverEffect";
import { useUserVideo } from "../../context";
import styles from "./styles.module.css";

export const DownloadButton: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = ({ style, ...props }) => {
  const { status } = useUserVideo();

  const classNames = [styles.downloadButton];

  if (props.className) {
    classNames.push(props.className);
  }

  if (status.type === "querying") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        <div
          style={{
            width: 100,
            height: 16,
            backgroundColor: "rgba(255, 255,255, 0.2)",
          }}
        />{" "}
      </Button>
    );
  }

  if (status.type === "render-error") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        Download unavailable
      </Button>
    );
  }

  if (status.type === "error-querying") {
    return (
      <Button
        className={classNames.join(" ")}
        style={{ pointerEvents: "none", ...style }}
      >
        Could not get video status
      </Button>
    );
  }

  if (status.type === "video-available") {
    return (
      <Button
        hoverEffect
        className={classNames.join(" ")}
        style={{ ...style }}
        onClick={() => {
          window.open(status.url, "_blank", "noopener noreferrer");
        }}
      >
        <HoverEffect />
        <DownloadIcon width={20} />
        Download Video
      </Button>
    );
  }

  return (
    <Button
      className={[...classNames, styles.loadingButton].join(" ")}
      style={{ pointerEvents: "none", ...style }}
    >
      <div
        className={styles.loadingButtonBar}
        style={{ width: `${status.progress * 100}%`, zIndex: -1 }}
      />
      {status.progress > 0 ? (
        <div>Generating video ({Math.round(status.progress * 100)}%)</div>
      ) : (
        <div>Generating video</div>
      )}
    </Button>
  );
};
