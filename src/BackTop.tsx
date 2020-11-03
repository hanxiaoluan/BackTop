import React, { useState, useRef, useEffect } from 'react'
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined'
import classnames from 'classnames'
import './BackTop.css'
import scrollTo, { throttleByAnimationFrame } from './scrollTo'
import getScroll from './geScroll'
interface BackTopProps {
    visibilityHeight?: number
    children?: React.ReactNode
    prefixCls?: string
    className?: string
    style?: React.CSSProperties
    target?: ()=> HTMLElement | Window | Document
    onClick?: React.MouseEventHandler<HTMLElement>
    duration?: number
}
const omit = (obj: any, keys: string[]) => {
	keys.map(key => delete obj[key])
	return obj
}
const BackTop: React.FC<BackTopProps> = props => {
	const [ visible, setVisible ] = useState(false)
	const ref = React.createRef<HTMLDivElement>()
	const scrollEvent = useRef<any>()

	const getDefaultTarget = () => {
		return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window
	}
	const { prefixCls = 'antBackTop', className = '' } = props
    
	const classString = classnames(prefixCls, className)
	const handleScroll = throttleByAnimationFrame(
		(e: React.UIEvent<HTMLElement>|{target: any}) => {
			const { visibilityHeight = 400 } = props
			const scrollTop = getScroll(e.target, true)
			setVisible(scrollTop > visibilityHeight)
		}
	)
	const bindScrollEvent = () => {
		const { target } = props
		const getTarget = target || getDefaultTarget
		const container = getTarget()
		scrollEvent.current = (container.addEventListener as any)('scroll', (e: React.UIEvent<HTMLElement>) => {
			handleScroll(e)
		}, false)
		handleScroll({ target: container })
	}
	const renderChildren = (prefixCls: string) => {
		const { children } = props
		const defaultElement = (
			<div className={`${prefixCls}__content`}>
				<div className={`${prefixCls}__icon`}>
					<VerticalAlignTopOutlined />
				</div>
			</div>
		)
		return <div>{children || defaultElement }</div>
	}
	const divProps = omit(props, [ 'prefixCls', 'className', 'children', 'visibilityHeight' ])
    
	const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
		const { onClick, target, duration = 450 } = props
		scrollTo(0, {
			getContainer: target || getDefaultTarget,
			duration
		})
		if (typeof onClick === 'function') {
			onClick(e)
		}
	}
    
	useEffect(() => {
		bindScrollEvent()
		return () => {
			if (scrollEvent.current) {
				scrollEvent.current.remove()
			}
			(handleScroll as any).cancel()
		}
	}, [ props.target ])
	return (
		<div className={classString} {...divProps} onClick={scrollToTop} ref={ref}>
			{renderChildren(prefixCls)}
		</div>
	)
}

export default BackTop