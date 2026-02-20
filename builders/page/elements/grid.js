import {pageElement, withPositions, bindParent} from '../helpers.js';

function grid(
  { erc, gridViewports, numberOfModules = 2, gutters = true, reverseOrder = false, position = 0 },
  ...moduleBuilders
) {
  return (ctx) => {
    const gridErc = `${ctx.ercPrefix}-${erc}`;
    const children = moduleBuilders.map((b) => b(ctx));

    return pageElement({
      externalReferenceCode: gridErc,
      parentExternalReferenceCode: "",
      position,
      pageElementDefinition: {
        gridViewports,
        gutters,
        indexed: true,
        numberOfModules,
        reverseOrder,
        type: "Grid",
      },
      pageElements: withPositions(bindParent(gridErc, children)),
    });
  };
}

export default grid;