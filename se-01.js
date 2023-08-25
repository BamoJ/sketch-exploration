const canvasSketch = require("canvas-sketch")
const random = require("canvas-sketch-util/random")
const { lerp } = require("canvas-sketch-util/math")
const palettes = require("nice-color-palettes")

const seed = random.getRandomSeed()

const settings = {
  suffix: seed,
  dimensions: [2048, 2048],
  pixelsPerInch: 300,
  name: `se-${seed}`,
}
const sketch = ({ context, width, height }) => {
  const ctx = context
  random.setSeed(seed)

  const colorCount = random.rangeFloor(1, 6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount)

  const createGrid = () => {
    const points = []
    const count = 60

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        const radius = Math.abs(random.noise2D(u, v)) * 0.05

        points.push({
          position: [u, v],
          color: random.pick(palette),
          radius: radius,
          rotation: random.noise2D(u, v),
        })
      }
    }
    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 200

  return ({ width, height }) => {
    // canvas background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { position, radius, color, rotation } = data
      const [u, v] = position

      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      ctx.save()
      // ctx.beginPath()
      // ctx.arc(x, y, radius * width, 0, Math.PI * 2, false)
      // ctx.fillStyle = color
      // ctx.fill()
      ctx.fillStyle = color
      ctx.font = `${radius * width}px "Helvetica"`
      ctx.translate(x - 25, y)
      ctx.rotate(rotation)
      ctx.fillText("—", 0, 0)
      ctx.restore()
    })
  }
}

canvasSketch(sketch, settings)
