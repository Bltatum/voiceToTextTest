import React, { useState, useEffect } from "react";
import { Button, Form } from "reactstrap";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useOnlineStatus from "@rehooks/online-status";

let array = [];

const App = () => {
  const online = useOnlineStatus();
  const {
    transcript,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    listening,
    transcribing,
  } = useSpeechRecognition();
  const [message, setMessage] = useState();

  const start = () => SpeechRecognition.startListening({ continuous: true });
  const stop = () => SpeechRecognition.stopListening();
  const fullStop = () =>
    SpeechRecognition.startListening({ continuous: false });
  const abort = () => SpeechRecognition.abortListening();
  const reset = () => resetTranscript();

  const cancelForm = () => {
    document.getElementById("addTransForm").reset();
  };

  let date = new Date();
  let formattedDate =
    date.getMonth() +
    "-" +
    (date.getDate() + 1) +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  useEffect(() => {
    if (finalTranscript !== "") {
      reset();
      setMessage(finalTranscript);
      array.push(formattedDate + "-    " + finalTranscript);
      console.log("final result:", array);
    }
  }, [finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  return (
    <div>
      <div>Network {online ? "Online" : "Offline"}</div>;
      <span>listening: {listening ? "on" : "off"}</span>
      <br />
      <span>transcribing: {transcribing ? "on" : "off"}</span>
      <br />
      <Button onClick={start}>Start</Button>
      <br />
      <Button onClick={(fullStop, stop)}>Stop</Button>
      <br />
      <Button onClick={abort}>Reset</Button>
      <div>{transcript}</div>
      <br />
      <Form id="addTransForm">
        {array.map((a) => (
          <h3>{a}.</h3>
        ))}
      </Form>
    </div>
  );
};
export default App;
