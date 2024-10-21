import { Suspense } from 'react'
import GroupDashboard from '@/components/GroupDashboard'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Groups Dashboard</h1>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <GroupDashboard />
      </Suspense>
    </div>
  )
}