import React, { useState } from 'react'
import type { ElementType } from 'react'
import {
  Mark, markInputRule, markPasteRule, 
  Node, 
  mergeAttributes,
} from '@tiptap/core'
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewContentProps } from '@tiptap/react'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoilerEditor: {
      setSpoiler: () => ReturnType,
      toggleSpoiler: () => ReturnType,
      unsetSpoiler: () => ReturnType,
    }
  }
}

export type SpoilerEditorOptions = {
  HTMLAttributes: Record<string, any>
  spoilerClass: string | null
  inputRegex: RegExp
  pasteRegex: RegExp
}

export type SpoilerOutputOptions = {
  HTMLAttributes: Record<string, any>
  spoilerClass: string | null
  spoilerOpenClass: string | null
  spoilerCloseClass: string | null
  as: ElementType
}

const spoilerInputRegex = /(?:^|\s)((?:\|\|)((?:[^||]+))(?:\|\|))$/
const spoilerPasteRegex = /(?:^|\s)((?:\|\|)((?:[^||]+))(?:\|\|))/g

export const SpoilerEditor = Mark.create<SpoilerEditorOptions>({
  name: 'spoilerEditor',

  group: 'inline',
  inline: true,

  addOptions () {
    return {
      HTMLAttributes: {},
      spoilerClass: null,
      inputRegex: spoilerInputRegex,
      pasteRegex: spoilerPasteRegex,
    }
  },

  parseHTML () {
    return [
      {
        tag: 'spoiler',
      },
    ]
  },

  addCommands () {
    return {
      setSpoiler: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleSpoiler: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetSpoiler: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addInputRules () {
    return [
      markInputRule({
        find: this.options.inputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules () {
    return [
      markPasteRule({
        find: this.options.pasteRegex,
        type: this.type,
      }),
    ]
  },
  
  renderHTML ({ HTMLAttributes }) {
    return ['spoiler', mergeAttributes(HTMLAttributes, { class: this.options.spoilerClass }), 0]
  },
})

const SpoilerOutputComponent = (props: NodeViewContentProps) => {
  const [open, setOpen] = useState(false)

  const options = props.extension.options

  return (
    <NodeViewWrapper as={options.as}>
        <NodeViewContent
          as={options.as}
          className={
            `${options.spoilerClass} ${open ? options.spoilerOpenClass : options.spoilerCloseClass}`
          }
          onClick={() => setOpen(!open)}
        />
    </NodeViewWrapper>
  )
}

export const SpoilerOutput = Node.create<SpoilerOutputOptions>({
  name: 'spoilerOutput',

  group: 'inline',
  inline: true,
  content: 'inline*',

  addOptions() {
    return {
      HTMLAttributes: {},
      spoilerClass: null,
      spoilerOpenClass: null,
      spoilerCloseClass: null,
      as: 'span',
    }
  },

  parseHTML() {
    return [
      {
        tag: 'spoiler',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['spoiler', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SpoilerOutputComponent)
  },
})

export const cleanSpoilersHTML = (html: string) => {
  return html.replace(/(<spoiler)(?:\sclass="[^"]*")(>[^<>]*<\/spoiler>)/gmi, '$1$2')
}