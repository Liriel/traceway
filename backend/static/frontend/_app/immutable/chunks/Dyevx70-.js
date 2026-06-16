import{i as lt,p as We,t as Xt,b as ht}from"./C_lwEgzC.js";import{l as Vt,s as Qt,p as jt,i as z}from"./7a4wz9Fg.js";import{d as k,c as m,b as o,p as ke,f as A,n as L,t as xe,s as h,a as De,e as g,g as n,h as ge,r as p,k as Q,i as $,l as J,u as X,x as Jt,v as vt}from"./Bq244wU7.js";import{c as V}from"./npWQtwSL.js";import{a as et,b as Qe,T as tt}from"./UP4zC35H.js";import{e as Ve,i as ea}from"./CMOe-Whj.js";import{B as fe}from"./D_PvveBf.js";import{C as Le}from"./CLfv_bqz.js";import{C as Me}from"./v3DbPef4.js";import{a as Ke,s as ta}from"./BXRhph22.js";import{H as ze,g as aa}from"./Cw-wiYxU.js";import{C as ra,a as na,b as oa}from"./BobgzAwU.js";import{C as sa}from"./DrJw9jKm.js";import{C as ia}from"./ohiL75jn.js";import{L as ca}from"./Cvq7tg_y.js";import{A as la,a as da,b as ua,c as pa,d as ma,e as ga}from"./CNJx9-5U.js";import{t as Ge}from"./_rwR96iw.js";import{R as _a}from"./Bse7pcGf.js";import{I as ba,s as va}from"./B9OYPylh.js";function Tt(e,t){const r=Vt(t,["children","$$slots","$$events","$$legacy"]);const a=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor"}]];ba(e,Qt({name:"key-round"},()=>r,{get iconNode(){return a},children:(s,l)=>{var i=k(),d=m(i);va(d,t,"default",{},null),o(s,i)},$$slots:{default:!0}}))}const ft="[A-Za-z$_][0-9A-Za-z$_]*",fa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Ea=["true","false","null","undefined","NaN","Infinity"],wt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],St=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],At=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ya=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ha=[].concat(At,wt,St);function Ta(e){const t=e.regex,r=(N,{after:I})=>{const P="</"+N[0].slice(1);return N.input.indexOf(P,I)!==-1},a=ft,s={begin:"<>",end:"</>"},l=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(N,I)=>{const P=N[0].length+N.index,B=N.input[P];if(B==="<"||B===","){I.ignoreMatch();return}B===">"&&(r(N,{after:P})||I.ignoreMatch());let G;const K=N.input.substring(P);if(G=K.match(/^\s*=/)){I.ignoreMatch();return}if((G=K.match(/^\s+extends\s+/))&&G.index===0){I.ignoreMatch();return}}},d={$pattern:ft,keyword:fa,literal:Ea,built_in:ha,"variable.language":ya},_="[0-9](_?[0-9])*",E=`\\.(${_})`,y="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",S={className:"number",variants:[{begin:`(\\b(${y})((${E})|\\.)?|(${E}))[eE][+-]?(${_})\\b`},{begin:`\\b(${y})\\b((${E})\\b|\\.)?|(${E})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},c={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},b={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"xml"}},f={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"css"}},u={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,c]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,u,v,{match:/\$\d+/},S];c.contains=T.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(T)});const w=[].concat(C,c.contains),R=w.concat([{begin:/(\s*)\(/,end:/\)/,keywords:d,contains:["self"].concat(w)}]),x={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R},M={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...wt,...St]}},te={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},ee={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[x],illegal:/%/},oe={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function _e(N){return t.concat("(?!",N.join("|"),")")}const se={match:t.concat(/\b/,_e([...At,"super","import"].map(N=>`${N}\\s*\\(`)),a,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},q={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},D={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},x]},W="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",j={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(W)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[x]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:R,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),te,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,u,v,C,{match:/\$\d+/},S,F,{scope:"attr",match:a+t.lookahead(":"),relevance:0},j,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:W,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:l},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},ee,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[x,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},q,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[x]},se,oe,M,D,{match:/\$[(.]/}]}}const ct={name:"javascript",register:Ta};function wa(e){const t=e.regex,r={},a={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[r]}]};Object.assign(r,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},a]});const s={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},l=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),i={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},d={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,r,s]};s.contains.push(d);const _={match:/\\"/},E={className:"string",begin:/'/,end:/'/},y={match:/\\'/},S={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,r]},c=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],b=e.SHEBANG({binary:`(${c.join("|")})`,relevance:10}),f={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},u=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],v=["true","false"],O={match:/(\/[a-z._-]+)+/},C=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],T=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],w=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],R=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:u,literal:v,built_in:[...C,...T,"set","shopt",...w,...R]},contains:[b,e.SHEBANG(),f,S,l,i,O,d,_,E,y,r]}}const He={name:"bash",register:wa};function Sa(e){const t=e.regex,r=/(?![A-Za-z0-9])(?![$])/,a=t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,r),s=t.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,r),l=t.concat(/[A-Z]+/,r),i={scope:"variable",match:"\\$+"+a},d={scope:"meta",variants:[{begin:/<\?php/,relevance:10},{begin:/<\?=/},{begin:/<\?/,relevance:.1},{begin:/\?>/}]},_={scope:"subst",variants:[{begin:/\$\w+/},{begin:/\{\$/,end:/\}/}]},E=e.inherit(e.APOS_STRING_MODE,{illegal:null}),y=e.inherit(e.QUOTE_STRING_MODE,{illegal:null,contains:e.QUOTE_STRING_MODE.contains.concat(_)}),S={begin:/<<<[ \t]*(?:(\w+)|"(\w+)")\n/,end:/[ \t]*(\w+)\b/,contains:e.QUOTE_STRING_MODE.contains.concat(_),"on:begin":(q,D)=>{D.data._beginMatch=q[1]||q[2]},"on:end":(q,D)=>{D.data._beginMatch!==q[1]&&D.ignoreMatch()}},c=e.END_SAME_AS_BEGIN({begin:/<<<[ \t]*'(\w+)'\n/,end:/[ \t]*(\w+)\b/}),b=`[ 	
]`,f={scope:"string",variants:[y,E,S,c]},u={scope:"number",variants:[{begin:"\\b0[bB][01]+(?:_[01]+)*\\b"},{begin:"\\b0[oO][0-7]+(?:_[0-7]+)*\\b"},{begin:"\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"},{begin:"(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"}],relevance:0},v=["false","null","true"],O=["__CLASS__","__DIR__","__FILE__","__FUNCTION__","__COMPILER_HALT_OFFSET__","__LINE__","__METHOD__","__NAMESPACE__","__TRAIT__","die","echo","exit","include","include_once","print","require","require_once","array","abstract","and","as","binary","bool","boolean","break","callable","case","catch","class","clone","const","continue","declare","default","do","double","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","enum","eval","extends","final","finally","float","for","foreach","from","global","goto","if","implements","instanceof","insteadof","int","integer","interface","isset","iterable","list","match|0","mixed","new","never","object","or","private","protected","public","readonly","real","return","string","switch","throw","trait","try","unset","use","var","void","while","xor","yield"],C=["Error|0","AppendIterator","ArgumentCountError","ArithmeticError","ArrayIterator","ArrayObject","AssertionError","BadFunctionCallException","BadMethodCallException","CachingIterator","CallbackFilterIterator","CompileError","Countable","DirectoryIterator","DivisionByZeroError","DomainException","EmptyIterator","ErrorException","Exception","FilesystemIterator","FilterIterator","GlobIterator","InfiniteIterator","InvalidArgumentException","IteratorIterator","LengthException","LimitIterator","LogicException","MultipleIterator","NoRewindIterator","OutOfBoundsException","OutOfRangeException","OuterIterator","OverflowException","ParentIterator","ParseError","RangeException","RecursiveArrayIterator","RecursiveCachingIterator","RecursiveCallbackFilterIterator","RecursiveDirectoryIterator","RecursiveFilterIterator","RecursiveIterator","RecursiveIteratorIterator","RecursiveRegexIterator","RecursiveTreeIterator","RegexIterator","RuntimeException","SeekableIterator","SplDoublyLinkedList","SplFileInfo","SplFileObject","SplFixedArray","SplHeap","SplMaxHeap","SplMinHeap","SplObjectStorage","SplObserver","SplPriorityQueue","SplQueue","SplStack","SplSubject","SplTempFileObject","TypeError","UnderflowException","UnexpectedValueException","UnhandledMatchError","ArrayAccess","BackedEnum","Closure","Fiber","Generator","Iterator","IteratorAggregate","Serializable","Stringable","Throwable","Traversable","UnitEnum","WeakReference","WeakMap","Directory","__PHP_Incomplete_Class","parent","php_user_filter","self","static","stdClass"],w={keyword:O,literal:(q=>{const D=[];return q.forEach(W=>{D.push(W),W.toLowerCase()===W?D.push(W.toUpperCase()):D.push(W.toLowerCase())}),D})(v),built_in:C},R=q=>q.map(D=>D.replace(/\|\d+$/,"")),x={variants:[{match:[/new/,t.concat(b,"+"),t.concat("(?!",R(C).join("\\b|"),"\\b)"),s],scope:{1:"keyword",4:"title.class"}}]},M=t.concat(a,"\\b(?!\\()"),F={variants:[{match:[t.concat(/::/,t.lookahead(/(?!class\b)/)),M],scope:{2:"variable.constant"}},{match:[/::/,/class/],scope:{2:"variable.language"}},{match:[s,t.concat(/::/,t.lookahead(/(?!class\b)/)),M],scope:{1:"title.class",3:"variable.constant"}},{match:[s,t.concat("::",t.lookahead(/(?!class\b)/))],scope:{1:"title.class"}},{match:[s,/::/,/class/],scope:{1:"title.class",3:"variable.language"}}]},te={scope:"attr",match:t.concat(a,t.lookahead(":"),t.lookahead(/(?!::)/))},ee={relevance:0,begin:/\(/,end:/\)/,keywords:w,contains:[te,i,F,e.C_BLOCK_COMMENT_MODE,f,u,x]},oe={relevance:0,match:[/\b/,t.concat("(?!fn\\b|function\\b|",R(O).join("\\b|"),"|",R(C).join("\\b|"),"\\b)"),a,t.concat(b,"*"),t.lookahead(/(?=\()/)],scope:{3:"title.function.invoke"},contains:[ee]};ee.contains.push(oe);const _e=[te,F,e.C_BLOCK_COMMENT_MODE,f,u,x],se={begin:t.concat(/#\[\s*\\?/,t.either(s,l)),beginScope:"meta",end:/]/,endScope:"meta",keywords:{literal:v,keyword:["new","array"]},contains:[{begin:/\[/,end:/]/,keywords:{literal:v,keyword:["new","array"]},contains:["self",..._e]},..._e,{scope:"meta",variants:[{match:s},{match:l}]}]};return{case_insensitive:!1,keywords:w,contains:[se,e.HASH_COMMENT_MODE,e.COMMENT("//","$"),e.COMMENT("/\\*","\\*/",{contains:[{scope:"doctag",match:"@[A-Za-z]+"}]}),{match:/__halt_compiler\(\);/,keywords:"__halt_compiler",starts:{scope:"comment",end:e.MATCH_NOTHING_RE,contains:[{match:/\?>/,scope:"meta",endsParent:!0}]}},d,{scope:"variable.language",match:/\$this\b/},i,oe,F,{match:[/const/,/\s/,a],scope:{1:"keyword",3:"variable.constant"}},x,{scope:"function",relevance:0,beginKeywords:"fn function",end:/[;{]/,excludeEnd:!0,illegal:"[$%\\[]",contains:[{beginKeywords:"use"},e.UNDERSCORE_TITLE_MODE,{begin:"=>",endsParent:!0},{scope:"params",begin:"\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0,keywords:w,contains:["self",se,i,F,e.C_BLOCK_COMMENT_MODE,f,u]}]},{scope:"class",variants:[{beginKeywords:"enum",illegal:/[($"]/},{beginKeywords:"class interface trait",illegal:/[:($"]/}],relevance:0,end:/\{/,excludeEnd:!0,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"namespace",relevance:0,end:";",illegal:/[.']/,contains:[e.inherit(e.UNDERSCORE_TITLE_MODE,{scope:"title.class"})]},{beginKeywords:"use",relevance:0,end:";",contains:[{match:/\b(as|const|function)\b/,scope:"keyword"},e.UNDERSCORE_TITLE_MODE]},f,u]}}const dn={name:"php",register:Sa};function Aa(e){const t=e.regex,r=new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*","u"),a=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],d={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:a,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},_={className:"meta",begin:/^(>>>|\.\.\.) /},E={className:"subst",begin:/\{/,end:/\}/,keywords:d,illegal:/#/},y={begin:/\{\{/,relevance:0},S={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,_],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,_],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,_,y,E]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,_,y,E]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,y,E]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,y,E]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},c="[0-9](_?[0-9])*",b=`(\\b(${c}))?\\.(${c})|\\b(${c})\\.`,f=`\\b|${a.join("|")}`,u={className:"number",relevance:0,variants:[{begin:`(\\b(${c})|(${b}))[eE][+-]?(${c})[jJ]?(?=${f})`},{begin:`(${b})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${f})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${f})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${f})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${f})`},{begin:`\\b(${c})[jJ](?=${f})`}]},v={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:d,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},O={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:["self",_,u,S,e.HASH_COMMENT_MODE]}]};return E.contains=[S,u,_],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:d,illegal:/(<\/|\?)|=>/,contains:[_,u,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},S,v,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,r],scope:{1:"keyword",3:"title.function"},contains:[O]},{variants:[{match:[/\bclass/,/\s+/,r,/\s*/,/\(\s*/,r,/\s*\)/]},{match:[/\bclass/,/\s+/,r]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[u,O,S]}]}}const Oa={name:"python",register:Aa};function un(e){const t="go get go.tracewayapp.com";switch(e){case"gin":return`${t} && go get go.tracewayapp.com/tracewaygin`;case"chi":return`${t} && go get go.tracewayapp.com/tracewaychi`;case"fiber":return`${t} && go get go.tracewayapp.com/tracewayfiber`;case"fasthttp":return`${t} && go get go.tracewayapp.com/tracewayfasthttp`;case"stdlib":return`${t} && go get go.tracewayapp.com/tracewayhttp`;case"react":return"npm install @tracewayapp/react";case"svelte":return"npm install @tracewayapp/svelte";case"vuejs":return"npm install @tracewayapp/vue";case"nextjs":return"npm install @tracewayapp/react";case"nestjs":return"npm install @tracewayapp/nest";case"express":return"npm install @tracewayapp/express";case"remix":return"npm install @tracewayapp/remix";case"jquery":return"npm install @tracewayapp/jquery";case"react-native":return"npm install @tracewayapp/react-native";case"hono":return"";case"symfony":return"composer require traceway/opentelemetry-symfony open-telemetry/exporter-otlp php-http/guzzle7-adapter";case"laravel":return"composer require keepsuit/laravel-opentelemetry open-telemetry/exporter-otlp php-http/guzzle7-adapter";case"django":return"pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-django && opentelemetry-bootstrap -a install";case"cloudflare":return"";case"opentelemetry":return"";case"flutter":return"flutter pub add traceway";case"android":return'implementation("com.tracewayapp:traceway:1.0.0")';default:return t}}function pn(e,t,r){const a=t?`${t}@${r}/api/report`:`YOUR_TOKEN@${r}/api/report`;switch(e){case"gin":return`package main

import (
    "github.com/gin-gonic/gin"
    tracewaygin "go.tracewayapp.com/tracewaygin"
)

func main() {
    r := gin.Default()
    r.Use(tracewaygin.New("${a}"))
    r.Run(":8080")
}`;case"chi":return`package main

import (
    "net/http"

    "github.com/go-chi/chi/v5"
    tracewaychi "go.tracewayapp.com/tracewaychi"
)

func main() {
    r := chi.NewRouter()
    r.Use(tracewaychi.New("${a}"))

    r.Get("/api/users", getUsers)
    http.ListenAndServe(":8080", r)
}`;case"fiber":return`package main

import (
    "github.com/gofiber/fiber/v2"
    tracewayfiber "go.tracewayapp.com/tracewayfiber"
)

func main() {
    app := fiber.New()
    app.Use(tracewayfiber.New("${a}"))

    app.Get("/api/users", getUsers)
    app.Listen(":8080")
}`;case"fasthttp":return`package main

import (
    "github.com/valyala/fasthttp"
    tracewayfasthttp "go.tracewayapp.com/tracewayfasthttp"
)

func main() {
    handler := func(ctx *fasthttp.RequestCtx) {
        ctx.SetStatusCode(200)
        ctx.SetBodyString("Hello, World!")
    }

    tracedHandler := tracewayfasthttp.New("${a}")(handler)
    fasthttp.ListenAndServe(":8080", tracedHandler)
}`;case"stdlib":return`package main

import (
    "net/http"

    tracewayhttp "go.tracewayapp.com/tracewayhttp"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/users", getUsers)

    handler := tracewayhttp.New("${a}")(mux)
    http.ListenAndServe(":8080", handler)
}`;case"react":return`import { TracewayProvider } from "@tracewayapp/react";

function App() {
  return (
    <TracewayProvider connectionString="${a}">
      <YourApp />
    </TracewayProvider>
  );
}

export default App;`;case"svelte":return`<!-- src/routes/+layout.svelte -->
<script>
  import { setupTraceway } from "@tracewayapp/svelte";
  import { browser } from "$app/environment";

  if (browser) {
    setupTraceway({
      connectionString: "${a}",
    });
  }
<\/script>

<slot />`;case"vuejs":return`import { createApp } from "vue";
import { createTracewayPlugin } from "@tracewayapp/vue";
import App from "./App.vue";

const app = createApp(App);

app.use(createTracewayPlugin({
  connectionString: "${a}",
}));

app.mount("#app");`;case"nextjs":return`// app/traceway-provider.tsx
"use client";

import { TracewayProvider } from "@tracewayapp/react";

export function TracewayClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <TracewayProvider connectionString="${a}">
      {children}
    </TracewayProvider>
  );
}

// app/layout.tsx
import { TracewayClientProvider } from "./traceway-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TracewayClientProvider>{children}</TracewayClientProvider>
      </body>
    </html>
  );
}`;case"nestjs":return`import { Module } from "@nestjs/common";
import { TracewayModule } from "@tracewayapp/nest";

@Module({
    imports: [
        TracewayModule.forRoot({
            connectionString: "${a}",
        }),
    ],
})
export class AppModule {}`;case"express":return`import express from "express";
import { traceway } from "@tracewayapp/express";

const app = express();
app.use(traceway("${a}"));

app.get("/api/users", (req, res) => {
    res.json({ users: [] });
});

app.listen(8080);`;case"remix":return`import { withTraceway } from "@tracewayapp/remix";

export default withTraceway({
    connectionString: "${a}",
});`;case"jquery":return`import { init } from "@tracewayapp/jquery";

init("${a}");

// jQuery AJAX errors are captured automatically
// Distributed trace headers are injected into $.ajax() requests`;case"react-native":return`import { TracewayProvider } from "@tracewayapp/react-native";

export default function App() {
  return (
    <TracewayProvider connectionString="${a}">
      <RootNavigator />
    </TracewayProvider>
  );
}`;case"symfony":return`<?php
// public/index.php

use App\\Kernel;

require_once dirname(__DIR__) . '/vendor/autoload.php';

\\OpenTelemetry\\SDK\\SdkAutoloader::autoload();

// Fixes for Symfony's OTel auto-instrumentation:
// 1. Corrects http.route from internal route name to URL path template
// 2. Cleans up sub-request scopes so 500 error spans are exported
\\OpenTelemetry\\Instrumentation\\hook(
    \\Symfony\\Component\\HttpKernel\\HttpKernel::class,
    'handle',
    post: static function (
        \\Symfony\\Component\\HttpKernel\\HttpKernel $kernel,
        array $params,
        mixed $returnValue,
        ?\\Throwable $exception
    ): void {
        $request = ($params[0] instanceof \\Symfony\\Component\\HttpFoundation\\Request) ? $params[0] : null;
        if (null === $request) return;

        $type = $params[1] ?? \\Symfony\\Component\\HttpKernel\\HttpKernelInterface::MAIN_REQUEST;

        if ($type === \\Symfony\\Component\\HttpKernel\\HttpKernelInterface::SUB_REQUEST) {
            $scope = \\OpenTelemetry\\Context\\Context::storage()->scope();
            if (null !== $scope) {
                $span = \\OpenTelemetry\\API\\Trace\\Span::fromContext($scope->context());
                $scope->detach();
                $span->end();
            }
            return;
        }

        $routeParams = $request->attributes->get('_route_params', []);
        $path = $request->getPathInfo();
        if (\\is_array($routeParams)) {
            foreach ($routeParams as $name => $value) {
                if (\\is_string($value) && '' !== $value) {
                    $path = str_replace($value, '{' . $name . '}', $path);
                }
            }
        }

        $request->attributes->set('_route', $path);
    }
);

$kernel = new Kernel($_SERVER['APP_ENV'] ?? 'dev', (bool) ($_SERVER['APP_DEBUG'] ?? true));
$request = \\Symfony\\Component\\HttpFoundation\\Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);`;case"laravel":return`<?php
// .env  — point the OTLP exporter at Traceway
//
// OTEL_SERVICE_NAME=my-laravel-app
// OTEL_TRACES_EXPORTER=otlp
// OTEL_METRICS_EXPORTER=otlp
// OTEL_LOGS_EXPORTER=otlp
// OTEL_EXPORTER_OTLP_PROTOCOL=http/json
// OTEL_EXPORTER_OTLP_ENDPOINT=${r}/api/otel
// OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer ${t||"YOUR_TOKEN"}"
//
// Optional: send Laravel logs to Traceway via the auto-injected 'otlp' channel
// LOG_CHANNEL=otlp

// That's it — keepsuit/laravel-opentelemetry's service provider auto-registers
// TraceRequestMiddleware as a global middleware, so every HTTP request, DB query,
// queued job, Redis call, cache op, view render and outbound Http:: call is
// traced automatically. Open config/opentelemetry.php to tune which
// instrumentations are enabled.`;case"django":return`# .env  — point the OTLP exporter at Traceway
#
# OTEL_SERVICE_NAME=my-django-app
# OTEL_TRACES_EXPORTER=otlp
# OTEL_METRICS_EXPORTER=otlp
# OTEL_LOGS_EXPORTER=otlp
# OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
# OTEL_EXPORTER_OTLP_ENDPOINT=${r}/api/otel
# OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer%20${t||"YOUR_TOKEN"}
# OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true

# Then launch Django through the OTel agent — no code changes needed:
#
#   opentelemetry-instrument python manage.py runserver
#   opentelemetry-instrument gunicorn myproject.wsgi:application
#
# DjangoInstrumentor auto-installs middleware at index 0 and traces every
# inbound request. opentelemetry-bootstrap also wired psycopg/redis/requests/
# celery/logging instrumentation, so DB queries, cache ops, outbound HTTP
# and queued tasks are traced automatically.`;case"hono":return"";case"cloudflare":return"";case"opentelemetry":return"";case"flutter":return`import 'package:flutter/material.dart';
import 'package:traceway/traceway.dart';

void main() {
  Traceway.run(
    connectionString: '${a}',
    options: TracewayOptions(
      screenCapture: true,
      version: '1.0.0',
    ),
    child: MyApp(),
  );
}`;case"android":return`import android.app.Application
import com.tracewayapp.traceway.Traceway
import com.tracewayapp.traceway.TracewayOptions

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        Traceway.init(
            application = this,
            connectionString = "${a}",
            options = TracewayOptions(version = "1.0.0"),
        )
    }
}`;default:return`package main

import (
    "go.tracewayapp.com"
)

func main() {
    traceway.Init(
        "${a}",
        traceway.WithVersion("1.0.0"),
        traceway.WithServerName("my-server"),
    )
}`}}function mn(e){return e==="symfony"?`<?php
// src/Controller/TestController.php
namespace App\\Controller;

use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;

class TestController
{
    #[Route('/testing', name: 'testing')]
    public function index(): Response
    {
        throw new \\RuntimeException("Test error from Traceway integration");
    }
}`:e==="laravel"?`<?php
// routes/web.php
use Illuminate\\Support\\Facades\\Route;

Route::get('/testing', function () {
    throw new \\RuntimeException('Test error from Traceway integration');
});`:e==="django"?`# myapp/views.py
from django.http import HttpResponse


def testing(request):
    raise RuntimeError("Test error from Traceway integration")


# myproject/urls.py
from django.urls import path
from myapp import views

urlpatterns = [
    path("testing/", views.testing),
]`:e==="flutter"?`// Trigger a test error
throw StateError('Test error from Traceway integration');`:e==="android"?`// Trigger a test error
throw RuntimeException("Test error from Traceway integration")`:e&&lt(e)?`// Trigger a test error
throw new Error("Test error from Traceway integration");`:`r.GET("/testing", func(c *gin.Context) {
    panic("Test error from Traceway integration")
})`}function gn(e){if(e==="symfony"||e==="laravel"||e==="django")return"";if(e==="flutter")return`import 'package:traceway/traceway.dart';

TracewayClient.instance?.captureException(
  Exception('Test error'),
  StackTrace.current,
);`;if(e==="android")return`import com.tracewayapp.traceway.Traceway

try {
    riskyOperation()
} catch (e: Throwable) {
    Traceway.captureException(e)
}`;if(e&&lt(e))switch(e){case"react":return`import { useTraceway } from "@tracewayapp/react";

// In a component using the hook
const { captureException } = useTraceway();
captureException(new Error("Test error"));`;case"svelte":return`import { getTraceway } from "@tracewayapp/svelte";

const { captureException } = getTraceway();
captureException(new Error("Test error"));`;case"vuejs":return`import { useTraceway } from "@tracewayapp/vue";

const { captureException } = useTraceway();
captureException(new Error("Test error"));`;case"jquery":return`import { captureException } from "@tracewayapp/jquery";

captureException(new Error("Test error"));`;case"nextjs":return`import { useTraceway } from "@tracewayapp/react";

// In a client component
"use client";
const { captureException } = useTraceway();
captureException(new Error("Test error"));`;case"react-native":return`import { useTraceway } from "@tracewayapp/react-native";

// In a component using the hook
const { captureException } = useTraceway();
captureException(new Error("Test error"));`;default:return`import { captureException } from "@tracewayapp/${Na(e)}";

captureException(new Error("Test error"));`}return`r.GET("/testing", func(c *gin.Context) {
    c.AbortWithError(500, traceway.NewStackTraceErrorf("testing"))
})`}function Na(e){switch(e){case"react":return"react";case"svelte":return"svelte";case"vuejs":return"vue";case"nextjs":return"next";case"nestjs":return"nest";case"express":return"express";case"remix":return"remix";case"jquery":return"jquery";case"react-native":return"react-native";default:return"react"}}function _n(e){return{gin:"Gin",fiber:"Fiber",chi:"Chi",fasthttp:"FastHTTP",stdlib:"Standard Library (net/http)",custom:"Custom Integration",react:"React",svelte:"Svelte",vuejs:"Vue.js",nextjs:"Next.js",nestjs:"NestJS",express:"Express",remix:"Remix",jquery:"jQuery","react-native":"React Native",hono:"Hono",cloudflare:"Cloudflare",opentelemetry:"OpenTelemetry",symfony:"Symfony",laravel:"Laravel",django:"Django",flutter:"Flutter",android:"Android"}[e]||e}function bn(e){return e==="symfony"||e==="laravel"?"php":e==="django"?"python":e==="opentelemetry"?"go":e==="hono"||e==="cloudflare"||e==="flutter"||e==="android"||lt(e)?"javascript":"go"}const qe=[{id:"collector",label:"Collector",frameworks:[]},{id:"nodejs",label:"Node.js",frameworks:[{id:"express",label:"Express"},{id:"nestjs",label:"NestJS"},{id:"fastify",label:"Fastify"},{id:"nextjs",label:"Next.js"},{id:"koa",label:"Koa"},{id:"other",label:"Other"}]},{id:"go",label:"Go",frameworks:[{id:"gin",label:"Gin"},{id:"echo",label:"Echo"},{id:"chi",label:"Chi"},{id:"fiber",label:"Fiber"},{id:"mux",label:"gorilla/mux"},{id:"nethttp",label:"net/http"}]},{id:"python",label:"Python",frameworks:[{id:"django",label:"Django"},{id:"flask",label:"Flask"},{id:"fastapi",label:"FastAPI"},{id:"other",label:"Other"}]},{id:"java",label:"Java",frameworks:[{id:"agent",label:"Any framework"},{id:"spring",label:"Spring Boot"}]},{id:"dotnet",label:".NET",frameworks:[]},{id:"php",label:"PHP",frameworks:[{id:"symfony",label:"Symfony"},{id:"laravel",label:"Laravel"},{id:"slim",label:"Slim"},{id:"other",label:"Other"}]},{id:"ruby",label:"Ruby",frameworks:[{id:"rails",label:"Rails"},{id:"other",label:"Other"}]},{id:"other",label:"Other",frameworks:[]}];function Ot(e,t,r=[]){return["OTEL_SERVICE_NAME=my-service",`OTEL_EXPORTER_OTLP_ENDPOINT=${e}/api/otel`,`OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer ${t}`,...r].join(`
`)}function Ne(e,t,r=[],a=""){return{title:"Configure the Exporter",description:`Set these environment variables in your shell, .env file, or deployment config. The SDK appends /v1/traces and /v1/metrics to the endpoint automatically.${a?" "+a:""}`,code:Ot(e,t,r),codeLanguage:"bash"}}function xa(e,t){return`exporters:
  otlphttp:
    endpoint: "${e}/api/otel"
    headers:
      Authorization: "Bearer ${t}"

service:
  pipelines:
    traces:
      exporters: [otlphttp]
    metrics:
      exporters: [otlphttp]`}const Ra=`import (
	"context"
	"log"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

func initTracer(ctx context.Context) *sdktrace.TracerProvider {
	exp, err := otlptracehttp.New(ctx)
	if err != nil {
		log.Fatal(err)
	}
	tp := sdktrace.NewTracerProvider(sdktrace.WithBatcher(exp))
	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(propagation.TraceContext{})
	return tp
}`,Et={gin:{lib:"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin",snippet:`import "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"

r := gin.Default()
r.Use(otelgin.Middleware("my-service"))`},echo:{lib:"go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho",snippet:`import "go.opentelemetry.io/contrib/instrumentation/github.com/labstack/echo/otelecho"

e := echo.New()
e.Use(otelecho.Middleware("my-service"))`},chi:{lib:"github.com/riandyrn/otelchi",snippet:`import "github.com/riandyrn/otelchi"

r := chi.NewRouter()
r.Use(otelchi.Middleware("my-service", otelchi.WithChiRoutes(r)))`,note:"WithChiRoutes lets the middleware resolve the route pattern so endpoints group correctly."},fiber:{lib:"github.com/gofiber/contrib/v3/otel",snippet:`import fiberotel "github.com/gofiber/contrib/v3/otel"

app := fiber.New()
app.Use(fiberotel.Middleware())`,note:"For Fiber v2 use github.com/gofiber/contrib/otelfiber/v2 and otelfiber.Middleware() instead."},mux:{lib:"go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux",snippet:`import "go.opentelemetry.io/contrib/instrumentation/github.com/gorilla/mux/otelmux"

r := mux.NewRouter()
r.Use(otelmux.Middleware("my-service"))`},nethttp:{lib:"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp",snippet:`import "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"

mux := http.NewServeMux()
mux.Handle("GET /users/{id}", otelhttp.NewHandler(http.HandlerFunc(getUser), "GET /users/{id}"))
http.ListenAndServe(":8080", mux)`,note:"Wrap each route individually with Go 1.22+ method patterns so the route is set on spans and endpoints group by pattern instead of raw URL."}},Ca="npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node";function it(e,t,r,a,s){return[{title:"Install the SDK",description:a,code:Ca,codeLanguage:"bash"},Ne(e,t),{title:"Run with Instrumentation",description:s,code:`node --require @opentelemetry/auto-instrumentations-node/register ${r}`,codeLanguage:"bash"}]}function Ia(e,t,r,a){switch(e){case"collector":return[{title:"Add the Traceway Exporter",description:"Merge this into your OpenTelemetry Collector configuration. Any pipeline that lists the otlphttp exporter will be forwarded to Traceway.",code:xa(r,a),codeLanguage:"yaml"},{title:"Restart the Collector",description:"Restart the Collector to apply the configuration. Traces and metrics flowing through its pipelines will appear in Traceway."}];case"nodejs":return t==="fastify"?[{title:"Install the SDK",description:"Fastify is instrumented by the @fastify/otel package maintained by the Fastify team.",code:"npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @fastify/otel",codeLanguage:"bash"},{title:"Create instrumentation.js",description:"Add this file at the project root.",code:`const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { FastifyOtelInstrumentation } = require('@fastify/otel');

new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new FastifyOtelInstrumentation({ registerOnInitialization: true }),
  ],
}).start();`,codeLanguage:"javascript"},Ne(r,a),{title:"Run with Instrumentation",code:"node --require ./instrumentation.js app.js",codeLanguage:"bash"}]:t==="nextjs"?[{title:"Install the SDK",code:"npm install @vercel/otel",codeLanguage:"bash"},{title:"Create instrumentation.ts",description:"Add this file at the project root (next to package.json). Next.js calls register() automatically on startup.",code:`import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({ serviceName: 'my-service' })
}`,codeLanguage:"typescript"},Ne(r,a,[],"Start your app normally with next start; no extra flags are needed.")]:t==="nestjs"?it(r,a,"dist/main.js","Auto-instrumentation captures NestJS routes, status codes, and errors through the default Express adapter with no code changes. If you use the Fastify adapter, follow the Fastify setup instead.","Routes group by pattern automatically."):t==="koa"?it(r,a,"app.js","Auto-instrumentation captures Koa requests, status codes, and errors with no code changes.","Route patterns are captured when routing with @koa/router."):it(r,a,"app.js","Auto-instrumentation captures routes, status codes, and errors with no code changes.","For ESM apps, add --experimental-loader=@opentelemetry/instrumentation/hook.mjs and use --import instead of --require.");case"go":{const s=Et[t]??Et.gin;return[{title:"Install the SDK",code:`go get go.opentelemetry.io/otel go.opentelemetry.io/otel/sdk go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp ${s.lib}`,codeLanguage:"bash"},{title:"Initialize the SDK",description:"Call initTracer at startup and defer tp.Shutdown(ctx) before exit. The exporter reads the environment variables from the next step.",code:Ra,codeLanguage:"go"},{title:"Add the Middleware",description:s.note,code:s.snippet,codeLanguage:"go"},Ne(r,a)]}case"python":{const s={django:{cmd:"opentelemetry-instrument python manage.py runserver --noreload",note:"The --noreload flag is required with runserver; the autoreloader breaks instrumentation. It is not needed under gunicorn or other production servers."},flask:{cmd:"opentelemetry-instrument flask run"},fastapi:{cmd:"opentelemetry-instrument uvicorn main:app",note:"Avoid --reload and --workers with zero-code instrumentation; for multi-worker production use gunicorn with uvicorn workers."},other:{cmd:"opentelemetry-instrument python app.py"}},l=s[t]??s.other;return[{title:"Install the SDK",description:"opentelemetry-bootstrap detects your installed packages and adds the matching instrumentation.",code:`pip install opentelemetry-distro opentelemetry-exporter-otlp-proto-http
opentelemetry-bootstrap -a install`,codeLanguage:"bash"},Ne(r,a,["OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf"],"The protocol variable is required; the Python SDK defaults to gRPC."),{title:"Run with Instrumentation",description:l.note,code:l.cmd,codeLanguage:"bash"}]}case"java":return t==="spring"?[{title:"Add the Starter",description:"Add the OpenTelemetry Spring Boot starter to your Gradle build (a Maven dependency works the same way).",code:`implementation(platform("io.opentelemetry.instrumentation:opentelemetry-instrumentation-bom:2.28.1"))
implementation("io.opentelemetry.instrumentation:opentelemetry-spring-boot-starter")`,codeLanguage:"gradle"},Ne(r,a,[],"Start your app normally; the starter reads these variables and reports routes, status codes, and exceptions.")]:[{title:"Download the Java Agent",description:"The agent instruments Spring, JAX-RS, and most Java frameworks with zero code changes.",code:"curl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar",codeLanguage:"bash"},Ne(r,a),{title:"Run with the Agent",code:"java -javaagent:./opentelemetry-javaagent.jar -jar myapp.jar",codeLanguage:"bash"}];case"dotnet":return[{title:"Install the Packages",code:`dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol`,codeLanguage:"bash"},{title:"Add to Program.cs",description:"Keep AddOtlpExporter() empty so the exporter is driven entirely by the environment variables in the next step.",code:`builder.Services.AddOpenTelemetry()
    .WithTracing(t => t
        .AddAspNetCoreInstrumentation()
        .AddOtlpExporter());`,codeLanguage:"csharp"},Ne(r,a,["OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf"],"The protocol variable is required; the .NET exporter defaults to gRPC.")];case"php":{const l={symfony:" open-telemetry/opentelemetry-auto-symfony",laravel:" open-telemetry/opentelemetry-auto-laravel",slim:" open-telemetry/opentelemetry-auto-slim",other:""}[t]??"";return[{title:"Install the SDK",description:"Auto-instrumentation needs the opentelemetry PECL extension; enable it with extension=opentelemetry in php.ini."+(t==="other"?" Find auto-instrumentation packages for your framework in the OpenTelemetry registry.":""),code:`pecl install opentelemetry
composer require open-telemetry/sdk open-telemetry/exporter-otlp php-http/guzzle7-adapter${l}`,codeLanguage:"bash",link:t==="other"?{label:"Browse PHP instrumentation packages",href:"https://opentelemetry.io/ecosystem/registry/?language=php&component=instrumentation"}:void 0},Ne(r,a,["OTEL_PHP_AUTOLOAD_ENABLED=true"],"These must be real process environment variables; the extension does not read framework .env files. Use env[...] in php-fpm pool config or SetEnv in Apache.")]}case"ruby":return t==="rails"?[{title:"Install the Gems",code:"bundle add opentelemetry-sdk opentelemetry-exporter-otlp opentelemetry-instrumentation-rails",codeLanguage:"bash"},{title:"Create the Initializer",description:"Add config/initializers/opentelemetry.rb.",code:`require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/rails'

OpenTelemetry::SDK.configure do |c|
  c.use 'OpenTelemetry::Instrumentation::Rails'
end`,codeLanguage:"ruby"},Ne(r,a)]:[{title:"Install the Gems",code:"bundle add opentelemetry-sdk opentelemetry-exporter-otlp opentelemetry-instrumentation-all",codeLanguage:"bash"},{title:"Configure the SDK",description:"Run this once at startup, before your app starts handling requests.",code:`require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/all'

OpenTelemetry::SDK.configure do |c|
  c.use_all
end`,codeLanguage:"ruby"},Ne(r,a)];default:return[{title:"Configure any OpenTelemetry SDK",description:"Any language with an OTLP/HTTP exporter works. Set these environment variables; the protocol variable matters for SDKs that default to gRPC. Make sure http.route is set on root server spans so endpoints group by route pattern, and use SpanKind CONSUMER for background jobs.",code:Ot(r,a,["OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf"]),codeLanguage:"bash",link:{label:"View all supported languages",href:"https://opentelemetry.io/docs/languages/"}}]}}const Nt="traceway_setup_mode",xt="traceway_otel_language",Rt="traceway_otel_framework";function vn(){try{const e=localStorage.getItem(Nt);if(e==="ai"||e==="manual")return e}catch{}return"ai"}function $a(e){try{localStorage.setItem(Nt,e)}catch{}}function La(){try{const e=localStorage.getItem(xt);if(e&&qe.some(t=>t.id===e))return e}catch{}return qe[0].id}function Ma(e){try{localStorage.setItem(xt,e)}catch{}}function Pa(){try{return localStorage.getItem(Rt)}catch{}return null}function ka(e){try{localStorage.setItem(Rt,e)}catch{}}var Da=A("<!> <!>",1);function fn(e,t){ke(t,!0);const r="-mb-px rounded-none border-b-2 border-transparent bg-transparent px-0 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";function a(i){(i==="ai"||i==="manual")&&($a(i),t.onModeChange(i))}var s=k(),l=m(s);V(l,()=>tt,(i,d)=>{d(i,{get value(){return t.mode},onValueChange:a,children:(_,E)=>{var y=k(),S=m(y);V(S,()=>et,(c,b)=>{b(c,{class:"h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0",children:(f,u)=>{var v=Da(),O=m(v);V(O,()=>Qe,(T,w)=>{w(T,{value:"ai",class:r,children:(R,x)=>{L();var M=xe("AI");o(R,M)},$$slots:{default:!0}})});var C=h(O,2);V(C,()=>Qe,(T,w)=>{w(T,{value:"manual",class:r,children:(R,x)=>{L();var M=xe("Manual");o(R,M)},$$slots:{default:!0}})}),o(f,v)},$$slots:{default:!0}})}),o(_,y)},$$slots:{default:!0}})}),o(e,s),De()}const Ba="npx skills add tracewayapp/traceway";function Ua(e,t,r=null){const a=[{text:"/traceway-setup with token ",bold:!1},{text:t,bold:!0},{text:" and url ",bold:!1},{text:e,bold:!0}];return r&&a.push({text:" and source map upload token ",bold:!1},{text:r,bold:!0}),a}var Fa=A("<!> Copied!",1),Ka=A("<!> Copy",1),za=A('<div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div>');function dt(e,t){ke(t,!0);let r=jt(t,"wrap",3,!1),a=ge(!1);async function s(){await navigator.clipboard.writeText(t.code),$(a,!0),setTimeout(()=>$(a,!1),2e3)}var l=za(),i=g(l),d=g(i);fe(d,{variant:"outline",size:"sm",onclick:s,children:(y,S)=>{var c=k(),b=m(c);{var f=v=>{var O=Fa(),C=m(O);Le(C,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(v,O)},u=v=>{var O=Ka(),C=m(O);Me(C,{class:"mr-2 h-4 w-4"}),L(),o(v,O)};z(b,v=>{n(a)?v(f):v(u,!1)})}o(y,c)},$$slots:{default:!0}}),p(i);var _=h(i,2),E=g(_);ze(E,{get language(){return t.language},get code(){return t.code}}),p(_),p(l),Q(()=>Ke(_,1,`overflow-x-auto rounded-lg text-sm ${r()?"wrap-code":""} ${Ge.isDark?"dark-code":"light-code"}`)),o(e,l),De()}var Ga=A("<!> Copied!",1),Ha=A("<!> Copy",1),qa=A('<span class="break-all text-muted-foreground"> </span>'),Wa=A('<div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <code class="block rounded-lg bg-muted py-3 pr-24 pl-4 font-mono text-sm break-words whitespace-pre-wrap text-foreground"></code></div>');function Za(e,t){ke(t,!0);const r=X(()=>t.parts.map(E=>E.text).join(""));let a=ge(!1);async function s(){await navigator.clipboard.writeText(n(r)),$(a,!0),setTimeout(()=>$(a,!1),2e3)}var l=Wa(),i=g(l),d=g(i);fe(d,{variant:"outline",size:"sm",onclick:s,children:(E,y)=>{var S=k(),c=m(S);{var b=u=>{var v=Ga(),O=m(v);Le(O,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(u,v)},f=u=>{var v=Ha(),O=m(v);Me(O,{class:"mr-2 h-4 w-4"}),L(),o(u,v)};z(c,u=>{n(a)?u(b):u(f,!1)})}o(E,S)},$$slots:{default:!0}}),p(i);var _=h(i,2);Ve(_,21,()=>t.parts,ea,(E,y)=>{var S=k(),c=m(S);{var b=u=>{var v=qa(),O=g(v,!0);p(v),Q(()=>J(O,n(y).text)),o(u,v)},f=u=>{var v=xe();Q(()=>J(v,n(y).text)),o(u,v)};z(c,u=>{n(y).bold?u(b):u(f,!1)})}o(E,S)}),p(_),p(l),o(e,l),De()}var Ya=A(`<div class="rounded-md border bg-card"><div class="border-b px-4 py-3"><div class="flex items-center gap-3"><div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">1</div> <h3 class="font-semibold">Install the Traceway Skill</h3></div> <p class="mt-1 ml-9 text-sm text-muted-foreground">Add the Traceway setup skill to your coding agent. Works with Claude Code, Cursor, and any
			agent that supports agent skills.</p></div> <div class="p-4"><!></div></div> <div class="rounded-md border bg-card"><div class="border-b px-4 py-3"><div class="flex items-center gap-3"><div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">2</div> <h3 class="font-semibold">Run the Setup Prompt</h3></div> <p class="mt-1 ml-9 text-sm text-muted-foreground"> </p></div> <div class="p-4"><!></div></div>`,1);function En(e,t){ke(t,!0);const r=X(()=>We.currentProject?.sourceMapToken??null),a=X(()=>Ua(t.backendUrl,t.token,n(r)));var s=Ya(),l=m(s),i=h(g(l),2),d=g(i);dt(d,{get code(){return Ba},get language(){return He}}),p(i),p(l);var _=h(l,2),E=g(_),y=h(g(E),2),S=g(y);p(y),p(E);var c=h(E,2),b=g(c);Za(b,{get parts(){return n(a)}}),p(c),p(_),Q(()=>J(S,`Paste this prompt into your agent. Your instance URL and project token are already filled
			in${n(r)?", along with your source map upload token":""}.`)),o(e,s),De()}const at="[A-Za-z$_][0-9A-Za-z$_]*",Ct=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],It=["true","false","null","undefined","NaN","Infinity"],$t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Lt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Mt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Pt=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],kt=[].concat(Mt,$t,Lt);function Xa(e){const t=e.regex,r=(N,{after:I})=>{const P="</"+N[0].slice(1);return N.input.indexOf(P,I)!==-1},a=at,s={begin:"<>",end:"</>"},l=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(N,I)=>{const P=N[0].length+N.index,B=N.input[P];if(B==="<"||B===","){I.ignoreMatch();return}B===">"&&(r(N,{after:P})||I.ignoreMatch());let G;const K=N.input.substring(P);if(G=K.match(/^\s*=/)){I.ignoreMatch();return}if((G=K.match(/^\s+extends\s+/))&&G.index===0){I.ignoreMatch();return}}},d={$pattern:at,keyword:Ct,literal:It,built_in:kt,"variable.language":Pt},_="[0-9](_?[0-9])*",E=`\\.(${_})`,y="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",S={className:"number",variants:[{begin:`(\\b(${y})((${E})|\\.)?|(${E}))[eE][+-]?(${_})\\b`},{begin:`\\b(${y})\\b((${E})\\b|\\.)?|(${E})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},c={className:"subst",begin:"\\$\\{",end:"\\}",keywords:d,contains:[]},b={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"xml"}},f={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"css"}},u={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,c]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,u,v,{match:/\$\d+/},S];c.contains=T.concat({begin:/\{/,end:/\}/,keywords:d,contains:["self"].concat(T)});const w=[].concat(C,c.contains),R=w.concat([{begin:/(\s*)\(/,end:/\)/,keywords:d,contains:["self"].concat(w)}]),x={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R},M={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},F={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...$t,...Lt]}},te={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},ee={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[x],illegal:/%/},oe={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function _e(N){return t.concat("(?!",N.join("|"),")")}const se={match:t.concat(/\b/,_e([...Mt,"super","import"].map(N=>`${N}\\s*\\(`)),a,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},q={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},D={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},x]},W="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",j={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(W)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[x]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:d,exports:{PARAMS_CONTAINS:R,CLASS_REFERENCE:F},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),te,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,u,v,C,{match:/\$\d+/},S,F,{scope:"attr",match:a+t.lookahead(":"),relevance:0},j,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:W,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:d,contains:R}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:l},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},ee,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[x,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},q,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[x]},se,oe,M,D,{match:/\$[(.]/}]}}function Va(e){const t=e.regex,r=Xa(e),a=at,s=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],l={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},i={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:s},contains:[r.exports.CLASS_REFERENCE]},d={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},_=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],E={$pattern:at,keyword:Ct.concat(_),literal:It,built_in:kt.concat(s),"variable.language":Pt},y={className:"meta",begin:"@"+a},S=(u,v,O)=>{const C=u.contains.findIndex(T=>T.label===v);if(C===-1)throw new Error("can not find mode to replace");u.contains.splice(C,1,O)};Object.assign(r.keywords,E),r.exports.PARAMS_CONTAINS.push(y);const c=r.contains.find(u=>u.scope==="attr"),b=Object.assign({},c,{match:t.concat(a,t.lookahead(/\s*\?:/))});r.exports.PARAMS_CONTAINS.push([r.exports.CLASS_REFERENCE,c,b]),r.contains=r.contains.concat([y,l,i,b]),S(r,"shebang",e.SHEBANG()),S(r,"use_strict",d);const f=r.contains.find(u=>u.label==="func.def");return f.relevance=0,Object.assign(r,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),r}const Dt={name:"typescript",register:Va};function Qa(e){return{name:"Gradle",case_insensitive:!0,keywords:["task","project","allprojects","subprojects","artifacts","buildscript","configurations","dependencies","repositories","sourceSets","description","delete","from","into","include","exclude","source","classpath","destinationDir","includes","options","sourceCompatibility","targetCompatibility","group","flatDir","doLast","doFirst","flatten","todir","fromdir","ant","def","abstract","break","case","catch","continue","default","do","else","extends","final","finally","for","if","implements","instanceof","native","new","private","protected","public","return","static","switch","synchronized","throw","throws","transient","try","volatile","while","strictfp","package","import","false","null","super","this","true","antlrtask","checkstyle","codenarc","copy","boolean","byte","char","class","double","float","int","interface","long","short","void","compile","runTime","file","fileTree","abs","any","append","asList","asWritable","call","collect","compareTo","count","div","dump","each","eachByte","eachFile","eachLine","every","find","findAll","flatten","getAt","getErr","getIn","getOut","getText","grep","immutable","inject","inspect","intersect","invokeMethods","isCase","join","leftShift","minus","multiply","newInputStream","newOutputStream","newPrintWriter","newReader","newWriter","next","plus","pop","power","previous","print","println","push","putAt","read","readBytes","readLines","reverse","reverseEach","round","size","sort","splitEachLine","step","subMap","times","toInteger","toList","tokenize","upto","waitForOrKill","withPrintWriter","withReader","withStream","withWriter","withWriterAppend","write","writeLine"],contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.NUMBER_MODE,e.REGEXP_MODE]}}const ja={name:"gradle",register:Qa};function Ja(e){const t=["bool","byte","char","decimal","delegate","double","dynamic","enum","float","int","long","nint","nuint","object","sbyte","short","string","ulong","uint","ushort"],r=["public","private","protected","static","internal","protected","abstract","async","extern","override","unsafe","virtual","new","sealed","partial"],a=["default","false","null","true"],s=["abstract","as","base","break","case","catch","class","const","continue","do","else","event","explicit","extern","finally","fixed","for","foreach","goto","if","implicit","in","interface","internal","is","lock","namespace","new","operator","out","override","params","private","protected","public","readonly","record","ref","return","scoped","sealed","sizeof","stackalloc","static","struct","switch","this","throw","try","typeof","unchecked","unsafe","using","virtual","void","volatile","while"],l=["add","alias","and","ascending","args","async","await","by","descending","dynamic","equals","file","from","get","global","group","init","into","join","let","nameof","not","notnull","on","or","orderby","partial","record","remove","required","scoped","select","set","unmanaged","value|0","var","when","where","with","yield"],i={keyword:s.concat(l),built_in:t,literal:a},d=e.inherit(e.TITLE_MODE,{begin:"[a-zA-Z](\\.?\\w)*"}),_={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},E={className:"string",begin:/"""("*)(?!")(.|\n)*?"""\1/,relevance:1},y={className:"string",begin:'@"',end:'"',contains:[{begin:'""'}]},S=e.inherit(y,{illegal:/\n/}),c={className:"subst",begin:/\{/,end:/\}/,keywords:i},b=e.inherit(c,{illegal:/\n/}),f={className:"string",begin:/\$"/,end:'"',illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},e.BACKSLASH_ESCAPE,b]},u={className:"string",begin:/\$@"/,end:'"',contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},c]},v=e.inherit(u,{illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},b]});c.contains=[u,f,y,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,e.C_BLOCK_COMMENT_MODE],b.contains=[v,f,S,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,e.inherit(e.C_BLOCK_COMMENT_MODE,{illegal:/\n/})];const O={variants:[E,u,f,y,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},C={begin:"<",end:">",contains:[{beginKeywords:"in out"},d]},T=e.IDENT_RE+"(<"+e.IDENT_RE+"(\\s*,\\s*"+e.IDENT_RE+")*>)?(\\[\\])?",w={begin:"@"+e.IDENT_RE,relevance:0};return{name:"C#",aliases:["cs","c#"],keywords:i,illegal:/::/,contains:[e.COMMENT("///","$",{returnBegin:!0,contains:[{className:"doctag",variants:[{begin:"///",relevance:0},{begin:"<!--|-->"},{begin:"</?",end:">"}]}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"meta",begin:"#",end:"$",keywords:{keyword:"if else elif endif define undef warning error line region endregion pragma checksum"}},O,_,{beginKeywords:"class interface",relevance:0,end:/[{;=]/,illegal:/[^\s:,]/,contains:[{beginKeywords:"where class"},d,C,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"namespace",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[d,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"record",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[d,C,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:"^\\s*\\[(?=[\\w])",excludeBegin:!0,end:"\\]",excludeEnd:!0,contains:[{className:"string",begin:/"/,end:/"/}]},{beginKeywords:"new return throw await else",relevance:0},{className:"function",begin:"("+T+"\\s+)+"+e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,end:/\s*[{;=]/,excludeEnd:!0,keywords:i,contains:[{beginKeywords:r.join(" "),relevance:0},{begin:e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,contains:[e.TITLE_MODE,C],relevance:0},{match:/\(\)/},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,relevance:0,contains:[O,_,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},w]}}const er={name:"csharp",register:Ja};function tr(e){const t=e.regex,r="([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",a=t.either(/\b([A-Z]+[a-z0-9]+)+/,/\b([A-Z]+[a-z0-9]+)+[A-Z]+/),s=t.concat(a,/(::\w+)*/),i={"variable.constant":["__FILE__","__LINE__","__ENCODING__"],"variable.language":["self","super"],keyword:["alias","and","begin","BEGIN","break","case","class","defined","do","else","elsif","end","END","ensure","for","if","in","module","next","not","or","redo","require","rescue","retry","return","then","undef","unless","until","when","while","yield",...["include","extend","prepend","public","private","protected","raise","throw"]],built_in:["proc","lambda","attr_accessor","attr_reader","attr_writer","define_method","private_constant","module_function"],literal:["true","false","nil"]},d={className:"doctag",begin:"@[A-Za-z]+"},_={begin:"#<",end:">"},E=[e.COMMENT("#","$",{contains:[d]}),e.COMMENT("^=begin","^=end",{contains:[d],relevance:10}),e.COMMENT("^__END__",e.MATCH_NOTHING_RE)],y={className:"subst",begin:/#\{/,end:/\}/,keywords:i},S={className:"string",contains:[e.BACKSLASH_ESCAPE,y],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:/%[qQwWx]?\(/,end:/\)/},{begin:/%[qQwWx]?\[/,end:/\]/},{begin:/%[qQwWx]?\{/,end:/\}/},{begin:/%[qQwWx]?</,end:/>/},{begin:/%[qQwWx]?\//,end:/\//},{begin:/%[qQwWx]?%/,end:/%/},{begin:/%[qQwWx]?-/,end:/-/},{begin:/%[qQwWx]?\|/,end:/\|/},{begin:/\B\?(\\\d{1,3})/},{begin:/\B\?(\\x[A-Fa-f0-9]{1,2})/},{begin:/\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/},{begin:/\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/},{begin:/\B\?\\(c|C-)[\x20-\x7e]/},{begin:/\B\?\\?\S/},{begin:t.concat(/<<[-~]?'?/,t.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,contains:[e.BACKSLASH_ESCAPE,y]})]}]},c="[1-9](_?[0-9])*|0",b="[0-9](_?[0-9])*",f={className:"number",relevance:0,variants:[{begin:`\\b(${c})(\\.(${b}))?([eE][+-]?(${b})|r)?i?\\b`},{begin:"\\b0[dD][0-9](_?[0-9])*r?i?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*r?i?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*r?i?\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"},{begin:"\\b0(_?[0-7])+r?i?\\b"}]},u={variants:[{match:/\(\)/},{className:"params",begin:/\(/,end:/(?=\))/,excludeBegin:!0,endsParent:!0,keywords:i}]},x=[S,{variants:[{match:[/class\s+/,s,/\s+<\s+/,s]},{match:[/\b(class|module)\s+/,s]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:i},{match:[/(include|extend)\s+/,s],scope:{2:"title.class"},keywords:i},{relevance:0,match:[s,/\.new[. (]/],scope:{1:"title.class"}},{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},{relevance:0,match:a,scope:"title.class"},{match:[/def/,/\s+/,r],scope:{1:"keyword",3:"title.function"},contains:[u]},{begin:e.IDENT_RE+"::"},{className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{className:"symbol",begin:":(?!\\s)",contains:[S,{begin:r}],relevance:0},f,{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"},{className:"params",begin:/\|(?!=)/,end:/\|/,excludeBegin:!0,excludeEnd:!0,relevance:0,keywords:i},{begin:"("+e.RE_STARTERS_RE+"|unless)\\s*",keywords:"unless",contains:[{className:"regexp",contains:[e.BACKSLASH_ESCAPE,y],illegal:/\n/,variants:[{begin:"/",end:"/[a-z]*"},{begin:/%r\{/,end:/\}[a-z]*/},{begin:"%r\\(",end:"\\)[a-z]*"},{begin:"%r!",end:"![a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}].concat(_,E),relevance:0}].concat(_,E);y.contains=x,u.contains=x;const ee=[{begin:/^\s*=>/,starts:{end:"$",contains:x}},{className:"meta.prompt",begin:"^("+"[>?]>"+"|"+"[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]"+"|"+"(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>"+")(?=[ ])",starts:{end:"$",keywords:i,contains:x}}];return E.unshift(_),{name:"Ruby",aliases:["rb","gemspec","podspec","thor","irb"],keywords:i,illegal:/\/\*/,contains:[e.SHEBANG({binary:"ruby"})].concat(ee).concat(E).concat(x)}}const ar={name:"ruby",register:tr};function rr(e){const t="true false yes no null",r="[\\w#;/?:@&=+$,.~*'()[\\]]+",a={className:"attr",variants:[{begin:/[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/},{begin:/"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/},{begin:/'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/}]},s={className:"template-variable",variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]},l={className:"string",relevance:0,begin:/'/,end:/'/,contains:[{match:/''/,scope:"char.escape",relevance:0}]},i={className:"string",relevance:0,variants:[{begin:/"/,end:/"/},{begin:/\S+/}],contains:[e.BACKSLASH_ESCAPE,s]},d=e.inherit(i,{variants:[{begin:/'/,end:/'/,contains:[{begin:/''/,relevance:0}]},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),c={className:"number",begin:"\\b"+"[0-9]{4}(-[0-9][0-9]){0,2}"+"([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?"+"(\\.[0-9]*)?"+"([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?"+"\\b"},b={end:",",endsWithParent:!0,excludeEnd:!0,keywords:t,relevance:0},f={begin:/\{/,end:/\}/,contains:[b],illegal:"\\n",relevance:0},u={begin:"\\[",end:"\\]",contains:[b],illegal:"\\n",relevance:0},v=[a,{className:"meta",begin:"^---\\s*$",relevance:10},{className:"string",begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!\\w+!"+r},{className:"type",begin:"!<"+r+">"},{className:"type",begin:"!"+r},{className:"type",begin:"!!"+r},{className:"meta",begin:"&"+e.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+e.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",relevance:0},e.HASH_COMMENT_MODE,{beginKeywords:t,keywords:{literal:t}},c,{className:"number",begin:e.C_NUMBER_RE+"\\b",relevance:0},f,u,l,i],O=[...v];return O.pop(),O.push(d),b.contains=O,{name:"YAML",case_insensitive:!0,aliases:["yml"],contains:v}}const Bt={name:"yaml",register:rr};var nr=A("<!> Regenerate",1),or=A("<!> Copied!",1),sr=A("<!> Copy",1),ir=A("<!> Copied!",1),cr=A("<!> Copy",1),lr=A(`<div><p class="mb-2 text-sm font-medium">Step 1: Build with obfuscation enabled</p> <div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div> <p class="mt-2 text-xs text-muted-foreground">This writes a per-architecture .symbols file into build/symbols. The example builds an
					Android APK; other targets emit their own symbol files in the same directory.</p></div> <div><p class="mb-2 text-sm font-medium">Step 2: Upload the symbols after each release build</p> <div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div> <p class="mt-2 text-xs text-muted-foreground">Run from your project root after each release. The uploader auto-discovers build/symbols
					and pushes every architecture in one go; symbols are unique per build, so re-upload on
					each release. In CI, pass the token as <code class="font-mono">TRACEWAY_UPLOAD_TOKEN</code> instead of the flag.</p></div>`,1),dr=A("<!> Copied!",1),ur=A("<!> Copy",1),pr=A("<!> Copied!",1),mr=A("<!> Copy",1),gr=A('<div><p class="mb-2 text-sm font-medium">Step 1: Install the bundler plugin</p> <div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div></div> <div><p class="mb-2 text-sm font-medium">Step 2: Add the plugin to your bundler</p> <!> <p class="mb-2 font-mono text-xs text-muted-foreground"> </p> <div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div></div>',1),_r=A("<!> Copied!",1),br=A("<!> Copy",1),vr=A('<!> <div><p class="mb-2 text-sm font-medium"> </p> <div class="relative"><div class="absolute top-2 right-2 z-10"><!></div> <div><!></div></div></div>',1),fr=A('<div class="space-y-6"><div><p class="mb-2 text-sm font-medium">Upload Token</p> <div class="flex items-center gap-2"><code class="flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm break-all"> </code> <!> <!></div></div> <!></div>'),Er=A('<p class="text-sm text-muted-foreground"> </p>'),yr=A('<p class="text-sm text-muted-foreground">Plain release builds already report readable traces. Only obfuscated builds (<code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">--obfuscate</code>) need this: generate a token, then upload your <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">.symbols</code> after each release to resolve their stack traces. <a href="https://docs.tracewayapp.com/client/flutter" target="_blank" rel="noopener noreferrer" class="underline hover:text-foreground">Flutter docs</a></p>'),hr=A('<p class="text-sm text-muted-foreground"> </p>'),Tr=A("<!> Generating...",1),wr=A("<!> Generate Upload Token",1),Sr=A('<div class="flex items-center justify-between gap-4"><!> <!></div>'),Ar=A("<!> <!>",1),Or=A("<!> <!>",1),Nr=A(`<!> <div class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2"><p class="text-sm"><span class="font-semibold text-destructive">Warning:</span> <span class="text-destructive/90">Any build pipeline or CI job still using the current token will fail to upload source
					maps until it is updated with the new token.</span></p></div> <!>`,1),xr=A("<!> <!>",1);function Rr(e,t){ke(t,!0);const r={vite:{label:"Vite",file:"vite.config.ts",directory:"dist/assets",language:Dt,code:`import { defineConfig } from "vite";
import { tracewayDebugIds } from "@tracewayapp/bundler-plugin/vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [tracewayDebugIds()],
});`},rollup:{label:"Rollup",file:"rollup.config.js",directory:"dist",language:ct,code:`import { tracewayDebugIds } from "@tracewayapp/bundler-plugin/rollup";

export default {
  output: {
    sourcemap: true,
  },
  plugins: [tracewayDebugIds()],
};`},webpack:{label:"webpack",file:"webpack.config.js",directory:"dist",language:ct,code:`const {
  TracewayDebugIdsWebpackPlugin,
} = require("@tracewayapp/bundler-plugin/webpack");

module.exports = {
  devtool: "source-map",
  plugins: [new TracewayDebugIdsWebpackPlugin()],
};`}};let a=ge("vite"),s=ge(!1),l=ge(!1),i=ge(!1),d=ge(!1),_=ge(!1),E=ge(!1),y=ge(!1);const S="npm install -D @tracewayapp/bundler-plugin",c=X(()=>We.currentProject),b=X(()=>n(c)?.sourceMapToken??null),f=X(()=>ht.getRoleForOrganization(n(c)?.organizationId??0)==="readonly"),u=X(()=>n(c)?.framework==="flutter"),v=X(()=>n(u)?"debug symbols":"source maps"),O=X(()=>n(c)?.framework!=="react-native"),C=X(()=>n(c)&&n(b)?`npx @tracewayapp/sourcemap-upload \\
  --url ${n(c).backendUrl} \\
  --token ${n(b)} \\
  --directory ${n(O)?r[n(a)].directory:"dist"}`:""),T="flutter build apk --release --obfuscate --split-debug-info=build/symbols",w=X(()=>n(c)&&n(b)?`dart run traceway:upload_symbols \\
  --token ${n(b)} \\
  --url ${n(c).backendUrl}`:"");let R=ge(!1);async function x(){$(s,!0);try{await We.generateSourceMapToken()}finally{$(s,!1)}}async function M(){$(s,!0);try{await We.generateSourceMapToken(),$(R,!1),Xt.success("Successfully regenerated the Upload Token",{position:"top-center"})}finally{$(s,!1)}}async function F(){n(b)&&(await navigator.clipboard.writeText(n(b)),$(l,!0),setTimeout(()=>$(l,!1),2e3))}async function te(){await navigator.clipboard.writeText(S),$(i,!0),setTimeout(()=>$(i,!1),2e3)}async function ee(){await navigator.clipboard.writeText(r[n(a)].code),$(d,!0),setTimeout(()=>$(d,!1),2e3)}async function oe(){await navigator.clipboard.writeText(n(C)),$(_,!0),setTimeout(()=>$(_,!1),2e3)}async function _e(){await navigator.clipboard.writeText(T),$(E,!0),setTimeout(()=>$(E,!1),2e3)}async function se(){await navigator.clipboard.writeText(n(w)),$(y,!0),setTimeout(()=>$(y,!1),2e3)}var q=xr(),D=m(q);{var W=I=>{var P=fr(),B=g(P),G=h(g(B),2),K=g(G),ae=g(K,!0);p(K);var ie=h(K,2);fe(ie,{variant:"outline",size:"sm",onclick:F,children:(H,re)=>{var Z=k(),le=m(Z);{var de=U=>{Le(U,{class:"h-4 w-4 text-green-500"})},Te=U=>{Me(U,{class:"h-4 w-4"})};z(le,U=>{n(l)?U(de):U(Te,!1)})}o(H,Z)},$$slots:{default:!0}});var he=h(ie,2);fe(he,{variant:"destructiveOutline",size:"sm",onclick:()=>$(R,!0),children:(H,re)=>{var Z=nr(),le=m(Z);_a(le,{class:"mr-2 h-4 w-4"}),L(),o(H,Z)},$$slots:{default:!0}}),p(G),p(B);var Ze=h(B,2);{var je=H=>{var re=lr(),Z=m(re),le=h(g(Z),2),de=g(le),Te=g(de);fe(Te,{variant:"outline",size:"sm",onclick:_e,children:(Re,Ue)=>{var Se=k(),Pe=m(Se);{var pe=Y=>{var me=or(),Oe=m(me);Le(Oe,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(Y,me)},Ae=Y=>{var me=sr(),Oe=m(me);Me(Oe,{class:"mr-2 h-4 w-4"}),L(),o(Y,me)};z(Pe,Y=>{n(E)?Y(pe):Y(Ae,!1)})}o(Re,Se)},$$slots:{default:!0}}),p(de);var U=h(de,2),ne=g(U);ze(ne,{get language(){return He},code:T}),p(U),p(le),L(2),p(Z);var ue=h(Z,2),Ee=h(g(ue),2),be=g(Ee),ye=g(be);fe(ye,{variant:"outline",size:"sm",onclick:se,children:(Re,Ue)=>{var Se=k(),Pe=m(Se);{var pe=Y=>{var me=ir(),Oe=m(me);Le(Oe,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(Y,me)},Ae=Y=>{var me=cr(),Oe=m(me);Me(Oe,{class:"mr-2 h-4 w-4"}),L(),o(Y,me)};z(Pe,Y=>{n(y)?Y(pe):Y(Ae,!1)})}o(Re,Se)},$$slots:{default:!0}}),p(be);var we=h(be,2),Ie=g(we);ze(Ie,{get language(){return He},get code(){return n(w)}}),p(we),p(Ee),L(2),p(ue),Q(()=>{Ke(U,1,`overflow-x-auto rounded-lg text-sm ${Ge.isDark?"dark-code":"light-code"}`),Ke(we,1,`overflow-x-auto rounded-lg text-sm ${Ge.isDark?"dark-code":"light-code"}`)}),o(H,re)},Be=H=>{var re=vr(),Z=m(re);{var le=we=>{var Ie=gr(),Re=m(Ie),Ue=h(g(Re),2),Se=g(Ue),Pe=g(Se);fe(Pe,{variant:"outline",size:"sm",onclick:te,children:(Ye,ot)=>{var Ce=k(),Je=m(Ce);{var Fe=ce=>{var ve=dr(),$e=m(ve);Le($e,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(ce,ve)},Xe=ce=>{var ve=ur(),$e=m(ve);Me($e,{class:"mr-2 h-4 w-4"}),L(),o(ce,ve)};z(Je,ce=>{n(i)?ce(Fe):ce(Xe,!1)})}o(Ye,Ce)},$$slots:{default:!0}}),p(Se);var pe=h(Se,2),Ae=g(pe);ze(Ae,{get language(){return He},code:S}),p(pe),p(Ue),p(Re);var Y=h(Re,2),me=h(g(Y),2);V(me,()=>tt,(Ye,ot)=>{ot(Ye,{get value(){return n(a)},onValueChange:Ce=>{Ce&&$(a,Ce,!0)},children:(Ce,Je)=>{var Fe=k(),Xe=m(Fe);V(Xe,()=>et,(ce,ve)=>{ve(ce,{class:"mb-2",children:($e,zr)=>{var pt=k(),zt=m(pt);Ve(zt,17,()=>Object.entries(r),([st,mt])=>st,(st,mt)=>{var gt=X(()=>Jt(n(mt),2));let Gt=()=>n(gt)[0],Ht=()=>n(gt)[1];var _t=k(),qt=m(_t);V(qt,()=>Qe,(Wt,Zt)=>{Zt(Wt,{get value(){return Gt()},children:(Yt,Gr)=>{L();var bt=xe();Q(()=>J(bt,Ht().label)),o(Yt,bt)},$$slots:{default:!0}})}),o(st,_t)}),o($e,pt)},$$slots:{default:!0}})}),o(Ce,Fe)},$$slots:{default:!0}})});var Oe=h(me,2),Ut=g(Oe,!0);p(Oe);var ut=h(Oe,2),rt=g(ut),Ft=g(rt);fe(Ft,{variant:"outline",size:"sm",onclick:ee,children:(Ye,ot)=>{var Ce=k(),Je=m(Ce);{var Fe=ce=>{var ve=pr(),$e=m(ve);Le($e,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(ce,ve)},Xe=ce=>{var ve=mr(),$e=m(ve);Me($e,{class:"mr-2 h-4 w-4"}),L(),o(ce,ve)};z(Je,ce=>{n(d)?ce(Fe):ce(Xe,!1)})}o(Ye,Ce)},$$slots:{default:!0}}),p(rt);var nt=h(rt,2),Kt=g(nt);ze(Kt,{get language(){return r[n(a)].language},get code(){return r[n(a)].code}}),p(nt),p(ut),p(Y),Q(()=>{Ke(pe,1,`overflow-x-auto rounded-lg text-sm ${Ge.isDark?"dark-code":"light-code"}`),J(Ut,r[n(a)].file),Ke(nt,1,`overflow-x-auto rounded-lg text-sm ${Ge.isDark?"dark-code":"light-code"}`)}),o(we,Ie)};z(Z,we=>{n(O)&&we(le)})}var de=h(Z,2),Te=g(de),U=g(Te,!0);p(Te);var ne=h(Te,2),ue=g(ne),Ee=g(ue);fe(Ee,{variant:"outline",size:"sm",onclick:oe,children:(we,Ie)=>{var Re=k(),Ue=m(Re);{var Se=pe=>{var Ae=_r(),Y=m(Ae);Le(Y,{class:"mr-2 h-4 w-4 text-green-500"}),L(),o(pe,Ae)},Pe=pe=>{var Ae=br(),Y=m(Ae);Me(Y,{class:"mr-2 h-4 w-4"}),L(),o(pe,Ae)};z(Ue,pe=>{n(_)?pe(Se):pe(Pe,!1)})}o(we,Re)},$$slots:{default:!0}}),p(ue);var be=h(ue,2),ye=g(be);ze(ye,{get language(){return He},get code(){return n(C)}}),p(be),p(ne),p(de),Q(()=>{J(U,n(O)?"Step 3: Upload after your production build":"Usage"),Ke(be,1,`overflow-x-auto rounded-lg text-sm ${Ge.isDark?"dark-code":"light-code"}`)}),o(H,re)};z(Ze,H=>{n(u)?H(je):H(Be,!1)})}p(P),Q(()=>J(ae,n(b))),o(I,P)},j=I=>{var P=k(),B=m(P);{var G=ae=>{var ie=Er(),he=g(ie);p(ie),Q(()=>J(he,`An upload token is required to upload ${n(v)??""}. Ask an organization admin to generate one
		from the Connection page.`)),o(ae,ie)},K=ae=>{var ie=Sr(),he=g(ie);{var Ze=H=>{var re=yr();o(H,re)},je=H=>{var re=hr(),Z=g(re);p(re),Q(()=>J(Z,`Generate an upload token to start uploading ${n(v)??""} as part of your build process.`)),o(H,re)};z(he,H=>{n(u)?H(Ze):H(je,!1)})}var Be=h(he,2);fe(Be,{variant:"outline",size:"sm",onclick:x,get disabled(){return n(s)},children:(H,re)=>{var Z=k(),le=m(Z);{var de=U=>{var ne=Tr(),ue=m(ne);ca(ue,{class:"mr-2 h-4 w-4"}),L(),o(U,ne)},Te=U=>{var ne=wr(),ue=m(ne);Tt(ue,{class:"mr-2 h-4 w-4"}),L(),o(U,ne)};z(le,U=>{n(s)?U(de):U(Te,!1)})}o(H,Z)},$$slots:{default:!0}}),p(ie),o(ae,ie)};z(B,ae=>{n(f)?ae(G):ae(K,!1)},!0)}o(I,P)};z(D,I=>{n(b)?I(W):I(j,!1)})}var N=h(D,2);V(N,()=>ga,(I,P)=>{P(I,{get open(){return n(R)},set open(B){$(R,B,!0)},children:(B,G)=>{var K=k(),ae=m(K);V(ae,()=>la,(ie,he)=>{he(ie,{interactOutsideBehavior:"close",children:(Ze,je)=>{var Be=Nr(),H=m(Be);V(H,()=>da,(Z,le)=>{le(Z,{children:(de,Te)=>{var U=Ar(),ne=m(U);V(ne,()=>ua,(Ee,be)=>{be(Ee,{children:(ye,we)=>{L();var Ie=xe("Regenerate Upload Token");o(ye,Ie)},$$slots:{default:!0}})});var ue=h(ne,2);V(ue,()=>pa,(Ee,be)=>{be(Ee,{children:(ye,we)=>{L();var Ie=xe(`A new upload token will be issued for this project and the current one will stop working
				immediately.`);o(ye,Ie)},$$slots:{default:!0}})}),o(de,U)},$$slots:{default:!0}})});var re=h(H,4);V(re,()=>ma,(Z,le)=>{le(Z,{class:"sm:justify-between",children:(de,Te)=>{var U=Or(),ne=m(U);fe(ne,{variant:"outline",onclick:()=>$(R,!1),get disabled(){return n(s)},children:(Ee,be)=>{L();var ye=xe("Cancel");o(Ee,ye)},$$slots:{default:!0}});var ue=h(ne,2);fe(ue,{variant:"destructive",onclick:M,get disabled(){return n(s)},children:(Ee,be)=>{L();var ye=xe();Q(()=>J(ye,n(s)?"Regenerating...":"Regenerate Token")),o(Ee,ye)},$$slots:{default:!0}}),o(de,U)},$$slots:{default:!0}})}),o(Ze,Be)},$$slots:{default:!0}})}),o(B,K)},$$slots:{default:!0}})}),o(e,q),De()}var Cr=A("<!> ",1),Ir=A("<!> <!>",1),$r=A("<!> <!>",1);function Lr(e,t){ke(t,!0);let r=X(()=>We.currentProject);const a=X(()=>n(r)?.framework==="flutter"),s=X(()=>ht.getRoleForOrganization(We.currentProject?.organizationId??0)==="readonly");var l=k(),i=m(l);{var d=_=>{ra(_,{children:(E,y)=>{var S=$r(),c=m(S);na(c,{children:(f,u)=>{var v=Ir(),O=m(v);oa(O,{class:"flex items-center gap-2",children:(w,R)=>{var x=Cr(),M=m(x);Tt(M,{class:"h-5 w-5"});var F=h(M);Q(()=>J(F,` ${n(a)?"Symbol Upload":"Source Map Upload"}`)),o(w,x)},$$slots:{default:!0}});var C=h(O,2);{var T=w=>{ia(w,{children:(R,x)=>{L();var M=xe(`Upload source maps to see original file names and line numbers in stack traces from
					minified code.`);o(R,M)},$$slots:{default:!0}})};z(C,w=>{n(a)||w(T)})}o(f,v)},$$slots:{default:!0}});var b=h(c,2);sa(b,{children:(f,u)=>{Rr(f,{})},$$slots:{default:!0}}),o(E,S)},$$slots:{default:!0}})};z(i,_=>{n(r)&&!n(s)&&_(d)})}o(e,l),De()}var Mr=A('<p class="pt-1 text-sm font-medium">Framework</p> <!>',1),Pr=A('<p class="mt-1 ml-9 text-sm text-muted-foreground"> </p>'),kr=A('<p class="pt-2 text-xs text-muted-foreground"><a target="_blank" rel="noopener noreferrer" class="underline hover:text-foreground"> </a></p>'),Dr=A('<div class="p-4"><!> <!></div>'),Br=A('<div class="rounded-md border bg-card"><div class="border-b px-4 py-3"><div class="flex items-center gap-3"><div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"> </div> <h3 class="font-semibold"> </h3></div> <!></div> <!></div>'),Ur=A('<div class="space-y-2"><p class="text-sm font-medium">Language</p> <!> <!></div> <!> <!>',1);function yn(e,t){ke(t,!0);let r=ge(vt(La())),a=ge(vt(Pa()));const s={bash:He,go:aa,javascript:ct,typescript:Dt,python:Oa,gradle:ja,csharp:er,ruby:ar,yaml:Bt},l=X(()=>qe.find(T=>T.id===n(r))??qe[0]),i=X(()=>n(l).frameworks.find(T=>T.id===n(a))?.id??n(l).frameworks[0]?.id??""),d=X(()=>Ia(n(l).id,n(i),t.backendUrl,t.token));function _(T){const w=qe.find(R=>R.id===T);w&&($(r,w.id,!0),Ma(w.id))}function E(T){n(l).frameworks.some(w=>w.id===T)&&($(a,T,!0),ka(T))}function y(T){return s[T??"bash"]}var S=Ur(),c=m(S),b=h(g(c),2);V(b,()=>tt,(T,w)=>{w(T,{get value(){return n(r)},onValueChange:_,children:(R,x)=>{var M=k(),F=m(M);V(F,()=>et,(te,ee)=>{ee(te,{class:"h-auto flex-wrap justify-start",children:(oe,_e)=>{var se=k(),q=m(se);Ve(q,17,()=>qe,D=>D.id,(D,W)=>{var j=k(),N=m(j);V(N,()=>Qe,(I,P)=>{P(I,{get value(){return n(W).id},children:(B,G)=>{L();var K=xe();Q(()=>J(K,n(W).label)),o(B,K)},$$slots:{default:!0}})}),o(D,j)}),o(oe,se)},$$slots:{default:!0}})}),o(R,M)},$$slots:{default:!0}})});var f=h(b,2);{var u=T=>{var w=Mr(),R=h(m(w),2);V(R,()=>tt,(x,M)=>{M(x,{get value(){return n(i)},onValueChange:E,children:(F,te)=>{var ee=k(),oe=m(ee);V(oe,()=>et,(_e,se)=>{se(_e,{class:"h-auto flex-wrap justify-start",children:(q,D)=>{var W=k(),j=m(W);Ve(j,17,()=>n(l).frameworks,N=>N.id,(N,I)=>{var P=k(),B=m(P);V(B,()=>Qe,(G,K)=>{K(G,{get value(){return n(I).id},children:(ae,ie)=>{L();var he=xe();Q(()=>J(he,n(I).label)),o(ae,he)},$$slots:{default:!0}})}),o(N,P)}),o(q,W)},$$slots:{default:!0}})}),o(F,ee)},$$slots:{default:!0}})}),o(T,w)};z(f,T=>{n(l).frameworks.length>1&&T(u)})}p(c);var v=h(c,2);Ve(v,19,()=>n(d),T=>n(l).id+n(i)+T.title,(T,w,R)=>{var x=Br(),M=g(x),F=g(M),te=g(F),ee=g(te,!0);p(te);var oe=h(te,2),_e=g(oe,!0);p(oe),p(F);var se=h(F,2);{var q=j=>{var N=Pr(),I=g(N,!0);p(N),Q(()=>J(I,n(w).description)),o(j,N)};z(se,j=>{n(w).description&&j(q)})}p(M);var D=h(M,2);{var W=j=>{var N=Dr(),I=g(N);{let G=X(()=>y(n(w).codeLanguage));dt(I,{get code(){return n(w).code},get language(){return n(G)}})}var P=h(I,2);{var B=G=>{var K=kr(),ae=g(K),ie=g(ae,!0);p(ae),p(K),Q(()=>{ta(ae,"href",n(w).link.href),J(ie,n(w).link.label)}),o(G,K)};z(P,G=>{n(w).link&&G(B)})}p(N),o(j,N)};z(D,j=>{n(w).code&&j(W)})}p(x),Q(()=>{J(ee,n(R)+1),J(_e,n(w).title)}),o(T,x)});var O=h(v,2);{var C=T=>{Lr(T,{})};z(O,T=>{n(r)==="nodejs"&&T(C)})}o(e,S),De()}var Fr=A('<div class="flex items-center gap-2"><code class="flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm break-all"> </code> <!></div>');function yt(e,t){let r=ge(!1);async function a(){await navigator.clipboard.writeText(t.value),$(r,!0),setTimeout(()=>$(r,!1),2e3)}var s=Fr(),l=g(s),i=g(l,!0);p(l);var d=h(l,2);fe(d,{variant:"outline",size:"sm",onclick:a,children:(_,E)=>{var y=k(),S=m(y);{var c=f=>{Le(f,{class:"h-4 w-4 text-green-500"})},b=f=>{Me(f,{class:"h-4 w-4"})};z(S,f=>{n(r)?f(c):f(b,!1)})}o(_,y)},$$slots:{default:!0}}),p(s),Q(()=>J(i,t.value)),o(e,s)}var Kr=A('<div class="space-y-6"><div><p class="mb-1 text-sm font-medium">OTLP Endpoint</p> <p class="mb-2 text-xs text-muted-foreground">Your SDK or Collector will append <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">/v1/traces</code> and <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">/v1/metrics</code> automatically.</p> <!></div> <div><p class="mb-2 text-sm font-medium">Authorization Header</p> <!></div> <div><p class="mb-2 text-sm font-medium">Example: OTel Collector (optional)</p> <!></div></div>');function hn(e,t){var r=Kr(),a=g(r),s=h(g(a),4);yt(s,{get value(){return t.endpoint}}),p(a);var l=h(a,2),i=h(g(l),2);yt(i,{get value(){return t.authHeader}}),p(l);var d=h(l,2),_=h(g(d),2);dt(_,{get code(){return t.collectorConfig},get language(){return Bt}}),p(d),p(r),o(e,r)}export{En as A,yn as O,fn as S,hn as a,_n as b,He as c,pn as d,Oa as e,un as f,vn as g,Lr as h,mn as i,ct as j,gn as k,bn as l,dn as p};
