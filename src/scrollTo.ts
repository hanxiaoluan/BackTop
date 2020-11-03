import raf from 'raf'
import getScroll, { isWindow } from './geScroll'
interface ScrollToOptions {
    getContainer?: ()=> HTMLElement | Document | Window
    callback?: ()=> any
    duration?: number
}

// 仅仅是一个简单的过度效果
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
	const cc = c - b
	t /= d / 2
	if (t < 1) {
		return (cc / 2) * t * t * t + b
	}
	// eslint-disable-next-line no-return-assign
	return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

const scrollTo = (y: number,
	{
		getContainer = () => window,
		callback,
		duration = 450
	}: ScrollToOptions = {} ) => {
	const container = getContainer()
	const scrollTop = getScroll(container)
	const startTime = Date.now()
	const frameFunc = () => {
		const timestamp = Date.now()
		const time = timestamp - startTime 
		const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration)
		if (isWindow(container)) {
			(container as Window).scrollTo(window.pageXOffset, nextScrollTop)
		} else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
			(container as HTMLDocument).documentElement.scrollTop = nextScrollTop
		} else {
			(container as HTMLElement).scrollTop = nextScrollTop
		}
		if (time < duration) {
			raf(frameFunc)
		} else if (typeof callback === 'function') {
			callback()
		}
	}
	
	raf(frameFunc)
}

// 对监听scroll事件的函数进行节流处理
export const throttleByAnimationFrame = (fn: (args: any)=> void) => {
	let requestId: number|null = null
	const later = (args: any) => () => {
		requestId = null
		fn(args)
	}
	const throttle = (args: any) => {
		if (!requestId) {
			requestId = raf(later(args))
		}
	}
	throttle.cancel = () => raf.cancel(requestId as number)
	return throttle
}
export default scrollTo

