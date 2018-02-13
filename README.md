# Quill Mention
[![npm](https://img.shields.io/npm/v/quill-mention.svg)]() [![npm](https://img.shields.io/npm/l/quill-mention.svg)]()

Quill Mention is a module to provide @mentions functionality for the [Quill](https://quilljs.com/) rich text editor.

## Getting Started
### Install
Install with npm:
```bash
npm install quill-mention --save
```
Install with [Yarn](https://yarnpkg.com/en/):
```bash
yarn add quill-mention
```

### Quickstart
```javascript
const quill = new Quill(editor, {
    modules: {
        mention: {
            
        }
    }
});
```

### Settings
| Property             | Default        | Description  |
| -------------------- | -------------- | ------------ |
| `source(searchTerm)` | `null`         | Required callback |
| `allowedChars`       | `[a-zA-Z0-9_]` | Allowed characters in search term triggering a search request using regular expressions |
| `minChars`           | `0`            | Minimum number of characters after the @ symbol triggering a search request |
| `maxChars`           | `31`           | Maximum number of characters after the @ symbol triggering a search request |


## Authors

**Fredrik Sundqvist** ([MadSpindel](https://github.com/MadSpindel))

See also the list of [contributors](https://github.com/afconsult/quill-mention/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details