/**
 * EIP.AI — Disclaimer Gate
 * Inject this script in every HTML page before </body>
 * Usage: <script src="disclaimer.js"></script>
 */
(function(){
  'use strict';
  const STORAGE_KEY = 'eip_disclaimer_accepted';
  const ACCEPTED_VAL = '1';

  // If already accepted, do nothing
  if(sessionStorage.getItem(STORAGE_KEY) === ACCEPTED_VAL) return;

  // Detect dark mode (inherit from page or system)
  const isDark = document.documentElement.classList.contains('dark') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #eip-disc-overlay {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      background: ${isDark ? 'rgba(13,13,11,0.88)' : 'rgba(250,248,244,0.88)'};
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      padding: 1.5rem;
      font-family: 'Geist', 'system-ui', sans-serif;
      animation: eip-disc-fade-in .25s ease both;
    }
    @keyframes eip-disc-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    #eip-disc-box {
      max-width: 580px; width: 100%;
      background: ${isDark ? '#161614' : '#faf8f4'};
      border: 1px solid ${isDark ? 'rgba(240,237,230,0.10)' : 'rgba(10,10,8,0.10)'};
      border-radius: 4px;
      overflow: hidden;
      animation: eip-disc-slide-up .3s ease both;
    }
    @keyframes eip-disc-slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #eip-disc-head {
      padding: 1.75rem 2rem 0;
      display: flex; flex-direction: column; gap: .5rem;
    }
    #eip-disc-eyebrow {
      font-family: 'Geist Mono', 'monospace', monospace;
      font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
      color: ${isDark ? '#6b6760' : '#7a7570'};
    }
    #eip-disc-title {
      font-family: 'Editorial New', 'Georgia', serif;
      font-size: clamp(22px, 4vw, 30px);
      font-weight: 300; font-style: italic;
      line-height: 1.12; letter-spacing: -.02em;
      color: ${isDark ? '#ffffff' : '#000000'};
      margin: 0;
    }
    #eip-disc-rule {
      margin: 1.5rem 2rem 0;
      border: none; border-top: 1px solid ${isDark ? 'rgba(240,237,230,0.08)' : 'rgba(10,10,8,0.08)'};
    }
    #eip-disc-body {
      padding: 1.25rem 2rem;
      display: flex; flex-direction: column; gap: .9rem;
    }
    .eip-disc-clause {
      display: flex; gap: .75rem; align-items: flex-start;
    }
    .eip-disc-num {
      font-family: 'Geist Mono', 'monospace', monospace;
      font-size: 11px; color: ${isDark ? '#6b6760' : '#7a7570'};
      flex-shrink: 0; margin-top: 2px; width: 18px;
    }
    .eip-disc-text {
      font-size: 13px; line-height: 1.55;
      color: ${isDark ? '#c8c4bc' : '#3d3a35'};
    }
    .eip-disc-text strong {
      font-weight: 500;
      color: ${isDark ? '#e0dcd4' : '#000000'};
    }
    #eip-disc-footer {
      padding: .75rem 2rem 1.75rem;
      display: flex; flex-direction: column; gap: .85rem;
    }
    #eip-disc-accept {
      width: 100%;
      background: #000000; color: #ffffff;
      border: none; border-radius: 3px;
      padding: .75rem 1.5rem;
      font-family: 'Geist Mono', 'monospace', monospace;
      font-size: 12px; letter-spacing: .05em; text-transform: uppercase;
      cursor: pointer; transition: background .15s, transform .1s;
    }
    html.dark #eip-disc-accept,
    #eip-disc-accept {
      background: ${isDark ? '#ffffff' : '#000000'};
      color: ${isDark ? '#000000' : '#ffffff'};
    }
    #eip-disc-accept:hover { opacity: .88; }
    #eip-disc-accept:active { transform: scale(.98); }
    #eip-disc-decline {
      text-align: center;
      font-family: 'Geist Mono', 'monospace', monospace;
      font-size: 11px; letter-spacing: .04em;
      color: ${isDark ? '#55524e' : '#aaa9a4'};
      cursor: pointer; text-decoration: none;
      background: none; border: none; width: 100%;
      transition: color .15s;
    }
    #eip-disc-decline:hover {
      color: ${isDark ? '#8a8680' : '#3d3a35'};
    }
    #eip-disc-stamp {
      margin: 0 2rem 1.25rem;
      padding: .75rem 1rem;
      background: ${isDark ? 'rgba(245,158,11,0.06)' : 'rgba(245,158,11,0.06)'};
      border: 1px solid ${isDark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.20)'};
      border-radius: 3px;
      display: flex; align-items: flex-start; gap: .65rem;
    }
    #eip-disc-stamp-icon {
      font-size: 13px; flex-shrink: 0; margin-top: 1px;
    }
    #eip-disc-stamp-text {
      font-family: 'Geist Mono', 'monospace', monospace;
      font-size: 11px; line-height: 1.5;
      color: ${isDark ? 'rgba(245,158,11,0.75)' : 'rgba(180,115,20,0.90)'};
    }
    @media (max-width: 480px) {
      #eip-disc-head  { padding: 1.25rem 1.25rem 0; }
      #eip-disc-rule  { margin: 1.25rem 1.25rem 0; }
      #eip-disc-body  { padding: 1rem 1.25rem; }
      #eip-disc-footer { padding: .5rem 1.25rem 1.5rem; }
      #eip-disc-stamp  { margin: 0 1.25rem 1rem; }
    }
  `;
  document.head.appendChild(style);

  // ── HTML ────────────────────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'eip-disc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'eip-disc-title');
  overlay.innerHTML = `
    <div id="eip-disc-box">

      <div id="eip-disc-head">
        <div id="eip-disc-eyebrow">eip.ai — disclaimer &amp; terms of access</div>
        <h1 id="eip-disc-title">before you continue.</h1>
      </div>

      <hr id="eip-disc-rule"/>

      <div id="eip-disc-body">
        <div class="eip-disc-clause">
          <span class="eip-disc-num">01</span>
          <p class="eip-disc-text">
            <strong>Not financial advice.</strong>
            All content on this site — including agent outputs, market signals, projections,
            and strategy commentary — is for <strong>informational purposes only</strong>
            and does not constitute financial, investment, legal, or professional advice of any kind.
          </p>
        </div>
        <div class="eip-disc-clause">
          <span class="eip-disc-num">02</span>
          <p class="eip-disc-text">
            <strong>No guarantees.</strong>
            Past performance of any strategy, protocol, or model described here
            does not imply future results. All figures are illustrative and subject to change
            without notice.
          </p>
        </div>
        <div class="eip-disc-clause">
          <span class="eip-disc-num">03</span>
          <p class="eip-disc-text">
            <strong>High risk.</strong>
            Autonomous agents, on-chain execution, and digital assets carry
            <strong>substantial risk of loss</strong>. You may lose all capital you deploy.
            Only act with funds you can afford to lose entirely.
          </p>
        </div>
        <div class="eip-disc-clause">
          <span class="eip-disc-num">04</span>
          <p class="eip-disc-text">
            <strong>Experimental software.</strong>
            EIP.AI is in active development. Functionality is subject to change,
            interruption, or termination at any time without prior notice.
          </p>
        </div>
        <div class="eip-disc-clause">
          <span class="eip-disc-num">05</span>
          <p class="eip-disc-text">
            <strong>Your responsibility.</strong>
            By accessing this site you confirm you are of legal age in your jurisdiction,
            understand the risks outlined above, and accept sole responsibility for any
            decisions or actions you take.
          </p>
        </div>
      </div>

      <div id="eip-disc-stamp">
        <span id="eip-disc-stamp-icon">⚠</span>
        <span id="eip-disc-stamp-text">
          Crypto markets operate 24/7 and are highly volatile.
          Regulatory status of digital assets varies by jurisdiction.
          Consult a qualified professional before taking any action.
        </span>
      </div>

      <div id="eip-disc-footer">
        <button id="eip-disc-accept">I understand — continue to site</button>
        <button id="eip-disc-decline">I do not accept — leave</button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // Block scroll while overlay is visible
  document.body.style.overflow = 'hidden';

  // ── Logic ───────────────────────────────────────────────────────────────────
  document.getElementById('eip-disc-accept').addEventListener('click', function(){
    sessionStorage.setItem(STORAGE_KEY, ACCEPTED_VAL);
    overlay.style.animation = 'eip-disc-fade-in .2s ease reverse both';
    setTimeout(function(){ overlay.remove(); }, 200);
    document.body.style.overflow = '';
  });

  document.getElementById('eip-disc-decline').addEventListener('click', function(){
    // Navigate to a neutral external page
    window.location.href = 'https://www.google.com';
  });

})();
