import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Plus, Search, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { companyAPI } from '@/lib/api';

interface Company {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  created_at: number;
  updated_at?: number;
}

export default function CompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await companyAPI.list();
      if (response.success && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else {
        setError(response.message || 'Failed to fetch companies');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        // Update
        const response = await companyAPI.update(editingId, formData);
        if (response.success) {
          await fetchCompanies();
          resetForm();
          setShowForm(false);
        } else {
          setError(response.message || 'Failed to update company');
        }
      } else {
        // Create
        const response = await companyAPI.create(formData);
        if (response.success) {
          await fetchCompanies();
          resetForm();
          setShowForm(false);
        } else {
          setError(response.message || 'Failed to create company');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingId(company.id);
    setFormData({
      name: company.name,
      phone: company.phone || '',
      email: company.email || '',
      address: company.address || '',
      city: company.city || '',
      country: company.country || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      const response = await companyAPI.delete(id);
      if (response.success) {
        await fetchCompanies();
      } else {
        setError(response.message || 'Failed to delete company');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      country: '',
    });
    setEditingId(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="my-8 backdrop-blur-[32px] bg-white/20 border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-[2rem] w-full max-w-[1600px] p-0 flex flex-col overflow-visible relative transition-all duration-300 ease-in-out ml-0 before:content-[''] before:absolute before:inset-0 before:rounded-[2rem] before:pointer-events-none before:shadow-[inset_0_4px_64px_0_rgba(255,255,255,0.45)] mx-auto min-h-[400px]">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Company List</h1>
            <p className="text-base md:text-lg text-gray-600">Manage all your companies and client information.</p>
          </div>
          <button
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-colors cursor-pointer"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus className="w-5 h-5" />
            <span>Add New Company</span>
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {/* Company List Table */}
        <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-8 rounded-xl shadow-md border border-white/30 w-full mb-8">
          {companies.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No companies found. Create your first company to get started.</p>
            </div>
          ) : (
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/30 divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-white/10">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{company.email || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{company.phone || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{company.city || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowDetail(true);
                        }}
                        title="View"
                        className="inline-flex items-center justify-center p-1 rounded hover:bg-blue-100 mr-1"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(company)}
                        title="Edit"
                        className="inline-flex items-center justify-center p-1 rounded hover:bg-purple-100 mr-1"
                      >
                        <Pencil className="w-4 h-4 text-purple-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        title="Delete"
                        className="inline-flex items-center justify-center p-1 rounded hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Create/Edit Form Dialog */}
      <Dialog open={showForm} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Company' : 'Add New Company'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Company Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Company name"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="company@example.com"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+62 123 456 789"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Street address"
                rows={2}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  placeholder="City"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  placeholder="Country"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>}

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Company' : 'Create Company')}
              </Button>
              <Button type="button" variant="outline" onClick={handleCloseForm}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCompany?.name}</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{selectedCompany.email || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg">{selectedCompany.phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-lg">{selectedCompany.address || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="text-lg">{selectedCompany.city || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="text-lg">{selectedCompany.country || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-lg">{new Date(selectedCompany.created_at * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
