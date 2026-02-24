import config from '../util/configTreePath.js';

const getObjectDefinitionInfo = (bearerToken, objectDefinitionERC) => {

    console.log(`${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/object-admin/v1.0/object-definitions/by-external-reference-code/${objectDefinitionERC}`)
    return fetch(`${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/object-admin/v1.0/object-definitions/by-external-reference-code/${objectDefinitionERC}`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        method: 'GET'
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(json => {
        console.log(json);
        return {
            className: json.className,
            apiBasePath: json.restContextPath.split('/o')[1],
            restSchema: json.name
        }
    });    

};

export {getObjectDefinitionInfo};