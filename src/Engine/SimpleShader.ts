class SimpleShader {

  private simpleShader: WebGLProgram = null;
  private shaderVertexPositionAttribute: number = null;

  public constructor(
    private vertexShaderId: string,
    private fragmentShaderId: string) { }

  public initialize(): void {
     // Load and compile the vertex and fragment shaders
  let vertexShader: WebGLShader = this.loadAndCompile(this.vertexShaderId, Engine.Ctx.VERTEX_SHADER);
  let fragmentShader: WebGLShader = this.loadAndCompile(this.fragmentShaderId, Engine.Ctx.FRAGMENT_SHADER);

  // Create and link shaders into the program
  this.simpleShader = Engine.Ctx.createProgram();
  Engine.Ctx.attachShader(this.simpleShader, vertexShader);
  Engine.Ctx.attachShader(this.simpleShader, fragmentShader);
  Engine.Ctx.linkProgram(this.simpleShader);

  // Check for error
  if (!Engine.Ctx.getProgramParameter(this.simpleShader, Engine.Ctx.LINK_STATUS)) {
    alert('Error linking shader');
  }

  // Get reference to aSquareVertexPosition
  this.shaderVertexPositionAttribute = Engine.Ctx.getAttribLocation(this.simpleShader, 'aSquareVertexPosition');

  // Activate the vertex buffer loaded in VertexBuffer.ts
  Engine.Ctx.bindBuffer(Engine.Ctx.ARRAY_BUFFER, Engine.VertexBuffer);

  // Describe the characteristics of the vertex positions
  Engine.Ctx.vertexAttribPointer(this.shaderVertexPositionAttribute, 
    3,
    Engine.Ctx.FLOAT,
    false,
    0,
    0);
  }

  public activate(): void {
    Engine.Ctx.useProgram(this.simpleShader);
    Engine.Ctx.enableVertexAttribArray(this.shaderVertexPositionAttribute);
  }

  private loadAndCompile(id: string, shaderType: number): WebGLShader {
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
  }
}