'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from './input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchLinkInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        if (!e.target.value) params.delete("search");
        else params.set("search", e.target.value);

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative w-full md:w-72 md:max-w-72">
            <SearchIcon
                className="absolute mt-4 ml-2 -translate-y-1/3 transform text-neutral-400"
                size={16}
            />
            <Input
                type="search"
                autoComplete="off"
                placeholder="Search links"
                className="pl-9 h-9 w-full rounded-md border border-neutral-300  
                 text-sm transition-colors file:border-0 
                 placeholder:text-neutral-500  focus-visible:ring-1 ring-offset-0! outline-offset-0
                 focus-visible:ring-neutral-300 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={handleSearch}
                defaultValue={searchParams.get("search")?.toString()}
            />
        </div>
    );
};
