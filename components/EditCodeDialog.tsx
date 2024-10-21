'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Code } from '@/types/group'

interface EditCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (code: Code) => void
  code: Code | null
}

export default function EditCodeDialog({ isOpen, onClose, onEdit, code }: EditCodeDialogProps) {
  const [editedCode, setEditedCode] = useState('')
  const [globalPercentage, setGlobalPercentage] = useState('')
  const [clientPercentage, setClientPercentage] = useState('')

  useEffect(() => {
    if (code) {
      setEditedCode(code.code)
      setGlobalPercentage(code.globalPercentage.toString())
      setClientPercentage(code.clientPercentage.toString())
    }
  }, [code])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code) {
      onEdit({
        ...code,
        code: editedCode,
        globalPercentage: Number(globalPercentage),
        clientPercentage: Number(clientPercentage)
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Code</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Code
              </Label>
              <Input
                id="edit-code"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-global-percentage" className="text-right">
                Global %
              </Label>
              <Input
                id="edit-global-percentage"
                type="number"
                value={globalPercentage}
                onChange={(e) => setGlobalPercentage(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-client-percentage" className="text-right">
                Client %
              </Label>
              <Input
                id="edit-client-percentage"
                type="number"
                value={clientPercentage}
                onChange={(e) => setClientPercentage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Code</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}