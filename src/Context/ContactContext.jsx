import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const ContactContext = createContext();

const contactReducer = (state, action) => {

  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, { ...action.payload, id: uuidv4() }];
    case "UPDATE_CONTACT":
      return state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
    case "DELETE_CONTACT":
      return state.filter((contact) => contact.id !== action.payload);
    case "DELETE_MULTIPLE":
      return state.filter((contact) => !action.payload.includes(contact.id));
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, [], () => {
    // مقدار اولیه از localStorage بخوانیم
    const localData = localStorage.getItem("contacts");
    return localData ? JSON.parse(localData) : [];
  });

  // هر وقت contacts تغییر کرد، توی localStorage ذخیره کن
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  const updateContact = (contact) => {
    dispatch({ type: "UPDATE_CONTACT", payload: contact });
  };

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const deleteMultipleContacts = (ids) => {
    dispatch({ type: "DELETE_MULTIPLE", payload: ids });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        deleteMultipleContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
