import { Suspense } from 'react';
import NoteViewer from './notesViewer';
import { Spinner } from '@nextui-org/react';

export default async function NotesFetcher({
  title,
  folderName,
  isFavourite,
  fetchFunction,
  folderId,
  tagSlug,
  query
}: {
  title: string;
  folderName?: string;
  isFavourite?: boolean;
  fetchFunction: (page: number, limit?: number, additionalParam?: string) => Promise<{
    notes: any;
    hasMore: boolean;
    totalNotes: number;
  }>;
  folderId?: string;
  tagSlug?: string;
  query?: string;
}) {
  // Fetch initial data
  const initialData = await fetchFunction(1, 9, folderId || tagSlug || query);

  return (
    <Suspense fallback={
      <div className='flex justify-center h-full content-center'>
        <Spinner label="Loading..." color="default" labelColor="foreground"/>
      </div>
    }>
      <NoteViewer 
        initialData={initialData}
        title={title}
        folderName={folderName}
        isFavourite={isFavourite}
        folderId={folderId}
        tagSlug={tagSlug}
        query={query}
      />
    </Suspense>
  );
}