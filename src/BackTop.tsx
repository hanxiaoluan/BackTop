import React from 'react'
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined'
import classnames from 'classnames'
import './BackTop.css'
import scrollTo from './scrollTo'
interface BackTopProps {
    visibilityHeight?: number
    children?: React.ReactNode
    prefixCls?: string
    className?: string
    style?: React.CSSProperties
}
const omit = (obj: any, keys: string[]) => {
	keys.map(key => delete obj[key])
	return obj
}
const BackTop: React.FC<BackTopProps> = props => {
	const { prefixCls = 'antBackTop', className = '' } = props
    
	const classString = classnames(prefixCls, className)
    
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
	
	return (
		<div className={classString} {...divProps} onClick={() => scrollTo(0)}>
			{renderChildren(prefixCls)}
		</div>
	)
}

export default BackTop