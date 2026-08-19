const ICONS = {
  code: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  shield: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  mail: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="16" height="12" rx="2"/><polyline points="22,4 10,12 2,4"/></svg>`,
  phone: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  mapPin: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  globe: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`,
  user: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

function esc(str) {
  const el = document.createElement("span");
  el.textContent = str;
  return el.innerHTML;
}

function icon(name) {
  return ICONS[name] || ICONS.code;
}

function renderAbout(c) {
  document.getElementById("hero-tagline").textContent = c.company.location + (c.company.founded ? " \u2022 Est. " + c.company.founded : "");
  document.getElementById("hero-title").textContent = c.company.name;
  document.getElementById("hero-description").textContent = c.company.description;
  document.getElementById("about-description").textContent = c.company.description;
  document.getElementById("about-mission").textContent = c.company.mission;

  const details = document.getElementById("about-details");
  details.innerHTML = "";
  if (c.company.founded) {
    details.innerHTML += `<div class="about-detail"><div class="about-detail-value">${esc(c.company.founded)}</div><div class="about-detail-label">Founded</div></div>`;
  }
  details.innerHTML += `<div class="about-detail"><div class="about-detail-value">${esc(c.services.length.toString())}</div><div class="about-detail-label">Services</div></div>`;
  details.innerHTML += `<div class="about-detail"><div class="about-detail-value">${esc(c.team.length.toString())}</div><div class="about-detail-label">Team Members</div></div>`;
}

function renderServices(c) {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = c.services.map(s => `
    <div class="service-card">
      <div class="service-icon">${icon(s.icon)}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.description)}</p>
    </div>
  `).join("");
}

function renderContracts(c) {
  const info = document.getElementById("contracts-info");
  const badges = [];
  if (c.contracts.cage_code) badges.push(`<div class="contract-badge"><strong>CAGE:</strong> ${esc(c.contracts.cage_code)}</div>`);
  if (c.contracts.duns) badges.push(`<div class="contract-badge"><strong>DUNS:</strong> ${esc(c.contracts.duns)}</div>`);
  if (c.contracts.ein) badges.push(`<div class="contract-badge"><strong>EIN:</strong> ${esc(c.contracts.ein)}</div>`);
  if (c.contracts.uei) badges.push(`<div class="contract-badge"><strong>UEI:</strong> ${esc(c.contracts.uei)}</div>`);
  if (c.contracts.sam_registered) badges.push(`<div class="contract-badge"><strong>SAM:</strong> Registered</div>`);
  info.innerHTML = badges.join("");

  const list = document.getElementById("contracts-list");
  list.innerHTML = c.contracts.vehicles.map(v => `
    <div class="contract-item">
      <h3>${esc(v.name)}</h3>
      <div class="contract-meta">${esc(v.number)} \u2022 ${esc(v.agency)}</div>
      <p>${esc(v.description)}</p>
    </div>
  `).join("");
}

function renderPerformance(c) {
  const grid = document.getElementById("performance-grid");
  grid.innerHTML = c.pastPerformance.map(p => `
    <div class="performance-card">
      <div>
        <h3>${esc(p.title)}</h3>
        <div class="perf-meta">${esc(p.client)} \u2022 ${esc(p.period)}</div>
        <p>${esc(p.description)}</p>
      </div>
      ${p.value ? `<div class="performance-value">${esc(p.value)}</div>` : ""}
    </div>
  `).join("");
}

function renderCertifications(c) {
  const grid = document.getElementById("certs-grid");
  grid.innerHTML = c.certifications.map(cert => `
    <div class="cert-card">
      <h3>${esc(cert.name)}</h3>
      <div class="cert-issuer">${esc(cert.issuer)}</div>
      <div class="cert-expiry">Expires ${esc(cert.expiry)}</div>
    </div>
  `).join("");
}

function renderTeam(c) {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = c.team.map(m => {
    const initials = m.name.split(" ").map(w => w[0]).join("").toUpperCase();
    const photoHtml = m.photo
      ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}">`
      : initials;
    const links = [];
    if (m.linkedin) links.push(`<a href="${esc(m.linkedin)}" target="_blank">LinkedIn</a>`);
    if (m.email) links.push(`<a href="mailto:${esc(m.email)}">Email</a>`);
    return `
      <div class="team-card">
        <div class="team-photo">${photoHtml}</div>
        <h3>${esc(m.name)}</h3>
        <div class="team-role">${esc(m.role)}</div>
        <p class="team-bio">${esc(m.bio)}</p>
        ${links.length ? `<div class="team-links">${links.join("")}</div>` : ""}
      </div>
    `;
  }).join("");
}

function renderContact(c) {
  const info = document.getElementById("contact-info");
  const addr = c.contact.address;
  const fullAddr = `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
  info.innerHTML = `
    <div class="contact-details">
      <div class="contact-item">
        <div class="contact-item-icon">${icon("mail")}</div>
        <div><h4>Email</h4><p>${esc(c.contact.email)}</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">${icon("phone")}</div>
        <div><h4>Phone</h4><p>${esc(c.contact.phone)}</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-item-icon">${icon("mapPin")}</div>
        <div><h4>Address</h4><p>${esc(fullAddr)}</p></div>
      </div>
      ${c.contact.website ? `
      <div class="contact-item">
        <div class="contact-item-icon">${icon("globe")}</div>
        <div><h4>Website</h4><p>${esc(c.contact.website)}</p></div>
      </div>` : ""}
    </div>
  `;
}

function renderFooter(c) {
  document.getElementById("footer-name").textContent = c.company.name;
  document.getElementById("footer-tagline").textContent = c.company.tagline;
  document.getElementById("footer-copy").textContent = `\u00a9 ${new Date().getFullYear()} ${c.company.name}. All rights reserved.`;

  const links = document.getElementById("footer-links");
  const items = [];
  if (c.social.linkedin) items.push(`<a href="${esc(c.social.linkedin)}" target="_blank">LinkedIn</a>`);
  if (c.social.twitter) items.push(`<a href="${esc(c.social.twitter)}" target="_blank">Twitter</a>`);
  if (c.social.github) items.push(`<a href="${esc(c.social.github)}" target="_blank">GitHub</a>`);
  links.innerHTML = items.join("");
}

function applyTheme(c) {
  if (!c.theme) return;
  const r = document.documentElement.style;
  if (c.theme.primary_color) r.setProperty("--primary", c.theme.primary_color);
  if (c.theme.accent_color) r.setProperty("--accent", c.theme.accent_color);
  if (c.theme.font) r.setProperty("--font", c.theme.font);
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("open"));

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  window.addEventListener("scroll", () => {
    document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 10);
  });
}

function initForm() {
  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subject = encodeURIComponent(fd.get("subject"));
    const body = encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`);
    window.location.href = `mailto:${document.getElementById("contact-info")?.querySelector("p")?.textContent || ""}?subject=${subject}&body=${body}`;
  });
}

async function init() {
  try {
    const res = await fetch("config.json");
    const config = await res.json();

    document.getElementById("page-title").textContent = config.company.name;
    document.getElementById("nav-logo").textContent = config.company.name;

    applyTheme(config);
    renderAbout(config);
    renderServices(config);
    renderContracts(config);
    renderPerformance(config);
    renderCertifications(config);
    renderTeam(config);
    renderContact(config);
    renderFooter(config);
    initNav();
    initForm();
  } catch (err) {
    console.error("Failed to load config.json:", err);
  }
}

init();
