let storage = {};
storage.lists = [];

function addList() {
	let listName = document.querySelector('#list-name');
	let escapedListName = escapeHTML(listName.value);
    let lists = document.querySelector('#lists');
	const listsLength = lists.children.length;
	
	if(lists == '' || lists == null || listsLength == '' || listsLength == null || listsLength == 0 || escapedListName == '' || escapedListName == null) {
		return;
	}

	let newList = document.createElement('div');
	newList.innerHTML = '<div class="control">' + escapedListName + '</div>\n';
	newList.innerHTML += '<div style="clear:both"></div>\n';
	newList.innerHTML += '<i class="add-cart fas fa-plus" onclick="addCart(\'' + listsLength + '\')"> Karte hinzufügen...</i>\n';
	newList.innerHTML += '<div style="clear:both"></div>\n';
	newList.innerHTML += '<input class="cart-name" type="text" id="cart-name-' + listsLength + '" placeholder="Kartentitel..." autocomplete="off" dir="auto" maxlength="512"></input>\n';
	newList.innerHTML += '<div class="carts" id="carts-' + listsLength + '"></div>';
	newList.className = 'list';
	newList.id = 'list-' + listsLength;
	lists.insertBefore(newList, lists.children[listsLength - 1]);
	addListToStorage(escapedListName);
	//persistDataToDatabase()
}

function addCart(listId) {
	let cartName = document.querySelector('#cart-name-' + listId);
	let escapedCartName = escapeHTML(cartName.value);
	let carts = document.querySelector('#carts-' + listId);
	const cartsLength = carts.children.length;
	
	if(carts == '' || carts == null || escapedCartName == '' || escapedCartName == null) {
		return;
	}
	
	let newCart = document.createElement('div');
	newCart.innerHTML = '<div class="cart-title">' + escapedCartName + '</div>\n';
	newCart.innerHTML += '<div style="clear:both"></div>\n';
	newCart.innerHTML += '<div class="cart-description">' + escapedCartName + '</div>';
	newCart.className = 'cart';
	newCart.id = 'cart-' + (cartsLength + 1);
	carts.appendChild(newCart);
	addCartToStorage((listId - 1), escapedCartName);
	//persistDataToDatabase()
}

function addListToStorage(listName) {
	let list = {};
	list.name = listName;
	list.carts = [];
	storage.lists.push(list)
}

function addCartToStorage(listId, cartName) {
	storage.lists[listId].carts.push(cartName);
}

function escapeHTML(html) {
    return html.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&#39;");
}

function persistDataToDatabase() {
	let request = new XMLHttpRequest();
	request.open('POST', 'https://dummyapui.de/updateLists', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.onload = parseResults(this.response);
	let dataToSend = JSON.stringify(storage);
	request.send(dataToSend);
}

function parseResults(response) {
	let data = JSON.parse(response);
	if (request.status >= 200 && request.status < 400) {
		console.log(data);
	}
	else {
		console.log('error');
	}
}