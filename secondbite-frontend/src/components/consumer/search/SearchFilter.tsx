import { useRef, type ChangeEvent, type SyntheticEvent } from 'react';
import SearchIcon from '../../icons/SearchIcon';

interface SearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SearchFilter = ({ setSearchTerm }: SearchProps) => {
  const resetForm = useRef<HTMLFormElement>(null);
  const lastChange = useRef<number | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (lastChange.current) clearTimeout(lastChange.current);

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;

    if (!search) setSearchTerm(undefined);

    if (lastChange.current && search) {
      setSearchTerm(search);
      clearTimeout(lastChange.current);
    }
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full relative" ref={resetForm}>
      <div>
        <div className="flex">
          <input
            type="search"
            name="search"
            placeholder="Buscar frutas, legumes..."
            className="w-full block px-4 pl-11 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 focus-within:outline focus-within:outline-gray-300"
            onChange={handleChange}
          />

          <SearchIcon className="text-primary/80 z-10 absolute top-1/2 -translate-y-1/2 left-3 size-5" />
        </div>
      </div>
    </form>
  );
};
