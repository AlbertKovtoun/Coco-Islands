import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { pane, scene } from "./Experience"

import windVertexShader from "../../shaders/wind/vertex.glsl"
import windFragmentShader from "../../shaders/wind/fragment.glsl"

const windMeshPath = "/assets/models/Wind1.gltf"

export class Wind {
  constructor() {
    this.gltfLoader = new GLTFLoader()

    this.windMaterial

    this.setWind()
    this.setWindTweaks()
  }

  setWind() {
    this.windMaterial = new THREE.ShaderMaterial({
      vertexShader: windVertexShader,
      fragmentShader: windFragmentShader,
      transparent: true,

      uniforms: {
        uProgress: { value: 0.5 },
      },
    })

    this.gltfLoader.load(windMeshPath, (gltf) => {
      this.wind = gltf.scene

      this.wind.traverse((child) => {
        if (child.isMesh) child.material = this.windMaterial
      })

      this.wind.position.set(0, 0.5, 0)
      scene.add(this.wind)
    })
  }

  setWindTweaks() {
    pane.addInput(this.windMaterial.uniforms.uProgress, "value", {
      min: 0,
      max: 1,
      step: 0.001,
      label: "windProgress",
    })
  }
}
