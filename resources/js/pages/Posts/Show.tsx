import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

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
}

export default function Show({ post }: Props) {
    const { auth } = usePage().props as any;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {post.title}
                    </h2>
                    {auth.user.id === post.user.id && (
                        <div className="flex space-x-2">
                            <Link
                                href={`/posts/${post.id}/edit`}
                                className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/posts/${post.id}`}
                                method="delete"
                                as="button"
                                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
            }
        >
            <Head title={post.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <div className="flex items-center text-sm text-gray-500 mb-4">
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
                                
                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                                        {post.content}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <Link
                                    href="/posts"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    ← Back to Posts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}