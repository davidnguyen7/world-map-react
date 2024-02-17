export function debounce(func, ms) {
    let timeout;
    const callDebounceFunction = (...args) => {
        if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
        }
        timeout = window.setTimeout(() => func(...args), ms);
    };

    return callDebounceFunction;
}