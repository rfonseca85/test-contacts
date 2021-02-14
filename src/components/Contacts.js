import Contact from './Contact';

function Contacts({ contacts, onDelete, onUpdateContact }) {
  return (
    <div>
      {contacts.length > 0
        ? contacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onUpdateContact={onUpdateContact}
            />
          ))
        : 'No Contacts'}
    </div>
  );
}

export default Contacts;
