import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [gender, setGender] = useState();
  useEffect(() => {
    axios
      .get("https://data.ssb.no/api/v0/no/table/10467/")
      .then((response) => setUserData(response.data.variables[0].valueTexts));
  }, []);
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
  // const listOfAllNames = listOfMaleNames.concat(listOfFemaleNames);

  const randomUsername = Math.floor(Math.random() * userData.length);
  const randomFemaleLastName = Math.floor(
    Math.random() * listOfFemaleNames.length
  );
  const randomFemaleFirstName = Math.floor(
    Math.random() * listOfFemaleNames.length
  );
  const randomMaleLastName = Math.floor(Math.random() * listOfMaleNames.length);
  const randomMaleFirstName = Math.floor(
    Math.random() * listOfMaleNames.length
  );
  const [username, setUsername] = useState([]);
  const [lastName, setLastName] = useState([]);
  // setter randomisert fornavn og etternavn basert på om indeksen til randomUsername er jentenavn eller guttenavn
  useEffect(() => {
    if (randomUsername <= 999) {
      setUsername(listOfFemaleNames[randomFemaleFirstName]);
      setLastName(listOfFemaleNames[randomFemaleLastName] + "dottir");
    } else {
      setUsername(listOfMaleNames[randomMaleFirstName]);
      setLastName(listOfMaleNames[randomMaleLastName] + "son");
    }
  }, [userData]);

  const handleChange = () => {
    setUsername(userData[randomUsername]);
  };

  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };

  // useEffect(() => {
  //   Object.keys(randomUsername).map(
  //     (keyName, i) => setUsername(randomUsername[keyName])
  //     // console.log(randomUsername[keyName])
  //   );
  // }, [randomUsername]);

  return (
    <div>
      <a className="Chatterom">Chatterom</a>
      <a className="MiddleText">Ditt brukernavn er:</a>
      <a className="Brukernavn">
        {username} {lastName}
      </a>
      <button onClick={handleChange}>Generer brukernavn</button>
      <label>Jente:</label>
      <input
        type="radio"
        name="jente"
        value="jente"
        checked={gender === "jente"}
        onChange={handleRadioChange}
      />
      <label>Gutt:</label>
      <input
        type="radio"
        name="gutt"
        value="gutt"
        checked={gender === "gutt"}
        onChange={handleRadioChange}
      />
    </div>
  );
}
