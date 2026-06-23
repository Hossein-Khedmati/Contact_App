import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ContactContext } from "../Context/ContactContext";
import { RxCross2 } from "react-icons/rx";
import styles from "./ModalForm.module.css";

// اسکیمای اعتبارسنجی با yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("نام نمی‌تواند خالی باشد.")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد.")
    .max(20, "نام نمی‌تواند بیش از ۲۰ کاراکتر باشد."),
  email: yup.string().required("ایمیل الزامی است.").email("ایمیل معتبر نیست."),
  phone: yup
    .string()
    .required("شماره تلفن الزامی است.")
    .matches(/^(\d{8}|\d{11})$/, "شماره تلفن باید ۸ یا ۱۱ رقمی باشد."),
  job: yup.string().max(30, "شغل نمی‌تواند بیش از ۳۰ کاراکتر باشد."),
});

const ModalForm = ({ closeModal, editingContact, setEditingContact }) => {
  const { addContact, updateContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingContact) {
      setValue("name", editingContact.name);
      setValue("email", editingContact.email);
      setValue("phone", editingContact.phone);
      setValue("job", editingContact.job);
    } else {
      reset();
    }
  }, [editingContact, setValue, reset]);

  const onSubmit = (data) => {
    const newData = { ...data };
    if (editingContact) {
      updateContact({ ...editingContact, ...data });
      setEditingContact(null);
    } else {
      addContact(newData);
    }
    reset();
    closeModal();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>{editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              placeholder="نام"
              {...register("name")}
              className={`${styles.input} ${errors.name ? styles.errorInput : ""}`}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="ایمیل"
              {...register("email")}
              className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="تلفن"
              {...register("phone")}
              className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
            />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="شغل"
              {...register("job")}
              className={`${styles.input} ${errors.job ? styles.errorInput : ""}`}
            />
            {errors.job && <p style={{ color: "red" }}>{errors.job.message}</p>}
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
