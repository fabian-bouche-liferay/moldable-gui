import {pageElement, withPositions, bindParent} from '../../helpers.js';

function formSubmitButton({ erc }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-${erc}`,
      pageElementDefinition: {
        fragmentInstance: {
          configuration:
            "{\n\t\"fieldSets\": [\n\t\t{\n\t\t\t\"fields\": [\n\t\t\t\t{\n\t\t\t\t\t\"dataType\": \"string\",\n\t\t\t\t\t\"defaultValue\": \"submit\",\n\t\t\t\t\t\"label\": \"type\",\n\t\t\t\t\t\"name\": \"type\",\n\t\t\t\t\t\"type\": \"select\",\n\t\t\t\t\t\"typeOptions\": {\n\t\t\t\t\t\t\"validValues\": [\n\t\t\t\t\t\t\t{\"value\": \"previous\"},\n\t\t\t\t\t\t\t{\"value\": \"next\"},\n\t\t\t\t\t\t\t{\"value\": \"submit\"}\n\t\t\t\t\t\t]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"dataType\": \"string\",\n\t\t\t\t\t\"defaultValue\": \"0\",\n\t\t\t\t\t\"label\": \"submitted-entry-status\",\n\t\t\t\t\t\"name\": \"submittedEntryStatus\",\n\t\t\t\t\t\"type\": \"select\",\n\t\t\t\t\t\"typeOptions\": {\n\t\t\t\t\t\t\"dependency\": {\n\t\t\t\t\t\t\t\"type\": {\n\t\t\t\t\t\t\t\t\"type\": \"equal\",\n\t\t\t\t\t\t\t\t\"value\": \"submit\"\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t},\n\t\t\t\t\t\t\"validValues\": [\n\t\t\t\t\t\t\t{\"label\": \"approved\", \"value\": \"0\"},\n\t\t\t\t\t\t\t{\"label\": \"draft\", \"value\": \"2\"}\n\t\t\t\t\t\t]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"dataType\": \"string\",\n\t\t\t\t\t\"defaultValue\": \"primary\",\n\t\t\t\t\t\"label\": \"style\",\n\t\t\t\t\t\"name\": \"buttonType\",\n\t\t\t\t\t\"type\": \"select\",\n\t\t\t\t\t\"typeOptions\": {\n\t\t\t\t\t\t\"validValues\": [\n\t\t\t\t\t\t\t{\"value\": \"primary\"},\n\t\t\t\t\t\t\t{\"value\": \"secondary\"},\n\t\t\t\t\t\t\t{\"value\": \"outline-primary\"},\n\t\t\t\t\t\t\t{\"value\": \"outline-secondary\"}\n\t\t\t\t\t\t]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"dataType\": \"string\",\n\t\t\t\t\t\"defaultValue\": \"nm\",\n\t\t\t\t\t\"label\": \"size\",\n\t\t\t\t\t\"name\": \"buttonSize\",\n\t\t\t\t\t\"type\": \"select\",\n\t\t\t\t\t\"typeOptions\": {\n\t\t\t\t\t\t\"validValues\": [\n\t\t\t\t\t\t\t{\"label\": \"small\", \"value\": \"sm\"},\n\t\t\t\t\t\t\t{\"label\": \"normal\", \"value\": \"nm\"},\n\t\t\t\t\t\t\t{\"label\": \"large\", \"value\": \"lg\"}\n\t\t\t\t\t\t]\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}",
          fragmentConfigurationFieldValues: {
            buttonType: { type: "Select", value: "primary" },
            submittedEntryStatus: { type: "Select", value: "0" },
            type: { type: "Select", value: "submit" },
            buttonSize: { type: "Select", value: "nm" },
          },
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey: "INPUTS-submit-button",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          indexed: true,
        },
        type: "FormFragment",
      },
      pageElements: [],
    });
}

export default formSubmitButton;