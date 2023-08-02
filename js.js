async function stinky(d1, d2, d3) {
	const response = await fetch("https://raw.githubusercontent.com/lsgalante/lucas_co/main/info.json?token=GHSAT0AAAAAACFZORYKOTML4F5SY6YPPRP2ZGJL66Q");

	const data = await response.json();

	return data[d1][d2][d3];
}

const n_tabs = 5;

let active_tab = 0;

function loadPage() {
	populate();
}

class globals_class {
	constructor() {}

	main_text(idx) {
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
}

class box_class {
	constructor() {}

	x() { return 400; }

	y() { return 250; }

	left() { return window.innerWidth / 2 - this.x() / 2; }

	top() {return window.innerHeight / 2 - this.y() / 2; }

	text_margin() { return 25; }

	return_box() {
		let box = document.createElement("div");
		box.id = "box";
		box.style.position = "fixed";

		box.style.left = this.left().toString() + "px";
		box.style.top = this.top().toString() + "px";

		box.style.width = this.x().toString() + "px";
		box.style.height = this.y().toString() + "px";

		box.style.padding = 0;

		box.style.borderStyle = "solid";
		box.style.borderWidth = "1px";
		return box;
	}
}

class tab_class {
	constructor(ct, idx, id) {
		this.ct = ct;
		this.idx = idx;
		this.id = id;

		this.box_ = new box_class;
	}

	x() {
		const x = [
			this.box_.x() / this.ct,
			this.box_.y() / this.ct,
			this.box_.x() / this.ct,
			this.box_.y() / this.ct
		]
		return x[this.idx];
	}

	y() {
		const y = 25;
		return y;
	}

	left() {
		const x = this.x();

		const box_left = this.box_.left();
		const box_x = this.box_.x();

		let left = [
			box_left + x * this.id,
			box_left + box_x - x / 2 + this.y() / 2,
			box_left + x * this.id,
			box_left - x / 2 - this.y() / 2
		]
		return left[this.idx];
	}

	top() {
		const x = this.x();

		const box_y = this.box_.y();
		const box_top = this.box_.top();

		const top = [
			box_top - this.y(),
			box_top + x / 2 - this.y() / 2 + x * this.id,
			box_top + box_y,
			box_top + x / 2 - this.y() / 2 + x * this.id
		]
		return top[this.idx];
	}

	border_radius() { return 45; }

	transform() { return "rotate(" + (this.idx * 90).toString() + "deg)" }

	return_tab() {
		let tab = document.createElement("div");

		tab.style.position = "fixed";

		tab.style.height = this.y().toString() + "px";
		tab.style.width = this.x().toString() + "px";

		tab.style.left = this.left().toString() + "px";
		tab.style.top = this.top().toString() + "px";

		tab.style.borderTopLeftRadius = this.border_radius() + "px";
		tab.style.borderTopRightRadius = this.border_radius() + "px";

		tab.style.borderStyle = "solid";
		tab.style.borderColor = "black";
		tab.style.borderWidth = "1px";

		tab.style.backgroundColor = "white";

		tab.style.color = "black";
		tab.style.fontSize = 12;

		tab.style.textAlign = "center";
		tab.style.lineHeight = "26px";

		tab.style.transform = this.transform();

		return tab;
	}
}

function populate() {
	const body = document.getElementById("body");
	body.style.backgroundColor = "#c8c7db";

	make_box();

	const info = tab_idx(n_tabs);

	make_tab(info);
}

function make_box() {
	const globals_ = new globals_class();
	const box_instance = new box_class();
	
	let box = box_instance.return_box();

	let text_box = document.createElement("div");
	let inner_text = globals_.main_text("tab0");
	
	text_box.id = "text_box";

	text_box.style.margin = "25px";

	text_box.innerText = inner_text;

	box.append(text_box);

	document.body.append(box);
}

function make_tab(info) {
	const globals_ = new globals_class();
	const box_ = new box_class();

	let cts = info["cts"];
	let ids = info["ids"];
	let idcs = info["idcs"];

	for(let i = 0; i < idcs.length; i++) {

		let idx = idcs[i];
		let ct = cts[idx];
		let id = ids[i];

		const tab_ = new tab_class(ct, idx, id);

		let tab = tab_.return_tab();

		let tab_id = "tab_" + String(i);
		tab.id = tab_id;
		
		tab.onmouseenter = function() {tab_enter(tab_id)};
		tab.onmouseleave = function() {tab_leave(tab_id)};
		tab.onclick = function() {tab_click(tab_id, i)};


		
		tab.innerText = "title";
		
		body.appendChild(tab);
	}
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

	const globals_ = new globals_class();

	const text = globals_.main_text(tab_id);
	
	const text_box = document.getElementById("text_box");

	text_box.innerText = text;
}