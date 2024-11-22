"use client";

import { Button, Input } from "@nextui-org/react";
import Link from 'next/link';
import { createShareLink } from "@/actions/sharedLinks";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ShareFormProps {
  noteId: string;
  url: string;
}

export default function ShareNoteForm({ noteId, url: initialUrl }: ShareFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl || '')

  const handleCreateLink = async () => {
    try {
      setIsLoading(true);
      const result = await createShareLink(noteId);
      
      if ('error' in result) {
        toast.error(`Failed to create share link: ${result.error}`);
        return;
      }
      
       // Update the URL state with the newly created link
      if (result.url) {
        setUrl(result.url);
        toast.success('Share link created successfully');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while creating the link');
      console.error('Share link creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch (error) {
      // Fallback for browsers without clipboard API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success('Link copied to clipboard');
      } catch (fallbackError) {
        toast.error('Failed to copy link');
        console.error('Clipboard copy error:', fallbackError);
      }
    }
  };

  const LinkButton = url ? (
    <Button type="button" onClick={handleCopyToClipboard}>
      <i className="ri-file-copy-line" />
      Copy link
    </Button>
  ) : (
    <Button 
      type="submit" 
      isLoading={isLoading} 
      isDisabled={isLoading}
    >
      <i className="ri-links-fill" />
      Create link
    </Button>
  );

  return (
    <div className="px-2">
      <p className="px-2 mb-2 text-small">
        {url 
          ? "A public link for your note has been created." 
          : "Create a public link for your note."}{' '}
        <Link href="/settings" className="underline">
          Settings
        </Link>
      </p>
      
      <form ref={formRef} action={handleCreateLink}>
        <Input
          type="text"
          placeholder="Generate link"
          id="link"
          name="link"
          className="w-full py-6"
          autoComplete="off"
          value={url}
          endContent={LinkButton}
        />
      </form>
    </div>
  );
}