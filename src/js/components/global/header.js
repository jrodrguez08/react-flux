'use strict';

import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <ul className="header__list">
                        <li className="header__item">Home</li>
                        <li className="header__item">About</li>
                    </ul>
                </nav>
            </header>
        );
    }
}