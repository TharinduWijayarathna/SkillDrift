"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, MessageSquare } from "lucide-react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export function LatestPost() {
  const { data: session } = useSession();
  const {
    data: latestPost,
    isLoading,
    error,
  } = api.post.getLatest.useQuery(undefined, {
    enabled: !!session?.user,
    retry: false,
  });

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      setIsCreating(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPost.mutate({ name: name.trim() });
    }
  };

  if (!session?.user) {
    return (
      <div className="py-4 text-center">
        <MessageSquare className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
        <p className="text-muted-foreground text-sm">
          Please log in to view and create posts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Latest Post Display */}
      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <span className="text-muted-foreground ml-2 text-sm">
            Loading posts...
          </span>
        </div>
      ) : error ? (
        <div className="py-4 text-center">
          <p className="text-muted-foreground text-sm">
            Unable to load posts. You can still create a new post below.
          </p>
        </div>
      ) : latestPost ? (
        <div className="bg-muted/50 rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-2">
            <MessageSquare className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs">Latest post</span>
          </div>
          <p className="text-sm font-medium">{latestPost.name}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            Created {new Date(latestPost.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div className="py-4 text-center">
          <MessageSquare className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
          <p className="text-muted-foreground text-sm">
            No posts yet. Create your first post below!
          </p>
        </div>
      )}

      {/* Create Post Section */}
      {!isCreating ? (
        <Button
          onClick={() => setIsCreating(true)}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="post-name" className="text-sm">
              Post Title
            </Label>
            <Input
              id="post-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your post title..."
              disabled={createPost.isPending}
              className="text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createPost.isPending || !name.trim()}
              size="sm"
              className="flex-1"
            >
              {createPost.isPending ? "Creating..." : "Create Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreating(false);
                setName("");
              }}
              disabled={createPost.isPending}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
