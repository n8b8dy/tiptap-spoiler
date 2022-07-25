# tiptap-spoiler
Just a simple React extension (actually two extensions) for [TipTap](https://github.com/ueberdosis/tiptap) to add spoilers to the editor.

### Installing
Via [npm](https://www.npmjs.com/package/@n8body/tiptap-spoiler):
```
npm i @n8body/tiptap-spoiler
```

### What's in there
The extensions are - ```SpoilerEditor``` and ```SpoilerOutput```. The names are pretty self-descriptive...

You can provide the following options to them: 
| ```SpoilerEditor``` Options | Type | Optional | Description |
| ------ | ------ | ----- | ----- |
| spoilerClass | ```string``` | No | Class name for the spoiler in the editor |
| inputRegex | ```RegExp``` | Yes | Input regular expression, the default one matches ```\|\| text \|\|``` |
| pasteRegex | ```RegExp``` | Yes | Same as the previous one, but for pasting|

and

| ```SpoilerOutput``` Options | Type | Optional | Description |
| ------ | ------ | ----- | ----- |
| spoilerClass | ```string``` | No | Main spoiler class  | 
| spoilerOpenClass | ```string``` | No | Open spoiler class | 
| spoilerCloseClass | ```string``` | No | Closed spoiler class  |
| as | ```ElementType``` | Yes | Tag to be rendered. Default: 'span' |

To be said: you can omit some of the classes, depending on your CSS - just be sure, that it works properly.

Also there is a function ```cleanSpoilersHTML``` that removes ```class``` atrtributes from ```spoiler``` tags.

### Example
Exemplary TipTap instance for editing:
```ts
const editor = useEditor({
  extensions: [
    SpoilerEditor.configure({
      spoilerClass: 'beautiful-spoiler',
      inputRegex: /(?:^|\s)((?:\[spoiler\])((?:[^||]+))(?:\[\/spoiler\]))$/, // to match [spoiler]text[/spoiler]
      pasteRegex: /(?:^|\s)((?:\[spoiler\])((?:[^||]+))(?:\[\/spoiler\]))/g, // same here
    })
  ],
  content: '',
  editable: true,
})
```
...and for output:
```ts
const editor = useEditor({
  extensions: [
    SpoilerOutput.configure({
      spoilerClass: 'beautiful-spoiler',
      spoilerOpenClass: 'open-spoiler',
      spoilerCloseClass: 'closed-spoiler',
      as: 'code',
    })
  ],
  content: '<p>The best website for manga is <spoiler>manga.ovh</spoiler></p>',
  editable: false,
})
```
And to get clean HTML from your editor:
```ts
cleanSpoilersHTML(editor.getHTML())
```
### That's it!
If you have any questions, don't hesitate to contact me or open an issue.
