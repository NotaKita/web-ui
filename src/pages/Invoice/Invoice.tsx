import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { invoiceAPI, companyAPI } from '@/lib/api';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  created_at: number;
}

const Invoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [hasCompany, setHasCompany] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    invoice_number: '',
    amount: '',
    status: 'draft',
  });

  useEffect(() => {
    checkCompanyAndFetchInvoices();
  }, []);

  const checkCompanyAndFetchInvoices = async () => {
    setIsLoading(true);
    try {
      const companyResponse = await companyAPI.get();
      if (companyResponse.success && companyResponse.data) {
        setHasCompany(true);
        fetchInvoices();
      } else {
        setHasCompany(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to check company');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await invoiceAPI.list();
      if (response.success) {
        setInvoices(response.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch invoices');
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsCreating(true);

    try {
      const response = await invoiceAPI.create(
        formData.invoice_number,
        parseFloat(formData.amount),
        formData.status
      );

      if (response.success) {
        setFormData({ invoice_number: '', amount: '', status: 'draft' });
        await fetchInvoices();
      } else {
        setError(response.message || 'Failed to create invoice');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!hasCompany) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              You need to create a company first before creating invoices.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Invoices</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateInvoice} className="space-y-4">
            <Input
              type="text"
              placeholder="Invoice Number"
              value={formData.invoice_number}
              onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
              required
              disabled={isCreating}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              step="0.01"
              required
              disabled={isCreating}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              disabled={isCreating}
            >
              <option value="draft">Draft</option>
              <option value="issued">Issued</option>
              <option value="paid">Paid</option>
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" disabled={isCreating} className="w-full">
              {isCreating ? 'Creating...' : 'Create Invoice'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-muted-foreground">No invoices created yet.</p>
          ) : (
            <div className="space-y-2">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex justify-between items-center p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                    <p className={`text-sm ${
                      invoice.status === 'paid' ? 'text-green-600' : 
                      invoice.status === 'issued' ? 'text-blue-600' : 
                      'text-gray-600'
                    }`}>
                      {invoice.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoice;
