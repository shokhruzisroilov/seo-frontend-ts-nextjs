import ClapButton from '@/components/ClapButton';
import { delay } from '@/lib/utils';
import { BlogPost } from '@/models/BlogPost';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { postId } = await params;

  try {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`);

    if (!response.ok) {
      return {
        title: 'Post Not Found',
      };
    }

    const post: BlogPost = await response.json();

    return {
      title: post.title,
      description: post.body,
    };
  } catch (error) {
    return {
      title: 'Error Loading Post',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { postId } = await params;

  try {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`);

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch post');
    }

    const { title, body }: BlogPost = await response.json();

    await delay(6000);

    return (
      <article className="max-w-prose m-auto space-y-5">
        <h1 className="text-3xl text-center font-bold">{title}</h1>
        <p className="text-lg">{body}</p>
        <ClapButton />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
