import "./custom.css";
import React, { useState, useEffect } from "react";
//import classnames from 'classnames';
import lodash from "lodash";
import axios from "axios";

const ITEMS_API_URL = "";
const DEBOUNCE_DELAY = 500;

function Autocomplete() {
  // const [display, setDispaly] = useState(false);
  const [users, setUser] = useState([]);
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  // const [search, setSearch] = useState("");
  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get("https://reqres.in/api/users");
      //  console.log("A", response.data.data);
      setUser(response.data.data);
    };
    loadUsers();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestion([]);
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestion(matches);
    setText(text);
  };

  return (
    <div className="wrapper">
      <div
        className="col-md-12 control justify-content-md-center"
        style={{ marginTop: 10 }}
      >
        <input
          type="text"
          className="input"
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          onBlur={() => {
            setTimeout(() => {
              setSuggestion([]);
            }, 100);
          }}
        />
      </div>
      {suggestion &&
        suggestion.map((suggestion, i) => (
          <div
            className=" col-md-12 list is-hoverable"
            key={i}
            onClick={() => onSuggestHandler(suggestion.email)}
          >
            {suggestion.email}
          </div>
        ))}

      {/* <div className="list is-hoverable"></div> */}
    </div>
  );
}

export default Autocomplete;
