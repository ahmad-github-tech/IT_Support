/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X, 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  BarChart3, 
  Settings, 
  Search,
  Calendar,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  // Mock data for demonstration
  const [tickets] = useState([
    { 
      id: 'INC-842', 
      project: 'HR-Portal', 
      assignee: 'John.D', 
      status: 'Open', 
      date: '2026-05-04 10:20', 
      priority: 'Critical', 
      description: 'Laptop battery not charging after update.', 
      level: 'L1',
      comments: [
        { user: 'John.D', text: 'Diagnostic run: Battery health shows 20%.', time: '2026-05-04 11:05' },
        { user: 'Admin', text: 'Replacement battery ordered.', time: '2026-05-04 12:30' }
      ]
    },
    { 
      id: 'INC-841', 
      project: 'Finance-Dashboard', 
      assignee: 'Sarah.W', 
      status: 'Pending', 
      date: '2026-05-04 09:15', 
      priority: 'High', 
      description: 'VPN connection dropping every 15 minutes.', 
      level: 'L2',
      comments: []
    },
    { id: 'INC-840', project: 'Legacy-Migration', assignee: 'Michael.K', status: 'Resolved', date: '2026-05-03 14:30', priority: 'Medium', description: 'Software installation: Adobe Creative Cloud setup.', level: 'L1', comments: [{ user: 'Michael.K', text: 'Installation complete.', time: '2026-05-03 15:45' }] },
    { id: 'INC-839', project: 'HR-Portal', assignee: 'John.D', status: 'Open', date: '2026-05-03 11:20', priority: 'Critical', description: 'Access permissions for finance shared folder.', level: 'L3', comments: [] },
    { id: 'INC-838', project: 'Customer-Care', assignee: 'Emily.R', status: 'Resolved', date: '2026-05-02 16:45', priority: 'Low', description: 'Outlook calendar sync issue on mobile.', level: 'L1', comments: [] },
    { id: 'INC-837', project: 'Finance-Dashboard', assignee: 'Sarah.W', status: 'Closed', date: '2026-05-02 13:10', priority: 'Medium', description: 'Printer driver installation error.', level: 'L1', comments: [] },
    { id: 'INC-836', project: 'HR-Portal', assignee: 'Michael.K', status: 'In Progress', date: '2026-05-02 10:05', priority: 'High', description: 'Workday login timeout issues.', level: 'L2', comments: [] },
  ]);

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1e293b] text-slate-300 flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
            <TicketIcon className="w-6 h-6 text-blue-400" />
            IT Support
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <Search size={18} />
            All Tickets
          </button>
          <button 
            onClick={() => setActiveTab('entry')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'entry' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <Plus size={18} />
            New Ticket
          </button>
          
          <div className="pt-4 pb-2 px-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Categories</div>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-md text-sm text-left">Hardware</button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-md text-sm text-left">Software</button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-md text-sm text-left">Network</button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Admin User</p>
              <p className="text-[10px] truncate text-slate-400">admin@itsupport.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {activeTab === 'dashboard' ? 'Performance Dashboard' : 
               activeTab === 'list' ? 'Ticket Queue' : 'Request Ticket'}
            </h2>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-bold uppercase">System Online</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('entry')}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Ticket
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f1f5f9]">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPICard label="Total Tickets" value="1,284" sub="+12% from last week" subColor="text-green-600" />
                  <KPICard label="Open Tickets" value="42" sub="Average 4.2h resolution" subColor="text-blue-600" />
                  <KPICard label="Pending Approval" value="18" sub="5 critical items" subColor="text-orange-500" />
                  <KPICard label="Resolved (MTD)" value="892" sub="94.2% SLA Met" subColor="text-green-600" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Recent Activity Table Preview */}
                  <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">Recent Support Requests</h3>
                      <button onClick={() => setActiveTab('list')} className="text-xs text-blue-600 font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Subject</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Priority</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                          {tickets.slice(0, 5).map(ticket => (
                            <tr key={ticket.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => { setSelectedTicket(ticket); setActiveTab('list'); }}>
                              <td className="px-4 py-3 font-mono text-xs text-slate-400">#{ticket.id}</td>
                              <td className="px-4 py-3 font-semibold text-slate-700">{ticket.description.substring(0, 30)}...</td>
                              <td className="px-4 py-3 text-slate-600">{ticket.project}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase ${
                                  ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                  ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {ticket.priority}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="flex items-center gap-1.5 capitalize">
                                  <div className={`w-2 h-2 rounded-full ${
                                    ticket.status === 'Open' ? 'bg-blue-500' :
                                    ticket.status === 'Resolved' ? 'bg-green-500' :
                                    'bg-orange-400'
                                  }`}></div>
                                  {ticket.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Distribution Card */}
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Priority Distribution</h3>
                    <div className="space-y-4">
                      <DistRow label="CRITICAL" value={15} color="bg-red-500" />
                      <DistRow label="HIGH" value={42} color="bg-orange-400" />
                      <DistRow label="NORMAL" value={33} color="bg-blue-500" />
                      <DistRow label="LOW" value={10} color="bg-slate-400" />
                    </div>
                    <div className="pt-4 border-t border-slate-100 h-40">
                      <Pie 
                        data={{
                          labels: ['Hardware', 'Software', 'Network'],
                          datasets: [{ data: [35, 45, 20], backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'], borderWidth: 0 }]
                        }}
                        options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } } } }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'list' && (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex gap-6 h-full"
              >
                <div className={`transition-all duration-300 ${selectedTicket ? 'w-2/3' : 'w-full'}`}>
                  <TicketTable 
                    tickets={tickets} 
                    onSelectTicket={setSelectedTicket} 
                    selectedId={selectedTicket?.id} 
                  />
                </div>
                
                <AnimatePresence>
                  {selectedTicket && (
                    <motion.div 
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="w-1/3 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col sticky top-0 h-fit max-h-[calc(100vh-12rem)]"
                    >
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
                        <h3 className="font-bold text-slate-800">Ticket Details</h3>
                        <button onClick={() => setSelectedTicket(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                          <X size={18} />
                        </button>
                      </div>
                      <div className="p-6 space-y-6 overflow-y-auto">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket ID</p>
                            <h4 className="text-xl font-black text-slate-900">#{selectedTicket.id}</h4>
                          </div>
                          <span className={`px-2 py-1 text-[10px] rounded font-bold uppercase ${
                            selectedTicket.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {selectedTicket.priority}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <DetailItem label="Status" value={selectedTicket.status} />
                          <DetailItem label="Assigned To" value={selectedTicket.assignee} />
                          <DetailItem label="Project" value={selectedTicket.project} />
                          <DetailItem label="Level" value={selectedTicket.level} />
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Description</p>
                          <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100 leading-relaxed italic">
                            "{selectedTicket.description}"
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notes & Comments</p>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 rounded">{selectedTicket.comments?.length || 0}</span>
                          </div>
                          <div className="space-y-3">
                            {selectedTicket.comments?.length > 0 ? (
                              selectedTicket.comments.map((comment: any, idx: number) => (
                                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-900">{comment.user}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">{comment.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-tight">{comment.text}</p>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-4 border-2 border-dashed border-slate-100 rounded-lg">
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No comments yet</p>
                              </div>
                            )}
                            
                            <div className="relative mt-2">
                              <input 
                                type="text" 
                                placeholder="Add a note..." 
                                className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 font-bold text-xs">
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Timeline</p>
                          <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                            <TimelineItem date={selectedTicket.date} label="Ticket Created" active />
                            <TimelineItem date="2026-05-04 10:45" label="Assigned to Agent" />
                            <TimelineItem date="--" label="Resolution Expected" />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                          <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors">UPDATE STATUS</button>
                          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">TRANSFER L2</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'entry' && (
              <motion.div 
                key="entry"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">New Support Ticket</h2>
                  </div>
                  <TicketEntryForm onCancel={() => setActiveTab('dashboard')} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <footer className="h-8 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[10px] text-slate-500 shrink-0 font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              DB: 10.0.42.1 (CONNECTED)
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              STORAGE: 42% UTILIZED
            </span>
          </div>
          <div>LAST SYNC: TODAY 14:09:52</div>
        </footer>
      </main>
    </div>
  );
}

// Sub-components for better organization
function KPICard({ label, value, sub, subColor }: { label: string, value: string, sub: string, subColor: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black mt-1 text-slate-900 tabular-nums leading-none">{value}</p>
      <div className={`mt-2 text-[10px] font-bold ${subColor}`}>{sub}</div>
    </div>
  );
}

function DistRow({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-black mb-1.5 text-slate-500 tracking-wider">
        <span>{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`${color} h-full transition-all duration-1000 ease-out`}
        />
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}

function TimelineItem({ date, label, active = false }: { date: string, label: string, active?: boolean }) {
  return (
    <div className="flex gap-4 items-center">
      <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 transition-colors ${active ? 'border-blue-500' : 'border-slate-200'}`}></div>
      <div>
        <p className={`text-xs font-bold ${active ? 'text-slate-800' : 'text-slate-500'}`}>{label}</p>
        <p className="text-[10px] text-slate-400 font-mono tracking-tighter">{date}</p>
      </div>
    </div>
  );
}

function TicketTable({ tickets, onSelectTicket, selectedId }: { tickets: any[], onSelectTicket: (t: any) => void, selectedId?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 6;

  const sortedTickets = [...tickets].sort((a, b) => {
    const valA = a[sortField as keyof typeof a];
    const valB = b[sortField as keyof typeof b];
    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const paginatedTickets = sortedTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">Detailed Queue</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input className="text-xs border-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none border" placeholder="Filter ID..." />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-black border-b border-slate-200 sticky top-0">
            <tr>
              <SortHeader label="Ticket ID" field="id" current={sortField} order={sortOrder} onClick={toggleSort} />
              <SortHeader label="Project" field="project" current={sortField} order={sortOrder} onClick={toggleSort} />
              <SortHeader label="Assigned Employee" field="assignee" current={sortField} order={sortOrder} onClick={toggleSort} />
              <SortHeader label="Priority" field="priority" current={sortField} order={sortOrder} onClick={toggleSort} />
              <SortHeader label="Status" field="status" current={sortField} order={sortOrder} onClick={toggleSort} />
              <SortHeader label="Generation Date" field="date" current={sortField} order={sortOrder} onClick={toggleSort} />
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100 bg-white">
            {paginatedTickets.map(ticket => (
              <tr 
                key={ticket.id} 
                onClick={() => onSelectTicket(ticket)}
                className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedId === ticket.id ? 'bg-blue-50/50 ring-1 ring-inset ring-blue-100' : ''}`}
              >
                <td className="px-4 py-4 font-mono text-xs text-slate-400 font-bold">#{ticket.id}</td>
                <td className="px-4 py-4 font-bold text-slate-700">{ticket.project}</td>
                <td className="px-4 py-4 text-slate-600 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">{ticket.assignee[0]}</div>
                  {ticket.assignee}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-0.5 text-[9px] rounded font-black uppercase ${
                    ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <div className={`w-2 h-2 rounded-full ${
                      ticket.status === 'Open' ? 'bg-blue-500' :
                      ticket.status === 'Resolved' ? 'bg-green-500' :
                      ticket.status === 'Closed' ? 'bg-slate-400' :
                      'bg-orange-400'
                    }`}></div>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-400 font-mono text-[10px]">{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Container */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-xl">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, tickets.length)} of {tickets.length}
        </span>
        <div className="flex gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
          >
            PREV
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

function SortHeader({ label, field, current, order, onClick }: { label: string, field: string, current: string, order: string, onClick: (f: string) => void }) {
  return (
    <th className="px-4 py-3 cursor-pointer group active:bg-slate-100 transition-colors whitespace-nowrap" onClick={() => onClick(field)}>
      <div className="flex items-center gap-1">
        {label}
        <div className={`transition-opacity ${current === field ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
          {current === field && order === 'desc' ? '↓' : '↑'}
        </div>
      </div>
    </th>
  );
}

function TicketEntryForm({ onCancel }: { onCancel: () => void }) {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormGroup label="Project Assignment">
        <select className="form-select-hd">
          <option>HR-Portal</option>
          <option>Finance-Dashboard</option>
          <option>Legacy-Migration</option>
          <option>Customer-Care</option>
        </select>
      </FormGroup>

      <FormGroup label="Ticket ID">
        <input type="text" placeholder="e.g. INC-4052" className="form-input-hd" />
      </FormGroup>

      <div className="md:col-span-2">
        <FormGroup label="Issue Description">
          <textarea rows={3} placeholder="Briefly describe the problem..." className="form-input-hd resize-none"></textarea>
        </FormGroup>
      </div>

      <FormGroup label="Assign to Employee">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <select className="form-select-hd pl-9">
            <option>John.D</option>
            <option>Sarah.W</option>
            <option>Michael.K</option>
            <option>Emily.R</option>
          </select>
        </div>
      </FormGroup>

      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Support Level">
          <select className="form-select-hd">
            <option>L1</option>
            <option>L2</option>
            <option>L3</option>
          </select>
        </FormGroup>
        <FormGroup label="Priority">
          <select className="form-select-hd">
            <option>P3 - Medium</option>
            <option>P1 - Critical</option>
            <option>P2 - High</option>
            <option>P4 - Low</option>
          </select>
        </FormGroup>
      </div>

      <FormGroup label="Generation Date/Time">
        <input type="datetime-local" className="form-input-hd font-mono text-[10px]" defaultValue="2026-05-04T19:19" />
      </FormGroup>

      <FormGroup label="Current Status">
        <select className="form-select-hd">
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
      </FormGroup>

      <div className="md:col-span-2 flex gap-4 mt-6">
        <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 uppercase tracking-tighter">
          <Plus size={20} />
          Add Record
        </button>
        <button type="button" onClick={onCancel} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-black py-4 rounded-xl transition-all uppercase tracking-widest text-[10px]">
          Cancel
        </button>
      </div>

      <style>{`
        .form-input-hd, .form-select-hd {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          outline: none;
          transition: all 0.2s;
        }
        .form-input-hd:focus, .form-select-hd:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      `}</style>
    </form>
  );
}

function FormGroup({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 flex flex-col">
      <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest px-1 leading-none">{label}</label>
      {children}
    </div>
  );
}
