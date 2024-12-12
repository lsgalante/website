import { data }  from "./data.js"

console.log(data)

const clr_bg_on   = "#3f3131"
const clr_bg_off  = "#ffffff"
const clr_txt_on  = "#ffffff"
const clr_txt_off = "#000000"
const side_ct     = 4
const tab_ct      = Object.keys(data.tabs).length
let   ct_arr      = [0, 0, 0, 0]
let   sel_idx     = 0
let   tab_arr     = []
let   win_h = window.innerHeight
let   win_w = window.innerWidth

// side clockwise, starting at top: 0, 1, 2, 3

loadPage()

function loadPage() {
    //window.addEventListener("resize", function() {check_h()})
    tab_init()
    tab_format()
    //tab_set(sel_idx)
}

//function check_h() {
//    let win_w = window.innerWidth
//    if(window_innerWidth != win_w) {
//        win_w = window.innerWidth
//        tab_format()
//    }
//}

function img_get(i) {
    let images = document.getElementsByTagName("img")

    for(const img of img_arr)
        img.remove()

    let box = document.getElementById("box")
    let urls = data.tabs["tab_" + i].img
    let n = 0
    for(let url of urls) {
        let img = document.createElement("img")
        img.src=url
        img.id = "img_" + n
        box.append(img)
        n += 1
    }
}

function img_format() {
    let images = document.getElementsByTagName("img")
    let n_images = images.length
    let img_w = box_w * 0.4
    let img_h = box_h * 0.4
    for(img of images) {            
        img.style.width = img_w + "px"
        img.style.height = img_h + "px"
        img.style.left = 20 + "px"
        img.style.top = (img_h - 20) + "px"
    }
}

function tab_init() {
    for(let i = 0; i < tab_ct; i++) {
        const tab = document.createElement("div")
        tab.idx = i
        let side = i
        if (side >= side_ct) {
            side %= side_ct
            side = (side_ct - 1) - side 
            side %= side_ct
        }
        tab.side = side
        //tab.id = "tab_" + String(i)
        tab.addEventListener("click", function() {tab_set(i)})
        tab.addEventListener("mouseenter", function() {tab_enter(tab.idx)})
        tab.addEventListener("mouseleave", function() {tab_exit(tab.idx)})
        ct_arr[side] += 1
        tab.id = "tab"
        tab_arr.push(tab)
        body.append(tab)
    }

    for(let i = 0; i < tab_ct; i++) {
        const tab = tab_arr[i]
        let label = data.tabs[String(i)].label
        // vertical labels
        //if(tab.side == 1 || tab.side == 3) {
        //    let new_label = ""
        //    for(const letter of label)
        //        new_label += letter + "\n"
        //    label = new_label
        //}
        tab.innerText = label
    }
}

function tab_format() {
    const type_size = win_h * 0.014

    // box
    const box = document.getElementById("box")
    const box_h = win_h * 0.5
    const box_w = win_w * 0.6
    const box_x = win_w / 2 - box_w / 2
    const box_y = win_h / 2 - box_h / 2
    box.style.height          = box_h     + "px"
    box.style.width           = box_w     + "px"
    box.style.left            = box_x     + "px"
    box.style.top             = box_y     + "px"
    box.style.fontSize        = type_size + "px"
    box.style.backgroundColor = "#202020"
        
    // tab
    for (const tab of tab_arr) {
        const style = tab.style

        let height = win_h / 25
        let width  = win_h / 2
        if (tab.side % 2 == 0) width *= win_w / win_h
    
        let left = Math.sin(tab.side / side_ct * Math.PI * 2) * win_w / 4
        left += (win_w / 2 - width / 2)

        let top = Math.cos((tab.side + 2) / side_ct * Math.PI * 2) * win_h / 4
        top += (win_h / 2 - height / 2)

        tab.style.transform            = "rotate(" + String(360 / side_ct * tab.side) + "deg)" 
        tab.style.transformOrigin      = "center"
        tab.style.backgroundColor      = clr_bg_on
        tab.style.fontSize             = type_size + "px"
        tab.style.left                 = String(left)   + "px"
        tab.style.top                  = String(top)    + "px"
        tab.style.height               = String(height) + "px"
        tab.style.width                = String(width)  + "px"
        tab.style.borderTopLeftRadius  = "20px"
        tab.style.borderTopRightRadius = "20px"

    } 
}

function tab_enter(tab_idx) {
    const tab = tab_arr[tab_idx]
    for (const tab of tab_arr) {
        if (tab_idx == tab.idx) {
            tab.style.backgroundColor = clr_bg_on
            tab.style.color = clr_txt_on
        }
        else {
            tab.style.backgroundColor = clr_bg_off
            tab.style.color = clr_txt_off
        }
    }
}

function tab_exit(idx) {
    const tab = tab_arr[idx]
    tab.style.backgroundColor = clr_bg_off
    tab.style.color = clr_txt_off
}


function tab_sel(sel_idx) {
    for (const tab of tab_arr) {
        const style = tab.style
        if(tab.idx == sel_idx) {
            style.backgroundColor = clr_bg_on
            style.color = clr_txt_on
            //images(i)
        }
        else {
            style.backgroundColor = clr_bg_off
            style.color = clr_txt_off
        }
    }

    //const description = document.getElementById("description")
    //(description.innerText = data.tabs[tab_id]["body"])
}
