import {pageElement, withPositions, bindParent} from '../../../helpers.js';

function formDateField({ fieldName }) {
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
      },
      pageElements: [],
    });
}

export default formDateField;