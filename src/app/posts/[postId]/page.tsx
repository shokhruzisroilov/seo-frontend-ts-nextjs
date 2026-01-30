import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Blog ',
}

import { delay } from '@/lib/utils'
import { BlogPost } from '@/models/BlogPost'

interface BlogPostPageProps {
	params: Promise<{ postId: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { postId } = await params

	const response = await fetch(`https://dummyjson.com/posts/${postId}`)
	const { title, body }: BlogPost = await response.json()

	await delay(1000)

	return (
		<article className='max-w-prose m-auto space-y-5'>
			<h1 className='text-3xl text-center font-bold'>{title}</h1>
			<p className='text-lg'>{body}</p>
		</article>
	)
}
