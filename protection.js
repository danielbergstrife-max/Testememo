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

    // 3. Anti-Debugger (Dificulta o uso do console aberto)
    setInterval(function() {
        (function() {
            return false;
        }
        ['constructor']('debugger')
        ['call']());
    }, 500);

    // 4. Bloquear Arrastar Imagens/Elementos
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    }, false);

    console.log("%cMemoEnglish Premium: Sistema Protegido", "color: #6366f1; font-size: 20px; font-weight: bold;");
})();
