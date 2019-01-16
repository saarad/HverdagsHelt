import {CountyService, UserService} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Button from "react-bootstrap/es/Button";
import FormGroup from "react-bootstrap/es/FormGroup";
import {Form, FormControl, Label, PageHeader} from 'react-bootstrap';
import ControlLabel from "react-bootstrap/es/ControlLabel";
import Grid from "react-bootstrap/es/Grid";
import Checkbox from "react-bootstrap/es/Checkbox";
import Select from "react-select";

let countyService = new CountyService();
let userService = new UserService();

/*interface State{
    companyName: string;
    category: Array<Object>;
    mail: string;
    firstName: string;
    lastName: string;
    address: string;
    postNumber: string;
    password: string;
    password2: string;
    typeName: string;
    phone: string;
    points: number;
    countyId: number;
    countyName: string;
    description: string;
    orgNumber: number;
    active: number;
    isLoaded: boolean;
}
interface Props{
    match: Object,
}*/
export class RegisterCompany extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            category: [],
            mail: "",
            firstName: "",
            lastName: "",
            address: "",
            postNumber: "",
            password: "",
            password2: "",
            typeName: "",
            phone: "",
            points: 0,
            active: 0,
            isLoaded: false,
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ],
            description: "",
            orgNumber: ""
        };

        this.handleChangeCounty = this.handleChangeCounty.bind(this)
    }


    handleChangeCounty(e: Object){
        this.setState({
            choosen: JSON.parse(e.value)
        })
    };


    componentWillMount() {
        var arr = [];
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => {
                    var elem = {
                        name: e.name,
                        countyId: e.countyId
                    };
                    arr = arr.concat(elem)

                });
                this.setState({
                    values: arr
                })
            })


            //this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

    }

    handleStringChange = (name: string) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [name]:event.target.value,
        })
    };

    handleNumberChange = (value: number) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [value]:event.target.value,
        })
    };



    render(){
        let optionTemplate = this.state.values.map(v => {
            const data = {label: v.name, value: v.countyId, countyId: v.countyId};
            return(data)
        });
        return(
            <Grid>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form horizontal>

                        <FormGroup controlId="formHorizontalEmail">
                            <FormGroup>
                                <Col md={3}></Col>
                                <Col md={6}>
                                    <PageHeader>
                                        Registrer bedrift
                                    </PageHeader>
                                </Col>
                                <Col md={3}></Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                                 onChange={this.handleStringChange("firstName")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                    <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                                 onChange={this.handleStringChange("lastName")}/>
                                     </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.address} placeholder="Addresse"
                                                     onChange={this.handleStringChange("address")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="number" value={this.state.postNumber} placeholder="Postnummer"
                                                     onChange={this.handleNumberChange("postNumber")}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.companyName} placeholder="Bedriftens navn"
                                                     onChange={this.handleStringChange("companyName")}
                                        />
                                    </FormGroup>
                                </Col>
                                {'  '}
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="number" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleStringChange("phone")}
                                        />
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                                     onChange={this.handleStringChange("mail")}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="text" value={this.state.mail} placeholder="Organisasjonsnummer"
                                                     onChange={this.handleStringChange("orgNumber")}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="password" value={this.state.password} placeholder="Passord"
                                                     onChange={this.handleStringChange("password")}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <FormControl type="password" value={this.state.password2} placeholder="Gjenta passord"
                                                     onChange={this.handleStringChange("password2")}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>
                                            Hjemmekommune
                                        </Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Hjemmekommune"}
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.handleChangeCounty}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Kommuner å følge"}
                                            isMulti
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}> /*Ikke gjør noe med det her enda, vi kan vente å se hvor god tid vi får*/
                                    <FormGroup>
                                        <Label>Velg arbeidsområder</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Checkbox inline>Vann og avløp</Checkbox><Checkbox>Veiarbeid</Checkbox><Checkbox>Strømbrudd</Checkbox>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={4}/>
                                <Col md ={4}>
                                    <Button type="button" onClick={this.checkMail}>Registrer</Button>
                                </Col>
                                <Col md={4}>
                                </Col>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Grid>
        );
    }
    checkMail = () =>{
        var validator = require("email-validator");

        if(!(validator.validate(this.state.mail))){
            Alert.warning("Eposten eksisterer ikke")
        }else{
            this.register();
        }
    }

    checkPass = () => {

        if (this.state.password !== this.state.password2) {
            console.log("To ulike passord");
            Alert.warning("Du skrev to ulike passord");
        }
        else {
            let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if(this.state.password.match(decimal))
            {
                this.register();
            }
            else
            {
                Alert.warning('Password has to be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
            }
        }

    }




    register = () => {
        console.log("test", this.state);
        var mail = this.state.mail
        var firstName = this.state.firstName
        var lastName = this.state.lastName
        var password = this.state.password
        var phone = this.state.phone
        var countyId = this.state.choosen.countyId
        console.log("county", countyId)
        userService
            .addUser(this.state.mail, this.state.firstName, this.state.lastName, this.state.password, this.state.phone, this.state.choosen.countyId)
            .then(user =>(this.state = user)).then(Alert.success("Bruker registrert"))
            .catch((error: Error)=>Alert.danger(error.message))
    };
}

/*{' '}
<FormGroup>
    <Col>
        <Input type="text" value={this.state.lastName} placeholder="Etternavn"
               onChange={this.handleStringChange("lastName")}
        />
    </Col>
</FormGroup>
{' '}
</Row>
<Row>
<FormGroup>
    <Col>
        <Input type="text" value={this.state.phone} placeholder="Telefonnummer"
               onChange={this.handleNumberChange("phone")}
        />
    </Col>
</FormGroup>
</Row>
<Row>
<FormGroup>
    <Col>
        <label>
            Velg Kommune:
            <select value={this.state.values.countyId} onChange={this.handleChangeCounty}>
                {optionTemplate}
            </select>
        </label>
    </Col>
</FormGroup>
</Row>
<Row>
<FormGroup>
    <Col sm="12">
        <Input type="text" value={this.state.mail} placeholder="Epost"
               onChange={this.handleStringChange("mail")}
        />
    </Col>
</FormGroup>
</Row>
<Row>
<FormGroup>
    <Col>
        <Input type="text" value={this.state.password} placeholder="Passord"
               onChange={this.handleStringChange("password")}
        />
    </Col>
</FormGroup>
{' '}
<FormGroup>
    <Col>
        <Input type="text" value={this.state.password2} placeholder="Gjenta passord"
               onChange={this.handleStringChange("password2")}
        />
    </Col>
</FormGroup>
{' '}
</Row>*/