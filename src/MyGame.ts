class MyGame {
  async initialize(canvasId: string): Promise<void> {
    Engine.initialize(canvasId);

    const shader = new SimpleShader(
      'src/GLSLShaders/SimpleVS.glsl', 
      'src/GLSLShaders/WhiteFS.glsl');

    await shader.initialize();

    Engine.Ctx.clear(Engine.Ctx.COLOR_BUFFER_BIT);
   
    const whiteSq = new Renderable(shader);
    whiteSq.setColor([1, 1, 1, 1]);
    whiteSq.draw();

    const redSq = new Renderable(shader);
    redSq.setColor([1, 0, 0, 1]);
    redSq.draw();
  }
} 