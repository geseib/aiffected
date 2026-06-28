const LINKS = [
  ['mechanism', 'The mechanism'],
  ['simulator', 'Simulator'],
  ['sectors', 'The jobs'],
  ['society', 'Society'],
  ['watch', 'What to watch'],
];

export default function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#top">
        <span className="brand-mark">ai</span>ffected
      </a>
      <div className="nav-links">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
