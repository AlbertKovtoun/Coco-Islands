import * as THREE from "three"
import gsap from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { pane, scene } from "./Experience"

import windVertexShader from "../../shaders/wind/vertex.glsl"
import windFragmentShader from "../../shaders/wind/fragment.glsl"

const windMeshPath1 = "/assets/models/Wind1.gltf"
const windMeshPath2 = "/assets/models/Wind2.gltf"

export class Wind {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {
      this.setWindAnimation()
    })
    this.gltfLoader = new GLTFLoader(this.loadingManager)

    this.wind1
    this.wind2
    this.wind3
    this.windMaterial

    this.setWind()
  }

  setWind() {
    this.windMaterial = new THREE.ShaderMaterial({
      vertexShader: windVertexShader,
      fragmentShader: windFragmentShader,
      transparent: true,

      uniforms: {
        uProgress: { value: 0 },
      },
    })

    //Load Wind1
    this.gltfLoader.load(windMeshPath1, (gltf) => {
      this.wind1 = gltf.scene

      this.wind1.traverse((child) => {
        if (child.isMesh) child.material = this.windMaterial
      })

      this.wind1.position.set(0, 0.3, 0)
      scene.add(this.wind1)
    })

    //Load wind2
    this.gltfLoader.load(windMeshPath2, (gltf) => {
      this.wind2 = gltf.scene

      this.wind2.traverse((child) => {
        if (child.isMesh) child.material = this.windMaterial
      })

      this.wind2.position.set(0.5, 0.75, -1)
      scene.add(this.wind2)

      //Clone wind 2
      this.wind3 = this.wind2.clone()
      this.wind3.position.set(-0.6, 0.5, -0.8)
      scene.add(this.wind3)
    })
  }

  setWindAnimation() {
    gsap.fromTo(
      this.windMaterial.uniforms.uProgress,
      {
        value: -2,
        duration: 5,
        repeat: -1,
        yoyo: true,
      },
      {
        value: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
      }
    )
  }
}
