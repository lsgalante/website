let n_tabs = 5;
let active_tab = 0;

async function import_json() {
	const url = "https://lucas.co/info.json";
	const promise = await fetch(url);
	const data = await promise.json();
	return data;
}

function loadPage() {
	let client_properties = get_client_properties();
	create_structure();
	create_tabs();

	click_tab(0);
}

function get_client_properties() {
	let x = window.innerWidth;
	let y = window.innerHeight;
}

function create_structure() {
	let body = document.getElementById("body");

	let box = document.createElement("div");
	let description = document.createElement("div");
	let mode_box = document.createElement("div");
	let files_box = document.createElement("div");

	body.append(files_box);
	body.append(mode_box);

	box.append(description);
	body.append(box);
	
	box.id = "box";
	description.id = "description";
	mode_box.id = "mode_box";
	files_box.id = "files_box";

	body = style_body(body);
	box = style_box(box);
	description = style_description(description);
	mode_box = style_mode_box(mode_box);
	file_box = style_files_box(files_box);
}

function create_tabs() {
	const data = tab_data(n_tabs);
	let tabs = [];

	for(let i = 0; i < n_tabs; i++) {

		let tab = document.createElement("div");
		tab.id = "tab_" + String(i);

		style_tab(tab, data);

		tab.onmouseenter = function() {
			enter_tab(tab.id);
		}
		tab.onmouseleave = function() {
			leave_tab(tab.id);
		}
		tab.onclick = function() {
			click_tab(i);
		}

		tabs.push(tab);
	}

	for(let i = 0; i < tabs.length; i++) {
		body.append(tabs[i]);
	}
}

//-------------------------------------

function style_body(body) {
	body.style.backgroundColor = "#c8c7db";
	
	return body;
}

function style_box(box) {
	const x = 400;
	const y = 250;

	const left = window.innerWidth / 2 - x / 2;
	const top = window.innerHeight / 2 - y / 2;

	const text_margin = 25;

	box.style.position = "fixed";
	box.style.left = left.toString() + "px";
	box.style.top = top.toString() + "px";

	box.style.width = x.toString() + "px";
	box.style.height = y.toString() + "px";

	box.style.padding = 0;

	box.style.borderStyle = "none";

	return box;
}

function style_description(description) {
	description.style.margin = "25px";

	import_json().then(function(val) {
		description.innerText = val["tabs"]["tab_0"]["body"]
	});

	return description;
}

function style_mode_box(mode_box) {
	let touch_pts = navigator.maxTouchPoints;

	if(touch_pts > 0) {
		set_mode("touch")
	}
	
	else {
		set_mode("mouse")
	}

	return mode_box;
}

function style_files_box(files_box) {
	files_box.innerText = "Files";
	files_box.style.position = "fixed";
	files_box.style.right = "15px";
	files_box.style.top = "15px";
	files_box.style.borderWidth = "2px";
	files_box.style.borderStyle = "solid";
	files_box.style.padding = "5px";
	return files_box;
}

function style_tab(tab, data) {

	const idx = data[tab.id].idx;
	const n = data.n[idx];
	const id = data[tab.id].id;

	import_json().then(
	function(vars) {
		let title = vars.tabs[tab.id].title;

		if(idx == 1 || idx == 3) {
			let new_title = "";
			for(const letter of title) {
				new_title += letter + "\n";
			}
			title = new_title;
		}
		tab.innerText = title;
	});

	const box_x = 400;
	const box_y = 250;

	const box_left = window.innerWidth / 2 - box_x / 2;
	const box_top = window.innerHeight / 2 - box_y / 2;
	
	const x = [box_x / n, 25, box_x / n, 25][idx]

	const y = [25, box_y / n, 25, box_y / n][idx]

	let left = [
		box_left + x * id,
		box_left + box_x - x / 2 + x / 2,
		box_left + x * id,
		box_left - x / 2 - x / 2
	][idx]

	const top = [
		box_top - y,
		box_top + y / 2 - y / 2 + y * id,
		box_top + box_y,
		box_top + y / 2 - y / 2 + y * id
	][idx];

	const border_radius = 45;

	const transform = "rotate(" + (idx * 90).toString() + "deg)";

	tab.style.position = "fixed";

	tab.style.height = y.toString() + "px";
	tab.style.width = x.toString() + "px";

	tab.style.left = left.toString() + "px";
	tab.style.top = top.toString() + "px";

	if(idx == 0) {
		tab.style.borderTopLeftRadius = border_radius + "px";
		tab.style.borderTopRightRadius = border_radius + "px";
	}

	if(idx == 1) {
		tab.style.borderTopRightRadius = border_radius + "px";
		tab.style.borderBottomRightRadius = border_radius + "px";
	}

	if(idx == 2) {
		tab.style.borderBottomRightRadius = border_radius + "px";
		tab.style.borderBottomLeftRadius = border_radius + "px";
	}

	if(idx == 3) {
		tab.style.borderBottomLeftRadius = border_radius + "px";
		tab.style.borderTopLeftRadius = border_radius + "px";
	}

	tab.style.borderStyle = "solid";
	tab.style.borderColor = "black";
	tab.style.borderWidth = "1px";
	tab.style.display = "flex";
	tab.style.alignItems = "center";
	tab.style.justifyContent = "center";

	tab.style.backgroundColor = "white";

	tab.style.color = "black";
	tab.style.fontSize = 12;

	tab.style.lineHeight = "11px";

	return tab;
}

function style_puck(puck) {
	puck.style.position = "fixed";
	puck.style.backgroundColor = "black";
	puck.style.height = "25px";
	puck.style.width = "25px";
	puck.style.top = "5px";
	puck.style.left = "50px";
	puck.style.borderTopLeftRadius = "50px";
	puck.style.borderTopRightRadius = "50px";
	puck.style.borderBottomRightRadius = "50px";
	puck.style.borderBottomLeftRadius = "50px";

	return puck;
}
//----------------------------------------------

function set_mode(mode) {
	let mode_box = document.getElementById("mode_box");

	if(mode == "mouse") {
		let puck = document.getElementById("puck");
		// document.remove(puck);
		mode_box.innerText = "mouse";

		mode_box.onclick = function() {
			set_mode("touch");
		}
	}

	if(mode == "touch") {
		mode_box.innerText = "touch";

		let puck = document.createElement("div");
		puck.id = "puck"
		puck = style_puck(puck);
		body.append(puck);

		mode_box.onclick = function() {
			set_mode("mouse");
		}

		body.touchstart = function() {
			console.log("ddd");
			move_puck();
		}

		body.onmousedown = function() {
			move_puck();
		}
	
		// body.onmouseup = function() {
		// 	body.onmousemove = function() {}
		// }

		// for(let i = 0; i < n_tabs; i++) {
		// 	let tab_id = "tab_" + String(i);
		// 	let tab = document.getElementById(tab_id);
		// 	tab.onmouseenter = function() {}
		// 	tab.onmouseleave = function() {}
		// 	tab.onclick = function() {}
		// }
	}
}

function tab_data(n_tabs) {
	const data = {
		n: [0, 0, 0, 0],
	}

	for(let i = 0; i < n_tabs; i++) {
		let tab_id = "tab_" + String(i);
		let idx;

		if(i < 4) {
			idx = i;
		}

		else if(i >= 4) {
			idx = (3 - (i % 4)) % 4;
		}

		let tab = {
			idx: idx,
			id: data.n[idx]
		}
		data[tab_id] = tab;
		data.n[idx] += 1;
	}
	console.log(data);
	return data;
}

function enter_tab(tab_id) {
	tab = document.getElementById(tab_id);
	tab.style.color = "white";
	tab.style.backgroundColor = "black";
}

function leave_tab(tab_id) {
	if(tab_id != "tab_" + String(active_tab)) {
		tab = document.getElementById(tab_id);
		tab.style.color = "black";
		tab.style.backgroundColor = "white";
	}
}

function click_tab(idx) {

	for(let i = 0; i < n_tabs; i++) {

		let tab_id = "tab_" + String(i);

		if(i == idx) {
			tab = document.getElementById(tab_id);
			tab.style.color = "white";
			tab.style.backgroundColor = "black";
		}

		else {
			tab = document.getElementById(tab_id);
			tab.style.color = "black";
			tab.style.backgroundColor = "white";
		}
	}

	active_tab = idx;
	let tab_id = "tab_" + String(idx);
	const description = document.getElementById("description");
	
	import_json().then(
		function(val) {
			(description.innerText = val["tabs"][tab_id]["body"])
		}
	);
}

function move_puck() {
	puck = document.getElementById("puck");

	body.onmousemove = function() {
		let start_x = puck.style.left;
		let start_y = puck.style.top;

		start_x = start_x.slice(0, -2);
		start_y = start_y.slice(0, -2);
		
		puck.style.left = String(event.movementX + Number(start_x)) + "px";
		puck.style.top = String(event.movementY + Number(start_y)) + "px";

		puck_select(start_x, start_y);
	}

	body.touchmove = function() {
		let start_x = puck.style.left;
		let start_y = puck.style.top;

		start_x = start_x.slice(0, -2);
		start_y = start_y.slice(0, -2);
		
		puck.style.left = String(event.movementX + Number(start_x)) + "px";
		puck.style.top = String(event.movementY + Number(start_y)) + "px";

		puck_select(start_x, start_y);
	}
}

function puck_select(x, y) {
	let active = -1;

	for(let i = 0; i < n_tabs; i++) {
		let tab_id = "tab_" + String(i);
		let tab = document.getElementById(tab_id);

		let left = Number(tab.style.left.slice(0, -2));
		let top = Number(tab.style.top.slice(0, -2));

		let width = Number(tab.style.width.slice(0, -2));
		let height = Number(tab.style.height.slice(0, -2));

		let min_x = left;
		let max_x = left + width;
		let max_y = top;
		let min_y = top - height;

		if(x > min_x && x < max_x && y-height > min_y && y-height < max_y) {
			tab.style.backgroundColor = "black";
			tab.style.color = "white";
		}

		else {
			tab.style.backgroundColor = "white";
			tab.style.color = "black";
		}
	}
}