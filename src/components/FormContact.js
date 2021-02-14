import { useState, useEffect } from 'react';
import { IoCheckmarkCircle, IoTrashOutline } from 'react-icons/io5';

function FormContact({
  isUpdate,
  onAddUpdateContact,
  contactToUpdate,
  onUpdateContact,
  showAddForm,
  closeForm,
}) {
  const [errorMessage, setErrorMessage] = useState('');

  
  useEffect(() => {
    if (!contactToUpdate?.id) {
      onUpdateContact({
        id: '',      
        fullName: '',
        email: '',
        mobile: '',
        description: '',
      });
    }
  // eslint-disable-next-line
  }, [showAddForm]);

  //Validations
  function validFields() {
    const fieldsIgnore = ['id', 'description'];
    let errorFields = [];

    // eslint-disable-next-line
    Object.keys(contactToUpdate).map((input) => {
      if (!contactToUpdate[input] && !fieldsIgnore.includes(input)) {
        errorFields.push(input);
      }
    });
    return errorFields;
  }

  function onSubmit(e) {
    e.preventDefault();

    if (validFields().length) {
      setErrorMessage(`Please fill out: ${validFields().join(', ')}`);
      return;
    }

    //Clean error message
    setErrorMessage('');

    onAddUpdateContact(contactToUpdate, !!contactToUpdate);
  }

  function discart() {
    if (
      window.confirm(
        `Discart message \n Are you sure you want to discart the changes?`
      )
    ) {
      closeForm();
      setErrorMessage('');
    }
  }

  return (
    <form
      className={`add-form ${showAddForm ? 'show' : 'hide'}`}
      onSubmit={onSubmit}
    >
      <h3 className="title">{isUpdate ? 'Update' : 'Add new'} contact</h3>

      <div className="form-control">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={contactToUpdate?.fullName}
          onChange={(e) =>
            onUpdateContact({ ...contactToUpdate, fullName: e.target.value })
          }
          disabled={!showAddForm}
        />
      </div>
      <div className="form-control">
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={contactToUpdate?.email}
          onChange={(e) =>
            onUpdateContact({ ...contactToUpdate, email: e.target.value })
          }
          disabled={!showAddForm}
        />
      </div>
      <div className="form-control">
        <label>Mobile</label>
        <input
          type="text"
          placeholder="Mobile"
          value={contactToUpdate?.mobile}
          onChange={(e) =>
            onUpdateContact({ ...contactToUpdate, mobile: e.target.value })
          }
          disabled={!showAddForm}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={contactToUpdate?.description}
          onChange={(e) =>
            onUpdateContact({
              ...contactToUpdate,
              description: e.target.value,
            })
          }
          disabled={!showAddForm}
        />
      </div>

      {errorMessage && <p className="msg-error">{errorMessage}</p>}
      <button
        className={`btn btn-block btn-success mb ${
          errorMessage && 'glow-danger'
        }`}
        type="submit"
        disabled={!showAddForm}
      >
        <IoCheckmarkCircle className="icon icon-text" />
        {isUpdate ? 'Update Contact' : 'Add new Contact'}
      </button>

      <button
        className="btn btn-block btn-danger"
        type="button"
        onClick={discart}
        disabled={!showAddForm}
      >
        <IoTrashOutline className="icon icon-text" />
        {isUpdate ? 'Discart update' : 'Discart new contact'}
      </button>
    </form>
  );
}

export default FormContact;
