
import BreakoutGame from './breakout_game.js'
import InputHandler from "./input_handler.js"

window.onload = function () {
  start()
}

// constants
const CANVAS_W = 800
const CANVAS_H = 600

// Game estate
let game

// HTML related
let ctx
let sounds

function openSound(name) {
  let fileName = "sounds/" + name + ".wav"
  return new Audio(fileName)
}

function start() {
  console.log("Starting..")
  game = new BreakoutGame(CANVAS_W, CANVAS_H)
  let canvas = document.getElementById("gameCanvas")
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  sounds = {
    wall: openSound("wall"),
    paddle: openSound("paddle"),
    brick: openSound("brick"),
    newLevel: openSound("newLevel"),
    lostLife: openSound("lostLife"),
    gameOver: openSound("gameOver"),
  }
  ctx = canvas.getContext("2d")
  new InputHandler(game)
  game.reset()
  gameLoop(0)
}

let oldTimeStamp = 0
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - oldTimeStamp
  oldTimeStamp = timeStamp

  game.update(deltaTime)
  game.play(sounds)
  game.draw(ctx)

  requestAnimationFrame(gameLoop)
}
