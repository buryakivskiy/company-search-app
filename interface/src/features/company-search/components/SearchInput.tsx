import { SEARCH_MESSAGES } from '@/shared/constants/messages';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={SEARCH_MESSAGES.SEARCH_PLACEHOLDER}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
