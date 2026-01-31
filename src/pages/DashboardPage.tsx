import {
  FileText,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Timer,
  Eye,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ProgressSteps } from '@/components/dashboard/ProgressSteps';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { problemStatements, alerts, dashboardMetrics, submissionCycle } from '@/data/mockData';
import { differenceInDays, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const daysUntilDeadline = differenceInDays(
    parseISO(dashboardMetrics.deadlineDate),
    new Date()
  );

  const recentPS = problemStatements.slice(0, 5);

  const columns = [
    {
      key: 'id',
      header: 'PS ID & Title',
      render: (ps: typeof problemStatements[0]) => (
        <div>
          <p className="text-xs text-muted-foreground">{ps.id}</p>
          <p className="font-medium text-foreground">{ps.title}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category / Track',
      render: (ps: typeof problemStatements[0]) => (
        <div>
          <p className="font-medium text-foreground">{ps.category}</p>
          <p className="text-xs text-muted-foreground">{ps.theme}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (ps: typeof problemStatements[0]) => <StatusBadge status={ps.status} />,
    },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
    },
    {
      key: 'assignedSpoc',
      header: 'Assigned SPOC',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (ps: typeof problemStatements[0]) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/problem-statements')}
          className="text-primary hover:text-primary/80"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your department's problem statement activity
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <MetricCard
            title="Total Prepared"
            value={dashboardMetrics.totalPrepared}
            icon={FileText}
          />
          <MetricCard
            title="Submitted"
            value={dashboardMetrics.submittedToInstitution}
            icon={Send}
            variant="primary"
          />
          <MetricCard
            title="Pending Review"
            value={dashboardMetrics.pendingReview}
            icon={Clock}
            variant="warning"
          />
          <MetricCard
            title="Approved"
            value={dashboardMetrics.approved}
            icon={CheckCircle}
            variant="success"
          />
          <MetricCard
            title="Revision Needed"
            value={dashboardMetrics.revisionNeeded}
            icon={AlertTriangle}
            variant="danger"
          />
          <MetricCard
            title="Days Left"
            value={daysUntilDeadline}
            icon={Timer}
            variant={daysUntilDeadline < 3 ? 'danger' : 'default'}
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-6">
            Problem Statement Submission Cycle
          </h3>
          <ProgressSteps stages={submissionCycle.stages} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Problem Statements Table */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Recent Problem Statements
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/problem-statements')}
                className="text-primary"
              >
                View All
              </Button>
            </div>
            <DataTable
              columns={columns}
              data={recentPS}
              keyExtractor={(ps) => ps.id}
            />
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
