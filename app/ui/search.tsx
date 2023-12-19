'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { eventNames } from 'process';
import { useDebouncedCallback } from 'use-debounce';

const ESPERA_PARABUSCAR = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  /* console.log(searchParams.get('name')) */
  const pathname = usePathname()
  const {replace } = useRouter();
  

  //Paso a la url patchname los cambios de search para buscar
  const handleSearch = useDebouncedCallback ((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term){
      params.set('query', term)

    } else {
      params.delete('query')
    }
    params.set('page', '1')


    replace(`${pathname}?${params.toString()}`);
  }, ESPERA_PARABUSCAR)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => handleSearch(event.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
