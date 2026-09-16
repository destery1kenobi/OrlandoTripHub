/* ============================================================
   Trip Hub XR — panel primitives + artwork
   ------------------------------------------------------------
   Kept separate from index.html so the drawing code can be
   unit-rendered in a plain browser with no WebXR and no A-Frame.
   The A-Frame component registration below is guarded, so this
   file loads fine on its own in a test harness.
   ============================================================ */

/* ---- which day are we showing? ----
   Trip runs 2026-07-14 → 2026-07-22. Outside that window there is no
   "today", so fall back to a headline day instead of an empty panel —
   a demo should never open on a blank card.
   Override with ?day=2026-07-20 to pin any day.                        */
const TRIP_START = '2026-07-14', TRIP_END = '2026-07-22';
const FALLBACK_DAY = '2026-07-15';           // Epic Universe — best-looking card
function resolveDayKey(){
  const q = new URLSearchParams(location.search).get('day');
  if(q && ITINERARY[q]) return { key:q, live:false, why:'pinned via ?day=' };
  const t = todayKeyPadded();
  if(t >= TRIP_START && t <= TRIP_END && ITINERARY[t]) return { key:t, live:true, why:'live — trip in progress' };
  return { key:FALLBACK_DAY, live:false, why: t < TRIP_START ? 'preview — trip hasn\'t started' : 'preview — trip window has passed' };
}
const DAY = resolveDayKey();

/* ---- canvas drawing helpers ---- */
const C = {
  bg:'#1b0c42', bgTop:'#2a1163', edge:'rgba(255,255,255,0.30)',
  text:'#ffffff', soft:'rgba(255,255,255,0.84)', muted:'rgba(255,255,255,0.58)',
  gold:'#ffd166', teal:'#00c9a7', pink:'#ff5d8f'
};
function rr(ctx, x, y, w, h, r){
  if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x, y, w, h, r); return; }
  ctx.beginPath();
  ctx.moveTo(x+r, y);        ctx.lineTo(x+w-r, y);   ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);      ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);        ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}
/* naive word wrap; returns the y cursor after drawing */
function wrap(ctx, text, x, y, maxW, lh){
  const words = String(text).split(' ');
  let line = '';
  for(const w of words){
    const test = line ? line + ' ' + w : w;
    if(ctx.measureText(test).width > maxW && line){
      ctx.fillText(line, x, y); y += lh; line = w;
    } else line = test;
  }
  if(line){ ctx.fillText(line, x, y); y += lh; }
  return y;
}
/* Draws a pill and returns the next x. Pass maxX and the chip is SKIPPED
   (x returned unchanged) when it would not fit — callers can chain safely. */
function chip(ctx, x, y, label, color, maxX){
  ctx.font = '500 26px Fredoka, sans-serif';
  const w = ctx.measureText(label).width + 34;
  if(maxX && x + w > maxX) return x;
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  rr(ctx, x, y, w, 44, 22); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.20)'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = color || C.soft;
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + 17, y + 23);
  ctx.textBaseline = 'alphabetic';
  return x + w + 12;
}

/* ---- the draw registry: `panel` components look themselves up here ---- */
const PANEL_DRAW = {
  today(ctx, W, H){
    const it  = ITINERARY[DAY.key];
    const day = TRIP_DAYS.find(d => d.key === DAY.key);
    const w   = (typeof wxFor === 'function') ? wxFor(DAY.key) : null;
    const sw  = (typeof stormWindow === 'function') ? stormWindow(DAY.key) : null;
    const snk = snackTotals();

    ctx.clearRect(0, 0, W, H);

    // card body
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, C.bgTop); g.addColorStop(1, C.bg);
    rr(ctx, 6, 6, W-12, H-12, 34); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = C.edge; ctx.lineWidth = 3; ctx.stroke();

    const PAD = 46;
    let y = 84;

    // eyebrow
    ctx.fillStyle = C.gold;
    ctx.font = '600 24px Fredoka, sans-serif';
    ctx.fillText((DAY.live ? 'TODAY' : 'TRIP DAY') + '  ·  ' + (day ? day.dow + ' ' + day.label : DAY.key), PAD, y);
    y += 54;

    // title
    ctx.fillStyle = C.text;
    ctx.font = '800 54px "Baloo 2", sans-serif';
    y = wrap(ctx, it.icon + '  ' + it.title, PAD, y, W - PAD*2, 62) + 16;

    // weather + park chips
    let cx = PAD;
    if(w){
      cx = chip(ctx, cx, y, wxIcon(w.code) + ' ' + w.hi + '°F', C.gold);
      cx = chip(ctx, cx, y, '💧 ' + w.pp + '%', C.soft);
      if(sw) cx = chip(ctx, cx, y, '⛈️ ' + sw, C.pink);
    } else if(typeof WX === 'undefined' || !WX){
      cx = chip(ctx, cx, y, '☁️ weather…', C.muted);   // still in flight
    }
    // WX loaded but nothing for this date (Open-Meteo only forecasts ~14 days
    // out) => draw no weather chip at all rather than a stuck placeholder.
    const LIMIT = W - PAD;
    let dropped = 0;
    (it.parks || []).forEach(pid => {
      const p = PARKS.find(x => x.id === pid);
      if(!p) return;
      const next = chip(ctx, cx, y, p.icon + ' ' + p.name, C.teal, LIMIT);
      if(next === cx) dropped++; else cx = next;
    });
    if(dropped) cx = chip(ctx, cx, y, '+' + dropped, C.muted, LIMIT);
    const chipRowEnd = cx;
    y += 82;

    // events
    ctx.font = '400 30px Fredoka, sans-serif';
    (it.events || []).slice(0, 4).forEach(ev => {
      ctx.fillStyle = C.gold; ctx.fillText('•', PAD, y);
      ctx.fillStyle = C.soft;
      y = wrap(ctx, ev, PAD + 30, y, W - PAD*2 - 40, 40) + 12;
    });

    const contentBottom = y;

    // footer: snack scoreboard
    const fy = H - 74;
    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    rr(ctx, PAD, fy - 34, W - PAD*2, 54, 27); ctx.fill();
    const pct = snk.total ? snk.done / snk.total : 0;
    ctx.fillStyle = C.teal;
    rr(ctx, PAD, fy - 34, Math.max(54, (W - PAD*2) * pct), 54, 27); ctx.fill();
    ctx.fillStyle = C.text;
    ctx.font = '600 26px Fredoka, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍭  Snacks tried: ' + snk.done + ' / ' + snk.total, PAD + 22, fy - 6);
    ctx.textBaseline = 'alphabetic';

    // layout report — lets panel-preview.html and tests catch overflow without
    // pixel-sniffing an opaque background.
    return { contentBottom: contentBottom, footerTop: fy - 34,
             overflow: contentBottom > (fy - 34),
             chipRowEnd: chipRowEnd, chipOverflow: chipRowEnd > (W - PAD) };
  }
};

/* ---- the reusable panel primitive: canvas -> texture -> plane ---- */
if(typeof AFRAME !== 'undefined') AFRAME.registerComponent('panel', {
  schema: {
    w:    { type:'number', default: 0.9  },  // metres
    h:    { type:'number', default: 0.6  },  // metres
    ppm:  { type:'number', default: 1250 },  // canvas pixels per metre — drives text crispness
    draw: { type:'string', default: ''   }
  },
  init(){
    const d = this.data;
    const canvas = document.createElement('canvas');
    canvas.width  = Math.round(d.w * d.ppm);
    canvas.height = Math.round(d.h * d.ppm);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    const tex = new THREE.CanvasTexture(canvas);
    // three.js renamed colour handling across versions — support both spellings
    if('colorSpace' in tex && THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    else if('encoding' in tex && THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    const renderer = this.el.sceneEl.renderer;
    if(renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    this.texture = tex;

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(d.w, d.h),
      // unlit: UI should never pick up scene lighting
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })
    );
    this.el.setObject3D('mesh', this.mesh);
    this.redraw();
  },
  redraw(){
    const fn = PANEL_DRAW[this.data.draw];
    if(!fn) return;
    try { fn(this.ctx, this.canvas.width, this.canvas.height, this); }
    catch(e){ console.error('panel draw failed:', this.data.draw, e); }
    this.texture.needsUpdate = true;   // only on data change — never per frame
  }
});
function redrawAll(){
  if(typeof document === 'undefined') return;
  document.querySelectorAll('[panel]').forEach(el => {
    if(el.components && el.components.panel) el.components.panel.redraw();
  });
}
