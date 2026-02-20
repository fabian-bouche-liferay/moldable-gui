/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import express from 'express';

import config from './util/configTreePath.js';

import {
	corsWithReady,
	liferayJWT,
} from './util/liferay-oauth2-resource-server.js';

import {logger} from './util/logger.js';

import { createPage } from './services/pageCreationService.js';
import { getFields } from './services/fieldsService.js';

const serverPort = config['server.port'];
const app = express();

logger.log(`config: ${JSON.stringify(config, null, '\t')}`);

app.use(express.json());
app.use(corsWithReady);
app.use(liferayJWT);

app.get(config.readyPath, (req, res) => {
	res.send('READY');
});

app.post('/page/action/create', async (req, res) => {

	const [, bearerToken] = req.headers.authorization.split('Bearer ');

	const body = req.body;

	const groupId = body.groupId;
	const entryClassName = body.entryClassName;

	res.status(200).send();

	console.log(body);

    const pageERC = body.objectEntry.externalReferenceCode;
	const friendlyURL = body.objectEntry.values.friendlyURL;
    const pageName = body.objectEntry.values.title;
    const masterPageERC = body.objectEntry.values.masterPageERC;

	const objectDefinitionClassName = body.objectEntry.values.objectDefinitionClassName;
	const dataSetERC = body.objectEntry.values.dataSetERC;

	const fields = await getFields(bearerToken, {
		pageERC: pageERC
	});

	console.log(fields);

	createPage(bearerToken, {
		dataSetERC: dataSetERC,
		objectDefinitionClassName: objectDefinitionClassName,
		pageName: pageName,
		pageERC: pageERC,
		friendlyURL: friendlyURL,
		objectApiBasePath: '/o/c/industrycontracts',
		masterPageERC: masterPageERC,
		fields: fields
	});

});

app.listen(serverPort, () => {
	logger.log(`App listening on ${serverPort}`);
});

export default app;