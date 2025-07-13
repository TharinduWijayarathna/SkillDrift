"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export function DebugAuth() {
  const { data: session, status } = useSession();
  const helloQuery = api.post.hello.useQuery({ text: "debug" });

  return (
    <div className="rounded border bg-gray-50 p-4">
      <h3 className="mb-2 font-bold">Debug Info:</h3>
      <p>
        <strong>Session Status:</strong> {status}
      </p>
      <p>
        <strong>User ID:</strong> {session?.user?.id ?? "none"}
      </p>
      <p>
        <strong>User Email:</strong> {session?.user?.email ?? "none"}
      </p>
      <p>
        <strong>Hello Query:</strong>{" "}
        {helloQuery.data?.greeting ?? "loading/error"}
      </p>
      {helloQuery.error && (
        <p className="text-red-600">
          <strong>Hello Error:</strong> {helloQuery.error.message}
        </p>
      )}
    </div>
  );
}
