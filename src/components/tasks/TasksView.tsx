import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/i18n';
import { TaskItem, TaskType, TaskPriority } from '../../types';
import {
  CalendarCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PhoneCall,
  Hotel,
  CreditCard,
  Bus
} from 'lucide-react';

export const TasksView: React.FC = () => {
  const { language, tasks, toggleTask, addTask, setSelectedBookingId, setActiveModule } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskType>('Call Customer');
  const [customerName, setCustomerName] = useState('Ahmed Hassan');
  const [bookingId, setBookingId] = useState('TR-2044');
  const [owner, setOwner] = useState('Omar Farouk');
  const [dueDate, setDueDate] = useState('2026-10-06');
  const [priority, setPriority] = useState<TaskPriority>('High');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      type,
      relatedCustomerName: customerName,
      relatedBookingId: bookingId,
      owner,
      dueDate,
      priority,
      status: 'Pending'
    });
    setIsModalOpen(false);
    setTitle('');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesType = filterType === 'All' || t.type === filterType;
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getPriorityLabel = (p: TaskPriority) => {
    if (language !== 'ar') return p;
    switch (p) {
      case 'Urgent': return 'عاجل جداً';
      case 'High': return 'مرتفع';
      case 'Medium': return 'متوسط';
      case 'Low': return 'منخفض';
    }
  };

  const getTypeLabel = (t: string) => {
    if (language !== 'ar') return t;
    switch (t) {
      case 'Call Customer': return 'الاتصال بالعميل';
      case 'Confirm Hotel': return 'تأكيد حجز الفندق';
      case 'Collect Payment': return 'تحصيل الدفعة';
      case 'Assign Bus': return 'تعيين الأتوبيس';
      case 'Check Supplier': return 'مراجعة المورد';
      case 'Send Voucher': return 'إرسال الفاوتشر';
      default: return t;
    }
  };

  const getPriorityBadge = (p: TaskPriority) => {
    const map: Record<TaskPriority, string> = {
      Urgent: 'bg-rose-100 text-rose-800 border-rose-200 font-bold',
      High: 'bg-amber-100 text-amber-900 border-amber-200 font-semibold',
      Medium: 'bg-blue-50 text-blue-800 border-blue-200',
      Low: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] border ${map[p]}`}>
        {getPriorityLabel(p)}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {getTranslation(language, 'nav_followups')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar'
              ? 'مركز المهام والمتابعات اليومية: اتصالات العملاء، تأكيد الفنادق، التحصيل وتعيين الأتوبيس'
              : 'Operational task center: follow-up calls, hotel vouchers, payments & bus checklists'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ar' ? '+ إضافة مهمة جديدة' : '+ Create Task'}</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">{language === 'ar' ? 'نوع المهمة:' : 'Task Type:'}</span>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer"
            >
              <option value="All">{language === 'ar' ? 'جميع الأنواع' : 'All Types'}</option>
              <option value="Call Customer">{language === 'ar' ? 'اتصال بالعميل' : 'Call Customer'}</option>
              <option value="Confirm Hotel">{language === 'ar' ? 'تأكيد الفندق' : 'Confirm Hotel'}</option>
              <option value="Collect Payment">{language === 'ar' ? 'تحصيل الدفعة' : 'Collect Payment'}</option>
              <option value="Assign Bus">{language === 'ar' ? 'تعيين الأتوبيس' : 'Assign Bus'}</option>
              <option value="Check Supplier">{language === 'ar' ? 'مراجعة المورد' : 'Check Supplier'}</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">{language === 'ar' ? 'الحالة:' : 'Status:'}</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer"
            >
              <option value="All">{language === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
              <option value="Pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
              <option value="Completed">{language === 'ar' ? 'مكتملة' : 'Completed'}</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500">
          {filteredTasks.length} {language === 'ar' ? 'مهام' : 'Tasks'}
        </span>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
        {filteredTasks.map(task => {
          const isDone = task.status === 'Completed';

          return (
            <div
              key={task.id}
              className={`p-3.5 flex items-start justify-between gap-3 transition-colors ${
                isDone ? 'bg-slate-50/70 text-slate-400' : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                <div>
                  <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3 flex-wrap">
                    <span>
                      {language === 'ar' ? 'العميل: ' : 'Client: '}
                      <strong className="text-slate-700">{task.relatedCustomerName}</strong>
                    </span>
                    {task.relatedBookingId && (
                      <span>
                        · {language === 'ar' ? 'الحجز: ' : 'Booking: '}
                        <strong className="font-mono text-amber-800">{task.relatedBookingId}</strong>
                      </span>
                    )}
                    <span>
                      · {language === 'ar' ? 'المسؤول: ' : 'Owner: '}
                      <strong className="text-slate-700">{task.owner}</strong>
                    </span>
                    <span>
                      · {language === 'ar' ? 'النوع: ' : 'Type: '}
                      <span className="text-slate-600">{getTypeLabel(task.type)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-500">
                    {language === 'ar' ? 'الاستحقاق: ' : 'Due: '}
                    {task.dueDate}
                  </div>
                  <div className="mt-0.5">{getPriorityBadge(task.priority)}</div>
                </div>
                {task.relatedBookingId && (
                  <button
                    onClick={() => {
                      setSelectedBookingId(task.relatedBookingId!);
                      setActiveModule('booking-detail');
                    }}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {language === 'ar' ? 'فتح الحجز' : 'Open Booking'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm mb-3">
              {language === 'ar' ? 'إنشاء مهمة متابعة تشغيلية جديدة' : 'Create Operational Follow-up Task'}
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  {language === 'ar' ? 'عنوان المهمة *' : 'Task Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: الاتصال بأحمد حسن لتأكيد نقطة ركوب سيدي جابر' : 'e.g. Call Ahmed Hassan to verify bus pickup point'}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'نوع المهمة' : 'Task Type'}
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as TaskType)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded"
                  >
                    <option value="Call Customer">{language === 'ar' ? 'اتصال بالعميل' : 'Call Customer'}</option>
                    <option value="Confirm Hotel">{language === 'ar' ? 'تأكيد الفندق' : 'Confirm Hotel'}</option>
                    <option value="Collect Payment">{language === 'ar' ? 'تحصيل الدفعة' : 'Collect Payment'}</option>
                    <option value="Assign Bus">{language === 'ar' ? 'تعيين الأتوبيس' : 'Assign Bus'}</option>
                    <option value="Check Supplier">{language === 'ar' ? 'مراجعة المورد' : 'Check Supplier'}</option>
                    <option value="Send Voucher">{language === 'ar' ? 'إرسال الفاوتشر' : 'Send Voucher'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'الأولوية' : 'Priority'}
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as TaskPriority)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded"
                  >
                    <option value="Urgent">{language === 'ar' ? 'عاجل جداً' : 'Urgent'}</option>
                    <option value="High">{language === 'ar' ? 'مرتفع' : 'High'}</option>
                    <option value="Medium">{language === 'ar' ? 'متوسط' : 'Medium'}</option>
                    <option value="Low">{language === 'ar' ? 'منخفض' : 'Low'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'العميل المرتبط' : 'Related Customer'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    {language === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-bold hover:bg-slate-800"
                >
                  {language === 'ar' ? 'حفظ المهمة' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
