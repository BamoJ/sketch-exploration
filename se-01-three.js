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
	fps: 60,
	dimensions: [1080, 1080],
	duration: 4,
	// Get a WebGL canvas rather than 2D
	context: 'webgl',
	// Turn on MSAA
	attributes: {
		antialias: true,
		powerPreference: 'high-performance',
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
	const camera = new THREE.OrthographicCamera()

	// Setup camera controller

	// const controls = new THREE.OrbitControls(camera, context.canvas)

	// Setup your scene
	const scene = new THREE.Scene()

	// Setup a geometry
	const geometry = new THREE.BoxGeometry(1, 1, 1)

	// Setup a material

	const palette = random.pick(palettes, seed)

	const num = 30

	for (let i = 0; i < num; i++) {
		const material = new THREE.MeshPhongMaterial({
			color: random.pick(palette),
			flatShading: false,
			reflectivity: 10,
			shininess: 100,
			refractionRatio: 0.85,
		})
		const mesh = new THREE.Mesh(geometry, material)

		mesh.position.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1),
		)
		mesh.scale.set(
			random.range(-0.5, 0.5),
			random.range(-0.5, 0.5),
			random.range(-0.5, 0.5),
		),
			scene.add(mesh)
	}

	// setup a light

	// Directional light
	const dLight = new THREE.DirectionalLight('white', 1)
	dLight.position.set(0, 4, Math.PI * 2)

	// point light
	// const pLight = new THREE.PointLight('#45caf7', 1, 15.5)
	// pLight.position.set(2, 2, 4).multiplyScalar(1.5)

	// ambient light
	const aLight = new THREE.AmbientLight('hsl(0, 0%, 20%)')

	scene.add(dLight, aLight)

	// draw each frame
	return {
		// Handle resize events here
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio)
			renderer.setSize(viewportWidth, viewportHeight, false)

			// aspect ratio
			const aspect = viewportWidth / viewportHeight

			// Orthographic camera zoom
			const zoom = 1.9

			// Camera Bounds
			camera.left = -zoom * aspect
			camera.right = zoom * aspect
			camera.top = zoom
			camera.bottom = -zoom

			// Near/Far Camera
			camera.near = -100
			camera.far = 100

			// Set camera position and look at scene
			camera.position.set(zoom, zoom, zoom)
			camera.lookAt(new THREE.Vector3())

			// Update the camera
			camera.updateProjectionMatrix()
		},

		// Update & render your scene here
		render({ time }) {
			// controls.update()
			renderer.render(scene, camera)
			scene.rotation.y = time * 0.1
		},

		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			// controls.dispose()
			renderer.dispose()
		},
	}
}

canvasSketch(sketch, settings)
