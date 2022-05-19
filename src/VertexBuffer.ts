'use strict';

let gSquareVertextBuffer: WebGLBuffer = null;

const initSquareBuffer = (): void => {
  const verticiesOfSquare = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
  ];

  gSquareVertextBuffer = Engine.Ctx.createBuffer();

  Engine.Ctx.bindBuffer(Engine.Ctx.ARRAY_BUFFER, gSquareVertextBuffer);

  Engine.Ctx.bufferData(Engine.Ctx.ARRAY_BUFFER, 
    new Float32Array(verticiesOfSquare), Engine.Ctx.STATIC_DRAW);
};