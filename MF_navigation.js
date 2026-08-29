(function () {
  function setMenuState(toggle, navigation, open) {
    navigation.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.textContent = open ? "−" : "+";
  }

  function setupMenus() {
    const navigations = document.querySelectorAll(".w3-top .w3-right.w3-hide-small");

    navigations.forEach(function (navigation, index) {
      const navigationId = navigation.id || "primary-navigation-" + (index + 1);
      navigation.id = navigationId;
      navigation.classList.add("primary-navigation");

      navigation.querySelectorAll("a").forEach(function (link) {
        link.classList.add("upper-menu");
      });

      let toggle = document.querySelector('[aria-controls="' + navigationId + '"]');

      if (!toggle) {
        toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "mobile-menu-toggle";
        toggle.setAttribute("aria-controls", navigationId);
        navigation.parentNode.insertBefore(toggle, navigation);
      }

      setMenuState(toggle, navigation, false);

      toggle.addEventListener("click", function () {
        setMenuState(toggle, navigation, toggle.getAttribute("aria-expanded") !== "true");
      });

      navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setMenuState(toggle, navigation, false);
        });
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      document.querySelectorAll('.mobile-menu-toggle[aria-expanded="true"]').forEach(function (toggle) {
        const navigation = document.getElementById(toggle.getAttribute("aria-controls"));
        if (navigation) {
          setMenuState(toggle, navigation, false);
          toggle.focus();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMenus);
  } else {
    setupMenus();
  }
})();
