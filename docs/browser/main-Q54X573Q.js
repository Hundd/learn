var lx=Object.defineProperty,dx=Object.defineProperties;var ux=Object.getOwnPropertyDescriptors;var rc=Object.getOwnPropertySymbols;var iy=Object.prototype.hasOwnProperty,oy=Object.prototype.propertyIsEnumerable;var ry=(t,n,e)=>n in t?lx(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,b=(t,n)=>{for(var e in n||={})iy.call(n,e)&&ry(t,e,n[e]);if(rc)for(var e of rc(n))oy.call(n,e)&&ry(t,e,n[e]);return t},W=(t,n)=>dx(t,ux(n));var Ju=(t,n)=>{var e={};for(var r in t)iy.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(t!=null&&rc)for(var r of rc(t))n.indexOf(r)<0&&oy.call(t,r)&&(e[r]=t[r]);return e};var pe=(t,n,e)=>new Promise((r,i)=>{var o=c=>{try{a(e.next(c))}catch(l){i(l)}},s=c=>{try{a(e.throw(c))}catch(l){i(l)}},a=c=>c.done?r(c.value):Promise.resolve(c.value).then(o,s);a((e=e.apply(t,n)).next())});var et=null,ic=!1,ef=1,fx=null,tt=Symbol("SIGNAL");function U(t){let n=et;return et=t,n}function cc(){return et}var zr={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Bi(t){if(ic)throw new Error("");if(et===null)return;et.consumerOnSignalRead(t);let n=et.producersTail;if(n!==void 0&&n.producer===t)return;let e,r=et.recomputing;if(r&&(e=n!==void 0?n.nextProducer:et.producers,e!==void 0&&e.producer===t)){et.producersTail=e,e.lastReadVersion=t.version;return}let i=t.consumersTail;if(i!==void 0&&i.consumer===et&&(!r||mx(i,et)))return;let o=Hi(et),s={producer:t,consumer:et,nextProducer:e,prevConsumer:i,lastReadVersion:t.version,nextConsumer:void 0};et.producersTail=s,n!==void 0?n.nextProducer=s:et.producers=s,o&&ly(t,s)}function sy(){ef++}function lc(t){if(!(Hi(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===ef)){if(!t.producerMustRecompute(t)&&!ds(t)){ac(t);return}t.producerRecomputeValue(t),ac(t)}}function tf(t){if(t.consumers===void 0)return;let n=ic;ic=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let r=e.consumer;r.dirty||hx(r)}}finally{ic=n}}function nf(){return et?.consumerAllowSignalWrites!==!1}function hx(t){t.dirty=!0,tf(t),t.consumerMarkedDirty?.(t)}function ac(t){t.dirty=!1,t.lastCleanEpoch=ef}function Gr(t){return t&&ay(t),U(t)}function ay(t){t.producersTail=void 0,t.recomputing=!0}function Ui(t,n){U(n),t&&cy(t)}function cy(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(Hi(t))do e=rf(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function ds(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,r=n.lastReadVersion;if(r!==e.version||(lc(e),r!==e.version))return!0}return!1}function Wr(t){if(Hi(t)){let n=t.producers;for(;n!==void 0;)n=rf(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function ly(t,n){let e=t.consumersTail,r=Hi(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!r)for(let i=t.producers;i!==void 0;i=i.nextProducer)ly(i.producer,i)}function rf(t){let n=t.producer,e=t.nextProducer,r=t.nextConsumer,i=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:n.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(n.consumers=r,!Hi(n)){let o=n.producers;for(;o!==void 0;)o=rf(o)}return e}function Hi(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function dc(t){fx?.(t)}function mx(t,n){let e=n.producersTail;if(e!==void 0){let r=n.producers;do{if(r===t)return!0;if(r===e)break;r=r.nextProducer}while(r!==void 0)}return!1}function uc(t,n){return Object.is(t,n)}function fc(t,n){let e=Object.create(px);e.computation=t,n!==void 0&&(e.equal=n);let r=()=>{if(lc(e),Bi(e),e.value===ls)throw e.error;return e.value};return r[tt]=e,dc(e),r}var oc=Symbol("UNSET"),sc=Symbol("COMPUTING"),ls=Symbol("ERRORED"),px=W(b({},zr),{value:oc,dirty:!0,error:null,equal:uc,kind:"computed",producerMustRecompute(t){return t.value===oc||t.value===sc},producerRecomputeValue(t){if(t.value===sc)throw new Error("");let n=t.value;t.value=sc;let e=Gr(t),r,i=!1;try{r=t.computation(),U(null),i=n!==oc&&n!==ls&&r!==ls&&t.equal(n,r)}catch(o){r=ls,t.error=o}finally{Ui(t,e)}if(i){t.value=n;return}t.value=r,t.version++}});function gx(){throw new Error}var dy=gx;function uy(t){dy(t)}function of(t){dy=t}var vx=null;function sf(t,n){let e=Object.create(hc);e.value=t,n!==void 0&&(e.equal=n);let r=()=>fy(e);return r[tt]=e,dc(e),[r,s=>$i(e,s),s=>af(e,s)]}function fy(t){return Bi(t),t.value}function $i(t,n){nf()||uy(t),t.equal(t.value,n)||(t.value=n,yx(t))}function af(t,n){nf()||uy(t),$i(t,n(t.value))}var hc=W(b({},zr),{equal:uc,value:void 0,kind:"signal"});function yx(t){t.version++,sy(),tf(t),vx?.(t)}var cf=W(b({},zr),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function lf(t){if(t.dirty=!1,t.version>0&&!ds(t))return;t.version++;let n=Gr(t);try{t.cleanup(),t.fn()}finally{Ui(t,n)}}function q(t){return typeof t=="function"}function pr(t){let e=t(r=>{Error.call(r),r.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var mc=pr(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function qr(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var we=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:r}=this;if(q(r))try{r()}catch(o){n=o instanceof mc?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{hy(o)}catch(s){n=n??[],s instanceof mc?n=[...n,...s.errors]:n.push(s)}}if(n)throw new mc(n)}}add(n){var e;if(n&&n!==this)if(this.closed)hy(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&qr(e,n)}remove(n){let{_finalizers:e}=this;e&&qr(e,n),n instanceof t&&n._removeParent(this)}};we.EMPTY=(()=>{let t=new we;return t.closed=!0,t})();var df=we.EMPTY;function pc(t){return t instanceof we||t&&"closed"in t&&q(t.remove)&&q(t.add)&&q(t.unsubscribe)}function hy(t){q(t)?t():t.unsubscribe()}var Wt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var zi={setTimeout(t,n,...e){let{delegate:r}=zi;return r?.setTimeout?r.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=zi;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function gc(t){zi.setTimeout(()=>{let{onUnhandledError:n}=Wt;if(n)n(t);else throw t})}function Kr(){}var my=uf("C",void 0,void 0);function py(t){return uf("E",void 0,t)}function gy(t){return uf("N",t,void 0)}function uf(t,n,e){return{kind:t,value:n,error:e}}var Qr=null;function Gi(t){if(Wt.useDeprecatedSynchronousErrorHandling){let n=!Qr;if(n&&(Qr={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:r}=Qr;if(Qr=null,e)throw r}}else t()}function vy(t){Wt.useDeprecatedSynchronousErrorHandling&&Qr&&(Qr.errorThrown=!0,Qr.error=t)}var Zr=class extends we{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,pc(n)&&n.add(this)):this.destination=wx}static create(n,e,r){return new Un(n,e,r)}next(n){this.isStopped?hf(gy(n),this):this._next(n)}error(n){this.isStopped?hf(py(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?hf(my,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},bx=Function.prototype.bind;function ff(t,n){return bx.call(t,n)}var mf=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(r){vc(r)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(r){vc(r)}else vc(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){vc(e)}}},Un=class extends Zr{constructor(n,e,r){super();let i;if(q(n)||!n)i={next:n??void 0,error:e??void 0,complete:r??void 0};else{let o;this&&Wt.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),i={next:n.next&&ff(n.next,o),error:n.error&&ff(n.error,o),complete:n.complete&&ff(n.complete,o)}):i=n}this.destination=new mf(i)}};function vc(t){Wt.useDeprecatedSynchronousErrorHandling?vy(t):gc(t)}function _x(t){throw t}function hf(t,n){let{onStoppedNotification:e}=Wt;e&&zi.setTimeout(()=>e(t,n))}var wx={closed:!0,next:Kr,error:_x,complete:Kr};var Wi=typeof Symbol=="function"&&Symbol.observable||"@@observable";function ut(t){return t}function pf(...t){return gf(t)}function gf(t){return t.length===0?ut:t.length===1?t[0]:function(e){return t.reduce((r,i)=>i(r),e)}}var V=(()=>{class t{constructor(e){e&&(this._subscribe=e)}lift(e){let r=new t;return r.source=this,r.operator=e,r}subscribe(e,r,i){let o=Dx(e)?e:new Un(e,r,i);return Gi(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(r){e.error(r)}}forEach(e,r){return r=yy(r),new r((i,o)=>{let s=new Un({next:a=>{try{e(a)}catch(c){o(c),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(e){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(e)}[Wi](){return this}pipe(...e){return gf(e)(this)}toPromise(e){return e=yy(e),new e((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return t.create=n=>new t(n),t})();function yy(t){var n;return(n=t??Wt.Promise)!==null&&n!==void 0?n:Promise}function Ex(t){return t&&q(t.next)&&q(t.error)&&q(t.complete)}function Dx(t){return t&&t instanceof Zr||Ex(t)&&pc(t)}function Cx(t){return q(t?.lift)}function B(t){return n=>{if(Cx(n))return n.lift(function(e){try{return t(e,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function z(t,n,e,r,i){return new vf(t,n,e,r,i)}var vf=class extends Zr{constructor(n,e,r,i,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a)}catch(c){n.error(c)}}:super._next,this._error=i?function(a){try{i(a)}catch(c){n.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var by=pr(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var F=(()=>{class t extends V{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(e){let r=new yc(this,this);return r.operator=e,r}_throwIfClosed(){if(this.closed)throw new by}next(e){Gi(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(e)}})}error(e){Gi(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=e;let{observers:r}=this;for(;r.length;)r.shift().error(e)}})}complete(){Gi(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:e}=this;for(;e.length;)e.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var e;return((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:r,isStopped:i,observers:o}=this;return r||i?df:(this.currentObservers=null,o.push(e),new we(()=>{this.currentObservers=null,qr(o,e)}))}_checkFinalizedStatuses(e){let{hasError:r,thrownError:i,isStopped:o}=this;r?e.error(i):o&&e.complete()}asObservable(){let e=new V;return e.source=this,e}}return t.create=(n,e)=>new yc(n,e),t})(),yc=class extends F{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.next)===null||r===void 0||r.call(e,n)}error(n){var e,r;(r=(e=this.destination)===null||e===void 0?void 0:e.error)===null||r===void 0||r.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,r;return(r=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&r!==void 0?r:df}};var De=class extends F{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:r}=this;if(n)throw e;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}};var us={now(){return(us.delegate||Date).now()},delegate:void 0};var fs=class extends F{constructor(n=1/0,e=1/0,r=us){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;e||(r.push(n),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!n.closed;s+=r?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*n;if(n<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=e.now(),a=0;for(let c=1;c<r.length&&r[c]<=s;c+=2)a=c;a&&r.splice(0,a+1)}}};var bc=class extends we{constructor(n,e){super()}schedule(n,e=0){return this}};var hs={setInterval(t,n,...e){let{delegate:r}=hs;return r?.setInterval?r.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=hs;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var qi=class extends bc{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var r;if(this.closed)return this;this.state=n;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,e)),this.pending=!0,this.delay=e,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,r=0){return hs.setInterval(n.flush.bind(n,this),r)}recycleAsyncId(n,e,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return e;e!=null&&hs.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(n,e);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let r=!1,i;try{this.work(n)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:r}=e;this.work=this.state=this.scheduler=null,this.pending=!1,qr(r,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var Ki=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,r){return new this.schedulerActionCtor(this,n).schedule(r,e)}};Ki.now=us.now;var Qi=class extends Ki{constructor(n,e=Ki.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let r;this._active=!0;do if(r=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,r){for(;n=e.shift();)n.unsubscribe();throw r}}};var Yr=new Qi(qi),_y=Yr;var _c=class extends qi{constructor(n,e){super(n,e),this.scheduler=n,this.work=e}schedule(n,e=0){return e>0?super.schedule(n,e):(this.delay=e,this.state=n,this.scheduler.flush(this),this)}execute(n,e){return e>0||this.closed?super.execute(n,e):this._execute(n,e)}requestAsyncId(n,e,r=0){return r!=null&&r>0||r==null&&this.delay>0?super.requestAsyncId(n,e,r):(n.flush(this),0)}};var wc=class extends Qi{};var ms=new wc(_c);var Ne=new V(t=>t.complete());function Ec(t){return t&&q(t.schedule)}function yf(t){return t[t.length-1]}function Zi(t){return q(yf(t))?t.pop():void 0}function yn(t){return Ec(yf(t))?t.pop():void 0}function wy(t,n){return typeof yf(t)=="number"?t.pop():n}function Dy(t,n,e,r){function i(o){return o instanceof e?o:new e(function(s){s(o)})}return new(e||(e=Promise))(function(o,s){function a(d){try{l(r.next(d))}catch(u){s(u)}}function c(d){try{l(r.throw(d))}catch(u){s(u)}}function l(d){d.done?o(d.value):i(d.value).then(a,c)}l((r=r.apply(t,n||[])).next())})}function Ey(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Xr(t){return this instanceof Xr?(this.v=t,this):new Xr(t)}function Cy(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=e.apply(t,n||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(m){return function(p){return Promise.resolve(p).then(m,u)}}function a(m,p){r[m]&&(i[m]=function(v){return new Promise(function(E,D){o.push([m,v,E,D])>1||c(m,v)})},p&&(i[m]=p(i[m])))}function c(m,p){try{l(r[m](p))}catch(v){h(o[0][3],v)}}function l(m){m.value instanceof Xr?Promise.resolve(m.value.v).then(d,u):h(o[0][2],m)}function d(m){c("next",m)}function u(m){c("throw",m)}function h(m,p){m(p),o.shift(),o.length&&c(o[0][0],o[0][1])}}function Iy(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof Ey=="function"?Ey(t):t[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(o){e[o]=t[o]&&function(s){return new Promise(function(a,c){s=t[o](s),i(a,c,s.done,s.value)})}}function i(o,s,a,c){Promise.resolve(c).then(function(l){o({value:l,done:a})},s)}}var Dc=t=>t&&typeof t.length=="number"&&typeof t!="function";function Cc(t){return q(t?.then)}function Ic(t){return q(t[Wi])}function xc(t){return Symbol.asyncIterator&&q(t?.[Symbol.asyncIterator])}function Sc(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Ix(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Tc=Ix();function Mc(t){return q(t?.[Tc])}function kc(t){return Cy(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:r,done:i}=yield Xr(e.read());if(i)return yield Xr(void 0);yield yield Xr(r)}}finally{e.releaseLock()}})}function Ac(t){return q(t?.getReader)}function le(t){if(t instanceof V)return t;if(t!=null){if(Ic(t))return xx(t);if(Dc(t))return Sx(t);if(Cc(t))return Tx(t);if(xc(t))return xy(t);if(Mc(t))return Mx(t);if(Ac(t))return kx(t)}throw Sc(t)}function xx(t){return new V(n=>{let e=t[Wi]();if(q(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Sx(t){return new V(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function Tx(t){return new V(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,gc)})}function Mx(t){return new V(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function xy(t){return new V(n=>{Ax(t,n).catch(e=>n.error(e))})}function kx(t){return xy(kc(t))}function Ax(t,n){var e,r,i,o;return Dy(this,void 0,void 0,function*(){try{for(e=Iy(t);r=yield e.next(),!r.done;){let s=r.value;if(n.next(s),n.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=e.return)&&(yield o.call(e))}finally{if(i)throw i.error}}n.complete()})}function nt(t,n,e,r=0,i=!1){let o=n.schedule(function(){e(),i?t.add(this.schedule(null,r)):this.unsubscribe()},r);if(t.add(o),!i)return o}function Hn(t,n=0){return B((e,r)=>{e.subscribe(z(r,i=>nt(r,t,()=>r.next(i),n),()=>nt(r,t,()=>r.complete(),n),i=>nt(r,t,()=>r.error(i),n)))})}function Rc(t,n=0){return B((e,r)=>{r.add(t.schedule(()=>e.subscribe(r),n))})}function Sy(t,n){return le(t).pipe(Rc(n),Hn(n))}function Ty(t,n){return le(t).pipe(Rc(n),Hn(n))}function My(t,n){return new V(e=>{let r=0;return n.schedule(function(){r===t.length?e.complete():(e.next(t[r++]),e.closed||this.schedule())})})}function ky(t,n){return new V(e=>{let r;return nt(e,n,()=>{r=t[Tc](),nt(e,n,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){e.error(s);return}o?e.complete():e.next(i)},0,!0)}),()=>q(r?.return)&&r.return()})}function Nc(t,n){if(!t)throw new Error("Iterable cannot be null");return new V(e=>{nt(e,n,()=>{let r=t[Symbol.asyncIterator]();nt(e,n,()=>{r.next().then(i=>{i.done?e.complete():e.next(i.value)})},0,!0)})})}function Ay(t,n){return Nc(kc(t),n)}function Ry(t,n){if(t!=null){if(Ic(t))return Sy(t,n);if(Dc(t))return My(t,n);if(Cc(t))return Ty(t,n);if(xc(t))return Nc(t,n);if(Mc(t))return ky(t,n);if(Ac(t))return Ay(t,n)}throw Sc(t)}function be(t,n){return n?Ry(t,n):le(t)}function M(...t){let n=yn(t);return be(t,n)}function ps(t,n){let e=q(t)?t:()=>t,r=i=>i.error(e());return new V(n?i=>n.schedule(r,0,i):r)}function gs(t){return!!t&&(t instanceof V||q(t.lift)&&q(t.subscribe))}var Jr=pr(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"});function Oc(t){return t instanceof Date&&!isNaN(t)}var Rx=pr(t=>function(e=null){t(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=e});function bf(t,n){let{first:e,each:r,with:i=Nx,scheduler:o=n??Yr,meta:s=null}=Oc(t)?{first:t}:typeof t=="number"?{each:t}:t;if(e==null&&r==null)throw new TypeError("No timeout provided.");return B((a,c)=>{let l,d,u=null,h=0,m=p=>{d=nt(c,o,()=>{try{l.unsubscribe(),le(i({meta:s,lastValue:u,seen:h})).subscribe(c)}catch(v){c.error(v)}},p)};l=a.subscribe(z(c,p=>{d?.unsubscribe(),h++,c.next(u=p),r>0&&m(r)},void 0,void 0,()=>{d?.closed||d?.unsubscribe(),u=null})),!h&&m(e!=null?typeof e=="number"?e:+e-o.now():r)})}function Nx(t){throw new Rx(t)}function A(t,n){return B((e,r)=>{let i=0;e.subscribe(z(r,o=>{r.next(t.call(n,o,i++))}))})}var{isArray:Ox}=Array;function Fx(t,n){return Ox(n)?t(...n):t(n)}function Fc(t){return A(n=>Fx(t,n))}var{isArray:Px}=Array,{getPrototypeOf:Lx,prototype:jx,keys:Vx}=Object;function Pc(t){if(t.length===1){let n=t[0];if(Px(n))return{args:n,keys:null};if(Bx(n)){let e=Vx(n);return{args:e.map(r=>n[r]),keys:e}}}return{args:t,keys:null}}function Bx(t){return t&&typeof t=="object"&&Lx(t)===jx}function Lc(t,n){return t.reduce((e,r,i)=>(e[r]=n[i],e),{})}function jc(...t){let n=yn(t),e=Zi(t),{args:r,keys:i}=Pc(t);if(r.length===0)return be([],n);let o=new V(Ux(r,n,i?s=>Lc(i,s):ut));return e?o.pipe(Fc(e)):o}function Ux(t,n,e=ut){return r=>{Ny(n,()=>{let{length:i}=t,o=new Array(i),s=i,a=i;for(let c=0;c<i;c++)Ny(n,()=>{let l=be(t[c],n),d=!1;l.subscribe(z(r,u=>{o[c]=u,d||(d=!0,a--),a||r.next(e(o.slice()))},()=>{--s||r.complete()}))},r)},r)}}function Ny(t,n,e){t?nt(e,t,n):n()}function Oy(t,n,e,r,i,o,s,a){let c=[],l=0,d=0,u=!1,h=()=>{u&&!c.length&&!l&&n.complete()},m=v=>l<r?p(v):c.push(v),p=v=>{o&&n.next(v),l++;let E=!1;le(e(v,d++)).subscribe(z(n,D=>{i?.(D),o?m(D):n.next(D)},()=>{E=!0},void 0,()=>{if(E)try{for(l--;c.length&&l<r;){let D=c.shift();s?nt(n,s,()=>p(D)):p(D)}h()}catch(D){n.error(D)}}))};return t.subscribe(z(n,m,()=>{u=!0,h()})),()=>{a?.()}}function Ue(t,n,e=1/0){return q(n)?Ue((r,i)=>A((o,s)=>n(r,o,i,s))(le(t(r,i))),e):(typeof n=="number"&&(e=n),B((r,i)=>Oy(r,i,t,e)))}function gr(t=1/0){return Ue(ut,t)}function Fy(){return gr(1)}function Yi(...t){return Fy()(be(t,yn(t)))}function vs(t){return new V(n=>{le(t()).subscribe(n)})}function ys(...t){let n=Zi(t),{args:e,keys:r}=Pc(t),i=new V(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),c=s,l=s;for(let d=0;d<s;d++){let u=!1;le(e[d]).subscribe(z(o,h=>{u||(u=!0,l--),a[d]=h},()=>c--,void 0,()=>{(!c||!u)&&(l||o.next(r?Lc(r,a):a),o.complete())}))}});return n?i.pipe(Fc(n)):i}function Py(t=0,n,e=_y){let r=-1;return n!=null&&(Ec(n)?e=n:r=n),new V(i=>{let o=Oc(t)?+t-e.now():t;o<0&&(o=0);let s=0;return e.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function vr(...t){let n=yn(t),e=wy(t,1/0),r=t;return r.length?r.length===1?le(r[0]):gr(e)(be(r,n)):Ne}function ae(t,n){return B((e,r)=>{let i=0;e.subscribe(z(r,o=>t.call(n,o,i++)&&r.next(o)))})}function Ly(t){return B((n,e)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let l=i;i=null,e.next(l)}s&&e.complete()},c=()=>{o=null,s&&e.complete()};n.subscribe(z(e,l=>{r=!0,i=l,o||le(t(l)).subscribe(o=z(e,a,c))},()=>{s=!0,(!r||!o||o.closed)&&e.complete()}))})}function Vc(t,n=Yr){return Ly(()=>Py(t,n))}function bn(t){return B((n,e)=>{let r=null,i=!1,o;r=n.subscribe(z(e,void 0,void 0,s=>{o=le(t(s,bn(t)(n))),r?(r.unsubscribe(),r=null,o.subscribe(e)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(e))})}function Bc(t,n,e,r,i){return(o,s)=>{let a=e,c=n,l=0;o.subscribe(z(s,d=>{let u=l++;c=a?t(c,d,u):(a=!0,d),r&&s.next(c)},i&&(()=>{a&&s.next(c),s.complete()})))}}function jy(t,n){return B(Bc(t,n,arguments.length>=2,!1,!0))}var Hx=(t,n)=>(t.push(n),t);function _f(){return B((t,n)=>{jy(Hx,[])(t).subscribe(n)})}function _n(t,n){return q(n)?Ue(t,n,1):Ue(t,1)}function $n(t,n=Yr){return B((e,r)=>{let i=null,o=null,s=null,a=()=>{if(i){i.unsubscribe(),i=null;let l=o;o=null,r.next(l)}};function c(){let l=s+t,d=n.now();if(d<l){i=this.schedule(void 0,l-d),r.add(i);return}a()}e.subscribe(z(r,l=>{o=l,s=n.now(),i||(i=n.schedule(c,t),r.add(i))},()=>{a(),r.complete()},void 0,()=>{o=i=null}))})}function Vy(t){return B((n,e)=>{let r=!1;n.subscribe(z(e,i=>{r=!0,e.next(i)},()=>{r||e.next(t),e.complete()}))})}function ft(t){return t<=0?()=>Ne:B((n,e)=>{let r=0;n.subscribe(z(e,i=>{++r<=t&&(e.next(i),t<=r&&e.complete())}))})}function Uc(t){return A(()=>t)}function Xi(t,n=ut){return t=t??$x,B((e,r)=>{let i,o=!0;e.subscribe(z(r,s=>{let a=n(s);(o||!t(i,a))&&(o=!1,i=a,r.next(s))}))})}function $x(t,n){return t===n}function By(t=zx){return B((n,e)=>{let r=!1;n.subscribe(z(e,i=>{r=!0,e.next(i)},()=>r?e.complete():e.error(t())))})}function zx(){return new Jr}function yr(t){return B((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function zn(t,n){let e=arguments.length>=2;return r=>r.pipe(t?ae((i,o)=>t(i,o,r)):ut,ft(1),e?Vy(n):By(()=>new Jr))}function Hc(t){return t<=0?()=>Ne:B((n,e)=>{let r=[];n.subscribe(z(e,i=>{r.push(i),t<r.length&&r.shift()},()=>{for(let i of r)e.next(i);e.complete()},void 0,()=>{r=null}))})}function wf(...t){let n=t.length;if(n===0)throw new Error("list of properties cannot be empty.");return A(e=>{let r=e;for(let i=0;i<n;i++){let o=r?.[t[i]];if(typeof o<"u")r=o;else return}return r})}function bs(t,n){return B(Bc(t,n,arguments.length>=2,!0))}function _s(t={}){let{connector:n=()=>new F,resetOnError:e=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=t;return o=>{let s,a,c,l=0,d=!1,u=!1,h=()=>{a?.unsubscribe(),a=void 0},m=()=>{h(),s=c=void 0,d=u=!1},p=()=>{let v=s;m(),v?.unsubscribe()};return B((v,E)=>{l++,!u&&!d&&h();let D=c=c??n();E.add(()=>{l--,l===0&&!u&&!d&&(a=Ef(p,i))}),D.subscribe(E),!s&&l>0&&(s=new Un({next:k=>D.next(k),error:k=>{u=!0,h(),a=Ef(m,e,k),D.error(k)},complete:()=>{d=!0,h(),a=Ef(m,r),D.complete()}}),le(v).subscribe(s))})(o)}}function Ef(t,n,...e){if(n===!0){t();return}if(n===!1)return;let r=new Un({next:()=>{r.unsubscribe(),t()}});return le(n(...e)).subscribe(r)}function ws(t){return ae((n,e)=>t<=e)}function ei(...t){let n=yn(t);return B((e,r)=>{(n?Yi(t,e,n):Yi(t,e)).subscribe(r)})}function We(t,n){return B((e,r)=>{let i=null,o=0,s=!1,a=()=>s&&!i&&r.complete();e.subscribe(z(r,c=>{i?.unsubscribe();let l=0,d=o++;le(t(c,d)).subscribe(i=z(r,u=>r.next(n?n(c,u,d,l++):u),()=>{i=null,a()}))},()=>{s=!0,a()}))})}function Ce(t){return B((n,e)=>{le(t).subscribe(z(e,()=>e.complete(),Kr)),!e.closed&&n.subscribe(e)})}function Fe(t,n,e){let r=q(t)||n||e?{next:t,error:n,complete:e}:t;return r?B((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(z(o,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),o.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),o.complete()},c=>{var l;a=!1,(l=r.error)===null||l===void 0||l.call(r,c),o.error(c)},()=>{var c,l;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r)}))}):ut}function Es(...t){let n=Zi(t);return B((e,r)=>{let i=t.length,o=new Array(i),s=t.map(()=>!1),a=!1;for(let c=0;c<i;c++)le(t[c]).subscribe(z(r,l=>{o[c]=l,!a&&!s[c]&&(s[c]=!0,(a=s.every(ut))&&(s=null))},Kr));e.subscribe(z(r,c=>{if(a){let l=[c,...o];r.next(n?n(...l):l)}}))})}var Df;function $c(){return Df}function wn(t){let n=Df;return Df=t,n}var Uy=Symbol("NotFound");function Ji(t){return t===Uy||t?.name==="\u0275NotFound"}function Hy(t){let n=U(null);try{return t()}finally{U(n)}}var Zc="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",_=class extends Error{code;constructor(n,e){super(En(n,e)),this.code=n}};function Gx(t){return`NG0${Math.abs(t)}`}function En(t,n){return`${Gx(t)}${n?": "+n:""}`}var wt=globalThis;function me(t){for(let n in t)if(t[n]===me)return n;throw Error("")}function qy(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e])}function Ms(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(Ms).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let r=e.indexOf(`
`);return r>=0?e.slice(0,r):e}function Yc(t,n){return t?n?`${t} ${n}`:t:n||""}var Wx=me({__forward_ref__:me});function Dn(t){return t.__forward_ref__=Dn,t}function Ke(t){return Lf(t)?t():t}function Lf(t){return typeof t=="function"&&t.hasOwnProperty(Wx)&&t.__forward_ref__===Dn}function y(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function I(t){return{providers:t.providers||[],imports:t.imports||[]}}function ks(t){return qx(t,Xc)}function jf(t){return ks(t)!==null}function qx(t,n){return t.hasOwnProperty(n)&&t[n]||null}function Kx(t){let n=t?.[Xc]??null;return n||null}function If(t){return t&&t.hasOwnProperty(Gc)?t[Gc]:null}var Xc=me({\u0275prov:me}),Gc=me({\u0275inj:me}),g=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=y({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Vf(t){return t&&!!t.\u0275providers}var As=me({\u0275cmp:me}),Rs=me({\u0275dir:me}),Bf=me({\u0275pipe:me}),Uf=me({\u0275mod:me}),Cs=me({\u0275fac:me}),oi=me({__NG_ELEMENT_ID__:me}),$y=me({__NG_ENV_ID__:me});function Hf(t){return Jc(t,"@NgModule"),t[Uf]||null}function Cn(t){return Jc(t,"@Component"),t[As]||null}function $f(t){return Jc(t,"@Directive"),t[Rs]||null}function Ky(t){return Jc(t,"@Pipe"),t[Bf]||null}function Jc(t,n){if(t==null)throw new _(-919,!1)}function Ns(t){return typeof t=="string"?t:t==null?"":String(t)}var Qy=me({ngErrorCode:me}),Qx=me({ngErrorMessage:me}),Zx=me({ngTokenPath:me});function zf(t,n){return Zy("",-200,n)}function el(t,n){throw new _(-201,!1)}function Zy(t,n,e){let r=new _(n,t);return r[Qy]=n,r[Qx]=t,e&&(r[Zx]=e),r}function Yx(t){return t[Qy]}var xf;function Yy(){return xf}function ht(t){let n=xf;return xf=t,n}function Gf(t,n,e){let r=ks(t);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(e&8)return null;if(n!==void 0)return n;el(t,"")}var Xx={},ti=Xx,Sf="__NG_DI_FLAG__",Tf=class{injector;constructor(n){this.injector=n}retrieve(n,e){let r=ni(e)||0;try{return this.injector.get(n,r&8?null:ti,r)}catch(i){if(Ji(i))return i;throw i}}};function Jx(t,n=0){let e=$c();if(e===void 0)throw new _(-203,!1);if(e===null)return Gf(t,void 0,n);{let r=eS(n),i=e.retrieve(t,r);if(Ji(i)){if(r.optional)return null;throw i}return i}}function w(t,n=0){return(Yy()||Jx)(Ke(t),n)}function f(t,n){return w(t,ni(n))}function ni(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function eS(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function Mf(t){let n=[];for(let e=0;e<t.length;e++){let r=Ke(t[e]);if(Array.isArray(r)){if(r.length===0)throw new _(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],c=tS(a);typeof c=="number"?c===-1?i=a.token:o|=c:i=a}n.push(w(i,o))}else n.push(w(r))}return n}function Xy(t,n){return t[Sf]=n,t.prototype[Sf]=n,t}function tS(t){return t[Sf]}function br(t,n){let e=t.hasOwnProperty(Cs);return e?t[Cs]:null}function Jy(t,n,e){if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++){let i=t[r],o=n[r];if(e&&(i=e(i),o=e(o)),o!==i)return!1}return!0}function eb(t){return t.flat(Number.POSITIVE_INFINITY)}function tl(t,n){t.forEach(e=>Array.isArray(e)?tl(e,n):n(e))}function Wf(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function Os(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function tb(t,n){let e=[];for(let r=0;r<t;r++)e.push(n);return e}function nb(t,n,e,r){let i=t.length;if(i==n)t.push(e,r);else if(i===1)t.push(r,t[0]),t[0]=e;else{for(i--,t.push(t[i-1],t[i]);i>n;){let o=i-2;t[i]=t[o],i--}t[n]=e,t[n+1]=r}}function nl(t,n,e){let r=to(t,n);return r>=0?t[r|1]=e:(r=~r,nb(t,r,n,e)),r}function rl(t,n){let e=to(t,n);if(e>=0)return t[e|1]}function to(t,n){return nS(t,n,1)}function nS(t,n,e){let r=0,i=t.length>>e;for(;i!==r;){let o=r+(i-r>>1),s=t[o<<e];if(n===s)return o<<e;s>n?i=o:r=o+1}return~(i<<e)}var Er={},mt=[],Dr=new g(""),qf=new g("",-1),Kf=new g(""),Is=class{get(n,e=ti){if(e===ti){let i=Zy("",-201);throw i.name="\u0275NotFound",i}return e}};function qt(t){return{\u0275providers:t}}function il(t){return qt([{provide:Dr,multi:!0,useValue:t}])}function rb(...t){return{\u0275providers:Qf(!0,t),\u0275fromNgModule:!0}}function Qf(t,...n){let e=[],r=new Set,i,o=s=>{e.push(s)};return tl(n,s=>{let a=s;Wc(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&ib(i,o),e}function ib(t,n){for(let e=0;e<t.length;e++){let{ngModule:r,providers:i}=t[e];Zf(i,o=>{n(o,r)})}}function Wc(t,n,e,r){if(t=Ke(t),!t)return!1;let i=null,o=If(t),s=!o&&Cn(t);if(!o&&!s){let c=t.ngModule;if(o=If(c),o)i=c;else return!1}else{if(s&&!s.standalone)return!1;i=t}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let l of c)Wc(l,n,e,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let l;tl(o.imports,d=>{Wc(d,n,e,r)&&(l||=[],l.push(d))}),l!==void 0&&ib(l,n)}if(!a){let l=br(i)||(()=>new i);n({provide:i,useFactory:l,deps:mt},i),n({provide:Kf,useValue:i,multi:!0},i),n({provide:Dr,useValue:()=>w(i),multi:!0},i)}let c=o.providers;if(c!=null&&!a){let l=t;Zf(c,d=>{n(d,l)})}}else return!1;return i!==t&&t.providers!==void 0}function Zf(t,n){for(let e of t)Vf(e)&&(e=e.\u0275providers),Array.isArray(e)?Zf(e,n):n(e)}var rS=me({provide:String,useValue:me});function ob(t){return t!==null&&typeof t=="object"&&rS in t}function iS(t){return!!(t&&t.useExisting)}function oS(t){return!!(t&&t.useFactory)}function ri(t){return typeof t=="function"}function sb(t){return!!t.useClass}var Fs=new g(""),zc={},zy={},Cf;function no(){return Cf===void 0&&(Cf=new Is),Cf}var Ee=class{},ii=class extends Ee{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,r,i){super(),this.parent=e,this.source=r,this.scopes=i,Af(n,s=>this.processProvider(s)),this.records.set(qf,eo(void 0,this)),i.has("environment")&&this.records.set(Ee,eo(void 0,this));let o=this.records.get(Fs);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Kf,mt,{self:!0}))}retrieve(n,e){let r=ni(e)||0;try{return this.get(n,ti,r)}catch(i){if(Ji(i))return i;throw i}}destroy(){Ds(this),this._destroyed=!0;let n=U(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of e)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),U(n)}}onDestroy(n){return Ds(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Ds(this);let e=wn(this),r=ht(void 0),i;try{return n()}finally{wn(e),ht(r)}}get(n,e=ti,r){if(Ds(this),n.hasOwnProperty($y))return n[$y](this);let i=ni(r),o,s=wn(this),a=ht(void 0);try{if(!(i&4)){let l=this.records.get(n);if(l===void 0){let d=dS(n)&&ks(n);d&&this.injectableDefInScope(d)?l=eo(kf(n),zc):l=null,this.records.set(n,l)}if(l!=null)return this.hydrate(n,l,i)}let c=i&2?no():this.parent;return e=i&8&&e===ti?null:e,c.get(n,e)}catch(c){let l=Yx(c);throw l===-200||l===-201?new _(l,null):c}finally{ht(a),wn(s)}}resolveInjectorInitializers(){let n=U(null),e=wn(this),r=ht(void 0),i;try{let o=this.get(Dr,mt,{self:!0});for(let s of o)s()}finally{wn(e),ht(r),U(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Ke(n);let e=ri(n)?n:Ke(n&&n.provide),r=aS(n);if(!ri(n)&&n.multi===!0){let i=this.records.get(e);i||(i=eo(void 0,zc,!0),i.factory=()=>Mf(i.multi),this.records.set(e,i)),e=n,i.multi.push(n)}this.records.set(e,r)}hydrate(n,e,r){let i=U(null);try{if(e.value===zy)throw zf("");return e.value===zc&&(e.value=zy,e.value=e.factory(void 0,r)),typeof e.value=="object"&&e.value&&lS(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{U(i)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=Ke(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function kf(t){let n=ks(t),e=n!==null?n.factory:br(t);if(e!==null)return e;if(t instanceof g)throw new _(-204,!1);if(t instanceof Function)return sS(t);throw new _(-204,!1)}function sS(t){if(t.length>0)throw new _(-204,!1);let e=Kx(t);return e!==null?()=>e.factory(t):()=>new t}function aS(t){if(ob(t))return eo(void 0,t.useValue);{let n=Yf(t);return eo(n,zc)}}function Yf(t,n,e){let r;if(ri(t)){let i=Ke(t);return br(i)||kf(i)}else if(ob(t))r=()=>Ke(t.useValue);else if(oS(t))r=()=>t.useFactory(...Mf(t.deps||[]));else if(iS(t))r=(i,o)=>w(Ke(t.useExisting),o!==void 0&&o&8?8:void 0);else{let i=Ke(t&&(t.useClass||t.provide));if(cS(t))r=()=>new i(...Mf(t.deps));else return br(i)||kf(i)}return r}function Ds(t){if(t.destroyed)throw new _(-205,!1)}function eo(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function cS(t){return!!t.deps}function lS(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function dS(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Af(t,n){for(let e of t)Array.isArray(e)?Af(e,n):e&&Vf(e)?Af(e.\u0275providers,n):n(e)}function He(t,n){let e;t instanceof ii?(Ds(t),e=t):e=new Tf(t);let r,i=wn(e),o=ht(void 0);try{return n()}finally{wn(i),ht(o)}}function Xf(){return Yy()!==void 0||$c()!=null}var Kt=0,j=1,H=2,qe=3,Nt=4,pt=5,ro=6,io=7,Qe=8,Cr=9,In=10,Me=11,oo=12,Jf=13,si=14,Et=15,Ir=16,ai=17,xn=18,xr=19,eh=20,Gn=21,ol=22,_r=23,Tt=24,ci=25,so=26,Re=27,ab=1;var Sr=7,Ps=8,li=9,it=10;function qn(t){return Array.isArray(t)&&typeof t[ab]=="object"}function Qt(t){return Array.isArray(t)&&t[ab]===!0}function th(t){return(t.flags&4)!==0}function Kn(t){return t.componentOffset>-1}function Ls(t){return(t.flags&1)===1}function Sn(t){return!!t.template}function ao(t){return(t[H]&512)!==0}function di(t){return(t[H]&256)===256}var nh="svg",cb="math";function Ot(t){for(;Array.isArray(t);)t=t[Kt];return t}function rh(t,n){return Ot(n[t])}function Zt(t,n){return Ot(n[t.index])}function sl(t,n){return t.data[n]}function ih(t,n){return t[n]}function oh(t,n,e,r){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=r}function Ft(t,n){let e=n[t];return qn(e)?e:e[Kt]}function lb(t){return(t[H]&4)===4}function al(t){return(t[H]&128)===128}function db(t){return Qt(t[qe])}function Tn(t,n){return n==null?null:t[n]}function sh(t){t[ai]=0}function ah(t){t[H]&1024||(t[H]|=1024,al(t)&&ui(t))}function ub(t,n){for(;t>0;)n=n[si],t--;return n}function js(t){return!!(t[H]&9216||t[Tt]?.dirty)}function cl(t){t[In].changeDetectionScheduler?.notify(8),t[H]&64&&(t[H]|=1024),js(t)&&ui(t)}function ui(t){t[In].changeDetectionScheduler?.notify(0);let n=wr(t);for(;n!==null&&!(n[H]&8192||(n[H]|=8192,!al(n)));)n=wr(n)}function ch(t,n){if(di(t))throw new _(911,!1);t[Gn]===null&&(t[Gn]=[]),t[Gn].push(n)}function fb(t,n){if(t[Gn]===null)return;let e=t[Gn].indexOf(n);e!==-1&&t[Gn].splice(e,1)}function wr(t){let n=t[qe];return Qt(n)?n[qe]:n}function lh(t){return t[io]??=[]}function dh(t){return t.cleanup??=[]}function hb(t,n,e,r){let i=lh(n);i.push(e),t.firstCreatePass&&dh(t).push(r,i.length-1)}var K={lFrame:xb(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Rf=!1;function mb(){return K.lFrame.elementDepthCount}function pb(){K.lFrame.elementDepthCount++}function uh(){K.lFrame.elementDepthCount--}function fh(){return K.bindingsEnabled}function hh(){return K.skipHydrationRootTNode!==null}function mh(t){return K.skipHydrationRootTNode===t}function ph(){K.skipHydrationRootTNode=null}function J(){return K.lFrame.lView}function Pe(){return K.lFrame.tView}function Yt(t){return K.lFrame.contextLView=t,t[Qe]}function Xt(t){return K.lFrame.contextLView=null,t}function ot(){let t=gh();for(;t!==null&&t.type===64;)t=t.parent;return t}function gh(){return K.lFrame.currentTNode}function gb(){let t=K.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function co(t,n){let e=K.lFrame;e.currentTNode=t,e.isParent=n}function vh(){return K.lFrame.isParent}function yh(){K.lFrame.isParent=!1}function vb(){return K.lFrame.contextLView}function bh(){return Rf}function xs(t){let n=Rf;return Rf=t,n}function yb(){let t=K.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function bb(){return K.lFrame.bindingIndex}function _b(t){return K.lFrame.bindingIndex=t}function lo(){return K.lFrame.bindingIndex++}function ll(t){let n=K.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function wb(){return K.lFrame.inI18n}function Eb(t,n){let e=K.lFrame;e.bindingIndex=e.bindingRootIndex=t,dl(n)}function Db(){return K.lFrame.currentDirectiveIndex}function dl(t){K.lFrame.currentDirectiveIndex=t}function Cb(t){let n=K.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function _h(){return K.lFrame.currentQueryIndex}function ul(t){K.lFrame.currentQueryIndex=t}function uS(t){let n=t[j];return n.type===2?n.declTNode:n.type===1?t[pt]:null}function wh(t,n,e){if(e&4){let i=n,o=t;for(;i=i.parent,i===null&&!(e&1);)if(i=uS(o),i===null||(o=o[si],i.type&10))break;if(i===null)return!1;n=i,t=o}let r=K.lFrame=Ib();return r.currentTNode=n,r.lView=t,!0}function fl(t){let n=Ib(),e=t[j];K.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function Ib(){let t=K.lFrame,n=t===null?null:t.child;return n===null?xb(t):n}function xb(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function Sb(){let t=K.lFrame;return K.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var Eh=Sb;function hl(){let t=Sb();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function Tb(t){return(K.lFrame.contextLView=ub(t,K.lFrame.contextLView))[Qe]}function Qn(){return K.lFrame.selectedIndex}function Tr(t){K.lFrame.selectedIndex=t}function ml(){let t=K.lFrame;return sl(t.tView,t.selectedIndex)}function uo(){K.lFrame.currentNamespace=nh}function fo(){fS()}function fS(){K.lFrame.currentNamespace=null}function Dh(){return K.lFrame.currentNamespace}var Mb=!0;function pl(){return Mb}function gl(t){Mb=t}function Nf(t,n=null,e=null,r){let i=Ch(t,n,e,r);return i.resolveInjectorInitializers(),i}function Ch(t,n=null,e=null,r,i=new Set){let o=[e||mt,rb(t)],s;return new ii(o,n||no(),s||null,i)}var X=class t{static THROW_IF_NOT_FOUND=ti;static NULL=new Is;static create(n,e){if(Array.isArray(n))return Nf({name:""},e,n,"");{let r=n.name??"";return Nf({name:r},n.parent,n.providers,r)}}static \u0275prov=y({token:t,providedIn:"any",factory:()=>w(qf)});static __NG_ELEMENT_ID__=-1},$=new g(""),Ze=(()=>{class t{static __NG_ELEMENT_ID__=hS;static __NG_ENV_ID__=e=>e}return t})(),qc=class extends Ze{_lView;constructor(n){super(),this._lView=n}get destroyed(){return di(this._lView)}onDestroy(n){let e=this._lView;return ch(e,n),()=>fb(e,n)}};function hS(){return new qc(J())}var kb=!1,Ab=new g(""),Zn=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new De(!1);debugTaskTracker=f(Ab,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new V(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Of=class extends F{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,Xf()&&(this.destroyRef=f(Ze,{optional:!0})??void 0,this.pendingTasks=f(Zn,{optional:!0})??void 0)}emit(n){let e=U(null);try{super.next(n)}finally{U(e)}}subscribe(n,e,r){let i=n,o=e||(()=>null),s=r;if(n&&typeof n=="object"){let c=n;i=c.next?.bind(c),o=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return n instanceof we&&n.add(a),a}wrapInTimeout(n){return e=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},de=Of;function Kc(...t){}function Ih(t){let n,e;function r(){t=Kc;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch(i){}}return n=setTimeout(()=>{t(),r()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),r()})),()=>r()}function Rb(t){return queueMicrotask(()=>t()),()=>{t=Kc}}var xh="isAngularZone",Ss=xh+"_ID",mS=0,P=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new de(!1);onMicrotaskEmpty=new de(!1);onStable=new de(!1);onError=new de(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=kb}=n;if(typeof Zone>"u")throw new _(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,vS(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(xh)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new _(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new _(909,!1)}run(n,e,r){return this._inner.run(n,e,r)}runTask(n,e,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,n,pS,Kc,Kc);try{return o.runTask(s,e,r)}finally{o.cancelTask(s)}}runGuarded(n,e,r){return this._inner.runGuarded(n,e,r)}runOutsideAngular(n){return this._outer.run(n)}},pS={};function Sh(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function gS(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){Ih(()=>{t.callbackScheduled=!1,Ff(t),t.isCheckStableRunning=!0,Sh(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Ff(t)}function vS(t){let n=()=>{gS(t)},e=mS++;t._inner=t._inner.fork({name:"angular",properties:{[xh]:!0,[Ss]:e,[Ss+e]:!0},onInvokeTask:(r,i,o,s,a,c)=>{if(yS(c))return r.invokeTask(o,s,a,c);try{return Gy(t),r.invokeTask(o,s,a,c)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),Wy(t)}},onInvoke:(r,i,o,s,a,c,l)=>{try{return Gy(t),r.invoke(o,s,a,c,l)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!bS(c)&&n(),Wy(t)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,Ff(t),Sh(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),!1)})}function Ff(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function Gy(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function Wy(t){t._nesting--,Sh(t)}var Ts=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new de;onMicrotaskEmpty=new de;onStable=new de;onError=new de;run(n,e,r){return n.apply(e,r)}runGuarded(n,e,r){return n.apply(e,r)}runOutsideAngular(n){return n()}runTask(n,e,r,i){return n.apply(e,r)}};function yS(t){return Nb(t,"__ignore_ng_zone__")}function bS(t){return Nb(t,"__scheduler_tick__")}function Nb(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var rt=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Pt=new g("",{factory:()=>{let t=f(P),n=f(Ee),e;return r=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw r}):(e??=n.get(rt),e.handleError(r))})}}}),Ob={provide:Dr,useValue:()=>{let t=f(rt,{optional:!0})},multi:!0};function Se(t,n){let[e,r,i]=sf(t,n?.equal),o=e,s=o[tt];return o.set=r,o.update=i,o.asReadonly=Fb.bind(o),o}function Fb(){let t=this[tt];if(t.readonlyFn===void 0){let n=()=>this();n[tt]=t,t.readonlyFn=n}return t.readonlyFn}var Vs=(()=>{class t{view;node;constructor(e,r){this.view=e,this.node=r}static __NG_ELEMENT_ID__=_S}return t})();function _S(){return new Vs(J(),ot())}var Wn=class{},Bs=new g("",{factory:()=>!0});var Th=new g(""),ho=(()=>{class t{internalPendingTasks=f(Zn);scheduler=f(Wn);errorHandler=f(Pt);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let r=this.add();e().catch(this.errorHandler).finally(r)}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),vl=(()=>{class t{static \u0275prov=y({token:t,providedIn:"root",factory:()=>new Pf})}return t})(),Pf=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,r=this.queues.get(e);r.has(n)&&(r.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let r=this.queues.get(e);r.has(n)||r.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,r]of this.queues)e===null?n||=this.flushQueue(r):n||=e.run(()=>this.flushQueue(r));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let r of n)r.dirty&&(this.dirtyEffectCount--,e=!0,r.run());return e}},Qc=class{[tt];constructor(n){this[tt]=n}destroy(){this[tt].destroy()}};function fi(t,n){let e=n?.injector??f(X),r=n?.manualCleanup!==!0?e.get(Ze):null,i,o=e.get(Vs,null,{optional:!0}),s=e.get(Wn);return o!==null?(i=DS(o.view,s,t),r instanceof qc&&r._lView===o.view&&(r=null)):i=CS(t,e.get(vl),s),i.injector=e,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new Qc(i)}var Pb=W(b({},cf),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=xs(!1);try{lf(this)}finally{xs(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=U(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],U(t)}}}),wS=W(b({},Pb),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Wr(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),ES=W(b({},Pb),{consumerMarkedDirty(){this.view[H]|=8192,ui(this.view),this.notifier.notify(13)},destroy(){if(Wr(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[_r]?.delete(this)}});function DS(t,n,e){let r=Object.create(ES);return r.view=t,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=n,r.fn=Lb(r,e),t[_r]??=new Set,t[_r].add(r),r.consumerMarkedDirty(r),r}function CS(t,n,e){let r=Object.create(wS);return r.fn=Lb(r,t),r.scheduler=n,r.notifier=e,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function Lb(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function _o(t){return{toString:t}.toString()}var yl="__parameters__";function AS(t){return function(...e){if(t){let r=t(...e);for(let i in r)this[i]=r[i]}}}function RS(t,n,e){return _o(()=>{let r=AS(n);function i(...o){if(this instanceof i)return r.apply(this,o),this;let s=new i(...o);return a.annotation=s,a;function a(c,l,d){let u=c.hasOwnProperty(yl)?c[yl]:Object.defineProperty(c,yl,{value:[]})[yl];for(;u.length<=d;)u.push(null);return(u[d]=u[d]||[]).push(s),c}}return i.prototype.ngMetadataName=t,i.annotationCls=i,i})}var $l=Xy(RS("Inject",t=>({token:t})),-1);function p_(t){let n=wt.ng;if(n&&n.\u0275compilerFacade)return n.\u0275compilerFacade;throw new Error("JIT compiler unavailable")}function NS(t){return typeof t=="function"}function g_(t,n,e,r){n!==null?n.applyValueToInputSignal(n,r):t[e]=r}var Sl=class{previousValue;currentValue;firstChange;constructor(n,e,r){this.previousValue=n,this.currentValue=e,this.firstChange=r}isFirstChange(){return this.firstChange}},gt=(()=>{let t=()=>v_;return t.ngInherit=!0,t})();function v_(t){return t.type.prototype.ngOnChanges&&(t.setInput=FS),OS}function OS(){let t=b_(this),n=t?.current;if(n){let e=t.previous;if(e===Er)t.previous=n;else for(let r in n)e[r]=n[r];t.current=null,this.ngOnChanges(n)}}function FS(t,n,e,r,i){let o=this.declaredInputs[r],s=b_(t)||PS(t,{previous:Er,current:null}),a=s.current||(s.current={}),c=s.previous,l=c[o];a[o]=new Sl(l&&l.currentValue,e,c===Er),g_(t,n,i,e)}var y_="__ngSimpleChanges__";function b_(t){return t[y_]||null}function PS(t,n){return t[y_]=n}var jb=[];var ve=function(t,n=null,e){for(let r=0;r<jb.length;r++){let i=jb[r];i(t,n,e)}},ue=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(ue||{});function LS(t,n,e){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=n.type.prototype;if(r){let s=v_(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s)}i&&(e.preOrderHooks??=[]).push(0-t,i),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o))}function __(t,n){for(let e=n.directiveStart,r=n.directiveEnd;e<r;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:d}=o;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),c&&(t.viewHooks??=[]).push(-e,c),l&&((t.viewHooks??=[]).push(e,l),(t.viewCheckHooks??=[]).push(e,l)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function Dl(t,n,e){w_(t,n,3,e)}function Cl(t,n,e,r){(t[H]&3)===e&&w_(t,n,e,r)}function Mh(t,n){let e=t[H];(e&3)===n&&(e&=16383,e+=1,t[H]=e)}function w_(t,n,e,r){let i=r!==void 0?t[ai]&65535:0,o=r??-1,s=n.length-1,a=0;for(let c=i;c<s;c++)if(typeof n[c+1]=="number"){if(a=n[c],r!=null&&a>=r)break}else n[c]<0&&(t[ai]+=65536),(a<o||o==-1)&&(jS(t,e,n,c),t[ai]=(t[ai]&4294901760)+c+2),c++}function Vb(t,n){ve(ue.LifecycleHookStart,t,n);let e=U(null);try{n.call(t)}finally{U(e),ve(ue.LifecycleHookEnd,t,n)}}function jS(t,n,e,r){let i=e[r]<0,o=e[r+1],s=i?-e[r]:e[r],a=t[s];i?t[H]>>14<t[ai]>>16&&(t[H]&3)===n&&(t[H]+=16384,Vb(a,o)):Vb(a,o)}var po=-1,mi=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,r,i){this.factory=n,this.name=i,this.canSeeViewProviders=e,this.injectImpl=r}};function VS(t){return(t.flags&8)!==0}function BS(t){return(t.flags&16)!==0}function US(t,n,e){let r=0;for(;r<e.length;){let i=e[r];if(typeof i=="number"){if(i!==0)break;r++;let o=e[r++],s=e[r++],a=e[r++];t.setAttribute(n,s,a,o)}else{let o=i,s=e[++r];HS(o)?t.setProperty(n,o,s):t.setAttribute(n,o,s),r++}}return r}function E_(t){return t===3||t===4||t===6}function HS(t){return t.charCodeAt(0)===64}function go(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let r=0;r<n.length;r++){let i=n[r];typeof i=="number"?e=i:e===0||(e===-1||e===2?Bb(t,e,i,null,n[++r]):Bb(t,e,i,null,null))}}return t}function Bb(t,n,e,r,i){let o=0,s=t.length;if(n===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===e){i!==null&&(t[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(t.splice(s,0,n),o=s+1),t.splice(o++,0,e),i!==null&&t.splice(o++,0,i)}function D_(t){return t!==po}function Tl(t){return t&32767}function $S(t){return t>>16}function Ml(t,n){let e=$S(t),r=n;for(;e>0;)r=r[si],e--;return r}var Vh=!0;function kl(t){let n=Vh;return Vh=t,n}var zS=256,C_=zS-1,I_=5,GS=0,Mn={};function WS(t,n,e){let r;typeof e=="string"?r=e.charCodeAt(0)||0:e.hasOwnProperty(oi)&&(r=e[oi]),r==null&&(r=e[oi]=GS++);let i=r&C_,o=1<<i;n.data[t+(i>>I_)]|=o}function Al(t,n){let e=x_(t,n);if(e!==-1)return e;let r=n[j];r.firstCreatePass&&(t.injectorIndex=n.length,kh(r.data,t),kh(n,null),kh(r.blueprint,null));let i=vm(t,n),o=t.injectorIndex;if(D_(i)){let s=Tl(i),a=Ml(i,n),c=a[j].data;for(let l=0;l<8;l++)n[o+l]=a[s+l]|c[s+l]}return n[o+8]=i,o}function kh(t,n){t.push(0,0,0,0,0,0,0,0,n)}function x_(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function vm(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,r=null,i=n;for(;i!==null;){if(r=A_(i),r===null)return po;if(e++,i=i[si],r.injectorIndex!==-1)return r.injectorIndex|e<<16}return po}function Bh(t,n,e){WS(t,n,e)}function qS(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let r=e.length,i=0;for(;i<r;){let o=e[i];if(E_(o))break;if(o===0)i=i+2;else if(typeof o=="number")for(i++;i<r&&typeof e[i]=="string";)i++;else{if(o===n)return e[i+1];i=i+2}}}return null}function S_(t,n,e){if(e&8||t!==void 0)return t;el(n,"NodeInjector")}function T_(t,n,e,r){if(e&8&&r===void 0&&(r=null),(e&3)===0){let i=t[Cr],o=ht(void 0);try{return i?i.get(n,r,e&8):Gf(n,r,e&8)}finally{ht(o)}}return S_(r,n,e)}function M_(t,n,e,r=0,i){if(t!==null){if(n[H]&2048&&!(r&2)){let s=YS(t,n,e,r,Mn);if(s!==Mn)return s}let o=k_(t,n,e,r,Mn);if(o!==Mn)return o}return T_(n,e,r,i)}function k_(t,n,e,r,i){let o=QS(e);if(typeof o=="function"){if(!wh(n,t,r))return r&1?S_(i,e,r):T_(n,e,r,i);try{let s;if(s=o(r),s==null&&!(r&8))el(e);else return s}finally{Eh()}}else if(typeof o=="number"){let s=null,a=x_(t,n),c=po,l=r&1?n[Et][pt]:null;for((a===-1||r&4)&&(c=a===-1?vm(t,n):n[a+8],c===po||!Hb(r,!1)?a=-1:(s=n[j],a=Tl(c),n=Ml(c,n)));a!==-1;){let d=n[j];if(Ub(o,a,d.data)){let u=KS(a,n,e,s,r,l);if(u!==Mn)return u}c=n[a+8],c!==po&&Hb(r,n[j].data[a+8]===l)&&Ub(o,a,n)?(s=d,a=Tl(c),n=Ml(c,n)):a=-1}}return i}function KS(t,n,e,r,i,o){let s=n[j],a=s.data[t+8],c=r==null?Kn(a)&&Vh:r!=s&&(a.type&3)!==0,l=i&1&&o===a,d=Il(a,s,e,c,l);return d!==null?zs(n,s,d,a,i):Mn}function Il(t,n,e,r,i){let o=t.providerIndexes,s=n.data,a=o&1048575,c=t.directiveStart,l=t.directiveEnd,d=o>>20,u=r?a:a+d,h=i?a+d:l;for(let m=u;m<h;m++){let p=s[m];if(m<c&&e===p||m>=c&&p.type===e)return m}if(i){let m=s[c];if(m&&Sn(m)&&m.type===e)return c}return null}function zs(t,n,e,r,i){let o=t[e],s=n.data;if(o instanceof mi){let a=o;if(a.resolving)throw zf("");let c=kl(a.canSeeViewProviders);a.resolving=!0;let l=s[e].type||s[e],d,u=a.injectImpl?ht(a.injectImpl):null,h=wh(t,r,0);try{o=t[e]=a.factory(void 0,i,s,t,r),n.firstCreatePass&&e>=r.directiveStart&&LS(e,s[e],n)}finally{u!==null&&ht(u),kl(c),a.resolving=!1,Eh()}}return o}function QS(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(oi)?t[oi]:void 0;return typeof n=="number"?n>=0?n&C_:ZS:n}function Ub(t,n,e){let r=1<<t;return!!(e[n+(t>>I_)]&r)}function Hb(t,n){return!(t&2)&&!(t&1&&n)}var hi=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,r){return M_(this._tNode,this._lView,n,ni(r),e)}};function ZS(){return new hi(ot(),J())}function vt(t){return _o(()=>{let n=t.prototype.constructor,e=n[Cs]||Uh(n),r=Object.prototype,i=Object.getPrototypeOf(t.prototype).constructor;for(;i&&i!==r;){let o=i[Cs]||Uh(i);if(o&&o!==e)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function Uh(t){return Lf(t)?()=>{let n=Uh(Ke(t));return n&&n()}:br(t)}function YS(t,n,e,r,i){let o=t,s=n;for(;o!==null&&s!==null&&s[H]&2048&&!ao(s);){let a=k_(o,s,e,r|2,Mn);if(a!==Mn)return a;let c=o.parent;if(!c){let l=s[eh];if(l){let d=l.get(e,Mn,r&-5);if(d!==Mn)return d}c=A_(s),s=s[si]}o=c}return i}function A_(t){let n=t[j],e=n.type;return e===2?n.declTNode:e===1?t[pt]:null}function zl(t){return qS(ot(),t)}function XS(){return wo(ot(),J())}function wo(t,n){return new ne(Zt(t,n))}var ne=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=XS}return t})();function JS(t){return t instanceof ne?t.nativeElement:t}function eT(){return this._results[Symbol.iterator]()}var Yn=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new F}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let r=eb(n);(this._changesDetected=!Jy(this._results,r,e))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=eT};function R_(t){return(t.flags&128)===128}var ym=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(ym||{}),N_=new Map,tT=0;function nT(){return tT++}function rT(t){N_.set(t[xr],t)}function Hh(t){N_.delete(t[xr])}var $b="__ngContext__";function vo(t,n){qn(n)?(t[$b]=n[xr],rT(n)):t[$b]=n}function O_(t){return P_(t[oo])}function F_(t){return P_(t[Nt])}function P_(t){for(;t!==null&&!Qt(t);)t=t[Nt];return t}var iT;function bm(t){iT=t}var Eo=new g("",{factory:()=>oT}),oT="ng";var Gl=new g(""),vi=new g("",{providedIn:"platform",factory:()=>"unknown"}),Do=new g(""),yi=new g("",{factory:()=>f($).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var _m=new g(""),L_=!1,j_=new g("",{factory:()=>L_});var Wl=new g("");var zb=new WeakMap;function sT(t,n){if(t==null||typeof t!="object")return;let e=zb.get(t);e||(e=new WeakSet,zb.set(t,e)),e.add(n)}var aT=(t,n,e,r)=>{};function cT(t,n,e,r){aT(t,n,e,r)}function ql(t){return(t.flags&32)===32}var lT=()=>null;function V_(t,n,e=!1){return lT(t,n,e)}function B_(t,n){let e=t.contentQueries;if(e!==null){let r=U(null);try{for(let i=0;i<e.length;i+=2){let o=e[i],s=e[i+1];if(s!==-1){let a=t.data[s];ul(o),a.contentQueries(2,n[s],s)}}}finally{U(r)}}}function $h(t,n,e){ul(0);let r=U(null);try{n(t,e)}finally{U(r)}}function U_(t,n,e){if(th(n)){let r=U(null);try{let i=n.directiveStart,o=n.directiveEnd;for(let s=i;s<o;s++){let a=t.data[s];if(a.contentQueries){let c=e[s];a.contentQueries(1,c,s)}}}finally{U(r)}}}var tn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(tn||{});var bl;function dT(){if(bl===void 0&&(bl=null,wt.trustedTypes))try{bl=wt.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch(t){}return bl}function Kl(t){return dT()?.createHTML(t)||t}var Xn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Zc})`}},zh=class extends Xn{getTypeName(){return"HTML"}},Gh=class extends Xn{getTypeName(){return"Style"}},Wh=class extends Xn{getTypeName(){return"Script"}},qh=class extends Xn{getTypeName(){return"URL"}},Kh=class extends Xn{getTypeName(){return"ResourceURL"}};function Rn(t){return t instanceof Xn?t.changingThisBreaksApplicationSecurity:t}function bi(t,n){let e=H_(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${Zc})`)}return e===n}function H_(t){return t instanceof Xn&&t.getTypeName()||null}function wm(t){return new zh(t)}function Em(t){return new Gh(t)}function Dm(t){return new Wh(t)}function Cm(t){return new qh(t)}function Im(t){return new Kh(t)}function uT(t){let n=new Zh(t);return fT()?new Qh(n):n}var Qh=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(Kl(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch(e){return null}}},Zh=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=Kl(n),e}};function fT(){try{return!!new window.DOMParser().parseFromString(Kl(""),"text/html")}catch(t){return!1}}var hT=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Ql(t){return t=String(t),t.match(hT)?t:"unsafe:"+t}function Jn(t){let n={};for(let e of t.split(","))n[e]=!0;return n}function Qs(...t){let n={};for(let e of t)for(let r in e)e.hasOwnProperty(r)&&(n[r]=!0);return n}var $_=Jn("area,br,col,hr,img,wbr"),z_=Jn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),G_=Jn("rp,rt"),mT=Qs(G_,z_),pT=Qs(z_,Jn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),gT=Qs(G_,Jn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Gb=Qs($_,pT,gT,mT),W_=Jn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),vT=Jn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),yT=Jn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),bT=Qs(W_,vT,yT),_T=Jn("script,style,template"),Yh=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,r=!0,i=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?r=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,r&&e.firstChild){i.push(e),e=DT(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=ET(e);if(o){e=o;break}e=i.pop()}}return this.buf.join("")}startElement(n){let e=Wb(n).toLowerCase();if(!Gb.hasOwnProperty(e))return this.sanitizedSomething=!0,!_T.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let r=n.attributes;for(let i=0;i<r.length;i++){let o=r.item(i),s=o.name,a=s.toLowerCase();if(!bT.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let c=o.value;W_[a]&&(c=Ql(c)),this.buf.push(" ",s,'="',qb(c),'"')}return this.buf.push(">"),!0}endElement(n){let e=Wb(n).toLowerCase();Gb.hasOwnProperty(e)&&!$_.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(qb(n))}};function wT(t,n){return(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function ET(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw q_(n);return n}function DT(t){let n=t.firstChild;if(n&&wT(t,n))throw q_(n);return n}function Wb(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function q_(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var CT=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,IT=/([^\#-~ |!])/g;function qb(t){return t.replace(/&/g,"&amp;").replace(CT,function(n){let e=n.charCodeAt(0),r=n.charCodeAt(1);return"&#"+((e-55296)*1024+(r-56320)+65536)+";"}).replace(IT,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var _l;function xm(t,n){let e=null;try{_l=_l||uT(t);let r=n?String(n):"";e=_l.getInertBodyElement(r);let i=5,o=r;do{if(i===0)throw new Error("Failed to sanitize html because the input is unstable");i--,r=o,o=e.innerHTML,e=_l.getInertBodyElement(r)}while(r!==o);let a=new Yh().sanitizeChildren(Kb(e)||e);return Kl(a)}finally{if(e){let r=Kb(e)||e;for(;r.firstChild;)r.firstChild.remove()}}}function Kb(t){return"content"in t&&xT(t)?t.content:null}function xT(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function ST(t,n){return t.createText(n)}function TT(t,n,e){t.setValue(n,e)}function K_(t,n,e){return t.createElement(n,e)}function Rl(t,n,e,r,i){t.insertBefore(n,e,r,i)}function Q_(t,n,e){t.appendChild(n,e)}function Qb(t,n,e,r,i){r!==null?Rl(t,n,e,r,i):Q_(t,n,e)}function MT(t,n,e,r){t.removeChild(null,n,e,r)}function kT(t,n,e){t.setAttribute(n,"style",e)}function AT(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function Z_(t,n,e){let{mergedAttrs:r,classes:i,styles:o}=e;r!==null&&US(t,n,r),i!==null&&AT(t,n,i),o!==null&&kT(t,n,o)}var yt=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t[t.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",t})(yt||{});function Y_(t){return t instanceof Function?t():t}function RT(t,n,e){let r=t.length;for(;;){let i=t.indexOf(n,e);if(i===-1)return i;if(i===0||t.charCodeAt(i-1)<=32){let o=n.length;if(i+o===r||t.charCodeAt(i+o)<=32)return i}e=i+1}}var X_="ng-template";function NT(t,n,e,r){let i=0;if(r){for(;i<n.length&&typeof n[i]=="string";i+=2)if(n[i]==="class"&&RT(n[i+1].toLowerCase(),e,0)!==-1)return!0}else if(Sm(t))return!1;if(i=n.indexOf(1,i),i>-1){let o;for(;++i<n.length&&typeof(o=n[i])=="string";)if(o.toLowerCase()===e)return!0}return!1}function Sm(t){return t.type===4&&t.value!==X_}function OT(t,n,e){let r=t.type===4&&!e?X_:t.value;return n===r}function FT(t,n,e){let r=4,i=t.attrs,o=i!==null?jT(i):0,s=!1;for(let a=0;a<n.length;a++){let c=n[a];if(typeof c=="number"){if(!s&&!Jt(r)&&!Jt(c))return!1;if(s&&Jt(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!OT(t,c,e)||c===""&&n.length===1){if(Jt(r))return!1;s=!0}}else if(r&8){if(i===null||!NT(t,i,c,e)){if(Jt(r))return!1;s=!0}}else{let l=n[++a],d=PT(c,i,Sm(t),e);if(d===-1){if(Jt(r))return!1;s=!0;continue}if(l!==""){let u;if(d>o?u="":u=i[d+1].toLowerCase(),r&2&&l!==u){if(Jt(r))return!1;s=!0}}}}return Jt(r)||s}function Jt(t){return(t&1)===0}function PT(t,n,e,r){if(n===null)return-1;let i=0;if(r||!e){let o=!1;for(;i<n.length;){let s=n[i];if(s===t)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++i];for(;typeof a=="string";)a=n[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return VT(n,t)}function J_(t,n,e=!1){for(let r=0;r<n.length;r++)if(FT(t,n[r],e))return!0;return!1}function LT(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function jT(t){for(let n=0;n<t.length;n++){let e=t[n];if(E_(e))return n}return t.length}function VT(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let r=t[e];if(typeof r=="number")return-1;if(r===n)return e;e++}return-1}function BT(t,n){e:for(let e=0;e<n.length;e++){let r=n[e];if(t.length===r.length){for(let i=0;i<t.length;i++)if(t[i]!==r[i])continue e;return!0}}return!1}function Zb(t,n){return t?":not("+n.trim()+")":n}function UT(t){let n=t[0],e=1,r=2,i="",o=!1;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(r&2){let a=t[++e];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!Jt(s)&&(n+=Zb(o,i),i=""),r=s,o=o||!Jt(r);e++}return i!==""&&(n+=Zb(o,i)),n}function HT(t){return t.map(UT).join(",")}function $T(t){let n=[],e=[],r=1,i=2;for(;r<t.length;){let o=t[r];if(typeof o=="string")i===2?o!==""&&n.push(o,t[++r]):i===8&&e.push(o);else{if(!Jt(i))break;i=o}r++}return e.length&&n.push(1,...e),n}var Dt={};function Tm(t,n,e,r,i,o,s,a,c,l,d){let u=Re+r,h=u+i,m=zT(u,h),p=typeof l=="function"?l():l;return m[j]={type:t,blueprint:m,template:e,queries:null,viewQuery:a,declTNode:n,data:m.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:p,incompleteFirstPass:!1,ssrId:d}}function zT(t,n){let e=[];for(let r=0;r<n;r++)e.push(r<t?null:Dt);return e}function GT(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=Tm(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function Mm(t,n,e,r,i,o,s,a,c,l,d){let u=n.blueprint.slice();return u[Kt]=i,u[H]=r|4|128|8|64|1024,(l!==null||t&&t[H]&2048)&&(u[H]|=2048),sh(u),u[qe]=u[si]=t,u[Qe]=e,u[In]=s||t&&t[In],u[Me]=a||t&&t[Me],u[Cr]=c||t&&t[Cr]||null,u[pt]=o,u[xr]=nT(),u[ro]=d,u[eh]=l,u[Et]=n.type==2?t[Et]:u,u}function WT(t,n,e){let r=Zt(n,t),i=GT(e),o=t[In].rendererFactory,s=km(t,Mm(t,i,null,ew(e),r,n,null,o.createRenderer(r,e),null,null,null));return t[n.index]=s}function ew(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function tw(t,n,e,r){if(e===0)return-1;let i=n.length;for(let o=0;o<e;o++)n.push(r),t.blueprint.push(r),t.data.push(null);return i}function km(t,n){return t[oo]?t[Jf][Nt]=n:t[oo]=n,t[Jf]=n,n}function fe(t=1){nw(Pe(),J(),Qn()+t,!1)}function nw(t,n,e,r){if(!r)if((n[H]&3)===3){let o=t.preOrderCheckHooks;o!==null&&Dl(n,o,e)}else{let o=t.preOrderHooks;o!==null&&Cl(n,o,0,e)}Tr(e)}var Zl=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Zl||{});function Xh(t,n,e,r){let i=U(null);try{let[o,s,a]=t.inputs[e],c=null;(s&Zl.SignalBased)!==0&&(c=n[o][tt]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):a!==null&&(r=a.call(n,r)),t.setInput!==null?t.setInput(n,c,r,e,o):g_(n,c,o,r)}finally{U(i)}}var kn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(kn||{}),qT;function Am(t,n){return qT(t,n)}var U8=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Jh=new WeakMap,Us=new WeakSet;function KT(t,n){let e=Jh.get(t);if(!e||e.length===0)return;let r=n.parentNode,i=n.previousSibling;for(let o=e.length-1;o>=0;o--){let s=e[o],a=s.parentNode;s===n?(e.splice(o,1),Us.add(s),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(i&&s===i||a&&r&&a!==r)&&(e.splice(o,1),s.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),s.parentNode?.removeChild(s))}}function QT(t,n){let e=Jh.get(t);e?e.includes(n)||e.push(n):Jh.set(t,[n])}var yo=new Set,Yl=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Yl||{}),Nn=new g(""),Yb=new Set;function On(t){Yb.has(t)||(Yb.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var Rm=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),rw=[0,1,2,3],iw=(()=>{class t{ngZone=f(P);scheduler=f(Wn);errorHandler=f(rt,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(Nn,{optional:!0})}execute(){let e=this.sequences.size>0;e&&ve(ue.AfterRenderHooksStart),this.executing=!0;for(let r of rw)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&ve(ue.AfterRenderHooksEnd)}register(e){let{view:r}=e;r!==void 0?((r[ci]??=[]).push(e),ui(r),r[H]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e)}addSequence(e){this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,r){return r?r.run(Yl.AFTER_NEXT_RENDER,e):e()}static \u0275prov=y({token:t,providedIn:"root",factory:()=>new t})}return t})(),Nl=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,r,i,o,s=null){this.impl=n,this.hooks=e,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[ci];n&&(this.view[ci]=n.filter(e=>e!==this))}};function nn(t,n){let e=n?.injector??f(X);return On("NgAfterNextRender"),YT(t,e,n,!0)}function ZT(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function YT(t,n,e,r){let i=n.get(Rm);i.impl??=n.get(iw);let o=n.get(Nn,null,{optional:!0}),s=e?.manualCleanup!==!0?n.get(Ze):null,a=n.get(Vs,null,{optional:!0}),c=new Nl(i.impl,ZT(t),a?.view,r,s,o?.snapshot(null));return i.impl.register(c),c}var XT=new g("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:f(Ee)})});function ow(t,n,e){let r=t.get(XT);if(Array.isArray(n))for(let i of n)r.queue.add(i),e?.detachedLeaveAnimationFns?.push(i);else r.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);r.scheduler&&r.scheduler(t)}function JT(t,n){for(let[e,r]of n)ow(t,r.animateFns)}function Xb(t,n,e,r){let i=t?.[so]?.enter;n!==null&&i&&i.has(e.index)&&JT(r,i)}function mo(t,n,e,r,i,o,s,a){if(i!=null){let c,l=!1;Qt(i)?c=i:qn(i)&&(l=!0,i=i[Kt]);let d=Ot(i);t===0&&r!==null?(Xb(a,r,o,e),s==null?Q_(n,r,d):Rl(n,r,d,s||null,!0)):t===1&&r!==null?(Xb(a,r,o,e),Rl(n,r,d,s||null,!0),KT(o,d)):t===2?(a?.[so]?.leave?.has(o.index)&&QT(o,d),Us.delete(d),Jb(a,o,e,u=>{if(Us.has(d)){Us.delete(d);return}MT(n,d,l,u)})):t===3&&(Us.delete(d),Jb(a,o,e,()=>{n.destroyNode(d)})),c!=null&&dM(n,t,e,c,o,r,s)}}function eM(t,n){sw(t,n),n[Kt]=null,n[pt]=null}function tM(t,n,e,r,i,o){r[Kt]=i,r[pt]=n,Xl(t,r,e,1,i,o)}function sw(t,n){n[In].changeDetectionScheduler?.notify(9),Xl(t,n,n[Me],2,null,null)}function nM(t){let n=t[oo];if(!n)return Ah(t[j],t);for(;n;){let e=null;if(qn(n))e=n[oo];else{let r=n[it];r&&(e=r)}if(!e){for(;n&&!n[Nt]&&n!==t;)qn(n)&&Ah(n[j],n),n=n[qe];n===null&&(n=t),qn(n)&&Ah(n[j],n),e=n&&n[Nt]}n=e}}function Nm(t,n){let e=t[li],r=e.indexOf(n);e.splice(r,1)}function Om(t,n){if(di(n))return;let e=n[Me];e.destroyNode&&Xl(t,n,e,3,null,null),nM(n)}function Ah(t,n){if(di(n))return;let e=U(null);try{n[H]&=-129,n[H]|=256,n[Tt]&&Wr(n[Tt]),oM(t,n),iM(t,n),n[j].type===1&&n[Me].destroy();let r=n[Ir];if(r!==null&&Qt(n[qe])){r!==n[qe]&&Nm(r,n);let i=n[xn];i!==null&&i.detachView(t)}Hh(n)}finally{U(e)}}function Jb(t,n,e,r){let i=t?.[so];if(i==null||i.leave==null||!i.leave.has(n.index))return r(!1);t&&yo.add(t[xr]),ow(e,()=>{if(i.leave&&i.leave.has(n.index)){let s=i.leave.get(n.index),a=[];if(s){for(let c=0;c<s.animateFns.length;c++){let l=s.animateFns[c],{promise:d}=l();a.push(d)}i.detachedLeaveAnimationFns=void 0}i.running=Promise.allSettled(a),rM(t,r)}else t&&yo.delete(t[xr]),r(!1)},i)}function rM(t,n){let e=t[so]?.running;if(e){e.then(()=>{t[so].running=void 0,yo.delete(t[xr]),n(!0)});return}n(!1)}function iM(t,n){let e=t.cleanup,r=n[io];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[e[s+1]];e[s].call(a)}r!==null&&(n[io]=null);let i=n[Gn];if(i!==null){n[Gn]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=n[_r];if(o!==null){n[_r]=null;for(let s of o)s.destroy()}}function oM(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let r=0;r<e.length;r+=2){let i=n[e[r]];if(!(i instanceof mi)){let o=e[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],c=o[s+1];ve(ue.LifecycleHookStart,a,c);try{c.call(a)}finally{ve(ue.LifecycleHookEnd,a,c)}}else{ve(ue.LifecycleHookStart,i,o);try{o.call(i)}finally{ve(ue.LifecycleHookEnd,i,o)}}}}}function aw(t,n,e){return sM(t,n.parent,e)}function sM(t,n,e){let r=n;for(;r!==null&&r.type&168;)n=r,r=n.parent;if(r===null)return e[Kt];if(Kn(r)){let{encapsulation:i}=t.data[r.directiveStart+r.componentOffset];if(i===tn.None||i===tn.Emulated)return null}return Zt(r,e)}function cw(t,n,e){return cM(t,n,e)}function aM(t,n,e){return t.type&40?Zt(t,e):null}var cM=aM,e_;function Fm(t,n,e,r){let i=aw(t,r,n),o=n[Me],s=r.parent||n[pt],a=cw(s,r,n);if(i!=null)if(Array.isArray(e))for(let c=0;c<e.length;c++)Qb(o,i,e[c],a,!1);else Qb(o,i,e,a,!1);e_!==void 0&&e_(o,r,n,e,i)}function Hs(t,n){if(n!==null){let e=n.type;if(e&3)return Zt(n,t);if(e&4)return em(-1,t[n.index]);if(e&8){let r=n.child;if(r!==null)return Hs(t,r);{let i=t[n.index];return Qt(i)?em(-1,i):Ot(i)}}else{if(e&128)return Hs(t,n.next);if(e&32)return Am(n,t)()||Ot(t[n.index]);{let r=lw(t,n);if(r!==null){if(Array.isArray(r))return r[0];let i=wr(t[Et]);return Hs(i,r)}else return Hs(t,n.next)}}}return null}function lw(t,n){if(n!==null){let r=t[Et][pt],i=n.projection;return r.projection[i]}return null}function em(t,n){let e=it+t+1;if(e<n.length){let r=n[e],i=r[j].firstChild;if(i!==null)return Hs(r,i)}return n[Sr]}function Pm(t,n,e,r,i,o,s){for(;e!=null;){let a=r[Cr];if(e.type===128){e=e.next;continue}let c=r[e.index],l=e.type;if(s&&n===0&&(c&&vo(Ot(c),r),e.flags|=2),!ql(e))if(l&8)Pm(t,n,e.child,r,i,o,!1),mo(n,t,a,i,c,e,o,r);else if(l&32){let d=Am(e,r),u;for(;u=d();)mo(n,t,a,i,u,e,o,r);mo(n,t,a,i,c,e,o,r)}else l&16?dw(t,n,r,e,i,o):mo(n,t,a,i,c,e,o,r);e=s?e.projectionNext:e.next}}function Xl(t,n,e,r,i,o){Pm(e,r,t.firstChild,n,i,o,!1)}function lM(t,n,e){let r=n[Me],i=aw(t,e,n),o=e.parent||n[pt],s=cw(o,e,n);dw(r,0,n,e,i,s)}function dw(t,n,e,r,i,o){let s=e[Et],c=s[pt].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let d=c[l];mo(n,t,e[Cr],i,d,r,o,e)}else{let l=c,d=s[qe];R_(r)&&(l.flags|=128),Pm(t,n,l,d,i,o,!0)}}function dM(t,n,e,r,i,o,s){let a=r[Sr],c=Ot(r);a!==c&&mo(n,t,e,o,a,i,s);for(let l=it;l<r.length;l++){let d=r[l];Xl(d[j],d,t,n,o,a)}}function uM(t,n,e,r,i){if(n)i?t.addClass(e,r):t.removeClass(e,r);else{let o=r.indexOf("-")===-1?void 0:kn.DashCase;i==null?t.removeStyle(e,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=kn.Important),t.setStyle(e,r,i,o))}}function uw(t,n,e,r,i){let o=Qn(),s=r&2;try{Tr(-1),s&&n.length>Re&&nw(t,n,Re,!1);let a=s?ue.TemplateUpdateStart:ue.TemplateCreateStart;ve(a,i,e),e(r,i)}finally{Tr(o);let a=s?ue.TemplateUpdateEnd:ue.TemplateCreateEnd;ve(a,i,e)}}function Lm(t,n,e){yM(t,n,e),(e.flags&64)===64&&bM(t,n,e)}function Jl(t,n,e=Zt){let r=n.localNames;if(r!==null){let i=n.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?e(n,t):t[s];t[i++]=a}}}function fM(t,n,e,r){let o=r.get(j_,L_)||e===tn.ShadowDom||e===tn.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,o);if(s.tagName.toLowerCase()==="script")throw new _(905,!1);return hM(s),s}function hM(t){mM(t)}var mM=()=>null;function pM(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function gM(t,n,e,r,i,o){let s=n[j];if(jm(t,s,n,e,r)){Kn(t)&&vM(n,t.index);return}t.type&3&&(e=pM(e)),fw(t,n,e,r,i,o)}function fw(t,n,e,r,i,o){if(t.type&3){let s=Zt(t,n);r=o!=null?o(r,t.value||"",e):r,i.setProperty(s,e,r)}else t.type&12}function vM(t,n){let e=Ft(n,t);e[H]&16||(e[H]|=64)}function yM(t,n,e){let r=e.directiveStart,i=e.directiveEnd;Kn(e)&&WT(n,e,t.data[r+e.componentOffset]),t.firstCreatePass||Al(e,n);let o=e.initialInputs;for(let s=r;s<i;s++){let a=t.data[s],c=zs(n,t,s,e);if(vo(c,n),o!==null&&DM(n,s-r,c,a,e,o),Sn(a)){let l=Ft(e.index,n);l[Qe]=zs(n,t,s,e)}}}function bM(t,n,e){let r=e.directiveStart,i=e.directiveEnd,o=e.index,s=Db();try{Tr(o);for(let a=r;a<i;a++){let c=t.data[a],l=n[a];dl(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&_M(c,l)}}finally{Tr(-1),dl(s)}}function _M(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function hw(t,n){let e=t.directiveRegistry,r=null;if(e)for(let i=0;i<e.length;i++){let o=e[i];J_(n,o.selectors,!1)&&(r??=[],Sn(o)?r.unshift(o):r.push(o))}return r}function wM(t,n,e,r,i,o){let s=Zt(t,n);EM(n[Me],s,o,t.value,e,r,i)}function EM(t,n,e,r,i,o,s){if(o==null)t.removeAttribute(n,i,e);else{let a=s==null?Ns(o):s(o,r||"",i);t.setAttribute(n,i,a,e)}}function DM(t,n,e,r,i,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let c=s[a],l=s[a+1];Xh(r,e,c,l)}}function mw(t,n,e,r,i){let o=Re+e,s=n[j],a=i(s,n,t,r,e);n[o]=a,co(t,!0);let c=t.type===2;return c?(Z_(n[Me],a,t),(mb()===0||Ls(t))&&vo(a,n),pb()):vo(a,n),pl()&&(!c||!ql(t))&&Fm(s,n,a,t),t}function pw(t){let n=t;return vh()?yh():(n=n.parent,co(n,!1)),n}function CM(t,n){let e=t[Cr];if(!e)return;let r;try{r=e.get(Pt,null)}catch(i){r=null}r?.(n)}function jm(t,n,e,r,i){let o=t.inputs?.[r],s=t.hostDirectiveInputs?.[r],a=!1;if(s)for(let c=0;c<s.length;c+=2){let l=s[c],d=s[c+1],u=n.data[l];Xh(u,e[l],d,i),a=!0}if(o)for(let c of o){let l=e[c],d=n.data[c];Xh(d,l,r,i),a=!0}return a}function IM(t,n){let e=Ft(n,t),r=e[j];xM(r,e);let i=e[Kt];i!==null&&e[ro]===null&&(e[ro]=V_(i,e[Cr])),ve(ue.ComponentStart);try{Vm(r,e,e[Qe])}finally{ve(ue.ComponentEnd,e[Qe])}}function xM(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function Vm(t,n,e){fl(n);try{let r=t.viewQuery;r!==null&&$h(1,r,e);let i=t.template;i!==null&&uw(t,n,i,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[xn]?.finishViewCreation(t),t.staticContentQueries&&B_(t,n),t.staticViewQueries&&$h(2,t.viewQuery,e);let o=t.components;o!==null&&SM(n,o)}catch(r){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),r}finally{n[H]&=-5,hl()}}function SM(t,n){for(let e=0;e<n.length;e++)IM(t,n[e])}function Bm(t,n,e,r){let i=U(null);try{let o=n.tView,a=t[H]&4096?4096:16,c=Mm(t,o,e,a,null,n,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=t[n.index];c[Ir]=l;let d=t[xn];return d!==null&&(c[xn]=d.createEmbeddedView(o)),Vm(o,c,e),c}finally{U(i)}}function Ol(t,n){return!n||n.firstChild===null||R_(t)}function Gs(t,n,e,r,i=!1){for(;e!==null;){if(e.type===128){e=i?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&r.push(Ot(o)),Qt(o)&&gw(o,r);let s=e.type;if(s&8)Gs(t,n,e.child,r);else if(s&32){let a=Am(e,n),c;for(;c=a();)r.push(c)}else if(s&16){let a=lw(n,e);if(Array.isArray(a))r.push(...a);else{let c=wr(n[Et]);Gs(c[j],c,a,r,!0)}}e=i?e.projectionNext:e.next}return r}function gw(t,n){for(let e=it;e<t.length;e++){let r=t[e],i=r[j].firstChild;i!==null&&Gs(r[j],r,i,n)}t[Sr]!==t[Kt]&&n.push(t[Sr])}function vw(t){if(t[ci]!==null){for(let n of t[ci])n.impl.addSequence(n);t[ci].length=0}}var yw=[];function TM(t){return t[Tt]??MM(t)}function MM(t){let n=yw.pop()??Object.create(AM);return n.lView=t,n}function kM(t){t.lView[Tt]!==t&&(t.lView=null,yw.push(t))}var AM=W(b({},zr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{ui(t.lView)},consumerOnSignalRead(){this.lView[Tt]=this}});function RM(t){let n=t[Tt]??Object.create(NM);return n.lView=t,n}var NM=W(b({},zr),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=wr(t.lView);for(;n&&!bw(n[j]);)n=wr(n);n&&ah(n)},consumerOnSignalRead(){this.lView[Tt]=this}});function bw(t){return t.type!==2}function _w(t){if(t[_r]===null)return;let n=!0;for(;n;){let e=!1;for(let r of t[_r])r.dirty&&(e=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));n=e&&!!(t[H]&8192)}}var OM=100;function ww(t,n=0){let r=t[In].rendererFactory,i=!1;i||r.begin?.();try{FM(t,n)}finally{i||r.end?.()}}function FM(t,n){let e=bh();try{xs(!0),tm(t,n);let r=0;for(;js(t);){if(r===OM)throw new _(103,!1);r++,tm(t,1)}}finally{xs(e)}}function PM(t,n,e,r){if(di(n))return;let i=n[H],o=!1,s=!1;fl(n);let a=!0,c=null,l=null;o||(bw(t)?(l=TM(n),c=Gr(l)):cc()===null?(a=!1,l=RM(n),c=Gr(l)):n[Tt]&&(Wr(n[Tt]),n[Tt]=null));try{sh(n),_b(t.bindingStartIndex),e!==null&&uw(t,n,e,2,r);let d=(i&3)===3;if(!o)if(d){let m=t.preOrderCheckHooks;m!==null&&Dl(n,m,null)}else{let m=t.preOrderHooks;m!==null&&Cl(n,m,0,null),Mh(n,0)}if(s||LM(n),_w(n),Ew(n,0),t.contentQueries!==null&&B_(t,n),!o)if(d){let m=t.contentCheckHooks;m!==null&&Dl(n,m)}else{let m=t.contentHooks;m!==null&&Cl(n,m,1),Mh(n,1)}VM(t,n);let u=t.components;u!==null&&Cw(n,u,0);let h=t.viewQuery;if(h!==null&&$h(2,h,r),!o)if(d){let m=t.viewCheckHooks;m!==null&&Dl(n,m)}else{let m=t.viewHooks;m!==null&&Cl(n,m,2),Mh(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[ol]){for(let m of n[ol])m();n[ol]=null}o||(vw(n),n[H]&=-73)}catch(d){throw o||ui(n),d}finally{l!==null&&(Ui(l,c),a&&kM(l)),hl()}}function Ew(t,n){for(let e=O_(t);e!==null;e=F_(e))for(let r=it;r<e.length;r++){let i=e[r];Dw(i,n)}}function LM(t){for(let n=O_(t);n!==null;n=F_(n)){if(!(n[H]&2))continue;let e=n[li];for(let r=0;r<e.length;r++){let i=e[r];ah(i)}}}function jM(t,n,e){ve(ue.ComponentStart);let r=Ft(n,t);try{Dw(r,e)}finally{ve(ue.ComponentEnd,r[Qe])}}function Dw(t,n){al(t)&&tm(t,n)}function tm(t,n){let r=t[j],i=t[H],o=t[Tt],s=!!(n===0&&i&16);if(s||=!!(i&64&&n===0),s||=!!(i&1024),s||=!!(o?.dirty&&ds(o)),s||=!1,o&&(o.dirty=!1),t[H]&=-9217,s)PM(r,t,r.template,t[Qe]);else if(i&8192){let a=U(null);try{_w(t),Ew(t,1);let c=r.components;c!==null&&Cw(t,c,1),vw(t)}finally{U(a)}}}function Cw(t,n,e){for(let r=0;r<n.length;r++)jM(t,n[r],e)}function VM(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let r=0;r<e.length;r++){let i=e[r];if(i<0)Tr(~i);else{let o=i,s=e[++r],a=e[++r];Eb(s,o);let c=n[o];ve(ue.HostBindingsUpdateStart,c);try{a(2,c)}finally{ve(ue.HostBindingsUpdateEnd,c)}}}}finally{Tr(-1)}}function Um(t,n){let e=bh()?64:1088;for(t[In].changeDetectionScheduler?.notify(n);t;){t[H]|=e;let r=wr(t);if(ao(t)&&!r)return t;t=r}return null}function Iw(t,n,e,r){return[t,!0,0,n,null,r,null,e,null,null]}function BM(t,n){let e=it+n;if(e<t.length)return t[e]}function Hm(t,n,e,r=!0){let i=n[j];if(HM(i,n,t,e),r){let s=em(e,t),a=n[Me],c=a.parentNode(t[Sr]);c!==null&&tM(i,t[pt],a,n,c,s)}let o=n[ro];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function UM(t,n){let e=Fl(t,n);return e!==void 0&&Om(e[j],e),e}function Fl(t,n){if(t.length<=it)return;let e=it+n,r=t[e];if(r){let i=r[Ir];i!==null&&i!==t&&Nm(i,r),n>0&&(t[e-1][Nt]=r[Nt]);let o=Os(t,it+n);eM(r[j],r);let s=o[xn];s!==null&&s.detachView(o[j]),r[qe]=null,r[Nt]=null,r[H]&=-129}return r}function HM(t,n,e,r){let i=it+r,o=e.length;r>0&&(e[i-1][Nt]=n),r<o-it?(n[Nt]=e[i],Wf(e,it+r,n)):(e.push(n),n[Nt]=null),n[qe]=e;let s=n[Ir];s!==null&&e!==s&&xw(s,n);let a=n[xn];a!==null&&a.insertView(t),cl(n),n[H]|=128}function xw(t,n){let e=t[li],r=n[qe];if(qn(r))t[H]|=2;else{let i=r[qe][Et];n[Et]!==i&&(t[H]|=2)}e===null?t[li]=[n]:e.push(n)}var Mr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[j];return Gs(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[Qe]}set context(n){this._lView[Qe]=n}get destroyed(){return di(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[qe];if(Qt(n)){let e=n[Ps],r=e?e.indexOf(this):-1;r>-1&&(Fl(n,r),Os(e,r))}this._attachedToViewContainer=!1}Om(this._lView[j],this._lView)}onDestroy(n){ch(this._lView,n)}markForCheck(){Um(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[H]&=-129}reattach(){cl(this._lView),this._lView[H]|=128}detectChanges(){this._lView[H]|=1024,ww(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new _(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=ao(this._lView),e=this._lView[Ir];e!==null&&!n&&Nm(e,this._lView),sw(this._lView[j],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new _(902,!1);this._appRef=n;let e=ao(this._lView),r=this._lView[Ir];r!==null&&!e&&xw(r,this._lView),cl(this._lView)}};var kr=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=$M;constructor(e,r,i){this._declarationLView=e,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,r){return this.createEmbeddedViewImpl(e,r)}createEmbeddedViewImpl(e,r,i){let o=Bm(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:r,dehydratedView:i});return new Mr(o)}}return t})();function $M(){return ed(ot(),J())}function ed(t,n){return t.type&4?new kr(n,t,wo(t,n)):null}function Co(t,n,e,r,i){let o=t.data[n];if(o===null)o=zM(t,n,e,r,i),wb()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=r,o.attrs=i;let s=gb();o.injectorIndex=s===null?-1:s.injectorIndex}return co(o,!0),o}function zM(t,n,e,r,i){let o=gh(),s=vh(),a=s?o:o&&o.parent,c=t.data[n]=WM(t,a,e,n,r,i);return GM(t,c,o,s),c}function GM(t,n,e,r){t.firstChild===null&&(t.firstChild=n),e!==null&&(r?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function WM(t,n,e,r,i,o){let s=n?n.injectorIndex:-1,a=0;return hh()&&(a|=128),{type:e,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,namespace:Dh(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var qM=()=>null,KM=()=>null;function nm(t,n){return qM(t,n)}function QM(t,n,e){return KM(t,n,e)}var Sw=class{},td=class{},rm=class{resolveComponentFactory(n){throw new _(917,!1)}},Zs=class{static NULL=new rm},st=class{},Mt=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>ZM()}return t})();function ZM(){let t=J(),n=ot(),e=Ft(n.index,t);return(qn(e)?e:t)[Me]}var Tw=(()=>{class t{static \u0275prov=y({token:t,providedIn:"root",factory:()=>null})}return t})();var xl={},im=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,r){let i=this.injector.get(n,xl,r);return i!==xl||e===xl?i:this.parentInjector.get(n,e,r)}};function Pl(t,n,e){let r=e?t.styles:null,i=e?t.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)i=Yc(i,a);else if(o==2){let c=a,l=n[++s];r=Yc(r,c+": "+l+";")}}e?t.styles=r:t.stylesWithoutHost=r,e?t.classes=i:t.classesWithoutHost=i}function at(t,n=0){let e=J();if(e===null)return w(t,n);let r=ot();return M_(r,e,Ke(t),n)}function $m(){let t="invalid";throw new Error(t)}function Mw(t,n,e,r,i){let o=r===null?null:{"":-1},s=i(t,e);if(s!==null){let a=s,c=null,l=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,c,l]=d.resolveHostDirectives(s);break}JM(t,n,e,a,o,c,l)}o!==null&&r!==null&&YM(e,r,o)}function YM(t,n,e){let r=t.localNames=[];for(let i=0;i<n.length;i+=2){let o=e[n[i+1]];if(o==null)throw new _(-301,!1);r.push(n[i],o)}}function XM(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function JM(t,n,e,r,i,o,s){let a=r.length,c=null;for(let h=0;h<a;h++){let m=r[h];c===null&&Sn(m)&&(c=m,XM(t,e,h)),Bh(Al(e,n),t,m.type)}ok(e,t.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let h=0;h<a;h++){let m=r[h];m.providersResolver&&m.providersResolver(m)}let l=!1,d=!1,u=tw(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let h=0;h<a;h++){let m=r[h];if(e.mergedAttrs=go(e.mergedAttrs,m.hostAttrs),tk(t,e,n,u,m),ik(u,m,i),s!==null&&s.has(m)){let[v,E]=s.get(m);e.directiveToIndex.set(m.type,[u,v+e.directiveStart,E+e.directiveStart])}else(o===null||!o.has(m))&&e.directiveToIndex.set(m.type,u);m.contentQueries!==null&&(e.flags|=4),(m.hostBindings!==null||m.hostAttrs!==null||m.hostVars!==0)&&(e.flags|=64);let p=m.type.prototype;!l&&(p.ngOnChanges||p.ngOnInit||p.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),l=!0),!d&&(p.ngOnChanges||p.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),u++}ek(t,e,o)}function ek(t,n,e){for(let r=n.directiveStart;r<n.directiveEnd;r++){let i=t.data[r];if(e===null||!e.has(i))t_(0,n,i,r),t_(1,n,i,r),r_(n,r,!1);else{let o=e.get(i);n_(0,n,o,r),n_(1,n,o,r),r_(n,r,!0)}}}function t_(t,n,e,r){let i=t===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(r),kw(n,o)}}function n_(t,n,e,r){let i=t===0?e.inputs:e.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),kw(n,s)}}function kw(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function r_(t,n,e){let{attrs:r,inputs:i,hostDirectiveInputs:o}=t;if(r===null||!e&&i===null||e&&o===null||Sm(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let c=r[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!e&&i.hasOwnProperty(c)){let l=i[c];for(let d of l)if(d===n){s??=[],s.push(c,r[a+1]);break}}else if(e&&o.hasOwnProperty(c)){let l=o[c];for(let d=0;d<l.length;d+=2)if(l[d]===n){s??=[],s.push(l[d+1],r[a+1]);break}}a+=2}t.initialInputs??=[],t.initialInputs.push(s)}function tk(t,n,e,r,i){t.data[r]=i;let o=i.factory||(i.factory=br(i.type,!0)),s=new mi(o,Sn(i),at,null);t.blueprint[r]=s,e[r]=s,nk(t,n,r,tw(t,e,i.hostVars,Dt),i)}function nk(t,n,e,r,i){let o=i.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;rk(s)!=a&&s.push(a),s.push(e,r,o)}}function rk(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function ik(t,n,e){if(e){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)e[n.exportAs[r]]=t;Sn(n)&&(e[""]=t)}}function ok(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function Aw(t,n,e,r,i,o,s,a){let c=n[j],l=c.consts,d=Tn(l,s),u=Co(c,t,e,r,d);return o&&Mw(c,n,u,Tn(l,a),i),u.mergedAttrs=go(u.mergedAttrs,u.attrs),u.attrs!==null&&Pl(u,u.attrs,!1),u.mergedAttrs!==null&&Pl(u,u.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,u),u}function Rw(t,n){__(t,n),th(n)&&t.queries.elementEnd(n)}function sk(t,n,e,r,i,o){let s=n.consts,a=Tn(s,i),c=Co(n,t,e,r,a);if(c.mergedAttrs=go(c.mergedAttrs,c.attrs),o!=null){let l=Tn(s,o);c.localNames=[];for(let d=0;d<l.length;d+=2)c.localNames.push(l[d],-1)}return c.attrs!==null&&Pl(c,c.attrs,!1),c.mergedAttrs!==null&&Pl(c,c.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,c),c}function ak(t,n,e){return t[n]=e}function An(t,n,e){if(e===Dt)return!1;let r=t[n];return Object.is(r,e)?!1:(t[n]=e,!0)}function ck(t,n,e,r){let i=An(t,n,e);return An(t,n+1,r)||i}function Rh(t,n,e){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&sT(i,o);let s=Kn(t)?Ft(t.index,n):n;Um(s,5);let a=n[Qe],c=i_(n,a,e,i),l=r.__ngNextListenerFn__;for(;l;)c=i_(n,a,l,i)&&c,l=l.__ngNextListenerFn__;return c}}function i_(t,n,e,r){let i=U(null);try{return ve(ue.OutputStart,n,e),e(r)!==!1}catch(o){return CM(t,o),!1}finally{ve(ue.OutputEnd,n,e),U(i)}}function lk(t,n,e,r,i,o,s,a){let c=Ls(t),l=!1,d=null;if(!r&&c&&(d=uk(n,e,o,t.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,l=!0}else{let u=Zt(t,e),h=r?r(u):u;cT(e,h,o,a),r||(a.__ngNativeEl__=u);let m=i.listen(h,o,a);if(!dk(o)){let p=r?v=>r(Ot(v[t.index])):t.index;Nw(p,n,e,o,a,m,!1)}}return l}function dk(t){return t.startsWith("animation")||t.startsWith("transition")}function uk(t,n,e,r){let i=t.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===e&&i[o+1]===r){let a=n[io],c=i[o+2];return a&&a.length>c?a[c]:null}typeof s=="string"&&(o+=2)}return null}function Nw(t,n,e,r,i,o,s){let a=n.firstCreatePass?dh(n):null,c=lh(e),l=c.length;c.push(i,o),a&&a.push(r,t,l,(l+1)*(s?-1:1))}function o_(t,n,e,r,i,o){let s=n[e],a=n[j],l=a.data[e].outputs[r],u=s[l].subscribe(o);Nw(t.index,a,n,i,o,u,!0)}var om=Symbol("BINDING");function Ow(t){return t.debugInfo?.className||t.type.name||null}var Ll=class extends Zs{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let e=Cn(n);return new Ar(e,this.ngModule)}};function fk(t){return Object.keys(t).map(n=>{let[e,r,i]=t[n],o={propName:e,templateName:n,isSignal:(r&Zl.SignalBased)!==0};return i&&(o.transform=i),o})}function hk(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function mk(t,n,e){let r=n instanceof Ee?n:n?.injector;return r&&t.getStandaloneInjector!==null&&(r=t.getStandaloneInjector(r)||r),r?new im(e,r):e}function pk(t){let n=t.get(st,null);if(n===null)throw new _(407,!1);let e=t.get(Tw,null),r=t.get(Wn,null),i=t.get(Nn,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function gk(t,n){let e=Fw(t);return K_(n,e,e==="svg"?nh:e==="math"?cb:null)}function Fw(t){return(t.selectors[0][0]||"div").toLowerCase()}var Ar=class extends td{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=fk(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=hk(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){super(),this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=HT(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,r,i,o,s){ve(ue.DynamicComponentStart);let a=U(null);try{let c=this.componentDef,l=mk(c,i||this.ngModule,n),d=pk(l),u=d.tracingService;return u&&u.componentCreate?u.componentCreate(Ow(c),()=>this.createComponentRef(d,l,e,r,o,s)):this.createComponentRef(d,l,e,r,o,s)}finally{U(a)}}createComponentRef(n,e,r,i,o,s){let a=this.componentDef,c=vk(i,a,s,o),l=n.rendererFactory.createRenderer(null,a),d=i?fM(l,i,a.encapsulation,e):gk(a,l),u=s?.some(s_)||o?.some(p=>typeof p!="function"&&p.bindings.some(s_)),h=Mm(null,c,null,512|ew(a),null,null,n,l,e,null,V_(d,e,!0));h[Re]=d,fl(h);let m=null;try{let p=Aw(Re,h,2,"#host",()=>c.directiveRegistry,!0,0);Z_(l,d,p),vo(d,h),Lm(c,h,p),U_(c,p,h),Rw(c,p),r!==void 0&&bk(p,this.ngContentSelectors,r),m=Ft(p.index,h),h[Qe]=m[Qe],Vm(c,h,null)}catch(p){throw m!==null&&Hh(m),Hh(h),p}finally{ve(ue.DynamicComponentEnd),hl()}return new jl(this.componentType,h,!!u)}};function vk(t,n,e,r){let i=t?["ng-version","21.2.17"]:$T(n.selectors[0]),o=null,s=null,a=0;if(e)for(let d of e)a+=d[om].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(r)for(let d=0;d<r.length;d++){let u=r[d];if(typeof u!="function")for(let h of u.bindings){a+=h[om].requiredVars;let m=d+1;h.create&&(h.targetIdx=m,(o??=[]).push(h)),h.update&&(h.targetIdx=m,(s??=[]).push(h))}}let c=[n];if(r)for(let d of r){let u=typeof d=="function"?d:d.type,h=$f(u);c.push(h)}return Tm(0,null,yk(o,s),1,a,c,null,null,null,[i],null)}function yk(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let r of t)r.create();if(e&2&&n)for(let r of n)r.update()}}function s_(t){let n=t[om].kind;return n==="input"||n==="twoWay"}var jl=class extends Sw{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,r){super(),this._rootLView=e,this._hasInputBindings=r,this._tNode=sl(e[j],Re),this.location=wo(this._tNode,e),this.instance=Ft(this._tNode.index,e)[Qe],this.hostView=this.changeDetectorRef=new Mr(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let i=this._rootLView,o=jm(r,i[j],i,n,e);this.previousInputValues.set(n,e);let s=Ft(r.index,i);Um(s,1)}get injector(){return new hi(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function bk(t,n,e){let r=t.projection=[];for(let i=0;i<n.length;i++){let o=e[i];r.push(o!=null&&o.length?Array.from(o):null)}}var Fn=(()=>{class t{static __NG_ELEMENT_ID__=_k}return t})();function _k(){let t=ot();return Pw(t,J())}var sm=class t extends Fn{_lContainer;_hostTNode;_hostLView;constructor(n,e,r){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=r}get element(){return wo(this._hostTNode,this._hostLView)}get injector(){return new hi(this._hostTNode,this._hostLView)}get parentInjector(){let n=vm(this._hostTNode,this._hostLView);if(D_(n)){let e=Ml(n,this._hostLView),r=Tl(n),i=e[j].data[r+8];return new hi(i,e)}else return new hi(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=a_(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-it}createEmbeddedView(n,e,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=nm(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,i,Ol(this._hostTNode,s)),a}createComponent(n,e,r,i,o,s,a){let c=n&&!NS(n),l;if(c)l=e;else{let E=e||{};l=E.index,r=E.injector,i=E.projectableNodes,o=E.environmentInjector||E.ngModuleRef,s=E.directives,a=E.bindings}let d=c?n:new Ar(Cn(n)),u=r||this.parentInjector;if(!o&&d.ngModule==null){let D=(c?u:this.parentInjector).get(Ee,null);D&&(o=D)}let h=Cn(d.componentType??{}),m=nm(this._lContainer,h?.id??null),p=m?.firstChild??null,v=d.create(u,i,p,o,s,a);return this.insertImpl(v.hostView,l,Ol(this._hostTNode,m)),v}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,r){let i=n._lView;if(db(i)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let c=i[qe],l=new t(c,c[pt],c[qe]);l.detach(l.indexOf(n))}}let o=this._adjustIndex(e),s=this._lContainer;return Hm(s,i,o,r),n.attachToViewContainerRef(),Wf(Nh(s),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=a_(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),r=Fl(this._lContainer,e);r&&(Os(Nh(this._lContainer),e),Om(r[j],r))}detach(n){let e=this._adjustIndex(n,-1),r=Fl(this._lContainer,e);return r&&Os(Nh(this._lContainer),e)!=null?new Mr(r):null}_adjustIndex(n,e=0){return n??this.length+e}};function a_(t){return t[Ps]}function Nh(t){return t[Ps]||(t[Ps]=[])}function Pw(t,n){let e,r=n[t.index];return Qt(r)?e=r:(e=Iw(r,n,null,t),n[t.index]=e,km(n,e)),Ek(e,n,t,r),new sm(e,t,n)}function wk(t,n){let e=t[Me],r=e.createComment(""),i=Zt(n,t),o=e.parentNode(i);return Rl(e,o,r,e.nextSibling(i),!1),r}var Ek=Ik,Dk=()=>!1;function Ck(t,n,e){return Dk(t,n,e)}function Ik(t,n,e,r){if(t[Sr])return;let i;e.type&8?i=Ot(r):i=wk(n,e),t[Sr]=i}var am=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},cm=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let r=n.contentQueries!==null?n.contentQueries[0]:e.length,i=[];for(let o=0;o<r;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new t(i)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)zm(n,e).matches!==null&&this.queries[e].setDirty()}},Vl=class{flags;read;predicate;constructor(n,e,r=null){this.flags=e,this.read=r,typeof n=="string"?this.predicate=Nk(n):this.predicate=n}},lm=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let r=0;r<this.length;r++){let i=e!==null?e.length:0,o=this.getByIndex(r).embeddedTView(n,i);o&&(o.indexInDeclarationView=r,e!==null?e.push(o):e=[o])}return e!==null?new t(e):null}template(n,e){for(let r=0;r<this.queries.length;r++)this.queries[r].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},dm=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,r=n.parent;for(;r!==null&&r.type&8&&r.index!==e;)r=r.parent;return e===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(n,e,xk(e,o)),this.matchTNodeWithReadOption(n,e,Il(e,n,o,!1,!1))}else r===kr?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,Il(e,n,r,!1,!1))}matchTNodeWithReadOption(n,e,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===ne||i===Fn||i===kr&&e.type&4)this.addMatch(e.index,-2);else{let o=Il(e,n,i,!1,!1);o!==null&&this.addMatch(e.index,o)}else this.addMatch(e.index,r)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function xk(t,n){let e=t.localNames;if(e!==null){for(let r=0;r<e.length;r+=2)if(e[r]===n)return e[r+1]}return null}function Sk(t,n){return t.type&11?wo(t,n):t.type&4?ed(t,n):null}function Tk(t,n,e,r){return e===-1?Sk(n,t):e===-2?Mk(t,n,r):zs(t,t[j],e,n)}function Mk(t,n,e){if(e===ne)return wo(n,t);if(e===kr)return ed(n,t);if(e===Fn)return Pw(n,t)}function Lw(t,n,e,r){let i=n[xn].queries[r];if(i.matches===null){let o=t.data,s=e.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let l=s[c];if(l<0)a.push(null);else{let d=o[l];a.push(Tk(n,d,s[c+1],e.metadata.read))}}i.matches=a}return i.matches}function um(t,n,e,r){let i=t.queries.getByIndex(e),o=i.matches;if(o!==null){let s=Lw(t,n,i,e);for(let a=0;a<o.length;a+=2){let c=o[a];if(c>0)r.push(s[a/2]);else{let l=o[a+1],d=n[-c];for(let u=it;u<d.length;u++){let h=d[u];h[Ir]===h[qe]&&um(h[j],h,l,r)}if(d[li]!==null){let u=d[li];for(let h=0;h<u.length;h++){let m=u[h];um(m[j],m,l,r)}}}}}return r}function kk(t,n){return t[xn].queries[n].queryList}function jw(t,n,e){let r=new Yn((e&4)===4);return hb(t,n,r,r.destroy),(n[xn]??=new cm).queries.push(new am(r))-1}function Ak(t,n,e){let r=Pe();return r.firstCreatePass&&(Vw(r,new Vl(t,n,e),-1),(n&2)===2&&(r.staticViewQueries=!0)),jw(r,J(),n)}function Rk(t,n,e,r){let i=Pe();if(i.firstCreatePass){let o=ot();Vw(i,new Vl(n,e,r),o.index),Ok(i,t),(e&2)===2&&(i.staticContentQueries=!0)}return jw(i,J(),e)}function Nk(t){return t.split(",").map(n=>n.trim())}function Vw(t,n,e){t.queries===null&&(t.queries=new lm),t.queries.track(new dm(n,e))}function Ok(t,n){let e=t.contentQueries||(t.contentQueries=[]),r=e.length?e[e.length-1]:-1;n!==r&&e.push(t.queries.length-1,n)}function zm(t,n){return t.queries.getByIndex(n)}function Fk(t,n){let e=t[j],r=zm(e,n);return r.crossesNgTemplate?um(e,t,n,[]):Lw(e,t,r,n)}var fm=new Map,Pk=new Set;function Gm(t){return pe(this,null,function*(){let n=fm;fm=new Map;let e=new Map;function r(o){let s=e.get(o);if(s)return s;let a=t(o).then(c=>Lk(o,c));return e.set(o,a),a}let i=Array.from(n).map(a=>pe(null,[a],function*([o,s]){if(s.styleUrl&&s.styleUrls?.length)throw new Error("@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple");let c=[];s.templateUrl&&c.push(r(s.templateUrl).then(h=>{s.template=h}));let l=typeof s.styles=="string"?[s.styles]:s.styles??[];s.styles=l;let{styleUrl:d,styleUrls:u}=s;if(d&&(u=[d],s.styleUrl=void 0),u?.length){let h=Promise.all(u.map(m=>r(m))).then(m=>{l.push(...m),s.styleUrls=void 0});c.push(h)}yield Promise.all(c),Pk.delete(o)}));yield Promise.all(i)})}function Bw(){return fm.size===0}function Lk(t,n){return pe(this,null,function*(){if(typeof n=="string")return n;if(n.status!==void 0&&n.status!==200)throw new _(918,!1);return n.text()})}var pi=class{},nd=class{};var Ws=class extends pi{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Ll(this);constructor(n,e,r,i=!0){super(),this.ngModuleType=n,this._parent=e;let o=Hf(n);this._bootstrapComponents=Y_(o.bootstrap),this._r3Injector=Ch(n,e,[{provide:pi,useValue:this},{provide:Zs,useValue:this.componentFactoryResolver},...r],Ms(n),new Set(["environment"])),i&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},qs=class extends nd{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new Ws(this.moduleType,n,[])}};function Uw(t,n,e){return new Ws(t,n,e,!1)}var Bl=class extends pi{injector;componentFactoryResolver=new Ll(this);instance=null;constructor(n){super();let e=new ii([...n.providers,{provide:pi,useValue:this},{provide:Zs,useValue:this.componentFactoryResolver}],n.parent||no(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function Io(t,n,e=null){return new Bl({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var jk=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let r=Qf(!1,e.type),i=r.length>0?Io([r],this._injector,""):null;this.cachedInjectors.set(e,i)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=y({token:t,providedIn:"environment",factory:()=>new t(w(Ee))})}return t})();function Q(t){return _o(()=>{let n=Hw(t),e=W(b({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection===ym.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?i=>i.get(jk).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??!1,data:t.data||{},encapsulation:t.encapsulation||tn.Emulated,styles:t.styles||mt,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&On("NgStandalone"),$w(e);let r=t.dependencies;return e.directiveDefs=c_(r,Vk),e.pipeDefs=c_(r,Ky),e.id=Hk(e),e})}function Vk(t){return Cn(t)||$f(t)}function x(t){return _o(()=>({type:t.type,bootstrap:t.bootstrap||mt,declarations:t.declarations||mt,imports:t.imports||mt,exports:t.exports||mt,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function Bk(t,n){if(t==null)return Er;let e={};for(let r in t)if(t.hasOwnProperty(r)){let i=t[r],o,s,a,c;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,c=i[3]||null):(o=i,s=i,a=Zl.None,c=null),e[o]=[r,a,c],n[o]=s}return e}function Uk(t){if(t==null)return Er;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function ce(t){return _o(()=>{let n=Hw(t);return $w(n),n})}function Wm(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function Hw(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||Er,exportAs:t.exportAs||null,standalone:t.standalone??!0,signals:t.signals===!0,selectors:t.selectors||mt,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:Bk(t.inputs,n),outputs:Uk(t.outputs),debugInfo:null}}function $w(t){t.features?.forEach(n=>n(t))}function c_(t,n){return t?()=>{let e=typeof t=="function"?t():t,r=[];for(let i of e){let o=n(i);o!==null&&r.push(o)}return r}:null}function Hk(t){let n=0,e=typeof t.consts=="function"?"":t.consts,r=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of r.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function $k(t){return Object.getPrototypeOf(t.prototype).constructor}function ct(t){let n=$k(t.type),e=!0,r=[t];for(;n&&n!==Function.prototype&&n!==Object.prototype;){let i,o=Object.hasOwn(n,As)?n[As]:void 0,s=Object.hasOwn(n,Rs)?n[Rs]:void 0;if(Sn(t))i=o??s;else{if(o)throw new _(903,!1);i=s}if(i){if(e){r.push(i);let c=t;c.inputs=Oh(t.inputs),c.declaredInputs=Oh(t.declaredInputs),c.outputs=Oh(t.outputs);let l=i.hostBindings;l&&Kk(t,l);let d=i.viewQuery,u=i.contentQueries;if(d&&Wk(t,d),u&&qk(t,u),zk(t,i),qy(t.outputs,i.outputs),Sn(i)&&i.data.animation){let h=t.data;h.animation=(h.animation||[]).concat(i.data.animation)}}let a=i.features;if(a)for(let c=0;c<a.length;c++){let l=a[c];l&&l.ngInherit&&l(t),l===ct&&(e=!1)}}n=Object.getPrototypeOf(n)}Gk(r)}function zk(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let r=n.inputs[e];r!==void 0&&(t.inputs[e]=r,t.declaredInputs[e]=n.declaredInputs[e])}}function Gk(t){let n=0,e=null;for(let r=t.length-1;r>=0;r--){let i=t[r];i.hostVars=n+=i.hostVars,i.hostAttrs=go(i.hostAttrs,e=go(e,i.hostAttrs))}}function Oh(t){return t===Er?{}:t===mt?[]:t}function Wk(t,n){let e=t.viewQuery;e?t.viewQuery=(r,i)=>{n(r,i),e(r,i)}:t.viewQuery=n}function qk(t,n){let e=t.contentQueries;e?t.contentQueries=(r,i,o)=>{n(r,i,o),e(r,i,o)}:t.contentQueries=n}function Kk(t,n){let e=t.hostBindings;e?t.hostBindings=(r,i)=>{n(r,i),e(r,i)}:t.hostBindings=n}function zw(t,n,e,r,i,o,s,a){if(e.firstCreatePass){t.mergedAttrs=go(t.mergedAttrs,t.attrs);let d=t.tView=Tm(2,t,i,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}a&&(t.flags|=a),co(t,!1);let c=Zk(e,n,t,r);pl()&&Fm(e,n,c,t),vo(c,n);let l=Iw(c,n,c,t);n[r+Re]=l,km(n,l),Ck(l,t,n)}function Qk(t,n,e,r,i,o,s,a,c,l,d){let u=e+Re,h;return n.firstCreatePass?(h=Co(n,u,4,s||null,a||null),fh()&&Mw(n,t,h,Tn(n.consts,l),hw),__(n,h)):h=n.data[u],zw(h,t,n,e,r,i,o,c),Ls(h)&&Lm(n,t,h),l!=null&&Jl(t,h,d),h}function qm(t,n,e,r,i,o,s,a,c,l,d){let u=e+Re,h;if(n.firstCreatePass){if(h=Co(n,u,4,s||null,a||null),l!=null){let m=Tn(n.consts,l);h.localNames=[];for(let p=0;p<m.length;p+=2)h.localNames.push(m[p],-1)}}else h=n.data[u];return zw(h,t,n,e,r,i,o,c),l!=null&&Jl(t,h,d),h}function bt(t,n,e,r,i,o,s,a){let c=J(),l=Pe(),d=Tn(l.consts,o);return Qk(c,l,t,n,e,r,i,d,void 0,s,a),bt}var Zk=Yk;function Yk(t,n,e,r){return gl(!0),n[Me].createComment("")}var rd=(()=>{class t{log(e){console.log(e)}warn(e){console.warn(e)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function Ys(t){return typeof t=="function"&&t[tt]!==void 0}var id=new g(""),od=new g(""),Xs=(()=>{class t{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(e,r,i){this._ngZone=e,this.registry=r,Xf()&&(this._destroyRef=f(Ze,{optional:!0})??void 0),Km||(Ww(i),i.addToWindow(r)),this._watchAngularEvents(),e.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let e=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),r=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{P.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{e.unsubscribe(),r.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let e=this._callbacks.pop();clearTimeout(e.timeoutId),e.doneCb()}});else{let e=this.getPendingTasks();this._callbacks=this._callbacks.filter(r=>r.updateCb&&r.updateCb(e)?(clearTimeout(r.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(e=>({source:e.source,creationLocation:e.creationLocation,data:e.data})):[]}addCallback(e,r,i){let o=-1;r&&r>0&&(o=setTimeout(()=>{this._callbacks=this._callbacks.filter(s=>s.timeoutId!==o),e()},r)),this._callbacks.push({doneCb:e,timeoutId:o,updateCb:i})}whenStable(e,r,i){if(i&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(e,r,i),this._runCallbacksIfReady()}registerApplication(e){this.registry.registerApplication(e,this)}unregisterApplication(e){this.registry.unregisterApplication(e)}findProviders(e,r,i){return[]}static \u0275fac=function(r){return new(r||t)(w(P),w(Gw),w(od))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),Gw=(()=>{class t{_applications=new Map;registerApplication(e,r){this._applications.set(e,r)}unregisterApplication(e){this._applications.delete(e)}unregisterAllApplications(){this._applications.clear()}getTestability(e){return this._applications.get(e)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(e,r=!0){return Km?.findTestabilityInTree(this,e,r)??null}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();function Ww(t){Km=t}var Km;function Rr(t){return!!t&&typeof t.then=="function"}function sd(t){return!!t&&typeof t.subscribe=="function"}var Qm=new g("");function ad(t){return qt([{provide:Qm,multi:!0,useValue:t}])}var Zm=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,r)=>{this.resolve=e,this.reject=r});appInits=f(Qm,{optional:!0})??[];injector=f(X);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let i of this.appInits){let o=He(this.injector,i);if(Rr(o))e.push(o);else if(sd(o)){let s=new Promise((a,c)=>{o.subscribe({complete:a,error:c})});e.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{r()}).catch(i=>{this.reject(i)}),e.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),cd=new g("");function qw(){of(()=>{let t="";throw new _(600,t)})}function Kw(t){return t.isBoundToModule}var Xk=10;function Ym(t,n){return Array.isArray(n)?n.reduce(Ym,t):b(b({},t),n)}var Ct=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(Pt);afterRenderManager=f(Rm);zonelessEnabled=f(Bs);rootEffectScheduler=f(vl);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new F;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(Zn);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(A(e=>!e))}constructor(){f(Nn,{optional:!0})}whenStable(){let e;return new Promise(r=>{e=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{e.unsubscribe()})}_injector=f(Ee);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,r){return this.bootstrapImpl(e,r)}bootstrapImpl(e,r,i=X.NULL){return this._injector.get(P).run(()=>{ve(ue.BootstrapComponentStart);let s=e instanceof td;if(!this._injector.get(Zm).done){let p="";throw new _(405,p)}let c;s?c=e:c=this._injector.get(Zs).resolveComponentFactory(e),this.componentTypes.push(c.componentType);let l=Kw(c)?void 0:this._injector.get(pi),d=r||c.selector,u=c.create(i,[],d,l),h=u.location.nativeElement,m=u.injector.get(id,null);return m?.registerApplication(h),u.onDestroy(()=>{this.detachView(u.hostView),$s(this.components,u),m?.unregisterApplication(h)}),this._loadComponent(u),ve(ue.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ve(ue.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Yl.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw ve(ue.ChangeDetectionEnd),new _(101,!1);let e=U(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,U(e),this.afterTick.next(),ve(ue.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(st,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<Xk;){ve(ue.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{ve(ue.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!js(i))continue;let o=r&&!this.zonelessEnabled?0:1;ww(i,o),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>js(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let r=e;this._views.push(r),r.attachToAppRef(this)}detachView(e){let r=e;$s(this._views,r),r.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(e),this._injector.get(cd,[]).forEach(i=>i(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>$s(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new _(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function $s(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Le(t,n,e,r){let i=J(),o=lo();if(An(i,o,n)){let s=Pe(),a=ml();wM(a,i,t,n,e,r)}return Le}function er(t,n,e,r,i,o,s,a){On("NgControlFlow");let c=J(),l=Pe(),d=Tn(l.consts,o);return qm(c,l,t,n,e,r,i,d,256,s,a),Xm}function Xm(t,n,e,r,i,o,s,a){On("NgControlFlow");let c=J(),l=Pe(),d=Tn(l.consts,o);return qm(c,l,t,n,e,r,i,d,512,s,a),Xm}function tr(t,n){On("NgControlFlow");let e=J(),r=lo(),i=e[r]!==Dt?e[r]:-1,o=i!==-1?l_(e,Re+i):void 0,s=0;if(An(e,r,t)){let a=U(null);try{if(o!==void 0&&UM(o,s),t!==-1){let c=Re+t,l=l_(e,c),d=Jk(e[j],c),u=QM(l,d,e),h=Bm(e,d,n,{dehydratedView:u});Hm(l,h,s,Ol(d,u))}}finally{U(a)}}else if(o!==void 0){let a=BM(o,s);a!==void 0&&(a[Qe]=n)}}function l_(t,n){return t[n]}function Jk(t,n){return sl(t,n)}function Ie(t,n,e){let r=J(),i=lo();if(An(r,i,n)){let o=Pe(),s=ml();gM(s,r,t,n,r[Me],e)}return Ie}function hm(t,n,e,r,i){jm(n,t,e,i?"class":"style",r)}function C(t,n,e,r){let i=J(),o=i[j],s=t+Re,a=o.firstCreatePass?Aw(s,i,2,n,hw,fh(),e,r):o.data[s];if(Kn(a)){let c=i[In].tracingService;if(c&&c.componentCreate){let l=o.data[a.directiveStart+a.componentOffset];return c.componentCreate(Ow(l),()=>(d_(t,n,i,a,r),C))}}return d_(t,n,i,a,r),C}function d_(t,n,e,r,i){if(mw(r,e,t,n,Qw),Ls(r)){let o=e[j];Lm(o,e,r),U_(o,r,e)}i!=null&&Jl(e,r)}function O(){let t=Pe(),n=ot(),e=pw(n);return t.firstCreatePass&&Rw(t,e),mh(e)&&ph(),uh(),e.classesWithoutHost!=null&&VS(e)&&hm(t,e,J(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&BS(e)&&hm(t,e,J(),e.stylesWithoutHost,!1),O}function Oe(t,n,e,r){return C(t,n,e,r),O(),Oe}function nr(t,n,e,r){let i=J(),o=i[j],s=t+Re,a=o.firstCreatePass?sk(s,o,2,n,e,r):o.data[s];return mw(a,i,t,n,Qw),r!=null&&Jl(i,a),nr}function rr(){let t=ot(),n=pw(t);return mh(n)&&ph(),uh(),rr}function rn(t,n,e,r){return nr(t,n,e,r),rr(),rn}var Qw=(t,n,e,r,i)=>(gl(!0),K_(n[Me],r,Dh()));function ir(){return J()}function ld(t,n,e){let r=J(),i=lo();if(An(r,i,n)){let o=Pe(),s=ml();fw(s,r,t,n,r[Me],e)}return ld}var Js="en-US";var eA=Js;function Zw(t){typeof t=="string"&&(eA=t.toLowerCase().replace(/_/g,"-"))}function ge(t,n,e){let r=J(),i=Pe(),o=ot();return tA(i,r,r[Me],o,t,n,e),ge}function tA(t,n,e,r,i,o,s){let a=!0,c=null;if((r.type&3||s)&&(c??=Rh(r,n,o),lk(r,t,n,s,e,i,o,c)&&(a=!1)),a){let l=r.outputs?.[i],d=r.hostDirectiveOutputs?.[i];if(d&&d.length)for(let u=0;u<d.length;u+=2){let h=d[u],m=d[u+1];c??=Rh(r,n,o),o_(r,n,h,m,i,c)}if(l&&l.length)for(let u of l)c??=Rh(r,n,o),o_(r,n,u,i,i,c)}}function $e(t=1){return Tb(t)}function nA(t,n){let e=null,r=LT(t);for(let i=0;i<n.length;i++){let o=n[i];if(o==="*"){e=i;continue}if(r===null?J_(t,o,!0):BT(r,o))return i}return e}function xe(t){let n=J()[Et][pt];if(!n.projection){let e=t?t.length:1,r=n.projection=tb(e,null),i=r.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=t?nA(o,t):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function te(t,n=0,e,r,i,o){let s=J(),a=Pe(),c=r?t+1:null;c!==null&&qm(s,a,c,r,i,o,null,e);let l=Co(a,Re+t,16,null,e||null);l.projection===null&&(l.projection=n),yh();let u=!s[ro]||hh();s[Et][pt].projection[l.projection]===null&&c!==null?rA(s,a,c):u&&!ql(l)&&lM(a,s,l)}function rA(t,n,e){let r=Re+e,i=n.data[r],o=t[r],s=nm(o,i.tView.ssrId),a=Bm(t,i,void 0,{dehydratedView:s});Hm(o,a,0,Ol(i,s))}function on(t,n,e,r){return Rk(t,n,e,r),on}function Pn(t,n,e){return Ak(t,n,e),Pn}function je(t){let n=J(),e=Pe(),r=_h();ul(r+1);let i=zm(e,r);if(t.dirty&&lb(n)===((i.metadata.flags&2)===2)){if(i.matches===null)t.reset([]);else{let o=Fk(n,r);t.reset(o,JS),t.notifyOnChanges()}return!0}return!1}function Ve(){return kk(J(),_h())}function Lt(t){let n=vb();return ih(n,Re+t)}function wl(t,n){return t<<17|n<<2}function gi(t){return t>>17&32767}function iA(t){return(t&2)==2}function oA(t,n){return t&131071|n<<17}function mm(t){return t|2}function bo(t){return(t&131068)>>2}function Fh(t,n){return t&-131069|n<<2}function sA(t){return(t&1)===1}function pm(t){return t|1}function aA(t,n,e,r,i,o){let s=o?n.classBindings:n.styleBindings,a=gi(s),c=bo(s);t[r]=e;let l=!1,d;if(Array.isArray(e)){let u=e;d=u[1],(d===null||to(u,d)>0)&&(l=!0)}else d=e;if(i)if(c!==0){let h=gi(t[a+1]);t[r+1]=wl(h,a),h!==0&&(t[h+1]=Fh(t[h+1],r)),t[a+1]=oA(t[a+1],r)}else t[r+1]=wl(a,0),a!==0&&(t[a+1]=Fh(t[a+1],r)),a=r;else t[r+1]=wl(c,0),a===0?a=r:t[c+1]=Fh(t[c+1],r),c=r;l&&(t[r+1]=mm(t[r+1])),u_(t,d,r,!0),u_(t,d,r,!1),cA(n,d,t,r,o),s=wl(a,c),o?n.classBindings=s:n.styleBindings=s}function cA(t,n,e,r,i){let o=i?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&to(o,n)>=0&&(e[r+1]=pm(e[r+1]))}function u_(t,n,e,r){let i=t[e+1],o=n===null,s=r?gi(i):bo(i),a=!1;for(;s!==0&&(a===!1||o);){let c=t[s],l=t[s+1];lA(c,n)&&(a=!0,t[s+1]=r?pm(l):mm(l)),s=r?gi(l):bo(l)}a&&(t[e+1]=r?mm(i):pm(i))}function lA(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?to(t,n)>=0:!1}var en={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function dA(t){return t.substring(en.key,en.keyEnd)}function uA(t){return fA(t),Yw(t,Xw(t,0,en.textEnd))}function Yw(t,n){let e=en.textEnd;return e===n?-1:(n=en.keyEnd=hA(t,en.key=n,e),Xw(t,n,e))}function fA(t){en.key=0,en.keyEnd=0,en.value=0,en.valueEnd=0,en.textEnd=t.length}function Xw(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function hA(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function xo(t,n,e){return Jw(t,n,e,!1),xo}function re(t,n){return Jw(t,n,null,!0),re}function or(t){pA(wA,mA,t,!0)}function mA(t,n){for(let e=uA(n);e>=0;e=Yw(n,e))nl(t,dA(n),!0)}function Jw(t,n,e,r){let i=J(),o=Pe(),s=ll(2);if(o.firstUpdatePass&&tE(o,t,s,r),n!==Dt&&An(i,s,n)){let a=o.data[Qn()];nE(o,a,i,i[Me],t,i[s+1]=DA(n,e),r,s)}}function pA(t,n,e,r){let i=Pe(),o=ll(2);i.firstUpdatePass&&tE(i,null,o,r);let s=J();if(e!==Dt&&An(s,o,e)){let a=i.data[Qn()];if(rE(a,r)&&!eE(i,o)){let c=r?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(e=Yc(c,e||"")),hm(i,a,s,e,r)}else EA(i,a,s,s[Me],s[o+1],s[o+1]=_A(t,n,e),r,o)}}function eE(t,n){return n>=t.expandoStartIndex}function tE(t,n,e,r){let i=t.data;if(i[e+1]===null){let o=i[Qn()],s=eE(t,e);rE(o,r)&&n===null&&!s&&(n=!1),n=gA(i,o,n,r),aA(i,o,n,e,s,r)}}function gA(t,n,e,r){let i=Cb(t),o=r?n.residualClasses:n.residualStyles;if(i===null)(r?n.classBindings:n.styleBindings)===0&&(e=Ph(null,t,n,e,r),e=Ks(e,n.attrs,r),o=null);else{let s=n.directiveStylingLast;if(s===-1||t[s]!==i)if(e=Ph(i,t,n,e,r),o===null){let c=vA(t,n,r);c!==void 0&&Array.isArray(c)&&(c=Ph(null,t,n,c[1],r),c=Ks(c,n.attrs,r),yA(t,n,r,c))}else o=bA(t,n,r)}return o!==void 0&&(r?n.residualClasses=o:n.residualStyles=o),e}function vA(t,n,e){let r=e?n.classBindings:n.styleBindings;if(bo(r)!==0)return t[gi(r)]}function yA(t,n,e,r){let i=e?n.classBindings:n.styleBindings;t[gi(i)]=r}function bA(t,n,e){let r,i=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<i;o++){let s=t[o].hostAttrs;r=Ks(r,s,e)}return Ks(r,n.attrs,e)}function Ph(t,n,e,r,i){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=n[a],r=Ks(r,o.hostAttrs,i),o!==t);)a++;return t!==null&&(e.directiveStylingLast=a),r}function Ks(t,n,e){let r=e?1:2,i=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?i=s:i===r&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),nl(t,s,e?!0:n[++o]))}return t===void 0?null:t}function _A(t,n,e){if(e==null||e==="")return mt;let r=[],i=Rn(e);if(Array.isArray(i))for(let o=0;o<i.length;o++)t(r,i[o],!0);else if(i instanceof Set)for(let o of i)t(r,o,!0);else if(typeof i=="object")for(let o in i)i.hasOwnProperty(o)&&t(r,o,i[o]);else typeof i=="string"&&n(r,i);return r}function wA(t,n,e){let r=String(n);r!==""&&!r.includes(" ")&&nl(t,r,e)}function EA(t,n,e,r,i,o,s,a){i===Dt&&(i=mt);let c=0,l=0,d=0<i.length?i[0]:null,u=0<o.length?o[0]:null;for(;d!==null||u!==null;){let h=c<i.length?i[c+1]:void 0,m=l<o.length?o[l+1]:void 0,p=null,v;d===u?(c+=2,l+=2,h!==m&&(p=u,v=m)):u===null||d!==null&&d<u?(c+=2,p=d):(l+=2,p=u,v=m),p!==null&&nE(t,n,e,r,p,v,s,a),d=c<i.length?i[c]:null,u=l<o.length?o[l]:null}}function nE(t,n,e,r,i,o,s,a){if(!(n.type&3))return;let c=t.data,l=c[a+1],d=sA(l)?f_(c,n,e,i,bo(l),s):void 0;if(!Ul(d)){Ul(o)||iA(l)&&(o=f_(c,null,e,i,a,s));let u=rh(Qn(),e);uM(r,s,u,i,o)}}function f_(t,n,e,r,i,o){let s=n===null,a;for(;i>0;){let c=t[i],l=Array.isArray(c),d=l?c[1]:c,u=d===null,h=e[i+1];h===Dt&&(h=u?mt:void 0);let m=u?rl(h,r):d===r?h:void 0;if(l&&!Ul(m)&&(m=rl(c,r)),Ul(m)&&(a=m,s))return a;let p=t[i+1];i=s?gi(p):bo(p)}if(n!==null){let c=o?n.residualClasses:n.residualStyles;c!=null&&(a=rl(c,r))}return a}function Ul(t){return t!==void 0}function DA(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=Ms(Rn(t)))),t}function rE(t,n){return(t.flags&(n?8:16))!==0}function ye(t,n=""){let e=J(),r=Pe(),i=t+Re,o=r.firstCreatePass?Co(r,i,1,n,null):r.data[i],s=CA(r,e,o,n);e[i]=s,pl()&&Fm(r,e,s,o),co(o,!1)}var CA=(t,n,e,r)=>(gl(!0),ST(n[Me],r));function IA(t,n,e,r=""){return An(t,lo(),e)?n+Ns(e)+r:Dt}function xA(t,n,e,r,i,o=""){let s=bb(),a=ck(t,s,e,i);return ll(2),a?n+Ns(e)+r+Ns(i)+o:Dt}function So(t){return Jm("",t),So}function Jm(t,n,e){let r=J(),i=IA(r,t,n,e);return i!==Dt&&iE(r,Qn(),i),Jm}function dd(t,n,e,r,i){let o=J(),s=xA(o,t,n,e,r,i);return s!==Dt&&iE(o,Qn(),s),dd}function iE(t,n,e){let r=rh(n,t);TT(t[Me],r,e)}function h_(t,n,e){let r=Pe();r.firstCreatePass&&oE(n,r.data,r.blueprint,Sn(t),e)}function oE(t,n,e,r,i){if(t=Ke(t),Array.isArray(t))for(let o=0;o<t.length;o++)oE(t[o],n,e,r,i);else{let o=Pe(),s=J(),a=ot(),c=ri(t)?t:Ke(t.provide),l=Yf(t),d=a.providerIndexes&1048575,u=a.directiveStart,h=a.providerIndexes>>20;if(ri(t)||!t.multi){let m=new mi(l,i,at,null),p=jh(c,n,i?d:d+h,u);p===-1?(Bh(Al(a,s),o,c),Lh(o,t,n.length),n.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(m),s.push(m)):(e[p]=m,s[p]=m)}else{let m=jh(c,n,d+h,u),p=jh(c,n,d,d+h),v=m>=0&&e[m],E=p>=0&&e[p];if(i&&!E||!i&&!v){Bh(Al(a,s),o,c);let D=MA(i?TA:SA,e.length,i,r,l,t);!i&&E&&(e[p].providerFactory=D),Lh(o,t,n.length,0),n.push(c),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),e.push(D),s.push(D)}else{let D=sE(e[i?p:m],l,!i&&r);Lh(o,t,m>-1?m:p,D)}!i&&r&&E&&e[p].componentProviders++}}}function Lh(t,n,e,r){let i=ri(n),o=sb(n);if(i||o){let c=(o?Ke(n.useClass):n).prototype.ngOnDestroy;if(c){let l=t.destroyHooks||(t.destroyHooks=[]);if(!i&&n.multi){let d=l.indexOf(e);d===-1?l.push(e,[r,c]):l[d+1].push(r,c)}else l.push(e,c)}}}function sE(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function jh(t,n,e,r){for(let i=e;i<r;i++)if(n[i]===t)return i;return-1}function SA(t,n,e,r,i){return gm(this.multi,[])}function TA(t,n,e,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,c=zs(r,r[j],this.providerFactory.index,i);s=c.slice(0,a),gm(o,s);for(let l=a;l<c.length;l++)s.push(c[l])}else s=[],gm(o,s);return s}function gm(t,n){for(let e=0;e<t.length;e++){let r=t[e];n.push(r())}return n}function MA(t,n,e,r,i,o){let s=new mi(t,e,at,null);return s.multi=[],s.index=n,s.componentProviders=0,sE(s,i,r&&!e),s}function jt(t,n){return e=>{e.providersResolver=(r,i)=>h_(r,i?i(t):t,!1),n&&(e.viewProvidersResolver=(r,i)=>h_(r,i?i(n):n,!0))}}function kA(t,n){let e=t[n];return e===Dt?void 0:e}function AA(t,n,e,r,i,o){let s=n+e;return An(t,s,i)?ak(t,s+1,o?r.call(o,i):r(i)):kA(t,s+1)}function ep(t,n){let e=Pe(),r,i=t+Re;e.firstCreatePass?(r=RA(n,e.pipeRegistry),e.data[i]=r,r.onDestroy&&(e.destroyHooks??=[]).push(i,r.onDestroy)):r=e.data[i];let o=r.factory||(r.factory=br(r.type,!0)),s,a=ht(at);try{let c=kl(!1),l=o();return kl(c),oh(e,J(),i,l),l}finally{ht(a)}}function RA(t,n){if(n)for(let e=n.length-1;e>=0;e--){let r=n[e];if(t===r.name)return r}}function tp(t,n,e){let r=t+Re,i=J(),o=ih(i,r);return NA(i,r)?AA(i,yb(),n,o.transform,e,o):o.transform(e)}function NA(t,n){return t[j].data[n].pure}function ea(t,n){return ed(t,n)}var El=null;function aE(t){El!==null&&(t.defaultEncapsulation!==El.defaultEncapsulation||t.preserveWhitespaces!==El.preserveWhitespaces)||(El=t)}var Hl=class{ngModuleFactory;componentFactories;constructor(n,e){this.ngModuleFactory=n,this.componentFactories=e}},np=(()=>{class t{compileModuleSync(e){return new qs(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}compileModuleAndAllComponentsSync(e){let r=this.compileModuleSync(e),i=Hf(e),o=Y_(i.declarations).reduce((s,a)=>{let c=Cn(a);return c&&s.push(new Ar(c)),s},[]);return new Hl(r,o)}compileModuleAndAllComponentsAsync(e){return Promise.resolve(this.compileModuleAndAllComponentsSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),cE=new g("");var lE=(()=>{class t{applicationErrorHandler=f(Pt);appRef=f(Ct);taskService=f(Zn);ngZone=f(P);zonelessEnabled=f(Bs);tracing=f(Nn,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new we;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ss):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(Th,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Rb:Ih;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ss+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function dE(){return[{provide:Wn,useExisting:lE},{provide:P,useClass:Ts},{provide:Bs,useValue:!0}]}function OA(){return typeof $localize<"u"&&$localize.locale||Js}var ud=new g("",{factory:()=>f(ud,{optional:!0,skipSelf:!0})||OA()});function Ye(t){return Hy(t)}function Nr(t,n){return fc(t,n?.equal)}var pE=Symbol("InputSignalNode#UNSET"),YA=W(b({},hc),{transformFn:void 0,applyValueToInputSignal(t,n){$i(t,n)}});function gE(t,n){let e=Object.create(YA);e.value=t,e.transformFn=n?.transform;function r(){if(Bi(e),e.value===pE){let i=null;throw new _(-950,i)}return e.value}return r[tt]=e,r}var _i=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>zl(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function uE(t,n){return gE(t,n)}function XA(t){return gE(pE,t)}var vE=(uE.required=XA,uE);function JA(t,n,e){let r=new qs(e);return Promise.resolve(r)}function fE(t){for(let n=t.length-1;n>=0;n--)if(t[n]!==void 0)return t[n]}var fd=new g(""),eR=new g("");function ta(t){return!t.moduleRef}function tR(t){let n=ta(t)?t.r3Injector:t.moduleRef.injector,e=n.get(P);return e.run(()=>{ta(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let r=n.get(Pt),i;if(e.runOutsideAngular(()=>{i=e.onError.subscribe({next:r})}),ta(t)){let o=()=>n.destroy(),s=t.platformInjector.get(fd);s.add(o),n.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(fd);s.add(o),t.moduleRef.onDestroy(()=>{$s(t.allPlatformModules,t.moduleRef),i.unsubscribe(),s.delete(o)})}return rR(r,e,()=>{let o=n.get(Zn),s=o.add(),a=n.get(Zm);return a.runInitializers(),a.donePromise.then(()=>{let c=n.get(ud,Js);if(Zw(c||Js),!n.get(eR,!0))return ta(t)?n.get(Ct):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(ta(t)){let d=n.get(Ct);return t.rootComponent!==void 0&&d.bootstrap(t.rootComponent),d}else return yE?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(s)})})})}var yE;function hE(){yE=nR}function nR(t,n){let e=t.injector.get(Ct);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(r=>e.bootstrap(r));else if(t.instance.ngDoBootstrap)t.instance.ngDoBootstrap(e);else throw new _(-403,!1);n.push(t)}function rR(t,n,e){try{let r=e();return Rr(r)?r.catch(i=>{throw n.runOutsideAngular(()=>t(i)),i}):r}catch(r){throw n.runOutsideAngular(()=>t(r)),r}}var bE=(()=>{class t{_injector;_modules=[];_destroyListeners=[];_destroyed=!1;constructor(e){this._injector=e}bootstrapModuleFactory(e,r){let i=[dE(),...r?.applicationProviders??[],Ob],o=Uw(e.moduleType,this.injector,i);return hE(),tR({moduleRef:o,allPlatformModules:this._modules,platformInjector:this.injector})}bootstrapModule(e,r=[]){let i=Ym({},r);return hE(),JA(this.injector,i,e).then(o=>this.bootstrapModuleFactory(o,i))}onDestroy(e){this._destroyListeners.push(e)}get injector(){return this._injector}destroy(){if(this._destroyed)throw new _(404,!1);this._modules.slice().forEach(r=>r.destroy()),this._destroyListeners.forEach(r=>r());let e=this._injector.get(fd,null);e&&(e.forEach(r=>r()),e.clear()),this._destroyed=!0}get destroyed(){return this._destroyed}static \u0275fac=function(r){return new(r||t)(w(X))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})(),ip=null;function iR(t){if(sp())throw new _(400,!1);qw(),ip=t;let n=t.get(bE);return aR(t),n}function op(t,n,e=[]){let r=`Platform: ${n}`,i=new g(r);return(o=[])=>{let s=sp();if(!s){let a=[...e,...o,{provide:i,useValue:!0}];s=t?.(a)??iR(oR(a,r))}return sR(i)}}function oR(t=[],n){return X.create({name:n,providers:[{provide:Fs,useValue:"platform"},{provide:fd,useValue:new Set([()=>ip=null])},...t]})}function sR(t){let n=sp();if(!n)throw new _(-401,!1);return n}function sp(){return ip?.get(bE)??null}function aR(t){let n=t.get(Gl,null);He(t,()=>{n?.forEach(e=>e())})}function _E(){return!1}var cR=1e4;var Q5=cR-1e3;var Xe=(()=>{class t{static __NG_ELEMENT_ID__=lR}return t})();function lR(t){return dR(ot(),J(),(t&16)===16)}function dR(t,n,e){if(Kn(t)&&!e){let r=Ft(t.index,n);return new Mr(r,r)}else if(t.type&175){let r=n[Et];return new Mr(r,n)}return null}var wE=op(null,"core",[]),EE=(()=>{class t{constructor(e){}static \u0275fac=function(r){return new(r||t)(w(Ct))};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();function ke(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function na(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}function DE(t,n){let e=Cn(t),r=n.elementInjector||no();return new Ar(e).create(r,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}function CE(t){let n=Cn(t);if(!n)return null;let e=new Ar(n);return{get selector(){return e.selector},get type(){return e.componentType},get inputs(){return e.inputs},get outputs(){return e.outputs},get ngContentSelectors(){return e.ngContentSelectors},get isStandalone(){return n.standalone},get isSignal(){return n.signals}}}var IE=null;function Ln(){return IE}function ap(t){IE??=t}var ra=class{},sr=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(xE),providedIn:"platform"})}return t})(),cp=new g(""),xE=(()=>{class t extends sr{_location;_history;_doc=f($);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Ln().getBaseHref(this._doc)}onPopState(e){let r=Ln().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",e,!1),()=>r.removeEventListener("popstate",e)}onHashChange(e){let r=Ln().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",e,!1),()=>r.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,r,i){this._history.pushState(e,r,i)}replaceState(e,r,i){this._history.replaceState(e,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function hd(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function SE(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function sn(t){return t&&t[0]!=="?"?`?${t}`:t}var ar=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(pd),providedIn:"root"})}return t})(),md=new g(""),pd=(()=>{class t extends ar{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??f($).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return hd(this._baseHref,e)}path(e=!1){let r=this._platformLocation.pathname+sn(this._platformLocation.search),i=this._platformLocation.hash;return i&&e?`${r}${i}`:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+sn(o));this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+sn(o));this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||t)(w(sr),w(md,8))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Or=(()=>{class t{_subject=new F;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let r=this._locationStrategy.getBaseHref();this._basePath=hR(SE(TE(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,r=""){return this.path()==this.normalize(e+sn(r))}normalize(e){return t.stripTrailingSlash(fR(this._basePath,TE(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,r="",i=null){this._locationStrategy.pushState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+sn(r)),i)}replaceState(e,r="",i=null){this._locationStrategy.replaceState(i,"",e,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+sn(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",r){this._urlChangeListeners.forEach(i=>i(e,r))}subscribe(e,r,i){return this._subject.subscribe({next:e,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=sn;static joinWithSlash=hd;static stripTrailingSlash=SE;static \u0275fac=function(r){return new(r||t)(w(ar))};static \u0275prov=y({token:t,factory:()=>uR(),providedIn:"root"})}return t})();function uR(){return new Or(w(ar))}function fR(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function TE(t){return t.replace(/\/index\.html$/,"")}function hR(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var up=(()=>{class t extends ar{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,r){super(),this._platformLocation=e,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}path(e=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(e){let r=hd(this._baseHref,e);return r.length>0?"#"+r:r}pushState(e,r,i,o){let s=this.prepareExternalUrl(i+sn(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,r,s)}replaceState(e,r,i,o){let s=this.prepareExternalUrl(i+sn(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(r){return new(r||t)(w(sr),w(md,8))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();var ia=(()=>{class t{_viewContainer;_context=new gd;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(e,r){this._viewContainer=e,this._thenTemplateRef=r}set ngIf(e){this._context.$implicit=this._context.ngIf=e,this._updateView()}set ngIfThen(e){ME(e,!1),this._thenTemplateRef=e,this._thenViewRef=null,this._updateView()}set ngIfElse(e){ME(e,!1),this._elseTemplateRef=e,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(e,r){return!0}static \u0275fac=function(r){return new(r||t)(at(Fn),at(kr))};static \u0275dir=ce({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return t})(),gd=class{$implicit=null;ngIf=null};function ME(t,n){if(t&&!t.createEmbeddedView)throw new _(2020,!1)}var fp=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(X);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let r=this._viewContainerRef;if(this._viewRef&&r.remove(r.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let i=this._createContextForwardProxy();this._viewRef=r.createEmbeddedView(this.ngTemplateOutlet,i,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,r,i)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,r,i):!1,get:(e,r,i)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,r,i)}})}static \u0275fac=function(r){return new(r||t)(at(Fn))};static \u0275dir=ce({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[gt]})}return t})();function pR(t,n){return new _(2100,!1)}var lp=class{createSubscription(n,e,r){return Ye(()=>n.subscribe({next:e,error:r}))}dispose(n){Ye(()=>n.unsubscribe())}},dp=class{createSubscription(n,e,r){return n.then(i=>e?.(i),i=>r?.(i)),{unsubscribe:()=>{e=null,r=null}}}dispose(n){n.unsubscribe()}},gR=new dp,vR=new lp,hp=(()=>{class t{_ref;_latestValue=null;markForCheckOnValueUpdate=!0;_subscription=null;_obj=null;_strategy=null;applicationErrorHandler=f(Pt);constructor(e){this._ref=e}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(e){if(!this._obj){if(e)try{this.markForCheckOnValueUpdate=!1,this._subscribe(e)}finally{this.markForCheckOnValueUpdate=!0}return this._latestValue}return e!==this._obj?(this._dispose(),this.transform(e)):this._latestValue}_subscribe(e){this._obj=e,this._strategy=this._selectStrategy(e),this._subscription=this._strategy.createSubscription(e,r=>this._updateLatestValue(e,r),r=>this.applicationErrorHandler(r))}_selectStrategy(e){if(Rr(e))return gR;if(sd(e))return vR;throw pR(t,e)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(e,r){e===this._obj&&(this._latestValue=r,this.markForCheckOnValueUpdate&&this._ref?.markForCheck())}static \u0275fac=function(r){return new(r||t)(at(Xe,16))};static \u0275pipe=Wm({name:"async",type:t,pure:!1})}return t})();var an=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();function oa(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let r=e.indexOf("="),[i,o]=r==-1?[e,""]:[e.slice(0,r),e.slice(r+1)];if(i.trim()===n)return decodeURIComponent(o)}return null}var wi=class{};var pp="browser";function kE(t){return t===pp}var gp=(()=>{class t{static \u0275prov=y({token:t,providedIn:"root",factory:()=>new mp(f($),window)})}return t})(),mp=class{document;window;offset=()=>[0,0];constructor(n,e){this.document=n,this.window=e}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(n,e){this.window.scrollTo(W(b({},e),{left:n[0],top:n[1]}))}scrollToAnchor(n,e){let r=bR(this.document,n);r&&(this.scrollToElement(r,e),r.focus({preventScroll:!0}))}setHistoryScrollRestoration(n){try{this.window.history.scrollRestoration=n}catch(e){console.warn(En(2400,!1))}}scrollToElement(n,e){let r=n.getBoundingClientRect(),i=r.left+this.window.pageXOffset,o=r.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(W(b({},e),{left:i-s[0],top:o-s[1]}))}};function bR(t,n){let e=t.getElementById(n)||t.getElementsByName(n)[0];if(e)return e;if(typeof t.createTreeWalker=="function"&&t.body&&typeof t.body.attachShadow=="function"){let r=t.createTreeWalker(t.body,NodeFilter.SHOW_ELEMENT),i=r.currentNode;for(;i;){let o=i.shadowRoot;if(o){let s=o.getElementById(n)||o.querySelector(`[name="${n}"]`);if(s)return s}i=r.nextNode()}}return null}var sa=class{_doc;constructor(n){this._doc=n}manager},vd=(()=>{class t extends sa{constructor(e){super(e)}supports(e){return!0}addEventListener(e,r,i,o){return e.addEventListener(r,i,o),()=>this.removeEventListener(e,r,i,o)}removeEventListener(e,r,i,o){return e.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||t)(w($))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),_d=new g(""),_p=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,r){this._zone=r,e.forEach(s=>{s.manager=this});let i=e.filter(s=>!(s instanceof vd));this._plugins=i.slice().reverse();let o=e.find(s=>s instanceof vd);o&&this._plugins.push(o)}addEventListener(e,r,i,o){return this._findPluginFor(r).addEventListener(e,r,i,o)}getZone(){return this._zone}_findPluginFor(e){let r=this._eventNameToPlugin.get(e);if(r)return r;if(r=this._plugins.find(o=>o.supports(e)),!r)throw new _(5101,!1);return this._eventNameToPlugin.set(e,r),r}static \u0275fac=function(r){return new(r||t)(w(_d),w(P))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),vp="ng-app-id";function RE(t){for(let n of t)n.remove()}function NE(t,n){let e=n.createElement("style");return e.textContent=t,e}function _R(t,n,e,r){let i=t.head?.querySelectorAll(`style[${vp}="${n}"],link[${vp}="${n}"]`);if(i)for(let o of i)o.removeAttribute(vp),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]})}function bp(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var wp=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,r,i,o={}){this.doc=e,this.appId=r,this.nonce=i,_R(e,r,this.inline,this.external),this.hosts.add(e.head)}addStyles(e,r){for(let i of e)this.addUsage(i,this.inline,NE);r?.forEach(i=>this.addUsage(i,this.external,bp))}removeStyles(e,r){for(let i of e)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(e,r,i){let o=r.get(e);o?o.usage++:r.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(e,this.doc)))})}removeUsage(e,r){let i=r.get(e);i&&(i.usage--,i.usage<=0&&(RE(i.elements),r.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])RE(e);this.hosts.clear()}addHost(e){this.hosts.add(e);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(e,NE(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(e,bp(r,this.doc)))}removeHost(e){this.hosts.delete(e)}addElement(e,r){return this.nonce&&r.setAttribute("nonce",this.nonce),e.appendChild(r)}static \u0275fac=function(r){return new(r||t)(w($),w(Eo),w(yi,8),w(vi))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),yp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Ep=/%COMP%/g;var FE="%COMP%",wR=`_nghost-${FE}`,ER=`_ngcontent-${FE}`,DR=!0,CR=new g("",{factory:()=>DR});function IR(t){return ER.replace(Ep,t)}function xR(t){return wR.replace(Ep,t)}function PE(t,n){return n.map(e=>e.replace(Ep,t))}var la=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,r,i,o,s,a,c=null,l=null){this.eventManager=e,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new aa(e,s,a,this.tracingService)}createRenderer(e,r){if(!e||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(e,r);return i instanceof bd?i.applyToHost(e):i instanceof ca&&i.applyStyles(),i}getOrCreateRenderer(e,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(r.encapsulation){case tn.Emulated:o=new bd(c,l,r,this.appId,d,s,a,u);break;case tn.ShadowDom:return new yd(c,e,r,s,a,this.nonce,u,l);case tn.ExperimentalIsolatedShadowDom:return new yd(c,e,r,s,a,this.nonce,u);default:o=new ca(c,l,r,d,s,a,u);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(r){return new(r||t)(w(_p),w(wp),w(Eo),w(CR),w($),w(P),w(yi),w(Nn,8))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),aa=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,r,i){this.eventManager=n,this.doc=e,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(yp[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(OE(n)?n.content:n).appendChild(e)}insertBefore(n,e,r){n&&(OE(n)?n.content:n).insertBefore(e,r)}removeChild(n,e){e.remove()}selectRootElement(n,e){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new _(-5104,!1);return e||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,r,i){if(i){e=i+":"+e;let o=yp[i];o?n.setAttributeNS(o,e,r):n.setAttribute(e,r)}else n.setAttribute(e,r)}removeAttribute(n,e,r){if(r){let i=yp[r];i?n.removeAttributeNS(i,e):n.removeAttribute(`${r}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,r,i){i&(kn.DashCase|kn.Important)?n.style.setProperty(e,r,i&kn.Important?"important":""):n.style[e]=r}removeStyle(n,e,r){r&kn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,r){n!=null&&(n[e]=r)}setValue(n,e){n.nodeValue=e}listen(n,e,r,i){if(typeof n=="string"&&(n=Ln().getGlobalEventTarget(this.doc,n),!n))throw new _(5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,i)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function OE(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var yd=class extends aa{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,r,i,o,s,a,c){super(n,i,o,a),this.hostEl=e,this.sharedStylesHost=c,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=r.styles;l=PE(r.id,l);for(let u of l){let h=document.createElement("style");s&&h.setAttribute("nonce",s),h.textContent=u,this.shadowRoot.appendChild(h)}let d=r.getExternalStyles?.();if(d)for(let u of d){let h=bp(u,i);s&&h.setAttribute("nonce",s),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,r){return super.insertBefore(this.nodeOrShadowRoot(n),e,r)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ca=class extends aa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,r,i,o,s,a,c){super(n,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=i;let l=r.styles;this.styles=c?PE(c,l):l,this.styleUrls=r.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&yo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},bd=class extends ca{contentAttr;hostAttr;constructor(n,e,r,i,o,s,a,c){let l=i+"-"+r.id;super(n,e,r,o,s,a,c,l),this.contentAttr=IR(l),this.hostAttr=xR(l)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let r=super.createElement(n,e);return super.setAttribute(r,this.contentAttr,""),r}};var wd=class t extends ra{supportsDOMEvents=!0;static makeCurrent(){ap(new t)}onAndCancel(n,e,r,i){return n.addEventListener(e,r,i),()=>{n.removeEventListener(e,r,i)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=SR();return e==null?null:TR(e)}resetBaseElement(){da=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return oa(document.cookie,n)}},da=null;function SR(){return da=da||document.head.querySelector("base"),da?da.getAttribute("href"):null}function TR(t){return new URL(t,document.baseURI).pathname}var Ed=class{addToWindow(n){wt.getAngularTestability=(r,i=!0)=>{let o=n.findTestabilityInTree(r,i);if(o==null)throw new _(5103,!1);return o},wt.getAllAngularTestabilities=()=>n.getAllTestabilities(),wt.getAllAngularRootElements=()=>n.getAllRootElements();let e=r=>{let i=wt.getAllAngularTestabilities(),o=i.length,s=function(){o--,o==0&&r()};i.forEach(a=>{a.whenStable(s)})};wt.frameworkStabilizers||(wt.frameworkStabilizers=[]),wt.frameworkStabilizers.push(e)}findTestabilityInTree(n,e,r){if(e==null)return null;let i=n.getTestability(e);return i??(r?Ln().isShadowRoot(e)?this.findTestabilityInTree(n,e.host,!0):this.findTestabilityInTree(n,e.parentElement,!0):null)}},MR=(()=>{class t{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),LE=["alt","control","meta","shift"],kR={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},AR={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},jE=(()=>{class t extends sa{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,r,i,o){let s=t.parseEventName(r),a=t.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Ln().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let r=e.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=t._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),LE.forEach(l=>{let d=r.indexOf(l);d>-1&&(r.splice(d,1),s+=l+".")}),s+=o,r.length!=0||o.length===0)return null;let c={};return c.domEventName=i,c.fullKey=s,c}static matchEventFullKeyCode(e,r){let i=kR[e.key]||e.key,o="";return r.indexOf("code.")>-1&&(i=e.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),LE.forEach(s=>{if(s!==i){let a=AR[s];a(e)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(e,r,i){return o=>{t.matchEventFullKeyCode(o,e)&&i.runGuarded(()=>r(o))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(r){return new(r||t)(w($))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();function RR(){wd.makeCurrent()}function NR(){return new rt}function OR(){return bm(document),document}var FR=[{provide:vi,useValue:pp},{provide:Gl,useValue:RR,multi:!0},{provide:$,useFactory:OR}],Dp=op(wE,"browser",FR);var PR=[{provide:od,useClass:Ed},{provide:id,useClass:Xs},{provide:Xs,useClass:Xs}],LR=[{provide:Fs,useValue:"root"},{provide:rt,useFactory:NR},{provide:_d,useClass:vd,multi:!0},{provide:_d,useClass:jE,multi:!0},la,wp,_p,{provide:st,useExisting:la},{provide:wi,useClass:MR},[]],ua=(()=>{class t{constructor(){}static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({providers:[...LR,...PR],imports:[an,EE]})}return t})();var Fr=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let r=e.indexOf(":");if(r>0){let i=e.slice(0,r),o=e.slice(r+1).trim();this.addHeaderEntry(i,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,r)=>{this.addHeaderEntry(r,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,r])=>{this.setHeaderEntries(e,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e))})}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,e);let i=(n.op==="a"?this.headers.get(e):void 0)||[];i.push(...r),this.headers.set(e,i);break;case"d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else{let s=this.headers.get(e);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let r=n.toLowerCase();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(e):this.headers.set(r,[e])}setHeaderEntries(n,e){let r=(Array.isArray(e)?e:[e]).map(o=>o.toString()),i=n.toLowerCase();this.headers.set(i,r),this.maybeSetNormalizedName(n,i)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var Cd=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},Id=class{encodeKey(n){return VE(n)}encodeValue(n){return VE(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function jR(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(i=>{let o=i.indexOf("="),[s,a]=o==-1?[n.decodeKey(i),""]:[n.decodeKey(i.slice(0,o)),n.decodeValue(i.slice(o+1))],c=e.get(s)||[];c.push(a),e.set(s,c)}),e}var VR=/%(\d[a-f0-9])/gi,BR={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function VE(t){return encodeURIComponent(t).replace(VR,(n,e)=>BR[e]??n)}function Dd(t){return`${t}`}var cr=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Id,n.fromString){if(n.fromObject)throw new _(2805,!1);this.map=jR(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let r=n.fromObject[e],i=Array.isArray(r)?r.map(Dd):[Dd(r)];this.map.set(e,i)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(r=>{let i=n[r];Array.isArray(i)?i.forEach(o=>{e.push({param:r,value:o,op:"a"})}):e.push({param:r,value:i,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(r=>e+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(Dd(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let r=this.map.get(n.param)||[],i=r.indexOf(Dd(n.value));i!==-1&&r.splice(i,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function UR(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function BE(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function UE(t){return typeof Blob<"u"&&t instanceof Blob}function HE(t){return typeof FormData<"u"&&t instanceof FormData}function HR(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var $E="Content-Type",zE="Accept",WE="text/plain",qE="application/json",$R=`${qE}, ${WE}, */*`,To=class t{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,r,i){this.url=e,this.method=n.toUpperCase();let o;if(UR(this.method)||i?(this.body=r!==void 0?r:null,o=i):o=r,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new _(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new Fr,this.context??=new Cd,!this.params)this.params=new cr,this.urlWithParams=e;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else{let a=e.indexOf("?"),c=a===-1?"?":a<e.length-1?"&":"";this.urlWithParams=e+c+s}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||BE(this.body)||UE(this.body)||HE(this.body)||HR(this.body)?this.body:this.body instanceof cr?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||HE(this.body)?null:UE(this.body)?this.body.type||null:BE(this.body)?null:typeof this.body=="string"?WE:this.body instanceof cr?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?qE:null}clone(n={}){let e=n.method||this.method,r=n.url||this.url,i=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,c=n.mode||this.mode,l=n.redirect||this.redirect,d=n.credentials||this.credentials,u=n.referrer??this.referrer,h=n.integrity||this.integrity,m=n.referrerPolicy||this.referrerPolicy,p=n.transferCache??this.transferCache,v=n.timeout??this.timeout,E=n.body!==void 0?n.body:this.body,D=n.withCredentials??this.withCredentials,k=n.reportProgress??this.reportProgress,Z=n.headers||this.headers,T=n.params||this.params,ie=n.context??this.context;return n.setHeaders!==void 0&&(Z=Object.keys(n.setHeaders).reduce((Y,se)=>Y.set(se,n.setHeaders[se]),Z)),n.setParams&&(T=Object.keys(n.setParams).reduce((Y,se)=>Y.set(se,n.setParams[se]),T)),new t(e,r,E,{params:T,headers:Z,context:ie,reportProgress:k,responseType:i,withCredentials:D,transferCache:p,keepalive:o,cache:a,priority:s,timeout:v,mode:c,redirect:l,credentials:d,referrer:u,integrity:h,referrerPolicy:m})}},Ei=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Ei||{}),ko=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,r="OK"){this.headers=n.headers||new Fr,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||r,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},xd=class t extends ko{constructor(n={}){super(n)}type=Ei.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},fa=class t extends ko{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=Ei.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Mo=class extends ko{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},zR=200,GR=204;var WR=new g("");var qR=/^\)\]\}',?\n/;var Ip=(()=>{class t{xhrFactory;tracingService=f(Nn,{optional:!0});constructor(e){this.xhrFactory=e}maybePropagateTrace(e){return this.tracingService?.propagate?this.tracingService.propagate(e):e}handle(e){if(e.method==="JSONP")throw new _(-2800,!1);let r=this.xhrFactory;return M(null).pipe(We(()=>new V(o=>{let s=r.build();if(s.open(e.method,e.urlWithParams),e.withCredentials&&(s.withCredentials=!0),e.headers.forEach((E,D)=>s.setRequestHeader(E,D.join(","))),e.headers.has(zE)||s.setRequestHeader(zE,$R),!e.headers.has($E)){let E=e.detectContentTypeHeader();E!==null&&s.setRequestHeader($E,E)}if(e.timeout&&(s.timeout=e.timeout),e.responseType){let E=e.responseType.toLowerCase();s.responseType=E!=="json"?E:"text"}let a=e.serializeBody(),c=null,l=()=>{if(c!==null)return c;let E=s.statusText||"OK",D=new Fr(s.getAllResponseHeaders()),k=s.responseURL||e.url;return c=new xd({headers:D,status:s.status,statusText:E,url:k}),c},d=this.maybePropagateTrace(()=>{let{headers:E,status:D,statusText:k,url:Z}=l(),T=null;D!==GR&&(T=typeof s.response>"u"?s.responseText:s.response),D===0&&(D=T?zR:0);let ie=D>=200&&D<300;if(e.responseType==="json"&&typeof T=="string"){let Y=T;T=T.replace(qR,"");try{T=T!==""?JSON.parse(T):null}catch(se){T=Y,ie&&(ie=!1,T={error:se,text:T})}}ie?(o.next(new fa({body:T,headers:E,status:D,statusText:k,url:Z||void 0})),o.complete()):o.error(new Mo({error:T,headers:E,status:D,statusText:k,url:Z||void 0}))}),u=this.maybePropagateTrace(E=>{let{url:D}=l(),k=new Mo({error:E,status:s.status||0,statusText:s.statusText||"Unknown Error",url:D||void 0});o.error(k)}),h=u;e.timeout&&(h=this.maybePropagateTrace(E=>{let{url:D}=l(),k=new Mo({error:new DOMException("Request timed out","TimeoutError"),status:s.status||0,statusText:s.statusText||"Request timeout",url:D||void 0});o.error(k)}));let m=!1,p=this.maybePropagateTrace(E=>{m||(o.next(l()),m=!0);let D={type:Ei.DownloadProgress,loaded:E.loaded};E.lengthComputable&&(D.total=E.total),e.responseType==="text"&&s.responseText&&(D.partialText=s.responseText),o.next(D)}),v=this.maybePropagateTrace(E=>{let D={type:Ei.UploadProgress,loaded:E.loaded};E.lengthComputable&&(D.total=E.total),o.next(D)});return s.addEventListener("load",d),s.addEventListener("error",u),s.addEventListener("timeout",h),s.addEventListener("abort",u),e.reportProgress&&(s.addEventListener("progress",p),a!==null&&s.upload&&s.upload.addEventListener("progress",v)),s.send(a),o.next({type:Ei.Sent}),()=>{s.removeEventListener("error",u),s.removeEventListener("abort",u),s.removeEventListener("load",d),s.removeEventListener("timeout",h),e.reportProgress&&(s.removeEventListener("progress",p),a!==null&&s.upload&&s.upload.removeEventListener("progress",v)),s.readyState!==s.DONE&&s.abort()}})))}static \u0275fac=function(r){return new(r||t)(w(wi))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function KE(t,n){return n(t)}function KR(t,n){return(e,r)=>n.intercept(e,{handle:i=>t(i,r)})}function QR(t,n,e){return(r,i)=>He(e,()=>n(r,o=>t(o,i)))}var QE=new g(""),xp=new g("",{factory:()=>[]}),ZE=new g(""),Sp=new g("",{factory:()=>!0});function ZR(){let t=null;return(n,e)=>{t===null&&(t=(f(QE,{optional:!0})??[]).reduceRight(KR,KE));let r=f(ho);if(f(Sp)){let o=r.add();return t(n,e).pipe(yr(o))}else return t(n,e)}}var Tp=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:function(r){let i=null;return r?i=new(r||t):i=w(Ip),i},providedIn:"root"})}return t})();var Sd=(()=>{class t{backend;injector;chain=null;pendingTasks=f(ho);contributeToStability=f(Sp);constructor(e,r){this.backend=e,this.injector=r}handle(e){if(this.chain===null){let r=Array.from(new Set([...this.injector.get(xp),...this.injector.get(ZE,[])]));this.chain=r.reduceRight((i,o)=>QR(i,o,this.injector),KE)}if(this.contributeToStability){let r=this.pendingTasks.add();return this.chain(e,i=>this.backend.handle(i)).pipe(yr(r))}else return this.chain(e,r=>this.backend.handle(r))}static \u0275fac=function(r){return new(r||t)(w(Tp),w(Ee))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Mp=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:function(r){let i=null;return r?i=new(r||t):i=w(Sd),i},providedIn:"root"})}return t})();function Cp(t,n){return{body:n,headers:t.headers,context:t.context,observe:t.observe,params:t.params,reportProgress:t.reportProgress,responseType:t.responseType,withCredentials:t.withCredentials,credentials:t.credentials,transferCache:t.transferCache,timeout:t.timeout,keepalive:t.keepalive,priority:t.priority,cache:t.cache,mode:t.mode,redirect:t.redirect,integrity:t.integrity,referrer:t.referrer,referrerPolicy:t.referrerPolicy}}var Ao=(()=>{class t{handler;constructor(e){this.handler=e}request(e,r,i={}){let o;if(e instanceof To)o=e;else{let c;i.headers instanceof Fr?c=i.headers:c=new Fr(i.headers);let l;i.params&&(i.params instanceof cr?l=i.params:l=new cr({fromObject:i.params})),o=new To(e,r,i.body!==void 0?i.body:null,{headers:c,context:i.context,params:l,reportProgress:i.reportProgress,responseType:i.responseType||"json",withCredentials:i.withCredentials,transferCache:i.transferCache,keepalive:i.keepalive,priority:i.priority,cache:i.cache,mode:i.mode,redirect:i.redirect,credentials:i.credentials,referrer:i.referrer,referrerPolicy:i.referrerPolicy,integrity:i.integrity,timeout:i.timeout})}let s=M(o).pipe(_n(c=>this.handler.handle(c)));if(e instanceof To||i.observe==="events")return s;let a=s.pipe(ae(c=>c instanceof fa));switch(i.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new _(2806,!1);return c.body}));case"blob":return a.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new _(2807,!1);return c.body}));case"text":return a.pipe(A(c=>{if(c.body!==null&&typeof c.body!="string")throw new _(2808,!1);return c.body}));default:return a.pipe(A(c=>c.body))}case"response":return a;default:throw new _(2809,!1)}}delete(e,r={}){return this.request("DELETE",e,r)}get(e,r={}){return this.request("GET",e,r)}head(e,r={}){return this.request("HEAD",e,r)}jsonp(e,r){return this.request("JSONP",e,{params:new cr().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,r={}){return this.request("OPTIONS",e,r)}patch(e,r,i={}){return this.request("PATCH",e,Cp(i,r))}post(e,r,i={}){return this.request("POST",e,Cp(i,r))}put(e,r,i={}){return this.request("PUT",e,Cp(i,r))}static \u0275fac=function(r){return new(r||t)(w(Mp))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var YR=new g("",{factory:()=>!0}),XR="XSRF-TOKEN",JR=new g("",{factory:()=>XR}),eN="X-XSRF-TOKEN",tN=new g("",{factory:()=>eN}),nN=(()=>{class t{cookieName=f(JR);doc=f($);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=oa(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),YE=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:function(r){let i=null;return r?i=new(r||t):i=w(nN),i},providedIn:"root"})}return t})();function rN(t,n){if(!f(YR)||t.method==="GET"||t.method==="HEAD")return n(t);try{let i=f(sr).href,{origin:o}=new URL(i),{origin:s}=new URL(t.url,o);if(o!==s)return n(t)}catch(i){return n(t)}let e=f(YE).getToken(),r=f(tN);return e!=null&&!t.headers.has(r)&&(t=t.clone({headers:t.headers.set(r,e)})),n(t)}var kp=(function(t){return t[t.Interceptors=0]="Interceptors",t[t.LegacyInterceptors=1]="LegacyInterceptors",t[t.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",t[t.NoXsrfProtection=3]="NoXsrfProtection",t[t.JsonpSupport=4]="JsonpSupport",t[t.RequestsMadeViaParent=5]="RequestsMadeViaParent",t[t.Fetch=6]="Fetch",t})(kp||{});function iN(t,n){return{\u0275kind:t,\u0275providers:n}}function XE(...t){let n=[Ao,Sd,{provide:Mp,useExisting:Sd},{provide:Tp,useFactory:()=>f(WR,{optional:!0})??f(Ip)},{provide:xp,useValue:rN,multi:!0}];for(let e of t)n.push(...e.\u0275providers);return qt(n)}var GE=new g("");function JE(){return iN(kp.LegacyInterceptors,[{provide:GE,useFactory:ZR},{provide:xp,useExisting:GE,multi:!0}])}var Td=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({providers:[XE(JE())]})}return t})();var tD=(()=>{class t{_doc;constructor(e){this._doc=e}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||""}static \u0275fac=function(r){return new(r||t)(w($))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ap=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:function(r){let i=null;return r?i=new(r||t):i=w(oN),i},providedIn:"root"})}return t})(),oN=(()=>{class t extends Ap{_doc;constructor(e){super(),this._doc=e}sanitize(e,r){if(r==null)return null;switch(e){case yt.NONE:return r;case yt.HTML:return bi(r,"HTML")?Rn(r):xm(this._doc,String(r)).toString();case yt.STYLE:return bi(r,"Style")?Rn(r):r;case yt.SCRIPT:if(bi(r,"Script"))return Rn(r);throw new _(5200,!1);case yt.URL:return bi(r,"URL")?Rn(r):Ql(String(r));case yt.RESOURCE_URL:if(bi(r,"ResourceURL"))return Rn(r);throw new _(5201,!1);default:throw new _(5202,!1)}}bypassSecurityTrustHtml(e){return wm(e)}bypassSecurityTrustStyle(e){return Em(e)}bypassSecurityTrustScript(e){return Dm(e)}bypassSecurityTrustUrl(e){return Cm(e)}bypassSecurityTrustResourceUrl(e){return Im(e)}static \u0275fac=function(r){return new(r||t)(w($))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ee=(function(t){return t[t.State=0]="State",t[t.Transition=1]="Transition",t[t.Sequence=2]="Sequence",t[t.Group=3]="Group",t[t.Animate=4]="Animate",t[t.Keyframes=5]="Keyframes",t[t.Style=6]="Style",t[t.Trigger=7]="Trigger",t[t.Reference=8]="Reference",t[t.AnimateChild=9]="AnimateChild",t[t.AnimateRef=10]="AnimateRef",t[t.Query=11]="Query",t[t.Stagger=12]="Stagger",t})(ee||{}),cn="*";function nD(t,n=null){return{type:ee.Sequence,steps:t,options:n}}function Np(t){return{type:ee.Style,styles:t,offset:null}}var lr=class{_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_originalOnDoneFns=[];_originalOnStartFns=[];_started=!1;_destroyed=!1;_finished=!1;_position=0;parentPlayer=null;totalTime;constructor(n=0,e=0){this.totalTime=n+e}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(n=>n()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(n){this._position=this.totalTime?n*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(r=>r()),e.length=0}},Ro=class{_onDoneFns=[];_onStartFns=[];_finished=!1;_started=!1;_destroyed=!1;_onDestroyFns=[];parentPlayer=null;totalTime=0;players;constructor(n){this.players=n;let e=0,r=0,i=0,o=this.players.length;o==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(s=>{s.onDone(()=>{++e==o&&this._onFinish()}),s.onDestroy(()=>{++r==o&&this._onDestroy()}),s.onStart(()=>{++i==o&&this._onStart()})}),this.totalTime=this.players.reduce((s,a)=>Math.max(s,a.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this.players.forEach(n=>n.init())}onStart(n){this._onStartFns.push(n)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(n=>n()),this._onStartFns=[])}onDone(n){this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(n=>n.play())}pause(){this.players.forEach(n=>n.pause())}restart(){this.players.forEach(n=>n.restart())}finish(){this._onFinish(),this.players.forEach(n=>n.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(n=>n.destroy()),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}reset(){this.players.forEach(n=>n.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(n){let e=n*this.totalTime;this.players.forEach(r=>{let i=r.totalTime?Math.min(1,e/r.totalTime):1;r.setPosition(i)})}getPosition(){let n=this.players.reduce((e,r)=>e===null||r.totalTime>e.totalTime?r:e,null);return n!=null?n.getPosition():0}beforeDestroy(){this.players.forEach(n=>{n.beforeDestroy&&n.beforeDestroy()})}triggerCallback(n){let e=n=="start"?this._onStartFns:this._onDoneFns;e.forEach(r=>r()),e.length=0}},ha="!";function rD(t){return new _(3e3,!1)}function sN(){return new _(3100,!1)}function aN(){return new _(3101,!1)}function cN(t){return new _(3001,!1)}function lN(t){return new _(3003,!1)}function dN(t){return new _(3004,!1)}function oD(t,n){return new _(3005,!1)}function sD(){return new _(3006,!1)}function aD(){return new _(3007,!1)}function cD(t,n){return new _(3008,!1)}function lD(t){return new _(3002,!1)}function dD(t,n,e,r,i){return new _(3010,!1)}function uD(){return new _(3011,!1)}function fD(){return new _(3012,!1)}function hD(){return new _(3200,!1)}function mD(){return new _(3202,!1)}function pD(){return new _(3013,!1)}function gD(t){return new _(3014,!1)}function vD(t){return new _(3015,!1)}function yD(t){return new _(3016,!1)}function bD(t,n){return new _(3404,!1)}function uN(t){return new _(3502,!1)}function _D(t){return new _(3503,!1)}function wD(){return new _(3300,!1)}function ED(t){return new _(3504,!1)}function DD(t){return new _(3301,!1)}function CD(t,n){return new _(3302,!1)}function ID(t){return new _(3303,!1)}function xD(t,n){return new _(3400,!1)}function SD(t){return new _(3401,!1)}function TD(t){return new _(3402,!1)}function MD(t,n){return new _(3505,!1)}function dr(t){switch(t.length){case 0:return new lr;case 1:return t[0];default:return new Ro(t)}}function Lp(t,n,e=new Map,r=new Map){let i=[],o=[],s=-1,a=null;if(n.forEach(c=>{let l=c.get("offset"),d=l==s,u=d&&a||new Map;c.forEach((h,m)=>{let p=m,v=h;if(m!=="offset")switch(p=t.normalizePropertyName(p,i),v){case ha:v=e.get(m);break;case cn:v=r.get(m);break;default:v=t.normalizeStyleValue(m,p,v,i);break}u.set(p,v)}),d||o.push(u),a=u,s=l}),i.length)throw uN(i);return o}function Md(t,n,e,r){switch(n){case"start":t.onStart(()=>r(e&&Op(e,"start",t)));break;case"done":t.onDone(()=>r(e&&Op(e,"done",t)));break;case"destroy":t.onDestroy(()=>r(e&&Op(e,"destroy",t)));break}}function Op(t,n,e){let r=e.totalTime,i=!!e.disabled,o=kd(t.element,t.triggerName,t.fromState,t.toState,n||t.phaseName,r??t.totalTime,i),s=t._data;return s!=null&&(o._data=s),o}function kd(t,n,e,r,i="",o=0,s){return{element:t,triggerName:n,fromState:e,toState:r,phaseName:i,totalTime:o,disabled:!!s}}function It(t,n,e){let r=t.get(n);return r||t.set(n,r=e),r}function jp(t){let n=t.indexOf(":"),e=t.substring(1,n),r=t.slice(n+1);return[e,r]}var fN=typeof document>"u"?null:document.documentElement;function Ad(t){let n=t.parentNode||t.host||null;return n===fN?null:n}function hN(t){return t.substring(1,6)=="ebkit"}var Di=null,iD=!1;function kD(t){Di||(Di=mN()||{},iD=Di.style?"WebkitAppearance"in Di.style:!1);let n=!0;return Di.style&&!hN(t)&&(n=t in Di.style,!n&&iD&&(n="Webkit"+t.charAt(0).toUpperCase()+t.slice(1)in Di.style)),n}function mN(){return typeof document<"u"?document.body:null}function Vp(t,n){for(;n;){if(n===t)return!0;n=Ad(n)}return!1}function Bp(t,n,e){if(e)return Array.from(t.querySelectorAll(n));let r=t.querySelector(n);return r?[r]:[]}var pN=1e3,Up="{{",gN="}}",Hp="ng-enter",Rd="ng-leave",ma="ng-trigger",pa=".ng-trigger",$p="ng-animating",Nd=".ng-animating";function jn(t){if(typeof t=="number")return t;let n=t.match(/^(-?[\.\d]+)(m?s)/);return!n||n.length<2?0:Fp(parseFloat(n[1]),n[2])}function Fp(t,n){return n==="s"?t*pN:t}function ga(t,n,e){return t.hasOwnProperty("duration")?t:yN(t,n,e)}var vN=/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;function yN(t,n,e){let r,i=0,o="";if(typeof t=="string"){let s=t.match(vN);if(s===null)return n.push(rD(t)),{duration:0,delay:0,easing:""};r=Fp(parseFloat(s[1]),s[2]);let a=s[3];a!=null&&(i=Fp(parseFloat(a),s[4]));let c=s[5];c&&(o=c)}else r=t;if(!e){let s=!1,a=n.length;r<0&&(n.push(sN()),s=!0),i<0&&(n.push(aN()),s=!0),s&&n.splice(a,0,rD(t))}return{duration:r,delay:i,easing:o}}function AD(t){return t.length?t[0]instanceof Map?t:t.map(n=>new Map(Object.entries(n))):[]}function ln(t,n,e){n.forEach((r,i)=>{let o=Od(i);e&&!e.has(i)&&e.set(i,t.style[o]),t.style[o]=r})}function Pr(t,n){n.forEach((e,r)=>{let i=Od(r);t.style[i]=""})}function No(t){return Array.isArray(t)?t.length==1?t[0]:nD(t):t}function RD(t,n,e){let r=n.params||{},i=zp(t);i.length&&i.forEach(o=>{r.hasOwnProperty(o)||e.push(cN(o))})}var Pp=new RegExp(`${Up}\\s*(.+?)\\s*${gN}`,"g");function zp(t){let n=[];if(typeof t=="string"){let e;for(;e=Pp.exec(t);)n.push(e[1]);Pp.lastIndex=0}return n}function Oo(t,n,e){let r=`${t}`,i=r.replace(Pp,(o,s)=>{let a=n[s];return a==null&&(e.push(lN(s)),a=""),a.toString()});return i==r?t:i}var bN=/-+([a-z0-9])/g;function Od(t){return t.replace(bN,(...n)=>n[1].toUpperCase())}function ND(t,n){return t===0||n===0}function OD(t,n,e){if(e.size&&n.length){let r=n[0],i=[];if(e.forEach((o,s)=>{r.has(s)||i.push(s),r.set(s,o)}),i.length)for(let o=1;o<n.length;o++){let s=n[o];i.forEach(a=>s.set(a,Fd(t,a)))}}return n}function xt(t,n,e){switch(n.type){case ee.Trigger:return t.visitTrigger(n,e);case ee.State:return t.visitState(n,e);case ee.Transition:return t.visitTransition(n,e);case ee.Sequence:return t.visitSequence(n,e);case ee.Group:return t.visitGroup(n,e);case ee.Animate:return t.visitAnimate(n,e);case ee.Keyframes:return t.visitKeyframes(n,e);case ee.Style:return t.visitStyle(n,e);case ee.Reference:return t.visitReference(n,e);case ee.AnimateChild:return t.visitAnimateChild(n,e);case ee.AnimateRef:return t.visitAnimateRef(n,e);case ee.Query:return t.visitQuery(n,e);case ee.Stagger:return t.visitStagger(n,e);default:throw dN(n.type)}}function Fd(t,n){return window.getComputedStyle(t)[n]}var ag=(()=>{class t{validateStyleProperty(e){return kD(e)}containsElement(e,r){return Vp(e,r)}getParentElement(e){return Ad(e)}query(e,r,i){return Bp(e,r,i)}computeStyle(e,r,i){return i||""}animate(e,r,i,o,s,a=[],c){return new lr(i,o)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),Ii=class{static NOOP=new ag},xi=class{};var _N=new Set(["width","height","minWidth","minHeight","maxWidth","maxHeight","left","top","bottom","right","fontSize","outlineWidth","outlineOffset","paddingTop","paddingLeft","paddingBottom","paddingRight","marginTop","marginLeft","marginBottom","marginRight","borderRadius","borderWidth","borderTopWidth","borderLeftWidth","borderRightWidth","borderBottomWidth","textIndent","perspective"]),Bd=class extends xi{normalizePropertyName(n,e){return Od(n)}normalizeStyleValue(n,e,r,i){let o="",s=r.toString().trim();if(_N.has(e)&&r!==0&&r!=="0")if(typeof r=="number")o="px";else{let a=r.match(/^[+-]?[\d\.]+([a-z]*)$/);a&&a[1].length==0&&i.push(oD(n,r))}return s+o}};var Ud="*";function wN(t,n){let e=[];return typeof t=="string"?t.split(/\s*,\s*/).forEach(r=>EN(r,e,n)):e.push(t),e}function EN(t,n,e){if(t[0]==":"){let c=DN(t,e);if(typeof c=="function"){n.push(c);return}t=c}let r=t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);if(r==null||r.length<4)return e.push(vD(t)),n;let i=r[1],o=r[2],s=r[3];n.push(FD(i,s));let a=i==Ud&&s==Ud;o[0]=="<"&&!a&&n.push(FD(s,i))}function DN(t,n){switch(t){case":enter":return"void => *";case":leave":return"* => void";case":increment":return(e,r)=>parseFloat(r)>parseFloat(e);case":decrement":return(e,r)=>parseFloat(r)<parseFloat(e);default:return n.push(yD(t)),"* => *"}}var Pd=new Set(["true","1"]),Ld=new Set(["false","0"]);function FD(t,n){let e=Pd.has(t)||Ld.has(t),r=Pd.has(n)||Ld.has(n);return(i,o)=>{let s=t==Ud||t==i,a=n==Ud||n==o;return!s&&e&&typeof i=="boolean"&&(s=i?Pd.has(t):Ld.has(t)),!a&&r&&typeof o=="boolean"&&(a=o?Pd.has(n):Ld.has(n)),s&&a}}var GD=":self",CN=new RegExp(`s*${GD}s*,?`,"g");function WD(t,n,e,r){return new Zp(t).build(n,e,r)}var PD="",Zp=class{_driver;constructor(n){this._driver=n}build(n,e,r){let i=new Yp(e);return this._resetContextStyleTimingState(i),xt(this,No(n),i)}_resetContextStyleTimingState(n){n.currentQuerySelector=PD,n.collectedStyles=new Map,n.collectedStyles.set(PD,new Map),n.currentTime=0}visitTrigger(n,e){let r=e.queryCount=0,i=e.depCount=0,o=[],s=[];return n.name.charAt(0)=="@"&&e.errors.push(sD()),n.definitions.forEach(a=>{if(this._resetContextStyleTimingState(e),a.type==ee.State){let c=a,l=c.name;l.toString().split(/\s*,\s*/).forEach(d=>{c.name=d,o.push(this.visitState(c,e))}),c.name=l}else if(a.type==ee.Transition){let c=this.visitTransition(a,e);r+=c.queryCount,i+=c.depCount,s.push(c)}else e.errors.push(aD())}),{type:ee.Trigger,name:n.name,states:o,transitions:s,queryCount:r,depCount:i,options:null}}visitState(n,e){let r=this.visitStyle(n.styles,e),i=n.options&&n.options.params||null;if(r.containsDynamicStyles){let o=new Set,s=i||{};r.styles.forEach(a=>{a instanceof Map&&a.forEach(c=>{zp(c).forEach(l=>{s.hasOwnProperty(l)||o.add(l)})})}),o.size&&e.errors.push(cD(n.name,[...o.values()]))}return{type:ee.State,name:n.name,style:r,options:i?{params:i}:null}}visitTransition(n,e){e.queryCount=0,e.depCount=0;let r=xt(this,No(n.animation),e),i=wN(n.expr,e.errors);return{type:ee.Transition,matchers:i,animation:r,queryCount:e.queryCount,depCount:e.depCount,options:Ci(n.options)}}visitSequence(n,e){return{type:ee.Sequence,steps:n.steps.map(r=>xt(this,r,e)),options:Ci(n.options)}}visitGroup(n,e){let r=e.currentTime,i=0,o=n.steps.map(s=>{e.currentTime=r;let a=xt(this,s,e);return i=Math.max(i,e.currentTime),a});return e.currentTime=i,{type:ee.Group,steps:o,options:Ci(n.options)}}visitAnimate(n,e){let r=TN(n.timings,e.errors);e.currentAnimateTimings=r;let i,o=n.styles?n.styles:Np({});if(o.type==ee.Keyframes)i=this.visitKeyframes(o,e);else{let s=n.styles,a=!1;if(!s){a=!0;let l={};r.easing&&(l.easing=r.easing),s=Np(l)}e.currentTime+=r.duration+r.delay;let c=this.visitStyle(s,e);c.isEmptyStep=a,i=c}return e.currentAnimateTimings=null,{type:ee.Animate,timings:r,style:i,options:null}}visitStyle(n,e){let r=this._makeStyleAst(n,e);return this._validateStyleAst(r,e),r}_makeStyleAst(n,e){let r=[],i=Array.isArray(n.styles)?n.styles:[n.styles];for(let a of i)typeof a=="string"?a===cn?r.push(a):e.errors.push(lD(a)):r.push(new Map(Object.entries(a)));let o=!1,s=null;return r.forEach(a=>{if(a instanceof Map&&(a.has("easing")&&(s=a.get("easing"),a.delete("easing")),!o)){for(let c of a.values())if(c.toString().indexOf(Up)>=0){o=!0;break}}}),{type:ee.Style,styles:r,easing:s,offset:n.offset,containsDynamicStyles:o,options:null}}_validateStyleAst(n,e){let r=e.currentAnimateTimings,i=e.currentTime,o=e.currentTime;r&&o>0&&(o-=r.duration+r.delay),n.styles.forEach(s=>{typeof s!="string"&&s.forEach((a,c)=>{let l=e.collectedStyles.get(e.currentQuerySelector),d=l.get(c),u=!0;d&&(o!=i&&o>=d.startTime&&i<=d.endTime&&(e.errors.push(dD(c,d.startTime,d.endTime,o,i)),u=!1),o=d.startTime),u&&l.set(c,{startTime:o,endTime:i}),e.options&&RD(a,e.options,e.errors)})})}visitKeyframes(n,e){let r={type:ee.Keyframes,styles:[],options:null};if(!e.currentAnimateTimings)return e.errors.push(uD()),r;let i=1,o=0,s=[],a=!1,c=!1,l=0,d=n.steps.map(D=>{let k=this._makeStyleAst(D,e),Z=k.offset!=null?k.offset:SN(k.styles),T=0;return Z!=null&&(o++,T=k.offset=Z),c=c||T<0||T>1,a=a||T<l,l=T,s.push(T),k});c&&e.errors.push(fD()),a&&e.errors.push(hD());let u=n.steps.length,h=0;o>0&&o<u?e.errors.push(mD()):o==0&&(h=i/(u-1));let m=u-1,p=e.currentTime,v=e.currentAnimateTimings,E=v.duration;return d.forEach((D,k)=>{let Z=h>0?k==m?1:h*k:s[k],T=Z*E;e.currentTime=p+v.delay+T,v.duration=T,this._validateStyleAst(D,e),D.offset=Z,r.styles.push(D)}),r}visitReference(n,e){return{type:ee.Reference,animation:xt(this,No(n.animation),e),options:Ci(n.options)}}visitAnimateChild(n,e){return e.depCount++,{type:ee.AnimateChild,options:Ci(n.options)}}visitAnimateRef(n,e){return{type:ee.AnimateRef,animation:this.visitReference(n.animation,e),options:Ci(n.options)}}visitQuery(n,e){let r=e.currentQuerySelector,i=n.options||{};e.queryCount++,e.currentQuery=n;let[o,s]=IN(n.selector);e.currentQuerySelector=r.length?r+" "+o:o,It(e.collectedStyles,e.currentQuerySelector,new Map);let a=xt(this,No(n.animation),e);return e.currentQuery=null,e.currentQuerySelector=r,{type:ee.Query,selector:o,limit:i.limit||0,optional:!!i.optional,includeSelf:s,animation:a,originalSelector:n.selector,options:Ci(n.options)}}visitStagger(n,e){e.currentQuery||e.errors.push(pD());let r=n.timings==="full"?{duration:0,delay:0,easing:"full"}:ga(n.timings,e.errors,!0);return{type:ee.Stagger,animation:xt(this,No(n.animation),e),timings:r,options:null}}};function IN(t){let n=!!t.split(/\s*,\s*/).find(e=>e==GD);return n&&(t=t.replace(CN,"")),t=t.replace(/@\*/g,pa).replace(/@\w+/g,e=>pa+"-"+e.slice(1)).replace(/:animating/g,Nd),[t,n]}function xN(t){return t?b({},t):null}var Yp=class{errors;queryCount=0;depCount=0;currentTransition=null;currentQuery=null;currentQuerySelector=null;currentAnimateTimings=null;currentTime=0;collectedStyles=new Map;options=null;unsupportedCSSPropertiesFound=new Set;constructor(n){this.errors=n}};function SN(t){if(typeof t=="string")return null;let n=null;if(Array.isArray(t))t.forEach(e=>{if(e instanceof Map&&e.has("offset")){let r=e;n=parseFloat(r.get("offset")),r.delete("offset")}});else if(t instanceof Map&&t.has("offset")){let e=t;n=parseFloat(e.get("offset")),e.delete("offset")}return n}function TN(t,n){if(t.hasOwnProperty("duration"))return t;if(typeof t=="number"){let o=ga(t,n).duration;return Gp(o,0,"")}let e=t;if(e.split(/\s+/).some(o=>o.charAt(0)=="{"&&o.charAt(1)=="{")){let o=Gp(0,0,"");return o.dynamic=!0,o.strValue=e,o}let i=ga(e,n);return Gp(i.duration,i.delay,i.easing)}function Ci(t){return t?(t=b({},t),t.params&&(t.params=xN(t.params))):t={},t}function Gp(t,n,e){return{duration:t,delay:n,easing:e}}function cg(t,n,e,r,i,o,s=null,a=!1){return{type:1,element:t,keyframes:n,preStyleProps:e,postStyleProps:r,duration:i,delay:o,totalTime:i+o,easing:s,subTimeline:a}}var ya=class{_map=new Map;get(n){return this._map.get(n)||[]}append(n,e){let r=this._map.get(n);r||this._map.set(n,r=[]),r.push(...e)}has(n){return this._map.has(n)}clear(){this._map.clear()}},MN=1,kN=":enter",AN=new RegExp(kN,"g"),RN=":leave",NN=new RegExp(RN,"g");function qD(t,n,e,r,i,o=new Map,s=new Map,a,c,l=[]){return new Xp().buildKeyframes(t,n,e,r,i,o,s,a,c,l)}var Xp=class{buildKeyframes(n,e,r,i,o,s,a,c,l,d=[]){l=l||new ya;let u=new Jp(n,e,l,i,o,d,[]);u.options=c;let h=c.delay?jn(c.delay):0;u.currentTimeline.delayNextStep(h),u.currentTimeline.setStyles([s],null,u.errors,c),xt(this,r,u);let m=u.timelines.filter(p=>p.containsAnimation());if(m.length&&a.size){let p;for(let v=m.length-1;v>=0;v--){let E=m[v];if(E.element===e){p=E;break}}p&&!p.allowOnlyTimelineStyles()&&p.setStyles([a],null,u.errors,c)}return m.length?m.map(p=>p.buildKeyframes()):[cg(e,[],[],[],0,h,"",!1)]}visitTrigger(n,e){}visitState(n,e){}visitTransition(n,e){}visitAnimateChild(n,e){let r=e.subInstructions.get(e.element);if(r){let i=e.createSubContext(n.options),o=e.currentTimeline.currentTime,s=this._visitSubInstructions(r,i,i.options);o!=s&&e.transformIntoNewTimeline(s)}e.previousNode=n}visitAnimateRef(n,e){let r=e.createSubContext(n.options);r.transformIntoNewTimeline(),this._applyAnimationRefDelays([n.options,n.animation.options],e,r),this.visitReference(n.animation,r),e.transformIntoNewTimeline(r.currentTimeline.currentTime),e.previousNode=n}_applyAnimationRefDelays(n,e,r){for(let i of n){let o=i?.delay;if(o){let s=typeof o=="number"?o:jn(Oo(o,i?.params??{},e.errors));r.delayNextStep(s)}}}_visitSubInstructions(n,e,r){let o=e.currentTimeline.currentTime,s=r.duration!=null?jn(r.duration):null,a=r.delay!=null?jn(r.delay):null;return s!==0&&n.forEach(c=>{let l=e.appendInstructionToTimeline(c,s,a);o=Math.max(o,l.duration+l.delay)}),o}visitReference(n,e){e.updateOptions(n.options,!0),xt(this,n.animation,e),e.previousNode=n}visitSequence(n,e){let r=e.subContextCount,i=e,o=n.options;if(o&&(o.params||o.delay)&&(i=e.createSubContext(o),i.transformIntoNewTimeline(),o.delay!=null)){i.previousNode.type==ee.Style&&(i.currentTimeline.snapshotCurrentStyles(),i.previousNode=Hd);let s=jn(o.delay);i.delayNextStep(s)}n.steps.length&&(n.steps.forEach(s=>xt(this,s,i)),i.currentTimeline.applyStylesToKeyframe(),i.subContextCount>r&&i.transformIntoNewTimeline()),e.previousNode=n}visitGroup(n,e){let r=[],i=e.currentTimeline.currentTime,o=n.options&&n.options.delay?jn(n.options.delay):0;n.steps.forEach(s=>{let a=e.createSubContext(n.options);o&&a.delayNextStep(o),xt(this,s,a),i=Math.max(i,a.currentTimeline.currentTime),r.push(a.currentTimeline)}),r.forEach(s=>e.currentTimeline.mergeTimelineCollectedStyles(s)),e.transformIntoNewTimeline(i),e.previousNode=n}_visitTiming(n,e){if(n.dynamic){let r=n.strValue,i=e.params?Oo(r,e.params,e.errors):r;return ga(i,e.errors)}else return{duration:n.duration,delay:n.delay,easing:n.easing}}visitAnimate(n,e){let r=e.currentAnimateTimings=this._visitTiming(n.timings,e),i=e.currentTimeline;r.delay&&(e.incrementTime(r.delay),i.snapshotCurrentStyles());let o=n.style;o.type==ee.Keyframes?this.visitKeyframes(o,e):(e.incrementTime(r.duration),this.visitStyle(o,e),i.applyStylesToKeyframe()),e.currentAnimateTimings=null,e.previousNode=n}visitStyle(n,e){let r=e.currentTimeline,i=e.currentAnimateTimings;!i&&r.hasCurrentStyleProperties()&&r.forwardFrame();let o=i&&i.easing||n.easing;n.isEmptyStep?r.applyEmptyStep(o):r.setStyles(n.styles,o,e.errors,e.options),e.previousNode=n}visitKeyframes(n,e){let r=e.currentAnimateTimings,i=e.currentTimeline.duration,o=r.duration,a=e.createSubContext().currentTimeline;a.easing=r.easing,n.styles.forEach(c=>{let l=c.offset||0;a.forwardTime(l*o),a.setStyles(c.styles,c.easing,e.errors,e.options),a.applyStylesToKeyframe()}),e.currentTimeline.mergeTimelineCollectedStyles(a),e.transformIntoNewTimeline(i+o),e.previousNode=n}visitQuery(n,e){let r=e.currentTimeline.currentTime,i=n.options||{},o=i.delay?jn(i.delay):0;o&&(e.previousNode.type===ee.Style||r==0&&e.currentTimeline.hasCurrentStyleProperties())&&(e.currentTimeline.snapshotCurrentStyles(),e.previousNode=Hd);let s=r,a=e.invokeQuery(n.selector,n.originalSelector,n.limit,n.includeSelf,!!i.optional,e.errors);e.currentQueryTotal=a.length;let c=null;a.forEach((l,d)=>{e.currentQueryIndex=d;let u=e.createSubContext(n.options,l);o&&u.delayNextStep(o),l===e.element&&(c=u.currentTimeline),xt(this,n.animation,u),u.currentTimeline.applyStylesToKeyframe();let h=u.currentTimeline.currentTime;s=Math.max(s,h)}),e.currentQueryIndex=0,e.currentQueryTotal=0,e.transformIntoNewTimeline(s),c&&(e.currentTimeline.mergeTimelineCollectedStyles(c),e.currentTimeline.snapshotCurrentStyles()),e.previousNode=n}visitStagger(n,e){let r=e.parentContext,i=e.currentTimeline,o=n.timings,s=Math.abs(o.duration),a=s*(e.currentQueryTotal-1),c=s*e.currentQueryIndex;switch(o.duration<0?"reverse":o.easing){case"reverse":c=a-c;break;case"full":c=r.currentStaggerTime;break}let d=e.currentTimeline;c&&d.delayNextStep(c);let u=d.currentTime;xt(this,n.animation,e),e.previousNode=n,r.currentStaggerTime=i.currentTime-u+(i.startTime-r.currentTimeline.startTime)}},Hd={},Jp=class t{_driver;element;subInstructions;_enterClassName;_leaveClassName;errors;timelines;parentContext=null;currentTimeline;currentAnimateTimings=null;previousNode=Hd;subContextCount=0;options={};currentQueryIndex=0;currentQueryTotal=0;currentStaggerTime=0;constructor(n,e,r,i,o,s,a,c){this._driver=n,this.element=e,this.subInstructions=r,this._enterClassName=i,this._leaveClassName=o,this.errors=s,this.timelines=a,this.currentTimeline=c||new $d(this._driver,e,0),a.push(this.currentTimeline)}get params(){return this.options.params}updateOptions(n,e){if(!n)return;let r=n,i=this.options;r.duration!=null&&(i.duration=jn(r.duration)),r.delay!=null&&(i.delay=jn(r.delay));let o=r.params;if(o){let s=i.params;s||(s=this.options.params={}),Object.keys(o).forEach(a=>{(!e||!s.hasOwnProperty(a))&&(s[a]=Oo(o[a],s,this.errors))})}}_copyOptions(){let n={};if(this.options){let e=this.options.params;if(e){let r=n.params={};Object.keys(e).forEach(i=>{r[i]=e[i]})}}return n}createSubContext(n=null,e,r){let i=e||this.element,o=new t(this._driver,i,this.subInstructions,this._enterClassName,this._leaveClassName,this.errors,this.timelines,this.currentTimeline.fork(i,r||0));return o.previousNode=this.previousNode,o.currentAnimateTimings=this.currentAnimateTimings,o.options=this._copyOptions(),o.updateOptions(n),o.currentQueryIndex=this.currentQueryIndex,o.currentQueryTotal=this.currentQueryTotal,o.parentContext=this,this.subContextCount++,o}transformIntoNewTimeline(n){return this.previousNode=Hd,this.currentTimeline=this.currentTimeline.fork(this.element,n),this.timelines.push(this.currentTimeline),this.currentTimeline}appendInstructionToTimeline(n,e,r){let i={duration:e??n.duration,delay:this.currentTimeline.currentTime+(r??0)+n.delay,easing:""},o=new eg(this._driver,n.element,n.keyframes,n.preStyleProps,n.postStyleProps,i,n.stretchStartingKeyframe);return this.timelines.push(o),i}incrementTime(n){this.currentTimeline.forwardTime(this.currentTimeline.duration+n)}delayNextStep(n){n>0&&this.currentTimeline.delayNextStep(n)}invokeQuery(n,e,r,i,o,s){let a=[];if(i&&a.push(this.element),n.length>0){n=n.replace(AN,"."+this._enterClassName),n=n.replace(NN,"."+this._leaveClassName);let c=r!=1,l=this._driver.query(this.element,n,c);r!==0&&(l=r<0?l.slice(l.length+r,l.length):l.slice(0,r)),a.push(...l)}return!o&&a.length==0&&s.push(gD(e)),a}},$d=class t{_driver;element;startTime;_elementTimelineStylesLookup;duration=0;easing=null;_previousKeyframe=new Map;_currentKeyframe=new Map;_keyframes=new Map;_styleSummary=new Map;_localTimelineStyles=new Map;_globalTimelineStyles;_pendingStyles=new Map;_backFill=new Map;_currentEmptyStepKeyframe=null;constructor(n,e,r,i){this._driver=n,this.element=e,this.startTime=r,this._elementTimelineStylesLookup=i,this._elementTimelineStylesLookup||(this._elementTimelineStylesLookup=new Map),this._globalTimelineStyles=this._elementTimelineStylesLookup.get(e),this._globalTimelineStyles||(this._globalTimelineStyles=this._localTimelineStyles,this._elementTimelineStylesLookup.set(e,this._localTimelineStyles)),this._loadKeyframe()}containsAnimation(){switch(this._keyframes.size){case 0:return!1;case 1:return this.hasCurrentStyleProperties();default:return!0}}hasCurrentStyleProperties(){return this._currentKeyframe.size>0}get currentTime(){return this.startTime+this.duration}delayNextStep(n){let e=this._keyframes.size===1&&this._pendingStyles.size;this.duration||e?(this.forwardTime(this.currentTime+n),e&&this.snapshotCurrentStyles()):this.startTime+=n}fork(n,e){return this.applyStylesToKeyframe(),new t(this._driver,n,e||this.currentTime,this._elementTimelineStylesLookup)}_loadKeyframe(){this._currentKeyframe&&(this._previousKeyframe=this._currentKeyframe),this._currentKeyframe=this._keyframes.get(this.duration),this._currentKeyframe||(this._currentKeyframe=new Map,this._keyframes.set(this.duration,this._currentKeyframe))}forwardFrame(){this.duration+=MN,this._loadKeyframe()}forwardTime(n){this.applyStylesToKeyframe(),this.duration=n,this._loadKeyframe()}_updateStyle(n,e){this._localTimelineStyles.set(n,e),this._globalTimelineStyles.set(n,e),this._styleSummary.set(n,{time:this.currentTime,value:e})}allowOnlyTimelineStyles(){return this._currentEmptyStepKeyframe!==this._currentKeyframe}applyEmptyStep(n){n&&this._previousKeyframe.set("easing",n);for(let[e,r]of this._globalTimelineStyles)this._backFill.set(e,r||cn),this._currentKeyframe.set(e,cn);this._currentEmptyStepKeyframe=this._currentKeyframe}setStyles(n,e,r,i){e&&this._previousKeyframe.set("easing",e);let o=i&&i.params||{},s=ON(n,this._globalTimelineStyles);for(let[a,c]of s){let l=Oo(c,o,r);this._pendingStyles.set(a,l),this._localTimelineStyles.has(a)||this._backFill.set(a,this._globalTimelineStyles.get(a)??cn),this._updateStyle(a,l)}}applyStylesToKeyframe(){this._pendingStyles.size!=0&&(this._pendingStyles.forEach((n,e)=>{this._currentKeyframe.set(e,n)}),this._pendingStyles.clear(),this._localTimelineStyles.forEach((n,e)=>{this._currentKeyframe.has(e)||this._currentKeyframe.set(e,n)}))}snapshotCurrentStyles(){for(let[n,e]of this._localTimelineStyles)this._pendingStyles.set(n,e),this._updateStyle(n,e)}getFinalKeyframe(){return this._keyframes.get(this.duration)}get properties(){let n=[];for(let e in this._currentKeyframe)n.push(e);return n}mergeTimelineCollectedStyles(n){n._styleSummary.forEach((e,r)=>{let i=this._styleSummary.get(r);(!i||e.time>i.time)&&this._updateStyle(r,e.value)})}buildKeyframes(){this.applyStylesToKeyframe();let n=new Set,e=new Set,r=this._keyframes.size===1&&this.duration===0,i=[];this._keyframes.forEach((a,c)=>{let l=new Map([...this._backFill,...a]);l.forEach((d,u)=>{d===ha?n.add(u):d===cn&&e.add(u)}),r||l.set("offset",c/this.duration),i.push(l)});let o=[...n.values()],s=[...e.values()];if(r){let a=i[0],c=new Map(a);a.set("offset",0),c.set("offset",1),i=[a,c]}return cg(this.element,i,o,s,this.duration,this.startTime,this.easing,!1)}},eg=class extends $d{keyframes;preStyleProps;postStyleProps;_stretchStartingKeyframe;timings;constructor(n,e,r,i,o,s,a=!1){super(n,e,s.delay),this.keyframes=r,this.preStyleProps=i,this.postStyleProps=o,this._stretchStartingKeyframe=a,this.timings={duration:s.duration,delay:s.delay,easing:s.easing}}containsAnimation(){return this.keyframes.length>1}buildKeyframes(){let n=this.keyframes,{delay:e,duration:r,easing:i}=this.timings;if(this._stretchStartingKeyframe&&e){let o=[],s=r+e,a=e/s,c=new Map(n[0]);c.set("offset",0),o.push(c);let l=new Map(n[0]);l.set("offset",LD(a)),o.push(l);let d=n.length-1;for(let u=1;u<=d;u++){let h=new Map(n[u]),m=h.get("offset"),p=e+m*r;h.set("offset",LD(p/s)),o.push(h)}r=s,e=0,i="",n=o}return cg(this.element,n,this.preStyleProps,this.postStyleProps,r,e,i,!0)}};function LD(t,n=3){let e=Math.pow(10,n-1);return Math.round(t*e)/e}function ON(t,n){let e=new Map,r;return t.forEach(i=>{if(i==="*"){r??=n.keys();for(let o of r)e.set(o,cn)}else for(let[o,s]of i)e.set(o,s)}),e}function jD(t,n,e,r,i,o,s,a,c,l,d,u,h){return{type:0,element:t,triggerName:n,isRemovalTransition:i,fromState:e,fromStyles:o,toState:r,toStyles:s,timelines:a,queriedElements:c,preStyleProps:l,postStyleProps:d,totalTime:u,errors:h}}var Wp={},zd=class{_triggerName;ast;_stateStyles;constructor(n,e,r){this._triggerName=n,this.ast=e,this._stateStyles=r}match(n,e,r,i){return FN(this.ast.matchers,n,e,r,i)}buildStyles(n,e,r){let i=this._stateStyles.get("*");return n!==void 0&&(i=this._stateStyles.get(n?.toString())||i),i?i.buildStyles(e,r):new Map}build(n,e,r,i,o,s,a,c,l,d){let u=[],h=this.ast.options&&this.ast.options.params||Wp,m=a&&a.params||Wp,p=this.buildStyles(r,m,u),v=c&&c.params||Wp,E=this.buildStyles(i,v,u),D=new Set,k=new Map,Z=new Map,T=i==="void",ie={params:KD(v,h),delay:this.ast.options?.delay},Y=d?[]:qD(n,e,this.ast.animation,o,s,p,E,ie,l,u),se=0;return Y.forEach(_e=>{se=Math.max(_e.duration+_e.delay,se)}),u.length?jD(e,this._triggerName,r,i,T,p,E,[],[],k,Z,se,u):(Y.forEach(_e=>{let Gt=_e.element,Vi=It(k,Gt,new Set);_e.preStyleProps.forEach(Hr=>Vi.add(Hr));let Jv=It(Z,Gt,new Set);_e.postStyleProps.forEach(Hr=>Jv.add(Hr)),Gt!==e&&D.add(Gt)}),jD(e,this._triggerName,r,i,T,p,E,Y,[...D.values()],k,Z,se))}};function FN(t,n,e,r,i){return t.some(o=>o(n,e,r,i))}function KD(t,n){let e=b({},n);return Object.entries(t).forEach(([r,i])=>{i!=null&&(e[r]=i)}),e}var tg=class{styles;defaultParams;normalizer;constructor(n,e,r){this.styles=n,this.defaultParams=e,this.normalizer=r}buildStyles(n,e){let r=new Map,i=KD(n,this.defaultParams);return this.styles.styles.forEach(o=>{typeof o!="string"&&o.forEach((s,a)=>{s&&(s=Oo(s,i,e));let c=this.normalizer.normalizePropertyName(a,e);s=this.normalizer.normalizeStyleValue(a,c,s,e),r.set(a,s)})}),r}};function PN(t,n,e){return new ng(t,n,e)}var ng=class{name;ast;_normalizer;transitionFactories=[];fallbackTransition;states=new Map;constructor(n,e,r){this.name=n,this.ast=e,this._normalizer=r,e.states.forEach(i=>{let o=i.options&&i.options.params||{};this.states.set(i.name,new tg(i.style,o,r))}),VD(this.states,"true","1"),VD(this.states,"false","0"),e.transitions.forEach(i=>{this.transitionFactories.push(new zd(n,i,this.states))}),this.fallbackTransition=LN(n,this.states)}get containsQueries(){return this.ast.queryCount>0}matchTransition(n,e,r,i){return this.transitionFactories.find(s=>s.match(n,e,r,i))||null}matchStyles(n,e,r){return this.fallbackTransition.buildStyles(n,e,r)}};function LN(t,n,e){let r=[(s,a)=>!0],i={type:ee.Sequence,steps:[],options:null},o={type:ee.Transition,animation:i,matchers:r,options:null,queryCount:0,depCount:0};return new zd(t,o,n)}function VD(t,n,e){t.has(n)?t.has(e)||t.set(e,t.get(n)):t.has(e)&&t.set(n,t.get(e))}var jN=new ya,rg=class{bodyNode;_driver;_normalizer;_animations=new Map;_playersById=new Map;players=[];constructor(n,e,r){this.bodyNode=n,this._driver=e,this._normalizer=r}register(n,e){let r=[],i=[],o=WD(this._driver,e,r,i);if(r.length)throw _D(r);this._animations.set(n,o)}_buildPlayer(n,e,r){let i=n.element,o=Lp(this._normalizer,n.keyframes,e,r);return this._driver.animate(i,o,n.duration,n.delay,n.easing,[],!0)}create(n,e,r={}){let i=[],o=this._animations.get(n),s,a=new Map;if(o?(s=qD(this._driver,e,o,Hp,Rd,new Map,new Map,r,jN,i),s.forEach(d=>{let u=It(a,d.element,new Map);d.postStyleProps.forEach(h=>u.set(h,null))})):(i.push(wD()),s=[]),i.length)throw ED(i);a.forEach((d,u)=>{d.forEach((h,m)=>{d.set(m,this._driver.computeStyle(u,m,cn))})});let c=s.map(d=>{let u=a.get(d.element);return this._buildPlayer(d,new Map,u)}),l=dr(c);return this._playersById.set(n,l),l.onDestroy(()=>this.destroy(n)),this.players.push(l),l}destroy(n){let e=this._getPlayer(n);e.destroy(),this._playersById.delete(n);let r=this.players.indexOf(e);r>=0&&this.players.splice(r,1)}_getPlayer(n){let e=this._playersById.get(n);if(!e)throw DD(n);return e}listen(n,e,r,i){let o=kd(e,"","","");return Md(this._getPlayer(n),r,o,i),()=>{}}command(n,e,r,i){if(r=="register"){this.register(n,i[0]);return}if(r=="create"){let s=i[0]||{};this.create(n,e,s);return}let o=this._getPlayer(n);switch(r){case"play":o.play();break;case"pause":o.pause();break;case"reset":o.reset();break;case"restart":o.restart();break;case"finish":o.finish();break;case"init":o.init();break;case"setPosition":o.setPosition(parseFloat(i[0]));break;case"destroy":this.destroy(n);break}}},BD="ng-animate-queued",VN=".ng-animate-queued",qp="ng-animate-disabled",BN=".ng-animate-disabled",UN="ng-star-inserted",HN=".ng-star-inserted",$N=[],QD={namespaceId:"",setForRemoval:!1,setForMove:!1,hasAnimation:!1,removedBeforeQueried:!1},zN={namespaceId:"",setForMove:!1,setForRemoval:!1,hasAnimation:!1,removedBeforeQueried:!0},dn="__ng_removed",ba=class{namespaceId;value;options;get params(){return this.options.params}constructor(n,e=""){this.namespaceId=e;let r=n&&n.hasOwnProperty("value"),i=r?n.value:n;if(this.value=WN(i),r){let o=n,{value:s}=o,a=Ju(o,["value"]);this.options=a}else this.options={};this.options.params||(this.options.params={})}absorbOptions(n){let e=n.params;if(e){let r=this.options.params;Object.keys(e).forEach(i=>{r[i]==null&&(r[i]=e[i])})}}},va="void",Kp=new ba(va),ig=class{id;hostElement;_engine;players=[];_triggers=new Map;_queue=[];_elementListeners=new Map;_hostClassName;constructor(n,e,r){this.id=n,this.hostElement=e,this._engine=r,this._hostClassName="ng-tns-"+n,Vt(e,this._hostClassName)}listen(n,e,r,i){if(!this._triggers.has(e))throw CD(r,e);if(r==null||r.length==0)throw ID(e);if(!qN(r))throw xD(r,e);let o=It(this._elementListeners,n,[]),s={name:e,phase:r,callback:i};o.push(s);let a=It(this._engine.statesByElement,n,new Map);return a.has(e)||(Vt(n,ma),Vt(n,ma+"-"+e),a.set(e,Kp)),()=>{this._engine.afterFlush(()=>{let c=o.indexOf(s);c>=0&&o.splice(c,1),this._triggers.has(e)||a.delete(e)})}}register(n,e){return this._triggers.has(n)?!1:(this._triggers.set(n,e),!0)}_getTrigger(n){let e=this._triggers.get(n);if(!e)throw SD(n);return e}trigger(n,e,r,i=!0){let o=this._getTrigger(e),s=new _a(this.id,e,n),a=this._engine.statesByElement.get(n);a||(Vt(n,ma),Vt(n,ma+"-"+e),this._engine.statesByElement.set(n,a=new Map));let c=a.get(e),l=new ba(r,this.id);if(!(r&&r.hasOwnProperty("value"))&&c&&l.absorbOptions(c.options),a.set(e,l),c||(c=Kp),!(l.value===va)&&c.value===l.value){if(!ZN(c.params,l.params)){let v=[],E=o.matchStyles(c.value,c.params,v),D=o.matchStyles(l.value,l.params,v);v.length?this._engine.reportError(v):this._engine.afterFlush(()=>{Pr(n,E),ln(n,D)})}return}let h=It(this._engine.playersByElement,n,[]);h.forEach(v=>{v.namespaceId==this.id&&v.triggerName==e&&v.queued&&v.destroy()});let m=o.matchTransition(c.value,l.value,n,l.params),p=!1;if(!m){if(!i)return;m=o.fallbackTransition,p=!0}return this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:e,transition:m,fromState:c,toState:l,player:s,isFallbackTransition:p}),p||(Vt(n,BD),s.onStart(()=>{Fo(n,BD)})),s.onDone(()=>{let v=this.players.indexOf(s);v>=0&&this.players.splice(v,1);let E=this._engine.playersByElement.get(n);if(E){let D=E.indexOf(s);D>=0&&E.splice(D,1)}}),this.players.push(s),h.push(s),s}deregister(n){this._triggers.delete(n),this._engine.statesByElement.forEach(e=>e.delete(n)),this._elementListeners.forEach((e,r)=>{this._elementListeners.set(r,e.filter(i=>i.name!=n))})}clearElementCache(n){this._engine.statesByElement.delete(n),this._elementListeners.delete(n);let e=this._engine.playersByElement.get(n);e&&(e.forEach(r=>r.destroy()),this._engine.playersByElement.delete(n))}_signalRemovalForInnerTriggers(n,e){let r=this._engine.driver.query(n,pa,!0);r.forEach(i=>{if(i[dn])return;let o=this._engine.fetchNamespacesByElement(i);o.size?o.forEach(s=>s.triggerLeaveAnimation(i,e,!1,!0)):this.clearElementCache(i)}),this._engine.afterFlushAnimationsDone(()=>r.forEach(i=>this.clearElementCache(i)))}triggerLeaveAnimation(n,e,r,i){let o=this._engine.statesByElement.get(n),s=new Map;if(o){let a=[];if(o.forEach((c,l)=>{if(s.set(l,c.value),this._triggers.has(l)){let d=this.trigger(n,l,va,i);d&&a.push(d)}}),a.length)return this._engine.markElementAsRemoved(this.id,n,!0,e,s),r&&dr(a).onDone(()=>this._engine.processLeaveNode(n)),!0}return!1}prepareLeaveAnimationListeners(n){let e=this._elementListeners.get(n),r=this._engine.statesByElement.get(n);if(e&&r){let i=new Set;e.forEach(o=>{let s=o.name;if(i.has(s))return;i.add(s);let c=this._triggers.get(s).fallbackTransition,l=r.get(s)||Kp,d=new ba(va),u=new _a(this.id,s,n);this._engine.totalQueuedPlayers++,this._queue.push({element:n,triggerName:s,transition:c,fromState:l,toState:d,player:u,isFallbackTransition:!0})})}}removeNode(n,e){let r=this._engine;if(n.childElementCount&&this._signalRemovalForInnerTriggers(n,e),this.triggerLeaveAnimation(n,e,!0))return;let i=!1;if(r.totalAnimations){let o=r.players.length?r.playersByQueriedElement.get(n):[];if(o&&o.length)i=!0;else{let s=n;for(;s=s.parentNode;)if(r.statesByElement.get(s)){i=!0;break}}}if(this.prepareLeaveAnimationListeners(n),i)r.markElementAsRemoved(this.id,n,!1,e);else{let o=n[dn];(!o||o===QD)&&(r.afterFlush(()=>this.clearElementCache(n)),r.destroyInnerAnimations(n),r._onRemovalComplete(n,e))}}insertNode(n,e){Vt(n,this._hostClassName)}drainQueuedTransitions(n){let e=[];return this._queue.forEach(r=>{let i=r.player;if(i.destroyed)return;let o=r.element,s=this._elementListeners.get(o);s&&s.forEach(a=>{if(a.name==r.triggerName){let c=kd(o,r.triggerName,r.fromState.value,r.toState.value);c._data=n,Md(r.player,a.phase,c,a.callback)}}),i.markedForDestroy?this._engine.afterFlush(()=>{i.destroy()}):e.push(r)}),this._queue=[],e.sort((r,i)=>{let o=r.transition.ast.depCount,s=i.transition.ast.depCount;return o==0||s==0?o-s:this._engine.driver.containsElement(r.element,i.element)?1:-1})}destroy(n){this.players.forEach(e=>e.destroy()),this._signalRemovalForInnerTriggers(this.hostElement,n)}},og=class{bodyNode;driver;_normalizer;players=[];newHostElements=new Map;playersByElement=new Map;playersByQueriedElement=new Map;statesByElement=new Map;disabledNodes=new Set;totalAnimations=0;totalQueuedPlayers=0;_namespaceLookup={};_namespaceList=[];_flushFns=[];_whenQuietFns=[];namespacesByHostElement=new Map;collectedEnterElements=[];collectedLeaveElements=[];onRemovalComplete=(n,e)=>{};_onRemovalComplete(n,e){this.onRemovalComplete(n,e)}constructor(n,e,r){this.bodyNode=n,this.driver=e,this._normalizer=r}get queuedPlayers(){let n=[];return this._namespaceList.forEach(e=>{e.players.forEach(r=>{r.queued&&n.push(r)})}),n}createNamespace(n,e){let r=new ig(n,e,this);return this.bodyNode&&this.driver.containsElement(this.bodyNode,e)?this._balanceNamespaceList(r,e):(this.newHostElements.set(e,r),this.collectEnterElement(e)),this._namespaceLookup[n]=r}_balanceNamespaceList(n,e){let r=this._namespaceList,i=this.namespacesByHostElement;if(r.length-1>=0){let s=!1,a=this.driver.getParentElement(e);for(;a;){let c=i.get(a);if(c){let l=r.indexOf(c);r.splice(l+1,0,n),s=!0;break}a=this.driver.getParentElement(a)}s||r.unshift(n)}else r.push(n);return i.set(e,n),n}register(n,e){let r=this._namespaceLookup[n];return r||(r=this.createNamespace(n,e)),r}registerTrigger(n,e,r){let i=this._namespaceLookup[n];i&&i.register(e,r)&&this.totalAnimations++}destroy(n,e){n&&(this.afterFlush(()=>{}),this.afterFlushAnimationsDone(()=>{let r=this._fetchNamespace(n);this.namespacesByHostElement.delete(r.hostElement);let i=this._namespaceList.indexOf(r);i>=0&&this._namespaceList.splice(i,1),r.destroy(e),delete this._namespaceLookup[n]}))}_fetchNamespace(n){return this._namespaceLookup[n]}fetchNamespacesByElement(n){let e=new Set,r=this.statesByElement.get(n);if(r){for(let i of r.values())if(i.namespaceId){let o=this._fetchNamespace(i.namespaceId);o&&e.add(o)}}return e}trigger(n,e,r,i){if(jd(e)){let o=this._fetchNamespace(n);if(o)return o.trigger(e,r,i),!0}return!1}insertNode(n,e,r,i){if(!jd(e))return;let o=e[dn];if(o&&o.setForRemoval){o.setForRemoval=!1,o.setForMove=!0;let s=this.collectedLeaveElements.indexOf(e);s>=0&&this.collectedLeaveElements.splice(s,1)}if(n){let s=this._fetchNamespace(n);s&&s.insertNode(e,r)}i&&this.collectEnterElement(e)}collectEnterElement(n){this.collectedEnterElements.push(n)}markElementAsDisabled(n,e){e?this.disabledNodes.has(n)||(this.disabledNodes.add(n),Vt(n,qp)):this.disabledNodes.has(n)&&(this.disabledNodes.delete(n),Fo(n,qp))}removeNode(n,e,r){if(jd(e)){let i=n?this._fetchNamespace(n):null;i?i.removeNode(e,r):this.markElementAsRemoved(n,e,!1,r);let o=this.namespacesByHostElement.get(e);o&&o.id!==n&&o.removeNode(e,r)}else this._onRemovalComplete(e,r)}markElementAsRemoved(n,e,r,i,o){this.collectedLeaveElements.push(e),e[dn]={namespaceId:n,setForRemoval:i,hasAnimation:r,removedBeforeQueried:!1,previousTriggersValues:o}}listen(n,e,r,i,o){return jd(e)?this._fetchNamespace(n).listen(e,r,i,o):()=>{}}_buildInstruction(n,e,r,i,o){return n.transition.build(this.driver,n.element,n.fromState.value,n.toState.value,r,i,n.fromState.options,n.toState.options,e,o)}destroyInnerAnimations(n){let e=this.driver.query(n,pa,!0);e.forEach(r=>this.destroyActiveAnimationsForElement(r)),this.playersByQueriedElement.size!=0&&(e=this.driver.query(n,Nd,!0),e.forEach(r=>this.finishActiveQueriedAnimationOnElement(r)))}destroyActiveAnimationsForElement(n){let e=this.playersByElement.get(n);e&&e.forEach(r=>{r.queued?r.markedForDestroy=!0:r.destroy()})}finishActiveQueriedAnimationOnElement(n){let e=this.playersByQueriedElement.get(n);e&&e.forEach(r=>r.finish())}whenRenderingDone(){return new Promise(n=>{if(this.players.length)return dr(this.players).onDone(()=>n());n()})}processLeaveNode(n){let e=n[dn];if(e&&e.setForRemoval){if(n[dn]=QD,e.namespaceId){this.destroyInnerAnimations(n);let r=this._fetchNamespace(e.namespaceId);r&&r.clearElementCache(n)}this._onRemovalComplete(n,e.setForRemoval)}n.classList?.contains(qp)&&this.markElementAsDisabled(n,!1),this.driver.query(n,BN,!0).forEach(r=>{this.markElementAsDisabled(r,!1)})}flush(n=-1){let e=[];if(this.newHostElements.size&&(this.newHostElements.forEach((r,i)=>this._balanceNamespaceList(r,i)),this.newHostElements.clear()),this.totalAnimations&&this.collectedEnterElements.length)for(let r=0;r<this.collectedEnterElements.length;r++){let i=this.collectedEnterElements[r];Vt(i,UN)}if(this._namespaceList.length&&(this.totalQueuedPlayers||this.collectedLeaveElements.length)){let r=[];try{e=this._flushAnimations(r,n)}finally{for(let i=0;i<r.length;i++)r[i]()}}else for(let r=0;r<this.collectedLeaveElements.length;r++){let i=this.collectedLeaveElements[r];this.processLeaveNode(i)}if(this.totalQueuedPlayers=0,this.collectedEnterElements.length=0,this.collectedLeaveElements.length=0,this._flushFns.forEach(r=>r()),this._flushFns=[],this._whenQuietFns.length){let r=this._whenQuietFns;this._whenQuietFns=[],e.length?dr(e).onDone(()=>{r.forEach(i=>i())}):r.forEach(i=>i())}}reportError(n){throw TD(n)}_flushAnimations(n,e){let r=new ya,i=[],o=new Map,s=[],a=new Map,c=new Map,l=new Map,d=new Set;this.disabledNodes.forEach(S=>{d.add(S);let N=this.driver.query(S,VN,!0);for(let L=0;L<N.length;L++)d.add(N[L])});let u=this.bodyNode,h=Array.from(this.statesByElement.keys()),m=$D(h,this.collectedEnterElements),p=new Map,v=0;m.forEach((S,N)=>{let L=Hp+v++;p.set(N,L),S.forEach(oe=>Vt(oe,L))});let E=[],D=new Set,k=new Set;for(let S=0;S<this.collectedLeaveElements.length;S++){let N=this.collectedLeaveElements[S],L=N[dn];L&&L.setForRemoval&&(E.push(N),D.add(N),L.hasAnimation?this.driver.query(N,HN,!0).forEach(oe=>D.add(oe)):k.add(N))}let Z=new Map,T=$D(h,Array.from(D));T.forEach((S,N)=>{let L=Rd+v++;Z.set(N,L),S.forEach(oe=>Vt(oe,L))}),n.push(()=>{m.forEach((S,N)=>{let L=p.get(N);S.forEach(oe=>Fo(oe,L))}),T.forEach((S,N)=>{let L=Z.get(N);S.forEach(oe=>Fo(oe,L))}),E.forEach(S=>{this.processLeaveNode(S)})});let ie=[],Y=[];for(let S=this._namespaceList.length-1;S>=0;S--)this._namespaceList[S].drainQueuedTransitions(e).forEach(L=>{let oe=L.player,Ge=L.element;if(ie.push(oe),this.collectedEnterElements.length){let Je=Ge[dn];if(Je&&Je.setForMove){if(Je.previousTriggersValues&&Je.previousTriggersValues.has(L.triggerName)){let $r=Je.previousTriggersValues.get(L.triggerName),Rt=this.statesByElement.get(L.element);if(Rt&&Rt.has(L.triggerName)){let nc=Rt.get(L.triggerName);nc.value=$r,Rt.set(L.triggerName,nc)}}oe.destroy();return}}let vn=!u||!this.driver.containsElement(u,Ge),St=Z.get(Ge),mr=p.get(Ge),Te=this._buildInstruction(L,r,mr,St,vn);if(Te.errors&&Te.errors.length){Y.push(Te);return}if(vn){oe.onStart(()=>Pr(Ge,Te.fromStyles)),oe.onDestroy(()=>ln(Ge,Te.toStyles)),i.push(oe);return}if(L.isFallbackTransition){oe.onStart(()=>Pr(Ge,Te.fromStyles)),oe.onDestroy(()=>ln(Ge,Te.toStyles)),i.push(oe);return}let ny=[];Te.timelines.forEach(Je=>{Je.stretchStartingKeyframe=!0,this.disabledNodes.has(Je.element)||ny.push(Je)}),Te.timelines=ny,r.append(Ge,Te.timelines);let cx={instruction:Te,player:oe,element:Ge};s.push(cx),Te.queriedElements.forEach(Je=>It(a,Je,[]).push(oe)),Te.preStyleProps.forEach((Je,$r)=>{if(Je.size){let Rt=c.get($r);Rt||c.set($r,Rt=new Set),Je.forEach((nc,Xu)=>Rt.add(Xu))}}),Te.postStyleProps.forEach((Je,$r)=>{let Rt=l.get($r);Rt||l.set($r,Rt=new Set),Je.forEach((nc,Xu)=>Rt.add(Xu))})});if(Y.length){let S=[];Y.forEach(N=>{S.push(MD(N.triggerName,N.errors))}),ie.forEach(N=>N.destroy()),this.reportError(S)}let se=new Map,_e=new Map;s.forEach(S=>{let N=S.element;r.has(N)&&(_e.set(N,N),this._beforeAnimationBuild(S.player.namespaceId,S.instruction,se))}),i.forEach(S=>{let N=S.element;this._getPreviousPlayers(N,!1,S.namespaceId,S.triggerName,null).forEach(oe=>{It(se,N,[]).push(oe),oe.destroy()})});let Gt=E.filter(S=>zD(S,c,l)),Vi=new Map;HD(Vi,this.driver,k,l,cn).forEach(S=>{zD(S,c,l)&&Gt.push(S)});let Hr=new Map;m.forEach((S,N)=>{HD(Hr,this.driver,new Set(S),c,ha)}),Gt.forEach(S=>{let N=Vi.get(S),L=Hr.get(S);Vi.set(S,new Map([...N?.entries()??[],...L?.entries()??[]]))});let Yu=[],ey=[],ty={};s.forEach(S=>{let{element:N,player:L,instruction:oe}=S;if(r.has(N)){if(d.has(N)){L.onDestroy(()=>ln(N,oe.toStyles)),L.disabled=!0,L.overrideTotalTime(oe.totalTime),i.push(L);return}let Ge=ty;if(_e.size>1){let St=N,mr=[];for(;St=St.parentNode;){let Te=_e.get(St);if(Te){Ge=Te;break}mr.push(St)}mr.forEach(Te=>_e.set(Te,Ge))}let vn=this._buildAnimation(L.namespaceId,oe,se,o,Hr,Vi);if(L.setRealPlayer(vn),Ge===ty)Yu.push(L);else{let St=this.playersByElement.get(Ge);St&&St.length&&(L.parentPlayer=dr(St)),i.push(L)}}else Pr(N,oe.fromStyles),L.onDestroy(()=>ln(N,oe.toStyles)),ey.push(L),d.has(N)&&i.push(L)}),ey.forEach(S=>{let N=o.get(S.element);if(N&&N.length){let L=dr(N);S.setRealPlayer(L)}}),i.forEach(S=>{S.parentPlayer?S.syncPlayerEvents(S.parentPlayer):S.destroy()});for(let S=0;S<E.length;S++){let N=E[S],L=N[dn];if(Fo(N,Rd),L&&L.hasAnimation)continue;let oe=[];if(a.size){let vn=a.get(N);vn&&vn.length&&oe.push(...vn);let St=this.driver.query(N,Nd,!0);for(let mr=0;mr<St.length;mr++){let Te=a.get(St[mr]);Te&&Te.length&&oe.push(...Te)}}let Ge=oe.filter(vn=>!vn.destroyed);Ge.length?KN(this,N,Ge):this.processLeaveNode(N)}return E.length=0,Yu.forEach(S=>{this.players.push(S),S.onDone(()=>{S.destroy();let N=this.players.indexOf(S);this.players.splice(N,1)}),S.play()}),Yu}afterFlush(n){this._flushFns.push(n)}afterFlushAnimationsDone(n){this._whenQuietFns.push(n)}_getPreviousPlayers(n,e,r,i,o){let s=[];if(e){let a=this.playersByQueriedElement.get(n);a&&(s=a)}else{let a=this.playersByElement.get(n);if(a){let c=!o||o==va;a.forEach(l=>{l.queued||!c&&l.triggerName!=i||s.push(l)})}}return(r||i)&&(s=s.filter(a=>!(r&&r!=a.namespaceId||i&&i!=a.triggerName))),s}_beforeAnimationBuild(n,e,r){let i=e.triggerName,o=e.element,s=e.isRemovalTransition?void 0:n,a=e.isRemovalTransition?void 0:i;for(let c of e.timelines){let l=c.element,d=l!==o,u=It(r,l,[]);this._getPreviousPlayers(l,d,s,a,e.toState).forEach(m=>{let p=m.getRealPlayer();p.beforeDestroy&&p.beforeDestroy(),m.destroy(),u.push(m)})}Pr(o,e.fromStyles)}_buildAnimation(n,e,r,i,o,s){let a=e.triggerName,c=e.element,l=[],d=new Set,u=new Set,h=e.timelines.map(p=>{let v=p.element;d.add(v);let E=v[dn];if(E&&E.removedBeforeQueried)return new lr(p.duration,p.delay);let D=v!==c,k=QN((r.get(v)||$N).map(se=>se.getRealPlayer())).filter(se=>{let _e=se;return _e.element?_e.element===v:!1}),Z=o.get(v),T=s.get(v),ie=Lp(this._normalizer,p.keyframes,Z,T),Y=this._buildPlayer(p,ie,k);if(p.subTimeline&&i&&u.add(v),D){let se=new _a(n,a,v);se.setRealPlayer(Y),l.push(se)}return Y});l.forEach(p=>{It(this.playersByQueriedElement,p.element,[]).push(p),p.onDone(()=>GN(this.playersByQueriedElement,p.element,p))}),d.forEach(p=>Vt(p,$p));let m=dr(h);return m.onDestroy(()=>{d.forEach(p=>Fo(p,$p)),ln(c,e.toStyles)}),u.forEach(p=>{It(i,p,[]).push(m)}),m}_buildPlayer(n,e,r){return e.length>0?this.driver.animate(n.element,e,n.duration,n.delay,n.easing,r):new lr(n.duration,n.delay)}},_a=class{namespaceId;triggerName;element;_player=new lr;_containsRealPlayer=!1;_queuedCallbacks=new Map;destroyed=!1;parentPlayer=null;markedForDestroy=!1;disabled=!1;queued=!0;totalTime=0;constructor(n,e,r){this.namespaceId=n,this.triggerName=e,this.element=r}setRealPlayer(n){this._containsRealPlayer||(this._player=n,this._queuedCallbacks.forEach((e,r)=>{e.forEach(i=>Md(n,r,void 0,i))}),this._queuedCallbacks.clear(),this._containsRealPlayer=!0,this.overrideTotalTime(n.totalTime),this.queued=!1)}getRealPlayer(){return this._player}overrideTotalTime(n){this.totalTime=n}syncPlayerEvents(n){let e=this._player;e.triggerCallback&&n.onStart(()=>e.triggerCallback("start")),n.onDone(()=>this.finish()),n.onDestroy(()=>this.destroy())}_queueEvent(n,e){It(this._queuedCallbacks,n,[]).push(e)}onDone(n){this.queued&&this._queueEvent("done",n),this._player.onDone(n)}onStart(n){this.queued&&this._queueEvent("start",n),this._player.onStart(n)}onDestroy(n){this.queued&&this._queueEvent("destroy",n),this._player.onDestroy(n)}init(){this._player.init()}hasStarted(){return this.queued?!1:this._player.hasStarted()}play(){!this.queued&&this._player.play()}pause(){!this.queued&&this._player.pause()}restart(){!this.queued&&this._player.restart()}finish(){this._player.finish()}destroy(){this.destroyed=!0,this._player.destroy()}reset(){!this.queued&&this._player.reset()}setPosition(n){this.queued||this._player.setPosition(n)}getPosition(){return this.queued?0:this._player.getPosition()}triggerCallback(n){let e=this._player;e.triggerCallback&&e.triggerCallback(n)}};function GN(t,n,e){let r=t.get(n);if(r){if(r.length){let i=r.indexOf(e);r.splice(i,1)}r.length==0&&t.delete(n)}return r}function WN(t){return t??null}function jd(t){return t&&t.nodeType===1}function qN(t){return t=="start"||t=="done"}function UD(t,n){let e=t.style.display;return t.style.display=n??"none",e}function HD(t,n,e,r,i){let o=[];e.forEach(c=>o.push(UD(c)));let s=[];r.forEach((c,l)=>{let d=new Map;c.forEach(u=>{let h=n.computeStyle(l,u,i);d.set(u,h),(!h||h.length==0)&&(l[dn]=zN,s.push(l))}),t.set(l,d)});let a=0;return e.forEach(c=>UD(c,o[a++])),s}function $D(t,n){let e=new Map;if(t.forEach(a=>e.set(a,[])),n.length==0)return e;let r=1,i=new Set(n),o=new Map;function s(a){if(!a)return r;let c=o.get(a);if(c)return c;let l=a.parentNode;return e.has(l)?c=l:i.has(l)?c=r:c=s(l),o.set(a,c),c}return n.forEach(a=>{let c=s(a);c!==r&&e.get(c).push(a)}),e}function Vt(t,n){t.classList?.add(n)}function Fo(t,n){t.classList?.remove(n)}function KN(t,n,e){dr(e).onDone(()=>t.processLeaveNode(n))}function QN(t){let n=[];return ZD(t,n),n}function ZD(t,n){for(let e=0;e<t.length;e++){let r=t[e];r instanceof Ro?ZD(r.players,n):n.push(r)}}function ZN(t,n){let e=Object.keys(t),r=Object.keys(n);if(e.length!=r.length)return!1;for(let i=0;i<e.length;i++){let o=e[i];if(!n.hasOwnProperty(o)||t[o]!==n[o])return!1}return!0}function zD(t,n,e){let r=e.get(t);if(!r)return!1;let i=n.get(t);return i?r.forEach(o=>i.add(o)):n.set(t,r),e.delete(t),!0}var Po=class{_driver;_normalizer;_transitionEngine;_timelineEngine;_triggerCache={};onRemovalComplete=(n,e)=>{};constructor(n,e,r){this._driver=e,this._normalizer=r,this._transitionEngine=new og(n.body,e,r),this._timelineEngine=new rg(n.body,e,r),this._transitionEngine.onRemovalComplete=(i,o)=>this.onRemovalComplete(i,o)}registerTrigger(n,e,r,i,o){let s=n+"-"+i,a=this._triggerCache[s];if(!a){let c=[],l=[],d=WD(this._driver,o,c,l);if(c.length)throw bD(i,c);a=PN(i,d,this._normalizer),this._triggerCache[s]=a}this._transitionEngine.registerTrigger(e,i,a)}register(n,e){this._transitionEngine.register(n,e)}destroy(n,e){this._transitionEngine.destroy(n,e)}onInsert(n,e,r,i){this._transitionEngine.insertNode(n,e,r,i)}onRemove(n,e,r){this._transitionEngine.removeNode(n,e,r)}disableAnimations(n,e){this._transitionEngine.markElementAsDisabled(n,e)}process(n,e,r,i){if(r.charAt(0)=="@"){let[o,s]=jp(r),a=i;this._timelineEngine.command(o,e,s,a)}else this._transitionEngine.trigger(n,e,r,i)}listen(n,e,r,i,o){if(r.charAt(0)=="@"){let[s,a]=jp(r);return this._timelineEngine.listen(s,e,a,o)}return this._transitionEngine.listen(n,e,r,i,o)}flush(n=-1){this._transitionEngine.flush(n)}get players(){return[...this._transitionEngine.players,...this._timelineEngine.players]}whenRenderingDone(){return this._transitionEngine.whenRenderingDone()}afterFlushAnimationsDone(n){this._transitionEngine.afterFlushAnimationsDone(n)}};function YN(t,n){let e=null,r=null;return Array.isArray(n)&&n.length?(e=Qp(n[0]),n.length>1&&(r=Qp(n[n.length-1]))):n instanceof Map&&(e=Qp(n)),e||r?new XN(t,e,r):null}var XN=(()=>{class t{_element;_startStyles;_endStyles;static initialStylesByElement=new WeakMap;_state=0;_initialStyles;constructor(e,r,i){this._element=e,this._startStyles=r,this._endStyles=i;let o=t.initialStylesByElement.get(e);o||t.initialStylesByElement.set(e,o=new Map),this._initialStyles=o}start(){this._state<1&&(this._startStyles&&ln(this._element,this._startStyles,this._initialStyles),this._state=1)}finish(){this.start(),this._state<2&&(ln(this._element,this._initialStyles),this._endStyles&&(ln(this._element,this._endStyles),this._endStyles=null),this._state=1)}destroy(){this.finish(),this._state<3&&(t.initialStylesByElement.delete(this._element),this._startStyles&&(Pr(this._element,this._startStyles),this._endStyles=null),this._endStyles&&(Pr(this._element,this._endStyles),this._endStyles=null),ln(this._element,this._initialStyles),this._state=3)}}return t})();function Qp(t){let n=null;return t.forEach((e,r)=>{JN(r)&&(n=n||new Map,n.set(r,e))}),n}function JN(t){return t==="display"||t==="position"}var Gd=class{element;keyframes;options;_specialStyles;_onDoneFns=[];_onStartFns=[];_onDestroyFns=[];_duration;_delay;_initialized=!1;_finished=!1;_started=!1;_destroyed=!1;_finalKeyframe;_originalOnDoneFns=[];_originalOnStartFns=[];domPlayer=null;time=0;parentPlayer=null;currentSnapshot=new Map;constructor(n,e,r,i){this.element=n,this.keyframes=e,this.options=r,this._specialStyles=i,this._duration=r.duration,this._delay=r.delay||0,this.time=this._duration+this._delay}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(n=>n()),this._onDoneFns=[])}init(){this._buildPlayer()&&this._preparePlayerBeforeStart()}_buildPlayer(){if(this._initialized)return this.domPlayer;this._initialized=!0;let n=this.keyframes,e=this._triggerWebAnimation(this.element,n,this.options);if(!e)return this._onFinish(),null;this.domPlayer=e,this._finalKeyframe=n.length?n[n.length-1]:new Map;let r=()=>this._onFinish();return e.addEventListener("finish",r),this.onDestroy(()=>{e.removeEventListener("finish",r)}),e}_preparePlayerBeforeStart(){this._delay?this._resetDomPlayerState():this.domPlayer?.pause()}_convertKeyframesToObject(n){let e=[];return n.forEach(r=>{e.push(Object.fromEntries(r))}),e}_triggerWebAnimation(n,e,r){let i=this._convertKeyframesToObject(e);try{return n.animate(i,r)}catch(o){return null}}onStart(n){this._originalOnStartFns.push(n),this._onStartFns.push(n)}onDone(n){this._originalOnDoneFns.push(n),this._onDoneFns.push(n)}onDestroy(n){this._onDestroyFns.push(n)}play(){let n=this._buildPlayer();n&&(this.hasStarted()||(this._onStartFns.forEach(e=>e()),this._onStartFns=[],this._started=!0,this._specialStyles&&this._specialStyles.start()),n.play())}pause(){this.init(),this.domPlayer?.pause()}finish(){this.init(),this.domPlayer&&(this._specialStyles&&this._specialStyles.finish(),this._onFinish(),this.domPlayer.finish())}reset(){this._resetDomPlayerState(),this._destroyed=!1,this._finished=!1,this._started=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}_resetDomPlayerState(){this.domPlayer?.cancel()}restart(){this.reset(),this.play()}hasStarted(){return this._started}destroy(){this._destroyed||(this._destroyed=!0,this._resetDomPlayerState(),this._onFinish(),this._specialStyles&&this._specialStyles.destroy(),this._onDestroyFns.forEach(n=>n()),this._onDestroyFns=[])}setPosition(n){this.domPlayer||this.init(),this.domPlayer&&(this.domPlayer.currentTime=n*this.time)}getPosition(){return this.domPlayer?+(this.domPlayer.currentTime??0)/this.time:this._initialized?1:0}get totalTime(){return this._delay+this._duration}beforeDestroy(){let n=new Map;this.hasStarted()&&this._finalKeyframe.forEach((r,i)=>{i!=="offset"&&n.set(i,this._finished?r:Fd(this.element,i))}),this.currentSnapshot=n}triggerCallback(n){let e=n==="start"?this._onStartFns:this._onDoneFns;e.forEach(r=>r()),e.length=0}},Wd=class{validateStyleProperty(n){return!0}validateAnimatableStyleProperty(n){return!0}containsElement(n,e){return Vp(n,e)}getParentElement(n){return Ad(n)}query(n,e,r){return Bp(n,e,r)}computeStyle(n,e,r){return Fd(n,e)}animate(n,e,r,i,o,s=[]){let a=i==0?"both":"forwards",c={duration:r,delay:i,fill:a};o&&(c.easing=o);let l=new Map,d=s.filter(m=>m instanceof Gd);ND(r,i)&&d.forEach(m=>{m.currentSnapshot.forEach((p,v)=>l.set(v,p))});let u=AD(e).map(m=>new Map(m));u=OD(n,u,l);let h=YN(n,u);return new Gd(n,u,c,h)}};var Vd="@",YD="@.disabled",qd=class{namespaceId;delegate;engine;_onDestroy;\u0275type=0;constructor(n,e,r,i){this.namespaceId=n,this.delegate=e,this.engine=r,this._onDestroy=i}get data(){return this.delegate.data}destroyNode(n){this.delegate.destroyNode?.(n)}destroy(){this.engine.destroy(this.namespaceId,this.delegate),this.engine.afterFlushAnimationsDone(()=>{queueMicrotask(()=>{this.delegate.destroy()})}),this._onDestroy?.()}createElement(n,e){return this.delegate.createElement(n,e)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}appendChild(n,e){this.delegate.appendChild(n,e),this.engine.onInsert(this.namespaceId,e,n,!1)}insertBefore(n,e,r,i=!0){this.delegate.insertBefore(n,e,r),this.engine.onInsert(this.namespaceId,e,n,i)}removeChild(n,e,r,i){if(i){this.delegate.removeChild(n,e,r,i);return}this.parentNode(e)&&this.engine.onRemove(this.namespaceId,e,this.delegate)}selectRootElement(n,e){return this.delegate.selectRootElement(n,e)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,e,r,i){this.delegate.setAttribute(n,e,r,i)}removeAttribute(n,e,r){this.delegate.removeAttribute(n,e,r)}addClass(n,e){this.delegate.addClass(n,e)}removeClass(n,e){this.delegate.removeClass(n,e)}setStyle(n,e,r,i){this.delegate.setStyle(n,e,r,i)}removeStyle(n,e,r){this.delegate.removeStyle(n,e,r)}setProperty(n,e,r){e.charAt(0)==Vd&&e==YD?this.disableAnimations(n,!!r):this.delegate.setProperty(n,e,r)}setValue(n,e){this.delegate.setValue(n,e)}listen(n,e,r,i){return this.delegate.listen(n,e,r,i)}disableAnimations(n,e){this.engine.disableAnimations(n,e)}},sg=class extends qd{factory;constructor(n,e,r,i,o){super(e,r,i,o),this.factory=n,this.namespaceId=e}setProperty(n,e,r){e.charAt(0)==Vd?e.charAt(1)=="."&&e==YD?(r=r===void 0?!0:!!r,this.disableAnimations(n,r)):this.engine.process(this.namespaceId,n,e.slice(1),r):this.delegate.setProperty(n,e,r)}listen(n,e,r,i){if(e.charAt(0)==Vd){let o=eO(n),s=e.slice(1),a="";return s.charAt(0)!=Vd&&([s,a]=tO(s)),this.engine.listen(this.namespaceId,o,s,a,c=>{let l=c._data||-1;this.factory.scheduleListenerCallback(l,r,c)})}return this.delegate.listen(n,e,r,i)}};function eO(t){switch(t){case"body":return document.body;case"document":return document;case"window":return window;default:return t}}function tO(t){let n=t.indexOf("."),e=t.substring(0,n),r=t.slice(n+1);return[e,r]}var Kd=class{delegate;engine;_zone;_currentId=0;_microtaskId=1;_animationCallbacksBuffer=[];_rendererCache=new Map;_cdRecurDepth=0;constructor(n,e,r){this.delegate=n,this.engine=e,this._zone=r,e.onRemovalComplete=(i,o)=>{o?.removeChild(null,i)}}createRenderer(n,e){let i=this.delegate.createRenderer(n,e);if(!n||!e?.data?.animation){let l=this._rendererCache,d=l.get(i);if(!d){let u=()=>l.delete(i);d=new qd("",i,this.engine,u),l.set(i,d)}return d}let o=e.id,s=e.id+"-"+this._currentId;this._currentId++,this.engine.register(s,n);let a=l=>{Array.isArray(l)?l.forEach(a):this.engine.registerTrigger(o,s,n,l.name,l)};return e.data.animation.forEach(a),new sg(this,s,i,this.engine)}begin(){this._cdRecurDepth++,this.delegate.begin&&this.delegate.begin()}_scheduleCountTask(){queueMicrotask(()=>{this._microtaskId++})}scheduleListenerCallback(n,e,r){if(n>=0&&n<this._microtaskId){this._zone.run(()=>e(r));return}let i=this._animationCallbacksBuffer;i.length==0&&queueMicrotask(()=>{this._zone.run(()=>{i.forEach(o=>{let[s,a]=o;s(a)}),this._animationCallbacksBuffer=[]})}),i.push([e,r])}end(){this._cdRecurDepth--,this._cdRecurDepth==0&&this._zone.runOutsideAngular(()=>{this._scheduleCountTask(),this.engine.flush(this._microtaskId)}),this.delegate.end&&this.delegate.end()}whenRenderingDone(){return this.engine.whenRenderingDone()}componentReplaced(n){this.engine.flush(),this.delegate.componentReplaced?.(n)}};var rO=(()=>{class t extends Po{constructor(e,r,i){super(e,r,i)}ngOnDestroy(){this.flush()}static \u0275fac=function(r){return new(r||t)(w($),w(Ii),w(xi))};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();function iO(){return new Bd}function oO(){return new Kd(f(la),f(Po),f(P))}var JD=[{provide:xi,useFactory:iO},{provide:Po,useClass:rO},{provide:st,useFactory:oO}],sO=[{provide:Ii,useClass:ag},{provide:Do,useValue:"NoopAnimations"},...JD],XD=[{provide:Ii,useFactory:()=>new Wd},{provide:Do,useFactory:()=>"BrowserAnimations"},...JD],eC=(()=>{class t{static withConfig(e){return{ngModule:t,providers:e.disableAnimations?sO:XD}}static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({providers:XD,imports:[ua]})}return t})();function Qd(t,n){let r=!n?.manualCleanup?n?.injector?.get(Ze)??f(Ze):null,i=aO(n?.equal),o;n?.requireSync?o=Se({kind:0},{equal:i}):o=Se({kind:1,value:n?.initialValue},{equal:i});let s,a=t.subscribe({next:c=>o.set({kind:1,value:c}),error:c=>{o.set({kind:2,error:c}),s?.()},complete:()=>{s?.()}});if(n?.requireSync&&o().kind===0)throw new _(601,!1);return s=r?.onDestroy(a.unsubscribe.bind(a)),Nr(()=>{let c=o();switch(c.kind){case 1:return c.value;case 2:throw c.error;case 0:throw new _(601,!1)}},{equal:n?.equal})}function aO(t=Object.is){return(n,e)=>n.kind===1&&e.kind===1&&t(n.value,e.value)}var cO={};function lO(t,n){if(t==null)throw new Error(`${n} must be defined.`)}var Da="@ngrx/store/init",un=(()=>{class t extends De{constructor(){super({type:Da})}next(e){if(typeof e=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof e>"u")throw new TypeError("Actions must be objects");if(typeof e.type>"u")throw new TypeError("Actions must have a type property");super.next(e)}complete(){}ngOnDestroy(){super.complete()}static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),dO=[un],pg=new g("@ngrx/store Internal Root Guard"),tC=new g("@ngrx/store Internal Initial State"),Ca=new g("@ngrx/store Initial State"),gC=new g("@ngrx/store Reducer Factory"),nC=new g("@ngrx/store Internal Reducer Factory Provider"),vC=new g("@ngrx/store Initial Reducers"),lg=new g("@ngrx/store Internal Initial Reducers"),rC=new g("@ngrx/store Store Features"),iC=new g("@ngrx/store Internal Store Reducers"),dg=new g("@ngrx/store Internal Feature Reducers"),oC=new g("@ngrx/store Internal Feature Configs"),gg=new g("@ngrx/store Internal Store Features"),sC=new g("@ngrx/store Internal Feature Reducers Token"),vg=new g("@ngrx/store Feature Reducers"),aC=new g("@ngrx/store User Provided Meta Reducers"),Zd=new g("@ngrx/store Meta Reducers"),cC=new g("@ngrx/store Internal Resolved Meta Reducers"),lC=new g("@ngrx/store User Runtime Checks Config"),dC=new g("@ngrx/store Internal User Runtime Checks Config"),wa=new g("@ngrx/store Internal Runtime Checks"),Ia=new g("@ngrx/store Check if Action types are unique"),ug=new g("@ngrx/store Root Store Provider"),uC=new g("@ngrx/store Feature State Provider");function yg(t,n={}){let e=Object.keys(t),r={};for(let o=0;o<e.length;o++){let s=e[o];typeof t[s]=="function"&&(r[s]=t[s])}let i=Object.keys(r);return function(s,a){s=s===void 0?n:s;let c=!1,l={};for(let d=0;d<i.length;d++){let u=i[d],h=r[u],m=s[u],p=h(m,a);l[u]=p,c=c||p!==m}return c?l:s}}function uO(t,n){return Object.keys(t).filter(e=>e!==n).reduce((e,r)=>Object.assign(e,{[r]:t[r]}),{})}function yC(...t){return function(n){if(t.length===0)return n;let e=t[t.length-1];return t.slice(0,-1).reduceRight((i,o)=>o(i),e(n))}}function bC(t,n){return Array.isArray(n)&&n.length>0&&(t=yC.apply(null,[...n,t])),(e,r)=>{let i=t(e);return(o,s)=>(o=o===void 0?r:o,i(o,s))}}function fO(t){let n=Array.isArray(t)&&t.length>0?yC(...t):e=>e;return(e,r)=>(e=n(e),(i,o)=>(i=i===void 0?r:i,e(i,o)))}var Lr=class extends V{},Lo=class extends un{},Yd="@ngrx/store/update-reducers",Ea=(()=>{class t extends De{get currentReducers(){return this.reducers}constructor(e,r,i,o){super(o(i,r)),this.dispatcher=e,this.initialState=r,this.reducers=i,this.reducerFactory=o}addFeature(e){this.addFeatures([e])}addFeatures(e){let r=e.reduce((i,{reducers:o,reducerFactory:s,metaReducers:a,initialState:c,key:l})=>{let d=typeof o=="function"?fO(a)(o,c):bC(s,a)(o,c);return i[l]=d,i},{});this.addReducers(r)}removeFeature(e){this.removeFeatures([e])}removeFeatures(e){this.removeReducers(e.map(r=>r.key))}addReducer(e,r){this.addReducers({[e]:r})}addReducers(e){this.reducers=b(b({},this.reducers),e),this.updateReducers(Object.keys(e))}removeReducer(e){this.removeReducers([e])}removeReducers(e){e.forEach(r=>{this.reducers=uO(this.reducers,r)}),this.updateReducers(e)}updateReducers(e){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:Yd,features:e})}ngOnDestroy(){this.complete()}static{this.\u0275fac=function(r){return new(r||t)(w(Lo),w(Ca),w(vC),w(gC))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),hO=[Ea,{provide:Lr,useExisting:Ea},{provide:Lo,useExisting:un}],Vo=(()=>{class t extends F{ngOnDestroy(){this.complete()}static{this.\u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})()}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),mO=[Vo],jo=class extends V{},fC=(()=>{class t extends De{static{this.INIT=Da}constructor(e,r,i,o){super(o);let a=e.pipe(Hn(ms)).pipe(Es(r)),c={state:o},l=a.pipe(bs(pO,c));this.stateSubscription=l.subscribe(({state:d,action:u})=>{this.next(d),i.next(u)}),this.state=Qd(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}static{this.\u0275fac=function(r){return new(r||t)(w(un),w(Lr),w(Vo),w(Ca))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})();function pO(t={state:void 0},[n,e]){let{state:r}=t;return{state:e(r,n),action:n}}var gO=[fC,{provide:jo,useExisting:fC}],Xd=(()=>{class t extends V{constructor(e,r,i,o){super(),this.actionsObserver=r,this.reducerManager=i,this.injector=o,this.source=e,this.state=e.state}select(e,...r){return yO.call(null,e,...r)(this)}selectSignal(e,r){return Nr(()=>e(this.state()),r)}lift(e){let r=new t(this,this.actionsObserver,this.reducerManager);return r.operator=e,r}dispatch(e,r){if(typeof e=="function")return this.processDispatchFn(e,r);this.actionsObserver.next(e)}next(e){this.actionsObserver.next(e)}error(e){this.actionsObserver.error(e)}complete(){this.actionsObserver.complete()}addReducer(e,r){this.reducerManager.addReducer(e,r)}removeReducer(e){this.reducerManager.removeReducer(e)}processDispatchFn(e,r){lO(this.injector,"Store Injector");let i=r?.injector??bO()??this.injector;return fi(()=>{let o=e();Ye(()=>this.dispatch(o))},{injector:i})}static{this.\u0275fac=function(r){return new(r||t)(w(jo),w(un),w(Ea),w(X))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),vO=[Xd];function yO(t,n,...e){return function(i){let o;if(typeof t=="string"){let s=[n,...e].filter(Boolean);o=i.pipe(wf(t,...s))}else if(typeof t=="function")o=i.pipe(A(s=>t(s,n)));else throw new TypeError(`Unexpected type '${typeof t}' in select operator, expected 'string' or 'function'`);return o.pipe(Xi())}}function bO(){try{return f(X)}catch(t){return}}var bg="https://ngrx.io/guide/store/configuration/runtime-checks";function hC(t){return t===void 0}function mC(t){return t===null}function _C(t){return Array.isArray(t)}function _O(t){return typeof t=="string"}function wO(t){return typeof t=="boolean"}function EO(t){return typeof t=="number"}function wC(t){return typeof t=="object"&&t!==null}function DO(t){return wC(t)&&!_C(t)}function CO(t){if(!DO(t))return!1;let n=Object.getPrototypeOf(t);return n===Object.prototype||n===null}function fg(t){return typeof t=="function"}function IO(t){return fg(t)&&t.hasOwnProperty("\u0275cmp")}function xO(t,n){return Object.prototype.hasOwnProperty.call(t,n)}function SO(t){return t instanceof g?f(t):t}function TO(t,n){return n.map((e,r)=>{if(t[r]instanceof g){let i=f(t[r]);return{key:e.key,reducerFactory:i.reducerFactory?i.reducerFactory:yg,metaReducers:i.metaReducers?i.metaReducers:[],initialState:i.initialState}}return e})}function MO(t){return t.map(n=>n instanceof g?f(n):n)}function _g(t){return typeof t=="function"?t():t}function kO(t,n){return t.concat(n)}function AO(){if(f(Xd,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function RO(t,n){return function(e,r){let i=n.action(r)?hg(r):r,o=t(e,i);return n.state()?hg(o):o}}function hg(t){Object.freeze(t);let n=fg(t);return Object.getOwnPropertyNames(t).forEach(e=>{if(!e.startsWith("\u0275")&&xO(t,e)&&(!n||e!=="caller"&&e!=="callee"&&e!=="arguments")){let r=t[e];(wC(r)||fg(r))&&!Object.isFrozen(r)&&hg(r)}}),t}function NO(t,n){return function(e,r){if(n.action(r)){let o=mg(r);pC(o,"action")}let i=t(e,r);if(n.state()){let o=mg(i);pC(o,"state")}return i}}function mg(t,n=[]){return(hC(t)||mC(t))&&n.length===0?{path:["root"],value:t}:Object.keys(t).reduce((r,i)=>{if(r)return r;let o=t[i];return IO(o)?r:hC(o)||mC(o)||EO(o)||wO(o)||_O(o)||_C(o)?!1:CO(o)?mg(o,[...n,i]):{path:[...n,i],value:o}},!1)}function pC(t,n){if(t===!1)return;let e=t.path.join("."),r=new Error(`Detected unserializable ${n} at "${e}". ${bg}#strict${n}serializability`);throw r.value=t.value,r.unserializablePath=e,r}function OO(t,n){return function(e,r){if(n.action(r)&&!P.isInAngularZone())throw new Error(`Action '${r.type}' running outside NgZone. ${bg}#strictactionwithinngzone`);return t(e,r)}}function FO(t){return _E()?b({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},t):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function PO({strictActionSerializability:t,strictStateSerializability:n}){return e=>t||n?NO(e,{action:r=>t&&!wg(r),state:()=>n}):e}function LO({strictActionImmutability:t,strictStateImmutability:n}){return e=>t||n?RO(e,{action:r=>t&&!wg(r),state:()=>n}):e}function wg(t){return t.type.startsWith("@ngrx")}function jO({strictActionWithinNgZone:t}){return n=>t?OO(n,{action:e=>t&&!wg(e)}):n}function VO(t){return[{provide:dC,useValue:t},{provide:lC,useFactory:BO,deps:[dC]},{provide:wa,deps:[lC],useFactory:FO},{provide:Zd,multi:!0,deps:[wa],useFactory:LO},{provide:Zd,multi:!0,deps:[wa],useFactory:PO},{provide:Zd,multi:!0,deps:[wa],useFactory:jO}]}function EC(){return[{provide:Ia,multi:!0,deps:[wa],useFactory:UO}]}function BO(t){return t}function UO(t){if(!t.strictActionTypeUniqueness)return;let n=Object.entries(cO).filter(([,e])=>e>1).map(([e])=>e);if(n.length)throw new Error(`Action types are registered more than once, ${n.map(e=>`"${e}"`).join(", ")}. ${bg}#strictactiontypeuniqueness`)}function HO(t={},n={}){return[{provide:pg,useFactory:AO},{provide:tC,useValue:n.initialState},{provide:Ca,useFactory:_g,deps:[tC]},{provide:lg,useValue:t},{provide:iC,useExisting:t instanceof g?t:lg},{provide:vC,deps:[lg,[new $l(iC)]],useFactory:SO},{provide:aC,useValue:n.metaReducers?n.metaReducers:[]},{provide:cC,deps:[Zd,aC],useFactory:kO},{provide:nC,useValue:n.reducerFactory?n.reducerFactory:yg},{provide:gC,deps:[nC,cC],useFactory:bC},dO,hO,mO,gO,vO,VO(n.runtimeChecks),EC()]}function $O(){f(un),f(Lr),f(Vo),f(Xd),f(pg,{optional:!0}),f(Ia,{optional:!0})}var AQ=[{provide:ug,useFactory:$O},il(()=>f(ug))];function zO(){f(ug);let t=f(gg),n=f(vg),e=f(Ea);f(Ia,{optional:!0});let r=t.map((i,o)=>{let a=n.shift()[o];return W(b({},i),{reducers:a,initialState:_g(i.initialState)})});e.addFeatures(r)}var RQ=[{provide:uC,useFactory:zO},il(()=>f(uC))];function GO(t,n,e={}){return[{provide:oC,multi:!0,useValue:t instanceof Object?{}:e},{provide:rC,multi:!0,useValue:{key:t instanceof Object?t.name:t,reducerFactory:!(e instanceof g)&&e.reducerFactory?e.reducerFactory:yg,metaReducers:!(e instanceof g)&&e.metaReducers?e.metaReducers:[],initialState:!(e instanceof g)&&e.initialState?e.initialState:void 0}},{provide:gg,deps:[oC,rC],useFactory:TO},{provide:dg,multi:!0,useValue:t instanceof Object?t.reducer:n},{provide:sC,multi:!0,useExisting:n instanceof g?n:dg},{provide:vg,multi:!0,deps:[dg,[new $l(sC)]],useFactory:MO},EC()]}var DC=(()=>{class t{constructor(e,r,i,o,s,a){}static{this.\u0275fac=function(r){return new(r||t)(w(un),w(Lr),w(Vo),w(Xd),w(pg,8),w(Ia,8))}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({})}}return t})(),WO=(()=>{class t{constructor(e,r,i,o,s){this.features=e,this.featureReducers=r,this.reducerManager=i;let a=e.map((c,l)=>{let u=r.shift()[l];return W(b({},c),{reducers:u,initialState:_g(c.initialState)})});i.addFeatures(a)}ngOnDestroy(){this.reducerManager.removeFeatures(this.features)}static{this.\u0275fac=function(r){return new(r||t)(w(gg),w(vg),w(Ea),w(DC),w(Ia,8))}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({})}}return t})(),Eg=(()=>{class t{static forRoot(e,r){return{ngModule:DC,providers:[...HO(e,r)]}}static forFeature(e,r,i={}){return{ngModule:WO,providers:[...GO(e,r,i)]}}static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({})}}return t})();var Sa="PERFORM_ACTION",KO="REFRESH",MC="RESET",kC="ROLLBACK",AC="COMMIT",RC="SWEEP",NC="TOGGLE_ACTION",QO="SET_ACTIONS_ACTIVE",OC="JUMP_TO_STATE",FC="JUMP_TO_ACTION",Fg="IMPORT_STATE",PC="LOCK_CHANGES",LC="PAUSE_RECORDING",Bo=class{constructor(n,e){if(this.action=n,this.timestamp=e,this.type=Sa,typeof n.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},Dg=class{constructor(){this.type=KO}},Cg=class{constructor(n){this.timestamp=n,this.type=MC}},Ig=class{constructor(n){this.timestamp=n,this.type=kC}},xg=class{constructor(n){this.timestamp=n,this.type=AC}},Sg=class{constructor(){this.type=RC}},Tg=class{constructor(n){this.id=n,this.type=NC}};var Mg=class{constructor(n){this.index=n,this.type=OC}},kg=class{constructor(n){this.actionId=n,this.type=FC}},Ag=class{constructor(n){this.nextLiftedState=n,this.type=Fg}},Rg=class{constructor(n){this.status=n,this.type=PC}},Ng=class{constructor(n){this.status=n,this.type=LC}};var nu=new g("@ngrx/store-devtools Options"),CC=new g("@ngrx/store-devtools Initial Config");function jC(){return null}var ZO="NgRx Store DevTools";function YO(t){let n={maxAge:!1,monitor:jC,actionSanitizer:void 0,stateSanitizer:void 0,name:ZO,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},e=typeof t=="function"?t():t,r=e.logOnly?{pause:!0,export:!0,test:!0}:!1,i=e.features||r||n.features;i.import===!0&&(i.import="custom");let o=Object.assign({},n,{features:i},e);if(o.maxAge&&o.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${o.maxAge}`);return o}function IC(t,n){return t.filter(e=>n.indexOf(e)<0)}function VC(t){let{computedStates:n,currentStateIndex:e}=t;if(e>=n.length){let{state:i}=n[n.length-1];return i}let{state:r}=n[e];return r}function xa(t){return new Bo(t,+Date.now())}function XO(t,n){return Object.keys(n).reduce((e,r)=>{let i=Number(r);return e[i]=BC(t,n[i],i),e},{})}function BC(t,n,e){return W(b({},n),{action:t(n.action,e)})}function JO(t,n){return n.map((e,r)=>({state:UC(t,e.state,r),error:e.error}))}function UC(t,n,e){return t(n,e)}function HC(t){return t.predicate||t.actionsSafelist||t.actionsBlocklist}function eF(t,n,e,r){let i=[],o={},s=[];return t.stagedActionIds.forEach((a,c)=>{let l=t.actionsById[a];l&&(c&&Pg(t.computedStates[c],l,n,e,r)||(o[a]=l,i.push(a),s.push(t.computedStates[c])))}),W(b({},t),{stagedActionIds:i,actionsById:o,computedStates:s})}function Pg(t,n,e,r,i){let o=e&&!e(t,n.action),s=r&&!n.action.type.match(r.map(c=>xC(c)).join("|")),a=i&&n.action.type.match(i.map(c=>xC(c)).join("|"));return o||s||a}function xC(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $C(t){return{ngZone:t?f(P):null,connectInZone:t}}var ru=(()=>{class t extends un{static{this.\u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})()}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),Jd={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},Og=new g("@ngrx/store-devtools Redux Devtools Extension"),zC=(()=>{class t{constructor(e,r,i){this.config=r,this.dispatcher=i,this.zoneConfig=$C(this.config.connectInZone),this.devtoolsExtension=e,this.createActionStreams()}notify(e,r){if(this.devtoolsExtension)if(e.type===Sa){if(r.isLocked||r.isPaused)return;let i=VC(r);if(HC(this.config)&&Pg(i,e,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let o=this.config.stateSanitizer?UC(this.config.stateSanitizer,i,r.currentStateIndex):i,s=this.config.actionSanitizer?BC(this.config.actionSanitizer,e,r.nextActionId):e;this.sendToReduxDevtools(()=>this.extensionConnection.send(s,o))}else{let i=W(b({},r),{stagedActionIds:r.stagedActionIds,actionsById:this.config.actionSanitizer?XO(this.config.actionSanitizer,r.actionsById):r.actionsById,computedStates:this.config.stateSanitizer?JO(this.config.stateSanitizer,r.computedStates):r.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,i,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new V(e=>{let r=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=r,r.init(),r.subscribe(i=>e.next(i)),r.unsubscribe}):Ne}createActionStreams(){let e=this.createChangesObservable().pipe(_s()),r=e.pipe(ae(l=>l.type===Jd.START)),i=e.pipe(ae(l=>l.type===Jd.STOP)),o=e.pipe(ae(l=>l.type===Jd.DISPATCH),A(l=>this.unwrapAction(l.payload)),_n(l=>l.type===Fg?this.dispatcher.pipe(ae(d=>d.type===Yd),bf(1e3),$n(1e3),A(()=>l),bn(()=>M(l)),ft(1)):M(l))),a=e.pipe(ae(l=>l.type===Jd.ACTION),A(l=>this.unwrapAction(l.payload))).pipe(Ce(i)),c=o.pipe(Ce(i));this.start$=r.pipe(Ce(i)),this.actions$=this.start$.pipe(We(()=>a)),this.liftedActions$=this.start$.pipe(We(()=>c))}unwrapAction(e){return typeof e=="string"?(0,eval)(`(${e})`):e}getExtensionConfig(e){let r={name:e.name,features:e.features,serialize:e.serialize,autoPause:e.autoPause??!1,trace:e.trace??!1,traceLimit:e.traceLimit??75};return e.maxAge!==!1&&(r.maxAge=e.maxAge),r}sendToReduxDevtools(e){try{e()}catch(r){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",r)}}static{this.\u0275fac=function(r){return new(r||t)(w(Og),w(nu),w(ru))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})(),tu={type:Da},tF="@ngrx/store-devtools/recompute",nF={type:tF};function GC(t,n,e,r,i){if(r)return{state:e,error:"Interrupted by an error up the chain"};let o=e,s;try{o=t(e,n)}catch(a){s=a.toString(),i.handleError(a)}return{state:o,error:s}}function eu(t,n,e,r,i,o,s,a,c){if(n>=t.length&&t.length===o.length)return t;let l=t.slice(0,n),d=o.length-(c?1:0);for(let u=n;u<d;u++){let h=o[u],m=i[h].action,p=l[u-1],v=p?p.state:r,E=p?p.error:void 0,k=s.indexOf(h)>-1?p:GC(e,m,v,E,a);l.push(k)}return c&&l.push(t[t.length-1]),l}function rF(t,n){return{monitorState:n(void 0,{}),nextActionId:1,actionsById:{0:xa(tu)},stagedActionIds:[0],skippedActionIds:[],committedState:t,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function iF(t,n,e,r,i={}){return o=>(s,a)=>{let{monitorState:c,actionsById:l,nextActionId:d,stagedActionIds:u,skippedActionIds:h,committedState:m,currentStateIndex:p,computedStates:v,isLocked:E,isPaused:D}=s||n;s||(l=Object.create(l));function k(ie){let Y=ie,se=u.slice(1,Y+1);for(let _e=0;_e<se.length;_e++)if(v[_e+1].error){Y=_e,se=u.slice(1,Y+1);break}else delete l[se[_e]];h=h.filter(_e=>se.indexOf(_e)===-1),u=[0,...u.slice(Y+1)],m=v[Y].state,v=v.slice(Y),p=p>Y?p-Y:0}function Z(){l={0:xa(tu)},d=1,u=[0],h=[],m=v[p].state,p=0,v=[]}let T=0;switch(a.type){case PC:{E=a.status,T=1/0;break}case LC:{D=a.status,D?(u=[...u,d],l[d]=new Bo({type:"@ngrx/devtools/pause"},+Date.now()),d++,T=u.length-1,v=v.concat(v[v.length-1]),p===u.length-2&&p++,T=1/0):Z();break}case MC:{l={0:xa(tu)},d=1,u=[0],h=[],m=t,p=0,v=[];break}case AC:{Z();break}case kC:{l={0:xa(tu)},d=1,u=[0],h=[],p=0,v=[];break}case NC:{let{id:ie}=a;h.indexOf(ie)===-1?h=[ie,...h]:h=h.filter(se=>se!==ie),T=u.indexOf(ie);break}case QO:{let{start:ie,end:Y,active:se}=a,_e=[];for(let Gt=ie;Gt<Y;Gt++)_e.push(Gt);se?h=IC(h,_e):h=[...h,..._e],T=u.indexOf(ie);break}case OC:{p=a.index,T=1/0;break}case FC:{let ie=u.indexOf(a.actionId);ie!==-1&&(p=ie),T=1/0;break}case RC:{u=IC(u,h),h=[],p=Math.min(p,u.length-1);break}case Sa:{if(E)return s||n;if(D||s&&Pg(s.computedStates[p],a,i.predicate,i.actionsSafelist,i.actionsBlocklist)){let Y=v[v.length-1];v=[...v.slice(0,-1),GC(o,a.action,Y.state,Y.error,e)],T=1/0;break}i.maxAge&&u.length===i.maxAge&&k(1),p===u.length-1&&p++;let ie=d++;l[ie]=a,u=[...u,ie],T=u.length-1;break}case Fg:{({monitorState:c,actionsById:l,nextActionId:d,stagedActionIds:u,skippedActionIds:h,committedState:m,currentStateIndex:p,computedStates:v,isLocked:E,isPaused:D}=a.nextLiftedState);break}case Da:{T=0,i.maxAge&&u.length>i.maxAge&&(v=eu(v,T,o,m,l,u,h,e,D),k(u.length-i.maxAge),T=1/0);break}case Yd:{if(v.filter(Y=>Y.error).length>0)T=0,i.maxAge&&u.length>i.maxAge&&(v=eu(v,T,o,m,l,u,h,e,D),k(u.length-i.maxAge),T=1/0);else{if(!D&&!E){p===u.length-1&&p++;let Y=d++;l[Y]=new Bo(a,+Date.now()),u=[...u,Y],T=u.length-1,v=eu(v,T,o,m,l,u,h,e,D)}v=v.map(Y=>W(b({},Y),{state:o(Y.state,nF)})),p=u.length-1,i.maxAge&&u.length>i.maxAge&&k(u.length-i.maxAge),T=1/0}break}default:{T=1/0;break}}return v=eu(v,T,o,m,l,u,h,e,D),c=r(c,a),{monitorState:c,actionsById:l,nextActionId:d,stagedActionIds:u,skippedActionIds:h,committedState:m,currentStateIndex:p,computedStates:v,isLocked:E,isPaused:D}}}var SC=(()=>{class t{constructor(e,r,i,o,s,a,c,l){let d=rF(c,l.monitor),u=iF(c,d,a,l.monitor,l),h=vr(vr(r.asObservable().pipe(ws(1)),o.actions$).pipe(A(xa)),e,o.liftedActions$).pipe(Hn(ms)),m=i.pipe(A(u)),p=$C(l.connectInZone),v=new fs(1);this.liftedStateSubscription=h.pipe(Es(m),TC(p),bs(({state:k},[Z,T])=>{let ie=T(k,Z);return Z.type!==Sa&&HC(l)&&(ie=eF(ie,l.predicate,l.actionsSafelist,l.actionsBlocklist)),o.notify(Z,ie),{state:ie,action:Z}},{state:d,action:null})).subscribe(({state:k,action:Z})=>{if(v.next(k),Z.type===Sa){let T=Z.action;s.next(T)}}),this.extensionStartSubscription=o.start$.pipe(TC(p)).subscribe(()=>{this.refresh()});let E=v.asObservable(),D=E.pipe(A(VC));Object.defineProperty(D,"state",{value:Qd(D,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=e,this.liftedState=E,this.state=D}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(e){this.dispatcher.next(e)}next(e){this.dispatcher.next(e)}error(e){}complete(){}performAction(e){this.dispatch(new Bo(e,+Date.now()))}refresh(){this.dispatch(new Dg)}reset(){this.dispatch(new Cg(+Date.now()))}rollback(){this.dispatch(new Ig(+Date.now()))}commit(){this.dispatch(new xg(+Date.now()))}sweep(){this.dispatch(new Sg)}toggleAction(e){this.dispatch(new Tg(e))}jumpToAction(e){this.dispatch(new kg(e))}jumpToState(e){this.dispatch(new Mg(e))}importState(e){this.dispatch(new Ag(e))}lockChanges(e){this.dispatch(new Rg(e))}pauseRecording(e){this.dispatch(new Ng(e))}static{this.\u0275fac=function(r){return new(r||t)(w(ru),w(un),w(Lr),w(zC),w(Vo),w(rt),w(Ca),w(nu))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac})}}return t})();function TC({ngZone:t,connectInZone:n}){return e=>n?new V(r=>e.subscribe({next:i=>t.run(()=>r.next(i)),error:i=>t.run(()=>r.error(i)),complete:()=>t.run(()=>r.complete())})):e}var oF=new g("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function sF(t,n){return!!t||n.monitor!==jC}function aF(){let t="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[t]<"u"?window[t]:null}function cF(t){return t.state}function lF(t={}){return qt([zC,ru,SC,{provide:CC,useValue:t},{provide:oF,deps:[Og,nu],useFactory:sF},{provide:Og,useFactory:aF},{provide:nu,deps:[CC],useFactory:YO},{provide:jo,deps:[SC],useFactory:cF},{provide:Lo,useExisting:ru}])}var WC=(()=>{class t{static instrument(e={}){return{ngModule:t,providers:[lF(e)]}}static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({})}}return t})();var dF={currentCardIndex:0,cards:[]};function qC(t=dF,n){switch(n.type){default:return t}}var fF=Eg.forRoot({cardsState:qC}),KC=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[an,fF,Eg]})}}return t})();var Uo={production:!0,base:"/learn"};var Lg={dict:"/assets/config/dict.json",config:"/assets/config/audio_config_local.json"};var iu=(()=>{class t{constructor(e){this.http=e}loadConfig(){return this.http.get(jg(Lg.config))}loadDictionary(){return this.http.get(jg(Lg.dict))}resolveAssetUrl(e){return e[0]==="."?jg("/assets"+e.slice(1)):e}static{this.\u0275fac=function(r){return new(r||t)(w(Ao))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function jg(t){return Uo.base+t}var ou=class{constructor(n,e,r){this.targetPhrase=n,this.translation=e,this.id=r}};var ZC=(()=>{class t{constructor(e){this.dataService=e,this.dataReady=new De(!1),ys([this.getTurkishCards(),this.getTurkishConfig()]).pipe(Fe(([r,i])=>{this.cards=r,this.audioConfig=i,this.dataReady.next(!0)})).subscribe()}getAudioConfigForCard(e){return this.audioConfig[e]}getTurkishCards(){return this.dataService.loadDictionary().pipe(Ue(e=>be(e).pipe(A(r=>new ou(r.turkeyText,r.englishText,r.id)),_f())))}getTurkishConfig(){return this.dataService.loadConfig()}static{this.\u0275fac=function(r){return new(r||t)(w(iu))}}static{this.\u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function Ta(t){return t.buttons===0||t.detail===0}function Ma(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Vg;function YC(){if(Vg==null){let t=typeof document<"u"?document.head:null;Vg=!!(t&&(t.createShadowRoot||t.attachShadow))}return Vg}function Bg(t){if(YC()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function Ug(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n}return t}function fn(t){return t.composedPath?t.composedPath()[0]:t.target}var Hg;try{Hg=typeof Intl<"u"&&Intl.v8BreakIterator}catch(t){Hg=!1}var Ae=(()=>{class t{_platformId=f(vi);isBrowser=this._platformId?kE(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Hg)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ka;function XC(){if(ka==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ka=!0}))}finally{ka=ka||!1}return ka}function Ho(t){return XC()?t:!!t.capture}function Si(t,n=0){return JC(t)?Number(t):arguments.length===2?n:0}function JC(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Bt(t){return t instanceof ne?t.nativeElement:t}var e0=new g("cdk-input-modality-detector-options"),t0={ignoreKeys:[18,17,224,91,16]},n0=650,$g={passive:!0,capture:!0},r0=(()=>{class t{_platform=f(Ae);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new De(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(r=>r===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=fn(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<n0||(this._modality.next(Ta(e)?"keyboard":"mouse"),this._mostRecentTarget=fn(e))};_onTouchstart=e=>{if(Ma(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=fn(e)};constructor(){let e=f(P),r=f($),i=f(e0,{optional:!0});if(this._options=b(b({},t0),i),this.modalityDetected=this._modality.pipe(ws(1)),this.modalityChanged=this.modalityDetected.pipe(Xi()),this._platform.isBrowser){let o=f(st).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,$g),o.listen(r,"mousedown",this._onMousedown,$g),o.listen(r,"touchstart",this._onTouchstart,$g)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Aa=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(Aa||{}),i0=new g("cdk-focus-monitor-default-options"),su=Ho({passive:!0,capture:!0}),Ra=(()=>{class t{_ngZone=f(P);_platform=f(Ae);_inputModalityDetector=f(r0);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f($);_stopInputModalityDetector=new F;constructor(){let e=f(i0,{optional:!0});this._detectionMode=e?.detectionMode||Aa.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let r=fn(e);for(let i=r;i;i=i.parentElement)e.type==="focus"?this._onFocus(e,i):this._onBlur(e,i)};monitor(e,r=!1){let i=Bt(e);if(!this._platform.isBrowser||i.nodeType!==1)return M();let o=Bg(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new F,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let r=Bt(e),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(e,r,i){let o=Bt(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,c])=>this._originChanged(a,r,c)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((e,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Aa.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,r){e.classList.toggle("cdk-focused",!!r),e.classList.toggle("cdk-touch-focused",r==="touch"),e.classList.toggle("cdk-keyboard-focused",r==="keyboard"),e.classList.toggle("cdk-mouse-focused",r==="mouse"),e.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(e,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&r,this._detectionMode===Aa.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?n0:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(e,r){let i=this._elementInfo.get(r),o=fn(e);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(e,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&e.relatedTarget instanceof Node&&r.contains(e.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(e,r){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(r))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let r=e.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,su),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,su)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Ce(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(e){let r=e.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,su),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,su),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,r,i){this._setClasses(e,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(e){let r=[];return this._elementInfo.forEach((i,o)=>{(o===e||i.checkChildren&&o.contains(e))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var au=new WeakMap,hn=(()=>{class t{_appRef;_injector=f(X);_environmentInjector=f(Ee);load(e){let r=this._appRef=this._appRef||this._injector.get(Ct),i=au.get(r);i||(i={loaders:new Set,refs:[]},au.set(r,i),r.onDestroy(()=>{au.get(r)?.refs.forEach(o=>o.destroy()),au.delete(r)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(DE(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var o0=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-visually-hidden {
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
`],encapsulation:2,changeDetection:0})}return t})(),cu;function mF(){if(cu===void 0&&(cu=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(cu=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return cu}function $o(t){return mF()?.createHTML(t)||t}var s0=new Set,Ti,zg=(()=>{class t{_platform=f(Ae);_nonce=f(yi,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):gF}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&pF(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function pF(t,n){if(!s0.has(t))try{Ti||(Ti=document.createElement("style"),n&&Ti.setAttribute("nonce",n),Ti.setAttribute("type","text/css"),document.head.appendChild(Ti)),Ti.sheet&&(Ti.sheet.insertRule(`@media ${t} {body{ }}`,0),s0.add(t))}catch(e){console.error(e)}}function gF(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}function vF(t){if(t.type==="characterData"&&t.target instanceof Comment)return!0;if(t.type==="childList"){for(let n=0;n<t.addedNodes.length;n++)if(!(t.addedNodes[n]instanceof Comment))return!1;for(let n=0;n<t.removedNodes.length;n++)if(!(t.removedNodes[n]instanceof Comment))return!1;return!0}return!1}var a0=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),yF=(()=>{class t{_mutationObserverFactory=f(a0);_observedElements=new Map;_ngZone=f(P);constructor(){}ngOnDestroy(){this._observedElements.forEach((e,r)=>this._cleanupObserver(r))}observe(e){let r=Bt(e);return new V(i=>{let s=this._observeElement(r).pipe(A(a=>a.filter(c=>!vF(c))),ae(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{i.next(a)})});return()=>{s.unsubscribe(),this._unobserveElement(r)}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else{let r=new F,i=this._mutationObserverFactory.create(o=>r.next(o));i&&i.observe(e,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(e,{observer:i,stream:r,count:1})}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e))}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:r,stream:i}=this._observedElements.get(e);r&&r.disconnect(),i.complete(),this._observedElements.delete(e)}}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),c0=(()=>{class t{_contentObserver=f(yF);_elementRef=f(ne);event=new de;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(e){this._debounce=Si(e),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe($n(this.debounce)):e).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",ke],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return t})(),l0=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({providers:[a0]})}return t})();var du=(()=>{class t{_platform=f(Ae);constructor(){}isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return _F(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return!1;let r=bF(TF(e));if(r&&(d0(r)===-1||!this.isVisible(r)))return!1;let i=e.nodeName.toLowerCase(),o=d0(e);return e.hasAttribute("contenteditable")?o!==-1:i==="iframe"||i==="object"||this._platform.WEBKIT&&this._platform.IOS&&!xF(e)?!1:i==="audio"?e.hasAttribute("controls")?o!==-1:!1:i==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,r){return SF(e)&&!this.isDisabled(e)&&(r?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function bF(t){try{return t.frameElement}catch(n){return null}}function _F(t){return!!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function wF(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function EF(t){return CF(t)&&t.type=="hidden"}function DF(t){return IF(t)&&t.hasAttribute("href")}function CF(t){return t.nodeName.toLowerCase()=="input"}function IF(t){return t.nodeName.toLowerCase()=="a"}function u0(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return!1;let n=t.getAttribute("tabindex");return!!(n&&!isNaN(parseInt(n,10)))}function d0(t){if(!u0(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function xF(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function SF(t){return EF(t)?!1:wF(t)||DF(t)||t.hasAttribute("contenteditable")||u0(t)}function TF(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var lu=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_enabled=!0;constructor(n,e,r,i,o=!1,s){this._element=n,this._checker=e,this._ngZone=r,this._document=i,this._injector=s,o||this.attachAnchors()}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)))})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)))})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)))})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let r=this._getFirstTabbableElement(e);return r?.focus(n),!!r}return e.focus(n),!0}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let r=0;r<e.length;r++){let i=e[r].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[r]):null;if(i)return i}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let r=e.length-1;r>=0;r--){let i=e[r].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[r]):null;if(i)return i}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex")}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor))}_executeOnStable(n){this._injector?nn(n,{injector:this._injector}):setTimeout(n)}},Gg=(()=>{class t{_checker=f(du);_ngZone=f(P);_document=f($);_injector=f(X);constructor(){f(hn).load(o0)}create(e,r=!1){return new lu(e,this._checker,this._ngZone,this._document,r,this._injector)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var MF=200,uu=class{_letterKeyStream=new F;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new F;selectedItem=this._selectedItem;constructor(n,e){let r=typeof e?.debounceInterval=="number"?e.debounceInterval:MF;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(Fe(e=>this._pressedLetters.push(e)),$n(n),ae(()=>this._pressedLetters.length>0),A(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let r=1;r<this._items.length+1;r++){let i=(this._selectedItemIndex+r)%this._items.length,o=this._items[i];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function zo(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var fu=class{_items;_activeItemIndex=Se(-1);_activeItem=Se(null);_wrap=!1;_typeaheadSubscription=we.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof Yn?this._itemChangesSubscription=n.changes.subscribe(r=>this._itemsChanged(r.toArray())):Ys(n)&&(this._effectRef=fi(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new F;change=new F;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new uu(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,i=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&i){this.setNextItemActive();break}else return;case 38:if(this._vertical&&i){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&i){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&i){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&i){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&i){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&i){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(i||zo(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),r=typeof n=="number"?n:e.indexOf(n),i=e[r];this._activeItem.set(i??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let r=1;r<=e.length;r++){let i=(this._activeItemIndex()+n*r+e.length)%e.length,o=e[i];if(!this._skipPredicateFn(o)){this.setActiveItem(i);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let r=this._getItemsArray();if(r[n]){for(;this._skipPredicateFn(r[n]);)if(n+=e,!r[n])return;this.setActiveItem(n)}}_getItemsArray(){return Ys(this._items)?this._items():this._items instanceof Yn?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let r=n.indexOf(e);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var Na=class extends fu{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var Wg={},Oa=class t{_appId=f(Eo);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){return this._appId!=="ng"&&(n+=this._appId),Wg.hasOwnProperty(n)||(Wg[n]=0),`${n}${e?t._infix+"-":""}${Wg[n]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})};var mn=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})(mn||{}),hu,Mi;function h0(){if(Mi==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Mi=!1,Mi;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Mi=!0;else{let t=Element.prototype.scrollTo;t?Mi=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Mi=!1}}return Mi}function Go(){if(typeof document!="object"||!document)return mn.NORMAL;if(hu==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),r=e.style;r.width="2px",r.height="1px",t.appendChild(e),document.body.appendChild(t),hu=mn.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,hu=t.scrollLeft===0?mn.NEGATED:mn.INVERTED),t.remove()}return hu}var kF=new g("MATERIAL_ANIMATIONS"),m0=null;function AF(){return f(kF,{optional:!0})?.animationsDisabled||f(Do,{optional:!0})==="NoopAnimations"?"di-disabled":(m0??=f(zg).matchMedia("(prefers-reduced-motion)").matches,m0?"reduced-motion":"enabled")}function Ut(){return AF()!=="enabled"}function _t(t){return t!=null&&`${t}`!="false"}var Ht=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Ht||{}),qg=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Ht.HIDDEN;constructor(n,e,r,i=!1){this._renderer=n,this.element=e,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},p0=Ho({passive:!0,capture:!0}),Kg=class{_events=new Map;addHandler(n,e,r,i){let o=this._events.get(e);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(e,new Map([[r,new Set([i])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,p0)})}removeHandler(n,e,r){let i=this._events.get(n);if(!i)return;let o=i.get(e);o&&(o.delete(r),o.size===0&&i.delete(e),i.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,p0)))}_delegateEventHandler=n=>{let e=fn(n);e&&this._events.get(n.type)?.forEach((r,i)=>{(i===e||i.contains(e))&&r.forEach(o=>o.handleEvent(n))})}},Fa={enterDuration:225,exitDuration:150},RF=800,g0=Ho({passive:!0,capture:!0}),v0=["mousedown","touchstart"],y0=["mouseup","mouseleave","touchend","touchcancel"],NF=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
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
`],encapsulation:2,changeDetection:0})}return t})(),ki=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Kg;constructor(n,e,r,i,o){this._target=n,this._ngZone=e,this._platform=i,i.isBrowser&&(this._containerElement=Bt(r)),o&&o.get(hn).load(NF)}fadeInRipple(n,e,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=b(b({},Fa),r.animation);r.centered&&(n=i.left+i.width/2,e=i.top+i.height/2);let s=r.radius||OF(n,e,i),a=n-i.left,c=e-i.top,l=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${c-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,r.color!=null&&(d.style.backgroundColor=r.color),d.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),h=u.transitionProperty,m=u.transitionDuration,p=h==="none"||m==="0s"||m==="0s, 0s"||i.width===0&&i.height===0,v=new qg(this,d,r,p);d.style.transform="scale3d(1, 1, 1)",v.state=Ht.FADING_IN,r.persistent||(this._mostRecentTransientRipple=v);let E=null;return!p&&(l||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let D=()=>{E&&(E.fallbackTimer=null),clearTimeout(Z),this._finishRippleTransition(v)},k=()=>this._destroyRipple(v),Z=setTimeout(k,l+100);d.addEventListener("transitionend",D),d.addEventListener("transitioncancel",k),E={onTransitionEnd:D,onTransitionCancel:k,fallbackTimer:Z}}),this._activeRipples.set(v,E),(p||!l)&&this._finishRippleTransition(v),v}fadeOutRipple(n){if(n.state===Ht.FADING_OUT||n.state===Ht.HIDDEN)return;let e=n.element,r=b(b({},Fa),n.config.animation);e.style.transitionDuration=`${r.exitDuration}ms`,e.style.opacity="0",n.state=Ht.FADING_OUT,(n._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Bt(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,v0.forEach(r=>{t._eventManager.addHandler(this._ngZone,r,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{y0.forEach(e=>{this._triggerElement.addEventListener(e,this,g0)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Ht.FADING_IN?this._startFadeOutTransition(n):n.state===Ht.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:r}=n.config;n.state=Ht.VISIBLE,!r&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Ht.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=Ta(n),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+RF;!this._target.rippleDisabled&&!e&&!r&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Ma(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let r=0;r<e.length;r++)this.fadeInRipple(e[r].clientX,e[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===Ht.VISIBLE||n.config.terminateOnPointerUp&&n.state===Ht.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(v0.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(y0.forEach(e=>n.removeEventListener(e,this,g0)),this._pointerUpEventsRegistered=!1))}};function OF(t,n,e){let r=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),i=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(r*r+i*i)}var Pa=new g("mat-ripple-global-options"),b0=(()=>{class t{_elementRef=f(ne);_animationsDisabled=Ut();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=f(P),r=f(Ae),i=f(Pa,{optional:!0}),o=f(X);this._globalOptions=i||{},this._rippleRenderer=new ki(this,e,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:b(b(b({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,r=0,i){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,r,b(b({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,b(b({},this.rippleConfig),e))}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&re("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var FF={capture:!0},PF=["focus","mousedown","mouseenter","touchstart"],Qg="mat-ripple-loader-uninitialized",Zg="mat-ripple-loader-class-name",_0="mat-ripple-loader-centered",mu="mat-ripple-loader-disabled",w0=(()=>{class t{_document=f($);_animationsDisabled=Ut();_globalRippleOptions=f(Pa,{optional:!0});_platform=f(Ae);_ngZone=f(P);_injector=f(X);_eventCleanups;_hosts=new Map;constructor(){let e=f(st).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>PF.map(r=>e.listen(this._document,r,this._onInteraction,FF)))}ngOnDestroy(){let e=this._hosts.keys();for(let r of e)this.destroyRipple(r);this._eventCleanups.forEach(r=>r())}configureRipple(e,r){e.setAttribute(Qg,this._globalRippleOptions?.namespace??""),(r.className||!e.hasAttribute(Zg))&&e.setAttribute(Zg,r.className||""),r.centered&&e.setAttribute(_0,""),r.disabled&&e.setAttribute(mu,"")}setDisabled(e,r){let i=this._hosts.get(e);i?(i.target.rippleDisabled=r,!r&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(e))):r?e.setAttribute(mu,""):e.removeAttribute(mu)}_onInteraction=e=>{let r=fn(e);if(r instanceof HTMLElement){let i=r.closest(`[${Qg}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let r=this._document.createElement("span");r.classList.add("mat-ripple",e.getAttribute(Zg)),e.append(r);let i=this._globalRippleOptions,o=this._animationsDisabled?0:i?.animation?.enterDuration??Fa.enterDuration,s=this._animationsDisabled?0:i?.animation?.exitDuration??Fa.exitDuration,a={rippleDisabled:this._animationsDisabled||i?.disabled||e.hasAttribute(mu),rippleConfig:{centered:e.hasAttribute(_0),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},c=new ki(a,this._ngZone,r,this._platform,this._injector),l=!a.rippleDisabled;l&&c.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:c,hasSetUpEvents:l}),e.removeAttribute(Qg)}destroyRipple(e){let r=this._hosts.get(e);r&&(r.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Wo=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2,changeDetection:0})}return t})();var LF=["mat-icon-button",""],jF=["*"],VF=new g("MAT_BUTTON_CONFIG");function E0(t){return t==null?void 0:na(t)}var pu=(()=>{class t{_elementRef=f(ne);_ngZone=f(P);_animationsDisabled=Ut();_config=f(VF,{optional:!0});_focusMonitor=f(Ra);_cleanupClick;_renderer=f(Mt);_rippleLoader=f(w0);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}constructor(){f(hn).load(Wo);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",r){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,r):this._elementRef.nativeElement.focus(r)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(r,i){r&2&&(Le("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),or(i.color?"mat-"+i.color:""),re("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",ke],disabled:[2,"disabled","disabled",ke],ariaDisabled:[2,"aria-disabled","ariaDisabled",ke],disabledInteractive:[2,"disabledInteractive","disabledInteractive",ke],tabIndex:[2,"tabIndex","tabIndex",E0],_tabindex:[2,"tabindex","_tabindex",E0]}})}return t})(),Ai=(()=>{class t extends pu{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[ct],attrs:LF,ngContentSelectors:jF,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,i){r&1&&(xe(),rn(0,"span",0),te(1),rn(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2,changeDetection:0})}return t})();var BF=new g("cdk-dir-doc",{providedIn:"root",factory:()=>f($)}),UF=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function D0(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?UF.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var La=(()=>{class t{get value(){return this.valueSignal()}valueSignal=Se("ltr");change=new de;constructor(){let e=f(BF,{optional:!0});if(e){let r=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(D0(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Be=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();var gu=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var HF=["matButton",""],I0=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],x0=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var $F=["mat-mini-fab",""],zF=`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}
`,C0=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),S0=(()=>{class t extends pu{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=GF(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let r=this._elementRef.nativeElement.classList,i=this._appearance?C0.get(this._appearance):null,o=C0.get(e);i&&r.remove(...i),r.add(...o),this._appearance=e}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[ct],attrs:HF,ngContentSelectors:x0,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,i){r&1&&(xe(I0),rn(0,"span",0),te(1),nr(2,"span",1),te(3,1),rr(),te(4,2),rn(5,"span",2)(6,"span",3)),r&2&&re("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab)},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2,changeDetection:0})}return t})();function GF(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var WF=new g("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Yg}),Yg={color:"accent"};var T0=(()=>{class t extends pu{_options=f(WF,{optional:!0});_isFab=!0;constructor(){super(),this._options=this._options||Yg,this.color=this._options.color||Yg.color}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[ct],attrs:$F,ngContentSelectors:x0,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,i){r&1&&(xe(I0),rn(0,"span",0),te(1),nr(2,"span",1),te(3,1),rr(),te(4,2),rn(5,"span",2)(6,"span",3)),r&2&&re("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab)},styles:[zF],encapsulation:2,changeDetection:0})}return t})();var Xg=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[gu,Be]})}return t})();function M0(t){return Error(`Unable to find icon with the name "${t}"`)}function qF(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function k0(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function A0(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var ur=class{url;svgText;options;svgElement=null;constructor(n,e,r){this.url=n,this.svgText=e,this.options=r}},N0=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,r,i,o){this._httpClient=e,this._sanitizer=r,this._errorHandler=o,this._document=i}addSvgIcon(e,r,i){return this.addSvgIconInNamespace("",e,r,i)}addSvgIconLiteral(e,r,i){return this.addSvgIconLiteralInNamespace("",e,r,i)}addSvgIconInNamespace(e,r,i,o){return this._addSvgIconConfig(e,r,new ur(i,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,r,i,o){let s=this._sanitizer.sanitize(yt.HTML,i);if(!s)throw A0(i);let a=$o(s);return this._addSvgIconConfig(e,r,new ur("",a,o))}addSvgIconSet(e,r){return this.addSvgIconSetInNamespace("",e,r)}addSvgIconSetLiteral(e,r){return this.addSvgIconSetLiteralInNamespace("",e,r)}addSvgIconSetInNamespace(e,r,i){return this._addSvgIconSetConfig(e,new ur(r,null,i))}addSvgIconSetLiteralInNamespace(e,r,i){let o=this._sanitizer.sanitize(yt.HTML,r);if(!o)throw A0(r);let s=$o(o);return this._addSvgIconSetConfig(e,new ur("",s,i))}registerFontClassAlias(e,r=e){return this._fontCssClassesByAlias.set(e,r),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let r=this._sanitizer.sanitize(yt.RESOURCE_URL,e);if(!r)throw k0(e);let i=this._cachedIconsByUrl.get(r);return i?M(yu(i)):this._loadSvgIconFromConfig(new ur(e,null)).pipe(Fe(o=>this._cachedIconsByUrl.set(r,o)),A(o=>yu(o)))}getNamedSvgIcon(e,r=""){let i=R0(r,e),o=this._svgIconConfigs.get(i);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(r,e),o)return this._svgIconConfigs.set(i,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(r);return s?this._getSvgFromIconSetConfigs(e,s):ps(M0(i))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?M(yu(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(A(r=>yu(r)))}_getSvgFromIconSetConfigs(e,r){let i=this._extractIconWithNameFromAnySet(e,r);if(i)return M(i);let o=r.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(bn(a=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(yt.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(l)),M(null)})));return ys(o).pipe(A(()=>{let s=this._extractIconWithNameFromAnySet(e,r);if(!s)throw M0(e);return s}))}_extractIconWithNameFromAnySet(e,r){for(let i=r.length-1;i>=0;i--){let o=r[i];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,e,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(Fe(r=>e.svgText=r),A(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?M(null):this._fetchIcon(e).pipe(Fe(r=>e.svgText=r))}_extractSvgIconFromSet(e,r,i){let o=e.querySelector(`[id="${r}"]`);if(!o)return null;let s=o.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,i);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),i);let a=this._svgElementFromString($o("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,i)}_svgElementFromString(e){let r=this._document.createElement("DIV");r.innerHTML=e;let i=r.querySelector("svg");if(!i)throw Error("<svg> tag not found");return i}_toSvgElement(e){let r=this._svgElementFromString($o("<svg></svg>")),i=e.attributes;for(let o=0;o<i.length;o++){let{name:s,value:a}=i[o];s!=="id"&&r.setAttribute(s,a)}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&r.appendChild(e.childNodes[o].cloneNode(!0));return r}_setSvgAttributes(e,r){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),r&&r.viewBox&&e.setAttribute("viewBox",r.viewBox),e}_fetchIcon(e){let{url:r,options:i}=e,o=i?.withCredentials??!1;if(!this._httpClient)throw qF();if(r==null)throw Error(`Cannot fetch icon from URL "${r}".`);let s=this._sanitizer.sanitize(yt.RESOURCE_URL,r);if(!s)throw k0(r);let a=this._inProgressUrlFetches.get(s);if(a)return a;let c=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(A(l=>$o(l)),yr(()=>this._inProgressUrlFetches.delete(s)),_s());return this._inProgressUrlFetches.set(s,c),c}_addSvgIconConfig(e,r,i){return this._svgIconConfigs.set(R0(e,r),i),this}_addSvgIconSetConfig(e,r){let i=this._iconSetConfigs.get(e);return i?i.push(r):this._iconSetConfigs.set(e,[r]),this}_svgElementFromConfig(e){if(!e.svgElement){let r=this._svgElementFromString(e.svgText);this._setSvgAttributes(r,e.options),e.svgElement=r}return e.svgElement}_getIconConfigFromResolvers(e,r){for(let i=0;i<this._resolvers.length;i++){let o=this._resolvers[i](r,e);if(o)return KF(o)?new ur(o.url,null,o.options):new ur(o,null)}}static \u0275fac=function(r){return new(r||t)(w(Ao,8),w(Ap),w($,8),w(rt))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function yu(t){return t.cloneNode(!0)}function R0(t,n){return t+":"+n}function KF(t){return!!(t.url&&t.options)}var QF=["*"],ZF=new g("MAT_ICON_DEFAULT_OPTIONS"),YF=new g("mat-icon-location",{providedIn:"root",factory:()=>{let t=f($),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),O0=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],XF=O0.map(t=>`[${t}]`).join(", "),JF=/^url\(['"]?#(.*?)['"]?\)$/,qo=(()=>{class t{_elementRef=f(ne);_iconRegistry=f(N0);_location=f(YF);_errorHandler=f(rt);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let r=this._cleanupFontValue(e);r!==this._fontSet&&(this._fontSet=r,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let r=this._cleanupFontValue(e);r!==this._fontIcon&&(this._fontIcon=r,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=we.EMPTY;constructor(){let e=f(new _i("aria-hidden"),{optional:!0}),r=f(ZF,{optional:!0});r&&(r.color&&(this.color=this._defaultColor=r.color),r.fontSet&&(this.fontSet=r.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let r=e.split(":");switch(r.length){case 1:return["",r[0]];case 2:return r;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let r=this._location.getPathname();r!==this._previousPath&&(this._previousPath=r,this._prependPathToReferences(r))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let r=this._location.getPathname();this._previousPath=r,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(r),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,r=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();r--;){let i=e.childNodes[r];(i.nodeType!==1||i.nodeName.toLowerCase()==="svg")&&i.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,r=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(i=>i.length>0);this._previousFontSetClass.forEach(i=>e.classList.remove(i)),r.forEach(i=>e.classList.add(i)),this._previousFontSetClass=r,this.fontIcon!==this._previousFontIconClass&&!r.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let r=this._elementsWithExternalReferences;r&&r.forEach((i,o)=>{i.forEach(s=>{o.setAttribute(s.name,`url('${e}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let r=e.querySelectorAll(XF),i=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<r.length;o++)O0.forEach(s=>{let a=r[o],c=a.getAttribute(s),l=c?c.match(JF):null;if(l){let d=i.get(a);d||(d=[],i.set(a,d)),d.push({name:s,value:l[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[r,i]=this._splitIconName(e);r&&(this._svgNamespace=r),i&&(this._svgName=i),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(i,r).pipe(ft(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${r}:${i}! ${o.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(r,i){r&2&&(Le("data-mat-icon-type",i._usingFontIcon()?"font":"svg")("data-mat-icon-name",i._svgName||i.fontIcon)("data-mat-icon-namespace",i._svgNamespace||i.fontSet)("fontIcon",i._usingFontIcon()?i.fontIcon:null),or(i.color?"mat-"+i.color:""),re("mat-icon-inline",i.inline)("mat-icon-no-color",i.color!=="primary"&&i.color!=="accent"&&i.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",ke],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:QF,decls:1,vars:0,template:function(r,i){r&1&&(xe(),te(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2,changeDetection:0})}return t})(),Jg=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var eP=["*"];var tP=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],nP=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],rP=new g("MAT_CARD_CONFIG"),F0=(()=>{class t{appearance;constructor(){let e=f(rP,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(r,i){r&2&&re("mat-mdc-card-outlined",i.appearance==="outlined")("mdc-card--outlined",i.appearance==="outlined")("mat-mdc-card-filled",i.appearance==="filled")("mdc-card--filled",i.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:eP,decls:1,vars:0,template:function(r,i){r&1&&(xe(),te(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2,changeDetection:0})}return t})();var P0=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})();var L0=(()=>{class t{align="start";static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(r,i){r&2&&re("mat-mdc-card-actions-align-end",i.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return t})(),j0=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:nP,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(r,i){r&1&&(xe(tP),te(0),nr(1,"div",0),te(2,1),rr(),te(3,2))},encapsulation:2,changeDetection:0})}return t})();var tv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var nv=(()=>{class t{constructor(e){this.dataService=e,this.isFlipped=!1,this.audioPlayer=new Audio}ngOnChanges(e){"card"in e&&(this.isFlipped=!1,"audio"in e&&this.autoPlay&&this.play(1,"normal"))}get cardTitle(){return this.card?this.isFlipped?this.card.translation:this.card.targetPhrase:""}onToggleCard(){this.isFlipped=!this.isFlipped}onPlay(e,r){this.play(e,r)}play(e,r){this.audioPlayer.src=this.dataService.resolveAssetUrl(this.audio[e][r]),this.audioPlayer.load(),this.audioPlayer.play()}static{this.\u0275fac=function(r){return new(r||t)(at(iu))}}static{this.\u0275cmp=Q({type:t,selectors:[["app-card"]],inputs:{card:"card",audio:"audio",autoPlay:"autoPlay",currentCardIndex:"currentCardIndex",totalItems:"totalItems"},standalone:!1,features:[gt],decls:31,vars:3,consts:[[1,"header"],[1,"text"],[1,"actions"],["mat-icon-button","","color","warn"],["mat-icon-button","","color","primary"],["mat-icon-button","",3,"click"],[1,"play-btn-group"],[1,"play-btn-sub-group"],["mat-icon-button","","color","warn",1,"play-btn",3,"click"],["mat-icon-button","","color","primary",1,"play-btn",3,"click"]],template:function(r,i){r&1&&(C(0,"mat-card")(1,"mat-card-header",0),ye(2),O(),C(3,"mat-card-content")(4,"h1",1),ye(5),O()(),C(6,"mat-card-actions",2)(7,"button",3)(8,"mat-icon"),ye(9,"call_received"),O()(),C(10,"button",4)(11,"mat-icon"),ye(12,"check"),O()(),C(13,"button",5),ge("click",function(){return i.onToggleCard()}),C(14,"mat-icon"),ye(15,"flip"),O()(),C(16,"div",6)(17,"div",7)(18,"button",8),ge("click",function(){return i.onPlay(0,"normal")}),C(19,"mat-icon"),ye(20,"play_circle_filled"),O()(),C(21,"button",8),ge("click",function(){return i.onPlay(0,"slow")}),C(22,"mat-icon"),ye(23,"play_circle_outline"),O()()(),C(24,"div",7)(25,"button",9),ge("click",function(){return i.onPlay(1,"normal")}),C(26,"mat-icon"),ye(27,"play_circle_filled"),O()(),C(28,"button",9),ge("click",function(){return i.onPlay(1,"slow")}),C(29,"mat-icon"),ye(30,"play_circle_outline"),O()()()()()()),r&2&&(fe(2),dd(" ",i.currentCardIndex," of ",i.totalItems," "),fe(3),So(i.cardTitle))},dependencies:[Ai,qo,F0,L0,P0,j0],styles:["[_nghost-%COMP%]{display:block}.actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-end}.header[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:.5em 0;min-height:5em}"]})}}return t})();function sP(t,n){if(t&1){let e=ir();C(0,"button",5),ge("click",function(){Yt(e);let i=$e(2);return Xt(i.onToggleAudio())}),C(1,"mat-icon"),ye(2,"volume_off"),O()()}}function aP(t,n){if(t&1){let e=ir();C(0,"button",5),ge("click",function(){Yt(e);let i=$e(2);return Xt(i.onToggleAudio())}),C(1,"mat-icon"),ye(2,"volume_up"),O()()}}function cP(t,n){if(t&1){let e=ir();C(0,"div"),Oe(1,"app-card",1),C(2,"div",2),bt(3,sP,3,0,"button",3)(4,aP,3,0,"button",3),C(5,"button",4),ge("click",function(){Yt(e);let i=$e();return Xt(i.onPreviousCard())}),C(6,"mat-icon"),ye(7,"navigate_before"),O()(),C(8,"button",4),ge("click",function(){Yt(e);let i=$e();return Xt(i.onNextCard())}),C(9,"mat-icon"),ye(10,"navigate_next"),O()()()()}if(t&2){let e=$e();fe(),Ie("card",e.currentCard)("audio",e.audio)("autoPlay",e.autoPlay)("currentCardIndex",e.currentCardIndex)("totalItems",e.totalItems),fe(2),Ie("ngIf",!e.autoPlay),fe(),Ie("ngIf",e.autoPlay)}}var V0=(()=>{class t{constructor(e){this.cardsService=e,this.currentCardIndex=0,this.autoPlay=!0}ngOnInit(){this.dataReady$=this.cardsService.dataReady}get cards(){return this.cardsService.cards}get currentCard(){return this.cards[this.currentCardIndex]}get audio(){return this.cardsService.getAudioConfigForCard(this.currentCard.id)}get totalItems(){return this.cards.length}onPreviousCard(){this.currentCardIndex>0?this.currentCardIndex-=1:this.cards.length&&(this.currentCardIndex=this.cards.length-1)}onNextCard(){this.currentCardIndex<this.cards.length-1?this.currentCardIndex+=1:this.currentCardIndex=0}onToggleAudio(){this.autoPlay=!this.autoPlay}static{this.\u0275fac=function(r){return new(r||t)(at(ZC))}}static{this.\u0275cmp=Q({type:t,selectors:[["app-flash-cards"]],standalone:!1,decls:2,vars:3,consts:[[4,"ngIf"],[1,"flash-card",3,"card","audio","autoPlay","currentCardIndex","totalItems"],[1,"buttons"],["mat-icon-button","","color","warn","class","button",3,"click",4,"ngIf"],["mat-mini-fab","","color","primary",1,"button",3,"click"],["mat-icon-button","","color","warn",1,"button",3,"click"]],template:function(r,i){r&1&&(bt(0,cP,11,7,"div",0),ep(1,"async")),r&2&&Ie("ngIf",tp(1,1,i.dataReady$))},dependencies:[ia,T0,Ai,qo,nv,hp],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow:hidden}.flash-card[_ngcontent-%COMP%]{margin:20px 10px;width:calc(100% - 20px)}.buttons[_ngcontent-%COMP%]{margin:2em 10px 0;display:flex;justify-content:flex-end}.button[_ngcontent-%COMP%]{margin-left:2em}"]})}}return t})();var G="primary",Qa=Symbol("RouteTitle"),av=class{params;constructor(n){this.params=n||{}}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return[]}get keys(){return Object.keys(this.params)}};function Ni(t){return new av(t)}function rv(t,n,e){for(let r=0;r<t.length;r++){let i=t[r],o=n[r];if(i[0]===":")e[i.substring(1)]=o;else if(i!==o.path)return!1}return!0}function q0(t,n,e){let r=e.path.split("/"),i=r.indexOf("**");if(i===-1){if(r.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||r.length<t.length))return null;let c={},l=t.slice(0,r.length);return rv(r,l,c)?{consumed:l,posParams:c}:null}if(i!==r.lastIndexOf("**"))return null;let o=r.slice(0,i),s=r.slice(i+1);if(o.length+s.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let a={};return!rv(o,t.slice(0,o.length),a)||!rv(s,t.slice(t.length-s.length),a)?null:{consumed:t,posParams:a}}function Cu(t){return new Promise((n,e)=>{t.pipe(zn()).subscribe({next:r=>n(r),error:r=>e(r)})})}function lP(t,n){if(t.length!==n.length)return!1;for(let e=0;e<t.length;++e)if(!Vn(t[e],n[e]))return!1;return!0}function Vn(t,n){let e=t?cv(t):void 0,r=n?cv(n):void 0;if(!e||!r||e.length!=r.length)return!1;let i;for(let o=0;o<e.length;o++)if(i=e[o],!K0(t[i],n[i]))return!1;return!0}function cv(t){return[...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function K0(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return!1;let e=[...t].sort(),r=[...n].sort();return e.every((i,o)=>r[o]===i)}else return t===n}function dP(t){return t.length>0?t[t.length-1]:null}function Fi(t){return gs(t)?t:Rr(t)?be(Promise.resolve(t)):M(t)}function Q0(t){return gs(t)?Cu(t):Promise.resolve(t)}var uP={exact:X0,subset:J0},Z0={exact:fP,subset:hP,ignored:()=>!0},Y0={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},lv={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function B0(t,n,e){return uP[e.paths](t.root,n.root,e.matrixParams)&&Z0[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function fP(t,n){return Vn(t,n)}function X0(t,n,e){if(!Ri(t.segments,n.segments)||!wu(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return!1;for(let r in n.children)if(!t.children[r]||!X0(t.children[r],n.children[r],e))return!1;return!0}function hP(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>K0(t[e],n[e]))}function J0(t,n,e){return eI(t,n,n.segments,e)}function eI(t,n,e,r){if(t.segments.length>e.length){let i=t.segments.slice(0,e.length);return!(!Ri(i,e)||n.hasChildren()||!wu(i,e,r))}else if(t.segments.length===e.length){if(!Ri(t.segments,e)||!wu(t.segments,e,r))return!1;for(let i in n.children)if(!t.children[i]||!J0(t.children[i],n.children[i],r))return!1;return!0}else{let i=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return!Ri(t.segments,i)||!wu(t.segments,i,r)||!t.children[G]?!1:eI(t.children[G],n,o,r)}}function wu(t,n,e){return n.every((r,i)=>Z0[e](t[i].parameters,r.parameters))}var zt=class{root;queryParams;fragment;_queryParamMap;constructor(n=new he([],{}),e={},r=null){this.root=n,this.queryParams=e,this.fragment=r}get queryParamMap(){return this._queryParamMap??=Ni(this.queryParams),this._queryParamMap}toString(){return gP.serialize(this)}},he=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Eu(this)}},jr=class{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e}get parameterMap(){return this._parameterMap??=Ni(this.parameters),this._parameterMap}toString(){return nI(this)}};function mP(t,n){return Ri(t,n)&&t.every((e,r)=>Vn(e.parameters,n[r].parameters))}function Ri(t,n){return t.length!==n.length?!1:t.every((e,r)=>e.path===n[r].path)}function pP(t,n){let e=[];return Object.entries(t.children).forEach(([r,i])=>{r===G&&(e=e.concat(n(i,r)))}),Object.entries(t.children).forEach(([r,i])=>{r!==G&&(e=e.concat(n(i,r)))}),e}var Pi=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>new hr,providedIn:"root"})}return t})(),hr=class{parse(n){let e=new uv(n);return new zt(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${ja(n.root,!0)}`,r=bP(n.queryParams),i=typeof n.fragment=="string"?`#${vP(n.fragment)}`:"";return`${e}${r}${i}`}},gP=new hr;function Eu(t){return t.segments.map(n=>nI(n)).join("/")}function ja(t,n){if(!t.hasChildren())return Eu(t);if(n){let e=t.children[G]?ja(t.children[G],!1):"",r=[];return Object.entries(t.children).forEach(([i,o])=>{i!==G&&r.push(`${i}:${ja(o,!1)}`)}),r.length>0?`${e}(${r.join("//")})`:e}else{let e=pP(t,(r,i)=>i===G?[ja(t.children[G],!1)]:[`${i}:${ja(r,!1)}`]);return Object.keys(t.children).length===1&&t.children[G]!=null?`${Eu(t)}/${e[0]}`:`${Eu(t)}/(${e.join("//")})`}}function tI(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function bu(t){return tI(t).replace(/%3B/gi,";")}function vP(t){return encodeURI(t)}function dv(t){return tI(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Du(t){return decodeURIComponent(t)}function U0(t){return Du(t.replace(/\+/g,"%20"))}function nI(t){return`${dv(t.path)}${yP(t.parameters)}`}function yP(t){return Object.entries(t).map(([n,e])=>`;${dv(n)}=${dv(e)}`).join("")}function bP(t){let n=Object.entries(t).map(([e,r])=>Array.isArray(r)?r.map(i=>`${bu(e)}=${bu(i)}`).join("&"):`${bu(e)}=${bu(r)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var _P=/^[^\/()?;#]+/;function iv(t){let n=t.match(_P);return n?n[0]:""}var wP=/^[^\/()?;=#]+/;function EP(t){let n=t.match(wP);return n?n[0]:""}var DP=/^[^=?&#]+/;function CP(t){let n=t.match(DP);return n?n[0]:""}var IP=/^[^&#]+/;function xP(t){let n=t.match(IP);return n?n[0]:""}var uv=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new he([],{}):new he([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new _(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let r={};this.peekStartsWith("/(")&&(this.capture("/"),r=this.parseParens(!0,n));let i={};return this.peekStartsWith("(")&&(i=this.parseParens(!1,n)),(e.length>0||Object.keys(r).length>0)&&(i[G]=new he(e,r)),i}parseSegment(){let n=iv(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new _(4009,!1);return this.capture(n),new jr(Du(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=EP(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let i=iv(this.remaining);i&&(r=i,this.capture(r))}n[Du(e)]=Du(r)}parseQueryParam(n){let e=CP(this.remaining);if(!e)return;this.capture(e);let r="";if(this.consumeOptional("=")){let s=xP(this.remaining);s&&(r=s,this.capture(r))}let i=U0(e),o=U0(r);if(n.hasOwnProperty(i)){let s=n[i];Array.isArray(s)||(s=[s],n[i]=s),s.push(o)}else n[i]=o}parseParens(n,e){let r={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let i=iv(this.remaining),o=this.remaining[i.length];if(o!=="/"&&o!==")"&&o!==";")throw new _(4010,!1);let s;i.indexOf(":")>-1?(s=i.slice(0,i.indexOf(":")),this.capture(s),this.capture(":")):n&&(s=G);let a=this.parseChildren(e+1);r[s??G]=Object.keys(a).length===1&&a[G]?a[G]:new he([],a),this.consumeOptional("//")}return r}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new _(4011,!1)}};function rI(t){return t.segments.length>0?new he([],{[G]:t}):t}function iI(t){let n={};for(let[r,i]of Object.entries(t.children)){let o=iI(i);if(r===G&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))n[s]=a;else(o.segments.length>0||o.hasChildren())&&(n[r]=o)}let e=new he(t.segments,n);return SP(e)}function SP(t){if(t.numberOfChildren===1&&t.children[G]){let n=t.children[G];return new he(t.segments.concat(n.segments),n.children)}return t}function Xo(t){return t instanceof zt}function oI(t,n,e=null,r=null,i=new hr){let o=sI(t);return aI(o,n,e,r,i)}function sI(t){let n;function e(o){let s={};for(let c of o.children){let l=e(c);s[c.outlet]=l}let a=new he(o.url,s);return o===t&&(n=a),a}let r=e(t.root),i=rI(r);return n??i}function aI(t,n,e,r,i){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return ov(o,o,o,e,r,i);let s=TP(n);if(s.toRoot())return ov(o,o,new he([],{}),e,r,i);let a=MP(s,o,t),c=a.processChildren?Ba(a.segmentGroup,a.index,s.commands):lI(a.segmentGroup,a.index,s.commands);return ov(o,a.segmentGroup,c,e,r,i)}function Iu(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function Ha(t){return typeof t=="object"&&t!=null&&t.outlets}function H0(t,n,e){t||="\u0275";let r=new zt;return r.queryParams={[t]:n},e.parse(e.serialize(r)).queryParams[t]}function ov(t,n,e,r,i,o){let s={};for(let[l,d]of Object.entries(r??{}))s[l]=Array.isArray(d)?d.map(u=>H0(l,u,o)):H0(l,d,o);let a;t===n?a=e:a=cI(t,n,e);let c=rI(iI(a));return new zt(c,s,i)}function cI(t,n,e){let r={};return Object.entries(t.children).forEach(([i,o])=>{o===n?r[i]=e:r[i]=cI(o,n,e)}),new he(t.segments,r)}var xu=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,r){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=r,n&&r.length>0&&Iu(r[0]))throw new _(4003,!1);let i=r.find(Ha);if(i&&i!==dP(r))throw new _(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function TP(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new xu(!0,0,t);let n=0,e=!1,r=t.reduce((i,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...i,{outlets:a}]}if(o.segmentPath)return[...i,o.segmentPath]}return typeof o!="string"?[...i,o]:s===0?(o.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?e=!0:a===".."?n++:a!=""&&i.push(a))}),i):[...i,o]},[]);return new xu(e,n,r)}var Qo=class{segmentGroup;processChildren;index;constructor(n,e,r){this.segmentGroup=n,this.processChildren=e,this.index=r}};function MP(t,n,e){if(t.isAbsolute)return new Qo(n,!0,0);if(!e)return new Qo(n,!1,NaN);if(e.parent===null)return new Qo(e,!0,0);let r=Iu(t.commands[0])?0:1,i=e.segments.length-1+r;return kP(e,i,t.numberOfDoubleDots)}function kP(t,n,e){let r=t,i=n,o=e;for(;o>i;){if(o-=i,r=r.parent,!r)throw new _(4005,!1);i=r.segments.length}return new Qo(r,!1,i-o)}function AP(t){return Ha(t[0])?t[0].outlets:{[G]:t}}function lI(t,n,e){if(t??=new he([],{}),t.segments.length===0&&t.hasChildren())return Ba(t,n,e);let r=RP(t,n,e),i=e.slice(r.commandIndex);if(r.match&&r.pathIndex<t.segments.length){let o=new he(t.segments.slice(0,r.pathIndex),{});return o.children[G]=new he(t.segments.slice(r.pathIndex),t.children),Ba(o,0,i)}else return r.match&&i.length===0?new he(t.segments,{}):r.match&&!t.hasChildren()?fv(t,n,e):r.match?Ba(t,0,i):fv(t,n,e)}function Ba(t,n,e){if(e.length===0)return new he(t.segments,{});{let r=AP(e),i={};if(Object.keys(r).some(o=>o!==G)&&t.children[G]&&t.numberOfChildren===1&&t.children[G].segments.length===0){let o=Ba(t.children[G],n,e);return new he(t.segments,o.children)}return Object.entries(r).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(i[o]=lI(t.children[o],n,s))}),Object.entries(t.children).forEach(([o,s])=>{r[o]===void 0&&(i[o]=s)}),new he(t.segments,i)}}function RP(t,n,e){let r=0,i=n,o={match:!1,pathIndex:0,commandIndex:0};for(;i<t.segments.length;){if(r>=e.length)return o;let s=t.segments[i],a=e[r];if(Ha(a))break;let c=`${a}`,l=r<e.length-1?e[r+1]:null;if(i>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!z0(c,l,s))return o;r+=2}else{if(!z0(c,{},s))return o;r++}i++}return{match:!0,pathIndex:i,commandIndex:r}}function fv(t,n,e){let r=t.segments.slice(0,n),i=0;for(;i<e.length;){let o=e[i];if(Ha(o)){let c=NP(o.outlets);return new he(r,c)}if(i===0&&Iu(e[0])){let c=t.segments[n];r.push(new jr(c.path,$0(e[0]))),i++;continue}let s=Ha(o)?o.outlets[G]:`${o}`,a=i<e.length-1?e[i+1]:null;s&&a&&Iu(a)?(r.push(new jr(s,$0(a))),i+=2):(r.push(new jr(s,{})),i++)}return new he(r,{})}function NP(t){let n={};return Object.entries(t).forEach(([e,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(n[e]=fv(new he([],{}),0,r))}),n}function $0(t){let n={};return Object.entries(t).forEach(([e,r])=>n[e]=`${r}`),n}function z0(t,n,e){return t==e.path&&Vn(n,e.parameters)}var Zo="imperative",ze=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(ze||{}),At=class{id;url;constructor(n,e){this.id=n,this.url=e}},Vr=class extends At{type=ze.NavigationStart;navigationTrigger;restoredState;constructor(n,e,r="imperative",i=null){super(n,e),this.navigationTrigger=r,this.restoredState=i}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},gn=class extends At{urlAfterRedirects;type=ze.NavigationEnd;constructor(n,e,r){super(n,e),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},lt=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(lt||{}),Jo=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(Jo||{}),$t=class extends At{reason;code;type=ze.NavigationCancel;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function dI(t){return t instanceof $t&&(t.code===lt.Redirect||t.code===lt.SupersededByNewNavigation)}var Bn=class extends At{reason;code;type=ze.NavigationSkipped;constructor(n,e,r,i){super(n,e),this.reason=r,this.code=i}},Oi=class extends At{error;target;type=ze.NavigationError;constructor(n,e,r,i){super(n,e),this.error=r,this.target=i}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},$a=class extends At{urlAfterRedirects;state;type=ze.RoutesRecognized;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Su=class extends At{urlAfterRedirects;state;type=ze.GuardsCheckStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Tu=class extends At{urlAfterRedirects;state;shouldActivate;type=ze.GuardsCheckEnd;constructor(n,e,r,i,o){super(n,e),this.urlAfterRedirects=r,this.state=i,this.shouldActivate=o}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Mu=class extends At{urlAfterRedirects;state;type=ze.ResolveStart;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ku=class extends At{urlAfterRedirects;state;type=ze.ResolveEnd;constructor(n,e,r,i){super(n,e),this.urlAfterRedirects=r,this.state=i}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Au=class{route;type=ze.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ru=class{route;type=ze.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Nu=class{snapshot;type=ze.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ou=class{snapshot;type=ze.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Fu=class{snapshot;type=ze.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Pu=class{snapshot;type=ze.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},es=class{routerEvent;position;anchor;scrollBehavior;type=ze.Scroll;constructor(n,e,r,i){this.routerEvent=n,this.position=e,this.anchor=r,this.scrollBehavior=i}toString(){let n=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${n}')`}},ts=class{},za=class{},ns=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e}};function OP(t){return!(t instanceof ts)&&!(t instanceof ns)&&!(t instanceof za)}var Lu=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Li(this.rootInjector)}},Li=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e}onChildOutletCreated(e,r){let i=this.getOrCreateContext(e);i.outlet=r,this.contexts.set(e,i)}onChildOutletDestroyed(e){let r=this.getContext(e);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e}getOrCreateContext(e){let r=this.getContext(e);return r||(r=new Lu(this.rootInjector),this.contexts.set(e,r)),r}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(r){return new(r||t)(w(Ee))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ju=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=hv(n,this._root);return e?e.children.map(r=>r.value):[]}firstChild(n){let e=hv(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=mv(n,this._root);return e.length<2?[]:e[e.length-2].children.map(i=>i.value).filter(i=>i!==n)}pathFromRoot(n){return mv(n,this._root).map(e=>e.value)}};function hv(t,n){if(t===n.value)return n;for(let e of n.children){let r=hv(t,e);if(r)return r}return null}function mv(t,n){if(t===n.value)return[n];for(let e of n.children){let r=mv(t,e);if(r.length)return r.unshift(n),r}return[]}var kt=class{value;children;constructor(n,e){this.value=n,this.children=e}toString(){return`TreeNode(${this.value})`}};function Ko(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var Ga=class extends ju{snapshot;constructor(n,e){super(n),this.snapshot=e,Dv(this,n)}toString(){return this.snapshot.toString()}};function uI(t,n){let e=FP(t,n),r=new De([new jr("",{})]),i=new De({}),o=new De({}),s=new De({}),a=new De(""),c=new Br(r,i,s,a,o,G,t,e.root);return c.snapshot=e.root,new Ga(new kt(c,[]),e)}function FP(t,n){let e={},r={},i={},s=new rs([],e,i,"",r,G,t,null,{},n);return new Wa("",new kt(s,[]))}var Br=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(n,e,r,i,o,s,a,c){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=r,this.fragmentSubject=i,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(A(l=>l[Qa]))??M(void 0),this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(A(n=>Ni(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(A(n=>Ni(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Ev(t,n,e="emptyOnly"){let r,{routeConfig:i}=t;return n!==null&&(e==="always"||i?.path===""||!n.component&&!n.routeConfig?.loadComponent)?r={params:b(b({},n.params),t.params),data:b(b({},n.data),t.data),resolve:b(b(b(b({},t.data),n.data),i?.data),t._resolvedData)}:r={params:b({},t.params),data:b({},t.data),resolve:b(b({},t.data),t._resolvedData??{})},i&&hI(i)&&(r.resolve[Qa]=i.title),r}var rs=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[Qa]}constructor(n,e,r,i,o,s,a,c,l,d){this.url=n,this.params=e,this.queryParams=r,this.fragment=i,this.data=o,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=d}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ni(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ni(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(r=>r.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${n}', path:'${e}')`}},Wa=class extends ju{url;constructor(n,e){super(e),this.url=n,Dv(this,e)}toString(){return fI(this._root)}};function Dv(t,n){n.value._routerState=t,n.children.forEach(e=>Dv(t,e))}function fI(t){let n=t.children.length>0?` { ${t.children.map(fI).join(", ")} } `:"";return`${t.value}${n}`}function sv(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,Vn(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),Vn(n.params,e.params)||t.paramsSubject.next(e.params),lP(n.url,e.url)||t.urlSubject.next(e.url),Vn(n.data,e.data)||t.dataSubject.next(e.data)}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data)}function pv(t,n){let e=Vn(t.params,n.params)&&mP(t.url,n.url),r=!t.parent!=!n.parent;return e&&!r&&(!t.parent||pv(t.parent,n.parent))}function hI(t){return typeof t.title=="string"||t.title===null}var mI=new g(""),Za=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=G;activateEvents=new de;deactivateEvents=new de;attachEvents=new de;detachEvents=new de;routerOutletData=vE();parentContexts=f(Li);location=f(Fn);changeDetector=f(Xe);inputBinder=f(Ya,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(e){if(e.name){let{firstChange:r,previousValue:i}=e.name;if(r)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new _(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new _(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new _(4012,!1);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,r){this.activated=e,this._activatedRoute=r,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance)}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e)}}activateWith(e,r){if(this.isActivated)throw new _(4013,!1);this._activatedRoute=e;let i=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new gv(e,a,i.injector,this.routerOutletData);this.activated=i.createComponent(s,{index:i.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[gt]})}return t})(),gv=class{route;childContexts;parent;outletData;constructor(n,e,r,i){this.route=n,this.childContexts=e,this.parent=r,this.outletData=i}get(n,e){return n===Br?this.route:n===Li?this.childContexts:n===mI?this.outletData:this.parent.get(n,e)}},Ya=new g(""),Cv=(()=>{class t{outletDataSubscriptions=new Map;bindActivatedRouteToOutletComponent(e){this.unsubscribeFromRouteData(e),this.subscribeToRouteData(e)}unsubscribeFromRouteData(e){this.outletDataSubscriptions.get(e)?.unsubscribe(),this.outletDataSubscriptions.delete(e)}subscribeToRouteData(e){let{activatedRoute:r}=e,i=jc([r.queryParams,r.params,r.data]).pipe(We(([o,s,a],c)=>(a=b(b(b({},o),s),a),c===0?M(a):Promise.resolve(a)))).subscribe(o=>{if(!e.isActivated||!e.activatedComponentRef||e.activatedRoute!==r||r.component===null){this.unsubscribeFromRouteData(e);return}let s=CE(r.component);if(!s){this.unsubscribeFromRouteData(e);return}for(let{templateName:a}of s.inputs)e.activatedComponentRef.setInput(a,o[a])});this.outletDataSubscriptions.set(e,i)}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})(),Iv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,i){r&1&&Oe(0,"router-outlet")},dependencies:[Za],encapsulation:2})}return t})();function xv(t){let n=t.children&&t.children.map(xv),e=n?W(b({},t),{children:n}):b({},t);return!e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==G&&(e.component=Iv),e}function PP(t,n,e){let r=qa(t,n._root,e?e._root:void 0);return new Ga(r,n)}function qa(t,n,e){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let r=e.value;r._futureSnapshot=n.value;let i=LP(t,n,e);return new kt(r,i)}else{if(t.shouldAttach(n.value)){let o=t.retrieve(n.value);if(o!==null){let s=o.route;return s.value._futureSnapshot=n.value,s.children=n.children.map(a=>qa(t,a)),s}}let r=jP(n.value),i=n.children.map(o=>qa(t,o));return new kt(r,i)}}function LP(t,n,e){return n.children.map(r=>{for(let i of e.children)if(t.shouldReuseRoute(r.value,i.value.snapshot))return qa(t,r,i);return qa(t,r)})}function jP(t){return new Br(new De(t.url),new De(t.params),new De(t.queryParams),new De(t.fragment),new De(t.data),t.outlet,t.component,t)}var is=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e}},pI="ngNavigationCancelingError";function Vu(t,n){let{redirectTo:e,navigationBehaviorOptions:r}=Xo(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,i=gI(!1,lt.Redirect);return i.url=e,i.navigationBehaviorOptions=r,i}function gI(t,n){let e=new Error(`NavigationCancelingError: ${t||""}`);return e[pI]=!0,e.cancellationCode=n,e}function VP(t){return vI(t)&&Xo(t.url)}function vI(t){return!!t&&t[pI]}var vv=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,r,i,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=r,this.forwardEvent=i,this.inputBindingEnabled=o}activate(n){let e=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,r,n),sv(this.futureState.root),this.activateChildRoutes(e,r,n)}deactivateChildRoutes(n,e,r){let i=Ko(e);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,i[s],r),delete i[s]}),Object.values(i).forEach(o=>{this.deactivateRouteAndItsChildren(o,r)})}deactivateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(i===o)if(i.component){let s=r.getContext(i.outlet);s&&this.deactivateChildRoutes(n,e,s.children)}else this.deactivateChildRoutes(n,e,r);else o&&this.deactivateRouteAndItsChildren(e,r)}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e)}detachAndStoreRouteSubtree(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=Ko(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:a})}}deactivateRouteAndOutlet(n,e){let r=e.getContext(n.value.outlet),i=r&&n.value.component?r.children:e,o=Ko(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,i);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(n,e,r){let i=Ko(e);n.children.forEach(o=>{this.activateRoutes(o,i[o.value.outlet],r),this.forwardEvent(new Pu(o.value.snapshot))}),n.children.length&&this.forwardEvent(new Ou(n.value.snapshot))}activateRoutes(n,e,r){let i=n.value,o=e?e.value:null;if(sv(i),i===o)if(i.component){let s=r.getOrCreateContext(i.outlet);this.activateChildRoutes(n,e,s.children)}else this.activateChildRoutes(n,e,r);else if(i.component){let s=r.getOrCreateContext(i.outlet);if(this.routeReuseStrategy.shouldAttach(i.snapshot)){let a=this.routeReuseStrategy.retrieve(i.snapshot);this.routeReuseStrategy.store(i.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),sv(a.route.value),this.activateChildRoutes(n,null,s.children)}else s.attachRef=null,s.route=i,s.outlet&&s.outlet.activateWith(i,s.injector),this.activateChildRoutes(n,null,s.children)}else this.activateChildRoutes(n,null,r)}},Bu=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}},Yo=class{component;route;constructor(n,e){this.component=n,this.route=e}};function BP(t,n,e){let r=t._root,i=n?n._root:null;return Va(r,i,e,[r.value])}function UP(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:t,guards:n}}function ss(t,n){let e=Symbol(),r=n.get(t,e);return r===e?typeof t=="function"&&!jf(t)?t:n.get(t):r}function Va(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=Ko(n);return t.children.forEach(s=>{HP(s,o[s.value.outlet],e,r.concat([s.value]),i),delete o[s.value.outlet]}),Object.entries(o).forEach(([s,a])=>Ua(a,e.getContext(s),i)),i}function HP(t,n,e,r,i={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=n?n.value:null,a=e?e.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let c=$P(s,o,o.routeConfig.runGuardsAndResolvers);c?i.canActivateChecks.push(new Bu(r)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?Va(t,n,a?a.children:null,r,i):Va(t,n,e,r,i),c&&a&&a.outlet&&a.outlet.isActivated&&i.canDeactivateChecks.push(new Yo(a.outlet.component,s))}else s&&Ua(n,a,i),i.canActivateChecks.push(new Bu(r)),o.component?Va(t,null,a?a.children:null,r,i):Va(t,null,e,r,i);return i}function $P(t,n,e){if(typeof e=="function")return He(n._environmentInjector,()=>e(t,n));switch(e){case"pathParamsChange":return!Ri(t.url,n.url);case"pathParamsOrQueryParamsChange":return!Ri(t.url,n.url)||!Vn(t.queryParams,n.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!pv(t,n)||!Vn(t.queryParams,n.queryParams);default:return!pv(t,n)}}function Ua(t,n,e){let r=Ko(t),i=t.value;Object.entries(r).forEach(([o,s])=>{i.component?n?Ua(s,n.children.getContext(o),e):Ua(s,null,e):Ua(s,n,e)}),i.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new Yo(n.outlet.component,i)):e.canDeactivateChecks.push(new Yo(null,i)):e.canDeactivateChecks.push(new Yo(null,i))}function Xa(t){return typeof t=="function"}function zP(t){return typeof t=="boolean"}function GP(t){return t&&Xa(t.canLoad)}function WP(t){return t&&Xa(t.canActivate)}function qP(t){return t&&Xa(t.canActivateChild)}function KP(t){return t&&Xa(t.canDeactivate)}function QP(t){return t&&Xa(t.canMatch)}function yI(t){return t instanceof Jr||t?.name==="EmptyError"}var _u=Symbol("INITIAL_VALUE");function os(){return We(t=>jc(t.map(n=>n.pipe(ft(1),ei(_u)))).pipe(A(n=>{for(let e of n)if(e!==!0){if(e===_u)return _u;if(e===!1||ZP(e))return e}return!0}),ae(n=>n!==_u),ft(1)))}function ZP(t){return Xo(t)||t instanceof is}function bI(t){return t.aborted?M(void 0).pipe(ft(1)):new V(n=>{let e=()=>{n.next(),n.complete()};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function _I(t){return Ce(bI(t))}function YP(t){return Ue(n=>{let{targetSnapshot:e,currentSnapshot:r,guards:{canActivateChecks:i,canDeactivateChecks:o}}=n;return o.length===0&&i.length===0?M(W(b({},n),{guardsResult:!0})):XP(o,e,r).pipe(Ue(s=>s&&zP(s)?JP(e,i,t):M(s)),A(s=>W(b({},n),{guardsResult:s})))})}function XP(t,n,e){return be(t).pipe(Ue(r=>i1(r.component,r.route,e,n)),zn(r=>r!==!0,!0))}function JP(t,n,e){return be(n).pipe(_n(r=>Yi(t1(r.route.parent,e),e1(r.route,e),r1(t,r.path),n1(t,r.route))),zn(r=>r!==!0,!0))}function e1(t,n){return t!==null&&n&&n(new Fu(t)),M(!0)}function t1(t,n){return t!==null&&n&&n(new Nu(t)),M(!0)}function n1(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return M(!0);let r=e.map(i=>vs(()=>{let o=n._environmentInjector,s=ss(i,o),a=WP(s)?s.canActivate(n,t):He(o,()=>s(n,t));return Fi(a).pipe(zn())}));return M(r).pipe(os())}function r1(t,n){let e=n[n.length-1],i=n.slice(0,n.length-1).reverse().map(o=>UP(o)).filter(o=>o!==null).map(o=>vs(()=>{let s=o.guards.map(a=>{let c=o.node._environmentInjector,l=ss(a,c),d=qP(l)?l.canActivateChild(e,t):He(c,()=>l(e,t));return Fi(d).pipe(zn())});return M(s).pipe(os())}));return M(i).pipe(os())}function i1(t,n,e,r){let i=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!i||i.length===0)return M(!0);let o=i.map(s=>{let a=n._environmentInjector,c=ss(s,a),l=KP(c)?c.canDeactivate(t,n,e,r):He(a,()=>c(t,n,e,r));return Fi(l).pipe(zn())});return M(o).pipe(os())}function o1(t,n,e,r,i){let o=n.canLoad;if(o===void 0||o.length===0)return M(!0);let s=o.map(a=>{let c=ss(a,t),l=GP(c)?c.canLoad(n,e):He(t,()=>c(n,e)),d=Fi(l);return i?d.pipe(_I(i)):d});return M(s).pipe(os(),wI(r))}function wI(t){return pf(Fe(n=>{if(typeof n!="boolean")throw Vu(t,n)}),A(n=>n===!0))}function s1(t,n,e,r,i,o){let s=n.canMatch;if(!s||s.length===0)return M(!0);let a=s.map(c=>{let l=ss(c,t),d=QP(l)?l.canMatch(n,e,i):He(t,()=>l(n,e,i));return Fi(d).pipe(_I(o))});return M(a).pipe(os(),wI(r))}var fr=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype)}},Ka=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype)}};function a1(t){throw new _(4e3,!1)}function c1(t){throw gI(!1,lt.GuardRejected)}var yv=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e}lineralizeSegments(n,e){return pe(this,null,function*(){let r=[],i=e.root;for(;;){if(r=r.concat(i.segments),i.numberOfChildren===0)return r;if(i.numberOfChildren>1||!i.children[G])throw a1(`${n.redirectTo}`);i=i.children[G]}})}applyRedirectCommands(n,e,r,i,o){return pe(this,null,function*(){let s=yield l1(e,i,o);if(s instanceof zt)throw new Ka(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,r);if(s[0]==="/")throw new Ka(a);return a})}applyRedirectCreateUrlTree(n,e,r,i){let o=this.createSegmentGroup(n,e.root,r,i);return new zt(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let r={};return Object.entries(n).forEach(([i,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);r[i]=e[a]}else r[i]=o}),r}createSegmentGroup(n,e,r,i){let o=this.createSegments(n,e.segments,r,i),s={};return Object.entries(e.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(n,c,r,i)}),new he(o,s)}createSegments(n,e,r,i){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,i):this.findOrReturn(o,r))}findPosParam(n,e,r){let i=r[e.path.substring(1)];if(!i)throw new _(4001,!1);return i}findOrReturn(n,e){let r=0;for(let i of e){if(i.path===n.path)return e.splice(r),i;r++}return n}};function l1(t,n,e){if(typeof t=="string")return Promise.resolve(t);let r=t;return Cu(Fi(He(e,()=>r(n))))}function d1(t,n){return t.providers&&!t._injector&&(t._injector=Io(t.providers,n,`Route: ${t.path}`)),t._injector??n}function pn(t){return t.outlet||G}function u1(t,n){let e=t.filter(r=>pn(r)===n);return e.push(...t.filter(r=>pn(r)!==n)),e}var bv={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function EI(t){return{routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function f1(t,n,e,r,i,o,s){let a=DI(t,n,e);if(!a.matched)return M(a);let c=EI(o(a));return r=d1(n,r),s1(r,n,e,i,c,s).pipe(A(l=>l===!0?a:b({},bv)))}function DI(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?b({},bv):{matched:!0,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let i=(n.matcher||q0)(e,t,n);if(!i)return b({},bv);let o={};Object.entries(i.posParams??{}).forEach(([a,c])=>{o[a]=c.path});let s=i.consumed.length>0?b(b({},o),i.consumed[i.consumed.length-1].parameters):o;return{matched:!0,consumedSegments:i.consumed,remainingSegments:e.slice(i.consumed.length),parameters:s,positionalParamSegments:i.posParams??{}}}function G0(t,n,e,r,i){return e.length>0&&p1(t,e,r,i)?{segmentGroup:new he(n,m1(r,new he(e,t.children))),slicedSegments:[]}:e.length===0&&g1(t,e,r)?{segmentGroup:new he(t.segments,h1(t,e,r,t.children)),slicedSegments:e}:{segmentGroup:new he(t.segments,t.children),slicedSegments:e}}function h1(t,n,e,r){let i={};for(let o of e)if(Hu(t,n,o)&&!r[pn(o)]){let s=new he([],{});i[pn(o)]=s}return b(b({},r),i)}function m1(t,n){let e={};e[G]=n;for(let r of t)if(r.path===""&&pn(r)!==G){let i=new he([],{});e[pn(r)]=i}return e}function p1(t,n,e,r){return e.some(i=>!Hu(t,n,i)||!(pn(i)!==G)?!1:!(r!==void 0&&pn(i)===r))}function g1(t,n,e){return e.some(r=>Hu(t,n,r))}function Hu(t,n,e){return(t.hasChildren()||n.length>0)&&e.pathMatch==="full"?!1:e.path===""}function v1(t,n,e){return n.length===0&&!t.children[e]}var _v=class{};function y1(t,n,e,r,i,o,s="emptyOnly",a){return pe(this,null,function*(){return new wv(t,n,e,r,i,s,o,a).recognize()})}var b1=31,wv=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,e,r,i,o,s,a,c){this.injector=n,this.configLoader=e,this.rootComponentType=r,this.config=i,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new yv(this.urlSerializer,this.urlTree)}noMatchError(n){return new _(4002,`'${n.segmentGroup}'`)}recognize(){return pe(this,null,function*(){let n=G0(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:r}=yield this.match(n),i=new kt(r,e),o=new Wa("",i),s=oI(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}})}match(n){return pe(this,null,function*(){let e=new rs([],Object.freeze({}),Object.freeze(b({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),G,this.rootComponentType,null,{},this.injector);try{return{children:yield this.processSegmentGroup(this.injector,this.config,n,G,e),rootSnapshot:e}}catch(r){if(r instanceof Ka)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof fr?this.noMatchError(r):r}})}processSegmentGroup(n,e,r,i,o){return pe(this,null,function*(){if(r.segments.length===0&&r.hasChildren())return this.processChildren(n,e,r,o);let s=yield this.processSegment(n,e,r,r.segments,i,!0,o);return s instanceof kt?[s]:[]})}processChildren(n,e,r,i){return pe(this,null,function*(){let o=[];for(let c of Object.keys(r.children))c==="primary"?o.unshift(c):o.push(c);let s=[];for(let c of o){let l=r.children[c],d=u1(e,c),u=yield this.processSegmentGroup(n,d,l,c,i);s.push(...u)}let a=CI(s);return _1(a),a})}processSegment(n,e,r,i,o,s,a){return pe(this,null,function*(){for(let c of e)try{return yield this.processSegmentAgainstRoute(c._injector??n,e,c,r,i,o,s,a)}catch(l){if(l instanceof fr||yI(l))continue;throw l}if(v1(r,i,o))return new _v;throw new fr(r)})}processSegmentAgainstRoute(n,e,r,i,o,s,a,c){return pe(this,null,function*(){if(pn(r)!==s&&(s===G||!Hu(i,o,r)))throw new fr(i);if(r.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,i,r,o,s,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(n,i,e,r,o,s,c);throw new fr(i)})}expandSegmentAgainstRouteUsingRedirect(n,e,r,i,o,s,a){return pe(this,null,function*(){let{matched:c,parameters:l,consumedSegments:d,positionalParamSegments:u,remainingSegments:h}=DI(e,i,o);if(!c)throw new fr(e);typeof i.redirectTo=="string"&&i.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>b1&&(this.allowRedirects=!1));let m=this.createSnapshot(n,i,o,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let p=yield this.applyRedirects.applyRedirectCommands(d,i.redirectTo,u,EI(m),n),v=yield this.applyRedirects.lineralizeSegments(i,p);return this.processSegment(n,r,e,v.concat(h),s,!1,a)})}createSnapshot(n,e,r,i,o){let s=new rs(r,i,Object.freeze(b({},this.urlTree.queryParams)),this.urlTree.fragment,E1(e),pn(e),e.component??e._loadedComponent??null,e,D1(e),n),a=Ev(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}matchSegmentAgainstRoute(n,e,r,i,o,s){return pe(this,null,function*(){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=Z=>this.createSnapshot(n,r,Z.consumedSegments,Z.parameters,s),c=yield Cu(f1(e,r,i,n,this.urlSerializer,a,this.abortSignal));if(r.path==="**"&&(e.children={}),!c?.matched)throw new fr(e);n=r._injector??n;let{routes:l}=yield this.getChildConfig(n,r,i),d=r._loadedInjector??n,{parameters:u,consumedSegments:h,remainingSegments:m}=c,p=this.createSnapshot(n,r,h,u,s),{segmentGroup:v,slicedSegments:E}=G0(e,h,m,l,o);if(E.length===0&&v.hasChildren()){let Z=yield this.processChildren(d,l,v,p);return new kt(p,Z)}if(l.length===0&&E.length===0)return new kt(p,[]);let D=pn(r)===o,k=yield this.processSegment(d,l,v,E,D?G:o,!0,p);return new kt(p,k instanceof kt?[k]:[])})}getChildConfig(n,e,r){return pe(this,null,function*(){if(e.children)return{routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(yield Cu(o1(n,e,r,this.urlSerializer,this.abortSignal))){let o=yield this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw c1(e)}return{routes:[],injector:n}})}};function _1(t){t.sort((n,e)=>n.value.outlet===G?-1:e.value.outlet===G?1:n.value.outlet.localeCompare(e.value.outlet))}function w1(t){let n=t.value.routeConfig;return n&&n.path===""}function CI(t){let n=[],e=new Set;for(let r of t){if(!w1(r)){n.push(r);continue}let i=n.find(o=>r.value.routeConfig===o.value.routeConfig);i!==void 0?(i.children.push(...r.children),e.add(i)):n.push(r)}for(let r of e){let i=CI(r.children);n.push(new kt(r.value,i))}return n.filter(r=>!e.has(r))}function E1(t){return t.data||{}}function D1(t){return t.resolve||{}}function C1(t,n,e,r,i,o,s){return Ue(a=>pe(null,null,function*(){let{state:c,tree:l}=yield y1(t,n,e,r,a.extractedUrl,i,o,s);return W(b({},a),{targetSnapshot:c,urlAfterRedirects:l})}))}function I1(t){return Ue(n=>{let{targetSnapshot:e,guards:{canActivateChecks:r}}=n;if(!r.length)return M(n);let i=new Set(r.map(a=>a.route)),o=new Set;for(let a of i)if(!o.has(a))for(let c of II(a))o.add(c);let s=0;return be(o).pipe(_n(a=>i.has(a)?x1(a,e,t):(a.data=Ev(a,a.parent,t).resolve,M(void 0))),Fe(()=>s++),Hc(1),Ue(a=>s===o.size?M(n):Ne))})}function II(t){let n=t.children.map(e=>II(e)).flat();return[t,...n]}function x1(t,n,e){let r=t.routeConfig,i=t._resolve;return r?.title!==void 0&&!hI(r)&&(i[Qa]=r.title),vs(()=>(t.data=Ev(t,t.parent,e).resolve,S1(i,t,n).pipe(A(o=>(t._resolvedData=o,t.data=b(b({},t.data),o),null)))))}function S1(t,n,e){let r=cv(t);if(r.length===0)return M({});let i={};return be(r).pipe(Ue(o=>T1(t[o],n,e).pipe(zn(),Fe(s=>{if(s instanceof is)throw Vu(new hr,s);i[o]=s}))),Hc(1),A(()=>i),bn(o=>yI(o)?Ne:ps(o)))}function T1(t,n,e){let r=n._environmentInjector,i=ss(t,r),o=i.resolve?i.resolve(n,e):He(r,()=>i(n,e));return Fi(o)}function W0(t){return We(n=>{let e=t(n);return e?be(e).pipe(A(()=>n)):M(n)})}var Sv=(()=>{class t{buildTitle(e){let r,i=e.root;for(;i!==void 0;)r=this.getResolvedTitleForRoute(i)??r,i=i.children.find(o=>o.outlet===G);return r}getResolvedTitleForRoute(e){return e.data[Qa]}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(xI),providedIn:"root"})}return t})(),xI=(()=>{class t extends Sv{title;constructor(e){super(),this.title=e}updateTitle(e){let r=this.buildTitle(e);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||t)(w(tD))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),ji=new g("",{factory:()=>({})}),as=new g(""),$u=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=f(np);loadComponent(e,r){return pe(this,null,function*(){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return Promise.resolve(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let i=pe(this,null,function*(){try{let o=yield Q0(He(e,()=>r.loadComponent())),s=yield MI(TI(o));return this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s,s}finally{this.componentLoaders.delete(r)}});return this.componentLoaders.set(r,i),i})}loadChildren(e,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return Promise.resolve({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=pe(this,null,function*(){try{let o=yield SI(r,this.compiler,e,this.onLoadEndListener);return r._loadedRoutes=o.routes,r._loadedInjector=o.injector,r._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(r)}});return this.childrenLoaders.set(r,i),i}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function SI(t,n,e,r){return pe(this,null,function*(){let i=yield Q0(He(e,()=>t.loadChildren())),o=yield MI(TI(i)),s;o instanceof nd||Array.isArray(o)?s=o:s=yield n.compileModuleAsync(o),r&&r(t);let a,c,l=!1,d;return Array.isArray(s)?(c=s,l=!0):(a=s.create(e).injector,d=s,c=a.get(as,[],{optional:!0,self:!0}).flat()),{routes:c.map(xv),injector:a,factory:d}})}function M1(t){return t&&typeof t=="object"&&"default"in t}function TI(t){return M1(t)?t.default:t}function MI(t){return pe(this,null,function*(){return t})}var zu=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(k1),providedIn:"root"})}return t})(),k1=(()=>{class t{shouldProcessUrl(e){return!0}extract(e){return e}merge(e,r){return e}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Tv=new g(""),Mv=new g("");function kI(t,n,e){let r=t.get(Mv),i=t.get($);if(!i.startViewTransition||r.skipNextTransition)return r.skipNextTransition=!1,new Promise(l=>setTimeout(l));let o,s=new Promise(l=>{o=l}),a=i.startViewTransition(()=>(o(),A1(t)));a.updateCallbackDone.catch(l=>{}),a.ready.catch(l=>{}),a.finished.catch(l=>{});let{onViewTransitionCreated:c}=r;return c&&He(t,()=>c({transition:a,from:n,to:e})),s}function A1(t){return new Promise(n=>{nn({read:()=>setTimeout(n)},{injector:t})})}var R1=()=>{},kv=new g(""),Gu=(()=>{class t{currentNavigation=Se(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=Se(null);events=new F;transitionAbortWithErrorSubject=new F;configLoader=f($u);environmentInjector=f(Ee);destroyRef=f(Ze);urlSerializer=f(Pi);rootContexts=f(Li);location=f(Or);inputBindingEnabled=f(Ya,{optional:!0})!==null;titleStrategy=f(Sv);options=f(ji,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=f(zu);createViewTransition=f(Tv,{optional:!0});navigationErrorHandler=f(kv,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>M(void 0);rootComponentType=null;destroyed=!1;constructor(){let e=i=>this.events.next(new Au(i)),r=i=>this.events.next(new Ru(i));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(e){let r=++this.navigationId;Ye(()=>{this.transitions?.next(W(b({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:r,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(e){return this.transitions=new De(null),this.transitions.pipe(ae(r=>r!==null),We(r=>{let i=!1,o=new AbortController,s=()=>!i&&this.currentTransition?.id===r.id;return M(r).pipe(We(a=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",lt.SupersededByNewNavigation),Ne;this.currentTransition=r;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?W(b({},c),{previousNavigation:null}):null,abort:()=>o.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=a.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!l&&d!=="reload")return this.events.next(new Bn(a.id,this.urlSerializer.serialize(a.rawUrl),"",Jo.IgnoredSameUrlNavigation)),a.resolve(!1),Ne;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return M(a).pipe(We(u=>(this.events.next(new Vr(u.id,this.urlSerializer.serialize(u.extractedUrl),u.source,u.restoredState)),u.id!==this.navigationId?Ne:Promise.resolve(u))),C1(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,o.signal),Fe(u=>{r.targetSnapshot=u.targetSnapshot,r.urlAfterRedirects=u.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=u.urlAfterRedirects,h)),this.events.next(new za)}),We(u=>be(r.routesRecognizeHandler.deferredHandle??M(void 0)).pipe(A(()=>u))),Fe(()=>{let u=new $a(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:u,extractedUrl:h,source:m,restoredState:p,extras:v}=a,E=new Vr(u,this.urlSerializer.serialize(h),m,p);this.events.next(E);let D=uI(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=r=W(b({},a),{targetSnapshot:D,urlAfterRedirects:h,extras:W(b({},v),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(k=>(k.finalUrl=h,k)),M(r)}else return this.events.next(new Bn(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Jo.IgnoredByUrlHandlingStrategy)),a.resolve(!1),Ne}),A(a=>{let c=new Su(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=r=W(b({},a),{guards:BP(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),r}),YP(a=>this.events.next(a)),We(a=>{if(r.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw Vu(this.urlSerializer,a.guardsResult);let c=new Tu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!s())return Ne;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",lt.GuardRejected),Ne;if(a.guards.canActivateChecks.length===0)return M(a);let l=new Mu(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!s())return Ne;let d=!1;return M(a).pipe(I1(this.paramsInheritanceStrategy),Fe({next:()=>{d=!0;let u=new ku(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(u)},complete:()=>{d||this.cancelNavigationTransition(a,"",lt.NoDataFromResolver)}}))}),W0(a=>{let c=d=>{let u=[];if(d.routeConfig?._loadedComponent)d.component=d.routeConfig?._loadedComponent;else if(d.routeConfig?.loadComponent){let h=d._environmentInjector;u.push(this.configLoader.loadComponent(h,d.routeConfig).then(m=>{d.component=m}))}for(let h of d.children)u.push(...c(h));return u},l=c(a.targetSnapshot.root);return l.length===0?M(a):be(Promise.all(l).then(()=>a))}),W0(()=>this.afterPreactivation()),We(()=>{let{currentSnapshot:a,targetSnapshot:c}=r,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?be(l).pipe(A(()=>r)):M(r)}),ft(1),We(a=>{let c=PP(e.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=r=a=W(b({},a),{targetRouterState:c}),this.currentNavigation.update(d=>(d.targetRouterState=c,d)),this.events.next(new ts);let l=r.beforeActivateHandler.deferredHandle;return l?be(l.then(()=>a)):M(a)}),Fe(a=>{new vv(e.routeReuseStrategy,r.targetRouterState,r.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),s()&&(i=!0,this.currentNavigation.update(c=>(c.abort=R1,c)),this.lastSuccessfulNavigation.set(Ye(this.currentNavigation)),this.events.next(new gn(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),Ce(bI(o.signal).pipe(ae(()=>!i&&!r.targetRouterState),Fe(()=>{this.cancelNavigationTransition(r,o.signal.reason+"",lt.Aborted)}))),Fe({complete:()=>{i=!0}}),Ce(this.transitionAbortWithErrorSubject.pipe(Fe(a=>{throw a}))),yr(()=>{o.abort(),i||this.cancelNavigationTransition(r,"",lt.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),bn(a=>{if(i=!0,this.destroyed)return r.resolve(!1),Ne;if(vI(a))this.events.next(new $t(r.id,this.urlSerializer.serialize(r.extractedUrl),a.message,a.cancellationCode)),VP(a)?this.events.next(new ns(a.url,a.navigationBehaviorOptions)):r.resolve(!1);else{let c=new Oi(r.id,this.urlSerializer.serialize(r.extractedUrl),a,r.targetSnapshot??void 0);try{let l=He(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof is){let{message:d,cancellationCode:u}=Vu(this.urlSerializer,l);this.events.next(new $t(r.id,this.urlSerializer.serialize(r.extractedUrl),d,u)),this.events.next(new ns(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(l)}}return Ne}))}))}cancelNavigationTransition(e,r,i){let o=new $t(e.id,this.urlSerializer.serialize(e.extractedUrl),r,i);this.events.next(o),e.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=Ye(this.currentNavigation),i=r?.targetBrowserUrl??r?.extractedUrl;return e.toString()!==i?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function N1(t){return t!==Zo}var AI=new g("");var RI=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(O1),providedIn:"root"})}return t})(),Uu=class{shouldDetach(n){return!1}store(n,e){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return!0}},O1=(()=>{class t extends Uu{static \u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})();static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Av=(()=>{class t{urlSerializer=f(Pi);options=f(ji,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=f(Or);urlHandlingStrategy=f(zu);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new zt;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:r,targetBrowserUrl:i}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,r):r,s=i??o;return s instanceof zt?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:r,initialUrl:i}){r&&e?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,i),this.routerState=e):this.rawUrlTree=i}routerState=uI(null,f(Ee));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:()=>f(F1),providedIn:"root"})}return t})(),F1=(()=>{class t extends Av{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{e(r.url,r.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(e,r){e instanceof Vr?this.updateStateMemento():e instanceof Bn?this.commitTransition(r):e instanceof $a?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof ts?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):e instanceof $t&&!dI(e)?this.restoreHistory(r):e instanceof Oi?this.restoreHistory(r,!0):e instanceof gn&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId)}setBrowserUrl(e,r){let{extras:i,id:o}=r,{replaceUrl:s,state:a}=i;if(this.location.isCurrentPathEqualTo(e)||s){let c=this.browserPageId,l=b(b({},a),this.generateNgRouterState(o,c,r));this.location.replaceState(e,"",l)}else{let c=b(b({},a),this.generateNgRouterState(o,this.browserPageId+1,r));this.location.go(e,"",c)}}restoreHistory(e,r=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,o=this.currentPageId-i;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(e,r,i){return this.canceledNavigationResolution==="computed"?b({navigationId:e,\u0275routerPageId:r},this.routerUrlState(i)):b({navigationId:e},this.routerUrlState(i))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})();static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Wu(t,n){t.events.pipe(ae(e=>e instanceof gn||e instanceof $t||e instanceof Oi||e instanceof Bn),A(e=>e instanceof gn||e instanceof Bn?0:(e instanceof $t?e.code===lt.Redirect||e.code===lt.SupersededByNewNavigation:!1)?2:1),ae(e=>e!==2),ft(1)).subscribe(()=>{n()})}var Ur=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=f(rd);stateManager=f(Av);options=f(ji,{optional:!0})||{};pendingTasks=f(Zn);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=f(Gu);urlSerializer=f(Pi);location=f(Or);urlHandlingStrategy=f(zu);injector=f(Ee);_events=new F;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=f(RI);injectorCleanup=f(AI,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=f(as,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!f(Ya,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new we;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(r=>{try{let i=this.navigationTransitions.currentTransition,o=Ye(this.navigationTransitions.currentNavigation);if(i!==null&&o!==null){if(this.stateManager.handleRouterEvent(r,o),r instanceof $t&&r.code!==lt.Redirect&&r.code!==lt.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof gn)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(r instanceof ns){let s=r.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(r.url,i.currentRawUrl),c=b({scroll:i.extras.scroll,browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||N1(i.source)},s);this.scheduleNavigation(a,Zo,null,c,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}OP(r)&&this._events.next(r)}catch(i){this.navigationTransitions.transitionAbortWithErrorSubject.next(i)}});this.eventsSubscription.add(e)}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Zo,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,r,i,o)=>{this.navigateToSyncWithBrowser(e,i,r,o)})}navigateToSyncWithBrowser(e,r,i,o){let s=i?.navigationId?i:null,a=i?.\u0275routerUrl??e;if(i?.\u0275routerUrl&&(o=W(b({},o),{browserUrl:e})),i){let l=b({},i);delete l.navigationId,delete l.\u0275routerPageId,delete l.\u0275routerUrl,Object.keys(l).length!==0&&(o.state=l)}let c=this.parseUrl(a);this.scheduleNavigation(c,r,s,o).catch(l=>{this.disposed||this.injector.get(Pt)(l)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Ye(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(xv),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(e,r={}){let{relativeTo:i,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:c}=r,l=c?this.currentUrlTree.fragment:s,d=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":d=b(b({},this.currentUrlTree.queryParams),o);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=o||null}d!==null&&(d=this.removeEmptyProps(d));let u;try{let h=i?i.snapshot:this.routerState.snapshot.root;u=sI(h)}catch(h){(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),u=this.currentUrlTree.root}return aI(u,e,d,l??null,this.urlSerializer)}navigateByUrl(e,r={skipLocationChange:!1}){let i=Xo(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(o,Zo,null,r)}navigate(e,r={skipLocationChange:!1}){return P1(e),this.navigateByUrl(this.createUrlTree(e,r),r)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch(r){return this.console.warn(En(4018,!1)),this.urlSerializer.parse("/")}}isActive(e,r){let i;if(r===!0?i=b({},Y0):r===!1?i=b({},lv):i=b(b({},lv),r),Xo(e))return B0(this.currentUrlTree,e,i);let o=this.parseUrl(e);return B0(this.currentUrlTree,o,i)}removeEmptyProps(e){return Object.entries(e).reduce((r,[i,o])=>(o!=null&&(r[i]=o),r),{})}scheduleNavigation(e,r,i,o,s){if(this.disposed)return Promise.resolve(!1);let a,c,l;s?(a=s.resolve,c=s.reject,l=s.promise):l=new Promise((u,h)=>{a=u,c=h});let d=this.pendingTasks.add();return Wu(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function P1(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new _(4008,!1)}var Ja=class{};var NI=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,r,i,o){this.router=e,this.injector=r,this.preloadingStrategy=i,this.loader=o}setUpPreloading(){this.subscription=this.router.events.pipe(ae(e=>e instanceof gn),_n(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe()}processRoutes(e,r){let i=[];for(let o of r){o.providers&&!o._injector&&(o._injector=Io(o.providers,e,""));let s=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(s).injector);let a=o._loadedInjector??s;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&i.push(this.preloadConfig(s,o)),(o.children||o._loadedRoutes)&&i.push(this.processRoutes(a,o.children??o._loadedRoutes))}return be(i).pipe(gr())}preloadConfig(e,r){return this.preloadingStrategy.preload(r,()=>{if(e.destroyed)return M(null);let i;r.loadChildren&&r.canLoad===void 0?i=be(this.loader.loadChildren(e,r)):i=M(null);let o=i.pipe(Ue(s=>s===null?M(void 0):(r._loadedRoutes=s.routes,r._loadedInjector=s.injector,r._loadedNgModuleFactory=s.factory,this.processRoutes(s.injector??e,s.routes))));if(r.loadComponent&&!r._loadedComponent){let s=this.loader.loadComponent(e,r);return be([o,s]).pipe(gr())}else return o})}static \u0275fac=function(r){return new(r||t)(w(Ur),w(Ee),w(Ja),w($u))};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),OI=new g(""),j1=(()=>{class t{options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=Zo;restoredId=0;store={};isHydrating=f(_m,{optional:!0})??!1;urlSerializer=f(Pi);zone=f(P);viewportScroller=f(gp);transitions=f(Gu);constructor(e){this.options=e,this.options.scrollPositionRestoration||="disabled",this.options.anchorScrolling||="disabled",this.isHydrating&&f(Ct).whenStable().then(()=>{this.isHydrating=!1})}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(e=>{e instanceof Vr?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=e.navigationTrigger,this.restoredId=e.restoredState?e.restoredState.navigationId:0):e instanceof gn?(this.lastId=e.id,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.urlAfterRedirects).fragment)):e instanceof Bn&&e.code===Jo.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(e=>{if(!(e instanceof es)||e.scrollBehavior==="manual")return;let r={behavior:"instant"};e.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0],r):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(e.position,r):e.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(e.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0])})}scheduleScrollEvent(e,r){if(this.isHydrating)return;let i=Ye(this.transitions.currentNavigation)?.extras.scroll;this.zone.runOutsideAngular(()=>pe(this,null,function*(){yield new Promise(o=>{setTimeout(o),typeof requestAnimationFrame<"u"&&requestAnimationFrame(o)}),this.zone.run(()=>{this.transitions.events.next(new es(e,this.lastSource==="popstate"?this.store[this.restoredId]:null,r,i))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static \u0275fac=function(r){$m()};static \u0275prov=y({token:t,factory:t.\u0275fac})}return t})();function V1(){return f(Ur).routerState.root}function ec(t,n){return{\u0275kind:t,\u0275providers:n}}function B1(){let t=f(X);return n=>{let e=t.get(Ct);if(n!==e.components[0])return;let r=t.get(Ur),i=t.get(FI);t.get(Nv)===1&&r.initialNavigation(),t.get(jI,null,{optional:!0})?.setUpPreloading(),t.get(OI,null,{optional:!0})?.init(),r.resetRootComponentType(e.componentTypes[0]),i.closed||(i.next(),i.complete(),i.unsubscribe())}}var FI=new g("",{factory:()=>new F}),Nv=new g("",{factory:()=>1});function PI(){let t=[{provide:Wl,useValue:!0},{provide:Nv,useValue:0},ad(()=>{let n=f(X);return n.get(cp,Promise.resolve()).then(()=>new Promise(r=>{let i=n.get(Ur),o=n.get(FI);Wu(i,()=>{r(!0)}),n.get(Gu).afterPreactivation=()=>(r(!0),o.closed?M(void 0):o),i.initialNavigation()}))})];return ec(2,t)}function LI(){let t=[ad(()=>{f(Ur).setUpLocationChangeListener()}),{provide:Nv,useValue:2}];return ec(3,t)}var jI=new g("");function VI(t){return ec(0,[{provide:jI,useExisting:NI},{provide:Ja,useExisting:t}])}function BI(){return ec(8,[Cv,{provide:Ya,useExisting:Cv}])}function UI(t){On("NgRouterViewTransitions");let n=[{provide:Tv,useValue:kI},{provide:Mv,useValue:b({skipNextTransition:!!t?.skipInitialTransition},t)}];return ec(9,n)}var HI=[Or,{provide:Pi,useClass:hr},Ur,Li,{provide:Br,useFactory:V1},$u,[]],qu=(()=>{class t{constructor(){}static forRoot(e,r){return{ngModule:t,providers:[HI,[],{provide:as,multi:!0,useValue:e},[],r?.errorHandler?{provide:kv,useValue:r.errorHandler}:[],{provide:ji,useValue:r||{}},r?.useHash?H1():$1(),U1(),r?.preloadingStrategy?VI(r.preloadingStrategy).\u0275providers:[],r?.initialNavigation?z1(r):[],r?.bindToComponentInputs?BI().\u0275providers:[],r?.enableViewTransitions?UI().\u0275providers:[],G1()]}}static forChild(e){return{ngModule:t,providers:[{provide:as,multi:!0,useValue:e}]}}static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();function U1(){return{provide:OI,useFactory:()=>{let t=f(gp),n=f(ji);return n.scrollOffset&&t.setOffset(n.scrollOffset),new j1(n)}}}function H1(){return{provide:ar,useClass:up}}function $1(){return{provide:ar,useClass:pd}}function z1(t){return[t.initialNavigation==="disabled"?LI().\u0275providers:[],t.initialNavigation==="enabledBlocking"?PI().\u0275providers:[]]}var Rv=new g("");function G1(){return[{provide:Rv,useFactory:B1},{provide:cd,multi:!0,useExisting:Rv}]}var K1=[{path:"",component:V0,pathMatch:"full"}],$I=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[qu.forRoot(K1),qu]})}}return t})();var Q1=["*",[["mat-toolbar-row"]]],Z1=["*","mat-toolbar-row"],Y1=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),zI=(()=>{class t{_elementRef=f(ne);_platform=f(Ae);_document=f($);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-toolbar"]],contentQueries:function(r,i,o){if(r&1&&on(o,Y1,5),r&2){let s;je(s=Ve())&&(i._toolbarRows=s)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(r,i){r&2&&(or(i.color?"mat-"+i.color:""),re("mat-toolbar-multiple-rows",i._toolbarRows.length>0)("mat-toolbar-single-row",i._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Z1,decls:2,vars:0,template:function(r,i){r&1&&(xe(Q1),te(0),te(1,1))},styles:[`.mat-toolbar {
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
`],encapsulation:2,changeDetection:0})}return t})();var Ov=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var J1=20,Fv=(()=>{class t{_ngZone=f(P);_platform=f(Ae);_renderer=f(st).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new F;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let r=this.scrollContainers.get(e);r&&(r.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=J1){return this._platform.isBrowser?new V(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(Vc(e)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):M()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(e,r){let i=this.getAncestorScrollContainers(e);return this.scrolled(r).pipe(ae(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(e){let r=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,e)&&r.push(o)}),r}_scrollableContainsElement(e,r){let i=Bt(r),o=e.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ku=(()=>{class t{elementRef=f(ne);scrollDispatcher=f(Fv);ngZone=f(P);dir=f(La,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new F;_renderer=f(Mt);_cleanupScroll;_elementScrolled=new F;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let r=this.elementRef.nativeElement,i=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=i?e.end:e.start),e.right==null&&(e.right=i?e.start:e.end),e.bottom!=null&&(e.top=r.scrollHeight-r.clientHeight-e.bottom),i&&Go()!=mn.NORMAL?(e.left!=null&&(e.right=r.scrollWidth-r.clientWidth-e.left),Go()==mn.INVERTED?e.left=e.right:Go()==mn.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=r.scrollWidth-r.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let r=this.elementRef.nativeElement;h0()?r.scrollTo(e):(e.top!=null&&(r.scrollTop=e.top),e.left!=null&&(r.scrollLeft=e.left))}measureScrollOffset(e){let r="left",i="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?i:r:e=="end"&&(e=s?r:i),s&&Go()==mn.INVERTED?e==r?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&Go()==mn.NEGATED?e==r?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==r?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),eL=20,GI=(()=>{class t{_platform=f(Ae);_listeners;_viewportSize=null;_change=new F;_document=f($);constructor(){let e=f(P),r=f(st).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,r=this._getWindow(),i=e.documentElement,o=i.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||e.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(e=eL){return e>0?this._change.pipe(Vc(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||t)};static \u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Pv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();var WI=["*"],nL=["content"],rL=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],iL=["mat-drawer","mat-drawer-content","*"];function oL(t,n){if(t&1){let e=ir();C(0,"div",1),ge("click",function(){Yt(e);let i=$e();return Xt(i._onBackdropClicked())}),O()}if(t&2){let e=$e();re("mat-drawer-shown",e._isShowingBackdrop())}}function sL(t,n){t&1&&(C(0,"mat-drawer-content"),te(1,2),O())}var aL=new g("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:()=>!1}),qI=new g("MAT_DRAWER_CONTAINER"),tc=(()=>{class t extends Ku{_platform=f(Ae);_changeDetectorRef=f(Xe);_container=f(jv);constructor(){let e=f(ne),r=f(Fv),i=f(P);super(e,r,i)}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}_shouldBeHidden(){if(this._platform.isBrowser)return!1;let{start:e,end:r}=this._container;return e!=null&&e.mode!=="over"&&e.opened||r!=null&&r.mode!=="over"&&r.opened}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:6,hostBindings:function(r,i){r&2&&(xo("margin-left",i._container._contentMargins.left,"px")("margin-right",i._container._contentMargins.right,"px"),re("mat-drawer-content-hidden",i._shouldBeHidden()))},features:[jt([{provide:Ku,useExisting:t}]),ct],ngContentSelectors:WI,decls:1,vars:0,template:function(r,i){r&1&&(xe(),te(0))},encapsulation:2,changeDetection:0})}return t})(),Lv=(()=>{class t{_elementRef=f(ne);_focusTrapFactory=f(Gg);_focusMonitor=f(Ra);_platform=f(Ae);_ngZone=f(P);_renderer=f(Mt);_interactivityChecker=f(du);_doc=f($);_container=f(qI,{optional:!0});_focusTrap=null;_elementFocusedBeforeDrawerWasOpened=null;_eventCleanups;_isAttached=!1;_anchor=null;get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}_position="start";get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}_mode="over";get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=_t(e)}_disableClose=!1;get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=_t(e)),this._autoFocus=e}_autoFocus;get opened(){return this._opened()}set opened(e){this.toggle(_t(e))}_opened=Se(!1);_openedVia=null;_animationStarted=new F;_animationEnd=new F;openedChange=new de(!0);_openedStream=this.openedChange.pipe(ae(e=>e),A(()=>{}));openedStart=this._animationStarted.pipe(ae(()=>this.opened),Uc(void 0));_closedStream=this.openedChange.pipe(ae(e=>!e),A(()=>{}));closedStart=this._animationStarted.pipe(ae(()=>!this.opened),Uc(void 0));_destroyed=new F;onPositionChanged=new de;_content;_modeChanged=new F;_injector=f(X);_changeDetectorRef=f(Xe);constructor(){this.openedChange.pipe(Ce(this._destroyed)).subscribe(e=>{e?(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement,this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._eventCleanups=this._ngZone.runOutsideAngular(()=>{let e=this._renderer,r=this._elementRef.nativeElement;return[e.listen(r,"keydown",i=>{i.keyCode===27&&!this.disableClose&&!zo(i)&&this._ngZone.run(()=>{this.close(),i.stopPropagation(),i.preventDefault()})}),e.listen(r,"transitionend",this._handleTransitionEvent),e.listen(r,"transitioncancel",this._handleTransitionEvent)]}),this._animationEnd.subscribe(()=>{this.openedChange.emit(this.opened)})}_forceFocus(e,r){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{o(),s(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",i),s=this._renderer.listen(e,"mousedown",i)})),e.focus(r)}_focusByCssSelector(e,r){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,r)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":nn(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngOnDestroy(){this._eventCleanups.forEach(e=>e()),this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,r){e&&r&&(this._openedVia=r);let i=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),i}_setOpen(e,r,i){return e===this.opened?Promise.resolve(e?"open":"close"):(this._opened.set(e),this._container?._transitionsEnabled?(this._setIsAnimating(!0),setTimeout(()=>this._animationStarted.next())):setTimeout(()=>{this._animationStarted.next(),this._animationEnd.next()}),this._elementRef.nativeElement.classList.toggle("mat-drawer-opened",e),!e&&r&&this._restoreFocus(i),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(o=>{this.openedChange.pipe(ft(1)).subscribe(s=>o(s?"open":"close"))}))}_setIsAnimating(e){this._elementRef.nativeElement.classList.toggle("mat-drawer-animating",e)}_getWidth(){return this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=this.opened&&!!this._container?._isShowingBackdrop())}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let r=this._elementRef.nativeElement,i=r.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),i.insertBefore(this._anchor,r)),i.appendChild(r)):this._anchor&&this._anchor.parentNode.insertBefore(r,this._anchor)}_handleTransitionEvent=e=>{let r=this._elementRef.nativeElement;e.target===r&&this._ngZone.run(()=>{e.type==="transitionend"&&this._setIsAnimating(!1),this._animationEnd.next(e)})};static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-drawer"]],viewQuery:function(r,i){if(r&1&&Pn(nL,5),r&2){let o;je(o=Ve())&&(i._content=o.first)}},hostAttrs:[1,"mat-drawer"],hostVars:12,hostBindings:function(r,i){r&2&&(Le("align",null)("tabIndex",i.mode!=="side"?"-1":null),xo("visibility",!i._container&&!i.opened?"hidden":null),re("mat-drawer-end",i.position==="end")("mat-drawer-over",i.mode==="over")("mat-drawer-push",i.mode==="push")("mat-drawer-side",i.mode==="side"))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],ngContentSelectors:WI,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(r,i){r&1&&(xe(),C(0,"div",1,0),te(2),O())},dependencies:[Ku],encapsulation:2,changeDetection:0})}return t})(),jv=(()=>{class t{_dir=f(La,{optional:!0});_element=f(ne);_ngZone=f(P);_changeDetectorRef=f(Xe);_animationDisabled=Ut();_transitionsEnabled=!1;_allDrawers;_drawers=new Yn;_content;_userContent;get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=_t(e)}_autosize=f(aL);get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:_t(e)}_backdropOverride=null;backdropClick=new de;_start=null;_end=null;_left=null;_right=null;_destroyed=new F;_doCheckSubject=new F;_contentMargins={left:null,right:null};_contentMarginChanges=new F;get scrollable(){return this._userContent||this._content}_injector=f(X);constructor(){let e=f(Ae),r=f(GI);this._dir?.change.pipe(Ce(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),r.change().pipe(Ce(this._destroyed)).subscribe(()=>this.updateContentMargins()),!this._animationDisabled&&e.isBrowser&&this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._element.nativeElement.classList.add("mat-drawer-transition"),this._transitionsEnabled=!0},200)})}ngAfterContentInit(){this._allDrawers.changes.pipe(ei(this._allDrawers),Ce(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(r=>!r._container||r._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(ei(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe($n(10),Ce(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,r=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let i=this._left._getWidth();e+=i,r-=i}}if(this._right&&this._right.opened){if(this._right.mode=="side")r+=this._right._getWidth();else if(this._right.mode=="push"){let i=this._right._getWidth();r+=i,e-=i}}e=e||null,r=r||null,(e!==this._contentMargins.left||r!==this._contentMargins.right)&&(this._contentMargins={left:e,right:r},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(Ce(this._drawers.changes)).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(Ce(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e.onPositionChanged.pipe(Ce(this._drawers.changes)).subscribe(()=>{nn({read:()=>this._validateDrawers()},{injector:this._injector})})}_watchDrawerMode(e){e._modeChanged.pipe(Ce(vr(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let r=this._element.nativeElement.classList,i="mat-drawer-container-has-open";e?r.add(i):r.remove(i)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-drawer-container"]],contentQueries:function(r,i,o){if(r&1&&on(o,tc,5)(o,Lv,5),r&2){let s;je(s=Ve())&&(i._content=s.first),je(s=Ve())&&(i._allDrawers=s)}},viewQuery:function(r,i){if(r&1&&Pn(tc,5),r&2){let o;je(o=Ve())&&(i._userContent=o.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(r,i){r&2&&re("mat-drawer-container-explicit-backdrop",i._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],features:[jt([{provide:qI,useExisting:t}])],ngContentSelectors:iL,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(r,i){r&1&&(xe(rL),er(0,oL,1,2,"div",0),te(1),te(2,1),er(3,sL,2,0,"mat-drawer-content")),r&2&&(tr(i.hasBackdrop?0:-1),fe(3),tr(i._content?-1:3))},dependencies:[tc],styles:[`.mat-drawer-container {
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
`],encapsulation:2,changeDetection:0})}return t})();var Vv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Pv,Be,Pv]})}return t})();var cs=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new F;constructor(n=!1,e,r=!0,i){this._multiple=n,this._emitChanges=r,this.compareWith=i,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){this._verifyValueAssignment(n),n.forEach(r=>this._markSelected(r));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...n){this._verifyValueAssignment(n),n.forEach(r=>this._unmarkSelected(r));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...n){this._verifyValueAssignment(n);let e=this.selected,r=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!r.has(this._getConcreteValue(o,r))).forEach(o=>this._unmarkSelected(o));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let r of e)if(this.compareWith(n,r))return r;return n}else return n}};var Qu=new g("");var KI=new g("");var QI=new g("",{factory:()=>Bv}),Bv="always";var lL=new g("");var ZI=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({})}return t})();var Uv=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:QI,useValue:e.callSetDisabledState??Bv}]}}static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[ZI]})}return t})(),Hv=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:lL,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:QI,useValue:e.callSetDisabledState??Bv}]}}static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[ZI]})}return t})();var YI=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var XI=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[Be]})}return t})();var fL=["*"],hL=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
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
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`,mL=["unscopedContent"];var pL=[[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["mat-divider"]],[["","matListItemAvatar",""],["","matListItemIcon",""]]],gL=["[matListItemTitle]","[matListItemLine]","*","mat-divider","[matListItemAvatar],[matListItemIcon]"];function vL(t,n){t&1&&te(0,4)}function yL(t,n){if(t&1&&(C(0,"div",11),Oe(1,"input",12),C(2,"div",13),uo(),C(3,"svg",14),Oe(4,"path",15),O(),fo(),Oe(5,"div",16),O()()),t&2){let e=$e();re("mdc-checkbox--disabled",e.disabled),fe(),Ie("checked",e.selected)("disabled",e.disabled)}}function bL(t,n){if(t&1&&(C(0,"div",17),Oe(1,"input",18),C(2,"div",19),Oe(3,"div",20)(4,"div",21),O()()),t&2){let e=$e();re("mdc-radio--disabled",e.disabled),fe(),Ie("checked",e.selected)("disabled",e.disabled)}}function _L(t,n){}function wL(t,n){if(t&1&&(C(0,"span",4),bt(1,_L,0,0,"ng-template",6),O()),t&2){$e();let e=Lt(3);fe(),Ie("ngTemplateOutlet",e)}}function EL(t,n){}function DL(t,n){if(t&1&&(C(0,"span",5),bt(1,EL,0,0,"ng-template",6),O()),t&2){$e();let e=Lt(5);fe(),Ie("ngTemplateOutlet",e)}}function CL(t,n){}function IL(t,n){if(t&1&&bt(0,CL,0,0,"ng-template",6),t&2){$e();let e=Lt(1);Ie("ngTemplateOutlet",e)}}function xL(t,n){}function SL(t,n){if(t&1&&(C(0,"span",9),bt(1,xL,0,0,"ng-template",6),O()),t&2){$e();let e=Lt(3);fe(),Ie("ngTemplateOutlet",e)}}function TL(t,n){}function ML(t,n){if(t&1&&(C(0,"span",9),bt(1,TL,0,0,"ng-template",6),O()),t&2){$e();let e=Lt(5);fe(),Ie("ngTemplateOutlet",e)}}function kL(t,n){}function AL(t,n){if(t&1&&bt(0,kL,0,0,"ng-template",6),t&2){$e();let e=Lt(1);Ie("ngTemplateOutlet",e)}}var ex=new g("ListOption"),RL=(()=>{class t{_elementRef=f(ne);constructor(){}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return t})(),NL=(()=>{class t{_elementRef=f(ne);constructor(){}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return t})();var tx=(()=>{class t{_listOption=f(ex,{optional:!0});constructor(){}_isAlignedAtStart(){return!this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,hostVars:4,hostBindings:function(r,i){r&2&&re("mdc-list-item__start",i._isAlignedAtStart())("mdc-list-item__end",!i._isAlignedAtStart())}})}return t})(),OL=(()=>{class t extends tx{static \u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})();static \u0275dir=ce({type:t,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[ct]})}return t})(),FL=(()=>{class t extends tx{static \u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})();static \u0275dir=ce({type:t,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[ct]})}return t})(),PL=new g("MAT_LIST_CONFIG"),$v=(()=>{class t{_isNonInteractive=!0;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=_t(e)}_disableRipple=!1;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(_t(e))}_disabled=Se(!1);_defaultOptions=f(PL,{optional:!0});static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,hostVars:1,hostBindings:function(r,i){r&2&&Le("aria-disabled",i.disabled)},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return t})(),JI=(()=>{class t{_elementRef=f(ne);_ngZone=f(P);_listBase=f($v,{optional:!0});_platform=f(Ae);_hostElement;_isButtonElement;_noopAnimations=Ut();_avatars;_icons;set lines(e){this._explicitLines=Si(e,null),this._updateItemLines(!1)}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(e){this._disableRipple=_t(e)}_disableRipple=!1;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(e){this._disabled.set(_t(e))}_disabled=Se(!1);_subscriptions=new we;_rippleRenderer=null;_hasUnscopedTextContent=!1;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){f(hn).load(Wo);let e=f(Pa,{optional:!0});this.rippleConfig=e||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button")}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(!0)}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents()}_hasIconOrAvatar(){return!!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new ki(this,this._ngZone,this._hostElement,this._platform,f(X)),this._rippleRenderer.setupTriggerEvents(this._hostElement)}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(vr(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(!1)))})}_updateItemLines(e){if(!this._lines||!this._titles||!this._unscopedContent)return;e&&this._checkDomForUnscopedTextContent();let r=this._explicitLines??this._inferLinesFromContent(),i=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",r<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",r<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",r===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",r===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&r===1;i.classList.toggle("mdc-list-item__primary-text",o),i.classList.toggle("mdc-list-item__secondary-text",!o)}else i.classList.remove("mdc-list-item__primary-text"),i.classList.remove("mdc-list-item__secondary-text")}_inferLinesFromContent(){let e=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(e+=1),e}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(e=>e.nodeType!==e.COMMENT_NODE).some(e=>!!(e.textContent&&e.textContent.trim()))}static \u0275fac=function(r){return new(r||t)};static \u0275dir=ce({type:t,contentQueries:function(r,i,o){if(r&1&&on(o,OL,4)(o,FL,4),r&2){let s;je(s=Ve())&&(i._avatars=s),je(s=Ve())&&(i._icons=s)}},hostVars:4,hostBindings:function(r,i){r&2&&(Le("aria-disabled",i.disabled)("disabled",i._isButtonElement&&i.disabled||null),re("mdc-list-item--disabled",i.disabled))},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return t})();var nx=new g("SelectionList"),Gv=(()=>{class t extends JI{_selectionList=f(nx);_changeDetectorRef=f(Xe);_lines;_titles;_unscopedContent;selectedChange=new de;togglePosition="after";get checkboxPosition(){return this.togglePosition}set checkboxPosition(e){this.togglePosition=e}get color(){return this._color||this._selectionList.color}set color(e){this._color=e}_color;get value(){return this._value}set value(e){this.selected&&e!==this.value&&this._inputsInitialized&&(this.selected=!1),this._value=e}_value;get selected(){return this._selectionList.selectedOptions.isSelected(this)}set selected(e){let r=_t(e);r!==this._selected&&(this._setSelected(r),(r||this._selectionList.multiple)&&this._selectionList._reportValueChange())}_selected=!1;_inputsInitialized=!1;ngOnInit(){let e=this._selectionList;e._value&&e._value.some(i=>e.compareWith(this._value,i))&&this._setSelected(!0);let r=this._selected;Promise.resolve().then(()=>{(this._selected||r)&&(this.selected=!0,this._changeDetectorRef.markForCheck())}),this._inputsInitialized=!0}ngOnDestroy(){super.ngOnDestroy(),this.selected&&Promise.resolve().then(()=>{this.selected=!1})}toggle(){this.selected=!this.selected}focus(){this._hostElement.focus()}getLabel(){return(this._titles?.get(0)?._elementRef.nativeElement||this._unscopedContent?.nativeElement)?.textContent||""}_hasCheckboxAt(e){return this._selectionList.multiple&&this._getTogglePosition()===e}_hasRadioAt(e){return!this._selectionList.multiple&&this._getTogglePosition()===e&&!this._selectionList.hideSingleSelectionIndicator}_hasIconsOrAvatarsAt(e){return this._hasProjected("icons",e)||this._hasProjected("avatars",e)}_hasProjected(e,r){return this._getTogglePosition()!==r&&(e==="avatars"?this._avatars.length!==0:this._icons.length!==0)}_handleBlur(){this._selectionList._onTouched()}_getTogglePosition(){return this.togglePosition||"after"}_setSelected(e){return e===this._selected?!1:(this._selected=e,e?this._selectionList.selectedOptions.select(this):this._selectionList.selectedOptions.deselect(this),this.selectedChange.emit(e),this._changeDetectorRef.markForCheck(),!0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_toggleOnInteraction(){this.disabled||(this._selectionList.multiple?(this.selected=!this.selected,this._selectionList._emitChangeEvent([this])):this.selected||(this.selected=!0,this._selectionList._emitChangeEvent([this])))}_setTabindex(e){this._hostElement.setAttribute("tabindex",e+"")}_hasBothLeadingAndTrailing(){let e=this._hasProjected("avatars","before")||this._hasProjected("icons","before")||this._hasCheckboxAt("before")||this._hasRadioAt("before"),r=this._hasProjected("icons","after")||this._hasProjected("avatars","after")||this._hasCheckboxAt("after")||this._hasRadioAt("after");return e&&r}static \u0275fac=(()=>{let e;return function(i){return(e||(e=vt(t)))(i||t)}})();static \u0275cmp=Q({type:t,selectors:[["mat-list-option"]],contentQueries:function(r,i,o){if(r&1&&on(o,NL,5)(o,RL,5),r&2){let s;je(s=Ve())&&(i._lines=s),je(s=Ve())&&(i._titles=s)}},viewQuery:function(r,i){if(r&1&&Pn(mL,5),r&2){let o;je(o=Ve())&&(i._unscopedContent=o.first)}},hostAttrs:["role","option",1,"mat-mdc-list-item","mat-mdc-list-option","mdc-list-item"],hostVars:27,hostBindings:function(r,i){r&1&&ge("blur",function(){return i._handleBlur()})("click",function(){return i._toggleOnInteraction()}),r&2&&(Le("aria-selected",i.selected),re("mdc-list-item--selected",i.selected&&!i._selectionList.multiple&&i._selectionList.hideSingleSelectionIndicator)("mdc-list-item--with-leading-avatar",i._hasProjected("avatars","before"))("mdc-list-item--with-leading-icon",i._hasProjected("icons","before"))("mdc-list-item--with-trailing-icon",i._hasProjected("icons","after"))("mat-mdc-list-option-with-trailing-avatar",i._hasProjected("avatars","after"))("mdc-list-item--with-leading-checkbox",i._hasCheckboxAt("before"))("mdc-list-item--with-trailing-checkbox",i._hasCheckboxAt("after"))("mdc-list-item--with-leading-radio",i._hasRadioAt("before"))("mdc-list-item--with-trailing-radio",i._hasRadioAt("after"))("mat-mdc-list-item-both-leading-and-trailing",i._hasBothLeadingAndTrailing())("mat-accent",i.color!=="primary"&&i.color!=="warn")("mat-warn",i.color==="warn")("_mat-animation-noopable",i._noopAnimations))},inputs:{togglePosition:"togglePosition",checkboxPosition:"checkboxPosition",color:"color",value:"value",selected:"selected"},outputs:{selectedChange:"selectedChange"},exportAs:["matListOption"],features:[jt([{provide:JI,useExisting:t},{provide:ex,useExisting:t}]),ct],ngContentSelectors:gL,decls:20,vars:4,consts:[["icons",""],["checkbox",""],["radio",""],["unscopedContent",""],[1,"mdc-list-item__start","mat-mdc-list-option-checkbox-before"],[1,"mdc-list-item__start","mat-mdc-list-option-radio-before"],[3,"ngTemplateOutlet"],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mdc-list-item__end"],[1,"mat-focus-indicator"],[1,"mdc-checkbox"],["type","checkbox",1,"mdc-checkbox__native-control",3,"checked","disabled"],[1,"mdc-checkbox__background"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],[1,"mdc-radio"],["type","radio",1,"mdc-radio__native-control",3,"checked","disabled"],[1,"mdc-radio__background"],[1,"mdc-radio__outer-circle"],[1,"mdc-radio__inner-circle"]],template:function(r,i){r&1&&(xe(pL),bt(0,vL,1,0,"ng-template",null,0,ea)(2,yL,6,4,"ng-template",null,1,ea)(4,bL,5,4,"ng-template",null,2,ea),er(6,wL,2,1,"span",4)(7,DL,2,1,"span",5),er(8,IL,1,1,null,6),C(9,"span",7),te(10),te(11,1),C(12,"span",8,3),ge("cdkObserveContent",function(){return i._updateItemLines(!0)}),te(14,2),O()(),er(15,SL,2,1,"span",9)(16,ML,2,1,"span",9),er(17,AL,1,1,null,6),te(18,3),Oe(19,"div",10)),r&2&&(fe(6),tr(i._hasCheckboxAt("before")?6:i._hasRadioAt("before")?7:-1),fe(2),tr(i._hasIconsOrAvatarsAt("before")?8:-1),fe(7),tr(i._hasCheckboxAt("after")?15:i._hasRadioAt("after")?16:-1),fe(2),tr(i._hasIconsOrAvatarsAt("after")?17:-1))},dependencies:[fp,c0],styles:[`.mat-mdc-list-option-with-trailing-avatar.mdc-list-item, [dir=rtl] .mat-mdc-list-option-with-trailing-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
  width: 40px;
  height: 40px;
}
.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mat-mdc-list-option-with-trailing-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mat-mdc-list-option-with-trailing-avatar .mdc-list-item__end {
  border-radius: 50%;
}

.mat-mdc-list-option .mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mat-mdc-list-option .mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mat-mdc-list-option .mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-list-option .mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}
.mat-mdc-list-option .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}
.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mat-mdc-list-option .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mat-mdc-list-option .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mat-mdc-list-option .mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}
.mat-mdc-list-option .mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}
.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}
.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}
.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
.mat-mdc-list-option .mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}
.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}
.mat-mdc-list-option .mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}
.mat-mdc-list-option .mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}
.mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mat-mdc-list-option .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}
.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}
.mat-mdc-list-option .mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}
.mat-mdc-list-option .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-list-option .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}
.mat-mdc-list-option .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mat-mdc-list-option .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}
.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-list-option .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}
@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-list-option .mdc-radio {
  display: inline-block;
  position: relative;
  flex: 0 0 auto;
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  cursor: pointer;
  will-change: opacity, transform, border-color, color;
  padding: calc((var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-list-option .mdc-radio__background {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
}
.mat-mdc-list-option .mdc-radio__background::before {
  position: absolute;
  transform: scale(0, 0);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
  top: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
  left: calc(-1 * (var(--mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-list-option .mdc-radio__outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  transition: border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-list-option .mdc-radio__inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform: scale(0);
  border-radius: 50%;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.6, 1), background-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
@media (forced-colors: active) {
  .mat-mdc-list-option .mdc-radio__inner-circle {
    background-color: CanvasText !important;
  }
}
.mat-mdc-list-option .mdc-radio__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  top: 0;
  right: 0;
  left: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-radio-state-layer-size, 40px);
  height: var(--mat-radio-state-layer-size, 40px);
}
.mat-mdc-list-option .mdc-radio__native-control:checked + .mdc-radio__background, .mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background {
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-list-option .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle, .mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-list-option .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle, .mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-list-option .mdc-radio__native-control:disabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-unselected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background {
  cursor: default;
}
.mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-list-option .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-disabled-selected-icon-color, var(--mat-sys-on-surface, currentColor));
  opacity: var(--mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-list-option .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-unselected-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-list-option .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary));
}
.mat-mdc-list-option .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--mat-radio-selected-icon-color, var(--mat-sys-primary, currentColor));
}
.mat-mdc-list-option .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  transform: scale(0.5);
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-list-option._mat-animation-noopable .mdc-radio__background::before,
.mat-mdc-list-option._mat-animation-noopable .mdc-radio__outer-circle,
.mat-mdc-list-option._mat-animation-noopable .mdc-radio__inner-circle {
  transition: none !important;
}
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__start > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark, .mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-list-option._mat-animation-noopable > .mdc-list-item__end > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-list-option .mdc-checkbox__native-control, .mat-mdc-list-option .mdc-radio__native-control {
  display: none;
}

@media (forced-colors: active) {
  .mat-mdc-list-option.mdc-list-item--selected::after {
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
  .mat-mdc-list-option.mdc-list-item--selected [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}
`],encapsulation:2,changeDetection:0})}return t})();var LL={provide:Qu,useExisting:Dn(()=>Wv),multi:!0},zv=class{source;options;constructor(n,e){this.source=n,this.options=e}},Wv=(()=>{class t extends $v{_element=f(ne);_ngZone=f(P);_renderer=f(Mt);_initialized=!1;_keyManager;_listenerCleanups;_destroyed=new F;_isDestroyed=!1;_onChange=e=>{};_items;selectionChange=new de;color="accent";compareWith=(e,r)=>e===r;get multiple(){return this._multiple}set multiple(e){let r=_t(e);r!==this._multiple&&(this._multiple=r,this.selectedOptions=new cs(this._multiple,this.selectedOptions.selected))}_multiple=!0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=_t(e)}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;selectedOptions=new cs(this._multiple);_value=null;_onTouched=()=>{};_changeDetectorRef=f(Xe);constructor(){super(),this._isNonInteractive=!1}ngAfterViewInit(){this._initialized=!0,this._setupRovingTabindex(),this._ngZone.runOutsideAngular(()=>{this._listenerCleanups=[this._renderer.listen(this._element.nativeElement,"focusin",this._handleFocusin),this._renderer.listen(this._element.nativeElement,"focusout",this._handleFocusout)]}),this._value&&this._setOptionsFromValues(this._value),this._watchForSelectionChange()}ngOnChanges(e){let r=e.disabled,i=e.disableRipple,o=e.hideSingleSelectionIndicator;(i&&!i.firstChange||r&&!r.firstChange||o&&!o.firstChange)&&this._markOptionsForCheck()}ngOnDestroy(){this._keyManager?.destroy(),this._listenerCleanups?.forEach(e=>e()),this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0}focus(e){this._element.nativeElement.focus(e)}selectAll(){return this._setAllOptionsSelected(!0)}deselectAll(){return this._setAllOptionsSelected(!1)}_reportValueChange(){if(this.options&&!this._isDestroyed){let e=this._getSelectedOptionValues();this._onChange(e),this._value=e}}_emitChangeEvent(e){this.selectionChange.emit(new zv(this,e))}writeValue(e){this._value=e,this.options&&this._setOptionsFromValues(e||[])}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this._markOptionsForCheck()}get disabled(){return this._selectionListDisabled()}set disabled(e){this._selectionListDisabled.set(_t(e)),this._selectionListDisabled()&&this._keyManager?.setActiveItem(-1)}_selectionListDisabled=Se(!1);registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}_watchForSelectionChange(){this.selectedOptions.changed.pipe(Ce(this._destroyed)).subscribe(e=>{for(let r of e.added)r.selected=!0;for(let r of e.removed)r.selected=!1;this._containsFocus()||this._resetActiveOption()})}_setOptionsFromValues(e){this.options.forEach(r=>r._setSelected(!1)),e.forEach(r=>{let i=this.options.find(o=>o.selected?!1:this.compareWith(o.value,r));i&&i._setSelected(!0)})}_getSelectedOptionValues(){return this.options.filter(e=>e.selected).map(e=>e.value)}_markOptionsForCheck(){this.options&&this.options.forEach(e=>e._markForCheck())}_setAllOptionsSelected(e,r){let i=[];return this.options.forEach(o=>{(!r||!o.disabled)&&o._setSelected(e)&&i.push(o)}),i.length&&this._reportValueChange(),i}get options(){return this._items}_handleKeydown(e){let r=this._keyManager.activeItem;if((e.keyCode===13||e.keyCode===32)&&!this._keyManager.isTyping()&&r&&!r.disabled)e.preventDefault(),r._toggleOnInteraction();else if(e.keyCode===65&&this.multiple&&!this._keyManager.isTyping()&&zo(e,"ctrlKey","metaKey")){let i=this.options.some(o=>!o.disabled&&!o.selected);e.preventDefault(),this._emitChangeEvent(this._setAllOptionsSelected(i,!0))}else this._keyManager.onKeydown(e)}_handleFocusout=()=>{setTimeout(()=>{this._containsFocus()||this._resetActiveOption()})};_handleFocusin=e=>{if(this.disabled)return;let r=this._items.toArray().findIndex(i=>i._elementRef.nativeElement.contains(e.target));r>-1?this._setActiveOption(r):this._resetActiveOption()};_setupRovingTabindex(){this._keyManager=new Na(this._items).withHomeAndEnd().withTypeAhead().withWrap().skipPredicate(()=>this.disabled),this._resetActiveOption(),this._keyManager.change.subscribe(e=>this._setActiveOption(e)),this._items.changes.pipe(Ce(this._destroyed)).subscribe(()=>{let e=this._keyManager.activeItem;(!e||this._items.toArray().indexOf(e)===-1)&&this._resetActiveOption()})}_setActiveOption(e){this._items.forEach((r,i)=>r._setTabindex(i===e?0:-1)),this._keyManager.updateActiveItem(e)}_resetActiveOption(){if(this.disabled){this._setActiveOption(-1);return}let e=this._items.find(r=>r.selected&&!r.disabled)||this._items.first;this._setActiveOption(e?this._items.toArray().indexOf(e):-1)}_containsFocus(){let e=Ug();return e&&this._element.nativeElement.contains(e)}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-selection-list"]],contentQueries:function(r,i,o){if(r&1&&on(o,Gv,5),r&2){let s;je(s=Ve())&&(i._items=s)}},hostAttrs:["role","listbox",1,"mat-mdc-selection-list","mat-mdc-list-base","mdc-list"],hostVars:1,hostBindings:function(r,i){r&1&&ge("keydown",function(s){return i._handleKeydown(s)}),r&2&&Le("aria-multiselectable",i.multiple)},inputs:{color:"color",compareWith:"compareWith",multiple:"multiple",hideSingleSelectionIndicator:"hideSingleSelectionIndicator",disabled:"disabled"},outputs:{selectionChange:"selectionChange"},exportAs:["matSelectionList"],features:[jt([LL,{provide:$v,useExisting:t},{provide:nx,useExisting:t}]),ct,gt],ngContentSelectors:fL,decls:1,vars:0,template:function(r,i){r&1&&(xe(),te(0))},styles:[hL],encapsulation:2,changeDetection:0})}return t})(),qv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[l0,gu,XI,Be,YI]})}return t})();var Kv=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275cmp=Q({type:t,selectors:[["app-navigation"]],standalone:!1,decls:16,vars:0,consts:[["list",""],["mat-raised-button","","color","primary",1,"clear-button"],["mat-raised-button","","color","accent",1,"clear-button",3,"click"]],template:function(r,i){if(r&1){let o=ir();C(0,"mat-selection-list",null,0)(2,"mat-list-option"),ye(3,"New Words"),O(),C(4,"mat-list-option"),ye(5,"Repeat Daily"),O(),C(6,"mat-list-option"),ye(7,"Repeat Weekly"),O(),C(8,"mat-list-option"),ye(9,"Repeat Monthly"),O(),C(10,"mat-list-option"),ye(11,"Learned"),O()(),C(12,"button",1),ye(13,` Start Learning
`),O(),C(14,"button",2),ge("click",function(){Yt(o);let a=Lt(1);return Xt(a.deselectAll())}),ye(15,` Clear Selection
`),O()}},dependencies:[S0,Wv,Gv],styles:[".clear-button[_ngcontent-%COMP%]{display:block;margin:10px auto}"]})}}return t})();function BL(t,n){t&1&&(C(0,"mat-icon"),ye(1,"menu"),O())}function UL(t,n){t&1&&(C(0,"mat-icon"),ye(1,"clear"),O())}var rx=(()=>{class t{constructor(){this.title="Learn New Languages",this.isDrawerOpen=!1}onToggleDrawer(){this.isDrawerOpen=!this.isDrawerOpen}static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275cmp=Q({type:t,selectors:[["app-root"]],standalone:!1,decls:11,vars:4,consts:[["color","primary",1,"toolbar"],["mat-icon-button","",1,"menu-icon",3,"click"],[4,"ngIf"],[1,"drawer-container"],["mode","side",3,"opened"],[1,"content"]],template:function(r,i){r&1&&(C(0,"mat-toolbar",0)(1,"button",1),ge("click",function(){return i.onToggleDrawer()}),bt(2,BL,2,0,"mat-icon",2)(3,UL,2,0,"mat-icon",2),O(),C(4,"h1"),ye(5),O()(),C(6,"mat-drawer-container",3)(7,"mat-drawer",4),Oe(8,"app-navigation"),O(),C(9,"mat-drawer-content",5),Oe(10,"router-outlet"),O()()),r&2&&(fe(2),Ie("ngIf",!i.isDrawerOpen),fe(),Ie("ngIf",i.isDrawerOpen),fe(2),So(i.title),fe(2),Ie("opened",i.isDrawerOpen))},dependencies:[ia,Za,Ai,zI,Lv,jv,tc,qo,Kv],styles:[".menu-icon[_ngcontent-%COMP%]{margin-right:10px}.drawer-container[_ngcontent-%COMP%]{flex-grow:1}.content[_ngcontent-%COMP%]{width:100%}"]})}}return t})();var HL=["mat-internal-form-field",""],$L=["*"],ix=(()=>{class t{labelPosition="after";static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(r,i){r&2&&re("mdc-form-field--align-end",i.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:HL,ngContentSelectors:$L,decls:1,vars:0,template:function(r,i){r&1&&(xe(),te(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2,changeDetection:0})}return t})();var zL=["input"],GL=["label"],WL=["*"],Qv={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},qL=new g("mat-checkbox-default-options",{providedIn:"root",factory:()=>Qv}),dt=(function(t){return t[t.Init=0]="Init",t[t.Checked=1]="Checked",t[t.Unchecked=2]="Unchecked",t[t.Indeterminate=3]="Indeterminate",t})(dt||{}),Zv=class{source;checked},KL=(()=>{class t{_elementRef=f(ne);_changeDetectorRef=f(Xe);_ngZone=f(P);_animationsDisabled=Ut();_options=f(qL,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let r=new Zv;return r.source=this,r.checked=e,r}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new de;indeterminateChange=new de;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=dt.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){f(hn).load(Wo);let e=f(new _i("tabindex"),{optional:!0});this._options=this._options||Qv,this.color=this._options.color||Qv.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=f(Oa).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let r=e!=this._indeterminate();this._indeterminate.set(e),r&&(e?this._transitionCheckState(dt.Indeterminate):this._transitionCheckState(this.checked?dt.Checked:dt.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=Se(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let r=this._currentCheckState,i=this._getAnimationTargetElement();if(!(r===e||!i)&&(this._currentAnimationClass&&i.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(r,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){i.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{i.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?dt.Checked:dt.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,r){if(this._animationsDisabled)return"";switch(e){case dt.Init:if(r===dt.Checked)return this._animationClasses.uncheckedToChecked;if(r==dt.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case dt.Unchecked:return r===dt.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case dt.Checked:return r===dt.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case dt.Indeterminate:return r===dt.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let r=this._inputElement;r&&(r.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=Q({type:t,selectors:[["mat-checkbox"]],viewQuery:function(r,i){if(r&1&&Pn(zL,5)(GL,5),r&2){let o;je(o=Ve())&&(i._inputElement=o.first),je(o=Ve())&&(i._labelElement=o.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(r,i){r&2&&(ld("id",i.id),Le("tabindex",null)("aria-label",null)("aria-labelledby",null),or(i.color?"mat-"+i.color:"mat-accent"),re("_mat-animation-noopable",i._animationsDisabled)("mdc-checkbox--disabled",i.disabled)("mat-mdc-checkbox-disabled",i.disabled)("mat-mdc-checkbox-checked",i.checked)("mat-mdc-checkbox-disabled-interactive",i.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",ke],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",ke],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",ke],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:na(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",ke],checked:[2,"checked","checked",ke],disabled:[2,"disabled","disabled",ke],indeterminate:[2,"indeterminate","indeterminate",ke]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[jt([{provide:Qu,useExisting:Dn(()=>t),multi:!0},{provide:KI,useExisting:t,multi:!0}]),gt],ngContentSelectors:WL,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(r,i){if(r&1&&(xe(),C(0,"div",3),ge("click",function(s){return i._preventBubblingFromLabel(s)}),C(1,"div",4,0)(3,"div",5),ge("click",function(){return i._onTouchTargetClick()}),O(),C(4,"input",6,1),ge("blur",function(){return i._onBlur()})("click",function(){return i._onInputClick()})("change",function(s){return i._onInteractionEvent(s)}),O(),Oe(6,"div",7),C(7,"div",8),uo(),C(8,"svg",9),Oe(9,"path",10),O(),fo(),Oe(10,"div",11),O(),Oe(11,"div",12),O(),C(12,"label",13,2),te(14),O()()),r&2){let o=Lt(2);Ie("labelPosition",i.labelPosition),fe(4),re("mdc-checkbox--selected",i.checked),Ie("checked",i.checked)("indeterminate",i.indeterminate)("disabled",i.disabled&&!i.disabledInteractive)("id",i.inputId)("required",i.required)("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex),Le("aria-label",i.ariaLabel||null)("aria-labelledby",i.ariaLabelledby)("aria-describedby",i.ariaDescribedby)("aria-checked",i.indeterminate?"mixed":null)("aria-controls",i.ariaControls)("aria-disabled",i.disabled&&i.disabledInteractive?!0:null)("aria-expanded",i.ariaExpanded)("aria-owns",i.ariaOwns)("name",i.name)("value",i.value),fe(7),Ie("matRippleTrigger",o)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),fe(),Ie("for",i.inputId)}},dependencies:[b0,ix],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return t})(),Yv=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=x({type:t});static \u0275inj=I({imports:[KL,Be]})}return t})();var QL=[Xg,Yv,Ov,Vv,Jg,qv,tv],Xv=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[an,QL,Xg,Yv,Ov,Vv,Jg,qv,tv]})}}return t})();var Zu=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[an,Xv,Xv]})}}return t})();var ox=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[an,Zu]})}}return t})();var ZL=[Td,Hv,Uv],sx=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t})}static{this.\u0275inj=I({imports:[ZL,Td,Hv,Uv]})}}return t})();var ax=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=x({type:t,bootstrap:[rx]})}static{this.\u0275inj=I({imports:[ua,$I,eC,KC,ox,WC.instrument({maxAge:25,logOnly:Uo.production}),sx,Zu]})}}return t})();Uo.production&&void 0;Dp().bootstrapModule(ax).catch(t=>console.error(t));
