import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import {useEffect} from 'react'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Card({cardId, cardName}){
    let mount
    let card1 = new THREE.Object3D()

    const base_rotation = Math.PI/180

    useEffect(()=>{
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000 )
        let renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
        const ambientLight = new THREE.AmbientLight(0x404040, 2)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight( 0x404040, 10, 10 );
        pointLight.position.set( 3, 1, 1 );
        scene.add( pointLight );

        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );

        const pointLight2 = new THREE.PointLight( 0x404040, 10, 10 );
        pointLight2.position.set( -3, 1, 1 );
        scene.add( pointLight2 );

        const sphereSize = 1;
        //const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        //const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize );
        //scene.add( pointLightHelper );
        //scene.add( pointLightHelper2 );
        renderer.setSize( window.innerWidth, window.innerHeight)
        mount.appendChild(renderer.domElement)
        camera.position.z = 7;
        camera.position.x = 0
        camera.position.y = 0

        scene.position.x = 0
        scene.position.y = 0
        scene.position.z = 0

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#'+cardId,
                start: "top top",

                scrub: 0.5,
                //markers: true,
                pin:true,
                pinSpacing:"margin",
                //anticipatePin:1
            }
        });

        const loader = new GLTFLoader()

        loader.load('/assets/pokemon_card/scene.gltf', (gltf)=> {
            card1 = gltf.scene
            scene.add(card1)

            //tl.fromTo(card1.position, {y:-2}, {y: 2})
            tl.fromTo(card1.rotation, {y:-90*base_rotation}, {y: base_rotation*270})

        })

        var animate = function () {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };

        animate();
    },[])

    return(
        <div id={cardId}>
            <h2>Voici {cardName} :</h2>
            <div ref={ref=>(mount = ref)}></div>
        </div>
    )
}