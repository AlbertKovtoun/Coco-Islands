import * as THREE from "three"

import { scene } from "./Experience"
import skyVertexShader from "../../shaders/sky/vertex.glsl"
import skyFragmentShader from "../../shaders/sky/fragment.glsl"

export class Sky {
  constructor() {
    this.sky

    this.setSky()
  }

  setSky() {
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(5, 30, 30),
      new THREE.ShaderMaterial({
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        side: THREE.BackSide,
      })
    )
    scene.add(this.sky)
  }
}
