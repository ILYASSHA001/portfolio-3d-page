import './style.css'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChatBot from "@ilyassha001/chatbot";

function AppChat() {
  return (
    <>
      <ChatBot />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#chatbot-root'))
root.render(<AppChat />)
