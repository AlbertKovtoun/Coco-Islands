import * as THREE from "three"
import { Pane } from "tweakpane"
import { Cage } from "./Cage"
import { Camera } from "./Camera"
import { Island } from "./Island"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Sky } from "./Sky"
import { Wind } from "./Wind"

export const pane = new Pane()

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const cage = new Cage()

export const sky = new Sky()

export const wind = new Wind()

export const island = new Island()

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  if (island.islandMaterial)
    island.islandMaterial.uniforms.uTime.value = elapsedTime

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  setTimeout(() => {
    window.requestAnimationFrame(tick)
  }, 1000 / 60)
}

tick()
