import NotePreviewClient from './NotePreview.client';
import { fetchServerNoteById } from '@/lib/api/serverApi';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>; 
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = await params; 

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn:() => fetchServerNoteById(id),
  }
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
