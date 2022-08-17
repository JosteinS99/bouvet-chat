import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [userData, setUserData] = useState([]);
  const fetchData = () => {
    return axios
      .get("https://data.ssb.no/api/v0/no/table/10467/")
      .then((response) => setUserData(response.data.variables[0].valueTexts));
  };
  console.log(userData);
  const listOfFemaleNames = [];
  const listOfMaleNames = [];
  for (let i = 0; i < userData.length; i++) {
    if (i <= 999) {
      listOfFemaleNames.push(userData[i]);
    } else {
      listOfMaleNames.push(userData[i]);
    }
  }
  console.log(listOfFemaleNames);
  console.log(listOfMaleNames);
  // const listOfMaleNames = [
  //   { gender: "male", name: "Jostein" },
  //   { gender: "male", name: "Hans" },
  //   { gender: "male", name: "Petter" },
  //   { gender: "male", name: "Olav" },
  // ];
  // const listOfFemaleNames = [
  //   { gender: "female", name: "Vilde" },
  //   { gender: "female", name: "Ellen" },
  //   { gender: "female", name: "Katrine" },
  //   { gender: "female", name: "Camilla" },
  // ];
  const listOfAllNames = listOfMaleNames.concat(listOfFemaleNames);
  const randomUsername =
    listOfAllNames[Math.floor(Math.random() * listOfAllNames.length)];

  const [username, setUsername] = useState([]);

  console.log(randomUsername, "test3");

  useEffect(() => {}, []);
  console.log(username, "henter fra API");
  // useEffect(() => {
  //   Object.keys(randomUsername).map(
  //     (keyName, i) => setUsername(randomUsername[keyName])
  //     // console.log(randomUsername[keyName])
  //   );
  // }, [randomUsername]);
  console.log(username);
  return (
    <div>
      <a className="App">Chatterom</a>
      <a className="Brukernavn">Ditt brukernavn er: {username}</a>
      <button onClick={fetchData}>Generer brukernavn</button>
    </div>
  );
}
