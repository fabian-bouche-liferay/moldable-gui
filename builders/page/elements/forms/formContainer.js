import {pageElement, withPositions, bindParent} from '../../helpers.js';

function formContainer({ erc, formContainerSubtypeClassName, formContainerType = "Simple", numberOfSteps = 0 }, ...formFragmentBuilders) {
  return (ctx) => {
    const parentERC = `${ctx.ercPrefix}-${erc}`;
    const children = formFragmentBuilders.map((b) => b(ctx));

    return pageElement({
      externalReferenceCode: parentERC,
      pageElementDefinition: {
        formContainerConfig: {
          formContainerReference: {
            className: formContainerSubtypeClassName,
            type: "FormContainerClassSubtypeReference",
          },
          formContainerType,
          numberOfSteps,
        },
        indexed: true,
        type: "FormContainer",
      },
      pageElements: withPositions(bindParent(parentERC, children)),
    });
  };
}

export default formContainer;