import { Request, Response } from 'express';
import UserService from '../service/UserService';

export const fetchUsers = async (request: Request, response: Response): Promise<Response> => {
  try {
    const users = await UserService.getAllUsers();
    return response.status(200).json({ status: 200, data: users });
  } catch (error) {
    return response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const showUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const userId: number = Number(request.params.id);
    const user = await UserService.getById(userId);

    return response.status(200).json({ status: 200, data: user });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return response.status(404).json({ status: 404, message: "User not found." });
    }

    return response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const createUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { name, email } = request.body;
    const newUser = await UserService.createUser(name, email);    

    return response.status(201).json({ status: 201, data: newUser, message: "User created." });
  } catch (error) {
    if (error instanceof Error && error.message == 'Email already exists'){
      return response.status(400).json({ status: 400, message: "Email already exists. Please use another email." });
    }

    return response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const updateUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const userId: number = Number(request.params.id);
    const { name, email } = request.body;

    const updatedUser = await UserService.updateUser(userId, name, email);

    return response.status(200).json({ status: 200, data: updatedUser, message: "User updated successfully" });
  } catch (error) {
    if (error instanceof Error && error.message == "User not found."){
      return response.status(404).json({ status: 404, message: "User not found."})
    }

    if (error instanceof Error && error.message == "Email already exists."){
      return response.status(400).json({ status: 400, message: "Email already exists. Please use another email."})
    }

    return response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

export const deleteUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const userId: number = Number(request.params.id);

    await UserService.deleteUser(userId);

    return response.status(200).json({ status: 200, message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return response.status(404).json({ status: 404, message: "User not found." });
    }

    return response.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
