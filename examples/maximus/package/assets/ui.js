/* Generated from Maximus e6858c59ab4b059c0cc75c93ec6dfe5cf15aabe9. Do not edit. */
"use strict";(()=>{var Ha=Object.defineProperty;var Oa=Object.getOwnPropertyDescriptor;var d=(a,e,t,r)=>{for(var o=r>1?void 0:r?Oa(e,t):e,s=a.length-1,f;s>=0;s--)(f=a[s])&&(o=(r?f(e,t,o):f(o))||o);return r&&o&&Ha(e,t,o),o};var Y=globalThis,ee=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ae=Symbol(),Qt=new WeakMap,N=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==Ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ee&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=Qt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Qt.set(t,e))}return e}toString(){return this.cssText}},te=a=>new N(typeof a=="string"?a:a+"",void 0,Ae),g=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((r,o,s)=>r+(f=>{if(f._$cssResult$===!0)return f.cssText;if(typeof f=="number")return f;throw Error("Value passed to 'css' function must be a 'css' function result: "+f+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[s+1],a[0]);return new N(t,a,Ae)},Yt=(a,e)=>{if(ee)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),o=Y.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,a.appendChild(r)}},Me=ee?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return te(t)})(a):a;var{is:qa,defineProperty:Ua,getOwnPropertyDescriptor:Va,getOwnPropertyNames:za,getOwnPropertySymbols:Na,getPrototypeOf:Ia}=Object,ae=globalThis,ea=ae.trustedTypes,Ga=ea?ea.emptyScript:"",Wa=ae.reactiveElementPolyfillSupport,I=(a,e)=>a,G={toAttribute(a,e){switch(e){case Boolean:a=a?Ga:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},re=(a,e)=>!qa(a,e),ta={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),ae.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ta){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&Ua(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){let{get:o,set:s}=Va(this.prototype,e)??{get(){return this[t]},set(f){this[t]=f}};return{get:o,set(f){let i=o?.call(this);s?.call(this,f),this.requestUpdate(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ta}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let e=Ia(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let t=this.properties,r=[...za(t),...Na(t)];for(let o of r)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let o of r)t.unshift(Me(o))}else e!==void 0&&t.push(Me(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:G).toAttribute(t,r.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){let r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let s=r.getPropertyOptions(o),f=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:G;this._$Em=o;let i=f.fromAttribute(t,s.type);this[o]=i??this._$Ej?.get(o)??i,this._$Em=null}}requestUpdate(e,t,r,o=!1,s){if(e!==void 0){let f=this.constructor;if(o===!1&&(s=this[e]),r??=f.getPropertyOptions(e),!((r.hasChanged??re)(s,t)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(f._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:s},f){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,f??t??this[e]),s!==!0||f!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[o,s]of r){let{wrapped:f}=s,i=this[o];f!==!0||this._$AL.has(o)||i===void 0||this.C(o,void 0,s,i)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[I("elementProperties")]=new Map,w[I("finalized")]=new Map,Wa?.({ReactiveElement:w}),(ae.reactiveElementVersions??=[]).push("2.1.2");var Pe=globalThis,aa=a=>a,oe=Pe.trustedTypes,ra=oe?oe.createPolicy("lit-html",{createHTML:a=>a}):void 0,$e="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Le="?"+A,Xa=`<${Le}>`,B=document,X=()=>B.createComment(""),K=a=>a===null||typeof a!="object"&&typeof a!="function",Re=Array.isArray,ua=a=>Re(a)||typeof a?.[Symbol.iterator]=="function",ke=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oa=/-->/g,sa=/>/g,R=RegExp(`>|${ke}(?:([^\\s"'>=/]+)(${ke}*=${ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fa=/'/g,la=/"/g,ia=/^(?:script|style|textarea|title)$/i,Te=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),c=Te(1),pa=Te(2),ur=Te(3),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),da=new WeakMap,T=B.createTreeWalker(B,129);function na(a,e){if(!Re(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ra!==void 0?ra.createHTML(e):e}var ma=(a,e)=>{let t=a.length-1,r=[],o,s=e===2?"<svg>":e===3?"<math>":"",f=W;for(let i=0;i<t;i++){let l=a[i],x,h,n=-1,y=0;for(;y<l.length&&(f.lastIndex=y,h=f.exec(l),h!==null);)y=f.lastIndex,f===W?h[1]==="!--"?f=oa:h[1]!==void 0?f=sa:h[2]!==void 0?(ia.test(h[2])&&(o=RegExp("</"+h[2],"g")),f=R):h[3]!==void 0&&(f=R):f===R?h[0]===">"?(f=o??W,n=-1):h[1]===void 0?n=-2:(n=f.lastIndex-h[2].length,x=h[1],f=h[3]===void 0?R:h[3]==='"'?la:fa):f===la||f===fa?f=R:f===oa||f===sa?f=W:(f=R,o=void 0);let $=f===R&&a[i+1].startsWith("/>")?" ":"";s+=f===W?l+Xa:n>=0?(r.push(x),l.slice(0,n)+$e+l.slice(n)+A+$):l+A+(n===-2?i:$)}return[na(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},j=class a{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let s=0,f=0,i=e.length-1,l=this.parts,[x,h]=ma(e,t);if(this.el=a.createElement(x,r),T.currentNode=this.el.content,t===2||t===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(o=T.nextNode())!==null&&l.length<i;){if(o.nodeType===1){if(o.hasAttributes())for(let n of o.getAttributeNames())if(n.endsWith($e)){let y=h[f++],$=o.getAttribute(n).split(A),Q=/([.?@])?(.*)/.exec(y);l.push({type:1,index:s,name:Q[2],strings:$,ctor:Q[1]==="."?fe:Q[1]==="?"?le:Q[1]==="@"?de:F}),o.removeAttribute(n)}else n.startsWith(A)&&(l.push({type:6,index:s}),o.removeAttribute(n));if(ia.test(o.tagName)){let n=o.textContent.split(A),y=n.length-1;if(y>0){o.textContent=oe?oe.emptyScript:"";for(let $=0;$<y;$++)o.append(n[$],X()),T.nextNode(),l.push({type:2,index:++s});o.append(n[y],X())}}}else if(o.nodeType===8)if(o.data===Le)l.push({type:2,index:s});else{let n=-1;for(;(n=o.data.indexOf(A,n+1))!==-1;)l.push({type:7,index:s}),n+=A.length-1}s++}}static createElement(e,t){let r=B.createElement("template");return r.innerHTML=e,r}};function D(a,e,t=a,r){if(e===C)return e;let o=r!==void 0?t._$Co?.[r]:t._$Cl,s=K(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(a),o._$AT(a,t,r)),r!==void 0?(t._$Co??=[])[r]=o:t._$Cl=o),o!==void 0&&(e=D(a,o._$AS(a,e.values),o,r)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,o=(e?.creationScope??B).importNode(t,!0);T.currentNode=o;let s=T.nextNode(),f=0,i=0,l=r[0];for(;l!==void 0;){if(f===l.index){let x;l.type===2?x=new O(s,s.nextSibling,this,e):l.type===1?x=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(x=new ue(s,this,e)),this._$AV.push(x),l=r[++i]}f!==l?.index&&(s=T.nextNode(),f++)}return T.currentNode=B,o}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},O=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),K(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ua(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=j.createElement(na(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(t);else{let s=new se(o,this),f=s.u(this.options);s.p(t),this.T(f),this._$AH=s}}_$AC(e){let t=da.get(e.strings);return t===void 0&&da.set(e.strings,t=new j(e)),t}k(e){Re(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,o=0;for(let s of e)o===t.length?t.push(r=new a(this.O(X()),this.O(X()),this,this.options)):r=t[o],r._$AI(s),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=aa(e).nextSibling;aa(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(e,t=this,r,o){let s=this.strings,f=!1;if(s===void 0)e=D(this,e,t,0),f=!K(e)||e!==this._$AH&&e!==C,f&&(this._$AH=e);else{let i=e,l,x;for(e=s[0],l=0;l<s.length-1;l++)x=D(this,i[r+l],t,l),x===C&&(x=this._$AH[l]),f||=!K(x)||x!==this._$AH[l],x===p?e=p:e!==p&&(e+=(x??"")+s[l+1]),this._$AH[l]=x}f&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},fe=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},le=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},de=class extends F{constructor(e,t,r,o,s){super(e,t,r,o,s),this.type=5}_$AI(e,t=this){if((e=D(this,e,t,0)??p)===C)return;let r=this._$AH,o=e===p&&r!==p||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==p&&(r===p||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ue=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}},xa={M:$e,P:A,A:Le,C:1,L:ma,R:se,D:ua,V:D,I:O,H:F,N:le,U:de,B:fe,F:ue},Ka=Pe.litHtmlPolyfillSupport;Ka?.(j,O),(Pe.litHtmlVersions??=[]).push("3.3.3");var ca=(a,e,t)=>{let r=t?.renderBefore??e,o=r._$litPart$;if(o===void 0){let s=t?.renderBefore??null;r._$litPart$=o=new O(e.insertBefore(X(),s),s,void 0,t??{})}return o._$AI(a),o};var Be=globalThis,S=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ca(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}};S._$litElement$=!0,S.finalized=!0,Be.litElementHydrateSupport?.({LitElement:S});var ja=Be.litElementPolyfillSupport;ja?.({LitElement:S});(Be.litElementVersions??=[]).push("4.2.2");var L=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};var Za={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:re},Ja=(a=Za,e,t)=>{let{kind:r,metadata:o}=t,s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),r==="setter"&&((a=Object.create(a)).wrapped=!0),s.set(t.name,a),r==="accessor"){let{name:f}=t;return{set(i){let l=e.get.call(this);e.set.call(this,i),this.requestUpdate(f,l,a,!0,i)},init(i){return i!==void 0&&this.C(f,void 0,a,i),i}}}if(r==="setter"){let{name:f}=t;return function(i){let l=this[f];e.call(this,i),this.requestUpdate(f,l,a,!0,i)}}throw Error("Unsupported decorator location: "+r)};function u(a){return(e,t)=>typeof t=="object"?Ja(a,e,t):((r,o,s)=>{let f=o.hasOwnProperty(s);return o.constructor.createProperty(s,r),f?Object.getOwnPropertyDescriptor(o,s):void 0})(a,e,t)}function ha(a){return u({...a,state:!0,attribute:!1})}var E=(a,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(a,e,t),t);function ga(a,e){return(t,r,o)=>{let s=f=>f.renderRoot?.querySelector(a)??null;if(e){let{get:f,set:i}=typeof r=="object"?t:o??(()=>{let l=Symbol();return{get(){return this[l]},set(x){this[l]=x}}})();return E(t,r,{get(){let l=f.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&i.call(this,l)),l}})}return E(t,r,{get(){return s(this)}})}}var M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},U=a=>(...e)=>({_$litDirective$:a,values:e}),q=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var _=class extends q{constructor(e){if(super(e),this.it=p,e.type!==M.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===p||e==null)return this._t=void 0,this.it=e;if(e===C)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};_.directiveName="unsafeHTML",_.resultType=1;var Qr=U(_);var Z=class extends _{};Z.directiveName="unsafeSVG",Z.resultType=2;var Ca=U(Z);var De=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h2"}],["path",{d:"M20 8v11a2 2 0 0 1-2 2h-2"}],["path",{d:"m9 15 3-3 3 3"}],["path",{d:"M12 12v9"}]];var Fe=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{d:"M10 12h4"}]];var Ee=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];var _e=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var He=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var Oe=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];var qe=[["path",{d:"m5 12 7-7 7 7"}],["path",{d:"M12 19V5"}]];var Ue=[["path",{d:"M12 5v16"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]];var Ve=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];var ze=[["path",{d:"M12 18V5"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77"}]];var Ne=[["path",{d:"M8 2v3"}],["path",{d:"M16 2v3"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}],["path",{d:"M3 9h18"}]];var Ie=[["path",{d:"M12 16v5"}],["path",{d:"M16 14.639V21"}],["path",{d:"M20 10.656V21"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"}],["path",{d:"M4 18.463V21"}],["path",{d:"M8 14.656V21"}]];var Ge=[["path",{d:"M20 6 9 17l-5-5"}]];var We=[["path",{d:"m6 9 6 6 6-6"}]];var ie=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var pe=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];var Xe=[["path",{d:"m12.296 3.464 3.02 3.956"}],["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],["path",{d:"m6.18 5.276 3.1 3.899"}]];var Ke=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{d:"M12 11h4"}],["path",{d:"M12 16h4"}],["path",{d:"M8 11h.01"}],["path",{d:"M8 16h.01"}]];var je=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var ne=[["path",{d:"m18 16 4-4-4-4"}],["path",{d:"m6 8-4 4 4 4"}],["path",{d:"m14.5 4-5 16"}]];var Ze=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var Je=[["path",{d:"m15 10 5 5-5 5"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12"}]];var Qe=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var me=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var xe=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"12",cy:"5",r:"1"}],["circle",{cx:"12",cy:"19",r:"1"}]];var Ye=[["path",{d:"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"}],["path",{d:"m5.082 11.09 8.828 8.828"}]];var et=[["path",{d:"m15 15 6 6"}],["path",{d:"m15 9 6-6"}],["path",{d:"M21 16v5h-5"}],["path",{d:"M21 8V3h-5"}],["path",{d:"M3 16v5h5"}],["path",{d:"m3 21 6-6"}],["path",{d:"M3 8V3h5"}],["path",{d:"M9 9 3 3"}]];var tt=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var at=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var rt=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M9 10h6"}],["path",{d:"M12 13V7"}],["path",{d:"M9 17h6"}]];var ot=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}]];var st=[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]];var ft=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]];var lt=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];var dt=[["path",{d:"M15 6a9 9 0 0 0-9 9V3"}],["circle",{cx:"18",cy:"6",r:"3"}],["circle",{cx:"6",cy:"18",r:"3"}]];var ut=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var it=[["circle",{cx:"9",cy:"12",r:"1"}],["circle",{cx:"9",cy:"5",r:"1"}],["circle",{cx:"9",cy:"19",r:"1"}],["circle",{cx:"15",cy:"12",r:"1"}],["circle",{cx:"15",cy:"5",r:"1"}],["circle",{cx:"15",cy:"19",r:"1"}]];var pt=[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]];var nt=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]];var mt=[["path",{d:"M13 19a4 4 0 00-8 0"}],["path",{d:"M16 10h2"}],["path",{d:"M16 14h2"}],["circle",{cx:"9",cy:"12",r:"3"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2"}]];var xt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2"}],["circle",{cx:"9",cy:"9",r:"2"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]];var ct=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var ce=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var ht=[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12"}]];var gt=[["path",{d:"M16 5H3"}],["path",{d:"M16 12H3"}],["path",{d:"M9 19H3"}],["path",{d:"m16 16-3 3 3 3"}],["path",{d:"M21 5v12a2 2 0 0 1-2 2h-6"}]];var Ct=[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]];var he=[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 9.33-2.5"}]];var St=[["path",{d:"m16 17 5-5-5-5"}],["path",{d:"M21 12H9"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]];var vt=[["path",{d:"M15 3h6v6"}],["path",{d:"m21 3-7 7"}],["path",{d:"m3 21 7-7"}],["path",{d:"M9 21H3v-6"}]];var bt=[["path",{d:"M4 5h16"}],["path",{d:"M4 12h16"}],["path",{d:"M4 19h16"}]];var yt=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];var wt=[["path",{d:"M12 19v3"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3"}]];var At=[["path",{d:"m14 10 7-7"}],["path",{d:"M20 10h-6V4"}],["path",{d:"m3 21 7-7"}],["path",{d:"M4 14h6v6"}]];var Mt=[["path",{d:"M5 12h14"}]];var kt=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]];var ge=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];var Pt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}],["path",{d:"m10 15-3-3 3-3"}]];var $t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M15 3v18"}]];var Lt=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"}]];var Rt=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var Tt=[["path",{d:"M12 17v5"}],["path",{d:"M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"}],["path",{d:"m2 2 20 20"}],["path",{d:"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"}]];var Bt=[["path",{d:"M12 17v5"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"}]];var Dt=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var Ft=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];var Et=[["path",{d:"m15 14 5-5-5-5"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]];var _t=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Ce=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Ht=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var Ot=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var qt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var Se=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];var V=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]];var Ut=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];var Vt=[["path",{d:"M10 2h4"}],["path",{d:"M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7"}],["path",{d:"M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2"}],["path",{d:"m2 2 20 20"}],["path",{d:"M12 12v-2"}]];var ve=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var be=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var zt=[["path",{d:"M12 4v16"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"}],["path",{d:"M9 20h6"}]];var Nt=[["path",{d:"M9 14 4 9l5-5"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]];var It=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var Gt=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}]];var Wt=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];var Xt=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Qa={archive:Fe,restore:De,puzzle:Ft,back:_e,arrow:He,arrowDown:Ee,arrowUp:qe,steer:Je,queued:gt,external:Oe,bot:Ve,brain:ze,book:Ue,chart:Ie,clapperboard:Xe,clipboard:Ke,approved:ie,check:Ge,chevronDown:We,close:Xt,command:Ze,download:Qe,expand:et,eye:at,eyeOff:tt,file:ot,fileDiff:rt,folder:lt,folderOpen:ft,headphones:pt,history:Ce,heartbeat:nt,code:ne,image:xt,calendar:Ne,clock:je,flask:st,globe:ut,threads:dt,idCard:mt,info:ct,maximize:vt,minimize:At,menu:bt,cursor:kt,microphone:wt,minus:Mt,message:yt,more:me,moreVertical:xe,panelLeft:ge,panelRight:$t,panelRightOpen:Pt,paperclip:Lt,pencil:Rt,pin:Bt,pinOff:Tt,plus:Dt,refresh:_t,search:Ht,settings:Ot,newConversation:V,rejected:pe,layers:ce,lock:Ct,link:ht,logOut:St,unlock:he,sparkles:Se,shield:qt,user:It,warning:be,trash:ve,undo:Nt,redo:Et,eraser:Ye,type:zt,grip:it,terminal:Ut,timerOff:Vt,tool:Wt,wallet:Gt},Ya=Object.fromEntries(Object.entries(Qa).map(([a,e])=>[a,e.map(([t,r])=>{let o=Object.entries(r).map(([s,f])=>`${s}="${f}"`);return`<${t} ${o.join(" ")}/>`}).join("")]));function ye(a,e=20){return pa`<svg width=${e} height=${e} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ca(Ya[a])}</svg>`}var H=class extends S{constructor(){super(...arguments);this.label="";this.type="submit";this.disabled=!1}createRenderRoot(){return this}render(){return c`<button class="button primary cta" type=${this.type} ?disabled=${this.disabled}>
      <span>${this.label}</span>${ye("arrow")}
    </button>`}};d([u()],H.prototype,"label",2),d([u()],H.prototype,"type",2),d([u({type:Boolean})],H.prototype,"disabled",2),H=d([L("cta-button")],H);var Sa=g`
  cta-button {
    display: block;
  }
  .cta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    width: 100%;
  }
  .cta span {
    grid-column: 2;
  }
  .cta svg {
    grid-column: 3;
    justify-self: end;
  }
`;var k=a=>a??p;var{I:Al}=xa;var va=a=>a.strings===void 0;var er={},ba=(a,e=er)=>a._$AH=e;var ya=U(class extends q{constructor(a){if(super(a),a.type!==M.PROPERTY&&a.type!==M.ATTRIBUTE&&a.type!==M.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!va(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[e]){if(e===C||e===p)return e;let t=a.element,r=a.name;if(a.type===M.PROPERTY){if(e===t[r])return C}else if(a.type===M.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(r))return C}else if(a.type===M.ATTRIBUTE&&t.getAttribute(r)===e+"")return C;return ba(a),e}});function Kt(a){return typeof a=="boolean"}function wa(a){return typeof a=="string"}function jt(a){return e=>wa(e)&&a.includes(e)}function J(a,e,t,r={}){return{read(){try{let o=localStorage.getItem(a);if(o!==null){let s;try{s=JSON.parse(o)}catch{if(!r.legacyRaw||!t(o))throw new Error("Invalid preference encoding");s=o,this.write(o)}if(t(s))return s}}catch{}return typeof e=="function"?e():e},write(o){try{return localStorage.setItem(a,JSON.stringify(o)),!0}catch{return!1}}}}var tr={sidebarOpen:J("maximus.sidebar.open",()=>!matchMedia("(max-width: 800px)").matches,Kt)};var Aa=["de","en"];function ar(){return typeof navigator<"u"&&navigator.language?.toLowerCase().startsWith("de")?"de":"en"}var rr=J("maximus.locale",ar,jt(Aa),{legacyRaw:!0}),Ma=rr.read();typeof document<"u"&&(document.documentElement.lang=Ma);function b(){return Ma}var Wl=new Intl.DateTimeFormat(b(),{hour:"2-digit",minute:"2-digit"}),Xl=new Intl.DateTimeFormat(b(),{dateStyle:"medium"}),Kl=new Intl.DateTimeFormat(b(),{dateStyle:"medium",timeStyle:"short"}),jl=new Intl.NumberFormat(b()),Zl=new Intl.RelativeTimeFormat(b(),{numeric:"auto"});function Zt(a){return a[b()]}var ka={breadcrumb:"Brotkrumen",brand:"Maximus Trading",brandName:"maximus",brandSuffix:"TRADING",close:"Schließen",withShortcut:({label:a,shortcut:e})=>e?`${a} · ${e}`:a,closeItem:({name:a})=>`${a} schließen`,itemAction:({item:a,action:e})=>`${a} · ${e}`,pageTitle:({title:a})=>`${a} · Maximus Trading`,cancel:"Abbrechen",save:"Speichern",pagination:{label:"Seitennavigation",previous:"Zurück",next:"Weiter",pageNumber:({current:a,total:e})=>`Seite ${a} von ${e}`},language:"Sprache wählen",languageNames:{de:"Deutsch",en:"English"},showPassword:"Passwort anzeigen",hidePassword:"Passwort verbergen",validation:{required:"Bitte fülle dieses Feld aus.",email:"Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.",tooShort:({min:a,length:e})=>`Mindestens ${a} Zeichen, aktuell ${e}.`,invalid:"Bitte überprüfe diese Eingabe."}};var Pa={breadcrumb:"Breadcrumb",brand:"Maximus Trading",brandName:"maximus",brandSuffix:"TRADING",close:"Close",withShortcut:({label:a,shortcut:e})=>e?`${a} · ${e}`:a,closeItem:({name:a})=>`Close ${a}`,itemAction:({item:a,action:e})=>`${a} · ${e}`,pageTitle:({title:a})=>`${a} · Maximus Trading`,cancel:"Cancel",save:"Save",pagination:{label:"Pagination",previous:"Previous",next:"Next",pageNumber:({current:a,total:e})=>`Page ${a} of ${e}`},language:"Select language",languageNames:{de:"Deutsch",en:"English"},showPassword:"Show password",hidePassword:"Hide password",validation:{required:"Please fill in this field.",email:"Please enter a valid email address, e.g. name@example.com.",tooShort:({min:a,length:e})=>`At least ${a} characters, currently ${e}.`,invalid:"Please check this entry."}};var z=Zt({de:ka,en:Pa});var m=class extends S{constructor(){super(...arguments);this.label="";this.name="";this.value="";this.type="text";this.prefix="";this.placeholder="";this.patternMessage="";this.hint="";this.required=!1;this.noAutocorrect=!1;this.errorVisible=!1;this.blankIsMissing=!0}get error(){return this.errorVisible?this.validationMessage():""}get describedBy(){return this.error?`${this.name}-error`:this.hint?`${this.name}-hint`:void 0}createRenderRoot(){return this}updated(t){["value","type","required","minlength","maxlength","pattern"].some(o=>t.has(o))&&(this.syncValidity(),this.errorVisible&&(this.errorVisible=!this.input.validity.valid))}validationMessage(){let{validity:t,value:r}=this.input;return t.valueMissing||this.required&&this.blankIsMissing&&!r.trim()?z.validation.required:t.typeMismatch&&this.type==="email"?z.validation.email:this.minlength&&r.length<this.minlength?z.validation.tooShort({min:this.minlength,length:r.length}):t.patternMismatch?this.patternMessage||z.validation.invalid:t.typeMismatch?z.validation.invalid:""}syncValidity(){this.input.setCustomValidity(""),this.input.setCustomValidity(this.validationMessage())}showValidity(){this.syncValidity(),this.errorVisible=!this.input.validity.valid}blurred(){(this.input.value||this.errorVisible)&&this.showValidity()}changed(){this.value=this.input.value,this.dispatchEvent(new CustomEvent("value-change",{detail:this.value,bubbles:!0,composed:!0})),this.syncValidity(),this.errorVisible&&(this.errorVisible=!this.input.validity.valid)}renderLabel(){return c`<label for=${this.name}>${this.label}</label>`}renderInput(t=this.type){return c`<input
      class="input"
      id=${this.name}
      name=${this.name}
      type=${t}
      .value=${ya(this.value)}
      autocomplete=${k(this.autocomplete)}
      autocapitalize=${k(this.noAutocorrect?"none":void 0)}
      spellcheck=${k(this.noAutocorrect?"false":void 0)}
      placeholder=${this.placeholder}
      pattern=${k(this.pattern)}
      ?required=${this.required}
      minlength=${k(this.minlength)}
      maxlength=${k(this.maxlength)}
      aria-describedby=${k(this.describedBy)}
      aria-invalid=${k(this.error?"true":void 0)}
      @blur=${this.blurred}
      @invalid=${this.showValidity}
      @input=${this.changed}
    />`}renderTrailing(){return p}renderIcon(){return this.icon?c`<span class="field-icon">${ye(this.icon,16)}</span>`:p}renderMessage(){let t=this.error;return t?c`<p id="${this.name}-error" class="hint error">${t}</p>`:this.hint?c`<p id="${this.name}-hint" class="hint">${this.hint}</p>`:p}renderPrefix(){return this.prefix?c`<span class="field-prefix" aria-hidden="true">${this.prefix}</span>`:p}render(){let t=`--input-prefix-width:${this.prefix.length}ch`,r=`field ${this.icon?"has-icon":""} ${this.prefix?"has-prefix":""}`;return c`${this.renderLabel()}
      <div class=${r} style=${t}>
        ${this.renderInput()}${this.renderIcon()}${this.renderPrefix()}${this.renderTrailing()}
      </div>
      ${this.renderMessage()}`}};d([u()],m.prototype,"label",2),d([u()],m.prototype,"name",2),d([u()],m.prototype,"value",2),d([u()],m.prototype,"icon",2),d([u()],m.prototype,"type",2),d([u()],m.prototype,"autocomplete",2),d([u()],m.prototype,"prefix",2),d([u()],m.prototype,"placeholder",2),d([u()],m.prototype,"pattern",2),d([u()],m.prototype,"patternMessage",2),d([u()],m.prototype,"hint",2),d([u({type:Boolean})],m.prototype,"required",2),d([u({type:Number})],m.prototype,"minlength",2),d([u({type:Number})],m.prototype,"maxlength",2),d([u({type:Boolean,attribute:"no-autocorrect"})],m.prototype,"noAutocorrect",2),d([ha()],m.prototype,"errorVisible",2),d([ga(".input",!0)],m.prototype,"input",2),m=d([L("text-input")],m);var $a=g`
  text-input,
  password-input {
    display: grid;
    gap: 8px;
    font-size: var(--font-size-label);
  }
  .field {
    --input-leading-space: 14px;
    position: relative;
  }
  .input {
    width: 100%;
    height: var(--input-height, 48px);
    padding: 0 14px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-control);
    background: var(--color-sidebar);
    color: var(--color-text);
    font-size: var(--font-size-label);
    transition:
      border-color var(--motion-duration-control),
      background var(--motion-duration-control);
  }
  .has-icon {
    --input-leading-space: 42px;
  }
  .has-prefix .input {
    padding-left: calc(var(--input-leading-space) + var(--input-prefix-width));
  }
  .field-prefix {
    position: absolute;
    top: 50%;
    left: var(--input-leading-space);
    transform: translateY(-50%);
    color: var(--color-muted);
    pointer-events: none;
  }
  .has-icon:not(.has-prefix) .input {
    padding-left: 42px;
  }
  .field-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    display: grid;
    color: var(--color-muted);
    transform: translateY(-50%);
    pointer-events: none;
    transition: color var(--motion-duration-control);
  }
  .input:hover {
    border-color: var(--color-muted);
  }
  .input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-accent-soft);
    background: var(--color-panel);
  }
  .input:focus ~ .field-icon {
    color: var(--color-accent);
  }
  .input::placeholder {
    color: var(--color-muted);
    opacity: 0.7;
  }
  .input:user-invalid,
  .input[aria-invalid="true"] {
    border-color: var(--color-error);
  }
  .hint {
    margin: 0;
    color: var(--color-muted);
    font-size: var(--font-size-fine-print);
    line-height: var(--line-height-relaxed);
  }
  .hint.error {
    color: var(--color-error);
  }
`;var P=class extends S{constructor(){super(...arguments);this.label="";this.name="";this.required=!1;this.disabled=!1;this.checked=!1}createRenderRoot(){return this}render(){return c`<label class="checkbox"
      ><input
        type="checkbox"
        name=${this.name}
        ?required=${this.required}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @change=${t=>this.checked=t.target.checked}
      /><span>${this.label}</span></label
    >`}};d([u()],P.prototype,"label",2),d([u()],P.prototype,"name",2),d([u({type:Boolean})],P.prototype,"required",2),d([u({type:Boolean})],P.prototype,"disabled",2),d([u({type:Boolean})],P.prototype,"checked",2),P=d([L("app-checkbox")],P);var La={horizontal:{ArrowLeft:-1,ArrowRight:1},vertical:{ArrowUp:-1,ArrowDown:1}};function Ra(a,e){return a==="Home"||a==="End"||a in La[e]}function Ta(a,e,t,r){return a==="Home"?0:a==="End"?t-1:(e+La[r][a]+t)%t}var Ba="(max-width: 650px)";var we=g`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
    letter-spacing: inherit;
  }
  button,
  a,
  input {
    -webkit-tap-highlight-color: transparent;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: wait;
    opacity: 0.6;
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  summary:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
  a {
    color: var(--color-accent);
    text-underline-offset: 4px;
  }
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    padding: 12px 20px;
    border: 0;
    border-radius: var(--radius-pill);
    background: var(--color-panel);
    color: var(--color-text);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-button);
    text-decoration: none;
    transition:
      background var(--motion-duration-control),
      transform var(--motion-duration-control);
  }
  .button:hover:not(:disabled) {
    background: var(--color-panel-hover);
  }
  .button.primary {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }
  .button.primary:hover:not(:disabled) {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
  }
  .text-button {
    padding: 4px 0;
    border: 0;
    background: none;
    color: var(--color-accent);
    font-size: var(--font-size-caption);
  }
  .text-button:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .eyebrow {
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: var(--font-size-eyebrow);
    letter-spacing: var(--letter-spacing-eyebrow);
    font-weight: var(--font-weight-heading);
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;var Da=g`
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-scrollbar) transparent;
  }
  @supports selector(::-webkit-scrollbar) {
    * {
      scrollbar-width: auto;
      scrollbar-color: auto;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border: 2px solid transparent;
      border-radius: var(--radius-pill);
      background: var(--color-scrollbar);
      background-clip: padding-box;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-scrollbar-hover);
    }
    ::-webkit-scrollbar-button {
      display: none;
      width: 0;
      height: 0;
    }
  }
`;var Fa=g`
  ${we}
  :host {
    font-family: var(--font-sans);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
    font-weight: var(--font-weight-body);
    letter-spacing: var(--letter-spacing-ui);
    color: var(--color-text);
  }
  strong,
  b {
    font-weight: var(--font-weight-emphasis);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: var(--font-weight-heading);
    letter-spacing: var(--letter-spacing-heading);
  }
  .button {
    min-height: 34px;
    gap: 8px;
    padding: 8px 14px;
    border: 0;
    border-radius: var(--radius-pill);
    font-size: var(--font-size-label);
  }
  .button.primary:hover:not(:disabled) {
    transform: none;
  }
  .icon-button {
    width: 32px;
    height: 32px;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    padding: 0;
    border: 0;
    border-radius: var(--radius-control);
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
  }
  .icon-button:hover {
    color: var(--color-text);
    background: var(--color-panel-hover);
  }
  @media (max-width: 800px) {
    .icon-button {
      width: var(--touch-target);
      height: var(--touch-target);
    }
    .button {
      min-height: var(--touch-target);
    }
  }
  @media (min-width: 801px) {
    .sidebar-toggle {
      display: none;
    }
  }
  @media ${te(Ba)} {
    kbd {
      display: none !important;
    }
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  [tabindex]:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  input,
  textarea,
  select {
    font-family: var(--font-sans);
    accent-color: var(--color-accent);
  }
  input::placeholder,
  textarea::placeholder {
    color: var(--color-muted);
    opacity: 1;
  }
  input:focus-visible,
  select:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-muted);
  }
  ${Da}
`;var Ea=g`
  ${Fa}
  :host {
    display: block;
    min-width: 0;
  }
  :host([scrollable]) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .navigation {
    flex: 0 0 auto;
    padding: 16px 0;
    margin-bottom: var(--tabs-content-gap, 24px);
  }
  :host([scrollable]) .navigation {
    margin-bottom: 0;
  }
  :host([scrollable]) .panels {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
  .tabs {
    display: flex;
    gap: 4px;
    width: min(var(--tabs-content-width, 100%), calc(100% - 2 * var(--tabs-inline-gutter, 0px)));
    margin-inline: auto;
    padding-inline-start: var(--tabs-leading-space, 0px);
    overflow-x: auto;
  }
  .section-picker {
    display: none;
  }
  button {
    flex: 0 0 auto;
    min-height: 40px;
    padding: 8px 18px;
    border: 0;
    border-radius: var(--radius-pill);
    background: transparent;
    color: var(--color-muted);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-button);
    transition:
      background var(--motion-duration-control),
      color var(--motion-duration-control);
  }
  button:hover {
    background: var(--color-panel);
    color: var(--color-text);
  }
  button[aria-selected="true"] {
    background: var(--color-selected);
    color: var(--color-text);
  }
  button:focus-visible {
    outline-offset: -3px;
  }
  :host([variant="underline"]) .navigation {
    padding-bottom: 0;
    border-bottom: 1px solid var(--color-border);
  }
  :host([variant="underline"]) .tabs {
    gap: 16px;
  }
  :host([variant="underline"]) button {
    padding-inline: 4px;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: transparent;
  }
  :host([variant="underline"]) button[aria-selected="true"] {
    border-bottom-color: var(--color-text);
  }
  @media (max-width: 650px) {
    button {
      padding-inline: 12px;
      font-size: var(--font-size-label);
    }
  }
  @media (max-width: 800px) {
    :host([compact]) .navigation {
      padding: 8px var(--mobile-page-gutter);
      padding-inline-start: calc(var(--mobile-page-gutter) + var(--tabs-leading-space, 0px));
    }
    :host([compact]) .tabs {
      display: none;
    }
    :host([compact]) .section-picker {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--touch-target);
      font-size: var(--font-size-label);
      color: var(--color-muted);
    }
    select {
      flex: 1;
      min-width: 0;
      min-height: var(--touch-target);
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-control);
      padding-inline: 12px;
      background: var(--color-panel);
      color: var(--color-text);
      font-size: var(--font-size-input);
    }
  }
  [role="tabpanel"][hidden] {
    display: none;
  }
  [role="tabpanel"]:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
    border-radius: var(--radius-subtle);
  }
`;var v=class extends S{constructor(){super(...arguments);this.tabs=[];this.label="";this.active="";this.variant="pill";this.scrollable=!1;this.compact=!1}get selected(){return this.tabs.find(t=>t.id===this.active)?.id??this.tabs[0]?.id??""}select(t){t!==this.selected&&(this.active=t,this.dispatchEvent(new CustomEvent("tab-change",{detail:t,bubbles:!0,composed:!0})))}async navigate(t,r){if(!this.tabs.length||!Ra(t.key,"horizontal"))return;let o=Ta(t.key,r,this.tabs.length,"horizontal");t.preventDefault(),this.select(this.tabs[o].id),await this.updateComplete,this.isConnected&&this.renderRoot.querySelectorAll("[role=tab]")[o]?.focus()}render(){return c`
      <div class="navigation" part="navigation">
        <label class="section-picker">
          <span>${this.label}</span>
          <select
            aria-label=${this.label}
            @change=${t=>this.select(t.target.value)}
          >
            ${this.tabs.map(t=>c`<option value=${t.id} ?selected=${this.selected===t.id}>${t.label}</option>`)}
          </select>
        </label>
        <div class="tabs" role="tablist" aria-label=${this.label}>
          ${this.tabs.map((t,r)=>c`
              <button
                type="button"
                id=${`tab-${t.id}`}
                role="tab"
                aria-controls=${`panel-${t.id}`}
                aria-selected=${this.selected===t.id}
                tabindex=${this.selected===t.id?0:-1}
                @click=${()=>this.select(t.id)}
                @keydown=${o=>this.navigate(o,r)}
              >
                ${t.label}
              </button>
            `)}
        </div>
      </div>
      <div class="panels">
        ${this.tabs.map(t=>c`
            <div
              id=${`panel-${t.id}`}
              role="tabpanel"
              aria-labelledby=${`tab-${t.id}`}
              tabindex="0"
              ?hidden=${this.selected!==t.id}
            >
              <slot name=${t.id}></slot>
            </div>
          `)}
      </div>
    `}};v.styles=Ea,d([u({attribute:!1})],v.prototype,"tabs",2),d([u()],v.prototype,"label",2),d([u()],v.prototype,"active",2),d([u({reflect:!0})],v.prototype,"variant",2),d([u({type:Boolean,reflect:!0})],v.prototype,"scrollable",2),d([u({type:Boolean,reflect:!0})],v.prototype,"compact",2),v=d([L("pill-tabs")],v);var _a=g`
  app-checkbox {
    display: block;
  }
  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: var(--color-muted);
    font-size: var(--font-size-fine-print);
    line-height: var(--line-height-relaxed);
    cursor: pointer;
  }
  .checkbox input {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    margin: 2px 0 0;
    accent-color: var(--color-accent);
  }
`;var Jt=document.createElement("style");Jt.dataset.maximusUi="snapshot";Jt.textContent=[we,Sa,$a,_a].map(a=>a.cssText).join(`
`);document.head.append(Jt);globalThis.MAXIMUS_UI_SNAPSHOT=Object.freeze({commit:"e6858c59ab4b059c0cc75c93ec6dfe5cf15aabe9",tags:["cta-button","text-input","app-checkbox","pill-tabs"]});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/unsafe-html.js:
lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lucide/dist/esm/icons/archive-restore.mjs:
lucide/dist/esm/icons/archive.mjs:
lucide/dist/esm/icons/arrow-down.mjs:
lucide/dist/esm/icons/arrow-left.mjs:
lucide/dist/esm/icons/arrow-right.mjs:
lucide/dist/esm/icons/arrow-up-right.mjs:
lucide/dist/esm/icons/arrow-up.mjs:
lucide/dist/esm/icons/book-open.mjs:
lucide/dist/esm/icons/bot.mjs:
lucide/dist/esm/icons/brain.mjs:
lucide/dist/esm/icons/calendar.mjs:
lucide/dist/esm/icons/chart-no-axes-combined.mjs:
lucide/dist/esm/icons/check.mjs:
lucide/dist/esm/icons/chevron-down.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-x.mjs:
lucide/dist/esm/icons/clapperboard.mjs:
lucide/dist/esm/icons/clipboard-list.mjs:
lucide/dist/esm/icons/clock.mjs:
lucide/dist/esm/icons/code-xml.mjs:
lucide/dist/esm/icons/command.mjs:
lucide/dist/esm/icons/corner-down-right.mjs:
lucide/dist/esm/icons/download.mjs:
lucide/dist/esm/icons/ellipsis.mjs:
lucide/dist/esm/icons/ellipsis-vertical.mjs:
lucide/dist/esm/icons/eraser.mjs:
lucide/dist/esm/icons/expand.mjs:
lucide/dist/esm/icons/eye-off.mjs:
lucide/dist/esm/icons/eye.mjs:
lucide/dist/esm/icons/file-diff.mjs:
lucide/dist/esm/icons/file.mjs:
lucide/dist/esm/icons/flask-conical.mjs:
lucide/dist/esm/icons/folder-open.mjs:
lucide/dist/esm/icons/folder.mjs:
lucide/dist/esm/icons/git-branch.mjs:
lucide/dist/esm/icons/globe.mjs:
lucide/dist/esm/icons/grip-vertical.mjs:
lucide/dist/esm/icons/headphones.mjs:
lucide/dist/esm/icons/heart-pulse.mjs:
lucide/dist/esm/icons/id-card.mjs:
lucide/dist/esm/icons/image.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/layers.mjs:
lucide/dist/esm/icons/link-2.mjs:
lucide/dist/esm/icons/list-end.mjs:
lucide/dist/esm/icons/lock-keyhole.mjs:
lucide/dist/esm/icons/lock-keyhole-open.mjs:
lucide/dist/esm/icons/log-out.mjs:
lucide/dist/esm/icons/maximize-2.mjs:
lucide/dist/esm/icons/menu.mjs:
lucide/dist/esm/icons/message-square.mjs:
lucide/dist/esm/icons/mic.mjs:
lucide/dist/esm/icons/minimize-2.mjs:
lucide/dist/esm/icons/minus.mjs:
lucide/dist/esm/icons/mouse-pointer-2.mjs:
lucide/dist/esm/icons/panel-left.mjs:
lucide/dist/esm/icons/panel-right-open.mjs:
lucide/dist/esm/icons/panel-right.mjs:
lucide/dist/esm/icons/paperclip.mjs:
lucide/dist/esm/icons/pencil.mjs:
lucide/dist/esm/icons/pin-off.mjs:
lucide/dist/esm/icons/pin.mjs:
lucide/dist/esm/icons/plus.mjs:
lucide/dist/esm/icons/puzzle.mjs:
lucide/dist/esm/icons/redo-2.mjs:
lucide/dist/esm/icons/refresh-cw.mjs:
lucide/dist/esm/icons/rotate-ccw-clock.mjs:
lucide/dist/esm/icons/search.mjs:
lucide/dist/esm/icons/settings.mjs:
lucide/dist/esm/icons/shield-check.mjs:
lucide/dist/esm/icons/sparkles.mjs:
lucide/dist/esm/icons/square-pen.mjs:
lucide/dist/esm/icons/terminal.mjs:
lucide/dist/esm/icons/timer-off.mjs:
lucide/dist/esm/icons/trash.mjs:
lucide/dist/esm/icons/triangle-alert.mjs:
lucide/dist/esm/icons/type.mjs:
lucide/dist/esm/icons/undo-2.mjs:
lucide/dist/esm/icons/user.mjs:
lucide/dist/esm/icons/wallet.mjs:
lucide/dist/esm/icons/wrench.mjs:
lucide/dist/esm/icons/x.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.48.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
