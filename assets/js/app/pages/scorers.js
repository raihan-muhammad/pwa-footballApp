const url = "https://api.football-data.org/v2/competitions/PL/scorers";
const key = "6cc3a4a02de84aba89e62b634eea9a0d";

const getTopScorers = async () => {
  try {
    if ("caches" in window) {
      const res = await caches.match(`${url}`);
      if (res) {
        const resJson = await res.json();
        contentTopScorers(resJson.scorers);
      }
    }

    const res = await fetch(url, {
      headers: {
        "X-Auth-Token": key,
      },
    });
    const resJsonScorers = await res.json();
    contentTopScorers(resJsonScorers.scorers);
  } catch (err) {
    console.log(err);
  }
};

function contentTopScorers(el) {
  const targetScorers = document.getElementById("target-scorers");
  let tableTopScorers = "";
  el.forEach((elm) => {
    tableTopScorers += `
        <tr>
            <td>${elm.player.name}</td>
            <td>${elm.team.name}</td>
            <td>${elm.numberOfGoals}</td>
        </tr>
      `;
  });
  targetScorers.innerHTML = tableTopScorers;
}

export default getTopScorers;
