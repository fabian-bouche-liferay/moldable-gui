import {pageElement, withPositions, bindParent} from '../../../helpers.js';

function formTextField({ fieldName, label }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-field-${fieldName}`,
      pageElementDefinition: {
        fieldKey: `${fieldName === "externalReferenceCode" ? 'ObjectEntry' : 'ObjectField'}_${fieldName}`,
        fragmentInstance: {
          configuration:
            "{\n\t\"fieldSets\": [\n\t\t{\n\t\t\t\"fields\": [\n\t\t\t\t{\n\t\t\t\t\t\"dataType\": \"string\",\n\t\t\t\t\t\"defaultValue\": \"\",\n\t\t\t\t\t\"label\": \"placeholder\",\n\t\t\t\t\t\"localizable\": true,\n\t\t\t\t\t\"name\": \"placeholder\",\n\t\t\t\t\t\"type\": \"text\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"defaultValue\": false,\n\t\t\t\t\t\"label\": \"show-characters-count\",\n\t\t\t\t\t\"name\": \"showCharactersCount\",\n\t\t\t\t\t\"type\": \"checkbox\",\n\t\t\t\t\t\"typeOptions\": {\n\t\t\t\t\t\t\"displayType\": \"toggle\"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
          fragmentConfigurationFieldValues: {},
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey: "INPUTS-text-input",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          indexed: true,
        },
        type: "FormFragment",
      },
      pageElements: [],
    });
}

export default formTextField;