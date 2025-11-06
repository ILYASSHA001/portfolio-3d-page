import './style.css'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChatBot from "@ilyassha001/chatbot";
import { Button } from 'react-bootstrap'
import { useState } from 'react';

function AppChat() {
  const [isChatVisible, setIsChatVisible] = useState(false)

  const chatBotToggler = () => {
    isChatVisible ? setIsChatVisible(false) : setIsChatVisible(true)
  }
  return (
    <>
      <Button className="chatbot-toggle-button" onClick={chatBotToggler}>toggle Chatbot</Button>

      {isChatVisible && <ChatBot className="Chatbot" />}
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#chatbot-root'))
root.render(<AppChat />)
