import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import '../css/app.css';

// حزمة أيقونات SVG ناعمة وعالية الدقة
const Icons = {
  Sparkles: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>,
  TrendingUp: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Server: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  CheckCircle: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Grid: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  List: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Activity: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Maximize: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>,
};

function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [liveLogs, setLiveLogs] = useState([
    'جاهز لتلقي طلبات Sanctum API',
    'اتصال قاعدة البيانات MySQL (fullstack_db) مستقر',
    'تجميع ملفات React 19 باستخدام Vite v8'
  ]);

  // حقول إضافة مشروع جديد
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Laravel 13 • React 19');
  const [newBudget, setNewBudget] = useState('22,000');
  const [newImage, setNewImage] = useState('');

  // مصفوفة المشاريع المزودة بصور عالية الجودة
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'منصة التجارة الإلكترونية ',
      category: 'Laravel 13 • React 19 • Tailwind v4',
      budget: '$38,500',
      progress: 95,
      status: 'نشط',
      updated: 'الآن',
      image: 'https://cdn.sanity.io/images/glznf05y/production/78fa84da571e1f3705298acc28db00d8c82a0238-1536x1024.avif'
    },
    {
      id: 2,
      name: 'تطبيق إدارة المبيعات والتحليلات',
      category: 'Flutter • Laravel Sanctum API',
      budget: '$24,000',
      progress: 100,
      status: 'مكتمل',
      updated: 'منذ ساعتين',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'بوابة تحليلات الذكاء الاصطناعي',
      category: 'Python • Machine Learning API',
      budget: '$52,000',
      progress: 48,
      status: 'قيد المراجعة',
      updated: 'منذ يومين',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD8Iyvp5LhiUZB1Iywwhl7R5GaHCRaCHCCHbbSXrBMhQ&s=10'
    },
    {
      id: 4,
      name: 'نظام طبيبك للرعاية الصحية الشاملة',
      category: 'Fullstack Microservices',
      budget: '$21,800',
      progress: 82,
      status: 'نشط',
      updated: 'منذ 3 أيام',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59SlTPygE43dOGWs3z-jWwhOJuFU34AcXd5hEG5Qh2kh0Rwyxzjk-wfg&s=10'
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const activities = [
        'تم تسجيل طلب GET جديد عبر Sanctum',
        'تم حفظ الجلسة بنجاح في MySQL',
        'تم تحديث مكونات React عبر Hot Reloading',
        'تم تحسين زمن الاستعلام إلى 0.6ms'
      ];
      const randomAct = activities[Math.floor(Math.random() * activities.length)];
      setLiveLogs(prev => [randomAct, prev[0], prev[1]]);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item = {
      id: Date.now(),
      name: newTitle,
      category: newCategory,
      budget: `$${newBudget}`,
      progress: 20,
      status: 'نشط',
      updated: 'الآن',
      image: newImage.trim() || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    };

    setProjects([item, ...projects]);
    setLiveLogs([`تمت إضافة مشروع جديد: "${newTitle}"`, ...liveLogs.slice(0, 2)]);
    setNewTitle('');
    setNewImage('');
    setIsAddDialogOpen(false);
  };

  const handleDeleteProject = (id) => {
    const proj = projects.find(p => p.id === id);
    if (proj) {
      setLiveLogs([`تم حذف المشروع: "${proj.name}"`, ...liveLogs.slice(0, 2)]);
    }
    setProjects(projects.filter(p => p.id !== id));
  };

  const toggleProjectStatus = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'نشط' ? 'مكتمل' : p.status === 'مكتمل' ? 'قيد المراجعة' : 'نشط';
        return { ...p, status: nextStatus, progress: nextStatus === 'مكتمل' ? 100 : p.progress };
      }
      return p;
    }));
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'الكل' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased relative selection:bg-indigo-500 selection:text-white overflow-x-hidden pb-12">
      
      {/* خلفيات ضوئية باستيل أنيقة */}
      <div className="fixed top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-br from-indigo-200/50 via-purple-200/40 to-pink-100/50 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-tr from-cyan-100/60 via-sky-200/40 to-indigo-100/50 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. الشريط العلوي الكريستالي النابض */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/75 border-b border-slate-200/80 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-500"></div>
              <div className="relative w-11 h-11 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 text-xl border border-slate-100 shadow-md">
                ⚡
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  AURA GLASS SHOWCASE
                </h1>
                
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] border border-emerald-200/80 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>LIVE SYSTEM</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Laravel 13 • React 19 • Tailwind CSS v4 • shadcn/ui</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-72">
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <Icons.Search />
              </div>
              <Input 
                type="text" 
                placeholder="بحث سريع بالمشاريع والتقنيات..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/80 border-slate-200/80 text-slate-800 placeholder:text-slate-400 pr-9 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs shadow-inner backdrop-blur-md transition-all"
              />
            </div>

            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-300 border border-white/30 flex items-center gap-2"
            >
              <Icons.Plus />
              <span>مشروع جديد</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-10 h-10 rounded-2xl p-0 bg-white border border-slate-200/80 hover:bg-slate-50 transition-all shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-1 right-1 border-2 border-white animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-1 right-1 border-2 border-white" />
                  <span className="font-bold text-xs text-indigo-600">سامي</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 bg-white/95 backdrop-blur-2xl border-slate-200/80 text-slate-800 rounded-2xl p-2 shadow-2xl">
                <DropdownMenuLabel className="font-semibold text-xs text-indigo-600 px-3 py-2">حساب المسؤول (سامي المنيري)</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 my-1" />
                <DropdownMenuItem className="rounded-xl hover:bg-slate-100/80 cursor-pointer text-xs py-2">👤 الملف الشخصي والتراخيص</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-slate-100/80 cursor-pointer text-xs py-2">🔑 مفاتيح Laravel Sanctum API</DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-slate-100/80 cursor-pointer text-xs py-2">⚙️ إعدادات قاعدة بيانات MySQL</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 my-1" />
                <DropdownMenuItem className="rounded-xl hover:bg-red-50 text-red-600 cursor-pointer text-xs py-2 font-semibold">تسجيل الخروج</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

        </div>
      </header>

      {/* 2. المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative z-10">
        
        {/* شريط الأنشطة الحية */}
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/60 rounded-2xl p-3 px-4 backdrop-blur-md flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs text-indigo-900 font-semibold overflow-hidden">
            <span className="p-1 rounded-lg bg-indigo-600 text-white animate-pulse">
              <Icons.Activity />
            </span>
            <span className="text-slate-500">نشاط النظام المباشر:</span>
            <span className="font-mono text-indigo-600 font-bold transition-all duration-300">
              {liveLogs[0]}
            </span>
          </div>

          <span className="text-[10px] bg-white/80 px-2.5 py-1 rounded-full text-slate-500 font-mono border border-slate-200/80 hidden sm:inline-block">
            MySQL Sync: Active
          </span>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.14)] hover:-translate-y-1 transition-all duration-300 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-slate-500">إجمالي الميزانيات</CardTitle>
              <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                <Icons.TrendingUp />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                $136,300
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden p-0.5 border border-slate-200/50">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full w-[86%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5 flex justify-between font-medium">
                <span>المستخدم من الميزانيات</span>
                <span className="text-indigo-600 font-bold">86%</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.14)] hover:-translate-y-1 transition-all duration-300 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-slate-500">المشاريع النشطة</CardTitle>
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 shadow-sm">
                <Icons.Sparkles />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-purple-600 transition-colors">
                {projects.length} مشاريع
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden p-0.5 border border-slate-200/50">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full w-[70%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5 flex justify-between font-medium">
                <span>حالة التطوير والتنفيذ</span>
                <span className="text-purple-600 font-bold">نشط بقوة</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.14)] hover:-translate-y-1 transition-all duration-300 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-slate-500">معدل الإنجاز الكلي</CardTitle>
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                <Icons.CheckCircle />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                81.2%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden p-0.5 border border-slate-200/50">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[81.2%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5 flex justify-between font-medium">
                <span>الأنظمة المنجزة</span>
                <span className="text-emerald-600 font-bold">+18% هذا الأسبوع</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(14,165,233,0.14)] hover:-translate-y-1 transition-all duration-300 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-slate-500">سرعة الاستجابة</CardTitle>
              <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
                <Icons.Server />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                0.8 ms
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden p-0.5 border border-slate-200/50">
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full w-[100%]" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5 flex justify-between font-medium">
                <span>Vite Hot Reloading</span>
                <span className="text-sky-600 font-bold">فائق السرعة</span>
              </p>
            </CardContent>
          </Card>

        </div>

        {/* 3. مركز معرض كروت الصور الفاخرة (Image Glass Cards Showcase) */}
        <Card className="bg-white/80 backdrop-blur-2xl border-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] rounded-3xl overflow-hidden relative">
          
          <div className="p-6 border-b border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
                <span>معرض المشاريع والتطبيقات المصورة</span>
                <span className="text-xs px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-200/60 shadow-sm">
                  {filteredProjects.length} مشاريع
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">معاينة صور التنسيقات والواجهات المربوطة بالنظام</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-sm">
                {['الكل', 'نشط', 'مكتمل', 'قيد المراجعة'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === status
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  title="عرض شبكي بكروت الصور (Grid View)"
                  className={`p-1.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  <Icons.Grid />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  title="عرض جدول (Table View)"
                  className={`p-1.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  <Icons.List />
                </button>
              </div>

            </div>
          </div>

          {/* العرض الشبكي بكروت الصور الزجاجية المضيئة */}
          {viewMode === 'grid' ? (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden group flex flex-col justify-between"
                >
                  {/* قسم الصورة الزجاجي مع حركة Zoom والـ Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* طبقة تدرج زجاجية ناعمة فوق الصورة */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* الشارة الزجاجية العلوية للحالة */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={() => toggleProjectStatus(project.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-xl border shadow-lg transition-all cursor-pointer ${
                          project.status === 'نشط'
                            ? 'bg-emerald-500/80 text-white border-emerald-400/50'
                            : project.status === 'مكتمل'
                            ? 'bg-indigo-500/80 text-white border-indigo-400/50'
                            : 'bg-amber-500/80 text-white border-amber-400/50'
                        }`}
                      >
                        ● {project.status}
                      </button>
                    </div>

                    {/* زر تكبير الصورة في منتصف الهوفر */}
                    <button
                      onClick={() => setPreviewImage(project.image)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-sm text-white gap-2 font-bold text-xs"
                    >
                      <span className="p-2.5 rounded-full bg-white/20 border border-white/40 shadow-xl backdrop-blur-md hover:scale-110 transition-transform">
                        <Icons.Maximize />
                      </span>
                      <span>توسيع الصورة</span>
                    </button>

                    {/* عنوان التقنية أسفل الصورة */}
                    <div className="absolute bottom-3 right-4 left-4 flex justify-between items-end">
                      <span className="text-[11px] font-bold text-indigo-200 bg-slate-950/60 px-3 py-1 rounded-xl backdrop-blur-md border border-white/10">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-400 bg-slate-950/70 px-2.5 py-1 rounded-xl backdrop-blur-md border border-white/10">
                        {project.budget}
                      </span>
                    </div>
                  </div>

                  {/* تفاصيل الكرت السفلية */}
                  <div className="p-6 space-y-4 bg-white">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors leading-snug">
                        {project.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">آخر تحديث للبيانات: {project.updated}</p>
                    </div>

                    {/* شريط التقدم الفاخر */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span>نسبة الإنجاز المكتملة:</span>
                        <span className="font-mono text-indigo-600 font-black">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            project.progress === 100 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* الأزرار التفاعلية */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl px-3"
                      >
                        عرض التفاصيل البرمجية
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setPreviewImage(project.image)}
                          className="p-2 h-8 rounded-xl hover:bg-indigo-50 text-indigo-600"
                          title="معاينة الصورة"
                        >
                          <Icons.Eye />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 h-8 rounded-xl hover:bg-red-50 text-red-600"
                          title="حذف الكرت"
                        >
                          <Icons.Trash />
                        </Button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* عرض الجدول المطور بالصور المصغرة */
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-700">
                <thead className="bg-slate-100/60 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200/60">
                  <tr>
                    <th className="py-4 px-6">المعاينة والاسم</th>
                    <th className="py-4 px-6">التقنيات</th>
                    <th className="py-4 px-6">معدل الإنجاز</th>
                    <th className="py-4 px-6">الميزانية</th>
                    <th className="py-4 px-6">الحالة</th>
                    <th className="py-4 px-6 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setPreviewImage(project.image)}
                        />
                        <span className="font-bold text-slate-900 text-sm">{project.name}</span>
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-500">{project.category}</td>
                      <td className="py-4 px-6 font-mono font-bold text-indigo-600">{project.progress}%</td>
                      <td className="py-4 px-6 font-bold text-slate-900 font-mono">{project.budget}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedProject(project)} className="text-indigo-600">
                          <Icons.Eye />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </Card>

      </main>

      {/* 4. نافذة المعاينة المكبرة للصور (Lightbox Modal) */}
      {previewImage && (
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="bg-slate-950/90 backdrop-blur-2xl border-white/20 text-white rounded-3xl max-w-3xl shadow-2xl p-4 overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src={previewImage} alt="Preview" className="w-full max-h-[75vh] object-contain rounded-2xl" />
            </div>
            <DialogFooter className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">معاينة عالية الدقة (Aura Glass Lightbox)</span>
              <Button onClick={() => setPreviewImage(null)} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs px-5">
                إغلاق المعاينة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 5. نافذة إضافة مشروع جديد بـ رابط صورة */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-2xl border-slate-200/80 text-slate-800 rounded-3xl max-w-md shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-indigo-600">
              <Icons.Sparkles />
              <span>إضافة مشروع جديد مع صورة</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs mt-1">
              أدخل البيانات ورابط الصورة ليتم استعراض الكرت الفاخر فوراً.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddProject} className="space-y-4 py-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">عنوان المشروع</label>
              <Input 
                placeholder="مثال: تطبيق إدارة المبيعات والمستشفيات"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">رابط صورة المعاينة (URL)</label>
              <Input 
                placeholder="https://images.unsplash.com/photo-..."
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:border-indigo-500 text-xs font-mono"
              />
              <p className="text-[10px] text-slate-400">اتركه فارغاً لاستخدام صورة افتراضية عالية الجودة تلقائياً.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">بيئة وحزمة العمل</label>
              <Input 
                placeholder="مثال: Laravel 13 • React 19 • Tailwind v4"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">الميزانية المقدّرة ($)</label>
              <Input 
                placeholder="22,000"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:border-indigo-500 text-xs font-mono"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button 
                type="button"
                variant="ghost" 
                onClick={() => setIsAddDialogOpen(false)} 
                className="text-slate-500 hover:bg-slate-100 rounded-xl text-xs"
              >
                إلغاء
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold px-5 shadow-md shadow-indigo-500/20"
              >
                حفظ وإضافة الكرت
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 6. نافذة تفاصيل المشروع */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="bg-white/95 backdrop-blur-2xl border-slate-200/80 text-slate-800 rounded-3xl max-w-md shadow-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-indigo-600">
                {selectedProject.name}
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs">
                بيانات الكرت المسجلة في خادم لاراڤيل
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs font-medium">
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-36">
                <img src={selectedProject.image} alt="Details" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500">حزمة التقنيات:</span>
                <span className="font-bold text-slate-800">{selectedProject.category}</span>
              </div>
              <div className="flex justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500">الميزانية:</span>
                <span className="font-bold text-emerald-600 font-mono">{selectedProject.budget}</span>
              </div>
              <div className="flex justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500">نسبة الإنجاز المنجزة:</span>
                <span className="font-bold text-indigo-600 font-mono">{selectedProject.progress}%</span>
              </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={() => setSelectedProject(null)} 
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs w-full shadow-md shadow-indigo-500/20"
              >
                إغلاق النافذة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}

const rootElement = document.getElementById('app');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}