import GameObject from "./game_object.js"

export default class Brick extends GameObject {
  constructor(game, x, y, w, h, color) {
    super(x, y, w, h, color)
    this.game = game
    this.markForDel = false
  }
}