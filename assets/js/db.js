const dbPromised = idb.open("db_bola", 1, (upgradeDB) => {
  const standingsObjStore = upgradeDB.createObjectStore("standings", {
    keyPath: "id",
  });

  standingsObjStore.createIndex("standings", "standings", { unique: false });
});

const saveFavorites = async (team) => {
  try {
    const db = await dbPromised;
    const tx = db.transaction("standings", "readwrite");
    const store = tx.objectStore("standings");
    store.add(team);
    M.toast({
      html: `Club berhasil di tambahkan`,
    });
    return tx.complate;
  } catch (err) {
    console.log(err);
  }
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("standings", "readonly");
        const store = tx.objectStore("standings");
        return store.getAll();
      })
      .then((standings) => {
        if (standings == "") {
          const target = document.querySelector("#not-found-fav");
          const btnBack = document.querySelector("#btn-back");
          btnBack.style.display = "none";
          target.innerHTML = `
          <div class="row" style="position: relative;">
            <div class="col s12 m12">
              <div class="card-panel blue darken-4" style="text-align: center;">
                <span class="white-text" style="font-size: 25px; text-transform: uppercase;">Wah, Team favoritemu belum ada!
                </span><br><br>
                <a class="waves-effect waves-light btn blue darken-1" href="index.html">Cari Team</a>
              </div>
            </div>
            </div>
          `;
        } else {
          resolve(standings);
        }
      });
  });
};

const cekData = async (team, id) => {
  const db = await dbPromised;
  const tx = db.transaction("standings", "readwrite");
  const store = tx.objectStore("standings");
  const cekId = await store.get(id);
  if (cekId === undefined) {
    saveFavorites(team);
  } else {
    M.toast({
      html: `Club sudah ada di list favorite!`,
    });
  }
};

const deleteTeam = (id, name) => {
  dbPromised
    .then((db) => {
      var tx = db.transaction("standings", "readwrite");
      var store = tx.objectStore("standings");
      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: `${name} berhasil di hapus`,
      });
      window.location.href = window.location.href;
      getAll();
    })
    .catch(() => {
      M.toast({
        html: `${name} gagal di hapus"`,
      });
    });
};
