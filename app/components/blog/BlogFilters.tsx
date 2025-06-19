'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface BlogFiltersProps {
  technologies: string[];
  onFilterChange: (filters: {
    sortBy: 'newest' | 'oldest';
    technology: string;
  }) => void;
}

export default function BlogFilters({ technologies, onFilterChange }: BlogFiltersProps) {
  const t = useTranslations('Blog');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const handleSortChange = (value: 'newest' | 'oldest') => {
    setSortBy(value);
    onFilterChange({ sortBy: value, technology: selectedTech });
  };

  const handleTechChange = (tech: string) => {
    setSelectedTech(tech);
    onFilterChange({ sortBy, technology: tech });
  };

  return (
    <div className="flex flex-row justify-between md:justify-start md:flex-col gap-4 p-4 bg-[var(--NavBar-bg)] shadow-[0_0.5em_1em_#0003] rounded-lg backdrop-blur-sm">
      {/* Filtro por fecha */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[var(--Grey-Dark)] font-semibold">{t('sortBy')}:</span>
        <select 
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest')}
          className="px-3 py-2 rounded-lg border border-[var(--Grey)] bg-white dark:bg-gray-800 text-[var(--Grey-Dark)] focus:outline-none focus:ring-2 focus:ring-[var(--Blue)]"
        >
          <option value="newest">{t('newest')}</option>
          <option value="oldest">{t('oldest')}</option>
        </select>
      </div>

      {/* Filtro por tecnología */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-[var(--Grey-Dark)] font-semibold">{t('filterBy')}:</span>
        <select 
          value={selectedTech}
          onChange={(e) => handleTechChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--Grey)] bg-white dark:bg-gray-800 text-[var(--Grey-Dark)] focus:outline-none focus:ring-2 focus:ring-[var(--Blue)]"
        >
          <option value="all">{t('allTechnologies')}</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>
    </div>
  );
} 