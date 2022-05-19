'use strict';

let gSimpleShader: WebGLProgram = null;
let gShaderVertexPositionAttribute = null;

const loadAndCompileShader = (id: string, shaderType: number): WebGLShader => {
  let shaderText: HTMLElement = null;
  let shaderSource: string = null;
  let compiledShader: WebGLShader = null;

  // Get shader source from index.html
  shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

  // Instantiate shader
  compiledShader = gGL.createShader(shaderType);

  // Compile shader
  gGL.shaderSource(compiledShader, shaderSource);
  gGL.compileShader(compiledShader);

  // Check for error and return result
  if(!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
    alert(`A shader compiling error occourred: ${gGL.getShaderInfoLog(compiledShader)}`)
  }
  return compiledShader;
};


const initSimpleShader = (vertexShaderId: string, fragmentShaderId: string): void => {
  // Load and compile the vertex and fragment shaders
  let vertexShader: WebGLShader = loadAndCompileShader(vertexShaderId, gGL.VERTEX_SHADER);
  let fragmentShader: WebGLShader = loadAndCompileShader(fragmentShaderId, gGL.FRAGMENT_SHADER);

  // Create and link shaders into the program
  gSimpleShader = gGL.createProgram();
  gGL.attachShader(gSimpleShader, vertexShader);
  gGL.attachShader(gSimpleShader, fragmentShader);
  gGL.linkProgram(gSimpleShader);

  // Check for error
  if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
    alert('Error linking shader');
  }

  // Get reference to aSquareVertexPosition
  gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, 'aSquareVertexPosition');

  // Activate the vertex buffer loaded in VertexBuffer.ts
  gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertextBuffer);

  // Describe the characteristics of the vertex positions
  gGL.vertexAttribPointer(gShaderVertexPositionAttribute, 
    3,
    gGL.FLOAT,
    false,
    0,
    0);
};
