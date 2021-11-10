import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"
import { scene } from "./Experience"

const islandMeshPath = "/assets/models/CocoIslands.gltf"
const islandTexturePath = "/assets/textures/island1Baked.png"

export class Island {
  constructor() {
    this.gltfLoader = new GLTFLoader()
    this.textureLoader = new THREE.TextureLoader()
    this.island

    this.setIsland()
  }

  setIsland() {
    //Load material
    this.islandTexture = this.textureLoader.load(islandTexturePath)
    this.islandTexture.encoding = THREE.sRGBEncoding
    this.islandTexture.flipY = false

    //Load mesh
    this.gltfLoader.load(islandMeshPath, (gltf) => {
      this.island = gltf.scene

      //Island material
      this.islandMaterial = new THREE.MeshBasicMaterial({
        map: this.islandTexture,
      })

      this.island.traverse((child) => {
        child.material = this.islandMaterial
      })
      scene.add(this.island)
    })
  }
}
