onStart();

//
//
//
// const resizeObserver = new ResizeObserver(entries => {
    // for (let entry of entries) {
        // console.log(entry);
    // }
// })
// resizeOberver.observe(document.documentElement);
window.addEventListener("scroll", canvasClear);
window.addEventListener("scroll", canvasInit);

function onStart() {
    const canvas = document.createElement("canvas");
    canvas.id = "borderCanvas";
    document.body.appendChild(canvas);
    canvasInit()
    makeBorderGrad();
    makeBorderStroke();
    reportWindowInformation();

    window.addEventListener("resize", function() {
        canvasClear();
        canvasInit();
        makeBorderGrad();
        makeBorderStroke();
    })
}

//
//
//

function canvasClear() {
    const canvas = document.getElementById("borderCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasInit() {
    const canvas = document.getElementById("borderCanvas");

    // set size in css pixels
    const viewport_height = Math.min( document.documentElement.clientHeight, window.innerHeight );
    const viewport_width = Math.min( document.documentElement.clientWidth, window.innerWidth );
    canvas.style.height = viewport_height;
    canvas.style.width = viewport_width;

    // set actual size in memory
    const scale = window.devicePixelRatio;
    // const scale = 1;
    canvas.height = Math.floor(viewport_height);
    canvas.width = Math.floor(viewport_width);

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "999";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
}

function convertEmToPx(em) {
    const font_size = parseFloat( window.getComputedStyle(document.body).fontSize );
    return em * font_size;
}

function convertPxToEm(px) {
    const font_size = parseFloat( window.getComputedStyle(document.body).fontSize );
    return px / font_size;
}

function makeBorderGrad() {
    // init
    const canvas = document.getElementById("borderCanvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const border_width = 50;

    // top
    let gradient = ctx.createLinearGradient(0, 0, 0, border_width);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, border_width);

    // bottom
    gradient = ctx.createLinearGradient(0, height - border_width, 0, height);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, height - border_width, width, border_width);

    // left
    gradient = ctx.createLinearGradient(0, 0, border_width, 0);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, border_width, height);

    // right
    gradient = ctx.createLinearGradient(width - border_width, 0, width, 0);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(width - border_width, 0, border_width, height);
}

function makeBorderStroke() {

    // init
    const canvas = document.getElementById("borderCanvas");
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = convertEmToPx(0.05);

    // parameters
    const margin = convertEmToPx(1);
    const inset = convertEmToPx(5);
    
    const border_width = (canvas.width - (margin * 2) - inset);
    const border_height = (canvas.height - (margin * 2) - inset);
    
    const stroke_ct_x = Math.floor(border_width / 40);
    const stroke_ct_y = Math.floor(border_height / 40);
    const stroke_len_x = border_width / ((stroke_ct_x + 1) / 2);
    const stroke_len_y = border_height / ((stroke_ct_y + 1) / 2);
    const stroke_width = convertEmToPx(0.5);

    // test

    // const gradient = ctx.createLinearGradient(60, 10, 20, 10);
    // gradient.addColorStop(0, "white");
    // gradient.addColorStop(1, "black");
    // ctx.strokeStyle = gradient;
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
    for (let i = 0; i < stroke_ct_x; i++) {

        ctx.moveTo(x, y);
        x += stroke_len_x * 0.4
        
        ctx.lineTo(x, y);
        x += stroke_len_x * 0.2;
        y += stroke_width;
        
        ctx.lineTo(x, y);
        x += stroke_len_x * 0.4;
        
        ctx.lineTo(x, y);
        
        x -= stroke_len_x * 0.5;
        y -= stroke_width;
    }
    ctx.stroke();

    // ctx.strokeStyle = gradient;
    // ctx.beginPath();
    // ctx.lineWidth = convertEmToPx(0.05);
    // ctx.moveTo(margin + inset / 2, margin);
    // ctx.lineTo(margin + inset / 2 - 40, margin);
    // ctx.stroke();
    // ctx.strokeStyle = "white";

    // draw bottom
    x = canvas.width - margin - inset / 2;
    y = canvas.height - margin;
    ctx.beginPath();
    for (let i = 0; i < stroke_ct_x; i++) {

        ctx.moveTo(x, y);
        x -= stroke_len_x * 0.4;

        ctx.lineTo(x, y);
        x -= stroke_len_x * 0.2;
        y -= stroke_width;

        ctx.lineTo(x, y);
        x -= stroke_len_x * 0.4;

        ctx.lineTo(x, y);

        x += stroke_len_x * 0.5;
        y += stroke_width;
    }
    ctx.stroke();

    // draw left
    x = margin;
    y = canvas.height - margin - inset / 2;
    ctx.beginPath();
    for (let i = 0; i < stroke_ct_y; i++) {

        ctx.moveTo(x, y);
        y -= stroke_len_y * 0.4;

        ctx.lineTo(x, y);
        x += stroke_width;
        y -= stroke_len_y * 0.2;

        ctx.lineTo(x, y);
        y -= stroke_len_y * 0.4;

        ctx.lineTo(x, y);

        x -= stroke_width;
        y += stroke_len_y * 0.5;
    }
    ctx.stroke()

    // draw right
    x = canvas.width - margin;
    y = margin + inset / 2;
    ctx.beginPath();
    for (let i = 0; i < stroke_ct_y; i++) {

        ctx.moveTo(x, y);
        y += stroke_len_y * 0.4;

        ctx.lineTo(x, y);
        x -= stroke_width;
        y += stroke_len_y * 0.2;

        ctx.lineTo(x, y);
        y += stroke_len_y * 0.4;

        ctx.lineTo(x, y);

        x += stroke_width;
        y -= stroke_len_y * 0.5;
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

    const canvas = document.getElementById("borderCanvas");
    console.log("canvas.height", canvas.height);
    console.log("canvas.width", canvas.width);
    console.log("canvas.offsetHeight", canvas.offsetHeight);
    console.log("canvas.offsetWidth", canvas.offsetWidth);
}

