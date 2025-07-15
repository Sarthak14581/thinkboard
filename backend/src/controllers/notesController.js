import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}); //show the newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in get all notes controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);

    const newNote = new Note({ title: title, content: content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in create note controller controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in update controller controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  const {id} = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete({_id: id});

     if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });


    res.status(200).json({ message: "note deleted successfully", deletedNote});
  } catch (error) {
    console.error("Error in delete controller controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
};

export const getNoteById = async (req, res) => {
  const {id} = req.params;

  try {
    const note = await Note.findById({_id: id});

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}