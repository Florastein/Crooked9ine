import React, { useState } from 'react';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  description?: string;
}

interface TeamsSectionProps {
  onCreateTeam?: () => void;
}

export const TeamsSection: React.FC<TeamsSectionProps> = ({ onCreateTeam }) => {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: '1',
      name: 'Engineering',
      memberCount: 5,
    },
    {
      id: '2',
      name: 'Product',
      memberCount: 3,
    },
    {
      id: '3',
      name: 'Design',
      memberCount: 4,
    },
  ]);

  const handleCreateTeam = () => {
    if (onCreateTeam) {
      onCreateTeam();
    } else {
      // Default create team behavior
      const newTeam: Team = {
        id: Date.now().toString(),
        name: `Team ${teams.length + 1}`,
        memberCount: 0,
      };
      setTeams(prev => [...prev, newTeam]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Manage Teams</h2>
      </div>

      {/* Teams Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {team.name}
                </h3>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {team.memberCount} Members
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>
          ))}

          {/* Create New Team Card */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
            <button 
              onClick={handleCreateTeam}
              className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">add</span>
              </div>
              <span className="font-medium text-sm">Create New Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};