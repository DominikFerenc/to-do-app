interface MenuListProps {
  id: number;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function MenuList({ id, onDelete, onEdit }: MenuListProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
      <button
        onClick={onEdit}
        className="block px-4 py-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-left"
      >
        Edytuj zadanie
      </button>
      <button
        onClick={() => onDelete(id)}
        className="block px-4 py-2 text-gray-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-left"
      >
        Usuń zadanie
      </button>
    </div>
  );
}
