'use strict';

// Toggle function for active class
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Skill Progress Bars Animation
document.addEventListener("DOMContentLoaded", function () {
  // Animating skill progress bars
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  progressBars.forEach(function (bar) {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(function () {
          bar.style.transition = 'width 2s ease';
          bar.style.width = width;
      }, 100);
  });

  // Navbar Section Toggle
  const navLinks = document.querySelectorAll('.navbar-link');
  const sections = document.querySelectorAll('.section');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove 'active' class from all sections
      sections.forEach(section => section.classList.remove('active'));

      // Show the corresponding section based on the clicked link
      if (link.id === 'skills-link') {
        document.getElementById('skills-section').classList.add('active');
      } else if (link.id === 'about-link') {
        document.getElementById('about-section').classList.add('active');
      } else if (link.id === 'portfolio-link') {
        document.getElementById('portfolio-section').classList.add('active');
      } else if (link.id === 'contact-link') {
        document.getElementById('contact-section').classList.add('active');
      }

      // Highlight the active link
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Testimonials Modal Functionality
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  });

  // Close Modal
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);

  // Custom Select Dropdown
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  select.addEventListener("click", function () { elementToggleFunc(this); });

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // Filter Functionality
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Handle Filter Button Click for Large Screens
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(button => {
    button.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // Contact Form Validation and Submission
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // Handle Form Submission with AJAX
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      fullname: form.querySelector('input[name="fullname"]').value,
      email: form.querySelector('input[name="email"]').value,
      message: form.querySelector('textarea[name="message"]').value,
    };

    // Disable button and show loading state
    formBtn.disabled = true;
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

    try {
      const response = await fetch('https://personal-portfolio-yatharth-backend.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success message
        alert('✅ Message sent successfully! Thank you for contacting me.');
        form.reset();
      } else {
        // Error message
        alert('❌ ' + (result.error || 'Something went wrong. Please try again.'));
      }
    } catch (error) {
      alert('❌ Network error. Please check your connection and try again.');
      console.error('Error:', error);
    } finally {
      // Reset button
      formBtn.disabled = false;
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    }
  });

  // Page Navigation Functionality
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      pages.forEach(page => {
        if (this.innerHTML.toLowerCase() === page.dataset.page) {
          page.classList.add("active");
          navigationLinks.forEach(nav => nav.classList.remove("active"));
          this.classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });
    });
  });
});
