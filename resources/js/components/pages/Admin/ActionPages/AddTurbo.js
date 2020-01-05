import React from "react";
import '../../../css/AdminPage.css';
import {connect} from "react-redux";
import {getAllParts,addParts} from "../../../store/actions";
class AddTurbo extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            title: "",
            weight: "",
            power: "",
            price: "",
            part_id: "",
            image_url:"",
            level: "",
            error:"",
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props.adminToken);
        this.props.getAllParts(this.props.adminToken);
    }

    componentDidUpdate(){
        console.log(this.props);
    }
    

    handleChange(event) {
        switch (event.target.id) {
            case "title":
                this.setState({
                    title: event.target.value
                });
                break;
            case "weight":
                this.setState({
                    weight: event.target.value
                });
                break;
            case "power":
                this.setState({
                    power: event.target.value
                });
                break;    
            case "price":
                this.setState({
                    price: event.target.value
                });
                break;  
            case "image_url":
                this.setState({
                    image_url: event.target.value
                });
                break; 
            case "level":
                this.setState({
                    level: event.target.value
                });
                break; 
            case "part_id":
                this.setState({
                    part_id: event.target.value
                });
                break; 
            default:
                break;
        }
    }

    handleSubmit(event) {
       var data = {
            title : this.state.title,
            weight : this.state.weight,
            power : this.state.power,
            price : this.state.price,
            is_default : this.state.is_default,
            image_url : this.state.image_url,
            level : this.state.level,
            part_id : this.state.part_id
        }

        this.props.addParts(this.props.adminToken,data,'/addTurbo');

        event.preventDefault();
    }

     getSelect() {
        if(this.props.allParts != null){
        const listItems =  this.props.allParts.map((part) =>
            <option key={part.id} value={part.id}>{part.title}</option>
        );
        return listItems;
        }
    }

    render() {

        return (<div className={"container"}>
            <div className={"row"}>
                <div className={"col-sm-12"}>
                    <div className={"admin_add_action"}>
                        <span className={"add-action-label"}>Prideti NOS</span>
                            <form onSubmit={this.handleSubmit}>
                                <div className={"form-group"}>
                                   
                                    <input type="text" className={"form-control"} id="title" value={this.state.title} onChange={this.handleChange} placeholder="Pavadinimas"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="weight">Svoris</label>
                                    <input type="text" className={"form-control"} id="weight" value={this.state.weight} onChange={this.handleChange} placeholder="Svoris"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="power">Galia</label>
                                    <input type="text" className={"form-control"} id="power" value={this.state.power} onChange={this.handleChange} placeholder="Svoris"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="price">Kaina</label>
                                    <input type="text" className={"form-control"} id="price"  value={this.state.price} onChange={this.handleChange} placeholder="Kaina"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="level">Lygis</label>
                                    <input type="text" className={"form-control"} id="level" value={this.state.level} onChange={this.handleChange} placeholder="Lygis"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="image_url">Paveikslelio adresas</label>
                                    <input type="text" className={"form-control"} id="image_url" value={this.state.image_url} onChange={this.handleChange} placeholder="Paveikslelio adresas"/>
                                </div>
                                <div className={"form-group"}>
                                    <label htmlFor="part_id">Dalis</label>
                                    <select className={"custom-select my-1 mr-sm-2"} id="part_id" value={this.state.part_id} onChange={this.handleChange}>
                                        {this.getSelect()}
                                    </select>
                                </div>

                                <button type="submit" className={"btn btn-primary"}>Pridėti</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>);
    }
}


const mapStateToProps = state => {
    return {
        adminToken: state.adminToken,
        allParts: state.allParts
    };
};
const AddTurboComponent = connect(mapStateToProps, {getAllParts,addParts})(AddTurbo);
export default AddTurboComponent;
