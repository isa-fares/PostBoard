import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

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
}

export default function Index({ posts }: Props) {
    const { auth } = usePage().props as any;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Posts
                    </h2>
                    <Link
                        href="/posts/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create Post
                    </Link>
                </div>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {posts.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No posts found.</p>
                                    <Link
                                        href="/posts/create"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Create your first post
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    <Link
                                                        href={`/posts/${post.id}`}
                                                        className="hover:text-blue-600"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                {auth.user.id === post.user.id && (
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={`/posts/${post.id}/edit`}
                                                            className="text-sm text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={`/posts/${post.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="text-sm text-red-600 hover:text-red-800"
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
                                            <p className="text-gray-600 mb-3">
                                                {post.content.substring(0, 200)}
                                                {post.content.length > 200 && '...'}
                                            </p>
                                            <div className="flex justify-between items-center text-sm text-gray-500">
                                                <span>By {post.user.name}</span>
                                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}