import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import {
  PathTracingSceneGenerator,
  PathTracingRenderer,
  PhysicalPathTracingMaterial,
} from 'three-gpu-pathtracer';

// init scene, renderer, camera, controls, etc

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// initialize the path tracing material and renderer
const ptMaterial = new PhysicalPathTracingMaterial();
const ptRenderer = new PathTracingRenderer( renderer );
ptRenderer.setSize( window.innerWidth, window.innerHeight );
ptRenderer.camera = camera;
ptRenderer.material = ptMaterial;

// if rendering transparent background
ptRenderer.alpha = true;

// init quad for rendering to the canvas
const fsQuad = new FullScreenQuad( new THREE.MeshBasicMaterial( {
  map: ptRenderer.target.texture,

  // if rendering transparent background
  blending: THREE.CustomBlending,
} ) );

// ensure scene matrices are up to date
scene.updateMatrixWorld();

// initialize the scene and update the material properties with the bvh, materials, etc
const generator = new PathTracingSceneGenerator();
const { bvh, textures, materials, lights } = generator.generate( scene );

// update bvh and geometry attribute textures
ptMaterial.bvh.updateFrom( bvh );
ptMaterial.attributesArray.updateFrom(
  geometry.attributes.normal,
  geometry.attributes.tangent,
  geometry.attributes.uv,
  geometry.attributes.color,
);

// update materials and texture arrays
ptMaterial.materialIndexAttribute.updateFrom( geometry.attributes.materialIndex );
ptMaterial.textures.setTextures( renderer, 2048, 2048, textures );
ptMaterial.materials.updateFrom( materials, textures );

// update the lights
ptMaterial.lights.updateFrom( lights );

// set the environment map
const texture = await new RGBELoader().setDataType( THREE.FloatType ).loadAsync( envMapUrl );
ptRenderer.material.envMapInfo.updateFrom( texture );

animate();

// ...

function animate() {

  // if the camera position changes call "ptRenderer.reset()"

  // update the camera and render one sample
  camera.updateMatrixWorld();
  ptRenderer.update();

  // if using alpha = true then the target texture will change every frame
  // so we must retrieve it before render.
  fsQuad.material.map = ptRenderer.target.texture;

  // copy the current state of the path tracer to canvas to display
  fsQuad.render( renderer );

}
