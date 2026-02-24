import config from '../util/configTreePath.js';

const updateDataSetErc = (bearerToken, {pageERC, dataSetERC}) => {

  console.log(`Calling ${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}`);
  return fetch(
    `${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        dataSetERC: dataSetERC
      })
    }
  ).then(response => {
    return response.json();
  }).then(json => {
    //console.log(json);
    return json;
  });
  
};

const updateObjectDefinitionInfo = (bearerToken, {pageERC, className, apiBasePath, restSchema}) => {

  console.log(`Calling ${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}`);
  return fetch(
    `${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        objectDefinitionClassName: className,
        apiBasePath,
        restSchema
      })
    }
  ).then(response => {
    return response.json();
  }).then(json => {
    //console.log(json);
    return json;
  });
  
};

export { updateDataSetErc, updateObjectDefinitionInfo }