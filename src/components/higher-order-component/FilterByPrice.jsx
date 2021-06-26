import React from "react";
import Form from "react-bootstrap/Form";
import currencyFormatter from "currency-formatter";

const FilterByPrice = ({ moneyMax, moneyFilterHandleChange }) => {
  return (
    <div className="box-shadow filter-by-price container py-2 border">
      <Form>
        <Form.Group controlId="formBasicRange">
          <Form.Label>
            Price
            {`(${currencyFormatter.format(0, {
              code: "USD",
            })} - ${currencyFormatter.format(moneyMax, { code: "USD" })})`}
          </Form.Label>
          <Form.Control
            onChange={moneyFilterHandleChange}
            type="range"
            min="0"
            max="5000"
            step="1"
            value={moneyMax}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default FilterByPrice;
