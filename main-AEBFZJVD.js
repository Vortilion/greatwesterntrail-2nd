var bI=Object.defineProperty,wI=Object.defineProperties;var CI=Object.getOwnPropertyDescriptors;var Fl=Object.getOwnPropertySymbols;var xy=Object.prototype.hasOwnProperty,Iy=Object.prototype.propertyIsEnumerable;var Ey=(t,n,e)=>n in t?bI(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,g=(t,n)=>{for(var e in n||={})xy.call(n,e)&&Ey(t,e,n[e]);if(Fl)for(var e of Fl(n))Iy.call(n,e)&&Ey(t,e,n[e]);return t},q=(t,n)=>wI(t,CI(n));var Yf=(t,n)=>{var e={};for(var i in t)xy.call(t,i)&&n.indexOf(i)<0&&(e[i]=t[i]);if(t!=null&&Fl)for(var i of Fl(t))n.indexOf(i)<0&&Iy.call(t,i)&&(e[i]=t[i]);return e};var Ct=null,Pl=!1,Zf=1,DI=null,Je=Symbol("SIGNAL");function Z(t){let n=Ct;return Ct=t,n}function Bl(){return Ct}var Ji={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function er(t){if(Pl)throw new Error("");if(Ct===null)return;Ct.consumerOnSignalRead(t);let n=Ct.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=Ct.recomputing;if(i&&(e=n!==void 0?n.nextProducer:Ct.producers,e!==void 0&&e.producer===t)){Ct.producersTail=e,e.lastReadVersion=t.version;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===Ct&&(!i||xI(r,Ct)))return;let o=io(Ct),s={producer:t,consumer:Ct,nextProducer:e,prevConsumer:r,lastReadVersion:t.version,nextConsumer:void 0};Ct.producersTail=s,n!==void 0?n.nextProducer=s:Ct.producers=s,o&&Ay(t,s)}function Sy(){Zf++}function Hl(t){if(!(io(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===Zf)){if(!t.producerMustRecompute(t)&&!no(t)){Vl(t);return}t.producerRecomputeValue(t),Vl(t)}}function Kf(t){if(t.consumers===void 0)return;let n=Pl;Pl=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||EI(i)}}finally{Pl=n}}function Qf(){return Ct?.consumerAllowSignalWrites!==!1}function EI(t){t.dirty=!0,Kf(t),t.consumerMarkedDirty?.(t)}function Vl(t){t.dirty=!1,t.lastCleanEpoch=Zf}function gi(t){return t&&My(t),Z(t)}function My(t){t.producersTail=void 0,t.recomputing=!0}function tr(t,n){Z(n),t&&Ty(t)}function Ty(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(io(t))do e=Xf(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function no(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Hl(e),i!==e.version))return!0}return!1}function vi(t){if(io(t)){let n=t.producers;for(;n!==void 0;)n=Xf(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function Ay(t,n){let e=t.consumersTail,i=io(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)Ay(r.producer,r)}function Xf(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!io(n)){let o=n.producers;for(;o!==void 0;)o=Xf(o)}return e}function io(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function Ul(t){DI?.(t)}function xI(t,n){let e=n.producersTail;if(e!==void 0){let i=n.producers;do{if(i===t)return!0;if(i===e)break;i=i.nextProducer}while(i!==void 0)}return!1}function zl(t,n){return Object.is(t,n)}function Ms(t,n){let e=Object.create(II);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(Hl(e),er(e),e.value===Ss)throw e.error;return e.value};return i[Je]=e,Ul(e),i}var Ll=Symbol("UNSET"),jl=Symbol("COMPUTING"),Ss=Symbol("ERRORED"),II=q(g({},Ji),{value:Ll,dirty:!0,error:null,equal:zl,kind:"computed",producerMustRecompute(t){return t.value===Ll||t.value===jl},producerRecomputeValue(t){if(t.value===jl)throw new Error("");let n=t.value;t.value=jl;let e=gi(t),i,r=!1;try{i=t.computation(),Z(null),r=n!==Ll&&n!==Ss&&i!==Ss&&t.equal(n,i)}catch(o){i=Ss,t.error=o}finally{tr(t,e)}if(r){t.value=n;return}t.value=i,t.version++}});function SI(){throw new Error}var Ry=SI;function ky(t){Ry(t)}function Jf(t){Ry=t}var MI=null;function eh(t,n){let e=Object.create(Ts);e.value=t,n!==void 0&&(e.equal=n);let i=()=>Ny(e);return i[Je]=e,Ul(e),[i,s=>ro(e,s),s=>th(e,s)]}function Ny(t){return er(t),t.value}function ro(t,n){Qf()||ky(t),t.equal(t.value,n)||(t.value=n,TI(t))}function th(t,n){Qf()||ky(t),ro(t,n(t.value))}var Ts=q(g({},Ji),{equal:zl,value:void 0,kind:"signal"});function TI(t){t.version++,Sy(),Kf(t),MI?.(t)}var nh=q(g({},Ji),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function ih(t){if(t.dirty=!1,t.version>0&&!no(t))return;t.version++;let n=gi(t);try{t.cleanup(),t.fn()}finally{tr(t,n)}}function Q(t){return typeof t=="function"}function oo(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var $l=oo(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function nr(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var he=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(Q(i))try{i()}catch(o){n=o instanceof $l?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{Oy(o)}catch(s){n=n??[],s instanceof $l?n=[...n,...s.errors]:n.push(s)}}if(n)throw new $l(n)}}add(n){var e;if(n&&n!==this)if(this.closed)Oy(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&nr(e,n)}remove(n){let{_finalizers:e}=this;e&&nr(e,n),n instanceof t&&n._removeParent(this)}};he.EMPTY=(()=>{let t=new he;return t.closed=!0,t})();var rh=he.EMPTY;function Wl(t){return t instanceof he||t&&"closed"in t&&Q(t.remove)&&Q(t.add)&&Q(t.unsubscribe)}function Oy(t){Q(t)?t():t.unsubscribe()}var dn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var so={setTimeout(t,n,...e){let{delegate:i}=so;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=so;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Gl(t){so.setTimeout(()=>{let{onUnhandledError:n}=dn;if(n)n(t);else throw t})}function ir(){}var Fy=oh("C",void 0,void 0);function Py(t){return oh("E",void 0,t)}function Ly(t){return oh("N",t,void 0)}function oh(t,n,e){return{kind:t,value:n,error:e}}var rr=null;function ao(t){if(dn.useDeprecatedSynchronousErrorHandling){let n=!rr;if(n&&(rr={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=rr;if(rr=null,e)throw i}}else t()}function jy(t){dn.useDeprecatedSynchronousErrorHandling&&rr&&(rr.errorThrown=!0,rr.error=t)}var or=class extends he{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,Wl(n)&&n.add(this)):this.destination=kI}static create(n,e,i){return new Un(n,e,i)}next(n){this.isStopped?ah(Ly(n),this):this._next(n)}error(n){this.isStopped?ah(Py(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?ah(Fy,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},AI=Function.prototype.bind;function sh(t,n){return AI.call(t,n)}var lh=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){ql(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){ql(i)}else ql(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){ql(e)}}},Un=class extends or{constructor(n,e,i){super();let r;if(Q(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else{let o;this&&dn.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&sh(n.next,o),error:n.error&&sh(n.error,o),complete:n.complete&&sh(n.complete,o)}):r=n}this.destination=new lh(r)}};function ql(t){dn.useDeprecatedSynchronousErrorHandling?jy(t):Gl(t)}function RI(t){throw t}function ah(t,n){let{onStoppedNotification:e}=dn;e&&so.setTimeout(()=>e(t,n))}var kI={closed:!0,next:ir,error:RI,complete:ir};var lo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function St(t){return t}function ch(...t){return dh(t)}function dh(t){return t.length===0?St:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var W=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=OI(e)?e:new Un(e,i,r);return ao(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i)}}forEach(e,i){return i=Vy(i),new i((r,o)=>{let s=new Un({next:a=>{try{e(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:r});this.subscribe(s)})}_subscribe(e){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[lo](){return this}pipe(...e){return dh(e)(this)}toPromise(e){return e=Vy(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o))})}}return t.create=n=>new t(n),t})();function Vy(t){var n;return(n=t??dn.Promise)!==null&&n!==void 0?n:Promise}function NI(t){return t&&Q(t.next)&&Q(t.error)&&Q(t.complete)}function OI(t){return t&&t instanceof or||NI(t)&&Wl(t)}function FI(t){return Q(t?.lift)}function ie(t){return n=>{if(FI(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function ne(t,n,e,i,r){return new uh(t,n,e,i,r)}var uh=class extends or{constructor(n,e,i,r,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(l){n.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var By=oo(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var D=(()=>{class t extends W{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let i=new Yl(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new By}next(e){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e)}})}error(e){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e)}})}complete(){ao(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?rh:(this.currentObservers=null,o.push(e),new he(()=>{this.currentObservers=null,nr(o,e)}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete()}asObservable(){let e=new W;return e.source=this,e}}return t.create=(n,e)=>new Yl(n,e),t})(),Yl=class extends D{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:rh}};var We=class extends D{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var As={now(){return(As.delegate||Date).now()},delegate:void 0};var Wt=class extends D{constructor(n=1/0,e=1/0,i=As){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(n),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!n.closed;s+=i?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1)}}};var Zl=class extends he{constructor(n,e){super()}schedule(n,e=0){return this}};var Rs={setInterval(t,n,...e){let{delegate:i}=Rs;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=Rs;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var Kl=class extends Zl{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return Rs.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&Rs.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,nr(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var co=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};co.now=As.now;var Ql=class extends co{constructor(n,e=co.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var yi=new Ql(Kl),fh=yi;var Ge=new W(t=>t.complete());function Xl(t){return t&&Q(t.schedule)}function hh(t){return t[t.length-1]}function Jl(t){return Q(hh(t))?t.pop():void 0}function An(t){return Xl(hh(t))?t.pop():void 0}function Hy(t,n){return typeof hh(t)=="number"?t.pop():n}function zy(t,n,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(u){try{c(i.next(u))}catch(f){s(f)}}function l(u){try{c(i.throw(u))}catch(f){s(f)}}function c(u){u.done?o(u.value):r(u.value).then(a,l)}c((i=i.apply(t,n||[])).next())})}function Uy(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function sr(t){return this instanceof sr?(this.v=t,this):new sr(t)}function $y(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(p){return function(w){return Promise.resolve(w).then(p,f)}}function a(p,w){i[p]&&(r[p]=function(I){return new Promise(function(A,j){o.push([p,I,A,j])>1||l(p,I)})},w&&(r[p]=w(r[p])))}function l(p,w){try{c(i[p](w))}catch(I){h(o[0][3],I)}}function c(p){p.value instanceof sr?Promise.resolve(p.value.v).then(u,f):h(o[0][2],p)}function u(p){l("next",p)}function f(p){l("throw",p)}function h(p,w){p(w),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Wy(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof Uy=="function"?Uy(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value)})}}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var uo=t=>t&&typeof t.length=="number"&&typeof t!="function";function ec(t){return Q(t?.then)}function tc(t){return Q(t[lo])}function nc(t){return Symbol.asyncIterator&&Q(t?.[Symbol.asyncIterator])}function ic(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function PI(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var rc=PI();function oc(t){return Q(t?.[rc])}function sc(t){return $y(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield sr(e.read());if(r)return yield sr(void 0);yield yield sr(i)}}finally{e.releaseLock()}})}function ac(t){return Q(t?.getReader)}function ye(t){if(t instanceof W)return t;if(t!=null){if(tc(t))return LI(t);if(uo(t))return jI(t);if(ec(t))return VI(t);if(nc(t))return Gy(t);if(oc(t))return BI(t);if(ac(t))return HI(t)}throw ic(t)}function LI(t){return new W(n=>{let e=t[lo]();if(Q(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function jI(t){return new W(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function VI(t){return new W(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,Gl)})}function BI(t){return new W(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function Gy(t){return new W(n=>{UI(t,n).catch(e=>n.error(e))})}function HI(t){return Gy(sc(t))}function UI(t,n){var e,i,r,o;return zy(this,void 0,void 0,function*(){try{for(e=Wy(t);i=yield e.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){r={error:s}}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e))}finally{if(r)throw r.error}}n.complete()})}function Ft(t,n,e,i=0,r=!1){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(o),!r)return o}function ar(t,n=0){return ie((e,i)=>{e.subscribe(ne(i,r=>Ft(i,t,()=>i.next(r),n),()=>Ft(i,t,()=>i.complete(),n),r=>Ft(i,t,()=>i.error(r),n)))})}function lc(t,n=0){return ie((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function qy(t,n){return ye(t).pipe(lc(n),ar(n))}function Yy(t,n){return ye(t).pipe(lc(n),ar(n))}function Zy(t,n){return new W(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Ky(t,n){return new W(e=>{let i;return Ft(e,n,()=>{i=t[rc](),Ft(e,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(s){e.error(s);return}o?e.complete():e.next(r)},0,!0)}),()=>Q(i?.return)&&i.return()})}function cc(t,n){if(!t)throw new Error("Iterable cannot be null");return new W(e=>{Ft(e,n,()=>{let i=t[Symbol.asyncIterator]();Ft(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value)})},0,!0)})})}function Qy(t,n){return cc(sc(t),n)}function Xy(t,n){if(t!=null){if(tc(t))return qy(t,n);if(uo(t))return Zy(t,n);if(ec(t))return Yy(t,n);if(nc(t))return cc(t,n);if(oc(t))return Ky(t,n);if(ac(t))return Qy(t,n)}throw ic(t)}function Ae(t,n){return n?Xy(t,n):ye(t)}function x(...t){let n=An(t);return Ae(t,n)}function Mt(t,n){let e=Q(t)?t:()=>t,i=r=>r.error(e());return new W(n?r=>n.schedule(i,0,r):i)}function ks(t){return!!t&&(t instanceof W||Q(t.lift)&&Q(t.subscribe))}var lr=oo(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function Jy(t){return t instanceof Date&&!isNaN(t)}function T(t,n){return ie((e,i)=>{let r=0;e.subscribe(ne(i,o=>{i.next(t.call(n,o,r++))}))})}var{isArray:zI}=Array;function $I(t,n){return zI(n)?t(...n):t(n)}function fo(t){return T(n=>$I(t,n))}var{isArray:WI}=Array,{getPrototypeOf:GI,prototype:qI,keys:YI}=Object;function dc(t){if(t.length===1){let n=t[0];if(WI(n))return{args:n,keys:null};if(ZI(n)){let e=YI(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function ZI(t){return t&&typeof t=="object"&&GI(t)===qI}function uc(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function cr(...t){let n=An(t),e=Jl(t),{args:i,keys:r}=dc(t);if(i.length===0)return Ae([],n);let o=new W(KI(i,n,r?s=>uc(r,s):St));return e?o.pipe(fo(e)):o}function KI(t,n,e=St){return i=>{e_(n,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)e_(n,()=>{let c=Ae(t[l],n),u=!1;c.subscribe(ne(i,f=>{o[l]=f,u||(u=!0,a--),a||i.next(e(o.slice()))},()=>{--s||i.complete()}))},i)},i)}}function e_(t,n,e){t?Ft(e,t,n):n()}function t_(t,n,e,i,r,o,s,a){let l=[],c=0,u=0,f=!1,h=()=>{f&&!l.length&&!c&&n.complete()},p=I=>c<i?w(I):l.push(I),w=I=>{o&&n.next(I),c++;let A=!1;ye(e(I,u++)).subscribe(ne(n,j=>{r?.(j),o?p(j):n.next(j)},()=>{A=!0},void 0,()=>{if(A)try{for(c--;l.length&&c<i;){let j=l.shift();s?Ft(n,s,()=>w(j)):w(j)}h()}catch(j){n.error(j)}}))};return t.subscribe(ne(n,p,()=>{f=!0,h()})),()=>{a?.()}}function Re(t,n,e=1/0){return Q(n)?Re((i,r)=>T((o,s)=>n(i,o,r,s))(ye(t(i,r))),e):(typeof n=="number"&&(e=n),ie((i,r)=>t_(i,r,t,e)))}function fc(t=1/0){return Re(St,t)}function n_(){return fc(1)}function _i(...t){return n_()(Ae(t,An(t)))}function un(t){return new W(n=>{ye(t()).subscribe(n)})}function zn(...t){let n=Jl(t),{args:e,keys:i}=dc(t),r=new W(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let u=0;u<s;u++){let f=!1;ye(e[u]).subscribe(ne(o,h=>{f||(f=!0,c--),a[u]=h},()=>l--,void 0,()=>{(!l||!f)&&(c||o.next(i?uc(i,a):a),o.complete())}))}});return n?r.pipe(fo(n)):r}var QI=["addListener","removeListener"],XI=["addEventListener","removeEventListener"],JI=["on","off"];function $n(t,n,e,i){if(Q(e)&&(i=e,e=void 0),i)return $n(t,n,e).pipe(fo(i));let[r,o]=nS(t)?XI.map(s=>a=>t[s](n,a,e)):eS(t)?QI.map(i_(t,n)):tS(t)?JI.map(i_(t,n)):[];if(!r&&uo(t))return Re(s=>$n(s,n,e))(ye(t));if(!r)throw new TypeError("Invalid event target");return new W(s=>{let a=(...l)=>s.next(1<l.length?l:l[0]);return r(a),()=>o(a)})}function i_(t,n){return e=>i=>t[e](n,i)}function eS(t){return Q(t.addListener)&&Q(t.removeListener)}function tS(t){return Q(t.on)&&Q(t.off)}function nS(t){return Q(t.addEventListener)&&Q(t.removeEventListener)}function hc(t=0,n,e=fh){let i=-1;return n!=null&&(Xl(n)?e=n:i=n),new W(r=>{let o=Jy(t)?+t-e.now():t;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function Tt(...t){let n=An(t),e=Hy(t,1/0),i=t;return i.length?i.length===1?ye(i[0]):fc(e)(Ae(i,n)):Ge}var Wn=new W(ir);var{isArray:iS}=Array;function r_(t){return t.length===1&&iS(t[0])?t[0]:t}function re(t,n){return ie((e,i)=>{let r=0;e.subscribe(ne(i,o=>t.call(n,o,r++)&&i.next(o)))})}function Ns(...t){return t=r_(t),t.length===1?ye(t[0]):new W(rS(t))}function rS(t){return n=>{let e=[];for(let i=0;e&&!n.closed&&i<t.length;i++)e.push(ye(t[i]).subscribe(ne(n,r=>{if(e){for(let o=0;o<e.length;o++)o!==i&&e[o].unsubscribe();e=null}n.next(r)})))}}function o_(t){return ie((n,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c)}s&&e.complete()},l=()=>{o=null,s&&e.complete()};n.subscribe(ne(e,c=>{i=!0,r=c,o||ye(t(c)).subscribe(o=ne(e,a,l))},()=>{s=!0,(!i||!o||o.closed)&&e.complete()}))})}function pc(t,n=yi){return o_(()=>hc(t,n))}function Gt(t){return ie((n,e)=>{let i=null,r=!1,o;i=n.subscribe(ne(e,void 0,void 0,s=>{o=ye(t(s,Gt(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(e))})}function ho(t,n){return Q(n)?Re(t,n,1):Re(t,1)}function dr(t,n=yi){return ie((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c)}};function l(){let c=s+t,u=n.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}a()}e.subscribe(ne(i,c=>{o=c,s=n.now(),r||(r=n.schedule(l,t),i.add(r))},()=>{a(),i.complete()},void 0,()=>{o=r=null}))})}function s_(t){return ie((n,e)=>{let i=!1;n.subscribe(ne(e,r=>{i=!0,e.next(r)},()=>{i||e.next(t),e.complete()}))})}function _e(t){return t<=0?()=>Ge:ie((n,e)=>{let i=0;n.subscribe(ne(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete())}))})}function mc(t){return T(()=>t)}function gc(t,n=St){return t=t??oS,ie((e,i)=>{let r,o=!0;e.subscribe(ne(i,s=>{let a=n(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s))}))})}function oS(t,n){return t===n}function a_(t=sS){return ie((n,e)=>{let i=!1;n.subscribe(ne(e,r=>{i=!0,e.next(r)},()=>i?e.complete():e.error(t())))})}function sS(){return new lr}function bi(t){return ie((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function et(t,n){let e=arguments.length>=2;return i=>i.pipe(t?re((r,o)=>t(r,o,i)):St,_e(1),e?s_(n):a_(()=>new lr))}function vc(t){return t<=0?()=>Ge:ie((n,e)=>{let i=[];n.subscribe(ne(e,r=>{i.push(r),t<i.length&&i.shift()},()=>{for(let r of i)e.next(r);e.complete()},void 0,()=>{i=null}))})}function yc(){return ie((t,n)=>{let e,i=!1;t.subscribe(ne(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0}))})}function ph(t=1/0){let n;t&&typeof t=="object"?n=t:n={count:t};let{count:e=1/0,delay:i,resetOnSuccess:r=!1}=n;return e<=0?St:ie((o,s)=>{let a=0,l,c=()=>{let u=!1;l=o.subscribe(ne(s,f=>{r&&(a=0),s.next(f)},void 0,f=>{if(a++<e){let h=()=>{l?(l.unsubscribe(),l=null,c()):u=!0};if(i!=null){let p=typeof i=="number"?hc(i):ye(i(f,a)),w=ne(s,()=>{w.unsubscribe(),h()},()=>{s.complete()});p.subscribe(w)}else h()}else s.error(f)})),u&&(l.unsubscribe(),l=null,c())};c()})}function Os(t={}){let{connector:n=()=>new D,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=t;return o=>{let s,a,l,c=0,u=!1,f=!1,h=()=>{a?.unsubscribe(),a=void 0},p=()=>{h(),s=l=void 0,u=f=!1},w=()=>{let I=s;p(),I?.unsubscribe()};return ie((I,A)=>{c++,!f&&!u&&h();let j=l=l??n();A.add(()=>{c--,c===0&&!f&&!u&&(a=mh(w,r))}),j.subscribe(A),!s&&c>0&&(s=new Un({next:Ee=>j.next(Ee),error:Ee=>{f=!0,h(),a=mh(p,e,Ee),j.error(Ee)},complete:()=>{u=!0,h(),a=mh(p,i),j.complete()}}),ye(I).subscribe(s))})(o)}}function mh(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new Un({next:()=>{i.unsubscribe(),t()}});return ye(n(...e)).subscribe(i)}function ur(t,n,e){let i,r=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:e}=t:i=t??1/0,Os({connector:()=>new Wt(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function Fs(t){return re((n,e)=>t<=e)}function Ve(...t){let n=An(t);return ie((e,i)=>{(n?_i(t,e,n):_i(t,e)).subscribe(i)})}function we(t,n){return ie((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(ne(i,l=>{r?.unsubscribe();let c=0,u=o++;ye(t(l,u)).subscribe(r=ne(i,f=>i.next(n?n(l,f,u,c++):f),()=>{r=null,a()}))},()=>{s=!0,a()}))})}function pe(t){return ie((n,e)=>{ye(t).subscribe(ne(e,()=>e.complete(),ir)),!e.closed&&n.subscribe(e)})}function Ps(t,n=!1){return ie((e,i)=>{let r=0;e.subscribe(ne(i,o=>{let s=t(o,r++);(s||n)&&i.next(o),!s&&i.complete()}))})}function Oe(t,n,e){let i=Q(t)||n||e?{next:t,error:n,complete:e}:t;return i?ie((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(ne(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l)},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete()},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l)},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i)}))}):St}var gh;function _c(){return gh}function Rn(t){let n=gh;return gh=t,n}var l_=Symbol("NotFound");function po(t){return t===l_||t?.name==="\u0275NotFound"}function c_(t){let n=Z(null);try{return t()}finally{Z(n)}}var Ic="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(n,e){super(Nn(n,e)),this.code=n}};function aS(t){return`NG0${Math.abs(t)}`}function Nn(t,n){return`${aS(t)}${n?": "+n:""}`}var Ei=globalThis;function Se(t){for(let n in t)if(t[n]===Se)return n;throw Error("")}function p_(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function zs(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(zs).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Sc(t,n){return t?n?`${t} ${n}`:t:n||""}var lS=Se({__forward_ref__:Se});function qt(t){return t.__forward_ref__=qt,t}function tt(t){return Th(t)?t():t}function Th(t){return typeof t=="function"&&t.hasOwnProperty(lS)&&t.__forward_ref__===qt}function b(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function O(t){return{providers:t.providers||[],imports:t.imports||[]}}function $s(t){return cS(t,Mc)}function Ah(t){return $s(t)!==null}function cS(t,n){return t.hasOwnProperty(n)&&t[n]||null}function dS(t){let n=t?.[Mc]??null;return n||null}function yh(t){return t&&t.hasOwnProperty(wc)?t[wc]:null}var Mc=Se({\u0275prov:Se}),wc=Se({\u0275inj:Se}),v=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=b({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Rh(t){return t&&!!t.\u0275providers}var Ws=Se({\u0275cmp:Se}),Gs=Se({\u0275dir:Se}),kh=Se({\u0275pipe:Se}),Nh=Se({\u0275mod:Se}),js=Se({\u0275fac:Se}),gr=Se({__NG_ELEMENT_ID__:Se}),d_=Se({__NG_ENV_ID__:Se});function Oh(t){return Ac(t,"@NgModule"),t[Nh]||null}function qn(t){return Ac(t,"@Component"),t[Ws]||null}function Tc(t){return Ac(t,"@Directive"),t[Gs]||null}function m_(t){return Ac(t,"@Pipe"),t[kh]||null}function Ac(t,n){if(t==null)throw new E(-919,!1)}function vr(t){return typeof t=="string"?t:t==null?"":String(t)}var g_=Se({ngErrorCode:Se}),uS=Se({ngErrorMessage:Se}),fS=Se({ngTokenPath:Se});function Fh(t,n){return v_("",-200,n)}function Rc(t,n){throw new E(-201,!1)}function v_(t,n,e){let i=new E(n,t);return i[g_]=n,i[uS]=t,e&&(i[fS]=e),i}function hS(t){return t[g_]}var _h;function y_(){return _h}function At(t){let n=_h;return _h=t,n}function Ph(t,n,e){let i=$s(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Rc(t,"")}var pS={},fr=pS,mS="__NG_DI_FLAG__",bh=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=hr(e)||0;try{return this.injector.get(n,i&8?null:fr,i)}catch(r){if(po(r))return r;throw r}}};function gS(t,n=0){let e=_c();if(e===void 0)throw new E(-203,!1);if(e===null)return Ph(t,void 0,n);{let i=vS(n),r=e.retrieve(t,i);if(po(r)){if(i.optional)return null;throw r}return r}}function R(t,n=0){return(y_()||gS)(tt(t),n)}function d(t,n){return R(t,hr(n))}function hr(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function vS(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function wh(t){let n=[];for(let e=0;e<t.length;e++){let i=tt(t[e]);if(Array.isArray(i)){if(i.length===0)throw new E(900,!1);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=yS(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a}n.push(R(r,o))}else n.push(R(i))}return n}function yS(t){return t[mS]}function wi(t,n){let e=t.hasOwnProperty(js);return e?t[js]:null}function __(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return!1}return!0}function b_(t){return t.flat(Number.POSITIVE_INFINITY)}function kc(t,n){t.forEach(e=>Array.isArray(e)?kc(e,n):n(e))}function Lh(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function qs(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function w_(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function C_(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else{for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--}t[n]=e,t[n+1]=i}}function Nc(t,n,e){let i=go(t,n);return i>=0?t[i|1]=e:(i=~i,C_(t,i,n,e)),i}function Oc(t,n){let e=go(t,n);if(e>=0)return t[e|1]}function go(t,n){return _S(t,n,1)}function _S(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<e];if(n===s)return o<<e;s>n?r=o:i=o+1}return~(r<<e)}var fn={},Dt=[],yr=new v(""),jh=new v("",-1),Vh=new v(""),Vs=class{get(n,e=fr){if(e===fr){let r=v_("",-201);throw r.name="\u0275NotFound",r}return e}};function dt(t){return{\u0275providers:t}}function Fc(...t){return{\u0275providers:Bh(!0,t),\u0275fromNgModule:!0}}function Bh(t,...n){let e=[],i=new Set,r,o=s=>{e.push(s)};return kc(n,s=>{let a=s;Cc(a,o,[],i)&&(r||=[],r.push(a))}),r!==void 0&&D_(r,o),e}function D_(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];Hh(r,o=>{n(o,i)})}}function Cc(t,n,e,i){if(t=tt(t),!t)return!1;let r=null,o=yh(t),s=!o&&qn(t);if(!o&&!s){let l=t.ngModule;if(o=yh(l),o)r=l;else return!1}else{if(s&&!s.standalone)return!1;r=t}let a=i.has(r);if(s){if(a)return!1;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Cc(c,n,e,i)}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;kc(o.imports,u=>{Cc(u,n,e,i)&&(c||=[],c.push(u))}),c!==void 0&&D_(c,n)}if(!a){let c=wi(r)||(()=>new r);n({provide:r,useFactory:c,deps:Dt},r),n({provide:Vh,useValue:r,multi:!0},r),n({provide:yr,useValue:()=>R(r),multi:!0},r)}let l=o.providers;if(l!=null&&!a){let c=t;Hh(l,u=>{n(u,c)})}}else return!1;return r!==t&&t.providers!==void 0}function Hh(t,n){for(let e of t)Rh(e)&&(e=e.\u0275providers),Array.isArray(e)?Hh(e,n):n(e)}var bS=Se({provide:String,useValue:Se});function E_(t){return t!==null&&typeof t=="object"&&bS in t}function wS(t){return!!(t&&t.useExisting)}function CS(t){return!!(t&&t.useFactory)}function pr(t){return typeof t=="function"}function x_(t){return!!t.useClass}var Ys=new v(""),bc={},u_={},vh;function vo(){return vh===void 0&&(vh=new Vs),vh}var ke=class{},mr=class extends ke{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,Dh(n,s=>this.processProvider(s)),this.records.set(jh,mo(void 0,this)),r.has("environment")&&this.records.set(ke,mo(void 0,this));let o=this.records.get(Ys);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Vh,Dt,{self:!0}))}retrieve(n,e){let i=hr(e)||0;try{return this.get(n,fr,i)}catch(r){if(po(r))return r;throw r}}destroy(){Ls(this),this._destroyed=!0;let n=Z(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Z(n)}}onDestroy(n){return Ls(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Ls(this);let e=Rn(this),i=At(void 0),r;try{return n()}finally{Rn(e),At(i)}}get(n,e=fr,i){if(Ls(this),n.hasOwnProperty(d_))return n[d_](this);let r=hr(i),o,s=Rn(this),a=At(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let u=SS(n)&&$s(n);u&&this.injectableDefInScope(u)?c=mo(Ch(n),bc):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?vo():this.parent;return e=r&8&&e===fr?null:e,l.get(n,e)}catch(l){let c=hS(l);throw c===-200||c===-201?new E(c,null):l}finally{At(a),Rn(s)}}resolveInjectorInitializers(){let n=Z(null),e=Rn(this),i=At(void 0),r;try{let o=this.get(yr,Dt,{self:!0});for(let s of o)s()}finally{Rn(e),At(i),Z(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=tt(n);let e=pr(n)?n:tt(n&&n.provide),i=ES(n);if(!pr(n)&&n.multi===!0){let r=this.records.get(e);r||(r=mo(void 0,bc,!0),r.factory=()=>wh(r.multi),this.records.set(e,r)),e=n,r.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let r=Z(null);try{if(e.value===u_)throw Fh("");return e.value===bc&&(e.value=u_,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&IS(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{Z(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=tt(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Ch(t){let n=$s(t),e=n!==null?n.factory:wi(t);if(e!==null)return e;if(t instanceof v)throw new E(-204,!1);if(t instanceof Function)return DS(t);throw new E(-204,!1)}function DS(t){if(t.length>0)throw new E(-204,!1);let e=dS(t);return e!==null?()=>e.factory(t):()=>new t}function ES(t){if(E_(t))return mo(void 0,t.useValue);{let n=Uh(t);return mo(n,bc)}}function Uh(t,n,e){let i;if(pr(t)){let r=tt(t);return wi(r)||Ch(r)}else if(E_(t))i=()=>tt(t.useValue);else if(CS(t))i=()=>t.useFactory(...wh(t.deps||[]));else if(wS(t))i=(r,o)=>R(tt(t.useExisting),o!==void 0&&o&8?8:void 0);else{let r=tt(t&&(t.useClass||t.provide));if(xS(t))i=()=>new r(...wh(t.deps));else return wi(r)||Ch(r)}return i}function Ls(t){if(t.destroyed)throw new E(-205,!1)}function mo(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function xS(t){return!!t.deps}function IS(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function SS(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Dh(t,n){for(let e of t)Array.isArray(e)?Dh(e,n):e&&Rh(e)?Dh(e.\u0275providers,n):n(e)}function ut(t,n){let e;t instanceof mr?(Ls(t),e=t):e=new bh(t);let i,r=Rn(e),o=At(void 0);try{return n()}finally{Rn(r),At(o)}}function I_(){return y_()!==void 0||_c()!=null}var hn=0,Y=1,te=2,nt=3,Yt=4,Rt=5,_r=6,yo=7,qe=8,Yn=9,pn=10,Ne=11,_o=12,zh=13,br=14,kt=15,xi=16,wr=17,On=18,Zn=19,$h=20,Gn=21,Pc=22,Ci=23,Bt=24,Cr=25,Ii=26,Be=27,S_=1,Wh=6,Si=7,Zs=8,Dr=9,$e=10;function Kn(t){return Array.isArray(t)&&typeof t[S_]=="object"}function mn(t){return Array.isArray(t)&&t[S_]===!0}function Gh(t){return(t.flags&4)!==0}function Qn(t){return t.componentOffset>-1}function bo(t){return(t.flags&1)===1}function gn(t){return!!t.template}function wo(t){return(t[te]&512)!==0}function Er(t){return(t[te]&256)===256}var qh="svg",M_="math";function Zt(t){for(;Array.isArray(t);)t=t[hn];return t}function Yh(t,n){return Zt(n[t])}function vn(t,n){return Zt(n[t.index])}function Lc(t,n){return t.data[n]}function Zh(t,n){return t[n]}function Kh(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function Kt(t,n){let e=n[t];return Kn(e)?e:e[hn]}function T_(t){return(t[te]&4)===4}function jc(t){return(t[te]&128)===128}function A_(t){return mn(t[nt])}function Ht(t,n){return n==null?null:t[n]}function Qh(t){t[wr]=0}function Xh(t){t[te]&1024||(t[te]|=1024,jc(t)&&xr(t))}function R_(t,n){for(;t>0;)n=n[br],t--;return n}function Ks(t){return!!(t[te]&9216||t[Bt]?.dirty)}function Vc(t){t[pn].changeDetectionScheduler?.notify(8),t[te]&64&&(t[te]|=1024),Ks(t)&&xr(t)}function xr(t){t[pn].changeDetectionScheduler?.notify(0);let n=Di(t);for(;n!==null&&!(n[te]&8192||(n[te]|=8192,!jc(n)));)n=Di(n)}function Jh(t,n){if(Er(t))throw new E(911,!1);t[Gn]===null&&(t[Gn]=[]),t[Gn].push(n)}function k_(t,n){if(t[Gn]===null)return;let e=t[Gn].indexOf(n);e!==-1&&t[Gn].splice(e,1)}function Di(t){let n=t[nt];return mn(n)?n[nt]:n}function ep(t){return t[yo]??=[]}function tp(t){return t.cleanup??=[]}function N_(t,n,e,i){let r=ep(n);r.push(e),t.firstCreatePass&&tp(t).push(i,r.length-1)}var ae={lFrame:W_(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Eh=!1;function O_(){return ae.lFrame.elementDepthCount}function F_(){ae.lFrame.elementDepthCount++}function np(){ae.lFrame.elementDepthCount--}function Bc(){return ae.bindingsEnabled}function ip(){return ae.skipHydrationRootTNode!==null}function rp(t){return ae.skipHydrationRootTNode===t}function op(){ae.skipHydrationRootTNode=null}function X(){return ae.lFrame.lView}function Fe(){return ae.lFrame.tView}function He(t){return ae.lFrame.contextLView=t,t[qe]}function Ue(t){return ae.lFrame.contextLView=null,t}function it(){let t=sp();for(;t!==null&&t.type===64;)t=t.parent;return t}function sp(){return ae.lFrame.currentTNode}function P_(){let t=ae.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function Co(t,n){let e=ae.lFrame;e.currentTNode=t,e.isParent=n}function ap(){return ae.lFrame.isParent}function lp(){ae.lFrame.isParent=!1}function L_(){return ae.lFrame.contextLView}function cp(){return Eh}function Bs(t){let n=Eh;return Eh=t,n}function dp(){let t=ae.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function j_(){return ae.lFrame.bindingIndex}function V_(t){return ae.lFrame.bindingIndex=t}function Mi(){return ae.lFrame.bindingIndex++}function Hc(t){let n=ae.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function B_(){return ae.lFrame.inI18n}function H_(t,n){let e=ae.lFrame;e.bindingIndex=e.bindingRootIndex=t,Uc(n)}function U_(){return ae.lFrame.currentDirectiveIndex}function Uc(t){ae.lFrame.currentDirectiveIndex=t}function z_(t){let n=ae.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function zc(){return ae.lFrame.currentQueryIndex}function Qs(t){ae.lFrame.currentQueryIndex=t}function MS(t){let n=t[Y];return n.type===2?n.declTNode:n.type===1?t[Rt]:null}function up(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=MS(o),r===null||(o=o[br],r.type&10))break;if(r===null)return!1;n=r,t=o}let i=ae.lFrame=$_();return i.currentTNode=n,i.lView=t,!0}function $c(t){let n=$_(),e=t[Y];ae.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function $_(){let t=ae.lFrame,n=t===null?null:t.child;return n===null?W_(t):n}function W_(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function G_(){let t=ae.lFrame;return ae.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var fp=G_;function Wc(){let t=G_();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function q_(t){return(ae.lFrame.contextLView=R_(t,ae.lFrame.contextLView))[qe]}function Fn(){return ae.lFrame.selectedIndex}function Ti(t){ae.lFrame.selectedIndex=t}function Xs(){let t=ae.lFrame;return Lc(t.tView,t.selectedIndex)}function Ai(){ae.lFrame.currentNamespace=qh}function hp(){return ae.lFrame.currentNamespace}var Y_=!0;function Gc(){return Y_}function Js(t){Y_=t}function xh(t,n=null,e=null,i){let r=pp(t,n,e,i);return r.resolveInjectorInitializers(),r}function pp(t,n=null,e=null,i,r=new Set){let o=[e||Dt,Fc(t)],s;return new mr(o,n||vo(),s||null,r)}var F=class t{static THROW_IF_NOT_FOUND=fr;static NULL=new Vs;static create(n,e){if(Array.isArray(n))return xh({name:""},e,n,"");{let i=n.name??"";return xh({name:i},n.parent,n.providers,i)}}static \u0275prov=b({token:t,providedIn:"any",factory:()=>R(jh)});static __NG_ELEMENT_ID__=-1},G=new v(""),vt=(()=>{class t{static __NG_ELEMENT_ID__=TS;static __NG_ENV_ID__=e=>e}return t})(),Dc=class extends vt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return Er(this._lView)}onDestroy(n){let e=this._lView;return Jh(e,n),()=>k_(e,n)}};function TS(){return new Dc(X())}var Z_=!1,K_=new v(""),Xn=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new We(!1);debugTaskTracker=d(K_,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new W(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),Ih=class extends D{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,I_()&&(this.destroyRef=d(vt,{optional:!0})??void 0,this.pendingTasks=d(Xn,{optional:!0})??void 0)}emit(n){let e=Z(null);try{super.next(n)}finally{Z(e)}}subscribe(n,e,i){let r=n,o=e||(()=>null),s=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return n instanceof he&&n.add(a),a}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},z=Ih;function Ec(...t){}function mp(t){let n,e;function i(){t=Ec;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function Q_(t){return queueMicrotask(()=>t()),()=>{t=Ec}}var gp="isAngularZone",Hs=gp+"_ID",AS=0,B=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new z(!1);onMicrotaskEmpty=new z(!1);onStable=new z(!1);onError=new z(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=Z_}=n;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=!1,s.scheduleInRootZone=o,NS(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(gp)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new E(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,n,RS,Ec,Ec);try{return o.runTask(s,e,i)}finally{o.cancelTask(s)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},RS={};function vp(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function kS(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){mp(()=>{t.callbackScheduled=!1,Sh(t),t.isCheckStableRunning=!0,vp(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Sh(t)}function NS(t){let n=()=>{kS(t)},e=AS++;t._inner=t._inner.fork({name:"angular",properties:{[gp]:!0,[Hs]:e,[Hs+e]:!0},onInvokeTask:(i,r,o,s,a,l)=>{if(OS(l))return i.invokeTask(o,s,a,l);try{return f_(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),h_(t)}},onInvoke:(i,r,o,s,a,l,c)=>{try{return f_(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!FS(l)&&n(),h_(t)}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,Sh(t),vp(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function Sh(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function f_(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function h_(t){t._nesting--,vp(t)}var Us=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new z;onMicrotaskEmpty=new z;onStable=new z;onError=new z;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function OS(t){return X_(t,"__ignore_ng_zone__")}function FS(t){return X_(t,"__scheduler_tick__")}function X_(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var Pt=class{_console=console;handleError(n){this._console.error("ERROR",n)}},yn=new v("",{factory:()=>{let t=d(B),n=d(ke),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(Pt),e.handleError(i))})}}}),J_={provide:yr,useValue:()=>{let t=d(Pt,{optional:!0})},multi:!0};function Ce(t,n){let[e,i,r]=eh(t,n?.equal),o=e,s=o[Je];return o.set=i,o.update=r,o.asReadonly=eb.bind(o),o}function eb(){let t=this[Je];if(t.readonlyFn===void 0){let n=()=>this();n[Je]=t,t.readonlyFn=n}return t.readonlyFn}var Do=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=PS}return t})();function PS(){return new Do(X(),it())}var kn=class{},ea=new v("",{factory:()=>!0});var yp=new v(""),Eo=(()=>{class t{internalPendingTasks=d(Xn);scheduler=d(kn);errorHandler=d(yn);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();e().catch(this.errorHandler).finally(i)}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),qc=(()=>{class t{static \u0275prov=b({token:t,providedIn:"root",factory:()=>new Mh})}return t})(),Mh=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},xc=class{[Je];constructor(n){this[Je]=n}destroy(){this[Je].destroy()}};function Ir(t,n){let e=n?.injector??d(F),i=n?.manualCleanup!==!0?e.get(vt):null,r,o=e.get(Do,null,{optional:!0}),s=e.get(kn);return o!==null?(r=VS(o.view,s,t),i instanceof Dc&&i._lView===o.view&&(i=null)):r=BS(t,e.get(qc),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new xc(r)}var tb=q(g({},nh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=Bs(!1);try{ih(this)}finally{Bs(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=Z(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],Z(t)}}}),LS=q(g({},tb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(vi(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),jS=q(g({},tb),{consumerMarkedDirty(){this.view[te]|=8192,xr(this.view),this.notifier.notify(13)},destroy(){if(vi(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[Ci]?.delete(this)}});function VS(t,n,e){let i=Object.create(jS);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=nb(i,e),t[Ci]??=new Set,t[Ci].add(i),i.consumerMarkedDirty(i),i}function BS(t,n,e){let i=Object.create(LS);return i.fn=nb(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function nb(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function da(t){return{toString:t}.toString()}function YS(t){return typeof t=="function"}function jb(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var id=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}},Ke=(()=>{let t=()=>Vb;return t.ngInherit=!0,t})();function Vb(t){return t.type.prototype.ngOnChanges&&(t.setInput=KS),ZS}function ZS(){let t=Hb(this),n=t?.current;if(n){let e=t.previous;if(e===fn)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function KS(t,n,e,i,r){let o=this.declaredInputs[i],s=Hb(t)||QS(t,{previous:fn,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new id(c&&c.currentValue,e,l===fn),jb(t,n,r,e)}var Bb="__ngSimpleChanges__";function Hb(t){return t[Bb]||null}function QS(t,n){return t[Bb]=n}var ib=[];var Me=function(t,n=null,e){for(let i=0;i<ib.length;i++){let r=ib[i];r(t,n,e)}},be=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(be||{});function XS(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let s=Vb(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s)}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function Ub(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),u!=null&&(t.destroyHooks??=[]).push(e,u)}}function Xc(t,n,e){zb(t,n,3,e)}function Jc(t,n,e,i){(t[te]&3)===e&&zb(t,n,e,i)}function _p(t,n){let e=t[te];(e&3)===n&&(e&=16383,e+=1,t[te]=e)}function zb(t,n,e,i){let r=i!==void 0?t[wr]&65535:0,o=i??-1,s=n.length-1,a=0;for(let l=r;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],i!=null&&a>=i)break}else n[l]<0&&(t[wr]+=65536),(a<o||o==-1)&&(JS(t,e,n,l),t[wr]=(t[wr]&4294901760)+l+2),l++}function rb(t,n){Me(be.LifecycleHookStart,t,n);let e=Z(null);try{n.call(t)}finally{Z(e),Me(be.LifecycleHookEnd,t,n)}}function JS(t,n,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=t[s];r?t[te]>>14<t[wr]>>16&&(t[te]&3)===n&&(t[te]+=16384,rb(a,o)):rb(a,o)}var Io=-1,Mr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i}};function eM(t){return(t.flags&8)!==0}function tM(t){return(t.flags&16)!==0}function nM(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];t.setAttribute(n,s,a,o)}else{let o=r,s=e[++i];iM(o)?t.setProperty(n,o,s):t.setAttribute(n,o,s),i++}}return i}function $b(t){return t===3||t===4||t===6}function iM(t){return t.charCodeAt(0)===64}function So(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?ob(t,e,r,null,n[++i]):ob(t,e,r,null,null))}}return t}function ob(t,n,e,i,r){let o=0,s=t.length;if(n===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++}s!==-1&&(t.splice(s,0,n),o=s+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r)}function Wb(t){return t!==Io}function rd(t){return t&32767}function rM(t){return t>>16}function od(t,n){let e=rM(t),i=n;for(;e>0;)i=i[br],e--;return i}var Tp=!0;function sd(t){let n=Tp;return Tp=t,n}var oM=256,Gb=oM-1,qb=5,sM=0,Pn={};function aM(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(gr)&&(i=e[gr]),i==null&&(i=e[gr]=sM++);let r=i&Gb,o=1<<r;n.data[t+(r>>qb)]|=o}function ad(t,n){let e=Yb(t,n);if(e!==-1)return e;let i=n[Y];i.firstCreatePass&&(t.injectorIndex=n.length,bp(i.data,t),bp(n,null),bp(i.blueprint,null));let r=hm(t,n),o=t.injectorIndex;if(Wb(r)){let s=rd(r),a=od(r,n),l=a[Y].data;for(let c=0;c<8;c++)n[o+c]=a[s+c]|l[s+c]}return n[o+8]=r,o}function bp(t,n){t.push(0,0,0,0,0,0,0,0,n)}function Yb(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function hm(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=Jb(r),i===null)return Io;if(e++,r=r[br],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Io}function Ap(t,n,e){aM(t,n,e)}function lM(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if($b(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else{if(o===n)return e[r+1];r=r+2}}}return null}function Zb(t,n,e){if(e&8||t!==void 0)return t;Rc(n,"NodeInjector")}function Kb(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[Yn],o=At(void 0);try{return r?r.get(n,i,e&8):Ph(n,i,e&8)}finally{At(o)}}return Zb(i,n,e)}function Qb(t,n,e,i=0,r){if(t!==null){if(n[te]&2048&&!(i&2)){let s=fM(t,n,e,i,Pn);if(s!==Pn)return s}let o=Xb(t,n,e,i,Pn);if(o!==Pn)return o}return Kb(n,e,i,r)}function Xb(t,n,e,i,r){let o=dM(e);if(typeof o=="function"){if(!up(n,t,i))return i&1?Zb(r,e,i):Kb(n,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))Rc(e);else return s}finally{fp()}}else if(typeof o=="number"){let s=null,a=Yb(t,n),l=Io,c=i&1?n[kt][Rt]:null;for((a===-1||i&4)&&(l=a===-1?hm(t,n):n[a+8],l===Io||!ab(i,!1)?a=-1:(s=n[Y],a=rd(l),n=od(l,n)));a!==-1;){let u=n[Y];if(sb(o,a,u.data)){let f=cM(a,n,e,s,i,c);if(f!==Pn)return f}l=n[a+8],l!==Io&&ab(i,n[Y].data[a+8]===c)&&sb(o,a,n)?(s=u,a=rd(l),n=od(l,n)):a=-1}}return r}function cM(t,n,e,i,r,o){let s=n[Y],a=s.data[t+8],l=i==null?Qn(a)&&Tp:i!=s&&(a.type&3)!==0,c=r&1&&o===a,u=ed(a,s,e,l,c);return u!==null?ra(n,s,u,a,r):Pn}function ed(t,n,e,i,r){let o=t.providerIndexes,s=n.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,f=i?a:a+u,h=r?a+u:c;for(let p=f;p<h;p++){let w=s[p];if(p<l&&e===w||p>=l&&w.type===e)return p}if(r){let p=s[l];if(p&&gn(p)&&p.type===e)return l}return null}function ra(t,n,e,i,r){let o=t[e],s=n.data;if(o instanceof Mr){let a=o;if(a.resolving)throw Fh("");let l=sd(a.canSeeViewProviders);a.resolving=!0;let c=s[e].type||s[e],u,f=a.injectImpl?At(a.injectImpl):null,h=up(t,i,0);try{o=t[e]=a.factory(void 0,r,s,t,i),n.firstCreatePass&&e>=i.directiveStart&&XS(e,s[e],n)}finally{f!==null&&At(f),sd(l),a.resolving=!1,fp()}}return o}function dM(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(gr)?t[gr]:void 0;return typeof n=="number"?n>=0?n&Gb:uM:n}function sb(t,n,e){let i=1<<t;return!!(e[n+(t>>qb)]&i)}function ab(t,n){return!(t&2)&&!(t&1&&n)}var Sr=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return Qb(this._tNode,this._lView,n,hr(i),e)}};function uM(){return new Sr(it(),X())}function Qe(t){return da(()=>{let n=t.prototype.constructor,e=n[js]||Rp(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[js]||Rp(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Rp(t){return Th(t)?()=>{let n=Rp(tt(t));return n&&n()}:wi(t)}function fM(t,n,e,i,r){let o=t,s=n;for(;o!==null&&s!==null&&s[te]&2048&&!wo(s);){let a=Xb(o,s,e,i|2,Pn);if(a!==Pn)return a;let l=o.parent;if(!l){let c=s[$h];if(c){let u=c.get(e,Pn,i&-5);if(u!==Pn)return u}l=Jb(s),s=s[br]}o=l}return r}function Jb(t){let n=t[Y],e=n.type;return e===2?n.declTNode:e===1?t[Rt]:null}function pm(t){return lM(it(),t)}function hM(){return ko(it(),X())}function ko(t,n){return new k(vn(t,n))}var k=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=hM}return t})();function ew(t){return t instanceof k?t.nativeElement:t}function pM(){return this._results[Symbol.iterator]()}var wn=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new D}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=b_(n);(this._changesDetected=!__(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=pM};function tw(t){return(t.flags&128)===128}var mm=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(mm||{}),nw=new Map,mM=0;function gM(){return mM++}function vM(t){nw.set(t[Zn],t)}function kp(t){nw.delete(t[Zn])}var lb="__ngContext__";function Mo(t,n){Kn(n)?(t[lb]=n[Zn],vM(n)):t[lb]=n}function iw(t){return ow(t[_o])}function rw(t){return ow(t[Yt])}function ow(t){for(;t!==null&&!mn(t);)t=t[Yt];return t}var Np;function gm(t){Np=t}function sw(){if(Np!==void 0)return Np;if(typeof document<"u")return document;throw new E(210,!1)}var No=new v("",{factory:()=>yM}),yM="ng";var bd=new v(""),ei=new v("",{providedIn:"platform",factory:()=>"unknown"}),ua=new v(""),kr=new v("",{factory:()=>d(G).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var aw="r";var lw="di";var cw=!1,dw=new v("",{factory:()=>cw});var cb=new WeakMap;function _M(t,n){if(t==null||typeof t!="object")return;let e=cb.get(t);e||(e=new WeakSet,cb.set(t,e)),e.add(n)}var bM=(t,n,e,i)=>{};function wM(t,n,e,i){bM(t,n,e,i)}function wd(t){return(t.flags&32)===32}var CM=()=>null;function uw(t,n,e=!1){return CM(t,n,e)}function fw(t,n){let e=t.contentQueries;if(e!==null){let i=Z(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=t.data[s];Qs(o),a.contentQueries(2,n[s],s)}}}finally{Z(i)}}}function Op(t,n,e){Qs(0);let i=Z(null);try{n(t,e)}finally{Z(i)}}function vm(t,n,e){if(Gh(n)){let i=Z(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s)}}}finally{Z(i)}}}var Cn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Cn||{});var Yc;function DM(){if(Yc===void 0&&(Yc=null,Ei.trustedTypes))try{Yc=Ei.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Yc}function Cd(t){return DM()?.createHTML(t)||t}var Zc;function EM(){if(Zc===void 0&&(Zc=null,Ei.trustedTypes))try{Zc=Ei.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch{}return Zc}function db(t){return EM()?.createHTML(t)||t}var Jn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ic})`}},Fp=class extends Jn{getTypeName(){return"HTML"}},Pp=class extends Jn{getTypeName(){return"Style"}},Lp=class extends Jn{getTypeName(){return"Script"}},jp=class extends Jn{getTypeName(){return"URL"}},Vp=class extends Jn{getTypeName(){return"ResourceURL"}};function En(t){return t instanceof Jn?t.changingThisBreaksApplicationSecurity:t}function ti(t,n){let e=hw(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Ic})`)}return e===n}function hw(t){return t instanceof Jn&&t.getTypeName()||null}function ym(t){return new Fp(t)}function _m(t){return new Pp(t)}function bm(t){return new Lp(t)}function wm(t){return new jp(t)}function Cm(t){return new Vp(t)}function xM(t){let n=new Hp(t);return IM()?new Bp(n):n}var Bp=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(Cd(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},Hp=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=Cd(n),e}};function IM(){try{return!!new window.DOMParser().parseFromString(Cd(""),"text/html")}catch{return!1}}var SM=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function fa(t){return t=String(t),t.match(SM)?t:"unsafe:"+t}function ni(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function ha(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=!0);return n}var pw=ni("area,br,col,hr,img,wbr"),mw=ni("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),gw=ni("rp,rt"),MM=ha(gw,mw),TM=ha(mw,ni("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),AM=ha(gw,ni("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),ub=ha(pw,TM,AM,MM),vw=ni("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),RM=ni("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),kM=ni("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),NM=ha(vw,RM,kM),OM=ni("script,style,template"),Up=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){r.push(e),e=LM(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=PM(e);if(o){e=o;break}e=r.pop()}}return this.buf.join("")}startElement(n){let e=fb(n).toLowerCase();if(!ub.hasOwnProperty(e))return this.sanitizedSomething=!0,!OM.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!NM.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;vw[a]&&(l=fa(l)),this.buf.push(" ",s,'="',hb(l),'"')}return this.buf.push(">"),!0}endElement(n){let e=fb(n).toLowerCase();ub.hasOwnProperty(e)&&!pw.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(hb(n))}};function FM(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function PM(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw yw(n);return n}function LM(t){let n=t.firstChild;if(n&&FM(t,n))throw yw(n);return n}function fb(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function yw(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var jM=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,VM=/([^\#-~ |!])/g;function hb(t){return t.replace(/&/g,"&amp;").replace(jM,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(VM,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Kc;function Dd(t,n){let e=null;try{Kc=Kc||xM(t);let i=n?String(n):"";e=Kc.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=Kc.getInertBodyElement(i)}while(i!==o);let a=new Up().sanitizeChildren(pb(e)||e);return Cd(a)}finally{if(e){let i=pb(e)||e;for(;i.firstChild;)i.firstChild.remove()}}}function pb(t){return"content"in t&&BM(t)?t.content:null}function BM(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var HM=/^>|^->|<!--|-->|--!>|<!-$/g,UM=/(<|>)/g,zM="\u200B$1\u200B";function $M(t){return t.replace(HM,n=>n.replace(UM,zM))}function WM(t,n){return t.createText(n)}function GM(t,n,e){t.setValue(n,e)}function qM(t,n){return t.createComment($M(n))}function _w(t,n,e){return t.createElement(n,e)}function ld(t,n,e,i,r){t.insertBefore(n,e,i,r)}function bw(t,n,e){t.appendChild(n,e)}function mb(t,n,e,i,r){i!==null?ld(t,n,e,i,r):bw(t,n,e)}function ww(t,n,e,i){t.removeChild(null,n,e,i)}function YM(t,n,e){t.setAttribute(n,"style",e)}function ZM(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function Cw(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&nM(t,n,i),r!==null&&ZM(t,n,r),o!==null&&YM(t,n,o)}var ot=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t[t.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",t})(ot||{});function Dm(t){let n=Dw();return n?db(n.sanitize(ot.HTML,t)||""):ti(t,"HTML")?db(En(t)):Dd(sw(),vr(t))}function Em(t){let n=Dw();return n?n.sanitize(ot.URL,t)||"":ti(t,"URL")?En(t):fa(vr(t))}function Dw(){let t=X();return t&&t[pn].sanitizer}function Ew(t){return t instanceof Function?t():t}function KM(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1}}var xw="ng-template";function QM(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&KM(n[r+1].toLowerCase(),e,0)!==-1)return!0}else if(xm(t))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return!0}return!1}function xm(t){return t.type===4&&t.value!==xw}function XM(t,n,e){let i=t.type===4&&!e?xw:t.value;return n===i}function JM(t,n,e){let i=4,r=t.attrs,o=r!==null?nT(r):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!_n(i)&&!_n(l))return!1;if(s&&_n(l))continue;s=!1,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!XM(t,l,e)||l===""&&n.length===1){if(_n(i))return!1;s=!0}}else if(i&8){if(r===null||!QM(t,r,l,e)){if(_n(i))return!1;s=!0}}else{let c=n[++a],u=eT(l,r,xm(t),e);if(u===-1){if(_n(i))return!1;s=!0;continue}if(c!==""){let f;if(u>o?f="":f=r[u+1].toLowerCase(),i&2&&c!==f){if(_n(i))return!1;s=!0}}}}return _n(i)||s}function _n(t){return(t&1)===0}function eT(t,n,e,i){if(n===null)return-1;let r=0;if(i||!e){let o=!1;for(;r<n.length;){let s=n[r];if(s===t)return r;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++r];for(;typeof a=="string";)a=n[++r];continue}else{if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2}return-1}else return iT(n,t)}function Iw(t,n,e=!1){for(let i=0;i<n.length;i++)if(JM(t,n[i],e))return!0;return!1}function tT(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function nT(t){for(let n=0;n<t.length;n++){let e=t[n];if($b(e))return n}return t.length}function iT(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function rT(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return!0}}return!1}function gb(t,n){return t?":not("+n.trim()+")":n}function oT(t){let n=t[0],e=1,i=2,r="",o=!1;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(i&2){let a=t[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!_n(s)&&(n+=gb(o,r),r=""),i=s,o=o||!_n(i);e++}return r!==""&&(n+=gb(o,r)),n}function sT(t){return t.map(oT).join(",")}function aT(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else{if(!_n(r))break;r=o}i++}return e.length&&n.push(1,...e),n}var Lt={};function Im(t,n,e,i,r,o,s,a,l,c,u){let f=Be+i,h=f+r,p=lT(f,h),w=typeof c=="function"?c():c;return p[Y]={type:t,blueprint:p,template:e,queries:null,viewQuery:a,declTNode:n,data:p.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:w,incompleteFirstPass:!1,ssrId:u}}function lT(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Lt);return e}function cT(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=Im(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function Sm(t,n,e,i,r,o,s,a,l,c,u){let f=n.blueprint.slice();return f[hn]=r,f[te]=i|4|128|8|64|1024,(c!==null||t&&t[te]&2048)&&(f[te]|=2048),Qh(f),f[nt]=f[br]=t,f[qe]=e,f[pn]=s||t&&t[pn],f[Ne]=a||t&&t[Ne],f[Yn]=l||t&&t[Yn]||null,f[Rt]=o,f[Zn]=gM(),f[_r]=u,f[$h]=c,f[kt]=n.type==2?t[kt]:f,f}function dT(t,n,e){let i=vn(n,t),r=cT(e),o=t[pn].rendererFactory,s=Mm(t,Sm(t,r,null,Sw(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=s}function Sw(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function Mw(t,n,e,i){if(e===0)return-1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function Mm(t,n){return t[_o]?t[zh][Yt]=n:t[_o]=n,t[zh]=n,n}function m(t=1){Tw(Fe(),X(),Fn()+t,!1)}function Tw(t,n,e,i){if(!i)if((n[te]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Xc(n,o,e)}else{let o=t.preOrderHooks;o!==null&&Jc(n,o,0,e)}Ti(e)}var Ed=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Ed||{});function zp(t,n,e,i){let r=Z(null);try{let[o,s,a]=t.inputs[e],l=null;(s&Ed.SignalBased)!==0&&(l=n[o][Je]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):jb(n,l,o,i)}finally{Z(r)}}var Dn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(Dn||{}),uT;function Tm(t,n){return uT(t,n)}var iW=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var $p=new WeakMap,ta=new WeakSet;function fT(t,n){let e=$p.get(t);if(!e||e.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===n?(e.splice(o,1),ta.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&s===r||a&&i&&a!==i)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function hT(t,n){let e=$p.get(t);e?e.includes(n)||e.push(n):$p.set(t,[n])}var Tr=new Set,xd=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(xd||{}),xn=new v(""),vb=new Set;function ki(t){vb.has(t)||(vb.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var Id=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),Am=[0,1,2,3],Rm=(()=>{class t{ngZone=d(B);scheduler=d(kn);errorHandler=d(Pt,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){d(xn,{optional:!0})}execute(){let e=this.sequences.size>0;e&&Me(be.AfterRenderHooksStart),this.executing=!0;for(let i of Am)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&Me(be.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Cr]??=[]).push(e),xr(i),i[te]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(xd.AFTER_NEXT_RENDER,e):e()}static \u0275prov=b({token:t,providedIn:"root",factory:()=>new t})}return t})(),oa=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,s=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[Cr];n&&(this.view[Cr]=n.filter(e=>e!==this))}};function Xe(t,n){let e=n?.injector??d(F);return ki("NgAfterNextRender"),mT(t,e,n,!0)}function pT(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function mT(t,n,e,i){let r=n.get(Id);r.impl??=n.get(Rm);let o=n.get(xn,null,{optional:!0}),s=e?.manualCleanup!==!0?n.get(vt):null,a=n.get(Do,null,{optional:!0}),l=new oa(r.impl,pT(t),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var Aw=new v("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:d(ke)})});function Rw(t,n,e){let i=t.get(Aw);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t)}function gT(t,n){let e=t.get(Aw);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function vT(t,n){for(let[e,i]of n)Rw(t,i.animateFns)}function yb(t,n,e,i){let r=t?.[Ii]?.enter;n!==null&&r&&r.has(e.index)&&vT(i,r)}function xo(t,n,e,i,r,o,s,a){if(r!=null){let l,c=!1;mn(r)?l=r:Kn(r)&&(c=!0,r=r[hn]);let u=Zt(r);t===0&&i!==null?(yb(a,i,o,e),s==null?bw(n,i,u):ld(n,i,u,s||null,!0)):t===1&&i!==null?(yb(a,i,o,e),ld(n,i,u,s||null,!0),fT(o,u)):t===2?(a?.[Ii]?.leave?.has(o.index)&&hT(o,u),ta.delete(u),_b(a,o,e,f=>{if(ta.has(u)){ta.delete(u);return}ww(n,u,c,f)})):t===3&&(ta.delete(u),_b(a,o,e,()=>{n.destroyNode(u)})),l!=null&&MT(n,t,e,l,o,i,s)}}function yT(t,n){kw(t,n),n[hn]=null,n[Rt]=null}function _T(t,n,e,i,r,o){i[hn]=r,i[Rt]=n,Md(t,i,e,1,r,o)}function kw(t,n){n[pn].changeDetectionScheduler?.notify(9),Md(t,n,n[Ne],2,null,null)}function bT(t){let n=t[_o];if(!n)return wp(t[Y],t);for(;n;){let e=null;if(Kn(n))e=n[_o];else{let i=n[$e];i&&(e=i)}if(!e){for(;n&&!n[Yt]&&n!==t;)Kn(n)&&wp(n[Y],n),n=n[nt];n===null&&(n=t),Kn(n)&&wp(n[Y],n),e=n&&n[Yt]}n=e}}function km(t,n){let e=t[Dr],i=e.indexOf(n);e.splice(i,1)}function Sd(t,n){if(Er(n))return;let e=n[Ne];e.destroyNode&&Md(t,n,e,3,null,null),bT(n)}function wp(t,n){if(Er(n))return;let e=Z(null);try{n[te]&=-129,n[te]|=256,n[Bt]&&vi(n[Bt]),DT(t,n),CT(t,n),n[Y].type===1&&n[Ne].destroy();let i=n[xi];if(i!==null&&mn(n[nt])){i!==n[nt]&&km(i,n);let r=n[On];r!==null&&r.detachView(t)}kp(n)}finally{Z(e)}}function _b(t,n,e,i){let r=t?.[Ii];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);t&&Tr.add(t[Zn]),Rw(e,()=>{if(r.leave&&r.leave.has(n.index)){let s=r.leave.get(n.index),a=[];if(s){for(let l=0;l<s.animateFns.length;l++){let c=s.animateFns[l],{promise:u}=c();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),wT(t,i)}else t&&Tr.delete(t[Zn]),i(!1)},r)}function wT(t,n){let e=t[Ii]?.running;if(e){e.then(()=>{t[Ii].running=void 0,Tr.delete(t[Zn]),n(!0)});return}n(!1)}function CT(t,n){let e=t.cleanup,i=n[yo];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2}else{let a=i[e[s+1]];e[s].call(a)}i!==null&&(n[yo]=null);let r=n[Gn];if(r!==null){n[Gn]=null;for(let s=0;s<r.length;s++){let a=r[s];a()}}let o=n[Ci];if(o!==null){n[Ci]=null;for(let s of o)s.destroy()}}function DT(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof Mr)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Me(be.LifecycleHookStart,a,l);try{l.call(a)}finally{Me(be.LifecycleHookEnd,a,l)}}else{Me(be.LifecycleHookStart,r,o);try{o.call(r)}finally{Me(be.LifecycleHookEnd,r,o)}}}}}function Nw(t,n,e){return ET(t,n.parent,e)}function ET(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[hn];if(Qn(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Cn.None||r===Cn.Emulated)return null}return vn(i,e)}function Ow(t,n,e){return IT(t,n,e)}function xT(t,n,e){return t.type&40?vn(t,e):null}var IT=xT,bb;function Nm(t,n,e,i){let r=Nw(t,i,n),o=n[Ne],s=i.parent||n[Rt],a=Ow(s,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)mb(o,r,e[l],a,!1);else mb(o,r,e,a,!1);bb!==void 0&&bb(o,i,n,e,r)}function na(t,n){if(n!==null){let e=n.type;if(e&3)return vn(n,t);if(e&4)return Wp(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return na(t,i);{let r=t[n.index];return mn(r)?Wp(-1,r):Zt(r)}}else{if(e&128)return na(t,n.next);if(e&32)return Tm(n,t)()||Zt(t[n.index]);{let i=Fw(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=Di(t[kt]);return na(r,i)}else return na(t,n.next)}}}return null}function Fw(t,n){if(n!==null){let i=t[kt][Rt],r=n.projection;return i.projection[r]}return null}function Wp(t,n){let e=$e+t+1;if(e<n.length){let i=n[e],r=i[Y].firstChild;if(r!==null)return na(i,r)}return n[Si]}function Om(t,n,e,i,r,o,s){for(;e!=null;){let a=i[Yn];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&n===0&&(l&&Mo(Zt(l),i),e.flags|=2),!wd(e))if(c&8)Om(t,n,e.child,i,r,o,!1),xo(n,t,a,r,l,e,o,i);else if(c&32){let u=Tm(e,i),f;for(;f=u();)xo(n,t,a,r,f,e,o,i);xo(n,t,a,r,l,e,o,i)}else c&16?Pw(t,n,i,e,r,o):xo(n,t,a,r,l,e,o,i);e=s?e.projectionNext:e.next}}function Md(t,n,e,i,r,o){Om(e,i,t.firstChild,n,r,o,!1)}function ST(t,n,e){let i=n[Ne],r=Nw(t,e,n),o=e.parent||n[Rt],s=Ow(o,e,n);Pw(i,0,n,e,r,s)}function Pw(t,n,e,i,r,o){let s=e[kt],l=s[Rt].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];xo(n,t,e[Yn],r,u,i,o,e)}else{let c=l,u=s[nt];tw(i)&&(c.flags|=128),Om(t,n,c,u,r,o,!0)}}function MT(t,n,e,i,r,o,s){let a=i[Si],l=Zt(i);a!==l&&xo(n,t,e,o,a,r,s);for(let c=$e;c<i.length;c++){let u=i[c];Md(u[Y],u,t,n,o,a)}}function TT(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else{let o=i.indexOf("-")===-1?void 0:Dn.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Dn.Important),t.setStyle(e,i,r,o))}}function Lw(t,n,e,i,r){let o=Fn(),s=i&2;try{Ti(-1),s&&n.length>Be&&Tw(t,n,Be,!1);let a=s?be.TemplateUpdateStart:be.TemplateCreateStart;Me(a,r,e),e(i,r)}finally{Ti(o);let a=s?be.TemplateUpdateEnd:be.TemplateCreateEnd;Me(a,r,e)}}function Td(t,n,e){FT(t,n,e),(e.flags&64)===64&&PT(t,n,e)}function pa(t,n,e=vn){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(n,t):t[s];t[r++]=a}}}function AT(t,n,e,i){let o=i.get(dw,cw)||e===Cn.ShadowDom||e===Cn.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,o);if(s.tagName.toLowerCase()==="script")throw new E(905,!1);return RT(s),s}function RT(t){kT(t)}var kT=()=>null;function NT(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function jw(t,n,e,i,r,o){let s=n[Y];if(jm(t,s,n,e,i)){Qn(t)&&OT(n,t.index);return}t.type&3&&(e=NT(e)),Vw(t,n,e,i,r,o)}function Vw(t,n,e,i,r,o){if(t.type&3){let s=vn(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(s,e,i)}else t.type&12}function OT(t,n){let e=Kt(n,t);e[te]&16||(e[te]|=64)}function FT(t,n,e){let i=e.directiveStart,r=e.directiveEnd;Qn(e)&&dT(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||ad(e,n);let o=e.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=ra(n,t,s,e);if(Mo(l,n),o!==null&&BT(n,s-i,l,a,e,o),gn(a)){let c=Kt(e.index,n);c[qe]=ra(n,t,s,e)}}}function PT(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=U_();try{Ti(o);for(let a=i;a<r;a++){let l=t.data[a],c=n[a];Uc(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&LT(l,c)}}finally{Ti(-1),Uc(s)}}function LT(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function Fm(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];Iw(n,o.selectors,!1)&&(i??=[],gn(o)?i.unshift(o):i.push(o))}return i}function jT(t,n,e,i,r,o){let s=vn(t,n);VT(n[Ne],s,o,t.value,e,i,r)}function VT(t,n,e,i,r,o,s){if(o==null)t.removeAttribute(n,r,e);else{let a=s==null?vr(o):s(o,i||"",r);t.setAttribute(n,r,a,e)}}function BT(t,n,e,i,r,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];zp(i,e,l,c)}}function Pm(t,n,e,i,r){let o=Be+e,s=n[Y],a=r(s,n,t,i,e);n[o]=a,Co(t,!0);let l=t.type===2;return l?(Cw(n[Ne],a,t),(O_()===0||bo(t))&&Mo(a,n),F_()):Mo(a,n),Gc()&&(!l||!wd(t))&&Nm(s,n,a,t),t}function Lm(t){let n=t;return ap()?lp():(n=n.parent,Co(n,!1)),n}function HT(t,n){let e=t[Yn];if(!e)return;let i;try{i=e.get(yn,null)}catch{i=null}i?.(n)}function jm(t,n,e,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],f=n.data[c];zp(f,e[c],u,r),a=!0}if(o)for(let l of o){let c=e[l],u=n.data[l];zp(u,c,i,r),a=!0}return a}function UT(t,n){let e=Kt(n,t),i=e[Y];zT(i,e);let r=e[hn];r!==null&&e[_r]===null&&(e[_r]=uw(r,e[Yn])),Me(be.ComponentStart);try{Vm(i,e,e[qe])}finally{Me(be.ComponentEnd,e[qe])}}function zT(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function Vm(t,n,e){$c(n);try{let i=t.viewQuery;i!==null&&Op(1,i,e);let r=t.template;r!==null&&Lw(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[On]?.finishViewCreation(t),t.staticContentQueries&&fw(t,n),t.staticViewQueries&&Op(2,t.viewQuery,e);let o=t.components;o!==null&&$T(n,o)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[te]&=-5,Wc()}}function $T(t,n){for(let e=0;e<n.length;e++)UT(t,n[e])}function ma(t,n,e,i){let r=Z(null);try{let o=n.tView,a=t[te]&4096?4096:16,l=Sm(t,o,e,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[xi]=c;let u=t[On];return u!==null&&(l[On]=u.createEmbeddedView(o)),Vm(o,l,e),l}finally{Z(r)}}function To(t,n){return!n||n.firstChild===null||tw(t)}function sa(t,n,e,i,r=!1){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(Zt(o)),mn(o)&&Bw(o,i);let s=e.type;if(s&8)sa(t,n,e.child,i);else if(s&32){let a=Tm(e,n),l;for(;l=a();)i.push(l)}else if(s&16){let a=Fw(n,e);if(Array.isArray(a))i.push(...a);else{let l=Di(n[kt]);sa(l[Y],l,a,i,!0)}}e=r?e.projectionNext:e.next}return i}function Bw(t,n){for(let e=$e;e<t.length;e++){let i=t[e],r=i[Y].firstChild;r!==null&&sa(i[Y],i,r,n)}t[Si]!==t[hn]&&n.push(t[Si])}function Hw(t){if(t[Cr]!==null){for(let n of t[Cr])n.impl.addSequence(n);t[Cr].length=0}}var Uw=[];function WT(t){return t[Bt]??GT(t)}function GT(t){let n=Uw.pop()??Object.create(YT);return n.lView=t,n}function qT(t){t.lView[Bt]!==t&&(t.lView=null,Uw.push(t))}var YT=q(g({},Ji),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{xr(t.lView)},consumerOnSignalRead(){this.lView[Bt]=this}});function ZT(t){let n=t[Bt]??Object.create(KT);return n.lView=t,n}var KT=q(g({},Ji),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=Di(t.lView);for(;n&&!zw(n[Y]);)n=Di(n);n&&Xh(n)},consumerOnSignalRead(){this.lView[Bt]=this}});function zw(t){return t.type!==2}function $w(t){if(t[Ci]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[Ci])i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[te]&8192)}}var QT=100;function Ww(t,n=0){let i=t[pn].rendererFactory,r=!1;r||i.begin?.();try{XT(t,n)}finally{r||i.end?.()}}function XT(t,n){let e=cp();try{Bs(!0),Gp(t,n);let i=0;for(;Ks(t);){if(i===QT)throw new E(103,!1);i++,Gp(t,1)}}finally{Bs(e)}}function JT(t,n,e,i){if(Er(n))return;let r=n[te],o=!1,s=!1;$c(n);let a=!0,l=null,c=null;o||(zw(t)?(c=WT(n),l=gi(c)):Bl()===null?(a=!1,c=ZT(n),l=gi(c)):n[Bt]&&(vi(n[Bt]),n[Bt]=null));try{Qh(n),V_(t.bindingStartIndex),e!==null&&Lw(t,n,e,2,i);let u=(r&3)===3;if(!o)if(u){let p=t.preOrderCheckHooks;p!==null&&Xc(n,p,null)}else{let p=t.preOrderHooks;p!==null&&Jc(n,p,0,null),_p(n,0)}if(s||eA(n),$w(n),Gw(n,0),t.contentQueries!==null&&fw(t,n),!o)if(u){let p=t.contentCheckHooks;p!==null&&Xc(n,p)}else{let p=t.contentHooks;p!==null&&Jc(n,p,1),_p(n,1)}nA(t,n);let f=t.components;f!==null&&Yw(n,f,0);let h=t.viewQuery;if(h!==null&&Op(2,h,i),!o)if(u){let p=t.viewCheckHooks;p!==null&&Xc(n,p)}else{let p=t.viewHooks;p!==null&&Jc(n,p,2),_p(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[Pc]){for(let p of n[Pc])p();n[Pc]=null}o||(Hw(n),n[te]&=-73)}catch(u){throw o||xr(n),u}finally{c!==null&&(tr(c,l),a&&qT(c)),Wc()}}function Gw(t,n){for(let e=iw(t);e!==null;e=rw(e))for(let i=$e;i<e.length;i++){let r=e[i];qw(r,n)}}function eA(t){for(let n=iw(t);n!==null;n=rw(n)){if(!(n[te]&2))continue;let e=n[Dr];for(let i=0;i<e.length;i++){let r=e[i];Xh(r)}}}function tA(t,n,e){Me(be.ComponentStart);let i=Kt(n,t);try{qw(i,e)}finally{Me(be.ComponentEnd,i[qe])}}function qw(t,n){jc(t)&&Gp(t,n)}function Gp(t,n){let i=t[Y],r=t[te],o=t[Bt],s=!!(n===0&&r&16);if(s||=!!(r&64&&n===0),s||=!!(r&1024),s||=!!(o?.dirty&&no(o)),s||=!1,o&&(o.dirty=!1),t[te]&=-9217,s)JT(i,t,i.template,t[qe]);else if(r&8192){let a=Z(null);try{$w(t),Gw(t,1);let l=i.components;l!==null&&Yw(t,l,1),Hw(t)}finally{Z(a)}}}function Yw(t,n,e){for(let i=0;i<n.length;i++)tA(t,n[i],e)}function nA(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)Ti(~r);else{let o=r,s=e[++i],a=e[++i];H_(s,o);let l=n[o];Me(be.HostBindingsUpdateStart,l);try{a(2,l)}finally{Me(be.HostBindingsUpdateEnd,l)}}}}finally{Ti(-1)}}function Bm(t,n){let e=cp()?64:1088;for(t[pn].changeDetectionScheduler?.notify(n);t;){t[te]|=e;let i=Di(t);if(wo(t)&&!i)return t;t=i}return null}function Zw(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function Kw(t,n){let e=$e+n;if(e<t.length)return t[e]}function ga(t,n,e,i=!0){let r=n[Y];if(iA(r,n,t,e),i){let s=Wp(e,t),a=n[Ne],l=a.parentNode(t[Si]);l!==null&&_T(r,t[Rt],a,n,l,s)}let o=n[_r];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Qw(t,n){let e=aa(t,n);return e!==void 0&&Sd(e[Y],e),e}function aa(t,n){if(t.length<=$e)return;let e=$e+n,i=t[e];if(i){let r=i[xi];r!==null&&r!==t&&km(r,i),n>0&&(t[e-1][Yt]=i[Yt]);let o=qs(t,$e+n);yT(i[Y],i);let s=o[On];s!==null&&s.detachView(o[Y]),i[nt]=null,i[Yt]=null,i[te]&=-129}return i}function iA(t,n,e,i){let r=$e+i,o=e.length;i>0&&(e[r-1][Yt]=n),i<o-$e?(n[Yt]=e[r],Lh(e,$e+i,n)):(e.push(n),n[Yt]=null),n[nt]=e;let s=n[xi];s!==null&&e!==s&&Xw(s,n);let a=n[On];a!==null&&a.insertView(t),Vc(n),n[te]|=128}function Xw(t,n){let e=t[Dr],i=n[nt];if(Kn(i))t[te]|=2;else{let r=i[nt][kt];n[kt]!==r&&(t[te]|=2)}e===null?t[Dr]=[n]:e.push(n)}var Ri=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[Y];return sa(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[qe]}set context(n){this._lView[qe]=n}get destroyed(){return Er(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[nt];if(mn(n)){let e=n[Zs],i=e?e.indexOf(this):-1;i>-1&&(aa(n,i),qs(e,i))}this._attachedToViewContainer=!1}Sd(this._lView[Y],this._lView)}onDestroy(n){Jh(this._lView,n)}markForCheck(){Bm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[te]&=-129}reattach(){Vc(this._lView),this._lView[te]|=128}detectChanges(){this._lView[te]|=1024,Ww(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=wo(this._lView),e=this._lView[xi];e!==null&&!n&&km(e,this._lView),kw(this._lView[Y],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=n;let e=wo(this._lView),i=this._lView[xi];i!==null&&!e&&Xw(i,this._lView),Vc(this._lView)}};var rt=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=rA;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=ma(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new Ri(o)}}return t})();function rA(){return Ad(it(),X())}function Ad(t,n){return t.type&4?new rt(n,t,ko(t,n)):null}function Oo(t,n,e,i,r){let o=t.data[n];if(o===null)o=oA(t,n,e,i,r),B_()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=P_();o.injectorIndex=s===null?-1:s.injectorIndex}return Co(o,!0),o}function oA(t,n,e,i,r){let o=sp(),s=ap(),a=s?o:o&&o.parent,l=t.data[n]=aA(t,a,e,n,i,r);return sA(t,l,o,s),l}function sA(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function aA(t,n,e,i,r,o){let s=n?n.injectorIndex:-1,a=0;return ip()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:hp(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function lA(t){let n=t[Wh]??[],i=t[nt][Ne],r=[];for(let o of n)o.data[lw]!==void 0?r.push(o):cA(o,i);t[Wh]=r}function cA(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[aw];for(;e<r;){let o=i.nextSibling;ww(n,i,!1),i=o,e++}}}var dA=()=>null,uA=()=>null;function cd(t,n){return dA(t,n)}function Jw(t,n,e){return uA(t,n,e)}var e0=class{},Rd=class{},qp=class{resolveComponentFactory(n){throw new E(917,!1)}},va=class{static NULL=new qp},ft=class{},Pe=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>fA()}return t})();function fA(){let t=X(),n=it(),e=Kt(n.index,t);return(Kn(e)?e:t)[Ne]}var t0=(()=>{class t{static \u0275prov=b({token:t,providedIn:"root",factory:()=>null})}return t})();var td={},Yp=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let r=this.injector.get(n,td,i);return r!==td||e===td?r:this.parentInjector.get(n,e,i)}};function dd(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)r=Sc(r,a);else if(o==2){let l=a,c=n[++s];i=Sc(i,l+": "+c+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r}function me(t,n=0){let e=X();if(e===null)return R(t,n);let i=it();return Qb(i,e,tt(t),n)}function Hm(){let t="invalid";throw new Error(t)}function n0(t,n,e,i,r){let o=i===null?null:{"":-1},s=r(t,e);if(s!==null){let a=s,l=null,c=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,l,c]=u.resolveHostDirectives(s);break}mA(t,n,e,a,o,l,c)}o!==null&&i!==null&&hA(e,i,o)}function hA(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new E(-301,!1);i.push(n[r],o)}}function pA(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function mA(t,n,e,i,r,o,s){let a=i.length,l=null;for(let h=0;h<a;h++){let p=i[h];l===null&&gn(p)&&(l=p,pA(t,e,h)),Ap(ad(e,n),t,p.type)}wA(e,t.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let h=0;h<a;h++){let p=i[h];p.providersResolver&&p.providersResolver(p)}let c=!1,u=!1,f=Mw(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let h=0;h<a;h++){let p=i[h];if(e.mergedAttrs=So(e.mergedAttrs,p.hostAttrs),vA(t,e,n,f,p),bA(f,p,r),s!==null&&s.has(p)){let[I,A]=s.get(p);e.directiveToIndex.set(p.type,[f,I+e.directiveStart,A+e.directiveStart])}else(o===null||!o.has(p))&&e.directiveToIndex.set(p.type,f);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let w=p.type.prototype;!c&&(w.ngOnChanges||w.ngOnInit||w.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=!0),!u&&(w.ngOnChanges||w.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),u=!0),f++}gA(t,e,o)}function gA(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))wb(0,n,r,i),wb(1,n,r,i),Db(n,i,!1);else{let o=e.get(r);Cb(0,n,o,i),Cb(1,n,o,i),Db(n,i,!0)}}}function wb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(i),i0(n,o)}}function Cb(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),i0(n,s)}}function i0(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function Db(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||xm(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===n){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===n){s??=[],s.push(c[u+1],i[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function vA(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=wi(r.type,!0)),s=new Mr(o,gn(r),me,null);t.blueprint[i]=s,e[i]=s,yA(t,n,i,Mw(t,e,r.hostVars,Lt),r)}function yA(t,n,e,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;_A(s)!=a&&s.push(a),s.push(e,i,o)}}function _A(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function bA(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;gn(n)&&(e[""]=t)}}function wA(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function Um(t,n,e,i,r,o,s,a){let l=n[Y],c=l.consts,u=Ht(c,s),f=Oo(l,t,e,i,u);return o&&n0(l,n,f,Ht(c,a),r),f.mergedAttrs=So(f.mergedAttrs,f.attrs),f.attrs!==null&&dd(f,f.attrs,!1),f.mergedAttrs!==null&&dd(f,f.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,f),f}function zm(t,n){Ub(t,n),Gh(n)&&t.queries.elementEnd(n)}function CA(t,n,e,i,r,o){let s=n.consts,a=Ht(s,r),l=Oo(n,t,e,i,a);if(l.mergedAttrs=So(l.mergedAttrs,l.attrs),o!=null){let c=Ht(s,o);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1)}return l.attrs!==null&&dd(l,l.attrs,!1),l.mergedAttrs!==null&&dd(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}function $m(t){return t!==null&&(typeof t=="function"||typeof t=="object")}function DA(t,n,e){return t[n]=e}function Qt(t,n,e){if(e===Lt)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function EA(t,n,e,i){let r=Qt(t,n,e);return Qt(t,n+1,i)||r}function nd(t,n,e){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&_M(r,o);let s=Qn(t)?Kt(t.index,n):n;Bm(s,5);let a=n[qe],l=Eb(n,a,e,r),c=i.__ngNextListenerFn__;for(;c;)l=Eb(n,a,c,r)&&l,c=c.__ngNextListenerFn__;return l}}function Eb(t,n,e,i){let r=Z(null);try{return Me(be.OutputStart,n,e),e(i)!==!1}catch(o){return HT(t,o),!1}finally{Me(be.OutputEnd,n,e),Z(r)}}function r0(t,n,e,i,r,o,s,a){let l=bo(t),c=!1,u=null;if(!i&&l&&(u=IA(n,e,o,t.index)),u!==null){let f=u.__ngLastListenerFn__||u;f.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,c=!0}else{let f=vn(t,e),h=i?i(f):f;wM(e,h,o,a),i||(a.__ngNativeEl__=f);let p=r.listen(h,o,a);if(!xA(o)){let w=i?I=>i(Zt(I[t.index])):t.index;o0(w,n,e,o,a,p,!1)}}return c}function xA(t){return t.startsWith("animation")||t.startsWith("transition")}function IA(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=n[yo],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function o0(t,n,e,i,r,o,s){let a=n.firstCreatePass?tp(n):null,l=ep(e),c=l.length;l.push(r,o),a&&a.push(i,t,c,(c+1)*(s?-1:1))}function xb(t,n,e,i,r,o){let s=n[e],a=n[Y],c=a.data[e].outputs[i],f=s[c].subscribe(o);o0(t.index,a,n,r,o,f,!0)}var Zp=Symbol("BINDING");function s0(t){return t.debugInfo?.className||t.type.name||null}var ud=class extends va{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=qn(n);return new Ar(e,this.ngModule)}};function SA(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&Ed.SignalBased)!==0};return r&&(o.transform=r),o})}function MA(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function TA(t,n,e){let i=n instanceof ke?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new Yp(e,i):e}function AA(t){let n=t.get(ft,null);if(n===null)throw new E(407,!1);let e=t.get(t0,null),i=t.get(kn,null),r=t.get(xn,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function RA(t,n){let e=a0(t);return _w(n,e,e==="svg"?qh:e==="math"?M_:null)}function a0(t){return(t.selectors[0][0]||"div").toLowerCase()}var Ar=class extends Rd{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=SA(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=MA(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=sT(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,r,o,s){Me(be.DynamicComponentStart);let a=Z(null);try{let l=this.componentDef,c=TA(l,r||this.ngModule,n),u=AA(c),f=u.tracingService;return f&&f.componentCreate?f.componentCreate(s0(l),()=>this.createComponentRef(u,c,e,i,o,s)):this.createComponentRef(u,c,e,i,o,s)}finally{Z(a)}}createComponentRef(n,e,i,r,o,s){let a=this.componentDef,l=kA(r,a,s,o),c=n.rendererFactory.createRenderer(null,a),u=r?AT(c,r,a.encapsulation,e):RA(a,c),f=s?.some(Ib)||o?.some(w=>typeof w!="function"&&w.bindings.some(Ib)),h=Sm(null,l,null,512|Sw(a),null,null,n,c,e,null,uw(u,e,!0));h[Be]=u,$c(h);let p=null;try{let w=Um(Be,h,2,"#host",()=>l.directiveRegistry,!0,0);Cw(c,u,w),Mo(u,h),Td(l,h,w),vm(l,w,h),zm(l,w),i!==void 0&&OA(w,this.ngContentSelectors,i),p=Kt(w.index,h),h[qe]=p[qe],Vm(l,h,null)}catch(w){throw p!==null&&kp(p),kp(h),w}finally{Me(be.DynamicComponentEnd),Wc()}return new fd(this.componentType,h,!!f)}};function kA(t,n,e,i){let r=t?["ng-version","21.2.17"]:aT(n.selectors[0]),o=null,s=null,a=0;if(e)for(let u of e)a+=u[Zp].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let h of f.bindings){a+=h[Zp].requiredVars;let p=u+1;h.create&&(h.targetIdx=p,(o??=[]).push(h)),h.update&&(h.targetIdx=p,(s??=[]).push(h))}}let l=[n];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,h=Tc(f);l.push(h)}return Im(0,null,NA(o,s),1,a,l,null,null,null,[r],null)}function NA(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function Ib(t){let n=t[Zp].kind;return n==="input"||n==="twoWay"}var fd=class extends e0{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Lc(e[Y],Be),this.location=ko(this._tNode,e),this.instance=Kt(this._tNode.index,e)[qe],this.hostView=this.changeDetectorRef=new Ri(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView,o=jm(i,r[Y],r,n,e);this.previousInputValues.set(n,e);let s=Kt(i.index,r);Bm(s,1)}get injector(){return new Sr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function OA(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null)}}var yt=(()=>{class t{static __NG_ELEMENT_ID__=FA}return t})();function FA(){let t=it();return l0(t,X())}var Kp=class t extends yt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return ko(this._hostTNode,this._hostLView)}get injector(){return new Sr(this._hostTNode,this._hostLView)}get parentInjector(){let n=hm(this._hostTNode,this._hostLView);if(Wb(n)){let e=od(n,this._hostLView),i=rd(n),r=e[Y].data[i+8];return new Sr(r,e)}else return new Sr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=Sb(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-$e}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=cd(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,To(this._hostTNode,s)),a}createComponent(n,e,i,r,o,s,a){let l=n&&!YS(n),c;if(l)c=e;else{let A=e||{};c=A.index,i=A.injector,r=A.projectableNodes,o=A.environmentInjector||A.ngModuleRef,s=A.directives,a=A.bindings}let u=l?n:new Ar(qn(n)),f=i||this.parentInjector;if(!o&&u.ngModule==null){let j=(l?f:this.parentInjector).get(ke,null);j&&(o=j)}let h=qn(u.componentType??{}),p=cd(this._lContainer,h?.id??null),w=p?.firstChild??null,I=u.create(f,r,w,o,s,a);return this.insertImpl(I.hostView,c,To(this._hostTNode,p)),I}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let r=n._lView;if(A_(r)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=r[nt],c=new t(l,l[Rt],l[nt]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(e),s=this._lContainer;return ga(s,r,o,i),n.attachToViewContainerRef(),Lh(Cp(s),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=Sb(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=aa(this._lContainer,e);i&&(qs(Cp(this._lContainer),e),Sd(i[Y],i))}detach(n){let e=this._adjustIndex(n,-1),i=aa(this._lContainer,e);return i&&qs(Cp(this._lContainer),e)!=null?new Ri(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function Sb(t){return t[Zs]}function Cp(t){return t[Zs]||(t[Zs]=[])}function l0(t,n){let e,i=n[t.index];return mn(i)?e=i:(e=Zw(i,n,null,t),n[t.index]=e,Mm(n,e)),LA(e,n,t,i),new Kp(e,t,n)}function PA(t,n){let e=t[Ne],i=e.createComment(""),r=vn(n,t),o=e.parentNode(r);return ld(e,o,i,e.nextSibling(r),!1),i}var LA=BA,jA=()=>!1;function VA(t,n,e){return jA(t,n,e)}function BA(t,n,e,i){if(t[Si])return;let r;e.type&8?r=Zt(i):r=PA(n,e),t[Si]=r}var Qp=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},Xp=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone())}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)Gm(n,e).matches!==null&&this.queries[e].setDirty()}},hd=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=WA(n):this.predicate=n}},Jp=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},em=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,HA(e,o)),this.matchTNodeWithReadOption(n,e,ed(e,n,o,!1,!1))}else i===rt?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,ed(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===k||r===yt||r===rt&&e.type&4)this.addMatch(e.index,-2);else{let o=ed(e,n,r,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function HA(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function UA(t,n){return t.type&11?ko(t,n):t.type&4?Ad(t,n):null}function zA(t,n,e,i){return e===-1?UA(n,t):e===-2?$A(t,n,i):ra(t,t[Y],e,n)}function $A(t,n,e){if(e===k)return ko(n,t);if(e===rt)return Ad(n,t);if(e===yt)return l0(n,t)}function c0(t,n,e,i){let r=n[On].queries[i];if(r.matches===null){let o=t.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let u=o[c];a.push(zA(n,u,s[l+1],e.metadata.read))}}r.matches=a}return r.matches}function tm(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let s=c0(t,n,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else{let c=o[a+1],u=n[-l];for(let f=$e;f<u.length;f++){let h=u[f];h[xi]===h[nt]&&tm(h[Y],h,c,i)}if(u[Dr]!==null){let f=u[Dr];for(let h=0;h<f.length;h++){let p=f[h];tm(p[Y],p,c,i)}}}}}return i}function Wm(t,n){return t[On].queries[n].queryList}function d0(t,n,e){let i=new wn((e&4)===4);return N_(t,n,i,i.destroy),(n[On]??=new Xp).queries.push(new Qp(i))-1}function u0(t,n,e){let i=Fe();return i.firstCreatePass&&(h0(i,new hd(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),d0(i,X(),n)}function f0(t,n,e,i){let r=Fe();if(r.firstCreatePass){let o=it();h0(r,new hd(n,e,i),o.index),GA(r,t),(e&2)===2&&(r.staticContentQueries=!0)}return d0(r,X(),e)}function WA(t){return t.split(",").map(n=>n.trim())}function h0(t,n,e){t.queries===null&&(t.queries=new Jp),t.queries.track(new em(n,e))}function GA(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function Gm(t,n){return t.queries.getByIndex(n)}function p0(t,n){let e=t[Y],i=Gm(e,n);return i.crossesNgTemplate?tm(e,t,n,[]):c0(e,t,i,n)}function m0(t,n,e){let i,r=Ms(()=>{i._dirtyCounter();let o=qA(i,t);if(n&&o===void 0)throw new E(-951,!1);return o});return i=r[Je],i._dirtyCounter=Ce(0),i._flatValue=void 0,r}function qm(t){return m0(!0,!1,t)}function Ym(t){return m0(!0,!0,t)}function g0(t,n){let e=t[Je];e._lView=X(),e._queryIndex=n,e._queryList=Wm(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function qA(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[te]&4)return n?void 0:Dt;let r=Wm(e,i),o=p0(e,i);return r.reset(o,ew),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}var Ln=class{},kd=class{};var pd=class extends Ln{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new ud(this);constructor(n,e,i,r=!0){super(),this.ngModuleType=n,this._parent=e;let o=Oh(n);this._bootstrapComponents=Ew(o.bootstrap),this._r3Injector=pp(n,e,[{provide:Ln,useValue:this},{provide:va,useValue:this.componentFactoryResolver},...i],zs(n),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},md=class extends kd{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new pd(this.moduleType,n,[])}};var la=class extends Ln{injector;componentFactoryResolver=new ud(this);instance=null;constructor(n){super();let e=new mr([...n.providers,{provide:Ln,useValue:this},{provide:va,useValue:this.componentFactoryResolver}],n.parent||vo(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function ya(t,n,e=null){return new la({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var YA=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=Bh(!1,e.type),r=i.length>0?ya([i],this._injector,""):null;this.cachedInjectors.set(e,r)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=b({token:t,providedIn:"environment",factory:()=>new t(R(ke))})}return t})();function M(t){return da(()=>{let n=v0(t),e=q(g({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===mm.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(YA).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||Cn.Emulated,styles:t.styles||Dt,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&ki("NgStandalone"),y0(e);let i=t.dependencies;return e.directiveDefs=Mb(i,ZA),e.pipeDefs=Mb(i,m_),e.id=XA(e),e})}function ZA(t){return qn(t)||Tc(t)}function P(t){return da(()=>({type:t.type,bootstrap:t.bootstrap||Dt,declarations:t.declarations||Dt,imports:t.imports||Dt,exports:t.exports||Dt,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function KA(t,n){if(t==null)return fn;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=Ed.None,l=null),e[o]=[i,a,l],n[o]=s}return e}function QA(t){if(t==null)return fn;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function L(t){return da(()=>{let n=v0(t);return y0(n),n})}function Nd(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function v0(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||fn,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||Dt,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:KA(t.inputs,n),outputs:QA(t.outputs),debugInfo:null}}function y0(t){t.features?.forEach(n=>n(t))}function Mb(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o)}return i}:null}function XA(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function Zm(t){let n=e=>{let i=Array.isArray(t);e.hostDirectives===null?(e.resolveHostDirectives=JA,e.hostDirectives=i?t.map(nm):[t]):i?e.hostDirectives.unshift(...t.map(nm)):e.hostDirectives.unshift(t)};return n.ngInherit=!0,n}function JA(t){let n=[],e=!1,i=null,r=null;for(let o=0;o<t.length;o++){let s=t[o];if(s.hostDirectives!==null){let a=n.length;i??=new Map,r??=new Map,_0(s,n,i),r.set(s,[a,n.length-1])}o===0&&gn(s)&&(e=!0,n.push(s))}for(let o=e?1:0;o<t.length;o++)n.push(t[o]);return[n,i,r]}function _0(t,n,e){if(t.hostDirectives!==null)for(let i of t.hostDirectives)if(typeof i=="function"){let r=i();for(let o of r)Tb(nm(o),n,e)}else Tb(i,n,e)}function Tb(t,n,e){let i=Tc(t.directive);eR(i.declaredInputs,t.inputs),_0(i,n,e),e.set(i,t),n.push(i)}function nm(t){return typeof t=="function"?{directive:tt(t),inputs:fn,outputs:fn}:{directive:tt(t.directive),inputs:Ab(t.inputs),outputs:Ab(t.outputs)}}function Ab(t){if(t===void 0||t.length===0)return fn;let n={};for(let e=0;e<t.length;e+=2)n[t[e]]=t[e+1];return n}function eR(t,n){for(let e in n)if(n.hasOwnProperty(e)){let i=n[e],r=t[e];t[i]=r}}function tR(t){return Object.getPrototypeOf(t.prototype).constructor}function De(t){let n=tR(t.type),e=!0,i=[t];for(;n&&n!==Function.prototype&&n!==Object.prototype;){let r,o=Object.hasOwn(n,Ws)?n[Ws]:void 0,s=Object.hasOwn(n,Gs)?n[Gs]:void 0;if(gn(t))r=o??s;else{if(o)throw new E(903,!1);r=s}if(r){if(e){i.push(r);let l=t;l.inputs=Dp(t.inputs),l.declaredInputs=Dp(t.declaredInputs),l.outputs=Dp(t.outputs);let c=r.hostBindings;c&&sR(t,c);let u=r.viewQuery,f=r.contentQueries;if(u&&rR(t,u),f&&oR(t,f),nR(t,r),p_(t.outputs,r.outputs),gn(r)&&r.data.animation){let h=t.data;h.animation=(h.animation||[]).concat(r.data.animation)}}let a=r.features;if(a)for(let l=0;l<a.length;l++){let c=a[l];c&&c.ngInherit&&c(t),c===De&&(e=!1)}}n=Object.getPrototypeOf(n)}iR(i)}function nR(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function iR(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=So(r.hostAttrs,e=So(e,r.hostAttrs))}}function Dp(t){return t===fn?{}:t===Dt?[]:t}function rR(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r)}:t.viewQuery=n}function oR(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o)}:t.contentQueries=n}function sR(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r)}:t.hostBindings=n}function b0(t,n,e,i,r,o,s,a){if(e.firstCreatePass){t.mergedAttrs=So(t.mergedAttrs,t.attrs);let u=t.tView=Im(2,t,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),u.queries=e.queries.embeddedTView(t))}a&&(t.flags|=a),Co(t,!1);let l=lR(e,n,t,i);Gc()&&Nm(e,n,l,t),Mo(l,n);let c=Zw(l,n,l,t);n[i+Be]=c,Mm(n,c),VA(c,t,n)}function aR(t,n,e,i,r,o,s,a,l,c,u){let f=e+Be,h;return n.firstCreatePass?(h=Oo(n,f,4,s||null,a||null),Bc()&&n0(n,t,h,Ht(n.consts,c),Fm),Ub(n,h)):h=n.data[f],b0(h,t,n,e,i,r,o,l),bo(h)&&Td(n,t,h),c!=null&&pa(t,h,u),h}function Ao(t,n,e,i,r,o,s,a,l,c,u){let f=e+Be,h;if(n.firstCreatePass){if(h=Oo(n,f,4,s||null,a||null),c!=null){let p=Ht(n.consts,c);h.localNames=[];for(let w=0;w<p.length;w+=2)h.localNames.push(p[w],-1)}}else h=n.data[f];return b0(h,t,n,e,i,r,o,l),c!=null&&pa(t,h,u),h}function ht(t,n,e,i,r,o,s,a){let l=X(),c=Fe(),u=Ht(c.consts,o);return aR(l,c,t,n,e,i,r,u,void 0,s,a),ht}function Od(t,n,e,i,r,o,s,a){let l=X(),c=Fe(),u=Ht(c.consts,o);return Ao(l,c,t,n,e,i,r,u,void 0,s,a),Od}var lR=cR;function cR(t,n,e,i){return Js(!0),n[Ne].createComment("")}var Fd=(()=>{class t{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function Ni(t){return typeof t=="function"&&t[Je]!==void 0}function Km(t){return Ni(t)&&typeof t.set=="function"}var Qm=new v("");function Oi(t){return!!t&&typeof t.then=="function"}function Xm(t){return!!t&&typeof t.subscribe=="function"}var Pd=new v("");function Ld(t){return dt([{provide:Pd,multi:!0,useValue:t}])}var Jm=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=d(Pd,{optional:!0})??[];injector=d(F);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=ut(this.injector,r);if(Oi(o))e.push(o);else if(Xm(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});e.push(s)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(r=>{this.reject(r)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),jd=new v("");function w0(){Jf(()=>{let t="";throw new E(600,t)})}function C0(t){return t.isBoundToModule}var dR=10;var _t=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=d(yn);afterRenderManager=d(Id);zonelessEnabled=d(ea);rootEffectScheduler=d(qc);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new D;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=d(Xn);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(T(e=>!e))}constructor(){d(xn,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=d(ke);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=F.NULL){return this._injector.get(B).run(()=>{Me(be.BootstrapComponentStart);let s=e instanceof Rd;if(!this._injector.get(Jm).done){let w="";throw new E(405,w)}let l;s?l=e:l=this._injector.get(va).resolveComponentFactory(e),this.componentTypes.push(l.componentType);let c=C0(l)?void 0:this._injector.get(Ln),u=i||l.selector,f=l.create(r,[],u,c),h=f.location.nativeElement,p=f.injector.get(Qm,null);return p?.registerApplication(h),f.onDestroy(()=>{this.detachView(f.hostView),ia(this.components,f),p?.unregisterApplication(h)}),this._loadComponent(f),Me(be.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Me(be.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(xd.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw Me(be.ChangeDetectionEnd),new E(101,!1);let e=Z(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Z(e),this.afterTick.next(),Me(be.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(ft,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<dR;){Me(be.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{Me(be.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Ks(r))continue;let o=i&&!this.zonelessEnabled?0:1;Ww(r,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Ks(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;ia(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(e),this._injector.get(jd,[]).forEach(r=>r(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>ia(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new E(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ia(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function le(t,n,e,i){let r=X(),o=Mi();if(Qt(r,o,n)){let s=Fe(),a=Xs();jT(a,r,t,n,e,i)}return le}var im=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s)}else this.attach(i,o)}move(n,e){this.attach(e,this.detach(n))}};function Ep(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function uR(t,n,e,i){let r,o,s=0,a=t.length-1,l=void 0;if(Array.isArray(n)){Z(i);let c=n.length-1;for(Z(null);s<=a&&s<=c;){let u=t.at(s),f=n[s],h=Ep(s,u,s,f,e);if(h!==0){h<0&&t.updateValue(s,f),s++;continue}let p=t.at(a),w=n[c],I=Ep(a,p,c,w,e);if(I!==0){I<0&&t.updateValue(a,w),a--,c--;continue}let A=e(s,u),j=e(a,p),Ee=e(s,f);if(Object.is(Ee,j)){let lt=e(c,w);Object.is(lt,A)?(t.swap(s,a),t.updateValue(a,w),c--,a--):t.move(a,s),t.updateValue(s,f),s++;continue}if(r??=new gd,o??=kb(t,s,a,e),rm(t,r,s,Ee))t.updateValue(s,f),s++,a++;else if(o.has(Ee))r.set(A,t.detach(s)),a--;else{let lt=t.create(s,n[s]);t.attach(s,lt),s++,a++}}for(;s<=c;)Rb(t,r,e,s,n[s]),s++}else if(n!=null){Z(i);let c=n[Symbol.iterator]();Z(null);let u=c.next();for(;!u.done&&s<=a;){let f=t.at(s),h=u.value,p=Ep(s,f,s,h,e);if(p!==0)p<0&&t.updateValue(s,h),s++,u=c.next();else{r??=new gd,o??=kb(t,s,a,e);let w=e(s,h);if(rm(t,r,s,w))t.updateValue(s,h),s++,a++,u=c.next();else if(!o.has(w))t.attach(s,t.create(s,h)),s++,a++,u=c.next();else{let I=e(s,f);r.set(I,t.detach(s)),a--}}}for(;!u.done;)Rb(t,r,e,t.length,u.value),u=c.next()}for(;s<=a;)t.destroy(t.detach(a--));r?.forEach(c=>{t.destroy(c)})}function rm(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function Rb(t,n,e,i,r){if(rm(t,n,i,e(i,r)))t.updateValue(i,r);else{let o=t.create(i,r);t.attach(i,o)}}function kb(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var gd=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e)}}};function H(t,n,e,i,r,o,s,a){ki("NgControlFlow");let l=X(),c=Fe(),u=Ht(c.consts,o);return Ao(l,c,t,n,e,i,r,u,256,s,a),eg}function eg(t,n,e,i,r,o,s,a){ki("NgControlFlow");let l=X(),c=Fe(),u=Ht(c.consts,o);return Ao(l,c,t,n,e,i,r,u,512,s,a),eg}function U(t,n){ki("NgControlFlow");let e=X(),i=Mi(),r=e[i]!==Lt?e[i]:-1,o=r!==-1?vd(e,Be+r):void 0,s=0;if(Qt(e,i,t)){let a=Z(null);try{if(o!==void 0&&Qw(o,s),t!==-1){let l=Be+t,c=vd(e,l),u=lm(e[Y],l),f=Jw(c,u,e),h=ma(e,u,n,{dehydratedView:f});ga(c,h,s,To(u,f))}}finally{Z(a)}}else if(o!==void 0){let a=Kw(o,s);a!==void 0&&(a[qe]=n)}}var om=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-$e}};function _a(t){return t}function tg(t,n){return n}var sm=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function Fi(t,n,e,i,r,o,s,a,l,c,u,f,h){ki("NgControlFlow");let p=X(),w=Fe(),I=l!==void 0,A=X(),j=a?s.bind(A[kt][qe]):s,Ee=new sm(I,j);A[Be+t]=Ee,Ao(p,w,t+1,n,e,i,r,Ht(w.consts,o),256),I&&Ao(p,w,t+2,l,c,u,f,Ht(w.consts,h),512)}var am=class extends im{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-$e}at(n){return this.getLView(n)[qe].$implicit}attach(n,e){let i=e[_r];this.needsIndexUpdate||=n!==this.length,ga(this.lContainer,e,n,To(this.templateTNode,i)),fR(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,hR(this.lContainer,n),pR(this.lContainer,n)}create(n,e){let i=cd(this.lContainer,this.templateTNode.tView.ssrId);return ma(this.hostLView,this.templateTNode,new om(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Sd(n[Y],n)}updateValue(n,e){this.getLView(n)[qe].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[qe].$index=n}getLView(n){return mR(this.lContainer,n)}};function Pi(t){let n=Z(null),e=Fn();try{let i=X(),r=i[Y],o=i[e],s=e+1,a=vd(i,s);if(o.liveCollection===void 0){let c=lm(r,s);o.liveCollection=new am(a,i,c)}else o.liveCollection.reset();let l=o.liveCollection;if(uR(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=Mi(),u=l.length===0;if(Qt(i,c,u)){let f=e+2,h=vd(i,f);if(u){let p=lm(r,f),w=Jw(h,p,i),I=ma(i,p,void 0,{dehydratedView:w});ga(h,I,0,To(p,w))}else r.firstUpdatePass&&lA(h),Qw(h,0)}}}finally{Z(n)}}function vd(t,n){return t[n]}function fR(t,n){if(t.length<=$e)return;let e=$e+n,i=t[e],r=i?i[Ii]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[Yn];gT(o,r),Tr.delete(i[Zn]),r.detachedLeaveAnimationFns=void 0}}function hR(t,n){if(t.length<=$e)return;let e=$e+n,i=t[e],r=i?i[Ii]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function pR(t,n){return aa(t,n)}function mR(t,n){return Kw(t,n)}function lm(t,n){return Lc(t,n)}function de(t,n,e){let i=X(),r=Mi();if(Qt(i,r,n)){let o=Fe(),s=Xs();jw(s,i,t,n,i[Ne],e)}return de}function cm(t,n,e,i,r){jm(n,t,e,r?"class":"style",i)}function y(t,n,e,i){let r=X(),o=r[Y],s=t+Be,a=o.firstCreatePass?Um(s,r,2,n,Fm,Bc(),e,i):o.data[s];if(Qn(a)){let l=r[pn].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(s0(c),()=>(Nb(t,n,r,a,i),y))}}return Nb(t,n,r,a,i),y}function Nb(t,n,e,i,r){if(Pm(i,e,t,n,D0),bo(i)){let o=e[Y];Td(o,e,i),vm(o,i,e)}r!=null&&pa(e,i)}function _(){let t=Fe(),n=it(),e=Lm(n);return t.firstCreatePass&&zm(t,e),rp(e)&&op(),np(),e.classesWithoutHost!=null&&eM(e)&&cm(t,e,X(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&tM(e)&&cm(t,e,X(),e.stylesWithoutHost,!1),_}function ge(t,n,e,i){return y(t,n,e,i),_(),ge}function pt(t,n,e,i){let r=X(),o=r[Y],s=t+Be,a=o.firstCreatePass?CA(s,o,2,n,e,i):o.data[s];return Pm(a,r,t,n,D0),i!=null&&pa(r,a),pt}function bt(){let t=it(),n=Lm(t);return rp(n)&&op(),np(),bt}function jt(t,n,e,i){return pt(t,n,e,i),bt(),jt}var D0=(t,n,e,i,r)=>(Js(!0),_w(n[Ne],i,hp()));function Xt(t,n,e){let i=X(),r=i[Y],o=t+Be,s=r.firstCreatePass?Um(o,i,8,"ng-container",Fm,Bc(),n,e):r.data[o];if(Pm(s,i,t,"ng-container",gR),bo(s)){let a=i[Y];Td(a,i,s),vm(a,s,i)}return e!=null&&pa(i,s),Xt}function Jt(){let t=Fe(),n=it(),e=Lm(n);return t.firstCreatePass&&zm(t,e),Jt}var gR=(t,n,e,i,r)=>(Js(!0),qM(n[Ne],""));function Vt(){return X()}function Nt(t,n,e){let i=X(),r=Mi();if(Qt(i,r,n)){let o=Fe(),s=Xs();Vw(s,i,t,n,i[Ne],e)}return Nt}var ba="en-US";var vR=ba;function E0(t){typeof t=="string"&&(vR=t.toLowerCase().replace(/_/g,"-"))}function ce(t,n,e){let i=X(),r=Fe(),o=it();return x0(r,i,i[Ne],o,t,n,e),ce}function Vd(t,n,e){let i=X(),r=Fe(),o=it();return(o.type&3||e)&&r0(o,r,i,e,i[Ne],t,n,nd(o,i,n)),Vd}function x0(t,n,e,i,r,o,s){let a=!0,l=null;if((i.type&3||s)&&(l??=nd(i,n,o),r0(i,t,n,s,e,r,o,l)&&(a=!1)),a){let c=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let f=0;f<u.length;f+=2){let h=u[f],p=u[f+1];l??=nd(i,n,o),xb(i,n,h,p,r,l)}if(c&&c.length)for(let f of c)l??=nd(i,n,o),xb(i,n,f,r,r,l)}}function S(t=1){return q_(t)}function yR(t,n){let e=null,i=tT(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?Iw(t,o,!0):rT(i,o))return r}return e}function ue(t){let n=X()[kt][Rt];if(!n.projection){let e=t?t.length:1,i=n.projection=w_(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=t?yR(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o)}o=o.next}}}function V(t,n=0,e,i,r,o){let s=X(),a=Fe(),l=i?t+1:null;l!==null&&Ao(s,a,l,i,r,o,null,e);let c=Oo(a,Be+t,16,null,e||null);c.projection===null&&(c.projection=n),lp();let f=!s[_r]||ip();s[kt][Rt].projection[c.projection]===null&&l!==null?_R(s,a,l):f&&!wd(c)&&ST(a,s,c)}function _R(t,n,e){let i=Be+e,r=n.data[i],o=t[i],s=cd(o,r.tView.ssrId),a=ma(t,r,void 0,{dehydratedView:s});ga(o,a,0,To(r,s))}function Et(t,n,e,i){return f0(t,n,e,i),Et}function Ye(t,n,e){return u0(t,n,e),Ye}function J(t){let n=X(),e=Fe(),i=zc();Qs(i+1);let r=Gm(e,i);if(t.dirty&&T_(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else{let o=p0(n,i);t.reset(o,ew),t.notifyOnChanges()}return!0}return!1}function ee(){return Wm(X(),zc())}function Bd(t,n,e,i,r){return g0(n,f0(t,e,i,r)),Bd}function Hd(t,n,e,i){return g0(t,u0(n,e,i)),Hd}function Ud(t=1){Qs(zc()+t)}function en(t){let n=L_();return Zh(n,Be+t)}function Qc(t,n){return t<<17|n<<2}function Rr(t){return t>>17&32767}function bR(t){return(t&2)==2}function wR(t,n){return t&131071|n<<17}function dm(t){return t|2}function Ro(t){return(t&131068)>>2}function xp(t,n){return t&-131069|n<<2}function CR(t){return(t&1)===1}function um(t){return t|1}function DR(t,n,e,i,r,o){let s=o?n.classBindings:n.styleBindings,a=Rr(s),l=Ro(s);t[i]=e;let c=!1,u;if(Array.isArray(e)){let f=e;u=f[1],(u===null||go(f,u)>0)&&(c=!0)}else u=e;if(r)if(l!==0){let h=Rr(t[a+1]);t[i+1]=Qc(h,a),h!==0&&(t[h+1]=xp(t[h+1],i)),t[a+1]=wR(t[a+1],i)}else t[i+1]=Qc(a,0),a!==0&&(t[a+1]=xp(t[a+1],i)),a=i;else t[i+1]=Qc(l,0),a===0?a=i:t[l+1]=xp(t[l+1],i),l=i;c&&(t[i+1]=dm(t[i+1])),Ob(t,u,i,!0),Ob(t,u,i,!1),ER(n,u,t,i,o),s=Qc(a,l),o?n.classBindings=s:n.styleBindings=s}function ER(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&go(o,n)>=0&&(e[i+1]=um(e[i+1]))}function Ob(t,n,e,i){let r=t[e+1],o=n===null,s=i?Rr(r):Ro(r),a=!1;for(;s!==0&&(a===!1||o);){let l=t[s],c=t[s+1];xR(l,n)&&(a=!0,t[s+1]=i?um(c):dm(c)),s=i?Rr(c):Ro(c)}a&&(t[e+1]=i?dm(r):um(r))}function xR(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?go(t,n)>=0:!1}var bn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function IR(t){return t.substring(bn.key,bn.keyEnd)}function SR(t){return MR(t),I0(t,S0(t,0,bn.textEnd))}function I0(t,n){let e=bn.textEnd;return e===n?-1:(n=bn.keyEnd=TR(t,bn.key=n,e),S0(t,n,e))}function MR(t){bn.key=0,bn.keyEnd=0,bn.value=0,bn.valueEnd=0,bn.textEnd=t.length}function S0(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function TR(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function ii(t,n,e){return M0(t,n,e,!1),ii}function $(t,n){return M0(t,n,null,!0),$}function Ot(t){RR(LR,AR,t,!0)}function AR(t,n){for(let e=SR(n);e>=0;e=I0(n,e))Nc(t,IR(n),!0)}function M0(t,n,e,i){let r=X(),o=Fe(),s=Hc(2);if(o.firstUpdatePass&&A0(o,t,s,i),n!==Lt&&Qt(r,s,n)){let a=o.data[Fn()];R0(o,a,r,r[Ne],t,r[s+1]=VR(n,e),i,s)}}function RR(t,n,e,i){let r=Fe(),o=Hc(2);r.firstUpdatePass&&A0(r,null,o,i);let s=X();if(e!==Lt&&Qt(s,o,e)){let a=r.data[Fn()];if(k0(a,i)&&!T0(r,o)){let l=i?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(e=Sc(l,e||"")),cm(r,a,s,e,i)}else jR(r,a,s,s[Ne],s[o+1],s[o+1]=PR(t,n,e),i,o)}}function T0(t,n){return n>=t.expandoStartIndex}function A0(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Fn()],s=T0(t,e);k0(o,i)&&n===null&&!s&&(n=!1),n=kR(r,o,n,i),DR(r,o,n,e,s,i)}}function kR(t,n,e,i){let r=z_(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=Ip(null,t,n,e,i),e=ca(e,n.attrs,i),o=null);else{let s=n.directiveStylingLast;if(s===-1||t[s]!==r)if(e=Ip(r,t,n,e,i),o===null){let l=NR(t,n,i);l!==void 0&&Array.isArray(l)&&(l=Ip(null,t,n,l[1],i),l=ca(l,n.attrs,i),OR(t,n,i,l))}else o=FR(t,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function NR(t,n,e){let i=e?n.classBindings:n.styleBindings;if(Ro(i)!==0)return t[Rr(i)]}function OR(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[Rr(r)]=i}function FR(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=ca(i,s,e)}return ca(i,n.attrs,e)}function Ip(t,n,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=n[a],i=ca(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(e.directiveStylingLast=a),i}function ca(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Nc(t,s,e?!0:n[++o]))}return t===void 0?null:t}function PR(t,n,e){if(e==null||e==="")return Dt;let i=[],r=En(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],!0);else if(r instanceof Set)for(let o of r)t(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function LR(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Nc(t,i,e)}function jR(t,n,e,i,r,o,s,a){r===Lt&&(r=Dt);let l=0,c=0,u=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;u!==null||f!==null;){let h=l<r.length?r[l+1]:void 0,p=c<o.length?o[c+1]:void 0,w=null,I;u===f?(l+=2,c+=2,h!==p&&(w=f,I=p)):f===null||u!==null&&u<f?(l+=2,w=u):(c+=2,w=f,I=p),w!==null&&R0(t,n,e,i,w,I,s,a),u=l<r.length?r[l]:null,f=c<o.length?o[c]:null}}function R0(t,n,e,i,r,o,s,a){if(!(n.type&3))return;let l=t.data,c=l[a+1],u=CR(c)?Fb(l,n,e,r,Ro(c),s):void 0;if(!yd(u)){yd(o)||bR(c)&&(o=Fb(l,null,e,r,a,s));let f=Yh(Fn(),e);TT(i,s,f,r,o)}}function Fb(t,n,e,i,r,o){let s=n===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,f=u===null,h=e[r+1];h===Lt&&(h=f?Dt:void 0);let p=f?Oc(h,i):u===i?h:void 0;if(c&&!yd(p)&&(p=Oc(l,i)),yd(p)&&(a=p,s))return a;let w=t[r+1];r=s?Rr(w):Ro(w)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(a=Oc(l,i))}return a}function yd(t){return t!==void 0}function VR(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=zs(En(t)))),t}function k0(t,n){return(t.flags&(n?8:16))!==0}function C(t,n=""){let e=X(),i=Fe(),r=t+Be,o=i.firstCreatePass?Oo(i,r,1,n,null):i.data[r],s=BR(i,e,o,n);e[r]=s,Gc()&&Nm(i,e,s,o),Co(o,!1)}var BR=(t,n,e,i)=>(Js(!0),WM(n[Ne],i));function HR(t,n,e,i=""){return Qt(t,Mi(),e)?n+vr(e)+i:Lt}function UR(t,n,e,i,r,o=""){let s=j_(),a=EA(t,s,e,r);return Hc(2),a?n+vr(e)+i+vr(r)+o:Lt}function fe(t){return K("",t),fe}function K(t,n,e){let i=X(),r=HR(i,t,n,e);return r!==Lt&&N0(i,Fn(),r),K}function zd(t,n,e,i,r){let o=X(),s=UR(o,t,n,e,i,r);return s!==Lt&&N0(o,Fn(),s),zd}function N0(t,n,e){let i=Yh(n,t);GM(t[Ne],i,e)}function wa(t,n,e){Km(n)&&(n=n());let i=X(),r=Mi();if(Qt(i,r,n)){let o=Fe(),s=Xs();jw(s,i,t,n,i[Ne],e)}return wa}function $d(t,n){let e=Km(t);return e&&t.set(n),e}function Ca(t,n){let e=X(),i=Fe(),r=it();return x0(i,e,e[Ne],r,t,n),Ca}function Pb(t,n,e){let i=Fe();i.firstCreatePass&&O0(n,i.data,i.blueprint,gn(t),e)}function O0(t,n,e,i,r){if(t=tt(t),Array.isArray(t))for(let o=0;o<t.length;o++)O0(t[o],n,e,i,r);else{let o=Fe(),s=X(),a=it(),l=pr(t)?t:tt(t.provide),c=Uh(t),u=a.providerIndexes&1048575,f=a.directiveStart,h=a.providerIndexes>>20;if(pr(t)||!t.multi){let p=new Mr(c,r,me,null),w=Mp(l,n,r?u:u+h,f);w===-1?(Ap(ad(a,s),o,l),Sp(o,t,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(p),s.push(p)):(e[w]=p,s[w]=p)}else{let p=Mp(l,n,u+h,f),w=Mp(l,n,u,u+h),I=p>=0&&e[p],A=w>=0&&e[w];if(r&&!A||!r&&!I){Ap(ad(a,s),o,l);let j=WR(r?$R:zR,e.length,r,i,c,t);!r&&A&&(e[w].providerFactory=j),Sp(o,t,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),e.push(j),s.push(j)}else{let j=F0(e[r?w:p],c,!r&&i);Sp(o,t,p>-1?p:w,j)}!r&&i&&A&&e[w].componentProviders++}}}function Sp(t,n,e,i){let r=pr(n),o=x_(n);if(r||o){let l=(o?tt(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let u=c.indexOf(e);u===-1?c.push(e,[i,l]):c[u+1].push(i,l)}else c.push(e,l)}}}function F0(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function Mp(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return-1}function zR(t,n,e,i,r){return fm(this.multi,[])}function $R(t,n,e,i,r){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=ra(i,i[Y],this.providerFactory.index,r);s=l.slice(0,a),fm(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],fm(o,s);return s}function fm(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function WR(t,n,e,i,r,o){let s=new Mr(t,e,me,null);return s.multi=[],s.index=n,s.componentProviders=0,F0(s,r,i&&!e),s}function Le(t,n){return e=>{e.providersResolver=(i,r)=>Pb(i,r?r(t):t,!1),n&&(e.viewProvidersResolver=(i,r)=>Pb(i,r?r(n):n,!0))}}function Nr(t,n,e){return P0(X(),dp(),t,n,e)}function GR(t,n){let e=t[n];return e===Lt?void 0:e}function P0(t,n,e,i,r,o){let s=n+e;return Qt(t,s,r)?DA(t,s+1,o?i.call(o,r):i(r)):GR(t,s+1)}function ri(t,n){let e=Fe(),i,r=t+Be;e.firstCreatePass?(i=qR(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=wi(i.type,!0)),s,a=At(me);try{let l=sd(!1),c=o();return sd(l),Kh(e,X(),r,c),c}finally{At(a)}}function qR(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function oi(t,n,e){let i=t+Be,r=X(),o=Zh(r,i);return YR(r,i)?P0(r,dp(),n,o.transform,e,o):o.transform(e)}function YR(t,n){return t[Y].data[n].pure}function ng(t,n){return Ad(t,n)}var _d=class{ngModuleFactory;componentFactories;constructor(n,e){this.ngModuleFactory=n,this.componentFactories=e}},ig=(()=>{class t{compileModuleSync(e){return new md(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let i=this.compileModuleSync(e),r=Oh(e),o=Ew(r.declarations).reduce((s,a)=>{let l=qn(a);return l&&s.push(new Ar(l)),s},[]);return new _d(i,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var L0=(()=>{class t{applicationErrorHandler=d(yn);appRef=d(_t);taskService=d(Xn);ngZone=d(B);zonelessEnabled=d(ea);tracing=d(xn,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new he;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Hs):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(d(yp,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Q_:mp;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Hs+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function j0(){return[{provide:kn,useExisting:L0},{provide:B,useClass:Us},{provide:ea,useValue:!0}]}function ZR(){return typeof $localize<"u"&&$localize.locale||ba}var Wd=new v("",{factory:()=>d(Wd,{optional:!0,skipSelf:!0})||ZR()});function st(t){return c_(t)}function Ut(t,n){return Ms(t,n?.equal)}var W0=Symbol("InputSignalNode#UNSET"),uk=q(g({},Ts),{transformFn:void 0,applyValueToInputSignal(t,n){ro(t,n)}});function G0(t,n){let e=Object.create(uk);e.value=t,e.transformFn=n?.transform;function i(){if(er(e),e.value===W0){let r=null;throw new E(-950,r)}return e.value}return i[Je]=e,i}var si=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>pm(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function V0(t,n){return G0(t,n)}function fk(t){return G0(W0,t)}var q0=(V0.required=fk,V0);function B0(t,n){return qm(n)}function hk(t,n){return Ym(n)}var Ea=(B0.required=hk,B0);function H0(t,n){return qm(n)}function pk(t,n){return Ym(n)}var Y0=(H0.required=pk,H0);var og=new v(""),mk=new v("");function Da(t){return!t.moduleRef}function gk(t){let n=Da(t)?t.r3Injector:t.moduleRef.injector,e=n.get(B);return e.run(()=>{Da(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(yn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i})}),Da(t)){let o=()=>n.destroy(),s=t.platformInjector.get(og);s.add(o),n.onDestroy(()=>{r.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(og);s.add(o),t.moduleRef.onDestroy(()=>{ia(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o)})}return yk(i,e,()=>{let o=n.get(Xn),s=o.add(),a=n.get(Jm);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(Wd,ba);if(E0(l||ba),!n.get(mk,!0))return Da(t)?n.get(_t):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Da(t)){let u=n.get(_t);return t.rootComponent!==void 0&&u.bootstrap(t.rootComponent),u}else return vk?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(s)})})})}var vk;function yk(t,n,e){try{let i=e();return Oi(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var Gd=null;function _k(t=[],n){return F.create({name:n,providers:[{provide:Ys,useValue:"platform"},{provide:og,useValue:new Set([()=>Gd=null])},...t]})}function bk(t=[]){if(Gd)return Gd;let n=_k(t);return Gd=n,w0(),wk(n),n}function wk(t){let n=t.get(bd,null);ut(t,()=>{n?.forEach(e=>e())})}function xa(){return!1}var Ck=1e4;var e9=Ck-1e3;var Te=(()=>{class t{static __NG_ELEMENT_ID__=Dk}return t})();function Dk(t){return Ek(it(),X(),(t&16)===16)}function Ek(t,n,e){if(Qn(t)&&!e){let i=Kt(t.index,n);return new Ri(i,i)}else if(t.type&175){let i=n[kt];return new Ri(i,n)}return null}var sg=class{supports(n){return n instanceof Map||$m(n)}create(){return new ag}},ag=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(n){let e;for(e=this._mapHead;e!==null;e=e._next)n(e)}forEachPreviousItem(n){let e;for(e=this._previousMapHead;e!==null;e=e._nextPrevious)n(e)}forEachChangedItem(n){let e;for(e=this._changesHead;e!==null;e=e._nextChanged)n(e)}forEachAddedItem(n){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)n(e)}forEachRemovedItem(n){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)n(e)}diff(n){if(!n)n=new Map;else if(!(n instanceof Map||$m(n)))throw new E(900,!1);return this.check(n)?this:null}check(n){this._reset();let e=this._mapHead;if(this._appendAfter=null,this._forEach(n,(i,r)=>{if(e&&e.key===r)this._maybeAddToChanges(e,i),this._appendAfter=e,e=e._next;else{let o=this._getOrCreateRecordForKey(r,i);e=this._insertBeforeOrAppend(e,o)}}),e){e._prev&&(e._prev._next=null),this._removalsHead=e;for(let i=e;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,e){if(n){let i=n._prev;return e._next=n,e._prev=i,n._prev=e,i&&(i._next=e),n===this._mapHead&&(this._mapHead=e),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=e,e._prev=this._appendAfter):this._mapHead=e,this._appendAfter=e,null}_getOrCreateRecordForKey(n,e){if(this._records.has(n)){let r=this._records.get(n);this._maybeAddToChanges(r,e);let o=r._prev,s=r._next;return o&&(o._next=s),s&&(s._prev=o),r._next=null,r._prev=null,r}let i=new lg(n);return this._records.set(n,i),i.currentValue=e,this._addToAdditions(i),i}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;n!==null;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;n!=null;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(n,e){Object.is(e,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=e,this._addToChanges(n))}_addToAdditions(n){this._additionsHead===null?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n)}_addToChanges(n){this._changesHead===null?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n)}_forEach(n,e){n instanceof Map?n.forEach(e):Object.keys(n).forEach(i=>e(n[i],i))}},lg=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(n){this.key=n}};function U0(){return new dg([new sg])}var dg=(()=>{class t{static \u0275prov=b({token:t,providedIn:"root",factory:U0});factories;constructor(e){this.factories=e}static create(e,i){if(i){let r=i.factories.slice();e=e.concat(r)}return new t(e)}static extend(e){return{provide:t,useFactory:()=>{let i=d(t,{optional:!0,skipSelf:!0});return t.create(e,i||U0())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i)return i;throw new E(901,!1)}}return t})();function Z0(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;Me(be.BootstrapApplicationStart);try{let o=r?.injector??bk(i),s=[j0(),J_,...e||[]],a=new la({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return gk({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{Me(be.BootstrapApplicationEnd)}}function se(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function Or(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var rg=Symbol("NOT_SET"),K0=new Set,xk=q(g({},Ts),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:rg,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==rg&&!no(this))return this.signal;try{for(let r of this.cleanup??K0)r()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=gi(this),i;try{i=this.userFn.apply(null,n)}finally{tr(this,e)}return(this.value===rg||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),cg=class extends oa{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,s=null){super(n,[void 0,void 0,void 0,void 0],i,!1,o.get(vt),s),this.scheduler=r;for(let a of Am){let l=e[a];if(l===void 0)continue;let c=Object.create(xk);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(er(c),c.value),c.signal[Je]=c,c.registerCleanupFn=u=>(c.cleanup??=new Set).add(u),this.nodes[a]=c,this.hooks[a]=u=>c.phaseFn(u)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??K0)e()}finally{vi(n)}}};function Q0(t,n){let e=n?.injector??d(F),i=e.get(kn),r=e.get(Id),o=e.get(xn,null,{optional:!0});r.impl??=e.get(Rm);let s=t;typeof s=="function"&&(s={mixedReadWrite:t});let a=e.get(Do,null,{optional:!0}),l=new cg(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function qd(t,n){let e=qn(t),i=n.elementInjector||vo();return new Ar(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var X0=null;function tn(){return X0}function ug(t){X0??=t}var Ia=class{},Po=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(J0),providedIn:"platform"})}return t})();var J0=(()=>{class t extends Po{_location;_history;_doc=d(G);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return tn().getBaseHref(this._doc)}onPopState(e){let i=tn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=tn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,r){this._history.pushState(e,i,r)}replaceState(e,i,r){this._history.replaceState(e,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function nC(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function eC(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Li(t){return t&&t[0]!=="?"?`?${t}`:t}var Yd=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(Sk),providedIn:"root"})}return t})(),Ik=new v(""),Sk=(()=>{class t extends Yd{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??d(G).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return nC(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Li(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Li(o));this._platformLocation.pushState(e,i,s)}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Li(o));this._platformLocation.replaceState(e,i,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(R(Po),R(Ik,8))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ji=(()=>{class t{_subject=new D;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=Ak(eC(tC(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Li(i))}normalize(e){return t.stripTrailingSlash(Tk(this._basePath,tC(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Li(i)),r)}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Li(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i))}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Li;static joinWithSlash=nC;static stripTrailingSlash=eC;static \u0275fac=function(i){return new(i||t)(R(Yd))};static \u0275prov=b({token:t,factory:()=>Mk(),providedIn:"root"})}return t})();function Mk(){return new ji(R(Yd))}function Tk(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function tC(t){return t.replace(/\/index\.html$/,"")}function Ak(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var fg=/\s+/,iC=[],hg=(()=>{class t{_ngEl;_renderer;initialClasses=iC;rawClass;stateMap=new Map;constructor(e,i){this._ngEl=e,this._renderer=i}set klass(e){this.initialClasses=e!=null?e.trim().split(fg):iC}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(fg):e}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let i of e)this._updateState(i,!0);else if(e!=null)for(let i of Object.keys(e))this._updateState(i,!!e[i]);this._applyStateDiff()}_updateState(e,i){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(e,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let i=e[0],r=e[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(e,i){e=e.trim(),e.length>0&&e.split(fg).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}static \u0275fac=function(i){return new(i||t)(me(k),me(Pe))};static \u0275dir=L({type:t,selectors:[["","ngClass",""]],inputs:{klass:[0,"class","klass"],ngClass:"ngClass"}})}return t})();var pg=(()=>{class t{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(e,i,r){this._ngEl=e,this._differs=i,this._renderer=r}set ngStyle(e){this._ngStyle=e,!this._differ&&e&&(this._differ=this._differs.find(e).create())}ngDoCheck(){if(this._differ){let e=this._differ.diff(this._ngStyle);e&&this._applyChanges(e)}}_setStyle(e,i){let[r,o]=e.split("."),s=r.indexOf("-")===-1?void 0:Dn.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,o?`${i}${o}`:i,s):this._renderer.removeStyle(this._ngEl.nativeElement,r,s)}_applyChanges(e){e.forEachRemovedItem(i=>this._setStyle(i.key,null)),e.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),e.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}static \u0275fac=function(i){return new(i||t)(me(k),me(dg),me(Pe))};static \u0275dir=L({type:t,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return t})(),mg=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=d(F);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(me(yt))};static \u0275dir=L({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Ke]})}return t})();var jn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})();function Sa(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var Fr=class{};var gg="browser";function Ma(t){return t===gg}var Ta=class{_doc;constructor(n){this._doc=n}manager},Zd=(()=>{class t extends Ta{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(R(G))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),Xd=new v(""),bg=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this});let r=e.filter(s=>!(s instanceof Zd));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Zd);o&&this._plugins.push(o)}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new E(5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(R(Xd),R(B))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),vg="ng-app-id";function rC(t){for(let n of t)n.remove()}function oC(t,n){let e=n.createElement("style");return e.textContent=t,e}function Ok(t,n,e,i){let r=t.head?.querySelectorAll(`style[${vg}="${n}"],link[${vg}="${n}"]`);if(r)for(let o of r)o.removeAttribute(vg),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function _g(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var wg=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,Ok(e,i,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,oC);i?.forEach(r=>this.addUsage(r,this.external,_g))}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))})}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(rC(r.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])rC(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,oC(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,_g(i,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(R(G),R(No),R(kr,8),R(ei))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),yg={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Cg=/%COMP%/g;var aC="%COMP%",Fk=`_nghost-${aC}`,Pk=`_ngcontent-${aC}`,Lk=!0,jk=new v("",{factory:()=>Lk});function Vk(t){return Pk.replace(Cg,t)}function Bk(t){return Fk.replace(Cg,t)}function lC(t,n){return n.map(e=>e.replace(Cg,t))}var Dg=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Aa(e,s,a,this.tracingService)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Qd?r.applyToHost(e):r instanceof Ra&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Cn.Emulated:o=new Qd(l,c,i,this.appId,u,s,a,f);break;case Cn.ShadowDom:return new Kd(l,e,i,s,a,this.nonce,f,c);case Cn.ExperimentalIsolatedShadowDom:return new Kd(l,e,i,s,a,this.nonce,f);default:o=new Ra(l,c,i,u,s,a,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(R(bg),R(wg),R(No),R(jk),R(G),R(B),R(kr),R(xn,8))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),Aa=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(yg[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(sC(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){n&&(sC(n)?n.content:n).insertBefore(e,i)}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new E(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=yg[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let r=yg[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,r){r&(Dn.DashCase|Dn.Important)?n.style.setProperty(e,i,r&Dn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){i&Dn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,r){if(typeof n=="string"&&(n=tn().getGlobalEventTarget(this.doc,n),!n))throw new E(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function sC(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Kd=class extends Aa{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,s,a,l){super(n,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=lC(i.id,c);for(let f of c){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=f,this.shadowRoot.appendChild(h)}let u=i.getExternalStyles?.();if(u)for(let f of u){let h=_g(f,r);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Ra=class extends Aa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,s,a,l){super(n,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?lC(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Tr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Qd=class extends Ra{contentAttr;hostAttr;constructor(n,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(n,e,i,o,s,a,l,c),this.contentAttr=Vk(c),this.hostAttr=Bk(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Jd=class t extends Ia{supportsDOMEvents=!0;static makeCurrent(){ug(new t)}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=Hk();return e==null?null:Uk(e)}resetBaseElement(){ka=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return Sa(document.cookie,n)}},ka=null;function Hk(){return ka=ka||document.head.querySelector("base"),ka?ka.getAttribute("href"):null}function Uk(t){return new URL(t,document.baseURI).pathname}var zk=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),cC=["alt","control","meta","shift"],$k={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Wk={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},dC=(()=>{class t extends Ta{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>tn().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),cC.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),s+=c+".")}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=$k[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),cC.forEach(s=>{if(s!==r){let a=Wk[s];a(e)&&(o+=s+".")}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(R(G))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})();async function Eg(t,n,e){let i=g({rootComponent:t},Gk(n,e));return Z0(i)}function Gk(t,n){return{platformRef:n?.platformRef,appProviders:[...Qk,...t?.providers??[]],platformProviders:Kk}}function qk(){Jd.makeCurrent()}function Yk(){return new Pt}function Zk(){return gm(document),document}var Kk=[{provide:ei,useValue:gg},{provide:bd,useValue:qk,multi:!0},{provide:G,useFactory:Zk}];var Qk=[{provide:Ys,useValue:"root"},{provide:Pt,useFactory:Yk},{provide:Xd,useClass:Zd,multi:!0},{provide:Xd,useClass:dC,multi:!0},Dg,wg,bg,{provide:ft,useExisting:Dg},{provide:Fr,useClass:zk},[]];var Vi=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var tu=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},nu=class{encodeKey(n){return uC(n)}encodeValue(n){return uC(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function Xk(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,a]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(s)||[];l.push(a),e.set(s,l)}),e}var Jk=/%(\d[a-f0-9])/gi,eN={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function uC(t){return encodeURIComponent(t).replace(Jk,(n,e)=>eN[e]??n)}function eu(t){return`${t}`}var ai=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new nu,n.fromString){if(n.fromObject)throw new E(2805,!1);this.map=Xk(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(eu):[eu(i)];this.map.set(e,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"})}):e.push({param:i,value:r,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(eu(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(eu(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function tN(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function fC(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function hC(t){return typeof Blob<"u"&&t instanceof Blob}function pC(t){return typeof FormData<"u"&&t instanceof FormData}function nN(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var mC="Content-Type",gC="Accept",yC="text/plain",_C="application/json",iN=`${_C}, ${yC}, */*`,Lo=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(tN(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new E(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new Vi,this.context??=new tu,!this.params)this.params=new ai,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),l=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+l+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||fC(this.body)||hC(this.body)||pC(this.body)||nN(this.body)?this.body:this.body instanceof ai?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||pC(this.body)?null:hC(this.body)?this.body.type||null:fC(this.body)?null:typeof this.body=="string"?yC:this.body instanceof ai?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?_C:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,u=n.credentials||this.credentials,f=n.referrer??this.referrer,h=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,w=n.transferCache??this.transferCache,I=n.timeout??this.timeout,A=n.body!==void 0?n.body:this.body,j=n.withCredentials??this.withCredentials,Ee=n.reportProgress??this.reportProgress,lt=n.headers||this.headers,ct=n.params||this.params,xs=n.context??this.context;return n.setHeaders!==void 0&&(lt=Object.keys(n.setHeaders).reduce((Is,Xi)=>Is.set(Xi,n.setHeaders[Xi]),lt)),n.setParams&&(ct=Object.keys(n.setParams).reduce((Is,Xi)=>Is.set(Xi,n.setParams[Xi]),ct)),new t(e,i,A,{params:ct,headers:lt,context:xs,reportProgress:Ee,responseType:r,withCredentials:j,transferCache:w,keepalive:o,cache:a,priority:s,timeout:I,mode:l,redirect:c,credentials:u,referrer:f,integrity:h,referrerPolicy:p})}},Pr=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Pr||{}),Vo=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new Vi,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},iu=class t extends Vo{constructor(n={}){super(n)}type=Pr.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},Na=class t extends Vo{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Pr.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},jo=class extends Vo{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},rN=200,oN=204;var sN=new v("");var aN=/^\)\]\}',?\n/;var Ig=(()=>{class t{xhrFactory;tracingService=d(xn,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new E(-2800,!1);let i=this.xhrFactory;return x(null).pipe(we(()=>new W(o=>{let s=i.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((A,j)=>s.setRequestHeader(A,j.join(","))),e.headers.has(gC)||s.setRequestHeader(gC,iN),!e.headers.has(mC)){let A=e.detectContentTypeHeader();A!==null&&s.setRequestHeader(mC,A)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let A=e.responseType.toLowerCase();s.responseType=A!=="json"?A:"text"}let a=e.serializeBody(),l=null,c=()=>{if(l!==null)return l;let A=s.statusText||"OK",j=new Vi(s.getAllResponseHeaders()),Ee=s.responseURL||e.url;return l=new iu({headers:j,status:s.status,statusText:A,url:Ee}),l},u=this.maybePropagateTrace(()=>{let{headers:A,status:j,statusText:Ee,url:lt}=c(),ct=null;j!==oN&&(ct=typeof s.response>"u"?s.responseText:s.response),j===0&&(j=ct?rN:0);let xs=j>=200&&j<300;if(e.responseType==="json"&&typeof ct=="string"){let Is=ct;ct=ct.replace(aN,"");try{ct=ct!==""?JSON.parse(ct):null}catch(Xi){ct=Is,xs&&(xs=!1,ct={error:Xi,text:ct})}}xs?(o.next(new Na({body:ct,headers:A,status:j,statusText:Ee,url:lt||void 0})),o.complete()):o.error(new jo({error:ct,headers:A,status:j,statusText:Ee,url:lt||void 0}))}),f=this.maybePropagateTrace(A=>{let{url:j}=c(),Ee=new jo({error:A,status:s.status||0,statusText:s.statusText||"Unknown Error",url:j||void 0});o.error(Ee)}),h=f;e.timeout&&(h=this.maybePropagateTrace(A=>{let{url:j}=c(),Ee=new jo({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:j||void 0});o.error(Ee)}));let p=!1,w=this.maybePropagateTrace(A=>{p||(o.next(c()),p=!0);let j={type:Pr.DownloadProgress,loaded:A.loaded};A.lengthComputable&&(j.total=A.total),e.responseType==="text"&&s.responseText&&(j.partialText=s.responseText),o.next(j)}),I=this.maybePropagateTrace(A=>{let j={type:Pr.UploadProgress,loaded:A.loaded};A.lengthComputable&&(j.total=A.total),o.next(j)});return s.addEventListener("load",u),s.addEventListener("error",f),s.addEventListener("timeout",h),s.addEventListener("abort",f),e.reportProgress&&(s.addEventListener("progress",w),a!==null&&s.upload&&s.upload.addEventListener("progress",I)),s.send(a),o.next({type:Pr.Sent}),()=>{s.removeEventListener("error",f),s.removeEventListener("abort",f),s.removeEventListener("load",u),s.removeEventListener("timeout",h),e.reportProgress&&(s.removeEventListener("progress",w),a!==null&&s.upload&&s.upload.removeEventListener("progress",I)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(i){return new(i||t)(R(Fr))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function bC(t,n){return n(t)}function lN(t,n){return(e,i)=>n.intercept(e,{handle:r=>t(r,i)})}function cN(t,n,e){return(i,r)=>ut(e,()=>n(i,o=>t(o,r)))}var wC=new v(""),Sg=new v("",{factory:()=>[]}),CC=new v(""),Mg=new v("",{factory:()=>!0});function dN(){let t=null;return(n,e)=>{t===null&&(t=(d(wC,{optional:!0})??[]).reduceRight(lN,bC));let i=d(Eo);if(d(Mg)){let o=i.add();return t(n,e).pipe(bi(o))}else return t(n,e)}}var Tg=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(Ig),r},providedIn:"root"})}return t})();var ru=(()=>{class t{backend;injector;chain=null;pendingTasks=d(Eo);contributeToStability=d(Mg);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(Sg),...this.injector.get(CC,[])]));this.chain=i.reduceRight((r,o)=>cN(r,o,this.injector),bC)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(bi(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(R(Tg),R(ke))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ag=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(ru),r},providedIn:"root"})}return t})();function xg(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var Bo=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,r={}){let o;if(e instanceof Lo)o=e;else{let l;r.headers instanceof Vi?l=r.headers:l=new Vi(r.headers);let c;r.params&&(r.params instanceof ai?c=r.params:c=new ai({fromObject:r.params})),o=new Lo(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let s=x(o).pipe(ho(l=>this.handler.handle(l)));if(e instanceof Lo||r.observe==="events")return s;let a=s.pipe(re(l=>l instanceof Na));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(T(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new E(2806,!1);return l.body}));case"blob":return a.pipe(T(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new E(2807,!1);return l.body}));case"text":return a.pipe(T(l=>{if(l.body!==null&&typeof l.body!="string")throw new E(2808,!1);return l.body}));default:return a.pipe(T(l=>l.body))}case"response":return a;default:throw new E(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new ai().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,xg(r,i))}post(e,i,r={}){return this.request("POST",e,xg(r,i))}put(e,i,r={}){return this.request("PUT",e,xg(r,i))}static \u0275fac=function(i){return new(i||t)(R(Ag))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var uN=new v("",{factory:()=>!0}),fN="XSRF-TOKEN",hN=new v("",{factory:()=>fN}),pN="X-XSRF-TOKEN",mN=new v("",{factory:()=>pN}),gN=(()=>{class t{cookieName=d(hN);doc=d(G);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=Sa(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),DC=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(gN),r},providedIn:"root"})}return t})();function vN(t,n){if(!d(uN)||t.method==="GET"||t.method==="HEAD")return n(t);try{let r=d(Po).href,{origin:o}=new URL(r),{origin:s}=new URL(t.url,o);if(o!==s)return n(t)}catch{return n(t)}let e=d(DC).getToken(),i=d(mN);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}var Rg=(function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t})(Rg||{});function yN(t,n){return{\u0275kind:t,\u0275providers:n}}function kg(...t){let n=[Bo,ru,{provide:Ag,useExisting:ru},{provide:Tg,useFactory:()=>d(sN,{optional:!0})??d(Ig)},{provide:Sg,useValue:vN,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return dt(n)}var vC=new v("");function Ng(){return yN(Rg.LegacyInterceptors,[{provide:vC,useFactory:dN},{provide:Sg,useExisting:vC,multi:!0}])}var EC=(()=>{class t{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(i){return new(i||t)(R(G))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Oa=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=R(bN),r},providedIn:"root"})}return t})(),bN=(()=>{class t extends Oa{_doc;constructor(e){super(),this._doc=e}sanitize(e,i){if(i==null)return null;switch(e){case ot.NONE:return i;case ot.HTML:return ti(i,"HTML")?En(i):Dd(this._doc,String(i)).toString();case ot.STYLE:return ti(i,"Style")?En(i):i;case ot.SCRIPT:if(ti(i,"Script"))return En(i);throw new E(5200,!1);case ot.URL:return ti(i,"URL")?En(i):fa(String(i));case ot.RESOURCE_URL:if(ti(i,"ResourceURL"))return En(i);throw new E(5201,!1);default:throw new E(5202,!1)}}bypassSecurityTrustHtml(e){return ym(e)}bypassSecurityTrustStyle(e){return _m(e)}bypassSecurityTrustScript(e){return bm(e)}bypassSecurityTrustUrl(e){return wm(e)}bypassSecurityTrustResourceUrl(e){return Cm(e)}static \u0275fac=function(i){return new(i||t)(R(G))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var oe="primary",Ya=Symbol("RouteTitle"),jg=class{params;constructor(n){this.params=n||{}}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function jr(t){return new jg(t)}function Og(t,n,e){for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(r[0]===":")e[r.substring(1)]=o;else if(r!==o.path)return!1}return!0}function NC(t,n,e){let i=e.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||i.length<t.length))return null;let l={},c=t.slice(0,i.length);return Og(i,c,l)?{consumed:c,posParams:l}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let a={};return!Og(o,t.slice(0,o.length),a)||!Og(s,t.slice(t.length-s.length),a)?null:{consumed:t,posParams:a}}function du(t){return new Promise((n,e)=>{t.pipe(et()).subscribe({next:i=>n(i),error:i=>e(i)})})}function wN(t,n){if(t.length!==n.length)return!1;for(let e=0;e<t.length;++e)if(!Vn(t[e],n[e]))return!1;return!0}function Vn(t,n){let e=t?Vg(t):void 0,i=n?Vg(n):void 0;if(!e||!i||e.length!=i.length)return!1;let r;for(let o=0;o<e.length;o++)if(r=e[o],!OC(t[r],n[r]))return!1;return!0}function Vg(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function OC(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return!1;let e=[...t].sort(),i=[...n].sort();return e.every((r,o)=>i[o]===r)}else return t===n}function CN(t){return t.length>0?t[t.length-1]:null}function Hr(t){return ks(t)?t:Oi(t)?Ae(Promise.resolve(t)):x(t)}function FC(t){return ks(t)?du(t):Promise.resolve(t)}var DN={exact:jC,subset:VC},PC={exact:EN,subset:xN,ignored:()=>!0},LC={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},Bg={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function IC(t,n,e){return DN[e.paths](t.root,n.root,e.matrixParams)&&PC[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function EN(t,n){return Vn(t,n)}function jC(t,n,e){if(!Lr(t.segments,n.segments)||!au(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return!1;for(let i in n.children)if(!t.children[i]||!jC(t.children[i],n.children[i],e))return!1;return!0}function xN(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>OC(t[e],n[e]))}function VC(t,n,e){return BC(t,n,n.segments,e)}function BC(t,n,e,i){if(t.segments.length>e.length){let r=t.segments.slice(0,e.length);return!(!Lr(r,e)||n.hasChildren()||!au(r,e,i))}else if(t.segments.length===e.length){if(!Lr(t.segments,e)||!au(t.segments,e,i))return!1;for(let r in n.children)if(!t.children[r]||!VC(t.children[r],n.children[r],i))return!1;return!0}else{let r=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return!Lr(t.segments,r)||!au(t.segments,r,i)||!t.children[oe]?!1:BC(t.children[oe],n,o,i)}}function au(t,n,e){return n.every((i,r)=>PC[e](t[r].parameters,i.parameters))}var rn=class{root;queryParams;fragment;_queryParamMap;constructor(n=new xe([],{}),e={},i=null){this.root=n,this.queryParams=e,this.fragment=i}get queryParamMap(){return this._queryParamMap??=jr(this.queryParams),this._queryParamMap}toString(){return MN.serialize(this)}},xe=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return lu(this)}},Bi=class{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e}get parameterMap(){return this._parameterMap??=jr(this.parameters),this._parameterMap}toString(){return UC(this)}};function IN(t,n){return Lr(t,n)&&t.every((e,i)=>Vn(e.parameters,n[i].parameters))}function Lr(t,n){return t.length!==n.length?!1:t.every((e,i)=>e.path===n[i].path)}function SN(t,n){let e=[];return Object.entries(t.children).forEach(([i,r])=>{i===oe&&(e=e.concat(n(r,i)))}),Object.entries(t.children).forEach(([i,r])=>{i!==oe&&(e=e.concat(n(r,i)))}),e}var Za=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>new Hi,providedIn:"root"})}return t})(),Hi=class{parse(n){let e=new Ug(n);return new rn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${Fa(n.root,!0)}`,i=RN(n.queryParams),r=typeof n.fragment=="string"?`#${TN(n.fragment)}`:"";return`${e}${i}${r}`}},MN=new Hi;function lu(t){return t.segments.map(n=>UC(n)).join("/")}function Fa(t,n){if(!t.hasChildren())return lu(t);if(n){let e=t.children[oe]?Fa(t.children[oe],!1):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==oe&&i.push(`${r}:${Fa(o,!1)}`)}),i.length>0?`${e}(${i.join("//")})`:e}else{let e=SN(t,(i,r)=>r===oe?[Fa(t.children[oe],!1)]:[`${r}:${Fa(i,!1)}`]);return Object.keys(t.children).length===1&&t.children[oe]!=null?`${lu(t)}/${e[0]}`:`${lu(t)}/(${e.join("//")})`}}function HC(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function ou(t){return HC(t).replace(/%3B/gi,";")}function TN(t){return encodeURI(t)}function Hg(t){return HC(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function cu(t){return decodeURIComponent(t)}function SC(t){return cu(t.replace(/\+/g,"%20"))}function UC(t){return`${Hg(t.path)}${AN(t.parameters)}`}function AN(t){return Object.entries(t).map(([n,e])=>`;${Hg(n)}=${Hg(e)}`).join("")}function RN(t){let n=Object.entries(t).map(([e,i])=>Array.isArray(i)?i.map(r=>`${ou(e)}=${ou(r)}`).join("&"):`${ou(e)}=${ou(i)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var kN=/^[^\/()?;#]+/;function Fg(t){let n=t.match(kN);return n?n[0]:""}var NN=/^[^\/()?;=#]+/;function ON(t){let n=t.match(NN);return n?n[0]:""}var FN=/^[^=?&#]+/;function PN(t){let n=t.match(FN);return n?n[0]:""}var LN=/^[^&#]+/;function jN(t){let n=t.match(LN);return n?n[0]:""}var Ug=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new xe([],{}):new xe([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new E(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,n));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,n)),(e.length>0||Object.keys(i).length>0)&&(r[oe]=new xe(e,i)),r}parseSegment(){let n=Fg(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new E(4009,!1);return this.capture(n),new Bi(cu(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=ON(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let r=Fg(this.remaining);r&&(i=r,this.capture(i))}n[cu(e)]=cu(i)}parseQueryParam(n){let e=PN(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let s=jN(this.remaining);s&&(i=s,this.capture(i))}let r=SC(e),o=SC(i);if(n.hasOwnProperty(r)){let s=n[r];Array.isArray(s)||(s=[s],n[r]=s),s.push(o)}else n[r]=o}parseParens(n,e){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Fg(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new E(4010,!1);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):n&&(s=oe);let a=this.parseChildren(e+1);i[s??oe]=Object.keys(a).length===1&&a[oe]?a[oe]:new xe([],a),this.consumeOptional("//")}return i}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new E(4011,!1)}};function zC(t){return t.segments.length>0?new xe([],{[oe]:t}):t}function $C(t){let n={};for(let[i,r]of Object.entries(t.children)){let o=$C(r);if(i===oe&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))n[s]=a;else(o.segments.length>0||o.hasChildren())&&(n[i]=o)}let e=new xe(t.segments,n);return VN(e)}function VN(t){if(t.numberOfChildren===1&&t.children[oe]){let n=t.children[oe];return new xe(t.segments.concat(n.segments),n.children)}return t}function $o(t){return t instanceof rn}function WC(t,n,e=null,i=null,r=new Hi){let o=GC(t);return qC(o,n,e,i,r)}function GC(t){let n;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c}let a=new xe(o.url,s);return o===t&&(n=a),a}let i=e(t.root),r=zC(i);return n??r}function qC(t,n,e,i,r){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return Pg(o,o,o,e,i,r);let s=BN(n);if(s.toRoot())return Pg(o,o,new xe([],{}),e,i,r);let a=HN(s,o,t),l=a.processChildren?La(a.segmentGroup,a.index,s.commands):ZC(a.segmentGroup,a.index,s.commands);return Pg(o,a.segmentGroup,l,e,i,r)}function uu(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function Ba(t){return typeof t=="object"&&t!=null&&t.outlets}function MC(t,n,e){t||="\u0275";let i=new rn;return i.queryParams={[t]:n},e.parse(e.serialize(i)).queryParams[t]}function Pg(t,n,e,i,r,o){let s={};for(let[c,u]of Object.entries(i??{}))s[c]=Array.isArray(u)?u.map(f=>MC(c,f,o)):MC(c,u,o);let a;t===n?a=e:a=YC(t,n,e);let l=zC($C(a));return new rn(l,s,r)}function YC(t,n,e){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===n?i[r]=e:i[r]=YC(o,n,e)}),new xe(t.segments,i)}var fu=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,i){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=i,n&&i.length>0&&uu(i[0]))throw new E(4003,!1);let r=i.find(Ba);if(r&&r!==CN(i))throw new E(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function BN(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new fu(!0,0,t);let n=0,e=!1,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c}),[...r,{outlets:a}]}if(o.segmentPath)return[...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=!0:a===".."?n++:a!=""&&r.push(a))}),r):[...r,o]},[]);return new fu(e,n,i)}var Uo=class{segmentGroup;processChildren;index;constructor(n,e,i){this.segmentGroup=n,this.processChildren=e,this.index=i}};function HN(t,n,e){if(t.isAbsolute)return new Uo(n,!0,0);if(!e)return new Uo(n,!1,NaN);if(e.parent===null)return new Uo(e,!0,0);let i=uu(t.commands[0])?0:1,r=e.segments.length-1+i;return UN(e,r,t.numberOfDoubleDots)}function UN(t,n,e){let i=t,r=n,o=e;for(;o>r;){if(o-=r,i=i.parent,!i)throw new E(4005,!1);r=i.segments.length}return new Uo(i,!1,r-o)}function zN(t){return Ba(t[0])?t[0].outlets:{[oe]:t}}function ZC(t,n,e){if(t??=new xe([],{}),t.segments.length===0&&t.hasChildren())return La(t,n,e);let i=$N(t,n,e),r=e.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new xe(t.segments.slice(0,i.pathIndex),{});return o.children[oe]=new xe(t.segments.slice(i.pathIndex),t.children),La(o,0,r)}else return i.match&&r.length===0?new xe(t.segments,{}):i.match&&!t.hasChildren()?zg(t,n,e):i.match?La(t,0,r):zg(t,n,e)}function La(t,n,e){if(e.length===0)return new xe(t.segments,{});{let i=zN(e),r={};if(Object.keys(i).some(o=>o!==oe)&&t.children[oe]&&t.numberOfChildren===1&&t.children[oe].segments.length===0){let o=La(t.children[oe],n,e);return new xe(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=ZC(t.children[o],n,s))}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s)}),new xe(t.segments,r)}}function $N(t,n,e){let i=0,r=n,o={match:!1,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=e.length)return o;let s=t.segments[r],a=e[i];if(Ba(a))break;let l=`${a}`,c=i<e.length-1?e[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!AC(l,c,s))return o;i+=2}else{if(!AC(l,{},s))return o;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function zg(t,n,e){let i=t.segments.slice(0,n),r=0;for(;r<e.length;){let o=e[r];if(Ba(o)){let l=WN(o.outlets);return new xe(i,l)}if(r===0&&uu(e[0])){let l=t.segments[n];i.push(new Bi(l.path,TC(e[0]))),r++;continue}let s=Ba(o)?o.outlets[oe]:`${o}`,a=r<e.length-1?e[r+1]:null;s&&a&&uu(a)?(i.push(new Bi(s,TC(a))),r+=2):(i.push(new Bi(s,{})),r++)}return new xe(i,{})}function WN(t){let n={};return Object.entries(t).forEach(([e,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(n[e]=zg(new xe([],{}),0,i))}),n}function TC(t){let n={};return Object.entries(t).forEach(([e,i])=>n[e]=`${i}`),n}function AC(t,n,e){return t==e.path&&Vn(n,e.parameters)}var ja="imperative",mt=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(mt||{}),$t=class{id;url;constructor(n,e){this.id=n,this.url=e}},Vr=class extends $t{type=mt.NavigationStart;navigationTrigger;restoredState;constructor(n,e,i="imperative",r=null){super(n,e),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},ci=class extends $t{urlAfterRedirects;type=mt.NavigationEnd;constructor(n,e,i){super(n,e),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},xt=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(xt||{}),Ha=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(Ha||{}),nn=class extends $t{reason;code;type=mt.NavigationCancel;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function KC(t){return t instanceof nn&&(t.code===xt.Redirect||t.code===xt.SupersededByNewNavigation)}var di=class extends $t{reason;code;type=mt.NavigationSkipped;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r}},Br=class extends $t{error;target;type=mt.NavigationError;constructor(n,e,i,r){super(n,e),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ua=class extends $t{urlAfterRedirects;state;type=mt.RoutesRecognized;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},hu=class extends $t{urlAfterRedirects;state;type=mt.GuardsCheckStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},pu=class extends $t{urlAfterRedirects;state;shouldActivate;type=mt.GuardsCheckEnd;constructor(n,e,i,r,o){super(n,e),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},mu=class extends $t{urlAfterRedirects;state;type=mt.ResolveStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},gu=class extends $t{urlAfterRedirects;state;type=mt.ResolveEnd;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},vu=class{route;type=mt.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},yu=class{route;type=mt.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},_u=class{snapshot;type=mt.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},bu=class{snapshot;type=mt.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},wu=class{snapshot;type=mt.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Cu=class{snapshot;type=mt.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Wo=class{},za=class{},Go=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e}};function GN(t){return!(t instanceof Wo)&&!(t instanceof Go)&&!(t instanceof za)}var Du=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Ko(this.rootInjector)}},Ko=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,i){let r=this.getOrCreateContext(e);r.outlet=i,this.contexts.set(e,r)}onChildOutletDestroyed(e){let i=this.getContext(e);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let i=this.getContext(e);return i||(i=new Du(this.rootInjector),this.contexts.set(e,i)),i}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(i){return new(i||t)(R(ke))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Eu=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=$g(n,this._root);return e?e.children.map(i=>i.value):[]}firstChild(n){let e=$g(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=Wg(n,this._root);return e.length<2?[]:e[e.length-2].children.map(r=>r.value).filter(r=>r!==n)}pathFromRoot(n){return Wg(n,this._root).map(e=>e.value)}};function $g(t,n){if(t===n.value)return n;for(let e of n.children){let i=$g(t,e);if(i)return i}return null}function Wg(t,n){if(t===n.value)return[n];for(let e of n.children){let i=Wg(t,e);if(i.length)return i.unshift(n),i}return[]}var zt=class{value;children;constructor(n,e){this.value=n,this.children=e}toString(){return`TreeNode(${this.value})`}};function Ho(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var $a=class extends Eu{snapshot;constructor(n,e){super(n),this.snapshot=e,ev(this,n)}toString(){return this.snapshot.toString()}};function QC(t,n){let e=qN(t,n),i=new We([new Bi("",{})]),r=new We({}),o=new We({}),s=new We({}),a=new We(""),l=new Ui(i,r,s,a,o,oe,t,e.root);return l.snapshot=e.root,new $a(new zt(l,[]),e)}function qN(t,n){let e={},i={},r={},s=new qo([],e,r,"",i,oe,t,null,{},n);return new Wa("",new zt(s,[]))}var Ui=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(n,e,i,r,o,s,a,l){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(T(c=>c[Ya]))??x(void 0),this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(T(n=>jr(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(T(n=>jr(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Jg(t,n,e="emptyOnly"){let i,{routeConfig:r}=t;return n!==null&&(e==="always"||r?.path===""||!n.component&&!n.routeConfig?.loadComponent)?i={params:g(g({},n.params),t.params),data:g(g({},n.data),t.data),resolve:g(g(g(g({},t.data),n.data),r?.data),t._resolvedData)}:i={params:g({},t.params),data:g({},t.data),resolve:g(g({},t.data),t._resolvedData??{})},r&&JC(r)&&(i.resolve[Ya]=r.title),i}var qo=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Ya]}constructor(n,e,i,r,o,s,a,l,c,u){this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=jr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=jr(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(i=>i.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${n}', path:'${e}')`}},Wa=class extends Eu{url;constructor(n,e){super(e),this.url=n,ev(this,e)}toString(){return XC(this._root)}};function ev(t,n){n.value._routerState=t,n.children.forEach(e=>ev(t,e))}function XC(t){let n=t.children.length>0?` { ${t.children.map(XC).join(", ")} } `:"";return`${t.value}${n}`}function Lg(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,Vn(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),Vn(n.params,e.params)||t.paramsSubject.next(e.params),wN(n.url,e.url)||t.urlSubject.next(e.url),Vn(n.data,e.data)||t.dataSubject.next(e.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function Gg(t,n){let e=Vn(t.params,n.params)&&IN(t.url,n.url),i=!t.parent!=!n.parent;return e&&!i&&(!t.parent||Gg(t.parent,n.parent))}function JC(t){return typeof t.title=="string"||t.title===null}var eD=new v(""),Ka=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=oe;activateEvents=new z;deactivateEvents=new z;attachEvents=new z;detachEvents=new z;routerOutletData=q0();parentContexts=d(Ko);location=d(yt);changeDetector=d(Te);inputBinder=d(Mu,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:i,previousValue:r}=e.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new E(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new E(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new E(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,i){this.activated=e,this._activatedRoute=i,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,i){if(this.isActivated)throw new E(4013,!1);this._activatedRoute=e;let r=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new qg(e,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Ke]})}return t})(),qg=class{route;childContexts;parent;outletData;constructor(n,e,i,r){this.route=n,this.childContexts=e,this.parent=i,this.outletData=r}get(n,e){return n===Ui?this.route:n===Ko?this.childContexts:n===eD?this.outletData:this.parent.get(n,e)}},Mu=new v("");var tv=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&ge(0,"router-outlet")},dependencies:[Ka],encapsulation:2})}return t})();function nv(t){let n=t.children&&t.children.map(nv),e=n?q(g({},t),{children:n}):g({},t);return!e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==oe&&(e.component=tv),e}function YN(t,n,e){let i=Ga(t,n._root,e?e._root:void 0);return new $a(i,n)}function Ga(t,n,e){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let i=e.value;i._futureSnapshot=n.value;let r=ZN(t,n,e);return new zt(i,r)}else{if(t.shouldAttach(n.value)){let o=t.retrieve(n.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=n.value,s.children=n.children.map(a=>Ga(t,a)),s}}let i=KN(n.value),r=n.children.map(o=>Ga(t,o));return new zt(i,r)}}function ZN(t,n,e){return n.children.map(i=>{for(let r of e.children)if(t.shouldReuseRoute(i.value,r.value.snapshot))return Ga(t,i,r);return Ga(t,i)})}function KN(t){return new Ui(new We(t.url),new We(t.params),new We(t.queryParams),new We(t.fragment),new We(t.data),t.outlet,t.component,t)}var Yo=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e}},tD="ngNavigationCancelingError";function xu(t,n){let{redirectTo:e,navigationBehaviorOptions:i}=$o(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,r=nD(!1,xt.Redirect);return r.url=e,r.navigationBehaviorOptions=i,r}function nD(t,n){let e=new Error(`NavigationCancelingError: ${t||""}`);return e[tD]=!0,e.cancellationCode=n,e}function QN(t){return iD(t)&&$o(t.url)}function iD(t){return!!t&&t[tD]}var Yg=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,i,r,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o}activate(n){let e=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,i,n),Lg(this.futureState.root),this.activateChildRoutes(e,i,n)}deactivateChildRoutes(n,e,i){let r=Ho(e);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s]}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i)})}deactivateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(n,e,s.children)}else this.deactivateChildRoutes(n,e,i);else o&&this.deactivateRouteAndItsChildren(e,i)}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e)}detachAndStoreRouteSubtree(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=Ho(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:a})}}deactivateRouteAndOutlet(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=Ho(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(n,e,i){let r=Ho(e);n.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Cu(o.value.snapshot))}),n.children.length&&this.forwardEvent(new bu(n.value.snapshot))}activateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(Lg(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(n,e,s.children)}else this.activateChildRoutes(n,e,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Lg(a.route.value),this.activateChildRoutes(n,null,s.children)}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(n,null,s.children)}else this.activateChildRoutes(n,null,i)}},Iu=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}},zo=class{component;route;constructor(n,e){this.component=n,this.route=e}};function XN(t,n,e){let i=t._root,r=n?n._root:null;return Pa(i,r,e,[i.value])}function JN(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:t,guards:n}}function Qo(t,n){let e=Symbol(),i=n.get(t,e);return i===e?typeof t=="function"&&!Ah(t)?t:n.get(t):i}function Pa(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=Ho(n);return t.children.forEach(s=>{eO(s,o[s.value.outlet],e,i.concat([s.value]),r),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Va(a,e.getContext(s),r)),r}function eO(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=n?n.value:null,a=e?e.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=tO(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new Iu(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Pa(t,n,a?a.children:null,i,r):Pa(t,n,e,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new zo(a.outlet.component,s))}else s&&Va(n,a,r),r.canActivateChecks.push(new Iu(i)),o.component?Pa(t,null,a?a.children:null,i,r):Pa(t,null,e,i,r);return r}function tO(t,n,e){if(typeof e=="function")return ut(n._environmentInjector,()=>e(t,n));switch(e){case"pathParamsChange":return!Lr(t.url,n.url);case"pathParamsOrQueryParamsChange":return!Lr(t.url,n.url)||!Vn(t.queryParams,n.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Gg(t,n)||!Vn(t.queryParams,n.queryParams);default:return!Gg(t,n)}}function Va(t,n,e){let i=Ho(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?n?Va(s,n.children.getContext(o),e):Va(s,null,e):Va(s,n,e)}),r.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new zo(n.outlet.component,r)):e.canDeactivateChecks.push(new zo(null,r)):e.canDeactivateChecks.push(new zo(null,r))}function Qa(t){return typeof t=="function"}function nO(t){return typeof t=="boolean"}function iO(t){return t&&Qa(t.canLoad)}function rO(t){return t&&Qa(t.canActivate)}function oO(t){return t&&Qa(t.canActivateChild)}function sO(t){return t&&Qa(t.canDeactivate)}function aO(t){return t&&Qa(t.canMatch)}function rD(t){return t instanceof lr||t?.name==="EmptyError"}var su=Symbol("INITIAL_VALUE");function Zo(){return we(t=>cr(t.map(n=>n.pipe(_e(1),Ve(su)))).pipe(T(n=>{for(let e of n)if(e!==!0){if(e===su)return su;if(e===!1||lO(e))return e}return!0}),re(n=>n!==su),_e(1)))}function lO(t){return $o(t)||t instanceof Yo}function oD(t){return t.aborted?x(void 0).pipe(_e(1)):new W(n=>{let e=()=>{n.next(),n.complete()};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function sD(t){return pe(oD(t))}function cO(t){return Re(n=>{let{targetSnapshot:e,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=n;return o.length===0&&r.length===0?x(q(g({},n),{guardsResult:!0})):dO(o,e,i).pipe(Re(s=>s&&nO(s)?uO(e,r,t):x(s)),T(s=>q(g({},n),{guardsResult:s})))})}function dO(t,n,e){return Ae(t).pipe(Re(i=>gO(i.component,i.route,e,n)),et(i=>i!==!0,!0))}function uO(t,n,e){return Ae(n).pipe(ho(i=>_i(hO(i.route.parent,e),fO(i.route,e),mO(t,i.path),pO(t,i.route))),et(i=>i!==!0,!0))}function fO(t,n){return t!==null&&n&&n(new wu(t)),x(!0)}function hO(t,n){return t!==null&&n&&n(new _u(t)),x(!0)}function pO(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return x(!0);let i=e.map(r=>un(()=>{let o=n._environmentInjector,s=Qo(r,o),a=rO(s)?s.canActivate(n,t):ut(o,()=>s(n,t));return Hr(a).pipe(et())}));return x(i).pipe(Zo())}function mO(t,n){let e=n[n.length-1],r=n.slice(0,n.length-1).reverse().map(o=>JN(o)).filter(o=>o!==null).map(o=>un(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=Qo(a,l),u=oO(c)?c.canActivateChild(e,t):ut(l,()=>c(e,t));return Hr(u).pipe(et())});return x(s).pipe(Zo())}));return x(r).pipe(Zo())}function gO(t,n,e,i){let r=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!r||r.length===0)return x(!0);let o=r.map(s=>{let a=n._environmentInjector,l=Qo(s,a),c=sO(l)?l.canDeactivate(t,n,e,i):ut(a,()=>l(t,n,e,i));return Hr(c).pipe(et())});return x(o).pipe(Zo())}function vO(t,n,e,i,r){let o=n.canLoad;if(o===void 0||o.length===0)return x(!0);let s=o.map(a=>{let l=Qo(a,t),c=iO(l)?l.canLoad(n,e):ut(t,()=>l(n,e)),u=Hr(c);return r?u.pipe(sD(r)):u});return x(s).pipe(Zo(),aD(i))}function aD(t){return ch(Oe(n=>{if(typeof n!="boolean")throw xu(t,n)}),T(n=>n===!0))}function yO(t,n,e,i,r,o){let s=n.canMatch;if(!s||s.length===0)return x(!0);let a=s.map(l=>{let c=Qo(l,t),u=aO(c)?c.canMatch(n,e,r):ut(t,()=>c(n,e,r));return Hr(u).pipe(sD(o))});return x(a).pipe(Zo(),aD(i))}var li=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype)}},qa=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype)}};function _O(t){throw new E(4e3,!1)}function bO(t){throw nD(!1,xt.GuardRejected)}var Zg=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e}async lineralizeSegments(n,e){let i=[],r=e.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[oe])throw _O(`${n.redirectTo}`);r=r.children[oe]}}async applyRedirectCommands(n,e,i,r,o){let s=await wO(e,r,o);if(s instanceof rn)throw new qa(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,i);if(s[0]==="/")throw new qa(a);return a}applyRedirectCreateUrlTree(n,e,i,r){let o=this.createSegmentGroup(n,e.root,i,r);return new rn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let i={};return Object.entries(n).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=e[a]}else i[r]=o}),i}createSegmentGroup(n,e,i,r){let o=this.createSegments(n,e.segments,i,r),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(n,l,i,r)}),new xe(o,s)}createSegments(n,e,i,r){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,r):this.findOrReturn(o,i))}findPosParam(n,e,i){let r=i[e.path.substring(1)];if(!r)throw new E(4001,!1);return r}findOrReturn(n,e){let i=0;for(let r of e){if(r.path===n.path)return e.splice(i),r;i++}return n}};function wO(t,n,e){if(typeof t=="string")return Promise.resolve(t);let i=t;return du(Hr(ut(e,()=>i(n))))}function CO(t,n){return t.providers&&!t._injector&&(t._injector=ya(t.providers,n,`Route: ${t.path}`)),t._injector??n}function In(t){return t.outlet||oe}function DO(t,n){let e=t.filter(i=>In(i)===n);return e.push(...t.filter(i=>In(i)!==n)),e}var Kg={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function lD(t){return{routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function EO(t,n,e,i,r,o,s){let a=cD(t,n,e);if(!a.matched)return x(a);let l=lD(o(a));return i=CO(n,i),yO(i,n,e,r,l,s).pipe(T(c=>c===!0?a:g({},Kg)))}function cD(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?g({},Kg):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let r=(n.matcher||NC)(e,t,n);if(!r)return g({},Kg);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path});let s=r.consumed.length>0?g(g({},o),r.consumed[r.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:r.consumed,remainingSegments:e.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function RC(t,n,e,i,r){return e.length>0&&SO(t,e,i,r)?{segmentGroup:new xe(n,IO(i,new xe(e,t.children))),slicedSegments:[]}:e.length===0&&MO(t,e,i)?{segmentGroup:new xe(t.segments,xO(t,e,i,t.children)),slicedSegments:e}:{segmentGroup:new xe(t.segments,t.children),slicedSegments:e}}function xO(t,n,e,i){let r={};for(let o of e)if(Tu(t,n,o)&&!i[In(o)]){let s=new xe([],{});r[In(o)]=s}return g(g({},i),r)}function IO(t,n){let e={};e[oe]=n;for(let i of t)if(i.path===""&&In(i)!==oe){let r=new xe([],{});e[In(i)]=r}return e}function SO(t,n,e,i){return e.some(r=>!Tu(t,n,r)||!(In(r)!==oe)?!1:!(i!==void 0&&In(r)===i))}function MO(t,n,e){return e.some(i=>Tu(t,n,i))}function Tu(t,n,e){return(t.hasChildren()||n.length>0)&&e.pathMatch==="full"?!1:e.path===""}function TO(t,n,e){return n.length===0&&!t.children[e]}var Qg=class{};async function AO(t,n,e,i,r,o,s="emptyOnly",a){return new Xg(t,n,e,i,r,s,o,a).recognize()}var RO=31,Xg=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,e,i,r,o,s,a,l){this.injector=n,this.configLoader=e,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new Zg(this.urlSerializer,this.urlTree)}noMatchError(n){return new E(4002,`'${n.segmentGroup}'`)}async recognize(){let n=RC(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:i}=await this.match(n),r=new zt(i,e),o=new Wa("",r),s=WC(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(n){let e=new qo([],Object.freeze({}),Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),oe,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,n,oe,e),rootSnapshot:e}}catch(i){if(i instanceof qa)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof li?this.noMatchError(i):i}}async processSegmentGroup(n,e,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(n,e,i,o);let s=await this.processSegment(n,e,i,i.segments,r,!0,o);return s instanceof zt?[s]:[]}async processChildren(n,e,i,r){let o=[];for(let l of Object.keys(i.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=i.children[l],u=DO(e,l),f=await this.processSegmentGroup(n,u,c,l,r);s.push(...f)}let a=dD(s);return kO(a),a}async processSegment(n,e,i,r,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??n,e,l,i,r,o,s,a)}catch(c){if(c instanceof li||rD(c))continue;throw c}if(TO(i,r,o))return new Qg;throw new li(i)}async processSegmentAgainstRoute(n,e,i,r,o,s,a,l){if(In(i)!==s&&(s===oe||!Tu(r,o,i)))throw new li(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,r,i,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(n,r,e,i,o,s,l);throw new li(r)}async expandSegmentAgainstRouteUsingRedirect(n,e,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:f,remainingSegments:h}=cD(e,r,o);if(!l)throw new li(e);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>RO&&(this.allowRedirects=!1));let p=this.createSnapshot(n,r,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let w=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,f,lD(p),n),I=await this.applyRedirects.lineralizeSegments(r,w);return this.processSegment(n,i,e,I.concat(h),s,!1,a)}createSnapshot(n,e,i,r,o){let s=new qo(i,r,Object.freeze(g({},this.urlTree.queryParams)),this.urlTree.fragment,OO(e),In(e),e.component??e._loadedComponent??null,e,FO(e),n),a=Jg(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(n,e,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=lt=>this.createSnapshot(n,i,lt.consumedSegments,lt.parameters,s),l=await du(EO(e,i,r,n,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(e.children={}),!l?.matched)throw new li(e);n=i._injector??n;let{routes:c}=await this.getChildConfig(n,i,r),u=i._loadedInjector??n,{parameters:f,consumedSegments:h,remainingSegments:p}=l,w=this.createSnapshot(n,i,h,f,s),{segmentGroup:I,slicedSegments:A}=RC(e,h,p,c,o);if(A.length===0&&I.hasChildren()){let lt=await this.processChildren(u,c,I,w);return new zt(w,lt)}if(c.length===0&&A.length===0)return new zt(w,[]);let j=In(i)===o,Ee=await this.processSegment(u,c,I,A,j?oe:o,!0,w);return new zt(w,Ee instanceof zt?[Ee]:[])}async getChildConfig(n,e,i){if(e.children)return{routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await du(vO(n,e,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw bO(e)}return{routes:[],injector:n}}};function kO(t){t.sort((n,e)=>n.value.outlet===oe?-1:e.value.outlet===oe?1:n.value.outlet.localeCompare(e.value.outlet))}function NO(t){let n=t.value.routeConfig;return n&&n.path===""}function dD(t){let n=[],e=new Set;for(let i of t){if(!NO(i)){n.push(i);continue}let r=n.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),e.add(r)):n.push(i)}for(let i of e){let r=dD(i.children);n.push(new zt(i.value,r))}return n.filter(i=>!e.has(i))}function OO(t){return t.data||{}}function FO(t){return t.resolve||{}}function PO(t,n,e,i,r,o,s){return Re(async a=>{let{state:l,tree:c}=await AO(t,n,e,i,a.extractedUrl,r,o,s);return q(g({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function LO(t){return Re(n=>{let{targetSnapshot:e,guards:{canActivateChecks:i}}=n;if(!i.length)return x(n);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let l of uD(a))o.add(l);let s=0;return Ae(o).pipe(ho(a=>r.has(a)?jO(a,e,t):(a.data=Jg(a,a.parent,t).resolve,x(void 0))),Oe(()=>s++),vc(1),Re(a=>s===o.size?x(n):Ge))})}function uD(t){let n=t.children.map(e=>uD(e)).flat();return[t,...n]}function jO(t,n,e){let i=t.routeConfig,r=t._resolve;return i?.title!==void 0&&!JC(i)&&(r[Ya]=i.title),un(()=>(t.data=Jg(t,t.parent,e).resolve,VO(r,t,n).pipe(T(o=>(t._resolvedData=o,t.data=g(g({},t.data),o),null)))))}function VO(t,n,e){let i=Vg(t);if(i.length===0)return x({});let r={};return Ae(i).pipe(Re(o=>BO(t[o],n,e).pipe(et(),Oe(s=>{if(s instanceof Yo)throw xu(new Hi,s);r[o]=s}))),vc(1),T(()=>r),Gt(o=>rD(o)?Ge:Mt(o)))}function BO(t,n,e){let i=n._environmentInjector,r=Qo(t,i),o=r.resolve?r.resolve(n,e):ut(i,()=>r(n,e));return Hr(o)}function kC(t){return we(n=>{let e=t(n);return e?Ae(e).pipe(T(()=>n)):x(n)})}var iv=(()=>{class t{buildTitle(e){let i,r=e.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===oe);return i}getResolvedTitleForRoute(e){return e.data[Ya]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(fD),providedIn:"root"})}return t})(),fD=(()=>{class t extends iv{title;constructor(e){super(),this.title=e}updateTitle(e){let i=this.buildTitle(e);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||t)(R(EC))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Xa=new v("",{factory:()=>({})}),Ja=new v(""),hD=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=d(ig);async loadComponent(e,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await FC(ut(e,()=>i.loadComponent())),s=await gD(mD(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(e,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await pD(i,this.compiler,e,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();async function pD(t,n,e,i){let r=await FC(ut(e,()=>t.loadChildren())),o=await gD(mD(r)),s;o instanceof kd||Array.isArray(o)?s=o:s=await n.compileModuleAsync(o),i&&i(t);let a,l,c=!1,u;return Array.isArray(s)?(l=s,c=!0):(a=s.create(e).injector,u=s,l=a.get(Ja,[],{optional:!0,self:!0}).flat()),{routes:l.map(nv),injector:a,factory:u}}function HO(t){return t&&typeof t=="object"&&"default"in t}function mD(t){return HO(t)?t.default:t}async function gD(t){return t}var Au=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(UO),providedIn:"root"})}return t})(),UO=(()=>{class t{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,i){return e}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),vD=new v("");var zO=()=>{},yD=new v(""),_D=(()=>{class t{currentNavigation=Ce(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=Ce(null);events=new D;transitionAbortWithErrorSubject=new D;configLoader=d(hD);environmentInjector=d(ke);destroyRef=d(vt);urlSerializer=d(Za);rootContexts=d(Ko);location=d(ji);inputBindingEnabled=d(Mu,{optional:!0})!==null;titleStrategy=d(iv);options=d(Xa,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=d(Au);createViewTransition=d(vD,{optional:!0});navigationErrorHandler=d(yD,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>x(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=r=>this.events.next(new vu(r)),i=r=>this.events.next(new yu(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let i=++this.navigationId;st(()=>{this.transitions?.next(q(g({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new We(null),this.transitions.pipe(re(i=>i!==null),we(i=>{let r=!1,o=new AbortController,s=()=>!r&&this.currentTransition?.id===i.id;return x(i).pipe(we(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",xt.SupersededByNewNavigation),Ge;this.currentTransition=i;let l=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:l?q(g({},l),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let c=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!c&&u!=="reload")return this.events.next(new di(a.id,this.urlSerializer.serialize(a.rawUrl),"",Ha.IgnoredSameUrlNavigation)),a.resolve(!1),Ge;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return x(a).pipe(we(f=>(this.events.next(new Vr(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),f.id!==this.navigationId?Ge:Promise.resolve(f))),PO(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Oe(f=>{i.targetSnapshot=f.targetSnapshot,i.urlAfterRedirects=f.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=f.urlAfterRedirects,h)),this.events.next(new za)}),we(f=>Ae(i.routesRecognizeHandler.deferredHandle??x(void 0)).pipe(T(()=>f))),Oe(()=>{let f=new Ua(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(f)}));if(c&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:f,extractedUrl:h,source:p,restoredState:w,extras:I}=a,A=new Vr(f,this.urlSerializer.serialize(h),p,w);this.events.next(A);let j=QC(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=q(g({},a),{targetSnapshot:j,urlAfterRedirects:h,extras:q(g({},I),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(Ee=>(Ee.finalUrl=h,Ee)),x(i)}else return this.events.next(new di(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Ha.IgnoredByUrlHandlingStrategy)),a.resolve(!1),Ge}),T(a=>{let l=new hu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(l),this.currentTransition=i=q(g({},a),{guards:XN(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),cO(a=>this.events.next(a)),we(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw xu(this.urlSerializer,a.guardsResult);let l=new pu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(l),!s())return Ge;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",xt.GuardRejected),Ge;if(a.guards.canActivateChecks.length===0)return x(a);let c=new mu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(c),!s())return Ge;let u=!1;return x(a).pipe(LO(this.paramsInheritanceStrategy),Oe({next:()=>{u=!0;let f=new gu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(f)},complete:()=>{u||this.cancelNavigationTransition(a,"",xt.NoDataFromResolver)}}))}),kC(a=>{let l=u=>{let f=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let h=u._environmentInjector;f.push(this.configLoader.loadComponent(h,u.routeConfig).then(p=>{u.component=p}))}for(let h of u.children)f.push(...l(h));return f},c=l(a.targetSnapshot.root);return c.length===0?x(a):Ae(Promise.all(c).then(()=>a))}),kC(()=>this.afterPreactivation()),we(()=>{let{currentSnapshot:a,targetSnapshot:l}=i,c=this.createViewTransition?.(this.environmentInjector,a.root,l.root);return c?Ae(c).pipe(T(()=>i)):x(i)}),_e(1),we(a=>{let l=YN(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=q(g({},a),{targetRouterState:l}),this.currentNavigation.update(u=>(u.targetRouterState=l,u)),this.events.next(new Wo);let c=i.beforeActivateHandler.deferredHandle;return c?Ae(c.then(()=>a)):x(a)}),Oe(a=>{new Yg(e.routeReuseStrategy,i.targetRouterState,i.currentRouterState,l=>this.events.next(l),this.inputBindingEnabled).activate(this.rootContexts),s()&&(r=!0,this.currentNavigation.update(l=>(l.abort=zO,l)),this.lastSuccessfulNavigation.set(st(this.currentNavigation)),this.events.next(new ci(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),pe(oD(o.signal).pipe(re(()=>!r&&!i.targetRouterState),Oe(()=>{this.cancelNavigationTransition(i,o.signal.reason+"",xt.Aborted)}))),Oe({complete:()=>{r=!0}}),pe(this.transitionAbortWithErrorSubject.pipe(Oe(a=>{throw a}))),bi(()=>{o.abort(),r||this.cancelNavigationTransition(i,"",xt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Gt(a=>{if(r=!0,this.destroyed)return i.resolve(!1),Ge;if(iD(a))this.events.next(new nn(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),QN(a)?this.events.next(new Go(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let l=new Br(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let c=ut(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(c instanceof Yo){let{message:u,cancellationCode:f}=xu(this.urlSerializer,c);this.events.next(new nn(i.id,this.urlSerializer.serialize(i.extractedUrl),u,f)),this.events.next(new Go(c.redirectTo,c.navigationBehaviorOptions))}else throw this.events.next(l),a}catch(c){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(c)}}return Ge}))}))}cancelNavigationTransition(e,i,r){let o=new nn(e.id,this.urlSerializer.serialize(e.extractedUrl),i,r);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=st(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return e.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function $O(t){return t!==ja}var bD=new v("");var wD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(WO),providedIn:"root"})}return t})(),Su=class{shouldDetach(n){return!1}store(n,e){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return!0}},WO=(()=>{class t extends Su{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),rv=(()=>{class t{urlSerializer=d(Za);options=d(Xa,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=d(ji);urlHandlingStrategy=d(Au);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new rn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:i,targetBrowserUrl:r}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,i):i,s=r??o;return s instanceof rn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:i,initialUrl:r}){i&&e?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=e):this.rawUrlTree=r}routerState=QC(null,d(ke));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>d(GO),providedIn:"root"})}return t})(),GO=(()=>{class t extends rv{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{e(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,i){e instanceof Vr?this.updateStateMemento():e instanceof di?this.commitTransition(i):e instanceof Ua?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof Wo?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof nn&&!KC(e)?this.restoreHistory(i):e instanceof Br?this.restoreHistory(i,!0):e instanceof ci&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=g(g({},a),this.generateNgRouterState(o,l,i));this.location.replaceState(e,"",c)}else{let l=g(g({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(e,"",l)}}restoreHistory(e,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,i,r){return this.canceledNavigationResolution==="computed"?g({navigationId:e,\u0275routerPageId:i},this.routerUrlState(r)):g({navigationId:e},this.routerUrlState(r))}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ov(t,n){t.events.pipe(re(e=>e instanceof ci||e instanceof nn||e instanceof Br||e instanceof di),T(e=>e instanceof ci||e instanceof di?0:(e instanceof nn?e.code===xt.Redirect||e.code===xt.SupersededByNewNavigation:!1)?2:1),re(e=>e!==2),_e(1)).subscribe(()=>{n()})}var Ru=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=d(Fd);stateManager=d(rv);options=d(Xa,{optional:!0})||{};pendingTasks=d(Xn);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=d(_D);urlSerializer=d(Za);location=d(ji);urlHandlingStrategy=d(Au);injector=d(ke);_events=new D;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=d(wD);injectorCleanup=d(bD,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=d(Ja,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!d(Mu,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new he;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=st(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof nn&&i.code!==xt.Redirect&&i.code!==xt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof ci)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Go){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=g({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||$O(r.source)},s);this.scheduleNavigation(a,ja,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}GN(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),ja,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,i,r,o)=>{this.navigateToSyncWithBrowser(e,r,i,o)})}navigateToSyncWithBrowser(e,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??e;if(r?.\u0275routerUrl&&(o=q(g({},o),{browserUrl:e})),r){let c=g({},r);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c)}let l=this.parseUrl(a);this.scheduleNavigation(l,i,s,o).catch(c=>{this.disposed||this.injector.get(yn)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return st(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(nv),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=g(g({},this.currentUrlTree.queryParams),o);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null}u!==null&&(u=this.removeEmptyProps(u));let f;try{let h=r?r.snapshot:this.routerState.snapshot.root;f=GC(h)}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),f=this.currentUrlTree.root}return qC(f,e,u,c??null,this.urlSerializer)}navigateByUrl(e,i={skipLocationChange:!1}){let r=$o(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,ja,null,i)}navigate(e,i={skipLocationChange:!1}){return qO(e),this.navigateByUrl(this.createUrlTree(e,i),i)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(Nn(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,i){let r;if(i===!0?r=g({},LC):i===!1?r=g({},Bg):r=g(g({},Bg),i),$o(e))return IC(this.currentUrlTree,e,r);let o=this.parseUrl(e);return IC(this.currentUrlTree,o,r)}removeEmptyProps(e){return Object.entries(e).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(e,i,r,o,s){if(this.disposed)return Promise.resolve(!1);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((f,h)=>{a=f,l=h});let u=this.pendingTasks.add();return ov(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function qO(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new E(4008,!1)}var KO=new v("");function sv(t,...n){return dt([{provide:Ja,multi:!0,useValue:t},[],{provide:Ui,useFactory:QO},{provide:jd,multi:!0,useFactory:XO},n.map(e=>e.\u0275providers)])}function QO(){return d(Ru).routerState.root}function XO(){let t=d(F);return n=>{let e=t.get(_t);if(n!==e.components[0])return;let i=t.get(Ru),r=t.get(JO);t.get(eF)===1&&i.initialNavigation(),t.get(tF,null,{optional:!0})?.setUpPreloading(),t.get(KO,null,{optional:!0})?.init(),i.resetRootComponentType(e.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var JO=new v("",{factory:()=>new D}),eF=new v("",{factory:()=>1});var tF=new v("");var av="Service workers are disabled or not supported by this browser",Xo=class{serviceWorker;worker;registration;events;constructor(n,e){if(this.serviceWorker=n,!n)this.worker=this.events=this.registration=new W(i=>i.error(new E(5601,!1)));else{let i=null,r=new D;this.worker=new W(c=>(i!==null&&c.next(i),r.subscribe(u=>c.next(u))));let o=()=>{let{controller:c}=n;c!==null&&(i=c,r.next(i))};n.addEventListener("controllerchange",o),o(),this.registration=this.worker.pipe(we(()=>n.getRegistration().then(c=>{if(!c)throw new E(5601,!1);return c})));let s=new D;this.events=s.asObservable();let a=c=>{let{data:u}=c;u?.type&&s.next(u)};n.addEventListener("message",a),e?.get(_t,null,{optional:!0})?.onDestroy(()=>{n.removeEventListener("controllerchange",o),n.removeEventListener("message",a)})}}postMessage(n,e){return new Promise(i=>{this.worker.pipe(_e(1)).subscribe(r=>{r.postMessage(g({action:n},e)),i()})})}postMessageWithOperation(n,e,i){let r=this.waitForOperationCompleted(i),o=this.postMessage(n,e);return Promise.all([o,r]).then(([,s])=>s)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(n){let e;return typeof n=="string"?e=i=>i.type===n:e=i=>n.includes(i.type),this.events.pipe(re(e))}nextEventOfType(n){return this.eventsOfType(n).pipe(_e(1))}waitForOperationCompleted(n){return new Promise((e,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(re(r=>r.nonce===n),_e(1),T(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:e,error:i})})}get isEnabled(){return!!this.serviceWorker}},DD=(()=>{class t{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new D;constructor(e){if(this.sw=e,!e.isEnabled){this.messages=Wn,this.notificationClicks=Wn,this.notificationCloses=Wn,this.pushSubscriptionChanges=Wn,this.subscription=Wn;return}this.messages=this.sw.eventsOfType("PUSH").pipe(T(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(T(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(T(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(T(r=>r.data)),this.pushManager=this.sw.registration.pipe(T(r=>r.pushManager));let i=this.pushManager.pipe(we(r=>r.getSubscription()));this.subscription=new W(r=>{let o=i.subscribe(r),s=this.subscriptionChanges.subscribe(r);return()=>{o.unsubscribe(),s.unsubscribe()}})}requestSubscription(e){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(av));let i={userVisibleOnly:!0},r=this.decodeBase64(e.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),o=new Uint8Array(new ArrayBuffer(r.length));for(let s=0;s<r.length;s++)o[s]=r.charCodeAt(s);return i.applicationServerKey=o,new Promise((s,a)=>{this.pushManager.pipe(we(l=>l.subscribe(i)),_e(1)).subscribe({next:l=>{this.subscriptionChanges.next(l),s(l)},error:a})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(av));let e=i=>{if(i===null)throw new E(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new E(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(_e(1),we(e)).subscribe({next:i,error:r})})}decodeBase64(e){return atob(e)}static \u0275fac=function(i){return new(i||t)(R(Xo))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),ku=(()=>{class t{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(e){if(this.sw=e,!e.isEnabled){this.versionUpdates=Wn,this.unrecoverable=Wn;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(av));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let e=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:e},e).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new E(5601,!1));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:e},e)}static \u0275fac=function(i){return new(i||t)(R(Xo))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),ED=new v("");function iF(){let t=d(el);if(!("serviceWorker"in navigator&&t.enabled!==!1))return;let n=d(ED),e=d(B),i=d(_t);e.runOutsideAngular(()=>{let r=navigator.serviceWorker,o=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",o),i.onDestroy(()=>{r.removeEventListener("controllerchange",o)})}),e.runOutsideAngular(()=>{let r,{registrationStrategy:o}=t;if(typeof o=="function")r=new Promise(s=>o().subscribe(()=>s()));else{let[s,...a]=(o||"registerWhenStable:30000").split(":");switch(s){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=CD(+a[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),CD(+a[0])]);break;default:throw new E(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(n,{scope:t.scope,updateViaCache:t.updateViaCache,type:t.type}).catch(s=>console.error(Nn(5604,!1)))})})}function CD(t){return new Promise(n=>setTimeout(n,t))}function rF(){let t=d(el),n=d(F),e=!0;return new Xo(e&&t.enabled!==!1?navigator.serviceWorker:void 0,n)}var el=class{enabled;updateViaCache;type;scope;registrationStrategy};function oF(t,n={}){return dt([DD,ku,{provide:ED,useValue:t},{provide:el,useValue:n},{provide:Xo,useFactory:rF},Ld(iF)])}var xD=(()=>{class t{static register(e,i={}){return{ngModule:t,providers:[oF(e,i)]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({providers:[DD,ku]})}return t})();function Ur(t){return t.buttons===0||t.detail===0}function zr(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var lv;function ID(){if(lv==null){let t=typeof document<"u"?document.head:null;lv=!!(t&&(t.createShadowRoot||t.attachShadow))}return lv}function cv(t){if(ID()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function tl(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function wt(t){return t.composedPath?t.composedPath()[0]:t.target}var dv;try{dv=typeof Intl<"u"&&Intl.v8BreakIterator}catch{dv=!1}var Ie=(()=>{class t{_platformId=d(ei);isBrowser=this._platformId?Ma(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||dv)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var nl;function SD(){if(nl==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>nl=!0}))}finally{nl=nl||!1}return nl}function Jo(t){return SD()?t:!!t.capture}function on(t,n=0){return MD(t)?Number(t):arguments.length===2?n:0}function MD(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Bn(t){return t instanceof k?t.nativeElement:t}var TD=new v("cdk-input-modality-detector-options"),AD={ignoreKeys:[18,17,224,91,16]},RD=650,uv={passive:!0,capture:!0},kD=(()=>{class t{_platform=d(Ie);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new We(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=wt(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<RD||(this._modality.next(Ur(e)?"keyboard":"mouse"),this._mostRecentTarget=wt(e))};_onTouchstart=e=>{if(zr(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=wt(e)};constructor(){let e=d(B),i=d(G),r=d(TD,{optional:!0});if(this._options=g(g({},AD),r),this.modalityDetected=this._modality.pipe(Fs(1)),this.modalityChanged=this.modalityDetected.pipe(gc()),this._platform.isBrowser){let o=d(ft).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,uv),o.listen(i,"mousedown",this._onMousedown,uv),o.listen(i,"touchstart",this._onTouchstart,uv)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),il=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(il||{}),ND=new v("cdk-focus-monitor-default-options"),Nu=Jo({passive:!0,capture:!0}),sn=(()=>{class t{_ngZone=d(B);_platform=d(Ie);_inputModalityDetector=d(kD);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=d(G);_stopInputModalityDetector=new D;constructor(){let e=d(ND,{optional:!0});this._detectionMode=e?.detectionMode||il.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=wt(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r)};monitor(e,i=!1){let r=Bn(e);if(!this._platform.isBrowser||r.nodeType!==1)return x();let o=cv(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=!0),s.subject;let a={checkChildren:i,subject:new D,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=Bn(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(e,i,r){let o=Bn(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===il.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===il.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?RD:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(e,i){let r=this._elementInfo.get(i),o=wt(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Nu),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Nu)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(pe(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Nu),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Nu),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ou=new WeakMap,It=(()=>{class t{_appRef;_injector=d(F);_environmentInjector=d(ke);load(e){let i=this._appRef=this._appRef||this._injector.get(_t),r=Ou.get(i);r||(r={loaders:new Set,refs:[]},Ou.set(i,r),i.onDestroy(()=>{Ou.get(i)?.refs.forEach(o=>o.destroy()),Ou.delete(i)})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(qd(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Pu=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})(),Fu;function sF(){if(Fu===void 0&&(Fu=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(Fu=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Fu}function $r(t){return sF()?.createHTML(t)||t}function OD(t,n,e){let i=e.sanitize(ot.HTML,n);t.innerHTML=$r(i||"")}function es(t){return Array.isArray(t)?t:[t]}var FD=new Set,Wr,Lu=(()=>{class t{_platform=d(Ie);_nonce=d(kr,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):lF}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&aF(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function aF(t,n){if(!FD.has(t))try{Wr||(Wr=document.createElement("style"),n&&Wr.setAttribute("nonce",n),Wr.setAttribute("type","text/css"),document.head.appendChild(Wr)),Wr.sheet&&(Wr.sheet.insertRule(`@media ${t} {body{ }}`,0),FD.add(t))}catch(e){console.error(e)}}function lF(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var Gr=(()=>{class t{_mediaMatcher=d(Lu);_zone=d(B);_queries=new Map;_destroySubject=new D;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return PD(es(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=PD(es(e)).map(s=>this._registerQuery(s).observable),o=cr(r);return o=_i(o.pipe(_e(1)),o.pipe(Fs(1),dr(0))),o.pipe(T(s=>{let a={matches:!1,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new W(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a)}}).pipe(Ve(i),T(({matches:s})=>({query:e,matches:s})),pe(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function PD(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var cF=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var LD=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({providers:[cF]})}return t})();var ts=(()=>{class t{_platform=d(Ie);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return uF(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let i=dF(_F(e));if(i&&(jD(i)===-1||!this.isVisible(i)))return!1;let r=e.nodeName.toLowerCase(),o=jD(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!vF(e)?!1:r==="audio"?e.hasAttribute("controls")?o!==-1:!1:r==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return yF(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function dF(t){try{return t.frameElement}catch{return null}}function uF(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function fF(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function hF(t){return mF(t)&&t.type=="hidden"}function pF(t){return gF(t)&&t.hasAttribute("href")}function mF(t){return t.nodeName.toLowerCase()=="input"}function gF(t){return t.nodeName.toLowerCase()=="a"}function VD(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function jD(t){if(!VD(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function vF(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function yF(t){return hF(t)?!1:fF(t)||pF(t)||t.hasAttribute("contenteditable")||VD(t)}function _F(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var ju=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,i,r,o=!1,s){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=s,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?Xe(n,{injector:this._injector}):setTimeout(n)}},rl=(()=>{class t{_checker=d(ts);_ngZone=d(B);_document=d(G);_injector=d(F);constructor(){d(It).load(Pu)}create(e,i=!1){return new ju(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var BD=new v("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),HD=new v("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),bF=0,ol=(()=>{class t{_ngZone=d(B);_defaultOptions=d(HD,{optional:!0});_liveElement;_document=d(G);_sanitizer=d(Oa);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=d(BD,{optional:!0});this._liveElement=e||this._createLiveElement()}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:OD(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${bF++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var wF=200,Vu=class{_letterKeyStream=new D;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new D;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:wF;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(Oe(e=>this._pressedLetters.push(e)),dr(n),re(()=>this._pressedLetters.length>0),T(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function gt(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var ns=class{_items;_activeItemIndex=Ce(-1);_activeItem=Ce(null);_wrap=!1;_typeaheadSubscription=he.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof wn?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Ni(n)&&(this._effectRef=Ir(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new D;change=new D;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new Vu(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||gt(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return Ni(this._items)?this._items():this._items instanceof wn?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var dl=class extends ns{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles()}};var ul=class extends ns{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var fv={},ze=class t{_appId=d(No);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),fv.hasOwnProperty(n)||(fv[n]=0),`${n}${e?t._infix+"-":""}${fv[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var zD=" ";function $D(t,n,e){let i=WD(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(zD)))}function hv(t,n,e){let i=WD(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(zD)):t.removeAttribute(n)}function WD(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var is={XSmall:"(max-width: 599.98px)",Small:"(min-width: 600px) and (max-width: 959.98px)",Medium:"(min-width: 960px) and (max-width: 1279.98px)",Large:"(min-width: 1280px) and (max-width: 1919.98px)",XLarge:"(min-width: 1920px)",Handset:"(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",Tablet:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",Web:"(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)",TabletPortrait:"(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",WebPortrait:"(min-width: 840px) and (orientation: portrait)",HandsetLandscape:"(max-width: 959.98px) and (orientation: landscape)",TabletLandscape:"(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",WebLandscape:"(min-width: 1280px) and (orientation: landscape)"};function pv(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}function Ze(t){return t==null?"":typeof t=="string"?t:`${t}px`}var DF=new v("cdk-dir-doc",{providedIn:"root",factory:()=>d(G)}),EF=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function GD(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?EF.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var at=(()=>{class t{get value(){return this.valueSignal()}valueSignal=Ce("ltr");change=new z;constructor(){let e=d(DF,{optional:!0});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(GD(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Sn=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(Sn||{}),Bu,qr;function Hu(){if(qr==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return qr=!1,qr;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)qr=!0;else{let t=Element.prototype.scrollTo;t?qr=!/\{\s*\[native code\]\s*\}/.test(t.toString()):qr=!1}}return qr}function rs(){if(typeof document!="object"||!document)return Sn.NORMAL;if(Bu==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),Bu=Sn.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,Bu=t.scrollLeft===0?Sn.NEGATED:Sn.INVERTED),t.remove()}return Bu}var ve=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})();var xF=20,Yr=(()=>{class t{_ngZone=d(B);_platform=d(Ie);_renderer=d(ft).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new D;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=xF){return this._platform.isBrowser?new W(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(pc(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):x()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(re(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,e)&&i.push(o)}),i}_scrollableContainsElement(e,i){let r=Bn(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),zi=(()=>{class t{elementRef=d(k);scrollDispatcher=d(Yr);ngZone=d(B);dir=d(at,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new D;_renderer=d(Pe);_cleanupScroll;_elementScrolled=new D;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&rs()!=Sn.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),rs()==Sn.INVERTED?e.left=e.right:rs()==Sn.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;Hu()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&rs()==Sn.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&rs()==Sn.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),IF=20,Hn=(()=>{class t{_platform=d(Ie);_listeners;_viewportSize=null;_change=new D;_document=d(G);constructor(){let e=d(B),i=d(ft).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:s,left:a}}change(e=IF){return e>0?this._change.pipe(pc(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ui=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})(),mv=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve,ui,ve,ui]})}return t})();var fl=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},fi=class extends fl{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,e,i,r,o){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},Mn=class extends fl{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},gv=class extends fl{element;constructor(n){super(),this.element=n instanceof k?n.nativeElement:n}},$i=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof fi)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Mn)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof gv)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},hl=class extends $i{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(Ln,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=n.injector||this._defaultInjector||F.NULL,o=r.get(ke,i.injector);e=qd(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var Wi=(()=>{class t extends $i{_moduleRef=d(Ln,{optional:!0});_document=d(G);_viewContainerRef=d(yt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new z;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[De]})}return t})(),pl=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})();var qD=Hu();function as(t){return new Uu(t.get(Hn),t.get(G))}var Uu=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Ze(-this._previousScrollPosition.left),n.style.top=Ze(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),qD&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),qD&&(i.scrollBehavior=o,r.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function eE(t,n){return new zu(t.get(Yr),t.get(B),t.get(Hn),n)}var zu=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(re(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var ml=class{enable(){}disable(){}attach(){}};function vv(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,s=t.left>e.right;return i||r||o||s})}function YD(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,s=t.right>e.right;return i||r||o||s})}function Kr(t,n){return new $u(t.get(Yr),t.get(Hn),t.get(B),n)}var $u=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();vv(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},tE=(()=>{class t{_injector=d(F);constructor(){}noop=()=>new ml;close=e=>eE(this._injector,e);block=()=>as(this._injector);reposition=e=>Kr(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Tn=class{positionStrategy;scrollStrategy=new ml;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var Wu=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var nE=(()=>{class t{_attachedOverlays=[];_document=d(G);_isAttached=!1;constructor(){}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),iE=(()=>{class t extends nE{_ngZone=d(B);_renderer=d(ft).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),rE=(()=>{class t extends nE{_platform=d(Ie);_ngZone=d(B);_renderer=d(ft).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=wt(e)};_clickListener=e=>{let i=wt(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(ZD(a.overlayElement,i)||ZD(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e)}}};static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ZD(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var oE=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Yu=(()=>{class t{_platform=d(Ie);_containerElement;_document=d(G);_styleLoader=d(It);constructor(){}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||pv()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement("div");i.classList.add(e),pv()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(oE)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),yv=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function _v(t){return t&&t.nodeType===1}var os=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new D;_attachments=new D;_detachments=new D;_positionStrategy;_scrollStrategy;_locationChanges=he.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new D;_outsidePointerEvents=new D;_afterNextRenderRef;constructor(n,e,i,r,o,s,a,l,c,u=!1,f,h){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=u,this._injector=f,this._renderer=h,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Xe(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=g(g({},this._config),n),this._updateElementSize()}setDirection(n){this._config=q(g({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Ze(this._config.width),n.height=Ze(this._config.height),n.minWidth=Ze(this._config.minWidth),n.minHeight=Ze(this._config.minHeight),n.maxWidth=Ze(this._config.maxWidth),n.maxHeight=Ze(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;_v(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new yv(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let r=es(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=Xe(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},KD="cdk-overlay-connected-position-bounding-box",MF=/([A-Za-z%]+)$/;function gl(t,n){return new Gu(n,t.get(Hn),t.get(G),t.get(Ie),t.get(Yu))}var Gu=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new D;_resizeSubscription=he.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(KD),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,r,a),c=this._getOverlayPoint(l,e,a),u=this._getOverlayFit(c,e,i,a);if(u.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(u,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<u.visibleArea)&&(s={overlayFit:u,overlayPoint:c,originPoint:l,position:a,overlayRect:e})}if(o.length){let a=null,l=-1;for(let c of o){let u=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);u>l&&(l=u,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Zr(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(KD),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof k?this._origin.nativeElement:_v(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else{let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;r=i.originX=="start"?s:a}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=XD(e),{x:s,y:a}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let u=0-s,f=s+o.width-i.width,h=0-a,p=a+o.height-i.height,w=this._subtractOverflows(o.width,u,f),I=this._subtractOverflows(o.height,h,p),A=w*I;return{visibleArea:A,isCompletelyWithinViewport:o.width*o.height===A,fitsInViewportVertically:I===o.height,fitsInViewportHorizontally:w==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=QD(this._overlayRef.getConfig().minHeight),a=QD(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=r,c=n.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=XD(e),o=this._viewportRect,s=Math.max(n.x+r.width-o.width,0),a=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),u=0,f=0;return r.width<=o.width?u=c||-s:u=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-a:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:u,y:f},{x:n.x+u,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!TF(this._lastScrollVisibility,i)){let r=new Wu(n,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=n.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else{let p=Math.min(i.bottom-n.y+i.top,n.y),w=this._lastBoundingBoxSize.height;o=p*2,s=n.y-p,o>w&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-w/2)}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,u,f,h;if(c)h=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=n.x-this._getViewportMarginStart();else if(l)f=n.x,u=i.right-n.x-this._getViewportMarginEnd();else{let p=Math.min(i.right-n.x+i.left,n.x),w=this._lastBoundingBoxSize.width;u=p*2,f=n.x-p,u>w&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-w/2)}return{top:s,left:f,bottom:a,right:h,width:u,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=Ze(i.width),r.height=Ze(i.height),r.top=Ze(i.top)||"auto",r.bottom=Ze(i.bottom)||"auto",r.left=Ze(i.left)||"auto",r.right=Ze(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=Ze(o)),s&&(r.maxWidth=Ze(s))}this._lastBoundingBoxSize=i,Zr(this._boundingBox.style,r)}_resetBoundingBoxStyles(){Zr(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Zr(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let u=this._viewportRuler.getViewportScrollPosition();Zr(i,this._getExactOverlayY(e,n,u)),Zr(i,this._getExactOverlayX(e,n,u))}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=Ze(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=Ze(s.maxWidth):o&&(i.maxWidth="")),Zr(this._pane.style,i)}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`}else r.top=Ze(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`}else r.left=Ze(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:YD(n,i),isOriginOutsideView:vv(n,i),isOverlayClipped:YD(e,i),isOverlayOutsideView:vv(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&es(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof k)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function Zr(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function QD(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(MF);return!e||e==="px"?parseFloat(n):null}return t||null}function XD(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function TF(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var JD="cdk-global-overlay-wrapper";function Gi(t){return new qu}var qu=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(JD),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),u=this._xPosition,f=this._xOffset,h=this._overlayRef.getConfig().direction==="rtl",p="",w="",I="";l?I="flex-start":u==="center"?(I="center",h?w=f:p=f):h?u==="left"||u==="end"?(I="flex-end",p=f):(u==="right"||u==="start")&&(I="flex-start",w=f):u==="left"||u==="start"?(I="flex-start",p=f):(u==="right"||u==="end")&&(I="flex-end",w=f),n.position=this._cssPosition,n.marginLeft=l?"0":p,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":w,e.justifyContent=I,e.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(JD),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},sE=(()=>{class t{_injector=d(F);constructor(){}global(){return Gi()}flexibleConnectedTo(e){return gl(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),vl=new v("OVERLAY_DEFAULT_CONFIG");function pi(t,n){t.get(It).load(oE);let e=t.get(Yu),i=t.get(G),r=t.get(ze),o=t.get(_t),s=t.get(at),a=t.get(Pe,null,{optional:!0})||t.get(ft).createRenderer(null,null),l=new Tn(n),c=t.get(vl,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=!1;let u=i.createElement("div"),f=i.createElement("div");u.id=r.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),f.appendChild(u),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let h=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return _v(h)?h.after(f):h?.type==="parent"?h.element.appendChild(f):e.getContainerElement().appendChild(f),new os(new hl(u,o,t),f,u,l,t.get(B),t.get(iE),i,t.get(ji),t.get(rE),n?.disableAnimations??t.get(ua,null,{optional:!0})==="NoopAnimations",t.get(ke),a)}var aE=(()=>{class t{scrollStrategies=d(tE);_positionBuilder=d(sE);_injector=d(F);constructor(){}create(e){return pi(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),AF=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],RF=new v("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(F);return()=>Kr(t)}}),ss=(()=>{class t{elementRef=d(k);constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return t})(),lE=new v("cdk-connected-overlay-default-config"),Zu=(()=>{class t{_dir=d(at,{optional:!0});_injector=d(F);_overlayRef;_templatePortal;_backdropSubscription=he.EMPTY;_attachSubscription=he.EMPTY;_detachSubscription=he.EMPTY;_positionSubscription=he.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=d(RF);_ngZone=d(B);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position)}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position)}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=!1;disableClose=!1;transformOriginSelector;hasBackdrop=!1;lockPosition=!1;flexibleDimensions=!1;growAfterOpen=!1;push=!1;disposeOnNavigation=!1;usePopover;matchWidth=!1;set _config(e){typeof e!="string"&&this._assignConfig(e)}backdropClick=new z;positionChange=new z;attach=new z;detach=new z;overlayKeydown=new z;overlayOutsideClick=new z;constructor(){let e=d(rt),i=d(yt),r=d(lE,{optional:!0}),o=d(vl,{optional:!0});this.usePopover=o?.usePopover===!1?null:"global",this._templatePortal=new Mn(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r)}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose()}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay())}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=AF);let e=this._overlayRef=pi(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!gt(i)&&(i.preventDefault(),this.detachOverlay())}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=wt(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i)})}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new Tn({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return(this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=gl(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof ss?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof ss?this.origin.elementRef.nativeElement:this.origin instanceof k?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(Ps(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe()})),this.open=!0}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=!1}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",se],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",se],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",se],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",se],push:[2,"cdkConnectedOverlayPush","push",se],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",se],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",se],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Ke]})}return t})(),qi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({providers:[aE],imports:[ve,pl,mv,mv]})}return t})();var kF=new v("MATERIAL_ANIMATIONS"),cE=null;function NF(){return d(kF,{optional:!0})?.animationsDisabled||d(ua,{optional:!0})==="NoopAnimations"?"di-disabled":(cE??=d(Lu).matchMedia("(prefers-reduced-motion)").matches,cE?"reduced-motion":"enabled")}function je(){return NF()!=="enabled"}function an(t){return t!=null&&`${t}`!="false"}var ln=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(ln||{}),bv=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=ln.HIDDEN;constructor(n,e,i,r=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},dE=Jo({passive:!0,capture:!0}),wv=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]))}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,dE)})}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,dE)))}_delegateEventHandler=n=>{let e=wt(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n))})}},yl={enterDuration:225,exitDuration:150},OF=800,uE=Jo({passive:!0,capture:!0}),fE=["mousedown","touchstart"],hE=["mouseup","mouseleave","touchend","touchcancel"],FF=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),_l=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new wv;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=Bn(i)),o&&o.get(It).load(FF)}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=g(g({},yl),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||PF(n,e,r),a=n-r.left,l=e-r.top,c=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${l-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,i.color!=null&&(u.style.backgroundColor=i.color),u.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(u);let f=window.getComputedStyle(u),h=f.transitionProperty,p=f.transitionDuration,w=h==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,I=new bv(this,u,i,w);u.style.transform="scale3d(1, 1, 1)",I.state=ln.FADING_IN,i.persistent||(this._mostRecentTransientRipple=I);let A=null;return!w&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let j=()=>{A&&(A.fallbackTimer=null),clearTimeout(lt),this._finishRippleTransition(I)},Ee=()=>this._destroyRipple(I),lt=setTimeout(Ee,c+100);u.addEventListener("transitionend",j),u.addEventListener("transitioncancel",Ee),A={onTransitionEnd:j,onTransitionCancel:Ee,fallbackTimer:lt}}),this._activeRipples.set(I,A),(w||!c)&&this._finishRippleTransition(I),I}fadeOutRipple(n){if(n.state===ln.FADING_OUT||n.state===ln.HIDDEN)return;let e=n.element,i=g(g({},yl),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=ln.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Bn(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,fE.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{hE.forEach(e=>{this._triggerElement.addEventListener(e,this,uE)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===ln.FADING_IN?this._startFadeOutTransition(n):n.state===ln.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=ln.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=ln.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=Ur(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+OF;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!zr(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===ln.VISIBLE||n.config.terminateOnPointerUp&&n.state===ln.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(fE.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(hE.forEach(e=>n.removeEventListener(e,this,uE)),this._pointerUpEventsRegistered=!1))}};function PF(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var Cv=new v("mat-ripple-global-options"),ls=(()=>{class t{_elementRef=d(k);_animationsDisabled=je();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=d(B),i=d(Ie),r=d(Cv,{optional:!0}),o=d(F);this._globalOptions=r||{},this._rippleRenderer=new _l(this,e,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:g(g(g({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,g(g({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,g(g({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&$("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var LF={capture:!0},jF=["focus","mousedown","mouseenter","touchstart"],Dv="mat-ripple-loader-uninitialized",Ev="mat-ripple-loader-class-name",pE="mat-ripple-loader-centered",Ku="mat-ripple-loader-disabled",mE=(()=>{class t{_document=d(G);_animationsDisabled=je();_globalRippleOptions=d(Cv,{optional:!0});_platform=d(Ie);_ngZone=d(B);_injector=d(F);_eventCleanups;_hosts=new Map;constructor(){let e=d(ft).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>jF.map(i=>e.listen(this._document,i,this._onInteraction,LF)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute(Dv,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(Ev))&&e.setAttribute(Ev,i.className||""),i.centered&&e.setAttribute(pE,""),i.disabled&&e.setAttribute(Ku,"")}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(Ku,""):e.removeAttribute(Ku)}_onInteraction=e=>{let i=wt(e);if(i instanceof HTMLElement){let r=i.closest(`[${Dv}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(Ev)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??yl.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??yl.exitDuration,a={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(Ku),rippleConfig:{centered:e.hasAttribute(pE),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},l=new _l(a,this._ngZone,i,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:l,hasSetUpEvents:c}),e.removeAttribute(Dv)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Yi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var VF=["mat-icon-button",""],BF=["*"],HF=new v("MAT_BUTTON_CONFIG");function gE(t){return t==null?void 0:Or(t)}var xv=(()=>{class t{_elementRef=d(k);_ngZone=d(B);_animationsDisabled=je();_config=d(HF,{optional:!0});_focusMonitor=d(sn);_cleanupClick;_renderer=d(Pe);_rippleLoader=d(mE);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){d(It).load(Yi);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(le("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),Ot(r.color?"mat-"+r.color:""),$("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",se],disabled:[2,"disabled","disabled",se],ariaDisabled:[2,"aria-disabled","ariaDisabled",se],disabledInteractive:[2,"disabledInteractive","disabledInteractive",se],tabIndex:[2,"tabIndex","tabIndex",gE],_tabindex:[2,"tabindex","_tabindex",gE]}})}return t})(),Iv=(()=>{class t extends xv{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[De],attrs:VF,ngContentSelectors:BF,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(ue(),jt(0,"span",0),V(1),jt(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var cs=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var UF=["matButton",""],zF=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],$F=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var vE=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),ds=(()=>{class t extends xv{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=WF(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?vE.get(this._appearance):null,o=vE.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[De],attrs:UF,ngContentSelectors:$F,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(ue(zF),jt(0,"span",0),V(1),pt(2,"span",1),V(3,1),bt(),V(4,2),jt(5,"span",2)(6,"span",3)),i&2&&$("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function WF(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var Qr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[cs,ve]})}return t})();function GF(t,n){if(t&1){let e=Vt();y(0,"div",1)(1,"button",2),ce("click",function(){He(e);let r=S();return Ue(r.action())}),C(2),_()()}if(t&2){let e=S();m(2),K(" ",e.data.action," ")}}var qF=["label"];function YF(t,n){}var ZF=Math.pow(2,31)-1,bl=class{_overlayRef;instance;containerInstance;_afterDismissed=new D;_afterOpened=new D;_onAction=new D;_durationTimeoutId;_dismissedByAction=!1;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,ZF))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},yE=new v("MatSnackBarData"),us=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},KF=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),QF=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),XF=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),JF=(()=>{class t{snackBarRef=d(bl);data=d(yE);constructor(){}action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(y(0,"div",0),C(1),_(),H(2,GF,3,1,"div",1)),i&2&&(m(),K(" ",r.data.message,`
`),m(),U(r.hasAction?2:-1))},dependencies:[ds,KF,QF,XF],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Mv="_mat-snack-bar-enter",Tv="_mat-snack-bar-exit",e1=(()=>{class t extends $i{_ngZone=d(B);_elementRef=d(k);_changeDetectorRef=d(Te);_platform=d(Ie);_animationsDisabled=je();snackBarConfig=d(us);_document=d(G);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=d(F);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new D;_onExit=new D;_onEnter=new D;_animationState="void";_live;_label;_role;_liveElementId=d(ze).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"))}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===Tv?this._completeExit():e===Mv&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Xe(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Mv)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(Mv)},200)))}exit(){return this._destroyed?x(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Xe(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Tv)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Tv),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>e.classList.add(s)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");this._trackedModals.add(o),s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns")}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&Ye(Wi,7)(qF,7),i&2){let o;J(o=ee())&&(r._portalOutlet=o.first),J(o=ee())&&(r._label=o.first)}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&ce("animationend",function(s){return r.onAnimationEnd(s.animationName)})("animationcancel",function(s){return r.onAnimationEnd(s.animationName)}),i&2&&$("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled)},features:[De],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(y(0,"div",1)(1,"div",2,0)(3,"div",3),ht(4,YF,0,0,"ng-template",4),_(),ge(5,"div"),_()()),i&2&&(m(5),le("aria-live",r._live)("role",r._role)("id",r._liveElementId))},dependencies:[Wi],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2})}return t})(),t1=new v("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new us}),_E=(()=>{class t{_live=d(ol);_injector=d(F);_breakpointObserver=d(Gr);_parentSnackBar=d(t,{optional:!0,skipSelf:!0});_defaultConfig=d(t1);_animationsDisabled=je();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=JF;snackBarContainerComponent=e1;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}constructor(){}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=g(g({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=F.create({parent:r||this._injector,providers:[{provide:us,useValue:i}]}),s=new fi(this.snackBarContainerComponent,i.viewContainerRef,o),a=e.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(e,i){let r=g(g(g({},new us),this._defaultConfig),i),o=this._createOverlay(r),s=this._attachSnackBarContainer(o,r),a=new bl(s,o);if(e instanceof rt){let l=new Mn(e,null,{$implicit:r.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l)}else{let l=this._createInjector(r,a),c=new fi(e,void 0,l),u=s.attachComponentPortal(c);a.instance=u.instance}return this._breakpointObserver.observe(is.HandsetPortrait).pipe(pe(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),r.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness)}),this._animateSnackBar(a,r),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear()}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let i=new Tn;i.direction=e.direction;let r=Gi(this._injector),o=e.direction==="rtl",s=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,a=!s&&e.horizontalPosition!=="center";return s?r.left("0"):a?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,pi(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return F.create({parent:r||this._injector,providers:[{provide:bl,useValue:i},{provide:yE,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Av(t){t||(t=d(vt));let n=new W(e=>{if(t.destroyed){e.next();return}return t.onDestroy(e.next.bind(e))});return e=>e.pipe(pe(n))}var Nv=class{translations;constructor(n){this.translations=n}getTranslation(n){return x(this.translations.get(n)||{})}},CE=new v("TRANSLOCO_LOADER");function Rv(t,n){return t&&(Object.prototype.hasOwnProperty.call(t,n)?t[n]:n.split(".").reduce((e,i)=>e?.[i],t))}function n1(t,n,e){t=g({},t);let i=n.split("."),r=i.length-1;return i.reduce((o,s,a)=>(a===r?o[s]=e:o[s]=Array.isArray(o[s])?o[s].slice():g({},o[s]),o&&o[s]),t),t}function DE(t){return t?Array.isArray(t)?t.length:Ju(t)?Object.keys(t).length:t?t.length:0:0}function i1(t){return DE(t)===0}function r1(t){return typeof t=="function"}function hs(t){return typeof t=="string"}function Ju(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function EE(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,(n,e)=>e==0?n.toLowerCase():n.toUpperCase()).replace(/\s+|_|-|\//g,"")}function xE(){return typeof window<"u"}function Ov(t){return t==null}function bE(t){return Ov(t)===!1}function IE(t){return t&&typeof t.scope=="string"}function o1(t){return t&&Ju(t.loader)}function wE(t){let n={};function e(i,r){if(i===null)n[r]=null;else if(Ju(i))for(let[o,s]of Object.entries(i))e(s,r?`${r}.${o}`:o);else n[r]=i}return e(t,""),n}function s1(t){let n={};for(let[e,i]of Object.entries(t)){let r=e.split("."),o=n;r.forEach((s,a)=>{a===r.length-1?o[s]=i:(o[s]??={},o=o[s])})}return n}var ps=new v("TRANSLOCO_CONFIG",{providedIn:"root",factory:()=>fs}),fs={defaultLang:"en",reRenderOnLangChange:!1,prodMode:!1,failedRetries:2,fallbackLang:[],availableLangs:[],missingHandler:{logMissingKey:!0,useFallbackTranslation:!1,allowEmpty:!1},flatten:{aot:!1},interpolation:["{{","}}"],scopes:{keepCasing:!1}};function a1(t={}){return q(g(g({},fs),t),{missingHandler:g(g({},fs.missingHandler),t.missingHandler),flatten:g(g({},fs.flatten),t.flatten),scopes:g(g({},fs.scopes),t.scopes)})}var SE=new v("TRANSLOCO_TRANSPILER"),l1=(()=>{class t{config=d(ps,{optional:!0})??fs;get interpolationMatcher(){return c1(this.config)}transpile({value:e,params:i={},translation:r,key:o}){if(hs(e)){let s,a=e;for(;(s=this.interpolationMatcher.exec(a))!==null;){let[l,c]=s;a=a.replace(l,()=>{let u=c.trim(),f=Rv(i,u);return bE(f)?f:bE(r[u])?this.transpile({params:i,translation:r,key:o,value:r[u]}):""})}return a}else i&&(Ju(e)?e=this.handleObject({value:e,params:i,translation:r,key:o}):Array.isArray(e)&&(e=this.handleArray({value:e,params:i,translation:r,key:o})));return e}handleObject({value:e,params:i={},translation:r,key:o}){let s=e;return Object.keys(i).forEach(a=>{let l=this.transpile({value:Rv(s,a),params:Rv(i,a),translation:r,key:o});s=n1(s,a,l)}),s}handleArray(r){var o=r,{value:e}=o,i=Yf(o,["value"]);return e.map(s=>this.transpile(g({value:s},i)))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})();function c1(t){let[n,e]=t.interpolation;return new RegExp(`${n}([^${n}${e}]*?)${e}`,"g")}var ME=new v("TRANSLOCO_MISSING_HANDLER"),d1=(()=>{class t{handle(e,i){if(i.missingHandler.logMissingKey&&!i.prodMode){let r=`Missing translation for '${e}'`;console.warn(`%c ${r}`,"font-size: 12px; color: red")}return e}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),TE=new v("TRANSLOCO_INTERCEPTOR"),u1=(()=>{class t{preSaveTranslation(e){return e}preSaveTranslationKey(e,i){return i}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})(),AE=new v("TRANSLOCO_FALLBACK_STRATEGY"),f1=(()=>{class t{userConfig;constructor(e){this.userConfig=e}getNextLangs(){let e=this.userConfig.fallbackLang;if(!e)throw new Error("When using the default fallback, a fallback language must be provided in the config!");return Array.isArray(e)?e:[e]}static \u0275fac=function(i){return new(i||t)(R(ps))};static \u0275prov=b({token:t,factory:t.\u0275fac})}return t})();function wl(t){if(!t)return"";let n=t.split("/");return n.pop(),n.join("/")}function Zi(t){return t?t.split("/").pop():""}function Fv(t,n,e="|"){if(hs(t)){let i=t.split(e),r=i.pop();return r===n?[!0,i.toString()]:[!1,r]}return[!1,""]}function RE(t,n){let[e]=Fv(n,"static");return e?!1:!!t.config.reRenderOnLangChange}function kE(t){return t?n=>n:_e(1)}function h1(t,n){return Object.keys(t).reduce((e,i)=>(e[`${n}/${i}`]=t[i],e),{})}function Lv(t,n){return o1(t)?h1(t.loader,n):void 0}function kv(t){return{scope:wl(t)||null,langName:Zi(t)}}function NE(t){let{path:n,inlineLoader:e,mainLoader:i,data:r}=t;if(e){let o=e[n];if(r1(o)===!1)throw`You're using an inline loader but didn't provide a loader for ${n}`;return e[n]().then(s=>s.default?s.default:s)}return i.getTranslation(n,r)}function p1({mainLoader:t,path:n,data:e,fallbackPath:i,inlineLoader:r}){return(i?[n,i]:[n]).map(s=>{let a=NE({path:s,mainLoader:t,inlineLoader:r,data:e});return Ae(a).pipe(T(l=>({translation:l,lang:s})))})}var m1;var ms=(()=>{class t{loader;parser;missingHandler;interceptor;fallbackStrategy;langChanges$;translations=new Map;cache=new Map;firstFallbackLang;defaultLang="";availableLangs=[];isResolvedMissingOnce=!1;lang;failedLangs=new Set;events=new D;events$=this.events.asObservable();config;constructor(e,i,r,o,s,a){this.loader=e,this.parser=i,this.missingHandler=r,this.interceptor=o,this.fallbackStrategy=a,this.loader||(this.loader=new Nv(this.translations)),m1=this,this.config=JSON.parse(JSON.stringify(s)),this.setAvailableLangs(this.config.availableLangs||[]),this.setFallbackLangForMissingTranslation(this.config),this.setDefaultLang(this.config.defaultLang),this.lang=new We(this.getDefaultLang()),this.langChanges$=this.lang.asObservable(),this.events$.pipe(Av()).subscribe(l=>{l.type==="translationLoadSuccess"&&l.wasFailure&&this.setActiveLang(l.payload.langName)})}getDefaultLang(){return this.defaultLang}setDefaultLang(e){this.defaultLang=e}getActiveLang(){return this.lang.getValue()}setActiveLang(e){return this.parser.onLangChanged?.(e),this.lang.next(e),this.events.next({type:"langChanged",payload:kv(e)}),this}setAvailableLangs(e){this.availableLangs=e}getAvailableLangs(){return this.availableLangs}load(e,i={}){let r=this.cache.get(e);if(r)return r;let o,s=this._isLangScoped(e),a;s&&(a=wl(e));let l={path:e,mainLoader:this.loader,inlineLoader:i.inlineLoader,data:s?{scope:a}:void 0};if(this.useFallbackTranslation(e)){let u=s?`${a}/${this.firstFallbackLang}`:this.firstFallbackLang,f=p1(q(g({},l),{fallbackPath:u}));o=zn(f)}else{let u=NE(l);o=Ae(u)}let c=o.pipe(ph(this.config.failedRetries),Oe(u=>{if(Array.isArray(u)){u.forEach(f=>{this.handleSuccess(f.lang,f.translation),f.lang!==e&&this.cache.set(f.lang,x({}))});return}this.handleSuccess(e,u)}),Gt(u=>(this.config.prodMode||console.error(`Error while trying to load "${e}"`,u),this.handleFailure(e,i))),ur(1));return this.cache.set(e,c),c}translate(e,i={},r=this.getActiveLang()){if(!e)return e;let{scope:o,resolveLang:s}=this.resolveLangAndScope(r);if(Array.isArray(e))return e.map(c=>this.translate(o?`${o}.${c}`:c,i,s));e=o?`${o}.${e}`:e;let a=this.getTranslation(s),l=a[e];return l?this.parser.transpile({value:l,params:i,translation:a,key:e}):this._handleMissingKey(e,l,i)}selectTranslate(e,i,r,o=!1){let s,a=(c,u)=>this.load(c,u).pipe(T(()=>o?this.translateObject(e,i,c):this.translate(e,i,c)));if(Ov(r))return this.langChanges$.pipe(we(c=>a(c)));if(r=Array.isArray(r)?r[0]:r,IE(r)){let c=r;r=c.scope,s=Lv(c,c.scope)}if(r=r,this.isLang(r)||this.isScopeWithLang(r))return a(r);let l=r;return this.langChanges$.pipe(we(c=>a(`${l}/${c}`,{inlineLoader:s})))}isScopeWithLang(e){return this.isLang(Zi(e))}translateObject(e,i={},r=this.getActiveLang()){if(hs(e)||Array.isArray(e)){let{resolveLang:s,scope:a}=this.resolveLangAndScope(r);if(Array.isArray(e))return e.map(u=>this.translateObject(a?`${a}.${u}`:u,i,s));let l=this.getTranslation(s);e=a?`${a}.${e}`:e;let c=s1(this.getObjectByKey(l,e));return i1(c)?this.translate(e,i,r):this.parser.transpile({value:c,params:i,translation:l,key:e})}let o=[];for(let[s,a]of this.getEntries(e))o.push(this.translateObject(s,a,r));return o}selectTranslateObject(e,i,r){if(hs(e)||Array.isArray(e))return this.selectTranslate(e,i,r,!0);let[[o,s],...a]=this.getEntries(e);return this.selectTranslateObject(o,s,r).pipe(T(l=>{let c=[l];for(let[u,f]of a)c.push(this.translateObject(u,f,r));return c}))}getTranslation(e){if(e){if(this.isLang(e))return this.translations.get(e)||{};{let{scope:i,resolveLang:r}=this.resolveLangAndScope(e),o=this.translations.get(r)||{};return this.getObjectByKey(o,i)}}return this.translations}selectTranslation(e){let i=this.langChanges$;if(e){let r=Zi(e)!==e;this.isLang(e)||r?i=x(e):i=this.langChanges$.pipe(T(o=>`${e}/${o}`))}return i.pipe(we(r=>this.load(r).pipe(T(()=>this.getTranslation(r)))))}setTranslation(e,i=this.getActiveLang(),r={}){let s=g(g({},{merge:!0,emitChange:!0}),r),a=wl(i),l=e;if(a){let p=this.getMappedScope(a);l=wE({[p]:e})}let c=a?Zi(i):i,u=g(g({},s.merge&&this.getTranslation(c)),l),f=this.config.flatten.aot?u:wE(u),h=this.interceptor.preSaveTranslation(f,c);this.translations.set(c,h),s.emitChange&&this.setActiveLang(this.getActiveLang())}setTranslationKey(e,i,r={}){let o=r.lang||this.getActiveLang(),s=this.interceptor.preSaveTranslationKey(e,i,o),a={[e]:s};this.setTranslation(a,o,q(g({},r),{merge:!0}))}setFallbackLangForMissingTranslation({fallbackLang:e}){let i=Array.isArray(e)?e[0]:e;e&&this.useFallbackTranslation(i)&&(this.firstFallbackLang=i)}_handleMissingKey(e,i,r){if(this.config.missingHandler.allowEmpty&&i==="")return"";if(!this.isResolvedMissingOnce&&this.useFallbackTranslation()){this.isResolvedMissingOnce=!0;let o=this.translate(e,r,this.firstFallbackLang);return this.isResolvedMissingOnce=!1,o}return this.missingHandler.handle(e,this.getMissingHandlerData(),r)}_isLangScoped(e){return this.getAvailableLangsIds().indexOf(e)===-1}isLang(e){return this.getAvailableLangsIds().indexOf(e)!==-1}_loadDependencies(e,i){let r=Zi(e);return this._isLangScoped(e)&&!this.isLoadedTranslation(r)?cr([this.load(r),this.load(e,{inlineLoader:i})]):this.load(e,{inlineLoader:i})}_completeScopeWithLang(e){return this._isLangScoped(e)&&!this.isLang(Zi(e))?`${e}/${this.getActiveLang()}`:e}_setScopeAlias(e,i){this.config.scopeMapping||(this.config.scopeMapping={}),this.config.scopeMapping[e]=i}ngOnDestroy(){this.cache.clear()}isLoadedTranslation(e){return DE(this.getTranslation(e))}getAvailableLangsIds(){let e=this.getAvailableLangs()[0];return hs(e)?this.getAvailableLangs():this.getAvailableLangs().map(i=>i.id)}getMissingHandlerData(){return q(g({},this.config),{activeLang:this.getActiveLang(),availableLangs:this.availableLangs,defaultLang:this.defaultLang})}useFallbackTranslation(e){return this.config.missingHandler.useFallbackTranslation&&e!==this.firstFallbackLang}handleSuccess(e,i){this.setTranslation(i,e,{emitChange:!1}),this.events.next({wasFailure:!!this.failedLangs.size,type:"translationLoadSuccess",payload:kv(e)}),this.failedLangs.forEach(r=>this.cache.delete(r)),this.failedLangs.clear()}handleFailure(e,i){Ov(i.failedCounter)&&(i.failedCounter=0,i.fallbackLangs||(i.fallbackLangs=this.fallbackStrategy.getNextLangs(e)));let r=e.split("/"),s=i.fallbackLangs[i.failedCounter];if(this.failedLangs.add(e),this.cache.has(s))return this.handleSuccess(s,this.getTranslation(s)),Ge;let a=s===r[r.length-1];if(!s||a){let c="Unable to load translation and all the fallback languages";throw r.length>1&&(c+=", did you misspelled the scope name?"),new Error(c)}let l=s;return r.length>1&&(r[r.length-1]=s,l=r.join("/")),i.failedCounter++,this.events.next({type:"translationLoadFailure",payload:kv(e)}),this.load(l,i)}getMappedScope(e){let{scopeMapping:i={},scopes:r={keepCasing:!1}}=this.config;return i[e]||(r.keepCasing?e:EE(e))}resolveLangAndScope(e){let i=e,r;if(this._isLangScoped(e)){let o=Zi(e),s=this.isLang(o);i=s?o:this.getActiveLang(),r=this.getMappedScope(s?wl(e):e)}return{scope:r,resolveLang:i}}getObjectByKey(e,i){let r={},o=`${i}.`;for(let s in e)s.startsWith(o)&&(r[s.replace(o,"")]=e[s]);return r}getEntries(e){return e instanceof Map?e.entries():Object.entries(e)}static \u0275fac=function(i){return new(i||t)(R(CE,8),R(SE),R(ME),R(TE),R(ps),R(AE))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),g1=(()=>{class t{html;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["ng-component"]],inputs:{html:"html"},decls:1,vars:1,consts:[[1,"transloco-loader-template",3,"innerHTML"]],template:function(i,r){i&1&&jt(0,"div",0),i&2&&Nt("innerHTML",r.html,Dm)},encapsulation:2})}return t})(),Pv=class{view;vcr;constructor(n,e){this.view=n,this.vcr=e}attachView(){if(this.view instanceof rt)this.vcr.createEmbeddedView(this.view);else if(hs(this.view)){let n=this.vcr.createComponent(g1);n.instance.html=this.view,n.hostView.detectChanges()}else this.vcr.createComponent(this.view)}detachView(){this.vcr.clear()}},OE=new v("TRANSLOCO_LANG"),v1=new v("TRANSLOCO_LOADING_TEMPLATE"),FE=new v("TRANSLOCO_SCOPE"),Qu=class{initialized=!1;resolve({inline:n,provider:e,active:i}){let r=i;if(this.initialized)return r=i,r;if(e){let[,o]=Fv(e,"static");r=o}if(n){let[,o]=Fv(n,"static");r=o}return this.initialized=!0,r}resolveLangBasedOnScope(n){return wl(n)?Zi(n):n}resolveLangPath(n,e){return e?`${e}/${n}`:n}},Xu=class{service;constructor(n){this.service=n}resolve(n){let{inline:e,provider:i}=n;if(e)return e;if(i){if(IE(i)){let{scope:r,alias:o=this.service.config.scopes.keepCasing?r:EE(r)}=i;return this.service._setScopeAlias(r,o),r}return i}}},ef=(()=>{class t{destroyRef=d(vt);service=d(ms);tpl=d(rt,{optional:!0});providerLang=d(OE,{optional:!0});providerScope=d(FE,{optional:!0});providedLoadingTpl=d(v1,{optional:!0});cdr=d(Te);host=d(k);vcr=d(yt);renderer=d(Pe);view;memo=new Map;key;params={};inlineScope;inlineRead;prefix;inlineLang;inlineTpl;currentLang;loaderTplHandler;initialized=!1;path;langResolver=new Qu;scopeResolver=new Xu(this.service);strategy=this.tpl===null?"attribute":"structural";static ngTemplateContextGuard(e,i){return!0}ngOnInit(){let e=RE(this.service,this.providerLang||this.inlineLang);if(this.service.langChanges$.pipe(we(i=>{let r=this.langResolver.resolve({inline:this.inlineLang,provider:this.providerLang,active:i});return Array.isArray(this.providerScope)?zn(this.providerScope.map(o=>this.resolveScope(r,o))):this.resolveScope(r,this.providerScope)}),kE(e),Av(this.destroyRef)).subscribe(()=>{this.currentLang=this.langResolver.resolveLangBasedOnScope(this.path),this.strategy==="attribute"?this.attributeStrategy():this.structuralStrategy(this.currentLang,this.prefix||this.inlineRead),this.cdr.markForCheck(),this.initialized=!0}),!this.initialized){let i=this.resolveLoadingContent();i&&(this.loaderTplHandler=new Pv(i,this.vcr),this.loaderTplHandler.attachView())}}ngOnChanges(e){this.strategy==="attribute"&&Object.keys(e).some(r=>!e[r].firstChange)&&this.attributeStrategy()}attributeStrategy(){this.detachLoader(),this.renderer.setProperty(this.host.nativeElement,"innerText",this.service.translate(this.key,this.params,this.currentLang))}structuralStrategy(e,i){this.memo.clear();let r=this.getTranslateFn(e,i);this.view?(this.view.context.$implicit=r,this.view.context.currentLang=this.currentLang):(this.detachLoader(),this.view=this.vcr.createEmbeddedView(this.tpl,{$implicit:r,currentLang:this.currentLang}))}getTranslateFn(e,i){return(r,o)=>{let s=i?`${i}.${r}`:r,a=o?`${s}${JSON.stringify(o)}`:s;return this.memo.has(a)||this.memo.set(a,this.service.translate(s,o,e)),this.memo.get(a)}}resolveLoadingContent(){return this.inlineTpl||this.providedLoadingTpl}ngOnDestroy(){this.memo.clear()}detachLoader(){this.loaderTplHandler?.detachView()}resolveScope(e,i){let r=this.scopeResolver.resolve({inline:this.inlineScope,provider:i});this.path=this.langResolver.resolveLangPath(e,r);let o=Lv(i,r);return this.service._loadDependencies(this.path,o)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","transloco",""]],inputs:{key:[0,"transloco","key"],params:[0,"translocoParams","params"],inlineScope:[0,"translocoScope","inlineScope"],inlineRead:[0,"translocoRead","inlineRead"],prefix:[0,"translocoPrefix","prefix"],inlineLang:[0,"translocoLang","inlineLang"],inlineTpl:[0,"translocoLoadingTpl","inlineTpl"]},features:[Ke]})}return t})(),gs=(()=>{class t{service;providerScope;providerLang;cdr;subscription=null;lastValue="";lastKey;path;langResolver=new Qu;scopeResolver;constructor(e,i,r,o){this.service=e,this.providerScope=i,this.providerLang=r,this.cdr=o,this.scopeResolver=new Xu(this.service)}transform(e,i,r){if(!e)return e;let o=i?`${e}${JSON.stringify(i)}`:e;if(o===this.lastKey)return this.lastValue;this.lastKey=o,this.subscription?.unsubscribe();let s=RE(this.service,this.providerLang||r);return this.subscription=this.service.langChanges$.pipe(we(a=>{let l=this.langResolver.resolve({inline:r,provider:this.providerLang,active:a});return Array.isArray(this.providerScope)?zn(this.providerScope.map(c=>this.resolveScope(l,c))):this.resolveScope(l,this.providerScope)}),kE(s)).subscribe(()=>this.updateValue(e,i)),this.lastValue}ngOnDestroy(){this.subscription?.unsubscribe(),this.subscription=null}updateValue(e,i){let r=this.langResolver.resolveLangBasedOnScope(this.path);this.lastValue=this.service.translate(e,i,r),this.cdr.markForCheck()}resolveScope(e,i){let r=this.scopeResolver.resolve({inline:void 0,provider:i});this.path=this.langResolver.resolveLangPath(e,r);let o=Lv(i,r);return this.service._loadDependencies(this.path,o)}static \u0275fac=function(i){return new(i||t)(me(ms,16),me(FE,24),me(OE,24),me(Te,16))};static \u0275pipe=Nd({name:"transloco",type:t,pure:!1})}return t})();var cn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})();function tf(t){let n=[b1(l1),C1(d1),D1(u1),w1(f1)];return t.config&&n.push(y1(t.config)),t.loader&&n.push(_1(t.loader)),n}function y1(t){return dt([{provide:ps,useValue:a1(t)}])}function _1(t){return dt([{provide:CE,useClass:t}])}function b1(t){return dt([{provide:SE,useClass:t,deps:[ps]}])}function w1(t){return dt([{provide:AE,useClass:t,deps:[ps]}])}function C1(t){return dt([{provide:ME,useClass:t}])}function D1(t){return dt([{provide:TE,useClass:t}])}function jv(){let t=E1();if(!(!t||!xE()))return t.indexOf("-")!==-1&&(t=t.split("-")[0]),t.indexOf("_")!==-1&&(t=t.split("_")[0]),t}function E1(){if(!xE())return"";let t=window.navigator;return t.languages?.[0]??t.language}var nf=class t{title="gwt-2nd_randomizer";swUpdate=d(ku);snackbar=d(_E);translocoService=d(ms);ngOnInit(){this.swUpdate.unrecoverable.subscribe(n=>{this.snackbar.open(`An error occurred that we cannot recover from:
`+n.reason+`

Please reload the page.`,"Reload").onAction().subscribe(()=>{window.location.reload()}),console.debug(`An error occurred that we cannot recover from:
`+n.reason+`

Please reload the page.`)}),this.swUpdate.versionUpdates.pipe(re(n=>n.type==="VERSION_DETECTED")).subscribe(()=>{this.snackbar.open(this.translocoService.translate("messages.update-available"),"Reload").onAction().subscribe(()=>{window.location.reload()})})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(e,i){e&1&&ge(0,"router-outlet")},dependencies:[jn,Ka,cn],encapsulation:2})};var vs=class t{http=d(Bo);getTranslation(n){return this.http.get(`i18n/${n}.json`)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var zE=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(me(Pe),me(k))};static \u0275dir=L({type:t})}return t})(),x1=(()=>{class t extends zE{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275dir=L({type:t,features:[De]})}return t})(),gf=new v("");var I1={provide:gf,useExisting:qt(()=>$E),multi:!0};function S1(){let t=tn()?tn().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var M1=new v(""),$E=(()=>{class t extends zE{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!S1())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(me(Pe),me(k),me(M1,8))};static \u0275dir=L({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&ce("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},standalone:!1,features:[Le([I1]),De]})}return t})();function Hv(t){return t==null||Uv(t)===0}function Uv(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var Ml=new v(""),zv=new v(""),T1=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,of=class{static min(n){return A1(n)}static max(n){return R1(n)}static required(n){return k1(n)}static requiredTrue(n){return N1(n)}static email(n){return O1(n)}static minLength(n){return F1(n)}static maxLength(n){return P1(n)}static pattern(n){return L1(n)}static nullValidator(n){return WE()}static compose(n){return QE(n)}static composeAsync(n){return XE(n)}};function A1(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function R1(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function k1(t){return Hv(t.value)?{required:!0}:null}function N1(t){return t.value===!0?null:{required:!0}}function O1(t){return Hv(t.value)||T1.test(t.value)?null:{email:!0}}function F1(t){return n=>{let e=n.value?.length??Uv(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function P1(t){return n=>{let e=n.value?.length??Uv(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function L1(t){if(!t)return WE;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Hv(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function WE(t){return null}function GE(t){return t!=null}function qE(t){return Oi(t)?Ae(t):t}function YE(t){let n={};return t.forEach(e=>{n=e!=null?g(g({},n),e):n}),Object.keys(n).length===0?null:n}function ZE(t,n){return n.map(e=>e(t))}function j1(t){return!t.validate}function KE(t){return t.map(n=>j1(n)?n:e=>n.validate(e))}function QE(t){if(!t)return null;let n=t.filter(GE);return n.length==0?null:function(e){return YE(ZE(e,n))}}function $v(t){return t!=null?QE(KE(t)):null}function XE(t){if(!t)return null;let n=t.filter(GE);return n.length==0?null:function(e){let i=ZE(e,n).map(qE);return zn(i).pipe(T(YE))}}function Wv(t){return t!=null?XE(KE(t)):null}function PE(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function JE(t){return t._rawValidators}function ex(t){return t._rawAsyncValidators}function Vv(t){return t?Array.isArray(t)?t:[t]:[]}function sf(t,n){return Array.isArray(t)?t.includes(n):t===n}function LE(t,n){let e=Vv(n);return Vv(t).forEach(r=>{sf(e,r)||e.push(r)}),e}function jE(t,n){return Vv(n).filter(e=>!sf(t,e))}var af=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=$v(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Wv(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Xr=class extends af{name;get formDirective(){return null}get path(){return null}},Jr=class extends af{_parent=null;name=null;valueAccessor=null},Bv=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var tx=(()=>{class t extends Bv{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(me(Jr,2))};static \u0275dir=L({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&$("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[De]})}return t})();var Dl="VALID",rf="INVALID",ys="PENDING",El="DISABLED",Ki=class{},lf=class extends Ki{value;source;constructor(n,e){super(),this.value=n,this.source=e}},Il=class extends Ki{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},Sl=class extends Ki{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},_s=class extends Ki{status;source;constructor(n,e){super(),this.status=n,this.source=e}},cf=class extends Ki{source;constructor(n){super(),this.source=n}},df=class extends Ki{source;constructor(n){super(),this.source=n}};function nx(t){return(vf(t)?t.validators:t)||null}function V1(t){return Array.isArray(t)?$v(t):t||null}function ix(t,n){return(vf(n)?n.asyncValidators:t)||null}function B1(t){return Array.isArray(t)?Wv(t):t||null}function vf(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function H1(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new E(1e3,"");if(!i[e])throw new E(1001,"")}function U1(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new E(-1002,"")})}var uf=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return st(this.statusReactive)}set status(n){st(()=>this.statusReactive.set(n))}_status=Ut(()=>this.statusReactive());statusReactive=Ce(void 0);get valid(){return this.status===Dl}get invalid(){return this.status===rf}get pending(){return this.status===ys}get disabled(){return this.status===El}get enabled(){return this.status!==El}errors;get pristine(){return st(this.pristineReactive)}set pristine(n){st(()=>this.pristineReactive.set(n))}_pristine=Ut(()=>this.pristineReactive());pristineReactive=Ce(!0);get dirty(){return!this.pristine}get touched(){return st(this.touchedReactive)}set touched(n){st(()=>this.touchedReactive.set(n))}_touched=Ut(()=>this.touchedReactive());touchedReactive=Ce(!1);get untouched(){return!this.touched}_events=new D;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(LE(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(LE(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(jE(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(jE(n,this._rawAsyncValidators))}hasValidator(n){return sf(this._rawValidators,n)}hasAsyncValidator(n){return sf(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(q(g({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Sl(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new Sl(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(q(g({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new Il(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new Il(!0,i))}markAsPending(n={}){this.status=ys;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new _s(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(q(g({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=El,this.errors=null,this._forEachChild(r=>{r.disable(q(g({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new lf(this.value,i)),this._events.next(new _s(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(q(g({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Dl,this._forEachChild(i=>{i.enable(q(g({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(q(g({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Dl||this.status===ys)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new lf(this.value,e)),this._events.next(new _s(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(q(g({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?El:Dl}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=ys,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=qE(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new _s(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new z,this.statusChanges=new z}_calculateStatus(){return this._allControlsDisabled()?El:this.errors?rf:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(ys)?ys:this._anyControlsHaveStatus(rf)?rf:Dl}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new Il(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Sl(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){vf(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=V1(this._rawValidators)}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=B1(this._rawAsyncValidators)}},ff=class extends uf{constructor(n,e,i){super(nx(e),ix(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){return this.controls[n]?this.controls[n]:(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this.controls.hasOwnProperty(n)&&this.controls[n].enabled}setValue(n,e={}){U1(this,!0,n),Object.keys(n).forEach(i=>{H1(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this.controls[i];r&&r.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,q(g({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new df(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return this.controls.hasOwnProperty(n)?this.controls[n]:null}};var yf=new v("",{factory:()=>Gv}),Gv="always";function z1(t,n){return[...n.path,t]}function hf(t,n,e=Gv){qv(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),W1(t,n),q1(t,n),G1(t,n),$1(t,n)}function VE(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),mf(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function pf(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function $1(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function qv(t,n){let e=JE(t);n.validator!==null?t.setValidators(PE(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=ex(t);n.asyncValidator!==null?t.setAsyncValidators(PE(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();pf(n._rawValidators,r),pf(n._rawAsyncValidators,r)}function mf(t,n){let e=!1;if(t!==null){if(n.validator!==null){let r=JE(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.validator);o.length!==r.length&&(e=!0,t.setValidators(o))}}if(n.asyncValidator!==null){let r=ex(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.asyncValidator);o.length!==r.length&&(e=!0,t.setAsyncValidators(o))}}}let i=()=>{};return pf(n._rawValidators,i),pf(n._rawAsyncValidators,i),e}function W1(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&rx(t,n)})}function G1(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&rx(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function rx(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function q1(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function ox(t,n){t==null,qv(t,n)}function Y1(t,n){return mf(t,n)}function Z1(t,n){if(!t.hasOwnProperty("model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function K1(t){return Object.getPrototypeOf(t.constructor)===x1}function sx(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function Q1(t,n){if(!n)return null;Array.isArray(n);let e,i,r;return n.forEach(o=>{o.constructor===$E?e=o:K1(o)?i=o:r=o}),r||i||e||null}function X1(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var J1={provide:Xr,useExisting:qt(()=>Yv)},xl=Promise.resolve(),Yv=(()=>{class t extends Xr{callSetDisabledState;get submitted(){return st(this.submittedReactive)}_submitted=Ut(()=>this.submittedReactive());submittedReactive=Ce(!1);_directives=new Set;form;ngSubmit=new z;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new ff({},$v(e),Wv(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){xl.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),hf(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){xl.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){xl.then(()=>{let i=this._findContainer(e.path),r=new ff({});ox(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){xl.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){xl.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),sx(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new cf(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(me(Ml,10),me(zv,10),me(yf,8))};static \u0275dir=L({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&ce("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Le([J1]),De]})}return t})();function BE(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function HE(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var ax=class extends uf{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(nx(e),ix(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),vf(e)&&(e.nonNullable||e.initialValueIsDefault)&&(HE(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new df(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){BE(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){BE(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){HE(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var eP=t=>t instanceof ax;var tP={provide:Jr,useExisting:qt(()=>Zv)},UE=Promise.resolve(),Zv=(()=>{class t extends Jr{_changeDetectorRef;callSetDisabledState;control=new ax;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new z;constructor(e,i,r,o,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=Q1(this,o)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),Z1(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){hf(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){UE.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&se(i);UE.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?z1(e,this._parent):[e]}static \u0275fac=function(i){return new(i||t)(me(Xr,9),me(Ml,10),me(zv,10),me(gf,10),me(Te,8),me(yf,8))};static \u0275dir=L({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[Le([tP]),De,Ke]})}return t})();var nP=(()=>{class t extends Xr{callSetDisabledState;get submitted(){return st(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=Ut(()=>this._submittedReactive());_submittedReactive=Ce(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(mf(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return hf(i,e,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){VE(e.control||null,e,!1),X1(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,sx(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new cf(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(VE(i||null,e),eP(r)&&(hf(r,e,this.callSetDisabledState),e.control=r))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);ox(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&Y1(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){qv(this.form,this),this._oldForm&&mf(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(i){return new(i||t)(me(Ml,10),me(zv,10),me(yf,8))};static \u0275dir=L({type:t,features:[De,Ke]})}return t})();var iP={provide:Xr,useExisting:qt(()=>Kv)},Kv=(()=>{class t extends nP{form=null;ngSubmit=new z;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275dir=L({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&ce("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Le([iP]),De]})}return t})();var rP=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({})}return t})();var lx=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:yf,useValue:e.callSetDisabledState??Gv}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[rP]})}return t})();var sP=["*"];var aP=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],lP=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],cP=new v("MAT_CARD_CONFIG"),cx=(()=>{class t{appearance;constructor(){let e=d(cP,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&$("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:sP,decls:1,vars:0,template:function(i,r){i&1&&(ue(),V(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return t})();var dx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})();var ux=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:lP,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(i,r){i&1&&(ue(aP),V(0),pt(1,"div",0),V(2,1),bt(),V(3,2))},encapsulation:2,changeDetection:0})}return t})();var fx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var hx=(()=>{class t{get vertical(){return this._vertical}set vertical(e){this._vertical=an(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=an(e)}_inset=!1;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(i,r){i&2&&(le("aria-orientation",r.vertical?"vertical":"horizontal"),$("mat-divider-vertical",r.vertical)("mat-divider-horizontal",!r.vertical)("mat-divider-inset",r.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2,changeDetection:0})}return t})(),px=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var Qv=class{_box;_destroyed=new D;_resizeSubject=new D;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new W(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(re(e=>e.some(i=>i.target===n)),ur({bufferSize:1,refCount:!0}),pe(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},mx=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=d(B);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Qv(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var fP=["notch"],hP=["matFormFieldNotchedOutline",""],pP=["*"],gx=["iconPrefixContainer"],vx=["textPrefixContainer"],yx=["iconSuffixContainer"],_x=["textSuffixContainer"],mP=["textField"],gP=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],vP=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function yP(t,n){t&1&&ge(0,"span",21)}function _P(t,n){if(t&1&&(y(0,"label",20),V(1,1),H(2,yP,1,0,"span",21),_()),t&2){let e=S(2);de("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),le("for",e._control.disableAutomaticLabeling?null:e._control.id),m(2),U(!e.hideRequiredMarker&&e._control.required?2:-1)}}function bP(t,n){if(t&1&&H(0,_P,3,5,"label",20),t&2){let e=S();U(e._hasFloatingLabel()?0:-1)}}function wP(t,n){t&1&&ge(0,"div",7)}function CP(t,n){}function DP(t,n){if(t&1&&ht(0,CP,0,0,"ng-template",13),t&2){S(2);let e=en(1);de("ngTemplateOutlet",e)}}function EP(t,n){if(t&1&&(y(0,"div",9),H(1,DP,1,1,null,13),_()),t&2){let e=S();de("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),m(),U(e._forceDisplayInfixLabel()?-1:1)}}function xP(t,n){t&1&&(y(0,"div",10,2),V(2,2),_())}function IP(t,n){t&1&&(y(0,"div",11,3),V(2,3),_())}function SP(t,n){}function MP(t,n){if(t&1&&ht(0,SP,0,0,"ng-template",13),t&2){S();let e=en(1);de("ngTemplateOutlet",e)}}function TP(t,n){t&1&&(y(0,"div",14,4),V(2,4),_())}function AP(t,n){t&1&&(y(0,"div",15,5),V(2,5),_())}function RP(t,n){t&1&&ge(0,"div",16)}function kP(t,n){t&1&&(y(0,"div",18),V(1,6),_())}function NP(t,n){if(t&1&&(y(0,"mat-hint",22),C(1),_()),t&2){let e=S(2);de("id",e._hintLabelId),m(),fe(e.hintLabel)}}function OP(t,n){if(t&1&&(y(0,"div",19),H(1,NP,2,2,"mat-hint",22),V(2,7),ge(3,"div",23),V(4,8),_()),t&2){let e=S();m(),U(e.hintLabel?1:-1)}}var Tl=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-label"]]})}return t})(),FP=new v("MatError");var Xv=(()=>{class t{align="start";id=d(ze).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(Nt("id",r.id),le("align",null),$("mat-mdc-form-field-hint-end",r.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),PP=new v("MatPrefix");var LP=new v("MatSuffix");var Ix=new v("FloatingLabelParent"),bx=(()=>{class t{_elementRef=d(k);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=d(mx);_ngZone=d(B);_parent=d(Ix);_resizeSubscription=new he;constructor(){}ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return jP(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&$("mdc-floating-label--float-above",r.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function jP(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var wx="mdc-line-ripple--active",_f="mdc-line-ripple--deactivating",Cx=(()=>{class t{_elementRef=d(k);_cleanupTransitionEnd;constructor(){let e=d(B),i=d(Pe);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(_f),e.add(wx)}deactivate(){this._elementRef.nativeElement.classList.add(_f)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(_f);e.propertyName==="opacity"&&r&&i.remove(wx,_f)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),Dx=(()=>{class t{_elementRef=d(k);_ngZone=d(B);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&Ye(fP,5),i&2){let o;J(o=ee())&&(r._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&$("mdc-notched-outline--notched",r.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},attrs:hP,ngContentSelectors:pP,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(ue(),jt(0,"div",1),pt(1,"div",2,0),V(3),bt(),jt(4,"div",3))},encapsulation:2,changeDetection:0})}return t})(),Jv=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t})}return t})();var ey=new v("MatFormField"),VP=new v("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Ex="fill",BP="auto",xx="fixed",HP="translateY(-50%)",bf=(()=>{class t{_elementRef=d(k);_changeDetectorRef=d(Te);_platform=d(Ie);_idGenerator=d(ze);_ngZone=d(B);_defaults=d(VP,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Ea("iconPrefixContainer");_textPrefixContainerSignal=Ea("textPrefixContainer");_iconSuffixContainerSignal=Ea("iconSuffixContainer");_textSuffixContainerSignal=Ea("textSuffixContainer");_prefixSuffixContainers=Ut(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Y0(Tl);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=an(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||BP}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||Ex;this._appearanceSignal.set(i)}_appearanceSignal=Ce(Ex);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||xx}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||xx}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new D;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=je();constructor(){let e=this._defaults,i=d(at);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Ir(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Ut(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(Ve([void 0,void 0]),T(()=>[i.errorState,i.userAriaDescribedBy]),yc(),re(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(pe(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Tt(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Q0({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Ut(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,u=this._currentDirection==="rtl"?"-1":"1",f=`${s+a}px`,p=`calc(${u} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,w=`var(--mat-mdc-form-field-label-transform, ${HP} translateX(${p}))`,I=s+a+l+c;return[w,I]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(Bd(o,r._labelChild,Tl,5),Et(o,Jv,5)(o,PP,5)(o,LP,5)(o,FP,5)(o,Xv,5)),i&2){Ud();let s;J(s=ee())&&(r._formFieldControl=s.first),J(s=ee())&&(r._prefixChildren=s),J(s=ee())&&(r._suffixChildren=s),J(s=ee())&&(r._errorChildren=s),J(s=ee())&&(r._hintChildren=s)}},viewQuery:function(i,r){if(i&1&&(Hd(r._iconPrefixContainerSignal,gx,5)(r._textPrefixContainerSignal,vx,5)(r._iconSuffixContainerSignal,yx,5)(r._textSuffixContainerSignal,_x,5),Ye(mP,5)(gx,5)(vx,5)(yx,5)(_x,5)(bx,5)(Dx,5)(Cx,5)),i&2){Ud(4);let o;J(o=ee())&&(r._textField=o.first),J(o=ee())&&(r._iconPrefixContainer=o.first),J(o=ee())&&(r._textPrefixContainer=o.first),J(o=ee())&&(r._iconSuffixContainer=o.first),J(o=ee())&&(r._textSuffixContainer=o.first),J(o=ee())&&(r._floatingLabel=o.first),J(o=ee())&&(r._notchedOutline=o.first),J(o=ee())&&(r._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&$("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Le([{provide:ey,useExisting:t},{provide:Ix,useExisting:t}])],ngContentSelectors:vP,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(ue(gP),ht(0,bP,1,1,"ng-template",null,0,ng),y(2,"div",6,1),ce("click",function(s){return r._control.onContainerClick(s)}),H(4,wP,1,0,"div",7),y(5,"div",8),H(6,EP,2,2,"div",9),H(7,xP,3,0,"div",10),H(8,IP,3,0,"div",11),y(9,"div",12),H(10,MP,1,1,null,13),V(11),_(),H(12,TP,3,0,"div",14),H(13,AP,3,0,"div",15),_(),H(14,RP,1,0,"div",16),_(),y(15,"div",17),H(16,kP,2,0,"div",18)(17,OP,5,1,"div",19),_()),i&2){let o;m(2),$("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),m(2),U(!r._hasOutline()&&!r._control.disabled?4:-1),m(2),U(r._hasOutline()?6:-1),m(),U(r._hasIconPrefix?7:-1),m(),U(r._hasTextPrefix?8:-1),m(2),U(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),m(2),U(r._hasTextSuffix?12:-1),m(),U(r._hasIconSuffix?13:-1),m(),U(r._hasOutline()?-1:14),m(),$("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();m(),U((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[bx,Dx,mg,Cx,Xv],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2,changeDetection:0})}return t})();var wf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[LD,bf,ve]})}return t})();var Cf=class{tracker;columnIndex=0;rowIndex=0;get rowCount(){return this.rowIndex+1}get rowspan(){let n=Math.max(...this.tracker);return n>1?this.rowCount+n-1:this.rowCount}positions;update(n,e){this.columnIndex=0,this.rowIndex=0,this.tracker=new Array(n),this.tracker.fill(0,0,this.tracker.length),this.positions=e.map(i=>this._trackTile(i))}_trackTile(n){let e=this._findMatchingGap(n.colspan);return this._markTilePosition(e,n),this.columnIndex=e+n.colspan,new ty(this.rowIndex,e)}_findMatchingGap(n){n>this.tracker.length;let e=-1,i=-1;do{if(this.columnIndex+n>this.tracker.length){this._nextRow(),e=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(e);continue}if(e=this.tracker.indexOf(0,this.columnIndex),e==-1){this._nextRow(),e=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(e);continue}i=this._findGapEndIndex(e),this.columnIndex=e+1}while(i-e<n||i==0);return Math.max(e,0)}_nextRow(){this.columnIndex=0,this.rowIndex++;for(let n=0;n<this.tracker.length;n++)this.tracker[n]=Math.max(0,this.tracker[n]-1)}_findGapEndIndex(n){for(let e=n+1;e<this.tracker.length;e++)if(this.tracker[e]!=0)return e;return this.tracker.length}_markTilePosition(n,e){for(let i=0;i<e.colspan;i++)this.tracker[n+i]=e.rowspan}},ty=class{row;col;constructor(n,e){this.row=n,this.col=e}};var Sx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-line",""],["","matLine",""]],hostAttrs:[1,"mat-line"]})}return t})();function Mx(t,n,e="mat"){t.changes.pipe(Ve(t)).subscribe(({length:i})=>{Al(n,`${e}-2-line`,!1),Al(n,`${e}-3-line`,!1),Al(n,`${e}-multi-line`,!1),i===2||i===3?Al(n,`${e}-${i}-line`,!0):i>3&&Al(n,`${e}-multi-line`,!0)})}function Al(t,n,e){t.nativeElement.classList.toggle(n,e)}var ny=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var Tx=["*"],zP=[[["","mat-grid-avatar",""],["","matGridAvatar",""]],[["","mat-line",""],["","matLine",""]],"*"],$P=["[mat-grid-avatar], [matGridAvatar]","[mat-line], [matLine]","*"],WP=`.mat-grid-list {
  display: block;
  position: relative;
}

.mat-grid-tile {
  display: block;
  position: absolute;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-tile-header,
.mat-grid-tile .mat-grid-tile-footer {
  display: flex;
  align-items: center;
  height: 48px;
  color: #fff;
  background: rgba(0, 0, 0, 0.38);
  overflow: hidden;
  padding: 0 16px;
  position: absolute;
  left: 0;
  right: 0;
}
.mat-grid-tile .mat-grid-tile-header > *,
.mat-grid-tile .mat-grid-tile-footer > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-tile-header.mat-2-line,
.mat-grid-tile .mat-grid-tile-footer.mat-2-line {
  height: 68px;
}
.mat-grid-tile .mat-grid-list-text {
  display: flex;
  flex-direction: column;
  flex: auto;
  box-sizing: border-box;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-list-text > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-list-text:empty {
  display: none;
}
.mat-grid-tile .mat-grid-tile-header {
  top: 0;
}
.mat-grid-tile .mat-grid-tile-footer {
  bottom: 0;
}
.mat-grid-tile .mat-grid-avatar {
  padding-right: 16px;
}
[dir=rtl] .mat-grid-tile .mat-grid-avatar {
  padding-right: 0;
  padding-left: 16px;
}
.mat-grid-tile .mat-grid-avatar:empty {
  display: none;
}

.mat-grid-tile-header {
  font-size: var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large));
}
.mat-grid-tile-header .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-header .mat-line:nth-child(n+2) {
  font-size: var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium));
}

.mat-grid-tile-footer {
  font-size: var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large));
}
.mat-grid-tile-footer .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-footer .mat-line:nth-child(n+2) {
  font-size: var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium));
}

.mat-grid-tile-content {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
}
`,Ax=new v("MAT_GRID_LIST"),sy=(()=>{class t{_element=d(k);_gridList=d(Ax,{optional:!0});_rowspan=1;_colspan=1;constructor(){}get rowspan(){return this._rowspan}set rowspan(e){this._rowspan=Math.round(on(e))}get colspan(){return this._colspan}set colspan(e){this._colspan=Math.round(on(e))}_setStyle(e,i){this._element.nativeElement.style[e]=i}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-grid-tile"]],hostAttrs:[1,"mat-grid-tile"],hostVars:2,hostBindings:function(i,r){i&2&&le("rowspan",r.rowspan)("colspan",r.colspan)},inputs:{rowspan:"rowspan",colspan:"colspan"},exportAs:["matGridTile"],ngContentSelectors:Tx,decls:2,vars:0,consts:[[1,"mat-grid-tile-content"]],template:function(i,r){i&1&&(ue(),pt(0,"div",0),V(1),bt())},styles:[`.mat-grid-list {
  display: block;
  position: relative;
}

.mat-grid-tile {
  display: block;
  position: absolute;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-tile-header,
.mat-grid-tile .mat-grid-tile-footer {
  display: flex;
  align-items: center;
  height: 48px;
  color: #fff;
  background: rgba(0, 0, 0, 0.38);
  overflow: hidden;
  padding: 0 16px;
  position: absolute;
  left: 0;
  right: 0;
}
.mat-grid-tile .mat-grid-tile-header > *,
.mat-grid-tile .mat-grid-tile-footer > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-tile-header.mat-2-line,
.mat-grid-tile .mat-grid-tile-footer.mat-2-line {
  height: 68px;
}
.mat-grid-tile .mat-grid-list-text {
  display: flex;
  flex-direction: column;
  flex: auto;
  box-sizing: border-box;
  overflow: hidden;
}
.mat-grid-tile .mat-grid-list-text > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: inherit;
}
.mat-grid-tile .mat-grid-list-text:empty {
  display: none;
}
.mat-grid-tile .mat-grid-tile-header {
  top: 0;
}
.mat-grid-tile .mat-grid-tile-footer {
  bottom: 0;
}
.mat-grid-tile .mat-grid-avatar {
  padding-right: 16px;
}
[dir=rtl] .mat-grid-tile .mat-grid-avatar {
  padding-right: 0;
  padding-left: 16px;
}
.mat-grid-tile .mat-grid-avatar:empty {
  display: none;
}

.mat-grid-tile-header {
  font-size: var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large));
}
.mat-grid-tile-header .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-header .mat-line:nth-child(n+2) {
  font-size: var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium));
}

.mat-grid-tile-footer {
  font-size: var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large));
}
.mat-grid-tile-footer .mat-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  box-sizing: border-box;
}
.mat-grid-tile-footer .mat-line:nth-child(n+2) {
  font-size: var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium));
}

.mat-grid-tile-content {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
}
`],encapsulation:2,changeDetection:0})}return t})(),Rx=(()=>{class t{_element=d(k);_lines;constructor(){}ngAfterContentInit(){Mx(this._lines,this._element)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-grid-tile-header"],["mat-grid-tile-footer"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Sx,5),i&2){let s;J(s=ee())&&(r._lines=s)}},ngContentSelectors:$P,decls:4,vars:0,consts:[[1,"mat-grid-list-text"]],template:function(i,r){i&1&&(ue(zP),V(0),pt(1,"div",0),V(2,1),bt(),V(3,2))},encapsulation:2,changeDetection:0})}return t})();var kx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-grid-tile-header"]],hostAttrs:[1,"mat-grid-tile-header"]})}return t})();var GP=/^-?\d+((\.\d+)?[A-Za-z%$]?)+$/,Rl=class{_gutterSize;_rows=0;_rowspan=0;_cols;_direction;init(n,e,i,r){this._gutterSize=Nx(n),this._rows=e.rowCount,this._rowspan=e.rowspan,this._cols=i,this._direction=r}getBaseTileSize(n,e){return`(${n}% - (${this._gutterSize} * ${e}))`}getTilePosition(n,e){return e===0?"0":eo(`(${n} + ${this._gutterSize}) * ${e}`)}getTileSize(n,e){return`(${n} * ${e}) + (${e-1} * ${this._gutterSize})`}setStyle(n,e,i){let r=100/this._cols,o=(this._cols-1)/this._cols;this.setColStyles(n,i,r,o),this.setRowStyles(n,e,r,o)}setColStyles(n,e,i,r){let o=this.getBaseTileSize(i,r),s=this._direction==="rtl"?"right":"left";n._setStyle(s,this.getTilePosition(o,e)),n._setStyle("width",eo(this.getTileSize(o,n.colspan)))}getGutterSpan(){return`${this._gutterSize} * (${this._rowspan} - 1)`}getTileSpan(n){return`${this._rowspan} * ${this.getTileSize(n,1)}`}getComputedHeight(){return null}},iy=class extends Rl{fixedRowHeight;constructor(n){super(),this.fixedRowHeight=n}init(n,e,i,r){super.init(n,e,i,r),this.fixedRowHeight=Nx(this.fixedRowHeight),GP.test(this.fixedRowHeight)}setRowStyles(n,e){n._setStyle("top",this.getTilePosition(this.fixedRowHeight,e)),n._setStyle("height",eo(this.getTileSize(this.fixedRowHeight,n.rowspan)))}getComputedHeight(){return["height",eo(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]}reset(n){n._setListStyle(["height",null]),n._tiles&&n._tiles.forEach(e=>{e._setStyle("top",null),e._setStyle("height",null)})}},ry=class extends Rl{rowHeightRatio;baseTileHeight;constructor(n){super(),this._parseRatio(n)}setRowStyles(n,e,i,r){let o=i/this.rowHeightRatio;this.baseTileHeight=this.getBaseTileSize(o,r),n._setStyle("marginTop",this.getTilePosition(this.baseTileHeight,e)),n._setStyle("paddingTop",eo(this.getTileSize(this.baseTileHeight,n.rowspan)))}getComputedHeight(){return["paddingBottom",eo(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]}reset(n){n._setListStyle(["paddingBottom",null]),n._tiles.forEach(e=>{e._setStyle("marginTop",null),e._setStyle("paddingTop",null)})}_parseRatio(n){let e=n.split(":");e.length,this.rowHeightRatio=parseFloat(e[0])/parseFloat(e[1])}},oy=class extends Rl{setRowStyles(n,e){let i=100/this._rowspan,r=(this._rows-1)/this._rows,o=this.getBaseTileSize(i,r);n._setStyle("top",this.getTilePosition(o,e)),n._setStyle("height",eo(this.getTileSize(o,n.rowspan)))}reset(n){n._tiles&&n._tiles.forEach(e=>{e._setStyle("top",null),e._setStyle("height",null)})}};function eo(t){return`calc(${t})`}function Nx(t){return t.match(/([A-Za-z%]+)$/)?t:`${t}px`}var qP="fit",Ox=(()=>{class t{_element=d(k);_dir=d(at,{optional:!0});_cols;_tileCoordinator;_rowHeight;_gutter="1px";_tileStyler;_tiles;constructor(){}get cols(){return this._cols}set cols(e){this._cols=Math.max(1,Math.round(on(e)))}get gutterSize(){return this._gutter}set gutterSize(e){this._gutter=`${e??""}`}get rowHeight(){return this._rowHeight}set rowHeight(e){let i=`${e??""}`;i!==this._rowHeight&&(this._rowHeight=i,this._setTileStyler(this._rowHeight))}ngOnInit(){this._checkCols(),this._checkRowHeight()}ngAfterContentChecked(){this._layoutTiles()}_checkCols(){this.cols}_checkRowHeight(){this._rowHeight||this._setTileStyler("1:1")}_setTileStyler(e){this._tileStyler&&this._tileStyler.reset(this),e===qP?this._tileStyler=new oy:e&&e.indexOf(":")>-1?this._tileStyler=new ry(e):this._tileStyler=new iy(e)}_layoutTiles(){this._tileCoordinator||(this._tileCoordinator=new Cf);let e=this._tileCoordinator,i=this._tiles.filter(o=>!o._gridList||o._gridList===this),r=this._dir?this._dir.value:"ltr";this._tileCoordinator.update(this.cols,i),this._tileStyler.init(this.gutterSize,e,this.cols,r),i.forEach((o,s)=>{let a=e.positions[s];this._tileStyler.setStyle(o,a.row,a.col)}),this._setListStyle(this._tileStyler.getComputedHeight())}_setListStyle(e){e&&(this._element.nativeElement.style[e[0]]=e[1])}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-grid-list"]],contentQueries:function(i,r,o){if(i&1&&Et(o,sy,5),i&2){let s;J(s=ee())&&(r._tiles=s)}},hostAttrs:[1,"mat-grid-list"],hostVars:1,hostBindings:function(i,r){i&2&&le("cols",r.cols)},inputs:{cols:"cols",gutterSize:"gutterSize",rowHeight:"rowHeight"},exportAs:["matGridList"],features:[Le([{provide:Ax,useExisting:t}])],ngContentSelectors:Tx,decls:2,vars:0,template:function(i,r){i&1&&(ue(),pt(0,"div"),V(1),bt())},styles:[WP],encapsulation:2,changeDetection:0})}return t})(),Fx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ny,ve,ny]})}return t})();function ZP(t,n){}var Qi=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var ly=(()=>{class t extends $i{_elementRef=d(k);_focusTrapFactory=d(rl);_config;_interactivityChecker=d(ts);_ngZone=d(B);_focusMonitor=d(sn);_renderer=d(Pe);_changeDetectorRef=d(Te);_injector=d(F);_platform=d(Ie);_document=d(G);_portalOutlet;_focusTrapped=new D;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=d(Qi,{optional:!0})||new Qi,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),s(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",r),s=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(e){this._isDestroyed||Xe(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||i.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let r=tl(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=tl();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=tl()))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,r){if(i&1&&Ye(Wi,7),i&2){let o;J(o=ee())&&(r._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,r){i&2&&le("id",r._config.id||null)("role",r._config.role)("aria-modal",r._config.ariaModal)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null)},features:[De],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,r){i&1&&ht(0,ZP,0,0,"ng-template",0)},dependencies:[Wi],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return t})(),kl=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new D;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!gt(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},KP=new v("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=d(F);return()=>as(t)}}),QP=new v("DialogData"),XP=new v("DefaultDialogConfig");function JP(t){let n=Ce(t),e=new z;return{valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete()}}}var Px=(()=>{class t{_injector=d(F);_defaultOptions=d(XP,{optional:!0});_parentDialog=d(t,{optional:!0,skipSelf:!0});_overlayContainer=d(Yu);_idGenerator=d(ze);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new D;_afterOpenedAtThisLevel=new D;_ariaHiddenElements=new Map;_scrollStrategy=d(KP);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=un(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Ve(void 0)));constructor(){}open(e,i){let r=this._defaultOptions||new Qi;i=g(g({},r),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),s=pi(this._injector,o),a=new kl(s,i),l=this._attachContainer(s,a,i);if(a.containerInstance=l,!this.openDialogs.length){let c=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(_e(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(c)}):this._hideNonDialogContentFromAssistiveTechnology(c)}return this._attachDialogContent(e,a,l,i),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,!0)),this.afterOpened.next(a),a}closeAll(){ay(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){ay(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),ay(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new Tn({positionStrategy:e.positionStrategy||Gi().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,s=[{provide:Qi,useValue:r},{provide:kl,useValue:i},{provide:os,useValue:e}],a;r.container?typeof r.container=="function"?a=r.container:(a=r.container.type,s.push(...r.container.providers(r))):a=ly;let l=new fi(a,r.viewContainerRef,F.create({parent:o||this._injector,providers:s}));return e.attach(l).instance}_attachDialogContent(e,i,r,o){if(e instanceof rt){let s=this._createInjector(o,i,r,void 0),a={$implicit:o.data,dialogRef:i};o.templateContext&&(a=g(g({},a),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),r.attachTemplatePortal(new Mn(e,null,a,s))}else{let s=this._createInjector(o,i,r,this._injector),a=r.attachComponentPortal(new fi(e,o.viewContainerRef,s));i.componentRef=a,i.componentInstance=a.instance}}_createInjector(e,i,r,o){let s=e.injector||e.viewContainerRef?.injector,a=[{provide:QP,useValue:e.data},{provide:kl,useValue:i}];return e.providers&&(typeof e.providers=="function"?a.push(...e.providers(i,e,r)):a.push(...e.providers)),e.direction&&(!s||!s.get(at,null,{optional:!0}))&&a.push({provide:at,useValue:JP(e.direction)}),F.create({parent:s||o,providers:a})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,s)=>{o?s.setAttribute("aria-hidden",o):s.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function ay(t,n){let e=t.length;for(;e--;)n(t[e])}function eL(t,n){}var Ef=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},cy="mdc-dialog--open",Lx="mdc-dialog--opening",jx="mdc-dialog--closing",tL=150,nL=75,iL=(()=>{class t extends ly{_animationStateChanged=new z;_animationsEnabled=!je();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Bx(this._config.enterAnimationDuration)??tL:0;_exitAnimationDuration=this._animationsEnabled?Bx(this._config.exitAnimationDuration)??nL:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Vx,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Lx,cy)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(cy),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(cy),this._animationsEnabled?(this._hostElement.style.setProperty(Vx,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(jx)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Lx,jx)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275cmp=M({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,r){i&2&&(Nt("id",r._config.id),le("aria-modal",r._config.ariaModal)("role",r._config.role)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null),$("_mat-animation-noopable",!r._animationsEnabled)("mat-mdc-dialog-container-with-actions",r._actionSectionCount>0))},features:[De],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(y(0,"div",0)(1,"div",1),ht(2,eL,0,0,"ng-template",2),_()())},dependencies:[Wi],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2})}return t})(),Vx="--mat-dialog-transition-duration";function Bx(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?on(t.substring(0,t.length-2)):t.endsWith("s")?on(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var Df=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(Df||{}),to=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Wt(1);_beforeClosed=new Wt(1);_result;_closeFallbackTimeout;_state=Df.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(re(r=>r.state==="opened"),_e(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(re(r=>r.state==="closed"),_e(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Tt(this.backdropClick(),this.keydownEvents().pipe(re(r=>r.keyCode===27&&!this.disableClose&&!gt(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),Hx(this,r.type==="keydown"?"keyboard":"mouse"))})}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(re(i=>i.state==="closing"),_e(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=Df.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=Df.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function Hx(t,n,e){return t._closeInteractionType=n,t.close(e)}var rL=new v("MatMdcDialogData"),oL=new v("mat-mdc-dialog-default-options"),sL=new v("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(F);return()=>as(t)}}),xf=(()=>{class t{_defaultOptions=d(oL,{optional:!0});_scrollStrategy=d(sL);_parentDialog=d(t,{optional:!0,skipSelf:!0});_idGenerator=d(ze);_injector=d(F);_dialog=d(Px);_animationsDisabled=je();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new D;_afterOpenedAtThisLevel=new D;dialogConfigClass=Ef;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=un(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Ve(void 0)));constructor(){this._dialogRefConstructor=to,this._dialogContainerType=iL,this._dialogDataToken=rL}open(e,i){let r;i=g(g({},this._defaultOptions||new Ef),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,q(g({},i),{positionStrategy:Gi(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:Qi,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(s,a,l)=>(r=new this._dialogRefConstructor(s,i,l),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:a.data},{provide:this._dialogRefConstructor,useValue:r}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(r);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ux=(()=>{class t{dialogRef=d(to,{optional:!0});_elementRef=d(k);_dialog=d(xf);ariaLabel;type="button";dialogResult;_matDialogClose;constructor(){}ngOnInit(){this.dialogRef||(this.dialogRef=qx(this._elementRef,this._dialog.openDialogs))}ngOnChanges(e){let i=e._matDialogClose||e._matDialogCloseResult;i&&(this.dialogResult=i.currentValue)}_onButtonClick(e){Hx(this.dialogRef,e.screenX===0&&e.screenY===0?"keyboard":"mouse",this.dialogResult)}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(i,r){i&1&&ce("click",function(s){return r._onButtonClick(s)}),i&2&&le("aria-label",r.ariaLabel||null)("type",r.type)},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[Ke]})}return t})(),zx=(()=>{class t{_dialogRef=d(to,{optional:!0});_elementRef=d(k);_dialog=d(xf);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=qx(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t})}return t})(),$x=(()=>{class t extends zx{id=d(ze).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275dir=L({type:t,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(i,r){i&2&&Nt("id",r.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[De]})}return t})(),Wx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[Zm([zi])]})}return t})(),Gx=(()=>{class t extends zx{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275dir=L({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,r){i&2&&$("mat-mdc-dialog-actions-align-start",r.align==="start")("mat-mdc-dialog-actions-align-center",r.align==="center")("mat-mdc-dialog-actions-align-end",r.align==="end")},inputs:{align:"align"},features:[De]})}return t})();function qx(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var Nl=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new D;constructor(n=!1,e,i=!0,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var Yx=(()=>{class t{_animationsDisabled=je();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&$("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return t})();var aL=["text"],lL=[[["mat-icon"]],"*"],cL=["mat-icon","*"];function dL(t,n){if(t&1&&ge(0,"mat-pseudo-checkbox",1),t&2){let e=S();de("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function uL(t,n){if(t&1&&ge(0,"mat-pseudo-checkbox",3),t&2){let e=S();de("disabled",e.disabled)}}function fL(t,n){if(t&1&&(y(0,"span",4),C(1),_()),t&2){let e=S();m(),K("(",e.group.label,")")}}var uy=new v("MAT_OPTION_PARENT_COMPONENT"),fy=new v("MatOptgroup");var dy=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}},Cs=(()=>{class t{_element=d(k);_changeDetectorRef=d(Te);_parent=d(uy,{optional:!0});group=d(fy,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=d(ze).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=Ce(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new z;_text;_stateChanges=new D;constructor(){let e=d(It);e.load(Yi),e.load(Pu),this._signalDisableRipple=!!this._parent&&Ni(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!gt(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new dy(this,e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&Ye(aL,7),i&2){let o;J(o=ee())&&(r._text=o.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&ce("click",function(){return r._selectViaInteraction()})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(Nt("id",r.id),le("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),$("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",se]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:cL,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(ue(lL),H(0,dL,1,2,"mat-pseudo-checkbox",1),V(1),y(2,"span",2,0),V(4,1),_(),H(5,uL,1,1,"mat-pseudo-checkbox",3),H(6,fL,2,1,"span",4),ge(7,"div",5)),i&2&&(U(r.multiple?0:-1),m(5),U(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),m(),U(r.group&&r.group._inert?6:-1),m(),de("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple))},dependencies:[Yx,ls],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})();function Zx(t,n,e){if(e.length){let i=n.toArray(),r=e.toArray(),o=0;for(let s=0;s<t+1;s++)i[s].group&&i[s].group===r[o]&&o++;return o}return 0}function Kx(t,n,e,i){return t<e?t:t+n>e+i?Math.max(0,t-i+n):e}var Qx=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var If=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??!1;o!==n&&(this.errorState=o,this._stateChanges.next())}};var Xx=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var hy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[cs,Xx,Cs,ve]})}return t})();var hL=["trigger"],pL=["panel"],mL=[[["mat-select-trigger"]],"*"],gL=["mat-select-trigger","*"];function vL(t,n){if(t&1&&(y(0,"span",4),C(1),_()),t&2){let e=S();m(),fe(e.placeholder)}}function yL(t,n){t&1&&V(0)}function _L(t,n){if(t&1&&(y(0,"span",11),C(1),_()),t&2){let e=S(2);m(),fe(e.triggerValue)}}function bL(t,n){if(t&1&&(y(0,"span",5),H(1,yL,1,0)(2,_L,2,1,"span",11),_()),t&2){let e=S();m(),U(e.customTrigger?1:2)}}function wL(t,n){if(t&1){let e=Vt();y(0,"div",12,1),ce("keydown",function(r){He(e);let o=S();return Ue(o._handleKeydown(r))}),V(2,1),_()}if(t&2){let e=S();Ot(e.panelClass),$("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),le("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var CL=new v("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(F);return()=>Kr(t)}}),DL=new v("MAT_SELECT_CONFIG"),EL=new v("MatSelectTrigger"),py=class{source;value;constructor(n,e){this.source=n,this.value=e}},Jx=(()=>{class t{_viewportRuler=d(Hn);_changeDetectorRef=d(Te);_elementRef=d(k);_dir=d(at,{optional:!0});_idGenerator=d(ze);_renderer=d(Pe);_parentFormField=d(ey,{optional:!0});ngControl=d(Jr,{self:!0,optional:!0});_liveAnnouncer=d(ol);_defaultOptions=d(DL,{optional:!0});_animationsDisabled=je();_popoverLocation;_initialized=new D;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=Zx(e,this.options,this.optionGroups),s=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=Kx(s.offsetTop,s.offsetHeight,r.scrollTop,r.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new py(this,e)}_scrollStrategyFactory=d(CL);_panelOpen=!1;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new D;_errorStateTracker;stateChanges=new D;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=Ce(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(of.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=un(()=>{let e=this.options;return e?e.changes.pipe(Ve(e),we(()=>Tt(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(we(()=>this.optionSelectionChanges))});openedChange=new z;_openedStream=this.openedChange.pipe(re(e=>e),T(()=>{}));_closedStream=this.openedChange.pipe(re(e=>!e),T(()=>{}));selectionChange=new z;valueChange=new z;constructor(){let e=d(Qx),i=d(Yv,{optional:!0}),r=d(Kv,{optional:!0}),o=d(new si("tabindex"),{optional:!0}),s=d(vl,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new If(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=s?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new Nl(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(pe(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(pe(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect())}),this.options.changes.pipe(Ve(null),pe(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby")}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(_e(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let i=`${this.id}-panel`;this._trackedModal&&hv(this._trackedModal,"aria-owns",i),$D(e,"aria-owns",i),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;hv(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,s=this._keyManager;if(!s.isTyping()&&o&&!gt(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let a=this.selected;s.onKeydown(e);let l=this.selected;l&&a!==l&&this._liveAnnouncer.announce(l.viewValue,1e4)}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,s=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!s&&(r===13||r===32)&&i.activeItem&&!gt(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!s&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let a=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(a?l.select():l.deselect())})}else{let a=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==a&&i.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!gt(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else{let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return!1;try{return(r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return!1}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof ss?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new dl(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Tt(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(pe(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Tt(...this.options.map(i=>i._stateChanges)).pipe(pe(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next()}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(e){let i=wt(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&Et(o,EL,5)(o,Cs,5)(o,fy,5),i&2){let s;J(s=ee())&&(r.customTrigger=s.first),J(s=ee())&&(r.options=s),J(s=ee())&&(r.optionGroups=s)}},viewQuery:function(i,r){if(i&1&&Ye(hL,5)(pL,5)(Zu,5),i&2){let o;J(o=ee())&&(r.trigger=o.first),J(o=ee())&&(r.panel=o.first),J(o=ee())&&(r._overlayDir=o.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&ce("keydown",function(s){return r._handleKeydown(s)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(le("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),$("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",se],disableRipple:[2,"disableRipple","disableRipple",se],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Or(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",se],placeholder:"placeholder",required:[2,"required","required",se],multiple:[2,"multiple","multiple",se],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",se],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",Or],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",se]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[Le([{provide:Jv,useExisting:t},{provide:uy,useExisting:t}]),Ke],ngContentSelectors:gL,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(ue(mL),y(0,"div",2,0),ce("click",function(){return r.open()}),y(3,"div",3),H(4,vL,2,1,"span",4)(5,bL,3,1,"span",5),_(),y(6,"div",6)(7,"div",7),Ai(),y(8,"svg",8),ge(9,"path",9),_()()()(),ht(10,wL,3,16,"ng-template",10),ce("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(s){return r._handleOverlayKeydown(s)})),i&2){let o=en(1);m(3),le("id",r._valueId),m(),U(r.empty?4:5),m(6),de("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",r._popoverLocation)}},dependencies:[ss,Zu],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return t})();var eI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[qi,hy,ve,ui,wf,hy]})}return t})();var Tf=["*"],IL=["content"],SL=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],ML=["mat-drawer","mat-drawer-content","*"];function TL(t,n){if(t&1){let e=Vt();y(0,"div",1),ce("click",function(){He(e);let r=S();return Ue(r._onBackdropClicked())}),_()}if(t&2){let e=S();$("mat-drawer-shown",e._isShowingBackdrop())}}function AL(t,n){t&1&&(y(0,"mat-drawer-content"),V(1,2),_())}var RL=[[["mat-sidenav"]],[["mat-sidenav-content"]],"*"],kL=["mat-sidenav","mat-sidenav-content","*"];function NL(t,n){if(t&1){let e=Vt();y(0,"div",1),ce("click",function(){He(e);let r=S();return Ue(r._onBackdropClicked())}),_()}if(t&2){let e=S();$("mat-drawer-shown",e._isShowingBackdrop())}}function OL(t,n){t&1&&(y(0,"mat-sidenav-content"),V(1,2),_())}var FL=`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`;var PL=new v("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),vy=new v("MAT_DRAWER_CONTAINER"),Sf=(()=>{class t extends zi{_platform=d(Ie);_changeDetectorRef=d(Te);_container=d(gy);constructor(){let e=d(k),i=d(Yr),r=d(B);super(e,i,r)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:i}=this._container;return e!=null&&e.mode!=="over"&&e.opened||i!=null&&i.mode!=="over"&&i.opened}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(i,r){i&2&&(ii("margin-left",r._container._contentMargins.left,"px")("margin-right",r._container._contentMargins.right,"px"),$("mat-drawer-content-hidden",r._shouldBeHidden()))},features:[Le([{provide:zi,useExisting:t}]),De],ngContentSelectors:Tf,decls:1,vars:0,template:function(i,r){i&1&&(ue(),V(0))},encapsulation:2,changeDetection:0})}return t})(),my=(()=>{class t{_elementRef=d(k);_focusTrapFactory=d(rl);_focusMonitor=d(sn);_platform=d(Ie);_ngZone=d(B);_renderer=d(Pe);_interactivityChecker=d(ts);_doc=d(G);_container=d(vy,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=an(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=an(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(an(e))}_opened=Ce(!1);_openedVia=null;_animationStarted=new D;_animationEnd=new D;openedChange=new z(!0);_openedStream=this.openedChange.pipe(re(e=>e),T(()=>{}));openedStart=this._animationStarted.pipe(re(()=>this.opened),mc(void 0));_closedStream=this.openedChange.pipe(re(e=>!e),T(()=>{}));closedStart=this._animationStarted.pipe(re(()=>!this.opened),mc(void 0));_destroyed=new D;onPositionChanged=new z;_content;_modeChanged=new D;_injector=d(F);_changeDetectorRef=d(Te);constructor(){this.openedChange.pipe(pe(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,i=this._elementRef.nativeElement;return[e.listen(i,"keydown",r=>{r.keyCode===27&&!this.disableClose&&!gt(r)&&this._ngZone.run(()=>{this.close(),r.stopPropagation(),r.preventDefault()})}),e.listen(i,"transitionend",this._handleTransitionEvent),e.listen(i,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),s(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",r),s=this._renderer.listen(e,"mousedown",r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":Xe(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,i){e&&i&&(this._openedVia=i);let r=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),r}_setOpen(e,i,r){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&i&&this._restoreFocus(r),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(o=>{this.openedChange.pipe(_e(1)).subscribe(s=>o(s?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let i=this._elementRef.nativeElement,r=i.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),r.insertBefore(this._anchor,i)),r.appendChild(i)):this._anchor&&this._anchor.parentNode.insertBefore(i,this._anchor)}_handleTransitionEvent=e=>{let i=this._elementRef.nativeElement;e.target===i&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-drawer"]],viewQuery:function(i,r){if(i&1&&Ye(IL,5),i&2){let o;J(o=ee())&&(r._content=o.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(i,r){i&2&&(le("align",null)("tabIndex",r.mode!=="side"?"-1":null),ii("visibility",!r._container&&!r.opened?"hidden":null),$("mat-drawer-end",r.position==="end")("mat-drawer-over",r.mode==="over")("mat-drawer-push",r.mode==="push")("mat-drawer-side",r.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:Tf,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,r){i&1&&(ue(),y(0,"div",1,0),V(2),_())},dependencies:[zi],encapsulation:2,changeDetection:0})}return t})(),gy=(()=>{class t{_dir=d(at,{optional:!0});_element=d(k);_ngZone=d(B);_changeDetectorRef=d(Te);_animationDisabled=je();_transitionsEnabled=!1;_allDrawers;_drawers=new wn;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=an(e)}_autosize=d(PL);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:an(e)}_backdropOverride=null;backdropClick=new z;_start=null;_end=null;_left=null;_right=null;_destroyed=new D;_doCheckSubject=new D;_contentMargins={left:null,right:null};_contentMarginChanges=new D;get scrollable(){return this._userContent||this._content}_injector=d(F);constructor(){let e=d(Ie),i=d(Hn);this._dir?.change.pipe(pe(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),i.change().pipe(pe(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(Ve(this._allDrawers),pe(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(i=>!i._container||i._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(Ve(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(dr(10),pe(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,i=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let r=this._left._getWidth();e+=r,i-=r}}if(this._right&&this._right.opened){if(this._right.mode=="side")i+=this._right._getWidth();else if(this._right.mode=="push"){let r=this._right._getWidth();i+=r,e-=r}}e=e||null,i=i||null,(e!==this._contentMargins.left||i!==this._contentMargins.right)&&(this._contentMargins={left:e,right:i},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(pe(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(pe(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(pe(this._drawers.changes)).subscribe(()=>{Xe({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(pe(Tt(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let i=this._element.nativeElement.classList,r="mat-drawer-container-has-open";e?i.add(r):i.remove(r)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-drawer-container"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Sf,5)(o,my,5),i&2){let s;J(s=ee())&&(r._content=s.first),J(s=ee())&&(r._allDrawers=s)}},viewQuery:function(i,r){if(i&1&&Ye(Sf,5),i&2){let o;J(o=ee())&&(r._userContent=o.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(i,r){i&2&&$("mat-drawer-container-explicit-backdrop",r._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[Le([{provide:vy,useExisting:t}])],ngContentSelectors:ML,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,r){i&1&&(ue(SL),H(0,TL,1,2,"div",0),V(1),V(2,1),H(3,AL,2,0,"mat-drawer-content")),i&2&&(U(r.hasBackdrop?0:-1),m(3),U(r._content?-1:3))},dependencies:[Sf],styles:[`.mat-drawer-container {
  position: relative;
  z-index: 1;
  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));
  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));
  box-sizing: border-box;
  display: block;
  overflow: hidden;
}
.mat-drawer-container[fullscreen] {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-drawer-container[fullscreen].mat-drawer-container-has-open {
  overflow: hidden;
}
.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {
  z-index: 3;
}
.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,
.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,
.ng-animate-disabled .mat-drawer-container .mat-drawer-content {
  transition: none;
}

.mat-drawer-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  z-index: 3;
  visibility: hidden;
}
.mat-drawer-backdrop.mat-drawer-shown {
  visibility: visible;
  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));
}
.mat-drawer-transition .mat-drawer-backdrop {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: background-color, visibility;
}
@media (forced-colors: active) {
  .mat-drawer-backdrop {
    opacity: 0.5;
  }
}

.mat-drawer-content {
  position: relative;
  z-index: 1;
  display: block;
  height: 100%;
  overflow: auto;
}
.mat-drawer-content.mat-drawer-content-hidden {
  opacity: 0;
}
.mat-drawer-transition .mat-drawer-content {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform, margin-left, margin-right;
}

.mat-drawer {
  position: relative;
  z-index: 4;
  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));
  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);
  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  width: var(--mat-sidenav-container-width, 360px);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  outline: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transform: translate3d(-100%, 0, 0);
}
@media (forced-colors: active) {
  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {
    border-right: solid 1px currentColor;
  }
}
@media (forced-colors: active) {
  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {
    border-left: solid 1px currentColor;
    border-right: none;
  }
}
.mat-drawer.mat-drawer-side {
  z-index: 2;
}
.mat-drawer.mat-drawer-end {
  right: 0;
  transform: translate3d(100%, 0, 0);
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
[dir=rtl] .mat-drawer {
  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translate3d(100%, 0, 0);
}
[dir=rtl] .mat-drawer.mat-drawer-end {
  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  left: 0;
  right: auto;
  transform: translate3d(-100%, 0, 0);
}
.mat-drawer-transition .mat-drawer {
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {
  visibility: hidden;
  box-shadow: none;
}
.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {
  display: none;
}
.mat-drawer.mat-drawer-opened.mat-drawer-opened {
  transform: none;
}

.mat-drawer-side {
  box-shadow: none;
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
}
.mat-drawer-side.mat-drawer-end {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side {
  border-left-color: var(--mat-sidenav-container-divider-color, transparent);
  border-left-width: 1px;
  border-left-style: solid;
  border-right: none;
}
[dir=rtl] .mat-drawer-side.mat-drawer-end {
  border-right-color: var(--mat-sidenav-container-divider-color, transparent);
  border-right-width: 1px;
  border-right-style: solid;
  border-left: none;
}

.mat-drawer-inner-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.mat-sidenav-fixed {
  position: fixed;
}
`],encapsulation:2,changeDetection:0})}return t})(),Mf=(()=>{class t extends Sf{static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275cmp=M({type:t,selectors:[["mat-sidenav-content"]],hostAttrs:[1,"mat-drawer-content","mat-sidenav-content"],features:[Le([{provide:zi,useExisting:t}]),De],ngContentSelectors:Tf,decls:1,vars:0,template:function(i,r){i&1&&(ue(),V(0))},encapsulation:2,changeDetection:0})}return t})(),yy=(()=>{class t extends my{get fixedInViewport(){return this._fixedInViewport}set fixedInViewport(e){this._fixedInViewport=an(e)}_fixedInViewport=!1;get fixedTopGap(){return this._fixedTopGap}set fixedTopGap(e){this._fixedTopGap=on(e)}_fixedTopGap=0;get fixedBottomGap(){return this._fixedBottomGap}set fixedBottomGap(e){this._fixedBottomGap=on(e)}_fixedBottomGap=0;static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275cmp=M({type:t,selectors:[["mat-sidenav"]],hostAttrs:[1,"mat-drawer","mat-sidenav"],hostVars:16,hostBindings:function(i,r){i&2&&(le("tabIndex",r.mode!=="side"?"-1":null)("align",null),ii("top",r.fixedInViewport?r.fixedTopGap:null,"px")("bottom",r.fixedInViewport?r.fixedBottomGap:null,"px"),$("mat-drawer-end",r.position==="end")("mat-drawer-over",r.mode==="over")("mat-drawer-push",r.mode==="push")("mat-drawer-side",r.mode==="side")("mat-sidenav-fixed",r.fixedInViewport))},inputs:{fixedInViewport:"fixedInViewport",fixedTopGap:"fixedTopGap",fixedBottomGap:"fixedBottomGap"},exportAs:["matSidenav"],features:[Le([{provide:my,useExisting:t}]),De],ngContentSelectors:Tf,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(i,r){i&1&&(ue(),y(0,"div",1,0),V(2),_())},dependencies:[zi],encapsulation:2,changeDetection:0})}return t})(),tI=(()=>{class t extends gy{_allDrawers=void 0;_content=void 0;static \u0275fac=(()=>{let e;return function(r){return(e||(e=Qe(t)))(r||t)}})();static \u0275cmp=M({type:t,selectors:[["mat-sidenav-container"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Mf,5)(o,yy,5),i&2){let s;J(s=ee())&&(r._content=s.first),J(s=ee())&&(r._allDrawers=s)}},hostAttrs:[1,"mat-drawer-container","mat-sidenav-container"],hostVars:2,hostBindings:function(i,r){i&2&&$("mat-drawer-container-explicit-backdrop",r._backdropOverride)},exportAs:["matSidenavContainer"],features:[Le([{provide:vy,useExisting:t},{provide:gy,useExisting:t}]),De],ngContentSelectors:kL,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(i,r){i&1&&(ue(RL),H(0,NL,1,2,"div",0),V(1),V(2,1),H(3,OL,2,0,"mat-sidenav-content")),i&2&&(U(r.hasBackdrop?0:-1),m(3),U(r._content?-1:3))},dependencies:[Mf],styles:[FL],encapsulation:2,changeDetection:0})}return t})(),nI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ui,ve,ui]})}return t})();var jL=["mat-internal-form-field",""],VL=["*"],iI=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&$("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:jL,ngContentSelectors:VL,decls:1,vars:0,template:function(i,r){i&1&&(ue(),V(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return t})();var BL=["switch"],HL=["*"];function UL(t,n){t&1&&(y(0,"span",11),Ai(),y(1,"svg",13),ge(2,"path",14),_(),y(3,"svg",15),ge(4,"path",16),_()())}var zL=new v("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Af=class{source;checked;constructor(n,e){this.source=n,this.checked=e}},_y=(()=>{class t{_elementRef=d(k);_focusMonitor=d(sn);_changeDetectorRef=d(Te);defaults=d(zL);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Af(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=je();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new z;toggleChange=new z;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){d(It).load(Yi);let e=d(new si("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||"accent",this.id=this._uniqueId=d(ze).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Af(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&Ye(BL,5),i&2){let o;J(o=ee())&&(r._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(Nt("id",r.id),le("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ot(r.color?"mat-"+r.color:""),$("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",se],color:"color",disabled:[2,"disabled","disabled",se],disableRipple:[2,"disableRipple","disableRipple",se],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:Or(e)],checked:[2,"checked","checked",se],hideIcon:[2,"hideIcon","hideIcon",se],disabledInteractive:[2,"disabledInteractive","disabledInteractive",se]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Le([{provide:gf,useExisting:qt(()=>t),multi:!0},{provide:Ml,useExisting:t,multi:!0}]),Ke],ngContentSelectors:HL,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(ue(),y(0,"div",1)(1,"button",2,0),ce("click",function(){return r._handleClick()}),ge(3,"div",3)(4,"span",4),y(5,"span",5)(6,"span",6)(7,"span",7),ge(8,"span",8),_(),y(9,"span",9),ge(10,"span",10),_(),H(11,UL,5,0,"span",11),_()()(),y(12,"label",12),ce("click",function(s){return s.stopPropagation()}),V(13),_()()),i&2){let o=en(2);de("labelPosition",r.labelPosition),m(),$("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),de("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),le("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),m(9),de("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),m(),U(r.hideIcon?-1:11),m(),de("for",r.buttonId),le("id",r._labelId)}},dependencies:[ls,iI],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return t})(),rI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[_y,ve]})}return t})();var oI="indexedDB is not working",Nf=class extends Error{message=oI},WL=`The storage is currently localStorage,
where data must be serialized, and the provided data can't be serialized.`,by=class extends Error{message=WL},GL=new v("localStoragePrefix",{providedIn:"root",factory:()=>""}),qL="ngStorage",YL=new v("localStorageIDBDBName",{providedIn:"root",factory:()=>qL}),ZL=1,KL=new v("localStorageIDBDBVersion",{providedIn:"root",factory:()=>ZL}),QL="localStorage",XL=new v("localStorageIDBStoreName",{providedIn:"root",factory:()=>QL}),JL=!0,ej=new v("localStorageIDBWrap",{providedIn:"root",factory:()=>JL});var tj=`Data stored is not valid against the provided JSON schema.
Check your JSON schema, otherwise it means data has been corrupted.`,Of=class extends Error{message=tj},Rf=(()=>{class t{prefix;constructor(){this.prefix=d(GL)}get size(){return x(localStorage.length)}get(e){let i=localStorage.getItem(this.prefixKey(e));if(i!==null)try{let r=JSON.parse(i);return x(r)}catch(r){return Mt(()=>r)}return x(void 0)}set(e,i){let r=null,o=Object.getPrototypeOf(i);if(typeof i=="object"&&!Array.isArray(i)&&!(o===Object.prototype||o===null))return Mt(()=>new by);try{if(r=JSON.stringify(i),r===void 0)throw new Error}catch(s){return Mt(()=>s)}try{localStorage.setItem(this.prefixKey(e),r)}catch(s){return Mt(()=>s)}return x(void 0)}delete(e){return localStorage.removeItem(this.prefixKey(e)),x(void 0)}clear(){return localStorage.clear(),x(void 0)}keys(){return new W(e=>{for(let i=0;i<localStorage.length;i+=1)e.next(this.getUnprefixedKey(i));e.complete()}).pipe(ar(yi))}has(e){for(let i=0;i<localStorage.length;i+=1)if(e===this.getUnprefixedKey(i))return x(!0);return x(!1)}getUnprefixedKey(e){let i=localStorage.key(e);return i!==null?this.prefix===""?i:i.substring(this.prefix.length):null}prefixKey(e){return`${this.prefix}${e}`}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),kf=(()=>{class t{memoryStorage=new Map;get size(){return x(this.memoryStorage.size)}get(e){return x(this.memoryStorage.get(e))}set(e,i){return this.memoryStorage.set(e,i),x(void 0)}delete(e){return this.memoryStorage.delete(e),x(void 0)}clear(){return this.memoryStorage.clear(),x(void 0)}keys(){return Ae(this.memoryStorage.keys())}has(e){return x(this.memoryStorage.has(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function nj(){let t=d(ei);try{if(Ma(t)&&indexedDB!==void 0&&indexedDB!==null&&"open"in indexedDB)return new wy;if(Ma(t)&&localStorage!==void 0&&localStorage!==null&&"getItem"in localStorage)return new Rf}catch{}return new kf}var ij=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:()=>nj(),providedIn:"root"})}return t})(),wy=(()=>{class t{dbName;storeName;dbVersion;database=new Wt(1);noWrap;wrapIndex="value";constructor(){this.dbName=d(YL),this.storeName=d(XL),this.dbVersion=d(KL),this.noWrap=d(ej),this.connect()}get backingStore(){return{database:this.dbName,store:this.storeName,version:this.dbVersion}}get size(){return this.transaction("readonly").pipe(Re(e=>{let{store:i,events:r}=e,o=i.count();return r.pipe(T(()=>o.result))}),et())}get(e){return this.transaction("readonly").pipe(Re(i=>{let{store:r,events:o}=i,s=r.get(e);return o.pipe(T(()=>{if(s.result!==void 0&&s.result!==null)return!this.noWrap&&typeof s.result=="object"&&this.wrapIndex in s.result&&s.result[this.wrapIndex]!==void 0&&s.result[this.wrapIndex]!==null?s.result[this.wrapIndex]:s.result}))}),et())}set(e,i){return i===void 0?this.delete(e):this.transaction("readwrite").pipe(Re(r=>{let{store:o,events:s}=r,a=this.noWrap?i:{[this.wrapIndex]:i};return o.put(a,e),s.pipe(T(()=>{}))}),et())}delete(e){return this.transaction("readwrite").pipe(Re(i=>{let{store:r,events:o}=i;return r.delete(e),o.pipe(T(()=>{}))}),et())}clear(){return this.transaction("readwrite").pipe(Re(e=>{let{store:i,events:r}=e;return i.clear(),r.pipe(T(()=>{}))}),et())}keys(){return this.transaction("readonly").pipe(et(),Re(e=>{let{store:i}=e,r=i.openKeyCursor(),o=$n(r,"success").pipe(Ps(()=>r.result!==null),T(()=>r.result.key.toString()),Oe(()=>{r.result.continue()})),s=this.listenError(r);return Ns([o,s])}))}has(e){return this.transaction("readonly").pipe(Re(i=>{let{store:r,events:o}=i,s=r.getKey(e);return o.pipe(T(()=>s.result!==void 0))}),et())}connect(){let e;try{e=indexedDB.open(this.dbName,this.dbVersion)}catch{this.database.error(new Nf);return}this.createStore(e);let i=$n(e,"success"),r=this.listenError(e);Ns([i,r]).pipe(et()).subscribe({next:()=>{this.database.next(e.result)},error:()=>{this.database.error(new Nf)}})}createStore(e){$n(e,"upgradeneeded").pipe(et()).subscribe({next:()=>{e.result.objectStoreNames.contains(this.storeName)||e.result.createObjectStore(this.storeName)}})}transaction(e){return this.database.pipe(Re(i=>{let r;try{r=i.transaction([this.storeName],e)}catch(a){return Mt(()=>a)}let o=r.objectStore(this.storeName),s=this.listenTransactionEvents(r);return x({store:o,events:s})}))}listenError(e){return $n(e,"error").pipe(Re(i=>Mt(()=>i.target?.error)))}listenTransactionEvents(e){let i=$n(e,"complete"),r=this.listenError(e);return Ns([i,r])}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),rj=(()=>{class t{validate(e,i){switch(i.type){case"string":return this.validateString(e,i);case"number":case"integer":return this.validateNumber(e,i);case"boolean":return this.validateBoolean(e,i);case"array":return this.validateArray(e,i);case"object":return this.validateObject(e,i)}}validateString(e,i){if(typeof e!="string"||!this.validateConst(e,i)||!this.validateEnum(e,i)||i.maxLength!==void 0&&e.length>i.maxLength||i.minLength!==void 0&&e.length<i.minLength)return!1;if(i.pattern!==void 0)try{if(!new RegExp(i.pattern).test(e))return!1}catch{}return!0}validateNumber(e,i){return!(typeof e!="number"||i.type==="integer"&&!Number.isInteger(e)||!this.validateConst(e,i)||!this.validateEnum(e,i)||i.multipleOf!==void 0&&i.multipleOf!==0&&Number.isFinite(i.multipleOf)&&!Number.isInteger(e/i.multipleOf)||i.maximum!==void 0&&e>i.maximum||i.exclusiveMaximum!==void 0&&e>=i.exclusiveMaximum||i.minimum!==void 0&&e<i.minimum||i.exclusiveMinimum!==void 0&&e<=i.exclusiveMinimum)}validateBoolean(e,i){return!(typeof e!="boolean"||!this.validateConst(e,i))}validateArray(e,i){if(!Array.isArray(e)||i.maxItems!==void 0&&e.length>i.maxItems||i.minItems!==void 0&&e.length<i.minItems)return!1;if(i.uniqueItems===!0){let r=new Set(e);if(e.length!==r.size)return!1}if(Array.isArray(i.items)||i.items===void 0)return this.validateTuple(e,i.items);for(let r of e)if(!this.validate(r,i.items))return!1;return!0}validateTuple(e,i){let r=i?i.length:0;if(e.length!==r)return!1;if(i){for(let[o,s]of i.entries())if(!this.validate(e[o],s))return!1}return!0}validateObject(e,i){if(typeof e!="object"||e===null||Object.keys(i.properties).length<Object.keys(e).length)return!1;if(i.required){for(let r of i.required)if(!Object.hasOwn(e,r))return!1}for(let r in i.properties)if(Object.hasOwn(i.properties,r)&&Object.hasOwn(e,r)&&!this.validate(e[r],i.properties[r]))return!1;return!0}validateConst(e,i){return i.const===void 0?!0:e===i.const}validateEnum(e,i){return i.enum?i.enum.includes(e):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),sI=(()=>{class t{#e;#i;#n=new Map;constructor(e){this.#e=e,this.#i=new rj}get size(){return this.#e.size.pipe(this.#t(()=>this.#e.size))}get backingEngine(){return this.#e instanceof wy?"indexedDB":this.#e instanceof Rf?"localStorage":this.#e instanceof kf?"memory":"unknown"}get backingStore(){return this.#e instanceof wy?this.#e.backingStore:{database:"",store:"",version:0}}get fallbackBackingStore(){return this.#e instanceof Rf?{prefix:this.#e.prefix}:{prefix:""}}get(e,i){return this.#e.get(e).pipe(this.#t(()=>this.#e.get(e)),Re(r=>r==null?x(void 0):i?this.#i.validate(r,i)?x(r):Mt(()=>new Of):x(r)))}set(e,i,r){return i==null?this.delete(e):r&&!this.#i.validate(i,r)?Mt(()=>new Of):this.#e.set(e,i).pipe(this.#t(()=>this.#e.set(e,i)),Oe(()=>{this.#r(e,i)}))}delete(e){return this.#e.delete(e).pipe(this.#t(()=>this.#e.delete(e)),Oe(()=>{this.#r(e,void 0)}))}clear(){return this.#e.clear().pipe(this.#t(()=>this.#e.clear()),Oe(()=>{for(let e of this.#n.keys())this.#r(e,void 0)}))}keys(){return this.#e.keys().pipe(this.#t(()=>this.#e.keys()))}has(e){return this.#e.has(e).pipe(this.#t(()=>this.#e.has(e)))}watch(e,i){this.#n.has(e)||this.#n.set(e,new Wt(1));let r=this.#n.get(e);return(i?this.get(e,i):this.get(e)).subscribe({next:o=>{r.next(o)},error:o=>{r.error(o)}}),r.asObservable()}#r(e,i){let r=this.#n.get(e);r&&r.next(i)}#t(e){return Gt(i=>{if(i!=null&&typeof i=="object"&&"message"in i&&i.message===oI){try{"getItem"in localStorage?this.#e=new Rf:this.#e=new kf}catch{this.#e=new kf}return e()}else return Mt(()=>i)})}\u0275internalGetDatabase(){return this.#e}static \u0275fac=function(i){return new(i||t)(R(ij))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ff=class t{useVariant=new z;useRailsToTheNorth=new z;playerCount=new z;neutralBuildings=[{title:"A",sides:[{title:"front"}]},{title:"B",sides:[{title:"front"}]},{title:"C",sides:[{title:"front"}]},{title:"D",sides:[{title:"front"}]},{title:"E",sides:[{title:"front"}]},{title:"F",sides:[{title:"front"}]},{title:"G",sides:[{title:"front"}]}];playerBuildings=[{title:"1",sides:[{title:"a"},{title:"b"}]},{title:"2",sides:[{title:"a"},{title:"b"}]},{title:"3",sides:[{title:"a"},{title:"b"}]},{title:"4",sides:[{title:"a"},{title:"b"}]},{title:"5",sides:[{title:"a"},{title:"b"}]},{title:"6",sides:[{title:"a"},{title:"b"}]},{title:"7",sides:[{title:"a"},{title:"b"}]},{title:"8",sides:[{title:"a"},{title:"b"}]},{title:"9",sides:[{title:"a"},{title:"b"}]},{title:"10",sides:[{title:"a"},{title:"b"}]},{title:"11",sides:[{title:"a"},{title:"b"}]},{title:"12",sides:[{title:"a"},{title:"b"}]}];stationMasters=[{title:"1",sides:[{title:"front",image:"img/station-master-01.png"}]},{title:"2",sides:[{title:"front",image:"img/station-master-02.png"}]},{title:"3",sides:[{title:"front",image:"img/station-master-03.png"}]},{title:"4",sides:[{title:"front",image:"img/station-master-04.png"}]},{title:"5",sides:[{title:"front",image:"img/station-master-05.png"}]},{title:"6",sides:[{title:"front",image:"img/station-master-06.png"}]},{title:"7",sides:[{title:"front",image:"img/station-master-07.png"}]},{title:"8",sides:[{title:"front",image:"img/station-master-08.png"}]}];getRandomNeutralBuildingOrder(){return this.shuffleArray(this.neutralBuildings)}getRandomStationMasters(){let n=[],e=this.shuffleArray(this.stationMasters);for(let i=0;i<5;i++)n.push(e.pop());return n}getRandomPlayerBuildings(){let n=JSON.parse(JSON.stringify(this.playerBuildings));return n.forEach(e=>{e.sides.splice(Math.floor(Math.random()*e.sides.length),1)}),n}shuffleArray(n){let e=n.slice();for(let i,r,o=e.length;o;i=Math.floor(Math.random()*o),r=e[--o],e[o]=e[i],e[i]=r);return e}static \u0275fac=function(e){return new(e||t)};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})};var Pf=class t{static \u0275fac=function(e){return new(e||t)};static \u0275mod=P({type:t});static \u0275inj=O({providers:[tf({config:{availableLangs:["de","en","pl"],defaultLang:"en",fallbackLang:"en",missingHandler:{useFallbackTranslation:!0},reRenderOnLangChange:!0,prodMode:!xa()},loader:vs})],imports:[cn]})};function oj(t,n){if(t&1&&(Xt(0),y(1,"h2",1),C(2),_(),y(3,"mat-dialog-content"),C(4),_(),y(5,"mat-dialog-actions")(6,"button",2),C(7,"Ok"),_()(),Jt()),t&2){let e=n.$implicit;m(2),K(" ",e("modals.variant-warning.title")," "),m(2),K(" ",e("modals.variant-warning.content"))}}var Lf=class t{dialogRef=d(to);static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-variant-warning-dialog"]],decls:1,vars:0,consts:[[4,"transloco"],["mat-dialog-title",""],["mat-button","","mat-dialog-close",""]],template:function(e,i){e&1&&ht(0,oj,8,2,"ng-container",0)},dependencies:[Qr,ds,Gx,Ux,$x,Wx,Pf,ef],encapsulation:2,changeDetection:0})};var sj=["*",[["mat-toolbar-row"]]],aj=["*","mat-toolbar-row"],lj=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),jf=(()=>{class t{_elementRef=d(k);_platform=d(Ie);_document=d(G);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-toolbar"]],contentQueries:function(i,r,o){if(i&1&&Et(o,lj,5),i&2){let s;J(s=ee())&&(r._toolbarRows=s)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(i,r){i&2&&(Ot(r.color?"mat-"+r.color:""),$("mat-toolbar-multiple-rows",r._toolbarRows.length>0)("mat-toolbar-single-row",r._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:aj,decls:2,vars:0,template:function(i,r){i&1&&(ue(sj),V(0),V(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var Vf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();function lI(t){return Error(`Unable to find icon with the name "${t}"`)}function cj(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function cI(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function dI(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var mi=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},fI=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new mi(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let s=this._sanitizer.sanitize(ot.HTML,r);if(!s)throw dI(r);let a=$r(s);return this._addSvgIconConfig(e,i,new mi("",a,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new mi(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(ot.HTML,i);if(!o)throw dI(i);let s=$r(o);return this._addSvgIconSetConfig(e,new mi("",s,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(ot.RESOURCE_URL,e);if(!i)throw cI(e);let r=this._cachedIconsByUrl.get(i);return r?x(Bf(r)):this._loadSvgIconFromConfig(new mi(e,null)).pipe(Oe(o=>this._cachedIconsByUrl.set(i,o)),T(o=>Bf(o)))}getNamedSvgIcon(e,i=""){let r=uI(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(i);return s?this._getSvgFromIconSetConfigs(e,s):Mt(lI(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?x(Bf(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(T(i=>Bf(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return x(r);let o=i.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(Gt(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(ot.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),x(null)})));return zn(o).pipe(T(()=>{let s=this._extractIconWithNameFromAnySet(e,i);if(!s)throw lI(e);return s}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,e,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Oe(i=>e.svgText=i),T(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?x(null):this._fetchIcon(e).pipe(Oe(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let s=o.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,r);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),r);let a=this._svgElementFromString($r("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString($r("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:s,value:a}=r[o];s!=="id"&&i.setAttribute(s,a)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??!1;if(!this._httpClient)throw cj();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let s=this._sanitizer.sanitize(ot.RESOURCE_URL,i);if(!s)throw cI(i);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(T(c=>$r(c)),bi(()=>this._inProgressUrlFetches.delete(s)),Os());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(uI(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return dj(o)?new mi(o.url,null,o.options):new mi(o,null)}}static \u0275fac=function(i){return new(i||t)(R(Bo,8),R(Oa),R(G,8),R(Pt))};static \u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Bf(t){return t.cloneNode(!0)}function uI(t,n){return t+":"+n}function dj(t){return!!(t.url&&t.options)}var uj=["*"],fj=new v("MAT_ICON_DEFAULT_OPTIONS"),hj=new v("mat-icon-location",{providedIn:"root",factory:()=>{let t=d(G),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),hI=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],pj=hI.map(t=>`[${t}]`).join(", "),mj=/^url\(['"]?#(.*?)['"]?\)$/,Hf=(()=>{class t{_elementRef=d(k);_iconRegistry=d(fI);_location=d(hj);_errorHandler=d(Pt);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=he.EMPTY;constructor(){let e=d(new si("aria-hidden"),{optional:!0}),i=d(fj,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(s=>{o.setAttribute(s.name,`url('${e}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(pj),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)hI.forEach(s=>{let a=i[o],l=a.getAttribute(s),c=l?l.match(mj):null;if(c){let u=r.get(a);u||(u=[],r.set(a,u)),u.push({name:s,value:c[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(_e(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(le("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),Ot(r.color?"mat-"+r.color:""),$("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",se],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:uj,decls:1,vars:0,template:function(i,r){i&1&&(ue(),V(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return t})(),Uf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[ve]})}return t})();var gj=["mat-menu-item",""],vj=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],yj=["mat-icon, [matMenuItemIcon]","*"];function _j(t,n){t&1&&(Ai(),y(0,"svg",2),ge(1,"polygon",3),_())}var bj=["*"];function wj(t,n){if(t&1){let e=Vt();pt(0,"div",0),Vd("click",function(){He(e);let r=S();return Ue(r.closed.emit("click"))})("animationstart",function(r){He(e);let o=S();return Ue(o._onAnimationStart(r.animationName))})("animationend",function(r){He(e);let o=S();return Ue(o._onAnimationDone(r.animationName))})("animationcancel",function(r){He(e);let o=S();return Ue(o._onAnimationDone(r.animationName))}),pt(1,"div",1),V(2),bt()()}if(t&2){let e=S();Ot(e._classList),$("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Nt("id",e.panelId),le("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var Dy=new v("MAT_MENU_PANEL"),Ol=(()=>{class t{_elementRef=d(k);_document=d(G);_focusMonitor=d(sn);_parentMenu=d(Dy,{optional:!0});_changeDetectorRef=d(Te);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new D;_focused=new D;_highlighted=!1;_triggersSubmenu=!1;constructor(){d(It).load(Yi),this._parentMenu?.addItem?.(this)}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),i=e.querySelectorAll("mat-icon, .material-icons");for(let r=0;r<i.length;r++)i[r].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(i,r){i&1&&ce("click",function(s){return r._checkDisabled(s)})("mouseenter",function(){return r._handleMouseEnter()}),i&2&&(le("role",r.role)("tabindex",r._getTabIndex())("aria-disabled",r.disabled)("disabled",r.disabled||null),$("mat-mdc-menu-item-highlighted",r._highlighted)("mat-mdc-menu-item-submenu-trigger",r._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",se],disableRipple:[2,"disableRipple","disableRipple",se]},exportAs:["matMenuItem"],attrs:gj,ngContentSelectors:yj,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,r){i&1&&(ue(vj),V(0),y(1,"span",0),V(2,1),_(),ge(3,"div",1),H(4,_j,2,0,":svg:svg",2)),i&2&&(m(3),de("matRippleDisabled",r.disableRipple||r.disabled)("matRippleTrigger",r._getHostElement()),m(),U(r._triggersSubmenu?4:-1))},dependencies:[ls],encapsulation:2,changeDetection:0})}return t})();var Cj=new v("MatMenuContent");var Dj=new v("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),Cy="_mat-menu-enter",zf="_mat-menu-exit",Es=(()=>{class t{_elementRef=d(k);_changeDetectorRef=d(Te);_injector=d(F);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=je();_allItems;_directDescendantItems=new wn;_classList={};_panelAnimationState="void";_animationDone=new D;_isAnimating=Ce(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let i=this._previousPanelClass,r=g({},this._classList);i&&i.length&&i.split(" ").forEach(o=>{r[o]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(o=>{r[o]=!0}),this._elementRef.nativeElement.className=""),this._classList=r}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new z;close=this.closed;panelId=d(ze).getId("mat-menu-panel-");constructor(){let e=d(Dj);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new ul(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(Ve(this._directDescendantItems),we(e=>Tt(...e.map(i=>i._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let i=this._keyManager;if(this._panelAnimationState==="enter"&&i.activeItem?._hasFocus()){let r=e.toArray(),o=Math.max(0,Math.min(r.length-1,i.activeItemIndex||0));r[o]&&!r[o].disabled?i.setActiveItem(o):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(Ve(this._directDescendantItems),we(i=>Tt(...i.map(r=>r._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let i=e.keyCode,r=this._keyManager;switch(i){case 27:gt(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(i===38||i===40)&&r.setFocusOrigin("keyboard"),r.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Xe(()=>{let i=this._resolvePanel();if(!i||!i.contains(document.activeElement)){let r=this._keyManager;r.setFocusOrigin(e).setFirstItemActive(),!r.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,i=this.yPosition){this._classList=q(g({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":i==="above","mat-menu-below":i==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let i=e===zf;(i||e===Cy)&&(i&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(i?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===Cy||e===zf)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let i=this._resolvePanel();i&&(i.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(zf),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?Cy:zf)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(Ve(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=M({type:t,selectors:[["mat-menu"]],contentQueries:function(i,r,o){if(i&1&&Et(o,Cj,5)(o,Ol,5)(o,Ol,4),i&2){let s;J(s=ee())&&(r.lazyContent=s.first),J(s=ee())&&(r._allItems=s),J(s=ee())&&(r.items=s)}},viewQuery:function(i,r){if(i&1&&Ye(rt,5),i&2){let o;J(o=ee())&&(r.templateRef=o.first)}},hostVars:3,hostBindings:function(i,r){i&2&&le("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",se],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:se(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Le([{provide:Dy,useExisting:t}])],ngContentSelectors:bj,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(i,r){i&1&&(ue(),Od(0,wj,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return t})(),Ej=new v("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(F);return()=>Kr(t)}});var Ds=new WeakMap,xj=(()=>{class t{_canHaveBackdrop;_element=d(k);_viewContainerRef=d(yt);_menuItemInstance=d(Ol,{optional:!0,self:!0});_dir=d(at,{optional:!0});_focusMonitor=d(sn);_ngZone=d(B);_injector=d(F);_scrollStrategy=d(Ej);_changeDetectorRef=d(Te);_animationsDisabled=je();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=he.EMPTY;_menuCloseSubscription=he.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(i=>{this._destroyMenu(i),(i==="click"||i==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let i=d(Dy,{optional:!0});this._parentMaterialMenu=i instanceof Es?i:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&Ds.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let i=this._menu;if(this._menuOpen||!i)return;this._pendingRemoval?.unsubscribe();let r=Ds.get(i);Ds.set(i,this),r&&r!==this&&r._closeMenu();let o=this._createOverlay(i),s=o.getConfig(),a=s.positionStrategy;this._setPosition(i,a),this._canHaveBackdrop?s.hasBackdrop=i.hasBackdrop==null?!this._triggersSubmenu():i.hasBackdrop:s.hasBackdrop=i.hasBackdrop??!1,o.hasAttached()||(o.attach(this._getPortal(i)),i.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),i.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,i.direction=this.dir,e&&i.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),i instanceof Es&&(i._setIsOpen(!0),i._directDescendantItems.changes.pipe(pe(i.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}focus(e,i){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,i):this._element.nativeElement.focus(i)}_destroyMenu(e){let i=this._overlayRef,r=this._menu;!i||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),r instanceof Es&&this._ownsMenu(r)?(this._pendingRemoval=r._animationDone.pipe(_e(1)).subscribe(()=>{i.detach(),Ds.has(r)||r.lazyContent?.detach()}),r._setIsOpen(!1)):(i.detach(),r?.lazyContent?.detach()),r&&this._ownsMenu(r)&&Ds.delete(r),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let i=this._getOverlayConfig(e);this._subscribeToPositions(e,i.positionStrategy),this._overlayRef=pi(this._injector,i),this._overlayRef.keydownEvents().subscribe(r=>{this._menu instanceof Es&&this._menu._handleKeydown(r)})}return this._overlayRef}_getOverlayConfig(e){return new Tn({positionStrategy:gl(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,i){e.setPositionClasses&&i.positionChanges.subscribe(r=>{this._ngZone.run(()=>{let o=r.connectionPair.overlayX==="start"?"after":"before",s=r.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(o,s)})})}_setPosition(e,i){let[r,o]=e.xPosition==="before"?["end","start"]:["start","end"],[s,a]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[l,c]=[s,a],[u,f]=[r,o],h=0;if(this._triggersSubmenu()){if(f=r=e.xPosition==="before"?"start":"end",o=u=r==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let p=this._parentMaterialMenu.items.first;this._parentInnerPadding=p?p._getHostElement().offsetTop:0}h=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(l=s==="top"?"bottom":"top",c=a==="top"?"bottom":"top");i.withPositions([{originX:r,originY:l,overlayX:u,overlayY:s,offsetY:h},{originX:o,originY:l,overlayX:f,overlayY:s,offsetY:h},{originX:r,originY:c,overlayX:u,overlayY:a,offsetY:-h},{originX:o,originY:c,overlayX:f,overlayY:a,offsetY:-h}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),i=this._overlayRef.detachments(),r=this._parentMaterialMenu?this._parentMaterialMenu.closed:x(),o=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(re(s=>this._menuOpen&&s!==this._menuItemInstance)):x();return Tt(e,r,o,i)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new Mn(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return Ds.get(e)===this}_triggerIsAriaDisabled(){return se(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(i){Hm()};static \u0275dir=L({type:t})}return t})(),mI=(()=>{class t extends xj{_cleanupTouchstart;_hoverSubscription=he.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new z;onMenuOpen=this.menuOpened;menuClosed=new z;onMenuClose=this.menuClosed;constructor(){super(!0);let e=d(Pe);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",i=>{zr(i)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Ur(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let i=e.keyCode;(i===13||i===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===39&&this.dir==="ltr"||i===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=L({type:t,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,r){i&1&&ce("click",function(s){return r._handleClick(s)})("mousedown",function(s){return r._handleMousedown(s)})("keydown",function(s){return r._handleKeydown(s)}),i&2&&le("aria-haspopup",r.menu?"menu":null)("aria-expanded",r.menuOpen)("aria-controls",r.menuOpen?r.menu==null?null:r.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[De]})}return t})();var gI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=P({type:t});static \u0275inj=O({imports:[cs,qi,ve,ui]})}return t})();var Sj=t=>({active:t}),vI=t=>({color:t});function Mj(t,n){if(t&1){let e=Vt();y(0,"button",3),ce("click",function(){let r=He(e).$implicit,o=S();return Ue(o.changeLanguage(r))}),y(1,"mat-icon",4),C(2," language "),_(),y(3,"span",4),C(4),ri(5,"transloco"),_()()}if(t&2){let e=n.$implicit,i=S();de("ngClass",Nr(6,Sj,i.activeLang===e)),m(),de("ngStyle",Nr(8,vI,i.activeLang===e?"rgb(255 143 0)":"")),m(2),de("ngStyle",Nr(10,vI,i.activeLang===e?"rgb(255 143 0)":"")),m(),K(" ",oi(5,4,e+"-language-label")," ")}}var $f=class t{activeLang;availableLangs;translocoService=d(ms);ngOnInit(){let n=`${jv()}`;this.availableLangs=this.translocoService.getAvailableLangs(),this.translocoService.isLang(n)?(this.activeLang=jv(),this.translocoService.setActiveLang(this.activeLang)):this.activeLang=this.translocoService.getDefaultLang()}changeLanguage(n){this.translocoService.setActiveLang(n),this.activeLang=this.translocoService.getActiveLang()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-language-selector"]],decls:10,vars:4,consts:[["menu","matMenu"],["mat-icon-button","","aria-label","Language Selection",1,"example-icon","favorite-icon",3,"matMenuTriggerFor"],["mat-menu-item","",3,"ngClass"],["mat-menu-item","",3,"click","ngClass"],[3,"ngStyle"]],template:function(e,i){if(e&1&&(y(0,"button",1)(1,"mat-icon"),C(2,"translate"),_()(),y(3,"span"),C(4),ri(5,"transloco"),_(),y(6,"mat-menu",null,0),Fi(8,Mj,6,12,"button",2,tg),_()),e&2){let r=en(7);de("matMenuTriggerFor",r),m(4),fe(oi(5,2,i.activeLang+"-language-label")),m(4),Pi(i.availableLangs)}},dependencies:[jn,hg,pg,Qr,Iv,Uf,Hf,gI,Es,Ol,mI,cn,gs],encapsulation:2})};function Tj(t,n){t&1&&(y(0,"span"),C(1),ri(2,"transloco"),_()),t&2&&(m(),fe(oi(2,1,"app-title")))}function Aj(t,n){t&1&&(y(0,"span",4),C(1),ri(2,"transloco"),_()),t&2&&(m(),fe(oi(2,1,"app-title-short")))}var Wf=class t{sidebarHandle;isXSmall;responsive=d(Gr);ngOnInit(){this.responsive.observe(is.XSmall).subscribe(n=>{n.matches?this.isXSmall=!0:this.isXSmall=!1})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-page-header"]],inputs:{sidebarHandle:"sidebarHandle"},decls:10,vars:4,consts:[[1,"page-header"],[1,"main-toolbar","toolbar"],["type","button","mat-icon-button","",3,"click","hidden"],[1,"app-name","text-xl"],[1,"text-xl"],[1,"spacer"]],template:function(e,i){e&1&&(y(0,"div",0)(1,"mat-toolbar",1)(2,"button",2),ce("click",function(){return i.sidebarHandle.toggle()}),y(3,"mat-icon"),C(4,"menu"),_()(),y(5,"span",3),H(6,Tj,3,3,"span")(7,Aj,3,3,"span",4),_(),ge(8,"span",5)(9,"app-language-selector"),_()()),e&2&&(m(),$("is-mobile",i.isXSmall),m(),de("hidden",!i.isXSmall),m(4),U(i.isXSmall?7:6))},dependencies:[jn,Vf,jf,Uf,Hf,cn,$f,gs],styles:[".is-mobile[_ngcontent-%COMP%]{position:fixed;z-index:2}.app-name[_ngcontent-%COMP%]{margin:0 0 0 8px}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.mat-toolbar[_ngcontent-%COMP%]{color:var(--mat-sys-primary);background:var(--bg-color)}"]})};var Gf=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-page-footer"]],decls:7,vars:3,consts:[[1,"page-footer","text-xs","flex","items-center","flex-row","flex-wrap"],["color","primary",1,"page-footer"],[1,"flex","flex-1","justify-end","text-xl"],["href","https://boardgamegeek.com/user/Vortilion","target","_blank",1,"text-blue-700"]],template:function(e,i){e&1&&(y(0,"div",0)(1,"mat-toolbar",1)(2,"div",2),C(3),ri(4,"transloco"),y(5,"a",3),C(6,"Vortilion"),_()()()()),e&2&&(m(3),K(" ",oi(4,1,"creator-prefix"),"\xA0"))},dependencies:[Vf,jf,cn,gs],styles:[".page-footer[_ngcontent-%COMP%]{color:var(--mat-sys-primary);background:var(--bg-color)}"]})};var Rj=t=>({"w-full":t}),kj=(t,n)=>n.value;function Nj(t,n){if(t&1&&(y(0,"mat-option",10),C(1),y(2,"span"),C(3),_()()),t&2){let e=n.$implicit,i=S().$implicit;de("value",e.value),m(),K(" ",e.label," "),m(2),fe(i("players-label"))}}function Oj(t,n){if(t&1&&(y(0,"li",26)(1,"span"),C(2),_()()),t&2){let e=n.$implicit;m(2),fe(e.title)}}function Fj(t,n){if(t&1&&(y(0,"mat-grid-tile")(1,"mat-grid-tile-header")(2,"h3")(3,"span"),C(4),_(),C(5,": "),_()(),y(6,"ul",25),Fi(7,Oj,3,1,"li",26,_a),_()()),t&2){let e=S().$implicit,i=S();m(4),fe(e("neutral-buildings-label")),m(3),Pi(i.randomNeutralBuildings)}}function Pj(t,n){if(t&1&&(y(0,"div"),ge(1,"img",27),_()),t&2){let e=n.$implicit;m(),de("src",e.sides[0].image,Em)}}function Lj(t,n){if(t&1&&(y(0,"mat-grid-tile")(1,"mat-grid-tile-header")(2,"h3")(3,"span"),C(4),_(),C(5,": "),_()(),y(6,"div",25),Fi(7,Pj,2,1,"div",null,_a),_()()),t&2){let e=S().$implicit,i=S();m(4),fe(e("station-masters-label")),m(3),Pi(i.randomStationMasters)}}function jj(t,n){if(t&1&&(y(0,"span",22)(1,"span",28),C(2),_()()),t&2){let e=n.$implicit;m(2),zd("",e.title,"",e.sides[0].title," ")}}function Vj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S().$implicit;m(),fe(e("further-steps-step4_simmental"))}}function Bj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S().$implicit;m(),fe(e("further-steps-step4_brahman"))}}function Hj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S().$implicit;m(),fe(e("further-steps-step4"))}}function Uj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S(2).$implicit;m(),fe(e("further-steps-step41_simmental_brahman"))}}function zj(t,n){if(t&1&&C(0),t&2){let e=S(2).$implicit;K(" ",e("further-steps-step41")," ")}}function $j(t,n){if(t&1&&(y(0,"li"),H(1,Uj,2,1,"ng-container")(2,zj,1,1),_()),t&2){let e=S(2);m(),U(e.useSimmental||e.useBrahman?1:2)}}function Wj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S(2).$implicit;m(),fe(e("further-steps-step42_simmental_brahman"))}}function Gj(t,n){if(t&1&&C(0),t&2){let e=S(2).$implicit;K(" ",e("further-steps-step42")," ")}}function qj(t,n){if(t&1&&(y(0,"li"),H(1,Wj,2,1,"ng-container")(2,Gj,1,1),_()),t&2){let e=S(2);m(),U(e.useSimmental||e.useBrahman?1:2)}}function Yj(t,n){if(t&1&&(Xt(0),C(1),Jt()),t&2){let e=S(2).$implicit;m(),fe(e("further-steps-step43_simmental_brahman"))}}function Zj(t,n){if(t&1&&C(0),t&2){let e=S(2).$implicit;K(" ",e("further-steps-step43")," ")}}function Kj(t,n){if(t&1&&(y(0,"li"),H(1,Yj,2,1,"ng-container")(2,Zj,1,1),_()),t&2){let e=S(2);m(),U(e.useSimmental||e.useBrahman?1:2)}}function Qj(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-simmental2")," ")}}function Xj(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-simmental3")," ")}}function Jj(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-brahman")," ")}}function eV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step5")," ")}}function tV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step63")," ")}}function nV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step64")," ")}}function iV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step7")," ")}}function rV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step8")," ")}}function oV(t,n){if(t&1&&(y(0,"li"),C(1),y(2,"ul",24)(3,"li"),C(4),_(),y(5,"li"),C(6),_(),y(7,"li"),C(8),_()()()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step9")," "),m(3),fe(e("further-steps-step91")),m(2),fe(e("further-steps-step92")),m(2),fe(e("further-steps-step93"))}}function sV(t,n){if(t&1&&(y(0,"li"),C(1),y(2,"ul",24)(3,"li"),C(4),_(),y(5,"li"),C(6),_(),y(7,"li"),C(8),_(),y(9,"li"),C(10),_()()()),t&2){let e=S().$implicit;m(),K(" ",e("further-steps-step10")," "),m(3),fe(e("further-steps-step101")),m(2),fe(e("further-steps-step102")),m(2),fe(e("further-steps-step103")),m(2),fe(e("further-steps-step104"))}}function aV(t,n){if(t&1&&(y(0,"li"),C(1),_()),t&2){let e=S(2).$implicit;m(),K(" ",e("further-steps-step11_3")," ")}}function lV(t,n){if(t&1&&(y(0,"li"),C(1),y(2,"ul",24)(3,"li"),C(4),_(),y(5,"li"),C(6),_(),H(7,aV,2,1,"li"),_()()),t&2){let e=S().$implicit,i=S();m(),K(" ",e("further-steps-step11")," "),m(3),fe(e("further-steps-step11_1")),m(2),fe(e("further-steps-step11_2")),m(),U(i.useSimmental?7:-1)}}function cV(t,n){if(t&1){let e=Vt();Xt(0),y(1,"div",2),ge(2,"app-page-header",3),y(3,"mat-sidenav-container",4)(4,"mat-sidenav",5,0)(6,"div",6)(7,"h2"),C(8),_(),ge(9,"mat-divider",7),y(10,"h3"),C(11),_(),y(12,"mat-form-field",8)(13,"mat-label"),C(14),_(),y(15,"mat-select",9),ce("selectionChange",function(r){He(e);let o=S();return Ue(o.onPlayerCountChange(r))}),Fi(16,Nj,4,3,"mat-option",10,kj),_()(),y(18,"h3"),C(19),_(),y(20,"div",11)(21,"mat-slide-toggle",12),Ca("ngModelChange",function(r){He(e);let o=S();return $d(o.useSimmental,r)||(o.useSimmental=r),Ue(r)}),ce("change",function(r){He(e);let o=S();return Ue(o.onVariantChange("useSimmental",r))}),C(22),_(),y(23,"mat-slide-toggle",13),Ca("ngModelChange",function(r){He(e);let o=S();return $d(o.useBrahman,r)||(o.useBrahman=r),Ue(r)}),ce("change",function(r){He(e);let o=S();return Ue(o.onVariantChange("useBrahman",r))}),C(24),_()(),y(25,"h3"),C(26),_(),y(27,"div",14)(28,"mat-slide-toggle",15),ce("change",function(r){He(e);let o=S();return Ue(o.onExpansionChange(r))}),C(29),_()()()(),y(30,"mat-sidenav-content")(31,"div",16)(32,"div",17)(33,"div",18)(34,"button",19),ce("click",function(){He(e);let r=S();return Ue(r.randomizeSetup())}),y(35,"span"),C(36),_()()(),y(37,"mat-grid-list",20),H(38,Fj,9,1,"mat-grid-tile"),H(39,Lj,9,1,"mat-grid-tile"),y(40,"mat-grid-tile")(41,"mat-grid-tile-header")(42,"h3")(43,"span"),C(44),_(),C(45,": "),_()(),y(46,"div",21),Fi(47,jj,3,2,"span",22,_a),_()()(),y(49,"mat-card")(50,"mat-card-header")(51,"h3")(52,"span"),C(53),_()()(),y(54,"mat-card-content")(55,"ol",23)(56,"li"),C(57),y(58,"ul",24)(59,"li"),C(60),_(),y(61,"li"),C(62),_()()(),y(63,"li"),C(64),y(65,"ul",24)(66,"li"),C(67),_(),y(68,"li"),C(69),_(),y(70,"li"),C(71),_(),y(72,"li"),C(73),_()()(),y(74,"li"),C(75),y(76,"ul",24)(77,"li"),C(78),_(),y(79,"li"),C(80),_(),y(81,"li"),C(82),_()()(),y(83,"li"),H(84,Vj,2,1,"ng-container"),H(85,Bj,2,1,"ng-container"),H(86,Hj,2,1,"ng-container"),y(87,"ul",24),H(88,$j,3,1,"li"),H(89,qj,3,1,"li"),H(90,Kj,3,1,"li"),H(91,Qj,2,1,"li"),H(92,Xj,2,1,"li"),H(93,Jj,2,1,"li"),_()(),H(94,eV,2,1,"li"),y(95,"li"),C(96),y(97,"ul",24)(98,"li"),C(99),_(),y(100,"li"),C(101),_(),H(102,tV,2,1,"li"),H(103,nV,2,1,"li"),_()(),H(104,iV,2,1,"li"),H(105,rV,2,1,"li"),H(106,oV,9,4,"li"),H(107,sV,11,5,"li"),H(108,lV,8,4,"li"),_()()()()()()(),ge(109,"app-page-footer"),_(),Jt()}if(t&2){let e=n.$implicit,i=en(5),r=S();m(),$("is-mobile",r.isXSmall),m(),de("sidebarHandle",i),m(),ii("padding-top",r.isXSmall?56:0,"px"),m(),de("mode",r.isXSmall?"over":"side")("fixedInViewport",r.isXSmall)("opened",r.isXSmall?"false":"opened"),m(4),K("",e("options-label"),":"),m(3),K("",e("player-count-label"),":"),m(3),fe(e("player-count-select-label")),m(),de("value",r.playerCount),m(),Pi(r.playerCountList),m(3),K("",e("variant-label"),":"),m(2),wa("ngModel",r.useSimmental),de("checked",r.useSimmental),m(),K(" ",e("variant-simmental")," "),m(),wa("ngModel",r.useBrahman),de("checked",r.useBrahman),m(),K(" ",e("variant-brahman")," "),m(2),K("",e("expansion-label"),":"),m(2),de("checked",r.useRailsToTheNorth),m(),K(" ",e("expansion-rails")," "),m(5),Ot(Nr(62,Rj,r.isXSmall)),m(2),fe(e("btn-setup-label")),m(),de("cols",r.isMax1280?1:2),m(),U(r.randomNeutralBuildings.length>0?38:-1),m(),U(r.randomStationMasters&&r.randomStationMasters.length>0?39:-1),m(5),fe(e("player-buildings-label")),m(3),Pi(r.randomPlayerBuildings),m(6),fe(e("further-setup-steps-label")),m(4),K(" ",e("further-steps-step1")," "),m(3),K(" ",e("further-steps-step1a")," "),m(2),K(" ",e("further-steps-step1b")," "),m(2),K(" ",e("further-steps-step2")," "),m(3),K(" ",e("further-steps-step21")," "),m(2),K(" ",e("further-steps-step22")," "),m(2),K(" ",e("further-steps-step23")," "),m(2),K(" ",e("further-steps-step24")," "),m(2),K(" ",e("further-steps-step3")," "),m(3),K(" ",e("further-steps-step31")," "),m(2),K(" ",e("further-steps-step32")," "),m(2),K(" ",e("further-steps-step33")," "),m(2),U(r.useSimmental&&!r.useBrahman?84:-1),m(),U(r.useBrahman&&!r.useSimmental?85:-1),m(),U(r.useBrahman||r.useSimmental?-1:86),m(2),U(r.playerCount===2?88:-1),m(),U(r.playerCount===3?89:-1),m(),U(r.playerCount===4?90:-1),m(),U(r.useSimmental?91:-1),m(),U(r.useSimmental?92:-1),m(),U(r.useBrahman?93:-1),m(),U(r.useRailsToTheNorth?-1:94),m(2),K(" ",e("further-steps-step6")," "),m(3),fe(e("further-steps-step61")),m(2),fe(e("further-steps-step62")),m(),U(r.playerCount>=3?102:-1),m(),U(r.playerCount>3?103:-1),m(),U(r.useRailsToTheNorth?104:-1),m(),U(r.useRailsToTheNorth?105:-1),m(),U(r.useRailsToTheNorth?106:-1),m(),U(r.useRailsToTheNorth?107:-1),m(),U(r.useRailsToTheNorth?108:-1)}}var qf=class t{randomNeutralBuildings;randomPlayerBuildings;randomStationMasters;playerCount;playerCountList;isXSmall;isMax1280;useSimmental;useBrahman;useRailsToTheNorth;dialog=d(xf);applicationConfigService=d(Ff);responsive=d(Gr);storage=d(sI);ngOnInit(){this.playerCount=2,this.playerCountList=[{label:"2",value:2},{label:"3",value:3},{label:"4",value:4}],this.useSimmental=!1,this.useRailsToTheNorth=!1,this.useBrahman=!1,this.responsive.observe(is.XSmall).subscribe(n=>{n.matches?this.isXSmall=!0:this.isXSmall=!1}),this.responsive.observe("(max-width: 1280px)").subscribe(n=>{n.matches?this.isMax1280=!0:this.isMax1280=!1}),this.storage.get("rar-playerCount").subscribe(n=>{n&&typeof n=="number"?this.emitPlayerCount(n):this.storage.set("rar-playerCount",2)}),this.storage.get("rar-useSimmental").subscribe(n=>{this.useSimmental!==void 0&&typeof n=="boolean"?this.applicationConfigService.useVariant.emit({name:"useSimmental",checked:n}):this.storage.set("rar-useSimmental",!1)}),this.storage.get("rar-useBrahman").subscribe(n=>{this.useSimmental!==void 0&&typeof n=="boolean"?this.applicationConfigService.useVariant.emit({name:"useBrahman",checked:n}):this.storage.set("rar-useBrahman",!1)}),this.storage.get("rar-useRailsToTheNorth").subscribe(n=>{n!==void 0&&typeof n=="boolean"?this.applicationConfigService.useRailsToTheNorth.emit(n):this.storage.set("rar-useRailsToTheNorth",!1)}),this.applicationConfigService.playerCount.subscribe(n=>{this.playerCount=n}),this.applicationConfigService.useVariant.subscribe(n=>{n.name==="useSimmental"?this.useSimmental=n.checked:n.name==="useBrahman"&&(this.useBrahman=n.checked)}),this.applicationConfigService.useRailsToTheNorth.subscribe(n=>{this.useRailsToTheNorth=n}),this.randomizeSetup()}openDialog(){return this.dialog.open(Lf,{})}emitPlayerCount(n){this.applicationConfigService.playerCount.emit(n)}onPlayerCountChange(n){this.storage.set("rar-playerCount",n.value),this.emitPlayerCount(n.value)}resetVariants(){this.openDialog().afterClosed().subscribe(()=>{this.storage.set("rar-useSimmental",!1).subscribe(()=>{this.useSimmental=!1}),this.applicationConfigService.useVariant.emit({name:"useSimmental",checked:!1}),this.storage.set("rar-useBrahman",!1).subscribe(()=>{this.useBrahman=!1}),this.applicationConfigService.useVariant.emit({name:"useBrahman",checked:!1})})}onVariantChange(n,e){this.useBrahman&&n==="useSimmental"&&e.checked||this.useSimmental&&n==="useBrahman"&&e.checked?this.resetVariants():(this.storage.set(`rar-${e.source.name}`,e.checked),this.applicationConfigService.useVariant.emit({name:n,checked:e.checked}))}onExpansionChange(n){this.storage.set("rar-useRailsToTheNorth",n.checked),this.applicationConfigService.useRailsToTheNorth.emit(n.checked)}randomizeSetup(){this.randomNeutralBuildings=this.applicationConfigService.getRandomNeutralBuildingOrder(),this.randomStationMasters=this.applicationConfigService.getRandomStationMasters(),this.randomPlayerBuildings=this.applicationConfigService.getRandomPlayerBuildings()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=M({type:t,selectors:[["app-home"]],decls:1,vars:0,consts:[["sidenav",""],[4,"transloco"],[1,"home-component","flex","flex-col"],[3,"sidebarHandle"],[1,"sidenav-container","flex-1"],["fixedTopGap","56",1,"sidenav",3,"mode","fixedInViewport","opened"],[1,"sidenav__inner","p-4"],[1,"divider","mb-4"],["appearance","fill"],[3,"selectionChange","value"],[3,"value"],[1,"options-list","space-y-2","mb-4"],["color","primary","name","useSimmental",1,"options-list__option",3,"ngModelChange","change","ngModel","checked"],["color","primary","name","useBrahman",1,"options-list__option",3,"ngModelChange","change","ngModel","checked"],[1,"options-list","space-y-2"],["color","primary","name","useRailsToTheNorth",1,"options-list__option",3,"change","checked"],[1,"sidenav-content","flex","flex-col","min-h-full"],[1,"flex-1","px-2","xSmall:px-10","py-5"],[1,"mb-4"],["mat-flat-button","","color","primary",3,"click"],["rowHeight","180px","gutterSize","5px",3,"cols"],[1,"flex","flex-wrap"],[1,"px-2","text-2xl","xSmall:text-xl","flex-1"],[1,"pl-4","list-decimal"],[1,"list-disc","pl-8","text-gray-400"],[1,"flex"],[1,"px-2","text-2xl","xSmall:text-xl"],["alt","Station Master",1,"px-1","xSmall:px-2","md:px-4",3,"src"],[1,"whitespace-nowrap"]],template:function(e,i){e&1&&ht(0,cV,110,64,"ng-container",1)},dependencies:[jn,lx,tx,Zv,Qr,ds,fx,cx,dx,ux,px,hx,wf,bf,Tl,Fx,Ox,sy,Rx,kx,eI,Jx,Cs,nI,yy,tI,Mf,rI,_y,cn,ef,Wf,Gf],styles:[`.is-mobile[_ngcontent-%COMP%]   .sidenav-container[_ngcontent-%COMP%]{flex-shrink:0;flex-grow:1;flex-basis:auto}.divider[_ngcontent-%COMP%]{margin-bottom:16px!important}.options-list[_ngcontent-%COMP%]{display:flex;flex-direction:column}
`]})};var yI=[{path:"home",component:qf},{path:"**",redirectTo:"home",pathMatch:"full"}];var _I={providers:[sv(yI),kg(Ng()),tf({config:{availableLangs:["de","en","pl"],defaultLang:"en",fallbackLang:"en",missingHandler:{useFallbackTranslation:!0},reRenderOnLangChange:!0,prodMode:!xa()},loader:vs}),Fc(xD.register("ngsw-worker.js",{enabled:!xa(),registrationStrategy:"registerWhenStable:30000"}))]};Eg(nf,_I).catch(t=>console.error(t));
