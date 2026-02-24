import config from '../util/configTreePath.js';

const getFields = (bearerToken, {pageERC}) => {

    console.log(`Calling ${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}/entityListObjectFieldsRel`);
    return fetch(`${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/c/entitylistdisplaypages/by-external-reference-code/${pageERC}/entityListObjectFieldsRel`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        method: 'GET'
    }).then(response => {
        console.log(response);
        return response.json();
    }).then(json => {
        console.log(json);
        return json.items.map(item => ({
            fieldType: item.fieldType.key,
            fieldName: item.fieldName,
            fieldLabel: item.objectFieldLabel,
            dataSetDisplay: item.dataSetDisplayedField,
            formContainerDisplay: item.editableField
        }))
    });

};

export {getFields};