import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
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
    userPosts: Post[];
    totalPosts: number;
    recentPosts: Post[];
}

export default function Dashboard({ userPosts, totalPosts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6">
                        <div className="flex flex-col justify-center h-full">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalPosts}</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6">
                        <div className="flex flex-col justify-center h-full">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Posts</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{userPosts.length}</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6">
                        <div className="flex flex-col justify-center h-full">
                            <Link
                                href="/posts/create"
                                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Create New Post
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Your Posts */}
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Recent Posts</h3>
                    {userPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any posts yet.</p>
                            <Link
                                href="/posts/create"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Create your first post
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userPosts.map((post) => (
                                <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                                        <Link href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                            {post.title}
                                        </Link>
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {post.content.substring(0, 150)}
                                        {post.content.length > 150 && '...'}
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        <div className="flex space-x-2">
                                            <Link href={`/posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                                                Edit
                                            </Link>
                                            <Link href={`/posts/${post.id}`} className="text-gray-600 hover:text-gray-800 dark:text-gray-400">
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {totalPosts > 5 && (
                                <div className="text-center pt-4">
                                    <Link
                                        href="/posts"
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        View all posts →
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
