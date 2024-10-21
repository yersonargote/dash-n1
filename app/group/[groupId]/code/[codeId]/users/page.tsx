import UsersPageContent from '@/components/UsersPageContent'

export default function UsersPage({ params }: { params: { groupId: string; codeId: string } }) {
  return <UsersPageContent params={params} />
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