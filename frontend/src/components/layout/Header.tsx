interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <div className="header-container">
        <h1>{title}</h1>
        {text && <p className="subtitle">{text}</p>}
      </div>
    </header>
  );
}

export default Header;
