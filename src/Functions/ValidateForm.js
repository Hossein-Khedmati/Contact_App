export const validateForm = (formData) => {
  const { name, email, phone, job } = formData;

  const errors = {};

  if (!name.trim()) {
    errors.name = "نام نمی‌تواند خالی باشد.";
  } else if (name.trim().length < 3) {
    errors.name = "نام باید حداقل ۳ کاراکتر باشد.";
  } else if (name.trim().length > 20) {
    errors.name = "نام نمی‌تواند بیش از ۲۰ کاراکتر باشد.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = "ایمیل معتبر نیست.";
  }

  const phoneRegex = /^(\d{8}|\d{11})$/;
  if (!phoneRegex.test(phone)) {
    errors.phone = "شماره تلفن باید ۸ یا ۱۱ رقمی باشد.";
  }

  if (job.trim().length > 30) {
    errors.job = "شغل نمی‌تواند بیش از ۳۰ کاراکتر باشد.";
  }

  return errors;
};
