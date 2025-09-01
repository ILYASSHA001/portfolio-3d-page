// HatchMaterial.js
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// language=glsl


const vert = `
  varying vec3 vWorldPos; 
  varying vec3 vNormalW;
  varying vec2 vUv2;
  void main() {
    vUv2 = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

// language=glsl
const frag = `
  precision highp float;
  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  varying vec2 vUv2;

  uniform vec3 inkColor;
  uniform vec3 paperColor;
  uniform float scale;       // hatch density (world units if useWorld == 1)
  uniform float thickness;   // 0..0.5
  uniform float ambient;     // 0..1 ambient floor
  uniform vec3 lightDir;     // world-space dir toward light, normalized
  uniform vec3 lightDir2;    // second new light
  uniform int  useWorld;     // 1: world pos, 0: mesh UVs
  uniform float contrast;    // boosts darks

  float linstep(float a, float b, float x){ return clamp((x-a)/(b-a), 0.0, 1.0); }
  mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c,-s,s,c); }

  // Anti-aliased pattern amend pattern here
  float pattern(vec2 uv, float angle, float sc, float t){
    vec2 p = rot(angle) * (uv * sc);
    // use derivative for AA
    float w = fwidth(p.y);
    float d = abs(fract(p.y) - 0.5);
    return 1.0 - smoothstep(t, t + w, d); // 1 on line, 0 off
  }

  void main(){
    // tone: darker when surface faces away from light
    float ndl1 = max(dot(normalize(vNormalW), normalize(lightDir)), 0.0);
    float ndl2 = max(dot(normalize(vNormalW), normalize(lightDir2)), 0.0);

    ndl2 *= 0.7;               // reduce intensity (0.1–0.4 usually fine)
    ndl2 = clamp(ndl2, 0.0, 1.0);

    float ndl = ndl1 + ndl2;  // simply add them
    float tone = 1.0 - max(ambient, ndl);        // 0=white, 1=dark
    tone = pow(tone, contrast);                  // optional contrast

    // choose coordinates for hatching
    vec2 baseUV = (useWorld == 1)
      ? vWorldPos.xy
      : vUv2;

    float sc = scale;

    float h1 = pattern(baseUV, radians(  0.0), sc, thickness);
    float h2 = pattern(baseUV, radians( 45.0), sc, thickness);
    float h3 = pattern(baseUV, radians( 90.0), sc, thickness);
    float h4 = pattern(baseUV, radians(135.0), sc, thickness);

    // ramp in more directions as tone gets darker
    float ink = 0.0;
    ink += smoothstep(0.2, 0.4, tone) * h1;
    ink += smoothstep(0.4, 0.6, tone) * h2;
    ink += smoothstep(0.6, 0.8, tone) * h3;
    ink += smoothstep(0.8, 1.0, tone) * h4;

    vec3 col = mix(paperColor, inkColor, clamp(ink, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const HatchMaterial = shaderMaterial(
  // uniforms (defaults)
  {
    inkColor:   new THREE.Color(0x111111),
    paperColor: new THREE.Color(0xf6f3e8),
    scale:      20.0,   // increase for denser lines (if useWorld=1 this is per world-unit)
    thickness:  0.12,   // 0..0.5
    ambient:    0.12,   // ambient floor
    lightDir:   new THREE.Vector3(0.5, 0.8, 0.3).normalize(),
    lightDir2:   new THREE.Vector3(-1, 0, 0).normalize(),
    useWorld:   1,      // 1 = world space hatching; 0 = use mesh UVs
    contrast:   1.15
  },
  vert,
  frag
)

extend({ HatchMaterial })  // registers <hatchMaterial />
