
const createParticle = (element, {
    count = 10,
    color = 'white',
    radius = [2, 6],
    distance = 100,
    line = false,
    speed = 2,
    bounce = true,
    resize = true,
} = {}) => {
    const dom = document.querySelector(element)
    if (!dom) return
    
    const [ min, max ] = radius
    const randomRadius = () => Math.random() * (max - min) + min
    // 创建canvas
    const createCanvas = (width, height) => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        return canvas
    }
    let width = dom.clientWidth
    let height = dom.clientHeight

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d')

    dom.appendChild(canvas)

    const onresize = () => {
        width = dom.clientWidth
        height = dom.clientHeight
        canvas.width = width * devicePixelRatio
        canvas.height = height * devicePixelRatio
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    if (resize) {
        window.onresize = onresize
    }
    
    // 创建随机点
    const createPoint = () => {
        const x = Math.random() * (width - (max * 2)) + max
        const y = Math.random() * (height - (max * 2)) + max
        const r = randomRadius()
        const moveX = speed * (Math.random() * 2 - 1)
        const moveY = speed * (Math.random() * 2 - 1)
        return { x, y, r, moveX, moveY }
    }
    // 创建多个随机点
    const createPoints = () => {
        const points = []
        for (let i = 0; i < count; i++) {
            const point = createPoint()
            points.push(point)
        }
        return points
    }

    const points = createPoints()

    // 计算两点之间的距离
    const disPoint = (x1, y1, x2, y2) => {
        const disX = Math.abs(x1 - x2)
        const disY = Math.abs(y1 - y2)
        return Math.sqrt(disX ** 2 + disY ** 2)
    }

    // 绘制点
    const drawPoints = () => {
        points.forEach(({ x, y, r }) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI*2, false);
            ctx.fillStyle = color;
            ctx.fill();
        })
    }

    // 绘制连线
    const drawLines = () => {
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i === j) continue
                const dis = disPoint(points[i].x, points[i].y, points[j].x, points[j].y)
                if (dis <= distance) {
                    ctx.beginPath()
                    ctx.strokeStyle = color
                    ctx.lineWidth = 1 - dis / distance;
                    ctx.moveTo(points[i].x, points[i].y)
                    ctx.lineTo(points[j].x, points[j].y)
                    ctx.stroke()
                }
            }
        }
    }

    // 判断是否越界
    const isOutsideCanvas = (axis, r, width) => axis - r < 0 || axis + r > width

    // 移动点
    const movedPoints = () => {
        points.forEach((item, index) => {
            points[index].x = item.x + item.moveX
            points[index].y = item.y + item.moveY
            const isXOutsideCanvas = isOutsideCanvas(item.x, item.r, width)
            const isYOutsideCanvas = isOutsideCanvas(item.y, item.r, height)
            // 越界反弹
            if (bounce) {
                if (isXOutsideCanvas) {
                    points[index].moveX = item.moveX * -1
                }
                if (isYOutsideCanvas) {
                    points[index].moveY = item.moveY * -1
                }
            } else {
                if (isXOutsideCanvas) {
                    points[index] = createPoint()
                }
                if (isYOutsideCanvas) {
                    points[index] = createPoint()
                }
            }
        })
    }
    const draw = () => {
        ctx.clearRect(0, 0, width, height)
        drawPoints()
        if (line) {
            drawLines()
        }
        movedPoints()
        requestAnimationFrame(draw)
    }
    draw()
}

export default createParticle