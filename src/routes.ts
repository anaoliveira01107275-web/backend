import { Router } from "express";

import { authentication } from "./middlewares/authentication";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import funcionariosController from "./controllers/funcionarios";

const routes = Router();

routes.get("/", (request, response) =>
    response.status(200).json({ success: true })
);




routes.get("/alunos", authentication, alunosController.list);
routes.get("/alunos/:id", authentication, alunosController.getById);
routes.post("/alunos", authentication, alunosController.create);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);
routes.post("/matriculas", authentication, alunosController.matricular);
routes.delete("/matriculas", authentication, alunosController.desmatricular);

routes.get("/cursos", authentication, cursosController.list);
routes.get("/cursos/:id", authentication, cursosController.getById);
routes.post("/cursos", authentication, cursosController.create);
routes.put("/cursos/:id", authentication, cursosController.update);
routes.delete("/cursos/:id", authentication, cursosController.delete);

routes.post("/funcionarios/login", funcionariosController.login);
routes.get("/funcionarios", authentication, funcionariosController.list);
routes.get("/funcionarios/:id", authentication, funcionariosController.getById);
routes.post("/funcionarios", authentication, funcionariosController.create);
routes.put("/funcionarios/:id", authentication, funcionariosController.update);
routes.delete("/fumcionarios/:id", authentication, funcionariosController.delete);

export default routes;