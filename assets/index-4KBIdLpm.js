(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const rt="https://statsapi.mlb.com/api/v1",it="https://statsapi.mlb.com/api/v1.1";function T(e=new Date){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}async function lt(e){var s,o;const a=`${rt}/schedule?sportId=1&date=${e}&hydrate=team,linescore,decisions`,n=await fetch(a);if(!n.ok)throw new Error(`Schedule ${n.status}`);return((o=(s=(await n.json()).dates)==null?void 0:s[0])==null?void 0:o.games)||[]}async function Q(e){const a=`${it}/game/${e}/feed/live`,n=await fetch(a);if(!n.ok)throw new Error(`Feed ${n.status}`);return n.json()}function ct(e){const a=e==null?void 0:e.id;return{108:"#ba0021",109:"#a71930",110:"#df4601",111:"#bd3039",112:"#0e3386",113:"#c6011f",114:"#e31937",115:"#33006f",116:"#0c2340",117:"#eb6e1f",118:"#004687",119:"#005a9c",120:"#ab0003",121:"#002d72",133:"#003831",134:"#27251f",135:"#2f241d",136:"#005c5c",137:"#fd5a1e",138:"#c41e3a",139:"#092c5c",140:"#003278",141:"#134a8e",142:"#002b5c",143:"#e81828",144:"#ce1141",145:"#27251f",146:"#00a3e0",147:"#003087",158:"#ffc52f"}[a]||"#7ddea0"}const S=document.getElementById("app"),t={mode:"live",date:T(),games:[],gamePk:null,feed:null,error:"",loading:!1,plays:[],playIndex:0,playing:!1,pollTimer:null,playTimer:null};function U(e){var r,s,o;const a=((r=e.status)==null?void 0:r.detailedState)||((s=e.status)==null?void 0:s.abstractGameState)||"",n=(((o=e.status)==null?void 0:o.abstractGameState)||"").toLowerCase();return n==="live"||/in progress|warmup/i.test(a)?`<span class="badge live">${c(a)}</span>`:n==="final"||/final|completed/i.test(a)?`<span class="badge final">${c(a)}</span>`:`<span class="badge preview">${c(a||"Scheduled")}</span>`}function c(e){return String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function L(e,a,n){var u,m,b,p;const r=(m=(u=a.teams)==null?void 0:u[e])==null?void 0:m.team,s=(r==null?void 0:r.abbreviation)||(r==null?void 0:r.teamName)||e,o=n??((p=(b=a.teams)==null?void 0:b[e])==null?void 0:p.score),i=o??"—";return`<div class="teamline">
    <span class="abbr"><span class="swatch" style="background:${ct(r)}"></span>${c(s)}</span>
    <span class="score">${c(i)}</span>
  </div>`}function X(e){return`
  <header class="top">
    <div class="brand">
      <div class="mark" aria-hidden="true"></div>
      <div>
        <h1>Ink Diamond</h1>
        <p>Arcade e-ink scoreboard · not MLB</p>
      </div>
    </div>
    <nav class="tabs" aria-label="Mode">
      <button type="button" data-nav="live" aria-current="${t.mode==="live"||t.mode==="game"&&t.from==="live"?"page":"false"}">Live</button>
      <button type="button" data-nav="archive" aria-current="${t.mode==="archive"||t.mode==="game"&&t.from==="archive"?"page":"false"}">Archive</button>
    </nav>
  </header>
  ${e}
  <footer class="footer">Ink Diamond is an unofficial fan project. Not affiliated with Major League Baseball or any club. Scores via the public MLB Stats API.</footer>`}function dt(){const e=t.mode==="archive"?"Archive":"Today’s board",a=t.games,n=a.length?a.map(s=>{var m;const o=s.gamePk,i=((m=s.venue)==null?void 0:m.name)||"",u=s.gameDate?new Date(s.gameDate).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}):"";return`<button type="button" class="game panel" data-open="${o}">
          <div class="row" style="justify-content:space-between">${U(s)}<span class="muted">${c(u)}</span></div>
          <div class="teams">${L("away",s)}${L("home",s)}</div>
          <div class="muted">${c(i)}</div>
        </button>`}).join(""):`<div class="panel muted">No games for ${c(t.date)}.</div>`,r=t.mode==="archive"?`<div class="row" style="margin-bottom:12px">
        <label class="muted" for="arch-date">Date</label>
        <input id="arch-date" type="date" value="${c(t.date)}" />
        <button type="button" class="primary" data-action="load-date">Load</button>
      </div>`:`<div class="row" style="margin-bottom:12px">
        <span class="muted">MLB date ${c(t.date)} (ET)</span>
        <button type="button" data-action="refresh">Refresh</button>
      </div>`;S.innerHTML=X(`
    <section>
      <h2 style="margin:0 0 8px;font-size:1.1rem">${e}</h2>
      ${r}
      ${t.loading?'<div class="panel muted">Loading…</div>':""}
      ${t.error?`<div class="panel err">${c(t.error)}</div>`:""}
      ${n}
    </section>`)}function ut(e){const a={b1:!!(e!=null&&e.first),b2:!!(e!=null&&e.second),b3:!!(e!=null&&e.third)};return`<div class="diamond" aria-label="Bases">
    <div class="base b2 ${a.b2?"on":""}"></div>
    <div class="base b1 ${a.b1?"on":""}"></div>
    <div class="base b3 ${a.b3?"on":""}"></div>
    <div class="base home"></div>
  </div>`}function mt(e){var o;const a=(o=e==null?void 0:e.liveData)==null?void 0:o.linescore;if(!a)return"";const n=a.innings||[],r=n.map(i=>i.num).join("")?n.map(i=>`<th>${i.num}</th>`).join(""):Array.from({length:9},(i,u)=>`<th>${u+1}</th>`).join(""),s=i=>{var p,h,x,P;const u=(n.length?n:Array.from({length:9},()=>({}))).map(y=>{var g;const f=(g=y==null?void 0:y[i])==null?void 0:g.runs;return`<td>${f??""}</td>`}).join(""),m=((p=a.teams)==null?void 0:p[i])||{},b=((P=(x=(h=e==null?void 0:e.gameData)==null?void 0:h.teams)==null?void 0:x[i])==null?void 0:P.abbreviation)||i;return`<tr><td>${c(b)}</td>${u}<td><strong>${m.runs??""}</strong></td><td>${m.hits??""}</td><td>${m.errors??""}</td></tr>`};return`<table class="linescore"><thead><tr><th></th>${r}<th>R</th><th>H</th><th>E</th></tr></thead>
    <tbody>${s("away")}${s("home")}</tbody></table>`}function vt(e){var n;const a={first:!1,second:!1,third:!1};for(const r of(e==null?void 0:e.runners)||[]){const s=(n=r==null?void 0:r.movement)==null?void 0:n.end;s==="1B"&&(a.first=!0),s==="2B"&&(a.second=!0),s==="3B"&&(a.third=!0)}return a}function pt(){var D,B,M,N,j,k,A,E,G,O,F,H,C,R,q,_,z,K,V;const e=t.feed,a=e==null?void 0:e.gameData,n=(D=e==null?void 0:e.liveData)==null?void 0:D.linescore,r=((B=a==null?void 0:a.status)==null?void 0:B.detailedState)||"",s=t.from==="archive",o=((N=(M=e==null?void 0:e.liveData)==null?void 0:M.plays)==null?void 0:N.allPlays)||[];let i=(k=(j=n==null?void 0:n.teams)==null?void 0:j.away)==null?void 0:k.runs,u=(E=(A=n==null?void 0:n.teams)==null?void 0:A.home)==null?void 0:E.runs,m=(n==null?void 0:n.outs)??0,b=(n==null?void 0:n.offense)||{},p=r,h=o.length-1;if(s&&o.length){const d=t.playIndex,l=o[d];i=((G=l==null?void 0:l.result)==null?void 0:G.awayScore)??i,u=((O=l==null?void 0:l.result)==null?void 0:O.homeScore)??u,m=((F=l==null?void 0:l.count)==null?void 0:F.outs)??m,b=vt(l),p=`${((H=l==null?void 0:l.about)==null?void 0:H.halfInning)==="top"?"Top":"Bot"} ${((C=l==null?void 0:l.about)==null?void 0:C.inning)||""} · ${((R=l==null?void 0:l.result)==null?void 0:R.event)||"Play"}`,h=d}const x=(q=a==null?void 0:a.teams)==null?void 0:q.away,P=(_=a==null?void 0:a.teams)==null?void 0:_.home,y={teams:{away:{team:x,score:i},home:{team:P,score:u}},status:{detailedState:r,abstractGameState:(z=a==null?void 0:a.status)==null?void 0:z.abstractGameState}},f=(K=n==null?void 0:n.offense)==null?void 0:K.batter,g=(V=n==null?void 0:n.defense)==null?void 0:V.pitcher,tt=!s&&(f||g)?`<div class="muted">Batter ${c((f==null?void 0:f.fullName)||"—")} · Pitcher ${c((g==null?void 0:g.fullName)||"—")}</div>`:"",et=s?`
    <div class="controls">
      <button type="button" data-action="prev">Prev</button>
      <button type="button" class="primary" data-action="toggle-play">${t.playing?"Pause":"Watch"}</button>
      <button type="button" data-action="next">Next</button>
    </div>
    <div class="row">
      <input type="range" min="0" max="${Math.max(o.length-1,0)}" value="${t.playIndex}" data-action="scrub" />
      <span class="muted">${t.playIndex+1}/${o.length||0}</span>
    </div>`:"",at=o.slice(Math.max(0,h-8),h+1).map((d,l,nt)=>{var W,Y,Z,J;const st=h-(nt.length-1-l)===h,ot=`${((W=d==null?void 0:d.about)==null?void 0:W.halfInning)==="top"?"T":"B"}${((Y=d==null?void 0:d.about)==null?void 0:Y.inning)||""} · ${((Z=d==null?void 0:d.result)==null?void 0:Z.event)||""}`;return`<li class="${st?"current":""}"><strong>${c(ot)}</strong><div>${c(((J=d==null?void 0:d.result)==null?void 0:J.description)||"")}</div></li>`}).join("");S.innerHTML=X(`
    <button type="button" data-action="back">← Back</button>
    <section class="panel" style="margin-top:10px">
      <div class="row" style="justify-content:space-between;margin-bottom:8px">
        ${U(y)}
        <span class="muted">${c(p)}</span>
      </div>
      <div class="teams">${L("away",y,i)}${L("home",y,u)}</div>
      <div class="muted">Outs: ${m}</div>
      ${ut(b)}
      ${tt}
      ${mt(e)}
      ${et}
    </section>
    <section class="panel">
      <h3 style="margin:0 0 8px">Play-by-play</h3>
      <ul class="pbp">${at||'<li class="muted">No plays yet.</li>'}</ul>
    </section>
    ${t.error?`<div class="panel err">${c(t.error)}</div>`:""}
  `)}function v(){t.mode==="game"?pt():dt()}async function $(){t.loading=!0,t.error="",v();try{t.games=await lt(t.date)}catch(e){t.error=e.message||String(e),t.games=[]}finally{t.loading=!1,v()}}async function ht(e,a){var n,r,s;w(),I(),t.gamePk=e,t.from=a,t.mode="game",t.loading=!0,t.error="",t.feed=null,v();try{t.feed=await Q(e);const o=((s=(r=(n=t.feed)==null?void 0:n.liveData)==null?void 0:r.plays)==null?void 0:s.allPlays)||[];t.playIndex=a==="archive"?0:Math.max(0,o.length-1),a==="live"&&ft()}catch(o){t.error=o.message||String(o)}finally{t.loading=!1,v()}}function I(){t.pollTimer&&(clearInterval(t.pollTimer),t.pollTimer=null)}function ft(){I(),t.pollTimer=setInterval(async()=>{if(!(document.hidden||t.mode!=="game"||t.from!=="live"))try{t.feed=await Q(t.gamePk),t.error="",v()}catch(e){t.error=e.message||String(e),v()}},2e4)}function w(){t.playing=!1,t.playTimer&&(clearInterval(t.playTimer),t.playTimer=null)}function bt(){if(t.playing){w(),v();return}t.playing=!0,v(),t.playTimer=setInterval(()=>{var a,n,r;const e=((r=(n=(a=t.feed)==null?void 0:a.liveData)==null?void 0:n.plays)==null?void 0:r.allPlays)||[];if(t.playIndex>=e.length-1){w(),v();return}t.playIndex+=1,v()},1600)}S.addEventListener("click",e=>{var n,r,s,o;const a=e.target.closest("[data-nav],[data-open],[data-action]");if(a)if(a.dataset.nav==="live")w(),I(),t.mode="live",t.date=T(),$();else if(a.dataset.nav==="archive")w(),I(),t.mode="archive",$();else if(a.dataset.open)ht(Number(a.dataset.open),t.mode==="archive"?"archive":"live");else if(a.dataset.action==="load-date"){const i=(n=document.getElementById("arch-date"))==null?void 0:n.value;i&&(t.date=i,$())}else if(a.dataset.action==="refresh")t.date=T(),$();else if(a.dataset.action==="back")w(),I(),t.mode=t.from==="archive"?"archive":"live",$();else if(a.dataset.action==="prev")t.playIndex=Math.max(0,t.playIndex-1),v();else if(a.dataset.action==="next"){const i=(((o=(s=(r=t.feed)==null?void 0:r.liveData)==null?void 0:s.plays)==null?void 0:o.allPlays)||[]).length-1;t.playIndex=Math.min(i,t.playIndex+1),v()}else a.dataset.action==="toggle-play"&&bt()});S.addEventListener("input",e=>{e.target.dataset.action==="scrub"&&(t.playIndex=Number(e.target.value)||0,v())});document.addEventListener("visibilitychange",()=>{});$();
