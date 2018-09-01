
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = document.getElementById('penWidth').value
var fillStyle = document.getElementById('color').value
var canvasData

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
    context.clearRect(0, 0, yyy.width + 5, yyy.height + 5)
}
download.onclick = function(){
    var url = yyy.toDataURL('image/pngy')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'myPic'
    a.target = '_blank'
    a.click()
}
color.onchange = function(){
    context.fillStyle = this.value
    context.strokeStyle = this.value
}
penWidth.onchange = function(){
    console.log(this.value)
    lineWidth = this.value
    document.getElementById('widthValue').innerText = this.value
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
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
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
    context.lineCap = 'round'
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
        // 触屏
        canvas.ontouchstart = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, lineWidth + 5, lineWidth + 5)
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
                context.clearRect(x - 5, y - 5, lineWidth + 5, lineWidth + 5)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x,y,lineWidth)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function() {
            using = false
        }
    } else {
        // 非触屏
        canvas.onmousedown = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, lineWidth, lineWidth)
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
                context.clearRect(x - 5, y - 5, lineWidth, lineWidth)

            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x,y,lineWidth)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function() {
            using = false
        }
    }
}