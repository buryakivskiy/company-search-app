import { SEARCH_MESSAGES } from '@/shared/constants/messages';

import type { Dispatch, SetStateAction } from 'react';

interface Props {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

export function SavedCompaniesPagination({ currentPage, setPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center pt-4 border-t border-gray-300 flex-shrink-0">
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SEARCH_MESSAGES.PREVIOUS_BUTTON}
      </button>

      <span className="text-sm text-gray-600">{SEARCH_MESSAGES.PAGE_OF} {currentPage} av {totalPages}</span>

      <button
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SEARCH_MESSAGES.NEXT_BUTTON}
      </button>
    </div>
  );
}
