import { Router } from "express";
import validateJWT from "../middlewares/validate-jwt";
import { createPerson, deletePerson, filterPerson, getPerson } from "../controllers/person.controller";

const router = Router();

router.post('/', [validateJWT], createPerson);
router.get('/', [validateJWT], filterPerson);
router.get('/:personId', [validateJWT], getPerson);
router.delete('/:personId', [validateJWT], deletePerson);

export default router;