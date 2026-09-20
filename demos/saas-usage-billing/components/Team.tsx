'use client'

import { useState, useEffect } from 'react'
import { useBillingStore } from '@/lib/store'
import { mockTeamMembers } from '@/lib/mockData'
import type { TeamMember, UserRole } from '@/lib/types'

export function Team() {
  const { userRole } = useBillingStore()
  const [members, setMembers] = useState<TeamMember[]>([])
  const canManageTeam = userRole === 'owner' || userRole === 'admin'

  useEffect(() => {
    setMembers(mockTeamMembers)
  }, [])

  const roleColors = {
    owner: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    member: 'bg-gray-100 text-gray-800',
  }

  const handleInvite = () => {
    if (!canManageTeam) {
      alert('Only owners and admins can invite team members')
      return
    }
    alert('Invite team member - Mock action')
  }

  const handleRemove = (memberId: string) => {
    if (!canManageTeam) {
      alert('Only owners and admins can remove team members')
      return
    }
    if (confirm('Remove this team member?')) {
      alert(`Remove member ${memberId} - Mock action`)
    }
  }

  const handleChangeRole = (memberId: string, newRole: UserRole) => {
    if (userRole !== 'owner') {
      alert('Only owners can change roles')
      return
    }
    alert(`Change role for ${memberId} to ${newRole} - Mock action`)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team and permissions</p>
        </div>
        <button
          onClick={handleInvite}
          disabled={!canManageTeam}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            canManageTeam
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Invite Member
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      roleColors[member.role]
                    }`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">
                    {new Date(member.joinedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {member.role !== 'owner' && canManageTeam && (
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!canManageTeam && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          ℹ️ Contact your account owner or admin to manage team members
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold mb-4">Role Permissions</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="font-medium w-20">Owner:</span>
            <span className="text-gray-700">Full access to all features and billing</span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium w-20">Admin:</span>
            <span className="text-gray-700">Manage team, change plans, view billing</span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium w-20">Member:</span>
            <span className="text-gray-700">Use product features, view usage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
