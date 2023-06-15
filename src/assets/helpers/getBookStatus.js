import axios from "axios";
let arrReading = [];
let arrRead = [];
let arrWTR = [];
export async function getDataBookStatusReading(userID, status) {
  await axios
    .get(
      "https://bookapp-api-production.up.railway.app/api/v1/users/bookStatusIDs/" +
        userID +
        "/" +
        status
    )
    .then((res) => {
      arrReading = res.data;
    });

  return arrReading;
}

export async function getDataBookStatusRead(userID, status) {
  await axios
    .get(
      "https://bookapp-api-production.up.railway.app/api/v1/users/bookStatusIDs/" +
        +userID +
        "/" +
        status
    )
    .then((res) => {
      arrRead = res.data;
    });
  return arrRead;
}

export async function getDataBookStatusWTR(userID, status) {
  await axios
    .get(
      "https://bookapp-api-production.up.railway.app/api/v1/users/bookStatusIDs/" +
        +userID +
        "/" +
        status
    )
    .then((res) => {
      arrWTR(res.data);
    });
  return arrWTR;
}
