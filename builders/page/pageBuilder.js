function pageSpecification({ specERC, status, masterPageERC, experienceERC, rootElementBuilder }) {
  const ctx = {
    ercPrefix: specERC,
  };

  return {
    externalReferenceCode: specERC,
    type: "ContentPageSpecification",
    status,
    ...(masterPageERC
      ? { settings: { masterPageItemExternalReference: { externalReferenceCode: masterPageERC } } }
      : {}),
    pageExperiences: [
      {
        key: "DEFAULT",
        externalReferenceCode: experienceERC,
        priority: 0,
        name_i18n: { "en-US": "Default" },
        pageElements: [rootElementBuilder(ctx)],
      },
    ],
  };
}

function contentPagePayload({
  sitePageERC,
  friendlyUrl,
  name,
  masterPageERC,
  structureBuilder,
}) {
  const publishedSpecERC = sitePageERC;
  const draftSpecERC = `${sitePageERC}-draft`;

  return {
    availableLanguages: ["en-US"],
    externalReferenceCode: sitePageERC,
    friendlyUrlPath_i18n: { "en-US": friendlyUrl },
    name_i18n: { "en-US": name },
    pageSettings: {
      hiddenFromNavigation: false,
      priority: 0,
      type: "ContentPageSettings",
    },
    pageSpecifications: [
      {
        ...pageSpecification({
          specERC: publishedSpecERC,
          status: "Approved",
          masterPageERC,
          experienceERC: `${sitePageERC}-default`,
          rootElementBuilder: structureBuilder,
        }),
        draftContentPageSpecificationExternalReferenceCode: draftSpecERC,
      },
      pageSpecification({
        specERC: draftSpecERC,
        status: "Approved",
        masterPageERC,
        experienceERC: `${draftSpecERC}-default`,
        rootElementBuilder: structureBuilder,
      }),
    ],
    viewableBy: "Anyone",
    type: "ContentPage",
  };
}

export {contentPagePayload};