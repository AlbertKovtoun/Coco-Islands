import * as THREE from "three"
import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

const cube = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 20, 40),
  new THREE.MeshBasicMaterial({ color: "blue", wireframe: true })
)
scene.add(cube)

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  window.requestAnimationFrame(tick)
}

tick()
