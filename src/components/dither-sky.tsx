import { Pause, Play } from 'lucide-react'
import { useState } from 'react'
import { usePrefersReducedMotion } from '../lib/dither/motion'
import { ditherMaskStyle } from '../lib/dither/pattern'
import { DitherShader } from '../lib/dither/shader'

const skyPalette = ['--dither-paper', '--dither-shadow', '--dither-mist', '--dither-ink'] as const
const fallbackMask = ditherMaskStyle(0.34, { matrix: 'bayer8', cell: 3 })

const skyField = `
float field(vec2 uv, vec2 res, float t) {
  float aspect = res.x / res.y;
  vec2 p = vec2((uv.x - 0.54) * aspect, uv.y);
  vec2 wind = vec2(t * 0.045, -t * 0.01);

  // Stretch the lower layer along the horizon and let fine wisps move above it.
  vec2 air = p * vec2(0.85, 2.6) + wind;
  float curl = snoise(air * 0.8 + vec2(7.0, 3.0));
  float clouds = fbm(air + vec2(0.0, curl * 0.62));
  float wisps = fbm(p * vec2(2.6, 8.5) + wind * 1.65);
  float litMist = smoothstep(0.31, 0.75, clouds * 0.8 + wisps * 0.2);

  vec2 light = (p - vec2(0.0, 1.1)) * vec2(0.50, 1.3);
  float glow = exp(-dot(light, light) * 2.8);
  float fade = smoothstep(0.08, 0.86, uv.y);
  return (0.21 + glow * 0.76) * litMist * fade;
}
`

export function DitherSky() {
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      <DitherShader
        className="home-sky absolute"
        field={skyField}
        palette={skyPalette}
        matrix="bayer8"
        cell={3}
        fps={18}
        stillTime={9}
        animate={!paused && !reducedMotion}
        fallback={<div className="home-sky-fallback" style={fallbackMask} />}
      />
      {!reducedMotion && (
        <button
          type="button"
          className="sky-toggle"
          aria-label={paused ? 'Play sky animation' : 'Pause sky animation'}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </>
  )
}
