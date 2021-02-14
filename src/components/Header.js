import { useState, createRef, useEffect } from 'react';
import { IoAdd, IoSearchOutline } from 'react-icons/io5';

function Header({
  onAdd,
  isSearch,
  filterContacts,
  textToSearch,
  isAddFormShowing,
}) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  let searchInput = createRef();

  useEffect(() => {
    if (isAddFormShowing && showSearchBar) {
      setShowSearchBar(!showSearchBar);
    }
// eslint-disable-next-line  
  }, [isAddFormShowing]);

  function toggleSearch() {
    setShowSearchBar(!showSearchBar);
    !showSearchBar === true ? setFocus() : filterContacts('');

    // if add-form is show, it will close the form
    if (isAddFormShowing) {
      onAdd();
    }
  }

  function setFocus() {
    searchInput.current.focus();
  }

  return (
    <header className="header">
      <h1>{isSearch ? 'Search result' : 'List of contacts'}</h1>

      <input
        type="text"
        className={`search-bar ${showSearchBar && 'active'}`}
        name="search-bar"
        placeholder="Search"
        ref={searchInput}
        value={textToSearch}
        onChange={(e) => filterContacts(e.target.value)}
      />

      <div className="side-btns">
        <button
          className="btn btn-icon btn-secondary btn-search"
          onClick={() => toggleSearch()}
        >
          <IoSearchOutline />
        </button>
        <button className="btn btn-icon btn-success" onClick={onAdd}>
          <IoAdd />
        </button>
      </div>
    </header>
  );
}

export default Header;
