import {pageElement, withPositions, bindParent} from '../../../helpers.js';

function formRichTextField({ fieldName, label }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-field-${fieldName}`,
      pageElementDefinition: {
        fieldKey: `ObjectField_${fieldName}`,
        fragmentInstance: {
          configuration:
            "{\n\t\"fieldSets\": []\n}",
          fragmentConfigurationFieldValues: {
          },
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey: "INPUTS-rich-text-input",
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

export default formRichTextField;