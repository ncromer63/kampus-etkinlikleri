import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div className="filtre-grup">
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="filtre-grup">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;
