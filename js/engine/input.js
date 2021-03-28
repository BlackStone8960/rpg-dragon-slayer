class Input {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.enter = false;
    this.space = false;
    this.a = false;
    this.z = false;
    // this.timeCounter = 0;
    // this.repeat = false;
    // this.countLimit = 1000;
  }
  inputListener() {
    addEventListener('keydown', (event) => {
      switch(event.key) {
        case "ArrowUp" :
          this.up = true;
          break;
        case "ArrowDown" :
          this.down = true;
          break;
        case "ArrowLeft" :
          this.left = true;
          break;
        case "ArrowRight" :
          this.right = true;
          break;
        case "Enter" :
          this.enter = true;
          // console.log('entered')
          // if (!this.enter && !this.keepPushingEnter) {
          //   this.enter = true;
          //   this.timeCounter++;
          //   if ( this.timeCounter > this.countLimit ) this.keepPushingEnter = true; // prevent to keep pushing enter
          //   console.log("Enter pushed");
          // } else {
          //   this.enter = false;
          // }
          break;
        case " " :
          this.space = true;
          break;
        case "a" :
          this.a = true;
          break;
        case "z" :
          this.z = true;
          break;
      }
      // if (event.repeat) this.repeat = true; console.log("repeated");
      event.preventDefault();
    });
    addEventListener('keyup', (event) => {
      switch(event.key) {
        case "ArrowUp" :
          this.up = false;
          break;
        case "ArrowDown" :
          this.down = false;
          break;
        case "ArrowLeft" :
          this.left = false;
          break;
        case "ArrowRight" :
          this.right = false;
          break;
        case "Enter" :
          this.enter = false;
          // this.keepPushingEnter = false;
          // this.timeCounter = 0;
          break;
        case " " :
          this.space = false;
          break;
        case "a" :
          this.a = false;
          break;
        case "z" :
          this.z = false;
          break;
      }
    })
  }
}

export default Input;