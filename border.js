const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
canvas.id = "canvasBorder";
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "999";
canvas.style.display = "block";
canvas.style.pointerEvents = "none";
canvasUpdate();


//

    // console.log("test")
    // setTimeout(function() {
        // if (window.innerHeight != lastHeight) {
            // lastH = window.innerHeight;
            // console.log("test");
            // canvasClear();
            // canvasInit();
        // }
    // }, 100);
// })

// let lastH = window.visualViewport ?
    // window.visualViewport.height :
    // window.innerHeight;
// let lastW = Math.min(document.documentElement.clientWidth, window.innerWidth);

window.addEventListener("resize", function() {
    // setTimeout(function() {
        // const newH = window.visualViewport ?
              // window.visualViewport.height :
              // window.innerHeight;
        // console.log(lastH);
        // console.log(newH);
        // if (newH != lastH) {
            // lastH = newH;
    2canvasUpdate();
    // }, 100)
})


//


function canvasUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const viewportH = window.visualViewport ?
          window.visualViewport.height :
          window.innerHeight;
    const viewportW = Math.min(document.documentElement.clientWidth, window.innerWidth);

    canvas.style.height = viewportH;
    canvas.style.width = viewportW;

    canvas.height = Math.floor(viewportH * 1);
    canvas.width = Math.floor(viewportW * 1);

    makeBorderGrad();
    makeBorderStroke();
    // reportWindowInformation();
}

function convertEmToPx(em) {
    const fontSize = parseFloat( window.getComputedStyle(document.body).fontSize );
    return em * fontSize;
}

function convertPxToEm(px) {
    const fontSize = parseFloat( window.getComputedStyle(document.body).fontSize );
    return px / fontSize;
}

function makeBorderGrad() {
    // init
    const w = canvas.width;
    const h = canvas.height;
    const borderW = 50;

    // top
    let grad = ctx.createLinearGradient(0, 0, 0, borderW);
    grad.addColorStop(0, "rgba(0, 0, 0, 1)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, borderW);

    // bottom
    grad = ctx.createLinearGradient(0, h - borderW, 0, h);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, h - borderW, w, borderW);

    // left
    grad = ctx.createLinearGradient(0, 0, borderW, 0);
    grad.addColorStop(0, "rgba(0, 0, 0, 1)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, borderW, h);

    // right
    grad = ctx.createLinearGradient(w - borderW, 0, w, 0);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = grad;
    ctx.fillRect(w - borderW, 0, borderW, h);
}

function makeBorderStroke() {

    // init
    ctx.strokeStyle = "white";
    ctx.lineWidth = convertEmToPx(0.05);

    // parameters
    const margin = convertEmToPx(1);
    const inset = convertEmToPx(5);
    
    const borderW = (canvas.width - (margin * 2) - inset);
    const borderH = (canvas.height - (margin * 2) - inset);
    
    const strokeCtX = Math.floor(borderW / 40);
    const strokeCtY = Math.floor(borderH / 40);
    const strokeLenX = borderW / ((strokeCtX + 1) / 2);
    const strokeLenY = borderH / ((strokeCtY + 1) / 2);
    const strokeW = convertEmToPx(0.5);

    // test

    // const grad = ctx.createLinearGradient(60, 10, 20, 10);
    // grad.addColorStop(0, "white");
    // grad.addColorStop(1, "black");
    // ctx.strokeStyle = grad;
    // ctx.lineWidth = 5;
    // ctx.beginPath();
    // ctx.moveTo(300, 300);
    // ctx.lineTo(400, 800);
    // ctx.stroke();
    // return;

    // draw top
    let x = margin + inset / 2;
    let y = margin;
    ctx.beginPath();
    for (let i = 0; i < strokeCtX; i++) {

        ctx.moveTo(x, y);
        x += strokeLenX * 0.4
        
        ctx.lineTo(x, y);
        x += strokeLenX * 0.2;
        y += strokeW;
        
        ctx.lineTo(x, y);
        x += strokeLenX * 0.4;
        
        ctx.lineTo(x, y);
        
        x -= strokeLenX * 0.5;
        y -= strokeW;
    }
    ctx.stroke();

    // draw bottom
    x = canvas.width - margin - inset / 2;
    y = canvas.height - margin;
    ctx.beginPath();
    for (let i = 0; i < strokeCtX; i++) {

        ctx.moveTo(x, y);
        x -= strokeLenX * 0.4;

        ctx.lineTo(x, y);
        x -= strokeLenX * 0.2;
        y -= strokeW;

        ctx.lineTo(x, y);
        x -= strokeLenX * 0.4;

        ctx.lineTo(x, y);

        x += strokeLenX * 0.5;
        y += strokeW;
    }
    ctx.stroke();

    // draw left
    x = margin;
    y = canvas.height - margin - inset / 2;
    ctx.beginPath();
    for (let i = 0; i < strokeCtY; i++) {

        ctx.moveTo(x, y);
        y -= strokeLenY * 0.4;

        ctx.lineTo(x, y);
        x += strokeW;
        y -= strokeLenY * 0.2;

        ctx.lineTo(x, y);
        y -= strokeLenY * 0.4;

        ctx.lineTo(x, y);

        x -= strokeW;
        y += strokeLenY * 0.5;
    }
    ctx.stroke()

    // draw right
    x = canvas.width - margin;
    y = margin + inset / 2;
    ctx.beginPath();
    for (let i = 0; i < strokeCtY; i++) {

        ctx.moveTo(x, y);
        y += strokeLenY * 0.4;

        ctx.lineTo(x, y);
        x -= strokeW;
        y += strokeLenY * 0.2;

        ctx.lineTo(x, y);
        y += strokeLenY * 0.4;

        ctx.lineTo(x, y);

        x += strokeW;
        y -= strokeLenY * 0.5;
    }
    ctx.stroke();

}

function reportWindowInformation() {
    console.log("window.innerHeight", window.innerHeight);
    console.log("window.innerWidth", window.innerWidth);
    console.log("document.documentElement.clientHeight", document.documentElement.clientHeight);
    console.log("document.documentElement.clientWidth", document.documentElement.clientWidth);
    console.log("window.devicePixelRatio", window.devicePixelRatio);
    console.log("em size", convertEmToPx(1));

    console.log("canvas.height", canvas.height);
    console.log("canvas.width", canvas.width);
    // console.log("canvas.offsetHeight", canvas.offsetHeight);
    // console.log("canvas.offsetWidth", canvas.offsetWidth);
}

