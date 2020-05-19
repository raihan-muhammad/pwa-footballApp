if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then()
    .catch(() => console.log("REGISTER FAILED"));
} else {
  console.log("BROWSER DOES NOT SUPPORT");
}

if ("Notification" in window) {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    if ("PushManager" in window) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BG23gk2rplVC5P_430SZEFtdHpZZlbunEKCjTQewzsJ3LTHkvMRUoqHfgO2gHbKDR7WlODQOZfy_Ma9epGlE7QU"
            ),
          })
          .then((subscribe) => {
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch((err) => {
            console.error("Tidak dapat melakukan subscribe ", err.message);
          });
      });
    }
  });
}

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
