/**
 * MemoEnglish - Proteção de Código Fonte
 * Este script implementa travas para dificultar a cópia e inspeção do sistema.
 */
(function() {
    'use strict';

    // 1. Bloquear Clique Direito (Menu de Contexto)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);

    // 2. Bloquear Atalhos de Teclado
    document.addEventListener('keydown', function(e) {
        // Bloquear F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }

        // Bloquear Ctrl+Shift+I (Inspecionar)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }

        // Bloquear Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }

        // Bloquear Ctrl+U (Ver Código Fonte)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }

        // Bloquear Ctrl+S (Salvar Página)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Bloquear Ctrl+C (Copiar) - Reforço ao CSS
        if (e.ctrlKey && e.keyCode === 67) {
            // Permitir copiar apenas em inputs/textareas
            if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                return false;
            }
        }
    }, false);

    // 3. Anti-Debugger mais agressivo
    const killInterface = function() {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:white;font-family:sans-serif;text-align:center;padding:20px;"><div><h1 style="font-size:3rem;margin-bottom:20px;">⚠️ ACESSO NEGADO</h1><p style="font-size:1.2rem;opacity:0.8;">O uso de ferramentas de desenvolvedor é proibido neste sistema.</p><button onclick="location.reload()" style="margin-top:30px;padding:12px 24px;background:#6366f1;border:none;border-radius:8px;color:white;font-weight:bold;cursor:pointer;">Tentar Novamente</button></div></div>';
        throw new Error("DevTools Detectado");
    };

    // Detecção por redimensionamento (comum quando o console abre lateralmente)
    let devtoolsOpen = false;
    const threshold = 160;
    setInterval(() => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        if (widthDiff || heightDiff) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                killInterface();
            }
        }
    }, 1000);

    // Detecção por debugger timing
    setInterval(function() {
        const startTime = performance.now();
        debugger;
        const endTime = performance.now();
        if (endTime - startTime > 100) {
            killInterface();
        }
    }, 1000);

    // 4. Bloqueio de Execução Local (Se o arquivo for salvo e aberto no PC)
    if (window.location.protocol === 'file:') {
        window.location.href = "about:blank";
    }

    // 5. Bloquear Arrastar Imagens/Elementos
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }, false);

    console.log("%cMemoEnglish Premium: Sistema Protegido", "color: #6366f1; font-size: 20px; font-weight: bold;");
})();
