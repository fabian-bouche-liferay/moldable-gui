import config from '../util/configTreePath.js';

const getFields = (bearerToken, {pageERC}) => {

    return fetch(`${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}/entityListObjectFieldsRel`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        method: 'GET'
    }).then(response => {
        return response.json();
    }).then(json => {
        return json.items.map(item => ({
            fieldType: item.fieldType.key,
            fieldName: item.fieldName,
            fieldLabel: item.objectFieldLabel
        }))
    });

};

export {getFields};