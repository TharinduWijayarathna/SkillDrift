"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const { data: session } = useSession();
  const {
    data: latestPost,
    isLoading,
    error,
  } = api.post.getLatest.useQuery(undefined, {
    enabled: !!session?.user, // Only run query when session is available
    retry: false, // Don't retry on error
  });

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full">
      {!session?.user ? (
        <p className="mb-4 text-gray-500">
          Please log in to view and create posts.
        </p>
      ) : isLoading ? (
        <p className="mb-4 text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="mb-4 text-red-500">
          Error loading posts. You can still create a new post below.
        </p>
      ) : latestPost ? (
        <p className="mb-4 text-gray-700">
          Your most recent post:{" "}
          <span className="font-semibold">{latestPost.name}</span>
        </p>
      ) : (
        <p className="mb-4 text-gray-500">
          You have no posts yet. Create your first post below!
        </p>
      )}

      {session?.user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({ name });
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Enter post title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            disabled={createPost.isPending || !name.trim()}
          >
            {createPost.isPending ? "Creating..." : "Create Post"}
          </button>
          {createPost.error && (
            <p className="text-sm text-red-600">
              Error creating post: {createPost.error.message}
            </p>
          )}
          {createPost.isSuccess && (
            <p className="text-sm text-green-600">Post created successfully!</p>
          )}
        </form>
      )}
    </div>
  );
}
