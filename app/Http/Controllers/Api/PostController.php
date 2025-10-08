<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    /**
     * Get latest posts with user information
     */
    public function index(): JsonResponse
    {
        $posts = Post::with('user:id,name,email')
            ->latest()
            ->take(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $posts,
            'message' => 'Posts retrieved successfully'
        ]);
    }
}
