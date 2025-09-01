import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshPortalMaterial, Environment } from '@react-three/drei'

export default function PlanePortal({ position = [0, 1, 0], rotation = [0, 0, 0], size = [2, 1] }) {
  const spin = useRef()

  useFrame((_, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh position={position} rotation={rotation} scale={ [4.5,5,2] }>
      {/* The screen or surface */}
      <planeGeometry args={size} />
      {/* Portal material */}
      <MeshPortalMaterial >
        {/* All content inside here is rendered into the portal */}
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        {/* Example: a spinning torus */}
        <mesh ref={spin}>
          <torusKnotGeometry args={[0.4, 0.15, 128, 32]}/>
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </MeshPortalMaterial>
    </mesh>
  )
}
