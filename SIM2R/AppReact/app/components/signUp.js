import React from 'react';
import {jumbotron, h2, h3, h4, panelDefault4, panelHeader, signLabel, signButton,switchLink, field, cadre, span} from '../css/style';
import {Button, Col, Row, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector, reset} from 'redux-form'
import { connect } from 'react-redux';

const renderField = ({
  input,
  placeholder,
  type,
  label,
  meta: { touched, error, warning }
}) => (
  <div>
    <label style={signLabel}>{label}:</label>
    <div style={field}>
		
      <input {...input} placeholder={placeholder} type={type}/>
    </div>
  </div>
)

class SignUp extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>Registration form</h2>
				<section className="jumbotron" style = {jumbotron}>
					<div className="panel panel-default" style = {panelDefault4}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Sign up:</h3>
						</div>
						<div className="panel-body">
							<div className="container">
								<section>				
									<div>
										<div style = {cadre}>
											<form>
												<Row>
													<Col sm={6}>
														<Field name="user" component={renderField} type="text" placeholder="ex: AlenHenry" label="Username" onChange={this.erreurU}/>
														<span id="errorU" role="alert" hidden style={span}>
															<span id='errorU_info'></span>
														</span>
													</Col>
													<Col sm={6}>
														<Field name="password" component={renderField} type="text" placeholder="ex: Ujf32@ié" label="Password" onChange={this.erreurP}/>
														<span id="errorP" role="alert" hidden style={span}>
															<span id='errorP_info'></span>
														</span>
													</Col>
												</Row>
												<Row>
													<Col sm={6}>
														<Field name="Lastname" component={renderField} type="text" placeholder="ex: Alen" label="Last name" onChange={this.erreurL}/>
														<span id="errorLN" role="alert" hidden style={span}>
															<span id='errorLN_info'></span>
														</span>
													</Col>
													<Col sm={6}>
														<Field name="name" component={renderField} type="text" placeholder="ex: Henry" label="Name" onChange={this.erreurN}/>
														<span id="errorN" role="alert" hidden style={span}>
															<span id='errorN_info'></span>
														</span>
													</Col>
												</Row>
												<Row>
													<Col sm={12}>
														<Field name="age" component={renderField} type="text" placeholder="ex: 18" label="Age" onChange={this.erreurA}/>
														<span id="errorA" role="alert" hidden style={span}>
															<span id='errorA_info'></span>
														</span>
													</Col>
												</Row>
												<Row>
													<Col sm={12}>
														<Field name="email" component={renderField} type="text" placeholder="ex: alen.henry@gmail.com" label="Email" onChange={this.erreurE}/>
														<span id="errorE" role="alert" hidden style={span}>
															<span id='errorE_info'></span>
														</span>
													</Col>
												</Row>
												<Row style={signButton}>
													<Button
														bsStyle="primary"
													>
														Sign up
													</Button>	
												</Row>
												<Row style={switchLink}>
														
													<div>  
														<h4 style={h4}>Already a member ? <Link to ='/Login'>Login</Link></h4> 
													</div>
												</Row>
											</form>
										</div>
									</div>  
								</section>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
	
SignUp = reduxForm({
  form: 'signUp'  // a unique identifier for this form
})(SignUp)

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
