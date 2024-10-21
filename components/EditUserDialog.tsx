'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/types/group'

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (user: User) => void
  user: User | null
}

export default function EditUserDialog({ isOpen, onClose, onEdit, user }: EditUserDialogProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [percentage, setPercentage] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPercentage(user.percentage.toString())
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      onEdit({ ...user, name, email, percentage: Number(percentage) })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-percentage" className="text-right">
                Percentage
              </Label>
              <Input
                id="edit-percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}