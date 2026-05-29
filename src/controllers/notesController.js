// src/controllers/notesController.js
import createHttpError from 'http-errors';
import { Note } from '../models/Note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({
    message: 'Retrieved all notes',
    data: notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Retrieved note by ID',
    data: note,
  });
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json({
    message: 'Note created successfully',
    data: note,
  });
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

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
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
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
