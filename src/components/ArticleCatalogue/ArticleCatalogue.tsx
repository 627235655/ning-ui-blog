import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ArticleCatalogue.scss';
import util from 'assets/js/utils';

declare global {
    interface Window{
        onscroll: string
    }
}

interface IProps{
    catalogue_list: Array<any>;
}

interface IState{
    catalogue: any,
    top: number,
    right: number,
}

class ArticleCatalogue extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props)
		this.state = {
			catalogue: '',
			top: 0,
            right: 0,
		}
	}

	componentDidMount() {
		let catalogue = document.querySelector('.catalogue-wrap'),
			top = util.getElOffset(catalogue).top,
			right = util.getElOffset(catalogue).right;
    	this.setState({
    		catalogue,
    		top,
            right,
    	}, () => {
			window.addEventListener('scroll', this.handleScroll, false)
    	});
	}

	handleScroll = () => {
		let catalogue = this.state.catalogue,
			right = this.state.right,
			top = this.state.top,
			doc = document.body.scrollTop ? document.body : document.documentElement,
        	show_model = (doc.scrollTop - top) > 0;
        if (show_model) {
        	let style = {
        		position: 'fixed',
        		right: right,
        	}
        	Object.assign(catalogue.style, style);
        } else {
        	let style = {
        		position: 'absolute',
        		right: '16px',
        	}
        	Object.assign(catalogue.style, style);
        }
	}

	componentWillUnmount() {
		window.onscroll = '';
	}

	render () {
		let doms;
		if (this.props.catalogue_list.length === 0 || !this.props.catalogue_list) {
			doms = null
		} else {
			doms = this.props.catalogue_list.map((v: any, i: number) => {
				return (<li key={i} className="level-1-li">
							<a id={'catalogue_' + v.id} href={ '#' + v.id}>{v.innerText}</a>
							{
								v.childNodes.length > 0 &&
								<ul>
									{
										v.childNodes.map((v2: any, i2: number) => {
											return <li key={i2} className="level-2-li">
														<a id={'catalogue_' + v.id} href={ '#' + v2.id}>{v2.innerText}</a>
													</li>
										})
									}
								</ul>
							}
						</li>)
			})
		}

		return (
			<div className="catalogue-wrap">
				<h4>目录</h4>
				<ul className="catalogue">
					{doms}
				</ul>
			</div>
		)
	}
}

export default ArticleCatalogue;