import { Game, GAME_STATE } from "./game.js"
import Ball from "./ball.js"
import Levels from "./levels.js"
import Paddle from "./paddle.js"

export default class BreaoutGame extends Game {
  constructor(w, h) {
    super(w, h)
    this.lives = 3
    this.paddle = new Paddle(this)
    let img = document.getElementById("imgBall")
    this.ball = new Ball(this, img)
    this.level = 0
    this.levels = new Levels(this)
    this.newLevel()
  }

  newLevel() {
    this.bricks = this.levels.buildLevel(this.level)
    this.objs = [this.paddle, this.ball, ...this.bricks]
    this.level += 1
    this.ball.reset()
  }

  removeLife() {
    super.removeLife()
    if (this.lives > 0)
      this.ball.reset()
  }
}