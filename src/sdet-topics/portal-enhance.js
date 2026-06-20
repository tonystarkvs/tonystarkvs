/**
 * portal-enhance.js — Vikrant Portal v6.1
 * ════════════════════════════════════════
 * Auto-applies the premium card-based layout + correct SVG flow diagrams
 * to ALL 76 topic pages across all folders.
 *
 * KEY FIX v6.1:
 * - Dynamic font loading (Outfit & JetBrains Mono)
 * - Automatic stacked code block grouping and tabification
 * - Standardization of existing custom code tab widgets (Playwright / REST Assured)
 * - Keyword highlighting in explanations and glossary definitions
 * - Element-level enhancement tracking to prevent double enhancement in dynamic/JS-rendered content
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════
     PART 1 — GLOBAL STYLES (injected once into <head>)
  ═══════════════════════════════════════════════════════════════════ */
  function injectGlobalStyles() {
    if (document.getElementById('vr-enhance-styles')) return;

    // Load Outfit and JetBrains Mono fonts if missing
    if (!document.querySelector('link[href*="Outfit"]') && !document.querySelector('link[href*="Outfit:wght"]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
      document.head.appendChild(l);
    }

    var s = document.createElement('style');
    s.id = 'vr-enhance-styles';
    s.textContent = `
/* Global Font & High Contrast settings */
:root {
  --font-sans: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  --font-mono: 'JetBrains Mono', "Courier New", Courier, monospace !important;
}
body {
  font-family: var(--font-sans) !important;
  color: #1e293b !important;
  background: #f1f5f9 !important;
}
h1, h2, h3, h4, h5, h6, .vr-tsec, .sec h3, .section-label, .ses-hdr h2, .obanner h2, .s-title {
  font-family: var(--font-sans) !important;
  font-weight: 800 !important;
  color: #000000 !important;
}

/* Panel backgrounds with premium soft gradient */
.pan.active, .session-panel.active, .content-panel.active, .sc-pan.active {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%) !important;
}

/* Section dividers - glassmorphic */
.vr-tsec {
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  color: #6C5CE7; margin: 30px 0 15px; display: flex; align-items: center; gap: 12px;
}
.vr-tsec::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #6C5CE7 0%, transparent 100%); opacity: 0.2; }

/* Color-coded left-border cards with micro-animations */
.vr-card {
  background: #ffffff; border: 1px solid rgba(108, 92, 231, 0.1); border-left: 5px solid #6C5CE7;
  border-radius: 8px 12px 12px 8px; padding: 18px 22px; margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03); line-height: 1.7;
  font-size: 13px; color: #334155; transition: all 0.3s ease;
}
.vr-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(108, 92, 231, 0.08); }
.vr-card.green  { border-left-color: #10b981; background: #f2fdf7; }
.vr-card.orange { border-left-color: #f59e0b; background: #fffbeb; }
.vr-card.blue   { border-left-color: #3b82f6; background: #eff6ff; }
.vr-card.teal   { border-left-color: #14b8a6; background: #f0fdfa; }
.vr-card.red    { border-left-color: #ef4444; background: #fef2f2; }

/* 2-column grid */
.vr-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
@media(max-width:640px){ .vr-g2 { grid-template-columns: 1fr; } }
.vr-gcard {
  background: #ffffff; border: 1px solid rgba(0,0,0,0.05); border-radius: 12px;
  padding: 18px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: all 0.3s ease;
}
.vr-gcard:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.06); border-color: rgba(108, 92, 231, 0.2); }
.vr-gcard h4 { font-size: 14px; font-weight: 700; color: #1e293b; margin: 0 0 8px; }
.vr-gcard p  { font-size: 13px; color: #64748b; line-height: 1.6; margin: 0; }

/* Glossary */
.vr-gl-item {
  display: flex; gap: 16px; padding: 14px 16px; margin-bottom: 8px;
  background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; align-items: flex-start;
  transition: all 0.2s ease;
}
.vr-gl-item:hover { background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.04); border-color: #c7d2fe; }
.vr-gl-key { flex-shrink: 0; width: 160px; font-weight: 700; font-size: 13px; color: #4f46e5; font-family: var(--font-mono), monospace; }
.vr-gl-def { font-size: 13px; color: #334155; line-height: 1.65; }

/* Best practices */
.vr-bp-item {
  display: flex; gap: 14px; align-items: flex-start;
  background: linear-gradient(90deg, #ecfdf5 0%, #f0fdf4 100%); border: 1px solid #a7f3d0;
  border-left: 5px solid #10b981; border-radius: 6px 12px 12px 6px;
  padding: 14px 18px; margin-bottom: 12px; font-size: 13px; color: #065f46; line-height: 1.65;
  transition: all 0.2s ease;
}
.vr-bp-item:hover { transform: translateX(3px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1); }
.vr-bp-icon {
  flex-shrink: 0; width: 22px; height: 22px; background: #10b981; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
}

/* Q&A accordion */
.vr-qa-wrap {
  background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
  margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); overflow: hidden;
  transition: all 0.3s ease;
}
.vr-qa-wrap:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.05); border-color: #cbd5e1; }
.vr-qa-q {
  background: #f8fafc; padding: 14px 18px; font-size: 13.5px; font-weight: 600;
  color: #1e293b; cursor: pointer; border-bottom: 1px solid transparent;
  display: flex; justify-content: space-between; align-items: center;
  transition: all 0.2s ease;
}
.vr-qa-q:hover { background: #e0e7ff; color: #4338ca; }
.vr-qa-a { padding: 16px 18px; font-size: 13px; color: #334155; line-height: 1.7; border-top: 1px solid #e2e8f0; background: #ffffff; }

/* One-liners */
.vr-ol-item {
  background: #ffffff; border: 1px solid rgba(108, 92, 231, 0.1); border-left: 4px solid #6C5CE7;
  border-radius: 6px 10px 10px 6px; padding: 14px 18px; margin-bottom: 12px;
  font-size: 13px; color: #334155; line-height: 1.65; box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transition: all 0.2s ease;
}
.vr-ol-item:hover { transform: translateX(3px); box-shadow: 0 4px 12px rgba(108, 92, 231, 0.08); border-color: rgba(108, 92, 231, 0.3); }
.vr-ol-label { font-size: 11px; font-weight: 700; color: #6C5CE7; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 6px; }

/* Concept blocks */
.vr-cb {
  background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
  margin-bottom: 18px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
}
.vr-cb:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.06); border-color: #cbd5e1; }
.vr-cb-head { background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%); padding: 12px 18px; font-size: 13.5px; font-weight: 700; color: #1e293b; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 8px; }
.vr-cb-head::before { content: '✦'; color: #6C5CE7; font-size: 14px; }
.vr-cb-body { padding: 16px 18px; font-size: 13px; color: #334155; line-height: 1.7; }

/* Tables */
.vr-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 18px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; font-size: 13px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.vr-table th { background: #f8fafc; color: #475569; font-weight: 700; font-size: 11.5px; padding: 12px 16px; text-align: left; text-transform: uppercase; letter-spacing: .8px; border-bottom: 2px solid #e2e8f0; }
.vr-table td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; line-height: 1.6; }
.vr-table tr:last-child td { border-bottom: none; }
.vr-table tr:nth-child(even) td { background: #f8fafc; }
.vr-table tr:hover td { background: #f1f5f9; }

/* Tabs / Pills */
.stab, .pill, .tab-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; font-weight: 600 !important; }
.stab:hover, .pill:hover, .tab-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(108, 92, 231, 0.15); }

/* Overriding specific nested inline styles */
.vr-card h3, .vr-card h4, .vr-card .sh {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  margin: 0 0 12px 0 !important;
  color: #6C5CE7 !important;
  padding: 0 !important;
  font-size: 15px !important;
  font-weight: 700 !important;
}
.vr-card .liner {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 8px !important;
}

/* SVG Diagram container */
.vr-diagram { display: none !important; }

/* Code Panel/Tabs Premium Styles */
.cs {
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  margin: 16px 0 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04) !important;
  font-family: var(--font-sans), sans-serif !important;
}
.csh {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 10px 16px !important;
  background: #f8fafc !important;
  border-bottom: 1.5px solid #cbd5e1 !important;
  flex-wrap: nowrap !important;
}
.csh span {
  font-size: 11px !important;
  font-weight: 800 !important;
  color: #475569 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  font-family: var(--font-sans), sans-serif !important;
  margin-top: 0px !important;
}
.dr2 {
  display: flex !important;
  gap: 6px !important;
  flex-shrink: 0 !important;
  margin-top: 0px !important;
}
.md {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  display: inline-block !important;
}
.mr { background: #ff5f57 !important; }
.my { background: #febc2e !important; }
.mg { background: #28c840 !important; }

.ctbar {
  display: flex !important;
  background: #f1f5f9 !important;
  border-bottom: 1.5px solid #cbd5e1 !important;
  overflow-x: auto !important;
  padding: 0 12px !important;
  gap: 4px !important;
}
.ctbar::-webkit-scrollbar {
  height: 4px !important;
}
.ctbar::-webkit-scrollbar-thumb {
  background: #cbd5e1 !important;
  border-radius: 2px !important;
}

/* Tabs */
.ct, .ctb {
  padding: 6px 14px !important;
  font-size: 11px !important;
  cursor: pointer !important;
  border: 1.5px solid #cbd5e1 !important;
  border-bottom: none !important;
  background: #f8fafc !important;
  color: #475569 !important;
  white-space: nowrap !important;
  font-family: var(--font-sans), sans-serif !important;
  border-radius: 6px 6px 0 0 !important;
  margin-bottom: -1.5px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  transition: all 0.1s ease !important;
  font-weight: 700 !important;
}
.ct.active, .ctb.active {
  color: #000000 !important;
  border: 1.5px solid #1e293b !important;
  border-bottom: 3.5px solid #d97706 !important;
  background: #ffffff !important;
  font-weight: 800 !important;
  z-index: 1 !important;
}
.ct:hover:not(.active), .ctb:hover:not(.active) {
  background: #eaecef !important;
  color: #1e293b !important;
  border-color: #cbd5e1 !important;
}

/* Language pills */
.lang-pill, .fxt {
  font-size: 9px !important;
  font-weight: 800 !important;
  text-transform: lowercase !important;
  padding: 1px 4px !important;
  border-radius: 4px !important;
  border: 1px solid !important;
  display: inline-block !important;
  font-family: var(--font-sans), sans-serif !important;
}
.lang-java, .file-dot-java { color: #d97706 !important; background: #fffbeb !important; border-color: #fde68a !important; }
.lang-py, .file-dot-py { color: #065f46 !important; background: #d1fae5 !important; border-color: #a7f3d0 !important; }
.lang-ts, .file-dot-ts, .fxt-ts { color: #0369a1 !important; background: #e0f2fe !important; border-color: #bae6fd !important; }
.lang-xml, .file-dot-xml { color: #b45309 !important; background: #fef3c7 !important; border-color: #fde68a !important; }
.lang-json, .file-dot-json, .fxt-json { color: #0f766e !important; background: #f0fdfa !important; border-color: #ccfbf1 !important; }
.lang-sh, .file-dot-sh, .fxt-sh { color: #4338ca !important; background: #e0e7ff !important; border-color: #c7d2fe !important; }
.lang-js, .file-dot-js { color: #b45309 !important; background: #fef3c7 !important; border-color: #fde68a !important; }
.lang-html, .file-dot-html { color: #0c447c !important; background: #e6f1fb !important; border-color: #85b7eb !important; }
.lang-sql, .file-dot-sql { color: #0d9488 !important; background: #ccfbf1 !important; border-color: #99f6e4 !important; }

/* Panels */
.cp, .cpan {
  display: none !important;
  padding: 0 !important;
  background: #ffffff !important;
  overflow: hidden !important;
}
.cp.active, .cpan.active {
  display: block !important;
}

/* Sub-headers */
.cp-sub-header, .ch {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 8px 14px !important;
  background: #ffffff !important;
  border-bottom: 1px dashed #e2e8f0 !important;
  flex-wrap: nowrap !important;
}
.cp-sub-header::before, .ch::before {
  display: none !important; /* Hide dot pseudo elements to use custom file-dot */
}
.file-dot {
  font-size: 14px !important;
  line-height: 1 !important;
  margin-right: 6px !important;
}
.file-name, .cfn {
  font-family: var(--font-mono), monospace !important;
  font-size: 11px !important;
  color: #475569 !important;
  font-weight: 600 !important;
}
.cpbtn {
  font-size: 10px !important;
  padding: 2px 8px !important;
  border: 0.5px solid #cbd5e1 !important;
  border-radius: 4px !important;
  background: none !important;
  cursor: pointer !important;
  color: #475569 !important;
  font-family: var(--font-sans), sans-serif !important;
  transition: all .15s !important;
  margin-left: auto !important;
  font-weight: 600 !important;
}
.cpbtn:hover {
  color: #000000 !important;
  background: #f1f5f9 !important;
}

pre {
  margin: 0 !important;
  padding: 14px 18px !important;
  overflow-x: auto !important;
  font-size: 12px !important;
  line-height: 2 !important;
  font-family: var(--font-mono), monospace !important;
  background: #ffffff !important;
  color: #1e293b !important;
}

/* Keyword highlighting class */
.hl-kw {
  font-family: var(--font-mono), monospace !important;
  font-weight: 700 !important;
  color: #c2185b !important;
  background: #fce4ec !important;
  padding: 1px 4px !important;
  border-radius: 3px !important;
  border: 0.5px solid #f8bbd0 !important;
  display: inline-block !important;
  font-size: 0.9em !important;
}

/* Prism overrides for GitHub Light syntax */
.token.comment, .token.prolog, .token.doctype, .token.cdata {
  color: #6a737d !important;
  font-style: italic !important;
}
.token.keyword {
  color: #d73a49 !important;
  font-weight: bold !important;
}
.token.string {
  color: #032f62 !important;
}
.token.class-name, .token.class {
  color: #e36209 !important;
  font-weight: bold !important;
}
.token.function {
  color: #6f42c1 !important;
}
.token.number {
  color: #005cc5 !important;
}
.token.operator {
  color: #d73a49 !important;
}
.token.property {
  color: #005cc5 !important;
}
.token.tag {
  color: #22863a !important;
}
.token.attr-name {
  color: #6f42c1 !important;
}
.token.attr-value {
  color: #032f62 !important;
}

/* General Layout helpers */
.vr-header-light {
  background: linear-gradient(135deg, #6C5CE7 0%, #4f46e5 100%) !important;
  border-radius: 12px !important; margin-bottom: 24px !important; color: #ffffff !important;
  padding: 24px 30px !important; box-shadow: 0 10px 30px rgba(108, 92, 231, 0.2) !important;
  position: relative !important; overflow: hidden !important;
}
.vr-header-light::before {
  content: '' !important; position: absolute !important; top: -50px !important; right: -50px !important;
  width: 150px !important; height: 150px !important; border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.1) !important; pointer-events: none !important;
}
.vr-header-light h1 { -webkit-text-fill-color: #ffffff !important; color: #ffffff !important; background: none !important; font-size: 28px !important; font-weight: 800 !important; letter-spacing: -0.5px !important; margin-bottom: 8px !important; }
.vr-header-light p { color: rgba(255,255,255,0.85) !important; font-size: 14px !important; line-height: 1.6 !important; }
`;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════════════
     PART 2 — SVG DIAGRAM LIBRARY
  ═══════════════════════════════════════════════════════════════════ */
  var SVG = {
    /* Horizontal arrow flow */
    flow: function(steps) {
      var W=660, n=steps.length, BW=Math.min(104, Math.floor((W-40)/n-14)), gap=(W-40)/n;
      var C=['#6C5CE7','#0284c7','#16a34a','#ea580c','#d97706','#0d9488','#db2777','#dc2626'];
      var o='<svg viewBox="0 0 '+W+' 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:'+W+'px;display:block;">';
      steps.forEach(function(s,i){
        var x=20+i*gap+(gap-BW)/2,c=C[i%C.length],cy=45;
        o+='<rect x="'+x+'" y="'+(cy-20)+'" width="'+BW+'" height="40" rx="8" fill="'+c+'18" stroke="'+c+'" stroke-width="1.5"/>';
        o+='<text x="'+(x+BW/2)+'" y="'+(cy-3)+'" text-anchor="middle" font-size="10" font-weight="700" fill="'+c+'" font-family="system-ui,sans-serif">'+(s.top||'')+'</text>';
        o+='<text x="'+(x+BW/2)+'" y="'+(cy+12)+'" text-anchor="middle" font-size="9" fill="#64748b" font-family="system-ui,sans-serif">'+(s.sub||'')+'</text>';
        if(i<n-1){var ax=x+BW+2;o+='<polygon points="'+ax+','+(cy-4)+' '+(ax+9)+','+cy+' '+ax+','+(cy+4)+'" fill="#94a3b8"/>';}
      });
      return o+'</svg>';
    },
    /* Vertical layer stack */
    layers: function(items) {
      var W=560,LH=38,GAP=6,PAD=18,H=items.length*(LH+GAP)+PAD*2;
      var C=['#6C5CE7','#0284c7','#0d9488','#16a34a','#d97706','#ea580c'];
      var o='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:'+W+'px;display:block;">';
      items.forEach(function(l,i){
        var y=PAD+i*(LH+GAP),c=C[i%C.length],ind=i*8;
        o+='<rect x="'+ind+'" y="'+y+'" width="'+(W-ind*2)+'" height="'+LH+'" rx="6" fill="'+c+'18" stroke="'+c+'" stroke-width="1.5"/>';
        o+='<text x="'+(W/2)+'" y="'+(y+14)+'" text-anchor="middle" font-size="11" font-weight="700" fill="'+c+'" font-family="system-ui,sans-serif">'+(l.top||'')+'</text>';
        o+='<text x="'+(W/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="#64748b" font-family="system-ui,sans-serif">'+(l.sub||'')+'</text>';
      });
      return o+'</svg>';
    },
    /* Horizontal timeline with state markers */
    timeline: function(steps) {
      var W=660,H=170,PAD=55,n=steps.length,gap=(W-PAD*2)/Math.max(n-1,1);
      var COLORS={green:'#16a34a',purple:'#6C5CE7',orange:'#ea580c',blue:'#0284c7',teal:'#0d9488',red:'#dc2626',amber:'#d97706',gray:'#64748b'};
      var o='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:'+W+'px;display:block;">';
      o+='<line x1="'+PAD+'" y1="65" x2="'+(W-PAD)+'" y2="65" stroke="#e2e8f0" stroke-width="2"/>';
      o+='<polygon points="'+(W-PAD)+',61 '+(W-PAD+8)+',65 '+(W-PAD)+',69" fill="#94a3b8"/>';
      o+='<text x="'+(W-PAD+10)+'" y="69" font-size="9" fill="#94a3b8" font-family="system-ui">Time</text>';
      steps.forEach(function(s,i){
        var x=PAD+i*gap,c=COLORS[s.color]||'#6C5CE7';
        var aboveY=i%2===0?8:30,belowY=i%2===0?85:108;
        o+='<circle cx="'+x+'" cy="65" r="7" fill="'+c+'"/><circle cx="'+x+'" cy="65" r="4" fill="#fff"/>';
        var bx=Math.max(2,Math.min(W-114,x-57));
        o+='<rect x="'+bx+'" y="'+aboveY+'" width="114" height="22" rx="5" fill="'+c+'18" stroke="'+c+'" stroke-width="1"/>';
        o+='<text x="'+(bx+57)+'" y="'+(aboveY+14)+'" text-anchor="middle" font-size="9.5" font-weight="700" fill="'+c+'" font-family="system-ui">'+(s.label||'')+'</text>';
        o+='<rect x="'+(x-50)+'" y="'+belowY+'" width="100" height="42" rx="6" fill="'+c+'12" stroke="'+c+'50" stroke-width="1"/>';
        o+='<text x="'+x+'" y="'+(belowY+14)+'" text-anchor="middle" font-size="10" font-weight="700" fill="'+c+'" font-family="system-ui">'+(s.key||'')+'</text>';
        o+='<text x="'+x+'" y="'+(belowY+28)+'" text-anchor="middle" font-size="8.5" fill="#64748b" font-family="system-ui">'+(s.text||'')+'</text>';
      });
      return o+'</svg>';
    },
    /* Decision tree */
    tree: function(root, branches) {
      var W=620,H=165,bw=Math.min(130,Math.floor((W-40)/branches.length-10)),bgap=(W-40)/branches.length;
      var C=['#16a34a','#0284c7','#ea580c','#d97706','#0d9488','#dc2626'];
      var o='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:'+W+'px;display:block;">';
      o+='<rect x="210" y="6" width="200" height="34" rx="8" fill="#6C5CE718" stroke="#6C5CE7" stroke-width="1.5"/>';
      o+='<text x="310" y="27" text-anchor="middle" font-size="11" font-weight="700" fill="#6C5CE7" font-family="system-ui">'+root+'</text>';
      branches.forEach(function(b,i){
        var bx=20+i*bgap+(bgap-bw)/2,c=C[i%C.length];
        o+='<line x1="310" y1="40" x2="'+(bx+bw/2)+'" y2="92" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,3"/>';
        o+='<rect x="'+bx+'" y="92" width="'+bw+'" height="60" rx="8" fill="'+c+'18" stroke="'+c+'" stroke-width="1.5"/>';
        o+='<text x="'+(bx+bw/2)+'" y="112" text-anchor="middle" font-size="10" font-weight="700" fill="'+c+'" font-family="system-ui">'+(b.label||'')+'</text>';
        o+='<text x="'+(bx+bw/2)+'" y="127" text-anchor="middle" font-size="9" fill="#64748b" font-family="system-ui">'+(b.sub||'')+'</text>';
        o+='<text x="'+(bx+bw/2)+'" y="142" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="system-ui">'+(b.note||'')+'</text>';
      });
      return o+'</svg>';
    },

    /* ── PREBUILT DIAGRAMS BY TOPIC CATEGORY ── */

    /* PLAYWRIGHT / WAITING */
    waitStates:   function(){ return SVG.timeline([{label:'auto-wait starts',key:'click()',text:'retries 5 conditions',color:'blue'},{label:'domcontentloaded',key:'DOM ready',text:'HTML parsed, no images',color:'green'},{label:'load',key:'load',text:'all resources done',color:'purple'},{label:'networkidle',key:'networkidle',text:'<2 requests / 500ms',color:'orange'}]); },
    assertRetry:  function(){ return SVG.flow([{top:'Action',sub:'click / fill / hover'},{top:'Auto-wait',sub:'retries ~100ms'},{top:'expect()',sub:'polls until true'},{top:'PASS ✓',sub:'or timeout → FAIL'}]); },
    apiMocking:   function(){ return SVG.flow([{top:'page.route()',sub:'intercept URL'},{top:'Matcher',sub:'glob / regex'},{top:'Handler',sub:'fulfill / abort'},{top:'Response',sub:'Mocked data'},{top:'DOM',sub:'Rendered'},{top:'Assert',sub:'expect()'}]); },
    hookLifecycle: function(){ return SVG.flow([{top:'beforeAll',sub:'once per suite'},{top:'beforeEach',sub:'before test'},{top:'test()',sub:'act + assert'},{top:'afterEach',sub:'screenshot/log'},{top:'afterAll',sub:'teardown'}]); },
    pomArch:      function(){ return SVG.layers([{top:'Test Spec (spec.ts)',sub:'test("login", async({ page }) => {...})'},{top:'Page Object (e.g. LoginPage)',sub:'clickLogin() · fillCredentials()'},{top:'Locators',sub:'page.getByRole() · page.locator()'},{top:'Playwright Browser API',sub:'page · context · browser'}]); },
    playwrightConfig: function(){ return SVG.layers([{top:'playwright.config.ts',sub:'projects · reporter · baseURL · timeout'},{top:'Test Project (chromium / firefox / webkit)',sub:'browser selection + viewport + locale'},{top:'Fixtures (test.extend)',sub:'custom setup / teardown injected per test'},{top:'CLI Override',sub:'--project · --grep · --workers'}]); },
    cookiesAuth:  function(){ return SVG.timeline([{label:'Login once',key:'storageState',text:'save session to file',color:'blue'},{label:'Load state',key:'storageState()',text:'inject cookies per test',color:'green'},{label:'API verify',key:'page.request',text:'authenticated endpoint',color:'purple'},{label:'Assert UI',key:'expect()',text:'user is logged in',color:'orange'}]); },
    skipEnvCLI:   function(){ return SVG.flow([{top:'test.skip()',sub:'skip always'},{top:'test.fixme()',sub:'known bug'},{top:'test.only()',sub:'run only this'},{top:'.env file',sub:'BASE_URL / creds'},{top:'--grep',sub:'filter by title'},{top:'--project',sub:'browser select'}]); },
    dataDriven:   function(){ return SVG.flow([{top:'CSV / JSON',sub:'test data source'},{top:'test.each()',sub:'parameterize'},{top:'test()',sub:'one run per row'},{top:'Fixtures',sub:'inject data'},{top:'Reporter',sub:'Allure / HTML'}]); },
    framesFlow:   function(){ return SVG.flow([{top:'frameLocator()',sub:'by selector'},{top:'frame()',sub:'by name/url'},{top:'Locate inside',sub:'frame.locator()'},{top:'Assert',sub:'expect() retries'},{top:'Back to page',sub:'page.locator()'}]); },
    alertsFlow:   function(){ return SVG.flow([{top:'dialog event',sub:'page.on("dialog")'},{top:'Alert type',sub:'alert/confirm/prompt'},{top:'Handle',sub:'.accept() / .dismiss()'},{top:'get message',sub:'.message()'},{top:'Assert',sub:'expect()'}]); },
    pagesWindows: function(){ return SVG.flow([{top:'new tab',sub:'context.newPage()'},{top:'popup',sub:'page.waitForEvent'},{top:'switch',sub:'allPages()[n]'},{top:'close',sub:'page.close()'},{top:'assert',sub:'expect(page)'}]); },

    /* SELENIUM */
    seleniumArch:   function(){ return SVG.layers([{top:'Test Class (JUnit / TestNG @Test)',sub:'test method body'},{top:'Page Object (POM)',sub:'WebElement · PageFactory · @FindBy'},{top:'WebDriver Actions',sub:'driver.findElement().click()'},{top:'Browser Driver',sub:'ChromeDriver · GeckoDriver · EdgeDriver'},{top:'Browser',sub:'Chrome · Firefox · Edge'}]); },
    seleniumWaits:  function(){ return SVG.flow([{top:'ImplicitWait',sub:'global timeout'},{top:'ExplicitWait',sub:'WebDriverWait'},{top:'ExpectedCond',sub:'condition check'},{top:'FluentWait',sub:'custom polling'},{top:'Element ready',sub:'action performed'}]); },
    seleniumWindows: function(){ return SVG.flow([{top:'getWindowHandle()',sub:'current handle'},{top:'getWindowHandles()',sub:'all handles'},{top:'switchTo().window()',sub:'switch to target'},{top:'close()',sub:'close current'},{top:'quit()',sub:'end session'}]); },
    locatorPriority: function(){ return SVG.flow([{top:'By.id()',sub:'fastest — O(1)'},{top:'By.name()',sub:'form fields'},{top:'By.cssSelector()',sub:'browser-native'},{top:'By.xpath()',sub:'last resort'},{top:'findElement()',sub:'→ WebElement'}]); },
    frameworkArch:  function(){ return SVG.layers([{top:'Test Suite (testng.xml)',sub:'parallel / suite level config'},{top:'Test Classes (@Test)',sub:'test methods + assertions'},{top:'Page Objects (POM)',sub:'element locators + actions'},{top:'Base Class (@BeforeMethod)',sub:'driver init + teardown'},{top:'Utilities',sub:'config reader · reporter · data provider'}]); },

    /* REST ASSURED */
    restChain:    function(){ return SVG.flow([{top:'given()',sub:'headers / auth / body'},{top:'when()',sub:'HTTP method + URL'},{top:'then()',sub:'status + body checks'},{top:'extract()',sub:'pull values'},{top:'Assert',sub:'Java assert / JUnit'}]); },
    restArch:     function(){ return SVG.layers([{top:'Test Class (@Test)',sub:'test methods using REST Assured'},{top:'Request Specification',sub:'baseURI · headers · auth · body'},{top:'Response',sub:'statusCode · body · headers'},{top:'Assertions (Hamcrest)',sub:'equalTo() · hasItems() · contains()'}]); },
    serialFlow:   function(){ return SVG.flow([{top:'Java POJO',sub:'@JsonProperty'},{top:'ObjectMapper',sub:'serialize'},{top:'JSON String',sub:'request body'},{top:'API POST',sub:'send request'},{top:'Response',sub:'deserialize POJO'}]); },
    oauthFlow:    function(){ return SVG.timeline([{label:'Client credentials',key:'POST /token',text:'client_id + secret',color:'blue'},{label:'Access token',key:'Bearer token',text:'JWT / opaque',color:'green'},{label:'API call',key:'Authorization',text:'header inject',color:'purple'},{label:'Assert 200',key:'then().statusCode',text:'validate response',color:'orange'}]); },

    /* JAVA */
    javaOop:      function(){ return SVG.layers([{top:'Interface',sub:'contract — method signatures only'},{top:'Abstract Class',sub:'partial impl + abstract methods'},{top:'Concrete Class',sub:'full implementation — extends abstract'},{top:'Object',sub:'new ClassName() — runtime instance'}]); },
    javaStatic:   function(){ return SVG.flow([{top:'static var',sub:'shared across all obj'},{top:'static method',sub:'no object needed'},{top:'static block',sub:'runs once on class load'},{top:'static class',sub:'nested only'},{top:'ClassName.x',sub:'access via class name'}]); },
    javaCollections: function(){ return SVG.layers([{top:'Iterable → Collection → List / Set / Queue',sub:'java.util hierarchy'},{top:'List: ArrayList · LinkedList',sub:'ordered, allows duplicates'},{top:'Set: HashSet · TreeSet · LinkedHashSet',sub:'unique elements only'},{top:'Map: HashMap · TreeMap · LinkedHashMap',sub:'key-value pairs'}]); },
    javaLambda:   function(){ return SVG.flow([{top:'FunctionalInterface',sub:'1 abstract method'},{top:'Lambda',sub:'(a, b) -> a + b'},{top:'Stream',sub:'.filter().map()'},{top:'Terminal',sub:'.collect() .forEach()'},{top:'Result',sub:'processed data'}]); },
    mavenBuild:   function(){ return SVG.flow([{top:'validate',sub:'check POM'},{top:'compile',sub:'javac source'},{top:'test',sub:'JUnit/TestNG'},{top:'package',sub:'create JAR/WAR'},{top:'install',sub:'local .m2 repo'},{top:'deploy',sub:'remote repo'}]); },
    solidPrinciples: function(){ return SVG.tree('SOLID',[{label:'S — SRP',sub:'One responsibility',note:'per class'},{label:'O — OCP',sub:'Open/Closed',note:'extend, not modify'},{label:'L — LSP',sub:'Substitution',note:'child = parent'},{label:'I — ISP',sub:'Interface Seg.',note:'small interfaces'},{label:'D — DIP',sub:'Dependency Inv.',note:'depend on abstraction'}]); },

    /* PYTHON */
    pythonBasics: function(){ return SVG.layers([{top:'Variables & Data Types',sub:'int · str · list · dict · tuple · set'},{top:'Functions & Lambdas',sub:'def fn(): · lambda x: x*2'},{top:'Classes & OOP',sub:'class · __init__ · self · inheritance'},{top:'Modules & Packages',sub:'import · from · pip install'},{top:'Testing',sub:'pytest · unittest · assertions'}]); },
    pytestFlow:   function(){ return SVG.flow([{top:'conftest.py',sub:'fixtures'},{top:'@pytest.fixture',sub:'setup/teardown'},{top:'def test_()',sub:'test function'},{top:'assert',sub:'check result'},{top:'Report',sub:'HTML / Allure'}]); },

    /* TESTNG */
    testngAnnotations: function(){ return SVG.flow([{top:'@BeforeSuite',sub:'once for all'},{top:'@BeforeClass',sub:'per class'},{top:'@BeforeMethod',sub:'per test'},{top:'@Test',sub:'test logic'},{top:'@AfterMethod',sub:'cleanup'}]); },
    testngParallel: function(){ return SVG.layers([{top:'testng.xml — suite config',sub:'parallel="tests" thread-count="4"'},{top:'@DataProvider',sub:'supply test data rows — parameterized runs'},{top:'@Test(groups="smoke")',sub:'group execution — include / exclude'},{top:'ITestListener / IReporter',sub:'custom reporting hooks'}]); },

    /* CICD */
    pipelineStages: function(){ return SVG.flow([{top:'Code Push',sub:'git push'},{top:'Build',sub:'mvn / npm ci'},{top:'Test',sub:'playwright / selenium'},{top:'Report',sub:'Allure / HTML'},{top:'Deploy',sub:'staging'},{top:'Notify',sub:'Slack / email'}]); },
    dockerK8s:    function(){ return SVG.layers([{top:'Dockerfile',sub:'FROM node · COPY · RUN · CMD'},{top:'Docker Image',sub:'built artifact — immutable'},{top:'Docker Container',sub:'running instance of image'},{top:'Kubernetes Pod',sub:'1+ containers — scheduled on node'},{top:'Service / Ingress',sub:'expose app to traffic'}]); },

    /* BDD / CUCUMBER */
    bddFlow:      function(){ return SVG.flow([{top:'Feature File',sub:'Given / When / Then'},{top:'Step Defs',sub:'@Given @When @Then'},{top:'Page Objects',sub:'element actions'},{top:'Runner Class',sub:'CucumberOptions'},{top:'Reports',sub:'HTML / Allure'}]); },
    bddLayers:    function(){ return SVG.layers([{top:'Feature File (.feature)',sub:'Gherkin scenarios — business readable'},{top:'Step Definitions',sub:'Java methods matching Gherkin steps'},{top:'Page Object Layer',sub:'WebElement locators + actions'},{top:'Runner Class (@CucumberOptions)',sub:'tags · plugin · glue · features path'},{top:'Reports',sub:'Cucumber HTML · Allure · Extent'}]); },

    /* LOAD TESTING */
    jmeterFlow:   function(){ return SVG.flow([{top:'Thread Group',sub:'users × loops'},{top:'HTTP Sampler',sub:'request config'},{top:'Config Elements',sub:'CSV / variables'},{top:'Assertions',sub:'response checks'},{top:'Listeners',sub:'result collectors'},{top:'Report',sub:'HTML dashboard'}]); },
    postmanFlow:  function(){ return SVG.flow([{top:'Collection',sub:'group of requests'},{top:'Pre-req Script',sub:'setup variables'},{top:'HTTP Request',sub:'GET / POST / PUT'},{top:'Tests Script',sub:'pm.test() checks'},{top:'Newman CLI',sub:'run in pipeline'}]); },

    /* MANUAL TESTING */
    agileScrum:   function(){ return SVG.flow([{top:'Product Backlog',sub:'Prioritized stories'},{top:'Sprint Planning',sub:'2-week sprint'},{top:'Daily Scrum',sub:'15-min standup'},{top:'Sprint Review',sub:'Demo'},{top:'Retro',sub:'Improve process'}]); },
    testDesign:   function(){ return SVG.tree('Test Scenario',[{label:'Happy Path',sub:'Valid inputs',note:'expected output'},{label:'Boundary',sub:'Edge values',note:'min / max / zero'},{label:'Negative',sub:'Invalid inputs',note:'error handling'},{label:'Edge Case',sub:'Unusual state',note:'rare conditions'}]); },
    defectLifecycle: function(){ return SVG.flow([{top:'New',sub:'bug found'},{top:'Assigned',sub:'to developer'},{top:'In Progress',sub:'being fixed'},{top:'Fixed',sub:'code changed'},{top:'Retest',sub:'QA verifies'},{top:'Closed',sub:'verified fixed'}]); },

    /* TYPESCRIPT */
    tsCompile:    function(){ return SVG.layers([{top:'TypeScript Source (.ts)',sub:'Types · Interfaces · Generics · Enums'},{top:'tsc Compiler',sub:'Type checking + transpilation'},{top:'JavaScript Output (.js)',sub:'ES6+ or CommonJS target'},{top:'Node.js / Browser Runtime',sub:'execution environment'}]); },
    tsTypes:      function(){ return SVG.flow([{top:'Primitive',sub:'string/number/boolean'},{top:'Interface',sub:'shape contract'},{top:'Type Alias',sub:'type X = ...'},{top:'Generic<T>',sub:'reusable types'},{top:'Union | Inter',sub:'compose types'}]); },

    /* POSTMAN (API testing) */
    postmanApiFlow: function(){ return SVG.layers([{top:'Collection / Folder',sub:'organize API tests by feature'},{top:'Request',sub:'method · URL · headers · body'},{top:'Pre-request Script',sub:'set variables · auth token fetch'},{top:'Response',sub:'status code · body · headers'},{top:'Tests Script (pm.test)',sub:'assertions + variable extraction'}]); }
  };

  /* ═══════════════════════════════════════════════════════════════════
     PART 3 — FOLDER-AWARE DIAGRAM SELECTOR
     Primary key = folder from window.location.pathname
     Secondary key = panel id suffix
     Tertiary = content text fallback (within correct category only)
  ═══════════════════════════════════════════════════════════════════ */

  function getCategory() {
    var path = (window.location.pathname + window.location.href).toLowerCase();
    var title = (document.title || '').toLowerCase();
    var h1 = (document.querySelector('h1') ? document.querySelector('h1').textContent : '').toLowerCase();
    var fullText = path + ' ' + title + ' ' + h1;

    if (fullText.includes('playwright') || fullText.includes('jarvis_s') || fullText.includes('chitti_s')) return 'playwright';
    if (fullText.includes('selenium') || fullText.includes('webdriver')) return 'selenium';
    if (fullText.includes('rest-assured') || fullText.includes('restassured')) return 'rest';
    if (fullText.includes('testng')) return 'testng';
    if (fullText.includes('java-learning') || fullText.includes('java8') || fullText.includes('java_collections') || fullText.includes('oop_learning') || fullText.includes('solid_') || fullText.includes('maven_') || fullText.includes('java')) return 'java';
    if (fullText.includes('python') || fullText.includes('pytest')) return 'python';
    if (fullText.includes('ci-cd') || fullText.includes('cicd')) return 'cicd';
    if (fullText.includes('bdd') || fullText.includes('cucumber')) return 'bdd';
    if (fullText.includes('jmeter') || fullText.includes('load-testing') || fullText.includes('loadtest')) return 'loadtest';
    if (fullText.includes('manual-testing') || fullText.includes('manual testing') || fullText.includes('agile') || fullText.includes('scrum') || fullText.includes('defect') || fullText.includes('test_design')) return 'manual';
    if (fullText.includes('typescript')) return 'typescript';
    if (fullText.includes('postman')) return 'postman';
    return 'generic';
  }

  function selectDiagram(panelId, panelText) {
    var id  = (panelId || '').toLowerCase();
    var txt = (panelText || '').toLowerCase().substring(0, 2000);
    var cat = getCategory();
    var path = (window.location.pathname + window.location.href).toLowerCase();

    if (id.endsWith('-cd') || id.endsWith('-code') || id.endsWith('-ls')) return null;
    if (id.endsWith('-qa') || id.endsWith('-ol')) return null;

    if (cat === 'playwright') {
      if (txt.includes('waitforloadstate') || txt.includes('networkidle') || txt.includes('domcontentloaded')) return {svg: SVG.waitStates(), label: 'Page Load State Timeline'};
      if (txt.includes('page.route') || txt.includes('fulfill') || txt.includes('abort') || txt.includes('mock')) return {svg: SVG.apiMocking(), label: 'Network Interception / Mocking Flow'};
      if (txt.includes('page object') || txt.includes('pom') || txt.includes('pagefactory') || id.endsWith('-pom')) return {svg: SVG.pomArch(), label: 'Page Object Model — Layer Architecture'};
      if (txt.includes('beforeeach') || txt.includes('beforeall') || txt.includes('aftereach') || txt.includes('hook') || id.endsWith('-hk')) return {svg: SVG.hookLifecycle(), label: 'Test Hook Lifecycle Flow'};
      if (id.includes('auth') || id.includes('cookie') || id.includes('storage') || 
          path.includes('cookie') || path.includes('storage') || path.includes('auth') ||
          (txt.includes('storagestate') && (txt.includes('cookie') || txt.includes('save') || txt.includes('session')))) {
        return {svg: SVG.cookiesAuth(), label: 'Cookie / Storage State Auth Flow'};
      }
      if (txt.includes('config') || txt.includes('playwright.config') || txt.includes('project') || txt.includes('worker')) return {svg: SVG.playwrightConfig(), label: 'Playwright Config Architecture'};
      if (txt.includes('frame') || txt.includes('iframe') || txt.includes('framelocator')) return {svg: SVG.framesFlow(), label: 'Frames & iFrames — Navigation Flow'};
      if (txt.includes('dialog') || txt.includes('alert') || txt.includes('popup') || txt.includes('confirm')) return {svg: SVG.alertsFlow(), label: 'Alerts / Dialogs / Popups Handling'};
      if (txt.includes('window') || txt.includes('tab') || txt.includes('newpage') || txt.includes('newwindow')) return {svg: SVG.pagesWindows(), label: 'Pages, Tabs & Windows Flow'};
      if (txt.includes('skip') || txt.includes('fixme') || txt.includes('grep') || txt.includes('cli') || txt.includes('.env')) return {svg: SVG.skipEnvCLI(), label: 'Skip / Env / CLI Options Flow'};
      if (txt.includes('data driven') || txt.includes('each(') || txt.includes('parameteriz') || txt.includes('csv') || txt.includes('json')) return {svg: SVG.dataDriven(), label: 'Data-Driven Testing Flow'};
      if (txt.includes('api') || txt.includes('request') || txt.includes('response') || txt.includes('endpoint')) return {svg: SVG.apiMocking(), label: 'Playwright API — Request Flow'};
      return {svg: SVG.assertRetry(), label: 'Auto-Wait & Assertion Retry Flow'};
    }

    if (cat === 'selenium') {
      if (txt.includes('by.id') || txt.includes('by.cssselector') || txt.includes('by.xpath') || txt.includes('locator') || id.endsWith('-loc')) return {svg: SVG.locatorPriority(), label: 'Locator Strategy Priority'};
      if (txt.includes('implicitwait') || txt.includes('explicitwait') || txt.includes('webdriverwait') || txt.includes('fluentwait') || txt.includes('wait')) return {svg: SVG.seleniumWaits(), label: 'Selenium Wait Strategy Flow'};
      if (txt.includes('window') || txt.includes('tab') || txt.includes('switchto') || txt.includes('getwindowhandle')) return {svg: SVG.seleniumWindows(), label: 'Window / Tab Switching Flow'};
      if (txt.includes('framework') || txt.includes('architecture') || txt.includes('page object') || txt.includes('pom')) return {svg: SVG.frameworkArch(), label: 'Selenium Framework Architecture'};
      if (txt.includes('cookie') || txt.includes('broken link') || txt.includes('link verification')) return {svg: SVG.seleniumWaits(), label: 'Selenium — Advanced Actions Flow'};
      if (txt.includes('alert') || txt.includes('popup') || txt.includes('file upload') || txt.includes('action')) return {svg: SVG.seleniumWindows(), label: 'Alerts / Popups / File Upload Flow'};
      return {svg: SVG.seleniumArch(), label: 'Selenium WebDriver Architecture'};
    }

    if (cat === 'rest') {
      if (txt.includes('serial') || txt.includes('objectmapper') || txt.includes('pojo') || txt.includes('@jsonproperty')) return {svg: SVG.serialFlow(), label: 'Serialization / Deserialization Flow'};
      if (txt.includes('oauth') || txt.includes('token') || txt.includes('bearer') || txt.includes('auth')) return {svg: SVG.oauthFlow(), label: 'OAuth2 Token Flow'};
      if (txt.includes('parallel') || txt.includes('schema') || txt.includes('jsonschema')) return {svg: SVG.restArch(), label: 'REST Assured — Parallel + Schema'};
      if (txt.includes('glossary') || txt.includes('terminology') || txt.includes('definition')) return {svg: SVG.restChain(), label: 'REST Assured — Terminology Flow'};
      if (txt.includes('extract') || txt.includes('jsonpath') || txt.includes('xpath') || txt.includes('path(')) return {svg: SVG.restChain(), label: 'Response Extraction Flow'};
      if (txt.includes('request') || txt.includes('dynamic') || txt.includes('creation')) return {svg: SVG.restChain(), label: 'Dynamic Request Creation Flow'};
      return {svg: SVG.restArch(), label: 'REST Assured — Architecture'};
    }

    if (cat === 'java') {
      if (txt.includes('interface') && (txt.includes('abstract') || txt.includes('class'))) return {svg: SVG.javaOop(), label: 'Java OOP — Class Hierarchy'};
      if (txt.includes('static')) return {svg: SVG.javaStatic(), label: 'Static Keyword — Java Memory Model'};
      if (txt.includes('lambda') || txt.includes('stream') || txt.includes('functional interface')) return {svg: SVG.javaLambda(), label: 'Java 8 — Lambda & Streams Flow'};
      if (txt.includes('arraylist') || txt.includes('hashmap') || txt.includes('hashset') || txt.includes('collection')) return {svg: SVG.javaCollections(), label: 'Java Collections Hierarchy'};
      if (txt.includes('maven') || txt.includes('pom.xml') || txt.includes('artifact') || txt.includes('build lifecycle')) return {svg: SVG.mavenBuild(), label: 'Maven Build Lifecycle'};
      if (txt.includes('solid') || txt.includes('design principle') || txt.includes('single responsibility')) return {svg: SVG.solidPrinciples(), label: 'SOLID Design Principles'};
      return {svg: SVG.javaOop(), label: 'Java OOP — Core Concept Flow'};
    }

    if (cat === 'python') {
      if (txt.includes('pytest') || txt.includes('fixture') || txt.includes('conftest') || txt.includes('parameterize')) return {svg: SVG.pytestFlow(), label: 'pytest — Test Execution Flow'};
      return {svg: SVG.pythonBasics(), label: 'Python for QA — Core Concepts'};
    }

    if (cat === 'testng') {
      if (txt.includes('parallel') || txt.includes('dataprovider') || txt.includes('listener') || txt.includes('reporter')) return {svg: SVG.testngParallel(), label: 'TestNG — Parallel & DataProvider'};
      return {svg: SVG.testngAnnotations(), label: 'TestNG Annotation Lifecycle'};
    }

    if (cat === 'cicd') {
      if (txt.includes('docker') || txt.includes('kubernetes') || txt.includes('container')) return {svg: SVG.dockerK8s(), label: 'Docker / Kubernetes Architecture'};
      return {svg: SVG.pipelineStages(), label: 'CI/CD Pipeline Stages'};
    }

    if (cat === 'bdd') {
      if (id.endsWith('-ov') || id.endsWith('-con')) return {svg: SVG.bddLayers(), label: 'BDD / Cucumber — Layer Architecture'};
      return {svg: SVG.bddFlow(), label: 'Cucumber Execution Flow'};
    }

    if (cat === 'loadtest') {
      if (txt.includes('postman') || txt.includes('newman') || txt.includes('collection')) return {svg: SVG.postmanFlow(), label: 'Postman — Load Test Flow'};
      return {svg: SVG.jmeterFlow(), label: 'JMeter — Load Test Execution'};
    }

    if (cat === 'manual') {
      if (txt.includes('scrum') || txt.includes('sprint') || txt.includes('agile') || txt.includes('backlog')) return {svg: SVG.agileScrum(), label: 'Agile / Scrum Sprint Flow'};
      if (txt.includes('defect') || txt.includes('bug') || txt.includes('severity') || txt.includes('priority')) return {svg: SVG.defectLifecycle(), label: 'Defect Lifecycle Flow'};
      return {svg: SVG.testDesign(), label: 'Test Design — Technique Decision Tree'};
    }

    if (cat === 'typescript') {
      if (txt.includes('interface') || txt.includes('generic') || txt.includes('type alias') || txt.includes('union')) return {svg: SVG.tsTypes(), label: 'TypeScript — Type System'};
      return {svg: SVG.tsCompile(), label: 'TypeScript — Compilation Flow'};
    }

    if (cat === 'postman') {
      return {svg: SVG.postmanApiFlow(), label: 'Postman API Testing Flow'};
    }

    if (id.endsWith('-ov') || id.endsWith('-con')) {
      return {svg: SVG.pipelineStages(), label: 'Automation Flow Overview'};
    }
    return null;
  }

  function makeDiagramEl(label, svgStr) {
    var d = document.createElement('div');
    d.className = 'vr-diagram';
    d.innerHTML = '<div class="vr-diagram-head"><span class="vr-diagram-dot"></span>' + label + '</div><div class="vr-diagram-body">' + svgStr + '</div>';
    return d;
  }

  /* ═══════════════════════════════════════════════════════════════════
     PART 4 — AUTO-TABIFICATION & STANDARDIZATION ENGINES
  ═══════════════════════════════════════════════════════════════════ */

  function copyPreText(btn) {
    var cp = btn.closest('.cp, .cpan');
    var code = cp.querySelector('pre code') || cp.querySelector('pre');
    var text = code.innerText || code.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
    });
  }
  window.copyPreText = copyPreText;


  function standardizeExistingTabs() {
    var pan = document.body;

    // Find all custom tab bars: .ctabs, .ctabs2, .code-tab-bar
    pan.querySelectorAll('.ctabs, .ctabs2, .code-tab-bar').forEach(function(ctbar) {
      if (ctbar.dataset.vrTabsDone) return;
      ctbar.dataset.vrTabsDone = '1';

      var buttons = Array.from(ctbar.querySelectorAll('.ctb, .ct, .ct-btn, .ctab, .tab'));
      if (buttons.length === 0) return;

      // Find the closest wrapper/container
      var wrapper = ctbar.closest('.cs, .code-tabs');
      if (wrapper) {
        wrapper.classList.add('cs');
      } else {
        wrapper = document.createElement('div');
        wrapper.className = 'cs';
        ctbar.parentNode.insertBefore(wrapper, ctbar);
        
        var csh = document.createElement('div');
        csh.className = 'csh';
        csh.innerHTML = '<div class="dr2"><span class="md mr"></span><span class="md my"></span><span class="md mg"></span></div><span>CODE EXAMPLES</span>';
        wrapper.appendChild(csh);
        wrapper.appendChild(ctbar);
      }

      ctbar.classList.add('ctbar');

      // Resolve panels for these buttons
      var panels = [];
      buttons.forEach(function(btn) {
        var panelId = btn.getAttribute('data-c');
        if (!panelId) {
          var onclick = btn.getAttribute('onclick') || '';
          var showCMatch = onclick.match(/showC\(['"]([^'"]+)['"]\s*,\s*(\d+)\)/);
          if (showCMatch) {
            panelId = showCMatch[1] + 'c' + showCMatch[2];
          } else {
            var scMatch = onclick.match(/sc\((\d+)\s*,\s*(\d+)\)/);
            if (scMatch) {
              panelId = 'c' + scMatch[1] + '-' + scMatch[2];
            } else {
              // General match for single ID/string in quotes
              var generalMatch = onclick.match(/['"]([^'"]+)['"]/);
              if (generalMatch) {
                var potentialId = generalMatch[1];
                var pEl = document.getElementById(potentialId);
                if (pEl && (pEl.classList.contains('code-panel') || pEl.classList.contains('code-area') || pEl.classList.contains('cpanel') || pEl.classList.contains('cpan2') || pEl.classList.contains('cp') || pEl.classList.contains('cpan') || pEl.classList.contains('code-section-wrap'))) {
                  panelId = potentialId;
                }
              }
            }
          }
        }
        if (panelId) {
          var pEl = document.getElementById(panelId);
          if (pEl) panels.push(pEl);
        }
      });

      // If we couldn't find panels by ID/onclick, find them in parent/wrapper by class
      if (panels.length === 0) {
        var searchArea = wrapper.parentNode || wrapper;
        panels = Array.from(searchArea.querySelectorAll('.code-panel, .code-area, .cpanel, .cp, .cpan, .cpan2, .code-section-wrap'));
        // Filter to make sure they are not inside another standardized tab group
        panels = panels.filter(function(p) {
          return p.closest('.cs') === wrapper || p.parentNode === searchArea;
        });
      }

      // Standardize buttons and panels
      buttons.forEach(function(btn, idx) {
        btn.classList.add('ct');
        btn.removeAttribute('onclick'); // prevent original inline onclick from running and throwing/conflicting

        // If the button has an extension pill, get only the text content of the non-pill part
        var pill = btn.querySelector('.fxt, .lang-pill, .fx, .fxt-ts, .fxt-json, .fxt-sh');
        var filename = '';
        if (pill) {
          var cloned = btn.cloneNode(true);
          var clonedPill = cloned.querySelector('.fxt, .lang-pill, .fx, .fxt-ts, .fxt-json, .fxt-sh');
          if (clonedPill) cloned.removeChild(clonedPill);
          filename = cloned.textContent.trim();
        } else {
          filename = btn.textContent.trim();
        }

        filename = filename.replace(/^\d+\.\s*/, ''); // strip leading numbers like "1. "

        var ext = filename.split('.').pop() || 'ts';
        if (ext === filename) {
          var cat = getCategory();
          var catExts = {
            playwright: 'ts',
            selenium: 'java',
            rest: 'java',
            java: 'java',
            python: 'py',
            testng: 'java',
            cicd: 'sh',
            bdd: 'java',
            loadtest: 'js',
            manual: 'sh',
            typescript: 'ts',
            postman: 'js'
          };
          ext = catExts[cat] || 'ts';

          if (filename.toLowerCase().includes('json')) ext = 'json';
          if (filename.toLowerCase().includes('yml') || filename.toLowerCase().includes('yaml')) ext = 'yml';
          if (filename.toLowerCase().includes('xml') || filename.toLowerCase().includes('pom')) ext = 'xml';
          if (filename.toLowerCase().includes('java')) ext = 'java';
          if (filename.toLowerCase().includes('py') || filename.toLowerCase().includes('python')) ext = 'py';
          if (filename.toLowerCase().includes('sh') || filename.toLowerCase().includes('bash') || filename.toLowerCase().includes('terminal')) ext = 'sh';
          if (filename.toLowerCase().includes('js') || filename.toLowerCase().includes('javascript')) ext = 'js';
          if (filename.toLowerCase().includes('ts') || filename.toLowerCase().includes('typescript')) ext = 'ts';
        }

        btn.innerHTML = '<span class="lang-pill lang-' + ext + '">.' + ext + '</span> ' + filename;

        var pEl = panels[idx];
        if (pEl) {
          pEl.classList.add('cp');
          wrapper.appendChild(pEl); // Move inside wrapper for styling

          var labelEl = pEl.querySelector('.code-label, .fb');
          var fileLabel = labelEl ? labelEl.textContent.trim() : filename;

          var subHdr = pEl.querySelector('.cp-sub-header, .ch');
          if (!subHdr) {
            subHdr = document.createElement('div');
            subHdr.className = 'cp-sub-header';
            subHdr.innerHTML = '<span class="file-dot file-dot-' + ext + '">●</span><span class="file-name">' + fileLabel + '</span><button class="cpbtn" onclick="copyPreText(this)">Copy</button>';
            pEl.insertBefore(subHdr, pEl.firstChild);
            if (labelEl) labelEl.style.display = 'none';
          } else {
            subHdr.classList.add('cp-sub-header');
            subHdr.innerHTML = '<span class="file-dot file-dot-' + ext + '">●</span><span class="file-name">' + fileLabel + '</span><button class="cpbtn" onclick="copyPreText(this)">Copy</button>';
          }

          if (btn.classList.contains('active') || btn.classList.contains('cact') || btn.classList.contains('act')) {
            btn.classList.add('active');
            pEl.classList.add('active');
          }

          btn.onclick = function() {
            wrapper.querySelectorAll('.ct, .ct-btn, .ctab, .tab, .ctb').forEach(function(b) { b.classList.remove('active'); });
            wrapper.querySelectorAll('.cp, .code-panel, .code-area, .cpanel, .cpan2, .code-section-wrap').forEach(function(p) { p.classList.remove('active'); });
            btn.classList.add('active');
            pEl.classList.add('active');
          };
        }
      });
    });
  }

  function enhanceCodeBlocks() {
    var pan = document.body;

    var rawBlocks = Array.from(pan.querySelectorAll('.code-block, .cb, pre, .code'));
    
    rawBlocks = rawBlocks.filter(function(block) {
      if (block.dataset.vrCodeDone) return false;
      if (block.closest('.cs, .cp, .cpan, .cwrap, .vr-cb-body')) return false;
      
      // Filter out .cb if it is a concept block
      if (block.classList.contains('cb')) {
        if (block.querySelector('h4, h3, .cbb') || (block.textContent.trim().startsWith('?') && !block.querySelector('pre, code'))) {
          return false;
        }
      }
      return true;
    });

    if (rawBlocks.length === 0) return;

    var groups = [];
    var currentGroup = [];

    rawBlocks.forEach(function(block) {
      if (currentGroup.length === 0) {
        currentGroup.push(block);
      } else {
        var last = currentGroup[currentGroup.length - 1];
        if (block.parentNode === last.parentNode) {
          var isAdj = true;
          var next = last.nextSibling;
          while (next && next !== block) {
            if (next.nodeType === 1) {
              var tag = next.tagName;
              var cls = next.className || '';
              if (tag !== 'P' && tag !== 'SPAN' && tag !== 'DIV') {
                isAdj = false;
                break;
              }
              if (/sub|mini-label|card-title|table|divider/.test(cls)) {
                isAdj = false;
                break;
              }
              if (!/code-title|cp|code-label|sh|fb|cfn/.test(cls) && next.textContent.trim().length > 150) {
                isAdj = false;
                break;
              }
            }
            next = next.nextSibling;
          }
          if (isAdj) {
            currentGroup.push(block);
          } else {
            groups.push(currentGroup);
            currentGroup = [block];
          }
        } else {
          groups.push(currentGroup);
          currentGroup = [block];
        }
      }
    });
    if (currentGroup.length > 0) groups.push(currentGroup);

    groups.forEach(function(group, gIdx) {
      var cs = document.createElement('div');
      cs.className = 'cs';
      
      var csh = document.createElement('div');
      csh.className = 'csh';
      csh.innerHTML = '<div class="dr2"><span class="md mr"></span><span class="md my"></span><span class="md mg"></span></div><span>CODE EXAMPLES</span>';
      cs.appendChild(csh);

      var ctbar = document.createElement('div');
      ctbar.className = 'ctbar';
      cs.appendChild(ctbar);

      group.forEach(function(block, bIdx) {
        block.dataset.vrCodeDone = '1';

        var titleText = '';
        var titleEl = block.querySelector('.code-title');
        if (titleEl) {
          titleText = titleEl.textContent.trim();
          titleEl.remove();
        } else {
          var prev = block.previousSibling;
          while (prev) {
            if (prev.nodeType === 1) {
              var cls = prev.className || '';
              if (/code-title|cp|code-label|sh|fb|cfn|sub|mini-label/.test(cls)) {
                titleText = prev.textContent.trim();
                prev.style.display = 'none';
                break;
              }
              break;
            }
            prev = prev.previousSibling;
          }
        }

        if (!titleText) {
          titleText = 'Example ' + (bIdx + 1);
        }
        var cleanTitle = titleText.replace(/^(Example|Exercise)\s+\d+\s*[-—:]*\s*/i, '').trim();
        cleanTitle = cleanTitle.replace(/^[\uE000-\uF8FF|\u2700-\u27BF|💾|📄|💻|✦|●|✓|?]\s*/g, '').trim();

        // Capping very long tab titles
        var tabLabel = cleanTitle;
        if (tabLabel.length > 40) {
          tabLabel = tabLabel.substring(0, 37) + '...';
        }

        // Determine language
        var categoryDefaults = {
          playwright: 'ts',
          selenium: 'java',
          rest: 'java',
          java: 'java',
          python: 'py',
          testng: 'java',
          cicd: 'sh',
          bdd: 'java',
          loadtest: 'js',
          manual: 'sh',
          typescript: 'ts',
          postman: 'js'
        };
        var lang = categoryDefaults[getCategory()] || 'java';
        var codeEl = block.querySelector('code');
        var codeClass = codeEl ? (codeEl.className || '') : (block.className || '');
        var langMatch = codeClass.match(/language-(\w+)/);
        if (langMatch) {
          lang = langMatch[1];
        } else {
          var lowerTitle = cleanTitle.toLowerCase();
          var codeText = block.textContent;
          var codeTextLower = codeText.toLowerCase();
          if (lowerTitle.includes('.ts') || lowerTitle.includes('typescript')) lang = 'ts';
          else if (lowerTitle.includes('.js') || lowerTitle.includes('javascript')) lang = 'js';
          else if (lowerTitle.includes('.py') || lowerTitle.includes('python')) lang = 'py';
          else if (lowerTitle.includes('.xml') || lowerTitle.includes('pom')) lang = 'xml';
          else if (lowerTitle.includes('.json')) lang = 'json';
          else if (lowerTitle.includes('.sh') || lowerTitle.includes('bash') || lowerTitle.includes('cmd') || lowerTitle.includes('terminal')) lang = 'sh';
          else {
            var isTs = /:\s*(string|number|boolean|any|void|unknown|never)\b|interface\s+[A-Z]|type\s+[A-Z]\s*=|\bas\s+[A-Z]/g.test(codeText);
            var isJs = /const\s+\w+|let\s+\w+|await\s+|pm\.|console\.|=>|require\(|module\.exports|export\s+/g.test(codeTextLower);
            var isPy = /def\s+[a-z0-9_]+\(|import\s+pytest|elif\s+|print\([^;]*\)/g.test(codeTextLower);
            var isJava = /public\s+class\s+|System\.out\.|String\s+\w+\s*=|int\s+\w+\s*=|@Test|WebDriver\s+|WebElement\s+/g.test(codeText);
            var isXml = /^\s*<[a-zA-Z0-9_\-\.\:\/]+>|pom\.xml/g.test(codeTextLower);
            var isSh = /^(npm|npx|pip|mvn|git|docker|curl|mkdir|cd|node)\s/gm.test(codeTextLower.trim()) || codeTextLower.trim().startsWith('$');

            if (isTs) lang = 'ts';
            else if (isJs) lang = 'js';
            else if (isPy) lang = 'py';
            else if (isJava) lang = 'java';
            else if (isXml) lang = 'xml';
            else if (isSh) lang = 'sh';
          }
        }

        if (lang === 'javascript') lang = 'js';

        var extLookup = { ts: 'ts', js: 'js', py: 'py', xml: 'xml', json: 'json', sh: 'sh', java: 'java' };
        var tabLabel = cleanTitle;
        var filename = cleanTitle;
        if (!tabLabel) {
          var langNames = { ts: 'TypeScript', js: 'JavaScript', py: 'Python', xml: 'XML', json: 'JSON', sh: 'Terminal', java: 'Java' };
          tabLabel = (langNames[lang] || 'Code') + ' Example';
          if (group.length > 1) {
            tabLabel += ' ' + (bIdx + 1);
          }
          var base = 'example' + (group.length > 1 ? '_' + (bIdx + 1) : '');
          filename = base + '.' + (extLookup[lang] || 'java');
        } else {
          if (tabLabel.length > 40) {
            tabLabel = tabLabel.substring(0, 37) + '...';
          }
          if (!filename.includes('.')) {
            var base = filename.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 30);
            filename = base + '.' + (extLookup[lang] || 'java');
          }
        }

        var tabBtn = document.createElement('button');
        tabBtn.className = 'ct' + (bIdx === 0 ? ' active' : '');
        tabBtn.innerHTML = '<span class="lang-pill lang-' + lang + '">.' + lang + '</span> ' + tabLabel;
        tabBtn.onclick = function() {
          var parentCs = this.closest('.cs');
          parentCs.querySelectorAll('.ct').forEach(function(b) { b.classList.remove('active'); });
          parentCs.querySelectorAll('.cp').forEach(function(p) { p.classList.remove('active'); });
          this.classList.add('active');
          var targetPanel = parentCs.querySelectorAll('.cp')[bIdx];
          if (targetPanel) targetPanel.classList.add('active');
        };
        ctbar.appendChild(tabBtn);

        var cp = document.createElement('div');
        cp.className = 'cp' + (bIdx === 0 ? ' active' : '');
        
        var subHdr = document.createElement('div');
        subHdr.className = 'cp-sub-header';
        subHdr.innerHTML = '<span class="file-dot file-dot-' + lang + '">●</span><span class="file-name">' + filename + '</span><button class="cpbtn" onclick="copyPreText(this)">Copy</button>';
        cp.appendChild(subHdr);

        var pre = document.createElement('pre');
        pre.dataset.vrCodeDone = '1';
        var codeInnerHTML = codeEl ? codeEl.innerHTML : block.innerHTML;
        pre.innerHTML = '<code class="language-' + lang + '">' + codeInnerHTML + '</code>';
        cp.appendChild(pre);

        cs.appendChild(cp);
      });

      var firstBlock = group[0];
      firstBlock.parentNode.insertBefore(cs, firstBlock);

      group.forEach(function(block) {
        block.style.display = 'none';
      });
    });
  }

  function highlightKeywordsInDOM() {
    var selectors = ['.vr-ol-item', '.vr-bp-item', '.vr-qa-a', '.vr-gl-def', '.qp', '.bpl li', '.gdef', '.card p', '.card li', '.def-box p', '.def-box .lbl'];
    var keywords = [
      // Selenium Java
      'driver\\.get\\(\\)', 'driver\\.findElement\\(\\)', 'driver\\.findElements\\(\\)', 'driver\\.quit\\(\\)', 'driver\\.close\\(\\)',
      'driver\\.getWindowHandle\\(\\)', 'driver\\.getWindowHandles\\(\\)', 'driver\\.switchTo\\(\\)', 'driver\\.manage\\(\\)',
      'driver\\.navigate\\(\\)', 'manage\\(\\)\\.addCookie\\(\\)', 'manage\\(\\)\\.getCookies\\(\\)', 'manage\\(\\)\\.deleteCookie\\(\\)',
      'manage\\(\\)\\.deleteAllCookies\\(\\)', 'getCookieNamed\\(\\)', 'findElement\\(\\)', 'findElements\\(\\)',
      'sendKeys\\(\\)', 'click\\(\\)', 'getText\\(\\)', 'getAttribute\\(\\)', 'isSelected\\(\\)', 'isEnabled\\(\\)',
      'isDisplayed\\(\\)', 'perform\\(\\)', 'build\\(\\)', 'moveToElement\\(\\)', 'dragAndDrop\\(\\)',
      'doubleClick\\(\\)', 'contextClick\\(\\)', 'until\\(\\)', 'presenceOfElementLocated\\(\\)', 'visibilityOf\\(\\)',
      'elementToBeClickable\\(\\)', 'alertIsPresent\\(\\)',
      'WebDriverWait', 'ExpectedConditions', 'ChromeOptions', 'FirefoxOptions', 'ChromeDriver', 'FirefoxDriver',
      'WebDriver', 'WebElement', 'By', 'Select', 'Actions', 'Cookie', 'JavascriptExecutor', 'TakesScreenshot', 'HttpURLConnection',
      '@Test', '@BeforeMethod', '@AfterMethod', '@BeforeClass', '@AfterClass', '@BeforeSuite', '@AfterSuite', '@DataProvider', '@Parameters',
      
      // Playwright TS
      'test\\.skip\\(\\)', 'test\\.fixme\\(\\)', 'test\\.fail\\(\\)', 'test\\.describe\\.skip\\(\\)', 'page\\.goto\\(\\)',
      'expect\\(\\)', 'toBeVisible\\(\\)', 'toHaveTitle\\(\\)', 'page\\.click\\(\\)', 'page\\.dragAndDrop\\(\\)',
      'expect\\.poll\\(\\)', 'expect\\.toPass\\(\\)', 'process\\.env\\.CI', 'process\\.env', 'browserName',
      'playwright\\.config\\.ts', 'playwright test', 'npx playwright test', '--headed', '--project', '--grep',
      '--shard', 'merge-reports'
    ];
    var regex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
    
    selectors.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        if (el.dataset.vrHlDone) return;
        el.dataset.vrHlDone = '1';
        
        var walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        var nodes = [];
        var node;
        while (node = walk.nextNode()) nodes.push(node);
        nodes.forEach(function(textNode) {
          var text = textNode.nodeValue;
          if (regex.test(text)) {
            var span = document.createElement('span');
            span.innerHTML = text.replace(regex, function(match) {
              return '<span class="hl-kw">' + match + '</span>';
            });
            textNode.parentNode.replaceChild(span, textNode);
          }
        });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     PART 5 — UNIVERSAL LAYOUT ENFORCER
  ═══════════════════════════════════════════════════════════════════ */

  function enhanceUniversal() {
    var pan = document.body;

    // 1. Cards (exclude small components that shouldn't be main cards)
    pan.querySelectorAll('.card, .dcard, .gcard, .concept-box, .ov-card, .concept-section, .session-panel').forEach(function(el) {
      if (el.dataset.vrCardDone) return;
      el.dataset.vrCardDone = '1';
      if (el.tagName === 'DIV') el.classList.add('vr-card');
    });

    // 2. Section Headers
    pan.querySelectorAll('.sh, .s-head, .concept-title, .ov-title, .section-label, .section-title, .vr-sh').forEach(function(el) {
      if (el.dataset.vrShDone) return;
      el.dataset.vrShDone = '1';
      el.classList.add('vr-tsec');
    });

    // 3. One liners
    pan.querySelectorAll('.liner, .oneliner, .oli').forEach(function(el) {
      if (el.dataset.vrOliDone) return;
      el.dataset.vrOliDone = '1';
      el.classList.add('vr-ol-item');
    });

    // 4. Q&A
    pan.querySelectorAll('.qa, .qa-item, .qablock').forEach(function(el) {
      if (el.dataset.vrQaWrapDone) return;
      el.dataset.vrQaWrapDone = '1';
      el.classList.add('vr-qa-wrap');
    });
    pan.querySelectorAll('.qq, .qa-q, .qaq').forEach(function(el) {
      if (el.dataset.vrQaQDone) return;
      el.dataset.vrQaQDone = '1';
      el.classList.add('vr-qa-q');
    });
    pan.querySelectorAll('.qa-ans, .qa-a, .qaa').forEach(function(el) {
      if (el.dataset.vrQaADone) return;
      el.dataset.vrQaADone = '1';
      el.classList.add('vr-qa-a');
      el.style.display = 'block'; 
      el.style.maxHeight = 'none';
    });

    // 5. Best Practices
    pan.querySelectorAll('.bpi, .check-item, .bpitem, .bp li').forEach(function(el) {
      if (el.dataset.vrBpDone) return;
      el.dataset.vrBpDone = '1';
      el.classList.add('vr-bp-item');
      var icon = el.querySelector('.bpic, .check-icon, .bpicon');
      if (icon) icon.classList.add('vr-bp-icon');
    });

    // 6. Tables
    pan.querySelectorAll('table:not(.vr-table)').forEach(function(el) {
      if (el.dataset.vrTableDone) return;
      el.dataset.vrTableDone = '1';
      el.classList.add('vr-table');
    });

    // 7. Concept blocks
    pan.querySelectorAll('.cb, .concept-text').forEach(function(el){
      if (el.dataset.vrCbDone) return;
      el.dataset.vrCbDone = '1';
      if(el.classList.contains('cb')) {
         // Check if this .cb is actually a code block
         if (el.querySelector('pre, code') || (!el.querySelector('h4, h3, .cbb') && !el.textContent.trim().startsWith('?'))) {
           el.dataset.vrCbDone = ''; // reset so code block enhancer handles it
           return;
         }
         el.classList.add('vr-cb');
         el.querySelectorAll('h4, h3').forEach(function(h){ h.classList.add('vr-cb-head'); });
         el.querySelectorAll('.cbb, pre, code').forEach(function(b){ b.classList.add('vr-cb-body'); });
      } else {
         el.classList.add('vr-cb-body');
      }
    });

    // 8. Grids and Cells
    pan.querySelectorAll('.g2, .grid, .overview-grid').forEach(function(g){
      if (g.dataset.vrGridDone) return;
      g.dataset.vrGridDone = '1';
      g.classList.add('vr-g2');
    });
    pan.querySelectorAll('.cell').forEach(function(c){
      if (c.dataset.vrCellDone) return;
      c.dataset.vrCellDone = '1';
      c.classList.add('vr-gcard');
    });

    // 9. Glossary Items
    pan.querySelectorAll('.gi, .gterm').forEach(function(gi){
      if (gi.dataset.vrGiDone) return;
      gi.dataset.vrGiDone = '1';
      gi.classList.add('vr-gl-item');
      var key = gi.querySelector('.gk, strong');
      var def = gi.querySelector('.gd, span, p');
      if(key) key.classList.add('vr-gl-key');
      if(def) def.classList.add('vr-gl-def');
    });

    // 10. Tabs standardization
    pan.querySelectorAll('.tabs').forEach(function(t) {
      if (t.dataset.vrTabsStdDone) return;
      t.dataset.vrTabsStdDone = '1';
      t.classList.add('stabs');
    });
    pan.querySelectorAll('.tab:not(.ctab)').forEach(function(t) {
      if (t.dataset.vrTabBtnStdDone) return;
      t.dataset.vrTabBtnStdDone = '1';
      t.classList.add('stab');
    });

    // Standardize existing custom code tabs and tabify raw blocks
    standardizeExistingTabs();
    enhanceCodeBlocks();

    // Run keyword highlighting
    highlightKeywordsInDOM();
  }

  /* ═══════════════════════════════════════════════════════════════════
     PART 6 — GLOBAL BODY + HEADER FIXES
  ═══════════════════════════════════════════════════════════════════ */
  function fixGlobalLayout() {
    var bodyBg = window.getComputedStyle(document.body).backgroundColor;
    if (bodyBg && (bodyBg === 'rgb(13, 17, 23)' || bodyBg === 'rgb(22, 27, 34)' || bodyBg === 'rgb(11, 11, 18)')) {
      document.body.style.background = '#f1f5f9';
      document.body.style.color = '#1e293b';
    }
    document.querySelectorAll('.app').forEach(function(el){
      var bg = window.getComputedStyle(el).backgroundColor;
      if (bg && (bg.includes('13, 17') || bg.includes('22, 27'))) el.style.background = 'transparent';
    });
    document.querySelectorAll('.header, .hero, .s-head').forEach(function(h){
      h.classList.add('vr-header-light');
    });
    document.querySelectorAll('.main').forEach(function(m){
      var bg = window.getComputedStyle(m).backgroundColor;
      if (bg && (bg.includes('22, 27') || bg.includes('13, 17'))) { m.style.background = '#f8fafc'; m.style.borderRadius = '0 0 10px 10px'; }
    });
    document.querySelectorAll('.top-bar').forEach(function(tb){
      tb.style.background = 'linear-gradient(135deg, #6C5CE7, #0284c7)';
      tb.style.color = '#fff'; tb.style.borderRadius = '10px 10px 0 0';
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     PART 7 — RUNNER + MUTATION OBSERVERS
  ═══════════════════════════════════════════════════════════════════ */
  function runAll() {
    fixGlobalLayout();
    enhanceUniversal();

    /* Click listener to re-run on tab switches (since content might become visible) */
    document.addEventListener('click', function(e) {
      var tgt = e.target; if (!tgt) return;
      var cls = tgt.className || '';
      if (/stab|secbtn|ctb|sbtn|nav-btn|pill|ctab|tab|tb|sec-btn/.test(cls)) {
        setTimeout(enhanceUniversal, 80);
      }
    }, true);

    /* Watch #sessionContent for JS-rendered pages */
    var sc = document.getElementById('sessionContent');
    if (sc && window.MutationObserver) {
      var scObs = new MutationObserver(function() {
        setTimeout(enhanceUniversal, 60);
      });
      scObs.observe(sc, {childList: true, subtree: false});
    }
  }

  /* ── INIT ── */
  injectGlobalStyles();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }

})();
