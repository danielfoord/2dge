class Engine {
  
  private static ctx: WebGLRenderingContext;
  private static vertexBuffer: WebGLBuffer;

  public static get Ctx(): WebGLRenderingContext {
    if (!this.ctx) {
      console.debug('Initializing WebGL context...');
      const canvas: HTMLCanvasElement = document.getElementById('GLCanvas') as HTMLCanvasElement; 
      this.ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      console.debug('WebGL context initialized');
    }
    return this.ctx;
  }

  public static get VertexBuffer(): WebGLBuffer {
    return this.vertexBuffer;
  } 

  private static initializeVertexBuffer(): void {
    const verticiesOfSquare = [
      0.5, 0.5, 0.0,
      -0.5, 0.5, 0.0,
      0.5, -0.5, 0.0,
      -0.5, -0.5, 0.0
    ];
  
    this.vertexBuffer = Engine.Ctx.createBuffer();
  
    Engine.Ctx.bindBuffer(Engine.Ctx.ARRAY_BUFFER, this.vertexBuffer);
  
    Engine.Ctx.bufferData(Engine.Ctx.ARRAY_BUFFER, 
      new Float32Array(verticiesOfSquare), Engine.Ctx.STATIC_DRAW);
  }

  public static initialize(): void {
    if (Engine.Ctx) {
      Engine.Ctx.clearColor(0.0, 0.8, 0.0, 1.0);
      this.initializeVertexBuffer();
    } else {
      document.write("<br><b>WebGL is not supported</b>");
    }
  }
}