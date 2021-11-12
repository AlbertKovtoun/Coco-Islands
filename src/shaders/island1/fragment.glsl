uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{

    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    vec4 mask = vec4(vUv, 1.0, step(ll, 0.5));

    vec4 textureColor = texture2D(uTexture, vUv);

    gl_FragColor = vec4(textureColor);
    gl_FragColor.a = step(ll, 0.5);
}