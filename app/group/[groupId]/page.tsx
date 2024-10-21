import { Suspense } from 'react'
import GroupDetails from '@/components/GroupDetails'
import { Skeleton } from '@/components/ui/skeleton'

export default function GroupPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <GroupDetails groupId={params.groupId} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  // In a real application, you would fetch this data from an API or database
  const groups = ['1', '2', '3'] // Example group IDs

  return groups.map((groupId) => ({
    groupId: groupId,
  }))
}