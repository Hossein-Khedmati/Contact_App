import React, { useState, useEffect, useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { validateForm } from "../Functions/ValidateForm";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";

import styles from "./ModalForm.module.css";

const ModalForm = ({ closeModal, editingContact, setEditingContact }) => {
  const { addContact, updateContact } = useContext(ContactContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingContact) {
      updateContact(formData);
      setEditingContact(null);
    } else {
      addContact(formData);
    }

    setFormData({ name: "", email: "", phone: "", job: "" });
    setErrors({});
    closeModal();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>{editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              placeholder="نام"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.name ? styles.errorInput : ""
              }`}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.email ? styles.errorInput : ""
              }`}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div>
            <input
              name="phone"
              placeholder="تلفن"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.phone ? styles.errorInput : ""
              }`}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          <div>
            <input
              name="job"
              placeholder="شغل"
              value={formData.job}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.job ? styles.errorInput : ""
              }`}
            />
            {errors.job && <p style={{ color: "red" }}>{errors.job}</p>}
          </div>

          <button className={styles.addbutton} type="submit">
            {editingContact ? "ذخیره تغییرات" : "افزودن"}
          </button>

          <button
            className={styles.closebutton}
            type="button"
            onClick={closeModal}
          >
            <RxCross2 />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
