// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three')

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')
const palettes = require('nice-color-palettes')
const eases = require('eases')
const bezierEasing = require('bezier-easing')
const vertex = require('./shaders/vertex.glsl')
const fragment = require('./shaders/fragment.glsl')

const seed = random.getRandomSeed()

const settings = {
	// Make the loop animated
	animate: true,
	fps: 60,
	dimensions: [1080, 1080],
	duration: 5,
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

	const num = 1000

	for (let i = 0; i < num; i++) {
		const material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
		})
		const mesh = new THREE.Mesh(geometry, material)

		mesh.position.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1),
		)
		mesh.scale.set(
			random.range(-1, 1),
			random.range(-2.5, 2.5),
			random.range(0, 2),
		),
			scene.add(mesh)
	}

	// setup a light

	// Directional light
	const dLight = new THREE.DirectionalLight('white', 2)
	dLight.position.set(0, 3, 4)

	// ambient light
	const aLight = new THREE.AmbientLight('red', 0.5)

	scene.add(aLight, dLight)

	// easing function
	const ease = bezierEasing(0.73, -0.01, 0.12, 0.99)

	// draw each frame
	return {
		// Handle resize events here
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio)
			renderer.setSize(viewportWidth, viewportHeight, false)

			// aspect ratio
			const aspect = viewportWidth / viewportHeight

			// Orthographic camera zoom
			const zoom = 2

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
			camera.lookAt(new THREE.Vector3(0, 0, 0))

			// Update the camera
			camera.updateProjectionMatrix()
		},

		// Update & render your scene here
		render({ time, playhead }) {
			// controls.update()
			renderer.render(scene, camera)
			const t = Math.sin(playhead * Math.PI)
			scene.rotation.z = ease(t)
		},

		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			// controls.dispose()
			renderer.dispose()
		},
	}
}

canvasSketch(sketch, settings)
