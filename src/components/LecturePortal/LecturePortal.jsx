import React from "react";
import MediaPlayer from "../higher-order-component/MediaPlayer";
import CurriculumSub from "../higher-order-component/CurriculumSub";
import VideoDetails from "./VideoDetails/VideoDetails";

const videosUrl = [
  "http://media.w3.org/2010/05/bunny/movie.mp4",
  "https://cdn.videvo.net/videvo_files/video/free/2012-08/small_watermarked/hd0029_preview.webm",
];

const LecturePortal = () => {
  const [videoPlaying, setVideoPlaying] = React.useState(videosUrl[0]);

  const changeVideo = (id) => {
    setVideoPlaying(videosUrl[id]);
  };

  return (
    <div className="lecture_portal_page container py-5">
      <div className="row">
        <div className="col-md-8">
          <MediaPlayer className="box-shadow" videoUrl={videoPlaying} />
          <VideoDetails />
        </div>
        <div className="col-md-4">
          <div className="courseCricullum box-shadow">
            <CurriculumSub openState="0" changeVideo={changeVideo} />
            <CurriculumSub />
            <CurriculumSub />
            <CurriculumSub />
            <CurriculumSub />
          </div>
        </div>
      </div>
    </div>
  );
};

// https://media.w3.org/2010/05/sintel/trailer_hd.mp4
export default LecturePortal;
