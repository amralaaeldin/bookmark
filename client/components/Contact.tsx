import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Joi from "joi-browser";
import Content from "./Content";

function Contact() {
  const schema = {
    email: Joi.string().email().required(),
  };
  const [state, setState] = useState("");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Joi.validate({ email: value.trim() }, schema, function (err: any) {
      if (err !== null) {
        setState("err");
      } else {
        setState("correct");
      }
    });
  };

  return (
    <div className="contact">
      <Content>
        <p>35,000+ already joined</p>
        <h3>
          stay up-to-date with what <br /> we're doing
        </h3>
      </Content>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="text">
          {state && (
            <div className={`bg ${state}`}>
              {(state === "err" && "whoops, make sure it's an email") ||
                (state === "correct" && "correct, thanks for subscribing")}
            </div>
          )}
          <label htmlFor="email">Email:</label>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            name="email"
            id="email"
          />
          {state === "err" && (
            <FontAwesomeIcon icon={faCircleExclamation} className="icon err" />
          )}
          {state === "correct" && (
            <FontAwesomeIcon icon={faCircleCheck} className="icon correct" />
          )}
        </div>
        <button type="submit" className="btn red">
          contact us
        </button>
      </form>
    </div>
  );
}

export default Contact;
