import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';

import './TeamPage.scss';


export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] });
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchTeams();

        }, [teamName]
    );

    if (!team || !team.teamName) {
        return <h1>Team not found</h1>
    }
    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
                Win / Losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: 'rgba(190, 76, 41, 0.986)' },
                        { title: 'Wins', value: team.totalWins, color: 'rgb(5, 155, 80)' },


                    ]}
                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match} />)}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More > </Link>

            </div>
        </div>
    );
}
