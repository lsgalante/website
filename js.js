import data from "./info.json" assert {type: "json"};

// import_json();

// console.log(data.x);

const n_tabs = 5;

let active_tab = 0;

function loadPage() {
	populate();
}

function main_text(idx) {
	
	const main_text = {
		tab0: "me one",
		tab1: "me two",
		tab2: "me three",
		tab3: "me four",
		tab4: "me five",
		tab5: "me six" 
	}

	return main_text[idx];
}

function populate() {
	const body = document.getElementById("body");
	body.style.backgroundColor = "#c8c7db";
	const info = tab_idx(n_tabs);

	let box = make_box();
	let tabs = make_tabs(info, box)

	document.body.append(box);
	document.body.append(tabs);
}

function make_box() {

	let box = document.createElement("div");

	box.id = "box";
	
	box = stylize_box(box);

	let text_box = document.createElement("div");
	
	let inner_text = main_text("tab0");
	
	text_box.id = "text_box";

	text_box.style.margin = "25px";

	text_box.innerText = inner_text;

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

function make_tabs(info, box) {

	let cts = info["cts"];
	let ids = info["ids"];
	let idcs = info["idcs"];

	for(let i = 0; i < idcs.length; i++) {

		let idx = idcs[i];
		let ct = cts[idx];
		let id = ids[i];

		let tab = document.createElement("div");

		tab = stylize_tab(box, tab, ct, idx, id);

		let tab_id = "tab_" + String(i);
		tab.id = tab_id;
		
		tab.onmouseenter = function() {tab_enter(tab_id)};
		tab.onmouseleave = function() {tab_leave(tab_id)};
		tab.onclick = function() {tab_click(tab_id, i)};
		
		tab.innerText = "title";
		
		body.appendChild(tab);
	}
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

function tab_idx(n_tabs) {
	let idcs = [];
	let ids = [];
	let cts = [0, 0, 0, 0];

	for(let i = 0; i < n_tabs; i++) {
		let idx;

		if(i < 4) {
			idx = i;
		}

		else if(i >= 4) {
			idx = (3 - (i % 4)) % 4;
		}

		idcs.push(idx);
		ids.push(cts[idx]);
		cts[idx] += 1;
	}

	const info = {
		idcs: idcs,
		ids: ids,
		cts: cts
	}
	return info;
}

function tab_enter(tab_id) {
	tab = document.getElementById(tab_id);
	tab.style.color = "white";
	tab.style.backgroundColor = "black";
}

function tab_leave(tab_id) {
	tab = document.getElementById(tab_id);
	tab.style.color = "black";
	tab.style.backgroundColor = "white";
}

function tab_click(tab_id, i) {
	tab = document.getElementById(tab_id);
	tab.style.color = "white";
	tab.style.backgroundColor = "black";

	const text = main_text(tab_id);
	
	const text_box = document.getElementById("text_box");

	text_box.innerText = text;
}