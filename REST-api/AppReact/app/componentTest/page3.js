import React from 'react';
import {jumbotron,h1, h2, h3, h3Bis, h4, panelDefault2, panelHeader, label, button, cadre, tabSimu, buttonSimu, navSimu} from '../css/style';
import {Button, Modal, ButtonGroup, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import { connect } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from '../reduxStore/actions/actions'

import {Page3h} from './page3h.js';
import Page3d from './page3d.js';
import Page3b from './page3b.js';

export class Page3 extends React.Component{
	constructor(props) {
		super(props);
    }

	render(){
        const close = () => this.setState({ show: false });
        const close2 = () => this.setState({ show2: false });
		return (
            <div>
				<h2 className = "text-center" style = {h2}>Make your simulation</h2>
				<section className="jumbotron" style = {jumbotron}>	
					<div className="panel panel-default" style = {panelDefault2}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Set your parameters:</h3>
						</div>
						<div className="panel-body">
							<div className="modal-body row">
								<Grid>
									<Row className="show-grid">
										<Col xs={12} md={8}>
											<Page3b/>			
										</Col>
										<Col xs={10} sm={6} md={4}>
											<Page3d/>
										</Col>
									</Row>
								</Grid>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
