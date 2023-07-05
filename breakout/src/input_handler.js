export default class InputHandler {
  constructor(game) {
    document.addEventListener('keydown', (evt) => {
      if (evt.code == "KeyA" || evt.code == "ArrowLeft") {
        game.paddle.speed.x = -game.paddle.SPEED
      }
      else if (evt.code == "KeyD" || evt.code == "ArrowRight") {
        game.paddle.speed.x = game.paddle.SPEED
      }
      else if (evt.code == "Escape") {
        game.togglePause()
      }
      else if (evt.code == "Space") {
        game.run()
      }
    })

    document.addEventListener('keyup', (evt) => {
      if (evt.code == "KeyA" || evt.code == "ArrowLeft") {
        if (game.paddle.speed.x < 0)
          game.paddle.speed.x = 0
      }
      else if (evt.code == "KeyD" || evt.code == "ArrowRight") {
        if (game.paddle.speed.x > 0)
          game.paddle.speed.x = 0
      }
    })
  }
}