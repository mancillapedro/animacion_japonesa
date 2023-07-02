export default () => {
    const activeLink = document.querySelector(`[href="${window.location.pathname}"]`);
    activeLink.classList.add('active', "disabled");
    activeLink.setAttribute("aria-current", "page");
};