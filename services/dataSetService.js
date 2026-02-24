import config from '../util/configTreePath.js';

const FIELD_TYPE_RENDER_MAPPING = new Map([
  ["Assignee", "default"],
  ["Aggregation", "default"],
  ["Attachment", "default"],
  ["AutoIncrement", "default"],
  ["Boolean", "label"],
  ["Date", "date"],
  ["DateTime", "dateTime"],
  ["Decimal", "default"],
  ["Encrypted", "default"],
  ["Formula", "default"],
  ["Integer", "default"],
  ["LongInteger", "default"],
  ["LongText", "default"],
  ["MultiselectPicklist", "label"],
  ["Picklist", "label"],
  ["PrecisionDecimal", "default"],
  ["Relationship", "label"],
  ["RichText", "default"],
  ["Text", "default"]
]);

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

  console.log("++++")
  console.log(fields);
  console.log("++++")

  const dataSetToDataSetTableSections = fields.filter(f => f.dataSetDisplay).map(f => ({
    defaultLanguageId,
    label_i18n: { [defaultLanguageId]: f.fieldLabel ?? f.fieldName },
    renderer: f.renderer ?? FIELD_TYPE_RENDER_MAPPING.get(f.fieldType) ?? "label",
    fieldName: f.fieldType == "Select" ? `${f.fieldName}.name`  : f.fieldName,
    rendererType: f.rendererType ?? "internal",
    active: f.active ?? true,
    label: f.fieldLabel ?? f.fieldName,
    sortable: f.sortable ?? false,
    type: /*f.fieldType ??*/ "string"
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
      label: f.filter.fieldLabel ?? (f.fieldLabel ?? f.fieldName),
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

  /*

  console.log("------------------");
  console.log(JSON.stringify(payload));
  console.log("------------------");

*/

  console.log(`Calling ${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/data-set-admin/data-sets/by-external-reference-code/${dataSetERC}`);
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
    return json;
  });
};

export { createDataSet };