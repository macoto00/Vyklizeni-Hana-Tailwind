// =============================================
// == JavaScript for toggling the mobile menu ==
// =============================================

document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const closeMobileMenuButton = document.getElementById("closeMobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuBackdrop = document.querySelector("#mobileMenu > .fixed.inset-0.z-50");
    const desktopMenuLinks = document.querySelectorAll("#mobileMenu a");
    const servicesAnchor = document.querySelector("#desktopMenu button[aria-expanded]");
    const flyoutMenu = document.getElementById("flyoutMenu");
    const flyoutAnchors = document.querySelectorAll("#flyoutMenu a");

    // Function to toggle the mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle("hidden");
        // Close flyout menu when opening mobile menu
        closeFlyoutMenu();
    }

    // Function to toggle the flyout menu
    function toggleFlyoutMenu() {
        if (flyoutMenu.style.display === "block") {
            closeFlyoutMenu();
        } else {
            flyoutMenu.style.display = "block";
            servicesAnchor.setAttribute("aria-expanded", "true");
        }
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.add("hidden");
    }

    // Function to close the flyout menu
    function closeFlyoutMenu() {
        flyoutMenu.style.display = "none";
        servicesAnchor.setAttribute("aria-expanded", "false");
    }

    // Event listener for mobile menu button
    mobileMenuButton.addEventListener("click", toggleMobileMenu);

    // Event listener for close mobile menu button
    closeMobileMenuButton.addEventListener("click", closeMobileMenu);

    // Close the mobile menu when clicking links
    desktopMenuLinks.forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close the mobile menu when clicking outside of it
    mobileMenuBackdrop.addEventListener("click", function (event) {
        if (event.target === mobileMenuBackdrop) {
            closeMobileMenu();
        }
    });

    // Event listener for services anchor
    servicesAnchor.addEventListener("click", toggleFlyoutMenu);

    // Event listener for each anchor inside the flyout menu
    flyoutAnchors.forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            // Close the flyout menu if an anchor inside it is clicked
            event.preventDefault();
            closeFlyoutMenu();
        });
    });
});


// =======================================
// == Smooth scrolling for anchor links ==
// =======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =================
// == FAQ section ==
// =================

function toggleAnswer(id) {
    const answer = document.getElementById(id);
    const button = answer.previousElementSibling.querySelector('button');
    const expanded = button.getAttribute('aria-expanded') === 'true';

    if (expanded) {
        answer.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        const icons = button.querySelectorAll('svg');
        icons[0].classList.remove('hidden');
        icons[1].classList.add('hidden');
    } else {
        answer.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        const icons = button.querySelectorAll('svg');
        icons[0].classList.add('hidden');
        icons[1].classList.remove('hidden');
    }

    // Check content length to determine which icon to display
    const content = answer.querySelector('p').innerText;
    const showSecondIcon = content.length > 100; // Change 100 to your desired character length

    if (showSecondIcon) {
        icons[0].classList.add('hidden');
        icons[1].classList.remove('hidden');
    } else {
        icons[0].classList.remove('hidden');
        icons[1].classList.add('hidden');
    }
}

// =====================
// == Back to Top btn ==
// =====================

window.addEventListener('scroll', function () {
    var backToTopButton = document.getElementById('backToTopBtn');

    // Show button after scrolling down a bit
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Smooth scrolling to top
document.getElementById('backToTopBtn').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================
// == Reference image change ==
// ============================

function changeImage(element) {
    element.setAttribute("data-original-src", element.getAttribute("src"));
    var altSrc = element.getAttribute("alt");
    element.setAttribute("src", altSrc);
}

function restoreImage(element) {
    var originalSrc = element.getAttribute("data-original-src");
    element.setAttribute("src", originalSrc);
}

// ===================
// == Sticky Header ==
// ===================

window.onscroll = function() {
    var header = document.querySelector('.header');
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
      header.classList.add('sticky', 'shadow');
    } else {
      header.classList.remove('sticky', 'shadow');
    }
  };