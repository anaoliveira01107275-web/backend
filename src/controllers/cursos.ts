import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client";
import {handleError} from "../helpers/handleError";

export default {

    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.cursos.findMany();
            return response.status(200).json(users);
        } catch (e) {
           return handleError(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, professor, cargaHoraria, descricao } = request.body;

            if(!nome || !cargaHoraria || !descricao ){
                return response.status(400).json("Dados do curso Incompletos");
            }
            const user = await prisma.cursos.create({
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao
                },
            });
            return response.status(201).json(user);
        } catch (e: any) {
            return handleError(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, professor, cargaHoraria, descricao } = request.body;
            const user = await prisma.cursos.update({
                where: { id: +id },
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao
                },
            });
            return response.status(200).json(user);
        } catch (e) {
            return handleError(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.cursos.findUnique({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(user)
        } catch (e) {
            return handleError(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.cursos.delete({
                where: {
                    id: +id
                }
            });
            return response.status(200).json(user);
        } catch (e) {
            return handleError(e, response);
        }
    }
};