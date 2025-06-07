"use client"

import NoteList from './noteList';
import Toolbar from '../shared/toolbar';
import { getNotes } from '@/actions/notes';
import { getNotesByTag } from '@/actions/notes';
import { getNotesBySearch } from '@/actions/notes';
import { getNotesByFolderId } from '@/actions/notes';
import { useNotesViewer } from '@/hooks/useNotesViewer';

const NotesViewer = ({ title, folderName, isFavourite, folderId, initialData, tagSlug, query }: {
  title: string,
  folderName?: string,
  isFavourite?: boolean,
  folderId?: string,
  tagSlug?: string,
  query?: string,
   initialData: {
    notes: any;
    hasMore: boolean;
    totalNotes: number;
  },
}) => {

   // Determine which fetch function to use for pagination
  const getFetchFunction = () => {
    if (folderId) return getNotesByFolderId;
    if (tagSlug) return getNotesByTag;
    if (query) return getNotesBySearch;
    return getNotes;
  };

   // Determine the additional param to pass
  const additionalParam = folderId || tagSlug || query;

  const {
    notes,
    isLoading,
    lastNoteElementRef,
    deleteNoteHandler,
    toggleFavouriteNote,
    toggleFilter,
    setNotes
  } = useNotesViewer(initialData, getFetchFunction(), additionalParam);

  return (
    <> 
      <Toolbar 
        title={title} 
        tag={''} 
        folderName={folderName} 
        id={folderId ?? ''} 
        isFavourite={isFavourite} 
        setState={setNotes as any}
        setFilterByNoTag={() => toggleFilter('noTag')}
        setFilterByFavorite={() => toggleFilter('favorite')}
        setSortByDate={() => toggleFilter('byDate')}
        setSortAlphabetically={() => toggleFilter('alphabetically')}
      />
      <NoteList 
        notes={notes}
        folderId={folderId}
        isLoading={isLoading}
        lastNoteElementRef={lastNoteElementRef}
        deleteNoteHandler={deleteNoteHandler}
        toggleFavouriteNote={toggleFavouriteNote}
      />
    </>
  );
};

export default NotesViewer;