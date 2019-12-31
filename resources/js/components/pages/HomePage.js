import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import '../css/styles.css';
import '../css/home.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserPhoto from '../img/default_user.jpg';

import Race from '../pages/Race';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user_info,
        abilities: state.user_abilities,
        cars: state.user_cars,
        car_info: state.user_car_info
    };
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            race: false,
            task_comp: false,
            race_type: "1/4",
            select_car: false,
            user_data: null,
            user_abilities: null,
            user_cars: null,
            user_car_info: null,
            used_car: "",
            current_task: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.selectCar = this.selectCar.bind(this);
    }

    componentDidMount() {
        this.setState({
            user_data: this.props.user,
            user_abilities: this.props.abilities,
            user_cars: this.props.cars,
            user_car_info: this.props.car_info
        });

        let auth = "Bearer ";
        let token = this.props.token;

        if (this.props.user != null) {
            axios.get("http://127.0.0.1:8000/api/v1/getCarInUseId/" + this.props.user.user.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then((response) => {
                this.setState({
                    used_car: response.data.success.car_in_use
                });
            });

            axios.get("http://127.0.0.1:8000/api/v1/getTaskByUserId/" + this.props.user.user.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': auth + token
                }
            }).then((response) => {
                this.setState({
                    current_task: response.data.success
                });
            });
        }
    }

    handleClick(event) {
        switch (event.target.id) {
            case "1/4":
                this.setState({
                    race_type: "1/4"
                });
                break;
            case "1/2":
                this.setState({
                    race_type: "1/2"
                });
                break;
            default:
                this.setState({
                    race: true
                });
        }
    }

    buyAbility(event) {
        console.log("Buying ability", event.currentTarget.id);
    }

    selectCar(event) {
        console.log("Selecting car", event.currentTarget.id);

        switch (event.currentTarget.id) {
            case "back":
                this.setState({
                    select_car: false
                });
                break;
            case "back_arrow":
                this.setState({
                    select_car: false
                });
                break;
            default:
                this.setState({
                    select_car: true
                });
                break;
        }
    }

    render() {
        function UserAbilities(props) {
            if (props.props != null) {

                let reaction_price = 1024 + (1024 * props.props.abilities.reaction);
                let shifting_price = 1024 + (1024 * props.props.abilities.shifting);
                let acceleration_price = 1024 + (1024 * props.props.abilities.acceleration);
                let mobility_price = 1024 + (1024 * props.props.abilities.mobility);

                return (
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td>{props.props.abilities.reaction}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"reaction"} onClick={props.handler}/></td>
                            <td>{reaction_price}$</td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td>{props.props.abilities.shifting}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"shifting"} onClick={props.handler}/></td>
                            <td>{shifting_price}$</td>
                        </tr>
                        <tr>
                            <td>Greitėjimas</td>
                            <td>{props.props.abilities.acceleration}</td>
                            <td><FontAwesomeIcon icon={faPlus} id={"acceleration"} onClick={props.handler}/></td>
                            <td>{acceleration_price}$</td>
                        </tr>
                        <tr>
                            <td>Manevringumas</td>
                            <td>{props.props.abilities.mobility}</td>
                             <td><FontAwesomeIcon icon={faPlus} id={"mobility"} onClick={props.handler}/></td>
                            <td>{mobility_price}$</td>
                        </tr>
                        </thead>
                    </table>
                    </span>
                );
            } else {
                return (
                    <span>
                        <table>
                        <thead>
                        <tr>
                            <td>Reakcija</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Pavarų perjungimas</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Greitėjimas</td>
                            <td></td>
                            <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Manevringumas</td>
                            <td></td>
                             <td><FontAwesomeIcon icon={faPlus}/></td>
                            <td></td>
                        </tr>
                        </thead>
                    </table>
                    </span>
                );
            }
        }

        function ActiveCar(props) {

            if (props.props != null && props.car_data != null) {

                let used_car = props.used_car;
                let cars = props.props.cars;
                let car_data = props.car_data;
                let used_car_info = null;

                cars.map((car) => {
                    if (car.id === used_car) {

                        car_data.map((data) => {
                            if (data.car_info.id === car.vechile_id) {
                                used_car_info = data.car_info;
                            }
                        });
                    }
                });
                return (
                    <div className={"select-car"}>
                        <img id={used_car} src={used_car_info.image_url} onClick={props.handler}
                             alt={""}/>

                        <div>Pasirinktas automobilis</div>
                    </div>
                );
            } else {
                return null;
            }

        }

        function CarSelect(props) {
            let cars = props.props;

            if (cars != null) {
                return (<div className={"car-swap"}>
                    <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <table>
                        <thead>
                        <tr>
                            {
                                cars.map((car) => {
                                    return (
                                        <td id={car.car_info.id} onClick={props.handler}>
                                            <div><img src={car.car_info.image_url} alt={""}/></div>
                                            <div>{car.car_info.title}</div>
                                        </td>
                                    );
                                })
                            }
                        </tr>
                        </thead>
                    </table>
                </div>);
            } else {
                return (
                    <div className={"car-swap"}>
                        <button id={"back"} onClick={props.handler}><FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <table>
                            <thead>
                            <tr>
                            </tr>
                            </thead>
                        </table>
                    </div>
                );
            }
        }

        function UserTask(props) {
            let task = props.props;

            return (
                <div className={"user-task"}>
                    <span className={"task-title"}>Lenktyniavimas</span>
                    <span className={"task-info"}>Laimėk {task.required_races} k.</span>
                    <ProgressBar className={"task-progress"} now={task.races_count/task.required_races*100} />{task.races_count + '/' + task.required_races}
                    <span className={"task-prize"}>Prizas: {task.prize_cash}$ {task.prize_exp}XP</span>
                    {taskButton}
                </div>
            );
        }

        let user_name = this.state.user_data != null ? this.state.user_data.user.name : " ";
        let user_level = this.state.user_data != null ? this.state.user_data.user.level + " lygis" : " ";
        let user_cash = this.state.user_data != null ? this.state.user_data.user.cash + " $" : " ";
        let user_credits = this.state.user_data != null ? this.state.user_data.user.credits : " ";
        let user_xp = this.state.user_data != null ? this.state.user_data.user.experience : " ";
        let next_lvl = this.state.user_data != null ? this.state.user_data.user.next_level_exp : "";

        let taskButton = this.state.task ?
            <button className={"task-btn"} id={"task"} onClick={this.handleClick}>Atsiimti</button> :
            <button className={"task-btn-disabled"} id={"task"} disabled={true}>Atsiimti</button>;

        let selectCar = this.state.select_car ?
            <CarSelect props={this.state.user_car_info} handler={this.selectCar.bind(this)}/> : null;

        let activeCar = this.state.used_car !== "" ?
            <ActiveCar props={this.state.user_cars} car_data={this.state.user_car_info} used_car={this.state.used_car}
                       handler={this.selectCar.bind(this)}/> : null;

        let abilities = this.state.user_abilities != null ?
            <UserAbilities props={this.state.user_abilities} handler={this.buyAbility}/> : null;

        let user_task = this.state.current_task != null ? <UserTask props={this.state.current_task}/> : null;


        if (this.state.race) {
            return <Race/>;
        } else {
            return (<div>

                <div className={"user"}>
                    <div className={"user-stats"}>
                        <table>
                            <thead>
                            <tr>
                                <td>Patirtis:</td>
                                <td><ProgressBar className={"xp-bar"}
                                                 now={user_xp / next_lvl * 100}/>{user_xp + '/' + next_lvl}XP
                                </td>
                            </tr>
                            <tr>
                                <td>Pinigai:</td>
                                <td>{user_cash}</td>
                            </tr>
                            <tr>
                                <td>Kreditai:</td>
                                <td>{user_credits}</td>
                            </tr>
                            <tr>
                                <td>Klubas:</td>
                                <td>-</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className={"user-info"}>
                        <img src={UserPhoto} alt="Smiley face" height="42" width="42"/>
                        <span id={"user-name"}>{user_name}</span>
                        <span id={"user-level"}>{user_level}</span>
                    </div>
                    {user_task}
                </div>

                <div className={"go-race"}>
                    <div>Gatvės laukia tavęs</div>
                    <div className={"race-options"}>

                        {activeCar}

                        <div className={"select-race"}>
                            <div>Lenktynių ilgis</div>
                            <span id={"1/4"} style={{color: "red"}} onClick={this.handleClick}>1/4 mylios</span>
                            <button id={"race"} onClick={this.handleClick}>Lenktyniauti</button>
                        </div>
                    </div>
                    {selectCar}
                </div>

                <div className={"user-abilities"}>
                    <span>Specialūs gebėjimai</span>
                    {abilities}

                </div>
            </div>);
        }

    }

}

const Home = connect(mapStateToProps, null)(HomePage);
export default Home;
