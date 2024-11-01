import { data }  from "./info.js";

console.log(data);

let tab_ct = Object.keys(data.tabs).length;

console.log(tab_ct)
let tab_idx = 0;

const bg_on   = "#3f3131";
const bg_off  = "#ffffff";
const txt_on  = "#ffffff";
const txt_off = "#000000";

let tab_arr = [];
let ct_arr = [0, 0, 0, 0];
let w_start = 0;

loadPage();

function loadPage() {
    window.addEventListener(
        "resize",
        function() {check_h()}
    );
    tab_init();
    tab_set(0);
}

function tab_init() {

    for(let i = 0; i < tab_ct; i++) {
        let tab = document.createElement("div");
        let side = i;

        if (side >= 4)
            side = (3 - (i % 4)) % 4;
                
        tab.side = side;
        tab.side = ct_arr[idx];
        ct_arr[idx] += 1;
                
        tab.id = "tab_" + String(i);
                
        tab.addEventListener(
            "click",
            function() { set_tab(i) }
        );
        tab.addEventListener(
            "mouseenter",
            function() { enter_tab(tab.id) }
        );
        tab.addEventListener(
            "mouseleave",
            function() { leave_tab(tab.id) }
        );

        tab_arr.push(tab);
        body.append(tab);
    }

    for(let i = 0; i < tab_ct; i++) {
        let tab = tab_arr[i];
        let side = tab.side;

        let label = data.tab_arr[tab.idx].label;
        
        // vertical labels
        if(pos == 1 || pos == 3) {
            let new_label = "";
            for(const letter of label) {
                new_label += letter + "\n";
            }       
            label = new_label;
        }

        tab.innerText = label;
    }
}

function set_tab(idx) {
    for(let i = 0; i < tab_ct; i++) {
        let tab_id = "tab_" + String(i);

        if(i == idx) {
            let tab = document.getElementById(tab_id);
            tab.style.backgroundColor = bg_on;
            tab.style.color = txt_on;
            active_tab = i;
            images(i);
        }

        else {
            let tab = document.getElementById(tab_id);
            tab.style.backgroundColor = bg_off;
            tab.style.color = txt_off;
        }
    }

    tab_idx = idx;
    let tab_id = "tab_" + idx;
    const description = document.getElementById("description");
        
    (description.innerText = data.tabs[tab_id]["body"])

    sizing();
}

function tab_enter(tab_id) {
    let tab = document.getElementById(tab_id);
    tab.style.backgroundColor = bg_on;
    tab.style.color = txt_on;
}

function tab_exit(tab_idx) {
    if (tab_idx != tab+ active_tab) {
        let tab = document.getElementById(tab_id);
        tab.style.backgroundColor = bg_off;
        tab.style.color = txt_off;
    }
}

function images(i) {
    let images = document.getElementsByTagName("img");

    for(const img of images)
        img.remove();

    let box = document.getElementById("box");
    let urls = data.tabs["tab_" + i].image;
    let n = 0;
    for(let url of urls) {
        let image = document.createElement("img");
        image.src=url;
        image.id = "image_" + n;
        box.append(image);
        n += 1;
    }
}

function check_h() {
    let window_w = window.innerWidth;

    if(window_w != w_start) {
        w_start = window_w;
        sizing()
    }
}

function sizing() {
    let window_w = window.innerWidth;
    let window_h = window.innerHeight;

    let font_size = window_h * 0.014;

    // box
    let box = document.getElementById("box");
        
    let box_w = window_w * 0.6;
    let box_h = window_h * 0.5;
        
    let box_left = window_w / 2 - box_w / 2;
    let box_top = window_h / 2 - box_h / 2;
        
    box.style.width = box_w + "px";
    box.style.height = box_h + "px";
        
    box.style.left = box_left + "px";
    box.style.top = box_top + "px";

    box.style.fontSize = font_size + "px";
        
    // image
    let images = document.getElementsByTagName("img");
    let n_images = images.length;
        
    let img_w = box_w * 0.4;
    let img_h = box_h * 0.4;

    for(img of images) {            
        img.style.width = img_w + "px";
        img.style.height = img_h + "px";

        img.style.left = 20 + "px";
        img.style.top = (img_h - 20) + "px";
    }

    // tab
    let tab_w;
    let tab_h;
        
    let dim_1 = window_h * 0.03;
        
    const border_radius = 45;

    for(let i = 0; i < n_tabs; i++) {
        let tab = tabs[i];
        let pos = tab.pos;
        let idx = tab.idx;
        let count = counts[pos];

        tab.style.fontSize = font_size + "px";

        if(pos == 0) {
            tab_w = box_w / count;
            tab_h = dim_1;

            tab.style.left = box_left + "px";
            tab.style.top = (box_top - tab_h) + "px";

            tab.style.borderTopLeftRadius = border_radius + "px";
            tab.style.borderTopRightRadius = border_radius + "px";
        }

        if(pos == 1) {
            tab_w = dim_1;
            tab_h = box_h / count;

            tab.style.left = (box_left + box_w - tab_w / 2 + tab_w / 2) + "px";
            tab.style.top = (box_top + tab_h / 2 - tab_h / 2 + tab_h * idx) + "px";

            tab.style.borderTopRightRadius = border_radius + "px";
            tab.style.borderBottomRightRadius = border_radius + "px";

            tab.style.lineHeight = font_size + "px";
        }

        if(pos == 2) {
            tab_w = box_w / count
            tab_h = dim_1;
                        
            tab.style.top = (box_top + box_h) + "px";
            tab.style.left = (box_left + tab_w * idx) + "px";
                        
            tab.style.borderBottomRightRadius = border_radius + "px";
            tab.style.borderBottomLeftRadius = border_radius + "px";
        }

        if(pos == 3) {
            tab_w = dim_1;
            tab_h = box_h / count;

            tab.style.top = (box_top + tab_h / 2 - tab_h / 2 + tab_h * idx) + "px";
            tab.style.left = (box_left - tab_w / 2 - tab_w / 2) + "px";
                        
            tab.style.borderBottomLeftRadius = border_radius + "px";
            tab.style.borderTopLeftRadius = border_radius + "px";

            tab.style.lineHeight = font_size + "px";
        }

        tab.style.width = tab_w + "px";
        tab.style.height = tab_h + "px";

        // files
        let files_box = document.getElementById("files");
        files_box.style.fontSize = font_size + "px";
    }

}
