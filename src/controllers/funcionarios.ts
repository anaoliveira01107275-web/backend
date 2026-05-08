import { Request, Response } from "express"; 
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import {handleError} from "../helpers/handleError";
import jwt from "jsonwebtoken";



export default {
    login: async (request: Request, response: Response) => {
        try{
            const {email, senha} = request.body;

            const employees = await prisma.funcionarios.findUnique({
                where:{
                email,
               
                },
            });

            if (!employees ||  !bcrypt.compareSync(senha, employees.senha)) {
                return response.status(404).json("Email e/ou senha inválidos");
            }

            const token = jwt.sign(employees, process.env.JWT_SECRET!, {expiresIn: "1d"}) 

            return response.status(200).json({access_token: token});

        }catch(e) {
            return handleError(e, response);
        }

    },
    list: async (request: Request, response: Response) => {
    try {
        const employees = await prisma.funcionarios.findMany();
        return response.status(200).json(employees);

    } catch (e) {
        return handleError(e, response);
    }
},

    create: async (request: Request, response: Response) => { 
        try {
            const { nome, senha, email, admin, user } = request.body;

            if(!user.admin){
                return response.status(403).json("Não autorizado");

            }

            if(nome || !email || senha) {
                return response.status(400).json("Dados do funcionário incompletos");
            }



            const employees = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                    admin
                },
            });
            return response.status(201).json(employees);
        } catch (e) {
            return handleError(e, response);
           
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, admin, email, user } = request.body;

            if(!user.admin && user.id !== +id) {
                return response.status(403).json("Não autorizado");
            }

            
            const employees = await prisma.funcionarios.update({


                where: { id: +id },
                data: {
                    nome,
                    email,
                    admin: user.admin ? admin: false,
                },
            });
            return response.status(200).json(employees);
        } catch (e) {
            return handleError(e, response);
            
        
        }
    },
    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params; 
            const employees = await prisma.funcionarios.findUnique({ 
                where: { 
                    id: +id 
                },
            });
            return response.status(200).json(employees) 
        } catch (e) {
            return handleError(e, response);
            
            
            }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const {user}   = request.body;

            if(!user.admin)
                return response.status(403).json("Não autorizado");
            const employees = await prisma.funcionarios.delete({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(employees);

        } catch (e) {
            return handleError(e, response);
            
        }

    },


    


};