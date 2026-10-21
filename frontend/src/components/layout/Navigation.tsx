import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <div className="header-container nav-container">
        {menuItems.map((item) => {
          const isActive = current === item.name;
          return (
            <a
              key={item.name}
              href={`#${item.name}`}
              className={isActive ? "active" : undefined}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
