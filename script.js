document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("welcomePopup");
    const closeBtn = document.getElementById("closePopupBtn");
    const letterIcon = document.getElementById("letterIcon");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const sideMenuOverlay = document.getElementById("sideMenuOverlay");

    setTimeout(() => {
        popup.classList.add("show");
    }, 500);

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("show");
        }
    });

    letterIcon.addEventListener("click", () => {
        sideMenu.classList.add("open");
        sideMenuOverlay.classList.add("show");
    });

    closeMenuBtn.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        sideMenuOverlay.classList.remove("show");
    });

    sideMenuOverlay.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        sideMenuOverlay.classList.remove("show");
    });
});