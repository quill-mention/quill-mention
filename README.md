# Quill Mention
[![npm](https://img.shields.io/npm/v/quill-mention.svg)]() [![npm](https://img.shields.io/npm/l/quill-mention.svg)]()

Quill Mention is a module to provide @mentions functionality for the [Quill](https://quilljs.com/) rich text editor.

## Demo
https://afconsult.github.io/quill-mention/

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

### Example
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
| `source(searchTerm)` | `null`         | Required callback function to handle the search term and connect it to a data source for matches. The data source can be a local source or an ajax request. The callback should call `this.renderList(matches, searchTerm);` with matches of JSON Objects in an array to show the result for the user. The JSON Objects should have `id` and `value` but can also have other values to be used in `renderItem` for custom display.  |
| `renderItem(data, searchTerm)` | `null` | Required
| `allowedChars`       | `[a-zA-Z0-9_]` | Allowed characters in search term triggering a search request using regular expressions |
| `minChars`           | `0`            | Minimum number of characters after the @ symbol triggering a search request |
| `maxChars`           | `31`           | Maximum number of characters after the @ symbol triggering a search request |


## Authors

**Fredrik Sundqvist** ([MadSpindel](https://github.com/MadSpindel))

See also the list of [contributors](https://github.com/afconsult/quill-mention/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details