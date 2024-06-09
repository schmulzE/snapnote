"use client";

import { toast } from "sonner";

export default function ErrorBoundary({error} : {error: Error}) {
  // return <div>{toast.error('An error occured:' + error.message)}</div>
  return <div>{ error.message }</div>
}