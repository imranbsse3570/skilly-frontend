import React from "react";

const CategoriesSidebar = () => {
  return (
    <div className="widget box-shadow categories container border py-3">
      <h3 className="widget-title mb-3">Categories</h3>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a href="#">
            App Design <span className="float-right">(5)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            Web Design <span className="float-right">(9)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            UI-UX Design <span className="float-right">(23)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            Print Design <span className="float-right">(7)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            Game Design <span className="float-right">(3)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            Graphic Design <span className="float-right">(2)</span>
          </a>
        </li>
        <li className="list-group-item">
          <a href="#">
            Logo Design <span className="float-right">(5)</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
