import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { CreateTeamModal } from './CreateTeamModal';

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
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch all teams (divisions)
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Fetch all divisions
      const divisionsSnap = await getDocs(collection(db, 'Division'));

      if (divisionsSnap.empty) {
        setTeams([]);
        setLoading(false);
        return;
      }

      // Step 2: For each division, count its users
      const teamsData: Team[] = await Promise.all(
        divisionsSnap.docs.map(async (div) => {
          const divisionData = div.data();
          const divisionName = divisionData.name;

          let memberCount = 0;
          try {
            const usersSnap = await getDocs(
              query(collection(db, 'Users'), where('division', '==', divisionName))
            );
            memberCount = usersSnap.size;
          } catch (userErr) {
            console.error(`Error counting users for ${divisionName}:`, userErr);
          }

          return {
            id: div.id,
            name: divisionName,
            memberCount,
            description: divisionData.description || '',
          };
        })
      );

      // Step 3: Sort teams by member count desc, then by name asc
      const sorted = teamsData.sort((a, b) => {
        if (b.memberCount !== a.memberCount) return b.memberCount - a.memberCount;
        return a.name.localeCompare(b.name);
      });

      setTeams(sorted);
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new team
  const handleCreateTeam = () => {
    if (onCreateTeam) onCreateTeam();
    else setShowCreateModal(true);
  };

  // Add new team to list after creation
  const handleTeamCreated = (newTeam: Team) => {
    setTeams((prev) => {
      const updated = [...prev, newTeam];
      return updated.sort((a, b) => {
        if (b.memberCount !== a.memberCount) return b.memberCount - a.memberCount;
        return a.name.localeCompare(b.name);
      });
    });
  };

  // Retry on error
  const handleRetry = () => {
    setError(null);
    fetchTeams();
  };

  // ================= UI ================= //
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manage Teams</h2>
              <p className="text-gray-600 text-sm mt-1">
                {teams.length} team{teams.length !== 1 ? 's' : ''} •{' '}
                {teams.reduce((t, team) => t + team.memberCount, 0)} total members
              </p>
            </div>
            <button
              onClick={handleCreateTeam}
              className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Create New Team
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading teams...</div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-3">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>
          ) : teams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <span className="material-symbols-outlined text-6xl">groups</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Teams Found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                There are no teams configured in your system. Create your first team to get started.
              </p>
              <button
                onClick={handleCreateTeam}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create First Team
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {team.name}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                  </div>

                  {team.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{team.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400 text-sm">person</span>
                      <span
                        className={`text-sm font-medium ${
                          team.memberCount === 0 ? 'text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        {team.memberCount} {team.memberCount === 1 ? 'Member' : 'Members'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Team"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit Team"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onTeamCreated={handleTeamCreated}
        />
      )}
    </>
  );
};
