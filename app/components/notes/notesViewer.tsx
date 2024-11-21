"use client"

import { toast } from 'sonner';
import NoteList from './noteList';
import { Note } from '@/models/note';
import Toolbar from '../shared/toolbar';
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect, useRef } from 'react';
import { addNoteToFavourite, deleteNote } from '@/actions/notes';

const NotesViewer = ({ title, folderName, isFavourite, folderId, fetchNotes, tagSlug }: {
  title: string,
  folderName?: string,
  isFavourite?: boolean,
  folderId?: string,
  fetchNotes:  (page?: number, limit?: number, tagSlug?: string) => Promise<{
    notes: any;
    hasMore: boolean;
    totalNotes: number;
  }>,
  tagSlug?: string
}) => {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    favorite: false,
    noTag: false,
    byDate: false,
    alphabetically: false
  });

  const initialLoadRef = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastNoteElementRef = useCallback((node: HTMLLIElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      return;
    }

    let mounted = true;

    const loadNotes = async () => {
      if (isLoading) return;
      setIsLoading(true);

      try {
        const result = await fetchNotes(page, undefined ,tagSlug);
        if (mounted) {
          setNotes(prev => [...prev, ...result.notes]);
          setHasMore(result.hasMore);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadNotes();

    return () => {
      mounted = false;
    };
  }, [page, fetchNotes, tagSlug]);

  const processedNotes = notes.filter(note => {
    if (filters.favorite && !note.favourite) return false;
    if (filters.noTag && note.tag) return false;
    return true;
  }).sort((a, b) => {
    if (filters.byDate) {
      return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
    }
    if (filters.alphabetically) {
      return a.title!.localeCompare(b.title!);
    }
    return 0;
  });

  const deleteNoteHandler = async(id: string) => {
    if(confirm('Are you sure want to delete') === true) {
      setNotes(notes.filter(note => note._id !== id));
      await deleteNote(id)
      toast.success('Note deleted successfully!'); 
      router.refresh();
      router.push('/notes');
    }
  }

  const toggleFavouriteNote = async(id: string) => {
    const note = notes.find((note) => note._id === id) as Note;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, favourite: !note.favourite } : note
      )
    );
    await addNoteToFavourite(id, !note.favourite)
  }

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <> 
      <Toolbar 
        title={title} 
        tag={''} 
        folderName={folderName} 
        id={folderId!} 
        isFavourite={isFavourite} 
        setState={setNotes as any}
        setFilterByNoTag={() => toggleFilter('noTag')}
        setFilterByFavorite={() => toggleFilter('favorite')}
        setSortByDate={() => toggleFilter('byDate')}
        setSortAlphabetically={() => toggleFilter('alphabetically')}
      />
      <NoteList 
        notes={processedNotes}
        folderId={folderId}
        lastNoteElementRef={lastNoteElementRef}
        deleteNoteHandler={deleteNoteHandler}
        toggleFavouriteNote={toggleFavouriteNote}
      />
    </>
  );
};

export default NotesViewer;