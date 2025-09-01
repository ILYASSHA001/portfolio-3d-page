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

/*

Here are some improvement ideas:

1. Introduction animation where objects come up when ready and loaded;
2. Sounds (don’t forget that the user needs to interact with the page through a click or a keyboard press before being able to play sounds);
3. Easter eggs;
5. Improve the actual content of the iframe;
6. Make it mobile friendly.

*/