import express from "express";
import cors from "cors";
import { loadBackend_professionalorganisations_v1 } from "./APIs/professionalorganisations-stats-v1.js";
import { loadBackend_professionalorganisations_v2 } from "./APIs/professionalorganisations-stats-v2.js";

import { handler } from "./frontend/build/handler.js";
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Constants
 */

const PORT = 8080;

/**
 * Load APIs
 * */

loadBackend_professionalorganisations_v1(app);
loadBackend_professionalorganisations_v2(app);

app.use(handler);

/**
 * Initialization
 */

app.listen(PORT);