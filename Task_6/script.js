document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent actual form submission

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const successMessage = document.getElementById('successMessage');

  let valid = true;

  // Reset messages
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  successMessage.textContent = '';

  // Name validation
  if (name === '') {
    nameError.textContent = 'Name is required.';
    valid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    emailError.textContent = 'Email is required.';
    valid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Message validation
  if (message === '') {
    messageError.textContent = 'Message is required.';
    valid = false;
  }

  // Final check
  if (valid) {
    successMessage.textContent = 'Thank you! Your message has been sent.';
   
    document.getElementById('contactForm').reset();
  }
});
