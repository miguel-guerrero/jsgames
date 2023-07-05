
export const GAME_STATE = {
  MENU: 0,
  RUN: 1,
  PAUSE: 2,
  GAME_OVER: 3,
  WIN: 4,
}

function playSound(sound) {
  // reset time in case this sound is currently playing
  sound.currentTime = 0
  sound.play()
}

export class Game {
  constructor(width, height) {
    // playable area
    this.width = width
    this.height = height
    this.objs = []
    this.soundsToPlay = []
    this.state = GAME_STATE.MENU
    this.points = 0
    this.lives = 1
    this.fps = 0
  }

  reset() {
    this.objs.forEach(obj => obj.reset())
  }

  update(deltaTime) {
    if (this.state != GAME_STATE.RUN)
      return
    this.objs.forEach(obj => obj.update(deltaTime))
    this.objs = this.objs.filter(obj => !obj.markForDel)
    if (deltaTime != 0) {
      let alpha = 0.5  // weight of current value
      this.fps = alpha*(1000.0 / deltaTime) + (1-alpha)*this.fps
    }
  }

  play(sounds) {
    this.soundsToPlay.forEach(sndName => playSound(sounds[sndName]))
    this.soundsToPlay = []
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    this.objs.forEach(obj => obj.draw(ctx))
    this.drawStalledState(ctx)
    this.drawLives(ctx)
    this.drawScore(ctx)
    this.drawFps(ctx)
  }

  // when in a non-running state, show grayed picture
  drawStalledState(ctx) {
    ctx.font = "30px Arial"
    if (this.state != GAME_STATE.RUN) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, this.width, this.height)
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
    }
    if (this.state == GAME_STATE.MENU) {
      ctx.fillText("Press Space to start", this.width / 2, this.height / 2)
    }
    else if (this.state == GAME_STATE.PAUSE) {
      ctx.fillText("Paused", this.width / 2, this.height / 2)
    }
    else if (this.state == GAME_STATE.GAME_OVER) {
      ctx.fillText("Game Over", this.width / 2, this.height / 2)
    }
    else if (this.state == GAME_STATE.WIN) {
      ctx.fillText("You Win!!", this.width / 2, this.height / 2)
    }
  }

  drawLives(ctx) {
    // show life left
    ctx.textAlign = "left"
    ctx.fillStyle = "green"
    ctx.fillText("Life " + this.lives + "  ", 10, this.height - 5)
  }
 
  drawScore(ctx) {
    // show points
    ctx.textAlign = "right"
    ctx.fillStyle = "blue"
    ctx.fillText("Score " + this.points + "  ", this.width, this.height - 5)
  }

  drawFps(ctx) {
    // show points
    ctx.textAlign = "center"
    ctx.fillStyle = "grey"
    ctx.fillText("FPS " + Math.round(this.fps*100)/100 + "  ", this.width/2, this.height - 5)
  }

  run() {
    this.state = GAME_STATE.RUN
  }

  togglePause() {
    if (this.state == GAME_STATE.RUN) {
      this.state = GAME_STATE.PAUSE
    }
    else if (this.state == GAME_STATE.PAUSE) {
      this.state = GAME_STATE.RUN
    }
  }

  removeLife() {
    this.lives -= 1
    if (this.lives <= 0) {
      this.state = GAME_STATE.GAME_OVER
    }
  }

  isGameOver() {
    return this.state == GAME_STATE.GAME_OVER
  }

  newLevel() {
    this.state = GAME_STATE.WIN
  }

  outOfBoundsX(obj) {
    return obj.left() < 0 || obj.right() >= this.width
  }

  outOfBoundsY(obj) {
    return obj.top() < 0 || obj.bottom() >= this.height
  }

  collide(obj1, obj2) {
    if (obj1.bottom() < obj2.top()) return false
    if (obj1.top() > obj2.bottom()) return false
    if (obj1.right() < obj2.left()) return false
    if (obj1.left() > obj2.right()) return false
    return true
  }

}
