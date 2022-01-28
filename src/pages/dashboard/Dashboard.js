import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Api from "../../utils/Api.js";
import Score from '../../components/score/Score.js';

function Dashboard() {
  let userId = useParams().id;
  console.log(userId);

  const [user, updateUser] = useState({});
  const [userActivity, updateUserActivity] = useState({});
  const [userAverageSession, updateUserAverageSession] = useState({});
  const [userPerfomance, updateUserPerfomance] = useState({});

  useEffect(getData, [userId]);

  function getData() {
    const api = new Api();

    api.getUserInfo(userId).then((data) => updateUser(data));
    api.getActivity(userId).then((data) => updateUserActivity(data));
    api.getSession(userId).then((data) => updateUserAverageSession(data));
    api.getPerformance(userId).then((data) => updateUserPerfomance(data));
  }

  console.log(user);
  console.log(userActivity);
  console.log(userAverageSession);
  console.log(userPerfomance);

  return (
    <div>
      <Score />
    </div>
  )
}

export default Dashboard;