// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three')

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')
const palettes = require('nice-color-palettes')

const seed = random.getRandomSeed()

const settings = {
	// Make the loop animated
	animate: true,
	// Get a WebGL canvas rather than 2D
	context: 'webgl',
	// Turn on MSAA
	attributes: {
		antialias: true,
		dpr: 2,
	},
	suffix: seed,
}

const sketch = ({ context }) => {
	// Create a renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: context.canvas,
	})

	// WebGL background color
	renderer.setClearColor('#ffffff', 1)

	// Setup a camera
	const camera = new THREE.PerspectiveCamera(65, 1, 0.01, 100)
	camera.position.set(4, 2, 2)
	camera.lookAt(new THREE.Vector3())

	// Setup camera controller
	const controls = new THREE.OrbitControls(camera, context.canvas)

	// Setup your scene
	const scene = new THREE.Scene()

	// Setup a geometry
	const geometry = new THREE.BoxGeometry(1, 1, 1, 50, 50, 50)

	// Setup a material
	const material = new THREE.MeshPhysicalMaterial({
		color: 'white',
		wireframe: false,
		roughness: 0.75,
		flatShading: true,
	})

	// setup a light
	const pLight = new THREE.PointLight('#45caf7', 1, 15.5)
	pLight.position.set(2, 2, 4).multiplyScalar(1.5)

	const aLight = new THREE.AmbientLight('skyblue', 0.3)

	scene.add(pLight, aLight)

	// Setup a mesh with geometry + material
	const mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)

	// draw each frame
	return {
		// Handle resize events here
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio)
			renderer.setSize(viewportWidth, viewportHeight, false)
			camera.aspect = viewportWidth / viewportHeight
			camera.updateProjectionMatrix()
		},
		// Update & render your scene here
		render({ time }) {
			controls.update()
			renderer.render(scene, camera)
			mesh.rotation.y = time * ((10 * Math.PI) / 180)
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			controls.dispose()
			renderer.dispose()
		},
	}
}

canvasSketch(sketch, settings)
