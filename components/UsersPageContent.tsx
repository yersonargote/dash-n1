'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import AddUserDialog from '@/components/AddUserDialog'
import EditUserDialog from '@/components/EditUserDialog'
import { useToast } from "@/hooks/use-toast"

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', percentage: 15 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', percentage: 20 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', percentage: 10 },
]

export default function UsersPageContent({ params }: { params: { groupId: string; codeId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = (newUser: User) => {
    setUsers([...users, { ...newUser, id: Date.now().toString() }])
    setIsAddDialogOpen(false)
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    })
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsEditDialogOpen(false)
    setEditingUser(null)
    toast({
      title: "User Updated",
      description: `${updatedUser.name}'s information has been updated.`,
    })
  }

  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id)
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} has been removed from the group.`,
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Code
        </Button>
        <h1 className="text-3xl font-bold ml-4">Users for Code: {params.codeId}</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User %</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.percentage}%</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setEditingUser(user)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddUserDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddUser}
      />
      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingUser(null)
        }}
        onEdit={handleEditUser}
        user={editingUser}
      />
    </div>
  )
}