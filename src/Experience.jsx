import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import FullRoom from './FullRoom'
import BackGround from './BackGround'
import AudioPlayer from './AudioPlayer'
import MidGround from './MidGround'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    return <>
       {/* <Perf position="top-left" />*/}

        <AudioPlayer />
        <Environment 
            preset='night'
        />
        <BackGround />
        <MidGround />
        <FullRoom  />

        {/*<OrbitControls makeDefault/>*/}
      
        <PerspectiveCamera makeDefault position={[0, 1, 6]} fov={40}  />
        <OrbitControls 
            target={[0, 1, 0]}   // 👈 same Y as the desk/monitor
            enableZoom={false}  
            minAzimuthAngle={ - Math.PI / 2 }   // -45°
            maxAzimuthAngle={ Math.PI / 2}   // +45°
            minPolarAngle={Math.PI*0.35} 
            maxPolarAngle={Math.PI*0.55}  
        />

    </>
}