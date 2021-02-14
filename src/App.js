import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Contacts from './components/Contacts';
import FormContact from './components/FormContact';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const apiServer = 'http://localhost:9090/contact'; //For PRD deployment it should be an environment variable

  const [showAddForm, setShowAddForm] = useState({ show: false, isNew: true });

  const [contacts, setContacts] = useState([]);

  const [contactToUpdate, setContactToUpdate] = useState({});

  const [isUpdate, setIsUpdate] = useState(false);

  const [textToSearch, setTextToSearch] = useState('');

  const [contactsAfterSearch, setContactsAfterSearch] = useState();

  useEffect(() => {
    const getContacts = async () => {
      const contactsFromServer = await fetchContacts();
      setContacts(contactsFromServer);
    };
    getContacts();
  }, []);

  //Fetch contacts
  const fetchContacts = async () => {
    const res = await fetch(apiServer);
    const data = await res.json();
    return data;
  };

  //Delete contacts
  const deleteContact = async (id) => {
    await fetch(apiServer + `/${id}`, { method: 'DELETE' });

    setContacts(contacts.filter((contact) => contact.id !== id));

    if (contactsAfterSearch) {
      setContactsAfterSearch(contacts.filter((contact) => contact.id !== id));
      setTextToSearch('');
    }
  };

  const onUpdateContact = ({ contact, isNew }) => {
    setShowAddForm({ show: true, isNew });
    setIsUpdate(true);
    setContactToUpdate(contact);
  };

  const onAdd = () => {
    //clean search and list
    setContactsAfterSearch();
    setTextToSearch('');

    setContactToUpdate();
    setIsUpdate(false);
    setShowAddForm({ ...showAddForm, show: !showAddForm.show });
  };

  const updateContact2 = (contact) => {
    setContactToUpdate(contact);
  };

  const addUpdateContact = async (contact) => {
    isUpdate ? updateContact(contact) : addContact(contact);
    setContactToUpdate();
    setIsUpdate(false);
    setShowAddForm({ ...showAddForm, show: !showAddForm.show });
  };

  //Update Contact
  const updateContact = async (contact) => {
    const res = await fetch(apiServer + `/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(contact),
    });
    const data = await res.json();

    setContacts(
      contacts.map((_contact) => (_contact.id === contact.id ? data : _contact))
    );

    if (contactsAfterSearch) {
      setContactsAfterSearch(
        contactsAfterSearch.map((_contact) =>
          _contact.id === contact.id ? data : _contact
        )
      );
    }
  };

  //Creating new Contact
  const addContact = async (contact) => {
    const res = await fetch(apiServer, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(contact),
    });

    const newContact = await res.json();

    setContacts([...contacts, newContact]);
  };

  function filterContacts(_text) {
    let searchText = _text.replace(/[^a-zA-Z0-9 ]/g, '');
    setTextToSearch(searchText);

    const filteredData = contacts.filter((contact) => {
      return Object.keys(contact).some((key) =>
        contact[key].toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setContactsAfterSearch(filteredData);
  }

  return (
    <Router>
      <div>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <div className="container">
                <div
                  className={`list-container ${
                    showAddForm.show ? 'disable' : ''
                  }`}
                >
                  <Header
                    onAdd={onAdd}
                    isSearch={textToSearch}
                    textToSearch={textToSearch}
                    filterContacts={filterContacts}
                    isAddFormShowing={showAddForm.show}
                  />
                  <Contacts
                    contacts={
                      contactsAfterSearch ? contactsAfterSearch : contacts
                    }
                    onDelete={deleteContact}
                    onUpdateContact={onUpdateContact}
                  />
                </div>
                <FormContact
                  isUpdate={isUpdate}
                  onAddUpdateContact={addUpdateContact}
                  contactToUpdate={contactToUpdate}
                  onUpdateContact={updateContact2}
                  update={showAddForm.isNew}
                  showAddForm={showAddForm.show}
                  closeForm={onAdd}
                />
              </div>
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
