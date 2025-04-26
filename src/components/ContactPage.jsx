import React, { useState } from "react";
import ContactList from "./ContactsList";
import ModalForm from "./ModalForm";

import { IoMdPersonAdd } from "react-icons/io";
import styles from "./ContactPage.module.css";
import { LuListCheck, LuListChecks } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);

  const openAddModal = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <h2>دفترچه مخاطبین</h2>
      <div className={styles.navbar}>
      <input
        type="text"
        placeholder="جستجو در مخاطبین..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={openAddModal}><IoMdPersonAdd fontSize={"1.6rem"}/></button>
      <button
        onClick={() => setSelectMode(!selectMode)}
        style={{
          backgroundColor: selectMode ? "#ff3535" : "#d6d6d6",
        }}
      >
        {selectMode ? <RxCross2 fontSize={"1.6rem"}/> : <LuListChecks fontSize={"1.6rem"}/>}
      </button>
      </div>
      <ContactList
        setEditingContact={setEditingContact}
        setShowModal={setShowModal}
        searchTerm={searchTerm}
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      />

      {showModal && (
        <ModalForm
          closeModal={() => setShowModal(false)}
          editingContact={editingContact}
          setEditingContact={setEditingContact}
        />
      )}
    </div>
  );
};

export default ContactPage;
