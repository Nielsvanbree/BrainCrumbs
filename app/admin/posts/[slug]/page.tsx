import { postsDb } from '@/lib/posts-db';
import PostEditor from '@/components/admin/PostEditor';
import { notFound } from 'next/navigation';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const post = await postsDb.getBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Prepare data for the editor ensuring all required fields exist
  const initialPost = {
    ...post,
    content: post.content || '',
    isDeepCrumb: post.isDeepCrumb || false,
  };

  return <PostEditor initialPost={initialPost} />;
}