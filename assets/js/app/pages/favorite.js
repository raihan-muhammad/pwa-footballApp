const favoriteClubs = () => {
  getAll().then((favorite) => {
    let cardFavorite = "";
    favorite.forEach((teams) => {
      cardFavorite += `
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="${teams.crestUrl}" />
                        <span class="card-title">${teams.name}</span>
                        <a onclick="deleteTeam(${teams.id}, '${teams.name}');" class="btn-floating halfway-fab waves-effect waves-light red">
                          <i class="material-icons">delete</i>
                        </a>
                    </div>
                    <div class="card-content">
                        <p class="text-position">
                            <p class="text-position">
                            WName : ${teams.name} <br>
                            Founded : ${teams.founded} <br>
                            Email : ${teams.email} <br>
                            Phone : ${teams.phone} <br>
                            Website : <a href="${teams.website}" target="_blank">${teams.website}</a>
                        </p>
                        </p>
                    </div>
                </div>
            </div>
          `;
    });
    document.querySelector("#body-content").innerHTML = cardFavorite;
  });
};

export default favoriteClubs;
