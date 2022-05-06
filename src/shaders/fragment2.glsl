varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime * 0.2;

  vec2 uv = vUv;
  uv.x += sin(uv.y) * 0.25;
  vec2 repeat = vec2(3.0, 3.0);
  uv = fract(uv * repeat + vec2(0.0, 0.8*time));
  
  vec4 color = texture2D(uTexture, uv);
  
  gl_FragColor = color;
}
