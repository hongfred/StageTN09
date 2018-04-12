import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, modBody} from 'D:/frederic/Documents/cours/code/AppReact/app/css/style';
import {Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import {
  itemsFetchData 
} from 'D:/frederic/Documents/cours/code/AppReact/app/reduxStore/actions/actions'

class Page extends React.Component{
	constructor(props) {
		super(props);
		this.testStore = this.testStore.bind(this)
    }
	testStore(){
		this.props.fetchData("http://localhost:1337/testSimu", "1");	
	}

	render(){
		if (this.props.hasErrored) {
           return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
		return (
			<div>
				<h2 className = "text-center" style = {h2}>page test fetch avancé</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-body" style = {cadre}>
							<div className="modal-body row">
								<Button
									bsStyle="primary"
									onClick={this.testStore}
								>
									fetch base
								</Button>
								<div style = {cadre}>
									<ul>
										{JSON.stringify(this.props)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        //hasErrored: state.itemsHasErrored,
        //isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, option) => dispatch(itemsFetchData(url, option))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
