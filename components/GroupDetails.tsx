'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Group, Code } from '@/types/group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import EditCodeDialog from '@/components/EditCodeDialog'
import AddCodeDialog from '@/components/AddCodeDialog'
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

const mockGroup: Group = {
  id: '1',
  name: 'Marketing',
  description: 'Marketing team projects',
}

const mockCodes: Code[] = [
  { id: '1', code: '12345', globalPercentage: 25, clientPercentage: 30 },
  { id: '2', code: '67890', globalPercentage: 15, clientPercentage: 20 },
  { id: '3', code: '54321', globalPercentage: 35, clientPercentage: 40 },
]

export default function GroupDetails({ groupId }: { groupId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [group] = useState<Group>(mockGroup)
  const [codes, setCodes] = useState<Code[]>(mockCodes)
  const [searchTerm, setSearchTerm] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCode, setEditingCode] = useState<Code | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [codeToDelete, setCodeToDelete] = useState<string | null>(null)

  const filteredCodes = codes.filter(code =>
    code.code.includes(searchTerm)
  )

  const handleDeleteCode = (id: string) => {
    setCodes(codes.filter(code => code.id !== id))
    toast({
      title: "Code Deleted",
      description: "The code has been successfully deleted.",
      variant: "destructive",
    })
    setDeleteConfirmOpen(false)
    setCodeToDelete(null)
  }

  const handleEditCode = (updatedCode: Code) => {
    setCodes(codes.map(code => code.id === updatedCode.id ? updatedCode : code))
    setIsEditDialogOpen(false)
    setEditingCode(null)
    toast({
      title: "Code Updated",
      description: `Code ${updatedCode.code} has been updated successfully.`,
    })
  }

  const handleAddCode = (newCode: Omit<Code, 'id'>) => {
    const codeWithId = { ...newCode, id: Date.now().toString() }
    setCodes([...codes, codeWithId])
    setIsAddDialogOpen(false)
    toast({
      title: "Code Added",
      description: `New code ${newCode.code} has been added successfully.`,
    })
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-3xl font-bold ml-4">{group.name}</h1>
      </div>
      <p className="text-lg mb-6">{group.description}</p>
      
      <div className="flex justify-between items-center mb-6">
        <Input
          className="max-w-sm"
          placeholder="Search codes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Code
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Global %</TableHead>
            <TableHead>Client %</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCodes.map((code) => (
            <TableRow key={code.id}>
              <TableCell>
                <Link href={`/group/${groupId}/code/${code.id}`} className="text-blue-500 hover:underline">
                  {code.code}
                </Link>
              </TableCell>
              <TableCell>{code.globalPercentage}%</TableCell>
              <TableCell>{code.clientPercentage}%</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    setEditingCode(code)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setCodeToDelete(code.id)
                    setDeleteConfirmOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditCodeDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingCode(null)
        }}
        onEdit={handleEditCode}
        code={editingCode}
      />

      <AddCodeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddCode}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this code?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the code and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => codeToDelete && handleDeleteCode(codeToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}