
import { Sparkles, useTexture } from '@react-three/drei'


export default function BackGround(){
    const texture = useTexture('./placeholder_image.png') // from public folder

    return(
        <>
            <Sparkles 
                size={ 20 } 
                scale={ [ 10, 10, 10] }
                position={[0, 1, -10]} 
                speed={ 0.2 }
                count={ 100 }
            />
            <mesh position={[0, 1, -100]}>
            
                <planeGeometry args={[200, 80]}  />   {/* width, height */}
                <meshStandardMaterial map={texture} />

            </mesh>
        </>
    )
}
    
    

