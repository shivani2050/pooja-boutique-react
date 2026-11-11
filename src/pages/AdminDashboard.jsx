import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  RefreshCw,
  Users,
  Phone,
  Mail,
  Eye,
  Trash2,
  X,
} from "lucide-react";

const API_URL = "https://pooja-boutique-backend-z2se.onrender.com";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchEnquiry, setSearchEnquiry] = useState("");
const [dateFilter, setDateFilter] = useState("All");

  // customer state
  const [customers, setCustomers] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerError, setCustomerError] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const fetchLeads = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch leads");
      }

      setLeads(result.data || []);
    } catch (err) {
      setError(err.message || "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  //  update status
  const updateStatus = async (leadId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/leads/${leadId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Status update failed");
      }

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === leadId ? { ...lead, status: result.data.status } : lead,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch all customers
  const fetchCustomers = async () => {
    setCustomerLoading(true);
    setCustomerError("");

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch customers");
      }

      setCustomers(result.data || []);
    } catch (err) {
      setCustomerError(err.message || "Failed to load customers");
    } finally {
      setCustomerLoading(false);
    }
  };

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const search = searchCustomer.toLowerCase().trim();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      (customer.phone || "").includes(search)
    );
  });

 
// Filter enquiries by status, search and date
const filteredLeads = leads.filter((lead) => {
  const matchesStatus =
    filterStatus === "All" || lead.status === filterStatus;

  const search = searchEnquiry.toLowerCase().trim();

  const matchesSearch =
    (lead.name || "").toLowerCase().includes(search) ||
    (lead.email || "").toLowerCase().includes(search) ||
    (lead.phone || "").includes(search) ||
    (lead.service || "").toLowerCase().includes(search);

  const enquiryDate = lead.createdAt
    ? new Date(lead.createdAt)
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const matchesDate =
    dateFilter === "All" ||
    (dateFilter === "Today" &&
      enquiryDate &&
      enquiryDate >= today) ||
    (dateFilter === "Last 7 Days" &&
      enquiryDate &&
      enquiryDate >= new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)) ||
    (dateFilter === "This Month" &&
      enquiryDate &&
      enquiryDate.getMonth() === today.getMonth() &&
      enquiryDate.getFullYear() === today.getFullYear());

  return matchesStatus && matchesSearch && matchesDate;
});

  // Enquiry Statistics
const pendingCount = leads.filter(
  (lead) => lead.status === "Pending"
).length;

const inProgressCount = leads.filter(
  (lead) => lead.status === "In Progress"
).length;

const completedCount = leads.filter(
  (lead) => lead.status === "Completed"
).length;

  // View customer details
  const viewCustomer = async (customerId) => {
    setDetailsLoading(true);
    setDetailsError("");
    setSelectedCustomer(null);

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/users/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch customer");
      }

      setSelectedCustomer(result.data);
    } catch (error) {
      setDetailsError(error.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  // Delete customer
  const deleteCustomer = async (customerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/users/${customerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Customer deletion failed");
      }

      setCustomers((prev) =>
        prev.filter((customer) => customer._id !== customerId),
      );

      if (selectedCustomer?._id === customerId) {
        setSelectedCustomer(null);
      }

      alert("Customer deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

// Export enquiries to CSV
const exportEnquiries = () => {
  const headers = [
    "Customer Name",
    "Phone",
    "Email",
    "Service",
    "Message",
    "Status",
    "Date",
  ];

  const rows = filteredLeads.map((lead) => [
    lead.name,
    lead.phone,
    lead.email,
    lead.service,
    lead.message,
    lead.status,
    lead.createdAt
      ? new Date(lead.createdAt).toLocaleDateString("en-IN")
      : "",
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.map((value) => `"${String(value || "").replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "pooja-boutique-enquiries.csv";
  link.click();

  URL.revokeObjectURL(url);
};


  useEffect(() => {
    fetchLeads();
    fetchCustomers();
  }, []);

 const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");

  navigate("/admin/login");
};

  return (
    <div className="min-h-screen bg-[#151014] p-4 text-[#f8eee5] sm:p-8">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-b border-[#b99454]/30 pb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#c9a66b]">
            Pooja Boutique
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-[#b99454]/50 px-4 py-2 hover:bg-white/5 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-[#b99454] px-4 py-2 font-medium text-black hover:bg-[#d5b878]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-8">
       <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

  {/* Total Enquiries */}
  <div className="rounded-2xl border border-[#b99454]/30 bg-white/[0.03] p-6">
    <p className="text-sm text-gray-400">Total Enquiries</p>
    <p className="mt-2 text-3xl font-semibold">{leads.length}</p>
  </div>

  {/* Pending */}
  <div className="rounded-2xl border border-yellow-500/30 bg-white/[0.03] p-6">
    <p className="text-sm text-gray-400">Pending</p>
    <p className="mt-2 text-3xl font-semibold text-yellow-400">
      {pendingCount}
    </p>
  </div>

  {/* In Progress */}
  <div className="rounded-2xl border border-blue-500/30 bg-white/[0.03] p-6">
    <p className="text-sm text-gray-400">In Progress</p>
    <p className="mt-2 text-3xl font-semibold text-blue-400">
      {inProgressCount}
    </p>
  </div>

  {/* Completed */}
  <div className="rounded-2xl border border-green-500/30 bg-white/[0.03] p-6">
    <p className="text-sm text-gray-400">Completed</p>
    <p className="mt-2 text-3xl font-semibold text-green-400">
      {completedCount}
    </p>
  </div>

  {/* Total Customers */}
<div className="rounded-2xl border border-[#b99454]/30 bg-white/[0.03] p-6">
  <p className="text-sm text-gray-400">Registered Customers</p>
  <p className="mt-2 text-3xl font-semibold text-[#d5b878]">
    {customers.length}
  </p>
</div>

</div>

        {/* Customer Management */}

        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Customer Management</h2>
            <input
              type="text"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[#b99454]/40 bg-[#241b1c] px-4 py-3 text-white outline-none placeholder:text-gray-500 sm:max-w-md"
            />

            <button
              onClick={fetchCustomers}
              disabled={customerLoading}
              className="rounded-lg border border-[#b99454]/50 px-4 py-2 hover:bg-white/5 disabled:opacity-50"
            >
              Refresh Customers
            </button>
          </div>

          <div className="mb-4 rounded-2xl border border-[#b99454]/30 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-400">Total Registered Customers</p>
            <p className="mt-2 text-3xl font-semibold">{customers.length}</p>
          </div>

          {customerLoading && (
            <p className="py-6 text-gray-300">Loading customers...</p>
          )}

          {!customerLoading && customerError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {customerError}
            </div>
          )}

          {!customerLoading && !customerError && customers.length === 0 && (
            <p className="rounded-xl border border-white/10 p-6 text-gray-400">
              No registered customers found.
            </p>
          )}

          {!customerLoading && !customerError && customers.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-[#b99454]/25">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-[#b99454]/15 text-[#d5b878]">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Email</th>
                     
                    <th className="p-4">Registration Date</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-t border-white/10 hover:bg-white/[0.03]"
                    >
                      <td className="p-4">{customer.name}</td>
                      <td className="p-4">{customer.email}</td>
                       
                      <td className="p-4 text-gray-400">
                        {customer.createdAt
                          ? new Date(customer.createdAt).toLocaleDateString(
                              "en-IN",
                            )
                          : "-"}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => viewCustomer(customer._id)}
                            className="rounded-lg border border-[#b99454]/50 p-2 text-[#d5b878] hover:bg-[#b99454]/10"
                            title="View Details"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            onClick={() => deleteCustomer(customer._id)}
                            className="rounded-lg border border-red-500/40 p-2 text-red-400 hover:bg-red-500/10"
                            title="Delete Customer"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer Details Modal */}

        {(detailsLoading || detailsError || selectedCustomer) && (
          <div className="mb-8 rounded-2xl border border-[#b99454]/30 bg-[#21191d] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Details</h2>

              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setDetailsError("");
                }}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {detailsLoading && (
              <p className="mt-4 text-gray-300">Loading customer details...</p>
            )}

            {detailsError && (
              <p className="mt-4 text-red-400">{detailsError}</p>
            )}

            {selectedCustomer && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <p>Name: {selectedCustomer.name}</p>
                <p>Email: {selectedCustomer.email}</p>
                <p>Phone: {selectedCustomer.phone || "-"}</p>
                <p>
                  Registered:{" "}
                  {new Date(selectedCustomer.createdAt).toLocaleDateString(
                    "en-IN",
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        <h2 className="mb-4 text-xl font-semibold">Customer Enquiries</h2>
        <div className="mb-4">
  <input
    type="text"
    value={searchEnquiry}
    onChange={(e) => setSearchEnquiry(e.target.value)}
    placeholder="Search by name, phone, email or service..."
    className="w-full rounded-xl border border-[#b99454]/40 bg-[#241b1c] px-4 py-3 text-white outline-none placeholder:text-gray-500 sm:max-w-md"
  />


  <button
    onClick={exportEnquiries}
    className="rounded-lg bg-[#b99454] mx-5 px-5 py-3 font-medium text-black hover:bg-[#d5b878]"
  >
    Export Enquiries CSV
  </button>
</div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="text-gray-300">Filter by Status:</label>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-[#b99454]/40 bg-[#241b1c] px-4 py-2 text-white outline-none"
          >
            <option value="All">All Enquiries</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

<label className="text-gray-300">Filter by Date:</label>

<select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
  className="rounded-lg border border-[#b99454]/40 bg-[#241b1c] px-4 py-2 text-white outline-none"
>
  <option value="All">All Dates</option>
  <option value="Today">Today</option>
  <option value="Last 7 Days">Last 7 Days</option>
  <option value="This Month">This Month</option>
</select>

        </div>

        {loading && <p className="py-8 text-gray-300">Loading enquiries...</p>}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
            <button onClick={fetchLeads} className="ml-3 underline">
              {" "}
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredLeads.length === 0 && (
          <p className="rounded-xl border border-white/10 p-6 text-gray-400">
            {leads.length === 0
              ? "No enquiries found yet."
              : `No enquiries found for ${filterStatus} status.`}
          </p>
        )}

        {!loading && !error && filteredLeads.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-[#b99454]/25">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-[#b99454]/15 text-[#d5b878]">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-white/10 hover:bg-white/[0.03]"
                  >
                    <td className="p-4 font-medium">{lead.name}</td>
                    <td className="p-4">
                      <p className="flex items-center gap-2">
                        <Phone size={14} />
                        {lead.phone}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-gray-400">
                        <Mail size={14} />
                        {lead.email || "-"}
                      </p>
                    </td>
                    <td className="p-4">{lead.service}</td>

                    <td className="p-4 max-w-[250px]">{lead.message || "-"}</td>
                    <td className="p-4">
                      <select
                        value={lead.status || "Pending"}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className="rounded-lg border border-[#b99454]/40 bg-[#241b1c] px-3 py-2 text-white outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="whitespace-nowrap p-4 text-gray-400">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
