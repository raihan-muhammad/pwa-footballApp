import getClub from "./home.js";
import getTopScorers from "./scorers.js";
const content = document.querySelector("#body-content");

const loadPage = async (page) => {
  try {
    const res = await fetch(`./assets/pages/${page}.html`);
    const resText = await res.text();
    content.innerHTML = resText;
    if (page === "standings") {
      getClub();
    } else if (page === "scorers") {
      getTopScorers();
    }
  } catch (err) {
    console.log(err);
  }
};

export default loadPage;
