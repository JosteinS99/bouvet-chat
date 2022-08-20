import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Chat } from "../Components/Chat";

// lager en kobling til socket io serveren som kjører på localhost:3002
const socket = io.connect("http://localhost:3002");

export default function Home() {
  // liste state hvor vi skal lagre data fra API
  const [userData, setUserData] = useState([]);

  // state for å holde på verdi av kjønn
  const [gender, setGender] = useState(null);

  // state som sier om chatvindu skal vises i form av boolean
  const [showChat, setShowChat] = useState(false);

  // henter data fra API som lagres i state for userData
  useEffect(() => {
    axios
      .get("https://data.ssb.no/api/v0/no/table/10467/")
      .then((response) => setUserData(response.data.variables[0].valueTexts));
  }, []);

  // lager to tomme lister, en for jentenavn og en for guttenavn
  const listOfFemaleNames = [];
  const listOfMaleNames = [];

  // looper gjennom userData og pusher navn fra index 0 til 999
  // inn i listen listOfFemaleNames fordi de består av jentenavn
  // resten av userData sin lengde består av guttenavn og blir
  // derfor pushet til listOfMaleNames
  for (let i = 0; i < userData.length; i++) {
    if (i <= 999) {
      listOfFemaleNames.push(userData[i]);
    } else {
      listOfMaleNames.push(userData[i]);
    }
  }

  // genererer et tilfeldig tall fra 0 til max lengde for userData listen
  const randomUsername = Math.floor(Math.random() * userData.length);

  // genererer et tilfeldig tall fra 0 til max lengde for listOfFemaleNames listen
  const randomFemaleFirstName = Math.floor(
    Math.random() * listOfFemaleNames.length
  );

  // Gjør det samme i ny verdi for etternavn
  const randomFemaleLastName = Math.floor(
    Math.random() * listOfFemaleNames.length
  );

  // genererer et tilfeldig tall fra 0 til max lengde for listOfMaleNames listen
  const randomMaleFirstName = Math.floor(
    Math.random() * listOfMaleNames.length
  );

  // Gjør det samme i ny verdi for etternavn
  const randomMaleLastName = Math.floor(Math.random() * listOfMaleNames.length);

  // state som skal inneholde fornavn som blir generert
  const [firstName, setFirstName] = useState([]);

  // state som skal inneholde etternavn som blir generert
  const [lastName, setLastName] = useState([]);

  // state som sender ut feilmelding basert på gender state sin verdi
  const [errorMessage, setErrorMessage] = useState(null);

  // setter tilfeldig fornavn og etternavn basert på om indeksen
  // til randomUsername tilsvarer jentenavn eller guttenavn
  // brukes ved først innlasting av nettsiden
  useEffect(() => {
    if (userData[0]) {
      if (randomUsername <= 999) {
        setFirstName(listOfFemaleNames[randomFemaleFirstName]);
        setLastName(listOfFemaleNames[randomFemaleLastName] + "dottir");
      } else {
        setFirstName(listOfMaleNames[randomMaleFirstName]);
        setLastName(listOfMaleNames[randomMaleLastName] + "son");
      }
    }
  }, [userData]);

  // setter nytt tilfeldig brukernavn basert på om man velger jente eller gutt i radio inupts
  const handleUsernameChange = () => {
    if (gender === "jente") {
      setFirstName(listOfFemaleNames[randomFemaleFirstName]);
      setLastName(listOfFemaleNames[randomFemaleLastName] + "dottir");
    } else if (gender === "gutt") {
      setFirstName(listOfMaleNames[randomMaleFirstName]);
      setLastName(listOfMaleNames[randomMaleLastName] + "son");
    } else if (gender === null) {
      setErrorMessage(
        "Du må først velge om du ønsker jentenavn eller guttenavn."
      );
    }
  };

  // setter verdien til gender staten basert på verdien til radio inputen som klikkes med musepeker.
  // Setter errorMessage state til null
  const handleRadioChange = (event) => {
    setGender(event.target.value);
    setErrorMessage(null);
  };

  // viser chatvinduet når man klikker på knapp for å gå til chat
  const handleChatChange = (event) => {
    setShowChat(true);
  };

  const chooseGender =
    'Trykk på "Jente:" eller "Gutt:" og bruk knappen nedenfor til å lage nytt brukernavn. Trykk "Gå til chat" for å begynne å chatte med andre.';

  return (
    <div className="chatterom">
      {!showChat ? (
        <div className="start-chat">
          <h2 className="velkommen-tekst">Velkommen til Chatterom</h2>
          <h3 className="your-username-is">Ditt brukernavn er:</h3>
          <h4 className="username">
            {firstName} {lastName}
          </h4>
          <p>{chooseGender}</p>
          <div className="gender-selector">
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
          <button className="generate-username" onClick={handleUsernameChange}>
            Generer brukernavn
          </button>
          <button className="go-to-chat" onClick={handleChatChange}>
            Gå til chat
          </button>
          <a className="error-message">{errorMessage}</a>
        </div>
      ) : (
        <Chat socket={socket} firstName={firstName} lastName={lastName} />
      )}
    </div>
  );
}
