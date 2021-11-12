import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import { scene } from "./Experience"
import island1VertexShader from "../../shaders/island1/vertex.glsl"
import island1FragmentShader from "../../shaders/island1/fragment.glsl"

const islandMeshPath = "/assets/models/CocoIslands.gltf"
const islandTexturePath = "/assets/textures/island1HighPolyBaked.png"

export class Island {
  constructor() {
    this.gltfLoader = new GLTFLoader()
    this.textureLoader = new THREE.TextureLoader()

    this.setIsland()
  }

  setIsland() {
    //Load material
    this.islandTexture = this.textureLoader.load(islandTexturePath)
    // this.islandTexture.encoding = THREE.sRGBEncoding
    this.islandTexture.flipY = false

    //Load mesh
    this.gltfLoader.load(islandMeshPath, (gltf) => {
      this.islandMesh = gltf.scene.children.find(
        (child) => child.name === "island1"
      )

      //Island material
      this.islandMaterial = new THREE.ShaderMaterial({
        vertexShader: island1VertexShader,
        fragmentShader: island1FragmentShader,
        transparent: true,
        uniforms: {
          uTexture: { value: this.islandTexture },
        },
      })

      this.island = new THREE.Points(
        this.islandMesh.geometry,
        this.islandMaterial
      )

      scene.add(this.island)
    })
  }
}
