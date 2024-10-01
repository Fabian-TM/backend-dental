import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../schemas/User";
import Account from "../schemas/Account";

import {
  registerSchema,
  loginSchema,
} from "../utils/joi/auth/auth-validator";
import {
  generateBearerToken,
  generateResetToken,
  isTokenExpired,
  decodeToken,
} from "../utils/jwt";
const FRONTEND_URL = process.env.FRONTEND_URL;

export const register = async (req: Request, res: Response) => {
  try {
    const validationResult = registerSchema.validate(req.body);

    if (validationResult.error) {
      console.error({
        error: "Datos de registro no válidos",
        details: validationResult.error.details,
      });
      return res.status(400).json({ error: "Datos de registro no válidos" });
    }
    const { email, password, name, cellphone, dni, company, sex, accountType } =
      validationResult.value;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = new User({
      name,
      cellphone,
      dni,
      email,
      company,
      sex,
    });

    await newUser.save();

    const newAccount = new Account({
      userId: newUser._id,
      password: hashedPassword,
      newAccount: true,
      isRegistered: true,
      roles: ["user"].concat(accountType),
    });

    await newAccount.save();

    newUser.accountId = newAccount._id;

    await newUser.save();

    res.status(200).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.validate(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });

    if (validationResult.error) {
      console.error({
        error: "Datos de logeo no válidos",
        details: validationResult.error.details,
      });
      return res.status(400).json({ error: "Datos de logeo no válidos" });
    }
    const { email, password } = validationResult.value;

    const existingUser = await User.findOne(
      { email },
      "name email dni cellphone"
    );

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "El correo electrónico no está registrado" });
    }
    const account = await Account.findOne({ userId: existingUser._id });

    if (!account) {
      return res.status(404).json({ error: "No se encontro la cuenta." });
    }

    const passwordMatch = bcrypt.compareSync(password, account.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const token = generateBearerToken(existingUser._id, account.roles);

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        cellphone: existingUser.cellphone,
        dni: existingUser.dni,
        email: existingUser.email,
        sex: existingUser.sex,
        company: existingUser.company,
        roles: account.roles,
        accessToken: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar logear al usuario" });
  }
};