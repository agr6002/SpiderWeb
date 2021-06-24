import { view } from './app.js';
const DOT_RADIUS = 10;
const DOT_COLOR = 'red';
const STACK_AMOUNT = 5;
export class Vertex {
  constructor(posX, posY, stack) {
    this.pos = {
      x : posX,
      y : posY
    };
    this.children = [];
    if (stack < STACK_AMOUNT && stack > 0) {
      this.addChild(this.pos.x, this.pos.y + this.pn()[1], stack + 1);
      this.addChild(this.pos.x + this.pn()[0],this.pos.y, stack + 1);
    }
  }

  addChild(posX, posY, stack) {
    this.children.push(new Vertex(posX, posY, stack));
  }

  draw() {
    this.drawDot(this.pos.x, this.pos.y);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw()
    }
  }

  drawDot(posX, posY) {
    view.con.fillStyle = DOT_COLOR;
    view.con.translate(posX * view.ppu, posY * view.ppu);
    view.con.beginPath();
    view.con.arc(0, 0, DOT_RADIUS, 0, 2 * Math.PI);
    view.con.fill();
    view.con.translate(-posX * view.ppu, -posY * view.ppu);
  }

  consoleLogChildren() {
    console.log(this.pos.x, this.pos.y);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].consoleLogChildren()
    }
  }

  pn() {
    let xpn = 0;
    let ypn = 0; 
    if (this.pos.x < 0 ){
      xpn = -1;
    }else if (this.pos.x > 0) {
      xpn = 1;
    } 
    if (this.pos.y < 0 ){
      ypn = -1;
    }else if (this.pos.y > 0) {
      ypn = 1;
    }
    if (ypn === 0) {
      ypn = -xpn;
    }
    if (xpn == 0) {
      xpn = ypn;
    }
    const np = [xpn, ypn]
    return np
  }
}