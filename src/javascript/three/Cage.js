import * as THREE from "three"
import { pane, scene } from "./Experience"

import cageVertexShader from "../../shaders/cage/vertex.glsl"
import cageFragmentShader from "../../shaders/cage/fragment.glsl"
import gsap from "gsap/all"

export class Cage {
  constructor() {
    this.cageMaterial
    this.cage

    this.setCage()
    this.setCageAnimation()
  }

  setCage() {
    this.cageMaterial = new THREE.ShaderMaterial({
      vertexShader: cageVertexShader,
      fragmentShader: cageFragmentShader,
      wireframe: true,
      transparent: true,
      side: THREE.DoubleSide,

      uniforms: {
        uProgress: { value: 0.5 },
      },
    })

    this.cage = new THREE.Mesh(
      new THREE.SphereGeometry(4.9, 40, 40),
      this.cageMaterial
    )
    scene.add(this.cage)
  }

  setCageAnimation() {
    // pane.addInput(this.cageMaterial.uniforms.uProgress, "value", {
    //   min: 1,
    //   max: 2,
    //   step: 0.001,
    // })

    gsap.to(this.cageMaterial.uniforms.uProgress, {
      value: 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
    })
  }
}
