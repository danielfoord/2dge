'use strict';

let gGL: WebGLRenderingContext = null;

const initializeGL = (): void => {
  const canvas: HTMLCanvasElement = document.getElementById('GLCanvas') as HTMLCanvasElement; 

  gGL = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;

  if (gGL) {
    gGL.clearColor(0.0, 0.8, 0.0, 1.0);
    
    // Init vertex buffer
    initSquareBuffer();

    initSimpleShader('VertexShader', 'FragmentShader');

  } else {
    document.write("<br><b>WebGL is not supported</b>");
  }
};

const clearCanvas = (): void => {
  gGL.clear(gGL.COLOR_BUFFER_BIT);
};

const drawSquare = (): void => {
  gGL.clear(gGL.COLOR_BUFFER_BIT);

  gGL.useProgram(gSimpleShader);

  gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);

  gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
};

const doGLDraw = (): void => {
  initializeGL();
  drawSquare();
};