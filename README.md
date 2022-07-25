# tiptap-spoiler
Just a simple React extension (actually two extensions) for [TipTap](https://github.com/ueberdosis/tiptap) to add spoilers to the editor.

### What's in there
The extensions are - ```SpoilerEditor``` and ```SpoilerOutput```. The names are pretty self-descriptive...

You can provide the following options to them: 
| ```SpoilerEditor``` Options | Type | Optional | Description |
| ------ | ------ | ----- | ----- |
| spoilerClass | ```string``` | No | Class name for the spoiler in the editor |
| inputRegex | ```RegExp``` | Yes | Input regular expression, the default one matches ```|| text ||``` |
| pasteRegex | ```RegExp``` | Yes | Same as the previous one, but for pasting|

| ```SpoilerOutput``` Options | Type | Optional | Description |
| ------ | ------ | ----- | ----- |
| spoilerClass | ```string``` | No | Main spoiler class  | 
| spoilerOpenClass | ```RegExp``` | No | Open spoiler class | 
| spoilerCloseClass | ```RegExp``` | No | Closed spoiler class  |
| as | ```ElementType``` | Yes | Tag to be rendered. Default: 'span' |

To be said: you can omit some of the classes, depending on your CSS - just be sure, that it works properly.

Also there is a function ```cleanSpoilersHTML``` that removes ```class``` atrtributes from ```spoiler``` tags.