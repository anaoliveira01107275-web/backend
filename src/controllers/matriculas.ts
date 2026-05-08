import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleError } from "../helpers/handleError";

export default {
    create: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { cursosId } = request.body;

            const student = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        connect: cursosId.map((cursoId: number) => ({
                            id: cursoId
                        }))
                    },
                },
                include: {
                    cursos: true,
                },
            });

            return response.status(200).json(student);

        } catch (error) {
            return handleError(error, response);
        }
    }
};