'use strict';

let gSimpleShader: WebGLProgram = null;
let gShaderVertexPositionAttribute: number = null;

const loadAndCompileShader = (id: string, shaderType: number): WebGLShader => {
  let shaderText: HTMLElement = null;
  let shaderSource: string = null;
  let compiledShader: WebGLShader = null;

  // Get shader source from index.html
  shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

  // Instantiate shader
  compiledShader = Engine.Ctx.createShader(shaderType);

  // Compile shader
  Engine.Ctx.shaderSource(compiledShader, shaderSource);
  Engine.Ctx.compileShader(compiledShader);

  // Check for error and return result
  if(!Engine.Ctx.getShaderParameter(compiledShader, Engine.Ctx.COMPILE_STATUS)) {
    alert(`A shader compiling error occourred: ${Engine.Ctx.getShaderInfoLog(compiledShader)}`)
  }
  return compiledShader;
};


const initSimpleShader = (vertexShaderId: string, fragmentShaderId: string): void => {
  // Load and compile the vertex and fragment shaders
  let vertexShader: WebGLShader = loadAndCompileShader(vertexShaderId, Engine.Ctx.VERTEX_SHADER);
  let fragmentShader: WebGLShader = loadAndCompileShader(fragmentShaderId, Engine.Ctx.FRAGMENT_SHADER);

  // Create and link shaders into the program
  gSimpleShader = Engine.Ctx.createProgram();
  Engine.Ctx.attachShader(gSimpleShader, vertexShader);
  Engine.Ctx.attachShader(gSimpleShader, fragmentShader);
  Engine.Ctx.linkProgram(gSimpleShader);

  // Check for error
  if (!Engine.Ctx.getProgramParameter(gSimpleShader, Engine.Ctx.LINK_STATUS)) {
    alert('Error linking shader');
  }

  // Get reference to aSquareVertexPosition
  gShaderVertexPositionAttribute = Engine.Ctx.getAttribLocation(gSimpleShader, 'aSquareVertexPosition');

  // Activate the vertex buffer loaded in VertexBuffer.ts
  Engine.Ctx.bindBuffer(Engine.Ctx.ARRAY_BUFFER, gSquareVertextBuffer);

  // Describe the characteristics of the vertex positions
  Engine.Ctx.vertexAttribPointer(gShaderVertexPositionAttribute, 
    3,
    Engine.Ctx.FLOAT,
    false,
    0,
    0);
};
