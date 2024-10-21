'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Code } from '@/types/group'

interface AddCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (code: Omit<Code, 'id'>) => void
}

export default function AddCodeDialog({ isOpen, onClose, onAdd }: AddCodeDialogProps) {
  const [code, setCode] = useState('')
  const [globalPercentage, setGlobalPercentage] = useState('')
  const [clientPercentage, setClientPercentage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      code,
      globalPercentage: Number(globalPercentage),
      clientPercentage: Number(clientPercentage)
    })
    setCode('')
    setGlobalPercentage('')
    setClientPercentage('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Code</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-code" className="text-right">
                Code
              </Label>
              <Input
                id="add-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-global-percentage" className="text-right">
                Global %
              </Label>
              <Input
                id="add-global-percentage"
                type="number"
                value={globalPercentage}
                onChange={(e) => setGlobalPercentage(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-client-percentage" className="text-right">
                Client %
              </Label>
              <Input
                id="add-client-percentage"
                type="number"
                value={clientPercentage}
                onChange={(e) => setClientPercentage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Code</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}