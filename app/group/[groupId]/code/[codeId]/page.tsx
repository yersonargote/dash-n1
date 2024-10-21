import { Suspense } from 'react'
import CodeDetails from '@/components/CodeDetails'
import { Skeleton } from '@/components/ui/skeleton'

export default function CodePage({ params }: { params: { groupId: string, codeId: string } }) {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <CodeDetails groupId={params.groupId} codeId={params.codeId} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  // In a real application, you would fetch this data from an API or database
  const groups = ['1', '2', '3'] // Example group IDs
  const codes = ['1', '2', '3'] // Example code IDs

  return groups.flatMap((groupId) =>
    codes.map((codeId) => ({
      groupId: groupId,
      codeId: codeId,
    }))
  )
}