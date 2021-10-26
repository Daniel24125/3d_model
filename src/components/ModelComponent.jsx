import React from 'react'
import * as THREE from "three"
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Model from "../assets/object.obj"

const ModelComponent = () => {


    React.useEffect(()=>{
        const scene = new THREE.Scene()
        let objects = []
        const objectLoader = new OBJLoader();
        let labels = [
            {
                text: "Input Module", 
                position: [-6,16, -3],
                geometry: null
            },
            {
                text: "Silicone Stomach", 
                position: [0,8, 10],
                geometry: null
            },
            {
                text: "pH Electrode Support", 
                position: [-12,1, 10],
                geometry: null
            },
            {
                text: "Pyloric Filter", 
                position: [-18,-1, -4],
                geometry: null
            },
            {
                text: "Fibre Optics Support", 
                position: [-25,-2, 10],
                geometry: null
            },
            {
                text: "Module Holder", 
                position: [-18,-6,10],
                geometry: null
            }
        ]
    
        const pointLight = new THREE.PointLight( 0xffffff, 4);
        const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
        let sizes = {
            width: window.innerWidth,
            height: window.innerHeight*0.7
        }
        const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 200)
        const clock = new THREE.Clock()
        const velocity = 0.15
        const textVelocity = 0.03
        const canvas = document.querySelector('canvas.webgl')
        const controls =  new OrbitControls(camera, canvas)
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true, 
        })
        let animateModel = false 

        const lookUpPoint = new THREE.Vector3(-10,5,0)

       
        
        const generateLabel = (message, parameters) =>{
            if ( parameters === undefined ) parameters = {};
            var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
            var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 25;
            var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
            var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
            var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
    
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = "Bold " + fontsize + "px " + fontface;
    
    
            context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
    
            context.lineWidth = borderThickness;
            // roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);
    
            context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
            context.fillText( message, borderThickness, fontsize + borderThickness);
    
            var texture = new THREE.Texture(canvas) 
            texture.needsUpdate = true;
    
            var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
            var sprite = new THREE.Sprite( spriteMaterial );
            sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
            return sprite; 
        }
        
        const init = () =>{
            // scene.background = new THREE.Color(0xefefef)
            // const axesHelper = new THREE.AxesHelper( 50 );
            // scene.add( axesHelper );
            objectLoader.load(Model, (root) => {
                root.castShadow = true
                root.children.forEach((c,i)=>{
                    // Materials
                    const material = new THREE.MeshPhongMaterial({
                        color: i=== 0 || i === 2 || i === 3 || i === 4 ? new THREE.Color(0xecf0f1):  i=== 1? new THREE.Color(0xf39c12) : new THREE.Color(0x3498db),
                        specular: 0x050505,
                        shininess: 500,
                    })
                    var geo =c.geometry;
                    const obj = new THREE.Mesh(geo,material)
                    obj.castShadow = true
                    obj.receiveShadow = true
                    objects.push(obj)
                    scene.add(obj)
                    
                    //Lables
                    const sprite = generateLabel(labels[i].text)
                    labels[i].geometry = sprite
                    sprite.position.set(labels[i].position[0],labels[i].position[1], labels[i].position[2])
                    sprite.material.opacity = 0
                    scene.add(sprite)
                    
    
                });
            })
            //Light
            pointLight.castShadow=true
            scene.add(pointLight);
            scene.add(hemiLight)
            
            //Camera
            camera.position.set(-35,20,0)
            camera.lookAt(lookUpPoint)
            
            //Controls
            controls.enableDamping = true
            controls.enableZoom = false
            controls.screenSpacePanning = true;
            controls.target = lookUpPoint
            controls.update();

            
            //Renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.shadowMap.enabled = true
            renderer.toneMapping = THREE.ReinhardToneMapping
            renderer.toneMappingExposure = 2.3
            tick()
        }
    
        const tick = () =>{
            // const elapsedTime = clock.getElapsedTime()
            if(objects.length !== 0){
                if(animateModel){
                    objects[0].position.y += objects[0].position.y < 3 ? velocity: 0
                    objects[3].position.x -= objects[3].position.x > -2 ? velocity: 0
                    objects[4].position.x -= objects[4].position.x > -6 ? velocity: 0
                    labels.forEach(l=>{
                        l.geometry.material.opacity += l.geometry.material.opacity < 1 ? textVelocity: 0
                    })
                }else{
                    objects[0].position.y -= objects[0].position.y > 0 ? velocity: 0
                    objects[3].position.x += objects[3].position.x < 0 ? velocity: 0
                    objects[4].position.x += objects[4].position.x < 0 ? velocity: 0
                    labels.forEach(l=>{
                        l.geometry.material.opacity -= l.geometry.material.opacity  >= 0 ? textVelocity: 0
                    })
                }
            }
            pointLight.position.set(
                camera.position.x + 10,
                camera.position.y + 10,
                camera.position.z + 10,
            )
        
            // Render
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
            
        }
        

        init()
        document.getElementById("model").addEventListener("mouseenter", ()=>{
            animateModel = true
    
        })
    
        document.getElementById("model").addEventListener("mouseleave", ()=>{
            animateModel = false
    
        })
       
       window.addEventListener('resize', () =>{
             // Update sizes
             sizes.width = window.innerWidth
             sizes.height = window.innerHeight*0.7
     
             // Update camera
             camera.aspect = sizes.width / sizes.height
             camera.updateProjectionMatrix()
     
             // Update renderer
             renderer.setSize(sizes.width, sizes.height)
             renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })


    },[])
       



  
   

 



    return ( <canvas id="model" className="webgl"></canvas>)
}

export default ModelComponent


