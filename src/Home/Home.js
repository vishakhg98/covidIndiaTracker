import React, { useContext } from 'react';
import { animated, useTrail } from 'react-spring';
import './Css/Home.css';
import * as theme from '../utils/Theme';
// import MaxWidthWrapper from "../general/MaxWidthWrapper";
import Map from '../Map/Map';
import Table from '../Table/Table';
import Search from './Search';
import { GlobalContext } from '../ContextProvider/ContextProvider';
import PieChartCustom from '../Charts/PieChartCustom';
import AreaChartCustom from '../Charts/AreaChartCustom';

function Home() {
	const goBack = useContext(GlobalContext).goBack;
	const topData = useContext(GlobalContext).topData;
	const totalCount = useContext(GlobalContext).totalCount;
	const historyData = useContext(GlobalContext).historicalData;
	const backButton = useContext(GlobalContext).backButton;

	// console.log(historyData);
	let selectedDays = 30;
	let graphTimeDuration = Date.now() - 1000 * 60 * 60 * 24 * selectedDays;
	let confirmedHistoryData = historyData && [
		historyData[0].filter(i => Date.parse(i.dateymd) > graphTimeDuration),
		historyData[1].slice(-30)
		// historyData[0].filter((i) => Date.parse(i.date) > graphTimeDuration),
	];

	// console.log(historyData[1]);

	const trailArray = [
		{
			data: confirmedHistoryData[0],
			dataKey: 'dailyconfirmed',
			dateKey: 'date',
			fill: '#4060ff',
			heading: 'Daily Confirmed'
		},
		{
			data: confirmedHistoryData[0],
			dataKey: 'dailydeceased',
			dateKey: 'date',
			fill: '#DDEDFF',
			heading: 'Daily Deceased'
		},
		{
			data: confirmedHistoryData[0],
			dataKey: 'dailyrecovered',
			dateKey: 'date',
			fill: 'green',
			heading: 'Daily Recovered'
		},
		{
			data: confirmedHistoryData[1],
			dataKey: 'dailyrtpcrsamplescollectedicmrapplication',
			dateKey: 'date',
			fill: '#E54F21',
			heading: 'Daily Tested'
		},
		{
			data: confirmedHistoryData[1],
			dataKey: 'totaldosesadministered',
			dateKey: 'date',
			fill: 'yellow',
			heading: 'Daily Vaccinated'
		}
	];

	const trail = useTrail(trailArray.length, {
		from: { marginTop: -20, opacity: 0, transform: 'translate3d(0,-40px,0)' },
		to: { marginTop: 20, opacity: 1, transform: 'translate3d(0,0px,0)' }
	});
	// console.log(confirmedHistoryData);

	return (
		// <MaxWidthWrapper>
		<div className="base">
			<div className="leftContainer">
				<div className="leftTopContainer">
					<div
						className={backButton ? 'backButtonActive' : 'backButton'}
						onClick={() => {
							goBack();
						}}
					>
						<span className="backLine backLine1"></span>
						<span className="backLine backLine2"></span>
						<span className="backLine backLine3"></span>
					</div>
					<div className="searchContainer">
						<Search />
					</div>
				</div>

				<div className="tableContainer">
					<Table />
				</div>

				{/* <div className="bedContainer">
          <BedsAndO2 icon="bed.svg" heading="Count" />
        </div>
        <div className="o2Container">
          <BedsAndO2 icon="oxygen.svg" heading="Count" />
        </div> */}
			</div>

			<div className="rightContainer">
				<div className="mapContainer">
					<div className="mapParent">
						{/* <div className="mapWrapper"> */}
						<Map />
						{/* </div> */}
						<div className="mapBottomCardContainer">
							<div className="mapBottomCards">
								<div className="mapBottomCard">
									<PieChartCustom
										data={topData.active}
										valueKey="active"
										gradientColors={theme.activeGradientColor}
										total={totalCount.active}
									/>
								</div>

								<div className="mapBottomCard">
									<PieChartCustom
										data={topData.recovered}
										valueKey="recovered"
										gradientColors={theme.recoveredGradientColor}
										total={totalCount.recovered}
									/>
								</div>

								<div className="mapBottomCard">
									<PieChartCustom
										data={topData.deaths}
										valueKey="deaths"
										gradientColors={theme.deceasedGradientColor}
										total={totalCount.deaths}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="mapRightCards">
						{trail.map((props, index) => {
							return (
								<animated.div
									className="mapRightCard"
									style={props}
									key={index}
								>
									<AreaChartCustom
										data={trailArray[index].data}
										dataKey={trailArray[index].dataKey}
										dateKey={trailArray[index].dateKey}
										fill={trailArray[index].fill}
									/>
									<h5 className="chartLabel">{trailArray[index].heading}</h5>
								</animated.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
		// </MaxWidthWrapper>
	);
}

export default Home;
