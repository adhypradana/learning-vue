<template>
  <img class="logo" src="../assets/logo.png" />
  <h1>Welcome to Gensentials</h1>
  <p><b>Don't have an account?</b></p>
  <p><b>Sign Up Here</b></p>
  <div class="register">
    <!-- Name Input -->
    <input v-model="name" :class="{'input-error': nameError}" type="text" placeholder="Enter your first name" />
    <span class="error" v-if="nameError">{{ nameError }}</span>

    <!-- Email Input -->
    <input v-model="email" :class="{'input-error': emailError}" type="email" placeholder="Enter your email" />
    <span class="error" v-if="emailError">{{ emailError }}</span>

    <!-- Phone Input -->
    <input v-model="phone" :class="{'input-error': phoneError}" type="tel" placeholder="Enter your phone number" />
    <span class="error" v-if="phoneError">{{ phoneError }}</span>

    <button :disabled="!isFormValid" @click="signUpUser" class="button"><b>Sign Up</b></button>
    <!-- Error Message for Disabled Button Click -->
    <span class="form-error" v-if="showFormError">Please fill in all the fields correctly.</span>
  </div>
</template>

<script>
import { addUser, getUsers } from '../db/db';  // Adjust the relative path

export default {
  name: 'SignUpForm',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      nameError: '',
      emailError: '',
      phoneError: '',
      users: [],
      showFormError: false, // State to show error when clicking disabled button
    };
  },
  methods: {
    // Handle button click
    handleButtonClick() {
      // If the form is valid, proceed to sign up the user
      if (this.isFormValid) {
        this.signUpUser();
      } else {
        // If form is invalid, show an error message
        this.showFormError = true;
        setTimeout(() => {
          this.showFormError = false;
        }, 3000); // Hide error after 3 seconds
      }
    },
  async signUpUser() {
    console.log('SignUpUser method triggered');
    
    // Validate all fields before proceeding
    this.validateName();
    this.validateEmail();
    this.validatePhone();

    console.log('Validation Errors:', {
      nameError: this.nameError,
      emailError: this.emailError,
      phoneError: this.phoneError
    });

    // Proceed if there are no validation errors
    if (!this.nameError && !this.emailError && !this.phoneError) {
      const user = {
        name: this.name,
        email: this.email,
        phone: this.phone,
      };

      try {
        console.log('Adding user to IndexedDB:', user);
        await addUser(user);
        alert('User signed up successfully!');
        this.resetForm();
        this.loadUsers();
      } catch (error) {
        console.error('Error in adding user:', error);
        if (error.name === 'ConstraintError') {
          alert('Email already exists. Please use a different email.');
        } else {
          alert('Error signing up. Please try again.');
          }
        }
      }
    },

    // Validation methods
    validateName() {
  if (!this.name) {
    this.nameError = 'Please input your name';
  } else if (this.name.length < 3) {
    this.nameError = 'Name must be at least 3 characters long';
  } else {
    this.nameError = '';
  }
},
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Please input your email address';
      } else if (!emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format';
      } else {
        this.emailError = '';
      }
    },
    validatePhone() {
  const phonePattern = /^\d{10}$/;  // Example for a 10-digit phone number
  if (!this.phone) {
    this.phoneError = 'Please input your phone number';
  } else if (!/^\d+$/.test(this.phone)) {
    this.phoneError = 'Phone number must contain only numbers.';
  } else if (!phonePattern.test(this.phone)) {
    this.phoneError = 'Phone number must be exactly 10 digits.';
  } else {
    this.phoneError = '';
  }
},

    // Load users from IndexedDB
    async loadUsers() {
      this.users = await getUsers();
    },
    // Reset form fields
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.nameError = '';
      this.emailError = '';
      this.phoneError = '';
    },
  },
  computed: {
    isFormValid() {
      return (
        this.name &&
        !this.nameError &&
        this.email &&
        !this.emailError &&
        this.phone &&
        !this.phoneError
      );
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.logo {
  width: 400px;
}
.register {
  text-align: center;
}
.register input {
  width: 180px;
  height: 5px;
  padding: 15px;
  display: block;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  border: 2px solid gray;
  transition: border-color 0.3s ease;
}
.register button {
  width: 160px;
  height: 30px;
  border: 2px solid grey;
  background: #686868;
  color: white;
  cursor: pointer;
}
.register button:disabled {
  background-color: grey;
  cursor: not-allowed;
}
.error {
  color: red;
  font-size: 12px;
  display: block;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
}
.form-error {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
.input-error {
  border-color: red;
}
</style>
