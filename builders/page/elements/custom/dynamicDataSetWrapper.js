import { pageElement, withPositions, bindParent } from '../../helpers.js';

const DYNAMIC_DATA_SET_HTML = `
<div class="dynamic-data-set-wrapper">
	<lfr-drop-zone></lfr-drop-zone>
</div>
`;

const DYNAMIC_DATA_SET_CSS = `
.dynamic-data-set-wrapper tbody > tr:hover {
	color: var(--primary) !important;
	font-weight: bold;
	cursor: alias;
}
`;

const DYNAMIC_DATA_SET_JS = `
const observer = new MutationObserver((mutationsList) => {
	
	fragmentElement.querySelectorAll("tbody>tr").forEach(item => {
		item.addEventListener("click", (e) => {
			Liferay.fire("selectedClassPK", {"classPK": e.target.getAttribute("data-id").split(":")[0].split(",")[1]});
		});
	});	
	
});

observer.observe(fragmentElement, {
  childList: true,
  subtree: true
});
`;

function dynamicDataSetWrapper(
  {
    erc,
    fragmentItemERC,
    configuration = '{\n\t"fieldSets": [\n\t]\n}',
    fragmentConfigurationFieldValues = {},
  },
  ...dropzoneChildBuilders
) {
  return (ctx) => {
    const parentERC = `${ctx.ercPrefix}-${erc}`;

    const dzChildren = dropzoneChildBuilders.map((b) => b(ctx));
    const dropzoneERC = `${parentERC}-dropzone`;

    return pageElement({
      externalReferenceCode: parentERC,
      pageElementDefinition: {
        fragmentInstance: {
          configuration,
          css: DYNAMIC_DATA_SET_CSS,
          html: DYNAMIC_DATA_SET_HTML,
          js: DYNAMIC_DATA_SET_JS,
          fragmentConfigurationFieldValues,
          fragmentEditableElements: [],
          fragmentReference: {
            externalReferenceCode: fragmentItemERC,
            fragmentReferenceType: "FragmentItemExternalReference",
          },
          indexed: true,
        },
        type: "BasicFragment",
      },
      pageElements: withPositions(
        bindParent(parentERC, [
          pageElement({
            externalReferenceCode: dropzoneERC,
            parentExternalReferenceCode: parentERC,
            pageElementDefinition: { type: "FragmentDropZone" },
            pageElements: withPositions(bindParent(dropzoneERC, dzChildren)),
          }),
        ])
      ),
    });
  };
}

export default dynamicDataSetWrapper;