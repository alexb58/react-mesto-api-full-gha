import React from "react";

import logo from '../resources/images/header-logo.svg';

function Header () {
    return (
        <header className="header">
            <img src={ logo } className="header__logo" alt="логотип место" />
        </header>
    );
}

export default Header;