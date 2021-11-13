uniform float uProgress;

varying vec2 vUv;

void main()
{
    float progressAlpha = (1.0 - abs(uProgress - vUv.y) * 1.0);

    gl_FragColor = vec4(1.0, 1.0, 1.0, progressAlpha);
}