import { pageElement, withPositions, bindParent } from '../../helpers.js';

const DYNAMIC_FORM_HTML = `
<div class="dynamic-form-wrapper">
	<lfr-drop-zone></lfr-drop-zone>
</div>
`;

const DYNAMIC_FORM_CSS = ``;

const DYNAMIC_FORM_JS = `
Liferay.on("selectedClassPK", (e) => {
	let classPKNode = fragmentElement.querySelector("form").querySelector("input[name='classPK']");
	if(classPKNode == null) {
		classPKNode = document.createElement("input");
		classPKNode.setAttribute("name", "classPK");
		classPKNode.setAttribute("hidden", "true");
		fragmentElement.querySelector("form").appendChild(classPKNode);
	}
	classPKNode.setAttribute("value", e.classPK);
	Liferay.Util.fetch(\`\${configuration.objectAPIBasePath}/\${e.classPK}\`).then(response => response.json()).then(json => {
		console.log(json);
		fragmentElement.querySelectorAll("div[data-field-name]").forEach(field => {
			console.log("Field");
			console.log(field);
			let fieldName = field.getAttribute("data-field-name");
			let fieldInput = null;
			fieldInput = field.querySelector(\`input[name='\${fieldName}']\`);
			if(fieldInput != null) {
				switch(field.getAttribute("data-field-type")) {
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
`;

function dynamicFormWrapper(
  {
    erc,
    fragmentItemERC,
    objectAPIBasePath,
    configuration = '{\n\t"fieldSets": [\n\t\t{\n\t\t\t"fields": [\n\t\t\t\t{\n\t\t\t\t\t"defaultValue": "",\n\t\t\t\t\t"label": "Object API Base Path",\n\t\t\t\t\t"name": "objectAPIBasePath",\n\t\t\t\t\t"type": "text"\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}',
    fragmentConfigurationFieldValues,
  },
  ...dropzoneChildBuilders
) {
  return (ctx) => {
    const parentERC = `${ctx.ercPrefix}-${erc}`;

    const resolvedFieldValues =
      fragmentConfigurationFieldValues ??
      (objectAPIBasePath
        ? {
            objectAPIBasePath: { type: 'Text', value: objectAPIBasePath },
          }
        : {});

    const dzChildren = dropzoneChildBuilders.map((b) => b(ctx));
    const dropzoneERC = `${parentERC}-dropzone`;

    return pageElement({
      externalReferenceCode: parentERC,
      pageElementDefinition: {
        fragmentInstance: {
          configuration,
          css: DYNAMIC_FORM_CSS,
          html: DYNAMIC_FORM_HTML,
          js: DYNAMIC_FORM_JS,          
          fragmentConfigurationFieldValues: resolvedFieldValues,
          fragmentEditableElements: [],
          fragmentReference: {
            externalReferenceCode: fragmentItemERC,
            fragmentReferenceType: 'FragmentItemExternalReference',
          },
          indexed: true,
        },
        type: 'BasicFragment',
      },
      pageElements: withPositions(
        bindParent(parentERC, [
          pageElement({
            externalReferenceCode: dropzoneERC,
            parentExternalReferenceCode: parentERC,
            pageElementDefinition: { type: 'FragmentDropZone' },
            pageElements: withPositions(bindParent(dropzoneERC, dzChildren)),
          }),
        ])
      ),
    });
  };
}

export default dynamicFormWrapper;