import './style.css'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import ChatBot from "@ilyassha001/chatbot";



function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openModal', handler)
    return () => window.removeEventListener('openModal', handler)
  }, [])

  return (
    <>
    <ChatBot />

      <Canvas
        tabIndex={0}
        camera={{ fov: 45, near: 0.1, far: 2000, position: [-3, 1.5, 4] }}
      >
        {/* Experience will toggle the overlay from inside its own Suspense */}
        <Experience  />
      </Canvas>

      <Modal show={open} onHide={() => setOpen(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Full-screen Website</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <iframe
            title="Site"
            src={`https://ilyassha001.github.io/portfolio-inside-page/?t=${Date.now()}`}
            style={{ width: '100%', height: '70vh', border: 'none' }}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
