import React from "react";

const Footer = ({ length }) => {
  return (
    <footer>
      {length} List of {length === 1 ? "item" : "items"}
    </footer>
  );
};
export default Footer;
