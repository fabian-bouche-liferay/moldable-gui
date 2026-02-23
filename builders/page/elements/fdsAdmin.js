import {pageElement, withPositions, bindParent} from '../helpers.js';

function basicFragmentFDS({ erc, dataSetERC }) {
  return (ctx) =>
    pageElement({
      externalReferenceCode: `${ctx.ercPrefix}-${erc}`,
      pageElementDefinition: {
        fragmentInstance: {
          configuration:
            "{\"fieldSets\":[{\"fields\":[{\"name\":\"itemSelector\",\"typeOptions\":{\"itemType\":\"FDSView\"},\"label\":\"data-set-view\",\"type\":\"itemSelector\"}]}]}",
          css: "",
          fragmentConfigurationFieldValues: {
            itemSelector: {
              type: "Item",
              value: {
                itemExternalReference: {
                  className: "com.liferay.object.model.ObjectDefinition",
                  externalReferenceCode: dataSetERC,
                },
              },
            },
          },
          fragmentEditableElements: [],
          fragmentReference: {
            defaultFragmentKey:
              "com.liferay.frontend.data.set.admin.web.internal.fragment.renderer.FDSAdminFragmentRenderer",
            fragmentReferenceType: "DefaultFragmentReference",
          },
          html: "",
          indexed: true,
          js: "",
        },
        type: "BasicFragment",
      },
      pageElements: [],
    });
}

export default basicFragmentFDS;