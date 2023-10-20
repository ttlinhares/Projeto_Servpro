import { Router } from "express";
import servproController from "../controllers/servproController.js";
const router = Router();

router.get("/", servproController.novousuario);
router.post("/novo", servproController.cadastrousuario);
router.get("/login", servproController.login);
router.get("/logon", servproController.cadtemp);
router.post("/cadastrar-servico", servproController.cadserv);
router.get("/home", servproController.home);
//router.get("/", cadAlunosController.index);
//router.get("/cadastrar", cadAlunosController.create);
//router.post("/gravar", cadAlunosController.storage);

export default router
