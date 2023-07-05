import GameObject from "./game_object.js"

const MAX_SPEED = 0.25

function clip(x, min, max) {
  return Math.min(Math.max(x, min), max)
}

export default class Ball extends GameObject {
  constructor(game, img) {
    let x, y
    [x, y] = [game.width * 0.10, game.height * 0.80]
    super(x, y, 16, 16, img)
    this.game = game
    this.lastCollided = 0  // provide histeresis to paddle colission
  }

  reset() {
    this.pos = {x: this.pos0.x, y: this.pos0.y}
    this.speed = {x: 0.15, y: -0.2}
  }

  update(ctx) {
    super.update(ctx)
    let g = this.game
    if (this.left() <= 0) {
      this.speed.x = -this.speed.x
      this.pos.x = this.size.w / 2
      g.soundsToPlay.push("wall")
    } else if (this.right() >= g.width) {
      this.speed.x = -this.speed.x
      this.pos.x = g.width - this.size.w / 2
      g.soundsToPlay.push("wall")
    }

    if (this.top() <= 0) {
      this.speed.y = -this.speed.y
      this.pos.y = this.size.h / 2
      g.soundsToPlay.push("wall")
    } else if (this.bottom() >= g.height) {
      g.removeLife()
      if (g.isGameOver()) {
        g.soundsToPlay.push("gameOver")
      } else {
        g.soundsToPlay.push("lostLife")
      }
   }

    if (g.collide(this, g.paddle) && this.lastCollided <= 0) {
      let delta = (this.pos.x - g.paddle.pos.x) / g.paddle.size.w
      this.speed.y = -1.01*this.speed.y
      this.speed.x = this.speed.x + delta + 0.2 * g.paddle.speed.x
      this.lastCollided = 5
      g.soundsToPlay.push("paddle")
    }
    else {
      this.lastCollided--
    }

    this.speed.x = clip(this.speed.x, -MAX_SPEED, MAX_SPEED)
    this.speed.y = clip(this.speed.y, -MAX_SPEED, MAX_SPEED)
 
    let anyCol = false
    g.bricks.forEach( brick => { 
      if (g.collide(this, brick)) { 
        brick.markForDel = true
        g.points += 1
        anyCol = true
      } 
    })
    g.bricks = g.bricks.filter( brick => !brick.markForDel )
    if (anyCol) {
      this.speed.y = -this.speed.y
      g.soundsToPlay.push("brick")
    }

    if (g.bricks.length <= 0) {
      g.newLevel()
      g.soundsToPlay.push("newLevel")
    }
  }
}