import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Api from "../../utils/Api.js";
import './Dashboard.css'
import Greeting from '../../components/greeting/Greeting.js';
import DashboardAside from '../../components/dashboard-aside/DashboardAside.js';
import calories from '../../assets/calories.png'
import protein from '../../assets/protein.png'
import carbs from '../../assets/carbs.png'
import fat from '../../assets/fat.png'
import ScoreChart from '../../components/chart/score-chart/ScoreChart.js';
import BarsChart from '../../components/chart/bars-chart/BarsChart.js';
import LineChart from '../../components/chart/line-chart/LineChart.js';
import RadarChart from '../../components/chart/radar-chart/RadarChart.js'

export default function Dashboard() {
  const userId = useParams().id;

  const [user, updateUser] = useState({});
  const [userActivity, updateUserActivity] = useState({});
  const [userAverageSession, updateUserAverageSession] = useState({});
  const [userPerfomance, updateUserPerfomance] = useState({});

  useEffect(getData, [userId]);

  /**
   * @description gets all user data from API
  */
  function getData() {
    const api = new Api();

    api.getUserInfo(userId).then((data) => updateUser(data));
    api.getActivity(userId).then((data) => updateUserActivity(data));
    api.getSession(userId).then((data) => updateUserAverageSession(data));
    api.getPerformance(userId).then((data) => updateUserPerfomance(data));
  }

  return (
    <div className="dashbord">
      <Greeting userName={user?.userInfos?.firstName} />

      <div className="container">
      
        <div className="dashboard-main">
          {(userActivity.sessions) &&
            <BarsChart activity={userActivity.sessions} />
          }
          <div className="mini-charts">
            {(userAverageSession.sessions) &&
              <LineChart sessions={userAverageSession.sessions} />
            }
            {(userPerfomance.data) &&
              <RadarChart perf={userPerfomance.data} />
            }
            {(user.score) &&
              <ScoreChart score={user.score} />
            }
          </div>

        </div>

        <div className="dashboard-aside">
          <DashboardAside
            image={calories}
            title="Calories"
            value={user?.keyData?.calorieCount}
            unit="kCal"
          />
          <DashboardAside
            image={protein}
            title="Prot??ines"
            value={user?.keyData?.proteinCount}
            unit="g"
          />
          <DashboardAside
            image={carbs}
            title="Gulicides"
            value={user?.keyData?.carbohydrateCount}
            unit="g"
          />
          <DashboardAside
            image={fat}
            title="Lipides"
            value={user?.keyData?.lipidCount}
            unit="g"
          />
        </div>
      </div>
    </div>
  )
};