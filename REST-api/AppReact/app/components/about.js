import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export class About extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>I know you want me</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}> 
							<h3 className="panel-title" style = {h3}>Informations:</h3>
						</div>
						<div className="panel-body" style = {cadre}>
							<div className="modal-body row">
								<li>blabla</li>
								<li>moreblabla</li>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
