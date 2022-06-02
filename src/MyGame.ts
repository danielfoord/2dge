class MyGame {
  // Game shader
  shader: SimpleShader;

  async initialize(canvasId: string): Promise<void> {
    Engine.initialize(canvasId);
    this.shader = new SimpleShader('src/GLSLShaders/SimpleVS.glsl', 'src/GLSLShaders/WhiteFS.glsl');
    await this.shader.initialize();

    Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);
    this.shader.activate();
    Engine.Ctx.drawArrays(Engine.Ctx.TRIANGLE_STRIP, 0, 4);
  }
}