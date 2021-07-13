import React, { useRef } from "react";
import Form from "react-bootstrap/Form";

const ListInput = ({ requirements, setRequirements, placeholder }) => {
  const inputRef = useRef();
  const addbutton = useRef();

  const onListAdd = () => {
    const data = inputRef.current.value.trim();

    if (data.length > 0 && !requirements.includes(data)) {
      setRequirements([...requirements, data]);
    }
    inputRef.current.value = "";
  };

  return (
    <div>
      {requirements.length > 0 ? (
        <ul className="list-unstyled">
          {requirements.map((require, index) => (
            <li
              style={{ cursor: "pointer", position: "relative" }}
              key={index}
              className="border box-shadow py-1 px-2 my-2 rounded"
            >
              {require}
              <span
                className="rounded-circle border list-input-cross-button"
                style={{ float: "right" }}
                onClick={() => {
                  const data = requirements.filter((item) => item !== require);
                  setRequirements(data);
                }}
              >
                <i className="fas fa-plus"></i>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      <div style={{ position: "relative" }}>
        <Form.Control
          onKeyUp={function (e) {
            if (e.keyCode === 13) {
              addbutton.current.click();
            }
          }}
          as="textarea"
          placeholder={placeholder}
          ref={inputRef}
        />
        <span
          className="rounded-circle list-input-add-button"
          onClick={onListAdd}
          ref={addbutton}
        >
          <i className="fas fa-plus"></i>
        </span>
      </div>
    </div>
  );
};

export default ListInput;
