import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
export const SearchBox = (props) => {
  const { onSubmit } = props;
  const [searchText, setSearchText] = useState("");
  const typeSetTime = useRef(null);

  const handleChangeSubmit = (e) => {
    const value = e.target.value;
    console.log(e.target.value);

    setSearchText(value);
    if (!onSubmit) return;
    // clear old timeout
    if (typeSetTime.current) {
      clearTimeout(typeSetTime.current);
    }
    typeSetTime.current = setTimeout(() => {
      const formValue = {
        search: value,
      };
      onSubmit(formValue);
    }, 300);
  };

  return (
    <form className="search">
      <div className="row">
        <input value={searchText} onChange={handleChangeSubmit} />
        <button className=" button primary" type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};
