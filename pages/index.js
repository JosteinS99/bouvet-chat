import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [gender, setGender] = useState(null);
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
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // setter randomisert fornavn og etternavn basert på om indeksen til randomUsername er jentenavn eller guttenavn
  useEffect(() => {
    if (userData[0]) {
      if (randomUsername <= 999) {
        setFirstName(listOfFemaleNames[randomFemaleFirstName]);
        setLastName(listOfFemaleNames[randomFemaleLastName] + "sdottir");
      } else {
        setFirstName(listOfMaleNames[randomMaleFirstName]);
        setLastName(listOfMaleNames[randomMaleLastName] + "sson");
      }
    }
  }, [userData]);

  // setter nytt randomisert brukernavn basert på om man velger jente eller gutt i radio inupts
  const handleUsernameChange = () => {
    if (gender === "jente") {
      setFirstName(listOfFemaleNames[randomFemaleFirstName]);
      setLastName(listOfFemaleNames[randomFemaleLastName] + "sdottir");
    } else if (gender === "gutt") {
      setFirstName(listOfMaleNames[randomMaleFirstName]);
      setLastName(listOfMaleNames[randomMaleLastName] + "sson");
    } else if (gender === null) {
      setErrorMessage(
        "FEIL!: Du må først velge om du ønsker jentenavn eller guttenavn."
      );
    }
  };
  // setter verdien til gender state basert på verdien til radio inputen som klikkes med musepeker. Setter errorMessage state til null
  const handleRadioChange = (event) => {
    setGender(event.target.value);
    setErrorMessage(null);
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
      <a className="Feilmelding">{errorMessage}</a>
      <a className="Brukernavn">
        {firstName} {lastName}
      </a>
      <button onClick={handleUsernameChange}>Generer brukernavn</button>
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
