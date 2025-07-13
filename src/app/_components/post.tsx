"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, MessageSquare } from "lucide-react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
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
      <div className="text-center py-4">
        <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
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
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-muted-foreground">Loading posts...</span>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Unable to load posts. You can still create a new post below.
          </p>
        </div>
      ) : latestPost ? (
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Latest post</span>
          </div>
          <p className="text-sm font-medium">{latestPost.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Created {new Date(latestPost.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div className="text-center py-4">
          <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
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
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="post-name" className="text-sm">Post Title</Label>
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
