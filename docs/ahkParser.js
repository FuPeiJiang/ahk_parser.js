(()=>{"use strict";var e={246:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.thisCouldBeFuncName=t.elseLoopReturn=t.legacyIfOperators=t.v2Continuator=t.v1Continuator=t.assignmentOperators=t.operatorsObj=t.whiteSpaceOverrideAssign=t.typeOfValidVarName=t.namedIf=t.propCharsObj=t.variableCharsObj=t.whiteSpaceObj=t.whiteSpace=void 0,t.whiteSpace=/\u000B\u000C\u0020\u00A0/,t.whiteSpaceObj={" ":!0,"\t":!0},t.variableCharsObj={a:!0,b:!0,c:!0,d:!0,e:!0,f:!0,g:!0,h:!0,i:!0,j:!0,k:!0,l:!0,m:!0,n:!0,o:!0,p:!0,q:!0,r:!0,s:!0,t:!0,u:!0,v:!0,w:!0,x:!0,y:!0,z:!0,A:!0,B:!0,C:!0,D:!0,E:!0,F:!0,G:!0,H:!0,I:!0,J:!0,K:!0,L:!0,M:!0,N:!0,O:!0,P:!0,Q:!0,R:!0,S:!0,T:!0,U:!0,V:!0,W:!0,X:!0,Y:!0,Z:!0,0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,_:!0,"#":!0,"@":!0,$:!0},t.propCharsObj={a:!0,b:!0,c:!0,d:!0,e:!0,f:!0,g:!0,h:!0,i:!0,j:!0,k:!0,l:!0,m:!0,n:!0,o:!0,p:!0,q:!0,r:!0,s:!0,t:!0,u:!0,v:!0,w:!0,x:!0,y:!0,z:!0,A:!0,B:!0,C:!0,D:!0,E:!0,F:!0,G:!0,H:!0,I:!0,J:!0,K:!0,L:!0,M:!0,N:!0,O:!0,P:!0,Q:!0,R:!0,S:!0,T:!0,U:!0,V:!0,W:!0,X:!0,Y:!0,Z:!0,0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,_:!0},t.namedIf={ifequal:!0,ifnotequal:!0,ifless:!0,iflessorequal:!0,ifgreater:!0,ifgreaterorequal:!0},t.typeOfValidVarName={class:5,autotrim:4,blockinput:4,break:4,catch:4,click:4,clipwait:4,continue:4,control:4,controlclick:4,controlfocus:4,controlget:4,controlgetfocus:4,controlgetpos:4,controlgettext:4,controlmove:4,controlsend:4,controlsendraw:4,controlsettext:4,coordmode:4,critical:4,detecthiddentext:4,detecthiddenwindows:4,drive:4,driveget:4,drivespacefree:4,edit:4,else:4,envadd:4,envdiv:4,envget:4,envmult:4,envset:4,envsub:4,envupdate:4,exit:4,exitapp:4,fileappend:4,filecopy:4,filecopydir:4,filecreatedir:4,filecreateshortcut:4,filedelete:4,fileencoding:4,fileinstall:4,filegetattrib:4,filegetshortcut:4,filegetsize:4,filegettime:4,filegetversion:4,filemove:4,filemovedir:4,fileread:4,filereadline:4,filerecycle:4,filerecycleempty:4,fileremovedir:4,fileselectfile:4,fileselectfolder:4,filesetattrib:4,filesettime:4,finally:4,for:4,formattime:4,getkeystate:4,gosub:4,goto:4,groupactivate:4,groupadd:4,groupclose:4,groupdeactivate:4,gui:4,guicontrol:4,guicontrolget:4,hotkey:4,ifequal:4,ifnotequal:4,ifexist:4,ifnotexist:4,ifgreater:4,ifgreaterorequal:4,ifinstring:4,ifnotinstring:4,ifless:4,iflessorequal:4,ifmsgbox:4,ifwinactive:4,ifwinnotactive:4,ifwinexist:4,ifwinnotexist:4,imagesearch:4,inidelete:4,iniread:4,iniwrite:4,input:4,inputbox:4,keyhistory:4,keywait:4,listhotkeys:4,listlines:4,listvars:4,loop:4,menu:4,mouseclick:4,mouseclickdrag:4,mousegetpos:4,mousemove:4,msgbox:4,onexit:4,outputdebug:4,pause:4,pixelgetcolor:4,pixelsearch:4,postmessage:4,process:4,progress:4,random:4,regdelete:4,regread:4,regwrite:4,reload:4,return:4,run:4,runas:4,runwait:4,send:4,sendraw:4,sendinput:4,sendplay:4,sendevent:4,sendlevel:4,sendmessage:4,sendmode:4,setbatchlines:4,setcapslockstate:4,setcontroldelay:4,setdefaultmousespeed:4,setenv:4,setformat:4,setkeydelay:4,setmousedelay:4,setnumlockstate:4,setscrolllockstate:4,setregview:4,setstorecapslockmode:4,settimer:4,settitlematchmode:4,setwindelay:4,setworkingdir:4,shutdown:4,sleep:4,sort:4,soundbeep:4,soundget:4,soundgetwavevolume:4,soundplay:4,soundset:4,soundsetwavevolume:4,splashimage:4,splashtexton:4,splashtextoff:4,splitpath:4,statusbargettext:4,statusbarwait:4,stringcasesense:4,stringgetpos:4,stringleft:4,stringlen:4,stringlower:4,stringmid:4,stringreplace:4,stringright:4,stringsplit:4,stringtrimleft:4,stringtrimright:4,stringupper:4,suspend:4,switch:4,sysget:4,thread:4,throw:4,tooltip:4,transform:4,traytip:4,try:4,until:4,urldownloadtofile:4,while:4,winactivate:4,winactivatebottom:4,winclose:4,wingetactivestats:4,wingetactivetitle:4,wingetclass:4,winget:4,wingetpos:4,wingettext:4,wingettitle:4,winhide:4,winkill:4,winmaximize:4,winmenuselectitem:4,winminimize:4,winminimizeall:4,winminimizeallundo:4,winmove:4,winrestore:4,winset:4,winsettitle:4,winshow:4,winwait:4,winwaitactive:4,winwaitnotactive:4,winwaitclose:4,global:3,local:3,static:3,if:2,"#clipboardtimeout":1,"#commentflag":1,"#errorstdout":1,"#escapechar":1,"#hotkeyinterval":1,"#hotkeymodifiertimeout":1,"#hotstring":1,"#if":1,"#ifwinactive":1,"#ifwinexist":1,"#ifwinnotactive":1,"#ifwinnotexist":1,"#iftimeout":1,"#include":1,"#includeagain":1,"#inputlevel":1,"#installkeybdhook":1,"#installmousehook":1,"#keyhistory":1,"#maxhotkeysperinterval":1,"#maxmem":1,"#maxthreads":1,"#maxthreadsbuffer":1,"#maxthreadsperhotkey":1,"#menumaskkey":1,"#noenv":1,"#notrayicon":1,"#persistent":1,"#requires":1,"#singleinstance":1,"#usehook":1,"#warn":1,"#winactivateforce":1,"#ltrim":1},t.whiteSpaceOverrideAssign={1:!0,2:!0,3:!0},t.operatorsObj={"++":!0,"--":!0,"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,not:!0,and:!0,"&&":!0,or:!0,"||":!0,"?":!0,":":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.assignmentOperators={"++":!0,"--":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.v1Continuator={",":!0,"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,"&&":!0,"||":!0,"?":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.v2Continuator={"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,and:!0,"&&":!0,or:!0,"||":!0,"?":!0,":":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.legacyIfOperators={"=":!0,"<>":!0,"!=":!0,">":!0,">=":!0,"<":!0,"<=":!0},t.elseLoopReturn={else:!0,loop:!0,return:!0},t.thisCouldBeFuncName={idkVariable:!0,"(.) property findTrailingExpr":!0}}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,i),o.exports}var n={};(()=>{var e=n;const t=i(246),r=console.debug.bind(console);e.default=e=>{"\ufeff"===e[0]&&(e=e.slice(1));const i=e.split("\n"),n=i.length,o=[],s={whiteSpaces:!0,emptyLines:!0};let c;c=0;let a,p,l,f,u,h,y,g=0,x=0,b=0,d=0,m="",w=!1,v=0,L=!1,C=-1,k=!1,O=!1,j=!1,I=!1;y=0;let S,E,A,V=!1,$=0,N=-1,T=!1,R=!1,G=-1,D=-1,F=-1;e:for(;g<n&&(x=0,b=i[g].length,he());){t:for(;;){if(g===n)break e;if(x===b){o.push({type:"newLine startOfLineLoop",text:"\n",i1:g,c1:x}),g++;continue e}if(";"===i[g][x]){const e=i[g].slice(x,b);o.push({type:"SemiColonComment",text:e,i1:g,c1:x,c2:b}),o.push({type:"newLine SemiColonComment",text:"\n",i1:g,c1:x}),g++;continue e}if("}"===i[g][x]){if(o.push({type:"} unknown",text:"}",i1:g,c1:x}),x++,!he())break e;L=!0;continue t}l=x;const e=x;if(S=o.length,t.variableCharsObj[i[g][x]]){x++,de(),m=i[g].slice(l,x),A=x,E=g;const s=t.typeOfValidVarName[m.toLowerCase()];if(s){D=g;const c=o.length;if(he()){if(","===i[g][x]){if(o.push({type:"(statement) ,",text:",",i1:g,c1:x}),x++,1===s||4===s){const t=Q();if(1===t)continue t;if(2===t)continue e;if(o.splice(S,0,{type:"DIRECTIVE OR COMMAND comma",text:m,i1:E,c1:e,c2:A}),j=!0,ee(),j=!1,g===n)break e;M(", command comma");const i=o.length-1;o.splice(o.length-("emptyLines"===o[i].type?1:0),0,{type:"end command"}),L=!0;continue t}L=!0;continue t}if(g===E&&t.whiteSpaceObj[i[E][A]]){if(1===s){o.splice(S,0,{type:"directive",text:m,i1:E,c1:e,c2:A});const t=i[g].slice(x,b);o.push({type:"directive to EOL",text:t,i1:g,c1:l,c2:b}),o.push({type:"newLine directive",text:"\n",i1:g,c1:x}),g++;continue e}if(2===s){o.splice(S,0,{type:"if",text:m,i1:E,c1:e,c2:A}),S=o.length;i:for(;t.variableCharsObj[i[g][x]];){const e=x,n=g,r=b;for(;xe()||t.variableCharsObj[i[g][x]];)x++;const s=x;for(;x<b&&t.whiteSpaceObj[i[g][x]];)x++;const c=x;let a=x,p=o.length;de(),A=x,E=g;let l=i[E].slice(a,A);n:for(;;){if(!l){x=e,g=n,b=r;break i}let s,c=!1;if("not"!==l.toLowerCase()||x!==b&&!t.whiteSpaceObj[i[g][x]]?c=!0:(o.push({type:"legacyIf not",text:l,i1:g,c1:a,c2:x}),ye(),a=x,p=o.length,de(),A=x,E=g,l=i[E].slice(a,A)),"in"!==l.toLowerCase()||x!==b&&!t.whiteSpaceObj[i[g][x]])if("contains"!==l.toLowerCase()||x!==b&&!t.whiteSpaceObj[i[g][x]]){if("between"===l.toLowerCase()&&(x===b||t.whiteSpaceObj[i[g][x]])){o.push({type:"legacyIf between",text:l,i1:g,c1:a,c2:x}),k=!0;break n}}else o.push({type:"legacyIf contains",text:l,i1:g,c1:a,c2:x}),O=!0;else o.push({type:"legacyIf in",text:l,i1:g,c1:a,c2:x}),O=!0;if(c&&"is"===l.toLowerCase()&&(x===b||t.whiteSpaceObj[i[g][x]])){o.push({type:"legacyIf is",text:l,i1:g,c1:a,c2:x}),ye(),l=i[g].slice(x,s=x+3),"not"!==l.toLowerCase()||t.variableCharsObj[i[g][s]]||(o.push({type:"legacyIf (is) not",text:l,i1:g,c1:x,c2:x+3}),x+=3,ye());break n}const f=x,u=g;if(!he()){x=e,g=n,b=r,o.splice(o.length-1,1);break i}let h=!0;if(x===f&&g===u&&(h=!1),x<b-1&&t.legacyIfOperators[i[g].slice(x,x+2)]){o.push({type:"2legacyIfOperators",text:i[g].slice(x,x+2),i1:g,c1:x,c2:x+2}),x+=2;break n}if(x<b&&t.legacyIfOperators[i[g][x]]){o.push({type:"1legacyIfOperators",text:i[g][x],i1:g,c1:x}),x++;break n}x=e,g=n,b=r,h&&o.splice(o.length-1,1);break i}const f=i[n].slice(s,c);if(f&&o.splice(p,0,{type:"whiteSpaces",text:f,i1:g,c1:s,c2:x}),o.splice(p,0,{type:"legacyIf var",text:i[n].slice(e,s),i1:n,c1:e,c2:s}),ee(),O=!1,"{"===i[g][x]&&(o.push({type:"{ legacyIf",text:"{",i1:g,c1:x}),x++,!he()))break e;L=!0;continue t}if(ne()||ae(),o.splice(o.length-1,0,{type:"end if"}),g===n)break e;if("{"===i[g][x]&&(o.push({type:"{ if",text:"{",i1:g,c1:x}),x++,!he()))break e;L=!0;continue t}if(x<b&&"="===i[g][x]){o.splice(S,0,{type:"var at whiteSpace v1Assignment",text:m,i1:g,c1:l,c2:x}),o.push({type:"= whiteSpace v1Assignment",text:"=",i1:g,c1:x}),x++,ee(),L=!0;continue t}const c=z();if(1===c)continue t;if(2===c)break e;if(3===s){if(o.splice(S,0,{type:"global local or static{ws}",text:m,i1:E,c1:e,c2:A}),_(),ne(),U())break e;L=!0;continue t}if(4===s){const e=Q();if(1===e)continue t;if(2===e)continue e;if("for"===m.toLowerCase()){let e,s,c;if(o.splice(S,0,{type:"for",text:m,i1:E,c1:l,c2:A}),_(),","===i[g][x]&&(o.push({type:", for",text:",",i1:g,c1:x}),x++,_()),"in"!==(e=i[g].slice(x,s=x+2)).toLowerCase()||s!==b&&!t.whiteSpaceObj[c=i[g][s]]?r("ILLEGAL, (for) is missing `in`"):o.push({type:"in{ws} lookForIn",text:`${e}${c||""}`,i1:g,c1:x,c2:s}),x+=3,ne()||ae(),g===n)break e;const a=o.length-1;if(o.splice(o.length-("emptyLines"===o[a].type?1:0),0,{type:"end command"}),"{"===i[g][x]&&(o.push({type:"{ for",text:"{",i1:g,c1:x}),x++,!he()))break e;L=!0;continue t}if("else"===m.toLowerCase()){if(o.splice(S,0,{type:"else whiteSpace",text:m,i1:E,c1:l,c2:A}),"{"===i[g][x]&&(o.push({type:"{ else",text:"{",i1:g,c1:x}),x++,!he()))break e;L=!0;continue t}if(o.splice(S,0,{type:"command",text:m,i1:E,c1:l,c2:A}),j=!0,ee(),j=!1,g===n)break e;M(", command whiteSpace"),L=!0;continue t}if(5===s){o.splice(S,0,{type:"class",text:m,i1:E,c1:l,c2:A});const e=x;if(de(),o.push({type:"className",text:i[g].slice(e,x),i1:g,c1:e,c2:x}),!he())break e;let t;if("extends"===(t=i[g].slice(x,x+7)).toLowerCase()){o.push({type:"className",text:t,i1:g,c1:x,c2:x+7}),x+=7,ye();const e=x;de();const n=i[g].slice(e,x);if(n&&o.push({type:"extendedClassName",text:n,i1:g,c1:e,c2:x}),!he())break e}if("{"===i[g][x]){if(o.push({type:"{ class",text:"{",i1:g,c1:x}),x++,!he())break e}else r("illegal class name",we());L=!0;continue t}r("this cannot happen because idkType must be in 1,2,3,4,5",we())}else if("("===i[g][x]){if(2===s){if(o.splice(S,0,{type:"if",text:m,i1:E,c1:e,c2:A}),ne()||ae(),o.splice(o.length-1,0,{type:"end if"}),g===n)break e;if("{"===i[g][x]&&(o.push({type:"{ if",text:"{",i1:g,c1:x}),x++,!he()))break e;L=!0;continue t}const t=W();if(1===t)continue t;if(2===t)continue e}else if("{"===i[g][x]&&"loop"===m.toLowerCase()){if(o.splice(S,0,{type:"loop",text:m,i1:E,c1:l,c2:A}),o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,!he())break e;L=!0;continue t}}if(o.length===c+1||g===n){o.splice(S,0,{type:"command EOL or comment",text:m,i1:E,c1:l,c2:A}),R=o.length,G=g;const e=m.toLowerCase();if(t.elseLoopReturn[e]){if(ne());else if("else"===e){if("{"===i[g][x]&&(o.push({type:"{ else",text:"{",i1:g,c1:x}),x++,!he()))break e}else if("loop"===e&&"{"===i[g][x]&&(o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,!he()))break e}else{if(g===n)break e;ie(),M("command EOL or comment"),o.push({type:"command end"})}L=!0;continue t}}if(g===E&&":"===i[g][x]&&(x+1===b||t.whiteSpaceObj[i[g][x+1]])){x++;const e=i[g].slice(l,x);if(o.push({type:"label:",text:e,i1:g,c1:l,c2:x}),!he())break e;L=!0;continue t}}for(;x<b&&(xe()||t.variableCharsObj[i[g][x]]);)x++;if(x===b){r("illegal: unexpected EOL after var parsing",me()),g++;continue e}if(m=i[g].slice(l,x),A=x,E=g,T=!1,m){let t=z();if(1===t)continue t;if(2===t)break e;if(se(),g===n||!he()){T&&o.splice(S,0,{type:"functionName",text:m,i1:E,c1:e,c2:A});break e}if(x<b&&"="===i[g][x]&&":"!==i[g][x+1]){o.splice(S,0,{type:"var at v1Assignment",text:m,i1:E,c1:e,c2:A}),o.push({type:"= v1Assignment",text:"=",i1:g,c1:x}),x++,D=g,ee(),L=!0;continue t}if(t=z(),1===t)continue t;if(2===t)break e;if(T){if(!he()){o.splice(S,0,{type:"functionName",text:m,i1:E,c1:e,c2:A});break e}if("{"===i[g][x]){if(o.splice(S,0,{type:"function DEFINITION name",text:m,i1:E,c1:e,c2:A}),F===S){d=F+1,o[d++].type="( function DEFINITION";let e,t=!0;i:for(;;){if(e=P(),", function CALL"===e.type){e.type=", function DEFINITION",d++,t=!0;continue i}if(") function CALL"===e.type)break i;t&&"idkVariable"===e.type&&("byref"===e.text.toLowerCase()&&(e.type="byref",d++,e=q()),e.type="Param",d++,e=P(),"*"===e.text&&"1operator"===e.type&&(e.type="* variadic Argument"));let i=1;for(;;){const n=e.type;if(i){if(") function CALL"===n?i--:"( function CALL"===n&&i++,0===i)break i;if(1===i&&", function CALL"===n){d++,t=!0;continue i}}e=o[++d]}}e.type=") function DEFINITION"}else r("illegal: { but not function DEFINITION",we());o.push({type:"{ function DEFINITION",text:"{",i1:g,c1:x}),x++,L=!0;continue t}if(o.splice(S,0,{type:"functionName",text:m,i1:E,c1:e,c2:A}),U())break e;L=!0;continue t}}const s=z();if(1!==s){if(2===s)break e;for(x=x===l?x+1:x;x<b;){if(":"===i[g][x]){if(x++,x<b&&":"===i[g][x]){x++;const e=i[g].slice(l,x);g===G&&!1!==R&&o.splice(R),o.push({type:"hotkey",text:e,i1:g,c1:l,c2:x});const n=i[g][x],r=x+1;if(!n||t.whiteSpaceObj[n]||r!==b&&!t.whiteSpaceObj[i[g][r]]||(o.push({type:"hotkey replacementChar",text:n,i1:g,c1:x}),x++),!he())break e;L=!0;continue t}if(x===b||t.whiteSpaceObj[i[g][x]]){const e=i[g].slice(l,x);if(o.push({type:"label:",text:e,i1:g,c1:l,c2:x}),!he())break e;L=!0;continue t}}x++}if(L){L=!1;continue e}break t}}r("end of lineLoop"),g++}if(o.length){const e=o.length-1,t=o[e];t.i1&&t.i1+1===n&&"\n"===t.text&&o.splice(e,1)}return o;function q(){for(;;){const e=o[d];if(e.text){if("concat"===e.type){e.type="whiteSpaces",d++;continue}if(s[e.type]){d++;continue}return e}d++}}function P(){for(;;){const e=o[d];if(e.text){if(s[e.type]){d++;continue}return e}d++}}function z(){if(1===function(){let e;e:for(;;){if(":"===i[g][x+3])return 2;if(x<b-2&&t.assignmentOperators[e=i[g].slice(x,x+3)]){o.push({type:"3operator",text:e,i1:g,c1:x,c2:x+3}),x+=3;break e}if(":"===i[g][x+2])return 2;if(x<b-1&&t.assignmentOperators[e=i[g].slice(x,x+2)]){o.push({type:"2operator",text:e,i1:g,c1:x,c2:x+2}),x+=2;break e}return!1}return C=-1,N=g,1}()){o.splice(S,0,{type:"assignment",text:m,i1:E,c1:void 0,c2:A});const e=g;H(),ne()||g===e&&ae();const t=o.length-1;return o.splice(o.length-("emptyLines"===o[t].type?1:0),0,{type:"end assignment"}),U()?2:(L=!0,1)}}function M(e){if(B(e)){if(g===n)return!1;for(;B(e);)if(g===n)return!1;return!0}}function B(e){if(","===i[g][x])return o.push({type:e,text:",",i1:g,c1:x}),x++,j=!0,ee(),j=!1,!0}function U(){for(;g<n;){if(","!==i[g][x])return!1;o.push({type:", assignment",text:",",i1:g,c1:x}),x++,ne()||ae();const e=o.length-1;o.splice(o.length-("end comma assignment"===o[e].type?1:0),0,{type:"end assignment"})}return!0}function _(){V=!0,ye(),l=x,te()}function Q(){const e=function(){if(t.namedIf[m.toLowerCase()]){if(o.splice(S,0,{type:"named if",text:m,i1:E,c1:l,c2:A}),ye(),j=!0,te(),o.push({type:", 1 namedIf",text:",",i1:g,c1:x}),x++,j=!1,ne()||ae(),","===i[g][x]){o.push({type:", 2 namedIf",text:",",i1:g,c1:x}),x++;const e=x;return ye(),l=x,de(),m=i[g].slice(l,x),t.typeOfValidVarName[m.toLowerCase()]?(x=e,L=!0,1):(x=e,ee(),2)}return he()?("{"===i[g][x]&&(o.push({type:"{ namedIf",text:"{",i1:g,c1:x}),x++),ee(),2):2}}();if(e)return e;const r=function(){if("loop"===m.toLowerCase()){if(o.splice(S,0,{type:"loop",text:m,i1:E,c1:l,c2:A}),!he())return 2;if(t.variableCharsObj[i[g][x]])e:for(;;){let e,n;if("reg"!==(e=i[g].slice(x,n=x+3)).toLowerCase()||t.variableCharsObj[i[g][n]])if("files"!==(e=i[g].slice(x,n=x+4)).toLowerCase()||t.variableCharsObj[i[g][n]])if("files"!==(e=i[g].slice(x,n=x+5)).toLowerCase()||t.variableCharsObj[i[g][n]]){if("parse"!==(e=i[g].slice(x,n=x+5)).toLowerCase()||t.variableCharsObj[i[g][n]])break e;if(o.push({type:"(loop) parse",text:e,i1:g,c1:x,c2:n}),x+=5,!he())return 2;B(", 1 (loop) parse")&&B(", 2 (loop) parse")&&B(", 3 (loop) parse")}else{if(o.push({type:"(loop) files",text:e,i1:g,c1:x,c2:n}),x+=5,!he())return 2;B(", 1 (loop) files")&&B(", 2 (loop) files")}else{if(o.push({type:"(loop) read",text:e,i1:g,c1:x,c2:n}),x+=4,!he())return 2;B(", 1 (loop) read")&&B(", 2 (loop) read")}else{if(o.push({type:"(loop) Reg",text:e,i1:g,c1:x,c2:n}),x+=3,!he())return 2;B(", 1 (loop) Reg")&&B(", 2 (loop) Reg")}return"{"!==i[g][x]||(o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,he())?(L=!0,1):2}return"{"===i[g][x]?(o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,he()?(L=!0,1):2):(j=!0,ee(),j=!1,B(", 1 (loop) idk")&&B(", 2 (loop) idk")&&B(", 3 (loop) idk"),"{"!==i[g][x]||(o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,he())?(L=!0,1):2)}}();if(r)return r;const s=W();if(s)return s;return function(){if("sendmessage"===m.toLowerCase())return o.splice(S,0,{type:"sendmessage",text:m,i1:E,c1:l,c2:A}),H(),ne()||ae(),Y(", 2 sendmessage")&&Y(", 3 sendmessage")&&M(", sendmessage v1Expr"),1}()||("return"===m.toLowerCase()?(o.splice(S,0,{type:"return",text:m,i1:E,c1:l,c2:A}),H(),ne()||ae(),g<n&&","===i[g][x]&&(o.push({type:", doReturn",text:",",i1:g,c1:x}),x++,he()),L=!0,1):"throw"===m.toLowerCase()?(o.splice(S,0,{type:"throw",text:m,i1:E,c1:l,c2:A}),ne()||ae(),g<n&&","===i[g][x]&&(o.push({type:", doThrow",text:",",i1:g,c1:x}),x++,he()),L=!0,1):"until"===m.toLowerCase()?(o.splice(S,0,{type:"until",text:m,i1:E,c1:l,c2:A}),ne()||ae(),g<n&&","===i[g][x]&&(o.push({type:", doUntil",text:",",i1:g,c1:x}),x++,he()),L=!0,1):void 0)}function W(){if("while"===m.toLowerCase())return o.splice(S,0,{type:"while",text:m,i1:E,c1:l,c2:A}),ne()||ae(),"{"!==i[g][x]||(o.push({type:"{ loop",text:"{",i1:g,c1:x}),x++,he())?(L=!0,1):2}function Y(e){if(","===i[g][x])return o.push({type:e,text:",",i1:g,c1:x}),x++,H(),ne()||ae(),!0}function H(){let e;ye(),x<b-1&&"%"===i[g][x]&&t.whiteSpaceObj[e=i[g][x+1]]&&(o.push({type:"% v1->v2 expr",text:`%${e}`,i1:g,c1:x,c2:x+2}),x+=2,C=-1)}function J(e){const t=i[g].slice(f,u);o.push({type:`v1String ${e}`,text:t,i1:g,c1:f,c2:u})}function K(e){const t=u+1,n=i[g].slice(f,t);o.push({type:`v1String ${e}`,text:n,i1:g,c1:f,c2:t});const r=i[g].slice(t,x);r&&o.push({type:`endingWhiteSpaces v1Expression ${e}`,text:r,i1:g,c1:t,c2:x})}function X(e){const[t,n]=e;if(n===g)return i[g].slice(t,x);{let e=i[n].slice(t);for(let t=n+1;t<g;t++)e+=`\n${i[t]}`;return e+=`\n${i[g].slice(0,x)}`,e}}function Z(e){if(function(e){if(k){let n,r,s;if("and"===(n=i[g].slice(x,r=x+3)).toLowerCase()&&(r===b||t.whiteSpaceObj[s=i[g][r]]))return k=!1,K(e),o.push({type:`legacyIf and{ws} ${e}`,text:`${n}${s||""}`,i1:g,c1:x,c2:r}),x+=4,f=x,u=x-1,!0}}(e))return Z(e),!1;if(g===D)for(;x<b&&!t.whiteSpaceObj[i[g][x]];){if(u=x,O){if(","===i[g][x]){J(`${e} beforeDoubleComma`),","===i[g][x+1]?(o.push({type:",, legacyIf var in findV1Expression",text:",,",i1:g,c1:x,c2:x+2}),x+=2):(o.push({type:", legacyIf var in findV1Expression",text:",",i1:g,c1:x}),x++),f=x,u=x-1;continue}}else if(j&&!I&&","===i[g][x]&&"`"!==i[g][x-1])return J(`${e} beforeSingleComma`),f=x,u=x-1,!0;ge()?(x++,f=x):x++}else for(;x<b&&!t.whiteSpaceObj[i[g][x]];){if(u=x,":"===i[g][x])return G=g,!0;if(O){if(","===i[g][x]){J(`${e} beforeDoubleComma`),","===i[g][x+1]?(o.push({type:",, legacyIf var in findV1Expression",text:",,",i1:g,c1:x,c2:x+2}),x+=2):(o.push({type:", legacyIf var in findV1Expression",text:",",i1:g,c1:x}),x++),f=x,u=x-1;continue}}else if(j&&!I&&","===i[g][x]&&"`"!==i[g][x-1])return J(`${e} beforeSingleComma`),f=x,u=x-1,!0;ge()?(x++,f=x):x++}for(;x<b&&t.whiteSpaceObj[i[g][x]];)x++}function ee(){let e;return ye(),x<b-1&&"%"===i[g][x]&&t.whiteSpaceObj[e=i[g][x+1]]?(o.push({type:"% v1->v2 expr",text:`%${e}`,i1:g,c1:x,c2:x+2}),x+=2,C=-1,ne()||ae(),!0):(te(),!0)}function te(){if(V)return function(){if(t.variableCharsObj[i[g][x]])$=x,x++;else{if(!(x<b&&"%"===i[g][x]))return!1;o.push({type:"% checkPercent",text:"%",i1:g,c1:x}),be(),x++,$=x}for(;x<b;){if(x<b&&"%"===i[g][x]){if(o.push({type:"v1String findIdkVar",text:i[g].slice($,x),i1:g,c1:$,c2:x}),o.push({type:"% checkPercent",text:"%",i1:g,c1:x}),be(),x++,x===b)return!0;$=x}if(!t.variableCharsObj[i[g][x]])break;x++}const e=i[g].slice($,x);e&&o.push({type:"v1String findIdkVar",text:e,i1:g,c1:$,c2:x})}(),ie(),void(V=!1);f=x,u=x-1;e:for(;";"!==i[g][x]||!t.whiteSpaceObj[i[g][x-1]];){for(;x<b;){if(";"===i[g][x])break e;if(Z("findV1Expression"))return}break}K("findV1Expression"),ie()}function ie(){if(!he())return!1;if(void 0===i[g][x]&&r("this shouldn't happen resolveV1Continuation lines[i][c] === undefined"),"("===i[g][x]){I=!0,o.push({type:"( resolveV1Continuation",text:"(",i1:g,c1:x}),x++;const e=i[g].slice(x,b);for(o.push({type:"resolveV1Continuation to EOL",text:e,i1:g,c1:x,c2:b});++g<n;){o.push({type:"newline resolveV1Continuation",text:"\n",i1:g,c1:b}),x=0,b=i[g].length;const e=x;for(;x<b&&t.whiteSpaceObj[i[g][x]];)x++;if(")"===i[g][x]){I=!1;const t=i[g].slice(e,x);return t&&o.push({type:"whiteSpaces before ) resolveV1Continuation",text:t,i1:g,c1:e,c2:x}),o.push({type:") resolveV1Continuation",text:")",i1:g,c1:x}),x++,te(),!0}for(f=0,u=-1;x<b;)Z("resolveV1Continuation");K("resolveV1Continuation")}return!0}if(!V){if(x<b-2&&t.v1Continuator[i[g].slice(x,x+3)])o.push({type:"3 v1Continuator",text:i[g].slice(x,x+3),i1:g,c1:x,c2:x+3}),x+=3;else if(x<b-1&&t.v1Continuator[i[g].slice(x,x+2)])o.push({type:"2 v1Continuator",text:i[g].slice(x,x+2),i1:g,c1:x,c2:x+2}),x+=2;else{if(!(x<b&&t.v1Continuator[i[g][x]]))return!1;if(function(){if(O&&","===i[g][x])return","===i[g][x+1]?(o.push({type:",, legacyIf var in",text:",,",i1:g,c1:x,c2:x+2}),x+=2,ee()):(o.push({type:", legacyIf var in",text:",",i1:g,c1:x}),x++,ee()),!0}())return!1;if(j)return!1;o.push({type:"1 v1Continuator",text:i[g][x],i1:g,c1:x}),x++}return R=o.length-1,ee(),!1}}function ne(){if(re()){for(;re(););return!0}return!1}function re(){if(g===n)return!1;let e,s=g;if(w){if(ye(),x!==b&&";"===i[g][x]&&(r("ILLEGAL semiColonComment insideContinuation",me()),ue()))return ae()}else if(s=g,!he())return!1;return e=g===s?function(){if(x===b)return!1;if(function(){let e,s,c,a=!0;e:for(;;){t:for(;;){if(x<b-2&&t.operatorsObj[s=(e=i[g].slice(x,c=x+3)).toLowerCase()]){if("and"===s){if(t.variableCharsObj[c])break t;if(k)return!1}if("not"===s&&t.variableCharsObj[i[g][c]])break t;o.push({type:"3operator",text:e,i1:g,c1:x,c2:x+3}),x+=3;break e}break t}t:for(;;){if(x<b-1&&t.operatorsObj[s=i[g].slice(x,c=x+2).toLowerCase()]){if("or"===s&&t.variableCharsObj[i[g][c]])break t;o.push({type:"2operator",text:i[g].slice(x,x+2),i1:g,c1:x,c2:x+2}),x+=2;break e}break t}if(x<b&&t.operatorsObj[i[g][x].toLowerCase()]){if("?"===i[g][x]){if(o.push({type:"? ternary",text:"?",i1:g,c1:x}),v++,x++,C=-1,N=g,ne()||ae(),g===n)return!1;":"===i[g][x]?(o.push({type:": ternary",text:":",i1:g,c1:x}),v--,x++):(r("illegal: why is there no : after ? ternary",me()),v--,x++,a=!1)}else":"===i[g][x]?(v||r("illegal: unexpected :",me()),a=!1):(o.push({type:"1operator",text:i[g][x],i1:g,c1:x}),x++);break e}return!1}return C=-1,N=g,a}())return ae(),!0;const e=o.length-1;return g===C&&t.whiteSpaceObj[i[g][x-1]]&&ae()?(o[e].type="concat",!0):!!w&&(ue()?(ae(),!0):void 0)}():x!==b&&(function(){let e,s,c,a=!0;e:for(;;){t:for(;;){if(x<b-2&&t.v2Continuator[s=(e=i[g].slice(x,c=x+3)).toLowerCase()]){if("and"===s){if(t.variableCharsObj[c])break t;if(k)return!1}o.push({type:"3operator",text:e,i1:g,c1:x,c2:x+3}),x+=3;break e}break t}t:for(;;){if(x<b-1&&t.v2Continuator[s=i[g].slice(x,c=x+2).toLowerCase()]){if("or"===s&&t.variableCharsObj[i[g][c]])break t;o.push({type:"2operator",text:i[g].slice(x,x+2),i1:g,c1:x,c2:x+2}),x+=2;break e}break t}if(x<b&&t.v2Continuator[i[g][x].toLowerCase()]){if("+"===i[g][x]&&"+"===i[g][x+1]&&r("illegal v2Continuator `++`",we()),"-"===i[g][x]&&"-"===i[g][x+1]&&r("illegal v2Continuator `++`",we()),"?"===i[g][x]){if(o.push({type:"? ternary",text:"?",i1:g,c1:x}),v++,x++,C=-1,N=g,ne()||ae(),g===n)return!1;":"===i[g][x]?(o.push({type:": ternary",text:":",i1:g,c1:x}),v--,x++):(r("illegal: why is there no : after ? ternary",me()),v--,x++,a=!1)}else":"===i[g][x]?(v||r("illegal: unexpected :",me()),a=!1):(o.push({type:"1operator",text:i[g][x],i1:g,c1:x}),x++);break e}return!1}return C=-1,N=g,a}()?(ae(),!0):!!w&&(ue()?(ae(),!0):void 0)),e?(g!==s&&(R=o.length,G=g),!0):w&&ue()?ae():void 0}function oe(e){o.push({type:`[ ${e}`,text:"[",i1:g,c1:x}),N=g,x++;let t=!1;for(;;){if(!he())return!1;","===i[g][x]?(x++,t=!0,N=g,C=-1):g!==N&&r(`ILLEGAL ] ${e} i !== legalObjLine`,me());const n=o.length;if(!ne()&&!ae())return t&&(t=!1,r("ILLEGAL trailling , ARRAY",me()),o.splice(n,0,{type:`ILLEGAL trailling , ${e}`,text:",",i1:g,c1:x})),"]"!==i[g][x]&&r(`\`${i[g][x]}\` illegal NOT ] ${e} ${we()}`),o.push({type:`] ${e}`,text:"]",i1:g,c1:x}),x++,!0;t&&(t=!1,o.splice(n,0,{type:`, ${e}`,text:",",i1:g,c1:x}))}}function se(){if(ce()){for(;ce(););return!0}}function ce(){if("."===i[g][x]){T=!1,x++,o.push({type:". property",text:".",i1:g,c1:x});const e=x;return de(),o.push({type:"(.) property findTrailingExpr",text:i[g].slice(e,x),i1:g,c1:e,c2:x}),!0}if("("===i[g][x]){const e=function(e){const t=o.length,s=o[o.length-1];let c;for(o.push({type:"( function CALL",text:"(",i1:g,c1:x}),N=g,C=-1,x++;;){if(!he())return r("ILLEGAL ) function CALL OUT OF LINES",me()),2;","===i[g][x]?(x++,c=!0,N=g,C=-1):g!==N&&r("ILLEGAL ) function CALL i !== legalObjLine",me());const e=o.length;if(!ne()&&!ae()){if(","===i[g][x]){o.splice(e,0,{type:", function CALL",text:",",i1:g,c1:x});continue}return c&&(c=!1,r("ILLEGAL trailling , function CALL",me()),o.splice(e,0,{type:"ILLEGAL trailling , function CALL",text:",",i1:g,c1:x})),")"!==i[g][x]&&r(`\`${i[g][x]}\` illegal NOT ) function CALL ${we()}`),o.push({type:") function CALL",text:")",i1:g,c1:x}),x++,T=!0,F=t,s&&("idkVariable"===s.type||"(.) property findTrailingExpr"===s.type)&&(s.type="functionName"),C=g,1}if(c&&(c=!1,o.splice(e,0,{type:", function CALL",text:",",i1:g,c1:x})),g===n)return 2}}();if(1===e)return!0;if(2===e)return!1}if(function(){if("["===i[g][x])return oe("ArrAccess"),!0}())return T=!1,!0}function ae(){if(g===n)return r("illegal empty assignment",me()),!1;if(ye(),x===b||";"===i[g][x])return w?ue()&&ae():fe()&&(g++,x=0,b=i[g].length,ae()),!1;if(l=x,"%"===i[g][x]||t.variableCharsObj[i[g][x]]){for(x++,o.push({type:"start unit"});x<b&&(xe()||t.variableCharsObj[i[g][x]]);)x++;const e=i[g].slice(l,x);if(isNaN(Number(e))){if(k&&"and"===e.toLowerCase())return k=!1,o.push({type:"legacyIf and{ws} findExpression",text:`${e} `,i1:g,c1:l,c2:x+1}),x++,!1;o.push({type:"idkVariable",text:e,i1:g,c1:l,c2:x}),C=g}else o.push({type:"Integer",text:e,i1:g,c1:l,c2:x});return se(),o.push({type:"end unit"}),ne(),!0}if('"'===i[g][x]&&(p=x,a=g,x++,pe()||le()||(x++,r("AS LAST RESORT: doing skipThroughEmptyLines",me()),w=!0,he()),1))return ne(),!0;if(g===n)return r("findExpression OutOfLines"),!1;if("("===i[g][x]){let e="group";const t=o.length-1;let i=o[t];for(;;){if(i){if("emptyLines"===i.type&&(i=o[t-1],!i))break;"if"===i.type?e="if":"while"===i.type&&(e="while")}break}return o.push({type:`( ${e}`,text:"(",i1:g,c1:x}),x++,C=-1,ne()||ae(),o.push({type:`) ${e}`,text:")",i1:g,c1:x}),x++,ne(),!0}if("["===i[g][x])return!!oe("Array")&&(ne(),!0);if(g!==C&&"{"===i[g][x]){o.push({type:"{ object",text:"{",i1:g,c1:x}),N=g,v++,x++;let e=!1;for(;;){if(!he())return!1;const t=o.length;","===i[g][x]?(x++,e=!0,N=g,C=-1,ye()):g!==N&&r("ILLEGAL } Array i !== legalObjLine",me());const n=o.length;if(!ne()&&!ae())return e&&(e=!1,r("ILLEGAL trailling , object",me()),o.splice(t,0,{type:"ILLEGAL trailling , object",text:",",i1:g,c1:x})),"}"!==i[g][x]&&r(`\`${i[g][x]}\` illegal NOT } object ${we()}`),o.push({type:"} object",text:"}",i1:g,c1:x}),C=-1,v--,x++,se(),ne(),ne(),!0;{const i=o.length-n;if(4===i){let e=o[n+3];"emptyLines"===e.type&&(e=o[n+1],"idkVariable"===e.type&&(e.type="singleVar"))}else if(3===i){const e=o[n+1];"idkVariable"===e.type&&(e.type="singleVar")}e&&(e=!1,o.splice(t,0,{type:", object",text:",",i1:g,c1:x}))}if(":"!==i[g][x])return r("illegal obj2, key without : ",me()),!1;o.push({type:": object",text:":",i1:g,c1:x}),x++,N=g,ye(),ne()||ae()}}}function pe(){for(;x<b;){if('"'===i[g][x]){if(x<b-1&&'"'===i[g][x+1]){x+=2;continue}{x++,C=g;const e=X([p,a]);return o.push({type:"String",text:e,i1:a,c1:p,i2:g,c2:x}),!0}}if(";"===i[g][x]&&t.whiteSpaceObj[i[g][x-1]])return r("semiColonComment when findClosingQuote",me()),!1;x++}return!1}function le(){return!!fe()&&(!(!function(){for(g++;g<n;){if(x=0,b=i[g].length,ye(),x<b&&")"===i[g][x])return w=!1,x++,pe();if(pe())return ne(),!1;g++}}()&&!w)||le())}function fe(){return!!he()&&"("===i[g][x]&&(w=!0,!0)}function ue(){return g++,x=0,b=i[g].length,ye(),x!==b&&")"===i[g][x]?(w=!1,r(`) Expression ${me()}`),x++,!0):(r(`illegal in endExprContinuation ${me()}`),!1)}function he(){const e=x,r=g;e:for(;g<n;){for(;x<b&&t.whiteSpaceObj[i[g][x]];)x++;if(x===b);else if(";"!==i[g][x]||0!==x&&!t.whiteSpaceObj[i[g][x-1]]){if(!(x<b-1&&"/*"===i[g].slice(x,x+2))){const t=X([e,r]);return t&&o.push({type:"emptyLines",text:t,i1:r,c1:e,i2:g,c2:x}),!0}for(;;){if(++g===n)break e;for(x=0,b=i[g].length;x<b&&t.whiteSpaceObj[i[g][x]];)x++;if(x<b-1&&"*/"===i[g].slice(x,x+2)){x+=2;continue e}}}if(g++,!(g<n))break e;x=0,b=i[g].length}g--,x=b;const s=X([e,r]);return s&&o.push({type:"emptyLines EOF",text:s,i1:r,c1:e,i2:g,c2:x}),g++,!1}function ye(){const e=x;for(;x<b&&t.whiteSpaceObj[i[g][x]];)x++;const n=i[g].slice(e,x);n&&o.push({type:"whiteSpaces",text:n,i1:g,c1:e,c2:x})}function ge(){if("%"===i[g][x]){if("`"!==i[g][x-1]){const e=u,n=i[g].slice(f,e);for(o.push({type:"v1String findPercentVarV1Expression",text:n,i1:g,c1:f,c2:e}),o.push({type:"%START %Var%",text:"%",i1:g,c1:x}),x++,h=x,x<b&&t.variableCharsObj[i[g][x]]||r("illegal empty %VAR%");x<b&&t.variableCharsObj[i[g][x]];)x++;const s=i[g].slice(h,x);return r("percentVar====",s),o.push({type:"percentVar v1Expression",text:s,i1:g,c1:h,c2:x}),"%"!==i[g][x]&&r("illegal %VAR% in v1Expression",me()),u=x,o.push({type:"END% %Var%",text:i[g][x],i1:g,c1:x}),!0}r("literal % in findV1Expression")}return!1}function xe(){return x<b&&"%"===i[g][x]&&(x++,de(),x<b&&"%"===i[g][x]||(r(i[g].slice(l,x),"ILLEGAL %VAR%",me()),!1))}function be(){return x++,$=x,de(),x<b&&"%"===i[g][x]?(o.push({type:"v1String percentVarMid",text:i[g].slice($,x),i1:g,c1:$,c2:x}),o.push({type:"% percentVarMid",text:"%",i1:g,c1:x}),!0):(r(i[g].slice(l,x),"ILLEGAL %VAR%",me()),!1)}function de(){for(;x<b&&t.variableCharsObj[i[g][x]];)x++}function me(){return`${x+1} line ${g+1}`}function we(){return`line:${g+1}, char:${x+1}`}}})(),window.ahkParser=n.default})();