function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
        <p>NoteAl © {year}</p>
    </footer>
  );
}

export default Footer;
