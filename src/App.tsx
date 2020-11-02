import React from 'react'
import logo from './logo.svg'
import './App.css'
import scrollTo from './scrollTo'
import BackTop from './BackTop'
function App() {
	return (
		<div className="App">
			<BackTop />
			<button className="btn btn__top" onClick={() => scrollTo(1500)}>Scroll To Bottom</button>
			<button className="btn btn__bottom" onClick={() => scrollTo(0)}>Scroll To Top</button>
		</div>
	)
}

export default App
