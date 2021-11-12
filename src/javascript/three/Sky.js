import * as THREE from "three"

import { pane, scene } from "./Experience"
import skyVertexShader from "../../shaders/sky/vertex.glsl"
import skyFragmentShader from "../../shaders/sky/fragment.glsl"

export class Sky {
  constructor() {
    this.sky
    this.debugObject = {
      bottomColor: "#ffffff",
      topColor: "#4ad1ff",
    }

    this.setSky()
    this.setSkyTweaks()
  }

  setSky() {
    this.skyMaterial = new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      side: THREE.BackSide,

      uniforms: {
        uBColor: { value: new THREE.Color(this.debugObject.bottomColor) },
        uTColor: { value: new THREE.Color(this.debugObject.topColor) },
      },
    })
    this.sky = new THREE.Mesh(
      new THREE.SphereGeometry(5, 30, 30),
      this.skyMaterial
    )
    scene.add(this.sky)
  }

  setSkyTweaks() {
    pane.addInput(this.debugObject, "bottomColor").on("change", () => {
      this.skyMaterial.uniforms.uBColor.value.set(this.debugObject.bottomColor)
    })
    pane.addInput(this.debugObject, "topColor").on("change", () => {
      this.skyMaterial.uniforms.uTColor.value.set(this.debugObject.topColor)
    })
  }
}
