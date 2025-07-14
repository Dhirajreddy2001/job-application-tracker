import React, { useEffect, useState, useCallback } from "react";
import ApplicationsTable from '../components/ApplicationsTable';
import axios from 'axios';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    // Fetch applications from backend
    const fetchApplications = useCallback(async () => {
        try {
            const params = {
                page,
                size: 10,
                ...(searchTerm && { search: searchTerm }),
                ...(statusFilter && { status: statusFilter }),
                ...(sortField && { sortField }),
                ...(sortOrder && { sortOrder }),
            };

            const response = await axios.get('http://localhost:8080/api/jobs', {
                params,
                withCredentials: true,
            });

            setApplications(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        }
    }, [page, searchTerm, statusFilter, sortField, sortOrder]);

    // Reset to first page when filters change
    useEffect(() => {
        setPage(0);
    }, [searchTerm, statusFilter, sortField, sortOrder]);

    // Fetch data when page or filters change
    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    return (
        <div className="p-6">
            
            <h1 className="text-2xl font-bold mb-4">Applications List</h1>

            {/* Filters */}
            <div className="flex gap-4 mb-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Search by title/company"
                    className="border px-3 py-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Select status</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Final">Final</option>
                    <option value="Offer">Offer</option>
                </select>

                <select
                    className="border px-3 py-2 rounded"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="id">Date</option>
                    <option value="status">Status</option>
                </select>

                <select
                    className="border px-3 py-2 rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Oldest First</option>
                    <option value="desc">Latest First</option>
                </select>
            </div>

            {/* Applications Table */}
            <ApplicationsTable
                data={applications}
                fetchApplications={fetchApplications}
                setPage={setPage}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Applications;
