uniform vec3 uBColor;
uniform vec3 uTColor;

varying vec2 vUv;

void main()
{
    vec3 color = mix(uBColor, uTColor, sin(vUv.y));

    gl_FragColor = vec4(color, 1.0);
}