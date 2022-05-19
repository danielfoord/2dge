'use strict';

const clearCanvas = (): void => {
  Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);
};

const drawSquare = (): void => {
  Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);

  Engine.Ctx.useProgram(gSimpleShader);

  Engine.Ctx.enableVertexAttribArray(gShaderVertexPositionAttribute);

  Engine.Ctx.drawArrays(Engine.Ctx.TRIANGLE_STRIP, 0, 4);
};

const doGLDraw = (): void => {
  Engine.initialize();
  drawSquare();
};