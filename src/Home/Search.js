import { useContext } from "react";
import {
  SearchValueContext,
  SearchUpdateContext,
  GlobalContext,
} from "../ContextProvider/ContextProvider";

import "./Css/Search.css";

function Search(props) {
  const searchValue = useContext(GlobalContext).searchQuery;
  const searchUpdate = useContext(GlobalContext).setSearchQuery;

  return (
    <div className="searchBase">
      <input
        type="search"
        placeholder="Search Here"
        fontSize="20px"
        onChange={(e) => searchUpdate(e.target.value)}
        value={searchValue}
      />
    </div>
  );
}

export default Search;
