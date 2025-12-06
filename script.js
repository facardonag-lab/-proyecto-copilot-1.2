// ============================================
// SCRIPT.JS - Funcionalidad Interactiva del Blog
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Activa la animación de los links de navegación
    setupNavigation();
    
    // Activa el efecto de scroll
    setupScrollEffects();
});

// ============================================
// NAVEGACIÓN
// ============================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover clase activa de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase activa al link clickeado
            this.classList.add('active');
        });
    });
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de posts
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => observer.observe(card));
    
    // Observar secciones
    const sections = document.querySelectorAll('.posts-section, .about-section');
    sections.forEach(section => observer.observe(section));
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// ANIMACIÓN DE CARGA
// ============================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ============================================
// RESALTE DEL LINK ACTIVO EN NAVEGACIÓN
// ============================================

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// FUNCIONES PARA LOS POSTS
// ============================================

// Función para mostrar diagramas interactivos (se usa en los posts)
function createGraphDiagram(canvasId, nodes, edges) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpiar canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Dibujar edges (aristas)
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    edges.forEach(edge => {
        const [from, to] = edge;
        const nodeFrom = nodes[from];
        const nodeTo = nodes[to];
        
        ctx.beginPath();
        ctx.moveTo(nodeFrom.x, nodeFrom.y);
        ctx.lineTo(nodeTo.x, nodeTo.y);
        ctx.stroke();
    });
    
    // Dibujar nodes (nodos)
    ctx.fillStyle = '#e74c3c';
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    
    nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Dibujar label del nodo
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
        ctx.fillStyle = '#e74c3c';
    });
}

// Función para copiar código
function copyCode(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copiado!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// ============================================
// ANIMACIÓN CSS PARA FADE-IN
// ============================================

const style = document.createElement('style');
style.textContent = `
    .post-card {
        opacity: 0;
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Script cargado exitosamente');
