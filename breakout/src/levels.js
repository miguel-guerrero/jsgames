import Brick from "./brick.js"

const testlevel0 = {
  layout: [
    ".........",
    ".........",
    ".........",
    "....X....",
  ],
  mainColor: "green",
  paddleWidth: 80,
}

const level0 = {
  layout: [
    "XXX.....XXX",
    ".XX.....XX.",
    ".XXXX.XXXX.",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "....X.X....",
  ],
  mainColor: "green",
  paddleWidth: 80,
}

const level1 = {
  layout: [
    "XXX.....XXX",
    ".XX.....XX.",
    ".XXXX.XXXX.",
    "..XXX.XXX..",
    "..XXXXXXX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XX...XX..",
    "..XXX.XXX..",
    "..XXX.XXX..",
    "...XXXXX...",
    "...XX.XX...",
    "....X.X....",
  ],
  mainColor: "cyan",
  paddleWidth: 75,
}

const level2 = {
  layout: [
    "..XXXXXXX..",
    ".XX.....XX.",
    ".XXXX.XXXX.",
    "..XXX.XXX..",
    "..XXXXXXX..",
    "XXXX...XXXX",
    "..XX...XX..",
    "..XXXXXXX..",
    "..XX...XX..",
    "XXXX...XXXX",
    "..XX...XX..",
    "..XX...XX..",
    "..XXX.XXX..",
    "XXXXX.XXXXX",
    "....XXX....",
    "...XX.XX...",
    "....X.X....",
  ],
  mainColor: "red",
  paddleWidth: 70,
}

const levels = [level0, level1, level2]

function getLevel(n) {
  if (n < levels.length) {
    return levels[n]
  }
  else {
    return levels[levels.length - 1]
  }
}

export default class Levels {
  constructor(game, x0 = 70, y0 = 50, brickW = 60, brickH = 20) {
    this.game = game
    this.x0 = x0
    this.y0 = y0
    this.brickW = brickW
    this.brickH = brickH
  }

  buildLevel(n, sepFactor = 1.1) {
    let bricks = []
    let level = getLevel(n)
    this.game.paddle.size.w = level.paddleWidth
    let y = this.y0
    for (const s of level.layout) {
      let x = this.x0
      for (const c of s) {
        if (c != ".") {
          bricks.push(new Brick(this.game, x, y, this.brickW, this.brickH, level.mainColor))
        }
        x += this.brickW * sepFactor
      }
      y += this.brickH * sepFactor
    }
    return bricks
  }

}