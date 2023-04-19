import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LargeCard from './Cards/LargeCard';
import SmallCard from './Cards/SmallCard';
import './Dashboard.css';
import { FcBusinessman, FcCancel, FcFaq, FcWorkflow } from 'react-icons/fc';
import UsersBarChart from './Charts/UsersBarChart';
import ModalitiesPieChart from './Charts/ModalitiesPieChart';
import AnalysisLineChart from './Charts/AnalysisLineChart';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Dashboard() {
  const axiosPrivate = useAxiosPrivate();

  const [counts, setCounts] = useState('');
  const [modalities, setModalities] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
    fetchMultiModalities();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 550px)');
    setIsMobile(mediaQuery.matches);
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axiosPrivate.get('/admin/counts');
      console.log(response.data);
      setCounts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMultiModalities = async () => {
    try {
      const response = await axiosPrivate.get('/admin/all-multi');
      console.log(response.data);
      setModalities(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="dash-component">
      <div className="flex-component">
        <SmallCard
          title="Active Users"
          icon={<FcBusinessman size="2em" />}
          value={counts.active}
          onClick={() => navigate('/active')}
          style={{ marginTop: '10px' }}
        />
        <SmallCard
          title="InActive Users"
          icon={<FcCancel size="2em" />}
          value={counts.in_active}
          onClick={() => navigate('/inactive')}
          style={{ marginTop: '10px' }}
        />
        <SmallCard
          title="Total Sessions"
          icon={<FcFaq size="2em" />}
          value={counts.session_counts}
          onClick={() => navigate('/tasks')}
          style={{ marginTop: '10px' }}
        />
        <SmallCard
          title="Multi Modalities"
          icon={<FcWorkflow size="2em" />}
          value={counts.modalities_count}
          style={{ marginTop: '10px' }}
        />
      </div>
      <div className="flex-component-lg">
        <LargeCard
          width={isMobile ? '90%' : '320px'}
          height="340px"
          title="Modalities"
          title1={true}
          body={<ModalitiesPieChart data={modalities} />}
          className="flex-center"
        />

        <LargeCard
          width={isMobile ? '90%' : '850px'}
          height={isMobile ? '550px' : '340px'}
          title="User Chart"
          title1={true}
          body={
            <UsersBarChart
              width={isMobile ? '90%' : '800'}
              height={isMobile ? '480' : '280'}
              horizontal={isMobile ? true : false}
            />
          }
          className="flex-center"
        />
      </div>
      <div className="flex-component-lg" onClick={fetchCounts}>
        <LargeCard
          width={isMobile ? '90%' : '97%'}
          height="130px"
          title2={true}
          titleSM="User Statistics"
          body={
            <AnalysisLineChart
              width={isMobile ? '100%' : '1000'}
              height="120"
            />
          }
        />
      </div>
    </div>
  );
}

export default Dashboard;
