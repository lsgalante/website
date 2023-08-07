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

let n_tabs = Object.keys(tab_data).length;
let active_tab = 0;

const bg_on = "#3f3131";
const txt_on = "#ffffff";

const bg_off = "#ffffff";
const txt_off = "#000000";

let window_width = window.innerWidth;
let window_height = window.innerHeight;

const box_width = 400;
const box_height = 250;

const box_left = window_width / 2 - box_width / 2;
const box_top = window_height / 2 - box_height / 2;

function loadPage() {
	create_tabs();
	style_box();
	set_tab(0);
}

function style_box() {
	let box = document.getElementById("box");

	box.style.left = box_left.toString() + "px";
	box.style.top = box_top.toString() + "px";

	box.style.width = box_width.toString() + "px";
	box.style.height = box_height.toString() + "px";
}

function create_tabs() {
	let counts = [0, 0, 0, 0];
	let indices = [];
	let positions = [];
	let tabs = [];

	for(let i = 0; i < n_tabs; i++) {
		let position = i;

		if(position >= 4) {
			position = (3 - (i % 4)) % 4;
		}
		
		indices.push(counts[position]);
		counts[position] += 1;
		positions.push(position);

		let tab = document.createElement("div");

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

	style_tabs(tabs, counts, indices, positions);
}

function style_tabs(tabs, counts, indices, positions) {

	for(let i = 0; i < n_tabs; i++) {
		let index = indices[i];
		let tab = tabs[i];
		let position = positions[i];
		let count = counts[position];

		let title = tab_data[tab.id].title;
	
		if(position == 1 || position == 3) {
			let new_title = "";
				
			for(const letter of title) {
				new_title += letter + "\n";
			}	
			title = new_title;
		}
		tab.innerText = title;
		
		let width;
		let height;
		
		const border_radius = 45;
	
		if(position == 0) {
			width = box_width / count;
			height = 25;

			tab.style.left = (box_left).toString() + "px";
			tab.style.top = (box_top - height).toString() + "px";

			tab.style.borderTopLeftRadius = border_radius + "px";
			tab.style.borderTopRightRadius = border_radius + "px";
		}
	
		if(position == 1) {
			width = 25;
			height = box_height / count;

			tab.style.left = (box_left + box_width - width / 2 + width / 2).toString() + "px";
			tab.style.top = (box_top + height / 2 - height / 2 + height * index).toString() + "px";

			tab.style.borderTopRightRadius = border_radius + "px";
			tab.style.borderBottomRightRadius = border_radius + "px";
		}
	
		if(position == 2) {
			width = box_width / count
			height = 25;
			
			tab.style.top = (box_top + box_height).toString() + "px";
			tab.style.left = (box_left + width * index).toString() + "px";
			
			tab.style.borderBottomRightRadius = border_radius + "px";
			tab.style.borderBottomLeftRadius = border_radius + "px";
		}
	
		if(position == 3) {
			width = 25;
			height = box_height / count;

			tab.style.top = (box_top + height / 2 - height / 2 + height * index).toString() + "px";
			tab.style.left = (box_left - width / 2 - width / 2).toString() + "px";
			
			tab.style.borderBottomLeftRadius = border_radius + "px";
			tab.style.borderTopLeftRadius = border_radius + "px";
		}

		tab.style.width = width.toString() + "px";
		tab.style.height = height.toString() + "px";
	}
}

function set_tab(index) {
	for(let i = 0; i < n_tabs; i++) {
		let tab_id = "tab_" + String(i);

		if(i == index) {
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

	active_tab = index;
	let tab_id = "tab_" + String(index);
	const description = document.getElementById("description");
	
	(description.innerText = tab_data[tab_id]["body"])
}

function enter_tab(tab_id) {
	let tab = document.getElementById(tab_id);
	tab.style.backgroundColor = bg_on;
	tab.style.color = txt_on;
}

function leave_tab(tab_id) {
	if(tab_id != "tab_" + String(active_tab)) {
		let tab = document.getElementById(tab_id);
		tab.style.backgroundColor = bg_off;
		tab.style.color = txt_off;
	}
}