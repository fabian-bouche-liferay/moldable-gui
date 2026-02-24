import {pageElement, withPositions, bindParent} from '../../../helpers.js';

function formDateField({ fieldName, label }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-field-${fieldName}`,
      pageElementDefinition: {
        fieldKey: `ObjectField_${fieldName}`,
        fragmentInstance: {
          configuration:
            "{\n\t\"fieldSets\": []\n}",
          fragmentConfigurationFieldValues: {},
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey: "INPUTS-date-input",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          indexed: true,
        },
        type: "FormFragment",
        label_i18n: {
          "en-US": `${label}`
        },
      },
      pageElements: [],
    });
}

export default formDateField;