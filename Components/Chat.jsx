import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export function Chat({ socket, firstName, lastName }) {
  // state for neste melding som skal sendes
  const [currentMessage, setCurrentMessage] = useState("");

  // state for liste med meldinger som er sendt
  const [messageList, setMessageList] = useState([]);

  // event listener som setter currentMessage staten til å inneholde
  // verdien til input feltet brukerene skriver meldinger i
  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  // event listener som sjekker om Enter knappen på tastaturet er trykket
  // og sender melding dersom det er true
  const handleKeyPress = (event) => {
    event.key === "Enter" && sendMessage();
  };

  // setter fornavn og etternavn i en variabel for å lette bruke den
  const username = firstName + " " + lastName;

  // funksjon som sender en melding ved å sende data til back-end som
  // leser det den mottar og sender meldingen til alle brukere på samme adresse
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  // Listener som mottar meldinger som blir broadcasted i back-end
  // stopper å lete etter nye meldinger etter første melding er sendt
  // dette for å unngå at det sendes mer enn 1 melding samtidig
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  // sletter meldinger som er mer enn 10 meldinger gamle fra listen
  useEffect(() => {
    if (messageList.length >= 10) {
      messageList.splice(0, 1);
    }
  });

  return (
    <div className="chat-box">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-author">
                    <p id="author">{messageContent.author}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-time">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          value={currentMessage}
          type="text"
          placeholder="Skriv her..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        ></input>
        <button onClick={sendMessage}>&#10146;</button>
      </div>
    </div>
  );
}
