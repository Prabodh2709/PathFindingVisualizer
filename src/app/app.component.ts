import {
  Component
} from '@angular/core';
import Swal from 'sweetalert2';
declare const BFSSearch: any;
declare const DFSSearch: any;
declare const DijsktrasSearch: any;
declare const Astar: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pathFinding';
  arr = []
  start = ""
  finish = ""
  wall = [];
  weight = [];
  startButton = false;
  finishButton = false;
  wallButton = false;
  weightButton = false;
  mousedown = false;
  row = 0;
  col = 0;
  speed = 0;
  calculateRowsAndColumns() {
    // Get the dimensions of the screen or container
    const screenWidth = window.innerWidth; // Or specify the width of the container
    const screenHeight = window.innerHeight; // Or specify the height of the container
    
    // Get the dimensions of each square box
    const boxWidth = 25; // Example width of each square box in pixels
    const boxHeight = 25; // Example height of each square box in pixels
    
    // Calculate the number of rows and columns
    const numColumns = Math.floor(screenWidth / boxWidth);
    const numRows = Math.floor(screenHeight / boxHeight);
    
  return [ numRows, numColumns ];
}
  ngOnInit() {
    [this.row, this.col] = this.calculateRowsAndColumns();
    this.speed = 30;
    this.render()
    Swal.fire({
      title: "We can't pass through wall.\nWe require more time through water(It costs us 15 points).\nWe can go up,right,down,left only.\nDFS and BFS are unweighted path finding Algo. i.e Water doesn't matter to this Algo.\nEnjoy Searching😃",
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
    
  }

  render() {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        this.arr.push("i=" + i.toString() + "j=" + j.toString())
      }
    }
  }

  clear() {
    this.start = ""
    this.finish = ""
    this.wall = [];
    this.weight = [];
    this.startButton = false;
    this.finishButton = false;
    this.wallButton = false;
    this.weightButton
    this.mousedown = false;
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        document.getElementById("i=" + i.toString() + "j=" + j.toString()).style.backgroundColor = "white"
      }
    }
  }
  selectstart() {
    this.startButton = true
    this.finishButton = false
    this.wallButton = false
    this.weightButton = false
  }
  selectfinish() {
    this.finishButton = true
    this.startButton = false
    this.wallButton = false
    this.weightButton = false
  }
  selectwall() {
    this.wallButton = true
    this.finishButton = false
    this.startButton = false
    this.weightButton = false
  }

  selectweight() {
    this.weightButton = true
    this.finishButton = false
    this.startButton = false
    this.wallButton = false
  }

  mouseDown() {
    this.mousedown = true
  }
  mouse(obj) {
    function isEqual(finish, node) {
      for (var i = 0; i < finish.length; i++) {
        if (finish[i] != node[i]) {
          return false;
        }
      }
      return true;
    }
    if (this.mousedown && this.wallButton) {
      for (var i = 0; i < this.weight.length; i++) {
        if (isEqual(this.weight[i], [parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])) {
          this.weight.splice(i, 1)
        }
      }
      document.getElementById(obj.target.id).style.backgroundColor = "black"
      this.wall.push([parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])
    } else if (this.mousedown && this.weightButton) {
      for (var i = 0; i < this.wall.length; i++) {
        if (isEqual(this.wall[i], [parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])) {
          this.wall.splice(i, 1)
        }
        document.getElementById(obj.target.id).style.backgroundColor = "#80c5de"
        this.weight.push([parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])
      }
    }
  }
  mouseUP() {
    this.mousedown = false
  }
  toggle(obj) {
    function isEqual(finish, node) {
      for (var i = 0; i < finish.length; i++) {
        if (finish[i] != node[i]) {
          return false;
        }
      }
      return true;
    }
    if (this.startButton) {
      if (this.start != "") {
        document.getElementById(this.start).style.backgroundColor = "white"
      }
      this.start = obj.target.id;
      for (var i = 0; i < this.wall.length; i++) {
        if (isEqual(this.wall[i], [parseInt(this.start.split(/([0-9]+)/)[1]), parseInt(this.start.split(/([0-9]+)/)[3])])) {
          this.wall.splice(i, 1)
        }
      }

      document.getElementById(this.start).style.backgroundColor = "#006400"
    } else if (this.finishButton) {
      if (this.finish != "") {
        document.getElementById(this.finish).style.backgroundColor = "white"
      }
      this.finish = obj.target.id;
      for (var i = 0; i < this.wall.length; i++) {
        if (isEqual(this.wall[i], [parseInt(this.finish.split(/([0-9]+)/)[1]), parseInt(this.finish.split(/([0-9]+)/)[3])])) {
          this.wall.splice(i, 1)
        }
      }
      document.getElementById(this.finish).style.backgroundColor = "red"
    } else if (this.wallButton) {
      if (this.start != obj.target.id && this.finish != obj.target.id) {
        for (var i = 0; i < this.weight.length; i++) {
          if (isEqual(this.weight[i], [parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])) {
            this.weight.splice(i, 1)
          }
        }
        document.getElementById(obj.target.id).style.backgroundColor = "black"
        this.wall.push([parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])
      }
    } else if (this.weightButton) {
      if (this.start != obj.target.id && this.finish != obj.target.id) {
        for (var i = 0; i < this.wall.length; i++) {
          if (isEqual(this.wall[i], [parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])) {
            this.wall.splice(i, 1)
          }
        }
        document.getElementById(obj.target.id).style.backgroundColor = "#80c5de"
        this.weight.push([parseInt(obj.target.id.split(/([0-9]+)/)[1]), parseInt(obj.target.id.split(/([0-9]+)/)[3])])
      }
    }
  }

  AStar() {
    var temp = (this.start.split(/([0-9]+)/))
    var temp2 = this.finish.split(/([0-9]+)/)
    if (temp.length == 1 || temp2.length == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...\nSelect Start and End!',
        text: '',
        footer: ''
      })
      return
    }
    var start = [parseInt(temp[1]), parseInt(temp[3])]
    var finish = [parseInt(temp2[1]), parseInt(temp2[3])]
    const response = Astar(this.row, this.col, start, finish, this.wall, this.weight)
    const animations = response[0];
    const path = response[1];
    var flag = 0;
    for (var i = 1; i < animations.length + path.length - 1; i++) {
      if (i < animations.length - 1) {
        const x = animations[i][0];
        const y = animations[i][1];
        const s = "i=" + x.toString() + "j=" + y.toString();
        const el = document.getElementById(s).style;
        setTimeout(() => {
          el.backgroundColor = "#b03060";
        }, i * 20);
      } else {
        if (i - animations.length > 0) {
          flag = 1;
          const x = path[i - animations.length][0];
          const y = path[i - animations.length][1];
          const s = "i=" + x.toString() + "j=" + y.toString();
          const el = document.getElementById(s).style;
          setTimeout(() => {
            el.backgroundColor = "yellow";
          }, i * 20);
        }
      }
    }
    if (flag == 0) {
      setTimeout(() => {
        Swal.fire({
          icon: 'warning',
          title: 'No Path Found',
          text: '',
          footer: ''
        })
      }, i * 20);
    }
  }

  Dijsktra() {
    var temp = (this.start.split(/([0-9]+)/))
    var temp2 = this.finish.split(/([0-9]+)/)
    if (temp.length == 1 || temp2.length == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...\nSelect Start and End!',
        text: '',
        footer: ''
      })
      return
    }
    var start = [parseInt(temp[1]), parseInt(temp[3])]
    var finish = [parseInt(temp2[1]), parseInt(temp2[3])]
    const response = DijsktrasSearch(this.row, this.col, start, finish, this.wall, this.weight)
    const animations = response[0];
    const path = response[1];
    var flag = 0;
    for (var i = 1; i < animations.length + path.length - 1; i++) {
      if (i < animations.length - 1) {
        const x = animations[i][0];
        const y = animations[i][1];
        const s = "i=" + x.toString() + "j=" + y.toString();
        const el = document.getElementById(s).style;
        setTimeout(() => {
          el.backgroundColor = "#b03060";
        }, i * this.speed);
      } else {
        if (i - animations.length > 0) {
          flag = 1;
          const x = path[i - animations.length][0];
          const y = path[i - animations.length][1];
          const s = "i=" + x.toString() + "j=" + y.toString();
          const el = document.getElementById(s).style;
          setTimeout(() => {
            el.backgroundColor = "yellow";
          }, i * this.speed);
        }
      }
    }
    if (flag == 0) {
      setTimeout(() => {
        Swal.fire({
          icon: 'warning',
          title: 'No Path Found',
          text: '',
          footer: ''
        })
      }, i * this.speed);
    }
  }

  DFS() {
    for (var i = 0; i < this.weight.length; i++) {
      document.getElementById("i=" + this.weight[i][0].toString() + "j=" + this.weight[i][1].toString()).style.backgroundColor = "white";
    }
    this.weight = [];
    var temp = (this.start.split(/([0-9]+)/))
    var temp2 = this.finish.split(/([0-9]+)/)
    if (temp.length == 1 || temp2.length == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...\nSelect Start and End!',
        text: '',
        footer: ''
      })
      return
    }
    var start = [parseInt(temp[1]), parseInt(temp[3])]
    var finish = [parseInt(temp2[1]), parseInt(temp2[3])]
    const response = DFSSearch(this.row, this.col, start, finish, this.wall)
    const animations = response[0];
    const path = response[1];
    var flag = 0;
    for (var i = 1; i < animations.length + path.length - 1; i++) {
      if (i < animations.length - 1) {
        const x = animations[i][0];
        const y = animations[i][1];
        const s = "i=" + x.toString() + "j=" + y.toString();
        const el = document.getElementById(s).style;
        setTimeout(() => {
          el.backgroundColor = "#b03060";
        }, i * this.speed);
      } else {
        if (i - animations.length > 0) {
          flag = 1;
          const x = path[i - animations.length][0];
          const y = path[i - animations.length][1];
          const s = "i=" + x.toString() + "j=" + y.toString();
          const el = document.getElementById(s).style;
          setTimeout(() => {
            el.backgroundColor = "yellow";
          }, i * this.speed);
        }
      }
    }
    if (flag == 0) {
      setTimeout(() => {
        Swal.fire({
          icon: 'warning',
          title: 'No Path Found',
          text: '',
          footer: ''
        })
      }, i * this.speed);
    } else {
      setTimeout(() => {
        Swal.fire({
          title: "Don't laugh at me😂\nPath is absolutely correct\nDFS doesn't always give optimal path.",
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
      }, i * this.speed);
    }

  }

  BFS() {
    for (var i = 0; i < this.weight.length; i++) {
      document.getElementById("i=" + this.weight[i][0].toString() + "j=" + this.weight[i][1].toString()).style.backgroundColor = "white";
    }
    this.weight = [];
    var temp = (this.start.split(/([0-9]+)/))
    var temp2 = this.finish.split(/([0-9]+)/)
    if (temp.length == 1 || temp2.length == 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...\nSelect Start and End!',
        text: '',
        footer: ''
      })
      return
    }
    var start = [parseInt(temp[1]), parseInt(temp[3])]
    var finish = [parseInt(temp2[1]), parseInt(temp2[3])]
    const response = BFSSearch(this.row, this.col, start, finish, this.wall)
    const animations = response[0];
    const path = response[1];
    var flag = 0;
    for (var i = 1; i < animations.length + path.length - 1; i++) {
      if (i < animations.length - 1) {
        const x = animations[i][0];
        const y = animations[i][1];
        const s = "i=" + x.toString() + "j=" + y.toString();
        const el = document.getElementById(s).style;
        setTimeout(() => {
          el.backgroundColor = "#b03060";
        }, i * this.speed);
      } else {
        if (i - animations.length > 0) {
          flag = 1;
          const x = path[i - animations.length][0];
          const y = path[i - animations.length][1];
          const s = "i=" + x.toString() + "j=" + y.toString();
          const el = document.getElementById(s).style;
          setTimeout(() => {
            el.backgroundColor = "yellow";
          }, i * this.speed);
        }
      }
    }
    if (flag == 0) {
      setTimeout(() => {
        Swal.fire({
          icon: 'warning',
          title: 'No Path Found',
          text: '',
          footer: ''
        })
      }, i * this.speed);
    }
  }
}