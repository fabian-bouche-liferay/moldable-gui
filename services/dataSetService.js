import config from '../util/configTreePath.js';

const buildDataSetPayload = (opts) => {
  const {
    dataSetERC,
    label,
    friendlyUrlPath,
    restApplication,
    restSchema,
    defaultLanguageId = "en_US",
    defaultItemsPerPage = 4,
    listOfItemsPerPage = "4, 8, 20, 40, 60",
    active = true,
    fields = []
  } = opts;

  const slugify = (s = "") =>
    s
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const friendlyUrlPathFinal = friendlyUrlPath ?? slugify(label ?? dataSetERC);

  const dataSetToDataSetTableSections = fields.map(f => ({
    defaultLanguageId,
    label_i18n: { [defaultLanguageId]: f.label ?? f.fieldName },
    renderer: f.renderer ?? "",
    fieldName: f.fieldName,
    rendererType: f.rendererType ?? "",
    active: f.active ?? true,
    label: f.label ?? f.fieldName,
    sortable: f.sortable ?? false,
    type: f.type ?? "string"
  }));

  const dataSetToDataSetSelectionFilters = fields
    .filter(f => !!f.filter)
    .map(f => ({
      defaultLanguageId,
      include: f.filter.include ?? true,
      label_i18n: { [defaultLanguageId]: f.filter.label ?? (f.label ?? f.fieldName) },
      fieldName: f.filter.fieldName,
      multiple: f.filter.multiple ?? false,
      active: f.filter.active ?? true,
      label: f.filter.label ?? (f.label ?? f.fieldName),
      preselectedValues: f.filter.preselectedValues ?? "[]",
      sourceType: f.filter.sourceType
    }));

  return {
    defaultLanguageId,
    externalReferenceCode: dataSetERC,
    friendlyUrlPath: friendlyUrlPathFinal,
    friendlyUrlPath_i18n: { [defaultLanguageId]: friendlyUrlPathFinal },
    defaultItemsPerPage,
    propsTransformer: "",
    restApplication,
    dataSetToDataSetSelectionFilters,
    dataSetToDataSetTableSections,
    description: "",
    dataSetToDataSetDateFilters: [],
    itemActionsOrder: "",
    dataSetToDataSetClientExtensionFilters: [],
    restSchema,
    additionalAPIURLParameters: "",
    active,
    dataSetToDataSetListSections: [],
    label,
    filtersOrder: "",
    dataSetToDataSetActions: [],
    defaultVisualizationMode: "",
    listOfItemsPerPage,
    sortsOrder: "",
    hideManagementBarInEmptyState: false,
    snapshotsEnabled: false,
    dataSetToDataSetSorts: [],
    restEndpoint: "/",
    creationActionsOrder: ""
  };
};

const createDataSet = (bearerToken, {
  dataSetERC,
  label,
  friendlyUrlPath,
  restApplication,
  restSchema,
  fields,
  defaultLanguageId,
  defaultItemsPerPage,
  listOfItemsPerPage,
  active
}) => {

  const payload = buildDataSetPayload({
    dataSetERC,
    label,
    friendlyUrlPath,
    restApplication,
    restSchema,
    fields,
    defaultLanguageId,
    defaultItemsPerPage,
    listOfItemsPerPage,
    active
  });

  return fetch(
    `${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/data-set-admin/data-sets/by-external-reference-code/${dataSetERC}`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(payload)
    }
  )
  .then(async response => {
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${JSON.stringify(data)}`);
    }
    return data;
  })
  .then(json => {
    console.log(json);
    return json;
  });
};

export { createDataSet };