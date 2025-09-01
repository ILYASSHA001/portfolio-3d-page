import { useTexture } from '@react-three/drei'
export default function MidGround(){
    const texture = useTexture('./placeholder-midground.png') // from public folder

    return(
        <>
            <mesh position={[0, -30, -40]} rotation-x={-Math.PI/ 2}>
            
                <planeGeometry args={[140, 80]}  />   {/* width, height */}
                <meshStandardMaterial map={texture} />

            </mesh>
        </>
    )
}
    
    