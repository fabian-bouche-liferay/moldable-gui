import {pageElement, withPositions, bindParent} from '../helpers.js';

function module({ erc, moduleViewports }, ...childBuilders) {
  return (ctx) => {
    const parentERC = `${ctx.ercPrefix}-${erc}`;
    const children = childBuilders.map((b) => b(ctx));

    return pageElement({
      externalReferenceCode: parentERC,
      pageElementDefinition: {
        moduleViewports,
        type: "Module",
      },
      pageElements: withPositions(bindParent(parentERC, children)),
    });
  };
}

export default module;