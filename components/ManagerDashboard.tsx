import React, { useState, useEffect } from 'react';
import { API_URL } from '../lib/config';
import { useNavigate } from 'react-router-dom';
import {
  Utensils, LayoutDashboard, Archive, DollarSign, Workflow, ShieldCheck, Settings,
  Bell, TrendingUp, TrendingDown, Bolt, PiggyBank, Sparkles, Filter, Download,
  ChevronLeft, ChevronRight, AlertTriangle, Home, Radio, Plus, Loader2, CheckCircle2, Trash2
} from 'lucide-react';
import { BarChart3, Upload, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '12:00 PM', price: 85 },
  { time: '2:00 PM', price: 82 },
  { time: '4:00 PM', price: 78 },
  { time: '6:00 PM', price: 72 },
  { time: '8:00 PM', price: 60 },
  { time: '10:00 PM', price: 45 },
];

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  // --- Dishes state ---
  const [dishes, setDishes] = useState<any[]>([]);
  const [dishesLoading, setDishesLoading] = useState(true);

  const fetchDishes = async () => {
    try {
      setDishesLoading(true);
      const res = await fetch(`${API_URL}/api/dishes`);
      const json = await res.json();
      if (json.success) setDishes(json.data);
    } catch {
      // silently fail — list will be empty
    } finally {
      setDishesLoading(false);
    }
  };

  // --- Inventory state ---
  const [inventory, setInventory] = useState<any[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      setInventoryLoading(true);
      const res = await fetch(`${API_URL}/api/inventory`);
      const json = await res.json();
      if (json.success) setInventory(json.data);
    } catch {
      // silently fail
    } finally {
      setInventoryLoading(false);
    }
  };

  useEffect(() => { fetchDishes(); fetchInventory(); }, []);

  // --- Add Dish form state ---
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishCategory, setDishCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // --- Ingredient selection state ---
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: string; ingredientName: string; quantityRequired: string }[]
  >([]);

  const addIngredientRow = () => {
    setSelectedIngredients((prev) => [
      ...prev,
      { ingredientId: '', ingredientName: '', quantityRequired: '' },
    ]);
  };

  const removeIngredientRow = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const updateIngredientRow = (index: number, field: string, value: string) => {
    setSelectedIngredients((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        if (field === 'ingredientId') {
          const found = inventory.find((inv: any) => inv._id === value);
          return { ...row, ingredientId: value, ingredientName: found?.ingredientName || '' };
        }
        return { ...row, [field]: value };
      })
    );
  };

  // IDs already selected (for duplicate prevention)
  const selectedIds = selectedIngredients.map((r) => r.ingredientId).filter(Boolean);

  // --- CSV Upload state ---
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setCsvError(null);
    setCsvSuccess(null);

    if (!csvFile) {
      setCsvError('Please select a CSV file first.');
      return;
    }

    try {
      setCsvUploading(true);
      const formData = new FormData();
      formData.append('file', csvFile);

      const res = await fetch(`${API_URL}/api/inventory/upload-csv`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      setCsvFile(null);
      // Reset the file input
      const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setCsvSuccess(
        `Uploaded! ${result.insertedCount} of ${result.totalRows} rows inserted` +
        (result.skippedCount > 0 ? ` (${result.skippedCount} skipped)` : '') + '.'
      );
      fetchInventory(); // refresh inventory list
      setTimeout(() => setCsvSuccess(null), 5000);
    } catch (err) {
      setCsvError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setCsvUploading(false);
    }
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Basic validation
    if (!dishName.trim() || !dishPrice.trim()) {
      setFormError('Name and price are required.');
      return;
    }

    const price = parseFloat(dishPrice);
    if (isNaN(price) || price < 0) {
      setFormError('Please enter a valid price.');
      return;
    }

    // Validate ingredients if any rows exist
    for (const row of selectedIngredients) {
      if (!row.ingredientId) {
        setFormError('Please select an ingredient for every row, or remove empty rows.');
        return;
      }
      const qty = Number(row.quantityRequired);
      if (isNaN(qty) || qty <= 0) {
        setFormError(`Quantity for "${row.ingredientName}" must be greater than 0.`);
        return;
      }
    }

    // Build ingredients array for backend
    const ingredients = selectedIngredients.map((item) => ({
      ingredient: item.ingredientId,
      quantityRequired: Number(item.quantityRequired),
    }));

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/api/dishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dishName.trim(),
          price,
          category: dishCategory.trim() || 'General',
          ...(ingredients.length > 0 && { ingredients }),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error?.join(', ') || 'Failed to add dish');
      }

      // Success — clear form, refresh dishes, and show message
      setDishName('');
      setDishPrice('');
      setDishCategory('');
      setSelectedIngredients([]);
      setFormSuccess(`"${result.data.name}" added successfully!`);
      fetchDishes(); // refresh the dish list

      // Auto-hide success message after 3s
      setTimeout(() => setFormSuccess(null), 3000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light font-sans text-slate-800 antialiased h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight cursor-pointer" onClick={() => navigate('/')}>
            <Radio className="w-6 h-6" />
            <span>Orchestrator<span className="text-primary">.ai</span></span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <SidebarItem icon={<Home size={20} />} text="Home" onClick={() => navigate('/')} />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Archive size={20} />} text="Inventory" />
          <SidebarItem icon={<DollarSign size={20} />} text="Pricing Engine" />
          <SidebarItem icon={<Workflow size={20} />} text="Transformation Log" />
          <SidebarItem icon={<ShieldCheck size={20} />} text="Audit Log" />
        </nav>
        <div className="p-4 border-t border-slate-100 space-y-1">
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <div className="pt-4 mt-2">
            <div className="flex items-center gap-3 px-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                AC
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700">Alex Chen</span>
                <span className="text-xs text-slate-500">Head Manager</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">Main Kitchen</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">Operational</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Bell size={20} />
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Shift</p>
              <p className="text-sm font-medium text-slate-900">Dinner Service</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard title="Expiring Batches" value="12" icon={<AlertTriangle className="text-red-600" size={24} />} iconBg="bg-red-50" trend={<><TrendingUp size={14} className="mr-0.5" /> +2</>} trendColor="text-red-600" trendText="vs last shift" />
              <KPICard title="Active Flash Deals" value="5" icon={<Bolt className="text-primary" size={24} />} iconBg="bg-blue-50" trend={<><ShieldCheck size={14} className="mr-0.5" /> Optimized</>} trendColor="text-emerald-600" trendText="Auto-active" />
              <KPICard title="Revenue Recovery" value="$4,250" icon={<PiggyBank className="text-emerald-600" size={24} />} iconBg="bg-emerald-50" trend={<><TrendingUp size={14} className="mr-0.5" /> 14%</>} trendColor="text-emerald-600" trendText="this week" />
              <KPICard title="Recommendations" value="3" icon={<Sparkles className="text-purple-600" size={24} />} iconBg="bg-purple-50" trend="Pending Review" trendColor="text-amber-600" trendText="" />
            </div>

            {/* Add Dish Form */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Plus className="text-primary" size={20} />
                <h2 className="text-lg font-bold text-slate-900">Add New Dish</h2>
              </div>

              {/* Success message */}
              {formSuccess && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
                  <CheckCircle2 size={16} />
                  {formSuccess}
                </div>
              )}

              {/* Error message */}
              {formError && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                  <AlertTriangle size={16} />
                  {formError}
                </div>
              )}

              <form onSubmit={handleAddDish} className="space-y-5">
                {/* Row 1: Name, Price, Category */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Dish Name *</label>
                    <input
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder="e.g. Truffle Burger"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      disabled={submitting}
                    />
                  </div>
                  <div className="w-full sm:w-36">
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={dishPrice}
                      onChange={(e) => setDishPrice(e.target.value)}
                      placeholder="250"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      disabled={submitting}
                    />
                  </div>
                  <div className="w-full sm:w-44">
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Category</label>
                    <input
                      type="text"
                      value={dishCategory}
                      onChange={(e) => setDishCategory(e.target.value)}
                      placeholder="e.g. Mains"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Ingredients Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-slate-600">Ingredients</label>
                    <button
                      type="button"
                      onClick={addIngredientRow}
                      disabled={submitting || inventory.length === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={14} /> Add Ingredient
                    </button>
                  </div>

                  {selectedIngredients.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No ingredients added. Click “+ Add Ingredient” to map ingredients to this dish.</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedIngredients.map((row, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex-1 w-full">
                            <label className="block text-xs font-medium text-slate-500 mb-1">Ingredient</label>
                            <select
                              value={row.ingredientId}
                              onChange={(e) => updateIngredientRow(index, 'ingredientId', e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                              disabled={submitting}
                            >
                              <option value="">Select ingredient…</option>
                              {inventory.map((inv: any) => (
                                <option
                                  key={inv._id}
                                  value={inv._id}
                                  disabled={selectedIds.includes(inv._id) && row.ingredientId !== inv._id}
                                >
                                  {inv.ingredientName} ({inv.quantity} {inv.unit})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-full sm:w-32">
                            <label className="block text-xs font-medium text-slate-500 mb-1">Qty Required</label>
                            <input
                              type="number"
                              step="0.01"
                              min="0.01"
                              value={row.quantityRequired}
                              onChange={(e) => updateIngredientRow(index, 'quantityRequired', e.target.value)}
                              placeholder="0.5"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                              disabled={submitting}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIngredientRow(index)}
                            disabled={submitting}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 self-end"
                            title="Remove ingredient"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Adding...</>
                    ) : (
                      <><Plus size={16} /> Add Dish</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Upload Inventory CSV */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Upload className="text-primary" size={20} />
                <h2 className="text-lg font-bold text-slate-900">Upload Inventory CSV</h2>
              </div>

              {csvSuccess && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium">
                  <CheckCircle2 size={16} />
                  {csvSuccess}
                </div>
              )}

              {csvError && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                  <AlertTriangle size={16} />
                  {csvError}
                </div>
              )}

              <form onSubmit={handleCsvUpload} className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">CSV File *</label>
                  <input
                    id="csv-file-input"
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    disabled={csvUploading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={csvUploading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-md hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {csvUploading ? (
                    <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={16} /> Upload CSV</>
                  )}
                </button>
              </form>
              <p className="mt-3 text-xs text-slate-400">Columns: ingredientName, quantity, unit, costPerUnit, expiryDate</p>
            </div>

            {/* Dish Cost Analytics */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="text-primary" size={20} />
                <h2 className="text-lg font-bold text-slate-900">Dish Cost Analytics</h2>
                <span className="ml-auto text-xs text-slate-400 font-medium">{dishes.length} dishes</span>
              </div>

              {dishesLoading ? (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  <Loader2 size={24} className="animate-spin mr-2" /> Loading dishes…
                </div>
              ) : dishes.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No dishes found. Add one above!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dishes.map((dish: any) => {
                    const profitMargin = dish.price > 0
                      ? ((dish.estimatedProfit / dish.price) * 100).toFixed(1)
                      : '0.0';
                    const marginNum = parseFloat(profitMargin);
                    const marginColor = marginNum >= 50 ? 'text-emerald-600' : marginNum >= 20 ? 'text-amber-600' : 'text-red-600';
                    const marginBg = marginNum >= 50 ? 'bg-emerald-50 border-emerald-200' : marginNum >= 20 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

                    return (
                      <div key={dish._id} className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-900 text-sm">{dish.name}</h3>
                            <span className="text-xs text-slate-400 font-medium">{dish.category || 'General'}</span>
                          </div>
                          <span className="text-lg font-bold text-slate-900">₹{dish.price}</span>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Ingredient Cost</span>
                            <span className="font-medium text-slate-700">₹{dish.totalIngredientCost ?? 0}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500">Estimated Profit</span>
                            <span className="font-semibold text-emerald-600">₹{dish.estimatedProfit ?? dish.price}</span>
                          </div>
                        </div>

                        <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${marginBg}`}>
                          <span className="text-xs font-medium text-slate-600">Profit Margin</span>
                          <span className={`text-sm font-bold ${marginColor}`}>{profitMargin}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Package className="text-primary" size={20} />
                  <h2 className="text-lg font-bold text-slate-900">Inventory Items</h2>
                  <span className="ml-auto text-xs text-slate-400 font-medium">{inventory.length} items</span>
                </div>
              </div>

              {inventoryLoading ? (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  <Loader2 size={24} className="animate-spin mr-2" /> Loading inventory…
                </div>
              ) : inventory.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-10">No inventory items found. Upload a CSV to get started.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                        <th className="px-6 py-4">Ingredient Name</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Cost Per Unit (₹)</th>
                        <th className="px-6 py-4">Expiry Date</th>
                        <th className="px-6 py-4 text-right">Days Remaining</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {inventory.map((item: any) => {
                        const daysRemaining = Math.ceil(
                          (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                        );
                        const rowBg = daysRemaining <= 3
                          ? 'bg-red-50'
                          : daysRemaining <= 7
                            ? 'bg-amber-50'
                            : '';
                        const badgeStyle = daysRemaining <= 3
                          ? 'bg-red-100 text-red-800'
                          : daysRemaining <= 7
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800';
                        const formattedDate = new Date(item.expiryDate).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        });

                        return (
                          <tr key={item._id} className={`${rowBg} hover:bg-slate-100/60 transition-colors`}>
                            <td className="px-6 py-4 font-medium text-slate-900">{item.ingredientName}</td>
                            <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                            <td className="px-6 py-4 text-slate-600">₹{item.costPerUnit}</td>
                            <td className="px-6 py-4 text-slate-600">{formattedDate}</td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle}`}>
                                {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Main Grid: Graph & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Price Decay Analysis</h2>
                    <p className="text-sm text-slate-500">Monitoring dynamic pricing adjustment for perishable batches</p>
                  </div>
                  <select className="bg-slate-50 border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary outline-none">
                    <option>Wagyu Beef Batch #4092</option>
                  </select>
                </div>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(value) => `$${value}`} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#2463eb" strokeWidth={3} dot={{ r: 4, fill: "#2463eb" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col h-full lg:h-[400px]">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-purple-600" size={20} />
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">Recommended Transformations</h2>
                </div>
                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">High Impact</span>
                      <span className="text-xs text-slate-400">2m ago</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">Convert Avocados</h4>
                    <p className="text-sm text-slate-500 mb-3">Expiry imminent. Transform to Guacamole for Happy Hour.</p>
                    <div className="flex items-center justify-between text-xs font-medium mb-3">
                      <span className="text-slate-500">Est. Savings:</span>
                      <span className="text-emerald-600 text-sm">$45.00</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-primary text-white py-1.5 rounded text-xs font-semibold hover:bg-primary-dark transition-colors">Approve</button>
                      <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-1.5 rounded text-xs font-semibold hover:bg-slate-50 transition-colors">Dismiss</button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200 opacity-75">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Medium</span>
                      <span className="text-xs text-slate-400">15m ago</span>
                    </div>
                    <h4 className="font-semibold text-slate-800 mb-1">Pickle Cucumbers</h4>
                    <p className="text-sm text-slate-500 mb-3">Excess inventory alert. Extend shelf life by 2 weeks.</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white border border-slate-200 text-slate-600 py-1.5 rounded text-xs font-semibold hover:bg-slate-50 transition-colors">Review</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Inventory Risk Table</h2>
                  <p className="text-sm text-slate-500">Items requiring immediate attention or dynamic pricing</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Filter size={16} /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Download size={16} /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      <th className="px-6 py-4">Ingredient</th>
                      <th className="px-6 py-4">Batch ID</th>
                      <th className="px-6 py-4">Expiry Date</th>
                      <th className="px-6 py-4">Time Left</th>
                      <th className="px-6 py-4">Dynamic Price</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    <TableRow name="Wagyu Beef" icon="🍖" iconBg="bg-red-100" iconColor="text-red-600" batch="#4092-A" expiry="Today, 10:00 PM" timeLeft="4h 20m" timeLeftColor="text-red-600" price="$45.00" original="$68.00" status="Critical" statusColor="bg-red-100 text-red-800" />
                    <TableRow name="Atlantic Salmon" icon="🐟" iconBg="bg-orange-100" iconColor="text-orange-600" batch="#2201-B" expiry="Tomorrow, 11:00 AM" timeLeft="15h 10m" timeLeftColor="text-amber-600" price="$22.50" original="$26.00" status="Warning" statusColor="bg-amber-100 text-amber-800" />
                    <TableRow name="Heirloom Tomatoes" icon="🍅" iconBg="bg-green-100" iconColor="text-green-600" batch="#8992-X" expiry="Nov 14, 2023" timeLeft="2 Days" timeLeftColor="text-slate-500" price="$4.50/lb" status="Stable" statusColor="bg-slate-100 text-slate-800" />
                    <TableRow name="Sourdough Starter" icon="🍞" iconBg="bg-blue-100" iconColor="text-primary" batch="#1102-M" expiry="Nov 12, 2023" timeLeft="2h 00m" timeLeftColor="text-slate-500" price="--" status="Optimized" statusColor="bg-emerald-100 text-emerald-800" />
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                <span className="text-xs text-slate-500">Showing 1-4 of 28 items</span>
                <div className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:text-primary disabled:opacity-50">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:text-primary">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-8"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick }: { icon: React.ReactNode, text: string, active?: boolean, onClick?: () => void }) => (
  <a onClick={onClick} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${active ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    <span>{text}</span>
  </a>
);

const KPICard = ({ title, value, icon, iconBg, trend, trendColor, trendText }: { title: string, value: string, icon: React.ReactNode, iconBg: string, trend: React.ReactNode, trendColor: string, trendText: string }) => (
  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-2 ${iconBg} rounded-lg`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center text-xs">
      <span className={`${trendColor} font-medium flex items-center`}>{trend}</span>
      {trendText && <span className="text-slate-400 ml-1.5">{trendText}</span>}
    </div>
  </div>
);

const TableRow = ({ name, icon, iconBg, iconColor, batch, expiry, timeLeft, timeLeftColor, price, original, status, statusColor }: any) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4 font-medium text-slate-900">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        {name}
      </div>
    </td>
    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{batch}</td>
    <td className="px-6 py-4 text-slate-600">{expiry}</td>
    <td className={`px-6 py-4 font-semibold ${timeLeftColor}`}>{timeLeft}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-slate-900 font-medium">{price}</span>
        {original && <span className="text-xs text-red-500 line-through">{original}</span>}
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
        {status}
      </span>
    </td>
  </tr>
);

export default ManagerDashboard;