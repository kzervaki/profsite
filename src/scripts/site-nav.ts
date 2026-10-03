/**
 * Site navigation behaviour (markup in SiteNav.astro).
 *
 * Mobile:  burger toggles a drawer; "Services" swaps the main panel for a submenu panel.
 * Desktop: "Services" opens a hover/click dropdown, built from the submenu links.
 */

const DESKTOP_MIN_WIDTH = 769;
const DROPDOWN_HIDE_DELAY_MS = 150;
const LINK_CLOSE_DELAY_MS = 150;
const RESIZE_DEBOUNCE_MS = 250;

const isDesktop = () => window.innerWidth >= DESKTOP_MIN_WIDTH;

export function initSiteNav() {
  const navToggle = document.querySelector<HTMLInputElement>("#nav-toggle");
  const navBurger = document.querySelector<HTMLElement>(".nav-burger");
  const navOverlay = document.querySelector<HTMLElement>(".nav-overlay");
  const mainPanel = document.querySelector<HTMLElement>('[data-panel="main"]');
  const servicesPanel = document.querySelector<HTMLElement>('[data-panel="services"]');
  const servicesTrigger = document.querySelector<HTMLElement>('[data-trigger="services"]');
  const backButton = document.querySelector<HTMLElement>('[data-back="main"]');
  const dropdownContainer = document.querySelector<HTMLElement>("[data-desktop-dropdown-container]");

  if (!navToggle || !navBurger || !navOverlay || !mainPanel || !servicesPanel
      || !servicesTrigger || !backButton || !dropdownContainer) {
    return;
  }

  // Collected before the desktop dropdown exists, so its links are not included
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>(".menu-list a, .submenu-list a");

  let isSubmenuOpen = false;

  // ---------- Mobile drawer ----------

  /** Sync burger state and page scroll lock with the drawer being open or closed. */
  function syncMainMenu(isOpen: boolean) {
    navBurger!.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
    if (!isOpen && isSubmenuOpen) {
      closeSubmenu();
    }
  }

  function openMainMenu() {
    navToggle!.checked = true;
    syncMainMenu(true);
  }

  function closeMainMenu() {
    navToggle!.checked = false;
    syncMainMenu(false);
  }

  function openSubmenu() {
    mainPanel!.classList.add("menu-panel--hidden");
    servicesPanel!.hidden = false;
    servicesTrigger!.setAttribute("aria-expanded", "true");
    isSubmenuOpen = true;

    if (!navToggle!.checked) {
      openMainMenu();
    }
  }

  function closeSubmenu() {
    mainPanel!.classList.remove("menu-panel--hidden");
    servicesPanel!.hidden = true;
    servicesTrigger!.setAttribute("aria-expanded", "false");
    isSubmenuOpen = false;
  }

  navToggle.addEventListener("change", () => syncMainMenu(navToggle.checked));

  servicesTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDesktop()) {
      openSubmenu();
    }
  });

  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeSubmenu();
  });

  navOverlay.addEventListener("click", closeMainMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!isDesktop()) {
        setTimeout(closeMainMenu, LINK_CLOSE_DELAY_MS);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (isSubmenuOpen) {
      closeSubmenu();
    } else if (navToggle.checked) {
      closeMainMenu();
    }
  });

  // ---------- Desktop dropdown ----------

  let dropdown: HTMLUListElement | null = null;
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;

  function showDropdown() {
    clearTimeout(hideTimeout);
    dropdown?.classList.add("desktop-dropdown--visible");
  }

  function hideDropdown() {
    // Delay so the pointer can travel from the trigger into the dropdown
    hideTimeout = setTimeout(() => {
      dropdown?.classList.remove("desktop-dropdown--visible");
    }, DROPDOWN_HIDE_DELAY_MS);
  }

  function buildDropdown() {
    const list = document.createElement("ul");
    list.className = "desktop-dropdown";
    list.setAttribute("data-desktop-dropdown", "");

    servicesPanel!.querySelectorAll<HTMLAnchorElement>(".submenu-list a").forEach((source) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = source.getAttribute("href") ?? "";
      link.textContent = source.textContent;
      item.appendChild(link);
      list.appendChild(item);
    });

    list.addEventListener("mouseenter", showDropdown);
    list.addEventListener("mouseleave", hideDropdown);
    return list;
  }

  /** (Re)create the dropdown; no-op on mobile. */
  function mountDropdown() {
    if (!isDesktop()) return;
    dropdown?.remove();
    dropdown = buildDropdown();
    dropdownContainer!.appendChild(dropdown);
  }

  function unmountDropdown() {
    dropdown?.remove();
    dropdown = null;
  }

  dropdownContainer.addEventListener("mouseenter", showDropdown);
  dropdownContainer.addEventListener("mouseleave", hideDropdown);

  // Click toggle for touch devices with desktop-sized screens
  servicesTrigger.addEventListener("click", (e) => {
    if (!isDesktop() || !dropdown) return;
    e.preventDefault();
    if (dropdown.classList.contains("desktop-dropdown--visible")) {
      hideDropdown();
    } else {
      showDropdown();
    }
  });

  // ---------- Viewport changes ----------

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      closeSubmenu();
      if (isDesktop()) {
        if (navToggle.checked) {
          closeMainMenu();
        }
        mountDropdown();
      } else {
        unmountDropdown();
      }
    }, RESIZE_DEBOUNCE_MS);
  });

  // ---------- Initial state ----------

  closeSubmenu();
  mountDropdown();
}
