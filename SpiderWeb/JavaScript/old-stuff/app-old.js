import { Vertex } from './vertex.js';
export const view = {
  can: undefined,
  con: undefined,
  ppu: 100
};
const spider = {
  img: undefined,
  pos: {
    x: -3,
    y: 2
  },
  dim: {
    x: 100,
    y: 100
  }
}
const head = new Vertex(0, 0, 0);
head.addChild(-1, 0, 1);
head.addChild(1, 0, 1);
head.addChild(0, -1, 1);
head.addChild(0, 1, 1);
head.consoleLogChildren()

can.addEventListener("click", handleClick);
window.onload = init;

function init() {
  view.can = document.getElementById('can');
  view.con = view.can.getContext('2d');
  spider.img = document.getElementById("spider");
  window.onresize = resize;
  resize();
}

function resize() {
  view.can.width = window.innerWidth;
  view.can.height = window.innerHeight;
  draw();
}

function draw() {
  view.con.translate(view.can.width / 2, view.can.height / 2);
  head.draw();
  view.con.translate(spider.pos.x * view.ppu, spider.pos.y * view.ppu);
  view.con.drawImage(spider.img, spider.pos.x - spider.dim.x / 2, spider.pos.y - spider.dim.y / 2, spider.dim.x, spider.dim.y);
  view.con.translate(-spider.pos.x * view.ppu, -spider.pos.y * view.ppu);
  view.con.translate(-view.can.width / 2, -view.can.height / 2);
}

function handleClick(e) {
  console.log(e.x, e.y);
  let ex = e.x
  let ey = e.y
  console.log(ex, ey);
}