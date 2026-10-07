import { css } from 'lit';
export const cardStyles = css`
  :host { color:var(--primary-text-color,#26352f); font-family:var(--paper-font-body1_-_font-family,inherit); --nibe-surface:var(--ha-card-background,var(--card-background-color,#fff)); --nibe-muted:var(--secondary-text-color,#69756f); --nibe-accent:var(--status-heat-color); }
  :host([hidden]) { display:none; }
  * { box-sizing:border-box; }
  ha-card { display:block; padding:var(--tile-padding-large); background:var(--nibe-surface); border:1px solid var(--divider-color,#0001); border-radius:var(--ha-card-border-radius,24px); overflow:visible; }
  .outer { container-type:inline-size; }
  .root { isolation:isolate; display:grid; gap:var(--large-gap); }
  button { font:inherit; color:inherit; cursor:pointer; border:0; touch-action:manipulation; -webkit-tap-highlight-color:transparent; }
  button:disabled { cursor:default; opacity:.45; }
  button:focus-visible, summary:focus-visible { outline:3px solid var(--primary-color,var(--status-active-color)); outline-offset:3px; }
  ha-icon { display:inline-flex; width:22px; height:22px; --mdc-icon-size:22px; flex:0 0 22px; }
  .top { display:flex; align-items:center; gap:12px; padding:8px 8px 3px; }
  .brand { width:44px; height:44px; border-radius:50%; display:grid; place-items:center; background:color-mix(in srgb,var(--primary-text-color) 6%,transparent); }
  .identity { flex:1; min-width:0; }
  h1 { font-size:18px; font-weight:700; margin:0; letter-spacing:-.02em; }
  .subtitle { font-size:12px; color:var(--nibe-muted); margin-top:4px; overflow-wrap:anywhere; }
  .icon-button { background:transparent; border-radius:50%; min-width:44px; min-height:44px; display:grid; place-items:center; color:var(--nibe-muted); }
  .icon-button[aria-pressed=true] { color:var(--nibe-accent); background:color-mix(in srgb,var(--nibe-accent) 10%,transparent); }
  .status-line { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:4px 8px 8px; font-size:13px; }
  .dot { width:7px; height:7px; border-radius:50%; background:var(--nibe-muted); }
  .heat .dot { background:var(--status-heat-color); }
  .water .dot { background:var(--status-active-color); }
  .outside { color:var(--nibe-muted); margin-left:auto; font-size:12px; }
  .panel { display:grid; gap:var(--large-gap); min-width:0; }
  .tile-wrap { position:relative; min-width:0; }
  .surface { position:relative; z-index:1; background:color-mix(in srgb,var(--nibe-surface) 96%,var(--primary-text-color) 4%); border-radius:var(--tile-border-radius); box-shadow:var(--tile-shadow-default); }
  .glow-under { position:absolute; inset:0; pointer-events:none; z-index:0; border-radius:var(--tile-border-radius); }
  .glow-overlay { position:absolute; inset:-10px -14px -18px; border-radius:inherit; pointer-events:none; opacity:.8; mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,.25) 18px,#000 44px); }
  .comfort { padding:22px; }
  .eyebrow { color:var(--nibe-muted); font-size:12px; font-weight:600; display:flex; align-items:center; gap:6px; }
  .comfort-top { display:flex; justify-content:space-between; align-items:baseline; gap:8px; }
  .reading { display:flex; align-items:baseline; gap:4px; margin:12px 0 20px; }
  .reading strong { font-size:clamp(42px,12cqw,56px); line-height:1; font-weight:550; letter-spacing:-.055em; font-variant-numeric:tabular-nums; }
  .reading span { color:var(--nibe-muted); font-size:23px; }
  .reading .missing { font-size:26px; letter-spacing:-.025em; }
  .comfort-footer,.setting-row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .setting-copy { min-width:0; }
  .setting-copy strong { font-size:14px; font-weight:600; }
  .setting-copy small { display:block; color:var(--nibe-muted); line-height:1.5; font-size:12px; margin-top:4px; }
  .stepper { display:flex; align-items:center; border-radius:999px; background:color-mix(in srgb,var(--primary-text-color) 6%,transparent); padding:3px; gap:3px; flex-shrink:0; }
  .stepper button { display:grid; place-items:center; width:40px; height:40px; border-radius:50%; background:var(--nibe-surface); font-size:21px; }
  .stepper output { min-width:49px; text-align:center; font-size:14px; font-weight:650; font-variant-numeric:tabular-nums; }
  .metrics { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:var(--large-gap); }
  .metric { width:100%; text-align:left; padding:17px 18px; display:grid; gap:12px; min-height:124px; }
  .metric-top { display:flex; align-items:center; justify-content:space-between; color:var(--nibe-muted); }
  .metric-top .arrow { width:16px; height:16px; --mdc-icon-size:16px; opacity:.55; }
  .metric strong { font-size:24px; font-weight:550; letter-spacing:-.03em; line-height:1.3; overflow-wrap:anywhere; }
  .metric small { display:block; color:var(--nibe-muted); margin-top:3px; font-size:12px; }
  .autopilot { padding:14px 8px; }
  .switch { padding:3px; width:48px; height:28px; border-radius:999px; background:color-mix(in srgb,var(--nibe-muted) 30%,transparent); flex:0 0 48px; }
  .switch span { display:block; width:22px; height:22px; border-radius:50%; background:var(--nibe-surface); box-shadow:0 1px 3px #0002; transition:transform .15s; }
  .switch[aria-checked=true] { background:var(--status-success-color); }
  .switch[aria-checked=true] span { transform:translateX(20px); }
  .switch-hit { padding:8px 0 8px 12px; display:flex; align-items:center; min-height:44px; }
  nav { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:4px; padding:5px; background:color-mix(in srgb,var(--primary-text-color) 5%,transparent); border-radius:var(--tile-border-radius); position:relative; z-index:1; }
  nav button { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; min-height:60px; padding:8px 4px; background:transparent; border-radius:calc(var(--tile-border-radius) - 3px); font-size:11px; color:var(--nibe-muted); }
  nav button[aria-current=page] { background:var(--nibe-surface); color:var(--primary-text-color); box-shadow:0 2px 8px #0001; }
  .section-title { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:4px 8px 0; }
  h2 { font-size:18px; margin:0; letter-spacing:-.025em; font-weight:650; }
  h3 { font-size:13px; margin:0 0 12px; font-weight:650; }
  .hint { font-size:12px; color:var(--nibe-muted); line-height:1.6; margin:0; padding:0 8px; }
  .group { padding:18px; }
  .rows { display:grid; gap:0; }
  .data-row { display:flex; align-items:center; justify-content:space-between; width:100%; min-height:42px; gap:18px; font-size:12px; background:transparent; text-align:left; padding:7px 0; border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 7%,transparent); }
  .data-row:last-child { border-bottom:0; }
  .data-row span { color:var(--nibe-muted); }
  .data-row b { text-align:right; font-weight:550; overflow-wrap:anywhere; max-width:60%; }
  .text-button { font-size:12px; color:var(--primary-color,var(--status-active-color)); min-height:44px; background:transparent; padding:8px; border-radius:8px; }
  .room { padding:16px 18px; }
  .room-top { display:flex; align-items:center; gap:10px; margin-bottom:15px; }
  .room-top .room-title { flex:1; min-width:0; font-size:14px; font-weight:600; overflow-wrap:anywhere; }
  .room-top .room-temp { font-size:20px; font-weight:550; letter-spacing:-.03em; white-space:nowrap; }
  .room-state { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--nibe-muted); }
  .room-state .dot { width:5px; height:5px; }
  .room.heating .room-state { color:var(--status-heat-color); }
  .room.heating .dot { background:var(--status-heat-color); }
  .rooms { display:grid; gap:var(--large-gap); }
  .notice { border-radius:var(--tile-border-radius); padding:12px 14px; font-size:12px; line-height:1.6; background:color-mix(in srgb,var(--status-warn-color) 9%,var(--nibe-surface)); border:1px solid color-mix(in srgb,var(--status-warn-color) 25%,transparent); }
  .notice strong { display:block; font-weight:650; margin-bottom:3px; }
  .notice.error { background:color-mix(in srgb,var(--status-alert-color) 8%,var(--nibe-surface)); border-color:color-mix(in srgb,var(--status-alert-color) 25%,transparent); }
  .feedback { font-size:12px; line-height:1.5; color:var(--nibe-muted); padding:0 8px; margin:0; }
  .feedback.error { color:var(--error-color,var(--status-alert-color)); }
  .settings { display:grid; gap:18px; }
  .chip { font-size:11px; color:var(--nibe-muted); background:color-mix(in srgb,var(--primary-text-color) 6%,transparent); padding:5px 8px; border-radius:var(--chip-border-radius); }
  details { padding:0 8px; }
  summary { cursor:pointer; padding:14px 0; min-height:44px; font-size:13px; font-weight:600; }
  .history { display:grid; gap:var(--large-gap); }
  @container (min-width:600px) { .rooms { grid-template-columns:repeat(2,minmax(0,1fr)); } .comfort { padding:28px; } }
  @container (max-width:340px) { .comfort { padding:18px 14px; } .metric { padding:14px; } .setting-row { flex-wrap:wrap; } .comfort-footer { gap:6px; } .stepper button { width:38px; } .stepper output { min-width:44px; } }
  @media (prefers-reduced-motion:reduce) { * { animation:none!important; transition:none!important; } }
`;
