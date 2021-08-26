import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";

import MediaPlayer from "../higher-order-component/MediaPlayer";
import Curriculum from "./VideoDetails/Curriculum";
import VideoDetails from "./VideoDetails/VideoDetails";
import { GlobalContext, LoadingSpinnerContext } from "../../App";
import { getCourseData } from "../../services/course";
import { viewLecture } from "../../services/lecture";

const LecturePortal = () => {
  const { courseId } = useParams();
  const { userData } = useContext(GlobalContext);
  const { setRunSpinner } = useContext(LoadingSpinnerContext);

  const [courseData, setCourseData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [blobDownload, setBlobDownload] = useState(undefined);

  useEffect(() => {
    const fetchingData = async () => {
      setRunSpinner(true);
      const result = await getCourseData(courseId);
      if (result.status.toLowerCase() === "success") {
        if (result.results > 0) {
          const course = result.data.docs[0];
          const purchase = userData.courses
            .map((course) => course.courseId)
            .includes(course._id.toString());
          setCourseData(course);
          setIsPurchased(purchase);

          if (purchase) {
            if (course.lectures.length > 0) {
              const lecture = course.lectures[0];
              await viewLecture(course._id, lecture.source)
                .then(function (myBlob) {
                  setBlobDownload({ blob: myBlob, title: lecture.title });
                  var objectURL = URL.createObjectURL(myBlob);
                  setVideoUrl(objectURL);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setVideoUrl("http://media.w3.org/2010/05/bunny/movie.mp4");
            }
          }
        }
      }
      setRunSpinner(false);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchingData();
    }
  }, [isLoading]);

  return (
    <div className="lecture_portal_page container py-5">
      {userData ? (
        !isLoading ? (
          <div>
            {courseData ? (
              isPurchased ? (
                <div className="row">
                  <div className="col-md-8">
                    <Button
                      style={{
                        position: "absolute",
                        zIndex: 9,
                        right: "20px",
                        top: "5px",
                      }}
                      onClick={() => {
                        if (blobDownload) {
                          saveAs(
                            blobDownload.blob,
                            `${blobDownload.title}.mp4`
                          );
                        }
                      }}
                    >
                      <i className="fas fa-download"></i>
                    </Button>
                    <MediaPlayer className="box-shadow" videoUrl={videoUrl} />
                    <VideoDetails courseData={courseData} />
                  </div>
                  <div className="col-md-4">
                    <div className="courseCricullum box-shadow">
                      {courseData.lectures.map((lecture) => (
                        <Curriculum
                          openState="1"
                          setVideoUrl={setVideoUrl}
                          lecture={lecture}
                          courseId={courseData._id}
                          setBlobDownload={setBlobDownload}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p>Please Purchase this course inorder to view lectures</p>
              )
            ) : (
              <p>Course Not Found</p>
            )}
          </div>
        ) : (
          <></>
        )
      ) : (
        <p>Please Login to view this resource</p>
      )}
    </div>
  );
};

export default LecturePortal;
