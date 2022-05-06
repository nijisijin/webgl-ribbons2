 varying vec2 vUv;
    uniform float uTime;
  uniform sampler2D uTexture;
 
  void main() {
    float time = uTime * 0.05;
    
    vec2 uv = vUv;

    vec2 repeat = vec2(1., 1.);
    uv= fract(uv * repeat + vec2(time, 0.0));

    vec4 color = texture2D(uTexture, uv);
 
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = color;
  }