'use strict';

const clearCanvas = (): void => {
  Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);
};

const drawSquare = (): void => {
  Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);
  const shader = new SimpleShader('VertexShader', 'FragmentShader');
  shader.initialize();
  shader.activate();
  Engine.Ctx.drawArrays(Engine.Ctx.TRIANGLE_STRIP, 0, 4);
};

const doGLDraw = (): void => {
  Engine.initialize();
  drawSquare();
};