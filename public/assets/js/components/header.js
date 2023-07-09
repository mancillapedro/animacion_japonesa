export default () => {
    const activeLink = document.querySelector(`.nav-link[href="${window.location.pathname}"]`);
    if (!activeLink) return;
    activeLink.classList.add('active', "disabled");
    activeLink.setAttribute("aria-current", "page");
};