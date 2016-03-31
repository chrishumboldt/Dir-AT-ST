# Dir AT-ST
A recursive directory reader (walker) for Node.

## Getting Started
Install the package using the following command.

```
npm install dir-at-st
```

## Example Usage
Run the walker on the directory you wish to read and get an array of paths in the callback.

```
var walk = require('dir-at-st');

walk({
   directory: 'example-folder',
   find: 'all'
}, function($filesFolders) {
   console.log($filesFolders);
});
```

## Options
The AT-ST walker takes two options, namely **directory** and **find**. For **find** you can provide the options of **all**, **directories** or **files**.

Unfortunately you still won't be able to find any Ewoks!
