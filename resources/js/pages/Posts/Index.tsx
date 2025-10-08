import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { posts } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: posts.index().url,
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    posts: Post[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
}

export default function Index({ posts, auth }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header with Create Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        All Posts
                    </h2>
                    <Link
                        href="/posts/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create Post
                    </Link>
                </div>

                {/* Posts List */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg p-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">No posts found.</p>
                            <Link
                                href="/posts/create"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                            >
                                Create your first post
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            <Link
                                                href={`/posts/${post.id}`}
                                                className="hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {post.title}
                                            </Link>
                                        </h3>
                                        {auth.user.id === post.user.id && (
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/posts/${post.id}/edit`}
                                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={`/posts/${post.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                                                    onClick={(e) => {
                                                        if (!confirm('Are you sure you want to delete this post?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                                        {post.content.substring(0, 200)}
                                        {post.content.length > 200 && '...'}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                        <span>By {post.user.name}</span>
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}