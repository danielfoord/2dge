class SimpleShader {

  private program: WebGLProgram = null;
  private shaderVertexPositionAttribute: number = null;
  private pixelColorRef: WebGLUniformLocation = null;

  public constructor(
    private vertexShaderId: string,
    private fragmentShaderId: string,
    private pixelColor: number[]) { }

  public async initialize(): Promise<void> {
    // Load and compile the vertex and fragment shaders
    let vertexShader: WebGLShader = await this.loadAndCompile(this.vertexShaderId, Engine.Ctx.VERTEX_SHADER);
    let fragmentShader: WebGLShader = await this.loadAndCompile(this.fragmentShaderId, Engine.Ctx.FRAGMENT_SHADER);

    // Create and link shaders into the program
    this.program = Engine.Ctx.createProgram();

    Engine.Ctx.attachShader(this.program, vertexShader);
    Engine.Ctx.attachShader(this.program, fragmentShader);
    Engine.Ctx.linkProgram(this.program);

    // Check for error
    if (!Engine.Ctx.getProgramParameter(this.program, Engine.Ctx.LINK_STATUS)) {
      alert('Error linking shader');
    }

    // Get reference to aSquareVertexPosition
    this.shaderVertexPositionAttribute = Engine.Ctx.getAttribLocation(this.program, 'aSquareVertexPosition');

    // Activate the vertex buffer loaded in VertexBuffer.ts
    Engine.Ctx.bindBuffer(Engine.Ctx.ARRAY_BUFFER, Engine.VertexBuffer);

    // Describe the characteristics of the vertex positions
    Engine.Ctx.vertexAttribPointer(this.shaderVertexPositionAttribute,
      3,
      Engine.Ctx.FLOAT,
      false,
      0,
      0);

    this.pixelColorRef = Engine.Ctx.getUniformLocation(this.program, 'pixelColor');
  }

  public activate(): void {
    Engine.Ctx.useProgram(this.program);
    Engine.Ctx.enableVertexAttribArray(this.shaderVertexPositionAttribute);
    Engine.Ctx.uniform4fv(this.pixelColorRef, this.pixelColor);
  }

  private async loadAndCompile(filePath: string, shaderType: number): Promise<WebGLShader> {
    let compiledShader: WebGLShader = null;

    const res = await fetch(filePath);
    const shaderSource = await res.text();

    // Instantiate shader
    compiledShader = Engine.Ctx.createShader(shaderType);

    // Compile shader
    Engine.Ctx.shaderSource(compiledShader, shaderSource);
    Engine.Ctx.compileShader(compiledShader);

    // Check for error and return result
    if (!Engine.Ctx.getShaderParameter(compiledShader, Engine.Ctx.COMPILE_STATUS)) {
      alert(`A shader compiling error occourred: ${Engine.Ctx.getShaderInfoLog(compiledShader)}`)
    }

    return compiledShader;
  }
}