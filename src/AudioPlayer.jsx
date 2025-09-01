/* 
    Music by 
    <a href="https://pixabay.com/users/folk_acoustic-25300778/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=15013">
    folk_acoustic</a> from 
    <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=15013">Pixabay</a>
*/
import { useEffect, useRef, useState } from "react"
import { Html, useGLTF } from "@react-three/drei"
import musicUrl from './audio-speaker-draco.glb?url'


export default function AudioPlayer() {
    /*===============================================*/
    const blob = useRef(null)

    const audioSpeaker = useGLTF(musicUrl)
    const mySound = "./morning-garden-acoustic-chill-15013.mp3"
    const [play, setPlay] = useState(false)
    const [isVisible, setIsVisible] = useState(false)


    const onPointerEnterHandler = () => {
        //like css cursor: default
        document.body.style.cursor = 'pointer'
    }
    
    const onPointerLeaveHandler = () => {
        //like css cursor: default
        document.body.style.cursor = 'move'
    }

    const AudioToggler = () => {
        const audio = document.getElementById("audio_tag")
        if (!audio) return;

        play ? setPlay(false) : setPlay(true)
        play ? audio.pause() : audio.play()
        isVisible ? setIsVisible(false) : setIsVisible(true)

        audio.volume = 0.3;   // 30% volume

    }
  
    return(
        <>  
            <primitive
                object={audioSpeaker.scene} 
                onClick={AudioToggler}
                onPointerEnter={ onPointerEnterHandler }
                onPointerLeave={ onPointerLeaveHandler }
                scale={ 4 }
                position={[3.2, -0.8, -2]}
                rotation-y={- Math.PI /4}
            >
                {!isVisible ? <Html position={ [0.1, 0.4 , 0.1] } ><span className="DescriptorText">Click the Radio!</span></Html> : null}
                {isVisible ?
                <Html 
                    position={[-0.4, 0.5, -0.1]}
                >
                    <div className="muzieknootjes">
                        <div className="noot-1">
                        &#9835; &#9833;
                        </div>
                        <div className="noot-2">
                        &#9833;
                        </div>
                        <div className="noot-3">
                        &#9839; &#9834;
                        </div>
                        <div className="noot-4">
                        &#9834;
                        </div>
                    </div>
                </Html>
                : null }
                <Html><audio id="audio_tag" src={mySound} loop /></Html>
            </primitive>
        </>
    )
 }