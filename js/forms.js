/**
 * TAURUS TAX GROUP - FORM VALIDATION & HANDLING
 * Client-side form validation and submission handling
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // FORM VALIDATION
  // ============================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      clearErrors();

      // Validate form
      const isValid = validateForm(this);

      if (isValid) {
        // Show success message
        showSuccessMessage();

        // Reset form
        this.reset();

        // Scroll to success message
        const successMessage = document.querySelector('.form-success');
        if (successMessage) {
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Real-time validation on blur
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      // Remove error styling on input
      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          this.classList.remove('error');
          const errorMsg = this.parentElement.querySelector('.form-error');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
    });
  }

  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================

  function validateForm(form) {
    let isValid = true;
    const formControls = form.querySelectorAll('.form-control');

    formControls.forEach(control => {
      if (!validateField(control)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const fieldType = field.type;
    const fieldName = field.getAttribute('name');

    // Required field check
    if (isRequired && value === '') {
      showError(field, `${getFieldLabel(field)} is required.`);
      return false;
    }

    // Email validation
    if (fieldType === 'email' && value !== '') {
      if (!isValidEmail(value)) {
        showError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    // Phone validation (basic)
    if (fieldName === 'phone' && value !== '') {
      if (!isValidPhone(value)) {
        showError(field, 'Please enter a valid phone number.');
        return false;
      }
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's between 10-15 digits (international format)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }

  function getFieldLabel(field) {
    const label = field.parentElement.querySelector('.form-label');
    if (label) {
      return label.textContent.replace('*', '').trim();
    }
    return field.getAttribute('name') || 'This field';
  }

  // ============================================
  // ERROR HANDLING
  // ============================================

  function showError(field, message) {
    field.classList.add('error');

    // Remove existing error message if any
    const existingError = field.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Create and insert error message
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    field.parentElement.appendChild(errorElement);
  }

  function clearErrors() {
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
    });

    const errorMessages = document.querySelectorAll('.form-error');
    errorMessages.forEach(msg => {
      msg.remove();
    });

    const successMessages = document.querySelectorAll('.form-success');
    successMessages.forEach(msg => {
      msg.remove();
    });
  }

  // ============================================
  // SUCCESS MESSAGE
  // ============================================

  function showSuccessMessage() {
    const form = document.getElementById('contact-form');

    // Remove existing success message if any
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
      existingSuccess.remove();
    }

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
      <strong>Thank you for your inquiry!</strong><br>
      Your message has been received. A member of our team will contact you within 1-2 business days to schedule your consultation.
    `;
    successDiv.setAttribute('role', 'status');
    successDiv.setAttribute('aria-live', 'polite');

    // Insert before form
    if (form) {
      form.parentElement.insertBefore(successDiv, form);
    }

    // Auto-remove after 10 seconds
    setTimeout(() => {
      successDiv.style.transition = 'opacity 0.5s ease';
      successDiv.style.opacity = '0';
      setTimeout(() => successDiv.remove(), 500);
    }, 10000);
  }

  // ============================================
  // PHONE NUMBER FORMATTING (OPTIONAL)
  // ============================================

  const phoneInputs = document.querySelectorAll('input[name="phone"]');

  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      // Simple formatting for US phone numbers
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 0) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }

      e.target.value = value;
    });
  });

  console.log('Taurus Tax Group - Forms JS Loaded');
});