import header from "./components/header.js";

addEventListener('DOMContentLoaded', () => {
    header();
    window.history.pushState({}, document.title, window.location.pathname);
});