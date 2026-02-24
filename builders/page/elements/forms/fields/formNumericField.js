import {pageElement, withPositions, bindParent} from '../../../helpers.js';

const configuration = `
{
	"fieldSets": [
		{
			"fields": [
				{
					"dataType": "string",
					"defaultValue": "",
					"label": "placeholder",
					"localizable": true,
					"name": "placeholder",
					"type": "text"
				}
			]
		}
	]
}
`;

function formNumericField({ fieldName, label }) {
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
            defaultFragmentKey: "INPUTS-numeric-upload",
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

export default formNumericField;