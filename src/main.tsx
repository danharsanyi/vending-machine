import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './views/index';
import './main.css';

window.addEventListener( 'DOMContentLoaded', () => {
    const $_app = document.querySelector( '[data-hook=app]' );
    ReactDOM.render( <App />, $_app );
});

if ( import.meta.hot ) {
    import.meta.hot.accept();
}