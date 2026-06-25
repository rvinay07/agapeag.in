const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

const sharedFooter = `
  <div class="container footer-grid">
    <div>
      <a class="brand" href="index.html">
        <img src="logo.png" alt="Agape A.G Church logo">
        <span><strong>Agape A.G Church</strong><small>Reflecting God's Love</small></span>
      </a>
      <p>D-No: 20/279, Housing Board Colony, Old Guntakal - 515801</p>
      <div class="social-row" aria-label="Church social media">
        <a class="social-icon" style="background:#fff;color:#164b60;" href="https://www.facebook.com/agapeagchurch" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f" style="color:#164b60;"></i></a>
        <a class="social-icon" style="background:#fff;color:#164b60;" href="https://www.instagram.com/agape_ag_church_guntakal/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram" style="color:#164b60;"></i></a>
        <a class="social-icon" style="background:#fff;color:#164b60;" href="https://www.youtube.com/@agapeagchurchguntakal1985" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube" style="color:#164b60;"></i></a>
        <a class="social-icon" style="background:#fff;color:#164b60;" href="mailto:agapegtl@gmail.com" aria-label="Gmail"><i class="fa-solid fa-envelope" style="color:#164b60;"></i></a>
      </div>
    </div>
    <div>
      <h3>Quick Links</h3>
      <ul>
        <li><a href="pastors.html">Church Pastors</a></li>
        <li><a href="story.html">Church Story</a></li>
        <li><a href="beliefs.html">Our Beliefs</a></li>
        <li><a href="mailto:agapegtl@gmail.com">Contact by Gmail</a></li>
        <li><a href="tel:+919502214602">Contact by Mobile</a></li>
      </ul>
    </div>
    <div>
      <h3>Contact</h3>
      <ul>
        <li>Mobile: +91 95022 14602</li>
        <li>Email: agapegtl@gmail.com</li>
        <li><a href="privacy.html">Privacy Policy</a></li>
        <li><a href="terms.html">Terms & Conditions</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; <span data-year></span> Agape A.G Church Guntakal. All rights reserved.</p>
    <p>Made for worship, connection, and care.</p>
  </div>
`;

const footer = document.querySelector(".footer") || document.createElement("footer");
footer.className = "footer";
footer.innerHTML = sharedFooter;
if (!footer.parentElement) document.body.appendChild(footer);

const aboutLink = document.querySelector('[data-nav-links] a[href="about.html"]');
if (aboutLink) {
  const aboutItem = aboutLink.closest("li");
  if (aboutItem && !aboutItem.querySelector(".dropdown-menu")) {
    aboutItem.classList.add("nav-dropdown");
    aboutItem.insertAdjacentHTML("beforeend", `
      <div class="dropdown-menu" aria-label="About quick links">
        <a href="story.html">Our Story</a>
        <a href="pastors.html">Our Pastors</a>
        <a href="beliefs.html">Our Beliefs</a>
      </div>
    `);
  }
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const prayerForm = document.querySelector("[data-prayer-form]");
if (prayerForm) {
  prayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(prayerForm);
    const name = String(data.get("name") || "Anonymous").trim();
    const phone = String(data.get("phone") || "").trim();
    const request = String(data.get("request") || "").trim();
    const choice = String(data.get("sendBy") || "email");
    const fullMessage = `Prayer Request from ${name}\n\nPhone: ${phone || "Not shared"}\n\nRequest:\n${request}`;

    if (choice === "whatsapp") {
      window.open(`https://wa.me/919502214602?text=${encodeURIComponent(fullMessage)}`, "_blank", "noopener");
      return;
    }

    const subject = encodeURIComponent(`Prayer Request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone || "Not shared"}\n\nPrayer Request:\n${request}`);
    window.location.href = `mailto:agapegtl@gmail.com,pastor1@example.com,pastor2@example.com?subject=${subject}&body=${body}`;
  });
}
