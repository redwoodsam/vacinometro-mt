import React from 'react';
import './Footer.css';
import { LinkedIn, GitHub } from '@mui/icons-material';

// Rodapé da página
function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-items">
                <h4 className="app-footer-copyright">Criado por Samuel Araujo @ {new Date().getFullYear()}</h4>
                <span className="social-icons">
                    <a href="https://www.linkedin.com/in/samuel-araujo-4b570b193/" target="_blank" rel='noreferrer'>
                        <LinkedIn />
                    </a>
                    <a href="https://www.github.com/redwoodsam/" target="_blank" rel='noreferrer'>
                        <GitHub />
                    </a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
