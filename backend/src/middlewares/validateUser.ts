import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, walletAddress } = req.body;
  if (!name || !email || !phone || !walletAddress) {
    return res
      .status(400)
      .json({
        data: [],
        status: false,
        statusCode: 400,
        message: "Invalid form data, please enter all fields.",
      });
  }
  next();
};
