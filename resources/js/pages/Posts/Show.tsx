import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { posts } from '@/routes';
import { Button } from '@/components/ui/button';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    post: Post;
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
}

export default function Show({ post, auth }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Posts',
            href: posts.index().url,
        },
        {
            title: post.title,
            href: posts.show({ post: post.id }).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={post.title} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header with Actions */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {post.title}
                    </h2>
                    {auth.user.id === post.user.id && (
                        <div className="flex space-x-2">
                            <Link href={`/posts/${post.id}/edit`}>
                                <Button variant="secondary">
                                    Edit
                                </Button>
                            </Link>
                            <Link
                                href={`/posts/${post.id}`}
                                method="delete"
                                as="button"
                                onClick={(e) => {
                                    if (!confirm('Are you sure you want to delete this post?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <Button variant="destructive">
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Post Content */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg p-6">
                    <div className="mb-6">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <span>By {post.user.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            {post.created_at !== post.updated_at && (
                                <>
                                    <span className="mx-2">•</span>
                                    <span>Updated {new Date(post.updated_at).toLocaleDateString()}</span>
                                </>
                            )}
                        </div>
                        
                        <div className="prose max-w-none dark:prose-invert">
                            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                                {post.content}
                            </div>
                        </div>
                    </div>

                    <div className="border-t dark:border-gray-700 pt-4">
                        <Link
                            href="/posts"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            ← Back to Posts
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}