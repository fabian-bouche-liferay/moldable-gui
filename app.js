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
import { createDataSet, updateDataSetErc } from './services/dataSetService.js';

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

	//console.log(body);

	const { objectEntry } = body;

	const pageERC = objectEntry.externalReferenceCode;

	const {
		friendlyURL,
		title: pageName,
		masterPageERC,
		apiBasePath,
		restSchema,
		objectDefinitionClassName,
		dataSetERC: existingDataSetERC,
	} = objectEntry.values;

	const fields = await getFields(bearerToken, { pageERC });
	console.log("#####")
	console.log(fields);
	console.log("#####")

	const finalDataSetERC = existingDataSetERC != "" ? existingDataSetERC : `${pageERC}_DATASET`;

	if (!existingDataSetERC) {
		
		const created = await createDataSet(bearerToken, {
			dataSetERC: finalDataSetERC,
			label: `[GENERATED] ${finalDataSetERC}`,
			friendlyUrlPath: friendlyURL,
			restApplication: apiBasePath,
			active: true,
			defaultItemsPerPage: 4,
			defaultLanguageId: "en_US",
			fields,
			listOfItemsPerPage: "4, 8, 20",
			restSchema,
		});

		await updateDataSetErc(bearerToken, {
			pageERC: pageERC,
			dataSetERC: finalDataSetERC,
		})

		console.log(created);
	}

	await createPage(bearerToken, {
		dataSetERC: finalDataSetERC,
		objectDefinitionClassName,
		pageName,
		pageERC,
		friendlyURL,
		objectApiBasePath: apiBasePath,
		masterPageERC,
		fields,
	});
});

app.listen(serverPort, () => {
	logger.log(`App listening on ${serverPort}`);
});

export default app;