const url = "https://api.football-data.org/v2";
const key = "6cc3a4a02de84aba89e62b634eea9a0d";

const getClub = async () => {
  try {
    if ("caches" in window) {
      const resChache = await caches.match(
        `${url}/competitions/2021/standings`
      );
      if (resChache) {
        const resChacheJson = await resChache.json();
        contentStandings(resChacheJson.standings[0]);
      }
    }
    const res = await fetch(`${url}/competitions/2021/standings`, {
      headers: {
        "X-Auth-Token": key,
      },
    });
    const resJson = await res.json();
    contentStandings(resJson.standings[0]);
  } catch (err) {
    console.log(err);
  }
};

function contentStandings(el) {
  let cardStanding = "";
  const target = document.getElementById("card-club");
  el.table.forEach((el) => {
    cardStanding += `
            <div class="col s12 m4">
            <a href="club.html?id=${el.team.id}">
              <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                      <img src="${el.team.crestUrl}" />
                      <span class="card-title">${el.team.name}</span>
                  </div>
                  <div class="card-content">
                      <p class="text-position">Position ${el.position}</p>
                  </div>
                  <div class="card-action">
                    <a href="club.html?id=${el.team.id}">Lihat Detail</a>
                  </div>
              </div>
              </a>
            </div>
        `;
    target.innerHTML = cardStanding;
  });
}

export default getClub;
