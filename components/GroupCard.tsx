import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Group } from '@/types/group'

interface GroupCardProps {
  group: Group
  onDelete: (id: string) => void
}

export default function GroupCard({ group, onDelete }: GroupCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{group.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/group/${group.id}`} passHref>
          <Button variant="outline">View Details</Button>
        </Link>
        <Button variant="destructive" onClick={() => onDelete(group.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}