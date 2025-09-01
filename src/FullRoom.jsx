import { Html, useAnimations, useGLTF, useProgress } from "@react-three/drei"
import { useLayoutEffect, useMemo, useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { HatchMaterial } from "./HatchMaterial"
import { Suspense } from 'react'

import * as THREE from 'three'
export default function FullRoom()
{

  const room = useGLTF('./portfolioblend.glb')
  const iMac = room.nodes['Apple_iMac']

  console.log(room)
/*load using timestamp */

const iframeUrl = useMemo(
  () => `https://ilyassha001.github.io/portfolio-inside-page/?t=${Date.now()}`,[])



  
  /*Shader Material */

  // Create ONE shared material instance
  const hatch = useMemo(
    () => new HatchMaterial({
    scale: 25,
    thickness: 0.15,
    inkColor: new THREE.Color('#111'),
    paperColor: new THREE.Color('#f7f4e9'),
    ambient: 0.15,
    useWorld: 1,
    }),
    []
  )

  // Replace materials on all meshes in the loaded scene
  useLayoutEffect(() => {
      room.scene.traverse((o) => {
      if (o.isMesh) {
          o.material = hatch
          o.material.needsUpdate = true
      }
      })
  }, [room.scene, hatch])




  /*zoom in and out*/
  const { camera } = useThree()
  const [targetFov, setTargetFov] = useState(35)
  const [isVisible, setIsVisible] = useState(false)

  useFrame((_, delta) => {
    camera.fov += (targetFov - camera.fov) * delta * 5
    camera.updateProjectionMatrix()
  })

  useEffect(() => {
    const onKeyDown = (e) => { 
      if (e.code === 'KeyE') setTargetFov(35), setIsVisible(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {window.removeEventListener('keydown', onKeyDown)}
  }, [])

  const onHoveriMac = () => {
    document.body.style.cursor = 'pointer'
    setTargetFov(20)
    setIsVisible(true)
    
  }

  const onPointerLeaveHandler = () => {
    //like css cursor: default
   document.body.style.cursor = 'move'
  }


  function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress.toFixed(0)} % loaded</Html>
  }


  return (
    <>

      {/* Attach iframe ONLY to the Apple_iMac node */}
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.3}
        position={[-0.604, 1.07, -2.64]}
        rotation-y={ 0}
        // 👇 attach to iMac
   
        center
        parent={iMac} // <- alternative approach if you want it directly bound
      >
        <iframe 
          src={iframeUrl} 
          className="iframe-radius"  
          onPointerEnter={ onHoveriMac } 
          onPointerLeave={ onPointerLeaveHandler }
        />
      </Html>
      <Suspense fallback={<Loader />}>
        <primitive 
          object={ room.scene } 
          rotation-y={1.6} 
          scale={4} 
          position-y={-5.5} 
        >
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
        </primitive>
      </Suspense>

      {isVisible ?  <Html position={ [1, 1.5 , 1] } ><span className="DescriptorText">Press "E" to exit zoom</span></Html> : null}
     
    </>
  )
}
