import { HatchMaterial } from './HatchMaterial'

export default function HatchModelExample() {
  return (
    <mesh position={[-2, 1, 2]}>
      <boxGeometry args={[1,1,1]} />
      {/* Works on any mesh */}
      <hatchMaterial
        scale={28}              // denser lines
        thickness={0.10}
        inkColor="#1a1a1a"
        paperColor="#f7f4e9"
        ambient={0.15}
        lightDir={[0.4, 0.9, 0.2]}  // should match your scene key-light direction
        useWorld={1}
        contrast={1.2}
      />
    </mesh>
  )
}