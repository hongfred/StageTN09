import React from 'react';
import {jumbotron, h2, h3, panelDefault, panelHeader, body, cadre} from '../css/style';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';

export class About extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>What do you want to know?</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}> 
							<h3 className="panel-title" style = {h3}>Informations:</h3>
						</div>
						<div className="panel-body" style = {cadre}>
							<div className="modal-body row">
								<li>We're trying to create an interactive simulation plateform that allows users to calculate the resilience of their dataset.</li>
								<li>The plateform must be user-friendly, interactive, efficient</li>
								<li>We're part of the ROSAS department. This work is affiliated to the RATP.</li>
								<li>Just writing random things. Must be changed later on.</li>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

