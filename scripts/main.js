/**
 * Shared site interactions and utilities.
 */

const PRAYER_CONFIG = {
  city: "Nanaimo",
  country: "Canada",
  method: 2,
  apiUrl: "https://api.aladhan.com/v1/timingsByCity"
};

function initializeNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-menu]");

  if (!toggle || !panel) {
    return;
  }

  const setOpenState = (isOpen) => {
    panel.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpenState(!isOpen);
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpenState(false));
  });

  document.addEventListener("click", (event) => {
    if (!panel.classList.contains("is-open")) {
      return;
    }

    if (!panel.contains(event.target) && !toggle.contains(event.target)) {
      setOpenState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpenState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setOpenState(false);
    }
  });
}

function formatTime(time24h) {
  if (!time24h) {
    return "N/A";
  }

  const cleanTime = time24h.split(" ")[0];
  const [hours, minutes] = cleanTime.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

  return date.toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

async function fetchPrayerTimes() {
  const { city, country, method, apiUrl } = PRAYER_CONFIG;
  const response = await fetch(`${apiUrl}?city=${city}&country=${country}&method=${method}`);

  if (!response.ok) {
    throw new Error(`Prayer times request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data?.data?.timings) {
    throw new Error("Prayer times payload was incomplete.");
  }

  return data.data.timings;
}

function getNextPrayer(timings) {
  const now = new Date();
  const prayers = [
    { name: "Fajr", time: timings.Fajr },
    { name: "Dhuhr", time: timings.Dhuhr },
    { name: "Asr", time: timings.Asr },
    { name: "Maghrib", time: timings.Maghrib },
    { name: "Isha", time: timings.Isha }
  ];

  prayers.forEach((prayer) => {
    const [hours, minutes] = prayer.time.split(" ")[0].split(":");
    prayer.timeObj = new Date(now);
    prayer.timeObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  });

  const upcomingPrayer = prayers.find((prayer) => prayer.timeObj > now);

  if (upcomingPrayer) {
    return upcomingPrayer;
  }

  const tomorrowFajr = prayers[0];
  tomorrowFajr.timeObj.setDate(tomorrowFajr.timeObj.getDate() + 1);
  return tomorrowFajr;
}

function formatCountdown(timeDiff) {
  const totalSeconds = Math.max(0, Math.floor(timeDiff / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds
  };
}

function displayCurrentDate(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  const now = new Date();
  element.textContent = now.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.querySelector("#name")?.value?.trim() || "friend";
  const inquiryType = form.querySelector("#inquiry-type")?.value || "general";
  const inquiryLabels = {
    general: "General inquiry",
    education: "Programs and classes",
    sheikh: "Sheikh's Corner",
    friday: "Friday prayer",
    support: "Community support",
    volunteer: "Volunteering",
    donate: "Donation support",
    other: "Other"
  };

  alert(
    `JazakAllah khair, ${name}.\n\nYour message about "${inquiryLabels[inquiryType] || inquiryType}" was received. We will follow up as soon as possible.`
  );

  form.reset();
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", handleContactFormSubmit);
}

function initializeDonationForm() {
  const donationForm = document.getElementById("donation-form");
  if (!donationForm) {
    return;
  }

  const amountInput = donationForm.querySelector("#amount");
  const buttons = donationForm.querySelectorAll(".amount-btn");
  const feedback = donationForm.querySelector("#donation-feedback");

  const clearSelected = () => {
    buttons.forEach((button) => button.classList.remove("is-selected"));
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      clearSelected();
      button.classList.add("is-selected");
      if (amountInput) {
        amountInput.value = button.dataset.amount || "";
      }
    });
  });

  amountInput?.addEventListener("input", clearSelected);

  donationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = Number(amountInput?.value || 0);
    if (!amount) {
      if (feedback) {
        feedback.textContent = "Please enter a donation amount before submitting.";
      }
      return;
    }

    if (feedback) {
      feedback.textContent = `Demo mode: donation request for $${amount.toFixed(0)} CAD captured. Connect your payment provider to accept live gifts.`;
    }

    donationForm.reset();
    clearSelected();
  });
}

function initializeTabs() {
  const tabGroups = document.querySelectorAll("[data-tab-group]");

  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll("[data-tab-target]");
    const panels = group.querySelectorAll("[data-tab-panel]");

    if (!buttons.length || !panels.length) {
      return;
    }

    const activateTab = (targetId) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.tabTarget === targetId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.hidden = !isActive;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
    });

    activateTab(buttons[0].dataset.tabTarget);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeTabs();
  initializeContactForm();
  initializeDonationForm();
});
