import loadPage from "../pages/pages.js";

const nav = document.querySelectorAll(".topnav, .sidenav");
const sidenav = document.querySelector(".sidenav");
M.Sidenav.init(sidenav);

const loadNav = async (page) => {
  try {
    const res = await fetch("./assets/pages/layouts/nav.html");
    const resText = await res.text();

    nav.forEach((el) => {
      el.innerHTML = resText;
    });

    document.querySelectorAll(".sidenav a, .topnav a").forEach((el) => {
      el.addEventListener("click", (event) => {
        const sidenav = document.querySelector(".sidenav");
        M.Sidenav.getInstance(sidenav).close();
        page = event.target.getAttribute("href").substr(1);
        loadPage(page);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export default loadNav;
