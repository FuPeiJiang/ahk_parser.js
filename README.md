## what could this be used for ?
* [ask on AHK Community!!](https://www.autohotkey.com/boards/viewtopic.php?f=6&t=90868)<br>
* I made this to convert {} to Map() AUTOMATICALLY (no cost too great?)<br> 
  then, convert v1 -> AHK_H v2 (`WinClip`, `Biga.ahk`)
* [issues on vscode-autohotkey-plus-plus](https://github.com/mark-wiemer/vscode-autohotkey-plus-plus/issues)<br>
  - auto format (indentation)
  - how does a debugger work ?
* Make a website so it could be used online (github.io ?) (your code is not sent nor stolen: just disconnect internet and you'll see that it still works)
  - {} -> Map()
  - offer to download `.js` CLI (`.js "inputPath" "outputPath"`)
* what should I convert next ? (silent voice: ahk_explorer.. I'm scared of Gui, ) any suggestions ?
## how this works
I break the parser then I fix it.<br>
if you manage to break the parser, congrats!<br>
just please github issue (no need for context, just paste the v1 code that broke it)

I have learned to use a debugger!!! really cool
#### how to get started
edit `src/convertTov2.ts` then run `yarn convertTov2`<br>
the converted will be in `./reconstructed.ah2`<br>

examples of what I converted are in `./tov2/`

not AST.. but array of objects will be in `everything.txt`<br>
typescript definition:
```
{
  type: string, //'String', 'Integer', everything...
  text?: string,
  i1?: number, //line start (0-based so first line is 0)
  c1?: number, //column start
  c2?: number, //column end (I omit this if text is 1 char)
  i2?: number, //line end (I omit this if text is on 1 line)
}[]
```
what is really looks like:
```
[
{type:'class', text:'class', i1:0, c1:0, c2:5},
{type:'emptyLines', text:' ', i1:0, c1:5, i2:0, c2:6},
{type:'className', text:'biga', i1:0, c1:6, c2:10},
{type:'emptyLines', text:' ', i1:0, c1:10, i2:0, c2:11},
{type:'{ class', text:'{', i1:0, c1:11},
{type:'emptyLines', text:'

	; --- Static Variables ---
	', i1:0, c1:12, i2:3, c2:1},
{type:'global local or static{ws}', text:'static', i1:3, c1:1, c2:7},
{type:'emptyLines', text:' ', i1:3, c1:7, i2:3, c2:8},
{type:'v1String findIdkVar', text:'throwExceptions', i1:3, c1:8, c2:23},
{type:'emptyLines', text:' ', i1:3, c1:23, i2:3, c2:24},
{type:'2operator', text:':=', i1:3, c1:24, c2:26},
```