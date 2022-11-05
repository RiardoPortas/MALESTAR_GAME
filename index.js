const platformImage = new Image()
platformImage.src = './images/Platform_C.png'
const backgoundImage = new Image()
backgoundImage.src = './images/background_1.png'
const montanhaImage = new Image()
montanhaImage.src = './images/Montanha.png'
const winImage = new Image()
winImage.src = './images/Win.png'

const spriteRunLeftImage = new Image()
spriteRunLeftImage.src = './images/spriteRunLeft_2.png'

const spriteRunRightImage = new Image()
spriteRunRightImage.src = './images/spriteRunRight_2.png'

const spriteStandLeftImage = new Image()
spriteStandLeftImage.src = './images/spriteStandLeft_2.png'

const spriteStandRightImage = new Image()
spriteStandRightImage.src = './images/spriteStandRight_2.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 66
        this.height = 150

        this.image = spriteStandRightImage
        this.frames = 0
        this.sprites = {
            stand: {
                right: spriteStandRightImage,
                left: spriteStandLeftImage,
                cropWidth: 177,
                width: 66
            } , 
            run: {
                right: spriteRunRightImage,
                left: spriteRunLeftImage,
                cropWidth: 341,
                width: 127.875,
                height: 160
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
    }
  
  update() {
    this.frames++
    if (this.frames > 0 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) this.frames = 0 
    else if (this.frames > 28 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) this.frames = 0 
   
    this.draw()  
     this.position.x += this.velocity.x
     this.position.y += this.velocity.y

     if (this.position.y + this.height + this.velocity.y <= canvas.height)
     this.velocity.y += gravity
    }
} 

class Platform {
    constructor({ x, y, platformImage}) {
        this.position = {
        x,
        y
    }

    this.image = platformImage
    this.width = platformImage.width
    this.height = platformImage.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Win {
    constructor({ x, y, winImage}) {
        this.position = {
        x,
        y
    }
    this.image = winImage
    this.width = winImage.width
    this.height = winImage.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Background {
    constructor({ x, y, backgoundImage}) {
        this.position = {
        x,
        y
    }
    this.image = backgoundImage
    this.width = backgoundImage.width
    this.height = backgoundImage.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Montanha {
    constructor({ x, y, montanhaImage}) {
        this.position = {
        x,
        y
    }
    this.image = montanhaImage
    this.width = montanhaImage.width
    this.height = montanhaImage.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let player = new Player()
let platforms = []
let background = []
let montanha = []
let win = []


let lastKey
const keys = {
   right: {
     pressed: false  
   },
   left: {
     pressed: false
   }
}

let scrollOffset = 0

function init() {

player = new Player()
platforms = 
[new Platform({
    x:-100, 
    y:470,
    platformImage
  }), 
new Platform({ x: platformImage.width += 10, y:520, platformImage}),
new Platform({ x: platformImage.width * 2 + 100, y:470, platformImage}),
new Platform({ x: platformImage.width * 3 + 500, y:470, platformImage}),
new Platform({ x: platformImage.width * 5 + 500, y:470, platformImage})
]

background = [
    new Background({
        x:-200, 
        y: 0,
        backgoundImage
      }), 
]

montanha = [
    new Montanha({
        x:0, 
        y:0,
        montanhaImage
      }) ]

win = [
    new Win({ x: winImage.width + 1900, y:170, winImage })
      ]

const keys = {
   right: {
     pressed: false  
   },
   left: {
     pressed: false
   }
}

scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.forEach(background => {
        background.draw()
    })

    montanha.forEach(montanha => {
        montanha.draw()
    })

    win.forEach(win => {
        win.draw()
    })
    player.update()
    platforms.forEach(platform => {
    platform.draw()
    })

    if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5 
    } else if (
       (keys.left.pressed && player.position.x > 100) 
    || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) { 
    player.velocity.x = -player.speed
    } else { 
      player.velocity.x = 0

      if (keys.right.pressed) {
        scrollOffset += player.speed
        
        platforms.forEach((platform) => {
            platform.position.x -= player.speed
        })
        background.forEach(background => {
            background.position.x -= player.speed * 0.66
        })
        montanha.forEach(montanha=> {
            montanha.position.x -= player.speed * 0.66
        })
        win.forEach(win=> {
            win.position.x -= player.speed * 0.66
        })
    } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5

      platforms.forEach((platform) => {
        platform.position.x += player.speed })

        background.forEach(background => {
            background.position.x += player.speed * 0.66
      })

      montanha.forEach(montanha=> {
        montanha.position.x += player.speed * 0.66
    })

      win.forEach(win=> {
        win.position.x += player.speed * 0.66})
    }
    }

console.log(scrollOffset)

// Detecção de colisão da plataforma
    platforms.forEach((platform) => {
    if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= 
        platform.position.y &&
        player.position.x + player.width >= platform.position.x && 
        player.position.x <= platform.position.x + platform.width
    ) {
    player.velocity.y = 0
    } 
  })

// sprite switching conditional
  if (
    keys.right.pressed &&
    lastKey === 'right' &&
    player.currentSprite !== player.sprites.run.right
    ) {
    player.frames = 1  
    player.currentSprite = player.sprites.run.right
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
    } else if (
    keys.left.pressed && 
    lastKey === 'left' &&
    player.currentSprite !== player.sprites.run.left
    ) {
    player.frames = 0
    player.currentSprite = player.sprites.run.left
    player.currentCropWidth = player.sprites.run.cropWidth
    player.width = player.sprites.run.width
    } else if (
        !keys.left.pressed && 
        lastKey === 'left' &&
        player.currentSprite !== player.sprites.stand.left
        ) {
        player.frames = 0
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
        } else if (
            !keys.right.pressed && 
            lastKey === 'right' &&
            player.currentSprite !== player.sprites.stand.right
            ) {
            player.frames = 0
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            }


  // Condição de Vitória
    if (scrollOffset > 3500) {
        init()
    }
     
        console.log ('you win')
    
  // Condição de derrota
    if (player.position.y > canvas.height) {
        init()
    }
}

init()
animate()

document.addEventListener('keydown', (keycode) => {
    console.log(event.key)
    switch (event.key){
        case 'a':
            console.log('left')
            keys.left.pressed = true
            lastKey = 'left'
            break

        case 's':
            console.log('down')
            break

        case 'd':
            console.log('right')
            keys.right.pressed = true
            lastKey = 'right'
            break

        case 'w':
            console.log('up')
            player.velocity.y -= 15
            break
    }

    console.log(keys.right.pressed)
})

document.addEventListener('keyup', (keycode) => {
    console.log(event.key)
    switch (event.key){
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break

        case 's':
            console.log('down')
            break

        case 'd':
            console.log('right')
            keys.right.pressed = false
            
            break

        case 'w':
            console.log('up')
            break
    }
})

const Prototipo = document.getElementById('Prototipo')
console.log('1. ', Prototipo)

Prototipo.innerHTML = "Ironhack teste de protótipo"


// teste de commit
