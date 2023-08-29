// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three')

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const frag = require('./shaders/cFrag.glsl')
const vert = require('./shaders/cVert.glsl')

const dotFrag = require('./shaders/dotFrag.glsl')
const dotVert = require('./shaders/dotVert.glsl')

const seed = random.getRandomSeed()

const settings = {
	// Make the loop animated
	animate: true,
	// Get a WebGL canvas rather than 2D
	context: 'webgl',
	// Turn on MSAA
	attributes: { antialias: true },
	dimensions: [2048, 2048],
	name: `se-a1-${seed}`,
}

const sketch = ({ context }) => {
	// Create a renderer
	const renderer = new THREE.WebGLRenderer({
		canvas: context.canvas,
	})

	// WebGL background color
	renderer.setClearColor('#fff', 1)

	// Setup a camera
	const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100)
	camera.position.set(-3, 2, -5)
	camera.lookAt(new THREE.Vector3())

	// Setup camera controller
	const controls = new THREE.OrbitControls(camera, context.canvas)

	// Setup your scene
	const scene = new THREE.Scene()

	// Setup a geometry
	const geometry = new THREE.SphereGeometry(1, 32, 16)
	const baseGeo = new THREE.IcosahedronGeometry(1, 1)

	const basePos = baseGeo.attributes.position
	const baseVec = new THREE.Vector3()

	const circleGeo = new THREE.CircleGeometry(1, 32)

	for (
		let vertexIndex = 0;
		vertexIndex < basePos.count;
		vertexIndex++
	) {
		baseVec.fromBufferAttribute(basePos, vertexIndex)

		const mesh = new THREE.Mesh(
			circleGeo,
			new THREE.ShaderMaterial({
				vertexShader: dotVert,
				fragmentShader: dotFrag,
				wireframe: false,
				side: THREE.BackSide,
			}),
		)
		mesh.position.copy(baseVec)
		mesh.scale.setScalar(random.range(0.25, 1) * 0.15)
		mesh.lookAt(new THREE.Vector3())
		scene.add(mesh)
	}

	// Setup a material
	const material = new THREE.ShaderMaterial({
		wireframe: false,
		vertexShader: vert,
		fragmentShader: frag,
		uniforms: {
			time: { value: 0 },
			color: {
				value: new THREE.Color('red'),
			},
		},
	})

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

			material.uniforms.time.value = time
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			controls.dispose()
			renderer.dispose()
		},
	}
}

canvasSketch(sketch, settings)
