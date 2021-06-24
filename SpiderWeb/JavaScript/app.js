import { Vertex } from './vertex.js';
export const view = {
  can: undefined,
  con: undefined,
  ppu: 100
};
// const spider = {
//   img: undefined,
//   pos: {
//     x: -3,
//     y: 2
//   },
//   dim: {
//     x: 100,
//     y: 100
//   }
// }
const head = new Vertex(null, 0, 0, "chocolate");
head.addChild('red', 12);
head.addChild('red', "after");
head.addChild('red');
head.addChild('red');
head.addChild('red');
head.addChild('red');
head.addChild('red');
head.addChild('red');
head.getChild(0).addChild('green');
head.getChild(0).addChild('green');
head.getChild(0).addChild('green');
head.getChild(0).addChild('green');
head.getChild(0).addChild('green');
head.getChild(1).addChild('blue');
head.getChild(1).addChild('blue');
head.getChild(5).addChild('orange');
head.getChild(5).addChild('orange');
head.getChild(5).addChild('orange');
head.getChild(5).addChild('orange');
head.getChild(6).addChild('purple');
head.getChild(6).addChild('purple');
head.getChild(6).addChild('purple');
head.getChild(3).addChild('yellow');
head.getChild(3).addChild('yellow');
head.getChild(3).addChild('yellow');
head.getChild(0).getChild(0).addChild('green');
head.getChild(0).getChild(0).addChild('green');
head.getChild(0).getChild(0).addChild('green');
head.getChild(0).getChild(0).addChild('green');
head.getChild(0).getChild(0).addChild('green');
head.getChild(1).getChild(0).addChild('blue');
head.getChild(1).getChild(0).addChild('blue');
head.getChild(5).getChild(0).addChild('orange');
head.getChild(5).getChild(0).addChild('orange');
head.getChild(5).getChild(0).addChild('orange');
head.getChild(5).getChild(0).addChild('orange');
head.getChild(6).getChild(0).addChild('purple');
head.getChild(6).getChild(0).addChild('purple');
head.getChild(6).getChild(0).addChild('purple');
head.getChild(3).getChild(0).addChild('yellow');
head.getChild(3).getChild(0).addChild('yellow');
head.getChild(3).getChild(0).addChild('yellow');

//can.addEventListener("search", search);
window.onload = init;

function init() {
  view.can = document.getElementById('can');
  view.con = view.can.getContext('2d');
  // spider.img = document.getElementById("spider");
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
  head.search('depth', 'after', '0');
  //view.con.translate(spider.pos.x * view.ppu, spider.pos.y * view.ppu);
  //view.con.drawImage(spider.img, spider.pos.x - spider.dim.x / 2, spider.pos.y - spider.dim.y / 2, spider.dim.x, spider.dim.y);
  //view.con.translate(-spider.pos.x * view.ppu, -spider.pos.y * view.ppu);
  view.con.translate(-view.can.width / 2, -view.can.height / 2);
}

function search() {
  console.log('search');
}
// function handleClick(e) {
//   console.log(e.x, e.y);
//   let ex = e.x
//   let ey = e.y
//   console.log(ex, ey);
// }

