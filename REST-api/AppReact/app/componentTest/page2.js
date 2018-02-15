import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from 'D:/frederic/Documents/cours/code/AppReact/app/css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

import { connect } from 'react-redux';
import {addTodo} from 'D:/frederic/Documents/cours/code/AppReact/app/reduxStore/actions/actions'

class Page2 extends React.Component{
	constructor(props) {
        super(props);
		this.testStore = this.testStore.bind(this)
    }
	testStore(){
		this.props.add('ça marche')
	}
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>Page test add</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-body">
							<div className="container">				 
								<section>
									<Grid  style = {cadre}>
										<Button
											bsStyle="primary"
											onClick={this.testStore}
										>
											add in store
										</Button>	
										<div style = {cadre}>
											<ul>
												{JSON.stringify(this.props)}
											</ul>
										</div>
									</Grid>
								</section>
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
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (text) => dispatch(addTodo(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page2);