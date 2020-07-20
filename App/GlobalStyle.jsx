/**
 * @File on styled-components based global style component
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* { margin: 0; padding: 0; box-sizing: border-box; }
	html { height: 100%; }
	html, body {
		margin: 0;
		padding: 0;
		width: 100%;
		font: 1rem 'Roboto';
	}
	body {
		position: relative;
		min-height: 100%;
		color: #2d3436;
		background: #dfe6e9;
	}
	h1 { font-size: 1.9rem; }
	h2 { font-size: 1.9rem; }
	h3 { font-size: 1.64rem; }
	h4 { font-size: 1.43rem; }
	h5 { font-size: 1.28rem; }
	h6 { font-size: 1.18rem; }
	h1, h2, h3, h4, h5, h6 { margin-bottom: 0.6em; color: inherit; font-weight: 400; }

	span, label, p { margin-bottom: 0.5rem;
		&:last-child { margin-bottom: 0; }
	}
	a { color: inherit;
		&:hover { text-decoration: underline; }
	}

	li { list-style-type: none; }
`;

export default GlobalStyle;
