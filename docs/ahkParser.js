(()=>{"use strict";var e={246:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.emptyLinesObj=t.thisCouldBeFuncName=t.elseTryFinally=t.elseLoopReturn=t.legacyIfOperators=t.v2Continuator=t.v1Continuator=t.assignmentOperators=t.operatorsObj=t.whiteSpaceOverrideAssign=t.typeOfValidVarName=t.namedIf=t.propCharsObj=t.variableCharsObj=t.whiteSpaceObj=t.whiteSpace=void 0,t.whiteSpace=/\u000B\u000C\u0020\u00A0/,t.whiteSpaceObj={" ":!0,"\t":!0},t.variableCharsObj={a:!0,b:!0,c:!0,d:!0,e:!0,f:!0,g:!0,h:!0,i:!0,j:!0,k:!0,l:!0,m:!0,n:!0,o:!0,p:!0,q:!0,r:!0,s:!0,t:!0,u:!0,v:!0,w:!0,x:!0,y:!0,z:!0,A:!0,B:!0,C:!0,D:!0,E:!0,F:!0,G:!0,H:!0,I:!0,J:!0,K:!0,L:!0,M:!0,N:!0,O:!0,P:!0,Q:!0,R:!0,S:!0,T:!0,U:!0,V:!0,W:!0,X:!0,Y:!0,Z:!0,0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,_:!0,"#":!0,"@":!0,$:!0},t.propCharsObj={a:!0,b:!0,c:!0,d:!0,e:!0,f:!0,g:!0,h:!0,i:!0,j:!0,k:!0,l:!0,m:!0,n:!0,o:!0,p:!0,q:!0,r:!0,s:!0,t:!0,u:!0,v:!0,w:!0,x:!0,y:!0,z:!0,A:!0,B:!0,C:!0,D:!0,E:!0,F:!0,G:!0,H:!0,I:!0,J:!0,K:!0,L:!0,M:!0,N:!0,O:!0,P:!0,Q:!0,R:!0,S:!0,T:!0,U:!0,V:!0,W:!0,X:!0,Y:!0,Z:!0,0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,_:!0},t.namedIf={ifequal:!0,ifnotequal:!0,ifless:!0,iflessorequal:!0,ifgreater:!0,ifgreaterorequal:!0},t.typeOfValidVarName={class:5,autotrim:4,blockinput:4,break:4,catch:4,click:4,clipwait:4,continue:4,control:4,controlclick:4,controlfocus:4,controlget:4,controlgetfocus:4,controlgetpos:4,controlgettext:4,controlmove:4,controlsend:4,controlsendraw:4,controlsettext:4,coordmode:4,critical:4,detecthiddentext:4,detecthiddenwindows:4,drive:4,driveget:4,drivespacefree:4,edit:4,else:4,envadd:4,envdiv:4,envget:4,envmult:4,envset:4,envsub:4,envupdate:4,exit:4,exitapp:4,fileappend:4,filecopy:4,filecopydir:4,filecreatedir:4,filecreateshortcut:4,filedelete:4,fileencoding:4,fileinstall:4,filegetattrib:4,filegetshortcut:4,filegetsize:4,filegettime:4,filegetversion:4,filemove:4,filemovedir:4,fileread:4,filereadline:4,filerecycle:4,filerecycleempty:4,fileremovedir:4,fileselectfile:4,fileselectfolder:4,filesetattrib:4,filesettime:4,finally:4,for:4,formattime:4,getkeystate:4,gosub:4,goto:4,groupactivate:4,groupadd:4,groupclose:4,groupdeactivate:4,gui:4,guicontrol:4,guicontrolget:4,hotkey:4,ifequal:4,ifnotequal:4,ifexist:4,ifnotexist:4,ifgreater:4,ifgreaterorequal:4,ifinstring:4,ifnotinstring:4,ifless:4,iflessorequal:4,ifmsgbox:4,ifwinactive:4,ifwinnotactive:4,ifwinexist:4,ifwinnotexist:4,imagesearch:4,inidelete:4,iniread:4,iniwrite:4,input:4,inputbox:4,keyhistory:4,keywait:4,listhotkeys:4,listlines:4,listvars:4,loop:4,menu:4,mouseclick:4,mouseclickdrag:4,mousegetpos:4,mousemove:4,msgbox:4,onexit:4,outputdebug:4,pause:4,pixelgetcolor:4,pixelsearch:4,postmessage:4,process:4,progress:4,random:4,regdelete:4,regread:4,regwrite:4,reload:4,return:4,run:4,runas:4,runwait:4,send:4,sendraw:4,sendinput:4,sendplay:4,sendevent:4,sendlevel:4,sendmessage:4,sendmode:4,setbatchlines:4,setcapslockstate:4,setcontroldelay:4,setdefaultmousespeed:4,setenv:4,setformat:4,setkeydelay:4,setmousedelay:4,setnumlockstate:4,setscrolllockstate:4,setregview:4,setstorecapslockmode:4,settimer:4,settitlematchmode:4,setwindelay:4,setworkingdir:4,shutdown:4,sleep:4,sort:4,soundbeep:4,soundget:4,soundgetwavevolume:4,soundplay:4,soundset:4,soundsetwavevolume:4,splashimage:4,splashtexton:4,splashtextoff:4,splitpath:4,statusbargettext:4,statusbarwait:4,stringcasesense:4,stringgetpos:4,stringleft:4,stringlen:4,stringlower:4,stringmid:4,stringreplace:4,stringright:4,stringsplit:4,stringtrimleft:4,stringtrimright:4,stringupper:4,suspend:4,switch:4,sysget:4,thread:4,throw:4,tooltip:4,transform:4,traytip:4,try:4,until:4,urldownloadtofile:4,while:4,winactivate:4,winactivatebottom:4,winclose:4,wingetactivestats:4,wingetactivetitle:4,wingetclass:4,winget:4,wingetpos:4,wingettext:4,wingettitle:4,winhide:4,winkill:4,winmaximize:4,winmenuselectitem:4,winminimize:4,winminimizeall:4,winminimizeallundo:4,winmove:4,winrestore:4,winset:4,winsettitle:4,winshow:4,winwait:4,winwaitactive:4,winwaitnotactive:4,winwaitclose:4,global:3,local:3,static:3,if:2,"#clipboardtimeout":1,"#commentflag":1,"#errorstdout":1,"#escapechar":1,"#hotkeyinterval":1,"#hotkeymodifiertimeout":1,"#hotstring":1,"#if":1,"#ifwinactive":1,"#ifwinexist":1,"#ifwinnotactive":1,"#ifwinnotexist":1,"#iftimeout":1,"#include":1,"#includeagain":1,"#inputlevel":1,"#installkeybdhook":1,"#installmousehook":1,"#keyhistory":1,"#maxhotkeysperinterval":1,"#maxmem":1,"#maxthreads":1,"#maxthreadsbuffer":1,"#maxthreadsperhotkey":1,"#menumaskkey":1,"#noenv":1,"#notrayicon":1,"#persistent":1,"#requires":1,"#singleinstance":1,"#usehook":1,"#warn":1,"#winactivateforce":1,"#ltrim":1},t.whiteSpaceOverrideAssign={1:!0,2:!0,3:!0},t.operatorsObj={new:!0,"++":!0,"--":!0,"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,not:!0,and:!0,"&&":!0,or:!0,"||":!0,"?":!0,":":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.assignmentOperators={"++":!0,"--":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.v1Continuator={",":!0,"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,"&&":!0,"||":!0,"?":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.v2Continuator={"**":!0,"!":!0,"~":!0,"&":!0,"*":!0,"/":!0,"//":!0,"-":!0,"+":!0,"<<":!0,">>":!0,"^":!0,"|":!0,".":!0,"~=":!0,">":!0,"<":!0,">=":!0,"<=":!0,"=":!0,"==":!0,"<>":!0,"!=":!0,and:!0,"&&":!0,or:!0,"||":!0,"?":!0,":":!0,":=":!0,"+=":!0,"-=":!0,"*=":!0,"/=":!0,"//=":!0,".=":!0,"|=":!0,"&=":!0,"^=":!0,">>=":!0,"<<=":!0},t.legacyIfOperators={"=":!0,"<>":!0,"!=":!0,">":!0,">=":!0,"<":!0,"<=":!0},t.elseLoopReturn={else:!0,loop:!0,return:!0,try:!0,finally:!0},t.elseTryFinally={else:"else",try:"try",finally:"finally"},t.thisCouldBeFuncName={idkVariable:!0,"(.) property findTrailingExpr":!0},t.emptyLinesObj={emptyLines:!0,"emptyLines EOF":!0}}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,i),o.exports}var n={};(()=>{var e=n;const t=i(246),r=console.debug.bind(console);e.default=(e,i=!1)=>{"\ufeff"===e[0]&&(e=e.slice(1));const n=e.split("\n"),o=n.length,c=[],s={whiteSpaces:!0,emptyLines:!0};let a;a=0;let p,l,f,u,h,y,x,b,g,d,m=0,w=0,v=0,L=0,k="",C=!1,O=0,j=!1,I=-1,S=!1,E=!1,A=!1,V=!1;d=0;let $,N,T,R,F=!1,G=0,D=-1,q=!1,P=!1,z=-1,M=-1,B=-1;R=i?function(){for(m++;m<o;){for(w=0,v=n[m].length;w<v&&t.whiteSpaceObj[n[m][w]];)w++;if(w<v&&")"===n[m][w]){C=!1;const e=w;m--,w=n[m].length;const t=re([x,b]);return c.push({type:"StringContinuation",text:t,i1:p,c1:l,i2:m,c2:w}),c.push({type:"newline ) continuation",text:"\n",i1:m,c1:w}),m++,w=e,c.push({type:"whiteSpaces ) continuation",text:n[m].slice(0,w),i1:m,c1:0,c2:w}),c.push({type:") continuation",text:")",i1:m,c1:w}),w++,l=w,p=m,xe()}m++}}:function(){for(m++;m<o;){if(w=0,v=n[m].length,we(),w<v&&")"===n[m][w])return C=!1,w++,xe();if(xe())return pe(),!1;m++}};e:for(;m<o&&(w=0,v=n[m].length,me());){t:for(;;){if(m===o)break e;if(w===v){c.push({type:"newLine startOfLineLoop",text:"\n",i1:m,c1:w}),m++;continue e}if(";"===n[m][w]){const e=n[m].slice(w,v);c.push({type:"SemiColonComment",text:e,i1:m,c1:w,c2:v}),c.push({type:"newLine SemiColonComment",text:"\n",i1:m,c1:w}),m++;continue e}if("}"===n[m][w]){if(c.push({type:"} unknown",text:"}",i1:m,c1:w}),w++,!me())break e;j=!0;continue t}if("{"===n[m][w]&&(c.push({type:"perhaps { namedIf",text:"{",i1:m,c1:w}),w++,!me()))break e;f=w;const e=w;if($=c.length,t.variableCharsObj[n[m][w]]){w++,Ce(),k=n[m].slice(f,w),T=w,N=m;const i=t.typeOfValidVarName[k.toLowerCase()];if(i){M=m;const s=c.length;if(me()){if(","===n[m][w]){if(c.push({type:"(statement) ,",text:",",i1:m,c1:w}),w++,1===i||4===i){const t=X();if(1===t)continue t;if(2===t)continue e;if(c.splice($,0,{type:"DIRECTIVE OR COMMAND comma",text:k,i1:N,c1:e,c2:T}),A=!0,ce(),A=!1,m===o)break e;Y(", command comma"),U("end command"),j=!0;continue t}j=!0;continue t}if(m===N&&t.whiteSpaceObj[n[N][T]]){if(1===i){c.splice($,0,{type:"directive",text:k,i1:N,c1:e,c2:T});const t=n[m].slice(w,v);c.push({type:"directive to EOL",text:t,i1:m,c1:f,c2:v}),c.push({type:"newLine directive",text:"\n",i1:m,c1:w}),m++;continue e}if(2===i){c.splice($,0,{type:"if",text:k,i1:N,c1:e,c2:T}),$=c.length;i:for(;t.variableCharsObj[n[m][w]];){const e=w,i=m,r=v;for(;Le()||t.variableCharsObj[n[m][w]];)w++;const s=w;for(;w<v&&t.whiteSpaceObj[n[m][w]];)w++;const a=w;let p=w,l=c.length;Ce(),T=w,N=m;let f=n[N].slice(p,T);n:for(;;){if(!f){if(w<v-1&&t.legacyIfOperators[n[m].slice(w,w+2)]){c.push({type:"2legacyIfOperators",text:n[m].slice(w,w+2),i1:m,c1:w,c2:w+2}),w+=2;break n}if(w<v&&t.legacyIfOperators[n[m][w]]){c.push({type:"1legacyIfOperators",text:n[m][w],i1:m,c1:w}),w++;break n}w=e,m=i,v=r;break i}const o=f.toLowerCase();let s,a=!1;if("not"!==o||w!==v&&!t.whiteSpaceObj[n[m][w]]?a=!0:(c.push({type:"legacyIf not",text:f,i1:m,c1:p,c2:w}),we(),p=w,l=c.length,Ce(),T=w,N=m,f=n[N].slice(p,T)),"in"!==o||w!==v&&!t.whiteSpaceObj[n[m][w]])if("contains"!==o||w!==v&&!t.whiteSpaceObj[n[m][w]]){if("between"===o&&(w===v||t.whiteSpaceObj[n[m][w]])){c.push({type:"legacyIf between",text:f,i1:m,c1:p,c2:w}),S=!0;break n}}else c.push({type:"legacyIf contains",text:f,i1:m,c1:p,c2:w}),E=!0;else c.push({type:"legacyIf in",text:f,i1:m,c1:p,c2:w}),E=!0;if(a&&"is"===o&&(w===v||t.whiteSpaceObj[n[m][w]])){c.push({type:"legacyIf is",text:f,i1:m,c1:p,c2:w}),we(),f=n[m].slice(w,s=w+3),"not"!==f.toLowerCase()||t.variableCharsObj[n[m][s]]||(c.push({type:"legacyIf (is) not",text:f,i1:m,c1:w,c2:w+3}),w+=3,we());break n}const u=w,h=m;if(!me()){w=e,m=i,v=r,c.splice(c.length-1,1);break i}let y=!0;w===u&&m===h&&(y=!1),w=e,m=i,v=r,y&&c.splice(c.length-1,1);break i}const u=n[i].slice(s,a);if(u&&c.splice(l,0,{type:"whiteSpaces",text:u,i1:m,c1:s,c2:w}),c.splice(l,0,{type:"legacyIf var",text:n[i].slice(e,s),i1:i,c1:e,c2:s}),ce(),E=!1,m===o)break e;if("{"===n[m][w]&&(c.push({type:"{ legacyIf",text:"{",i1:m,c1:w}),w++,!me()))break e;j=!0;continue t}if(pe()||ye(),c.splice(c.length-1,0,{type:"end if"}),m===o)break e;if("{"===n[m][w]&&(c.push({type:"{ if",text:"{",i1:m,c1:w}),w++,!me()))break e;j=!0;continue t}if(w<v&&"="===n[m][w]){c.splice($,0,{type:"var at whiteSpace v1Assignment",text:k,i1:m,c1:f,c2:w}),c.push({type:"= whiteSpace v1Assignment",text:"=",i1:m,c1:w}),w++,ce(),j=!0;continue t}const s=W();if(1===s)continue t;if(2===s)break e;if(3===i){if(c.splice($,0,{type:"global local or static{ws}",text:k,i1:N,c1:e,c2:T}),K(),pe(),J())break e;j=!0;continue t}if(4===i){const e=X();if(1===e)continue t;if(2===e)continue e;if("for"===k.toLowerCase()){let e,i,s;if(c.splice($,0,{type:"for",text:k,i1:N,c1:f,c2:T}),K(),","===n[m][w]&&(c.push({type:", for",text:",",i1:m,c1:w}),w++,K()),"in"!==(e=n[m].slice(w,i=w+2)).toLowerCase()||i!==v&&!t.whiteSpaceObj[s=n[m][i]]?r("ILLEGAL, (for) is missing `in`"):c.push({type:"in{ws} lookForIn",text:`${e}${s||""}`,i1:m,c1:w,c2:i}),w+=3,pe()||ye(),m===o)break e;if(U("end command"),"{"===n[m][w]&&(c.push({type:"{ for",text:"{",i1:m,c1:w}),w++,!me()))break e;j=!0;continue t}let i;if(i=t.elseTryFinally[k.toLowerCase()]){if(c.splice($,0,{type:`${i} whiteSpace`,text:k,i1:N,c1:f,c2:T}),"{"===n[m][w]&&(c.push({type:`{ ${i}`,text:"{",i1:m,c1:w}),w++,!me()))break e;j=!0;continue t}if(c.splice($,0,{type:"command",text:k,i1:N,c1:f,c2:T}),A=!0,ce(),A=!1,m===o)break e;Y(", command whiteSpace"),U("end command"),j=!0;continue t}if(5===i){c.splice($,0,{type:"class",text:k,i1:N,c1:f,c2:T});const e=w;if(Ce(),c.push({type:"className",text:n[m].slice(e,w),i1:m,c1:e,c2:w}),!me())break e;let t;if("extends"===(t=n[m].slice(w,w+7)).toLowerCase()){c.push({type:"className",text:t,i1:m,c1:w,c2:w+7}),w+=7,we();const e=w;Ce();const i=n[m].slice(e,w);if(i&&c.push({type:"extendedClassName",text:i,i1:m,c1:e,c2:w}),!me())break e}if("{"===n[m][w]){if(c.push({type:"{ class",text:"{",i1:m,c1:w}),w++,!me())break e}else r("illegal class name",je());j=!0;continue t}r("this cannot happen because idkType must be in 1,2,3,4,5",je())}else if("("===n[m][w]){if(2===i){if(c.splice($,0,{type:"if",text:k,i1:N,c1:e,c2:T}),pe()||ye(),c.splice(c.length-1,0,{type:"end if"}),m===o)break e;if("{"===n[m][w]&&(c.push({type:"{ if",text:"{",i1:m,c1:w}),w++,!me()))break e;j=!0;continue t}const t=Z();if(1===t)continue t;if(2===t)continue e}else if("{"===n[m][w]&&"loop"===k.toLowerCase()){if(c.splice($,0,{type:"loop",text:k,i1:N,c1:f,c2:T}),c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,!me())break e;j=!0;continue t}}if(c.length===s+1||m===o){c.splice($,0,{type:"command EOL or comment",text:k,i1:N,c1:f,c2:T}),P=c.length;const e=k.toLowerCase();if(t.elseLoopReturn[e]){let i;if(pe());else if(i=t.elseTryFinally[e]){if("{"===n[m][w]&&(c.push({type:`{ ${i}`,text:"{",i1:m,c1:w}),w++,!me()))break e}else if("loop"===e&&"{"===n[m][w]&&(c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,!me()))break e}else{if(m===o)break e;ae(),Y("command EOL or comment"),U("end command")}j=!0;continue t}}if(m===N&&":"===n[m][w]&&(w+1===v||t.whiteSpaceObj[n[m][w+1]])){w++;const e=n[m].slice(f,w);if(c.push({type:"label:",text:e,i1:m,c1:f,c2:w}),!me())break e;j=!0;continue t}}for(;w<v&&(Le()||t.variableCharsObj[n[m][w]]);)w++;if(w===v){r("illegal: unexpected EOL after var parsing",Oe()),m++;continue e}if(k=n[m].slice(f,w),T=w,N=m,q=!1,k){let t=W();if(1===t)continue t;if(2===t)break e;if(ue(),m===o||!me()){q&&c.splice($,0,{type:"functionName",text:k,i1:N,c1:e,c2:T});break e}if(w<v&&"="===n[m][w]&&":"!==n[m][w+1]){c.splice($,0,{type:"var at v1Assignment",text:k,i1:N,c1:e,c2:T}),c.push({type:"= v1Assignment",text:"=",i1:m,c1:w}),w++,M=m,ce(),j=!0;continue t}if(t=W(),1===t)continue t;if(2===t)break e;if(q){if(!me()){c.splice($,0,{type:"functionName",text:k,i1:N,c1:e,c2:T});break e}if("{"===n[m][w]){if(c.splice($,0,{type:"function DEFINITION name",text:k,i1:N,c1:e,c2:T}),B===$){L=B+1,c[L++].type="( function DEFINITION";let e,t=!0;i:for(;;){if(e=Q(),", function CALL"===e.type){e.type=", function DEFINITION",L++,t=!0;continue i}if(") function CALL"===e.type)break i;t&&"idkVariable"===e.type&&("byref"===e.text.toLowerCase()&&(e.type="byref",L++,e=_()),e.type="Param",L++,e=Q(),"1operator"===e.type&&("*"===e.text?e.type="* variadic Argument":"="===e.text&&(e.type="= v1Assignment")));let i=1;for(;;){const n=e.type;if(i){if(") function CALL"===n?i--:"( function CALL"===n&&i++,0===i)break i;if(1===i&&", function CALL"===n){L++,t=!0;continue i}}e=c[++L]}}e.type=") function DEFINITION"}else r("illegal: { but not function DEFINITION",je());if(c.push({type:"{ function DEFINITION",text:"{",i1:m,c1:w}),w++,!me())break e;j=!0;continue t}if(c.splice($,0,{type:"functionName",text:k,i1:N,c1:e,c2:T}),J())break e;j=!0;continue t}}const i=W();if(1!==i){if(2===i)break e;for(w=w===f?w+1:w;w<v;){if(":"===n[m][w]){if(w++,w<v&&":"===n[m][w]){w++;const e=n[m].slice(f,w);m===z&&!1!==P&&c.splice(P),c.push({type:"hotkey",text:e,i1:m,c1:f,c2:w});const i=n[m][w],r=w+1;if(!i||t.whiteSpaceObj[i]||r!==v&&!t.whiteSpaceObj[n[m][r]]||(c.push({type:"hotkey replacementChar",text:i,i1:m,c1:w}),w++),!me())break e;j=!0;continue t}if(w===v||t.whiteSpaceObj[n[m][w]]){const e=n[m].slice(f,w);if(c.push({type:"label:",text:e,i1:m,c1:f,c2:w}),!me())break e;j=!0;continue t}}w++}if(j){j=!1;continue e}break t}}r("end of lineLoop"),m++}if(c.length){const e=c.length-1,t=c[e];t.i1&&t.i1+1===o&&"\n"===t.text&&c.splice(e,1)}return c;function U(e){const i=c.length-1;c.splice(c.length-(t.emptyLinesObj[c[i].type]?1:0),0,{type:e})}function _(){for(;;){const e=c[L];if(e.text){if("concat"===e.type){e.type="whiteSpaces",L++;continue}if(s[e.type]){L++;continue}return e}L++}}function Q(){for(;;){const e=c[L];if(e.text){if(s[e.type]){L++;continue}return e}L++}}function W(){if(1===function(){let e;e:for(;;){if(":"===n[m][w+3])return 2;if(w<v-2&&t.assignmentOperators[e=n[m].slice(w,w+3)]){c.push({type:"3operator",text:e,i1:m,c1:w,c2:w+3}),w+=3;break e}if(":"===n[m][w+2])return 2;if(w<v-1&&t.assignmentOperators[e=n[m].slice(w,w+2)]){c.push({type:"2operator",text:e,i1:m,c1:w,c2:w+2}),w+=2;break e}return!1}return I=-1,D=m,1}()){c.splice($,0,{type:"assignment",text:k,i1:N,c1:void 0,c2:T});const e=m;return te(),pe()||m===e&&ye(),U("end assignment"),J()?2:(j=!0,1)}}function Y(e){if(H(e)){if(m===o)return!1;for(;H(e);)if(m===o)return!1;return!0}}function H(e){if(","===n[m][w])return c.push({type:e,text:",",i1:m,c1:w}),w++,A=!0,ce(),A=!1,!0}function J(){for(;m<o;){if(","!==n[m][w])return!1;c.push({type:", assignment",text:",",i1:m,c1:w}),w++,pe()||ye(),U("end assignment")}return!0}function K(){F=!0,we(),f=w,se()}function X(){const e=function(){if(t.namedIf[k.toLowerCase()])return c.splice($,0,{type:"named if",text:k,i1:N,c1:f,c2:T}),we(),A=!0,se(),c.push({type:", 1 namedIf",text:",",i1:m,c1:w}),w++,A=!1,te(),pe()||ye(),","===n[m][w]?(c.push({type:", 2 namedIf",text:",",i1:m,c1:w}),w++,we(),f=w,Ce(),k=n[m].slice(f,w),t.typeOfValidVarName[k.toLowerCase()]?(w=f,j=!0,1):(w=f,ce(),2)):me()?("{"===n[m][w]&&(c.push({type:"{ namedIf",text:"{",i1:m,c1:w}),w++),ce(),2):2}();if(e)return e;const i=function(){if("loop"===k.toLowerCase()){if(c.splice($,0,{type:"loop",text:k,i1:N,c1:f,c2:T}),!me())return 2;if(t.variableCharsObj[n[m][w]])e:for(;;){let e,i;if("reg"!==(e=n[m].slice(w,i=w+3)).toLowerCase()||t.variableCharsObj[n[m][i]])if("read"!==(e=n[m].slice(w,i=w+4)).toLowerCase()||t.variableCharsObj[n[m][i]])if("files"!==(e=n[m].slice(w,i=w+5)).toLowerCase()||t.variableCharsObj[n[m][i]]){if("parse"!==(e=n[m].slice(w,i=w+5)).toLowerCase()||t.variableCharsObj[n[m][i]])break e;if(c.push({type:"(loop) parse",text:e,i1:m,c1:w,c2:i}),w+=5,!me())return 2;H(", 1 (loop) parse")&&H(", 2 (loop) parse")&&H(", 3 (loop) parse")}else{if(c.push({type:"(loop) files",text:e,i1:m,c1:w,c2:i}),w+=5,!me())return 2;H(", 1 (loop) files")&&H(", 2 (loop) files")}else{if(c.push({type:"(loop) read",text:e,i1:m,c1:w,c2:i}),w+=4,!me())return 2;H(", 1 (loop) read")&&H(", 2 (loop) read")}else{if(c.push({type:"(loop) Reg",text:e,i1:m,c1:w,c2:i}),w+=3,!me())return 2;H(", 1 (loop) Reg")&&H(", 2 (loop) Reg")}return"{"!==n[m][w]||(c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,me())?(j=!0,1):2}return"{"===n[m][w]?(c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,me()?(j=!0,1):2):(A=!0,ce(),A=!1,H(", 1 (loop) idk")&&H(", 2 (loop) idk")&&H(", 3 (loop) idk"),"{"!==n[m][w]||(c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,me())?(j=!0,1):2)}}();if(i)return i;const r=Z();if(r)return r;return function(){if("sendmessage"===k.toLowerCase())return c.splice($,0,{type:"sendmessage",text:k,i1:N,c1:f,c2:T}),te(),pe()||ye(),ee(", 2 sendmessage")&&ee(", 3 sendmessage")&&Y(", sendmessage v1Expr"),1}()||("return"===k.toLowerCase()?(c.splice($,0,{type:"return",text:k,i1:N,c1:f,c2:T}),te(),pe()||ye(),m<o&&","===n[m][w]&&(c.push({type:", doReturn",text:",",i1:m,c1:w}),w++,me()),j=!0,1):"throw"===k.toLowerCase()?(c.splice($,0,{type:"throw",text:k,i1:N,c1:f,c2:T}),pe()||ye(),m<o&&","===n[m][w]&&(c.push({type:", doThrow",text:",",i1:m,c1:w}),w++,me()),j=!0,1):"until"===k.toLowerCase()?(c.splice($,0,{type:"until",text:k,i1:N,c1:f,c2:T}),pe()||ye(),m<o&&","===n[m][w]&&(c.push({type:", doUntil",text:",",i1:m,c1:w}),w++,me()),j=!0,1):void 0)}function Z(){if("while"===k.toLowerCase())return c.splice($,0,{type:"while",text:k,i1:N,c1:f,c2:T}),pe()||ye(),m===o?2:"{"!==n[m][w]||(c.push({type:"{ loop",text:"{",i1:m,c1:w}),w++,me())?(j=!0,1):2}function ee(e){if(","===n[m][w])return c.push({type:e,text:",",i1:m,c1:w}),w++,te(),pe()||ye(),!0}function te(){let e;we(),w<v-1&&"%"===n[m][w]&&t.whiteSpaceObj[e=n[m][w+1]]&&(c.push({type:"% v1->v2 expr",text:`%${e}`,i1:m,c1:w,c2:w+2}),w+=2,I=-1)}function ie(e){const t=n[m].slice(u,h);c.push({type:`v1String ${e}`,text:t,i1:m,c1:u,c2:h})}function ne(e){const t=h+1,i=n[m].slice(u,t);(i||c.length===g)&&c.push({type:`v1String ${e}`,text:i,i1:m,c1:u,c2:t});const r=n[m].slice(t,w);r&&c.push({type:`endingWhiteSpaces v1Expression ${e}`,text:r,i1:m,c1:t,c2:w})}function re(e){const[t,i]=e;if(i===m)return n[m].slice(t,w);{let e=n[i].slice(t);for(let t=i+1;t<m;t++)e+=`\n${n[t]}`;return e+=`\n${n[m].slice(0,w)}`,e}}function oe(e){if(function(e){if(S){let i,r,o;if("and"===(i=n[m].slice(w,r=w+3)).toLowerCase()&&(r===v||t.whiteSpaceObj[o=n[m][r]]))return S=!1,ne(e),c.push({type:`legacyIf and{ws} ${e}`,text:`${i}${o||""}`,i1:m,c1:w,c2:r}),w+=4,u=w,h=w-1,!0}}(e))return oe(e),!1;if(m===M)for(;w<v&&!t.whiteSpaceObj[n[m][w]];){if(h=w,E){if(","===n[m][w]){ie(`${e} beforeDoubleComma`),","===n[m][w+1]?(c.push({type:",, legacyIf var in findV1Expression",text:",,",i1:m,c1:w,c2:w+2}),w+=2):(c.push({type:", legacyIf var in findV1Expression",text:",",i1:m,c1:w}),w++),u=w,h=w-1;continue}}else if(A&&!V&&","===n[m][w]&&"`"!==n[m][w-1])return ie(`${e} beforeSingleComma`),u=w,h=w-1,!0;ve()?(w++,u=w):w++}else for(;w<v&&!t.whiteSpaceObj[n[m][w]];){if(h=w,":"===n[m][w])return z=m,!0;if(E){if(","===n[m][w]){ie(`${e} beforeDoubleComma`),","===n[m][w+1]?(c.push({type:",, legacyIf var in findV1Expression",text:",,",i1:m,c1:w,c2:w+2}),w+=2):(c.push({type:", legacyIf var in findV1Expression",text:",",i1:m,c1:w}),w++),u=w,h=w-1;continue}}else if(A&&!V&&","===n[m][w]&&"`"!==n[m][w-1])return ie(`${e} beforeSingleComma`),u=w,h=w-1,!0;ve()?(w++,u=w):w++}for(;w<v&&t.whiteSpaceObj[n[m][w]];)w++}function ce(){let e;return we(),w<v-1&&"%"===n[m][w]&&t.whiteSpaceObj[e=n[m][w+1]]?(c.push({type:"% v1->v2 expr",text:`%${e}`,i1:m,c1:w,c2:w+2}),w+=2,I=-1,pe()||ye(),!0):(se(),!0)}function se(){if(F)return function(){if(t.variableCharsObj[n[m][w]])G=w,w++;else{if(!(w<v&&"%"===n[m][w]))return!1;c.push({type:"% checkPercent",text:"%",i1:m,c1:w}),ke(),w++,G=w}for(;w<v;){if(w<v&&"%"===n[m][w]){if(c.push({type:"v1String findIdkVar",text:n[m].slice(G,w),i1:m,c1:G,c2:w}),c.push({type:"% checkPercent",text:"%",i1:m,c1:w}),ke(),w++,w===v)return!0;G=w}if(!t.variableCharsObj[n[m][w]])break;w++}const e=n[m].slice(G,w);e&&c.push({type:"v1String findIdkVar",text:e,i1:m,c1:G,c2:w})}(),ae(),void(F=!1);u=w,h=w-1,g=c.length;e:for(;";"!==n[m][w]||!t.whiteSpaceObj[n[m][w-1]];){for(;w<v;){if(";"===n[m][w])break e;if(oe("findV1Expression"))return}break}ne("findV1Expression"),ae()}function ae(){if(!me())return!1;if(void 0===n[m][w]&&r("this shouldn't happen resolveV1Continuation lines[i][c] === undefined"),"("===n[m][w]){V=!0,c.push({type:"( resolveV1Continuation",text:"(",i1:m,c1:w}),w++;const e=n[m].slice(w,v);for(c.push({type:"resolveV1Continuation to EOL",text:e,i1:m,c1:w,c2:v});++m<o;){c.push({type:"newline resolveV1Continuation",text:"\n",i1:m,c1:v}),w=0,v=n[m].length;const e=w;for(;w<v&&t.whiteSpaceObj[n[m][w]];)w++;if(")"===n[m][w]){V=!1;const t=n[m].slice(e,w);return t&&c.push({type:"whiteSpaces before ) resolveV1Continuation",text:t,i1:m,c1:e,c2:w}),c.push({type:") resolveV1Continuation",text:")",i1:m,c1:w}),w++,se(),!0}for(u=0,h=-1;w<v;)oe("resolveV1Continuation");ne("resolveV1Continuation")}return!0}if(!F){if(w<v-2&&t.v1Continuator[n[m].slice(w,w+3)])c.push({type:"3 v1Continuator",text:n[m].slice(w,w+3),i1:m,c1:w,c2:w+3}),w+=3;else if(w<v-1&&t.v1Continuator[n[m].slice(w,w+2)])c.push({type:"2 v1Continuator",text:n[m].slice(w,w+2),i1:m,c1:w,c2:w+2}),w+=2;else{if(!(w<v&&t.v1Continuator[n[m][w]]))return!1;if(function(){if(E&&","===n[m][w])return","===n[m][w+1]?(c.push({type:",, legacyIf var in",text:",,",i1:m,c1:w,c2:w+2}),w+=2,ce()):(c.push({type:", legacyIf var in",text:",",i1:m,c1:w}),w++,ce()),!0}())return!1;if(A)return!1;c.push({type:"1 v1Continuator",text:n[m][w],i1:m,c1:w}),w++}return P=c.length-1,ce(),!1}}function pe(){if(le()){for(;le(););return!0}return!1}function le(){if(m===o)return!1;let e,i=m;if(C){if(we(),w!==v&&";"===n[m][w]&&(r("ILLEGAL semiColonComment insideContinuation",Oe()),de()))return ye()}else if(i=m,!me())return!1;return e=m===i?function(){if(w===v)return!1;if(function(){let e,i,s,a=!0;e:for(;;){t:for(;;){if(w<v-2&&t.operatorsObj[i=(e=n[m].slice(w,s=w+3)).toLowerCase()]){if("and"===i){if(t.variableCharsObj[n[m][s]])break t;if(S)return!1}if("not"===i&&t.variableCharsObj[n[m][s]])break t;c.push({type:"3operator",text:e,i1:m,c1:w,c2:w+3}),w+=3;break e}break t}t:for(;;){if(w<v-1&&t.operatorsObj[i=n[m].slice(w,s=w+2).toLowerCase()]){if("or"===i&&t.variableCharsObj[n[m][s]])break t;c.push({type:"2operator",text:n[m].slice(w,w+2),i1:m,c1:w,c2:w+2}),w+=2;break e}break t}if(w<v&&t.operatorsObj[n[m][w].toLowerCase()]){if("?"===n[m][w]){if(c.push({type:"? ternary",text:"?",i1:m,c1:w}),O++,w++,I=-1,D=m,pe()||ye(),m===o)return!1;":"===n[m][w]?(c.push({type:": ternary",text:":",i1:m,c1:w}),O--,w++):(r("illegal: why is there no : after ? ternary",Oe()),O--,w++,a=!1)}else":"===n[m][w]?(O||r("illegal: unexpected :",Oe()),a=!1):(c.push({type:"1operator",text:n[m][w],i1:m,c1:w}),w++);break e}return!1}return I=-1,D=m,a}())return ye(),!0;const e=c.length-1;if(m===I){if(t.whiteSpaceObj[n[m][w-1]]&&ye())return c[e].type="concat",!1;if("String"===c[e].type){const t=m,i=w;if(ye())return c.splice(e+1,0,{type:"concat no whiteSpace",text:"",i1:t,c1:i,c2:i}),!1}}return!!C&&(de()?(ye(),!0):void 0)}():w!==v&&(function(){let e,i,s,a=!0;e:for(;;){t:for(;;){if(w<v-2&&t.v2Continuator[i=(e=n[m].slice(w,s=w+3)).toLowerCase()]){if("and"===i){if(t.variableCharsObj[n[m][s]])break t;if(S)return!1}c.push({type:"3operator",text:e,i1:m,c1:w,c2:w+3}),w+=3;break e}break t}t:for(;;){if(w<v-1&&t.v2Continuator[i=n[m].slice(w,s=w+2).toLowerCase()]){if("or"===i&&t.variableCharsObj[n[m][s]])break t;c.push({type:"2operator",text:n[m].slice(w,w+2),i1:m,c1:w,c2:w+2}),w+=2;break e}break t}if(w<v&&t.v2Continuator[n[m][w].toLowerCase()]){if("+"===n[m][w]&&"+"===n[m][w+1]&&r("illegal v2Continuator `++`",je()),"-"===n[m][w]&&"-"===n[m][w+1]&&r("illegal v2Continuator `++`",je()),"?"===n[m][w]){if(c.push({type:"? ternary",text:"?",i1:m,c1:w}),O++,w++,I=-1,D=m,pe()||ye(),m===o)return!1;":"===n[m][w]?(c.push({type:": ternary",text:":",i1:m,c1:w}),O--,w++):(r("illegal: why is there no : after ? ternary",Oe()),O--,w++,a=!1)}else":"===n[m][w]?(O||r("illegal: unexpected :",Oe()),a=!1):(c.push({type:"1operator",text:n[m][w],i1:m,c1:w}),w++);break e}return!1}return I=-1,D=m,a}()?(ye(),!0):!!C&&(de()?(ye(),!0):void 0)),e?(m!==i&&(P=c.length,z=m),!0):C&&de()?ye():void 0}function fe(e){c.push({type:`[ ${e}`,text:"[",i1:m,c1:w}),D=m,w++;let t=!1;for(;;){if(!me())return!1;","===n[m][w]?(w++,t=!0,D=m,I=-1):m!==D&&r(`ILLEGAL ] ${e} i !== legalObjLine`,Oe());const i=c.length;if(!pe()&&!ye())return t&&(t=!1,r("ILLEGAL trailling , ARRAY",Oe()),c.splice(i,0,{type:`ILLEGAL trailling , ${e}`,text:",",i1:m,c1:w})),"]"!==n[m][w]&&r(`\`${n[m][w]}\` illegal NOT ] ${e} ${je()}`),c.push({type:`] ${e}`,text:"]",i1:m,c1:w}),w++,!0;t&&(t=!1,c.splice(i,0,{type:`, ${e}`,text:",",i1:m,c1:w}))}}function ue(){if(he()){for(;he(););return!0}}function he(){if("."===n[m][w]){q=!1,w++,c.push({type:". property",text:".",i1:m,c1:w});const e=w;return Ce(),c.push({type:"(.) property findTrailingExpr",text:n[m].slice(e,w),i1:m,c1:e,c2:w}),!0}if("("===n[m][w]){const e=function(e){const t=c.length,i=c[c.length-1];let s;for(c.push({type:"( function CALL",text:"(",i1:m,c1:w}),D=m,I=-1,w++;;){if(!me())return r("ILLEGAL ) function CALL OUT OF LINES",Oe()),2;","===n[m][w]?(w++,s=!0,D=m,I=-1):m!==D&&r("ILLEGAL ) function CALL i !== legalObjLine",Oe());const e=c.length;if(!pe()&&!ye()){if(","===n[m][w]){c.splice(e,0,{type:", function CALL",text:",",i1:m,c1:w});continue}return s&&(s=!1,r("ILLEGAL trailling , function CALL",Oe()),c.splice(e,0,{type:"ILLEGAL trailling , function CALL",text:",",i1:m,c1:w})),")"!==n[m][w]&&r(`\`${n[m][w]}\` illegal NOT ) function CALL ${je()}`),c.push({type:") function CALL",text:")",i1:m,c1:w}),w++,q=!0,B=t,i&&("idkVariable"===i.type||"(.) property findTrailingExpr"===i.type)&&(i.type="functionName"),I=m,1}if(s&&(s=!1,c.splice(e,0,{type:", function CALL",text:",",i1:m,c1:w})),m===o)return 2}}();if(1===e)return!0;if(2===e)return!1}if(function(){if("["===n[m][w])return fe("ArrAccess"),!0}())return q=!1,!0}function ye(){if(m===o)return r("illegal empty assignment",Oe()),!1;if(we(),w===v||";"===n[m][w])return C?de()&&ye():ge()&&(m++,w=0,v=n[m].length,ye()),!1;if(f=w,"%"===n[m][w]||t.variableCharsObj[n[m][w]]){for(w++,c.push({type:"start unit"});w<v&&(Le()||t.variableCharsObj[n[m][w]]);)w++;const e=n[m].slice(f,w);if(isNaN(Number(e))){if(S&&"and"===e.toLowerCase())return S=!1,c.push({type:"legacyIf and{ws} findExpression",text:`${e} `,i1:m,c1:f,c2:w+1}),w++,!1;c.push({type:"idkVariable",text:e,i1:m,c1:f,c2:w}),I=m}else c.push({type:"Integer",text:e,i1:m,c1:f,c2:w}),I=m;return ue(),c.push({type:"end unit"}),pe(),!0}if('"'===n[m][w]&&(l=w,p=m,w++,xe()||(c.push({type:"open doubleQuote",text:'"',i1:m,c1:w}),be()||(w++,r("AS LAST RESORT: doing skipThroughEmptyLines",Oe()),C=!0,me())),1))return pe(),!0;if(m===o)return r("findExpression OutOfLines"),!1;if("("===n[m][w]){let e="group";const t=c.length-1;let i=c[t];for(;;){if(i){if("emptyLines"===i.type&&(i=c[t-1],!i))break;"if"===i.type?e="if":"while"===i.type&&(e="while")}break}return c.push({type:`( ${e}`,text:"(",i1:m,c1:w}),w++,I=-1,pe()||ye(),c.push({type:`) ${e}`,text:")",i1:m,c1:w}),w++,pe(),!0}if("["===n[m][w])return!!fe("Array")&&(pe(),!0);if(m!==I&&"{"===n[m][w]){c.push({type:"{ object",text:"{",i1:m,c1:w}),D=m,O++,w++;let e=!1;for(;;){if(!me())return!1;const t=c.length;","===n[m][w]?(w++,e=!0,D=m,I=-1,we()):m!==D&&r("ILLEGAL } Array i !== legalObjLine",Oe());const i=c.length;if(!pe()&&!ye())return e&&(e=!1,r("ILLEGAL trailling , object",Oe()),c.splice(t,0,{type:"ILLEGAL trailling , object",text:",",i1:m,c1:w})),"}"!==n[m][w]&&r(`\`${n[m][w]}\` illegal NOT } object ${je()}`),c.push({type:"} object",text:"}",i1:m,c1:w}),I=-1,O--,w++,ue(),pe(),pe(),!0;{const n=c.length-i;if(4===n){let e=c[i+3];"emptyLines"===e.type&&(e=c[i+1],"idkVariable"===e.type&&(e.type="singleVar"))}else if(3===n){const e=c[i+1];"idkVariable"===e.type&&(e.type="singleVar")}e&&(e=!1,c.splice(t,0,{type:", object",text:",",i1:m,c1:w}))}if(":"!==n[m][w])return r("illegal obj2, key without : ",Oe()),!1;c.push({type:": object",text:":",i1:m,c1:w}),w++,D=m,we(),pe()||ye()}}}function xe(){for(;w<v;){if('"'===n[m][w]){if(w<v-1&&'"'===n[m][w+1]){w+=2;continue}{w++,I=m;const e=re([l,p]);return c.push({type:"String",text:e,i1:p,c1:l,i2:m,c2:w}),!0}}if(";"===n[m][w]&&t.whiteSpaceObj[n[m][w-1]]){for(;t.whiteSpaceObj[n[m][--w]];);return w++,!1}w++}return!1}function be(){return!!ge()&&(!(!R()&&!C)||be())}function ge(){return!!me()&&"("===n[m][w]&&(C=!0,c.push({type:"( continuation",text:"(",i1:m,c1:w}),w++,c.push({type:"continuation options",text:n[m].slice(w,v),i1:m,c1:w,c2:v}),c.push({type:"newline ( continuation",text:"\n",i1:m,c1:v}),x=0,b=m+1,!0)}function de(){return m++,w=0,v=n[m].length,we(),w!==v&&")"===n[m][w]?(C=!1,r(`) Expression ${Oe()}`),w++,!0):(r(`illegal in endExprContinuation ${Oe()}`),!1)}function me(){const e=w,i=m;e:for(;m<o;){for(;w<v&&t.whiteSpaceObj[n[m][w]];)w++;if(w===v);else if(";"!==n[m][w]||0!==w&&!t.whiteSpaceObj[n[m][w-1]]){if(!(w<v-1&&"/*"===n[m].slice(w,w+2))){const t=re([e,i]);return t&&c.push({type:"emptyLines",text:t,i1:i,c1:e,i2:m,c2:w}),!0}for(;;){if(++m===o)break e;for(w=0,v=n[m].length;w<v&&t.whiteSpaceObj[n[m][w]];)w++;if(w<v-1&&"*/"===n[m].slice(w,w+2)){w+=2;continue e}}}if(m++,!(m<o))break e;w=0,v=n[m].length}m--,w=v;const r=re([e,i]);return r&&c.push({type:"emptyLines EOF",text:r,i1:i,c1:e,i2:m,c2:w}),m++,!1}function we(){const e=w;for(;w<v&&t.whiteSpaceObj[n[m][w]];)w++;const i=n[m].slice(e,w);i&&c.push({type:"whiteSpaces",text:i,i1:m,c1:e,c2:w})}function ve(){if("%"===n[m][w]){if("`"!==n[m][w-1]){const e=h,i=n[m].slice(u,e);for(i&&c.push({type:"v1String findPercentVarV1Expression",text:i,i1:m,c1:u,c2:e}),c.push({type:"%START %Var%",text:"%",i1:m,c1:w}),w++,y=w,w<v&&t.variableCharsObj[n[m][w]]||r("illegal empty %VAR%");w<v&&t.variableCharsObj[n[m][w]];)w++;const o=n[m].slice(y,w);return c.push({type:"percentVar v1Expression",text:o,i1:m,c1:y,c2:w}),"%"!==n[m][w]&&r("illegal %VAR% in v1Expression",Oe()),h=w,c.push({type:"END% %Var%",text:n[m][w],i1:m,c1:w}),!0}r("literal % in findV1Expression")}return!1}function Le(){return w<v&&"%"===n[m][w]&&(w++,Ce(),w<v&&"%"===n[m][w]||(r(n[m].slice(f,w),"ILLEGAL %VAR%",Oe()),!1))}function ke(){return w++,G=w,Ce(),w<v&&"%"===n[m][w]?(c.push({type:"v1String percentVarMid",text:n[m].slice(G,w),i1:m,c1:G,c2:w}),c.push({type:"% percentVarMid",text:"%",i1:m,c1:w}),!0):(r(n[m].slice(f,w),"ILLEGAL %VAR%",Oe()),!1)}function Ce(){for(;w<v&&t.variableCharsObj[n[m][w]];)w++}function Oe(){return`${w+1} line ${m+1}`}function je(){return`line:${m+1}, char:${w+1}`}}})(),window.ahkParser=n.default})();