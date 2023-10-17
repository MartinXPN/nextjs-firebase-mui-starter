'use client';

// Polyfill for array.at
console.log('Adding array.at polyfill');
export function at<T>(this: Array<T> | String, n: number) {
    n = Math.trunc(n) || 0;         // ToInteger() abstract op
    if (n < 0)                      // Allow negative indexing from the end
        n += this.length;

    return n < 0 || n >= this.length ? undefined : this[n];
}

for (const C of [Array, String]) {
    Object.defineProperty(C.prototype, 'at', {
        value: at, writable: true, enumerable: false, configurable: true
    });
}
