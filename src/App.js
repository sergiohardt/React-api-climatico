import React from 'react';
import axios from 'axios';

const API = 'https://api.hgbrasil.com/weather?woeid=455915&format=json-cors&locale=pt'

export default class App extends React.Component{
	state = {
		city: 'Carregando...',
		forecast: [],
	};
componentDidMount(){
	axios.get(API)
		.then(({ data }) => {
			this.setState({
				city: data.results.city,
				forecast: data.results.forecast
			});
		});
}

	render(){
		return (
			<div className="container">
				<h1>{this.state.city}</h1>
				<table className="striped centered">
					<thead>
						<tr>
							<th>Data</th>
							<th>Min.</th>
							<th>Max.</th>
							<th>Condição</th>
							<th>Descrição</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.forecast.map((day) => {
								return (
									<tr key={day.date}>
										<td>{day.weekday} {day.date}</td>
										<td>{day.min}</td>
										<td>{day.max}</td>
										<td><img width="48px" src={`/icons/${day.condition}.svg`} alt={day.description}></img></td>
										<td>{day.description}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

