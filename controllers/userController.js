import prisma from "../utils/prisma.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, membership_type } = req.body;

    // Add the user to the db
    const user = await prisma.users.create({
      data: { name, email, membership_type: membership_type.toUpperCase() },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getTransactionHistory = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    // Fetch user's transaction history
    const transactions = await prisma.transactions.findMany({
      where: { user_id: userId },
      include: { Book: true },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
