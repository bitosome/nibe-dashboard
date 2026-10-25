function t(t,e,i,o){var r,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=t=>new s("string"==typeof t?t:t+"",void 0,o),n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t,{is:c,defineProperty:p,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,f=globalThis,g=f.trustedTypes,b=g?g.emptyScript:"",y=f.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&p(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??x)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,y?.({ReactiveElement:$}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=t=>t,k=A.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+z,H=`<${P}>`,O=document,T=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,M=/>/g,B=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,D=/"/g,W=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),V=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",a=I;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,p=0;for(;p<i.length&&(a.lastIndex=p,l=a.exec(i),null!==l);)p=a.lastIndex,a===I?"!--"===l[1]?a=j:void 0!==l[1]?a=M:void 0!==l[2]?(W.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=r??I,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?B:'"'===l[3]?D:q):a===D||a===q?a=B:a===j||a===M?a=I:(a=B,r=void 0);const d=a===B&&t[e+1].startsWith("/>")?" ":"";s+=a===I?i+H:c>=0?(o.push(n),i.slice(0,c)+C+i.slice(c)+z+d):i+z+(-2===c?e:d)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,c]=Y(t,e);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=c[s++],i=o.getAttribute(t).split(z),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?ot:"@"===a[1]?rt:et}),o.removeAttribute(t)}else t.startsWith(z)&&(n.push({type:6,index:r}),o.removeAttribute(t));if(W.test(o.tagName)){const t=o.textContent.split(z),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),J.nextNode(),n.push({type:2,index:++r});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(z,t+1));)n.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===F)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=R(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,o)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);J.currentNode=o;let r=J.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new tt(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++a]}s!==n?.index&&(r=J.nextNode(),s++)}return J.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new X(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new tt(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=Q(this,t,e,0),s=!R(t)||t!==this._$AH&&t!==F,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=Q(this,o[i+a],e,a),n===F&&(n=this._$AH[a]),s||=!R(n)||n!==this._$AH[a],n===G?t=G:t!==G&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class rt extends et{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===F)return;const i=this._$AH,o=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=A.litHtmlPolyfillSupport;at?.(Z,tt),(A.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class lt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new tt(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:lt});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:lt}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},ht=(t=dt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return ut({...t,state:!0,attribute:!1})}const ft=n`${a("\n  :host {\n    display: block;\n    /* Chip styling variables */\n    --chip-padding: 2px 2px;\n    --chip-text-font-weight: 700;\n    --chip-text-font-size: var(--chip-font-size, 12px);\n    --chip-background-color: rgba(0,0,0,0.06);\n    --chip-border-radius: var(--ha-badge-border-radius, 999px);\n    --chip-gap: 6px;\n    --main-light-on-bg: linear-gradient(135deg,#ffcf57,#ffb200);\n    --main-light-off-bg: rgba(0,0,0,0.06);\n    --main-light-icon-on-color: #ffffff;\n    --main-light-icon-off-color: var(--secondary-text-color);\n    --switch-on-color: var(--switch-on-yellow, #ffc107);\n    --switch-smart-on-color: var(--switch-on-green, #00c853);\n    --switch-lock-unlocked-color: var(--switch-unlocked-red, #e53935);\n    --lock-spinner-color: var(--primary-text-color, #ffffff);\n    --switch-chip-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --switch-icon-size: 28px;\n    --ac-chip-bg-off: rgba(158,158,158,0.95);\n    --ac-chip-bg-cool: #00aaff;\n    --ac-chip-bg-heat: #ff7043;\n    --ac-chip-bg-dry: #ffca28;\n    --ac-chip-bg-fan: #66bb6a;\n    --ac-chip-bg-auto: #26c6da;\n    --ac-chip-bg-default: rgba(0,0,0,0.06);\n    --ac-chip-icon-color: #ffffff;\n    --ac-chip-icon-off-color: #ffffff;\n    --ac-fan-color-off: gray;\n    --ac-fan-color-cool: #00aaff;\n    --ac-fan-color-heat: #ff7043;\n    --ac-fan-color-dry: #ffca28;\n    --ac-fan-color-fan: #66bb6a;\n    --ac-fan-color-auto: #26c6da;\n    --ac-fan-color-default: var(--paper-item-icon-color);\n    --thermostat-heating-color: #ff7043;\n    --thermostat-idle-color: #66bb6a;\n    --thermostat-off-color: gray;\n    --thermostat-pill-heating-bg: var(--state-climate-heat-color, #ff7043);\n    --thermostat-pill-heating-fg: var(--primary-background-color, #fff);\n    --thermostat-pill-idle-bg: var(--chip-background-color, rgba(0,0,0,0.06));\n    --thermostat-pill-idle-fg: var(--secondary-text-color);\n\n    /* Shared semantic status palette (single source of truth across cards) */\n    --status-on-color: #ffc107;\n    --status-active-color: #42a5f5;\n    --status-success-color: #66bb6a;\n    --status-alert-color: #e53935;\n    --status-warn-color: #ff9800;\n    --status-cool-color: #00aaff;\n    --status-heat-color: #ff7043;\n    --status-dry-color: #ffca28;\n    --status-fan-color: #66bb6a;\n    --status-auto-color: #26c6da;\n    --status-smartplug-on-color: #ff9800;\n    --status-presence-color: #42a5f5;\n    --status-icon-on-color: #ffffff;\n\n    /* Positioning variables */\n    --tile-padding: 8px;\n    --tile-padding-large: 12px;\n    --chip-z-index: 3;\n    --tile-z-index: 2;\n    --glow-z-index: 1;\n\n    /* Tile shape control */\n    --tile-border-radius: var(--ha-card-border-radius, 12px);\n\n    /* Common gaps and spacing */\n    --small-gap: 2px;\n    --medium-gap: 6px;\n    --large-gap: 12px;\n\n    /* Shadow variables */\n    --tile-shadow-default: 0 6px 18px rgba(0,0,0,0.10);\n    --tile-shadow-hover: 0 12px 24px rgba(0,0,0,0.16);\n    --tile-shadow-active: 0 18px 40px var(--pulse-strong, rgba(0,0,0,0.18)), 0 6px 18px var(--pulse-weak, rgba(0,0,0,0.10));\n  }\n")}`,gt="mdi:cog-outline",bt="mdi:information-outline",yt="mdi:history";n`
  .family-telemetry { display:grid;grid-template-columns:repeat(var(--family-telemetry-columns,3),minmax(0,1fr));padding:8px 0; }
  .family-telemetry-cell { min-width:0;min-height:48px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:5px;padding:4px 12px;border:0;border-inline-end:1px solid color-mix(in srgb,var(--primary-text-color) 7%,transparent);background:transparent;text-align:start;color:inherit;font:inherit; }
  .family-telemetry-cell:last-child { border-inline-end:0; }
  .family-telemetry-label { font-size:11px;color:var(--secondary-text-color);line-height:1.35;overflow-wrap:anywhere; }
  .family-telemetry-value { max-width:100%;font-size:13px;font-weight:550;font-variant-numeric:tabular-nums;overflow-wrap:anywhere; }
  @container(max-width:340px) { .family-telemetry-cell { padding-inline:10px; } }
`;n`
  .family-dialog {
    --family-safe-top:var(--safe-area-inset-top,env(safe-area-inset-top,0px));
    --family-safe-bottom:var(--safe-area-inset-bottom,env(safe-area-inset-bottom,0px));
    --family-safe-left:var(--safe-area-inset-left,env(safe-area-inset-left,0px));
    --family-safe-right:var(--safe-area-inset-right,env(safe-area-inset-right,0px));
    --family-available-height:calc(100vh - 24px - var(--family-safe-top) - var(--family-safe-bottom));
    position:fixed;inset:calc(12px + var(--family-safe-top)) calc(12px + var(--family-safe-right)) calc(12px + var(--family-safe-bottom)) calc(12px + var(--family-safe-left));
    margin:auto;padding:0;box-sizing:border-box;
    width:calc(100vw - 24px - var(--family-safe-left) - var(--family-safe-right));max-width:var(--family-dialog-width,480px);
    max-height:var(--family-available-height);border:1px solid var(--divider-color,#8883);border-radius:var(--family-radius,24px);
    color:var(--primary-text-color);background:var(--family-surface);box-shadow:0 24px 90px #0005;overflow:hidden;font-family:var(--family-font);
  }
  .family-dialog[open] { display:grid;grid-template-rows:auto minmax(0,1fr) auto; }
  .family-dialog.long { height:min(760px,var(--family-available-height)); }
  .family-dialog::backdrop { background:#070a1480;backdrop-filter:blur(4px); }
  .family-dialog-header { display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--divider-color,#8883); }
  .family-dialog-header h2,.family-dialog-header h3 { min-width:0;margin:0;font-size:18px;font-weight:650;line-height:1.35;overflow-wrap:anywhere; }
  .family-dialog-body { min-width:0;min-height:0;padding:16px;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch; }
  .family-dialog-footer { display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px;padding:12px 16px;border-top:1px solid var(--divider-color,#8883); }
  .family-dialog button:focus-visible,.family-dialog input:focus-visible,.family-dialog select:focus-visible { outline:3px solid var(--primary-color);outline-offset:2px; }
  .family-dialog input,.family-dialog select { font-size:16px; }
  @supports(height:100dvh) { .family-dialog { --family-available-height:calc(100dvh - 24px - var(--family-safe-top) - var(--family-safe-bottom)); } }
  @media(prefers-reduced-motion:reduce) { .family-dialog,.family-dialog * { animation:none!important;transition:none!important; } }
`;const vt=[n`
  :host {
    --family-gap: 12px;
    --family-grid-gap: 8px;
    --family-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --family-tile: color-mix(in srgb, var(--family-surface) 96%, var(--primary-text-color) 4%);
    --family-muted: var(--secondary-text-color);
    --family-radius: var(--ha-card-border-radius, 24px);
    --family-font: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, inherit));
    font-family: var(--family-font);
  }
  .family-icon-button { display:inline-grid;place-items:center;min-width:44px;min-height:44px;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--secondary-text-color);font:inherit;cursor:pointer;flex:0 0 44px;touch-action:manipulation; }
  .family-icon-button ha-icon { width:22px;height:22px;--mdc-icon-size:22px;flex:0 0 22px; }
  .family-icon-button:focus-visible,.family-action:focus-visible,.family-chip:is(button):focus-visible { outline:3px solid var(--primary-color);outline-offset:3px; }
  .family-icon-button:disabled,.family-action:disabled { opacity:.45;cursor:default; }
  .family-action { display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:8px 14px;border:0;border-radius:var(--chip-border-radius,999px);background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);color:var(--primary-text-color);font:inherit;font-family:var(--family-font);font-size:13px;font-weight:600;line-height:1.4;cursor:pointer;touch-action:manipulation; }
  .family-action ha-icon { width:22px;height:22px;--mdc-icon-size:22px;flex:0 0 22px; }
  .family-action.primary { background:var(--primary-color);color:var(--text-primary-color,var(--primary-background-color)); }
  .family-chip { display:inline-flex;align-items:center;gap:6px;min-height:28px;padding:4px 8px;border-radius:var(--chip-border-radius,999px);background:var(--chip-background-color);font:inherit;font-family:var(--family-font);font-size:12px;font-weight:500;line-height:1.4;overflow-wrap:anywhere; }
  button.family-chip { min-height:44px;cursor:pointer; }
  .family-surface { position:relative;z-index:1;background:var(--family-tile);border-radius:var(--tile-border-radius,12px);box-shadow:var(--tile-shadow-default); }
  @media(hover:hover) { .family-icon-button:not(:disabled):hover { background:color-mix(in srgb,var(--primary-text-color) 6%,transparent); } }
  @media(prefers-reduced-motion:reduce) { .family-action,.family-icon-button { transition:none!important;animation:none!important; } }
`,n`
  .family-header { display:flex;align-items:center;gap:12px;padding:8px 8px 3px; }
  .family-brand { width:44px;height:44px;flex:0 0 44px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--primary-color) 10%,transparent); }
  .family-brand ha-icon { width:26px;height:26px;--mdc-icon-size:26px; }
  .family-identity { min-width:0;flex:1; }
  .family-title { font-size:18px;font-weight:700;line-height:1.25;letter-spacing:-.02em;margin:0;overflow-wrap:anywhere; }
  .family-subtitle { margin-top:4px;color:var(--secondary-text-color);font-size:12px;line-height:1.4;overflow-wrap:anywhere; }
`,n`
  .family-metrics { display:grid;grid-template-columns:repeat(var(--family-metric-columns,2),minmax(0,1fr));gap:8px;align-items:stretch; }
  .family-metric { width:100%;min-width:0;text-align:start;padding:12px;display:grid;grid-template-rows:1fr auto;gap:6px;min-height:var(--family-metric-height,100px); }
  .family-metric-top { display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:18px auto;gap:6px 4px;align-items:center;color:var(--secondary-text-color); }
  .family-metric-top ha-icon { width:18px;height:18px;--mdc-icon-size:18px;grid-column:1;grid-row:1; }
  .family-metric-top .family-metric-trailing { width:16px;height:16px;--mdc-icon-size:16px;grid-column:2;opacity:.6; }
  .family-metric-label { grid-column:1/-1;grid-row:2;min-width:0;font-size:11px;line-height:1.3;overflow-wrap:anywhere; }
  .family-metric-value { display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 3px;font-size:clamp(22px,6.4cqw,28px);font-weight:550;letter-spacing:-.03em;line-height:1.1;font-variant-numeric:tabular-nums;overflow-wrap:anywhere; }
  .family-metric-value small { font-size:10px;font-weight:500;letter-spacing:0;color:var(--secondary-text-color); }
  .family-metric-value.missing { font-size:13px;line-height:1.4;letter-spacing:0;min-height:28px;align-items:center; }
  @container(max-width:340px) { .family-metric { padding:10px; } }
`,n`
  .family-navigation { display:grid;grid-template-columns:repeat(var(--family-nav-columns,4),minmax(0,1fr));gap:4px;padding:5px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);border-radius:var(--tile-border-radius,12px);position:relative;z-index:1; }
  .family-navigation button { display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;min-height:56px;padding:8px 4px;border:0;background:transparent;border-radius:max(0px,calc(var(--tile-border-radius,12px) - 3px));font:inherit;font-size:11px;color:var(--secondary-text-color);cursor:pointer; }
  .family-navigation button[aria-current=page] { background:var(--family-surface);color:var(--primary-text-color);box-shadow:0 2px 8px #0001; }
  .family-navigation button:focus-visible { outline:3px solid var(--primary-color);outline-offset:1px; }
`,n`
    :host {
      color: var(--primary-text-color, #26352f);
      font-family: var(--family-font);
      --nibe-surface: var(
        --ha-card-background,
        var(--card-background-color, #fff)
      );
      --nibe-muted: var(--secondary-text-color, #69756f);
      --nibe-accent: var(--status-heat-color);
    }
    :host([hidden]) {
      display: none;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      padding: var(--tile-padding-large);
      background: var(--nibe-surface);
      border: 1px solid var(--divider-color, #0001);
      border-radius: var(--ha-card-border-radius, 24px);
      overflow: visible;
    }
    .outer {
      container-type: inline-size;
    }
    .root {
      isolation: isolate;
      display: grid;
      gap: var(--large-gap);
    }
    button {
      font: inherit;
      color: inherit;
      cursor: pointer;
      border: 0;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    button:focus-visible,
    summary:focus-visible {
      outline: 3px solid var(--primary-color, var(--status-active-color));
      outline-offset: 3px;
    }
    ha-icon {
      display: inline-flex;
      width: 22px;
      height: 22px;
      --mdc-icon-size: 22px;
      flex: 0 0 22px;
    }
    .family-icon-button[aria-pressed="true"] {
      color: var(--nibe-accent);
      background: color-mix(in srgb, var(--nibe-accent) 10%, transparent);
    }
    .status-line {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 4px 8px 8px;
      font-size: 13px;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--nibe-muted);
    }
    .heat .dot {
      background: var(--status-heat-color);
    }
    .water .dot {
      background: var(--status-active-color);
    }
    .outside {
      color: var(--nibe-muted);
      margin-left: auto;
      font-size: 12px;
    }
    .panel {
      display: grid;
      gap: var(--large-gap);
      min-width: 0;
    }
    .tile-wrap {
      position: relative;
      min-width: 0;
    }
    .glow-under {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      border-radius: var(--tile-border-radius);
    }
    .glow-overlay {
      position: absolute;
      inset: -10px -14px -18px;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0.8;
      mask-image: linear-gradient(
        180deg,
        transparent,
        rgba(0, 0, 0, 0.25) 18px,
        #000 44px
      );
    }
    .comfort {
      padding: 22px;
    }
    .eyebrow {
      color: var(--nibe-muted);
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .comfort-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
    }
    .reading {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin: 12px 0 20px;
    }
    .reading strong {
      font-size: clamp(42px, 12cqw, 56px);
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.055em;
      font-variant-numeric: tabular-nums;
    }
    .reading span {
      color: var(--nibe-muted);
      font-size: 23px;
    }
    .reading .missing {
      font-size: 26px;
      letter-spacing: -0.025em;
    }
    .comfort-footer,
    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .setting-copy {
      min-width: 0;
    }
    .setting-copy strong {
      font-size: 14px;
      font-weight: 600;
    }
    .setting-copy small {
      display: block;
      color: var(--nibe-muted);
      line-height: 1.5;
      font-size: 12px;
      margin-top: 4px;
    }
    .stepper {
      display: flex;
      align-items: center;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      padding: 3px;
      gap: 3px;
      flex-shrink: 0;
    }
    .stepper button {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--nibe-surface);
      font-size: 21px;
    }
    .stepper output {
      min-width: 49px;
      text-align: center;
      font-size: 14px;
      font-weight: 650;
      font-variant-numeric: tabular-nums;
    }
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 4px 8px 0;
    }
    h2 {
      font-size: 18px;
      margin: 0;
      letter-spacing: -0.025em;
      font-weight: 650;
    }
    h3 {
      font-size: 13px;
      margin: 0 0 12px;
      font-weight: 650;
    }
    .hint {
      font-size: 12px;
      color: var(--nibe-muted);
      line-height: 1.6;
      margin: 0;
      padding: 0 8px;
    }
    .group {
      padding: 18px;
    }
    .rows {
      display: grid;
      gap: 0;
    }
    .data-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: 44px;
      gap: 18px;
      font-size: 12px;
      background: transparent;
      text-align: left;
      padding: 7px 0;
      border-bottom: 1px solid
        color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .data-row:last-child {
      border-bottom: 0;
    }
    .data-row span {
      color: var(--nibe-muted);
    }
    .data-row b {
      text-align: right;
      font-weight: 550;
      overflow-wrap: anywhere;
      max-width: 60%;
    }
    .text-button {
      font-size: 12px;
      color: var(--primary-color, var(--status-active-color));
      min-height: 44px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
    }
    .room {
      padding: 16px 18px;
    }
    .room-top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    .room-top .room-title {
      flex: 1;
      min-width: 0;
      font-size: 14px;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .room-top .room-temp {
      font-size: 20px;
      font-weight: 550;
      letter-spacing: -0.03em;
      white-space: nowrap;
    }
    .room-state {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--nibe-muted);
    }
    .room-state .dot {
      width: 5px;
      height: 5px;
    }
    .room.heating .room-state {
      color: var(--status-heat-color);
    }
    .room.heating .dot {
      background: var(--status-heat-color);
    }
    .rooms {
      display: grid;
      gap: var(--large-gap);
    }
    .notice {
      border-radius: var(--tile-border-radius);
      padding: 12px 14px;
      font-size: 12px;
      line-height: 1.6;
      background: color-mix(
        in srgb,
        var(--status-warn-color) 9%,
        var(--nibe-surface)
      );
      border: 1px solid
        color-mix(in srgb, var(--status-warn-color) 25%, transparent);
    }
    .notice strong {
      display: block;
      font-weight: 650;
      margin-bottom: 3px;
    }
    .notice.error {
      background: color-mix(
        in srgb,
        var(--status-alert-color) 8%,
        var(--nibe-surface)
      );
      border-color: color-mix(
        in srgb,
        var(--status-alert-color) 25%,
        transparent
      );
    }
    .feedback {
      font-size: 12px;
      line-height: 1.5;
      color: var(--nibe-muted);
      padding: 0 8px;
      margin: 0;
    }
    .feedback.error {
      color: var(--error-color, var(--status-alert-color));
    }
    .settings {
      display: grid;
      gap: 18px;
    }
    .chip {
      font-size: 11px;
      color: var(--nibe-muted);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      padding: 5px 8px;
      border-radius: var(--chip-border-radius);
    }
    details {
      padding: 0 8px;
    }
    summary {
      cursor: pointer;
      padding: 14px 0;
      min-height: 44px;
      font-size: 13px;
      font-weight: 600;
    }
    .history {
      display: grid;
      gap: var(--large-gap);
    }
    @container (min-width:600px) {
      .rooms {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .comfort {
        padding: 28px;
      }
    }
    @container (max-width:340px) {
      .comfort {
        padding: 18px 14px;
      }
      .setting-row {
        flex-wrap: wrap;
      }
      .comfort-footer {
        gap: 6px;
      }
      .stepper button {
        width: 44px;
      }
      .stepper output {
        min-width: 44px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  `],_t={indoor:["Indoor temperature","sensor","sensor.home_temperature_average"],outdoor:["Outdoor temperature","sensor","sensor.bt1_outdoor_temperature_40004"],target:["House comfort target","input_number","input_number.indoor_target_temperature"],autopilot:["Autopilot master","input_boolean","input_boolean.nibe_autopilot_state"],heater_cap:["Heater user cap","input_number","input_number.nibe_max_add_heat_kw"],bias:["Manual heat trim","input_number","input_number.nibe_heat_bias"],priority:["Operating priority","sensor","sensor.prio_43086"],alarm:["Active alarm code","sensor","sensor.alarm_45001"],mode:["Operating mode","select","select.operational_mode_47137"],hot_water:["DHW charging (BT6)","sensor","sensor.bt6_hw_load_40014"],tank_top:["DHW tank top (BT7)","sensor","sensor.bt7_hw_top_40013"],periodic_enabled:["Periodic boost enabled","switch","switch.periodic_hw_47050"],periodic_interval:["Periodic interval","number","number.periodic_hw_interval_47051"],periodic_stop:["Periodic stop setting","number","number.stop_temperature_periodic_hw_47046"],circuit_power:["Whole heat-pump circuit input","sensor","sensor.nibe_circuit_input_power_kw"],compressor_power:["Compressor input","sensor","sensor.compr_in_power_43141"],heater_power:["Electric heater input","sensor","sensor.int_el_add_power_43084"],heater_permission:["Controller heater permission","number","number.max_int_add_power_47212"],allowance:["Electrical allowance","sensor","sensor.nibe_electrical_allowance_kw"],mains_fresh:["Mains readings fresh","binary_sensor","binary_sensor.nibe_mains_fresh"],frequency:["Compressor actual","sensor","sensor.compressor_frequency_actual_43136"],frequency_limit:["Controller frequency cap","number","number.max_comp_freq_47104"],supply:["Supply (BT2)","sensor","sensor.bt2_supply_temp_s1_40008"],return:["Return (BT3)","sensor","sensor.eb100_ep14_bt3_return_temp_40012"],supply_target:["Calculated supply","sensor","sensor.calc_supply_s1_43009"],supply_ceiling:["Supply target ceiling","number","number.max_supply_system_1_47019"],offset:["Heating curve offset","number","number.heat_offset_s1_47011"],degree_minutes:["Degree minutes","number","number.degree_minutes_16_bit_43005"],brine_in:["Brine in (BT10)","sensor","sensor.eb100_ep14_bt10_brine_in_temp_40015"],brine_out:["Brine out (BT11)","sensor","sensor.eb100_ep14_bt11_brine_out_temp_40016"],hot_gas:["Hot gas (BT14)","sensor","sensor.eb100_ep14_bt14_hot_gas_temp_40018"],condenser:["Condenser out (BT12)","sensor","sensor.eb100_ep14_bt12_condensor_out_40017"],pump_speed:["Heating pump (GP1)","sensor","sensor.supply_pump_speed_ep14_43437"],brine_speed:["Brine pump (GP2)","sensor","sensor.ep14_gp2_brine_pump_status_ep14_43439"],ready_zones:["Delayed zone requests","sensor","sensor.nibe_ready_zone_count"],warm_guard:["Warm-room guard","input_boolean","input_boolean.nibe_warm_room_guard"],global_hold:["Global fault hold until","input_datetime","input_datetime.nibe_overheat_until"],condenser_hold:["Condenser space-heat hold until","input_datetime","input_datetime.nibe_condenser_hold_until"]},xt=new Set(["target","heater_cap","bias","autopilot"]),wt={target:"comfort_target",heater_cap:"heater_cap",bias:"heat_bias",autopilot:"enabled"},$t=new Set([...xt,"indoor","circuit_power","allowance","ready_zones","warm_guard","mains_fresh","global_hold","condenser_hold"]),At=/^[a-z_]+\.[a-z0-9_]+$/;function Et(t,e=!1){return e?"autopilot"===t?["switch"]:xt.has(t)?["number"]:"warm_guard"===t?["binary_sensor"]:"global_hold"===t||"condenser_hold"===t?["sensor"]:[_t[t][1]]:[_t[t][1]]}function kt(t,e){const i=t.controller_entity?e?.states[t.controller_entity]:void 0;return Pt(i)&&!0===i.attributes.nibe_autopilot?i:void 0}function St(t,e,i){const o=t.entities?.[e];if(void 0!==o)return o??void 0;if(t.controller_entity){const o=kt(t,i)?.attributes.dashboard_entities,r=o?.[e];if("string"==typeof r&&At.test(r)&&Et(e,!0).some(t=>r.startsWith(`${t}.`)))return r;if($t.has(e))return}return _t[e][2]}function Ct(t,e,i){const o=St(t,e,i);if(!o)return;if(!t.controller_entity)return o.startsWith(`${_t[e][1]}.`)?_t[e][1]:void 0;const r=kt(t,i),s=r?.attributes.dashboard_entities,a=i?.states[o];return s?.[e]===o&&a?.attributes.nibe_autopilot_control===wt[e]?o.split(".")[0]:void 0}function zt(t,e){if(void 0!==t.rooms)return t.rooms;const i=kt(t,e)?.attributes.room_entities;return Array.isArray(i)?[...new Set(i.filter(t=>"string"==typeof t&&/^climate\.[a-z0-9_]+$/.test(t)))].map(t=>({entity:t})):[]}function Pt(t){return!!t&&!["unknown","unavailable",""].includes(t.state.toLowerCase())}function Ht(t){if("string"!=typeof t&&"number"!=typeof t||"string"==typeof t&&!t.trim())return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ot(t){return!!t&&!1!==t.connected&&!1!==t.connection?.connected}function Tt(t){const e=Pt(t)?t.state.trim().toUpperCase():"";return"HEAT"===e||"HEATING"===e?{label:"Heating your home",icon:"mdi:radiator",tone:"heat"}:e.includes("HOT WATER")?{label:"Heating hot water",icon:"mdi:water-thermometer",tone:"water"}:"OFF"===e||"STANDBY"===e?{label:"On standby",icon:"mdi:heat-pump-outline",tone:"idle"}:"COOL"===e||"COOLING"===e?{label:"Cooling your home",icon:"mdi:snowflake",tone:"water"}:{label:e?`Priority: ${t.state}`:"Priority unavailable",icon:"mdi:heat-pump-outline",tone:"idle"}}function Rt(t,e,i=!1){const o=function(t,e=!1){if(!Pt(t))return;const i=Ht(e?t.attributes.temperature:t.state),o=Ht(t.attributes[e?"min_temp":"min"]),r=Ht(t.attributes[e?"max_temp":"max"]),s=Ht(t.attributes[e?"target_temp_step":"step"]);return void 0===i||void 0===o||void 0===r||void 0===s||o>=r||s<=0||s>r-o||i<o||i>r||e&&!(1&Number(t.attributes.supported_features))?void 0:{current:i,min:o,max:r,step:s}}(t,i);if(!o||1!==e&&-1!==e)return;const r=Math.round(1e6*Math.min(o.max,Math.max(o.min,o.current+e*o.step)))/1e6;return r===o.current?void 0:r}let Nt=class extends lt{constructor(){super(...arguments),this.page="home",this.feedback="",this.failed=!1,this.histories=[],this.historyError="",this.historyLoading=!1,this.generation=0}setConfig(t){this.config=function(t){if(!t||"custom:nibe-dashboard"!==t.type)throw new Error("Use type: custom:nibe-dashboard");if(void 0!==t.controller_entity&&("string"!=typeof t.controller_entity||!/^sensor\.[a-z0-9_]+$/.test(t.controller_entity)))throw new Error("controller_entity must be the NIBE Autopilot status sensor");for(const e of["title","subtitle"])if(void 0!==t[e]&&"string"!=typeof t[e])throw new Error(`${e} must be text`);if(void 0!==t.read_only&&"boolean"!=typeof t.read_only)throw new Error("read_only must be true or false");if(void 0!==t.entities&&(!t.entities||Array.isArray(t.entities)||"object"!=typeof t.entities))throw new Error("entities must be a mapping");for(const[e,i]of Object.entries(t.entities??{})){if(!(e in _t))throw new Error(`Unknown entity role: ${e}`);if(null===i)continue;const o=Et(e,!!t.controller_entity);if("string"!=typeof i||!At.test(i)||!o.some(t=>i.startsWith(`${t}.`)))throw new Error(`${e} must be a ${o.join("/")} entity or null`)}if(void 0!==t.rooms&&!Array.isArray(t.rooms))throw new Error("rooms must be a list");for(const e of t.rooms??[]){if(!e||"string"!=typeof e.entity||!/^climate\.[a-z0-9_]+$/.test(e.entity))throw new Error("Each room needs a climate entity");if(void 0!==e.name&&"string"!=typeof e.name)throw new Error("Room name must be text")}if(new Set((t.rooms??[]).map(t=>t.entity)).size!==(t.rooms??[]).length)throw new Error("Room entities must be unique");if(void 0!==t.watch_automations&&(!Array.isArray(t.watch_automations)||t.watch_automations.some(t=>"string"!=typeof t||!/^automation\.[a-z0-9_]+$/.test(t))))throw new Error("watch_automations must contain automation entities");if(void 0!==t.history_hours&&(!Number.isInteger(t.history_hours)||t.history_hours<1||t.history_hours>168))throw new Error("history_hours must be an integer from 1 to 168");return{...t,entities:{...t.entities},rooms:t.rooms?.map(t=>({...t})),watch_automations:[...t.watch_automations??[]]}}(t),this.cancelPending(),this.generation++,this.histories=[],this.historyLoading=!1,this.historyError="",this.feedback=""}getCardSize(){return"home"===this.page?8:11}getGridOptions(){return{columns:12,min_columns:6,rows:"auto"}}static async getConfigElement(){return await Promise.resolve().then(function(){return It}),document.createElement("nibe-dashboard-editor")}static getStubConfig(){return{type:"custom:nibe-dashboard",title:"Heat pump",rooms:[]}}disconnectedCallback(){super.disconnectedCallback(),this.cancelPending(),this.generation++,this.historyLoading=!1}updated(t){if(t.has("hass")){this.acknowledge();for(const t of this.histories)t.hass=this.hass}"history"!==this.page||this.histories.length||this.historyLoading||this.historyError||this.loadHistory()}roleId(t){return this.config?St(this.config,t,this.hass):void 0}get rooms(){return this.config?zt(this.config,this.hass):[]}entity(t){const e=this.roleId(t);return e?this.hass?.states[e]:void 0}value(t,e=1){return this.roleId(t)?function(t,e=1){if(!Pt(t))return"Unavailable";const i=Ht(t.state);return`${void 0===i?t.state:i.toFixed(e).replace(/\.0$/,"")}${t.attributes.unit_of_measurement?` ${t.attributes.unit_of_measurement}`:""}`}(this.entity(t),e):"Not configured"}cancelPending(){this.pending?.timer&&clearTimeout(this.pending.timer),this.pending=void 0}canWrite(t){return!this.config?.read_only&&Ot(this.hass)&&!this.pending&&!!t&&Pt(this.hass?.states[t])}acknowledge(){const t=this.pending;if(!t?.accepted)return;const e=this.hass?.states[t.id];if(!Pt(e))return;const i=t.attribute?e.attributes[t.attribute]:e.state;("number"==typeof t.expected?void 0!==Ht(i)&&Math.abs(Number(i)-t.expected)<1e-5:i===t.expected)&&(this.cancelPending(),this.feedback="Setting updated in Home Assistant. Pump response may take time.",this.failed=!1)}async command(t,e,i,o,r,s){if(!this.canWrite(t)||!this.hass)return;const a={id:t,expected:r,attribute:s,accepted:!1};this.pending=a,this.failed=!1,this.feedback="Sending setting to Home Assistant...",a.timer=setTimeout(()=>{this.pending===a&&(this.cancelPending(),this.feedback="No confirmation received. Check the current setting before trying again.",this.failed=!0)},15e3);try{if(await this.hass.callService(e,i,{entity_id:t,...o}),this.pending!==a)return;a.accepted=!0,this.feedback="Request accepted. Waiting for the entity to update...",this.acknowledge()}catch(t){if(this.pending!==a)return;this.cancelPending(),this.failed=!0,this.feedback=`Setting failed: ${t instanceof Error?t.message:"Home Assistant rejected the request"}`}}adjust(t,e){if(!xt.has(t))return;const i=this.roleId(t),o=Rt(this.entity(t),e),r=this.config?Ct(this.config,t,this.hass):void 0;i&&r&&void 0!==o&&this.command(i,r,"set_value",{value:o},o)}adjustRoom(t,e){if(!this.rooms.some(e=>e.entity===t.entity))return;const i=this.hass?.states[t.entity];if("off"===i?.state)return;const o=Rt(i,e,!0);void 0!==o&&this.command(t.entity,"climate","set_temperature",{temperature:o},o,"temperature")}moreInfo(t){t&&/^(sensor|binary_sensor|climate)\./.test(t)&&this.hass?.states[t]&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}show(t){this.page=t}stepper(t){const e=this.entity(t),i=this.canWrite(this.roleId(t))&&!!this.config&&!!Ct(this.config,t,this.hass);return L`<div class="stepper" aria-label=${_t[t][0]}>
      <button
        data-adjust=${`${t}-down`}
        aria-label=${`Decrease ${_t[t][0]}`}
        ?disabled=${!i||void 0===Rt(e,-1)}
        @click=${()=>this.adjust(t,-1)}
      >
        &minus;
      </button>
      <output
        >${Pt(e)&&void 0!==Ht(e.state)?e.state:"--"}</output
      >
      <button
        data-adjust=${`${t}-up`}
        aria-label=${`Increase ${_t[t][0]}`}
        ?disabled=${!i||void 0===Rt(e,1)}
        @click=${()=>this.adjust(t,1)}
      >
        +
      </button>
    </div>`}notices(){const t=this.entity("alarm"),e=Pt(t)?Ht(t.state):void 0,i=this.config?kt(this.config,this.hass):void 0,o=String(i?.attributes.error||i?.attributes.interlock||"").replaceAll("_"," "),r=(this.config?.controller_entity?[]:this.config?.watch_automations??[]).filter(t=>"on"!==this.hass?.states[t]?.state);return L`${this.config?.controller_entity&&"active"!==i?.state?L`<div class="notice" role="status">
          <strong
            >${i?"monitor"===i.state?"Monitor only":"Controller blocked":"Controller unavailable"}</strong
          >${i?"monitor"===i.state?"The integration is observing without controlling the pump. Complete the ownership review before enabling it.":o||"Check the integration diagnostics before enabling control.":"Integration controls are unavailable; legacy helpers are not used as a fallback."}
        </div>`:G}
    ${Ot(this.hass)?G:L`<div class="notice error" role="alert">
          <strong>Home Assistant disconnected</strong>Readings may be out of
          date. Controls are paused.
        </div>`}
    ${this.roleId("alarm")&&void 0===e?L`<div class="notice" role="status">
          <strong>Alarm status unavailable</strong>Check the pump display.
          Missing telemetry is not an all-clear.
        </div>`:G}
    ${void 0!==e&&0!==e?L`<div class="notice error" role="alert">
          <strong
            >${181===e?"Periodic hot-water boost failed":`NIBE alarm ${e}`}</strong
          >${181===e?"Alarm 181. A successful hygiene cycle has not been confirmed. Check the pump and the cause of the failure.":"Check the pump display and investigate the cause. This card will not reset the alarm."}
        </div>`:G}
    ${"off"===this.entity("periodic_enabled")?.state?L`<div class="notice" role="status">
          <strong>Periodic hot-water boost is disabled</strong>Review the
          hygiene schedule on the pump.
        </div>`:G}
    ${!this.config?.controller_entity&&this.roleId("autopilot")&&"on"!==this.entity("autopilot")?.state?L`<div class="notice" role="status">
          <strong>Autopilot is not active</strong>Check the controller in Home
          Assistant settings.
        </div>`:G}
    ${r.length?L`<div class="notice" role="status">
          <strong>Controller needs attention</strong>${r.map(t=>String(this.hass?.states[t]?.attributes.friendly_name??t)).join(", ")}:
          off or unavailable. Autopilot master alone does not prove the
          controllers are running.
        </div>`:G}`}metric(t,e,i,o,r=1){const s=this.entity(t),a=Pt(s)?Ht(s.state):void 0,n=String(s?.attributes.unit_of_measurement??"");return L`<button
      class="surface metric family-surface family-metric"
      data-page=${o}
      aria-label=${`${e}: ${this.value(t,r)}. Open details`}
      @click=${()=>this.show(o)}
    >
      <span class="metric-top family-metric-top"
        ><ha-icon aria-hidden="true" icon=${i}></ha-icon
        ><ha-icon
          aria-hidden="true"
          class="arrow family-metric-trailing"
          icon="mdi:chevron-right"
        ></ha-icon
        ><span class="metric-label family-metric-label">${e}</span></span
      >
      <strong
        class=${"family-metric-value "+(void 0===a?"missing":"")}
        >${void 0===a?this.value(t,r):a.toFixed(r).replace(/\.0$/,"")}${void 0!==a&&n?L`<small> ${n}</small>`:G}</strong
      >
    </button>`}home(){const t=Tt(this.entity("priority")),e=this.entity("indoor"),i=Pt(e)?Ht(e.state):void 0,o=function(t,e="static",i=!1){return t&&"none"!==e&&i?{style:`--pulse-weak: ${t.weak}; --pulse-strong: ${t.strong}; ${"pulse"===e?"animation: glowPulse 2.4s ease-in-out infinite;":""} box-shadow: 0 18px 40px var(--pulse-strong, ${t.strong}), 0 6px 18px var(--pulse-weak, ${t.weak});`,overlay:L`<div class="glow-overlay" aria-hidden="true"></div>`}:{style:"",overlay:G}}({weak:"color-mix(in srgb,var(--status-heat-color) 7%,transparent)",strong:"color-mix(in srgb,var(--status-heat-color) 10%,transparent)"},"static","heat"===t.tone);return L`<div class="tile-wrap">
        <div class="glow-under" style=${o.style}>${o.overlay}</div>
        <section class="surface family-surface comfort">
          <div class="comfort-top">
            <span class="eyebrow">Inside</span>${this.config?.read_only?L`<span class="chip">Read only</span>`:G}
          </div>
          <div class="reading">
            <strong class=${void 0===i?"missing":""}
              >${void 0===i?"Unavailable":i.toFixed(1)}</strong
            >${void 0!==i?L`<span
                  >${String(e?.attributes.unit_of_measurement??"")}</span
                >`:G}
          </div>
          ${this.roleId("target")?L`<div class="comfort-footer">
                <div class="setting-copy">
                  <strong>Comfort target</strong
                  ><small>Autopilot reference</small>
                </div>
                ${this.stepper("target")}
              </div>`:G}
        </section>
      </div>
      <div class="metrics family-metrics">
        ${this.metric("hot_water","Hot water","mdi:water-thermometer","water")}
        ${this.metric("circuit_power","Electrical input","mdi:flash-outline","details",2)}
      </div> `}roomCard(t){const e=this.hass?.states[t.entity],i=Pt(e),o=i&&"heating"===e.attributes.hvac_action,r=i?Ht(e.attributes.current_temperature):void 0,s=i?Ht(e.attributes.temperature):void 0,a=t.name??String(e?.attributes.friendly_name??t.entity),n=this.canWrite(t.entity)&&"off"!==e?.state;return L`<section
      class="surface family-surface room ${o?"heating":""}"
      data-room=${t.entity}
    >
      <div class="room-top">
        <span class="room-title">${a}</span
        ><span class="room-temp"
          >${void 0===r?"--":`${r.toFixed(1)}°`}</span
        >
      </div>
      <div class="comfort-footer">
        <span class="room-state"
          ><span class="dot"></span>${i?o?"Heat requested":"off"===e.state?"Off":"idle"===e.attributes.hvac_action?"Satisfied":String(e.attributes.hvac_action??"State unknown"):"Unavailable"}</span
        >
        <div class="stepper">
          <button
            data-room-adjust="down"
            aria-label=${`Decrease ${a} target`}
            ?disabled=${!n||void 0===Rt(e,-1,!0)}
            @click=${()=>this.adjustRoom(t,-1)}
          >
            &minus;</button
          ><output aria-label=${`${a} target`}
            >${void 0===s?"--":s}</output
          ><button
            data-room-adjust="up"
            aria-label=${`Increase ${a} target`}
            ?disabled=${!n||void 0===Rt(e,1,!0)}
            @click=${()=>this.adjustRoom(t,1)}
          >
            +
          </button>
        </div>
      </div>
    </section>`}roomsPage(){return L`<div class="section-title"><h2>Room comfort</h2></div>
      <p class="hint">
        Each room keeps its own target. A heat request indicates relay demand,
        not confirmed valve position or water flow.
      </p>
      <div class="rooms">${this.rooms.map(t=>this.roomCard(t))}</div>
      ${this.rooms.length?G:L`<p class="hint">
            Choose your room thermostats in the card editor to show them here.
            An explicitly selected controller supplies its configured rooms;
            nothing is controlled without a user action.
          </p>`}`}row(t){if(!this.roleId(t))return G;const e=this.roleId(t),i=/^(sensor|binary_sensor)\./.test(e)&&!!this.entity(t),o=L`<span>${_t[t][0]}</span
      ><b>${this.value(t)}</b>`;return i?L`<button
          class="data-row"
          @click=${()=>this.moreInfo(e)}
          aria-label=${`${_t[t][0]}: ${this.value(t)}. Open history`}
        >
          ${o}
        </button>`:L`<div class="data-row">${o}</div>`}group(t,e){return e.some(t=>this.roleId(t))?L`<section class="surface family-surface group">
      <h3>${t}</h3>
      <div class="rows">${e.map(t=>this.row(t))}</div>
    </section>`:G}waterPage(){return L`<div class="section-title">
        <h2>Hot water</h2>
        <button class="text-button" @click=${()=>this.show("history")}>
          View history
        </button>
      </div>
      ${this.group("Cylinder",["hot_water","tank_top"])}
      ${this.group("Periodic boost",["periodic_enabled","periodic_interval","periodic_stop"])}
      <p class="hint">
        These are readings and settings, not proof of a completed hygiene cycle.
        A hot tank top or no active alarm does not confirm success. Verify
        completion on the pump.
      </p>
      ${this.group("Available assistance",["heater_permission","heater_power","allowance"])}
      <p class="hint">
        Heater permission is a limit, not a request to consume that power. NIBE
        controls the hot-water cycle. This card does not change its schedule,
        temperatures or high-power mode.
      </p>`}detailsPage(){return L`<div class="section-title">
        <h2>Behind the scenes</h2>
        <span class="chip">Read only</span>
      </div>
      ${this.group("Electrical input",["circuit_power","compressor_power","heater_power","heater_permission","allowance","mains_fresh"])}
      <p class="hint">
        Whole-circuit input includes auxiliaries. Compressor input is only part
        of that total. Produced heat and COP are not inferred from electrical
        input; this setup has no verified thermal measurement.
      </p>
      ${this.group("Heat pump",["mode","frequency","frequency_limit","ready_zones"])}
      <details>
        <summary>Heating circuit &amp; source</summary>
        ${this.group("Heating",["supply","return","supply_target","supply_ceiling","offset","degree_minutes","pump_speed"])}${this.group("Ground source",["brine_in","brine_out","brine_speed"])}
        <p class="hint">
          The supply setting is a target ceiling, not a physical temperature
          cutoff. A frequency cap is permission, not actual speed.
        </p>
      </details>
      <details>
        <summary>Protection &amp; controller status</summary>
        ${this.group("Protection",["alarm","hot_gas","condenser","warm_guard","global_hold","condenser_hold"])}
        <p class="hint">
          Hold timestamps are shown as reported by Home Assistant. Condenser
          space-heating holds and global fault holds have different scope;
          neither is hardware protection.
        </p>
        ${(this.config?.watch_automations??[]).map(t=>L`<div class="data-row">
              <span
                >${String(this.hass?.states[t]?.attributes.friendly_name??t)}</span
              ><b>${this.hass?.states[t]?.state??"Unavailable"}</b>
            </div>`)}
      </details>`}settingsPage(){return L`<div class="section-title"><h2>Comfort settings</h2></div>
      <section class="surface family-surface group settings">
        ${this.roleId("heater_cap")?L`<div class="setting-row">
              <div class="setting-copy">
                <strong>Heater allowance</strong
                ><small
                  >User cap, in
                  ${String(this.entity("heater_cap")?.attributes.unit_of_measurement??"kW")}.
                  Electrical limits still apply.</small
                >
              </div>
              ${this.stepper("heater_cap")}
            </div>`:G}
        ${this.roleId("bias")?L`<div class="setting-row">
              <div class="setting-copy">
                <strong>Heating trim</strong
                ><small>Manual bias for the room-aware controller.</small>
              </div>
              ${this.stepper("bias")}
            </div>`:G}
      </section>
      <p class="hint">
        The house target is an autopilot reference, not a command to set every
        room to the same temperature. Room targets are separate.
      </p>
      <p class="hint">
        Compressor caps, curve offset and heater permission stay under
        controller ownership. Operating mode and periodic boost remain on the
        pump. Advanced controller tuning is available under Settings > Devices &
        services > NIBE Autopilot > Configure.
      </p>
      <p class="hint">
        Unavailable controls require an available comfort entity with numeric
        minimum, maximum and step. In read-only mode all card commands are
        disabled.
      </p>`}async loadHistory(){if(!this.config||!this.hass||!this.isConnected)return;this.historyLoading=!0;const t=this.generation;try{if(!window.loadCardHelpers)throw new Error("Home Assistant history cards are not available in this preview. Open this card in a dashboard to view recorded history.");const e=await window.loadCardHelpers();if(t!==this.generation||!this.isConnected)return;const i=[["Temperatures",["indoor","hot_water","tank_top"]],["Electrical input",["circuit_power","compressor_power","heater_power"]],["Compressor",["frequency"]]];this.histories=i.flatMap(([t,i])=>{const o=i.map(t=>({entity:this.roleId(t),name:_t[t][0]})).filter(t=>t.entity&&this.hass?.states[t.entity]);if(!o.length)return[];const r=e.createCardElement({type:"history-graph",title:t,hours_to_show:this.config.history_hours??24,entities:o});return r.hass=this.hass,[r]}),this.histories.length||(this.historyError="No configured history entities are available.")}catch(e){t===this.generation&&(this.historyError=e instanceof Error?e.message:"History could not be loaded.")}finally{t===this.generation&&(this.historyLoading=!1,this.requestUpdate())}}historyPage(){return L`<div class="section-title">
        <h2>Recent history</h2>
        <span class="chip">${this.config?.history_hours??24} hours</span>
      </div>
      <p class="hint">
        Recorded by Home Assistant. Gaps mean missing data, not zero. Tap a
        sensor in Details for its full history.
      </p>
      <div class="history">${this.histories}</div>
      ${this.historyError?L`<p class="hint">${this.historyError}</p>
            <button
              class="text-button"
              @click=${()=>{this.historyError=""}}
            >
              Try again
            </button>`:this.histories.length?G:L`<p class="hint">Loading history...</p>`}`}render(){if(!this.config)return G;const t=Tt(this.entity("priority")),e=[["home","Overview","mdi:home-outline"],["rooms","Rooms","mdi:floor-plan"],["history","History",yt],["details","Details",bt]];return L`<ha-card
      ><div class="outer">
        <div class="root">
          <header class="top family-header">
            <span class="brand family-brand"
              ><ha-icon
                aria-hidden="true"
                icon="mdi:heat-pump-outline"
              ></ha-icon
            ></span>
            <div class="identity family-identity">
              <h1 class="family-title">${this.config.title??"Heat pump"}</h1>
              <div class="subtitle family-subtitle">
                ${this.config.subtitle??"NIBE / room-aware comfort"}
              </div>
            </div>
            <button
              class="icon-button family-icon-button"
              data-page="settings"
              aria-label="Comfort settings"
              aria-pressed=${"settings"===this.page}
              @click=${()=>this.show("settings"===this.page?"home":"settings")}
            >
              <ha-icon aria-hidden="true" icon=${gt}></ha-icon>
            </button>
          </header>
          <div class="status-line ${t.tone}">
            <span class="dot"></span><span>${t.label}</span>${this.roleId("outdoor")?L`<span class="outside"
                  >Outside ${this.value("outdoor")}</span
                >`:G}
          </div>
          ${this.notices()}
          <main class="panel" aria-label=${`${this.page} panel`}>
            ${"home"===this.page?this.home():"rooms"===this.page?this.roomsPage():"water"===this.page?this.waterPage():"settings"===this.page?this.settingsPage():"details"===this.page?this.detailsPage():this.historyPage()}
          </main>
          ${this.feedback?L`<p
                class="feedback ${this.failed?"error":""}"
                role=${this.failed?"alert":"status"}
              >
                ${this.feedback}
              </p>`:G}
          <nav class="family-navigation" aria-label="Heat pump sections">
            ${e.map(([t,e,i])=>L`<button
                  data-nav=${t}
                  aria-current=${this.page===t||"home"===t&&"water"===this.page?"page":"false"}
                  @click=${()=>this.show(t)}
                >
                  <ha-icon aria-hidden="true" icon=${i}></ha-icon>${e}
                </button>`)}
          </nav>
        </div>
      </div></ha-card
    >`}};Nt.styles=[ft,vt],t([ut({attribute:!1})],Nt.prototype,"hass",void 0),t([mt()],Nt.prototype,"config",void 0),t([mt()],Nt.prototype,"page",void 0),t([mt()],Nt.prototype,"feedback",void 0),t([mt()],Nt.prototype,"failed",void 0),t([mt()],Nt.prototype,"pending",void 0),t([mt()],Nt.prototype,"histories",void 0),t([mt()],Nt.prototype,"historyError",void 0),Nt=t([pt("nibe-dashboard")],Nt),window.customCards=window.customCards??[],window.customCards.some(t=>"nibe-dashboard"===t.type)||window.customCards.push({type:"nibe-dashboard",name:"NIBE Dashboard",description:"Heat-pump comfort, hot water and clear diagnostics. Space Hub design, automation-owned controls.",preview:!0});let Ut=class extends lt{setConfig(t){this.config={...t,entities:{...t.entities},rooms:t.rooms?.map(t=>({...t})),watch_automations:[...t.watch_automations??[]]}}updated(){const t=this.renderRoot.querySelector("select[data-controller]");t&&(t.value=this.config?.controller_entity??"");const e=this.renderRoot.querySelector('select[aria-label="Control access"]');e&&(e.value=String(!!this.config?.read_only));for(const t of this.renderRoot.querySelectorAll("select[data-role]"))t.value=St(this.config,t.dataset.role,this.hass)??"";for(const t of this.renderRoot.querySelectorAll("select[data-room-index]"))t.value=zt(this.config,this.hass)[Number(t.dataset.roomIndex)].entity}change(t){this.config&&(this.config={...this.config,...t},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})))}options(t,e,i){const o=!!this.config?.controller_entity&&!!i&&xt.has(i),r=o?St({...this.config,entities:{}},i,this.hass):void 0,s=Object.keys(this.hass?.states??{}).filter(e=>e.startsWith(`${t}.`)&&(!o||e===r));return e&&!s.includes(e)&&s.push(e),s.sort().map(t=>{const i=this.hass?.states[t],o=i?.attributes.friendly_name?`${i.attributes.friendly_name} (${t})`:`${t}${i?"":" (unavailable)"}`;return L`<option value=${t} ?selected=${e===t}>${o}</option>`})}field(t){if(!this.config)return G;const e=St(this.config,t,this.hass);return L`<label>${_t[t][0]}<select data-role=${t} aria-label=${_t[t][0]} @change=${e=>this.change({entities:{...this.config.entities,[t]:e.target.value||null}})}><option value="" ?selected=${!e}>Not configured</option>${Et(t,!!this.config.controller_entity).map(i=>this.options(i,e,t))}</select></label>`}render(){if(!this.config)return G;const t=zt(this.config,this.hass),e=this.config.watch_automations??[],i=[...new Set([...Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("automation.")),...e])].sort();return L`<p>One card for daily comfort and on-demand diagnostics. Default entity IDs match the NibeGW F-series integration and the optional NIBE autopilot helpers. Map renamed entities below; no setup action changes the heat pump.</p>
      <label>NIBE Autopilot integration<select data-controller aria-label="NIBE Autopilot integration" @change=${t=>this.change({controller_entity:t.target.value||void 0,entities:{},rooms:void 0,watch_automations:[]})}><option value="">Legacy YAML helpers</option>${[...new Set([...Object.keys(this.hass?.states??{}).filter(t=>t.startsWith("sensor.")&&!0===this.hass?.states[t]?.attributes.nibe_autopilot),...this.config.controller_entity?[this.config.controller_entity]:[]])].map(t=>L`<option value=${t}>${String(this.hass?.states[t]?.attributes.friendly_name??t)}</option>`)}</select></label><p>Selecting a controller resets this card's mappings and uses its configured comfort entities and rooms. It does not enable the controller or change the pump.</p>
      <div class="row"><label>Title<input .value=${this.config.title??""} placeholder="Heat pump" @change=${t=>this.change({title:t.target.value||void 0})}></label><label>Subtitle<input .value=${this.config.subtitle??""} placeholder="NIBE / room-aware comfort" @change=${t=>this.change({subtitle:t.target.value||void 0})}></label></div>
      <label>Control access<select aria-label="Control access" @change=${t=>this.change({read_only:"true"===t.target.value})}><option value="false" ?selected=${!this.config.read_only}>Allow comfort and room-target controls</option><option value="true" ?selected=${!!this.config.read_only}>Read only</option></select></label>
      <details open><summary>Daily controls &amp; readings</summary>${["indoor","outdoor","target","autopilot","heater_cap","bias","circuit_power","hot_water","priority","alarm"].map(t=>this.field(t))}<p>Controls accept legacy helpers or verified comfort entities from the selected NIBE Autopilot integration. Controller-owned pump registers are always read-only.</p></details>
      <details><summary>Room thermostats (${t.length})</summary><p>Explicitly select your underfloor thermostats. Each uses its own target. Adjustments require the entity to expose min_temp, max_temp, target_temp_step and the target-temperature feature.</p>
        ${t.map((e,i)=>L`<div class="room"><header><strong>Room ${i+1}</strong><button aria-label=${`Remove room ${i+1}`} @click=${()=>this.change({rooms:t.filter((t,e)=>e!==i)})}>Remove</button></header><label>Thermostat<select data-room-index=${i} aria-label=${`Room ${i+1} thermostat`} @change=${e=>{const o=e.target.value;t.some((t,e)=>e!==i&&t.entity===o)?this.requestUpdate():this.change({rooms:t.map((t,e)=>e===i?{...t,entity:o}:t)})}}>${this.options("climate",e.entity)}</select></label><label>Display name<input aria-label=${`Room ${i+1} name`} .value=${e.name??""} placeholder="Use entity name" @change=${e=>this.change({rooms:t.map((t,o)=>o===i?{...t,name:e.target.value||void 0}:t)})}></label></div>`)}
        <label>Add a room<select aria-label="Add a room" .value=${""} @change=${e=>{const i=e.target;i.value&&!t.some(t=>t.entity===i.value)&&this.change({rooms:[...t,{entity:i.value}]}),i.value=""}}><option value="">Choose thermostat</option>${Object.keys(this.hass?.states??{}).filter(e=>e.startsWith("climate.")&&!t.some(t=>t.entity===e)).sort().map(t=>L`<option value=${t}>${String(this.hass.states[t].attributes.friendly_name??t)}</option>`)}</select></label>
      </details>
      <details><summary>Hot water &amp; pump diagnostics</summary>${Object.keys(_t).filter(t=>!["indoor","outdoor","target","autopilot","heater_cap","bias","circuit_power","hot_water","priority","alarm"].includes(t)).map(t=>this.field(t))}</details>
      <details><summary>Controller health &amp; history</summary><p>Watch the controller automations to warn if any are off or unavailable. This does not enable, disable or create automations.</p>${i.map(t=>L`<label class="watch"><input type="checkbox" aria-label=${`Watch ${t}`} .checked=${e.includes(t)} @change=${i=>this.change({watch_automations:i.target.checked?[...e,t]:e.filter(e=>e!==t)})}>${String(this.hass?.states[t]?.attributes.friendly_name??t)}</label>`)}<label>History hours (1-168)<input type="number" min="1" max="168" step="1" .value=${String(this.config.history_hours??24)} @change=${t=>{const e=Number(t.target.value);Number.isInteger(e)&&e>=1&&e<=168&&this.change({history_hours:e})}}></label></details>`}};Ut.styles=n`
    :host{display:block;color:var(--primary-text-color);font-family:inherit}*{box-sizing:border-box}label{display:grid;gap:6px;font-size:13px;margin:12px 0}input,select,button{font:inherit;color:inherit;min-height:44px;border:1px solid var(--divider-color,#888);border-radius:10px;padding:10px;background:var(--card-background-color,#fff);max-width:100%;width:100%}input,select{font-size:16px}input:focus-visible,select:focus-visible,button:focus-visible,summary:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.room{border:1px solid var(--divider-color,#aaa);border-radius:12px;padding:12px;margin:12px 0}.room header{display:flex;justify-content:space-between;align-items:center;gap:8px}.room header button{font-size:12px;width:auto}h3{font-size:15px;margin:20px 0 8px}p{color:var(--secondary-text-color);font-size:12px;line-height:1.6}summary{cursor:pointer;min-height:44px;padding:14px 0;font-weight:600;font-size:14px}.watch{display:flex;align-items:center;gap:10px}.watch input{min-height:24px;width:24px}@media(max-width:420px){.row{grid-template-columns:1fr}}
  `,t([ut({attribute:!1})],Ut.prototype,"hass",void 0),t([mt()],Ut.prototype,"config",void 0),Ut=t([pt("nibe-dashboard-editor")],Ut);var It=Object.freeze({__proto__:null,get NibeDashboardEditor(){return Ut}});export{Nt as NibeDashboard};
