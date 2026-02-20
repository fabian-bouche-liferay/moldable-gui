import {pageElement, withPositions, bindParent} from '../../../helpers.js';

function formSelectField({ fieldName }) {
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
            defaultFragmentKey: "INPUTS-select-from-list",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          indexed: true,
        },
        type: "FormFragment",
      },
      pageElements: [],
    });
}

export default formSelectField;