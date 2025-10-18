import { PerspectiveCamera, OrbitControls, Environment, useProgress } from '@react-three/drei'
import FullRoom from './FullRoom'
import BackGround from './BackGround'
import AudioPlayer from './AudioPlayer'
import MidGround from './MidGround'
import { Perf } from 'r3f-perf'
import Placeholder from './Placeholder.jsx'
import { Suspense, useEffect, useState } from 'react'
import { Html, useEnvironment} from "@react-three/drei"
function PrecacheEnvs() {
    // Warm both envs once; they’ll be in the loader cache
    useEnvironment({ preset: 'sunset' })
    useEnvironment({ preset: 'night' })
    return null
  }

export default function Experience({ onOpen })
{
    const [preset, setPreset] = useState('sunset')
    const togglePreset = () => setPreset(p => (p === 'sunset' ? 'night' : 'sunset'))




    return <>
       {/* <Perf position="top-left" />*/}

        <AudioPlayer />
        
        <Suspense fallback={null}>
        <PrecacheEnvs />
        <Environment preset={preset} /* background */ />
      </Suspense>

        <Suspense fallback={<Placeholder  position-y={[0.5]} scale={ [2, 3, 2] } />} >
            <Html transform distanceFactor={1.8} position={[-3, 2, -3]}>
                <button
                    onClick={togglePreset}
                    style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: 'none',
                        background: 'transparent',
                        color: '#fff',
                        fontSize: '14px',
                        width: '100px',
                        height: '60px !important',
                        cursor: 'pointer'
                    }}
                >
                    <span className='DescriptorText big-text'>Toggle Env ({preset})</span>
                </button>
            </Html>
            <BackGround />
            <MidGround />
        </Suspense>


        <Suspense fallback={<Placeholder  position-y={[0.5]} scale={ [2, 3, 2] } />} >
            <FullRoom  onOpen={onOpen}/>
        </Suspense>


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