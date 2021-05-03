import React from "react";
import {
  Player,
  BigPlayButton,
  ControlBar,
  PlaybackRateMenuButton,
  ForwardControl,
  ReplayControl,
  LoadingSpinner,
  Shortcut,
  ClosedCaptionButton,
} from "video-react";

const MediaPlayer = ({ videoUrl, className }) => {
  const newShortcuts = [
    {
      keyCode: 49,
      handle: (player, actions) => {
        const duration = player.duration;
        actions.seek(duration * 0.1);
      },
    },
    {
      keyCode: 70,
      handle: (player, actions) => {
        actions.toggleFullscreen();
      },
    },
    {
      keyCode: 77,
      handle: (player, actions) => {
        return (player.muted = !player.muted);
      },
    },
  ];

  return (
    <div className={className ? className : ""}>
      <Player src={videoUrl} autoPlay>
        <BigPlayButton position="center" />
        <track
          kind="captions"
          src="/assets/elephantsdream/captions.en.vtt"
          srcLang="en"
          label="English"
          default
        />
        <ControlBar>
          <ReplayControl seconds={30} order={3.2} />
          <ForwardControl seconds={30} order={3.4} />
          <PlaybackRateMenuButton
            rates={[2.0, 1.5, 1.25, 1, 0.5, 0.1]}
            order={7}
          />
          <ClosedCaptionButton order={8} />
        </ControlBar>
        <LoadingSpinner />
        <Shortcut shortcuts={newShortcuts} />
      </Player>
    </div>
  );
};

export default MediaPlayer;
