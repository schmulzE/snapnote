"use client"

import { useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { Note } from '@/models/note';
import { addNoteToFavourite, deleteNote } from '@/actions/notes';

type GetAllNotesFunction = (page: number, limit?: number) => Promise<{
  notes: any;
  hasMore: boolean;
  totalNotes: number;
}>;
type GetNotesByFolderFunction = (page: number, limit: number | undefined, folderId: string) => Promise<{
  notes: any;
  hasMore: boolean;
  totalNotes: number;
}>;
type GetNotesByTagFunction = (page: number, limit: number | undefined, tagSlug: string) => Promise<{
  notes: any;
  hasMore: boolean;
  totalNotes: number;
}>;
type GetNotesBySearchFunction = (page: number, limit: number | undefined, query: string) => Promise<{
  notes: any;
  hasMore: boolean;
  totalNotes: number;
}>;

type FetchNotesFunction = GetAllNotesFunction | GetNotesByFolderFunction | GetNotesByTagFunction | GetNotesBySearchFunction;

export const useNotesViewer = (fetchNotes: FetchNotesFunction, tagSlug?: string, folderId?: string, query?: string) => {
  const router = useRouter();
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
        let result: any;
        if (tagSlug) {
          result = await (fetchNotes as GetNotesByTagFunction)(page, undefined, tagSlug);
        } else if (folderId) {
          result = await (fetchNotes as GetNotesByFolderFunction)(page, undefined, folderId);
        } else if (query) {
          result = await (fetchNotes as GetNotesBySearchFunction)(page, undefined, query);
        } else {
          result = await (fetchNotes as GetAllNotesFunction)(page, undefined);
        }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, fetchNotes, tagSlug, folderId, query]);

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

  const deleteNoteHandler = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      await deleteNote(id);
      toast.success('Note deleted successfully!');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete the note.');
    }
  };

  const toggleFavouriteNote = async (id: string) => {
    const noteIndex = notes.findIndex((note) => note._id === id);
    if (noteIndex === -1) return;

    const updatedNotes = [...notes];
    const note = updatedNotes[noteIndex];
    const updatedFavourite = !note.favourite;

    try {
      updatedNotes[noteIndex] = { ...note, favourite: updatedFavourite };
      setNotes(updatedNotes);
      await addNoteToFavourite(id, updatedFavourite);
    } catch (error) {
      toast.error('Failed to update favourite status.');
    }
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return {
    notes: processedNotes,
    isLoading,
    lastNoteElementRef,
    deleteNoteHandler,
    toggleFavouriteNote,
    toggleFilter,
    setNotes
  };
};