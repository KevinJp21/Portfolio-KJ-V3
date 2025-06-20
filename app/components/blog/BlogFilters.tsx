'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface BlogFiltersProps {
    technologies: string[];
    onFilterChange: (filters: {
        sortBy: 'newest' | 'oldest';
        technologies: string[];
    }) => void;
}

export default function BlogFilters({ technologies, onFilterChange }: BlogFiltersProps) {
    const t = useTranslations('Blog');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
    const [isTechListVisible, setIsTechListVisible] = useState(true);

    const handleSortChange = (value: 'newest' | 'oldest') => {
        setSortBy(value);
        onFilterChange({ sortBy: value, technologies: selectedTechs });
    };

    const handleTechChange = (tech: string) => {
        const newSelectedTechs = selectedTechs.includes(tech)
            ? selectedTechs.filter(t => t !== tech)
            : [...selectedTechs, tech];

        setSelectedTechs(newSelectedTechs);
        onFilterChange({ sortBy, technologies: newSelectedTechs });
    };

    const handleClearAll = () => {
        setSelectedTechs([]);
        onFilterChange({ sortBy, technologies: [] });
    };

    return (
        <aside className="flex flex-col w-full md:w-[250px] p-4 bg-[var(--NavBar-bg)] rounded-lg backdrop-blur-sm self-start sticky top-24">
            {/* Sección para ordenar por fecha */}
            <div className="mb-6">
                <h3 className="font-semibold text-[var(--Grey-Dark)] mb-3">{t('sortBy')}</h3>
                <div className="flex flex-col gap-2 text-[var(--Grey-Dark)]">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="sort" value="newest" checked={sortBy === 'newest'} onChange={() => handleSortChange('newest')} className="w-4 h-4 text-[var(--Blue)] focus:ring-[var(--Blue)] border-gray-300" />
                        {t('newest')}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="sort" value="oldest" checked={sortBy === 'oldest'} onChange={() => handleSortChange('oldest')} className="w-4 h-4 text-[var(--Blue)] focus:ring-[var(--Blue)] border-gray-300" />
                        {t('oldest')}
                    </label>
                </div>
            </div>

            {/* Sección para filtrar por tecnología (desplegable) */}
            <div>
                <button
                    onClick={() => setIsTechListVisible(!isTechListVisible)}
                    className="w-full flex justify-between items-center py-2 text-left font-semibold text-[var(--Grey-Dark)] cursor-pointer"
                >
                    <span>{t('filterByTech')}</span>
                    <svg className={`w-5 h-5 transition-transform ${isTechListVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {isTechListVisible && (
                    <div className="mt-2 pl-1">
                        <ul className="max-h-48 overflow-y-auto space-y-1 border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">
                            {technologies.map(tech => (
                                <li key={tech}>
                                    <label className="flex items-center gap-2 cursor-pointer text-[var(--Grey-Dark)]">
                                        <input type="checkbox" checked={selectedTechs.includes(tech)} onChange={() => handleTechChange(tech)} className="w-4 h-4 rounded text-[var(--Blue)] focus:ring-transparent border-gray-300" />
                                        {tech}
                                    </label>
                                </li>
                            ))}
                        </ul>


                        {selectedTechs.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-semibold text-[var(--Grey-Dark)]">
                                        {selectedTechs.length} {t('selected')}
                                    </span>
                                    {selectedTechs.length > 0 && (
                                        <button onClick={handleClearAll} className="text-sm text-[var(--Blue)] hover:underline cursor-pointer">
                                            {t('clearAll')}
                                        </button>
                                    )}
                                </div>
                                <ul className="mt-2 space-y-1">
                                    {selectedTechs.map(tech => (
                                        <li key={`selected-${tech}`} className="text-sm text-[var(--Grey-Dark)]">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
} 