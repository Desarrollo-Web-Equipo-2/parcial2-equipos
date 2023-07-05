import { Router } from "express";
import { createCompany, deleteCompany, getAllCompanies, getCompany } from "../controllers/company.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post('/', [validateJWT], createCompany);
router.get('/', [validateJWT], getAllCompanies);
router.get('/:companyId', [validateJWT], getCompany);
router.delete('/:companyId', [validateJWT], deleteCompany);

export default router;