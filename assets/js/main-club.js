import getClubsFavorites from "./app/pages/club.js";
document.addEventListener("DOMContentLoaded", () => {
  const item = getClubsFavorites();
  const btnSave = document.getElementById("love");

  btnSave.onclick = () => {
    item.then((team) => {
      cekData(team, team.id);
    });
  };
});
