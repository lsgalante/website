function loadPage() {
	populate();
}

function populate() {
	const body = document.getElementById("body");
	
	body.style.backgroundColor = "#c8c7db";

	let box = make_box();
	let tabs = make_tabs(box);

	document.body.append(box);
	tab_click(0);
}

async function import_json() {
	const url = "https://lucas.co/info.json";
	const promise = await fetch(url);
	const data = await promise.json();
	return data;
}

const n_tabs = 5;

let active_tab = 0;

function make_box() {
	let box = document.createElement("div");

	box = stylize_box(box);
	box.id = "box";

	let text_box = document.createElement("div");
	text_box.style.margin = "25px";
	text_box.id = "text_box";

	import_json().then(
		function(val) { text_box.innerText = val["tabs"]["tab_0"]["body"] }
	);

	box.append(text_box);

	return box;
}

function make_tabs(box) {
	const info = tab_info(n_tabs);

	for(let i = 0; i < info["idcs"].length; i++) {

		let idx = info["idcs"][i];
		let ct = info["cts"][idx];
		let id = info["ids"][i];

		let tab = document.createElement("div");
		tab = stylize_tab(box, tab, ct, idx, id);

		tab.id = "tab_" + String(i);
		
		tab.onmouseenter = function() {tab_enter(tab.id)};
		tab.onmouseleave = function() {tab_leave(tab.id)};
		tab.onclick = function() {tab_click(i)};
		
		import_json().then(
			function(val) { tab.innerText = val["tabs"][tab.id]["title"] }
		);
		
		body.appendChild(tab);
	}
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

function stylize_tab(box, tab, ct, idx, id) {
	const box_x = 400;
	const box_y = 250;

	const box_left = window.innerWidth / 2 - box_x / 2;
	const box_top = window.innerHeight / 2 - box_y / 2;
	
	const x = [
		box_x / ct,
		box_y / ct,
		box_x / ct,
		box_y / ct
	][idx]

	const y = 25;

	let left = [
		box_left + x * id,
		box_left + box_x - x / 2 + y / 2,
		box_left + x * id,
		box_left - x / 2 - y / 2
	][idx]

	const top = [
		box_top - y,
		box_top + x / 2 - y / 2 + x * id,
		box_top + box_y,
		box_top + x / 2 - y / 2 + x * id
	][idx];

	const border_radius = 45;

	const transform = "rotate(" + (idx * 90).toString() + "deg)";

	tab.style.position = "fixed";

	tab.style.height = y.toString() + "px";
	tab.style.width = x.toString() + "px";

	tab.style.left = left.toString() + "px";
	tab.style.top = top.toString() + "px";

	tab.style.borderTopLeftRadius = border_radius + "px";
	tab.style.borderTopRightRadius = border_radius + "px";

	tab.style.borderStyle = "solid";
	tab.style.borderColor = "black";
	tab.style.borderWidth = "1px";

	tab.style.backgroundColor = "white";

	tab.style.color = "black";
	tab.style.fontSize = 12;

	tab.style.textAlign = "center";
	tab.style.lineHeight = "26px";

	tab.style.transform = transform;

	return tab;
}

function tab_info(n_tabs) {
	const info = {
		idcs: [],
		ids: [],
		cts: [0, 0, 0, 0]
	}

	for(let i = 0; i < n_tabs; i++) {
		let idx;

		if(i < 4) {
			idx = i;
		}

		else if(i >= 4) {
			idx = (3 - (i % 4)) % 4;
		}

		info["idcs"].push(idx);
		info["ids"].push(info["cts"][idx]);
		info["cts"][idx] += 1;
	}

	return info;
}

function tab_enter(tab_id) {
	tab = document.getElementById(tab_id);
	tab.style.color = "white";
	tab.style.backgroundColor = "black";
}

function tab_leave(tab_id) {
	if(tab_id != "tab_" + String(active_tab)) {
		tab = document.getElementById(tab_id);
		tab.style.color = "black";
		tab.style.backgroundColor = "white";
	}
}

function tab_click(idx) {

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