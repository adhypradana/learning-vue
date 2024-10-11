<template>
  <img class="logo" src="../assets/logo.png"/>
  <h1>Welcome to Gensentials</h1>
  <p><b>Don't have an account?</b></p>
  <p><b>Sign Up Here</b></p>
  <div class="register">
      <input v-model="name" type="text" placeholder="Enter your first name" style="text-align: center"/>
      <span v-if="nameError" class="error">{{ nameError }}</span>
      <input v-model="email" type="email" placeholder="Enter your email" style="text-align: center"/>
      <span v-if="emailError" class="error">{{ emailError }}</span>
      <input v-model="phone" type="text" placeholder="Enter your phone number" style="text-align: center"/>
      <span v-if="phoneError" class="error">{{ phoneError }}</span>
      <button @click="signUpUser" class="button"><b>Sign Up</b></button>
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
    };
  },
  methods: {
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
    } else {
      alert('Please correct the errors before signing up.');
    }
    },

    // Validation methods
    validateName() {
      if (!this.name) {
        this.nameError = 'Name is required';
      } else if (this.name.length < 3) {
        this.nameError = 'Name must be at least 1 characters long';
      } else {
        this.nameError = '';
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = 'Email is required';
      } else if (!emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format';
      } else {
        this.emailError = '';
      }
    },
    validatePhone() {
      const phonePattern = /^\d{10}$/;  // Example for a 10-digit phone number
      if (!this.phone) {
        this.phoneError = 'Phone number is required';
      } else if (!phonePattern.test(this.phone)) {
        this.phoneError = 'Invalid phone number. Must be at least 10 digits.';
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
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
.logo {
  width: 400px;
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
}
.register button {
  width: 160px;
  height: 30px;
  border: 2px solid grey;
  background: #686868;
  color: white;
  cursor: pointer;
}
.button {
  text-align: center;
}
</style>
