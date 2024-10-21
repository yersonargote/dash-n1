'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import GroupCard from '@/components/GroupCard'
import CreateGroupDialog from '@/components/CreateGroupDialog'
import { Group } from '@/types/group'
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const initialGroups: Group[] = [
  { id: '1', name: 'Marketing', description: 'Marketing team projects' },
  { id: '2', name: 'Development', description: 'Software development team' },
  { id: '3', name: 'Sales', description: 'Sales and customer relations' },
]

export default function GroupDashboard() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateGroup = (newGroup: Group) => {
    setGroups([...groups, { ...newGroup, id: Date.now().toString() }])
    setIsCreateDialogOpen(false)
    toast({
      title: "Group Created",
      description: `${newGroup.name} has been created successfully.`,
    })
  }

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id))
    setDeleteConfirmOpen(false)
    setGroupToDelete(null)
    const deletedGroup = groups.find(group => group.id === id)
    toast({
      title: "Group Deleted",
      description: `${deletedGroup?.name} has been deleted successfully.`,
      variant: "destructive",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-sm"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => (
          <GroupCard 
            key={group.id} 
            group={group} 
            onDelete={() => {
              setGroupToDelete(group.id)
              setDeleteConfirmOpen(true)
            }} 
          />
        ))}
      </div>
      <CreateGroupDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateGroup}
      />
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this group?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the group and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => groupToDelete && handleDeleteGroup(groupToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}