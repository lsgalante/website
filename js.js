let n_tabs = 5;
//
let mode = "desktop";
let pos_x = 0;
let pox_y = 0;

let mobile = navigator.userAgentData.mobile;

if(mobile == true) { mode = "mobilw"; }

console.log(navigator.userAgentData.mobile);
let active_tab = 0;

function loadPage() {
	let box = make_box();
	let body = make_body();
	let mode_box = make_mode_box();
	let files_box = make_files_box();

	let tabs = make_tabs(box);
	for(let i = 0; i < tabs.length; i++) {
		body.append(tabs[i]);
	}

	body.append(box);
	body.append(mode_box);
	body.append(files_box);
	click_tab(0);
}

async function import_json() {
	const url = "https://lucas.co/info.json";
	const promise = await fetch(url);
	const data = await promise.json();
	return data;
}

//

function make_body() {
	const body = document.getElementById("body");
	body.style.backgroundColor = "#c8c7db";
	return body;
}

//

function make_box() {
	let box = document.createElement("div");

	box = stylize_box(box);
	box.id = "box";

	let text_box = document.createElement("div");
	text_box.style.margin = "25px";
	text_box.id = "text_box";

	import_json().then(function(val) {
		text_box.innerText = val["tabs"]["tab_0"]["body"]
	});

	box.append(text_box);

	return box;
}

function stylize_box(box) {
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
	// box.style.borderWidth = "1px";

	return box;
}

//

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

function make_tabs() {
	const data = tab_data(n_tabs);
	let tabs = [];

	for(let i = 0; i < n_tabs; i++) {

		let tab = document.createElement("div");
		tab.id = "tab_" + String(i);

		stylize_tab(tab, data);

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
	return tabs;
}

function stylize_tab(tab, data) {

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
	const text_box = document.getElementById("text_box");
	
	import_json().then(
		function(val) { (text_box.innerText = val["tabs"][tab_id]["body"]) }
	);
}

//

function make_mode_box() {
	let element = document.createElement("div");
	element.id = "mode_box";
	element.innerText = mode;

	element.onclick = function() {
		mode_box_click();
	}
	return element;
}

function mode_box_click() {
	element = document.getElementById("mode_box");

	if(mode == "desktop") {
		element.innerText = "mobile";
		mode = "mobile";
		let puck = make_puck();

		body.append(puck);

		body.onmousedown = function() {
			const pos_a = MouseEvent["screenX"];
			console.log(event.MouseEvent);

			// body.onmousemove = function(pos_a) {
				// pos_x += event.screenX - pos_a;
				// puck.style.left += String(pos_x) + "px";
			// }
		}
	
		body.onmouseup = function() {
			body.onmousemove = function() {
			}
		}

	}

	else {
		element.innerText = "desktop";
		mode = "desktop";
	}
}

function make_puck() {
	puck = document.createElement("div");
	puck.id = "puck";

	puck.style.position = "fixed";
	puck.style.backgroundColor = "black";
	puck.style.height = "25px";
	puck.style.width = "25px";
	puck.style.top = "5px";

	return puck;
}

function move_puck() {
	element = document.getElementById("site_mode");
	// element.innerText = m.clientX;
}

//

function make_files_box() {
	let files = document.createElement("div");
	files.id = "files";
	files.innerText = "Files";
	files.style.position = "fixed";
	files.style.right = "15px";
	files.style.top = "15px";
	files.style.borderWidth = "2px";
	files.style.borderStyle = "solid";
	files.style.padding = "5px";
	return files;
}
