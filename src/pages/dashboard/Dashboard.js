import React from 'react';
import { useParams } from 'react-router-dom';

function Dashboard() {
  let userid = useParams()
  console.log(userid);
  return (
    <div>
    </div>
  )
}

export default Dashboard;