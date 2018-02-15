import React from 'react';
import {jumbotron, h2, h3, panelDefault2, panelHeader} from '../../css/style';
import {Modal, Row, Col, Grid, Panel} from 'react-bootstrap';

import SimuDroite from './simuDroite.js';
import SimuGaucheStructure from './simuGauche/simuGaucheStructure.js';

export class Simulation extends React.Component{
	constructor(props) {
		super(props);
    }
	render(){
		return (
            <div>
				<h2 className = "text-center" style = {h2}>Make your simulation</h2>
				<section className="jumbotron" style = {jumbotron}>	
					<div className="panel panel-default" style = {panelDefault2}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Set your parameters:</h3>
						</div>
						<div className="panel-body">
							<Grid>
								<Row className="show-grid">
									<Col xs={12} md={8}>
										<SimuGaucheStructure/>								
									</Col>
									<Col xs={12} md={4}>
										<SimuDroite/>
									</Col>
								</Row>
							</Grid>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
