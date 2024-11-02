import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import UserService from '../service/UserService';

const prisma = new PrismaClient();

export const fetchUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    response.status(200).json({ status: 200, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const showUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const userId = Number(request.params.id);

    const user = await UserService.getById(userId);

    if (!user) {
      response.status(404).json({ status: 404, message: "User not found." });
    }

    response.status(200).json({ status: 200, data: user });
  } catch (error) {
    console.error("Error showing user:", error);
    response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const createUser = async (request: Request, response: Response): Promise<void> => {
  console.log("Create User route accessed");
  try {
    const { name, email } = request.body;

    const newUser = await UserService.createUser(name, email);    

    response.status(201).json({ status: 201, data: newUser, message: "User created." });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.message == 'Email already exists'){
      response.status(400).json({ status: 400, message: "Email already exists. Please use another email." });
    }

    response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const userId = Number(request.params.id);
    const { name, email } = request.body;

    const updatedUser = await UserService.updateUser(userId, name, email);

    response.status(200).json({ status: 200, data: updatedUser, message: "User updated successfully" });
  } catch (error: any) {
    console.error("Error updating user:", error);

    if (error.message == "Email already exists."){
      response.status(400).json({ status: 400, message: "Email already exists. Please use another email."})
    }

    response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const deleteUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const userId = Number(request.params.id);

    const user = await UserService.getById(userId);

    if (!user) {
      response.status(404).json({ status: 404, message: "User not found." });
    }

    await UserService.deleteUser(userId);

    response.status(200).json({ status: 200, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
