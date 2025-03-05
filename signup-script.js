document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const accountTypeInput = document.getElementById('accountType');
    const termsAgreement = document.getElementById('termsAgreement');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const accountTypeError = document.getElementById('accountTypeError');
    const termsError = document.getElementById('termsError');

    const successModal = document.getElementById('successModal');
    const closeModalButton = document.getElementById('closeModal');

    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        
        if (!fullName) {
            fullNameError.textContent = 'Full name is required';
            return false;
        }
        if (!nameRegex.test(fullName)) {
            fullNameError.textContent = 'Enter a valid full name (2-50 characters, letters only)';
            return false;
        }
        fullNameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = 'Email is required';
            return false;
        }
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!password) {
            passwordError.textContent = 'Password is required';
            return false;
        }
        if (!passwordRegex.test(password)) {
            passwordError.textContent = 'Password must be 8+ chars, include uppercase, lowercase, number, and special character';
            return false;
        }
        passwordError.textContent = '';
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Please confirm your password';
            return false;
        }
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            return false;
        }
        confirmPasswordError.textContent = '';
        return true;
    }

    function validatePhoneNumber() {
        const phoneNumber = phoneNumberInput.value.trim();
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            phoneNumberError.textContent = 'Enter a valid phone number';
            return false;
        }
        phoneNumberError.textContent = '';
        return true;
    }

    function validateAccountType() {
        const accountType = accountTypeInput.value;
        
        if (!accountType) {
            accountTypeError.textContent = 'Please select an account type';
            return false;
        }
        accountTypeError.textContent = '';
        return true;
    }

    function validateTerms() {
        if (!termsAgreement.checked) {
            termsError.textContent = 'You must agree to the Terms of Service';
            return false;
        }
        termsError.textContent = '';
        return true;
    }

    function validateForm(event) {
        event.preventDefault();

        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneNumberValid = validatePhoneNumber();
        const isAccountTypeValid = validateAccountType();
        const isTermsAccepted = validateTerms();

        if (isFullNameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isPhoneNumberValid && 
            isAccountTypeValid && isTermsAccepted) {
            // Collect form data
            const formData = {
                fullName: fullNameInput.value,
                email: emailInput.value,
                accountType: accountTypeInput.value,
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                    .map(checkbox => checkbox.value),
                phoneNumber: phoneNumberInput.value
            };

            // Simulate form submission (replace with actual backend call)
            console.log('Form submitted:', formData);
            
            // Show success modal
            successModal.style.display = 'flex';
        }
    }

    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    phoneNumberInput.addEventListener('blur', validatePhoneNumber);
    accountTypeInput.addEventListener('change', validateAccountType);
    termsAgreement.addEventListener('change', validateTerms);

    form.addEventListener('submit', validateForm);

    closeModalButton.addEventListener('click', function() {
        successModal.style.display = 'none';
        form.reset();
    });
});