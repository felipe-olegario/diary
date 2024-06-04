// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, phone, document } = req.body;

    // Verifique se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    // Hash a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crie um novo usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        document,
        password: hashedPassword,
      },
    });

    res.status(201).json({ user });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
