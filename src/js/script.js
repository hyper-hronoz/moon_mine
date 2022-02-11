(() => {
    const burger_menu = document.querySelector(".mobile-menu")
    const menu = document.querySelector(".menu")

    burger_menu.addEventListener("click", () => {
        if (menu.classList.contains("menu--active")) {
            menu.classList.remove("menu--active")
            burger_menu.classList.remove("mobile-menu--active")
            burger_menu.src = "./img/menu.svg"
        } else {
            menu.classList.add("menu--active")
            burger_menu.classList.add("mobile-menu--active")
            burger_menu.src = "./img/menu-close.svg"
        }
    })
})()