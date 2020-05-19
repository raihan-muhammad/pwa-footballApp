const base_url = "https://api.football-data.org/v2";
const key = "6cc3a4a02de84aba89e62b634eea9a0d";

const getClubsFavorites = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get("id");

      if ("caches" in window) {
        const res = await caches.match(`${base_url}/teams/${idParam}`);
        if (res) {
          const resJson = await res.json();
          let clubDetail = `
            <div class="col s12 m12" style="margin-top: -13em;">
                <div class="card">
                    <div class="card-image">
                        <img src="${resJson.crestUrl}" />
                        <span class="card-title">${resJson.name}</span>
                    </div>
                    <div class="card-content">
                        <p class="text-position">
                          Name : ${resJson.name} <br>
                          Founded : ${resJson.founded} <br>
                          Email : ${resJson.email} <br>
                          Phone : ${resJson.phone} <br>
                          Website : <a href="${resJson.website}" target="_blank">${resJson.website}</a>
                        </p>
                    </div>
                </div>
            </div>
          `;
          document.getElementById("body-content").innerHTML = clubDetail;
          resolve(resJson);
        }
      }

      const res = await fetch(`${base_url}/teams/${idParam}`, {
        headers: {
          "X-Auth-Token": key,
        },
      });
      const resJson = await res.json();
      let clubDetail = `
            <div class="col s12 m12" style="margin-top: -13em;">
                <div class="card">
                    <div class="card-image">
                        <img src="${resJson.crestUrl}" />
                        <span class="card-title">${resJson.name}</span>
                    </div>
                    <div class="card-content">
                        <p class="text-position">
                          Name : ${resJson.name} <br>
                          Founded : ${resJson.founded} <br>
                          Email : ${resJson.email} <br>
                          Phone : ${resJson.phone} <br>
                          Website : <a href="${resJson.website}" target="_blank">${resJson.website}</a>
                        </p>
                    </div>
                </div>
            </div>
          `;
      document.getElementById("body-content").innerHTML = clubDetail;
      resolve(resJson);
    } catch (err) {
      reject(err);
    }
  });
};

export default getClubsFavorites;
