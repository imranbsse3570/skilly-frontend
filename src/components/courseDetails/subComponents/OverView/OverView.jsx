import React from "react";
const OverView = () => {
  return (
    <div className="container p-3 border border-top-0">
      <div className="tab-pane">
        <h4 className="tab-title">This course includes</h4>

        <ul className="tab-list-2col mb-4 list-unstyled row">
          <li className="col-md-6 pb-1">
            <i className="fas fa-video pr-2"></i>
            <i className="ti-video-camera"></i>48.5 hours on-demand video
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-cloud-download-alt pr-2"></i>
            <i className="ti-download"></i>12 downloadable resources
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-mobile-alt pr-2"></i>
            <i className="ti-tablet"></i>Access on mobile and TV
          </li>
          <li className="col-md-6 pb-1">
            <i className="fas fa-pencil-alt pr-2"></i>
            <i className="ti-pencil"></i>57 articles
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
        <p>
          Rorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt esse
          architecto delectus at facere maxime totam dolorem eum eligendi ullam
          laudantium officia temporibus repellat nostrum neque, debitis atque
          sint impedit nemo ipsum! Adipisci dolores ducimus numquam ad cumque
          possimus? Ex.
        </p>
        <h4 className="tab-title">Requirements for this course</h4>
        <ul className="list-unstyled">
          <li>
            <i className="far fa-hand-point-right pr-2"></i>
            <i className="ti-hand-point-right"></i>Phasellus sit amet velit
            auctor turpis rhoncus.
          </li>
          <li>
            <i className="far fa-hand-point-right pr-2"></i>
            <i className="ti-hand-point-right"></i>Phasellus sed dolor sodales,
            eleifend ipsum eu.
          </li>
          <li>
            <i className="far fa-hand-point-right pr-2"></i>
            <i className="ti-hand-point-right"></i>Nullam id dolor in ex
            eleifend tempus.
          </li>
          <li>
            <i className="far fa-hand-point-right pr-2"></i>
            <i className="ti-hand-point-right"></i>Etiam id lorem vel neque
            faucibus fermentum.
          </li>
          <li>
            <i className="far fa-hand-point-right pr-2"></i>
            <i className="ti-hand-point-right"></i>Nunc tincidunt augue in enim
            sollicitudin feugiat.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverView;
