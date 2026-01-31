import { useState } from 'react';
import { User, Mail, Phone, Building, IdCard, Lock, LogOut } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
    });
    setIsPasswordDialogOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-2xl">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your account and department information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Header with Avatar */}
          <div className="bg-primary/5 p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg sm:text-xl">
                  {user ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground">{user?.name}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Department Admin</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{user?.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Role</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <IdCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Department Admin</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{user?.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Phone (Optional)</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {user?.phone || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Department Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Department Name</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{user?.department.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Faculty ID</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <IdCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{user?.department.facultyId}</span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs text-muted-foreground">Institution</Label>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{user?.department.institution}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Change Password Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and a new password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" required />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPasswordDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Update Password
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
