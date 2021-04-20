


<template>
  <button v-on:click="printDir">fefefefefefef</button>

  <div class="horizontal" style="display: flex; flex-direction: horizontal">
    <div class="vertical">
      <div
        v-for="num in leftEditors"
        :key="num.key"
        v-bind:id="'editor1-' + num"
        @contextmenu="setParentAsChild"
      ></div>
    </div>
    <!--Side Bar-->
    <div class="vertical">
      <!--<button>
        <span>Hide</span>
        <span>Show v-if="!isHidden"</span>
      </button>-->

      <div
        v-for="num in rightEditors"
        :key="num.key"
        v-bind:id="'editor2-' + num"
        @contextmenu="setChildAsParent(num)"
      ></div>

      <button v-on:click="addRightEditor">Add Child Text Editor</button>
    </div>
  </div>
</template>

<script>
// require('./toastui-editor-all.min.js')
// Editor = toastui.Editor

import Editor from '@toast-ui/editor'
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style

var remote = window.require('electron').remote
var fs = remote.require('fs')
var fpath = remote.require('path')
// var fs = require('fs')
// var electronFs = remote.require('fs');

export default {
  name: 'App',
  data() {
    return {
      leftEditors: 1,
      rightEditors: 0,
      isHidden: false,
      parentFile: '1.md',
      saveDir: "markdown",
      editorArr: [],
      leftEditorArr: [],

    }
  },
  methods: {
    addRightEditor: function () {
      let selector = `#editor2-${this.rightEditors}`
      this.editorArr.push(newEditor(selector, "# this is new"))
      addTripleClickListener(selector, this.rightEditors, this.setChildAsParent)
      this.rightEditors++
    },
    // printDir: function () {
    // console.log(getDirContents(this.saveDir))
    // },

    setChildAsParent: function (row) {
      if (row < this.rightEditors - 1) {
        let num = noExtension(this.parentFile)
        this.parentFile = `${fpath.dirname(this.parentFile)}/${num}/${row}.md`
        console.log(this.parentFile)
        this.doEditors()
      }
    },

    setParentAsChild: function () {
      console.log(this.parentFile)
      if (!(this.parentFile === "1.md" || this.parentFile === "./1.md")) {
        this.parentFile = `${fpath.dirname(this.parentFile)}.md`
        console.log(`ok   ${this.parentFile}`)
        this.doEditors()
      }


    },



    doEditors: async function () {
      this.leftEditors = 0
      this.rightEditors = 0

      let num = noExtension(this.parentFile)


      let arr = await readFiles(`${this.saveDir}/${fpath.dirname(this.parentFile)}/${num}`)
      let length = arr.length
      let keys = []
      let contents = []
      let childrenObj = {}
      for (let i = 0; i < length; i++) {
        const element = arr[i]
        keys.push(element[0])
        contents.push(element[1])
        childrenObj[element[0]] = element[1]
      }
      this.rightEditors = length + 2
      this.leftEditors = 1
      await this.nextTick
      console.log(childrenObj)


      let parentContent = readFile(fpath.join(this.saveDir, this.parentFile))
      console.log(parentContent)
      newEditor(`#editor1-1`, parentContent)
      // this.leftEditorArr.push(newEditor(`#editor1-1`, parentContent))
      leftTripleClick(`#editor1-1`, this.setParentAsChild)

      for (let i = 0; i < length; i++) {
        const name = keys[i]
        const num = noExtension(name)

        let selector = `#editor2-${num}`

        // newEditor(selector, contents[i]
        this.editorArr.push(newEditor(selector, contents[i])
        // addTripleClickListener(selector, num.toString(), this.setChildAsParent)
      }
      let selector = `#editor2-${length + 1}`
      console.log(selector)
      this.editorArr.push(newEditor(selector)
      addTripleClickListener(selector, length.toString(), this.setChildAsParent)

      /* for (const [name, content] of Object.entries(childrenObj)) {
      } */


    },

    saveEverything: function () {
      console.log(6546)


    },
  },
  mounted: function () {
    this.doEditors()

    // document.addEventListener("keydown", e => {
      // if (e.ctrlKey && e.which === 83) {
        // this.saveEverything()
      // }
    // })

  },
}


function noExtension(path) {
  return fpath.parse(path).name
}

function readFile(path) {
  return fs.readFileSync(path).toString()
}

function leftTripleClick(selector, callback) {
  document.querySelector(selector).addEventListener('click', function (evt) {
    if (evt.detail === 3) {
      callback()
    }
  })
}

function addTripleClickListener(selector, row, callback) {
  document.querySelector(selector).addEventListener('click', function (evt) {
    if (evt.detail === 3) {
      callback(row)
    }
  })
}

function newEditor(selector, initMarkDown) {
  const editor = new Editor({
    initialValue: initMarkDown,
    el: document.querySelector(selector),
    height: 'auto',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical'
  })
  editor.getHtml()
  console.log(editor.getMarkdown())
  return editor
}



/* function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err)
      return
    }
    filenames.forEach(function (filename) {

      if (fs.lstatSync(dirname + filename).isFile()) {
        fs.readFile(dirname + filename, 'utf-8', function (err, content) {
          if (err) {
            onError(err)
            return
          }
          onFileContent(filename, content)
        })
      }
    })
  })
} */
/* function getDirContents(dir) {
  var data = {}
  readFiles(dir, function (filename, content) {
    data[filename] = content
    console.log(filename)
  }, function (err) {
    throw err
  })
  return data
} */









/* async function getDirContents(dir) {
  const arr = await readFiles(dir)
  let childrenObj = {}
  for (let i = 0, len = arr.length; i < len; i++) {
    const element=arr[i]
  childrenObj[element[0]] = element[1]
  }
  return childrenObj
} */


/**
 * Promise all
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 */
function promiseAllP(items, block) {
  var promises = []
  items.forEach(function (item, index) {
    promises.push(function (item, i) {
      return new Promise(function (resolve, reject) {
        return block.apply(this, [item, index, resolve, reject])
      })
    }(item, index))
  })
  return Promise.all(promises)
} //promiseAll

/**
 * read files
 * @param dirname string
 * @return Promise
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @see http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
/* function readFiles(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, function (err, filenames) {
      if (err) return reject(err)
      promiseAllP(filenames,
        (filename, index, resolve, reject) => {
          fs.readFile(fpath.resolve(dirname, filename), 'utf-8', function (err, content) {
            if (err) return reject(err)
            return resolve([ filename, content ])
            // return resolve({ filename: content })
            // return resolve({ filename: filename, contents: content })
          })
        })
        .then(results => {
          return resolve(results)
        })
        .catch(error => {
          return reject(error)
        })
    })
  })
} */


function readFiles(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, { withFileTypes: true }, function (err, dirents) {
      if (err) return reject(err)
      const filenames = dirents
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
      promiseAllP(filenames,
        (filename, index, resolve, reject) => {
          fs.readFile(fpath.resolve(dirname, filename), 'utf-8', function (err, content) {
            if (err) return reject(err)
            return resolve([filename, content])
            // return resolve({ filename: content })
            // return resolve({ filename: filename, contents: content })
          })
        })
        .then(results => {
          return resolve(results)
        })
        .catch(error => {
          return reject(error)
        })
    })
  })
}












</script>

<style>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.4/codemirror.min.css"; */

/* @import "https://uicdn.toast.com/editor/latest/toastui-editor.min.css"; */
.vertical {
  display: flex;
  flex-direction: column;
}
</style>
