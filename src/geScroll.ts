// 判断是否是isWindow对象
export function isWindow(obj: any) {
	return obj !== null && obj !== undefined && obj === obj.window
}

// 传入两个参数 target和top，判断是否是server-side function，如果是则返回0，通过top来判断是上下scroll还是左右scroll，然后来判断兼容性，最后返回一个代表滑动距离的number
export default function getScroll(target: HTMLElement | Window | Document | null, top = true): number {
	if (typeof window === 'undefined') {
		return 0
	}
	const method = top ? 'scrollTop' : 'scrollLeft'
	let result = 0
	if (isWindow(target)) {
		result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset']
	} else if (target instanceof Document) {
		result = target.documentElement[method]
	} else if (target) {
		result = (target as HTMLElement)[method]
	}
	if (target && !isWindow(target) && typeof result !== 'number') {
		result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement[method]
	}
	return result
}





