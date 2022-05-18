'use strict';

let gSquareVertextBuffer: WebGLBuffer = null;

const initSquareBuffer = (): void => {

  const verticiesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
  ];

  gSquareVertextBuffer = gGL.createBuffer();

  gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertextBuffer);

  gGL.bufferData(gGL.ARRAY_BUFFER, 
    new Float32Array(verticiesOfSquare), gGL.STATIC_DRAW);
};