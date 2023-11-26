import { Router } from "express";
import servproController from "../controllers/servproController.js";
const router = Router();

router.get("/", servproController.novousuario);
router.post("/novo", servproController.cadastrousuario);
router.get("/login", servproController.login);
router.post("/logon", servproController.logon);
router.post("/cserv", servproController.cadserv);
router.get("/cadastrarservico", servproController.cadastrarservico);
router.get("/excluir-servico/:id", servproController.excluirservico);
router.get("/editar-servico/:id", servproController.editarservico);
router.post("/update-servico/:id", servproController.updateservico);
router.get("/editar-usuario/:id", servproController.editarusuario);
router.post("/salvar-usuario/:id", servproController.salvarusuario);
router.get("/home", servproController.home);
router.get("/logout", servproController.logout);
export default router
