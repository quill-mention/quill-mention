# Quill Mention
[![npm](https://img.shields.io/npm/v/quill-mention.svg)]() [![npm](https://img.shields.io/npm/l/quill-mention.svg)]()
## @mentions for the Quill rich text editor
Text.

## Install
Install with yarn:
```bash
yarn add quill-mention
```

## Quickstart
```javascript
import Quill from 'quill';
import Mention from 'quill-mention';

Quill.register('modules/mention', Mention);

const quill = new Quill(editor, {
    modules: {
        mention: {
            
        }
    }
});
```
