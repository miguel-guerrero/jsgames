import GameObject from "./game_object.js"

export default class Paddle extends GameObject {
  constructor(game, img) {
    let x, y
    [x, y] = [game.width / 2, game.height - 40]
    super(x, y, 100, 10, "red")
    this.game = game
    this.SPEED = 0.6
  }

  update(ctx) {
    super.update(ctx)
    if (this.left() < 0) {
      this.pos.x = this.size.w / 2
      this.speed.x = 0
    }
    if (this.right() > this.game.width) {
      this.pos.x = this.game.width - this.size.w / 2
      this.speed.x = 0
    }
  }
}