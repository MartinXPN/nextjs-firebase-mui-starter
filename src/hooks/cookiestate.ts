import {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {getCookie, setCookie} from 'cookies-next';
import {ClientCookiesContext} from "@/components/common/ClientCookieContext";
import useAsyncEffect from "@/hooks/asynceffect";

/**
 * Save the result of setState as a cookie
 * @param defaultValue the default value to use if it's accessed for the first time
 * @param key which string to use for saving the value
 */
export function useCookieState<T extends string>(defaultValue: T, key: string): [T, Dispatch<SetStateAction<T>>] {
    const cookies = useContext(ClientCookiesContext);
    const [value, setValue] = useState<T>(() => {
        const storageValue = typeof window !== 'undefined' ? getCookie(key) : cookies[key];
        return typeof storageValue !== 'string' ? defaultValue : storageValue as T;
    });
    useEffect(() => {
        const storageValue = getCookie(key);
        setValue(typeof storageValue !== 'string' ? defaultValue : storageValue as T);
    }, [defaultValue, key]);

    // Update the value
    useAsyncEffect(async () => setCookie(key, value), [value, key]);
    return [value, setValue];
}

export function useJSONCookieState<T>(defaultValue: T, key: string): [T, Dispatch<SetStateAction<T>>] {
    const cookies = useContext(ClientCookiesContext);
    const [value, setValue] = useState<T>(() => {
        const storageValue = typeof window !== 'undefined' ? getCookie(key) : cookies[key];
        return typeof storageValue !== 'string' ? defaultValue : JSON.parse(storageValue) as T;
    });
    useEffect(() => {
        const storageValue = getCookie(key);
        setValue(typeof storageValue !== 'string' ? defaultValue : JSON.parse(storageValue) as T);
    }, [JSON.stringify(defaultValue), key]);

    // Update the value
    useAsyncEffect(async () => setCookie(key, JSON.stringify(value)), [JSON.stringify(value), key]);
    return [value, setValue];
}
