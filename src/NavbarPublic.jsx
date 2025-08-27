import React from 'react';
import { Link } from 'react-router-dom';

function NavbarPublic() {
  return (
    <nav className="bg-white shadow-md p-6 pl-20">
        <img
          className="w-20"
          src="src/logo.jpg"
          alt="Amazon"
        />
    </nav>
  );
}
export default NavbarPublic;
