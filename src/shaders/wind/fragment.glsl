uniform float uProgress;

varying vec2 vUv;

void main()
{
    float progressAlpha = (1.0 - abs(uProgress - vUv.x) * 5.0);

    float endsAlpha = min(vUv.x * 10.0, (1.0 - vUv.x) * 10.0);

    float finalAlpha = progressAlpha;

    gl_FragColor = vec4(1.0, 1.0, 1.0, finalAlpha);
}