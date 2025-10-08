import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { posts } from '@/routes';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Post {
    id: number;
    title: string;
    content: string;
}

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Posts',
            href: posts.index().url,
        },
        {
            title: post.title,
            href: posts.show({ post: post.id }).url,
        },
        {
            title: 'Edit',
            href: posts.edit({ post: post.id }).url,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Edit Post
                    </h2>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1"
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <textarea
                                id="content"
                                name="content"
                                value={data.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('content', e.target.value)}
                                rows={8}
                                className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                            <InputError message={errors.content} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Post
                            </Button>
                            
                            <Link
                                href={`/posts/${post.id}`}
                                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}