import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, mood } = req.body;

        if (!userId || !mood) {
            return res.status(400).json({ error: 'Missing userId or mood' });
        }

        try {
            // Get the current date (without the time part)
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            const newMood = await prisma.moodUser.upsert({
                where: {
                    userId_createdAt: {
                        userId: parseInt(userId, 10),
                        createdAt: currentDate,
                    },
                },
                update: {
                    mood,
                },
                create: {
                    userId: parseInt(userId, 10),
                    mood,
                    createdAt: currentDate,
                },
            });
            return res.status(201).json(newMood);
        } catch (error) {
            console.error('Error saving mood:', error);
            return res.status(500).json({ error: 'Error saving mood' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
