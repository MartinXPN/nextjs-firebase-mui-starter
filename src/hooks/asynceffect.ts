import {DependencyList, useEffect} from "react";

type AsyncEffect<T> = (isMounted: () => boolean) => T | Promise<T>;
type AsyncDestroy<T> = (result?: T) => void;

export default function useAsyncEffect(
    effect: AsyncEffect<unknown>,
    deps?: DependencyList,
): void;
export default function useAsyncEffect<T>(
    effect: AsyncEffect<T>,
    destroy?: AsyncDestroy<T>,
    deps?: DependencyList,
): void;

export default function useAsyncEffect<T>(
    effect: AsyncEffect<T>,
    destroyOrDeps?: AsyncDestroy<T> | DependencyList,
    deps?: DependencyList,
) {
    const destroy = typeof destroyOrDeps === "function" ? destroyOrDeps : undefined;
    const inputs = destroy ? deps : destroyOrDeps as DependencyList | undefined;

    useEffect(() => {
        let mounted = true;
        let result: T | undefined;

        Promise.resolve(effect(() => mounted)).then(value => {
            result = value;
        });

        return () => {
            mounted = false;
            destroy?.(result);
        };
    }, inputs);
}
