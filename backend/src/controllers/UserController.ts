import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, phone, walletAddress } = req.body;

  try {
    const newUser = new User({ name, email, phone, walletAddress });
    await newUser.save();
    res.status(201).json({
      data: newUser,
      status: true,
      statusCode: 201,
      message: "User account created successfully.",
    });
  } catch (error: any) {
    console.log({ error });
    if (error.code === 11000) {
      // Extract the field that caused the duplicate key error
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];

      // Create a user-friendly message
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } ${value} already exists. Please use a different value.`;

      // Send the response with a 400 status code
      return res.status(400).json({
        data: [],
        status: false,
        statusCode: 400,
        message,
      });
    } else {
      res.status(400).json({
        data: [],
        status: false,
        statusCode: 400,
        message: error.message,
      });
    }
  }
};

export const getUserByWallet = async (req: Request, res: Response) => {
  const { walletAddress } = req.params;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({
        data: [],
        status: false,
        statusCode: 404,
        message: "User not found.",
      });
    }
    res.status(200).json({
      data: user,
      status: true,
      statusCode: 200,
      message: "User retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      status: false,
      statusCode: 500,
      message: "An error occurred while retrieving the user.",
    });
  }
};

export const updateUserByWallet = async (req: Request, res: Response) => {
  const { walletAddress } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ walletAddress }, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        data: [],
        status: false,
        statusCode: 404,
        message: "User not found.",
      });
    }
    res.status(200).json({
      data: user,
      status: true,
      statusCode: 200,
      message: "User updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      data: [],
      status: false,
      statusCode: 400,
      message: "An error occurred while updating the user.",
    });
  }
};
