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
    const [isTechListVisible, setIsTechListVisible] = useState(false);

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
        <aside className="flex flex-col w-full min-[50rem]:w-[250px] h-fit p-4 bg-[var(--NavBar-bg)] rounded-lg backdrop-blur-sm self-start min-[50rem]:sticky top-24">
            {/* Sección para ordenar por fecha con el nuevo diseño */}
            <div className="mb-6">
                <h3 className="font-semibold text-[var(--Grey-Dark)] mb-3">{t('sortBy')}</h3>
                <div className="flex flex-col gap-2 text-[var(--Grey-Dark)]">
                    <label className="relative flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="sort"
                            value="newest"
                            checked={sortBy === 'newest'}
                            onChange={() => handleSortChange('newest')}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-transparent border-2 border-[var(--Blue)] rounded-full transition duration-300 ease-in-out peer-checked:bg-[var(--Blue)] peer-checked:border-[var(--Blue)] peer-hover:shadow-lg peer-hover:shadow-blue-500/50 peer-checked:shadow-lg peer-checked:shadow-blue-500/50"></div>
                        <span className="ml-2 text-[var(--Grey-Dark)]">{t('newest')}</span>
                    </label>

                    <label className="relative flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="sort"
                            value="oldest"
                            checked={sortBy === 'oldest'}
                            onChange={() => handleSortChange('oldest')}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 bg-transparent border-2 border-[var(--Blue)] rounded-full transition duration-300 ease-in-out peer-checked:bg-[var(--Blue)] peer-checked:border-[var(--Blue)] peer-hover:shadow-lg peer-hover:shadow-blue-500/50 peer-checked:shadow-lg peer-checked:shadow-blue-500/50"></div>
                        <span className="ml-2 text-[var(--Grey-Dark)]">{t('oldest')}</span>
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
                        <ul className="space-y-2 border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">
                            {technologies.map(tech => (
                                <li key={tech}>
                                    <label className="group flex items-center cursor-pointer">
                                        <input
                                            className="hidden peer"
                                            type="checkbox"
                                            checked={selectedTechs.includes(tech)}
                                            onChange={() => handleTechChange(tech)}
                                        />
                                        <span className="relative w-5 h-5 flex justify-center items-center bg-transparent border-2 border-gray-400 dark:border-gray-500 rounded-md shadow-sm transition-all duration-300 peer-checked:border-[var(--Blue)] peer-checked:bg-[var(--Blue)] peer-hover:scale-105">
                                            <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-300"></span>
                                            <svg fill="currentColor" viewBox="0 0 20 20" className="hidden w-4 h-4 text-white peer-checked:block" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" fillRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <span className="ml-3 text-[var(--Grey-Dark)] group-hover:text-[var(--Blue)] font-medium transition-colors duration-300">
                                            {tech}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col mt-2">
                            <span className="text-sm font-semibold text-[var(--Grey-Dark)]">
                                {selectedTechs.length} {t('selected')}
                            </span>
                            {selectedTechs.length > 0 && (
                                <button onClick={handleClearAll} className="text-sm text-[var(--Blue)] hover:underline cursor-pointer text-start">
                                    {t('clearAll')}
                                </button>
                            )}
                        </div>

                        {selectedTechs.length > 0 && (
                            <ul className="mt-2 space-y-1">
                                {selectedTechs.map(tech => (
                                    <li key={`selected-${tech}`} className="text-sm text-[var(--Grey-Dark)]">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </aside>
    );
} 