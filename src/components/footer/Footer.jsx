import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";

function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    callback && callback(eventKey);
  });

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      className={`btn ${isCurrentEventKey ? "is-drop-open" : ""}`}
      onClick={decoratedOnClick}
      style={{ color: "#0c2e60" }}
    >
      {children}
    </button>
  );
}

const Footer = ({ data }) => {
  let rows =
    data.settings.map((item, index) => {
      return (
        <div
          key={`${item.id}--${index}`}
          className="col-md-3 col-sm-6 stats-item"
        >
          <Accordion defaultActiveKey="0">
            <ContextAwareToggle eventKey="0">
              <h4 className="inner-accoordion-title">
                {item.title}
                <i className="d-sm-block d-md-none inner-accordion-icon fas fa-plus"></i>
              </h4>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="0">
              <div className="">
                <ul className="list-group list-group-flush">
                  {item.links.map((link, key) => {
                    return (
                      <li
                        key={`${link}--${key}`}
                        className="list-group-item bg-transparent py-1"
                        style={{ borderBottom: "none" }}
                      >
                        <NavLink
                          to={link.linkUrl}
                          as="a"
                          className="footer-link"
                        >
                          {link.linkName}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
      );
    }) || "";

  return (
    <footer className="site-footer">
      <div className="container py-5">
        <div className="row">{rows}</div>
      </div>
      <div className="foo-btm">
        <div className="container">
          <p className="copyright">
            Copyright © 2021{" "}
            <NavLink to={`/`} as="a">
              skilly.com
            </NavLink>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
