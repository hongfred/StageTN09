import React from 'react';
import {footStyle,jumbotron, jumbotronBis,h1, h2, h3, h3Bis, h4, panelDefault, panelDefault2, panelDefault3, panelHeader, navBar, label, body, button, panelFooter, link, dropColor, cadre, tab, tabSimu, buttonSimu, navSimu, modBody} from '../css/style';
import {DropdownButton, MenuItem, Button, Modal, ButtonGroup, Carousel, Nav, NavItem, Tab, Row,Col, Navbar, NavDropdown, Grid, Panel, Tabs, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export class Home extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            index: 1,
			direction: null
        };
		this.handleSelect = this.handleSelect.bind(this);
    }
	handleSelect(selectedIndex, e) {
		//alert('selected=' + selectedIndex + ', direction=' + e.direction);
		this.setState({
		  index: selectedIndex,
		  direction: e.direction
		});
	}

	render(){
		return (
			<div>	
				<h2 className = "text-center" style = {h2}>Are you looking for something?</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Actuality:</h3>
						</div>
						<div className="panel-body">
						  <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
							<Carousel.Item>
							  <img width={700} alt="900x500" src="https://merced.cropmobster.com/wp-content/uploads/sites/12/2017/06/alerts/dcruz27ucmerced-edu/Land-900x500.png"/>
							  <Carousel.Caption>
								<h3>First slide label</h3>
								<p>whatever you want to say.</p>
							  </Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
							  <img width={700} alt="900x500" src="https://www.ouest-france.fr/sites/default/files/styles/image-900x500/public/2016/02/23/sncf-et-ratp-journee-noire-en-perspective-le-mercredi-9-mars.jpg?itok=adJU5Ow4"/>
							  <Carousel.Caption>
								<h3>Second slide label</h3>
								<p>blabla.</p>
							  </Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
							  <img width={700} alt="900x500" src="https://dugaslandscape.com/wp-content/uploads/How-to-Install-Low-Voltage-Landscape-Lights-with-Modern-Tropical-Lighting.jpg"/>
							  <Carousel.Caption>
								<h3>Third slide label</h3>
								<p>bloh.</p>
							  </Carousel.Caption>
							</Carousel.Item>
						  </Carousel>
						</div>						
					</div>
				</section>
			</div>
		);
	}
}
