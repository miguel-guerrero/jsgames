export default class GameObject {
  constructor(x, y, w, h, imgOrColor) {
    this.pos0 = {x: x, y: y}
    this.size = {w: w, h: h}
    this.imgOrColor = imgOrColor
    this.markForDel = false
    this.reset()
  }

  reset() {
    this.pos = {x: this.pos0.x, y: this.pos0.y}
    this.speed = {x: 0, y: 0}
  }

  update(deltaTime) {
    //this.pos.x += this.speed.x * 20
    //this.pos.y += this.speed.y * 20
    this.pos.x += this.speed.x * deltaTime
    this.pos.y += this.speed.y * deltaTime
  }

  draw(ctx) {
    if (typeof(this.imgOrColor) == "undefined") {
      ctx.fillStyle = "black"
      ctx.fillRect(this.left(), this.top(), this.size.w, this.h)
    } else if (typeof(this.imgOrColor) == "string") {
      ctx.fillStyle = this.imgOrColor
      ctx.fillRect(this.left(), this.top(), this.size.w, this.size.h)
    } else {
      ctx.drawImage(
        this.imgOrColor, 
        this.left(),
        this.top(),
        this.size.w, 
        this.size.h)
    }
  }

  left() {
    return this.pos.x - this.size.w/2
  }

  right() {
    return this.pos.x + this.size.w/2
  }

  top() {
    return this.pos.y - this.size.h/2 
  }

  bottom() {
    return this.pos.y + this.size.h/2
  }
}