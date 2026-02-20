
function withPositions(children = []) {
  return children.map((c, idx) => ({ ...c, position: idx }));
}

function bindParent(parentERC, children = []) {
  return children.map((c) => {
    const current = c.parentExternalReferenceCode;

    const shouldSetParent =
      current == null || current === "";

    return {
      ...c,
      parentExternalReferenceCode: shouldSetParent ? (parentERC ?? "") : current,
    };
  });
}

function pageElement({ externalReferenceCode, parentExternalReferenceCode, pageElementDefinition, pageElements = [], position }) {
  return {
    externalReferenceCode,
    parentExternalReferenceCode,
    pageElementDefinition,
    pageElements,
    ...(position != null ? { position } : {}),
  };
}

export {pageElement, withPositions, bindParent};