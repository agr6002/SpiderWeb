import { view } from './app.js';
const DOT_RADIUS = 10;
const CHILD_DISTANCE = 0.5;

export class Vertex {

  constructor(parent, posX, posY, color, data) {
    this.color = color;
    this.data = data;
    this.pos = {
      x : posX,
      y : posY
    };
    this.children = [];
    this.parent = parent;
    if (this.parent === null) {
      this.layers = 0;
    } else {
      this.layers = this.parent.layers + 1;
    }
  }

  addChild(color, data) {
    if (!this.parent) {
      if (!this.children.length) {
        this.children.push(new Vertex(this, this.pos.x + 1, this.pos.y, color, data));
      } else {
        const sepAngle = 2 * Math.PI / (this.children.length + 1);
        for (let i = 0; i < this.children.length; ++i) {
          const x = this.pos.x + CHILD_DISTANCE * Math.cos(i * sepAngle);
          const y = this.pos.y + CHILD_DISTANCE * Math.sin(i * sepAngle);
          this.children[i].pos.x = x;
          this.children[i].pos.y = y;
        }
        const x = this.pos.x + CHILD_DISTANCE * Math.cos(this.children.length * sepAngle);
        const y = this.pos.y + CHILD_DISTANCE * Math.sin(this.children.length * sepAngle);
        this.children.push(new Vertex(this, x, y, color, data));
      }
    } else {
      if (!this.children.length) {
        const baseAngle = Math.atan2(this.parent.pos.y - this.pos.y, this.parent.pos.x - this.pos.x);
        this.children.push(new Vertex(
          this, 
          this.pos.x - CHILD_DISTANCE * Math.cos(baseAngle),
          this.pos.y - CHILD_DISTANCE * Math.sin(baseAngle),
          color,
          data
        ));
      } else {
        let pos = this.changePos(CHILD_DISTANCE);
        this.children.push(new Vertex(this, pos[0], pos[1], color, data));
        let distance = 0;
        let Xspaced =  this.subtract(this.children[0].pos.x, this.children[1].pos.x, 0.2);
        let Yspaced = this.subtract(this.children[0].pos.y, this.children[1].pos.y, 0.2);
        while (Xspaced && Yspaced) {
          distance += 0.1; 
          this.changePos(distance);
          Xspaced = this.subtract(this.children[0].pos.x, this.children[1].pos.x, 0.2);
          Yspaced = this.subtract(this.children[0].pos.y, this.children[1].pos.y, 0.2);
        }
      }
    }
  }

  changePos(distance) {
    const baseAngle = Math.atan2(this.parent.pos.y - this.pos.y, this.parent.pos.x - this.pos.x);
    let totalParent = this.parent;
    let totalChildren = totalParent.children.length;
    for (let i = 0; i < (this.layers - 1); i++) {
      totalParent = totalParent.parent;
      totalChildren += totalParent.children.length;
    }
    const allowedAngle = Math.PI * 2 / totalChildren;
    const minAngle = -allowedAngle / 2;
    const maxAngle = allowedAngle / 2;
    const sepAngle = allowedAngle / this.children.length;
    for (let i = 0; i < this.children.length; ++i) {
      const x = this.pos.x - distance * Math.cos(baseAngle + minAngle + i * sepAngle);
      const y = this.pos.y - distance * Math.sin(baseAngle + minAngle + i * sepAngle);
      this.children[i].pos.x = x;
      this.children[i].pos.y = y;
    }
    const x = this.pos.x - CHILD_DISTANCE * Math.cos(baseAngle + maxAngle);
    const y = this.pos.y - CHILD_DISTANCE * Math.sin(baseAngle + maxAngle);
    return [x, y]
  }

  draw() {
    for (let i = 0; i < this.children.length; i++) {
      this.drawLine(this.children[i].pos.x, this.children[i].pos.y);
      this.children[i].draw();
    }
    this.drawDot(this.pos.x, this.pos.y);
  }

  search(type, data, n) {
    view.con.translate(this.pos.x * view.ppu, this.pos.y * view.ppu);
    view.con.fillStyle = 'black';
    view.con.fillText(n, 5, 6);
    view.con.translate(-this.pos.x * view.ppu, -this.pos.y * view.ppu);
    if (this.data === data && this.data !== undefined) {
      console.log('data' + data.toString());
      view.con.translate(this.pos.x * view.ppu, this.pos.y * view.ppu);
      view.con.fillStyle = 'black';
      view.con.font = "20px Arial";
      view.con.fillText(data, -data.toString().length * 5, 6);
      view.con.translate(-this.pos.x * view.ppu, -this.pos.y * view.ppu);
    } else {
      if (type === 'breath') {
        //breathSearch(data, n);
      } else if(type === 'depth') {
        this.depthSearch(data, n);
      } else {
        console.log('error');
      }
    }
  }
  // breathSearch(data, n) {
  //   if (this.data === data && this.data !== undefined) {
  //     view.con.translate(this.pos.x * view.ppu, this.pos.y * view.ppu);
  //     view.con.fillStyle = 'black';
  //     view.con.font = "20px Arial";
  //     view.con.fillText(data, -data.toString().length * 5, 6);
  //     view.con.translate(-this.pos.x * view.ppu, -this.pos.y * view.ppu);
  //   } else {
  //     if (this.parent !== null && parseInt(n) !== this.parent.children.length) {
  //       this.parent.children[parseInt(n) + 1].breathSearch((parseInt(n) + 1).toString(), data);
  //     } else {
  //       this.children[0].breathSearch(1, data);
  //     }
  //   }
  //   view.con.translate(this.pos.x * view.ppu, this.pos.y * view.ppu);
  //   view.con.fillText(n, -n.length * 5, 6);
  //   view.con.translate(-this.pos.x * view.ppu, -this.pos.y * view.ppu);
  // }

  depthSearch(data, n) {
    console.log('depth');
    if (this.children.length > 0) {
      console.log('children');
      this.children[0].search('depth', data, n + '0');
    } else {
      console.log('else');
      if (this.parent.children.length - 1 > n.charAt(n.length - 1)) {
        let ln = parseInt(n.charAt(n.length - 1)) + 1;
        this.parent.children[ln].search('depth', data, n.substring(0, n.length - 1) + ln.toString() );
      } else {
        let ln = parseInt(n.charAt(n.length - 1)) + 1;
        this.parent.parent.children[ln].search('depth', data, n.substring(0, n.length - 1) + ln.toString() );
      }
    }
  }
  
  getChild(n) {
    return (n < this.children.length ? this.children[n] : null);
  }

  drawDot(posX, posY) {
    view.con.fillStyle = this.color;
    view.con.translate(posX * view.ppu, posY * view.ppu);
    view.con.beginPath();
    view.con.arc(0, 0, DOT_RADIUS, 0, 2 * Math.PI);
    view.con.fill();
    view.con.translate(-posX * view.ppu, -posY * view.ppu);
  }

  drawLine(posX, posY) {
    view.con.translate(this.pos.x * view.ppu, this.pos.y * view.ppu);
    view.con.beginPath(); 
    view.con.moveTo(this.pos.x, this.pos.y);
    view.con.translate(-this.pos.x * view.ppu, -this.pos.y * view.ppu);
    view.con.translate(posX * view.ppu, posY * view.ppu);
    view.con.lineTo(posX, posY);
    view.con.stroke();   
    view.con.translate(-posX * view.ppu, -posY * view.ppu);
  }

  subtract(num1, num2, dif) {
    if (num1 < 0) {
      num1 *= -1
    }
    if (num2 < 0) {
      num2 *= -1
    }
    if (num1 > num2) {
      if (num1 - num2 < dif) {
        return true
      } else {
        return false
      }
    } else {
      if (num2 - num1 < dif) {
        return true
      } else {
        return false
      }
    }
  }
}