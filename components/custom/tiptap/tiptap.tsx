"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Link2Off,
  Code,
  Terminal,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Tiptap({ value, onChange, placeholder }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "underline text-primary cursor-pointer hover:text-primary/80",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[180px] p-4 text-sm rounded-b-md border border-t-0 border-input bg-transparent",
        ),
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Synchronize editor content with form state value updates
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="w-full flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 border border-input rounded-t-md bg-muted/20 dark:bg-muted/10">
        {/* Headings Dropdown */}
        <select
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : editor.isActive("heading", { level: 4 })
                    ? "4"
                    : "paragraph"
          }
          onChange={(e) => {
            const val = e.target.value;
            if (val === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(val) as 1 | 2 | 3 | 4 })
                .run();
            }
          }}
          className="h-8 rounded-md border border-input bg-background dark:bg-muted/30 px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="paragraph">Normal Text</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>

        <div className="h-6 w-[1px] bg-muted-foreground/20 mx-1" />

        {/* Text Formats */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("bold") && "bg-muted text-foreground font-semibold",
          )}
          title="Bold"
        >
          <Bold className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("italic") && "bg-muted text-foreground",
          )}
          title="Italic"
        >
          <Italic className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("underline") && "bg-muted text-foreground",
          )}
          title="Underline"
        >
          <UnderlineIcon className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("strike") && "bg-muted text-foreground",
          )}
          title="Strikethrough"
        >
          <Strikethrough className="size-4" />
        </button>

        <div className="h-6 w-px bg-muted-foreground/20 mx-1" />

        {/* Links */}
        <button
          type="button"
          onClick={setLink}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("link") && "bg-muted text-primary",
          )}
          title="Insert Link"
        >
          <LinkIcon className="size-4" />
        </button>

        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 rounded-md transition-colors hover:bg-muted text-destructive hover:text-destructive/85"
            title="Remove Link"
          >
            <Link2Off className="size-4" />
          </button>
        )}

        <div className="h-6 w-px bg-muted-foreground/20 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("bulletList") && "bg-muted text-foreground",
          )}
          title="Bullet List"
        >
          <List className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("orderedList") && "bg-muted text-foreground",
          )}
          title="Ordered List"
        >
          <ListOrdered className="size-4" />
        </button>

        <div className="h-6 w-px bg-muted-foreground/20 mx-1" />

        {/* Blocks & Extras */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("blockquote") && "bg-muted text-foreground",
          )}
          title="Blockquote"
        >
          <Quote className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("code") && "bg-muted text-foreground",
          )}
          title="Inline Code"
        >
          <Code className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground",
            editor.isActive("codeBlock") && "bg-muted text-foreground",
          )}
          title="Code Block"
        >
          <Terminal className="size-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-md transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
          title="Horizontal Rule"
        >
          <Minus className="size-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
