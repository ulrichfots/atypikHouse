import prisma from "@/app/libs/prisma";
import { Request, Response } from "express";

// Récupérer tous les chats pour un utilisateur
export const getChats = async (req: Request, res: Response) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
      },
    });

    const chatsWithReceivers = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

        if (receiverId) {
          const receiver = await prisma.user.findUnique({
            where: {
              id: receiverId,
            },
            select: {
              id: true,
              name: true,
              image: true,
            },
          });
          return { ...chat, receiver };
        }
        return chat;
      })
    );

    res.status(200).json(chatsWithReceivers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// Récupérer un chat spécifique
export const getChat = async (req: Request, res: Response) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (chat) {
      await prisma.chat.update({
        where: {
          id: req.params.id,
        },
        data: {
          seenBy: {
            push: tokenUserId,
          },
        },
      });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// Ajouter un nouveau chat
export const addChat = async (req: Request, res: Response) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

// Marquer un chat comme lu
export const readChat = async (req: Request, res: Response) => {
  const tokenUserId = req.userId;

  if (!tokenUserId) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

// Ajouter un nouveau message
export const addMessage = async (req: Request, res: Response) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const content = req.body.text;

  if (!tokenUserId) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const receiverId = chat.userIDs.find(id => id !== tokenUserId);

    if (!receiverId) {
      return res.status(400).json({ message: "Invalid chat" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        chatId,
        senderId: tokenUserId,
        receiverId: receiverId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: content,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Message not sent!" });
  }
};
