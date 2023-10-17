export const dateDayDiff = (d: Date, days: number): Date => {
    const res = new Date(d);
    res.setDate(res.getDate() + days);
    return res;
};


export const codeToFiles = (code: Record<string, unknown>): Record<string, string> => {
    return Object.entries(code).reduce((res, [key, value]) => {
        if (typeof value === 'string') {
            res[key] = value;
        }
        else if (typeof value === 'object' && value !== null) {
            const subfolder = codeToFiles(value as Record<string, unknown>);
            Object.entries(subfolder).forEach(([filePath, content]) => res[`${key}/${filePath}`] = content);
        }
        return res;
    }, {} as Record<string, string>);
};


export const localize = (obj: Record<string, string> | string | undefined, locale: string): string => {
    if (!obj)
        return '';

    if (typeof obj === 'string')
        return obj;

    if (locale in obj)
        return obj[locale];

    if (locale.substring(0, 2) in obj)
        return obj[locale.substring(0, 2)];

    const [firstLocale] = Object.keys(obj);
    return obj[firstLocale];
};
