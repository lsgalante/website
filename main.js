let tab_data = {
	tab_0:
	{
		title: "Morphogen",
		body: "Computer program for design through evolution and growth based exploration.\n\nImages coming soon."
	},

	tab_1:
	{
		title: "Moldtek",
		body: "Computer based mold designing tools for objects with very complex geometry."
	},

	tab_2:
	{
		title: "Drawing",
		body: "Some examples of pencil drawings.\n\nImages coming soon."
	},

	tab_3:
	{
		title: "Spoon",
		body: "A wax carving intended for ceramic slip casting.\n\nImages coming soon."
	},

	tab_4:
	{
		title: "info",
		body: "Lucas Galante\n\nadmin@lucas.co/\n\ngithub.com/lsgalante"
	}
}

window.addEventListener("resize", function() {
	sizing() });

let n_tabs = Object.keys(tab_data).length;
let active_tab = 0;

const bg_on = "#3f3131";
const txt_on = "#ffffff";

const bg_off = "#ffffff";
const txt_off = "#000000";

let tabs = [];
let counts = [0, 0, 0, 0];

function loadPage() {
	create_tabs();
	sizing();
	set_tab(0);
}

function create_tabs() {

	for(let i = 0; i < n_tabs; i++) {
		let tab = document.createElement("div");

		let pos = i;

		if(pos >= 4) {
			pos = (3 - (i % 4)) % 4;
		}
		
		tab.pos = pos;
		tab.idx = counts[pos];
		counts[pos] += 1;
		
		tab.id = "tab_" + String(i);
		
		tab.addEventListener("click", function() {
			set_tab(i) });

		tab.addEventListener("mouseenter", function() {
			enter_tab(tab.id) });

		tab.addEventListener("mouseleave", function() {
			leave_tab(tab.id) });

		tabs.push(tab);
		body.append(tab);
	}

	for(let i = 0; i < n_tabs; i++) {
		let tab = tabs[i];

		let pos = tab.pos;

		let title = tab_data[tab.id].title;
	
		if(pos == 1 || pos == 3) {
			let new_title = "";
				
			for(const letter of title) {
				new_title += letter + "\n";
			}	
			title = new_title;
		}

		tab.innerText = title;
	}
}

function set_tab(idx) {
	for(let i = 0; i < n_tabs; i++) {
		let tab_id = "tab_" + String(i);

		if(i == idx) {
			let tab = document.getElementById(tab_id);
			tab.style.backgroundColor = bg_on;
			tab.style.color = txt_on;
		}

		else {
			let tab = document.getElementById(tab_id);
			tab.style.backgroundColor = bg_off;
			tab.style.color = txt_off;
		}
	}

	active_tab = idx;
	let tab_id = "tab_" + idx;
	const description = document.getElementById("description");
	
	(description.innerText = tab_data[tab_id]["body"])
}

function enter_tab(tab_id) {
	let tab = document.getElementById(tab_id);
	tab.style.backgroundColor = bg_on;
	tab.style.color = txt_on;
}

function leave_tab(tab_id) {
	if(tab_id != "tab_" + active_tab) {
		let tab = document.getElementById(tab_id);
		tab.style.backgroundColor = bg_off;
		tab.style.color = txt_off;
	}
}

function sizing() {
	let window_w = window.innerWidth;
	let window_h = window.innerHeight;
	
	let box = document.getElementById("box");
	
	let box_w = window_w * 0.4;
	let box_h = window_h * 0.5;
	
	let box_left = window_w / 2 - box_w / 2;
	let box_top = window_h / 2 - box_h / 2;
	
	box.style.width = box_w + "px";
	box.style.height = box_h + "px";
	
	box.style.left = box_left + "px";
	box.style.top = box_top + "px";
	
	let tab_w;
	let tab_h;
	
	let dim_1 = 25;
	
	const border_radius = 45;

	for(let i = 0; i < n_tabs; i++) {
		let tab = tabs[i];
		let pos = tab.pos;
		let idx = tab.idx;
		let count = counts[pos];

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
		}

		tab.style.width = tab_w + "px";
		tab.style.height = tab_h + "px";
	}
}