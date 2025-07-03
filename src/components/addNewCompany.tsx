import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddClientModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    industry: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-2xl shadow-white/30 ring-1 ring-white/40 rounded-2xl w-full max-w-2xl p-8 flex flex-col relative transition-all duration-300 ease-in-out">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">✕</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Add New Company</h2>
        <span className="text-sm text-gray-500 mb-3 text-center">Please fill in the form below to add a new company.</span>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={value => setFormData(prev => ({ ...prev, businessType: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT">PT</SelectItem>
                  <SelectItem value="CV">CV</SelectItem>
                  <SelectItem value="UMKM">UMKM</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={value => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="F&B">F&amp;B</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          {/* Kolom Kanan */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="w-1/2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="postalCode">Postal/Zip Code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>
              <div className="w-1/2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
            </div>
          </div>
          {/* Notes/Message full width */}
          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="notes">Notes/Message</Label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 min-h-[96px] focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          {/* Tombol Submit di bawah, rata tengah, ukuran sama */}
          <div className="col-span-1 md:col-span-2 flex justify-center gap-4 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-32"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tailwind shortcut for inputs
const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400";
export default AddClientModal;
