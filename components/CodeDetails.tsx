'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Code } from '@/types/group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import EditCodeDialog from '@/components/EditCodeDialog';
import EditUserDialog from '@/components/EditUserDialog';
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

const mockCode: Code = {
  id: '1',
  code: '12345',
  globalPercentage: 25,
  clientPercentage: 30,
};

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', percentage: 15 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', percentage: 20 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', percentage: 10 },
];

export default function CodeDetails({
  groupId,
  codeId,
}: {
  groupId: string;
  codeId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState<Code>(mockCode);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditCodeDialogOpen, setIsEditCodeDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCode = (updatedCode: Code) => {
    setCode(updatedCode);
    setIsEditCodeDialogOpen(false);
    toast({
      title: "Code Updated",
      description: `Code ${updatedCode.code} has been updated successfully.`,
    });
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditUserDialogOpen(false);
    setEditingUser(null);
    toast({
      title: "User Updated",
      description: `User ${updatedUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Removed",
      description: "The user has been successfully removed from this code.",
      variant: "destructive",
    });
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Group
        </Button>
        <h1 className="text-3xl font-bold ml-4">Code: {code.code}</h1>
        <Button
          variant="outline"
          size="sm"
          className="ml-4"
          onClick={() => setIsEditCodeDialogOpen(true)}
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit Code
        </Button>
      </div>
      <div className="mb-6">
        <p>Global Percentage: {code.globalPercentage}%</p>
        <p>Client Percentage: {code.clientPercentage}%</p>
      </div>

      <div className="mb-6">
        <Input
          className="max-w-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User %</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link href={`/group/${groupId}/code/${codeId}/users`}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/group/${groupId}/code/${codeId}/users`}>
                  {user.email}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/group/${groupId}/code/${codeId}/users`}>
                  {user.percentage}%
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/group/${groupId}/code/${codeId}/users`}>
                  {user.id}
                </Link>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => {
                    setEditingUser(user);
                    setIsEditUserDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setUserToDelete(user.id)
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
        isOpen={isEditCodeDialogOpen}
        onClose={() => setIsEditCodeDialogOpen(false)}
        onEdit={handleEditCode}
        code={code}
      />

      <EditUserDialog
        isOpen={isEditUserDialogOpen}
        onClose={() => {
          setIsEditUserDialogOpen(false);
          setEditingUser(null);
        }}
        onEdit={handleEditUser}
        user={editingUser}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will remove the user from this code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => userToDelete && handleDeleteUser(userToDelete)}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}