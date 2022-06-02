class Renderable {

  constructor(private shader: SimpleShader) {}

  draw(): void {
    this.shader.activate();
    Engine.Ctx.drawArrays(Engine.Ctx.TRIANGLE_STRIP, 0, 4);
  }

  setColor(color: number[]) {
    this.shader.pixelColor = color;
  }
}