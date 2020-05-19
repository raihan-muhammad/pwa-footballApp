const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BG23gk2rplVC5P_430SZEFtdHpZZlbunEKCjTQewzsJ3LTHkvMRUoqHfgO2gHbKDR7WlODQOZfy_Ma9epGlE7QU",
  privateKey: "xPG61IKyN6Ovx2WQCBfUg5v6M6eWOk_Zf7Jj86cJLKI",
};

webPush.setVapidDetails(
  "mailto:sukasukangoding@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ebcc51gYgMk:APA91bET8KAMz3bmPZE7L3D3NRBqnc6mbh2O5-ZANXf39ey5NWqaNMJ8O67DdcOAPW65wNORUK2_l64yR7fyvFHME6Nmv9KEMgefhKugSWHiMLDiLw33uW5JaGNfO4nVnuzoxDmKS9Fd",
  keys: {
    p256dh:
      "BBnourXT6nHKrqkpnX5GCR3a+Kv4aS56nDs1Phn+MmlMKX95BKcDkrbDZWBUDN36O+S25U5MQ+NOmzoSuXhMp+w=",
    auth: "Zzl/uFCGQebqAdiB9hPDDw==",
  },
};

const payload = "Hallo, ini submission 2 saya ~ raihan muhammad";

const options = {
  gcmAPIKey: "501792984653",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
