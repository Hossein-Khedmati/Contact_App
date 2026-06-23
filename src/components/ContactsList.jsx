import React, { useContext, useState } from "react";
import { ContactContext } from "../context";
import ConfirmModal from "./ConfirmModal";
import styles from "./ContactList.module.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ContactList = ({
  setEditingContact,
  setShowModal,
  searchTerm,
  selectMode,
}) => {
  const { contacts, deleteContact, deleteMultipleContacts } =
    useContext(ContactContext);

  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact?.name?.toLowerCase().includes(term) ||
      contact?.email?.toLowerCase().includes(term)
    );
  });

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setDeleteMode("multiple");
    setShowConfirm(true);
  };

  if (!contacts || contacts.length === 0)
    return <p className={styles.empty}>مخاطبی یافت نشد.</p>;

  const confirmMessage =
    deleteMode === "single"
      ? "آیا مطمئنی که می‌خوای این مخاطب را حذف کنی؟"
      : `آیا مطمئنی که می‌خوای ${selectedIds.length} مخاطب انتخاب‌شده را حذف کنی؟`;

  const handleConfirmDelete = () => {
    if (deleteMode === "single" && contactToDelete) {
      deleteContact(contactToDelete);
      setSuccessMessage("مخاطب با موفقیت حذف شد ✅");
    } else if (deleteMode === "multiple") {
      deleteMultipleContacts(selectedIds);
      setSuccessMessage(`${selectedIds.length} مخاطب با موفقیت حذف شدند ✅`);
      setSelectedIds([]);
    }

    setDeleteMode(null);
    setContactToDelete(null);
    setShowConfirm(false);

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <>
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4 shadow">
          {successMessage}
        </div>
      )}

      {selectMode && selectedIds.length > 0 && (
        <button onClick={handleDeleteSelected} className={styles.deleteAll}>
          <FaTrashAlt color="#d9d9d9" /> حذف ({selectedIds.length})
        </button>
      )}

      <div className={styles.contactList}>
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              <div className={styles.listItemsContainer}>
                <ul className={styles.listItems}>
                  <li>
                    {selectMode && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(contact.id)}
                        onChange={() => toggleSelect(contact.id)}
                      />
                    )}
                  </li>
                  <li>{contact.name}</li>
                  <li>{contact.email}</li>
                  <li>{contact.phone}</li>
                  <li>{contact.job}</li>
                </ul>
              </div>
              <div className={styles.listButtons}>
                <button
                  onClick={() => {
                    setEditingContact(contact);
                    setShowModal(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setDeleteMode("single");
                    setContactToDelete(contact.id);
                    setShowConfirm(true);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        message={confirmMessage}
        onCancel={() => {
          setDeleteMode(null);
          setContactToDelete(null);
          setShowConfirm(false);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ContactList;
