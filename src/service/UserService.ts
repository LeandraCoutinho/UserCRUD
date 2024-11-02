import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService{
    async getAllUsers(){
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
        })
    } 

    async getById(id: number){
        const user = await prisma.user.findUnique({ where: { id }});
        if (!user){
            throw new Error("User not found");
        }

        return user;
    }
    
    async createUser(name: string, email: string){
        const existingUser = await prisma.user.findUnique({ where: {email} });
        if (existingUser){
            throw new Error("Email already exists");
        }

        return await prisma.user.create({ data: { name, email }});
    }

    async updateUser(id: number, name: string, email: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user){
            throw new Error("User not found.");
        }

        const userEmailExists = await prisma.user.findFirst({
            where: { email }
        });

        if (userEmailExists && userEmailExists.id !== id){
            throw new Error("Email already exists.");
        }

        return await prisma.user.update({
            where: { id },
            data: { name, email },
        });
    }

    async deleteUser(id: number) {
        const user = await prisma.user.findUnique ({ where: {id} });
        if (!user){
            throw new Error("User not found");
        }

        return await prisma.user.delete({ where: { id }});
    }
}

export default new UserService;



