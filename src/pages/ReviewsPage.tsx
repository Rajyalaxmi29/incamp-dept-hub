import { Clock, CheckCircle, Timer, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { problemStatements, alerts, dashboardMetrics } from '@/data/mockData';
import { differenceInDays, parseISO } from 'date-fns';

export default function ReviewsPage() {
  const daysUntilDeadline = differenceInDays(
    parseISO(dashboardMetrics.deadlineDate),
    new Date()
  );

  const reviewablePS = problemStatements.filter(
    (ps) => ps.status !== 'draft'
  );

  const columns = [
    {
      key: 'title',
      header: 'PS Title',
      render: (ps: typeof problemStatements[0]) => (
        <div className="max-w-xs">
          <p className="text-xs text-muted-foreground">{ps.id}</p>
          <p className="font-medium text-foreground truncate">{ps.title}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category / Theme',
      render: (ps: typeof problemStatements[0]) => (
        <div>
          <p className="font-medium text-foreground">{ps.category}</p>
          <p className="text-xs text-muted-foreground">{ps.theme}</p>
        </div>
      ),
    },
    {
      key: 'lastUpdated',
      header: 'Last Submission',
    },
    {
      key: 'assignedSpoc',
      header: 'Assigned SPOC',
    },
    {
      key: 'status',
      header: 'Status',
      render: (ps: typeof problemStatements[0]) => <StatusBadge status={ps.status} />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Reviews & Approvals</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track the review status of your submitted problem statements
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
            title="Days to Deadline"
            value={daysUntilDeadline}
            icon={Timer}
            variant={daysUntilDeadline < 3 ? 'danger' : 'default'}
          />
          <MetricCard
            title="Revision Needed"
            value={dashboardMetrics.revisionNeeded}
            icon={AlertTriangle}
            variant="danger"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                Submitted Problem Statements
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Review status is managed by Institution Admin. You can view and respond to feedback.
              </p>
            </div>
            <DataTable
              columns={columns}
              data={reviewablePS}
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
