import {pageElement, withPositions, bindParent} from '../../../helpers.js';

const configuration = `
{
	"fieldSets": [
		{
			"fields": [
				{
					"defaultValue": "select-file",
					"label": "button-text",
					"localizable": true,
					"name": "buttonText",
					"type": "text"
				},
				{
					"defaultValue": true,
					"label": "show-supported-file-info",
					"name": "showSupportedFileInfo",
					"type": "checkbox",
					"typeOptions": {
						"displayType": "toggle"
					}
				}
			]
		}
	]
}
`;

function formFileUploadField({ fieldName, label }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-field-${fieldName}`,
      pageElementDefinition: {
        fieldKey: `ObjectField_${fieldName}`,
        fragmentInstance: {
          configuration: configuration,
          fragmentConfigurationFieldValues: {
          },
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey: "INPUTS-file-upload",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          indexed: true,
        },
        label_i18n: {
          "en-US": `${label}`
        },
        type: "FormFragment",
      },
      pageElements: [],
    });
}

export default formFileUploadField;