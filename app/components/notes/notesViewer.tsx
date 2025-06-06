"use client"

import NoteList from './noteList';
import Toolbar from '../shared/toolbar';
import { useNotesViewer } from '@/hooks/useNotesViewer';

const NotesViewer = ({ title, folderName, isFavourite, folderId, fetchNotes, tagSlug, query }: {
  title: string,
  folderName?: string,
  isFavourite?: boolean,
  folderId?: string,
  tagSlug?: string,
  query?: string,
  fetchNotes: any,
}) => {
  const {
    notes,
    isLoading,
    lastNoteElementRef,
    deleteNoteHandler,
    toggleFavouriteNote,
    toggleFilter,
    setNotes
  } = useNotesViewer(fetchNotes, tagSlug, folderId, query);

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