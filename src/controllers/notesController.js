// src/controllers/notesController.js
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;
  const userId = req.user._id;

  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * perPageNumber;

  let query = Note.find().where('userId').equals(userId);

  if (tag) {
    query = query.where('tag').equals(tag);
  }

  if (search) {
    query = query.or([
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ]);
  }

  const [notes, totalNotes] = await Promise.all([
    query.clone().skip(skip).limit(perPageNumber),
    query.clone().countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Retrieved note by ID',
    data: note,
  });
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({
    message: 'Note created successfully',
    data: note,
  });
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Note deleted successfully',
    data: note,
  });
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const userId = req.user._id;

  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Note updated successfully',
    data: note,
  });
};
