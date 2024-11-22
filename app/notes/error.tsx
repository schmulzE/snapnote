"use client";

import { toast } from "sonner";

export default function ErrorBoundary({error} : {error: Error}) {
  return <div> { toast.error('New error occured!:' + error.message )}</div>
}