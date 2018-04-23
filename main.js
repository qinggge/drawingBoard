
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 3
var fillStyle = black

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height)
}
download.onclick = function(){
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'myPic'
    a.target = '_blank'
    a.click()
}

black.onclick = function(){
    context.fillStyle = '#000'
    context.strokeStyle = '#000'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function(){
    context.fillStyle = '#F00'
    context.strokeStyle = '#F00'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.fillStyle = '#0F0'
    context.strokeStyle = '#0F0'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = '#00F'
    context.strokeStyle = '#00F'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

thin.onclick = function(){
    lineWidth = 3
    thin.classList.add('active')
    thick.classList.remove('active')
    thicker.classList.remove('active')
}
thick.onclick = function(){
    lineWidth = 6
    thin.classList.remove('active')
    thick.classList.add('active')
    thicker.classList.remove('active')
}
thicker.onclick = function(){
    thin.classList.remove('active')
    thick.classList.remove('active')
    thicker.classList.add('active')
    lineWidth = 9
}

/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function() {
    setCanvasSize()
    }

    // 画布满屏
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
    
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, lineWidth) {
    context.beginPath()
    context.fillStyle = fillStyle
    context.arc(x, y, lineWidth * 0.5, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {
        // 非触屏
        canvas.ontouchstart = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
      
            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x,y,lineWidth)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function() {
            using = false
        }
    } else {
        // 触屏
        canvas.onmousedown = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
      
            if (!using) {return}
      
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x,y,lineWidth)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function() {
            using = false
        }
    }
}