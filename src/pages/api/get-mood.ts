import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        // Get the current date (without the time part)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const moodEntry = await prisma.moodUser.findUnique({
            where: {
                userId_createdAt: {
                    userId: parseInt(userId as string, 10),
                    createdAt: currentDate,
                },
            },
        });

        if (!moodEntry) {
            return res.status(404).json({ error: 'Mood entry not found for today' });
        }

        return res.status(200).json(moodEntry);
    } catch (error) {
        console.error('Error retrieving mood:', error);
        return res.status(500).json({ error: 'Error retrieving mood' });
    }
}
