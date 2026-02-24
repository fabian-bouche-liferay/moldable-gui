Liferay.on("selectedClassPK", (e) => {
	let classPKNode = fragmentElement.querySelector("form").querySelector("input[name='classPK']");
	if(classPKNode == null) {
		classPKNode = document.createElement("input");
		classPKNode.setAttribute("name", "classPK");
		classPKNode.setAttribute("hidden", "true");
		fragmentElement.querySelector("form").appendChild(classPKNode);
	}
	classPKNode.setAttribute("value", e.classPK);
	Liferay.Util.fetch(`${configuration.objectAPIBasePath}/${e.classPK}`).then(response => response.json()).then(json => {
		console.log(json);
		fragmentElement.querySelectorAll("div[data-field-name]").forEach(field => {
			console.log("Field");
			console.log(field);
			let fieldName = field.getAttribute("data-field-name");
			let fieldInput = field.querySelector(`input[name='${fieldName}']`);
			if(fieldInput != null) {
				switch(field.getAttribute("data-field-type")) {
					case 'select':
						let fieldInputLabel = field.querySelector(`input[name='${fieldName}-label']`);
						let fieldInputDisplay = fieldInputLabel.parentElement.querySelector(`input[name='']`);
						fieldInput.value = json[fieldName.split("_")[1]].key;
						fieldInputLabel.value = json[fieldName.split("_")[1]].name;
						fieldInputDisplay.value = json[fieldName.split("_")[1]].name;
						return;
					case 'date':
						fieldInput.value = json[fieldName.split("_")[1]].split("T")[0];
						return;
					default:
						fieldInput.value = json[fieldName.split("_")[1]];
				}
			}
		});
	});
});