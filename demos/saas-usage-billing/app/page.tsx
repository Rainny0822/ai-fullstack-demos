'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Overview } from '@/components/Overview'
import { Plans } from '@/components/Plans'
import { Usage } from '@/components/Usage'
import { Invoices } from '@/components/Invoices'
import { Team } from '@/components/Team'

type Page = 'overview' | 'plans' | 'usage' | 'invoices' | 'team'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('overview')

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />
      case 'plans':
        return <Plans />
      case 'usage':
        return <Usage />
      case 'invoices':
        return <Invoices />
      case 'team':
        return <Team />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto bg-gray-50">{renderPage()}</main>
    </div>
  )
}
