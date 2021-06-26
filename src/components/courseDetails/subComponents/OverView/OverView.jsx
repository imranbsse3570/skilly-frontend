import React from "react";
const OverView = ({
  description,
  totalDuration,
  noOfLectures,
  requirements,
}) => {
  return (
    <div className="container p-3 border border-top-0">
      <div className="tab-pane">
        <h4 className="tab-title">This course includes</h4>

        <ul className="tab-list-2col mb-4 list-unstyled row">
          <li className="col-md-6 pb-1">
            <i className="fas fa-video pr-2"></i>
            <i className="ti-video-camera"></i>
            {(totalDuration / 3600).toFixed(2)} hours on-demand video
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-cloud-download-alt pr-2"></i>
            <i className="ti-download"></i>
            {noOfLectures} downloadable resources
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-mobile-alt pr-2"></i>
            <i className="ti-tablet"></i>Access on mobile and TV
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-pencil-alt pr-2"></i>
            <i className="ti-pencil"></i>
            {noOfLectures} articles
          </li>
          <li className="col-md-6 pb-1">
            <i className="far fa-clock pr-2"></i>
            <i className="ti-timer"></i>Full lifetime access
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-ribbon pr-2"></i>
            <i className="ti-medall"></i>Certificate of Completion
          </li>
        </ul>

        <h4 className="tab-title">Description</h4>
        <p>{description}</p>
        <h4 className="tab-title">Requirements for this course</h4>
        <ul className="list-unstyled">
          {requirements.map((requirement, index) => (
            <li key={`key-${index}`}>
              <i className="far fa-hand-point-right pr-2"></i>
              <i className="ti-hand-point-right"></i>
              {requirement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverView;
