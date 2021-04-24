import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
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
      class={`btn btn-link ${isCurrentEventKey ? "is-drop-open" : ""}`}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const Footer = ({ data }) => {
  let rows =
    data.settings.map((item, index) => {
      return (
        <div className="col-md-3 col-sm-6 stats-item">
          <Accordion defaultActiveKey="0">
            <ContextAwareToggle eventKey="0">
              <p className="inner-accoordion-title">
                {item.title}
                <i class="d-sm-block d-md-none inner-accordion-icon fas fa-plus"></i>
              </p>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="0">
              <div className="">
                <ul className="list-group list-group-flush">
                  {item.links.map((link, key) => {
                    return (
                      <li
                        className="list-group-item bg-transparent"
                        style={{ borderBottom: "none" }}
                      >
                        <a href={link.linkUrl}>{link.linkName}</a>
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
    <footer class="site-footer">
      <div className="container py-5">
        <div className="row">{rows}</div>
      </div>
    </footer>
  );
};

export default Footer;
