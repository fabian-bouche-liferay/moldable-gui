import config from '../util/configTreePath.js';

import {contentPagePayload} from '../builders/page/pageBuilder.js'

import grid from '../builders/page/elements/grid.js';
import module from '../builders/page/elements/module.js';
import basicFragmentFDS from '../builders/page/elements/fdsAdmin.js';
import formContainer from '../builders/page/elements/forms/formContainer.js';
import formTextField from '../builders/page/elements/forms/fields/formTextField.js';
import formDateField from '../builders/page/elements/forms/fields/formDateField.js';
import formSelectField from '../builders/page/elements/forms/fields/formSelectField.js';
import formSubmitButton from '../builders/page/elements/forms/formSubmitButton.js';
import dynamicDataSetWrapper from '../builders/page/elements/custom/dynamicDataSetWrapper.js';
import dynamicFormWrapper from '../builders/page/elements/custom/dynamicFormWrapper.js';

const SITE_ERC = "6e589355-ea3e-c049-b47b-31ef9b529c3f";

const DYNAMIC_DATA_SET_WRAPPER_FRAGMENT_ERC = 'fd1cfcc0-6223-1712-d3f2-8a516f10ccd2';
const DYNAMIC_FORM_WRAPPER_FRAGMENT_ERC = 'b31762a8-824e-8323-11c7-d4694c30ce6c';

const createPage = (bearerToken, {dataSetERC, objectDefinitionClassName, objectApiBasePath, fields = [], pageName, pageERC, friendlyURL, masterPageERC}) => {

    const GRID_VIEWPORTS = [
        { customCSS: "", gridViewportDefinition: { modulesPerRow: 2 }, id: "Desktop" },
        { customCSS: "", gridViewportDefinition: { modulesPerRow: 1 }, id: "LandscapeMobile" },
        { customCSS: "", gridViewportDefinition: {}, id: "PortraitMobile" },
        { customCSS: "", gridViewportDefinition: {}, id: "Tablet" },
    ];

    const MODULE_VIEWPORTS = [
        { id: "Desktop", moduleViewportDefinition: { size: 6 } },
        { id: "LandscapeMobile", moduleViewportDefinition: { size: 12 } },
    ];

    const buildFieldElement = (f) => {
        switch (f.fieldType) {
            case "Text":
                return formTextField({ fieldName: f.fieldName, label: f.fieldLabel });
            case "Select":
                return formSelectField({ fieldName: f.fieldName, label: f.fieldLabel });
            case "Date":
                return formDateField({ fieldName: f.fieldName, label: f.fieldLabel });
            default:
                throw new Error(`Unknown field type: ${f.fieldType}`);
        }
    };

    const formChildren = fields.map(buildFieldElement);

    const structure = grid(
        { erc: 'grid', gridViewports: GRID_VIEWPORTS, numberOfModules: 2 },

        module(
            { erc: 'module-left', moduleViewports: MODULE_VIEWPORTS },
            dynamicDataSetWrapper(
                {
                    erc: 'dynamic-data-set-wrapper',
                    fragmentItemERC: DYNAMIC_DATA_SET_WRAPPER_FRAGMENT_ERC,
                },
                basicFragmentFDS({ erc: 'fds', dataSetERC })
            )
        ),

        module(
            { erc: 'module-right', moduleViewports: MODULE_VIEWPORTS },
            dynamicFormWrapper(
                {
                    erc: 'dynamic-form-wrapper',
                    fragmentItemERC: DYNAMIC_FORM_WRAPPER_FRAGMENT_ERC,
                    objectAPIBasePath: `/o${objectApiBasePath}`
                },
                formContainer(
                    { erc: 'form', formContainerSubtypeClassName: objectDefinitionClassName },
                    ...formChildren,
                    formSubmitButton({ erc: 'submit' })
                )
            )
        )
    );

    const payload = contentPagePayload({
        sitePageERC: pageERC,
        friendlyUrl: friendlyURL,
        name: pageName,
        masterPageERC: masterPageERC,
        structureBuilder: structure,
    });

    console.log(`Calling ${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/headless-admin-site/v1.0/sites/${SITE_ERC}/site-pages/${pageERC}`);
    fetch(`${config['com.liferay.lxc.dxp.server.protocol']}://${config['com.liferay.lxc.dxp.mainDomain']}/o/headless-admin-site/v1.0/sites/${SITE_ERC}/site-pages/${pageERC}`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(payload)
    }).then(response => {
        return response.json();
    }).then(json => {
    });

}

export {createPage};