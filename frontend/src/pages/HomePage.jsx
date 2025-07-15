import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import api from "../libs/axios.js"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimit(false);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimit />}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
        {isLoading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimit && <NotesNotFound />}

        {notes.length > 0 && !isRateLimit && 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => 
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          )}
        </div>
        }

      </div>
    </div>
  );
};

export default HomePage;
