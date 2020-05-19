import loadNav from "./app/layouts/nav.js";
import loadPage from "./app/pages/pages.js";

let page = window.location.hash.substr(1);
if (page == "") page = "standings";

const app = () => {
  loadNav(page);
  loadPage(page);
};

document.addEventListener("DOMContentLoaded", app);
