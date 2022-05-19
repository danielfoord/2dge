class Engine {
  private static ctx: WebGLRenderingContext;
  
  public static get Ctx(): WebGLRenderingContext {
    if (!Engine.ctx) {
      const canvas: HTMLCanvasElement = document.getElementById('GLCanvas') as HTMLCanvasElement; 
      this.ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    }

    return this.ctx;
  }

  public static initialize(): void {
    if (Engine.Ctx) {
      Engine.Ctx.clearColor(0.0, 0.8, 0.0, 1.0);
      
      // Init vertex buffer
      initSquareBuffer();
  
      initSimpleShader('VertexShader', 'FragmentShader');
  
    } else {
      document.write("<br><b>WebGL is not supported</b>");
    }
  }
}