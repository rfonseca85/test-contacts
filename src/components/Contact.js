import {
  IoCreateOutline,
  IoTrashOutline,
  IoPersonCircleOutline,
  IoMail,
  IoCall,
  IoDocumentText,
} from 'react-icons/io5';

function Contact({ contact, onDelete, onUpdateContact }) {
  function handleDelete() {
    if (
      window.confirm(
        `Delete message \n Are you sure you want to delete ${contact.fullName} contact?`
      )
    ) {
      onDelete(contact.id);
    }
  }

  return (
    <div className="contact-item">
      <IoPersonCircleOutline className="profile" />
      <div className="info">
        <h3 className="fullname txt-truncate">{contact.fullName}</h3>
        <div className="column-2">
          <p className="email">
            <IoMail className="field-icon" />
            <span className="txt-truncate">{contact.email}</span>
          </p>
          <p className="mobile">
            <IoCall className="field-icon" />
            <span className="txt-truncate">{contact.mobile}</span>
          </p>
        </div>
        <p className="description">
          <IoDocumentText className="field-icon" />
          <span>{contact.description}</span>
        </p>
      </div>
      <div className="actions">
        <button
          className="btn btn-warning"
          onClick={() => onUpdateContact({ contact, new: false })}
        >
          <IoCreateOutline className="icon" />
        </button>

        <button className="btn btn-danger" onClick={() => handleDelete()}>
          <IoTrashOutline className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Contact;
