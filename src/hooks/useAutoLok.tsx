import { useCallback, useEffect, useRef } from "react";

// Hook contract:
// inputs: onLock callback, optional timeout (ms)
// output: an object with `reset` and `clear` methods so callers can control the timer
export function useAutoLock(onLock: () => void, timeout = 10000) {
	// Use number for browser setTimeout return type
		const timer = useRef<number | null>(null);

	const clear = useCallback(() => {
		if (timer.current !== null) {
			clearTimeout(timer.current);
			timer.current = null;
		}
	}, []);

	const reset = useCallback(() => {
		clear();
		timer.current = window.setTimeout(() => {
			onLock();
			timer.current = null;
		}, timeout);
	}, [clear, onLock, timeout]);

	useEffect(() => {
		const handleActivity = () => reset();
		const handleVisibility = () => {
			if (document.hidden) onLock();
			else reset();
		};

		window.addEventListener("mousemove", handleActivity);
		window.addEventListener("keydown", handleActivity);
		document.addEventListener("visibilitychange", handleVisibility);

		// start the timer
		reset();

		return () => {
			window.removeEventListener("mousemove", handleActivity);
			window.removeEventListener("keydown", handleActivity);
			document.removeEventListener("visibilitychange", handleVisibility);
			clear();
		};
	}, [onLock, reset, clear]);

	return { reset, clear } as const;
}

