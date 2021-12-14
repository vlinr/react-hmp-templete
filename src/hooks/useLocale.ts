import intl from 'react-intl-universal';

function useLocale(name: string, values?: { [key: string]: any }): string {
    if (!name) return '';

    return intl.get(name, values) || name;
}

export default useLocale;
