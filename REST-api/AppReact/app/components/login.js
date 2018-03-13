import React from 'react';
import {jumbotron, h2, h3, h3Bis, h4, panelDefault5, panelHeader, label, cadre, signLabel, loginButton, field, span, switchLinkLogin} from '../css/style';
import {Button, Row, Col} from 'react-bootstrap';
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
    <label style= {signLabel}>{label}</label>
    <div style={field}>
      <input {...input} placeholder={placeholder} type={type}/>
    </div>
  </div>
)

class Login extends React.Component{
	render(){
		return (
			<div>
				<h2 className = "text-center" style = {h2}>Enter your informations</h2>
				<section className="jumbotron" style = {jumbotron}>
					
					<div className="panel panel-default" style = {panelDefault5}>
						<div className="panel-heading" style = {panelHeader}>
							<h3 className="panel-title" style = {h3}>Account:</h3>
						</div>
						<div className="panel-body">
							<form  style = {cadre}>
								<Row>
									<Col sm={12}>
										<Field name="username" component={renderField} type="text" placeholder="ex: AlenHenry" label="Username" onChange={this.erreurUn}/>
										<span id="errorUn" role="alert" hidden style={span}>
											<span id='errorUn_info'></span>
										</span>
									</Col>
								</Row>
								<Row>
									<Col sm={12}>
										<Field name="password" component={renderField} type="text" placeholder="ex: Ujf32@ié" label="Password" onChange={this.erreurPw}/>
										<span id="errorPw" role="alert" hidden style={span}>
											<span id='errorPw_info'></span>
										</span>
									</Col>
								</Row>
								<Row style={loginButton}>
									<Button
										bsStyle="primary"	
									>
										Log in
									</Button>	
								</Row>
								<Row style={switchLinkLogin}>
									<h4 style={h4}>Not a member yet? <Link to ='/signUp'>Sign up</Link></h4> 
								</Row>
							</form>
						</div>
					</div>
				</section>
			</div>		
		);
	}
}

Login = reduxForm({
  form: 'login'  // a unique identifier for this form
})(Login)

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
