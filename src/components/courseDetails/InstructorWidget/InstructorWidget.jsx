import React from "react";
import { NavLink as Link } from "react-router-dom";

const InstructorWidget = ({ author }) => {
  return (
    <div className="box-shadow widget instractors text-center border container py-3">
      <figure>
        <img
          src={`https://skilly-online.herokuapp.com/files/users/${author.photo}`}
          alt=""
          width="150"
          height="150"
          className="rounded-circle"
        />
      </figure>
      <h4>{author.name}</h4>
      <span>{author.designation}</span>
      <div className="socials">
        {author.facebookLink ? (
          <Link
            to={`${author.facebookLink}`}
            className="facebook p-1"
            as="a"
            target="_blank"
          >
            <i className="fab fa-facebook-f"></i>
          </Link>
        ) : (
          <></>
        )}
        {author.twitterLink ? (
          <Link to={`${author.twitterLink}`} className="twitter p-1" as="a">
            <i className="fab fa-twitter"></i>
          </Link>
        ) : (
          <></>
        )}
        {author.linkedInLink ? (
          <Link to={`${author.linkedInLink}`} className="linkedin p-1" as="a">
            <i className="fab fa-linkedin-in"></i>
          </Link>
        ) : (
          <></>
        )}
        {author.youtubeLink ? (
          <Link to={`${author.youtubeLink}`} className="youtube p-1" as="a">
            <i className="fab fa-youtube"></i>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InstructorWidget;
